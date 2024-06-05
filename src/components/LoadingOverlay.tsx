import React from 'react';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

const LoadingOverlay = () => {
  return (
    <SpinnerOverlay
      visible={true}
      color="#2C6150" 
      textContent={'Loading...'}
      textStyle={{ color: '#2C6150' }}
      cancelable={true}
    />
  );
};

export default LoadingOverlay;
