import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // Iconos predeterminados

export default function ProfileScreen({ navigation }) {
  const [nombre, setNombre] = useState('');

  // Obtener el nombre almacenado al cargar la pantalla
  useEffect(() => {
    const fetchNombre = async () => {
      const storedNombre = await AsyncStorage.getItem('nombre');
      if (storedNombre) {
        setNombre(storedNombre);
      }
    };
    fetchNombre();
  }, []);

  return (
    <View style={styles.container}>
      {/* Encabezado con icono de usuario */}
      <View style={styles.header}>
        <Ionicons name="person-circle" size={100} color="#007bff" />
        <Text style={styles.nombre}>{nombre}</Text>
      </View>

     

      {/* Botón para volver */}
      <TouchableOpacity
        style={styles.volverButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.volverButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  nombre: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  volverButton: {
    marginTop: 30,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  volverButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});