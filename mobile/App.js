import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { width } = Dimensions.get('window');

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#CE7095',
  },
};

const descriptions = [
  "Grace Murray: Pioneira na programação de computadores.",
  "Augusta Ada Byron: Primeira programadora da história.",
  "Margaret Heafield: Desenvolveu o software de voo para o programa Apollo.",
  "Sonia Guimarães: Primeira mulher negra a se tornar física no Brasil.",
  "Katherine Coleman Goble Johnson: Matemática que contribuiu para a NASA.",
  "Radia Joy Perlman: Inventora do protocolo Spanning Tree."
];

const AnimatedImage = ({ source, name, description }) => {
  const [borderColor] = useState(new Animated.Value(0));
  const [brightness] = useState(new Animated.Value(0.8)); // Valor inicial ajustado para 0.8
  const [showName, setShowName] = useState(false);
  const [cardHeight] = useState(new Animated.Value(0));

  const handlePressIn = () => {
    setShowName(true);
    Animated.parallel([
      Animated.timing(borderColor, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(brightness, {
        toValue: 1.5,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(cardHeight, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    setShowName(false);
    Animated.parallel([
      Animated.timing(borderColor, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(brightness, {
        toValue: 0.8, // Valor ajustado para 0.8
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(cardHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const borderColorInterpolation = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', 'white'],
  });

  const brightnessInterpolation = brightness.interpolate({
    inputRange: [0.8, 1.5],
    outputRange: ['brightness(80%)', 'brightness(150%)'],
  });

  return (
    <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.imageWrapper, { borderColor: borderColorInterpolation }]}>
        <Animated.Image source={source} style={[styles.image, { filter: brightnessInterpolation }]} />
        {showName && (
          <View style={styles.overlay}>
            <Text style={styles.imageName}>{name}</Text>
          </View>
        )}
        <Animated.View style={[styles.card, { height: cardHeight }]}>
          <Text style={styles.cardText}>{description}</Text>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.backgroundDesign}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]} />
          <View style={[styles.circle, styles.square1]} />
        </View>
        <Text style={styles.texto1}>Conheça as <Text style={styles.highlight}>mulheres</Text> que mudaram a tecnologia</Text>
        <TouchableOpacity style={styles.button} onPress={() => alert('Botão pressionado!')}>
          <Text style={styles.buttonText}>Saiba mais</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <AnimatedImage source={require('./assets/1.png')} name="GRACE MURRAY" description={descriptions[0]} />
          <AnimatedImage source={require('./assets/2.png')} name="AUGUSTA ADA BYRON" description={descriptions[1]} />
          <AnimatedImage source={require('./assets/2.png')} name="MARGARET HEAFILD" description={descriptions[2]} />
          <AnimatedImage source={require('./assets/3.png')} name="GRACE MURRAY" description={descriptions[3]} />
          <AnimatedImage source={require('./assets/4.png')} name="SONIA GUIMARÃES" description={descriptions[4]} />
          <AnimatedImage source={require('./assets/5.png')} name="Katherine Coleman Goble Johnson" description={descriptions[5]} />
          <AnimatedImage source={require('./assets/6.png')} name="Radia Joy Perlman" description={descriptions[6]} />
        </View>
      </ScrollView>
    </View>
  );
}

function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto1}>Sobre</Text>
    </View>
  );
}

function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto1}>Contato</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyNavigation() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator>
        <Tab.Screen name="Inicio" component={HomeScreen} options={{ tabBarLabel: 'Inicio', headerShown: false }} />
        <Tab.Screen name="Sobre" component={AboutScreen} options={{ tabBarLabel: 'Sobre', headerShown: false }} />
        <Tab.Screen name="Contato" component={ContactScreen} options={{ tabBarLabel: 'Contato', headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <MyNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 50,
  },
  backgroundDesign: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circle: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.8,
  },
  circle1: {
    width: 200,
    height: 200,
    backgroundColor: '#CE7095',
    top: -80,
    left: -40,
  },
  circle2: {
    width: 80,
    height: 80,
    top: 50,
    right: 30,
    backgroundColor: '#F8BBD0',
  },
  circle3: {
    width: 520,
    height: 1000,
    bottom: -20,
    backgroundColor: '#855E6E',
    left: -50,
    top: 342,
  },
  square1: {
    width: 30,
    height: 60,
    left: -100,
    backgroundColor: '#855E6E',
  },
  texto1: {
    fontSize: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: 'black',
    fontWeight: 'bold',
    top: 80,
  },
  highlight: {
    color: '#E57373',
  },
  button: {
    backgroundColor: '#F8BBD0',
    paddingVertical: 10,
    paddingHorizontal: 19,
    borderRadius: 12,
    marginTop: 20,
    elevation: 10,
    top: 50,
    left: -125,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    top: 210,
  },
  imageWrapper: {
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    overflow: 'hidden',
  },
  image: {
    width: 150,
    height: 150,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
 
  },
  cardText: {
    fontSize: 14,
    color: 'black',
  },
});