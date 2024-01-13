// components/AttendanceCard.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AttendanceModal from '../Screens/AttendancePage';
import LinearGradient from 'react-native-linear-gradient';
import { Camera } from 'react-native-vision-camera';

const HomeScreen = ({ navigation }) => {
    const [checkInTime, setCheckInTime] = useState("00:00");
    const [checkOutTime, setCheckOutTime] = useState("00:00");
    const [isCheckingIn, setIsCheckingIn] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };


    const handleCheckInOut = () => {
        if (isCheckingIn) {
            // User is checking in
            const currentTime = getCurrentTime();
            setCheckInTime(currentTime);

            // Reset check-out time to "00:00" when checking in after checking out
            if (checkOutTime) {
                setCheckOutTime("00:00");
            }
        } else {
            // User is checking out
            const currentTime = getCurrentTime();
            setCheckOutTime(currentTime);
        }
        setIsCheckingIn(!isCheckingIn); // Toggle the state
    };




    const calculateTotalHours = () => {
        if (checkInTime !== "00:00" && checkOutTime !== "00:00") {
            // Assuming checkInTime and checkOutTime are in the format "HH:mm"
            const [checkInHours, checkInMinutes] = checkInTime.split(':');
            const [checkOutHours, checkOutMinutes] = checkOutTime.split(':');

            const currentDate = new Date();
            const checkIn = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), checkInHours, checkInMinutes);
            const checkOut = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), checkOutHours, checkOutMinutes);

            // Check if the date objects are valid
            if (isNaN(checkIn) || isNaN(checkOut)) {
                return 'Invalid date';
            }

            if (checkOut > checkIn) {
                const diffInMilliseconds = checkOut - checkIn;
                const totalHours = diffInMilliseconds / (1000 * 60 * 60);
                return totalHours.toFixed(2) + ' hours';
            } else {
                return '00:00';
            }
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
    const { hasPermission, requestPermission } = useCameraPermission()
    const device = useCameraDevice('back')

    if (device == null) return <NoCameraDeviceError />

    return (
        <View style={styles.Container}>
            <View style={styles.cardContainer}>
                <TouchableOpacity onPress={toggleModal}>
                    <View style={styles.card}>
                        <Text style={styles.title}>Attendance</Text>
                        <Text style={styles.subtitle}>Set your attendance for {currentDate}</Text>
                        <Icon name="calendar-month" size={40} color="#333" style={styles.calendarIcon} />
                    </View>
                </TouchableOpacity>
                <Modal visible={isModalVisible} animationType="slide" transparent>
                    <AttendanceModal onClose={toggleModal} onSubmit={handleAttendanceSubmit} />
                </Modal>
            </View>
            <View style={styles.photocard}>
                <LinearGradient
                    colors={['#280071', '#B01C56']}
                >
                    <Text style={styles.phototext}>Take a photo</Text>
                </LinearGradient>
            </View>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
            />
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
                                    <Text style={{ color: '#fff', fontSize: 26 }}>{isCheckingIn ? 'Start' : 'Pause'}</Text>
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
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    cardContainer: {
        marginBottom: 16,
    },
    card: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 10,
        elevation: 5,
        // iOS
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    photocard: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 10,
        elevation: 5,
        // iOS
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    CheckIncard: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 10,
        elevation: 5,
        // iOS
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        // Minus or inset effect
        boxShadow: "-15px -15px 15px rgba(255,255,255,0.2), 15px 15px 15px rgba(0,0,0,0.1, inset -15px -15px 15px rgba(255,255,255,1), inset 15px 15px 15px rgba(0,0,0,0.1))",
        borderWidth: 1,
        // borderRightWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        // borderRightColor: 'rgba(255, 255, 255, 0.5)',
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

});

export default HomeScreen;
