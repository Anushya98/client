import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const SuggestionPage = () => {
    const navigation = useNavigation();
    const [text, setText] = useState('');

    const handleBackPress = () => {
        // Navigate back to the 'CustomersScreen'
        navigation.goBack();
    };

    const handleSave = () => {
        // Implement logic to save the suggestion
        console.log('Suggestion saved:', text);
        // Navigate back to the 'CustomersScreen'
        navigation.goBack();
    };

    const handleCancel = () => {
        // Navigate back to the 'CustomersScreen'
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Suggestions</Text>
            </View>

            {/* Input field */}
            <TextInput
                style={styles.input}
                placeholder="Enter your text here...."
                multiline={true}
                numberOfLines={10} // Adjust the number of lines as needed
                value={text}
                placeholderTextColor="#999" 
                onChangeText={(newText) => setText(newText)}
            />

            {/* Save/Cancel buttons */}
            <View style={styles.buttonContainer}>
                <LinearGradient
                    colors={['#280071', '#B01C56']}
                    style={[styles.button, styles.saveButton]}
                >
                    <TouchableOpacity onPress={handleSave}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Save</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View >
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
    input: {
        // flex: 1,
        margin: 20,
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        textAlignVertical: 'top',
    },
    button: {
        // backgroundColor: '#B01C56',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1, // Border width
        borderColor: '#ddd', // Border color
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    saveButton: {
        flex: 1,
        marginRight: 8,
        borderRadius: 8,
        overflow: 'hidden', // Clip the LinearGradient within the button
    },
    cancelButton: {
        borderColor: '#280071',
        borderWidth: 1, // Change color as needed
        flex: 1,
        marginLeft: 8,
    },
});

export default SuggestionPage;
