// LeadDetails.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

const LeadDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { Lead } = route.params;

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleUpdatePress = () => {
        navigation.navigate('UpdateLeads', { Lead });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={{ marginRight: 10 }}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Details of Lead</Text>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.text}>{Lead.header}</Text>
                    <Text style={styles.label}>Company:</Text>
                    <Text style={styles.text}>{Lead.subheaderCompany}</Text>
                    <Text style={styles.label}>Place:</Text>
                    <Text style={styles.text}>{Lead.subheaderPlace}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <LinearGradient
                        colors={['#280071', '#B01C56']}
                        style={[styles.button, styles.updateButton]}
                    >
                        <TouchableOpacity onPress={handleUpdatePress}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                        <Text style={{color:'#000', fontSize:16, fontWeight:'bold', textAlign:"center"}}>Back</Text>
                    </TouchableOpacity>
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
    cardContainer: {
        padding: 20,
    },
    card: {
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
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    updateButton: {
        backgroundColor: '#B01C56',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginRight: 8,
    },
    backButton: {
        borderColor: '#B01C56',
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        flex: 1,

    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',

    },
});

export default LeadDetails;
