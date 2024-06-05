import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

type AuthorProfileProps = {
  nom: string | undefined;
  photo?: string | undefined;
  adresse: string | undefined;
  date: string | undefined;
  comment: string | undefined;
  interlocuteurNom: string | undefined;
  interlocuteurEmail: string | undefined;
  interlocuteurPhone: string | undefined;
  // profileLink: string | undefined;
};

const AuthorProfile:React.FC<AuthorProfileProps> = ({
  nom,
  photo,
  adresse,
  date,
  comment,
  interlocuteurNom,
  interlocuteurEmail,
  interlocuteurPhone,
  // profileLink
}) => {
  return (
    <View style={styles.container}>
    <View style={styles.figCaption}>
      <Text style={styles.figTitle}><Text style={{color: 'black'}}>Name:</Text> {nom}</Text>
      <Text style={styles.figTitle}><Text style={{color: 'black'}}>Adresse:</Text> {adresse}</Text>
      <Text style={styles.figTitle}><Text style={{color: 'black'}}>Date:</Text> {date}</Text>
      <Text style={styles.figTitle}><Text style={{color: 'black'}}>Commentaire:</Text> {comment}</Text>
      <Text style={styles.figTitle}><Text style={{color: 'black'}}>Interlocuteur Name: </Text>{interlocuteurNom}</Text>
      <Text style={styles.figTitle}><Text style={{color: 'black'}}>Interlocuteur Email: </Text>{interlocuteurEmail}</Text>
      <Text style={styles.figTitle}><Text style={{color: 'black'}}>Interlocuteur Phone: </Text>{interlocuteurPhone}</Text>
    </View>
  </View>
  )
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: "row",
    // justifyContent: 'center',
    // minHeight: '100%',
    marginBottom: 40,
  },
  authorImage: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  figCaption: {
    // paddingLeft: 15,
    marginTop: 2,
  },
  figTitle: {
    color: 'rgba(0, 0, 0, 0.40)',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default AuthorProfile;
