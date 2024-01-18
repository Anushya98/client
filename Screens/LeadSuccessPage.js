// LeadSuccessPage.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LeadSuccessPage = ({ navigation }) => {
    const handleContinue = () => {
        // Navigate to the Home screen or any other screen
        navigation.navigate('MainPage');
    };

    const handleCancel = () => {
        // Navigate back to the Leads screen or any other screen
        navigation.navigate('NewLeads');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>New Leads</Text>
            </View>
            <View style={styles.containerCenter}>
                <View style={styles.cardContainer}>
                    <LinearGradient colors={['#280071', '#B01C56']} style={styles.gradientContainer}>
                        <Image source={require('../assets/Success_image.png')} style={styles.tickImage} />
                    </LinearGradient>
                    <Text style={styles.congratulationsText}>Congratulations!</Text>
                    <Text style={styles.successText}>New lead has been successfully created with ID Number ID_001 *!*</Text>
                    <LinearGradient colors={['#280071', '#B01C56']}  style={styles.continueButton} >
                    <TouchableOpacity onPress={handleContinue}>
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                    </LinearGradient>
                </View>
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
    containerCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,
    },
    cardContainer: {
        width: '80%', // Adjust the width as needed
        paddingHorizontal: 20,
    },
    gradientContainer: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    tickImage: {
        width: 150,
        height: 150,
        // marginBottom: 10,
    },
    congratulationsText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#B01C56',
        marginBottom: 10,
        alignSelf: 'center',
    },
    successText: {
        fontSize: 18,
        color: '#B01C56',
        textAlign: 'center',
        marginBottom: 10,
    },
    continueButton: {
        backgroundColor: '#B01C56',
        padding: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignSelf: 'center',
        
    },
    continueButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center',
    },
});

export default LeadSuccessPage;
