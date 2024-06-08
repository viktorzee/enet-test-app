import React from 'react';
import {View, ActivityIndicator} from 'react-native';

interface LoadingProps {
  color?: string
}

export const Loading = ({color}:LoadingProps) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',        
      }}>
      <ActivityIndicator color={'white' || color} animating={true} size="large" />
    </View>
  );
};