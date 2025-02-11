import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  // Coordenadas de los tres puntos
  const points = [
    { latitude: 37.3918209, longitude: -5.9883026, title: 'IES Velázquez'},
    { latitude: 37.3918211, longitude: -5.9883024, title: 'Parada 1'},
    { latitude: 37.3918208, longitude: -5.9883027, title: 'Parada 2'},
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.3918209,
          longitude: -5.9883026,
          latitudeDelta: 0.01, // Controla el nivel de zoom
          longitudeDelta: 0.01, // Controla el nivel de zoom
        }}
      >
        {/* Marcadores para los puntos */}
        {points.map((point, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            title={point.title}
            description={point.description}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
