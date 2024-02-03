// components/AttendanceCard.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AttendanceModal from '../Screens/AttendanceFrontPage';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [checkInTime, setCheckInTime] = useState("00:00");
    const [checkOutTime, setCheckOutTime] = useState("00:00");
    const [totalHours, setTotalHours] = useState("00:00");
    const [isCheckingIn, setIsCheckingIn] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    useEffect(() => {
        loadCheckInTime();
        loadCheckOutTime();
        loadTotalHours();

        if (checkInTime !== "00:00" && checkOutTime === "00:00") {
            // User has only checked in, set the button to "Pause"
            setIsCheckingIn(true);
        } else {
            // User has checked out or no check-in, set the button to "Start"
            setIsCheckingIn(false);
        }
    }, [checkInTime, checkOutTime]);

    const loadCheckInTime = async () => {
        try {
            const savedCheckInTime = await AsyncStorage.getItem('checkInTime');
            if (savedCheckInTime) {
                setCheckInTime(savedCheckInTime);
            }
        } catch (error) {
            console.error('Error loading check-in time:', error);
        }
    };

    const loadCheckOutTime = async () => {
        try {
            const savedCheckOutTime = await AsyncStorage.getItem('checkOutTime');
            if (savedCheckOutTime) {
                setCheckOutTime(savedCheckOutTime);
            }
        } catch (error) {
            console.error('Error loading check-out time:', error);
        }
    };

    const loadTotalHours = async () => {
        try {
            const savedTotalHours = await AsyncStorage.getItem('totalHours');
            if (savedTotalHours) {
                setTotalHours(savedTotalHours);
            }
        } catch (error) {
            console.error('Error loading total hours:', error);
        }
    };


    const saveCheckInTime = async (time) => {
        try {
            await AsyncStorage.setItem('checkInTime', time);
        } catch (error) {
            console.error('Error saving check-in time:', error);
        }
    };

    const saveCheckOutTime = async (time) => {
        try {
            await AsyncStorage.setItem('checkOutTime', time);
        } catch (error) {
            console.error('Error saving check-out time:', error);
        }
    };

    const saveTotalHours = async (totalHours) => {
        try {
            await AsyncStorage.setItem('totalHours', totalHours);
        } catch (error) {
            console.error('Error saving total hours:', error);
        }
    };

    const handleCheckInOut = () => {
        if (isCheckingIn) {
            // User is checking out
            const currentTime = getCurrentTime();
            setCheckOutTime(currentTime);

            // Calculate total hours and save to AsyncStorage
            const totalHoursValue = calculateTotalHours();
            saveCheckOutTime(currentTime);
            saveTotalHours(totalHoursValue);
            setTotalHours(totalHoursValue);
        } else {
            // User is checking in
            const currentTime = getCurrentTime();
            setCheckInTime(currentTime);
            saveCheckInTime(currentTime);

            // Reset check-out time and total hours when checking in after checking out
            if (checkOutTime !== "00:00") {
                setCheckOutTime("00:00");
                setTotalHours("00:00");
                saveCheckOutTime("00:00");
                saveTotalHours("00:00");
            }
        }

        // Toggle the state
        setIsCheckingIn(!isCheckingIn);
    };

    const calculateTotalHours = () => {
        if (checkInTime !== "00:00" && checkOutTime !== "00:00") {
            // Assuming checkInTime and checkOutTime are in the format "HH:mm"
            const [checkInHours, checkInMinutes] = checkInTime.split(':');
            const [checkOutHours, checkOutMinutes] = checkOutTime.split(':');

            const currentDate = new Date();
            const checkIn = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), checkInHours, checkInMinutes);
            let checkOut = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), checkOutHours, checkOutMinutes);

            // Check if the check-out time is on the next day
            if (checkOut < checkIn) {
                checkOut = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, checkOutHours, checkOutMinutes);
            }

            // Check if the date objects are valid
            if (isNaN(checkIn) || isNaN(checkOut)) {
                return 'Invalid date';
            }

            const diffInMilliseconds = checkOut - checkIn;
            const totalHours = diffInMilliseconds / (1000 * 60 * 60);

            // Check if the total hours is exactly 24, and return '24 hours' in that case
            if (totalHours === 24) {
                return '24 hours';
            }

            return totalHours.toFixed(2) + ' hours';
        }
        return 'N/A';
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleAttendanceSubmit = (status) => {
        // Handle attendance submission logic here
        console.log(`Attendance marked as ${status}`);
        toggleModal();
    };

    const currentDate = new Date().toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });


    const navigateToCameraScreen = () => {
        navigation.navigate('CameraScreen');
    };

    return (
        <View style={styles.Container}>
            <View style={styles.profileCard}>
                <Image source={require('../assets/profile_image.png')} style={styles.profileImage} />
                <View style={styles.profileInfo}>
                    <Text style={styles.welcomeText}>Welcome, User</Text>
                    <Text>Start Your Work </Text>

                    {/* Add the username dynamically */}
                </View>
                {/* <TouchableOpacity style={styles.notificationIcon}> */}
                <Icon name="notifications-active" size={24} color="#000" style={styles.notificationIcon} />
                {/* </TouchableOpacity> */}
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <TouchableOpacity onPress={toggleModal}>
                        <View >
                            <Text style={styles.title}>Attendance</Text>
                            <Text style={styles.subtitle}>Set your attendance for {currentDate}</Text>
                            <Icon name="calendar-month" size={40} color="#333" style={styles.calendarIcon} />
                        </View>
                    </TouchableOpacity>
                    <Modal visible={isModalVisible} animationType="slide" transparent>
                        <AttendanceModal onClose={toggleModal} onSubmit={handleAttendanceSubmit} />
                    </Modal>
                </View>

                <LinearGradient
                    colors={['#280071', '#B01C56']}
                    style={[styles.photocard]}
                >
                    <TouchableOpacity
                        style={styles.roundButton}
                        onPress={navigateToCameraScreen}>
                        <Text style={styles.buttonText}>Take photo</Text>
                    </TouchableOpacity>
                </LinearGradient>

                <View style={styles.CheckIncard}>
                    <Text style={styles.Checkinheader}>Check In</Text>
                    <View style={styles.checkInOutButtonContainer}>
                        <View style={styles.outerCircularContainer}>
                            <View style={styles.innerCircularContainer}>
                                <LinearGradient
                                    colors={['#280071', '#B01C56']}
                                    style={[styles.checkInOutButton, styles.circularButton]}
                                >
                                    <TouchableOpacity onPress={handleCheckInOut} >
                                        <View style={styles.iconContainer}>
                                            <Icon name="fingerprint" size={40} color="#fff" />
                                        </View>
                                        <Text style={{ color: '#fff', fontSize: 26 }}>
                                            {isCheckingIn ? 'Pause' : 'Start'}
                                        </Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <Text style={styles.dateText}>{new Date().toLocaleDateString(undefined, {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}</Text>
                        <Text style={styles.timeText}>{new Date().toLocaleTimeString(undefined, {
                            hour: 'numeric',
                            minute: 'numeric',
                        })}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoItem}>
                            <Icon name="access-time" size={24} color="#B01C56" style={styles.infoIcon} />
                            {checkInTime && <Text>{checkInTime}</Text>}
                            {checkInTime && <Text style={styles.infoText}>Check In</Text>}
                        </View>
                        <View style={styles.infoItem}>
                            <Icon name="access-time" size={24} color="#280071" style={styles.infoIcon} />
                            {checkOutTime && <Text>{checkOutTime}</Text>}
                            {checkOutTime && <Text style={styles.infoText}>Check Out</Text>}
                        </View>
                        {checkInTime && checkOutTime && (
                            <View style={styles.infoItem}>
                                <Icon name="access-time" size={24} color="#000" style={styles.infoIcon} />
                                <Text>{calculateTotalHours()} </Text>
                                <Text style={styles.infoText}>Total Hr</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        // padding: 20,
        backgroundColor: '#fff',
    },
    cardContainer: {
        padding: 25,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 20,
        marginLeft: 10,
    },
    profileInfo: {
        flex: 1,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    notificationIcon: {
        padding: 10,
    },
    card: {
        padding: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 15,
        elevation: 5,
        // iOS
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    photocard: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    CheckIncard: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 20,
        elevation: 5,
        // iOS
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    Checkinheader: {
        fontSize: 24,
        color: '#280071',
        fontWeight: 'bold',
        marginBottom: 5,
        alignSelf: 'center',
    },
    checkInOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 12,
        color: '#666',
        marginBottom: 16,
    },
    calendarIcon: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    checkInOutButtonContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    outerCircularContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 65, // Adjust as needed
        borderWidth: 15, // Thickness of the border
        borderColor: '#fff', // Color of the border
        width: 130, // Adjust as needed (twice the radius)
        height: 130, // Adjust as needed (twice the radius)
        marginBotom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,

    },
    innerCircularContainer: {
        overflow: 'hidden',
        borderRadius: 70, // Adjust as needed (half of the outer container)
        width: 100, // Adjust as needed
        height: 100, // Adjust as needed
        elevation: 3,

    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        padding: 10,
        backgroundColor: '#D4D4D4',
        borderRadius: 10,
        elevation: 3,
        marginBottom: 10,
        borderRadius: 20,

    },
    infoItem: {
        alignItems: 'center',
    },
    infoIcon: {
        marginBottom: 5,
    },
    infoText: {
        color: 'black',
        // fontWeight: 'bold',
        fontSize: 16,
    },
    dateTimeContainer: {
        alignItems: 'center',
        // marginTop: 10,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    timeText: {
        fontSize: 16,
        color: '#666',
    },

    linearGradient: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    roundButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 30, // Half of the button's width and height to make it round
        padding: 10,
        margin: 2, // Adjust as needed
        elevation: 3,
        width: 60, // Adjust as needed
        height: 60, // Adjust as needed
    },
    buttonText: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
    },

});

export default HomeScreen;
