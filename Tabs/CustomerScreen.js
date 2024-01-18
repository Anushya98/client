import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const CustomersScreen = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        // Navigate to the 'Home' route
        navigation.navigate('Home');
    };

    const handleSuggestionPress = () => {
        // Navigate to the 'SuggestionPage'
        navigation.navigate('SuggestionPage');
    };

    const handleFeedbackPress = () => {
        // Navigate to the 'SuggestionPage'
        navigation.navigate('FeedbackPage');
    };

    const handleComplaintPress = () => {
        // Navigate to the 'SuggestionPage'
        navigation.navigate('ComplaintPage');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Customers</Text>
            </View>

            <View style={styles.cardContainer}>
                {/* Card 1 */}

                <View style={styles.card}>
                    <TouchableOpacity onPress={handleSuggestionPress}>
                        <Image source={require('../assets/suggestion_image.png')} style={styles.cardImage} />
                        <Text style={styles.cardText}>Suggestions</Text>
                    </TouchableOpacity>
                </View>

                {/* Card 2 */}

                <View style={styles.card}>
                    <TouchableOpacity onPress={handleFeedbackPress}>
                        <Image source={require('../assets/Feedback_image.png')} style={styles.cardImage} />
                        <Text style={styles.cardText}>Feedback</Text>
                    </TouchableOpacity>
                </View>


                {/* Card 3 */}

                <View style={styles.card}>
                    <TouchableOpacity onPress={handleComplaintPress}>
                        <Image source={require('../assets/Complaint_image.png')} style={styles.cardImage} />
                        <Text style={styles.cardText}> Complaint </Text>
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 20,
    },
    card: {
        width: '48%',
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 16,
        elevation: 5,
        overflow: 'hidden',
        borderWidth: 1, // Border width
        borderColor: '#ddd', // Border color
        shadowColor: '#000', // Outer shadow color
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.5, // Outer shadow opacity
        shadowRadius: 5, // Outer shadow radius
    },
    cardImage: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        alignSelf: 'center',
        padding: 20,
        marginTop: 25,
        marginBottom: 15,
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        marginBottom: 20,
    },
});


export default CustomersScreen;
