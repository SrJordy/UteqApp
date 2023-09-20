import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { stylesVisRevistas } from './Styles/Styles';

const NewsCard = ({ image, title, url, date, onButtonPress }) => {
  const formattedDate = moment(date).format('D MMM YYYY');

  const handleReadMore = useCallback(() => {
    if (onButtonPress) {
      onButtonPress();
    }
    Linking.openURL(url);
  }, [onButtonPress, url]);

  return (
    <View style={stylesVisRevistas.card}>
      <Image source={{ uri: image }} style={stylesVisRevistas.image} resizeMode="stretch" />
      <Text style={stylesVisRevistas.title}>{title}</Text>
      <Text style={stylesVisRevistas.date}>{formattedDate}</Text>
      <TouchableOpacity style={stylesVisRevistas.button} onPress={handleReadMore}>
        <Text style={stylesVisRevistas.buttonText}>
          <Icon name="book" size={20} color="#fff" /> Leer más
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ViewRevista = () => {
  const [revistas, setRevistas] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const authenticate = useCallback(() => {
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
  }, []);

  const fetchRevistaData = useCallback(() => {
    if (!accessToken) return;

    RNFetchBlob.config({
      trusty: true
    }).fetch('GET', 'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/6', {
      'Authorization': `Bearer ${accessToken}`
    })
    .then((response) => {
      setRevistas(JSON.parse(response.data));
    })
    .catch((error) => {
      console.error('Error al obtener las revistas:', error);
    });
  }, [accessToken]);

  const registerView = useCallback(async (nombre) => {
    try {
      console.log("Registrando vista de revista:", { seccion: "Revistas", nombre: nombre });
      await RNFetchBlob.config({
        trusty: true
      }).fetch('POST', 'https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/insert', {
        'Content-Type': 'application/json',
      }, JSON.stringify({
        seccion: "Revistas",
        nombre: nombre
      }));
    } catch (error) {
      console.error("Error registering view: ", error);
    }
  }, []);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  useEffect(() => {
    if (accessToken) {
      fetchRevistaData();
    }
  }, [accessToken, currentPage]);

  const paginatedRevistas = revistas.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const scrollViewRef = React.useRef(null);

  const handleLoadMore = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, []);

  const handleLoadPrevious = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, []);

  return (
    <View style={stylesVisRevistas.container}>
      <Text style={stylesVisRevistas.header}>Vista de Revistas</Text>
      <ScrollView ref={scrollViewRef}>
        {paginatedRevistas.map((revista) => (
          <NewsCard
            key={revista.anio + '-' + revista.mes}
            image={`https://uteq.edu.ec/assets/images/newspapers/${revista.urlportada}`}
            title={`Edición ${moment().month(revista.mes - 1).format('MMMM')} ${revista.anio}`}
            url={revista.urlpw}
            date={new Date(revista.anio, revista.mes - 1)}
            onButtonPress={() => registerView(`Edición ${moment().month(revista.mes - 1).format('MMMM')} ${revista.anio}`)}
          />
        ))}
    
      <View style={stylesVisRevistas.pagination}>
        <TouchableOpacity style={stylesVisRevistas.paginationButton} onPress={handleLoadPrevious} disabled={currentPage === 1}>
          <Text style={stylesVisRevistas.paginationButtonText}>Anterior</Text>
        </TouchableOpacity>
        <Text style={stylesVisRevistas.paginationText}>Página {currentPage}</Text>
        <TouchableOpacity style={stylesVisRevistas.paginationButton} onPress={handleLoadMore}>
          <Text style={stylesVisRevistas.paginationButtonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

export default ViewRevista;
