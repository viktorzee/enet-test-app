import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

import { useAppSelector } from './store/store/hooks';
import { isAuthenticated } from './store/features/userSlice';
import { AppNavigator, AuthStack } from './src/router/Router';
import { store } from './store/store/store';

function AppNavigation(){
  const isLoggedIn = useAppSelector(isAuthenticated);
  return(
    <NavigationContainer>
      { isLoggedIn ? <AppNavigator /> : <AuthStack /> }
      <Toast position='top' />
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar translucent={true}  backgroundColor={'transparent'} />
      <AppNavigation />    
    </Provider>
  );
}