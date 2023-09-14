import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking, Modal, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { stylesVisCv } from './Styles/Styles';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import moment from 'moment';
import 'moment-timezone';

const ConvocatoriaCard = ({ convocatoria, onViewMore, onAgendar }) => {
    const handleReadMore = () => {
        if (onViewMore) {
            onViewMore();
        }
    };

    const horaInicioEcuador = moment.tz(convocatoria.fecha_inicio, 'America/Guayaquil');
    const horaFormateada = horaInicioEcuador.format('YYYY-MM-DD HH:mm:ss'); // Puedes ajustar el formato según tus necesidades
    const handleAgendar = () => {
        if (onAgendar) {
            onAgendar();
        }
    };
    return (
        <View style={stylesVisCv.card}>
            <Image source={{ uri: convocatoria.portada }} style={stylesVisCv.image} />
            <Text style={stylesVisCv.title}>{convocatoria.titulo}</Text>
            <Text style={stylesVisCv.date}>{horaFormateada}</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{ ...stylesVisCv.button, backgroundColor: 'green' }} // Botón "Ver más" en verde
                    onPress={handleReadMore}
                >
                    <View style={stylesVisCv.buttonContent}>
                        <Text style={stylesVisCv.buttonText}>Ver detalles</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...stylesVisCv.button, backgroundColor: 'blue' }} // Botón "Agendar" en azul
                    onPress={handleAgendar}
                >
                    <View style={stylesVisCv.buttonContent}>
                        <Text style={stylesVisCv.buttonText}>Agendar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>


    );
};

const ListaConvocatorias = () => {
    const [convocatorias, setConvocatorias] = useState([]);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
    const [selectedConvocatoria, setSelectedConvocatoria] = useState(null);
    const [titulo, setTitulo] = useState(''); // Estado para el título
    const [fechaSinHora, setFechaSinHora] = useState(''); // Estado para la fecha sin hora
    const [horaSinFecha, setHoraSinFecha] = useState(''); // Estado para la hora sin fecha
    const { user, setUser } = useContext(AuthContext);



    const fetchData = async () => {
        try {
            const response = await fetch(`https://noticias-uteq-4c62c24e7cc5.herokuapp.com/noticias/convocatoriafill/${user.ID}`);
            if (response.ok) {
                const data = await response.json();
                setConvocatorias(data.convocatorias);
                console.log('Datos de convocatorias:', data.convocatorias);
            } else {
                console.error('Error al obtener las convocatorias:', response.status);
            }
        } catch (error) {
            console.error('Error al obtener las convocatorias:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user.ID]);

    const handleViewMore = (convocatoria) => {
        setDetailModalVisible(true);
        setSelectedConvocatoria(convocatoria);
    };

    const handleAgendar = (convocatoria) => {
        const fechaInicio = moment(convocatoria.fecha_inicio);
        
        // Establecer los estados con las fechas y horas
        setTitulo(convocatoria.titulo);
        setFechaSinHora(fechaInicio.format('YYYY-MM-DD'));
        setHoraSinFecha(fechaInicio.format('HH:mm:ss'));
        setScheduleModalVisible(true);
    };
    

    const closeDetailModal = () => {
        setDetailModalVisible(false);
    };

    const closeScheduleModal = () => {
        setScheduleModalVisible(false);
    };


    const handleButtonClick = async () => {
        const eventData = {
            ID_usuario: user.ID,
            name: titulo,
            time: fechaSinHora + 'T' + horaSinFecha + 'Z', // Formato "YYYY-MM-DDTHH:mm:ssZ"
            date: fechaSinHora + 'T00:00:00Z', // Formato "YYYY-MM-DDT00:00:00Z"
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        };

        try {
            const response = await fetch('https://noticias-uteq-4c62c24e7cc5.herokuapp.com/eventos/Insert', requestOptions);

            if (!response.ok) {
                throw new Error(`Error al realizar la solicitud: ${response.status}`);
            }
            const data = await response.json();
            alert('Se agendó con éxito');
            setTimeout(() => {
                closeScheduleModal();
            }, 1000); // 1000 milisegundos = 1 segundo
    

        } catch (error) {
            // Maneja los errores aquí
            console.error('Error:', error);
        }
    };


    return (
        <View style={stylesVisCv.container}>
            <Text style={stylesVisCv.header}>Lista de Convocatorias</Text>
            <ScrollView>
                {convocatorias.map((convocatoria, index) => (
                    <ConvocatoriaCard
                        key={index}
                        convocatoria={convocatoria}
                        onViewMore={() => handleViewMore(convocatoria)}
                        onAgendar={() => handleAgendar(convocatoria)}
                    />
                ))}
            </ScrollView>

            {/* Modal de Detalles */}
            <Modal
                visible={detailModalVisible}
                animationType="slide"
                transparent={true} // Establece la transparencia en true
            >
                <View style={stylesVisCv.modalContainer}>
                    <View style={stylesVisCv.modalContent}>
                        <Text style={stylesVisCv.modalTitle}>Detalles de Convocatoria</Text>
                        {selectedConvocatoria ? (
                            <View style={stylesVisCv.modalInnerContainer}>
                                <Text style={stylesVisCv.modalTextT}>{selectedConvocatoria.titulo}</Text>
                                <Image source={{ uri: selectedConvocatoria.portada }} style={stylesVisCv.modalImage} />
                                <View style={stylesVisCv.modalInfo}>
                                    <View style={stylesVisCv.modalInfoRow}>
                                        <Text style={stylesVisCv.modalLabel}>Asunto:</Text>
                                        <Text style={stylesVisCv.modalText}>{selectedConvocatoria.asunto}</Text>
                                    </View>
                                    <View style={stylesVisCv.modalInfoRow}>
                                        <Text style={stylesVisCv.modalLabel}>Fecha de Inicio:</Text>
                                        <Text style={stylesVisCv.modalText}>
                                            {moment(selectedConvocatoria.fecha_inicio).tz('America/Guayaquil').format('LLL')}
                                        </Text>
                                    </View>
                                    <View style={stylesVisCv.modalInfoRow}>
                                        <Text style={stylesVisCv.modalLabel}>Fecha de Fin:</Text>
                                        <Text style={stylesVisCv.modalText}>
                                            {moment(selectedConvocatoria.fecha_fin).tz('America/Guayaquil').format('LLL')}
                                        </Text>
                                    </View>
                                    <View style={stylesVisCv.modalInfoRow}>
                                        <Text style={stylesVisCv.modalLabel}>Lugar:</Text>
                                        <Text style={stylesVisCv.modalText}>{selectedConvocatoria.lugar}</Text>
                                    </View>
                                    <View style={stylesVisCv.modalInfoRow}>
                                        <Text style={stylesVisCv.modalLabel}>Emisor:</Text>
                                        <Text style={stylesVisCv.modalText}>{selectedConvocatoria.emisor}</Text>
                                    </View>
                                    <View style={stylesVisCv.modalInfoRow}>
                                        <Text style={stylesVisCv.modalLabel}>Destinatario:</Text>
                                        <Text style={stylesVisCv.modalText}>{selectedConvocatoria.destinatario}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={stylesVisCv.modalCloseButton}
                                    onPress={closeDetailModal}
                                >
                                    <Text style={stylesVisCv.modalCloseButtonText}>Cerrar</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={stylesVisCv.modalInnerContainer}>
                                <Text>Detalles de Convocatoria no disponibles</Text>
                                <TouchableOpacity
                                    style={stylesVisCv.modalCloseButton}
                                    onPress={closeDetailModal}
                                >
                                    <Text style={stylesVisCv.modalCloseButtonText}>Cerrar</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>



            {/* Modal de Agendamiento */}
            <Modal
                visible={scheduleModalVisible}
                animationType="slide"
                transparent={true} // Establece la transparencia en true
            >
                <View style={stylesVisCv.modalContainer}>
                    <View style={stylesVisCv.modalContent}>
                        <Text style={stylesVisCv.modalTitle}>Agendar Convocatoria</Text>

                        {/* Etiqueta para Título */}
                        <Text style={stylesVisCv.modalLabel}>Título:</Text>
                        <TextInput
                            style={stylesVisCv.modalInput}
                            placeholder="Título"
                            value={titulo}
                            editable={false} // Esto hace que el campo no sea editable
                        />

                        <Text style={stylesVisCv.modalLabel}>Fecha:</Text>
                        <TextInput
                            style={stylesVisCv.modalInput}
                            placeholder="Fecha (D de MMMM de YYYY)"
                            value={fechaSinHora}
                            editable={false} // Esto hace que el campo no sea editable
                        />

                        <Text style={stylesVisCv.modalLabel}>Hora:</Text>
                        <TextInput
                            style={stylesVisCv.modalInput}
                            placeholder="Hora (HH:mm)"
                            value={horaSinFecha}
                            editable={false} // Esto hace que el campo no sea editable
                        />

                        <View style={stylesVisCv.buttonContainer}>
                            <TouchableOpacity
                                style={stylesVisCv.modalButton}
                                onPress={handleButtonClick}
                            >
                                <Text style={stylesVisCv.modalButtonText}>Agendar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={stylesVisCv.modalCancelButton}
                                onPress={closeScheduleModal}
                            >
                                <Text style={stylesVisCv.modalCancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>

        </View>
    );
};

export default ListaConvocatorias;
