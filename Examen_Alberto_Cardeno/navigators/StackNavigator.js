import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegisterScreen2 from '../screens/RegisterScreen2';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Crear Cuenta" component={RegisterScreen} />
      <Stack.Screen name="Crear Cuenta " component={RegisterScreen2}/>
      <Stack.Screen name="Mi perfil" component={HomeScreen} />
    </Stack.Navigator>
  );
}
