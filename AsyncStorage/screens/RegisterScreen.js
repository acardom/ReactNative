import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function RegisterScreen({ navigation }) {
  // Componente funcional que representa la pantalla de registro de un usuario.
  // `navigation` se usa para navegar entre pantallas, como para regresar a la pantalla de Login después de un registro exitoso.

  const [username, setUsername] = useState(''); 
  // Estado que guarda el nombre de usuario ingresado en el campo de texto.
  const [password, setPassword] = useState(''); 
  // Estado que guarda la contraseña ingresada en el campo de texto.

  const handleRegister = async () => {
    // Función que se ejecuta cuando el usuario presiona el botón de registro.
    
    const existingUser = await AsyncStorage.getItem(username);
    // Usamos `AsyncStorage.getItem` para verificar si el nombre de usuario ya está registrado (guardado en AsyncStorage).
    // Si ya existe, la variable `existingUser` contendrá la contraseña asociada a ese usuario.

    if (existingUser) {
      // Si `existingUser` tiene un valor (es decir, el usuario ya existe), mostramos una alerta de error.
      Alert.alert('Error', 'Username already exists');
    } else {
      // Si el nombre de usuario no existe, procedemos a registrarlo.
      await AsyncStorage.setItem(username, password);
      // Guardamos el nombre de usuario junto con su contraseña en AsyncStorage.

      Alert.alert('Success', 'User registered successfully');
      // Mostramos una alerta de éxito al registrar al usuario correctamente.

      navigation.navigate('Login');
      // Después de un registro exitoso, redirigimos al usuario a la pantalla de Login para que pueda iniciar sesión.
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Register</Text>
    
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        // Campo de texto para ingresar el nombre de usuario.
        // `value` está enlazado al estado `username` y `onChangeText` actualiza este estado a medida que el usuario escribe.
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button title="Register" onPress={handleRegister} />
      {/* Botón para enviar el formulario de registro. Al presionar, ejecuta la función `handleRegister`. */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});
