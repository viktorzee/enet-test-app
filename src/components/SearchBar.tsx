import { StyleSheet, View } from 'react-native'
import React from 'react'
import Input from './Input';


interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (text: string) => void
}

const SearchBar = ({searchQuery, setSearchQuery}:SearchBarProps) => {
  const handleSearch = (text: string) => {
    setSearchQuery(text)
  }

  return (
    <View style={styles.container}>
      <Input 
        style={styles.searchBar}
        placeholder="Rechercher des entreprises"
        value={searchQuery}
        onChangeText={handleSearch}
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    // borderRadius: 
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 10,
  },
})