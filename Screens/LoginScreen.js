import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../Navigators/AuthContext';
import Svg, { Circle } from 'react-native-svg';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Login Button Pressed');
    login();
    navigation.navigate('MainPage');
  };

  return (
    <View
      style={styles.container}
    >
      <View style={styles.header}>
        {/* Logo */}
        <Text style={styles.topText}>LOGO</Text>
      </View>
      <LinearGradient
        colors={[ '#280071', '#B01C56']}
        style={styles.welcome}
      >
        <Text style={styles.welcomeText}>Welcome to GPS Tracker</Text>
      </LinearGradient>

      <View style={styles.svgContainer}>
        <Image source={require('../assets/Login.png')} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={{ color: '#B01C56', alignSelf: 'center', marginLeft: 20, fontSize:16 }}>Forgot Password?</Text>
        <LinearGradient
          colors={['#280071', '#B01C56']}
          style={styles.loginButton}
        >
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: 'white',
  },
  topText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B01C56',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  welcome: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
  },
  welcomeText: {
    fontSize: 22,
    color: 'white',
    marginLeft: 8,
  },
  svgContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginTop: 15,
  },
  input: {
    height: 50,
    width: '100%',
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: 'gray',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 40,
  },
  loginButton: {
    width: '50%',
    borderRadius: 25,
    paddingVertical: 10,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen;
