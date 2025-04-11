import React from 'react'; // Importamos React para definir un componente funcional.
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native'; // Importamos componentes básicos de React Native.
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ route, navigation }) {

    const storedNombre = AsyncStorage.getItem('nombre');

  return (

    <ImageBackground 
      source={require('./../assets/bienvenida.jpg')} 
      style={styles.background}
    >

    <View style={styles.container}>
      
      <Text style={styles.title}>
        {storedNombre}, tu próxima aventura empiza aqui.
      </Text>

      <Text style={styles.title2}>
        Planifica las mejores rutas, descubre los mejores reincones al aire libre y vive aventuras increibles a tu manera
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('inicio')} >
        <Text style={styles.buttonText}>EMPECEMOS</Text>
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
  },

  background: {
    flex: 1,
    resizeMode: 'cover',
  },

  button:{
    backgroundColor: 'white',
    padding: 10,
    width: 200,
    marginTop: 'auto',
    marginBottom: 50,
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
    marginTop: 90,
  },

  title2: { 
    fontSize: 14, 
    color: 'white',
    fontWeight: 'bold', 
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
  },
});
