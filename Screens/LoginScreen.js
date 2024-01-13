// src/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../Navigators/AuthContext';

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
    <ImageBackground
      source={require('../assets/Frontpage.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login Page</Text>
        </View>
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
        <LinearGradient
          colors={['#B01C56', '#280071']}
          style={styles.loginButton}
        >
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    width: '100%', // Cover the full width of the screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  titleContainer: {
    alignSelf: 'flex-start', // Align the title container to the start
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'white',
  },
  input: {
    height: 40,
    width: '80%',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: 'white', // Input background color
  },
  loginButton: {
    width: '80%',
    borderRadius: 5,
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
