import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const ConvocatoriaScreen = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [portada, setPortada] = useState('');
    const [facultad, setFacultad] = useState('');
    const [lugar, setlugar] = useState('');
    const [emisor, setEmisor] = useState('');
    const [facultadesList, setFacultadesList] = useState([]);
    const [isDatePickerInicioVisible, setDatePickerInicioVisibility] = useState(false);
    const [isDatePickerFinVisible, setDatePickerFinVisibility] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [isOn, setIsOn] = useState(false);

    const handleToggleSwitch = () => {
        setIsOn((prevIsOn) => !prevIsOn);
        if (!isOn) {
            setPortada('https://static.vecteezy.com/system/resources/previews/002/868/728/original/megaphone-with-speech-bubble-illust-vector.jpg');
        } else {

            setPortada('');
        }
    };
    const isValidImageUrl = async (url) => {
        try {
            const response = await axios.get(url, {
                method: 'HEAD', // Solo consulta los encabezados y no descarga todo el recurso
                timeout: 5000 // Por ejemplo, máximo 5 segundos de espera
            });

            const contentType = response.headers['content-type'];
            return contentType && contentType.startsWith('image/');

        } catch (error) {
            console.log('Error validating image URL:', error);
            return false;
        }
    };
    const showDatePickerInicio = () => {
        setDatePickerInicioVisibility(true);
    };

    const hideDatePickerInicio = () => {
        setDatePickerInicioVisibility(false);
    };

    const showDatePickerFin = () => {
        setDatePickerFinVisibility(true);
    };

    const hideDatePickerFin = () => {
        setDatePickerFinVisibility(false);
    };
    const handleConfirmInicio = (date) => {
        setFechaInicio(date.toISOString()); // Guardar la fecha en formato ISO
        hideDatePickerInicio();
    };

    const handleConfirmFin = (date) => {
        setFechaFin(date.toISOString()); // Guardar la fecha en formato ISO
        hideDatePickerFin();
    };
    const handlePublish = async () => {
        if (!titulo || !descripcion || !fechaInicio || !fechaFin || !portada || !lugar || !emisor) {
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            return;
        }

        // Validación de URL de imagen
        const isImageUrlValid = await isValidImageUrl(portada);
        if (!isImageUrlValid) {
            Alert.alert('Error', 'Por favor, proporcione una URL válida de imagen para la portada.');
            return;
        }

        if (selectedType === 'facultad' && !facultad) {
            Alert.alert('Error', 'Por favor, seleccione una facultad.');
            return;
        }

        const inicioDate = new Date(fechaInicio);
        const finDate = new Date(fechaFin);

        if (finDate <= inicioDate) {
            Alert.alert('Error', 'La fecha y hora de finalización deben ser posteriores a la fecha y hora de inicio.');
            return;
        }
        try {
            const nuevaExposicion = {
                titulo: titulo,
                asunto: descripcion,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                lugar: lugar,
                emisor: emisor,
                portada: portada,
                destinatario: selectedType
            };
          
            await fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/noticias/registerfiltroconvocatoria', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(nuevaExposicion),
            });
            // Mostrar el mensaje de éxito y realizar las acciones necesarias
            Alert.alert(
              'Éxito',
              'Convocatoria correctamente.',
              [
                {
                  text: 'Aceptar',
                  onPress: () => {
                    setTitulo(""),
                    setDescripcion(""),
                    setFechaInicio(""),
                    setFechaFin(""),
                    setlugar(""),
                    setEmisor(""),
                    setPortada(""),
                    setSelectedType("")
                    setIsOn(false);
                  },
                },
              ],
              { cancelable: false }
            );
          } catch (error) {
            console.error('Error al guardar los datos:', error);
          }
          

    }



    useEffect(() => {
        // Realizar la solicitud HTTP para obtener las facultades desde el webservice
        axios.get('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/facultades/getall')
            .then((response) => {
                setFacultadesList(response.data.facultad);
            })
            .catch((error) => {
                console.error('Error al obtener las facultades:', error);
            });
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Convocatoria</Text>
            <ScrollView >
                <Text style={styles.label}>Título</Text>
                <TextInput
                    style={styles.input}
                    value={titulo}
                    placeholder="Ingrese un titulo"
                    onChangeText={setTitulo}
                />

                <Text style={styles.label}>Asunto</Text>
                <TextInput
                    style={styles.inputMultiline}
                    value={descripcion}
                    placeholder="Ingrese una Asunto"
                    onChangeText={setDescripcion}
                    multiline
                />

                <Text style={styles.label}>Fecha de Inicio</Text>
                <View style={styles.dateContainer}>
                    <TextInput
                        style={styles.inputf}
                        value={fechaInicio ? new Date(fechaInicio).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ""}
                        editable={false}
                        placeholder="Seleccione una fecha de inicio"
                    />
                    <TouchableOpacity onPress={showDatePickerInicio} style={styles.dateIcon}>
                        <Icon name="calendar" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                <DateTimePickerModal
                    isVisible={isDatePickerInicioVisible}
                    mode="datetime"
                    onConfirm={handleConfirmInicio} // Usar handleConfirmInicio
                    onCancel={hideDatePickerInicio}
                    minimumDate={new Date()}
                />

                <Text style={styles.label}>Fecha de Finalización</Text>
                <View style={styles.dateContainer}>
                    <TextInput
                        style={styles.inputf}
                        value={fechaFin ? new Date(fechaFin).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ""}
                        editable={false}
                        placeholder="Seleccione una fecha de finalización"
                    />
                    <TouchableOpacity onPress={showDatePickerFin} style={styles.dateIcon}>
                        <Icon name="calendar" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                <DateTimePickerModal
                    isVisible={isDatePickerFinVisible}
                    mode="datetime"
                    onConfirm={handleConfirmFin} // Usar handleConfirmFin
                    onCancel={hideDatePickerFin}
                    minimumDate={new Date()}
                />
                <Text style={styles.label}>Lugar</Text>
                <TextInput
                    style={styles.input}
                    value={lugar}
                    placeholder="Ingrese un Lugar"
                    onChangeText={setlugar}
                />
                <Text style={styles.label}>Emisor</Text>
                <TextInput
                    style={styles.input}
                    value={emisor}
                    placeholder="Ingrese un Nombre"
                    onChangeText={setEmisor}
                />
                <Text style={styles.label}>Portada</Text>
                <TextInput
                    style={styles.input}
                    value={portada}
                    placeholder="Seleccione una portada"
                    onChangeText={setPortada}
                />
                <View style={styles.containerStch}>
                    <TouchableOpacity
                        style={[styles.switchContainer, isOn ? styles.switchOn : styles.switchOff]}
                        onPress={handleToggleSwitch}
                    >
                        <View style={isOn ? styles.toggleOn : styles.toggleOff} />
                    </TouchableOpacity>
                    <Text style={styles.text}>Imagen determinada</Text>
                </View>
                <Text style={styles.label}>Destinatario</Text>
                <Picker
                    selectedValue={selectedType}
                    onValueChange={(itemValue) => setSelectedType(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Seleccione un destinatario" value="" />
                    <Picker.Item label="Institucional" value="Institucional" />
                    {facultadesList.map((facultadItem) => (
                        <Picker.Item
                            key={facultadItem.ID}
                            label={facultadItem.nombre}
                            value={facultadItem.nombre}
                        />
                    ))}
                </Picker>

                <TouchableOpacity
                    style={styles.publishButton}
                    onPress={handlePublish}
                >
                    <Text style={styles.publishButtonText}>Publicar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#46741e',
    },
    label: {
        fontSize: 18,
        color: 'black',
        marginTop: 20,
        fontWeight: 'bold',
    },
    input: {
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 6,
        backgroundColor: 'white', // Puedes ajustar el color de fondo si lo necesitas
    },
    inputMultiline: {
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
        height: 100,
        textAlignVertical: 'top',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 6,
        shadowRadius: 2,
        backgroundColor: 'white', // Puedes ajustar el color de fondo si lo necesitas
    },
    picker: {
        marginTop: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 6,
        backgroundColor: 'white', // Puedes ajustar el color de fondo si lo necesitas
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
    publishButton: {
        backgroundColor: "#46741e",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    publishButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        elevation: 6,
        marginTop: 5,
        width: width * 0.89,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        backgroundColor: 'white',
    },
    inputf: {
        flex: 1,
        borderWidth: 0, // Elimina el borde ya que el contenedor ya tiene uno
        marginRight: 10, // Espacio a la derecha para el ícono
    },
    radioGroupContainer: {
        flexDirection: 'row', // Esto hará que los radio buttons estén en una fila
        alignItems: 'center',
        marginTop: 10,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButtonText: {
        fontSize: 16,
        marginLeft: 5,
    },
    containerStch: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 19,
    },
    text: {
        fontSize: 15,
        marginLeft: 6,
    },
    switchContainer: {
        width: 40,
        height: 20,
        borderRadius: 15,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#ddd',
        paddingHorizontal: 2,
    },
    switchOn: {
        backgroundColor: '#46741e',
    },
    switchOff: {
        backgroundColor: '#ddd',
    },
    toggleOn: {
        width: 20,
        height: 20,
        borderRadius: 13,
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        margin: 2,
    },
    toggleOff: {
        width: 20,
        height: 20,
        borderRadius: 13,
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        margin: 2,
    },


});
export default ConvocatoriaScreen;
