import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const LoadingPage = ({ navigation }) => {
    const [progress, setProgress] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false,
        }).start(() => {
            // Navigate to Splash Screen 1
            navigation.replace('SplashScreen1');
        });

        return () => progress.stopAnimation();
    }, [navigation]);

    const leftPosition = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['-100%', '100%'],
    });

    return (
        <ImageBackground
            source={require('../assets/Frontpage.jpg')}
            style={styles.backgroundImage}
            blurRadius={6}
        >
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>SBI Tracking</Text>
                <View style={styles.progressBarContainer}>
                    <LinearGradient
                        colors={['#B01C56', '#280071']}
                        style={styles.progressBar}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Animated.View
                            style={[
                                StyleSheet.absoluteFill,
                                { backgroundColor: 'white', left: leftPosition },
                            ]}
                        />
                    </LinearGradient>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
    },
    progressBarContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 5,
        height: 20,
        overflow: 'hidden',
    },
    progressBar: {
        flex: 1,
        borderRadius: 5,
        overflow: 'hidden',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
    },
});

export default LoadingPage;
