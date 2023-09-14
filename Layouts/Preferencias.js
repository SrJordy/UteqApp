import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Dimensions, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useContext } from 'react';
import {stylesCrearC} from './Styles/Styles'
import { AuthContext } from './AuthContext';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import RNFetchBlob from 'rn-fetch-blob';

export function Prefer() {
  const { user } = useContext(AuthContext);
  const [checkedItems, setCheckedItems] = useState([]);
  const [facultades, setFacultades] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  /*===================================REALIZA LA SOLICITUD DEL TOKEN========================= */
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
      authenticate();
    });
  };
  useEffect(() => {
    authenticate();
  }, []);
  /*===================================HACE LA CONSULTA A LAS FACULTADES DEL WEBSERVICE========================= */
  const fetchFacultades = useCallback(async () => {
    if (!accessToken) return;
  
    RNFetchBlob.config({
      trusty: true
    }).fetch('GET', 'https://apiws.uteq.edu.ec/h6RPoSoRaah0Y4Bah28eew/functions/information/entity/7', {
      'Authorization': `Bearer ${accessToken}`
    })
      .then((response) => {
        const facultadesData = JSON.parse(response.data);
        setFacultades(facultadesData);
      })
      .catch((error) => {
        console.error('Error al obtener las Facultades:', error);
      });
  }, [accessToken]);
  
  /*===================================MARCA LAS FACULTADES REGISTRADAS COMO PREFERENCIAS========================= */
  useEffect(() => {
    if (facultades.length > 0) {
      const markCheckedItems = async () => {
        const userPreferences = await fetchUserPreferences();
  
        const cleanedUserPreferences = userPreferences.map((preference) => preference.trim());

        const checkedFacultades = facultades.filter((facultad) =>
          cleanedUserPreferences.includes(facultad.dpNombre.trim())
        ).map((facultad) => facultad.dpNombre);

  
        setCheckedItems(checkedFacultades);
      };
  
      markCheckedItems();
    }
  }, [facultades]);
  
  useEffect(() => {
    if (accessToken) {
      fetchFacultades();
    }
  }, [accessToken]);
/*=================================OBTIENE LAS PREFERENCIAS DEL USUARIO REGISTRADO EN LA BASE DE DATOS============================ */  
  const fetchUserPreferences = async () => {
    try {
      const response = await fetch(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/preferencias/getallrp/${user.ID}`);
      const data = await response.json();
  
      if (Array.isArray(data.usuarioFacultadesrp)) {
        return data.usuarioFacultadesrp.map((pref) => pref.FacultadNombre);
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  const handleCheckboxChange = (item) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(checkedItems.filter((checkedItem) => checkedItem !== item));
    } else {
      if (checkedItems.length < 3) {
        setCheckedItems([...checkedItems, item]);
      }
    }
  };

  const renderCheckbox = ({ item }) => {
    const isChecked = checkedItems.includes(item.dpNombre);
    return (
      <CheckBox
        key={item.dpCodigo}
        title={item.dpNombre}
        size={windowHeight * 0.03}
        checked={isChecked}
        checkedColor="#46b41e"
        onPress={() => handleCheckboxChange(item.dpNombre)}
      />
    );
  };
  
  const handleSave = async () => {
    if (checkedItems.length === 0) {
      Alert.alert('Advertencia', 'Debes seleccionar al menos una facultad');
      return;
    }
    const payload = checkedItems.map(item => {
      const facultadData = facultades.find(facultad => facultad.dpNombre === item);
      return {
        UsuarioID: user.ID,
        FacultadNombre: facultadData.dpNombre
      };
    });
  
    try {
      setIsLoading(true);
      const response = await fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/preferencias/upsertrp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      setIsLoading(false);
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert('Éxito', 'Preferencias guardadas correctamente.');
      } else {
        throw new Error(data.msg || 'Error al guardar las preferencias');
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Ha ocurrido un error al guardar las preferencias. Por favor, inténtalo de nuevo más tarde.');
    }
  };
  
  
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFacultades(); // Use fetchFacultades to refresh the data
    setRefreshing(false);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferencias</Text>
      <FlatList
        data={facultades}
        renderItem={renderCheckbox}
        keyExtractor={(item) => item.dpCodigo.toString()}
        contentContainerStyle={styles.checkboxContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

 <TouchableOpacity
        style={[styles.button, { backgroundColor: '#46741e' }, isButtonPressed]}
        onPress={handleSave}
        disabled={isButtonPressed} 
      >
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
{isLoading && (
      <View style={stylesCrearC.loadingOverlay}>
        <ActivityIndicator size="large" color="#46741e" />
      </View>
    )}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: windowWidth * 0.05,
    backgroundColor: '#f5f6fa',
  },
  title: {
    fontSize: windowHeight * 0.04,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.01,
    color: '#46741e',
  },
  checkboxContainer: {
    paddingTop: windowHeight * 0.02,
    paddingBottom: windowHeight * 0.02,
    width: windowWidth * 0.9,
  },
  button: {
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.05,
    borderRadius: windowHeight * 0.01,
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.01,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowHeight * 0.025,
  },
});

export default Prefer;
