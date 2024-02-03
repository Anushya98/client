import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useMap } from '../Navigators/MapContext';
import axios from 'axios';

const HistoryPage = () => {
    const navigation = useNavigation();
    const { locations, addLocation, clearLocations } = useMap();
    const [currentLocation, setCurrentLocation] = useState(null);
    const [locationName, setLocationName] = useState('');
    const [initialRegion, setInitialRegion] = useState({
        latitude: 8.751762632909273,
        longitude: 77.77925665668853,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [travelPath, setTravelPath] = useState([]);

    const requestLocationPermission = async () => {
        try {
            const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

            if (result === RESULTS.GRANTED) {
                startLocationTracking();
            } else {
                console.log('Location permission denied');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const startLocationTracking = async () => {
        try {
            const position = await new Promise((resolve, reject) => {
                Geolocation.getCurrentPosition(
                    (position) => resolve(position),
                    (error) => reject(error),
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            });

            if (position && position.coords) {
                const { latitude, longitude } = position.coords;

                const response = await axios.get(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                );

                const address = response.data.display_name || 'Unknown Location';

                const newLocation = {
                    latitude,
                    longitude,
                    timestamp: new Date(),
                    locationName: address,
                };

                addLocation(newLocation);

                setCurrentLocation({ latitude, longitude });

                setInitialRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });

                const newTravelPath = locations.map((location) => ({
                    latitude: location.latitude,
                    longitude: location.longitude,
                }));

                setTravelPath(newTravelPath);
            } else {
                console.log('Coords:', position?.coords);
                console.log('Position or coordinates not available.');
            }
        } catch (error) {
            console.log('Error getting current position:', error);
        }
    };

    useEffect(() => {
        requestLocationPermission();

        // Save location every minute
        const locationInterval = setInterval(() => {
            startLocationTracking();
        }, 60000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(locationInterval);
    }, []);

    const handleBackPress = () => {
        navigation.goBack();
    };

    const renderSavedLocations = () => {
        // Get the current date in a formatted string
        const currentDate = new Date().toLocaleDateString();

        return (
            <View style={styles.savedLocationsCard}>
                <Text style={styles.savedLocationsCardTitle}>Locations at {currentDate}</Text>
                <ScrollView contentContainerStyle={styles.savedLocationsCardContent}>
                    {locations.map((location, index) => (
                        <View key={index} style={styles.savedLocationCard}>
                            <Text>{`Time: ${new Date(location.timestamp).toLocaleTimeString()}`}</Text>
                            <Text>{`Location: ${location.locationName}`}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>History Of Map</Text>
            </View>

            <View style={styles.mapCard}>
                <MapView
                    style={styles.map}
                    initialRegion={initialRegion} // Use the updated initialRegion
                >
                    {locations.map((location, index) => (
                        <Marker
                            key={index}
                            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                            title={`Location ${index + 1}`}
                        />
                    ))}
                    {currentLocation && (
                        <Marker
                            coordinate={{
                                latitude: currentLocation.latitude,
                                longitude: currentLocation.longitude,
                            }}
                            title="Current Location"
                            pinColor="blue"
                        />
                    )}
                    {travelPath.length > 1 && (
                        <Polyline
                            coordinates={travelPath}
                            strokeColor="#FF0000"
                            strokeWidth={2}
                        />
                    )}
                </MapView>
            </View>
            {renderSavedLocations()}
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
    mapCard: {
        height: 300, // Adjust the height as needed
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    map: {
        flex: 1,
    },
    savedLocationsCard: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
    },
    savedLocationsCardContent: {
        flexGrow: 1,
    },
    savedLocationsCardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    savedLocationCard: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
    },
});

export default HistoryPage;
