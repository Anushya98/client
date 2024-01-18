import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ComplaintPage = () => {
    const navigation = useNavigation();
    const [detail1, setDetail1] = useState('');
    const [detail2, setDetail2] = useState('');
    const [detail3, setDetail3] = useState('');
    const [detail4, setDetail4] = useState('');

    const handleBackPress = () => {
        // Navigate back to the 'CustomersScreen'
        navigation.goBack();
    };

    const handleSave = () => {
        // Implement logic to save the complaint details
        const complaintDetails = {
            detail1,
            detail2,
            detail3,
            detail4,
        };
        console.log('Complaint details saved:', complaintDetails);
        // Navigate back to the 'CustomersScreen'
        navigation.goBack();
    };

    const handleCancel = () => {
        // Navigate back to the 'CustomersScreen'
        navigation.goBack();
    };

    return (
        <KeyboardAwareScrollView
        style={{ flex: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={false}
        extraScrollHeight={Platform.select({ ios: 70, android: 100 })}
    >
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Complaint</Text>
            </View>

            {/* Details */}
            <View style={styles.detailsContainer}>
                {/* Detail 1 */}
                <Text style={styles.detailHeading}>Detail 1:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter detail 1"
                    multiline={true}
                    numberOfLines={4} // Adjust the number of lines as needed
                    placeholderTextColor="#999"
                    value={detail1}
                    onChangeText={(text) => setDetail1(text)}
                />

                {/* Detail 2 */}
                <Text style={styles.detailHeading}>Detail 2:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter detail 2"
                    multiline={true}
                    numberOfLines={4} // Adjust the number of lines as needed
                    placeholderTextColor="#999"
                    value={detail2}
                    onChangeText={(text) => setDetail2(text)}
                />

                {/* Detail 3 */}
                <Text style={styles.detailHeading}>Detail 3:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter detail 3"
                    multiline={true}
                    numberOfLines={4} // Adjust the number of lines as needed
                    placeholderTextColor="#999"
                    value={detail3}
                    onChangeText={(text) => setDetail3(text)}
                />

                {/* Detail 4 */}
                <Text style={styles.detailHeading}>Detail 4:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter detail 4"
                    multiline={true}
                    numberOfLines={4} // Adjust the number of lines as needed
                    placeholderTextColor="#999"
                    value={detail4}
                    onChangeText={(text) => setDetail4(text)}
                />
            </View>

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
        </View>
        </KeyboardAwareScrollView>
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
    detailsContainer: {
        padding: 20,
    },
    detailHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000',
    },
    input: {
        height: 80,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
        borderRadius: 5,
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

export default ComplaintPage;
