import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function RegisterScreen({ navigation }) {
  // Componente funcional que representa la pantalla de registro de un usuario.
  // `navigation` se usa para navegar entre pantallas, como para regresar a la pantalla de Login después de un registro exitoso.

  const [username, setUsername] = useState(''); 
  // Estado que guarda el nombre de usuario ingresado en el campo de texto que es el correo.
  // Estado que guarda la contraseña ingresada en el campo de texto.
  const [nombre, setNombre] = useState(''); 
  //par guardar el nombre

  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  var esValido = emailPattern.test(username);
  //validar correo

  const handleRegister = async () => {
    // Función que se ejecuta cuando el usuario presiona el botón de registro.
    
    const storedcorreo = await AsyncStorage.getItem('correo');
    //comprobar si existe
    if (nombre.length < 4){ //que sea mas larga de 4 digitos
      Alert.alert('Error', 'Nombre demasiado corto');
    }else if(username === storedcorreo){ //comprobamos si existe
      Alert.alert('Error', 'Correo ya existente');
    } else if (!esValido) { //validamos el formato
      Alert.alert('Error', 'Formato de email no valido');
    } else {
      // Si el nombre de usuario no existe, procedemos a registrarlo.
      await AsyncStorage.setItem('correo', username);
      await AsyncStorage.setItem('nombre', nombre);
      // Guardamos el nombre de usuario junto con su contraseña en AsyncStorage.
      navigation.navigate('Crear Cuenta ');
      // pasa al siguiente.
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Register</Text>
    
      <TextInput
        style={styles.input}
        placeholder="Correo Electronico"
        value={username}
        onChangeText={setUsername}
        />

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        />
      
      
      <Button title="Siguiente" onPress={handleRegister} />
      {/* Botón para enviar el formulario de registro. Al presionar, ejecuta la función `handleRegister`. */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});
