import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'

import { Entreprise, RootStackParamList, geolocationListType } from '../../model'

interface DMapViewProps {
  data: (geolocationListType & Entreprise)[];
}
type CompanyListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CompanyProfile'>;

const { height, width } = Dimensions.get('window');

const CompanyMapView = ({ data }: DMapViewProps) => {
  const navigation = useNavigation<CompanyListScreenNavigationProp>();

  const handleViewProfile = (id: number, name: string, phone: string) => {
    navigation.navigate('CompanyProfile', { entrepriseId: id, entrepriseNom: name,phone });
  };
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
        provider={PROVIDER_GOOGLE}
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
            <Callout onPress={() =>  { handleViewProfile(item.id, item.nom, item.phone) }}>
              <View>
                <Text style={{fontWeight: "600"}}>{item.nom}</Text>
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

export default CompanyMapView

const styles = StyleSheet.create({
  map: {
    width,
    height,
  },
})