import React, { useState, useEffect, useCallback,useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, Modal, Pressable, Linking, ImageBackground, StatusBar, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import FacuDetails from './Mostrarfacultad';
const { width, height } = Dimensions.get('window');
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { stylesCrearC } from './Styles/Styles';
const Dropdown = ({ title, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setIsOpen(false);
    onSelect(option);
  };
  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.dropdownHeader}>
        <Text style={styles.dropdownTitle}>{title}</Text>
        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#ffffff" />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownContent}>
          <ScrollView>
            {options.map((option) => (
              <TouchableOpacity
                key={option.dpCodigo}
                style={styles.dropdownOption}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.dropdownOptionText}>{option.dpNombre}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
const NavigationBar = () => {
  const { user } = useContext(AuthContext);
  const [searchText, setSearchText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [facultades, setFacultades] = useState([]);
  const [selectedFacultad, setSelectedFacultad] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFacuDetails, setShowFacuDetails] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  /* ============================= CONSULTA DE LAS FACULTADES============================== */
  const fetchFacultades = useCallback(async () => {
    if (!accessToken) return;

    RNFetchBlob.config({
      trusty: true
    }).fetch('GET', 'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/7', {
      'Authorization': `Bearer ${accessToken}`
    })
      .then((response) => {
        setFacultades(JSON.parse(response.data));
      })
      .catch((error) => {
        console.error('Error al obtener las Facultades:', error);
      });
  }, [accessToken]);


  useEffect(() => {
    if (accessToken) {
      fetchFacultades();
    }
  }, [accessToken]);
  /* ============================= SOLICITUD DEL TOKEN============================== */
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
  useEffect(() => {
    authenticate();
  }, []);


  const handlelinkview = (link) => {
    Linking.openURL(link);
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      return;
    }

    console.log('Buscar:', searchText);

    setIsModalOpen(false);
    //revisar esto 
    try {
      const authenticate = async () => {
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
            })
          );
          const data = await response.json();
          return data.accessToken;
        } catch (error) {
          console.error('Error al autenticarse:', error);
        }
        return null;
      };


      const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
      /* ============================= CONSULTA DE LAS REVISTAS FILTRADAS POR TITULO============================== */
      const fetchRevistaData = async (accessToken) => {
        if (!accessToken) return [];

        try {
          const response = await RNFetchBlob.config({
            trusty: true,
          }).fetch(
            'GET',
            'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/6',
            {
              Authorization: `Bearer ${accessToken}`,
            }
          );

          const responseData = await response.json();

          return responseData.filter(item =>
            (`${item.anio} ${months[item.mes - 1]}`).toLowerCase().includes(searchText.toLowerCase())
          );

        } catch (error) {
          console.error('Error al obtener las revistas:', error);
        }
        return [];
      };
      const accessToken = await authenticate();
      const filteredRevistas = await fetchRevistaData(accessToken);




      /* ============================= CONSULTA DE LAS NOTICIAS FILTRADAS POR TITULO============================== */
      const fetchNoticiasData = async (tituloFilter) => {
        try {
          const response = await RNFetchBlob.config({
            trusty: true,
          }).fetch(
            'GET',
            'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/2',
            {
              Authorization: `Bearer ${accessToken}`,
            }
          );

          let dataEntity2 = await response.json();

          // Obtén los datos de entity7
          const responseEntity7 = await RNFetchBlob.config({ trusty: true }).fetch('GET', 'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/7', { Authorization: `Bearer ${accessToken}`, });
          const dataEntity7 = await responseEntity7.json();

          // Obtén las preferencias del usuario
          const responseUserPreferences = await RNFetchBlob.config({ trusty: true }).fetch('GET', `https://noticias-uteq-4c62c24e7cc5.herokuapp.com/preferencias/getallrp/${user.ID}`,);
          const preferenciasUsuario = await responseUserPreferences.json();

          // Filtra las noticias de entity2 que no están en entity7
          const dpNombresEntity7 = dataEntity7.map(noticia => noticia.dpNombre);
          let noticiasFiltradas2 = dataEntity2.filter(noticia => !dpNombresEntity7.includes(noticia.objDepartamento.dpNombre));

          // Extrae los nombres de las facultades de las preferencias del usuario
          const facultadNombresPreferencias = preferenciasUsuario.usuarioFacultadesrp.map(pref => pref.facultad_nombre);

          // Filtra las noticias según las preferencias del usuario
          if (facultadNombresPreferencias.length > 0) {
            noticiasFiltradas = dataEntity2.filter(noticia => facultadNombresPreferencias.includes(noticia.objDepartamento.dpNombre));
            noticiasFiltradas = noticiasFiltradas.concat(noticiasFiltradas2);
          } else {
            // Si el usuario no tiene preferencias o no existe, mostramos todas las noticias de entity 2 sin filtrar
            noticiasFiltradas = dataEntity2;
          }

          const noticiasResults = noticiasFiltradas.filter(item =>
            item.ntTitular.toLowerCase().includes(tituloFilter.toLowerCase())
          ).map(item => ({
            titulo: item.ntTitular,
            departamento: item.objDepartamento.dpNombre,
            imagen: `https://uteq.edu.ec/assets/images/news/pagina/${item.ntUrlPortada}`,
            url: `https://uteq.edu.ec/es/comunicacion/noticia/${item.ntUrlNoticia}`,
            tipo: 'Noticias',
          }));

          return noticiasResults;

        } catch (error) {
          console.error('Error al obtener los datos de noticias:', error);
          return [];
        }
      };




      const noticiasResults = await fetchNoticiasData(searchText);


      /* ============================= CONSULTA DE LOS TIKTOKS FILTRADAS POR TITULO============================== */
      const fetchTikTokData = async (accessToken, searchText) => {
        if (!accessToken) return [];

        try {
          const response = await RNFetchBlob.config({
            trusty: true,
          }).fetch(
            'GET',
            'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/11',
            {
              Authorization: `Bearer ${accessToken}`,
            }
          );

          const responseData = await response.json();

          const tiktokResults = responseData.filter(item =>
            item.titulo && item.titulo.toLowerCase().includes(searchText.toLowerCase())
          ).map(item => ({
            titulo: item.titulo,
            imagen: 'https://www.uteq.edu.ec/assets/img/portada-tiktok-video.jpg',
            url: item.urlvideo1,
            tipo: 'TikTok',
          }));

          return tiktokResults;
        } catch (error) {
          console.error('Error al obtener los datos de TikTok:', error);
          return [];
        }
      };
      const tiktokResults = await fetchTikTokData(accessToken, searchText);

      /* ============================= CONSULTA DE LOS RESUMENES SEMANALES FILTRADAS POR TITULO============================== */
      const fetchVideosYTData = async (searchText) => {
        try {
          const response = await RNFetchBlob.config({
            trusty: true,
          }).fetch(
            'GET',
            'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/4',
            {
              Authorization: `Bearer ${accessToken}`,
            }
          );

          const responseData = await response.json();


          const videosYTResults = responseData.filter(item =>
            item.titulo && item.titulo.toLowerCase().includes(searchText.toLowerCase())
          ).map(item => ({
            titulo: item.titulo,
            imagen: `https://uteq.edu.ec/assets/images/videos/res-sem/${item.portadaVideo}`, // Concatenamos la URL base con el campo portadaVideo
            url: item.urlvideo1, // Usamos el campo urlvideo1 para obtener la URL del video
            tipo: 'VideosYT',
          }));

          return videosYTResults;
        } catch (error) {
          console.error('Error al obtener los datos de VideosYT:', error);
          return [];
        }
      };

      const videosYTResults = await fetchVideosYTData(searchText);

      setIsLoading(false);
      const combinedResults = [...filteredRevistas, ...noticiasResults, ...tiktokResults, ...videosYTResults];

      setSearchResults(combinedResults);
      setIsSearchModalOpen(true);
      setIsModalOpen(true);

    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
      setIsLoading(false);
    }
  };

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
    setSearchResults([]);
    setSearchText('');
  };
  const handleFacultadSelect = (facultad) => {
    setSelectedFacultad(facultad);
    setIsMenuOpen(false);
    setShowFacuDetails(true);

    const facultadData = {
      nombre: facultad.nombre,
      seccion: 'facultades',
    };
    enviarDatosFacultad(facultadData);
  };

  const enviarDatosFacultad = async (facultadData) => {
    try {
      const response = await axios.post(
        'https://noticias-uteq-4c62c24e7cc5.herokuapp.com/estadisticas/insert',
        facultadData
      );
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al insertar los datos:', error);
    }
  };
  const handleGoBack = () => {
    setSelectedFacultad(null);
    setIsModalOpen(false); // Cerrar cualquier modal abierto
    setShowFacuDetails(false); // Ocultar la interfaz analizada
  };

  const handleModalClose = () => {
    setSelectedFacultad(null);
    setIsModalOpen(false); // Cerrar cualquier modal abierto
    setShowFacuDetails(false); // Ocultar la interfaz analizada
  };
  const handleInfoButtonPress = () => {
    setIsInfoModalOpen(true); // Abre el modal
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false); // Cierra el modal
  };
  const handle360Press = () => {
    Linking.openURL('https://tour-virtual.uteq.edu.ec/');
  };

  const handleFacebookPress = () => {
    Linking.openURL('https://www.facebook.com/uteq.ecuador/');
  };

  const handleTikTokPress = () => {
    Linking.openURL('https://www.tiktok.com/@uteq.ec');
  };

  const handleTwitterPress = () => {
    Linking.openURL('https://twitter.com/utequevedo');
  };
  const hanldeIntasPress = () => {
    Linking.openURL('https://www.instagram.com/uteq.ec/?utm_medium=copy_link');
  }



  const renderModalContent = () => {
    const months = [
      "enero", "febrero", "marzo", "abril", "mayo",
      "junio", "julio", "agosto", "septiembre",
      "octubre", "noviembre", "diciembre"
    ];

    const scrollRef = useRef(null);

    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ y: 0, animated: true });
        }
      }
    };

    const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  
    if (showFacuDetails && selectedFacultad) {
      return (
        <FacuDetails facultad={selectedFacultad} onGoBack={handleGoBack} />
      );
    } else if (searchResults.length === 0) {
      return (
        <View style={styles.searchResultsContainer}>
          <Text style={styles.modalTitleClose}>No se encontraron resultados</Text>
          
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.searchResultsContainer} ref={scrollRef}>
          {/* Mostrar resultados de búsqueda */}
          {searchResults
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((result) => (
              <TouchableOpacity
                key={result.id || result.anio + '-' + result.mes}
                style={styles.searchResultCard}
                onPress={() => {
                  if (result.url || result.urlpw) {
                    handlelinkview(result.url || result.urlpw);
                  }
                }}
              >
                <View style={styles.logoContainer}>
                  <Image
                    source={{
                      uri: result.imagen ||
                        result.url_imageb ||
                        `https://uteq.edu.ec/assets/images/newspapers/${result.urlportada}`
                    }}
                    style={styles.logo}
                  />
                </View>
                <Text style={styles.searchResultItem}>
                  {result.titulo || `Edición ${months[result.mes - 1]} ${result.anio}`}
                </Text>
              </TouchableOpacity>
            ))}

          {/* Controladores de paginación */}
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              disabled={currentPage === 1}
              onPress={() => handlePageChange(currentPage - 1)}
              style={[
                styles.paginationButton,
                { opacity: currentPage === 1 ? 0.5 : 1 }  // Disminuye la opacidad si el botón está desactivado
              ]}
            >
              <Text style={styles.paginationText}>Anterior</Text>
            </TouchableOpacity>
            <Text style={styles.paginationText}>
              Página {currentPage} de {totalPages}
            </Text>
            <TouchableOpacity
              disabled={currentPage === totalPages}
              onPress={() => handlePageChange(currentPage + 1)}
              style={[
                styles.paginationButton,
                { opacity: currentPage === totalPages ? 0.5 : 1 }  // Disminuye la opacidad si el botón está desactivado
              ]}
            >
              <Text style={styles.paginationText}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
  };


  return (
    <>
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />

      <View style={styles.container}>
        <Modal visible={isMenuOpen} animationType="fade" transparent={true}>
          <ImageBackground source={require('./src/FondoMenu.png')} style={styles.menuContainer}>
            <Image source={require('./src/perfiluteq.jpeg')} style={styles.menuImage} />
            <Text style={styles.menuTitle}>Menú</Text>
            <Pressable onPress={handleMenu} style={styles.closeButton}>
              <Icon name="times" size={20} color="#ffffff" />
            </Pressable>

            <View style={styles.menuOptionsContainer}>
              <Dropdown title="Facultades" options={facultades} onSelect={handleFacultadSelect} />
            </View>
            <View style={styles.line} />
            <View style={styles.imageAndTextContainer}>
              <TouchableOpacity onPress={handle360Press} style={styles.boton360}>
                <Image source={require('./iconos/360grados.png')} style={styles.centeredImage} />
                <Text style={styles.conoceText}>Conoce la UTEQ 360°</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoButtonRow}>
              <TouchableOpacity onPress={handleInfoButtonPress} style={styles.infoButton}>
                <Icon name="info-circle" size={18} color="#46741e" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleFacebookPress} style={styles.Buttonface}>
                <Icon name="facebook" size={18} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleTikTokPress} style={styles.ButtonTik}>
                <Icon name="tiktok" size={18} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleTwitterPress} style={styles.Buttontwt}>
                <Icon name="twitter" size={18} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={hanldeIntasPress} style={styles.intaButton}>
                <Icon name="instagram" size={18} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={{ color: 'white', fontSize: 10, marginBottom: 20 }}
            >© 2023 Universidad Técnica Estatal de Quevedo</Text>

          </ImageBackground>
        </Modal>
        <TouchableOpacity onPress={handleMenu} style={styles.menuButton}>
          <Icon name="bars" size={20} color="#46741e" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            onChangeText={text => setSearchText(text)}
            value={searchText}
          />
          <TouchableOpacity
            onPress={handleSearch}
            style={[styles.searchButton, { backgroundColor: 'white' }]}
            disabled={!searchText.trim()} // Deshabilitar el botón si el campo está vacío
          >
            <Icon name="search" size={20} color="#46741e" />
          </TouchableOpacity>
          {
            isLoading && (
              <View style={stylesCrearC.loadingOverlay}>
                <ActivityIndicator size="large" color="#46741e" />
              </View>
            )
          }
        </View>
      </View>


      <Modal visible={isSearchModalOpen && isModalOpen} animationType="slide" transparent={true}>
        <View style={styles.searchModalContainer}>
          {renderModalContent()}
          <TouchableOpacity onPress={handleCloseSearchModal} style={styles.closeSearchModalButton}>
            <Icon name="times" size={20} color="#ffffff" />
          </TouchableOpacity>

        </View>
      </Modal>

      <Modal visible={selectedFacultad !== null} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <ImageBackground source={require('./src/Fondo.jpg')} style={styles.modalBackground}>
            {renderModalContent()}
          </ImageBackground>
        </View>
      </Modal>

      <Modal visible={isInfoModalOpen} animationType="slide" transparent={true}>
        <View style={styles.infoModalContainer}>
          <View style={styles.infoModalContent}>
            <Icon name="users" size={20} color="black" />
            <Text style={styles.infoTitle}>CodeMaster</Text>
            <View style={styles.infoImageContainer}>
              <Image source={require('./iconos/codemaster.jpg')} style={styles.infoImage} />
            </View>

            <Text style={styles.infoSubtitle}>Integrantes:</Text>
            <ScrollView style={styles.infoMemberList}>
              <View style={styles.infoMember}>
                <Icon name="user" size={20} color="#46b41e" />
                <Text style={styles.infoMemberText}>JORGE STEVEN GUALPA GIA</Text>
              </View>
              <View style={styles.infoMember}>
                <Icon name="user" size={20} color="#46b41e" />
                <Text style={styles.infoMemberText}>JORDY ALEJANDRO VILCACUNDO CHILUISA</Text>
              </View>
              <View style={styles.infoMember}>
                <Icon name="user" size={20} color="#46b41e" />
                <Text style={styles.infoMemberText}>VALESKA SOFIA CHICA VALFRE</Text>
              </View>
            </ScrollView>
            <TouchableOpacity onPress={handleCloseInfoModal} style={styles.closeInfoModalButton}>
              <Icon name="times" size={20} color="#ffffff" />
              <Text style={styles.cerrar}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
    paddingHorizontal: 10,
    backgroundColor: '#f5f6fa',
  },
  menuButton: {
    paddingHorizontal: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchButton: {
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: width * 0.8,
    height: height,
    borderRadius: 10,
  },
  menuImage: {
    width: '100%',
    height: '30%',
    resizeMode: 'cover',

  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  menuOptionsContainer: {
    flex: 1,
  },
  menuOptions: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  menuItemContainer: {
    marginBottom: 10,
  },
  menuItem: {
    fontSize: 18,
    color: 'white',
  },
  searchModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 1
  },
  closeSearchModalButton: {
    position: 'absolute', // Restauramos el valor 'absolute' para permitir el posicionamiento con 'top' y 'right'
    top: 10,
    left: 10,
    padding: 10,
    backgroundColor: '#46741e', // Añadimos un color de fondo agradable
    borderRadius: 10, // Redondeamos las esquinas para un diseño más suave
    alignItems: 'center', // Aseguramos que el contenido esté centrado
    justifyContent: 'center', // Aseguramos que el contenido esté centrado verticalmente
    shadowColor: "#000", // Añadimos una sombra para dar una sensación elevada
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Controlamos la opacidad de la sombra
    shadowRadius: 3.84, // Controlamos el radio de la sombra
    elevation: 5, // Añadimos elevación en Android para un efecto de sombra
  },
  
  searchResultsContainer: {
    borderRadius: 10,
    alignContent: 'center',
    padding: width * 0.07,
    width: width * 0.95,
    maxHeight: height * 0.85,
  },
  searchResultItem: {
    fontSize: 18,
    padding: 10,
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 50,
    padding: 20,
    width: width * 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalTitleClose: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color:'white'
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalCloseButton: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    padding: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    width: width * 0.75,
    backgroundColor: '#46741e',
    borderRadius: 8,
    overflow: 'hidden',
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  dropdownTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  dropdownContent: {
    maxHeight: 240,
    paddingHorizontal: 10,
  },
  dropdownOption: {
    paddingVertical: 12,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#ffffff',
  },
  searchResultsScrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchResultImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  searchResultItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  searchResultButton: {
    marginTop: 10,
    backgroundColor: '#46b41e',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchResultButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchResultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 5,
    margin: 1,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: width * 0.8

  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 165,
    height: 135,
    borderRadius: 15,
    resizeMode: 'stretch'
  },

  infoModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  infoModalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: width * 0.8,
    maxHeight: height * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  infoImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  infoImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    resizeMode: 'center',
  },
  infoMemberList: {
    maxHeight: 150,
  },
  infoMember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoMemberText: {
    marginLeft: 10,
    fontSize: 16,
  },
  closeInfoModalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  cerrar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  line: {
    width: '80%',
    height: 3,
    backgroundColor: 'white', // Color de la línea
    marginBottom: '4%',
  },
  imageAndTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  boton360: {
    alignItems: 'center'
  },
  centeredImage: {
    width: 40,
    height: 40,
    resizeMode: 'stretch',
    marginBottom: 1, // minimal space between the image and text
  },
  conoceText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 25,
  },
  infoButton: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginHorizontal: 5, // Espacio entre los botones
    backgroundColor: 'white', // Color de fondo de Facebook
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  intaButton: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginHorizontal: 5, // Espacio entre los botones
    backgroundColor: '#E1306C', // Color de fondo de Facebook
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  Buttonface: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginHorizontal: 5, // Espacio entre los botones
    backgroundColor: '#3b5998', // Color de fondo de Facebook
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  ButtonTik: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginHorizontal: 5, // Espacio entre los botones
    backgroundColor: '#000', // Color de fondo de Facebook
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  Buttontwt: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginHorizontal: 5, // Espacio entre los botones
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },

  infoButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,

  },
  extraButton: {
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 8,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  notificationCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: width * 0.01,  // 5% del ancho de la pantalla
    paddingBottom: height * 0.05,  // 2% de la altura de la pantalla
    paddingTop: height * 0.01,  // 2% de la altura de la pantalla
    borderRadius: 8,
  },
  paginationButton: {
    padding: 10,
    backgroundColor: '#1e88e5',
    borderRadius: 8,
  },
  paginationButtonDisabled: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  paginationText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
  },
  paginationButton: {
    padding: 10,
    margin: 5,
    backgroundColor: '#46741e',
    borderRadius: 5,
    alignItems: 'center',
  },

});
export default NavigationBar;