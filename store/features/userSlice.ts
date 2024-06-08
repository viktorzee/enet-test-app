import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {RootState} from '../store/store'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface User {    
    id: number,
    nom: string,
    email: string,
    githubUrl: string
}
interface AuthState {
    user: User | null;
    token: string | null;
    error: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
  
const initialState: AuthState = {
    user: null,
    token: null,
    error: null,
    isAuthenticated: false,
    isLoading: false,
};

interface updateType{
    id: string;
    values: any
}

const BASE_URL = process.env.EXPO_PUBLIC_AUTH_URL;

export const login = createAsyncThunk< 
    { user: User; token: string },
    { email: string; password: string },
    { rejectValue: string }
    >(
    'auth/login',
    async (values, { rejectWithValue }) => {
        const { email, password } = values;
    
        if (!email) {
            return rejectWithValue('email is wrong');
        }

        try {
            // await axios.request(+)
            const result = await axios.post(`${BASE_URL}/linguere/auth/editeur/seconnecter`, { email, password }, );
            return result.data;
        } catch (error:any) {
            console.log("error", error)     
            if (axios.isAxiosError(error)) {
                if (!error.response) {
                    return rejectWithValue('Erreur réseau. Veuillez vérifier votre connexion.');
                }
                if (error.response.status === 401) {
                    return rejectWithValue('email ou mot de passe invalide.');
                }
                if (error.response.status === 500) {
                    return rejectWithValue('Erreur du serveur. Veuillez réessayer plus tard.');
                }
                return rejectWithValue('Une erreur inattendue est apparue. Veuillez réessayer.');
            } else {
                return rejectWithValue('Une erreur inconnue est survenue. Veuillez réessayer.');
            }
        }
    }
);



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
            state.error = null;
            state.isAuthenticated = true;
            state.isLoading = false;
        }).addCase(login.rejected, (state, action) => {            
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = action.payload || 'Login Failed';
        })
    }
})

export const AuthUser = (state: RootState) => state.user.user;
export const AuthToken = (state: RootState) => state.user.token
export const AuthError = (state: RootState) => state.user.error;
export const isAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const isLoading = (state: RootState) => state.user.isLoading;

export default userSlice.reducer;
export const { logout } = userSlice.actions;
