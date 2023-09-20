import { StyleSheet, Dimensions,PixelRatio} from 'react-native';

const { width, height } = Dimensions.get('window');
const cardWidth = width * 0.9;

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const cardWidthM = (width - 150) / 2;

const scale = (size) => {
  const newSize = size * width / 375;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

const isSmallDevice = width < 375;

//Estilos para el Login
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height,
  },
  logoContainer: {
    width: width * 0.7,
    height: height * 0.13,
    marginBottom: height * 0.03,
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: width * 0.1,
    color: 'white',
    fontWeight: 'bold',
    marginTop: height * -0.02,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'white',
    width: width * 0.9,
    marginTop: height * 0.03,
  },
  inputIcon: {
    marginLeft: width * 0.04,
    marginRight: width * 0.02,
  },
  textInput: {
    flex: 1,
    fontSize: width * 0.05,
    color: 'white',
    paddingVertical: height * 0.02,
  },
  passwordInput: {
    flex: 1,
    fontSize: width * 0.05,
    color: 'white',
    paddingVertical: height * 0.02,
  },
  showPasswordButton: {
    padding: width * 0.02,
    marginRight: width * 0.04,
  },
  loginButton: {
    backgroundColor: 'white',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.2,
    borderRadius: width * 0.1,
    marginTop: height * 0.03,
  },
  buttonWithElevation: {
    elevation: 5,
  },
  loginButtonText: {
    fontSize: width * 0.05,
    color: '#46b41e',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerText: {
    fontSize: width * 0.045,
    color: 'white',
    marginTop: height * 0.03,
    textDecorationLine: 'underline',
  },
  passwordText: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: height * 0.03,
    top: 0,
   left: width*0.2, // Ajusta la posición derecha según tus necesidades
  },

});

export const styleshome = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(12),
    backgroundColor: '#f5f6fa',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  sectionTitle: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#46741e',
    textAlign: 'left',
    marginLeft: scale(10),
  },
  cardRevis: {
    width: width * 0.6,
    height: height * 0.4,
    backgroundColor: '#fff',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(20),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.25,
    shadowRadius: scale(3.84),
    marginRight: scale(10),
  },
  cardNoti: {
    width: width * 0.5,
    height: height * 0.4,
    backgroundColor: '#fff',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(20),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.25,
    shadowRadius: scale(3.84),
    marginRight: scale(10),
  },
  cardConte: {
    width: width * 0.55,
    height: height * 0.42,
    backgroundColor: '#fff',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(20),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.25,
    shadowRadius: scale(3.84),
    marginRight: scale(10),
  },
  cardResume: {
    width: width * 0.6,
    height: height * 0.35,
    backgroundColor: '#fff',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(20),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.25,
    shadowRadius: scale(3.84),
    marginRight: scale(10),
  },
  contentCard: {
    marginTop: scale(12),
    width: width * 0.5,
    height: height * 0.43,
    marginBottom: scale(40),
  },
  resumeCard: {
    marginTop: scale(12),
    width: width * 0.6,
    height: height * 0.35,
    marginBottom: scale(40),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: scale(10),
  },
  largeContentImage: {
    width:width*0.55,
    borderRadius:15,
    height: 120,
    resizeMode: 'contain',
},
contentContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: scale(10),
},
reumeContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: scale(10),
},
  logo: {
    width: width * 0.4,
    height: height * 0.2,
    borderRadius: scale(15),
    resizeMode: 'stretch',
  },
  logoRevis: {
    width: width * 0.5,
    height: height * 0.25,
    resizeMode: 'contain',
  },
  contentImage: {
    width: width * 0.4,
    borderRadius:15,
    height: height * 0.25,
    resizeMode: 'contain',
  },
  title: {
    marginTop: scale(5),
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: scale(5),
    alignContent: 'center',
  },
  titleconte: {
    fontSize: scale(18),
    fontWeight: 'bold',
    textAlign: 'left',
  },
  titlerevista: {
    fontSize: scale(15),
    fontWeight: 'bold',
    alignContent: 'center',
    textAlign: 'left',
    width:'100%'
  },
  category: {
    fontSize: scale(14),
    color: 'gray',
  },
  button: {
    backgroundColor: '#46741e',
    borderRadius: scale(8),
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    alignItems: 'center',
    marginTop: scale(8),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scale(14),  // Assuming default font size
  },
  titleContainer: {
    height: scale(48),
  },
  floatingButton: {
    position: 'absolute',
    bottom: scale(20),
    right: scale(20),
    backgroundColor: '#46741e',
    borderRadius: scale(30),
    width: scale(60),
    height: scale(60),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: scale(30),
    color: '#ffffff',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(5),
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  mainButtonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  mainButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#46741e',
    width: 50,
    height: 50,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer: {
    borderRadius: 8,
    padding: 16,
    position: 'absolute',
    right: 0,
    bottom: 80, // Ajusta la posición vertical según tus necesidades
    width: 213, // Ancho del menú desplegable
    zIndex: 2, // Asegúrate de que el zIndex del menú sea mayor que el del contenedor principal
    marginVertical: 9,
  },
  
  closeMenuText: {
    textAlign: 'center',
    color: 'blue', // Color del texto de "Cerrar"
    marginTop: 16,
  },
  menuOption: {
    flexDirection: 'row', // Alinea el icono y el texto horizontalmente
    alignItems: 'center', // Centra verticalmente el contenido del botón
    paddingVertical: 10,
    justifyContent: 'space-between', // Espacio uniforme entre elementos
  },
  menuOptionContent: {
    flexDirection: 'row', // Alinea el icono y el texto horizontalmente
    alignItems: 'center', // Centra verticalmente el contenido del botón
  },

  menuOptionText: {
    marginLeft: 60, // Espacio entre el icono y el texto
    fontSize: 18,
    textAlign:'center',
    color: 'white', // Color del texto
  },

  menuOptionTextC: {
    marginLeft: 14,
    fontSize: 18,
    textAlign:'center',
    color: 'white', // Color del texto
  },
  menuOptionIcon: {
   
  },
  
  iconWithCircle: {
    width:45,  // Ajusta el ancho del contenedor del círculo según tus necesidades
    height: 45, // Ajusta la altura del contenedor del círculo según tus necesidades
    backgroundColor: '#46741e', // Color del círculo
    borderRadius: 30, // La mitad del ancho o altura para hacerlo circular
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25, // Espacio entre el icono y el texto
  },
});

export const stylesVisNotices = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,  // 5% of screen width
    backgroundColor: '#f5f6fa',
  },
  header: {
    fontSize: width * 0.06,  // 6% of screen width
    fontWeight: 'bold',
    color: '#46741e',
    marginBottom: height * 0.025,  // 2.5% of screen height
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: width * 0.03,  // 3% of screen width
    padding: width * 0.04,  // 4% of screen width
    marginBottom: height * 0.025,  // 2.5% of screen height
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: height * 0.005,  // 0.5% of screen height
    },
    shadowOpacity: 0.25,
    shadowRadius: width * 0.03,  // 3% of screen width
    width: width * 0.9,  // 90% of screen width
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: height * 0.25,  // 25% of screen height
    borderRadius: width * 0.02,  // 2% of screen width
    marginBottom: height * 0.015,  // 1.5% of screen height
  },
  title: {
    fontSize: width * 0.045,  // 4.5% of screen width
    fontWeight: 'bold',
    marginBottom: height * 0.01,  // 1% of screen height
  },
  category: {
    fontSize: width * 0.035,  // 3.5% of screen width
    color: 'gray',
    marginBottom: height * 0.015,  // 1.5% of screen height
  },
  button: {
    backgroundColor: '#46741e',
    borderRadius: width * 0.02,  // 2% of screen width
    paddingVertical: height * 0.01,  // 1% of screen height
    paddingHorizontal: width * 0.03,  // 3% of screen width
    alignItems: 'center',
    marginTop: height * 0.015,  // 1.5% of screen height
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,  // 4% of screen width
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  paginationButton: {
    padding: 10,
    backgroundColor: '#46741e',
    borderRadius: 5,
  },
  paginationButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  paginationText: {
    fontSize: 16,
  },

});

export const stylesVisCv = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,  // 5% of screen width
    backgroundColor: '#f5f6fa',
  },
  header: {
    fontSize: width * 0.06,  // 6% of screen width
    fontWeight: 'bold',
    color: '#46741e',
    marginBottom: height * 0.025,  // 2.5% of screen height
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: width * 0.03,  // 3% of screen width
    padding: width * 0.04,  // 4% of screen width
    marginBottom: height * 0.025,  // 2.5% of screen height
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: height * 0.005,  // 0.5% of screen height
    },
    shadowOpacity: 0.25,
    shadowRadius: width * 0.03,  // 3% of screen width
    width: width * 0.9,  // 90% of screen width
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: height * 0.25,  // 25% of screen height
    borderRadius: width * 0.02,  // 2% of screen width
    marginBottom: height * 0.015,  // 1.5% of screen height
  },
  title: {
    fontSize: width * 0.045,  // 4.5% of screen width
    fontWeight: 'bold',
    marginBottom: height * 0.01,  // 1% of screen height
  },
  category: {
    fontSize: width * 0.035,  // 3.5% of screen width
    color: 'gray',
    marginBottom: height * 0.015,  // 1.5% of screen height
  },
  button: {
    backgroundColor: '#46741e',
    borderRadius: width * 0.02,  // 2% of screen width
    paddingVertical: height * 0.01,  // 1% of screen height
    paddingHorizontal: width * 0.03,  // 3% of screen width
    alignItems: 'center',
    marginTop: height * 0.015,  // 1.5% of screen height
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalLabel: {
    fontWeight: 'bold', // Puedes ajustar el peso de la fuente según tus preferencias
    fontSize: 18, // Puedes ajustar el tamaño de la fuente según tus preferencias
    marginBottom: 5, // Agrega un margen inferior para separarlo de los datos
    color:'#46741e',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,  // 4% of screen width
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20, // Espacio entre los botones y otros elementos cercanos
    minWidth: 100, // Ancho mínimo para evitar que los botones sean demasiado estrechos
    backgroundColor: 'lightgray', // Color de fondo predeterminado
},
buttonText: {
    fontSize: 16,
    color: 'white', // Color del texto dentro del botón
},
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#46741e',
  },
  modalText: {
    fontSize: 17,
    marginBottom: 20,
  },
  modalTextT: {
    fontSize: 20,
    marginBottom: 20, 
  fontWeight: 'bold',
  textAlign:'center',

  },
  
  modalButtonText: {
    color: 'white',
    fontSize: 18,
  },
  modalInnerContainer: {
    backgroundColor: 'white', // Color de fondo del contenido modal
    borderRadius: 10, // Radio de borde para redondear las esquinas
    padding: 20, // Espaciado interior del contenido
  },
  modalCloseButton: {
    backgroundColor:'#cf010b', // Color de fondo del botón de cierre
    marginTop: 15, // Espacio superior para separarlo del contenido
    paddingVertical: 10, // Espaciado vertical dentro del botón
    paddingHorizontal: 20, // Espaciado horizontal dentro del botón
    borderRadius: 5, // Radio de borde para redondear las esquinas del botón
  },
  modalCloseButtonText: {
    color: 'white', // Color del texto del botón de cierre
    fontWeight: 'bold', // Peso de fuente en negrita
    textAlign: 'center', // Alineación del texto al centro
    fontSize: 16, // Tamaño de fuente
  },
  modalButton: {
   
    backgroundColor: '#46741e', // Color de fondo para el botón Agendar
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5, // Espacio entre el botón Agendar y el botón Cancelar
},
modalButtonText: {
    fontSize: 16,
    color: 'white', // Color del texto dentro del botón Agendar
},
modalCancelButton: {
    
    backgroundColor: '#cf010b',  // Color de fondo para el botón Cancelar
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5, // Espacio entre el botón Cancelar y el botón Agendar
},
modalCancelButtonText: {
    fontSize: 16,
    color: 'white', // Color del texto dentro del botón Cancelar
},
buttonContainer: {
    flexDirection: 'row', // Coloca los elementos en una fila horizontal
    justifyContent: 'space-between', // Espacia los elementos uniformemente en la fila
    marginTop: 10, // Espaciado superior
},
modalInput: {
    fontSize: 16,
    borderBottomColor: 'lightgray',
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingBottom: 5,
    backgroundColor: 'white', 
    textAlign:'center',
    color:'black',
},


  
});


export const stylesVisContenidos = StyleSheet.create({
  container: {
    padding: windowWidth * 0.05, // 5% del ancho de la pantalla
    backgroundColor: '#f5f6fa',
  },
  header: {
    fontSize: windowWidth * 0.06, // Aproximadamente 6% del ancho
    fontWeight: 'bold',
    color: '#46741e',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: windowWidth * 0.04, // 4% del ancho
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: windowHeight * 0.0025, // 0.25% de la altura
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: windowWidth * 0.5, // 30% del ancho
    height: windowWidth * 0.55, // Mantener un aspect ratio 1:1
    borderRadius: 10,
    resizeMode: 'stretch',
    marginTop: 7,
  },
  logoResumen: {
    width: windowWidth * 0.8, // 30% del ancho
    height: windowWidth * 0.45, // Mantener un aspect ratio 1:1
    borderRadius: 10,
    resizeMode: 'stretch',
    marginTop: 7,
  },
  title: {
    flex: 1,
    fontSize: windowWidth * 0.05, // Aproximadamente 5% del ancho
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: windowWidth * 0.02, // 2% del ancho
    paddingHorizontal: windowWidth * 0.04, // 4% del ancho
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  description: {
    flex: 1,
    marginVertical: 12,
    fontSize: windowWidth * 0.04, // Aproximadamente 4% del ancho
    marginBottom: 10,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: windowWidth * 0.04, // Aproximadamente 4% del ancho
  },
  loadingIndicator: {
    marginTop: 20,
  },
  fecha: {
    textAlign: 'center',
    marginBottom: 6,
    marginTop: 4,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginBottom:height*0.04
  },
  paginationButton: {
    padding: 10,
    backgroundColor: '#46741e',
    borderRadius: 5,
  },
  paginationButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  paginationText: {
    fontSize: 16,
  },
  
});

export const stylesVisRevistas = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f6fa',
  },
  header: {
    fontSize: width * 0.06, // Aproximadamente 6% del ancho de pantalla
    fontWeight: 'bold',
    color: '#46741e',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: width * 0.9,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: width * 0.9, // Asumiendo una relación de aspecto de 3:5, ajusta según necesidad
    borderRadius: 8,
  },
  title: {
    fontSize: width * 0.05, // Aproximadamente 5% del ancho de pantalla
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: width * 0.02, // 2% del ancho de pantalla
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04, // Aproximadamente 4% del ancho de pantalla
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  paginationButton: {
    padding: 10,
    backgroundColor: '#46741e',
    borderRadius: 5,
  },
  paginationButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  paginationText: {
    fontSize: 16,
  },
});


export const stylesPerfil = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderColor: '#46741e',
    borderWidth: windowWidth * 0.007,
    borderRadius: windowWidth * 0.08,
    paddingVertical: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.09,
    alignItems: 'center',
    marginTop: windowHeight * 0.04,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: windowWidth * 0.1,
    borderRadius: windowWidth * 0.02,
    backgroundColor: '#f5f6fa',
  },
  profilePicture: {
    resizeMode: 'stretch',
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    marginBottom: windowHeight * 0.01,
  },
  label: {
    fontSize: windowWidth * 0.045,
    color: '#f5f6fa',
    marginBottom: windowHeight * 0.01,
    borderRadius: windowWidth * 0.05,
    backgroundColor: '#46741e',
    padding: windowWidth * 0.01,
  },
  text: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
  },
  textCorre: {
    fontSize: windowWidth * 0.05,
    marginTop: windowHeight * 0.015,
    marginBottom: windowHeight * 0.025,
    color: '#2a2d3f',
  },
  buttonText: {
    color: '#6A6C88',
    fontWeight: 'bold',
    marginLeft: windowWidth * 0.01,
    fontSize: windowWidth * 0.05,
  },
  buttonTextModal: {
    color: '#f5f6fa',
    fontWeight: 'bold',
    marginLeft: windowWidth * 0.01,
    fontSize: windowWidth * 0.05,
  },
  profileCard: {
    padding: windowWidth * 0.05,
    alignItems: 'center',
    marginTop: -windowWidth * 0.2,
    marginBottom: windowWidth * 0.0,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: windowWidth * 0.002,
      height: windowHeight * 0.002,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  changePasswordButton: {
    borderColor: '#46741e',
    borderWidth: windowWidth * 0.007,
    borderRadius: windowWidth * 0.08,
    paddingVertical: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.09,
    alignItems: 'center',
    marginTop: windowHeight * 0.04,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalInput: {
    flex: 1,
  },
  modalSaveButton: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalCancelButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  line: {
    width: '100%',
    height: windowWidth * 0.008,
    backgroundColor: '#46741e',
    marginBottom: windowHeight * 0.006,
  },
});

export const stylesRetablecer = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: windowWidth * 0.9,
    maxHeight: windowHeight * 0.9,
    backgroundColor: 'white',
    borderRadius: windowWidth * 0.025,
    padding: windowWidth * 0.05,
  },
  modalTitle: {
    fontSize: windowWidth * 0.055,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.01,
    textAlign: 'center',
  },
  modalTitleN: {
    fontSize: windowWidth * 0.055,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.01,
    textAlign: 'center',
    marginLeft: windowWidth * 0.075,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: windowWidth * 0.0025,
    borderColor: 'gray',
    marginTop: windowHeight * 0.025,
    marginBottom: windowHeight * 0.025,
    paddingBottom: windowHeight * 0.005,
    fontSize: windowWidth * 0.04,
  },
  inputIcon: {
    marginRight: windowWidth * 0.025,
  },
  inputLine: {
    borderBottomWidth: windowWidth * 0.0025,
    borderColor: '#ddd',
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: windowWidth * 0.04,
  },
  button: {
    backgroundColor: '#46741e',
    padding: windowWidth * 0.025,
    alignItems: 'center',
    borderRadius: windowWidth * 0.0125,
    marginTop: windowHeight * 0.0125,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: windowHeight * 0.025,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'red',
    fontSize: windowWidth * 0.04,
  },
  backButton: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: windowWidth * 0.05,
    backgroundColor: '#46741e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: windowHeight * 0.0125,
  },
});

export const stylesChat = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieLogo: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
  },
  chatContainer: {
    flex: 1,
    width: '100%',
    padding: windowWidth * 0.05,
    borderTopLeftRadius: windowWidth * 0.05,
    borderTopRightRadius: windowWidth * 0.05,
    backgroundColor: '#e9e9e9',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: windowWidth * 0.05,
    paddingBottom: windowHeight * 0.02,
  },
  input: {
    flex: 1,
    height: windowHeight * 0.05,
    borderColor: '#888',
    borderWidth: windowWidth * 0.002,
    borderRadius: windowWidth * 0.05,
    paddingHorizontal: windowWidth * 0.03,
    marginBottom: windowHeight * 0.01,
    marginTop: windowHeight * 0.01,
    backgroundColor: 'white',
    fontSize: windowWidth * 0.04,
  },
  sendButton: {
    backgroundColor: '#46741e',
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: windowWidth * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: windowWidth * 0.02,
  },
  messageItem: {
    maxWidth: '80%',
    padding: windowWidth * 0.03,
    marginBottom: windowHeight * 0.01,
    borderRadius: windowWidth * 0.05,
    borderWidth: windowWidth * 0.002,
    borderColor: '#ccc',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#46b41e',
    borderTopLeftRadius: windowWidth * 0.05,
    borderBottomLeftRadius: windowWidth * 0.05,
    borderTopRightRadius: windowWidth * 0.015,
    borderBottomRightRadius: windowWidth * 0.05,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#d6d6d6',
    borderTopLeftRadius: windowWidth * 0.015,
    borderBottomLeftRadius: windowWidth * 0.05,
    borderTopRightRadius: windowWidth * 0.05,
    borderBottomRightRadius: windowWidth * 0.05,
  },
  messageText: {
    fontSize: windowWidth * 0.04,
  },
  sentMessageText: {
    color: 'white',
  },
  receivedMessageText: {
    color: '#333',
    fontWeight: '500',
  },
});

export const stylesCrearC = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',    
    paddingBottom: height * 0.1, // Ajustar el espacio inferior
  },
  container2: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  scrollContainer: {
    width:width*1 ,
    flexGrow: 1,
    alignItems: 'center',
  },
  encabezadoTexto: {
    fontSize: width * 0.04,
    color: '#d5d3e0',
  },
  tituloTexto: {
    fontSize: width * 0.09,
    color: '#46741e',
    fontWeight: 'bold',
    marginTop: height * 0.01,
  },
  contentContainer: {
    width: width * 0.9,
    marginTop: height * 0.002,
  },
  label: {
    fontSize: width * 0.05,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    marginTop: height * 0.03,
  },
  textBoxContainer: {
    backgroundColor: 'white',
    borderRadius: 7,
    marginTop: height * 0.001,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textBox: {
    fontSize: width * 0.04,
    borderWidth: 0,
    color: 'black',
    padding: width * 0.03,
    borderRadius: width * 0.1,
  },
  textBoxDescri: {
    fontSize: width * 0.04,
    color: 'black',
    padding: width * 0.03,
    borderRadius: width * 0.1,
    height: height * 0.2,
    textAlignVertical: 'top',
  },
  textBoxUrl: {
    fontSize: width * 0.04,
    borderWidth: 0,
    color: 'black',
    padding: width * 0.03,
    borderRadius: width * 0.1,
  },
  textBoxurl_imageb: {
    fontSize: width * 0.04,
    borderWidth: 0,
    color: 'black',
    padding: width * 0.03,
    borderRadius: width * 0.1,
  },
  publicarButton: {
    backgroundColor: '#46741e',
    borderRadius: width * 0.1,
    width: width * 0.5,
    alignSelf: 'center',
    marginTop: height * 0.05,
    paddingVertical: height * 0.02,
  },
  publicarButtonText: {
    fontSize: width * 0.05,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    borderColor: '#46b41e',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#46b41e',
  },
  radioLabel: {
    fontSize: 16,
    color: 'gray',
    marginRight: 25,
  },
  selectImageButton: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 10,
    width: 150,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  selectImageButtonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerStch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 19,
  },
  text: {
    fontSize: 16,
    marginLeft: 6,
  },
  switchContainer: {
    width: 60,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    paddingHorizontal: 2,
  },
  switchOn: {
    backgroundColor: '#46b41e',
  },
  switchOff: {
    backgroundColor: '#ddd',
  },
  toggleOn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    margin: 2,
  },
  toggleOff: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    margin: 2,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Color de fondo semitransparente
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingOverlay2: {
    position: 'absolute',  // Posición absoluta para cubrir toda la pantalla
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Color de fondo transparente oscuro
    justifyContent: 'center',  // Centrar el contenido verticalmente
    alignItems: 'center',  // Centrar el contenido horizontalmente
  },

});

export const stylesCrearCrr = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: height * 0.01,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: width * 0.005,
    },
    shadowOpacity: 0.12,
    shadowRadius: width * 0.02,
    elevation: 3,
  },
  title: {
    fontSize: width * 0.065,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    color: '#46741e',
    textAlign: 'center',
    paddingHorizontal: width * 0.06,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: height * 0.04,
    paddingHorizontal: width * 0.06,
  },
  label: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginBottom: height * 0.008,
    color: '#46741e',
  },
  input: {
    fontSize: width * 0.045,
    padding: width * 0.03,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: width * 0.02,
    marginBottom: height * 0.02,
    color: '#333333',
  },
  textArea: {
    height: height * 0.14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonGuardar: {
    backgroundColor: '#46741e',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.08,
    borderRadius: width * 0.03,
    marginHorizontal: width * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonLimpiar: {
    backgroundColor: '#e74c3c',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.08,
    borderRadius: width * 0.03,
    marginHorizontal: width * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonTexto: {
    color: '#ffffff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    marginRight: width * 0.015,
  },
  imagePreview: {
    marginTop: height * 0.025,
    alignItems: 'center',
  },
  previewImage: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
  },
});

export const stylesCrearf = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: width * 0.05,
  },
  formContainer: {
    marginTop: height * 0.025,
  },
  heading: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#46741e', // Ajuste de color
    textAlign: 'center',
    marginBottom: height * 0.025,
  },
  inputCoord: {
    backgroundColor: '#FFFFFF',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.02,
    borderRadius: width * 0.02,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#333333',
    width: '70%',
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.02,
    borderRadius: width * 0.02,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#333333',
  },
  coordinateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  coordinateInput: {
    flex: 1,
    marginRight: width * 0.025,
    backgroundColor: '#FFFFFF',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.02,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#333333',
  },
  mapButton: {
    backgroundColor: '#46741e',
    borderRadius: width * 0.02,
    padding: width * 0.025,
    marginLeft: width * 0.0125,
    marginBottom: height * 0.02,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.025,
    paddingBottom: height * 0.025,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#46741e',
    borderRadius: width * 0.02,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    width: '48%',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF5350',
    borderRadius: width * 0.02,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    width: '48%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginLeft: width * 0.02,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  getCoordinatesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#46741e',
    paddingVertical: height * 0.0125,
    paddingHorizontal: width * 0.0375,
    borderRadius: width * 0.02,
    marginTop: height * 0.0125,
  },
  getCoordinatesButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    marginLeft: width * 0.025,
  },
});

export const stylesCrearU = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: windowWidth * 0.05,
  },
  header: {
    paddingTop:windowHeight*0.01,
    fontSize: windowWidth * 0.08,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.01,
    color: '#46741e',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  form: {
    width: '100%',
  },
  fieldContainer: {
    marginBottom: windowHeight * 0.001,
  },
  fieldTitle: {
    fontSize: windowWidth * 0.045,
    fontWeight: 'bold',
    color: '#46741e',
    marginBottom: windowHeight*0.001,
    marginTop: windowHeight * 0.01,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: windowWidth * 0.02,
    elevation: 3,
    padding: windowWidth * 0.03,
  },
  passwordContainer: {
    position: 'relative',
  },
  showPasswordButton: {
    position: 'absolute',
    top: windowHeight * 0.01,
    right: windowWidth * 0.03,
    padding: windowWidth * 0.025,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: windowHeight * 0.03,
  },
  button: {
    backgroundColor: '#46741e',
    borderRadius: windowWidth * 0.02,
    padding: windowWidth * 0.025,
    alignItems: 'center',
    width: windowWidth * 0.5,
  },
  buttonVf: {
    backgroundColor: '#46741e',
    borderRadius: windowWidth * 0.02,
    padding: windowWidth * 0.025,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: windowWidth * 0.04,
  },
  textSeparator: {
    height: windowHeight * 0.025,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: windowWidth * 0.9,
    maxHeight: windowHeight * 0.9,
    borderRadius: windowWidth * 0.025,
    paddingVertical: windowHeight * 0.025,
    paddingHorizontal: windowWidth * 0.03,
  },
  modalTitle: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: windowHeight * 0.02,
  },
  inputIcon: {
    marginRight: windowWidth * 0.03,
  },
  textInput: {
    flex: 1,
    fontSize: windowWidth * 0.04,
    color: 'black',
    paddingVertical: windowHeight * 0.015,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: windowHeight * 0.03,
  },
});

export const stylesEditCrr = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: windowWidth * 0.05,
  },
  modalContent: {
    flex: 1,
    width: '100%',
    padding: windowWidth * 0.05,
  },
  modalTitle: {
    fontSize: windowWidth * 0.055,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.01,
    color: '#46741e',
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: windowWidth * 0.045,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.01,
    color: '#46741e',
  },
  modalInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: windowWidth * 0.03,
    paddingHorizontal: windowWidth * 0.025,
    paddingVertical: windowHeight * 0.01,
    marginBottom: windowHeight * 0.02,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: windowHeight * 0.03,
  },
  modalButton: {
    backgroundColor: '#46741e',
    borderRadius: windowWidth * 0.025,
    padding: windowWidth * 0.025,
    flex: 0.48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: 'red',
    borderRadius: windowWidth * 0.025,
    padding: windowWidth * 0.025,
    flex: 0.48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownItem: {
    backgroundColor: '#FFFFFF',
    padding: windowWidth * 0.025,
    margin: windowWidth * 0.015,
    borderRadius: windowWidth * 0.03,
    alignItems: 'center',
    elevation: 3,
  },
  dropdownText: {
    fontSize: windowWidth * 0.045,
    textAlign: 'center',
  },
  facultadSelector: {
    backgroundColor: '#F5F5F5',
    borderRadius: windowWidth * 0.03,
    paddingHorizontal: windowWidth * 0.025,
    paddingVertical: windowHeight * 0.01,
    marginBottom: windowHeight * 0.02,
  },
  facultadText: {
    fontSize: windowWidth * 0.045,
  },
  ContenedorFacultades: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: windowWidth * 0.025,
    width: '95%',
    borderRadius: windowWidth * 0.04,
  },
  scrollView: {
    width: '100%',
  },
  facultadHeaderText: {
    fontSize: windowWidth * 0.07,
    fontWeight: 'bold',
    margin: windowWidth * 0.04,
    color: '#46741e',
  },
  headerContainer: {
    paddingTop: windowHeight * 0.02,
    paddingBottom: windowHeight * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  headerTitle: {
    color: '#46741e',
    fontSize: windowWidth * 0.08,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export const stylesEditCv = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: windowWidth * 0.0,
  },
  modalContent: {
    flex: 1,
    width: '100%',
    padding: windowWidth * 0.05,
  },
  modalTitle: {
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.01,
    color: '#46741e',
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.01,
    color: '#46741e',
  },
  modalInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: windowWidth * 0.03,
    paddingHorizontal: 10,
    width: windowWidth * 0.86,
    paddingVertical: windowHeight * 0.010,
    marginBottom: windowHeight * 0.02,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: windowHeight * 0.03,
  },
  modalButton: {
    backgroundColor: '#46741e',
    borderRadius: windowWidth * 0.025,
    padding: windowWidth * 0.025,
    flex: 0.48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: 'red',
    borderRadius: windowWidth * 0.025,
    padding: windowWidth * 0.025,
    flex: 0.48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownItem: {
    backgroundColor: '#FFFFFF',
    padding: windowWidth * 0.025,
    margin: windowWidth * 0.015,
    borderRadius: windowWidth * 0.03,
    alignItems: 'center',
    elevation: 3,
  },
  dropdownText: {
    fontSize: windowWidth * 0.045,
    textAlign: 'center',
  },
  facultadSelector: {
    backgroundColor: '#F5F5F5',
    borderRadius: windowWidth * 0.03,
    paddingHorizontal: windowWidth * 0.025,
    paddingVertical: windowHeight * 0.01,
    marginBottom: windowHeight * 0.02,
  },
  facultadText: {
    fontSize: windowWidth * 0.045,
  },
  ContenedorFacultades: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: windowWidth * 0.025,
    width: '95%',
    borderRadius: windowWidth * 0.04,
  },
  scrollView: {
    width: '100%',
  },
  facultadHeaderText: {
    fontSize: windowWidth * 0.07,
    fontWeight: 'bold',
    margin: windowWidth * 0.04,
    color: '#46741e',
  },
  headerContainer: {
    paddingTop: windowHeight * 0.02,
    paddingBottom: windowHeight * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  headerTitle: {
    color: '#46741e',
    fontSize: windowWidth * 0.08,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: windowWidth * 0.03,
    paddingHorizontal: windowWidth * 0.025,
    paddingVertical: windowHeight * 0.01,
    marginBottom: windowHeight * 0.02,
  },
  dateInput: {
    flex: 1,
    marginRight: 10, // Espacio entre el icono de calendario y el texto de la fecha
    fontSize: windowWidth * 0.04,
    color: '#000',
  },
  dateIcon: {
    fontSize: windowWidth * 0.06,
    color: '#000',
  },
});

export const stylesEDitF = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: windowWidth * 0.05,
    width: '105%',
    maxHeight: windowHeight *1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.001,
    textAlign: 'center',
    color: '#46741e',
  },
  modalLabel: {
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    marginVertical: windowHeight * 0.007,
    color: '#46741e',
  },
  modalInput: {
    backgroundColor: '#E9E9E9',
    borderRadius: windowWidth * 0.03,
    paddingHorizontal: windowWidth * 0.025,
    paddingVertical: windowHeight * 0.01,
    marginBottom: windowHeight * 0.001,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: windowHeight * 0.03,
  },
  modalButton: {
    flex: 0.48,
    backgroundColor: '#46741e',
    borderRadius: windowWidth * 0.025,
    padding: windowWidth * 0.025,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  coordinatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: windowHeight * 0.02,
  },
  getCoordinatesButton: {
    backgroundColor: '#46741e',
    borderRadius: windowWidth * 0.025,
    padding: windowWidth * 0.03,
  },
  getCoordinatesButtonText: {
    color: '#FFFFFF',
    fontSize: windowWidth * 0.035,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  googleMapsButton: {
    backgroundColor: '#46741e',
    borderRadius: windowWidth * 0.025,
    padding: windowWidth * 0.025,
  },
  coordinateInput: {
    flex: 0.7,
    backgroundColor: '#E9E9E9',
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.03,
    borderRadius: windowWidth * 0.03,
    color: '#333333',
  },

});

export const stylesGestionCrr = StyleSheet.create({
  card: {
    width: windowWidth*0.9,
    borderRadius: windowWidth * 0.05,
    backgroundColor: '#FFFFFF',
    padding: windowWidth * 0.03,
    marginBottom: windowWidth * 0.03,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: windowWidth * 0.02,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: windowWidth * 0.02,
    paddingHorizontal: windowWidth * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: windowWidth * 0.025,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingVertical: windowWidth * 0.02,
    paddingHorizontal: windowWidth * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: windowWidth * 0.025,
  },
  buttonText: {
    color: '#FFFFFF',
    marginLeft: windowWidth * 0.02,
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
  },
});

export const stylesGestionCv = StyleSheet.create({
  card: {
    width: windowWidth*0.9,
    borderRadius: windowWidth * 0.05,
    backgroundColor: '#FFFFFF',
    padding: windowWidth * 0.03,
    marginBottom: windowWidth * 0.03,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: windowWidth * 0.02,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: windowWidth * 0.02,
    paddingHorizontal: windowWidth * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: windowWidth * 0.025,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingVertical: windowWidth * 0.02,
    paddingHorizontal: windowWidth * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: windowWidth * 0.025,
  },
  buttonText: {
    color: '#FFFFFF',
    marginLeft: windowWidth * 0.02,
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
  },
});
//PENDIENTE
export const stylesGestionCn = StyleSheet.create({
  container: {
    flex: 1,
    padding: windowWidth * 0.05,
    backgroundColor: '#f5f6fa',
  },
  modalButtonCancel: {
    backgroundColor: 'red',
    borderRadius: 4,
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.05,
    marginHorizontal: windowWidth * 0.025,
  },
  header: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    color: '#46741e',
    marginBottom: windowHeight * 0.025,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: windowWidth * 0.05,
    marginBottom: windowHeight * 0.025,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: windowHeight * 0.0125,
  },
  logo: {
    width: windowWidth * 0.4, 
    height: windowWidth * 0.5, 
    borderRadius: 10,
    resizeMode: 'stretch',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    marginBottom: windowHeight * 0.015,
    fontSize: windowWidth * 0.045,
    fontWeight: 'bold',
  },
  description: {
    fontSize: windowWidth * 0.04,
    marginBottom: windowHeight * 0.0125,
    color: 'black',
  },
  fecha: {
    textAlign: 'center',
    marginBottom: windowHeight * 0.0075,
    marginTop: windowHeight * 0.005,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: windowHeight * 0.03,
  },
  button: {
    marginLeft: windowWidth * 0.025,
    paddingHorizontal: windowWidth * 0.0375,
    paddingVertical: windowHeight * 0.0125,
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: '#46741e',
    borderRadius: 4,
    paddingVertical: windowHeight * 0.0125,
    paddingHorizontal: windowWidth * 0.05,
    marginHorizontal: windowWidth * 0.025,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: windowHeight * 0.025,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: windowWidth * 0.05,
    width: windowWidth * 0.8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: windowWidth * 0.025,
    marginBottom: windowHeight * 0.0125,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: windowWidth * 0.025,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
  },
  selectImageButton: {
    backgroundColor: '#46741e',
    borderRadius: 8,
    paddingVertical: windowHeight * 0.01,
    paddingHorizontal: windowWidth * 0.04,
    alignItems: 'center',
    marginTop: windowHeight * 0.0125,
    width: windowWidth * 0.375,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  selectImageButtonText: {
    fontSize: windowWidth * 0.0375,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  uploadIcon: {
    marginRight: windowWidth * 0.02,
  },
});

export const stylesGestionUser = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 50,
  },
  card: {
    backgroundColor: '#fff',
    width: windowWidth * 0.9, // Ajusta al 90% del ancho de la pantalla
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#46741e'
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  valueComple: {
    flex: 2,
    fontSize: 16,
    color: 'black',
    marginTop: 18,
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  modalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalInput: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#46741e',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalValue: {
    fontSize: 16,
    color: '#46741e',
    marginBottom: 11,
    marginTop: 9,
    fontWeight: 'bold',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    paddingVertical: 10,
  },
  buttonContent: {
    flexDirection:'row',
  },
  buttonIcon: {
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
  },
});

export const stylesGestionF = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.05,
  },
  header: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.025,
    color: '#46741e',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  card: {
    width: windowWidth * 0.9, // El 90% del ancho de la pantalla.
    backgroundColor: '#FFFFFF',
    borderRadius: windowWidth * 0.08, // Ajustar el radio según el diseño que prefieras.
    padding: windowWidth * 0.04, // Proporcional al ancho de la pantalla.
    marginBottom: windowHeight * 0.025,
    elevation: 4,
  },
  title: {
    fontSize: windowWidth * 0.045, // Aproximadamente 4.5% del ancho de la pantalla.
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom: windowHeight * 0.02,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginLeft: windowWidth * 0.025,
    paddingHorizontal: windowWidth * 0.0375,
    paddingVertical: windowHeight * 0.0125,
    borderRadius: windowWidth * 0.0125,
  },
  carreraItem: {
    marginBottom: windowHeight * 0.0125,
  },
  carreraTitle: {
    fontSize: windowWidth * 0.045,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.00625,
  },
  carreraDescription: {
    fontSize: windowWidth * 0.04,
    color: '#555555',
  },
});

//NO SE PORQUE DA ERROR CUANDO SE LO BORRA
export const stylesMenu = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'column',
    backgroundColor: '#f5f6fa',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#46741e',
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cardContainer: {
    marginBottom: 20,
    width:150,
    backgroundColor: '#f5f6fa',
  },
});



  export const stylesMenuR = StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: '#f5f6fa',
    },
    header: {
      alignItems: 'center',
      marginBottom: 10,
    },
    headerText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#46741e',
    },
   column: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap', // Esta propiedad permite que los elementos se reorganicen automáticamente
    },
    cardContainer: {
      marginBottom: 20,
      width: (width - 70) / 2, // Para que los botones llenen la mitad del ancho de la pantalla
      backgroundColor: '#f5f6fa',
      marginLeft:25,
    },
    sectionHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      marginTop: 15,
      marginHorizontal:17,
      color: '#46741e',
      backgroundColor: '#eee',
      padding: 10,
      borderRadius: 5, 
    },
});


export const stylesModalCrr = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: windowWidth * 0.8, // Usar un 90% del ancho de pantalla
    backgroundColor: '#f5f6fa',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedModal: {
    height: windowHeight * 0.8, // Usar un 80% del alto de pantalla
  },
  modalTitle: {
    fontSize: windowWidth * 0.06, // Escalar el tamaño de la fuente según el ancho de la pantalla
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  gestionBackButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  card: {
    width: windowWidth * 0.3, // Por ejemplo, que ocupe el 40% del ancho de pantalla
    height: windowWidth * 0.3, // Mantener la proporción 1:1 con el ancho
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f5f6fa',
    elevation: 10,
    marginHorizontal: windowWidth * 0.03, // Espaciado horizontal basado en el ancho de pantalla
    marginBottom: windowHeight * 0.02, // Espaciado vertical basado en el alto de pantalla
  },
  title: {
    marginTop: 5,
    fontSize: windowWidth * 0.04, // Escalar el tamaño de la fuente según el ancho de pantalla
    fontWeight: 'bold',
  },
});


export const stylesModalC = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: windowWidth * 0.8, // Usar un 90% del ancho de pantalla
    backgroundColor: '#f5f6fa',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedModal: {
    height: windowHeight * 0.8, // Usar un 80% del alto de pantalla
  },
  modalTitle: {
    fontSize: windowWidth * 0.06, // Escalar el tamaño de la fuente según el ancho de la pantalla
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  gestionBackButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  card: {
    width: windowWidth * 0.3, // Por ejemplo, que ocupe el 40% del ancho de pantalla
    height: windowWidth * 0.3, // Mantener la proporción 1:1 con el ancho
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f5f6fa',
    elevation: 10,
    marginHorizontal: windowWidth * 0.03, // Espaciado horizontal basado en el ancho de pantalla
    marginBottom: windowHeight * 0.02, // Espaciado vertical basado en el alto de pantalla
  },
  title: {
    marginTop: 5,
    fontSize: windowWidth * 0.04, // Escalar el tamaño de la fuente según el ancho de pantalla
    fontWeight: 'bold',
  },
});

export const stylesModalF = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: windowWidth * 0.8, // Usar un 90% del ancho de pantalla
    backgroundColor: '#f5f6fa',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedModal: {
    height: windowHeight * 0.8, // Usar un 80% del alto de pantalla
  },
  modalTitle: {
    fontSize: windowWidth * 0.06, // Escalar el tamaño de la fuente según el ancho de la pantalla
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  gestionBackButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  card: {
    width: windowWidth * 0.3, // Por ejemplo, que ocupe el 40% del ancho de pantalla
    height: windowWidth * 0.3, // Mantener la proporción 1:1 con el ancho
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f5f6fa',
    elevation: 10,
    marginHorizontal: windowWidth * 0.03, // Espaciado horizontal basado en el ancho de pantalla
    marginBottom: windowHeight * 0.02, // Espaciado vertical basado en el alto de pantalla
  },
  title: {
    marginTop: 5,
    fontSize: windowWidth * 0.04, // Escalar el tamaño de la fuente según el ancho de pantalla
    fontWeight: 'bold',
  },
});

export const stylesRegister = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: windowWidth * 0.85, // Un poco menos ancho para darle más margen
    maxHeight: windowHeight * 0.9, // Dejar un 10% de espacio en la parte superior e inferior
    borderRadius: 15,  // Un poco más redondeado
    paddingVertical: 25, // Más espacio vertical
    paddingHorizontal: 20, // Más espacio horizontal
  },
  modalTitle: {
    fontSize: windowWidth * 0.06, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  radio: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
    borderRadius: windowWidth * 0.025,
    borderWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioSelected: {
    borderColor: '#46b41e',
  },
  radioInner: {
    width: windowWidth * 0.03,
    height: windowWidth * 0.03,
    borderRadius: windowWidth * 0.015,
  },
  radioLabel: {
    fontSize: windowWidth * 0.045,
    color: 'gray',
    marginRight: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderColor: 'gray',
    marginBottom: 25,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: windowWidth * 0.045,
    color: 'black',
    paddingVertical: 12,
  },
  showPasswordButton: {
    padding: 12,
    marginRight: 7,
  },
  registerButton: {
    backgroundColor: '#46b41e',
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: windowWidth * 0.05,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerButtonIcon: {
    marginRight: 7,
  },
  closeButton: {
    backgroundColor: 'gray',
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: windowWidth * 0.05,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButtonIcon: {
    marginRight: 7,
  },
  errorMessage: {
    fontSize: windowWidth * 0.045,
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const stylesModalU = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: windowWidth * 0.8, // Usar un 90% del ancho de pantalla
    backgroundColor: '#f5f6fa',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedModal: {
    height: windowHeight * 0.8, // Usar un 80% del alto de pantalla
  },
  modalTitle: {
    fontSize: windowWidth * 0.06, // Escalar el tamaño de la fuente según el ancho de la pantalla
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  gestionBackButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#46741e',
    borderRadius: 50,
    padding: 5,
  },
  card: {
    width: windowWidth * 0.3, // Por ejemplo, que ocupe el 40% del ancho de pantalla
    height: windowWidth * 0.3, // Mantener la proporción 1:1 con el ancho
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f5f6fa',
    elevation: 10,
    marginHorizontal: windowWidth * 0.03, // Espaciado horizontal basado en el ancho de pantalla
    marginBottom: windowHeight * 0.02, // Espaciado vertical basado en el alto de pantalla
  },
  title: {
    marginTop: 5,
    fontSize: windowWidth * 0.04, // Escalar el tamaño de la fuente según el ancho de pantalla
    fontWeight: 'bold',
  },
});

export const stylesMostrarF = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isSmallDevice ? '#e0e0e0' : '#f0f0f0',
  },
  cardView: {
    margin: 15,
    padding: isSmallDevice ? 8 : 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  googleMapsButtonContainer: {
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
  },
  googleMapsButton: {
    flexDirection: 'row',
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  googleMapsButtonText: {
    fontSize: isSmallDevice ? 14 : 16,
    color: '#fff',
    marginLeft: 5,
  },
  cardTitle: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 5,
  },
  cardContent: {
    fontSize: isSmallDevice ? 14 : 16,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: isSmallDevice ? 18 : 20,
    marginLeft: 15,
    fontWeight: 'bold',
    color: '#46741e',
  },
  video: {
    width: width,
    height: isSmallDevice ? 180 : 200,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#ffffff',
    elevation: 15,
    padding: isSmallDevice ? 8 : 10,
    margin: 5,
  },
  tabText: {
    fontSize: isSmallDevice ? 14 : 16,
    marginLeft: 10,
    color: '#333',
  },
  scrollContainer: {
    marginTop: 5,
    flex: 1,
  },
  tabContent: {
    padding: 15,
    fontSize: isSmallDevice ? 14 : 16,
  },
  carreraCard: {
    margin: isSmallDevice ? 5 : 15,
    padding: isSmallDevice ? 8 : 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  carreraImageContainer: {
    alignItems: 'center', // Centra la imagen horizontalmente
    justifyContent: 'center', // Centra la imagen verticalmente
    overflow: 'hidden', // Asegura que la imagen no desborde el contenedor
  },
  carreraImage: {
    width: '100%',
    height: isSmallDevice ? 120 : 150,
    borderRadius: 10,
  },
  carreraTitle: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  carreraDescription: {
    fontSize: isSmallDevice ? 14 : 15,
    color: '#555',
  },
  websiteButton: {
    backgroundColor: '#46741e',
    flex: 0.48, // Esto hará que el botón ocupe casi la mitad del espacio disponible, dejando un poco de margen
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  websiteButtonText: {
    color: '#fff',
    fontSize: isSmallDevice ? 14 : 16,
  },
  closeButton: {
    backgroundColor: '#ff4757',
    flex: 0.48, // Esto hará que el botón ocupe casi la mitad del espacio disponible, dejando un poco de margen
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  justifyContent: 'center',
    marginLeft: 15
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Esto es opcional, para dar espacio entre los botones.
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: isSmallDevice ? 14 : 16,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  socialButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
    elevation: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',  // Asegura que los items están centrados verticalmente
    marginLeft: 5, // Espacio entre el icono y el texto
  },
  

    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      width: '100%', // Para cubrir toda la pantalla
      height: '100%', // Para cubrir toda la pantalla
      padding: 10,
      alignItems: 'center',
    },
    modalImage: {
      width: '100%',
      height: isSmallDevice ? (width - 200) : (width - 200), // Ajusta según sea necesario
    },
    modalTitle: {
      fontSize: isSmallDevice ? 24 : 28, // Aumentar el tamaño de la fuente
      fontWeight: 'bold',
      color: '#46741e',
      textAlign: 'center',
      marginBottom: 10, // Agrega margen para separar del imagen
    },
    modalDescription: {
      fontSize: isSmallDevice ? 16 : 18, // Aumentar el tamaño de la fuente
      color: '#333',
      marginBottom: 20,
      textAlign: 'center',
    },
    contentContainer: {
      padding: 16, // Agrega un padding interno
      alignItems: 'center', // Centra los elementos horizontalmente
    },
    

  
});

export const stylesNabvarUp = StyleSheet.create({
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
    padding: 10
  },
  closeSearchModalButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  searchResultsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 25,
    width: width * 0.95,
    maxHeight: height * 0.8,
  },
  searchResultItem: {
    fontSize: 18,
    padding: 10,
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
    backgroundColor: '#46b41e',
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
    backgroundColor: '#00A200',
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
    maxHeight: 200,
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
  line: {
    width: '80%',
    height: 3,
    backgroundColor: 'white', // Color de la línea
    marginBottom: '2%',
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
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginHorizontal: 10, // Espacio entre los botones
    backgroundColor: 'white', // Color de fondo de Facebook
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  Buttonface: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginHorizontal: 10, // Espacio entre los botones
    backgroundColor: 'blue', // Color de fondo de Facebook
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  ButtonTik: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginHorizontal: 10, // Espacio entre los botones
    backgroundColor: '#000', // Color de fondo de Facebook
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  Buttontwt: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginHorizontal: 10, // Espacio entre los botones
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  infoButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,

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

});

export const stylesNofi = StyleSheet.create({
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
      width: windowWidth * 0.9,
      height: windowHeight * 0.9,
      backgroundColor: '#f5f6fa',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
      paddingHorizontal: 20,
      paddingBottom: 10,
  },
  modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  notificationDescription: {
      fontSize: 14,
      color: '#777',
      marginBottom: 20,
  },
  notificationList: {
      flexGrow: 1,
      marginBottom: 10,
  },
  notificationItem: {
      marginBottom: 15,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderColor: '#ddd',
  },
  notificationTitulo: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
  },
  notificationDescripcion: {
      fontSize: 14,
      color: '#777',
      marginBottom: 5,
  },
  newIndicator: {
      color: 'red',
  },
  modalCloseButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      backgroundColor: 'red',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
  },
  closeButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 5,
  },
});

