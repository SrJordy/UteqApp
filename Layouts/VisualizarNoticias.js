import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking, ActivityIndicator } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { stylesVisNotices } from './Styles/Styles';
import { AuthContext } from './AuthContext';
import { FontAwesome5 } from '@expo/vector-icons';

const NewsCard = ({ image, title, date, url, category, onButtonPress }) => {
  const handleReadMore = () => {
    if (onButtonPress) {
      onButtonPress();
    }
    Linking.openURL(url);
  };
  return (
    <View style={stylesVisNotices.card}>
      <Image source={{ uri: image }} style={stylesVisNotices.image} />
      <Text style={stylesVisNotices.title}>{String(title)}</Text>
      <Text style={stylesVisNotices.category}>{String(category)}</Text>
      <Text style={stylesVisNotices.date}>{formatDate(date)}</Text>
      <TouchableOpacity style={stylesVisNotices.button} onPress={handleReadMore}>
        <View style={stylesVisNotices.buttonContent}>
          <FontAwesome5 name="hand-point-right" size={20} color="#fff" style={{ marginRight: 10 }} />
          <Text style={stylesVisNotices.buttonText}>Ver más</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return formattedDate;
};
const ViewNoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const { user } = useContext(AuthContext);
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

 

  const authenticate = useCallback(async () => {
    try {
      const response = await RNFetchBlob.config({
        trusty: true,
      }).fetch(
        'POST',
        'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/api/auth/signin',
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify({
          username: '_x1userdev',
          password: 'LineGold179#5ft2',
        }),
      );
  
      const data = JSON.parse(response.data);
      setAccessToken(data.accessToken);
    } catch (error) {
      console.error('Error al autenticarse:', error);
    }
  }, []);

  const fetchNotiData = useCallback(async () => {
    if (!accessToken) return;

    try {
      setIsLoading(true);

      // Obtener noticias del entity 2
      const response = await RNFetchBlob.config({
        trusty: true,
      }).fetch(
        'GET',
        'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/2',
        {
          Authorization: `Bearer ${accessToken}`,
        },
      );

      const dataEntity2 = JSON.parse(response.data);

      // Obtener noticias del entity 7 para filtrarlas
      const responseEntity7 = await RNFetchBlob.config({
        trusty: true,
      }).fetch(
        'GET',
        'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/7',
        {
          Authorization: `Bearer ${accessToken}`,
        },
      );

      const dataEntity7 = JSON.parse(responseEntity7.data);

      // Filtrar noticias de entity 2 que no estén en entity 7
      const dpNombresEntity7 = dataEntity7.map(noticia => noticia.dpNombre);
      let noticiasFiltradas2 = dataEntity2.filter(noticia => !dpNombresEntity7.includes(noticia.objDepartamento.dpNombre));
     
      // Obtener las preferencias del usuario
      const responseUserPreferences = await RNFetchBlob.config({
        trusty: true,
      }).fetch(
        'GET',
        `https://noticias-uteq-4c62c24e7cc5.herokuapp.com/preferencias/getallrp/${user.ID}`,
      );
      
      const preferenciasUsuario = JSON.parse(responseUserPreferences.data);
      
      // Extraer los nombres de las facultades de las preferencias del usuario
      const facultadNombresPreferencias = preferenciasUsuario.usuarioFacultadesrp.map(pref => pref.facultad_nombre);
      
      // Si el usuario tiene preferencias, filtramos las noticias de entity 2 según las preferencias
      if (facultadNombresPreferencias.length > 0) {
        noticiasFiltradas = dataEntity2.filter(noticia => 
          facultadNombresPreferencias.includes(noticia.objDepartamento.dpNombre)
        );
        noticiasFiltradas = noticiasFiltradas.concat(noticiasFiltradas2);
      } else {
        // Si el usuario no tiene preferencias o no existe, mostramos todas las noticias de entity 2 sin filtrar
        noticiasFiltradas = dataEntity2;
      }
      
      // Definimos las noticias filtradas y paginadas como el estado de 'noticias'
      setNoticias(noticiasFiltradas.slice((currentPage - 1) * pageSize, currentPage * pageSize));
      

      setIsLoading(false);

    } catch (error) {
      console.error('Error al obtener las revistas:', error);
      setIsLoading(false);
    }
  }, [accessToken, currentPage]);


  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleLoadPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const registerView = async (nombre) => {
    try {
      console.log("Registrando vista de revista:", { seccion: "Noticia", nombre: nombre });
      await RNFetchBlob.config({
        trusty: true
      }).fetch('POST', 'https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/insert', {
        'Content-Type': 'application/json',
      }, JSON.stringify({
        seccion: "Noticia",
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
      fetchNotiData();
    }
  }, [accessToken, currentPage]);

  return (
    <View style={stylesVisNotices.container}>
      <Text style={stylesVisNotices.header}>Vista de Noticias</Text>
      {isLoading? (
        <ActivityIndicator size="large" color="#46741e" />
      ) : (
        <ScrollView>
          {noticias.map((noticia, index) => (
            <NewsCard
              key={index}  // Cambiado a index porque ntTitular puede no ser único
              image={`https://uteq.edu.ec/assets/images/news/pagina/${noticia.ntUrlPortada}`}
              title={noticia.ntTitular}
              date={noticia.ntFecha}
              url={`https://uteq.edu.ec/es/comunicacion/noticia/${noticia.ntUrlNoticia}`}
              category={noticia.objDepartamento.dpNombre}
              onButtonPress={() => registerView(noticia.ntTitular)}
            />
          ))}
         <View style={stylesVisNotices.pagination}>
          <TouchableOpacity style={stylesVisNotices.paginationButton} onPress={handleLoadPrevious} disabled={currentPage === 1}>
            <View style={stylesVisNotices.buttonContent}>
              <FontAwesome5 name="arrow-left" size={16} color="#fff" style={{ marginRight: 10 }} />
              <Text style={stylesVisNotices.paginationButtonText}>Anterior</Text>
            </View>
          </TouchableOpacity>
          <Text style={stylesVisNotices.paginationText}>Página {currentPage}</Text>
          <TouchableOpacity style={stylesVisNotices.paginationButton} onPress={handleLoadMore}>
            <View style={stylesVisNotices.buttonContent}>
              <Text style={stylesVisNotices.paginationButtonText}>Siguiente</Text>
              <FontAwesome5 name="arrow-right" size={16} color="#fff" style={{ marginLeft: 10 }} />
            </View>
          </TouchableOpacity>
        </View>

        </ScrollView>
      )}
    </View>
  );
};
export default ViewNoticias;
  /*const fetchData = () => {
    axios.get(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/noticias/byUsuario/${user.ID}`)
      .then((response) => {
        if (response.data && response.data.noticias && response.data.noticias.length > 0) {
          setNoticias(response.data.noticias);
        } else {
          return axios.get('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/noticias/GetAll');
        }
      })
      .then((response) => {
        if (response && response.data && response.data.noticias) {
          setNoticias(response.data.noticias);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 6000);  // Refrescar cada 6 segundos
    return () => clearInterval(interval);  // Limpia el intervalo cuando el componente se desmonte
  }, [user.ID]);*/
