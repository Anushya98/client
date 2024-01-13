// StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingPage from '../Screens/LoadingPage';
import SplashScreen1 from '../Screens/SplashScreen1';
import SplashScreen2 from '../Screens/SplashScreen2';
import LoginScreen from '../Screens/LoginScreen';
import MainPage from '../Screens/MainPage';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="LoadingPage" screenOptions={{ headerShown: false }} >
            <Stack.Screen name="LoadingPage" component={LoadingPage} />
            <Stack.Screen name="SplashScreen1" component={SplashScreen1} />
            <Stack.Screen name="SplashScreen2" component={SplashScreen2} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="MainPage" component={TabNavigator} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
