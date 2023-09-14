import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { Card, Text, Image, Icon } from 'react-native-elements';
import axios from 'axios';
import EditCovon from './EditCovon'; // Asegúrate de importar correctamente el módulo
import { stylesGestionCv } from './Styles/Styles';

const GestionCovon = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [covonSeleccionada, setCovonSeleccionada] = useState(null);
  const [convocatorias, setConvocatorias] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://noticias-uteq-4c62c24e7cc5.herokuapp.com/noticias/convocatorias'
      );
      setConvocatorias(response.data.convocatorias || response.data);
      console.log('Convocatorias:', response.data.convocatorias || response.data);
    } catch (error) {
      console.error('Error al obtener las convocatorias:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true); // Indica que se está refrescando
    try {
      await fetchData(); // Vuelve a cargar los datos
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    } finally {
      setRefreshing(false); // Finaliza la acción de refrescar
    }
  };
  

  /*
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/carreras/delete/${id}`);
      setCarreras(carreras.filter(carrera => carrera.ID !== id));
    } catch (error) {
      console.error('Error al eliminar la carrera:', error);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Eliminar Carrera',
      '¿Estás seguro de que deseas eliminar esta carrera?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => handleDelete(id),
        },
      ],
    );
  };*/

  const handleEditarConvo = (convocatorias) => {
    setCovonSeleccionada(convocatorias);
    setModalVisible(true);
  };



  return (
    <View style={{ flex: 1, padding: 5 }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10, color: '#46741e', textAlign: 'center' }}>
        Gestión de convocatorias
      </Text>
      <FlatList
        data={convocatorias}
        keyExtractor={(item) => item.ID.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing} // Indica si se está realizando el refresco
            onRefresh={onRefresh} // La función que se ejecutará al refrescar
          />
        }
        renderItem={({ item }) => (
          <Card containerStyle={stylesGestionCv.card}>
            <Image source={{ uri: item.portada }} style={{ width: '100%', height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
            <Card.Title>{item.titulo}</Card.Title>
            <Card.Divider />
            <Text>{item.lugar}</Text>
            <View style={stylesGestionCv.buttonsContainer}>
              <TouchableOpacity style={stylesGestionCv.editButton} onPress={() => handleEditarConvo(item)}>
                <Icon name="edit" type="font-awesome" color="#fff" />
                <Text style={stylesGestionCv.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={stylesGestionCv.deleteButton} onPress={() => confirmDelete(item.ID)}>
                <Icon name="trash" type="font-awesome" color="#fff" />
                <Text style={stylesGestionCv.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />
      <EditCovon
        visible={modalVisible} // Asegúrate de pasar la prop "visible" aquí
        convocatoria={covonSeleccionada} // Puedes pasar otros valores si es necesario
        onClose={() => setModalVisible(false)}
        onEdit={(editedConvocatoria) => {
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default GestionCovon;
