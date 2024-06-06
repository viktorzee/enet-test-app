import React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';

type AuthorProfileProps = {
  nom: string | undefined;
  adresse: string | undefined;
  date: string | undefined;
  comment: string | undefined;
  interlocuteurNom: string | undefined;
  interlocuteurEmail: string | undefined;
  interlocuteurPhone: string | undefined;
};

const AuthorProfile = ({
  nom,
  adresse,
  date,
  comment,
  interlocuteurNom,
  interlocuteurEmail,
  interlocuteurPhone,
}:AuthorProfileProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.figCaption}>
        <Text><Text style={{color: 'black'}}>Name:</Text> {nom}</Text>
        <Text><Text style={{color: 'black'}}>Adresse:</Text> {adresse}</Text>
        <Text><Text style={{color: 'black'}}>Date:</Text> {date}</Text>
        <Text><Text style={{color: 'black'}}>Commentaire:</Text> {comment}</Text>
        <Text><Text style={{color: 'black'}}>Interlocuteur Name: </Text>{interlocuteurNom}</Text>
        <Text><Text style={{color: 'black'}}>Interlocuteur Email: </Text>{interlocuteurEmail}</Text>
        <Text><Text style={{color: 'black'}}>Interlocuteur Phone: </Text>{interlocuteurPhone}</Text>
      </View>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",    
    marginBottom: 40,
  },
  figCaption: {
    marginTop: 2,
  },
});

export default AuthorProfile;
