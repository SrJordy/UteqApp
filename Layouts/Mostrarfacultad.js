import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,

  Image,
  Linking,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import { stylesMostrarF } from './Styles/Styles'
import RNFetchBlob from 'rn-fetch-blob';
const windowWidth = Dimensions.get('window').width;

export const FacuDetails = ({ facultad, onGoBack }) => {
  const [activeTab, setActiveTab] = useState('mision');
  const [carrerasData, setCarreras] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);



  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (tab === 'carreras') {
      fetchCarreras();
    }
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

  const fetchCarreras = useCallback(() => {
    if (!accessToken) return;

    RNFetchBlob.config({
      trusty: true
    }).fetch('GET', ` https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/9/${facultad.dpCodigo}`, {
      'Authorization': `Bearer ${accessToken}`
    })
      .then((response) => {
        setCarreras(JSON.parse(response.data));
      })
      .catch((error) => {
        console.error('Error al obtener las carreras:', error);
      });
  }, [accessToken])

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchCarreras();
    }
  }, [accessToken]);

  const openCarreraModal = (carrera) => {
    setSelectedCarrera(carrera);
    setModalVisible(true);
  };

  const closeCarreraModal = () => {
    setSelectedCarrera(null);
    setModalVisible(false);
  };

  return (
    <View style={stylesMostrarF.container}>
      <View style={stylesMostrarF.header}>
        <TouchableOpacity onPress={onGoBack}>
          <Icon name="arrow-back" size={30} color={'#46741e'} />
        </TouchableOpacity>
        <Text style={stylesMostrarF.title}>{facultad.dpNombre}</Text>
      </View>
      {activeTab !== 'carreras' && (
        <WebView
          style={stylesMostrarF.video}
          source={{ uri: facultad.dpUrlVideo }}
        />
      )}
      <View style={stylesMostrarF.tabs}>
        <TouchableOpacity onPress={() => handleTabPress('mision')} style={stylesMostrarF.tab}>
          <Icon name="book-outline" size={20} color="#46741e" />
          <Text style={stylesMostrarF.tabText}>MISIÓN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('vision')} style={stylesMostrarF.tab}>
          <Icon name="eye-outline" size={20} color="#46741e" />
          <Text style={stylesMostrarF.tabText}>VISIÓN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('carreras')} style={stylesMostrarF.tab}>
          <Icon name="school-outline" size={20} color="#46741e" />
          <Text style={stylesMostrarF.tabText}>CARRERAS</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={stylesMostrarF.scrollContainer}>

        {activeTab === 'mision' && (
          <View style={stylesMostrarF.cardView}>
            <Text style={stylesMostrarF.cardTitle}>MISIÓN</Text>
            <Text style={stylesMostrarF.cardContent}>{facultad.dpMision}</Text>
          </View>
        )}
        {activeTab === 'vision' && (
          <View style={stylesMostrarF.cardView}>
            <Text style={stylesMostrarF.cardTitle}>VISIÓN</Text>
            <Text style={stylesMostrarF.cardContent}>{facultad.dpVision}</Text>
          </View>
        )}
        {activeTab === 'carreras' &&

          carrerasData.map((carrera) => (
            <TouchableOpacity
              key={carrera.crNombre}
              style={stylesMostrarF.carreraCard}
              onPress={() => openCarreraModal(carrera)}
            >
              <View style={stylesMostrarF.carreraImageContainer}>
                <Image source={{ uri: `https://uteq.edu.ec/assets/images/front-pages/${carrera.crUrlImgRS}` }} style={stylesMostrarF.carreraImage} resizeMode="contain" />
              </View>
              <Text style={stylesMostrarF.carreraTitle}>{carrera.crNombre}</Text>
              <Text style={stylesMostrarF.carreraDescription}>{carrera.crCampoOcupc.substring(0, 120)}... Ver mas</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <View style={stylesMostrarF.socialLinks}>
        <TouchableOpacity style={stylesMostrarF.socialButton} onPress={() => Linking.openURL(facultad.dpCtaFacb)}>
          <Icon name="logo-facebook" size={24} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity style={stylesMostrarF.socialButton} onPress={() => Linking.openURL(`https://uteq.edu.ec/es/grado/facultad/${facultad.dpParcialUrl}`)}>
          <Icon name="logo-google" size={24} color="#db4437" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeCarreraModal}
      >
        {selectedCarrera ? (
          <Modal isVisible={isModalVisible}>
            <View style={stylesMostrarF.modalContainer}>
              <View style={stylesMostrarF.modalContent}>
                <Text style={stylesMostrarF.modalTitle}>{selectedCarrera.crNombre}</Text>
                <Image source={{ uri: `https://uteq.edu.ec/assets/images/front-pages/${selectedCarrera.crUrlImgRS}` }} style={stylesMostrarF.modalImage} resizeMode="contain" />
                <ScrollView style={stylesMostrarF.scrollContainer}>
                    <Text 
                        style={stylesMostrarF.modalDescription}
                        numberOfLines={25}
                        ellipsizeMode='tail'
                    >
                        {selectedCarrera.crCampoOcupc.substring(0, 950)}... 
                        <Text style={{color:'gray'}}>ver más en el sitio web</Text>
                    </Text>
                </ScrollView>
                <View style={stylesMostrarF.buttonGroup}>
                  <TouchableOpacity
                    style={stylesMostrarF.websiteButton}
                    onPress={() => Linking.openURL(`https://uteq.edu.ec/es/grado/carrera/${selectedCarrera.crUrlParcial}`)}
                  >
                    <View style={stylesMostrarF.buttonContent}>
                      <Icon name="globe-outline" size={20} color="#fff" />
                      <Text style={stylesMostrarF.websiteButtonText}> Visitar Sitio Web </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={stylesMostrarF.closeButton}
                    onPress={closeCarreraModal}
                  >
                    <View style={stylesMostrarF.buttonContent}>
                      <Icon name="close-outline" size={20} color="#fff" />
                      <Text style={stylesMostrarF.closeButtonText}>Cerrar</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        ) : (
          <View style={stylesMostrarF.loadingContainer}>
            <ActivityIndicator size="large" color="#4caf50" />
          </View>
        )}
      </Modal>
    </View>
  );
};
export default FacuDetails;
