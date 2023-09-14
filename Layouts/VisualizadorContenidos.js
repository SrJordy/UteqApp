import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, RefreshControl, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import 'moment/locale/es'; 
moment.locale('es');

import { stylesVisContenidos } from './Styles/Styles'; // Ajusta la ruta si es necesario


const ContentCard = () => {
  const [Tiktoks, setTiktoks] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Establece el número de elementos por página

 

  const authenticate = () => {
    RNFetchBlob.config({
      trusty: true
    }).fetch('POST', 'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/api/auth/signin', {
      'Content-Type': 'application/json',
    }, JSON.stringify({
      username: '_x1userdev',
      password: 'LineGold179#5ft2'
    }))
    .then((response) => {
      const accessToken = JSON.parse(response.data).accessToken;
      setAccessToken(accessToken);
    })
    .catch((error) => {
      console.error('Error al autenticarse:', error);
    });
  };

  const fetchTiktoks = useCallback(() => {
    if (!accessToken) return;

    RNFetchBlob.config({
      trusty: true
    }).fetch('GET', 'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/11', {
      'Authorization': `Bearer ${accessToken}`
    })
    .then((response) => {
      setTiktoks(JSON.parse(response.data));
    })
    .catch((error) => {
      console.error('Error al obtener las revistas:', error);
    });
  }, [accessToken, currentPage]);


  const paginatedTiktoks = Tiktoks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const scrollViewRef = React.useRef(null);

  const handleLoadMore = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, []);

  const handleLoadPrevious = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, []);


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

  useEffect(() => {
    authenticate();
  }, []);

 useEffect(() => {
    if (accessToken) {
      fetchTiktoks();
    }
  }, [accessToken, currentPage]);


  const handleReadMore = (link) => {
    Linking.openURL(link);
  };

  return (
    <View style={stylesVisContenidos.container}>
      <Text style={stylesVisContenidos.header}>Vista de contenido</Text>
      
      <ScrollView ref={scrollViewRef} contentContainerStyle={stylesVisContenidos.scrollViewContainer}>
        {
          paginatedTiktoks.map((tiks) => (
            <View key={tiks.titulo} style={stylesVisContenidos.card}>
              <View style={stylesVisContenidos.logoContainer}>
                <Text numberOfLines={2} ellipsizeMode="tail" style={stylesVisContenidos.title}>{tiks.titulo}</Text>
                <Image source={{ uri:'https://www.uteq.edu.ec/assets/img/portada-tiktok-video.jpg' }} style={stylesVisContenidos.logo} />
              </View>
              <View>
                <Text style={stylesVisContenidos.fecha}>{moment(tiks.fechapub).format('LL')}</Text>
              </View>
              <TouchableOpacity style={stylesVisContenidos.button} onPress={() => {
                handleReadMore(tiks.urlvideo1);
                registerView(tiks.titulo);
              }}>
                <Icon name="external-link" size={20} color="white" />
                <Text style={stylesVisContenidos.buttonText}>Ver contenido</Text>
              </TouchableOpacity>
            </View>
          ))
        }
         <View style={stylesVisContenidos.pagination}>
        <TouchableOpacity style={stylesVisContenidos.paginationButton} onPress={handleLoadPrevious} disabled={currentPage === 1}>
          <Text style={stylesVisContenidos.paginationButtonText}>Anterior</Text>
        </TouchableOpacity>
        <Text style={stylesVisContenidos.paginationText}>Página {currentPage}</Text>
        <TouchableOpacity style={stylesVisContenidos.paginationButton} onPress={handleLoadMore} disabled={currentPage * pageSize >= Tiktoks.length}>
          <Text style={stylesVisContenidos.paginationButtonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
  
     
    </View>
  );
  
};

export default ContentCard;
