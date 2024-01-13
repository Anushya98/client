// components/AttendanceModal.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AttendanceModal = ({ onClose, onSubmit }) => {
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Mark Attendance</Text>
      <TouchableOpacity style={styles.button} onPress={() => onSubmit('Present')}>
        <Text>Present</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onSubmit('Absent')}>
        <Text>Absent</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
  },
  closeButton: {
    backgroundColor: '#ff3b30',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
  },
});

export default AttendanceModal;
