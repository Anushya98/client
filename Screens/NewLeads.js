import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LeadSuccessPage from './LeadSuccessPage';


const NewLeads = ({ navigation }) => {
    const [details, setDetails] = useState({
        detail1: '',
        detail2: '',
        detail3: '',
        detail4: '',
        detail5: '',
        detail6: '',
    });

    const handleSave = () => {
        // Implement logic to save the lead details
        console.log('Lead details saved:', details);
        // Navigate back to the Leads screen or any other screen
        navigation.goBack();
        navigation.navigate('LeadSuccessPage');
    };

    const handleCancel = () => {
        // Navigate back to the Leads screen or any other screen
        navigation.goBack();
    };

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{ flexGrow: 1 }}
            scrollEnabled={false}
            extraScrollHeight={Platform.select({ ios: 70, android: 100 })}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
                        <Icon name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.title}>New Leads</Text>
                </View>
                <View style={styles.svgContainer}>
                    <LinearGradient
                        colors={['#280071', '#B01C56']}
                        style={styles.Toptext}
                    >
                        <Text style={styles.heading}>Add a New Lead</Text>
                    </LinearGradient>
                    {/* Input fields for details 1 to 6 */}
                    <Text style={styles.detailHeading}>Detail 1:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Detail 1"
                        value={details.detail1}
                        onChangeText={(text) => setDetails({ ...details, detail1: text })}
                    />

                    {/* Detail 2 */}
                    <Text style={styles.detailHeading}>Detail 2:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Detail 2"
                        value={details.detail2}
                        onChangeText={(text) => setDetails({ ...details, detail2: text })}
                    />

                    {/* Detail 3 */}
                    <Text style={styles.detailHeading}>Detail 3:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Detail 3"
                        value={details.detail3}
                        onChangeText={(text) => setDetails({ ...details, detail3: text })}
                    />

                    {/* Detail 4 */}
                    <Text style={styles.detailHeading}>Detail 4:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Detail 4"
                        value={details.detail4}
                        onChangeText={(text) => setDetails({ ...details, detail4: text })}
                    />

                    {/* Detail 5 */}
                    <Text style={styles.detailHeading}>Detail 5:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Detail 5"
                        value={details.detail5}
                        onChangeText={(text) => setDetails({ ...details, detail5: text })}
                    />

                    {/* Detail 6 */}
                    <Text style={styles.detailHeading}>Detail 6:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Detail 6"
                        value={details.detail6}
                        onChangeText={(text) => setDetails({ ...details, detail6: text })}
                    />


                    {/* Save and Cancel buttons */}
                    <View style={styles.buttonContainer}>
                        <LinearGradient
                            colors={['#280071', '#B01C56']}
                            style={[styles.button, styles.saveButton]}
                        >
                            <TouchableOpacity onPress={handleSave}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Save</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
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
    svgContainer: {
        // alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        margin: 10,
    },
    Toptext: {
        // width: '100%',
        alignItems: 'center',
        marginBottom: 16,
        borderRadius: 10,
        // paddingVertical: 15,
    },
    detailHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        // marginTop: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        // backgroundColor: '#B01C56',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1, // Border width
        borderColor: '#ddd', // Border color
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saveButton: {
        flex: 1,
        marginRight: 8,
        borderRadius: 8,
        overflow: 'hidden', // Clip the LinearGradient within the button
    },
    cancelButton: {
        borderColor: '#280071',
        borderWidth: 1, // Change color as needed
        flex: 1,
        marginLeft: 8,
    },
});


export default NewLeads;
