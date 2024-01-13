import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';

const CustomersScreen = () => (
    <View>
        <Text>Customers Screen</Text>
    </View>
);

const NotificationsScreen = () => (
    <View>
        <Text>Notifications Screen</Text>
    </View>
);

const NewLeadsScreen = () => (
    <View>
        <Text>New Leads Screen</Text>
    </View>
);

const ProfileScreen = () => (
    <View>
        <Text>Profile Screen</Text>
    </View>
);

const ActiveLeadsScreen = () => (
    <View>
        <Text>Active Leads Screen</Text>
    </View>
);

const Tab = createBottomTabNavigator();

const MainPage = () => (
    <Tab.Navigator
        screenOptions={({ route })  => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Customers') {
                    iconName = focused ? 'people' : 'people-outline';
                } else if (route.name === 'Notifications') {
                    iconName = focused ? 'notifications' : 'notifications-outline';
                } else if (route.name === 'NewLeads') {
                    iconName = focused ? 'add-circle' : 'add-circle-outline';
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'person' : 'person-outline';
                } else if (route.name === 'ActiveLeads') {
                    iconName = focused ? 'trending-up' : 'trending-up-outline';
                }

                return <Icon name={iconName} size={size} color={color} />;
            },
        })}
        // tabBarOptions={{
        //     activeTintColor: 'tomato',
        //     inactiveTintColor: 'gray',
        //     style: {
        //         display: 'flex',
        //     },
        // }}
    >
        <Tab.Screen name="Customers" component={CustomersScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="NewLeads" component={NewLeadsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="ActiveLeads" component={ActiveLeadsScreen} />
    </Tab.Navigator>
);

export default MainPage;
