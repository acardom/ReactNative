import React, { useState } from 'react'; 
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native'; 

const App = () => {  {/* Estado para almacenar la tarea actual y la lista de tareas*/}

  const [task, setTask] = useState(''); {/* Almacena el texto de la tarea a agregar*/}
  const [tasks, setTasks] = useState([]); {/* Almacena la lista de tareas*/}

  const addTask = () => {
    if (task) { {/* Verifica si hay texto en la tarea*/}
      setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]); {/*los 3 puntos son para expandir el array tasks // Agrega la nueva tarea al estado de tareas*/}
      setTask(''); {/* Limpia el campo de entrada*/}
    }
  };


  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t ,  {/* Utiliza el operador de propagación ...t para copiar todas las propiedades de la tarea original y Cambia la propiedad completed a su valor opuesto (!t.completed). : t simplemente devuelve la tarea original sin cambios.*/}
    ));
  };


  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id)); // Filtra y elimina la tarea cuyo ID coincide
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input} // Estilo del campo de texto
        placeholder="Escribe una tarea" 
        value={task} // Valor actual del campo de entrada
        onChangeText={setTask} // Actualiza el estado de 'task' al escribir
      />
      <Button title="Agregar Tarea" onPress={addTask} />
      
      <FlatList
        data={tasks} // Datos a mostrar en la lista
        renderItem={({ item }) => ( // Cómo se renderiza cada tarea
          <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}> 
            <View style={styles.taskContainer}>
              <Text style={[styles.taskText, item.completed && styles.completedTask]}> {/* Texto de la tarea */}
                {item.text}
              </Text>
              <TouchableOpacity onPress={() => deleteTask(item.id)}> {/* Permite eliminar la tarea */}
                <Text style={styles.deleteText}>Eliminar</Text> {/* Texto para eliminar */}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    marginTop: 40,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, 
  },
  taskText: {
    fontSize: 16, 
  },
  completedTask: {
    textDecorationLine: 'line-through', 
    color: '#a9a9a9', 
  },
  deleteText: {
    color: 'red',
  },
});

export default App; // Exporta el componente principal
