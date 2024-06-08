import React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';


type AuthorProfileProps = {
  nom: string | undefined;
  adresse: string | undefined;
  date: string | undefined;
  commentaire: string | undefined;
  interlocuteurNom?: string | undefined;
  interlocuteurEmail?: string | undefined;
  interlocuteurPhone?: string | undefined;
};

const AuthorProfile = ({
  nom,
  adresse,
  commentaire,
  interlocuteurPhone
}:AuthorProfileProps) => {
  return (
    <View style={styles.menu}>
        <View style={styles.menuItem}>
          <FontAwesomeIcon name="map-marker" color="#000" size={20} />
          <Text style={styles.menuText}>{adresse}</Text>
        </View>                        
        <View style={styles.menuItem}>
          <FontAwesomeIcon name="phone" color="#000" size={20} />
          <Text style={styles.menuText}>{interlocuteurPhone}</Text>
        </View>        
        <View style={styles.menuItem}>
          <Ionicon name="chatbubbles-outline" color="#000" size={20} />
          <Text style={styles.menuText}>{commentaire}</Text>
        </View>
        <View style={styles.menuItem}>
          <FontAwesomeIcon name="question-circle" color="#000" size={20} />
          <Text style={styles.menuText}>FAQ</Text>
        </View>        
      </View>
  )
};


const styles = StyleSheet.create({
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
});

export default AuthorProfile;
