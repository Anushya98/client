import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen1 = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#280071', '#B01C56']}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.topText}>GPS Tracker</Text>
        <Text style={styles.subText}>Stay Connected, Stay in Touch</Text>
        <View style={styles.middleContainer}>
          <Text style={styles.bottomText}>LOGO</Text>
          <Text style={styles.bottomText}>Screen 2</Text>
          {/* Place your logo image here */}
          {/* <Image source={require('../assets/logo.png')} style={styles.image} /> */}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust the opacity as needed
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 8,
  },
  subText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  bottomText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 16,
  },
});

export default SplashScreen1;
