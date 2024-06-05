import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface CompanyItemProps {
  name: string;
  phone: string;
  icon: any;
  onPress: () => void;
}

const CompanyItem: React.FC<CompanyItemProps> = ({ name, phone, icon, onPress }) => {
  const defaultLogo = require("../../assets/entreprise_default.jpg")
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
      <Image source={icon || defaultLogo} style={styles.icon} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  buttonText: {
    color: '#007bff',
    fontSize: 14,
  },
});

export default CompanyItem;
