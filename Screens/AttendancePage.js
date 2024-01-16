// components/AttendanceModal.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AttendanceModal = ({ onClose, onSubmit }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.iconContainer}>
          <Icon name="check" size={40} color="#4CAF50" />
          {/* <Text style={styles.iconText}>Present</Text> */}
          <TouchableOpacity style={styles.button} onPress={() => onSubmit('Present')}>
            <Text style={{fontSize:26, fontWeight:"bold"}}>Present</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="close" size={40} color="#F44336" />
          {/* <Text style={styles.iconText}>Absent</Text> */}
          <TouchableOpacity style={styles.button} onPress={() => onSubmit('Absent')}>
            <Text style={{fontSize:26, fontWeight:"bold"}} >Absent</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={() => onSubmit('Present')}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
  },
  iconContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    margin: 8,
    width: 150,
  },
  iconText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    margin: 8,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
    marginRight: 8,
  },
  closeButton: {
    flex: 1,
    backgroundColor: '#ff3b30',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default AttendanceModal;
