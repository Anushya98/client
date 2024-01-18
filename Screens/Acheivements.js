import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';



const Acheivements = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        // Navigate to the 'Home' route
        navigation.navigate('Profile');
    };

    const Acheivements  = [
        {
            id: 1,
            header: 'You have acheived 1000 targets'
        },
        {
            id: 2,
            header: 'Fastest growing employee of the month',
        },
        // Add more notifications as needed
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Acheivements</Text>
            </View>
            <View style={styles.cardContainer}>
                {Acheivements.map((acheivement) => (
                    <View key={acheivement.id} style={styles.card}>
                        <View style={styles.iconContainer}>
                            <View style={styles.iconBackground}>
                                <Icon name="workspace-premium" size={24} color="#000" />
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.headerText}>{acheivement.header}</Text>
                        </View>
                    </View>
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
    },
    subheaderText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    timeText: {
        fontSize: 14,
        color: '#666',
    },
});


export default Acheivements