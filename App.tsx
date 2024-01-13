// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './Navigators/Stacknavigator';
import { AuthProvider } from './Navigators/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer >
    </AuthProvider >
  );
};

export default App;
