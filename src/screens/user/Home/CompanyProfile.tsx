import {Image,Text, Dimensions, StyleSheet, TouchableOpacity, View, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, geolocationListType } from '../../../model';
import { useGetAllEntrepriseQuery, useGetGeoLocationDataQuery } from '../../../../store/api/entreprise-api';
import { Loading } from '../../../components/UI/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import BottomSheet from '../../../components/BottomSheet';
import companyProfileData from '../../../../database/geolocation_data.json'
import AuthorProfile from '../../../components/AuthorProfile';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const { height, width } = Dimensions.get('window');


type CompanyProfileRouteProp = RouteProp<RootStackParamList, 'CompanyProfile'>;

const CompanyProfile = () => {
  const route = useRoute<CompanyProfileRouteProp>();
  const { entrepriseId, entrepriseNom, phone } = route.params;
  const [companyDetails, setCompanyDetails] = useState<geolocationListType>();  

  useEffect(() => {
    // Filter the data to get the company details by companyId
    const details = companyProfileData?.find((entreprise:geolocationListType) => entreprise.entrepriseId === entrepriseId);
    setCompanyDetails(details);
  }, [entrepriseId]);

  const CallButton = () => {
    const handlePress = () => {
      Linking.openURL(`tel:${phone}`);
    };
  }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: companyDetails?.photo }} style={styles.avatar} />
        <Text style={styles.name}>{entrepriseNom}</Text>
        <Text style={styles.location}>{companyDetails?.adresse}</Text>
      </View>
      <View style={styles.contactButtons}>
        <TouchableOpacity style={styles.button}>
          <FontAwesomeIcon name="phone" color="#fff" />
          <Text style={styles.buttonText}>CALL US</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.mailButton]}>
          <FontAwesomeIcon name="envelope" color="#fff" />
          <Text style={styles.buttonText}>MAIL US</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menu}>
        <View style={styles.menuItem}>
          <FontAwesomeIcon name="map-marker" color="#000" />
          <Text style={styles.menuText}>{companyDetails?.adresse}</Text>
        </View>                        
        <View style={styles.menuItem}>
          <FontAwesomeIcon name="book" color="#000" />
          <Text style={styles.menuText}>{phone}</Text>
        </View>        
        <View style={styles.menuItem}>
          <FontAwesomeIcon name="info" color="#000" />
          <Text style={styles.menuText}>{companyDetails?.commentaire}</Text>
        </View>
        <View style={styles.menuItem}>
          <FontAwesomeIcon name="question-circle" color="#000" />
          <Text style={styles.menuText}>FAQ</Text>
        </View>        
      </View>
    </View>
    </SafeAreaView>
  )
}

export default CompanyProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  location: {
    fontSize: 16,
    color: '#888'
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  mailButton: {
    backgroundColor: '#d9534f'
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10
  },
  menu: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  menuText: {
    marginLeft: 20,
    fontSize: 16
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center'
  },
  signOutText: {
    color: '#fff',
    marginRight: 10,
    fontSize: 16
  }
});