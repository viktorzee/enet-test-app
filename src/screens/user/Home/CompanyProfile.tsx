import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../store/store/hooks'
import { AuthUser } from '../../../../store/features/userSlice'
import { RouteProp, useRoute } from '@react-navigation/native';
import { Embedded, Entreprise, RootStackParamList, geolocationListType } from '../../../model';
import { useGetAllEntrepriseQuery, useGetGeoLocationDataQuery } from '../../../../store/api/entreprise-api';
import { Loading } from '../../../components/UI/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from '../../../components/BottomSheet';
import companyProfileData from '../../../../database/geolocation_data.json'
import AuthorProfile from '../../../components/AuthorProfile';


type CompanyProfileRouteProp = RouteProp<RootStackParamList, 'CompanyProfile'>;

const CompanyProfile = () => {
  const route = useRoute<CompanyProfileRouteProp>();
  const { entrepriseId, entrepriseNom } = route.params;
  const [companyDetails, setCompanyDetails] = useState<geolocationListType>();  
  const [visible, setVisible] = useState(false);

  const handleMarkerPress = () => {
    setVisible(true);
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  useEffect(() => {
    // Filter the data to get the company details by companyId
    const details = companyProfileData?.find((entreprise:geolocationListType) => entreprise.entrepriseId === entrepriseId);
    setCompanyDetails(details);
  }, [entrepriseId]);

  // const handleMarkerPress = () => {
  //   setIsDrawerOpen(true);
  // };
  

  return (
    <SafeAreaView>
      <View>
        {/* <MapView 
          style={styles.map} 
          region={{ latitude: 5.35995170, longitude: -4.00825630, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          showsUserLocation={true}
        >
          <Marker coordinate={{
            latitude: 5.35,
            longitude: -3.96667,
          }}  />
        </MapView> */}
        
        <MapView 
            style={styles.map}
            initialRegion={{ 
              latitude: companyDetails?.latitude as number, 
              longitude: companyDetails?.longitude as number, 
              latitudeDelta: 0.015922,
              longitudeDelta: 0.015421, 
            }}
            showsUserLocation={true}
            // initialRegion={}
            showsCompass
            showsPointsOfInterest={false}
            loadingEnabled={true}

          >
          <Marker
            coordinate={{ 
              latitude: companyDetails?.latitude as number,
              longitude: companyDetails?.longitude as number,
            }}
            
            onPress={handleMarkerPress}
          />
        </MapView>
        {
          visible && (
            <BottomSheet visible={visible} onDismiss={handleDismiss}>
              <View style={styles.detailContainer}>
                <View>
                  <AuthorProfile 
                    photo={companyDetails?.photo}
                    adresse={companyDetails?.adresse}
                    comment={companyDetails?.commentaire}
                    interlocuteurEmail={companyDetails?.interlocuteurEmail}
                    interlocuteurNom={companyDetails?.interlocuteurNom}
                    interlocuteurPhone={companyDetails?.interlocuteurPhone}
                    date={companyDetails?.laDate}
                    nom={entrepriseNom}
                  />
                </View>              
              </View>
            </BottomSheet>
          )
        }
      </View>
    </SafeAreaView>
  )
}

export default CompanyProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: "100%",
    height: '100%',
  },
  detailContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  fir_image_figure: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    marginBottom: 40,
    position: "relative",
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  address: {
    fontSize: 14,
    marginVertical: 5,
  },
  comment: {
    fontSize: 14,
    marginVertical: 5,
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
})