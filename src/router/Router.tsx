import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppDispatch } from '../../store/store/hooks';
import { logout } from '../../store/features/userSlice';
import { RootStackParamList } from '../model';
import { Dashboard, Login } from '../screens/user';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CompanyProfile from '../screens/user/Home/CompanyProfile';


const Stack = createStackNavigator<RootStackParamList>();

export const AuthStack  = () => {    
  const [firstLaunch, setFirstLaunch] = useState(false);

  useEffect(() => {
      async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");
      if (appData === null) {
          setFirstLaunch(true);
          AsyncStorage.setItem("appLaunched", "false");
      } else {
          setFirstLaunch(false);
      }
      }
      setData();
  }, []);
  return(
      <Stack.Navigator initialRouteName='Login' screenOptions={({navigation}) => ({
          headerStyle: {
          backgroundColor: "rgb(242, 242, 242)",              
          },
          headerTitleAlign: "center",
          headerTintColor: "#2C6150",
          headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
              {/* Use chevron back icon */}
              <Ionicons name="chevron-back" size={24} color="black" style={{
              marginLeft: 12
              }} />
          </TouchableOpacity>
          )
      })}
      >          
          <Stack.Screen name="Login" component={Login} options={{
              headerLeft: () => null,
              headerShown: false,
          }} />
      </Stack.Navigator>
  )
}

export const AppNavigator = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    Toast.show({
      type: 'success',
      text1: 'Logged out',
      text2: 'You are logged out!',
    });
  };
    return(
      <Stack.Navigator screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <MaterialCommunityIcons name='exit-to-app' size={30}/>
          </TouchableOpacity>
        ),        
      }}>                  
        <Stack.Screen name="Dashboard" component={Dashboard} 
          options={{
              title: "Home",                
              headerLeft: () => (
                <Text style={{display: "none"}}></Text>
              ),
              headerTitleAlign: "left",
              headerTitleStyle: {
                padding: 8,
              },              
          }} 
        />            
        <Stack.Screen 
          name="CompanyProfile" 
          component={CompanyProfile}         
          options={({ route }) => ({ title: route?.params?.entrepriseNom })}            
        />
      </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 10,
  },
  logoutText: {
    color: '#007BFF',
    fontSize: 16,
  },
});