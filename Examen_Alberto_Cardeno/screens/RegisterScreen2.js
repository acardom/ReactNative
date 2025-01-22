import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function RegisterScreen({ navigation }) {
  // Componente funcional que representa la pantalla de registro de un usuario.
  // `navigation` se usa para navegar entre pantallas, como para regresar a la pantalla de Login después de un registro exitoso.

  const [password, setPassword] = useState(''); 
  // Estado que guarda el nombre de usuario ingresado en el campo de texto.
  // Estado que guarda la contraseña ingresada en el campo de texto.

  const handleRegister = async () => {
    // Función que se ejecuta cuando el usuario presiona el botón de registro.
    const existingUser = await AsyncStorage.getItem('contraseña');

    if (password.length < 6) {
      // comprobamos la longitud
      Alert.alert('Error', 'Contraseña demasiado corta');
      
    } else{
        // guardamos la contraseña
        await AsyncStorage.setItem('contraseña', password);

        Alert.alert('Success', 'Contraseña valida');
        // Mostramos una alerta de éxito.

        navigation.navigate('Login');
        // Después de un registro exitoso, redirigimos al usuario a la pantalla de Login para que pueda iniciar sesión.
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Register</Text>
    
      <TextInput
        style={styles.input}
        placeholder="Pin (6 digitos)"
        value={password}
        onChangeText={setPassword}
        // Campo de texto para ingresar el nombre de usuario.
        // `value` está enlazado al estado `username` y `onChangeText` actualiza este estado a medida que el usuario escribe.
      />
      
      
      <Button title="Crear cuenta" onPress={handleRegister} />
      {/* Botón para enviar el formulario de registro. Al presionar, ejecuta la función `handleRegister`. */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});
