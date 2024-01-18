import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';

const PersonalDetails = () => {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState(null);
    const [name, setName] = useState('');
    const [branchName, setBranchName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    const handleBackPress = () => {
        // Navigate to the 'Home' route
        navigation.navigate('Profile');
    };



    const handleUpdatePress = () => {
        // Implement logic to update lead details
        // For example, you can send an API request to update the details
        console.log('Updated Personal details:', updatedPersonalDetails);
        // After updating, navigate back to the 'LeadDetails' route
        navigation.navigate('Profile');
    };
    const handleAddRemoveProfile = () => {
        if (profileImage) {
            // Remove profile logic
            setProfileImage(null);
        } else {
            // Add profile logic
            showImagePicker();
        }
    };

    const showImagePicker = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setProfileImage(response.uri);
            }
        });
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Personal Details</Text>
            </View>

            <View style={styles.profileContainer}>

                {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                ) : (
                    
                      <Image
                    source={profileImage ? { uri: profileImage } : require('../assets/profile_image.png')}
                    style={styles.profileImage}
                />
                    
                )}
                <TouchableOpacity onPress={handleAddRemoveProfile} style={styles.addRemoveButton}>
                    <Text style={styles.addRemoveButtonText}>{profileImage ? 'Remove' : 'Add'} Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Text style={styles.label}>Branch Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Branch Name"
                    value={branchName}
                    onChangeText={(text) => setBranchName(text)}
                />
                <Text style={styles.label}>Mobile Number:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChangeText={(text) => setMobileNumber(text)}
                />
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
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', textAlign: "center" }}>Back</Text>
                </TouchableOpacity>
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
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    addRemoveButton: {
        backgroundColor: '#B01C56',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
    },
    addRemoveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#B01C56',
    },
    inputContainer: {
        padding: 20,
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
        paddingHorizontal: 20,
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

export default PersonalDetails