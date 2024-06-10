import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { 
  persistReducer,
  persistStore,
  FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER, 
} from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from '../features/userSlice'
import { entrepriseApi } from "../api/entreprise-api";

const reducers = combineReducers({
  // combine all reducers
  user: userReducer,
  [entrepriseApi.reducerPath]: entrepriseApi.reducer,
});

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	// version: 1,
	// whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, reducers);


export const store = configureStore({
  //this is just a demo to remove the error
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] as any
      }
    }).concat([
      entrepriseApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;


// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


// Use throughout your app instead of plain `useDispatch` and `useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store); // export persistStore to the App