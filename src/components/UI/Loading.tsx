import React from 'react';
import {View, ActivityIndicator} from 'react-native';

export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',        
      }}>
      <ActivityIndicator color={'white'} animating={true} size="large" />
    </View>
  );
};