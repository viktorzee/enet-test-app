import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { Entreprise, RootStackParamList } from '../../model'
import SearchBar from '../SearchBar';
import CompanyItem from '../CompanyItem';


interface ListViewProps {
  data: Entreprise[] |undefined;
}

type CompanyListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CompanyProfile'>;

const ListView = ({data}: ListViewProps) => {
  const navigation = useNavigation<CompanyListScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCompanies,  setFilteredCompanies] = useState(data);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filteredData = data?.filter(item => item.nom.toLowerCase().includes(text.toLowerCase()));
    setFilteredCompanies(filteredData);
  };

  const handleViewProfile = (id: number, name: string, phone: string) => {
    navigation.navigate('CompanyProfile', { entrepriseId: id, entrepriseNom: name,phone });
  };

  return (
    <View>
      <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearch} />
        {filteredCompanies?.length === 0 && (
          <View style={styles.noResultContainer}>
            <Text style={{color: 'red'}}>No result found</Text>
          </View>
        )}

{
          data && data.length > 0 ? (
            <FlatList
              data={filteredCompanies ?? data}
              keyExtractor={item => item?.id.toString()}             
              renderItem={({ item }) => (
              <CompanyItem
                name={item.nom}
                phone={item.phone}
                icon={item.logo}
                onPress={() => { handleViewProfile(item.id, item.nom, item.phone) }}
              />
            )}
          />

          ) : (
            <Text>No companies found.</Text>
          )

        }  
    </View>
  )
}

export default ListView

const styles = StyleSheet.create({
  // container: {
  //   flex: 1
  // },
  noResultContainer: {
    alignItems: 'center',
    marginVertical: 10,
    color: 'red'
  },
})