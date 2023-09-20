import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;






export const BotonEstadisticas = ({ onPress, usuarioTipo }) => {
  return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
      <Ionicons name="md-analytics" size={60} color="#46741e" />
      <Text style={styles.titulo}>Estadísticas</Text>
    </TouchableOpacity>
  );
};

export const BotonSGA = ({ onPress, usuarioTipo }) => {

  if(usuarioTipo==='invitado'){
    return;
  }
  return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
    <FontAwesome name="university" size={60} color="#46741e" />
      <Text style={styles.titulo}>SGA</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {

    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f5f6fa',
  },
  titulo: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});