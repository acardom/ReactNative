import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function RegisterScreen({ navigation }) {

  const validationSchema = Yup.object().shape({
    correo: Yup.string()
      .email('El formato del correo no es válido') // Verifica que sea un email válido
      .required('El correo es obligatorio'), // Verifica que no esté vacío
  });

  // Función que se ejecuta al enviar el formulario
  const handleRegister = async (values) => {
    try {
      const storedCorreo = await AsyncStorage.getItem('correo'); // Obtiene el correo almacenado

      if (values.correo === storedCorreo) {
        // Si el correo ya existe
        Alert.alert('Ya tiene una cuenta'); // Muestra una alerta de éxito
        navigation.navigate('validar'); // Navega a la siguiente pantalla
      } else {
        // Guarda el correo y el nombre en AsyncStorage
        await AsyncStorage.setItem('correo', values.correo);
        Alert.alert('no dispone de cuenta, creemosla'); // Muestra una alerta de éxito
        navigation.navigate('Registro2'); // Navega a la siguiente pantalla
      }
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
            Escribe tu correo electronico
            </Text>
        </View>

      {/* Manejo del formulario con Formik */}
      <Formik
        initialValues={{ correo: '', nombre: '' }} // Valores iniciales para los campos
        validationSchema={validationSchema} // Esquema de validación con Yup
        onSubmit={async (values) => {
          // Realiza el registro después de la validación
          await handleRegister(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            {/* Campo para ingresar el correo */}
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              value={values.correo} // Valor actual del campo
              onChangeText={handleChange('correo')} // Actualiza el estado del campo
            />

            {/* Mensaje de error para el correo */}
            {errors.correo && (
              <Text style={styles.errorText}>{errors.correo + ''}</Text>
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

  volver:{
    fontSize: 40, 
    color: 'white',
    fontWeight: 'bold', 
    marginEnd: 350,
    marginTop: 30,
  },
});
