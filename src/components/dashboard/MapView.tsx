import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { Embedded, Entreprise, geolocationListType } from '../../model'

interface DMapViewProps {
  data: (geolocationListType & Entreprise)[];
}

const { height, width } = Dimensions.get('window');

const DMapView = ({ data }: DMapViewProps) => {
  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.783363,
          longitude: -122.403908,
          latitudeDelta: 0.015922,
          longitudeDelta: 0.015421,
        }}
      >
        {data.map((item, index) => (
          <Marker
            key={index}
            title={item.nom}
            description={item.adresse}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
          >
            <Callout>
              <View>
                <Text>{item.nom}</Text>
                {item.adresse && <Text>{item.commentaire}</Text>}
                {item.phone && <Text>{item.phone}</Text>}
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default DMapView

const styles = StyleSheet.create({
  map: {
    width,
    height,
  },
})