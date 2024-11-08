import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

// Objeto de provincias con sus códigos
const provincias = {
  Almería: '04',
  Cádiz: '11',
  Córdoba: '14',
  Granada: '18',
  Huelva: '21',
  Jaén: '23',
  Málaga: '29',
  Sevilla: '41',
};

// Función para normalizar el texto: eliminar tildes y convertir a minúsculas
const normalizarTexto = (texto) => {
  const mapaTildes = {
    á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u',
    Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U',
    ñ: 'n', Ñ: 'N'
  };
  return texto
    .split('')
    .map((letra) => mapaTildes[letra] || letra)
    .join('')
    .toLowerCase();
};

const App = () => {
  const [provincia, setProvincia] = useState('');
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Función para obtener el clima de la provincia
  const obtenerClima = () => {
    // Reseteamos el estado del clima antes de hacer una nueva solicitud
    setClima(null);

    // Normalizamos el nombre de la provincia ingresada (minúsculas y sin tildes)
    const provinciaNormalizada = normalizarTexto(provincia);

    // Verificamos si la provincia es válida
    const provinciaEncontrada = Object.keys(provincias).find((prov) =>
      normalizarTexto(prov) === provinciaNormalizada
    );

    if (!provinciaEncontrada) {
      Alert.alert('Error', 'Por favor ingresa una provincia válida de Andalucía.');
      return;
    }

    setCargando(true);
    const codigoProvincia = provincias[provinciaEncontrada];

    // Hacer la solicitud a la API
    axios
      .get(`https://www.el-tiempo.net/api/json/v2/provincias/${codigoProvincia}`)
      .then((response) => {
        console.log('Respuesta de la API:', response.data); // Depuración
        const data = response.data;

        if (data && data.ciudades && data.ciudades.length > 0) {
          const ciudad = data.ciudades[3]; // Tomamos la cuarta ciudad de la lista

          // Extraemos los datos del clima
          setClima({
            temperatura: `${ciudad.temperatures.max}°C / ${ciudad.temperatures.min}°C`,
            descripcion: ciudad.stateSky.description,
            icono: ciudad.stateSky.id, // Si se quiere usar iconos
          });
        } else {
          Alert.alert('Error', 'No se pudo obtener la información del clima.');
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema al obtener el clima.');
      })
      .finally(() => {
        setCargando(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Clima Actual de Andalucía</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa el nombre de una provincia"
        value={provincia}
        onChangeText={setProvincia}
      />

      <Button title="Obtener Clima" onPress={obtenerClima} disabled={cargando} />

      {cargando && <Text style={styles.cargando}>Cargando...</Text>}

      {clima && (
        <View style={styles.climaContainer}>
          <Text style={styles.temperatura}>{clima.temperatura}</Text>
          <Text style={styles.descripcion}>{clima.descripcion}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  cargando: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  climaContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  temperatura: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  descripcion: {
    fontSize: 18,
    color: '#555',
  },
  icono: {
    width: 80,
    height: 80,
    marginTop: 10,
  },
});

export default App;
