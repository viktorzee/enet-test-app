import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../model';
import { useNavigation } from '@react-navigation/native';

// type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;


export const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<
  {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  },
  unknown,
  unknown
> => async ({ url, method, data, params }) => {
  // const navigation = useNavigation<LoginScreenNavigationProp>()
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      return { error: { status: 401, data: 'Unauthorized' } };
    }
    
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const requestConfig: AxiosRequestConfig = {
      url: baseUrl + url,
      method,
      data,
      params,
      headers,
    };

    const result = await axios(requestConfig);
    return { data: result.data };
  } catch (axiosError) {
    console.error('Axios Error:', axiosError);

    const err = axiosError as AxiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};
