import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function RegisterScreen({ navigation }) {

    const storedCorreo = AsyncStorage.getItem('correo');

  const validationSchema = Yup.object().shape({
    contraseña: Yup.string()
      .min(5,'tamaño de contraseña entre 5-20') // Verifica tamaño
      .max(20, 'tamaño de contraseña entre 5-20')
      .required('El contraseña es obligatorio'), // Verifica que no esté vacío
  });

  // Función que se ejecuta al enviar el formulario
  const handleRegister = async (values) => {
    try {

        await AsyncStorage.setItem('contraseña', values.contraseña);
        Alert.alert('ya estamos acabando'); // Muestra una alerta de éxito
        navigation.navigate('Registro3'); // Navega a la siguiente pantalla

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

            <Text style={styles.correo}>
                {storedCorreo}
            </Text>

            <Text style={styles.title}>
            Crea una nueva cuenta de komoot
            </Text>
        </View>

      {/* Manejo del formulario con Formik */}
      <Formik
        initialValues={{ contraseña: ''}} // Valores iniciales para los campos
        validationSchema={validationSchema} // Esquema de validación con Yup
        onSubmit={async (values) => {
          // Realiza el registro después de la validación
          await handleRegister(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            {/* Campo para ingresar el contraseña */}
            <TextInput
              style={styles.input}
              placeholder="crea una contraseña"
              value={values.contraseña} // Valor actual del campo
              onChangeText={handleChange('contraseña')} // Actualiza el estado del campo
              secureTextEntry={true} // Asegura que el texto ingresado sea oculto
            />

            

            {/* Mensaje de error para el contraseña */}
            {errors.contraseña && (
              <Text style={styles.errorText}>{errors.contraseña + ''}</Text>
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
    backgroundColor: 'cyan',
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
