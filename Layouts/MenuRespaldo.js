import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Text, TouchableOpacity } from 'react-native';

import {BotonEstadisticas
  , BotonSGA
 
} from './Components/cardsmenu';
import { useNavigation } from "@react-navigation/native";
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Linking } from 'react-native';
import { stylesMenuR } from './Styles/Styles'


const { width } = Dimensions.get('window');

const MenuComple = () => {
  const { user } = useContext(AuthContext);
  const cardWidthMenu = (width - 70) / 2;

  const [isSectionGeneralVisible, setSectionGeneralVisible] = useState(false);
  const navigation = useNavigation();

  let userTipo = null; // Valor inicial si el usuario no está autenticado

  if (user) {
    userTipo = user.rol;
  }

  
  const handleCardPress = () => {
    navigation.navigate("Estadisticas");
  };
  const handleAbrirSga = () => {
    Linking.openURL('https://sga.uteq.edu.ec/loginsga?ret=/')
  };


  const toggleSectionGeneral = () => {
    setSectionGeneralVisible(prevState => !prevState);
  };

  return (
    <ScrollView contentContainerStyle={stylesMenuR.container}>
    <View style={stylesMenuR.header}>
      <Text style={stylesMenuR.headerText}>Menú</Text>
    </View>

 
    <View>
      <TouchableOpacity onPress={toggleSectionGeneral}>
        <Text style={stylesMenuR.sectionHeader}>Sección General</Text>
      </TouchableOpacity>
      {isSectionGeneralVisible && (
        <View style={stylesMenuR.column}>
           <View style={stylesMenuR.cardContainer}>
            <BotonEstadisticas onPress={handleCardPress} usuarioTipo={userTipo} />
          </View>
          <View style={stylesMenuR.cardContainer}>
            <BotonSGA onPress={handleAbrirSga} usuarioTipo={userTipo} />
          </View>
          
        </View>
      )}
    </View>

    </ScrollView>
  );
};

export default MenuComple;
