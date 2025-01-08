import React from 'react'; // Importamos React para definir un componente funcional.
import { View, Text, Button, StyleSheet } from 'react-native'; // Importamos componentes básicos de React Native.

export default function HomeScreen({ route, navigation }) {
  // Este es un componente funcional que representa la pantalla principal (Home).
  // Recibe dos propiedades:
  // `route`: Contiene los parámetros enviados desde la pantalla anterior.
  // `navigation`: Permite navegar entre pantallas.

  const { username } = route.params; 
  // Extraemos el `username` del objeto `route.params`. Este valor es pasado desde la pantalla de Login.

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>
        Welcome, {username}!
      </Text>

      <Button 
        title="Logout" 
        onPress={() => navigation.navigate('Login')} 
        /* Botón con la etiqueta "Logout". Cuando se presiona, navega de vuelta a la pantalla de Login. */
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
  },
});
