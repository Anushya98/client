// components/NotificationsScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { ActivityIndicator } from 'react-native';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import { request as requestPermissions, check, PERMISSIONS, RESULTS } from 'react-native-permissions';


const CameraScreen = ({ navigation }) => {
    const [activeCamera, setActiveCamera] = useState('back');
    const device = useCameraDevice(activeCamera);
    const camera = useRef(null);
    const [imageData, setImageData] = useState('');
    const [takePhotoclicked, setTakePhotoclicked] = useState(false);
    const [location, setLocation] = useState(null);


    useEffect(() => {
        checkPermission();
    }, []);

    const checkPermission = async () => {
        const cameraPermission = await requestPermissions(PERMISSIONS.ANDROID.CAMERA);
        const locationPermission = await requestPermissions(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        if (cameraPermission === RESULTS.GRANTED && locationPermission === RESULTS.GRANTED) {
            console.log('Camera and location permissions granted');
        } else {
            console.log('Camera or location permissions not granted');
        }
    };

    const getLocation = async () => {
        try {
            const locationStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

            if (locationStatus === RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        setLocation(position.coords);
                        console.log('Location:', position.coords);
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        // Handle error or set a default location
                        setLocation(null);
                    },
                    {  enableHighAccuracy: false,
                        timeout: 2000,
                        maximumAge: 3600000}
                );
            } else {
                console.log('Location permission not granted');
                // Handle permission denial
            }
        } catch (error) {
            console.error('Error checking location permission:', error);
        }
    };


    const takePicture = async () => {
        if (camera != null) {
            await getLocation(); // Get location before taking the picture
            const photo = await camera.current.takePhoto();
            setImageData(photo.path);
            setTakePhotoclicked(false);
            console.log('Photo captured at:', photo.path);
            console.log('Location:', location);
        }
    };

    const savePhoto = async (photoPath) => {
        try {
            const permanentPath = RNFS.DocumentDirectoryPath + '/savedPhoto.jpg';
            await RNFS.moveFile(photoPath, permanentPath);
            console.log('Photo saved successfully at:', permanentPath);
            return permanentPath;
        } catch (error) {
            console.error('Error saving photo:', error);
            return null;
        }
    };

    const handleSavePhoto = async () => {
        if (imageData) {
            const permanentPath = await savePhoto(imageData);
            if (permanentPath) {
                setTakePhotoclicked(false);
                navigation.navigate('MainPage');
            }
        }
    };

    if (device == null) return <ActivityIndicator />

    return (
        <View style={{ flex: 1 }}>
            {takePhotoclicked ? (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={camera}
                        style={StyleSheet.absoluteFill}
                        device={device}
                        isActive={true}
                        photo
                    />
                    <TouchableOpacity style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: '#FF0037',
                        position: 'absolute',
                        bottom: 20,
                        alignSelf: 'center',

                    }}
                        onPress={() => { takePicture(); }}>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: '#3498db',
                            position: 'absolute',
                            bottom: 20,
                            right: 10,
                            alignSelf: 'flex-end',
                            marginRight: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => setActiveCamera(activeCamera === 'back' ? 'front' : 'back')}
                    >
                        <Icon name="camera-reverse" size={30} color="#fff" />
                    </TouchableOpacity>

                </View>) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {imageData !== '' && (
                        <Image
                            source={{ uri: 'file://' + imageData }}
                            style={{
                                width: '90%',
                                height: 200
                            }} />)}
                    <TouchableOpacity style={{
                        width: '90%',
                        height: 50,
                        borderWidth: 1,
                        alignSelf: 'center',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}
                        onPress={() => { setTakePhotoclicked(true); }}>
                        <Text>Click photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: '90%',
                            height: 50,
                            borderWidth: 1,
                            alignSelf: 'center',
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 90,
                            backgroundColor: '#4CAF50',
                        }}
                        onPress={() => handleSavePhoto()}
                    >
                        <Text>Save Photo</Text>
                    </TouchableOpacity>

                </View>
            )}

        </View>
    );
};

export default CameraScreen;
