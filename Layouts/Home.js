import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking, RefreshControl, Animated, ActivityIndicator, Alert, BackHandler, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';
import 'moment/locale/es';
import Modal from 'react-native-modal';
import { styleshome } from './Styles/Styles';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import RNFetchBlob from 'rn-fetch-blob';

moment.locale('es');
const Home = () => {
  const navigation = useNavigation();

  //Verificamos si jalamos el id
  const { user } = useContext(AuthContext);

  const [accessToken, setAccessToken] = useState(null);
  const [revistas, setRevistas] = useState([]);

  //declaracion de estados
  
  const [tikTokData, setTikTokData] = useState([]);
  const[YoutubeData, setYoutubeData]= useState([]);
  const [noticeData, setNoticeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);


  const blockBackButton = () => {
    Alert.alert(
      "Confirmar salida",
      "¿Estás seguro de que quieres salir de la aplicación?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Salir", onPress: () => BackHandler.exitApp() }
      ]
    );
    return true; // Indica que el botón de retroceso está bloqueado
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', blockBackButton);

      // Limpia el listener cuando la pantalla ya no tiene el foco
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', blockBackButton);
      };
    }, [])
  );

  const fetchTiktok = useCallback(() => {
    if (!accessToken) return;
    
    setIsLoading(true);
    
    RNFetchBlob.config({
      trusty: true
    }).fetch('GET', 'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/10', {
      'Authorization': `Bearer ${accessToken}`
    })
      .then((response) => {
        setIsLoading(false);
        setTikTokData(JSON.parse(response.data));
      })
      .catch((error) => {
        console.error('Error al obtener las Tiktoks:', error);
        setIsLoading(false);
      });
  }, [accessToken]);
  

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    fetchTiktok();
  }, [accessToken]);

  const fetchYoutube = useCallback(() => {
    if (!accessToken) return;
    
    setIsLoading(true);
    
    RNFetchBlob.config({
      trusty: true
    }).fetch('GET', 'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/3', {
      'Authorization': `Bearer ${accessToken}`
    })
      .then((response) => {
        setIsLoading(false);
        setYoutubeData(JSON.parse(response.data));
      })
      .catch((error) => {
        console.error('Error al obtener los datos de YouTube:', error);
        setIsLoading(false);
      });
  }, [accessToken]);
  

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    fetchYoutube();
  }, [accessToken]);

  const fetchNewsData = useCallback(() => {
    if (!accessToken) return;
    
    setIsLoading(true);
    
    RNFetchBlob.config({
      trusty: true
    }).fetch('GET', 'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/1', {
      'Authorization': `Bearer ${accessToken}`
    })
      .then((response) => {
        setIsLoading(false);
        setNoticeData(JSON.parse(response.data));
      })
      .catch((error) => {
        console.error('Error al obtener las noticias:', error);
        setIsLoading(false);
      });
  }, [accessToken]);

  

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    fetchNewsData();
  }, [accessToken]);

  
  const handleButtonPress = (link, section, nombre) => {
    Linking.openURL(link);
    // Registro de estadísticas al presionar "Leer más"
    const data = {
      seccion: section,
      nombre: nombre,
    };

    axios.post('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/insert', data)
      .then(response => {
      })
      .catch(error => {
        console.error('Error al registrar estadísticas:', error);
      });
  };


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

  const fetchMagazineData = useCallback(() => {
    if (!accessToken) return;
    
    setIsLoading(true);
    
    RNFetchBlob.config({
      trusty: true
    }).fetch('GET', 'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/5', {
      'Authorization': `Bearer ${accessToken}`
    })
      .then((response) => {
        setIsLoading(false);
        setRevistas(JSON.parse(response.data));
      })
      .catch((error) => {
        console.error('Error al obtener las revistas:', error);
        setIsLoading(false);
      });
  }, [accessToken]);
  

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    fetchMagazineData();
  }, [accessToken]);


//AQUI TENEMOS QUE PROGRAMAR LO DE LAS PREFERENCIAS
/*  //preferencias de usuario
  const fetchnoticeData = async () => {
    try {
      let newsData;

      try {
        // Intentar obtener noticias basadas en las preferencias del usuario
        const noticiasByUsuarioResponse = await axios.get(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/noticias/byUsuario/${user.ID}`);
        newsData = noticiasByUsuarioResponse.data.noticias;
      } catch (userError) {
        // Si el usuario no tiene preferencias o no existe, obtener todas las noticias
        const noticiasResponse = await axios.get('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/noticias/GetAll');
        newsData = noticiasResponse.data.noticias;
      }

      // Antes de establecer las noticias, verificar si son válidas
      if (newsData && Array.isArray(newsData)) {
        setNews(newsData);
      } else {
        setNews([]);  // Establece el estado a un array vacío o maneja el error de manera adecuada.
      }

    } catch (error) {
      console.error('Error al cargar las noticias:', error);
      // Puedes manejar el error aquí, quizás mostrando un mensaje al usuario
    }
  };
  //AQUI ESTA ESTABLECIDO QUE CADA 5 SEGUNDOS SE REALICE LA SOLICITUD

  useEffect(() => {
    fetchnoticeData(); // Llama a la función inicialmente para que no tengas que esperar 5 segundos para la primera carga

    const intervalId = setInterval(() => {
      fetchnoticeData();
    }, 5000); // Establece un intervalo para llamar a la función cada 5 segundos

    return () => {
      clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta para evitar errores o comportamientos inesperados
    };

  }, []);*/

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };


  // Función para manejar la acción de presionar una sección
  const handleSectionPress = async (section) => {
    try {
      // Insertar estadísticas
      const response = await fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seccion: section,
          nombre: `${section}`,
        }),
      });
      const data = await response.json();
      if (section === 'Noticias') {
        navigation.navigate("Noticias");
      } else {
        if (section === 'Revistas') {
          navigation.navigate("Revistas");
        } else {
          if (section === 'TikToks') {
            navigation.navigate("Contenido");
          } else {
            if (section === 'Resumen Semanal') {
              navigation.navigate("Resumen");
            }
          }
        }
      }
    } catch (error) {
      console.error('Error al insertar estadística:', error);
    }

  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  const handleFloatingButtonPress = () => {
    navigation.navigate("ChatBoxito");
  };



  // Función para renderizar las tarjetas de noticias
  const renderNewsCards = () => {
    return (
      <ScrollView horizontal>
        {noticeData.map((news) => {
          return (
            <View style={styleshome.cardNoti}>
              <View style={styleshome.logoContainer}>
                <Image source={{ uri:`https://uteq.edu.ec/assets/images/news/pagina/${news.ntUrlPortada}` }} style={styleshome.logo} />
              </View>
              <Text style={styleshome.title} numberOfLines={2}>{news.ntTitular}</Text>
              <Text style={styleshome.category} numberOfLines={1}>{news.objDepartamento.dpNombre}</Text>
              <Text style={styleshome.category}>{moment(news.ntFecha).format('LL')}</Text>
              <TouchableOpacity style={styleshome.button} onPress={() => handleButtonPress(`https://uteq.edu.ec/es/comunicacion/noticia/${news.ntUrlNoticia}`, 'Noticias', news.ntTitular)}>
                <View style={styleshome.buttonContent}>
                  <Icon name="arrow-right" size={16} color="white" style={styleshome.buttonIcon} />
                  <Text style={styleshome.buttonText}> Leer más</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  // Función para renderizar las tarjetas de revistas
  const renderMagazineCards = () => {
    return (
      <ScrollView horizontal>
        {revistas.map((revista) => (
          <View key={revista.anio + '-' + revista.mes} style={styleshome.cardRevis}>
            <View style={styleshome.logoContainer}>
              <Image source={{ uri: `https://uteq.edu.ec/assets/images/newspapers/${revista.urlportada}` }} style={styleshome.logoRevis} />
            </View>
            <Text style={styleshome.title} numberOfLines={1}>{`Edición ${moment().month(revista.mes - 1).format('MMMM')} ${revista.anio}`}</Text>
            <Text style={styleshome.category}>{moment(new Date(revista.anio, revista.mes - 1)).format('LL')}</Text>
            <TouchableOpacity
              style={styleshome.button}
              onPress={() => {
                handleDownloadPress(revista.urlpw);
                handleButtonPress('Revista', `Edición ${moment().month(revista.mes - 1).format('MMMM')} ${revista.anio}`);
              }}
            >
              <View style={styleshome.buttonContent}>
                <Icon name="arrow-right" size={16} color="white" style={styleshome.buttonIcon} />
                <Text style={styleshome.buttonText}> Leer más</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };


  const handleDownloadPress = (url) => {
    Alert.alert(
      "Descargar Revista", // Título del Alert
      "¿Deseas descargar la revista?", // Mensaje del Alert
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Descargar",
          onPress: () => Linking.openURL(url),

        }
      ],
      { cancelable: false }
    );
  };

  const renderYoutube = () => {
    return (
      <ScrollView horizontal>
        {
          YoutubeData.map((contento) => (
            <View style={[styleshome.cardResume, styleshome.ResumeCard]}>
              <View style={styleshome.reumeContainer}>
                <Image source={{ uri:`https://uteq.edu.ec/assets/images/videos/res-sem/${contento.portadaVideo}`}} style={styleshome.largeContentImage} />
                <Text style={styleshome.titlerevista} numberOfLines={1}>{contento.titulo}</Text>
                <Text>{moment(contento.fechapub).format('DD MMM YYYY')}</Text>
              </View>
              <TouchableOpacity
                style={styleshome.button}
                onPress={() => handleButtonPress(contento.urlvideo1, 'Contenido', contento.titulo)}
              >
                <View style={styleshome.buttonContent}>
                  <Icon name="play-circle" size={24} color="white" />
                  <Text style={styleshome.buttonText}> Visualizar</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        }
      </ScrollView>
    );
  };

  const renderTiktok = () => {

    return (
      <ScrollView horizontal>
        {
          tikTokData.map((Tiks) => (
            <View style={[styleshome.cardConte, styleshome.contentCard]}>
              <View style={styleshome.contentContainer}>
                <Image source={{ uri: 'https://www.uteq.edu.ec/assets/img/portada-tiktok-video.jpg' }} style={styleshome.contentImage} />
                <Text style={styleshome.titleconte} numberOfLines={2}>{Tiks.titulo}</Text>
                <Text>{moment(Tiks.fechapub).format('DD MMM YYYY')}</Text>
              </View>
              <TouchableOpacity
                style={styleshome.button}
                onPress={() => handleButtonPress(Tiks.urlvideo1, 'Contenido', Tiks.titulo)}
              >
                <View style={styleshome.buttonContent}>
                  <Icon name="play-circle" size={24} color="white" />
                  <Text style={styleshome.buttonText}> Visualizar</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        }
      </ScrollView>
    );
  };


  return (
    <View style={styleshome.container}>
      <ScrollView >
        {/* Secciones del contenido */}
        <TouchableOpacity style={styleshome.sectionHeader} onPress={() => handleSectionPress('Noticias')}>
          <Icon name="newspaper-o" size={28} color="#46741e" />
          <Text style={styleshome.sectionTitle}>Noticias</Text>
        </TouchableOpacity>
        {renderNewsCards()}

        <TouchableOpacity style={styleshome.sectionHeader} onPress={() => handleSectionPress('Revistas')}>
          <Icon name="book" size={28} color="#46741e" />
          <Text style={styleshome.sectionTitle}>Revistas</Text>
        </TouchableOpacity>
        {renderMagazineCards()}

        <TouchableOpacity style={styleshome.sectionHeader} onPress={() => handleSectionPress('TikToks')}>
          <FontAwesome5 name="tiktok" size={28} color="#46741e" />
          <Text style={styleshome.sectionTitle}>TikToks</Text>
        </TouchableOpacity>
        {renderTiktok()}

        <TouchableOpacity style={styleshome.sectionHeader} onPress={() => handleSectionPress('Resumen Semanal')}>
          <FontAwesome5 name="youtube" size={28} color="#46741e" />
          <Text style={styleshome.sectionTitle}>Resumen Semanal</Text>
        </TouchableOpacity>
        {renderYoutube()}
      </ScrollView>

      <TouchableOpacity style={styleshome.mainButton} onPress={toggleMenu}>
        <FontAwesome5 name="ellipsis-v" size={24} color="#ffffff" />
      </TouchableOpacity>

      <Modal isVisible={isMenuVisible} onBackdropPress={closeMenu}>
        <TouchableWithoutFeedback>
        <View style={styleshome.menuContainer}>
  <TouchableOpacity
    style={styleshome.menuOption}
    onPress={() => {
      handleFloatingButtonPress();
      setIsMenuVisible(false);
    }}
  >
    <View style={styleshome.menuOptionContent}>
      <Text style={styleshome.menuOptionText}>ChatBox</Text>
      <View style={styleshome.iconWithCircle}>
        <Icon name="comments" size={25} color="white" style={styleshome.menuOptionIcon} />
      </View>
    </View>
  </TouchableOpacity>
</View>

        </TouchableWithoutFeedback>
      </Modal>
    </View >
  );
};



export default Home;
