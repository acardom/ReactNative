import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';

// Colores que se utilizarán en el juego
const colors = ['🍉', '🍎', '🍌', '🍇', '🍈', '🍑'];

// Función para mezclar colores
const shuffleColors = () => [...colors, ...colors].sort(() => Math.random() - 0.5);

const MemoryGame = () => {
  const [cards, setCards] = useState(shuffleColors().map(color => ({ color, flipped: false })));
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [points, setPoints] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const animatedValues = useRef(cards.map(() => new Animated.Value(0))).current; // Valores de animación por carta

  const handleCardPress = (index) => {
    if (cards[index].flipped || flippedIndices.length === 2) return;

    const newCards = [...cards];
    newCards[index].flipped = true; // Marcar la carta como volteada
    setCards(newCards);
    setFlippedIndices([...flippedIndices, index]);
    setAttempts(attempts + 1); // Incrementar intentos

    // Animación de giro
    Animated.timing(animatedValues[index], {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      if (flippedIndices.length === 1) {
        const firstIndex = flippedIndices[0];

        // Comprobar si las cartas coinciden
        if (newCards[firstIndex].color === newCards[index].color) {
          setPoints(points + 1);
          setFlippedIndices([]);

          // Verificar si se completaron todas las parejas
          if (points + 1 === colors.length) {
            Alert.alert('¡Felicidades!', 'Has completado el juego.');
            resetGame(); // Reiniciar el juego
          }
        } else {
          // Si no coinciden, ocultar las cartas después de un retraso
          setTimeout(() => {
            newCards[firstIndex].flipped = false;
            newCards[index].flipped = false;
            setCards(newCards);
            setFlippedIndices([]);

            // Girar de nuevo para ocultar los colores
            Animated.timing(animatedValues[firstIndex], {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }).start();
            Animated.timing(animatedValues[index], {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }).start();
          }, 400);
        }
      }
    });
  };

  const resetGame = () => {
    setCards(shuffleColors().map(color => ({ color, flipped: false })));
    setFlippedIndices([]);
    setPoints(0);
    setAttempts(0);
    animatedValues.forEach((value) => value.setValue(0)); // Reiniciar animaciones
  };

  // Función para interpolar la rotación
  const rotateInterpolate = (index) => {
    return animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
  };

  return (
    <View style={styles.container}>
      <Text>Puntos: {points}</Text>
      <Text>Intentos: {attempts}</Text> 
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCardPress(index)}
            style={styles.cardContainer}
          >
            <Animated.View style={{
              transform: [{ rotateY: rotateInterpolate(index) }],
              backgroundColor: card.flipped ? card.color : '#c97f01',
              width: 80,
              height: 80,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
              {/* Mostrar la estrella hasta 90 grados */}
              <Animated.View style={{
                opacity: animatedValues[index].interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 0, 0],
                }),
                position:'absolute',
              }}>
                <Text style={styles.cardText}>⭐</Text>
              </Animated.View>
              {/* Mostrar el color después de 90 grados */}
              <Animated.View style={{
                opacity: animatedValues[index].interpolate({
                  inputRange: [0.5, 1],
                  outputRange: [0, 1],
                }),
              }}>
                <Text style={styles.cardText}>{card.color}</Text>
              </Animated.View>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.buttonText}>REINICIAR</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: 300,
  },
  cardContainer: {
    margin: 5,
  },
  resetButton: {
    marginTop: 50,
    padding: 20,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  cardText: {
    fontSize: 40,
  },
});

export default MemoryGame;
