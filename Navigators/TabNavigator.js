// navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomersScreen from '../Tabs/CustomerScreen';
import NotificationsScreen from '../Tabs/NotificationScreen';
import ActiveLeadsScreen from '../Tabs/ActiveLeadScreen';
// import NewLeadsScreen from '../Tabs/HomeScreen';
import ProfileScreen from '../Tabs/ProfileScreen';
import HomeScreen from '../Tabs/HomeScreen';
import { useAuth } from './AuthContext';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { isLoggedIn } = useAuth(); // Use the isLoggedIn state from the context

    if (isLoggedIn) {
        // If logged in, navigate to 'MainPage'
        return (
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    activeTintColor: 'blue',
                    inactiveTintColor: 'gray',
                    tabBarStyle: {
                        paddingBottom: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        height: 60,
                    },
                }}
            >
                <Tab.Screen
                    name="Customers"
                    component={CustomersScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="people-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notifications"
                    component={NotificationsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="notifications-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="home-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="person-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="ActiveLeads"
                    component={ActiveLeadsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="people" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    };
}
export default TabNavigator;
