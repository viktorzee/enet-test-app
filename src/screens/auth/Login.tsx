import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../model';
import { useAppDispatch } from '../../../store/store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { login } from '../../../store/features/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../components/Input';
import { Colors } from '../../constants/Colors';
import { Loading } from '../../components/UI/Loading';
import Button from '../../components/UI/Button';
import Toast from 'react-native-toast-message';


interface LoginProp {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

const { width } = Dimensions.get('window');
const iconRightMargin = 10;

const Login:React.FC<LoginProp> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = yup.object().shape({    
    email: yup.string().required('l\'e-mail est requis'),
    password: yup.string().required('Mot de passe requis'),
  });
  const initialValues= {
    email: "",
    password: ""
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeHeaderText}>Content de voir que tu es de retour!</Text>
          <Text>Veuillez vous connecter à votre compte</Text>
        </View>
        {errorMessage && (
          <View style={styles.errorMessageView}>
            <FeatherIcon name='info' color="red" size={16} />
            <Text style={styles.loginErrorMessage}>{errorMessage}</Text>
          </View>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={async (values) => {
            setIsLoading(true);
            setErrorMessage("");
            try {
              const login_response = await dispatch(login(values)).unwrap();
              if (login_response) {
                const token = login_response.token;
                AsyncStorage.setItem('token', token);
                Toast.show({
                  type: 'success',
                  text1: 'Login Successful',
                  text2: 'You are logged in!',
                });
                navigation.navigate("Dashboard")
              } else {
                AsyncStorage.clear();
              }
            } catch (error) {
              setErrorMessage(error as any)
            } finally {
              setIsLoading(false)
            }
            
          }}
        >
          {({ handleBlur, handleChange, handleSubmit, values, errors, isSubmitting }) => (
            <>
              <View>
                <Input 
                  accessibilityLabel='Email'
                  onChangeText={handleChange('email')}
                  value={values.email}
                  keyboardType='email-address'
                  placeholder='johndoe@example.com'
                  placeholderTextColor={Colors.placeholderText}
                />
                { errors.email && <Text style={styles.errorMessage}>{errors.email.toString()}</Text> }

                <View>
                  <Input 
                    accessibilityLabel='Password'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    keyboardType='default'
                    secureTextEntry={!showPassword}
                    placeholder='********'
                    placeholderTextColor={Colors.placeholderText}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility} style={[styles.icon, { right: width * 0.02 + iconRightMargin }]}>
                    <FeatherIcon name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
                </TouchableOpacity>
                </View>
                {
                  errors.password && <Text style={styles.errorMessage}>{errors.password.toString()}</Text>
                }
              <View>
                <View style={styles.buttonContainer}>
                  

                    
                    <Button
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                      style={styles.button}
                    >
                      { isLoading ? (
                        <View style={{ alignItems: 'center', marginTop: 10 }}>
                          <Loading />                       
                        </View>) : "Login" }
                    </Button>
                </View>
              </View>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    ...Platform.select({
      ios: {
        padding: 16,
      }
    })
  },
  welcomeTextContainer: {
    marginTop: 50,
    marginBottom: 40
  },
  welcomeHeaderText: {
    fontSize: 15,
    fontWeight: '600',
  },
  errorMessageView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  loginErrorMessage: {
    textAlign: "center",
    color: "red",
    marginLeft: 8,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 5, 
  },
  buttonContainer: {
    marginTop: 25,
    justifyContent: "center"
  },
  button:{
    width: "70%",
    marginLeft: 40,
    backgroundColor: "#2C6250",
    elevation: 2,
  },
  textButton: {
    color: Colors.grey10,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
  },
  icon: {
    position: 'absolute',   
    top: "45%",
  },
})