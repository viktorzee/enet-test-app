import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import jsonData from '../../../../database/geolocation_data.json'

import { useAppSelector } from '../../../../store/store/hooks';
import { AuthUser } from '../../../../store/features/userSlice';
import { useGetAllEntrepriseQuery } from '../../../../store/api/entreprise-api';
import { Entreprise, geolocationListType } from '../../../model';

import { Loading } from '../../../components/UI/Loading';
import WelcomeUser from '../../../components/WelcomeUser';
import ListView from '../../../components/dashboard/ListView';
import CompanyMapView from '../../../components/dashboard/MapView';

const { width, height } = Dimensions.get('window');

const Dashboard = () => {
  const user = useAppSelector(AuthUser);
  const {data: companiesData, isLoading, error } = useGetAllEntrepriseQuery();
  const companies = companiesData?._embedded?.entrepriseDTOModelList
  const [showMapView, setShowMapView] = useState<boolean>(false);
  const [combinedData, setCombinedData] = useState< (geolocationListType & Entreprise)[] >([]);
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    if (companiesData) {      
      const jsonDataArray: geolocationListType[] = jsonData;
      
      //combine the geolocation data based on the companyId to the data from api
      if (companies && jsonDataArray) {
        const combined = companies.map(entreprise => {
          const additionalInfo = jsonDataArray.find(item => item.entrepriseId === entreprise.id);
          return {
            ...entreprise,
            ...additionalInfo,
          };
        }) as (geolocationListType & Entreprise)[];
        setCombinedData(combined);
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
        {!showMapView ? (
          <CompanyMapView data={combinedData} />
        ): (
          <ListView data={companies} />
        )}
        <TouchableOpacity style={styles.switchButton} onPress={handleChangeViewToggle}>
          {!showMapView ? (
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
    flex: 1,
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
    width: width * 0.2,
    height: width * 0.2,
    position: 'absolute',
    top: height * 0.7,
    right: width * 0.05,
    backgroundColor: '#fff',
    borderRadius: (width * 0.2) / 2, 
  },
})