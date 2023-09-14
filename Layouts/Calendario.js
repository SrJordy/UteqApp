import React, { useState, useCallback, useMemo, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  item
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from './AuthContext'; // Asegúrate de tener este archivo y el contexto configurado

const { width, height } = Dimensions.get('window');
const primaryColor = '#46741e';

const App = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemTime, setNewItemTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const [data, setData] = useState(null);
  const [editEventData, setEditEventData] = useState(null);


  const saveNewItem = useCallback(async () => {
    if (!newItemName.trim()) {
      Alert.alert('Error', 'El nombre del evento no puede estar vacío.');
      return;
    }
  
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(newItemTime.getHours());
    selectedDateTime.setMinutes(newItemTime.getMinutes());
  
    const existingEventsForTheDay = items[selectedDate] || [];
    
    const formattedSelectedDate = selectedDateTime.toISOString().split('T')[0];
  
    const eventToSave = {
      ID_usuario: user.ID, 
      name: newItemName,
      time: selectedDateTime.toISOString(),
      date: formattedSelectedDate + "T00:00:00Z",
    };  
  
    const url = editingItemIndex !== null 
      ? `https://noticias-uteq-4c62c24e7cc5.herokuapp.com/eventos/Update/${user.ID}` 
      : 'https://noticias-uteq-4c62c24e7cc5.herokuapp.com/eventos/Insert';
    
    const method = editingItemIndex !== null ? 'PUT' : 'POST';
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventToSave),
      });
  
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error al guardar el evento: ${text}`);
      }
  
      const data = await response.json();
  
      console.log('Success:', data);
      Alert.alert('Evento guardado con éxito');
  
      if (editingItemIndex !== null) {
        existingEventsForTheDay[editingItemIndex] = eventToSave;
        setEditingItemIndex(null);
      } else {
        existingEventsForTheDay.push(eventToSave);
      }
  
      setItems({
        ...items,
        [selectedDate]: existingEventsForTheDay,
      });
  
      setNewItemName('');
      setNewItemTime(new Date());
      setModalVisible(false);
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error al guardar el evento', error.message);
    }
  }, [newItemName, newItemTime, selectedDate, editingItemIndex, items, user.ID]);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/eventos/GetByIdUsuario/usuario/${user.ID}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        
        const result = await response.json();
        setData(result);
  
        const formattedData = formatEventData(result.eventos);
        setItems(formattedData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    // Llamar fetchData inicialmente
    fetchData();
  
    // Establecer un intervalo para llamar fetchData cada 10 segundos
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);
  
    // Limpia el intervalo cuando el componente se desmonta o cuando user.ID cambia
    return () => clearInterval(intervalId);
  }, [user.ID]);
  
  
  
  const formatEventData = (eventData) => {
    const formattedData = {};
  
    eventData.forEach((event) => {
      const date = event.date.split('T')[0];
      if (!formattedData[date]) {
        formattedData[date] = [];
      }
  
      formattedData[date].push({
        ID: event.ID,
        ID_usuario: event.ID_usuario,
        name: event.name,
        time: event.time,
        date: event.date,
      });
    });
  
    return formattedData;
  };
  


// Datos del evento que se está editando
const [datosedit, setdatosedit] = useState({
  name: '',
  time: '',
  date: '',
  ID_usuario: '',
});
  const renderItem = (item) => {
    if (!item) {
      return null;
    }
    const eventDate = new Date(item.time);
    const timeString = eventDate.getHours().toString().padStart(2, '0') + ':' + eventDate.getMinutes().toString().padStart(2, '0');
    const datos=()=>{
      try{
        setdatosedit({
          name: item.name,
          time: timeString,
          date: item.date,
          ID_usuario: user.ID,
        });

        setEditModalVisible(true);
      }catch (error){
        console.error('Error al obtener los datos del evento:', error);
      Alert.alert('Error al obtener los datos del evento', error.message);
      }
    }
  
    const handleDeleteItem = async () => {
      Alert.alert(
        'Eliminar Evento',
        '¿Estás seguro de que deseas eliminar este evento?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Eliminar',
            onPress: async () => {
              try {
                // Realiza la solicitud DELETE al webservice para eliminar el evento
                const response = await fetch(
                  `https://noticias-uteq-4c62c24e7cc5.herokuapp.com/eventos/Delete/${item.ID}`,
                  {
                    method: 'DELETE',
                  }
                );
    
                if (!response.ok) {
                  const text = await response.text();
                  throw new Error(`Error al eliminar el evento: ${text}`);
                }
    
                // Actualiza el estado local si la eliminación es exitosa
                const updatedItems = { ...items };
                updatedItems[selectedDate] = updatedItems[selectedDate].filter(
                  (event) => event.ID !== item.ID
                );
                setItems(updatedItems);
    
                Alert.alert('Evento eliminado con éxito');
              } catch (error) {
                console.error('Error al eliminar el evento:', error);
                Alert.alert('Error al eliminar el evento', error.message);
              }
            },
          },
        ]
      );
    };
    
  
    return (
      <View style={styles.item}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemHeaderText}>{item.name}</Text>
        </View>
        <View style={styles.itemBody}>
          <Text style={styles.itemBodyText}>{timeString}</Text>
        </View>
        <View style={styles.itemActions}>
          <TouchableOpacity onPress={handleDeleteItem} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  
  

  const markedDates = useMemo(() => ({ [selectedDate]: { selected: true } }), [selectedDate]);

  return (
    <View style={styles.container}>
      
        <Agenda
          items={items}
          selected={selectedDate}
          renderItem={renderItem}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
        />
      {/* Botón para agregar un nuevo ítem */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity> 

      {/* Modal para agregar un nuevo ítem */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Agregar Nuevo Evento</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Nombre del evento"
                value={newItemName}
                onChangeText={setNewItemName}
                style={styles.textInput}
              />
              <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <Text>{newItemTime.toLocaleTimeString()}</Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={newItemTime}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={(event, date) => {
                    setShowTimePicker(false);
                    if (date) {
                      setNewItemTime(date);
                    }
                  }}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={saveNewItem}>
                <Text style={styles.buttonText}>
                  <Icon name="save" size={18} color="#fff" /> Guardar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>
                  <Icon name="exit" size={18} color="#fff" /> Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  actionIcons: {
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: 300,
    alignItems:'center',
    marginBottom: 15,
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  saveButton: {
    backgroundColor: primaryColor,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: '#FF0000',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft:60
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: primaryColor,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  itemHeader: {
    marginBottom: 10,
  },
  itemHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemBody: {},
  itemBodyText: {
    fontSize: 16,
  },
  itemBodyText: {
    fontSize: 14,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  actionButton: {
    marginHorizontal: 10,
  },
  actionButtonText: {
    color: 'blue',
  },
});

export default App;
