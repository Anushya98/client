// CameraScreen.js
import React from 'react';
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraScreen = () => {
    const handleCapture = async () => {
        // Logic to capture the photo goes here
    };

    return (
        <View style={{ flex: 1 }}>
            <RNCamera
                style={{ flex: 1 }}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleCapture}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Capture</Text>
                    </TouchableOpacity>
                </View>
            </RNCamera>
        </View>
    );
};

export default CameraScreen;
