// components/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    // Navigate to the 'Home' route
    navigation.navigate('Home');
  };
  const handleAttendancePress = () => {
    // Navigate to the 'SuggestionPage'
    navigation.navigate('AttendancePage');
  };
  const handleAcheivementPress = () => {
    // Navigate to the 'SuggestionPage'
    navigation.navigate('Acheivements');
  };

  const handlePersonalPress = () => {
    // Navigate to the 'Active Leads' screen
    navigation.navigate('PersonalDetail');
  };


  const handleInchargePersonPress = () => {
    const inchargePersonDetails = {
      profileImage: require('../assets/profile_image.png'), // Change 'photo' to 'profileImage'
      name: 'John Doe',
      id: 'ID123',
      branchName: 'Main Branch',
      mobileNumber: '+1 123 456 7890',
    };

    navigation.navigate('InchargePersonDetails', { inchargePersonDetails });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.cardContainer}>
        {/* Card 1 */}

        <View style={styles.card}>
          <TouchableOpacity>
            <Image source={require('../assets/map_image.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>History of map</Text>
          </TouchableOpacity>
        </View>

        {/* Card 3 */}

        <View style={styles.card}>
          <TouchableOpacity onPress={handleAttendancePress}>
            <Image source={require('../assets/Attendance_image.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>Attendance</Text>
          </TouchableOpacity>
        </View>


        {/* Card 4 */}

        <View style={styles.card}>
          <TouchableOpacity onPress={handleAcheivementPress}>
            <Image source={require('../assets/achievement_image.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>Achievement</Text>
          </TouchableOpacity>
        </View>


        {/* Card 5 */}

        <View style={styles.card}>
          <TouchableOpacity onPress={handlePersonalPress}>
            <Image source={require('../assets/personal_detail_image.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>Personal Detail</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.card}>
          <TouchableOpacity onPress={handleInchargePersonPress}>
            <Image source={require('../assets/incharge_image.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>Incharge Person & Details</Text>
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
    marginBottom: 15,
  },
});

export default ProfileScreen;
