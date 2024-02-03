// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './Navigators/Stacknavigator';
import { AuthProvider } from './Navigators/AuthContext';
import { MapProvider } from './Navigators/MapContext';  

const App = () => {
  return (
    <AuthProvider>
      <MapProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </MapProvider>
    </AuthProvider>
  );
};

export default App;
