import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking, RefreshControl, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import 'moment/locale/es'; 
moment.locale('es');

import { stylesVisContenidos } from './Styles/Styles';
import axios from 'axios';

const YoutubeCard = () => {
  const [Youtube, setYoutube] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;  // Ajusta según la necesidad

  const authenticate = async () => {
    try {
      const response = await RNFetchBlob.config({ trusty: true }).fetch('POST', 'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/api/auth/signin', {
        'Content-Type': 'application/json',
      }, JSON.stringify({
        username: '_x1userdev',
        password: 'LineGold179#5ft2'
      }));
      
      const accessToken = JSON.parse(response.data).accessToken;
      setAccessToken(accessToken);
    } catch (error) {
      console.error('Error al autenticarse:', error);
    }
  };

  const fetchYoutube = useCallback(async () => {
    if (!accessToken) return;

    try {
      setIsLoading(true);
      const response = await RNFetchBlob.config({ trusty: true }).fetch('GET', 'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/4', {
        'Authorization': `Bearer ${accessToken}`
      });

      const data = JSON.parse(response.data);
      setYoutube(data.slice((currentPage - 1) * pageSize, currentPage * pageSize));
      setIsLoading(false);
    } catch (error) {
      console.error('Error al obtener las revistas:', error);
      setIsLoading(false);
    }
  });

  const registerView = async (nombre) => {
    try {
      console.log("Registrando vista de revista:", { seccion: "Continedo", nombre: nombre });
      await RNFetchBlob.config({
        trusty: true
      }).fetch('POST', 'https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/insert', {
        'Content-Type': 'application/json',
      }, JSON.stringify({
        seccion: "Continedo",
        nombre: nombre
      }));
    } catch (error) {
      console.error("Error registering view: ", error);
    }
  };

  const handleReadMore = (link) => {
    Linking.openURL(link);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleLoadPrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchYoutube();
    } // Limpia el intervalo cuando el componente se desmonte
  }, [accessToken, currentPage]);

  return (
    <View style={stylesVisContenidos.container}>
      <Text style={stylesVisContenidos.header}>Vista de Resumenes semanales</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#46741e" />
      ) : (
        <ScrollView
          contentContainerStyle={stylesVisContenidos.contentContainer}
        >
          {Youtube.map((youtu) => (
            <View key={youtu.fechapub} style={stylesVisContenidos.card}>
              <View style={stylesVisContenidos.logoContainer}>
                <Text numberOfLines={2} ellipsizeMode="tail" style={stylesVisContenidos.title}>{youtu.titulo}</Text>
                <Image source={{ uri: `https://uteq.edu.ec/assets/images/videos/res-sem/${youtu.portadaVideo}` }} style={stylesVisContenidos.logoResumen} />
              </View>
              <View>
                <Text style={stylesVisContenidos.fecha}>{moment(youtu.fechapub).format('LL')}</Text>
              </View>
              <TouchableOpacity style={stylesVisContenidos.button} onPress={() => {
                handleReadMore(youtu.urlvideo1);
                registerView(youtu.titulo);
              }}>
                <Icon name="external-link" size={20} color="white" />
                <Text style={stylesVisContenidos.buttonText}>Ver contenido</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={stylesVisContenidos.pagination}>
            <TouchableOpacity style={stylesVisContenidos.paginationButton} onPress={handleLoadPrevious} disabled={currentPage === 1}>
              <Text style={stylesVisContenidos.paginationButtonText}>Anterior</Text>
            </TouchableOpacity>
            <Text style={stylesVisContenidos.paginationText}>Página {currentPage}</Text>
            <TouchableOpacity style={stylesVisContenidos.paginationButton} onPress={handleLoadMore}>
              <Text style={stylesVisContenidos.paginationButtonText}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default YoutubeCard;
