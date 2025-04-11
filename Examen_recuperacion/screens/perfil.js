import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function RegisterScreen({ navigation }) {

    const storedNombre = AsyncStorage.getItem('nombre');

 

  return (
    <View style={styles.container}>

      
            

            <Text style={styles.correo}>
                Este es el perfil de {storedNombre}
            </Text>

            
        

            
    </View>
  );
}

const styles = StyleSheet.create({

  container: { 
    flex: 1,
    alignItems: 'center',
    image: './../assets/ruta1.png',
  },

  errorText:{
    color: 'red',
  },

  button:{
    backgroundColor: 'gray',
    padding: 5,
    marginTop: 30,
    width: 130,
    
  },

  buttonText:{
    color: 'white',
    fontSize: 20, 
    textAlign: 'center',
  },

  encabezado:{
    padding: 10,
    
    paddingTop: 80,
  },

  image: {
    width: 200,
    marginBottom: 'auto',
    marginTop: 20,
  },

  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginBottom: 10, 
    marginTop:30,
    width: 300,
    textAlign: 'center',
    borderRadius: 5 }, // Estilo del campo de texto

  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center',
    color: 'black',
    margin: 40,
    
  },

  correo:{
    fontWeight: 'bold', 
    color: 'black',
    marginTop: 80,
    textAlign: 'center',
  },

  volver:{
    fontSize: 40, 
    color: 'black',
    fontWeight: 'bold', 
    marginEnd: 350,
    marginTop: 30,
  },
});
