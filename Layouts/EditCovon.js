import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { stylesEditCv } from './Styles/Styles'; // Asegúrate de importar los estilos correctamente
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EditCovon = ({ visible, convocatoria, onClose, onEdit }) => {
    const [editTitulo, setEditTitulo] = useState(convocatoria ? convocatoria.titulo : '');
    const [editAsunto, setEditAsunto] = useState(convocatoria ? convocatoria.asunto : '');
    const [editFechaInicio, setEditFechaInicio] = useState(convocatoria ? convocatoria.fecha_inicio : '');
    const [editFechaFin, setEditFechaFin] = useState(convocatoria ? convocatoria.fecha_fin : '');
    const [editLugar, setEditLugar] = useState(convocatoria ? convocatoria.lugar : '');
    const [editEmisor, setEditEmisor] = useState(convocatoria ? convocatoria.emisor : '');
    const [editPortada, setEditPortada] = useState(convocatoria ? convocatoria.portada : '');
    const [editDestino, setEditDestino] = useState(convocatoria ? convocatoria.destinatario : '');
    const [isDatePickerInicioVisible, setDatePickerInicioVisibility] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isDatePickerFinVisible, setDatePickerFinVisibility] = useState(false);
    const [facultades, setFacultades] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setEditTitulo(convocatoria ? convocatoria.titulo : '');
        setEditAsunto(convocatoria ? convocatoria.asunto : '');
        setEditFechaInicio(convocatoria ? convocatoria.fecha_inicio : '');
        setEditFechaFin(convocatoria ? convocatoria.fecha_fin : '');
        setEditLugar(convocatoria ? convocatoria.lugar : '');
        setEditEmisor(convocatoria ? convocatoria.emisor : '');
        setEditPortada(convocatoria ? convocatoria.portada : '');
        setEditDestino(convocatoria ? convocatoria.destinatario : '');
        fetchFacultades();
    }, [convocatoria]);

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

    const fetchFacultades = async () => {
        try {
            const response = await axios.get('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/facultades/getAll');
            setFacultades(response.data.facultad);
        } catch (error) {
            console.error('Error al obtener las facultades:', error);
        }
    };

    const getFacultadName = (nombre) => {
        const facultad = facultades.find((fac) => fac.nombre === nombre);
        return facultad ? facultad.nombre : 'Institucional';
    };

    const renderDropdown = () => {
        return (
            <Modal visible={dropdownVisible} transparent onRequestClose={() => setDropdownVisible(false)}>
                <View style={stylesEditCv.dropdownContainer}>
                    <View style={stylesEditCv.ContenedorFacultades}>
                        <Text style={stylesEditCv.facultadHeaderText}>Facultades</Text>
                        <ScrollView style={stylesEditCv.scrollView}>
                            <TouchableOpacity
                                style={stylesEditCv.dropdownItem}
                                onPress={() => {
                                    setEditDestino("Institucional"); // Establece el valor "Institucional"
                                    setDropdownVisible(false);
                                }}
                            >
                                <Text style={stylesEditCv.dropdownText}>Institucional</Text>
                            </TouchableOpacity>
                            {facultades.map((facultad, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={stylesEditCv.dropdownItem}
                                    onPress={() => {
                                        setEditDestino(facultad.nombre);
                                        setDropdownVisible(false);
                                    }}
                                >
                                    <Text style={stylesEditCv.dropdownText}>{facultad.nombre}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    };


    const handleSave = async () => {
        setLoading(true);
        // Validar campos requeridos
        if (!editTitulo || !editFechaInicio || !editFechaFin || !editLugar|| !editAsunto||!editEmisor||!editPortada||!editDestino) {
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            return;
        }

        const updatedConvocatoria = {
            titulo: editTitulo,
            asunto: editAsunto,
            fecha_inicio: editFechaInicio,
            fecha_fin: editFechaFin,
            lugar: editLugar,
            emisor: editEmisor,
            portada: editPortada,
            destinatario: editDestino
        };

        try {
            await axios.put(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/noticias/updateconvocatoria/${convocatoria.ID}`, updatedConvocatoria);
            Alert.alert('Éxito', 'La convocatoria ha sido actualizada con éxito.');
            onClose();
            if (onEdit) {
                onEdit(updatedConvocatoria);
            }
        } catch (error) {
            console.error('Error al actualizar la convocatoria:', error);
            Alert.alert('Error', 'Ha ocurrido un error al actualizar la convocatoria. Por favor, inténtelo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const modalContentWidth = windowWidth > 400 ? '80%' : '90%';

    return (
        <Modal visible={visible} animationType="slide" transparent={false}>
            <View style={{ ...stylesEditCv.modalContainer, flex: 1 }}>
                {/* Header */}
                <View style={stylesEditCv.headerContainer}>
                    <Text style={stylesEditCv.headerTitle}>Editar convocatorias</Text>
                </View>


                {/* Content */}
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <View style={{ ...stylesEditCv.modalContent, flex: 1 }}>
                        <Text style={stylesEditCv.modalLabel}>Título:</Text>
                        <TextInput
                            style={stylesEditCv.modalInput}
                            value={editTitulo}
                            onChangeText={setEditTitulo}
                            placeholder="Título de la convocatoria"
                        />
                        <Text style={stylesEditCv.modalLabel}>Asunto:</Text>
                        <TextInput
                            style={stylesEditCv.modalInput}
                            value={editAsunto}
                            onChangeText={setEditAsunto}
                            placeholder="Asunto de la convocatoria"
                            multiline
                            numberOfLines={15}
                            textAlign="left" // Alinea el texto a la izquierda
                            textAlignVertical="top" // Alinea 
                        />

                        <Text style={stylesEditCv.modalLabel}>Fecha de inicio:</Text>
                        <TouchableOpacity onPress={showDatePickerInicio}>
                            <View style={stylesEditCv.dateInputContainer}>
                                <TextInput
                                    style={stylesEditCv.dateInput}
                                    value={editFechaInicio ? new Date(editFechaInicio).toLocaleString() : ""}
                                    placeholder="Fecha de inicio"
                                    editable={false}
                                />
                                <Icon name="calendar" size={20} color="#000" style={stylesEditCv.dateIcon} />
                            </View>
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={isDatePickerInicioVisible}
                            mode="datetime"
                            onConfirm={(date) => {
                                setEditFechaInicio(date.toISOString());
                                hideDatePickerInicio();
                            }}
                            onCancel={hideDatePickerInicio}
                            minimumDate={new Date()}
                            date={editFechaInicio ? new Date(editFechaInicio) : new Date()}
                        />

                        <Text style={stylesEditCv.modalLabel}>Fecha de fin:</Text>
                        <TouchableOpacity onPress={showDatePickerFin}>
                            <View style={stylesEditCv.dateInputContainer}>
                                <TextInput
                                    style={stylesEditCv.dateInput}
                                    value={editFechaFin ? new Date(editFechaFin).toLocaleString() : ""}
                                    placeholder="Fecha de fin"
                                    editable={false}
                                />
                                <Icon name="calendar" size={20} color="#000" style={stylesEditCv.dateIcon} />
                            </View>
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={isDatePickerFinVisible}
                            mode="datetime"
                            onConfirm={(date) => {
                                setEditFechaFin(date.toISOString());
                                hideDatePickerFin();
                            }}
                            onCancel={hideDatePickerFin}
                            minimumDate={new Date()}
                            date={editFechaFin ? new Date(editFechaFin) : new Date()}
                        />


                        <Text style={stylesEditCv.modalLabel}>Lugar:</Text>
                        <TextInput
                            style={stylesEditCv.modalInput}
                            value={editLugar}
                            onChangeText={setEditLugar}
                            placeholder="Lugar de la convocatoria"
                        />
                        <Text style={stylesEditCv.modalLabel}>Emisor:</Text>
                        <TextInput
                            style={stylesEditCv.modalInput}
                            value={editEmisor}
                            onChangeText={setEditEmisor}
                            placeholder="Emisor de la convocatoria"
                        />
                        <Text style={stylesEditCv.modalLabel}>Portada:</Text>
                        <TextInput
                            style={stylesEditCv.modalInput}
                            value={editPortada}
                            onChangeText={setEditPortada}
                            placeholder="Portada de la convocatoria"
                        />

                        <Text style={stylesEditCv.modalLabel}>Destinatario:</Text>
                        <TouchableOpacity style={stylesEditCv.facultadSelector} onPress={() => setDropdownVisible(true)}>
                            <Text style={stylesEditCv.facultadText}>
                                {editDestino ? getFacultadName(editDestino) : 'Institucional'}
                            </Text>
                        </TouchableOpacity>
                        {renderDropdown()}


                        <View style={stylesEditCv.modalButtonContainer}>
                            <TouchableOpacity
                                style={stylesEditCv.modalButton}
                                onPress={handleSave}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="white" />
                                ) : (
                                    <>
                                        <Icon name="save" size={20} color="white" style={{ marginRight: 5 }} />
                                        <Text style={stylesEditCv.modalButtonText}>Guardar</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...stylesEditCv.modalButton, backgroundColor: 'red' }}
                                onPress={onClose}
                                disabled={loading}
                            >
                                <Icon name="close" size={20} color="white" style={{ marginRight: 5 }} />
                                <Text style={stylesEditCv.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

export default EditCovon;
