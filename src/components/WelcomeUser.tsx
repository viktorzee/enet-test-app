import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface WelomeUserProps {
  userName: string;
}

const WelcomeUser = ({ userName }: WelomeUserProps) => {
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = 'Bonjour';
  } else if (currentHour < 18) {
    greeting = 'Bon après-midi';
  } else {
    greeting = 'Bonne soirée';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>{`${greeting}, ${userName}`}</Text>
    </View>
  )
}

export default WelcomeUser

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
    // alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});