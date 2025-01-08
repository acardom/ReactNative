import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { StyleSheet, View } from 'react-native';
import MapView , { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_KEY} from '@env';
const car=require('./assets/coche.png');

export default function App() {
  const [origen, setOrigen]=useState({
    latitude:37.3918209,
    longitude:-5.9883026,
  });
  
  const [destino, setDestino]=useState({
    latitude:37.3918209,
    longitude:-5.9883026,
  });

  useEffect (()=>{
    getLocationPermission();
  },[])

  async function getLocationPermission(){
    let {status}=await Location.requestForegroundPermissionsAsync(); 
    if(status!=='granted'){
      alert("Permiso denegado");
      return;
    }
    let location=await Location.getCurrentPositionAsync({});
    const ubicacion={
      latitude:location.coords.latitude,
      longitude:location.coords.longitude
    }
    setOrigen(ubicacion);
  }

  return (
    <View style={styles.container}>
      <MapView>
        style={styles.map}
        initialRegion={{
          latitude: origen.latitude,
          longitude: origen.longitud,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      
        <Marker
          draggable
          image={car}
          coordinate={origen}
          onDragEnd={(e) => setOrigen(e.nativeEvent.coordinate)}
        />
        <Marker
          draggable
          coordinate={destino}
          onDragEnd={(e) => seDestino(e.nativeEvent.coordinate)} 
        />
        <MapViewDirections
          origin={origen}
          destination={destino}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor="blue"
          strokeWidth={5}
        />
        <Polyline
          coordinates={[origen, destino]}
          strokeColor="blue"
          strokeWidth={5}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
