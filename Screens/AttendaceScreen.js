import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Circle } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const AttendancePage = () => {
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);

    const formatTime = (time) => {
        if (!time) return 'Not Checked In';
        const date = new Date(time);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        // const formattedHours = hours % 12 || 12;
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
        // return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    };

    const handleCheckInOut = () => {
        // Toggle check-in and check-out status
        if (isCheckedIn) {
            // Checked out
            setCheckOutTime(new Date());
        } else {
            // Checked in
            setCheckInTime(new Date());
        }
        setIsCheckedIn(!isCheckedIn);
    };
    const handleBackPress = () => {
        // Navigate to the 'Home' route
        navigation.navigate('profile');
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Attendance</Text>
            </View>
            {/* Top Status Bar */}
            <View style={styles.cardContainer}>
                <View style={styles.topStatusBar}>
                    <Text style={styles.statusBarText}>Status</Text>
                    <View style={styles.statusIconContainer}>
                        <Svg height="20" width="20">
                            <Circle cx="10" cy="10" r="8" fill={isCheckedIn ? 'green' : 'red'} />
                        </Svg>
                        <Text style={styles.statusIconText}>{isCheckedIn ? 'In' : 'Out'}</Text>
                    </View>
                </View>

                {/* Check-in and check-out times */}
                <View style={styles.timesContainerRow}>
                    {/* Check-in Time */}
                    <LinearGradient colors={['#280071', '#B01C56']} style={styles.timeSection}>
                        <Text style={styles.timeSectionLabel}>In Time</Text>
                        <Text style={styles.timeSectionValue}>{formatTime(checkInTime)}</Text>
                    </LinearGradient>

                    {/* Check-out Time */}
                    <LinearGradient colors={['#280071', '#B01C56']} style={styles.timeSection}>
                        <Text style={styles.timeSectionLabel}>Out Time</Text>
                        <Text style={styles.timeSectionValue}>{formatTime(checkOutTime)}</Text>
                    </LinearGradient>
                </View>
                {/* Check-in/out button */}
                <TouchableOpacity style={styles.button} onPress={handleCheckInOut}>
                    <Text style={styles.buttonText}>{isCheckedIn ? 'Check Out' : 'Check In'}</Text>
                </TouchableOpacity>
            </View >
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
    cardContainer: {
        flexDirection: 'column',
        paddingHorizontal: 20,
    },
    checkInOutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    svg: {
        marginRight: 10,
    },
    checkInOutText: {
        fontSize: 16,
        color: '#333',
    },
    timesContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeSection: {
        // flex: 1,
        borderRadius: 40,
        padding: 5,
        marginVertical: 10,
        width: '28%',
    },
    timeSectionLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        // marginBottom: 8,
        textAlign: 'center',
    },
    timeSectionValue: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#B01C56',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    topStatusBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginBottom: 20,
    },
    statusBarText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    statusIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIconText: {
        color: '#000',
        marginLeft: 5,
        fontSize: 16,
    },
});

export default AttendancePage;
