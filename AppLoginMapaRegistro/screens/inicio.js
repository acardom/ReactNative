import React, { useState } from 'react'; 
import { View, Text, StyleSheet, Image, FlatList, ImageBackground } from 'react-native'; 

export default function HomeScreen({ route, navigation }) {

  const [tasks, setTasks] = useState([
    { id: '1', image: require('./../assets/ruta1.jpg') },
    { id: '2', image: require('./../assets/ruta2.jpg') },
    { id: '3', image: require('./../assets/ruta3.jpg') },
    { id: '1', image: require('./../assets/ruta1.jpg') },
    { id: '2', image: require('./../assets/ruta2.jpg') },
    { id: '3', image: require('./../assets/ruta3.jpg') },
  ]);

  return (
    
      <View style={styles.container}>
        <Text style={styles.title}>INICIO</Text>

        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <Image 
              source={item.image} 
              style={styles.image} 
              resizeMode="contain"
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  image: {
    width: 300,
    height: 400,
    marginBottom: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
});
