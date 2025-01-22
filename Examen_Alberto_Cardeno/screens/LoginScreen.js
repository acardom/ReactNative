import React, { useState } from 'react'; 
import { View, Text,Image, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  // Componente funcional para la pantalla de Login.
  // `navigation` es utilizado para movernos entre pantallas.

  const [username, setUsername] = useState('');
  // Estado para almacenar el valor del campo "username" que es el correo.
  const [password, setPassword] = useState('');
  // Estado para almacenar el valor del campo "password".

  const handleLogin = async () => {
    // Función que se ejecuta al presionar el botón de Login.
    const storedPassword = await AsyncStorage.getItem('contraseña');
    const storedcorreo = await AsyncStorage.getItem('correo');
    const storednombre = await AsyncStorage.getItem('nombre');
    // Recupera la contraseña y el correo y el nombre 

    if (storedcorreo === username && storedPassword === password) {
      // Si existe la contraseña y el correo almacenada y coincide con la ingresada:
      navigation.navigate('Mi perfil', {storednombre});
      // Navega a la pantalla `Home` pasando el `username` como parámetro.
    } else {
      // Si no coincide, muestra una alerta de error.
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>

    
        <Image 
          source={require('./../img/logo.png')} // Asegúrate de usar la ruta correcta
          style={styles.image} 
          resizeMode="contain" // Ajusta el modo de ajuste según sea necesario
        />
     
      
      <Text style={styles.title}>SERVICI</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={username}
        onChangeText={setUsername}
  
      />
      <TextInput
        style={styles.input}
        placeholder="Pin (6 digitos)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry

      />
      <Text>{'\n'}</Text>
      <Button title="Iniciar Sesion" onPress={handleLogin} />
      {/* Botón para iniciar sesión. Llama a `handleLogin` al presionarlo. */}    
      <Text>{'\n'}</Text>
      <Button 
        title="Crear Cuenta" 
        onPress={() => navigation.navigate('Crear Cuenta')} 
        // Botón para navegar a la pantalla de registro.
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1, 
    justifyContent: 'center',
    padding: 20, 
  },

  image: {
    alignSelf: 'center',
    width: 200, // Ajusta el tamaño según sea necesario
    height: 230,
    marginBottom: 0, // Espacio entre imágenes
  },

  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
