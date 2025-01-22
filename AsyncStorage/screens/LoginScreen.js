import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  // Componente funcional para la pantalla de Login.
  // `navigation` es utilizado para movernos entre pantallas.

  const [username, setUsername] = useState('');
  // Estado para almacenar el valor del campo "username".
  const [password, setPassword] = useState('');
  // Estado para almacenar el valor del campo "password".

  const handleLogin = async () => {
    // Función que se ejecuta al presionar el botón de Login.
    const storedPassword = await AsyncStorage.getItem(username);
    // Recupera la contraseña asociada al `username` desde AsyncStorage.

    if (storedPassword && storedPassword === password) {
      // Si existe la contraseña almacenada y coincide con la ingresada:
      navigation.navigate('Home', { username });
      // Navega a la pantalla `Home` pasando el `username` como parámetro.
    } else {
      // Si no coincide, muestra una alerta de error.
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
  
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry

      />
      <Text>{'\n'}</Text>
      <Button title="Login" onPress={handleLogin} />
      {/* Botón para iniciar sesión. Llama a `handleLogin` al presionarlo. */}    
      <Text>{'\n'}</Text>
      <Button 
        title="Register" 
        onPress={() => navigation.navigate('Register')} 
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
