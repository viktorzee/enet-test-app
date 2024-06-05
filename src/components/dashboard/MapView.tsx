import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { Embedded, Entreprise, geolocationListType } from '../../model'

interface DMapViewProps {
  data: geolocationListType[]
}

const DMapView = ({data}: DMapViewProps) => {

  const calculateInitialRegion = (data: geolocationListType[]): Region => {
    const validData = data.filter(item => item.latitude !== undefined && item.longitude !== undefined);
    if (validData.length === 0) {
      return {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }

    const latitudeSum = validData.reduce((sum, item) => sum + item.latitude, 0);
    const longitudeSum = validData.reduce((sum, item) => sum + item.longitude, 0);
    
    const latitude = latitudeSum / validData.length;
    const longitude = longitudeSum / validData.length;
  
    const latitudeDelta = 0.0922;
    const longitudeDelta = 0.0421;
  
    return {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };
  };

  const initialRegion = calculateInitialRegion(data);


  return (
    <View>
      <MapView style={styles.map} 
        initialRegion={{
          latitude: 37.784738, 
          longitude: -122.402839,
          latitudeDelta: 0.015922,
          longitudeDelta: 0.015421, 
        }}
        provider={PROVIDER_GOOGLE}
      />
          
  </View>
  )
}

export default DMapView

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})