import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function RegisterScreen({ navigation }) {

    const storedCorreo = AsyncStorage.getItem('correo');

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required('El nombre es obligatorio'), // Verifica que no esté vacío
  });

  // Función que se ejecuta al enviar el formulario
  const handleRegister = async (values) => {
    try {

        await AsyncStorage.setItem('nombre', values.nombre);
        Alert.alert('ya estamos acabando'); // Muestra una alerta de éxito
        navigation.navigate('Bienvenida'); // Navega a la siguiente pantalla

    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al registrar. Inténtalo nuevamente.');
    }
  };

 

  return (
    <View style={styles.container}>

        <View style={styles.encabezado}>
            <Text style={styles.volver} onPress={() => navigation.navigate('Login')}>
            ⇦ 
            </Text>

            <Text style={styles.title}>
            ¡Da los toques finales a tu perfil¡
            </Text>
        </View>

      {/* Manejo del formulario con Formik */}
      <Formik
        initialValues={{ nombre: ''}} // Valores iniciales para los campos
        validationSchema={validationSchema} // Esquema de validación con Yup
        onSubmit={async (values) => {
          // Realiza el registro después de la validación
          await handleRegister(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            {/* Campo para ingresar el nombre */}
            <TextInput
              style={styles.input}
              placeholder="¿Como te llamas?"
              value={values.nombre} // Valor actual del campo
              onChangeText={handleChange('nombre')} // Actualiza el estado del campo
            />

            

            {/* Mensaje de error para el nombre */}
            {errors.nombre && (
              <Text style={styles.errorText}>{errors.nombre + ''}</Text>
            )}

            {/* Botón para enviar el formulario */}
            
      <TouchableOpacity style={styles.button} onPress={() => { handleSubmit();}} > 
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>

          </>
        )}
      </Formik>
            
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
    backgroundColor: 'green',
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
    color: 'white',
    margin: 40,
    
  },

  correo:{
    fontWeight: 'bold', 
    color: 'white',
    textAlign: 'center',
  },

  volver:{
    fontSize: 40, 
    color: 'white',
    fontWeight: 'bold', 
    marginEnd: 350,
    marginTop: 30,
  },
});
