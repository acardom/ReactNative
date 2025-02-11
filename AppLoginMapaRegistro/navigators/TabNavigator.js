import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import inicio from '../screens/inicio';
import rutas from '../screens/rutas';
import perfil from '../screens/perfil';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Rutas') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Mis viajes') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Grabar') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Premiun') {
            iconName = focused ? 'star' : 'star-outline';
          } 

          // Retorna el ícono correspondiente
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false, // Oculta los nombres de las pestañas
        tabBarActiveTintColor: 'tomato', // Color para el ícono activo
        tabBarInactiveTintColor: 'gray', // Color para el ícono inactivo
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={inicio}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Rutas"
        component={rutas}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Grabar"
        component={() => null}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Perfil"
        component={perfil}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Premiun"
        component={() => null}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
