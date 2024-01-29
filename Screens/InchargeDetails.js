import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const InchargePersonDetails = ({ onClosePress, inchargePersonDetails }) => {
    const navigation = useNavigation();

    const handleEditPress = () => {
        // Navigate to the 'PersonalDetail' route
        navigation.navigate('PersonalDetail');
    };

    const handleOkPress = () => {
        // Navigate to the 'Profile' route
        navigation.navigate('Profile');
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={inchargePersonDetails && inchargePersonDetails.profileImage
                        ? { uri: inchargePersonDetails.profileImage }
                        : require('../assets/profile_image.png')}
                    style={styles.profileImage}
                />
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailHeading}>Name: </Text>
                    <Text style={styles.detailText}>{inchargePersonDetails ? inchargePersonDetails.name : ''}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailHeading}>ID: </Text>
                    <Text style={styles.detailText}>{inchargePersonDetails ? inchargePersonDetails.id : ''}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailHeading}>Branch Name: </Text>
                    <Text style={styles.detailText}>{inchargePersonDetails ? inchargePersonDetails.branchName : ''}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailHeading}>Mobile Number: </Text>
                    <Text style={styles.detailText}>{inchargePersonDetails ? inchargePersonDetails.mobileNumber : ''}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <LinearGradient
                    colors={['#280071', '#B01C56']}
                    style={[styles.button, styles.okButton]}
                >
                    <TouchableOpacity onPress={handleOkPress}>
                        <Text style={styles.buttonText}>Ok</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', textAlign: "center" }}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent:"center",
    },
    successCard: {
        alignItems: 'center',
        marginBottom: 20,
    },
    tickIcon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    cardContainer: {
        paddingHorizontal: 20,
        paddingTop: 50, // Updated paddingTop
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
    },
    successText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: "center",
        marginTop: 20, // Added marginTop
    },
    gradientContainer: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#B01C56',
    },
    detailsContainer: {
        marginTop: 20,
        paddingHorizontal: 40,
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
    },
    detailHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 8,
    },
    detailText: {
        fontSize: 16,
        color: '#000',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    okButton: {
        backgroundColor: '#B01C56',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginRight: 8,
    },
    editButton: {
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

export default InchargePersonDetails;
