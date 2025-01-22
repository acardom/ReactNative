import React from 'react'; // Importamos React para definir un componente funcional.
import { View, Text, Button, StyleSheet } from 'react-native'; // Importamos componentes básicos de React Native.
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ route, navigation }) {
  // Este es un componente funcional que representa la pantalla principal (Home).
  // Recibe dos propiedades:
  // `route`: Contiene los parámetros enviados desde la pantalla anterior.
  // `navigation`: Permite navegar entre pantallas.

  
  const storednombre = AsyncStorage.getItem('nombre');
  
  // extraemos el nombre

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}/* mostramos el nombre */>
        Welcome, {storednombre}! 
      </Text>
      

      <Button 
        title="Logout" 
        onPress={() => navigation.navigate('Login')} 
        /* Aqui queria implementsr el mapa para probar si funciona */
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
