import React, { useEffect, useState } from 'react'; 
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export { default as UNSTABLE_usePreventRemove} from './usePreventRemove';

const Stack = createNativeStackNavigator();

//home com una lista con los parametros de la lista
function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([
    { id: '1', text: '🍓🍓🍓🍓', nombre: 'Fresas', description: 'Descripción de Fresas'},
    { id: '2', text: '🍎🍏🍎🍏', nombre: 'Manzanas', description: 'Descripción de Manzanas'},
    { id: '3', text: '🍉🍉🍉🍉', nombre: 'Sandias', description: 'Descripción de Sandias'},
    { id: '4', text: '🍍🍍🍍🍍', nombre: 'Piñas', description: 'Descripción de Piñas'},
    { id: '5', text: '🍇🍇🍇🍇', nombre: 'Uvas', description: 'Descripción de Uvas'},
    { id: '6', text: '🍌🍌🍌🍌', nombre: 'Platanos', description: 'Descripción de Platanos'},
    { id: '7', text: '🥭🥭🥭🥭', nombre: 'Mangos', description: 'Descripción de Mangos'},
    { id: '8', text: '🍈🍈🍈🍈', nombre: 'Melones', description: 'Descripción de Melones'},
    { id: '9', text: '🍋🍋🍋🍋', nombre: 'Limones', description: 'Descripción de Limones'},
  ]);


  //cada vez que se pulse un objeto e la lista (onpress) recogemos la id, el nombre y la descripcion para cambiar de pagina y 
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Task', { taskName: item.nombre, taskDescription: item.description })}> 
            <View style={styles.taskContainer}>
              <Text style={styles.taskText}> 
                {item.text}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}


//este const es para cambiar el nombre superior del task
const TaskScreen = ({ route, navigation }) => {
  // Desestructuración de los parámetros pasados a esta pantalla
  const { taskName, taskDescription } = route.params;

  // Efecto secundario para establecer el título de la pantalla dinámicamente
  useEffect(() => {
    // Cambiar el título de la barra de navegación al nombre de la tarea
    navigation.setOptions({ title: taskName });
  }, [navigation, taskName]); // Se ejecuta cuando navigation o taskName cambian

  return (
    <View style={styles.container}>
      {/* Mostrar la descripción de la tarea */}
      <Text style={styles.taskDetailText}>{taskDescription}</Text>
    </View>
  );
};


//screen que tenemos y la inicial home
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Task" component={TaskScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};



//estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f5f5f5',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, 
  },
  taskText: {
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center',
    flex: 1,
  },
  taskDetailText: {
    fontSize: 20,
    marginVertical: 10,
  },
});

export default App;
