import { Alert } from 'react-native';
import * as Location from 'expo-location';

export const requestLocationPermission = async () => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission Denied',
                'We need location permission to broadcast your location.',
                [{ text: 'OK' }]
            );
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error requesting location permissions:', error);
        return false;
    }
};
