import React from 'react'; // Importamos React para definir un componente funcional.
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native'; // Importamos componentes básicos de React Native.
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ route, navigation }) {

  return (

    <ImageBackground 
      source={require('./../assets/inicio_registro.jpg')} 
      style={styles.background}
    >

    
    <View style={styles.container}>


      <Image 
        source={require('./../assets/logo.png')} // Asegúrate de usar la ruta correcta
        style={styles.image} 
        resizeMode="contain" // Ajusta el modo de ajuste según sea necesario
      />
      
      <Text style={styles.title}>
        Registra o inicia sesion para disfutar de aventuras increibles al aire libre
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registro1')} >
        <Text style={styles.buttonText}>Continuar con correo</Text>
      </TouchableOpacity>

      
            
    </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    image: './../assets/ruta1.png',
  },

  button:{
    backgroundColor: 'white',
    padding: 20,
    width: 300,
    
  },

  background: {
    flex: 1,
    resizeMode: 'cover',
  },

  buttonText:{
    color: 'gray',
    fontSize: 20, 
    textAlign: 'center',
  },

  image: {
    width: 200,
    marginTop: 20,
  },

  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center',
    color: 'white',
    margin: 40,
    marginBottom: 200,
  },
});
