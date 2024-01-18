// StackNavigator.js
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LoadingPage from '../Screens/LoadingPage';
import SplashScreen1 from '../Screens/SplashScreen1';
import SplashScreen2 from '../Screens/SplashScreen2';
import LoginScreen from '../Screens/LoginScreen';
import MainPage from '../Screens/MainPage';
import TabNavigator from './TabNavigator';
import CameraScreen from '../Screens/CameraScreen';
import HomeScreen from '../Tabs/HomeScreen';
import NewLeads from '../Screens/NewLeads';
import ActiveLeads from '../Screens/ActiveLeads';
import LeadSuccessPage from '../Screens/LeadSuccessPage';
import UpdateLeads from '../Screens/UpdateLeads';
import LeadDetails from '../Screens/LeadDetails';
import SuggestionPage from '../Screens/SuggestionPage';
import FeedbackPage from '../Screens/FeedbackPage';
import Complaintpage from '../Screens/Complaintpage';
import Acheivements from '../Screens/Acheivements';
import PersonalDetails from '../Screens/PersonalDetails';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator  
        initialRouteName="LoadingPage"
        screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS, // Use a slide-from-right transition
        }} >
            <Stack.Screen name="LoadingPage" component={LoadingPage} />
            <Stack.Screen name="SplashScreen1" component={SplashScreen1} />
            <Stack.Screen name="SplashScreen2" component={SplashScreen2} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="MainPage" component={TabNavigator} />
            <Stack.Screen name='CameraScreen' component={CameraScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="NewLeads" component={NewLeads} />
            <Stack.Screen name="ActiveLeads" component={ActiveLeads} />
            <Stack.Screen name="LeadSuccessPage" component={LeadSuccessPage} />
            <Stack.Screen name="UpdateLeads" component={UpdateLeads} />
            <Stack.Screen name="LeadDetails" component={LeadDetails} />
            <Stack.Screen name="SuggestionPage" component={SuggestionPage} />
            <Stack.Screen name="FeedbackPage" component={FeedbackPage} />
            <Stack.Screen name="ComplaintPage" component={Complaintpage} />
            <Stack.Screen name="Acheivements" component={Acheivements} />
            <Stack.Screen name="PersonalDetail" component={PersonalDetails} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
