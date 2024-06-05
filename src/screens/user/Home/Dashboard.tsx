import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import jsonData from '../../../../database/geolocation_data.json'

import { useAppSelector } from '../../../../store/store/hooks';
import { AuthUser } from '../../../../store/features/userSlice';
import { useGetAllEntrepriseQuery } from '../../../../store/api/entreprise-api';
import { Embedded, Entreprise, entrepriseListType, geolocationListType } from '../../../model';

import { Loading } from '../../../components/UI/Loading';
import WelcomeUser from '../../../components/WelcomeUser';
import ListView from '../../../components/dashboard/ListView';
import DMapView from '../../../components/dashboard/MapView';
import MapView, { Marker } from 'react-native-maps';

const staticData = [
  { coordinates: { latitude: 37.78383, longitude: -122.405766 } },
  { coordinates: { latitude: 37.78584, longitude: -122.405478 } },
  { coordinates: { latitude: 37.784738, longitude: -122.402839 } },
];

const Dashboard = () => {
  const user = useAppSelector(AuthUser);
  const {data: companiesData, isLoading, error } = useGetAllEntrepriseQuery();
  const companies = companiesData?._embedded?.entrepriseDTOModelList
  const [showMapView, setShowMapView] = useState<boolean>(false);
  const [combinedData, setCombinedData] = useState([]);
  

  useEffect(() => {
    if (companiesData) {      
      const jsonDataArray: geolocationListType[] = jsonData;
  
      if (companies && jsonDataArray) {
        const combined = companies.map(entreprise => {
          const additionalInfo = jsonDataArray.find(item => item.entrepriseId === entreprise.id);
          return {
            ...entreprise,
            ...additionalInfo,
          };
        });
        setCombinedData(combined as any);
      }
    }
  }, [companiesData]);
  


  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        {/* return loading if api fetch is on */}
        <Loading />      
      </View>
    );
  }

  if (error) {
    console.log(error, "Error")
    return (
      <View style={styles.errorContainer}>
        {/* If there is an error, put a ui friendly user response*/}
        <Text style={styles.errorMessage}>Échec du chargement des données. Veuillez réessayer plus tard.</Text>        
      </View>
    );
  }

  const handleChangeViewToggle = () => {
    setShowMapView(!showMapView);
  }

  return (
    <SafeAreaView style={styles.container}>       
      {user ? ( <WelcomeUser userName={user?.nom} /> ) : ""}
      <View>
        {showMapView ? (
          <MapView
          style={{
            // ...StyleSheet.absoluteFillObject,
            flex: 1,
            height: 500,
            width: 500
          }}
          initialRegion={{
            latitude: 37.783363,
            longitude: -122.403908,
            latitudeDelta: 0.015922,
            longitudeDelta: 0.015421,
          }}
        >
          {staticData.map((item, index) => (
            <Marker key={index} title="Test" coordinate={item.coordinates} />
          ))}
        </MapView>
        ): (
          <ListView data={companies} />
        )}
        <TouchableOpacity style={styles.switchButton} onPress={handleChangeViewToggle}>
          {showMapView ? (
            <FontAwesomeIcon name='list' size={24} />
          ): (
            <FontAwesomeIcon name='map-marked-alt' size={24}  />
          )}  
        </TouchableOpacity>
      </View>
    </SafeAreaView> 
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  switchButton: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:70,
    position: 'absolute',                                          
    top: 500,                                                    
    right: 10,
    height:70,
    backgroundColor:'#fff',
    borderRadius:100,
  },
})