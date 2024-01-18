// components/NotificationsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ActiveLeads = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        // Navigate to the 'Home' route
        navigation.navigate('MainPage');
    };

    const ActiveLeads = [
        {
            id: 1,
            header: 'Name 1',
            subheaderCompany: 'Company Name 1',
            subheaderPlace: 'Place 1',
        },
        {
            id: 2,
            header: 'Name 2',
            subheaderCompany: 'Company Name 2',
            subheaderPlace: 'Place 2',
        },
        // Add more notifications as needed
    ];

    const handleUpdatePress = (Lead) => {
        // Navigate to the 'UpdateLeads' route and pass the lead details as params
        navigation.navigate('LeadDetails', { Lead });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Active Leads</Text>
            </View>
            <View style={styles.cardContainer}>
                {ActiveLeads.map((Lead) => (
                    <TouchableOpacity
                        key={Lead.id}
                        style={styles.card}
                        onPress={() => handleUpdatePress(Lead)} // Pass the Lead object to the function
                    >
                        <View style={styles.iconContainer}>
                            <View style={styles.iconBackground}>
                                <Icon name="account" size={24} color="#000" />
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.headerText}>{Lead.header}</Text>
                            <Text style={styles.subheaderText}>{Lead.subheaderCompany}</Text>
                            <Text style={styles.subheaderText}>{Lead.subheaderPlace}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
    },
    backButton: {
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        margin: 10,
    },
    cardContainer: {
        flexDirection: 'column',
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Align items and time text to the right
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 16,
        padding: 16,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    iconContainer: {
        marginRight: 16,
    },
    iconBackground: {
        backgroundColor: '#f0f0f0',
        borderRadius: 50,
        padding: 8,
    },
    contentContainer: {
        flex: 1,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#000',
    },
    subheaderText: {
        fontSize: 14,
        color: '#666',
        // marginBottom: 4,
    },
});

export default ActiveLeads;
