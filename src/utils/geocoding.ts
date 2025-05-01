const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!;

export async function geocodeAddress(placeId: string) {
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();

        if (data.status === 'OK' && data.results[0]) {
            const result = data.results[0];
            return {
                success: true,
                formattedAddress: result.formatted_address,
                coordinates: {
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng,
                },
            };
        }
        throw new Error('No results found');
    } catch (error) {
        console.error('Geocoding error:', error);
        return {
            success: false,
            error: 'Failed to get location coordinates',
        };
    }
}

interface Coordinates {
    latitude: number;
    longitude: number;
}

export const calculateDistance = (point1: Coordinates, point2: Coordinates): number => {
    const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

    const earthRadiusKm = 6371; // Radius of the Earth in kilometers

    const deltaLat = toRadians(point2.latitude - point1.latitude);
    const deltaLng = toRadians(point2.longitude - point1.longitude);

    const lat1 = toRadians(point1.latitude);
    const lat2 = toRadians(point2.latitude);

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2) * Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c; // Distance in kilometers
};
