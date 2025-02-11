import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import Registro1 from '../screens/Registropaso1';
import Registro2 from '../screens/Registropaso2';
import Registro3 from '../screens/Registropaso3';
import Bienvenida from '../screens/bienvenida';
import validar from '../screens/validarContraseña';
import inicio from '../screens/inicio';
import TabNavigator from './TabNavigator';  // Importación del Tab Navigator

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />

      <Stack.Screen 
        name="Registro1" 
        component={Registro1} 
        options={{ headerShown: false }} 
      />

      <Stack.Screen 
        name="Registro2" 
        component={Registro2} 
        options={{ headerShown: false }} 
      />

      <Stack.Screen 
        name="Registro3" 
        component={Registro3} 
        options={{ headerShown: false }} 
      />

      <Stack.Screen 
        name="Bienvenida" 
        component={Bienvenida} 
        options={{ headerShown: false }} 
      />

      <Stack.Screen 
        name="validar" 
        component={validar} 
        options={{ headerShown: false }} 
      />

      <Stack.Screen 
        name="inicio" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      
      
    </Stack.Navigator>
  );
}
