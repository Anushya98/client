import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Circle } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const AttendanceCard = ({ title, time, date }) => (
    <View style={styles.attendanceCard}>
        <Text style={styles.attendanceCardTitle}>{title}</Text>
        <Text style={styles.attendanceCardTime}>{time}</Text>
        <Text style={styles.attendanceCardDate}>{date}</Text>
    </View>
);

const AttendancePage = () => {
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);
    const [runningTime, setRunningTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

    const formatTime = (time) => {
        if (!time) return '00:00';
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
    useEffect(() => {
        let interval;
        if (isCheckedIn) {
            interval = setInterval(() => {
                const currentTime = new Date();
                const durationMillis = currentTime.getTime() - checkInTime.getTime();
                const updatedHours = Math.floor(durationMillis / (1000 * 60 * 60));
                const updatedMinutes = Math.floor((durationMillis % (1000 * 60 * 60)) / (1000 * 60));
                const updatedSeconds = Math.floor((durationMillis % (1000 * 60)) / 1000);

                setRunningTime({ hours: updatedHours, minutes: updatedMinutes, seconds: updatedSeconds });
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isCheckedIn, checkInTime]);

    const getCurrentDayAndDate = () => {
        const currentDate = new Date();
        const optionsDay = { weekday: 'long' };
        const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
        const day = currentDate.toLocaleDateString('en-US', optionsDay);
        const date = currentDate.toLocaleDateString('en-US', optionsDate);
        return { day, date };
    };
    const dayAndDate = getCurrentDayAndDate();

    const savedEntries = [
        { title: 'Check In', time: '08:00 AM', date: 'Tue, Jan 30, 2024' },
        { title: 'Check Out', time: '05:00 PM', date: 'Tue, Jan 30, 2024' },
        // Add more entries as needed
    ];


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
                <View style={styles.circleBorder}>
                    <View style={styles.totalDurationContainer}>
                        <Text style={styles.totalDurationTextHead}>Total In Hours</Text>
                        <View style={styles.totalDurationContainer}>
                            <Text style={styles.totalDurationText}>Hours   Minutes   Seconds</Text>
                            <Text style={styles.durationTimeText}>
                                {`${String(runningTime.hours).padStart(2, '0')} : ${String(runningTime.minutes).padStart(2, '0')} : ${String(runningTime.seconds).padStart(2, '0')}`}
                            </Text>
                        </View>
                        {/* Current date and day */}
                        <View style={styles.dayAndDateContainer}>
                            <Text style={styles.dayAndDateText}>{dayAndDate.day},</Text>
                            {/* Display date with year below current day */}
                            <Text style={styles.dayAndDateText}>{dayAndDate.date}</Text>
                            <Text style={styles.dayAndDateText}>of 8.00 hours</Text>
                        </View>

                    </View>
                </View>

                <View style={styles.savedEntriesContainer}>
                    {savedEntries.map((entry, index) => (
                        <AttendanceCard
                            key={index}
                            title={entry.title}
                            time={entry.time}
                            date={entry.date}
                        />
                    ))}
                </View>

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
    circleBorder: {
        alignSelf: 'center',
        // marginTop: 10,
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#B01C56',
        alignItems: 'center',  // Add this line to center the content horizontally
        justifyContent: 'center',
    },
    totalDurationContainer: {
        alignItems: 'center',
        // marginTop: 10,
    },
    totalDurationTextHead: {
        fontSize: 18,
        color: '#333',
        fontWeight: "600"
    },
    durationTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    durationTimeText: {
        fontSize: 28,
        color: '#B01C56',
        marginRight: 5,
        fontWeight: 'bold',
    },
    durationTimeLabel: {
        fontSize: 16,
        color: '#333',
    },
    dayAndDateContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    dayAndDateText: {
        fontSize: 14,
        color: '#333',
    },
    attendanceCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 10,
        elevation: 3,
    },
    attendanceCardTitle: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    attendanceCardTime: {
        fontSize: 14,
        color: '#B01C56',
        marginBottom: 5,
    },
    attendanceCardDate: {
        fontSize: 12,
        color: '#666',
    },
    savedEntriesContainer: {
        marginTop: 20,
    },

});

export default AttendancePage;
