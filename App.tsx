import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';

import { useAppSelector } from './store/store/hooks';
import { isAuthenticated } from './store/features/userSlice';
import { AppNavigator, AuthStack } from './src/router/Router';
import { store, persistor } from './store/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Loading } from './src/components/UI/Loading';

function AppNavigation(){
  const isLoggedIn = useAppSelector(isAuthenticated);
  return(
    <NavigationContainer>
      { isLoggedIn ? <AppNavigator /> : <AuthStack /> }
      <Toast position='top' />
    </NavigationContainer>
  )
}

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<View><Loading /></View>} persistor={persistor}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <AppNavigation />
    </PersistGate>
  </Provider>
);

export default App;