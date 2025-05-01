import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { Header } from "@/app/(auth)/_layout/header";
import { useCreateBooking } from "@/hooks/api/booking.hook";
import { Text, TextInput, ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useAuthContext } from "@/components/providers/auth.provider";

interface CreateBookingModalProps {
    schedule: ISchedule;
    onClose: () => void;
    destination: { latitude: number; longitude: number; }
}

export function CreateBookingModal({ schedule, destination, onClose }: CreateBookingModalProps) {
    const { user } = useAuthContext();
    const [seats, setSeats] = useState("");
    const bookingMutation = useCreateBooking();
    const [error, setError] = React.useState("");
    const [pickupCoords, setPickupCoords] = useState<CreateBookingModalProps['destination']>();

    React.useEffect(() => {
        const fetchLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    setError("Location permission denied. Unable to fetch pickup location.");
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                setPickupCoords({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            } catch (err) {
                setError("Failed to fetch location.");
            }
        };

        fetchLocation();
    }, []);


    const handleSubmit = () => {
        if (!seats) {
            setError("Please specify the number of seats.");
            return;
        }

        if (!pickupCoords) {
            setError("Pickup location is not available.");
            return;
        }

        // Submit booking data
        bookingMutation.mutate({
            destination,
            capacity: +seats,
            client_id: user?.id,
            origin: pickupCoords,
            schedule_id: schedule.id,
            rider_id: schedule.rider.id,
        }, {
            onSuccess() {
                alert("Successfully booked aschedule");
                onClose();
            }
        })
    };

    return (
        <ScrollView className="flex-1" contentContainerClassName="p-5 py-20%">
            <View className="flex-1 gap-20">
                <Header
                    title="Book a ride"
                    description="Finish setting up the data and book a ride schedule"
                />

                {/* Rider and Coordinates Details */}
                <View className="gap-4">
                    <Text className="text-lg font-bold">Rider Details:</Text>
                    <Text>Name: {schedule.rider.username}</Text>
                    {/* <Text>Phone: {rider.phone}</Text> */}

                    <Text className="text-lg font-bold mt-4">Coordinates:</Text>
                    <Text>Pickup: {pickupCoords ? `${pickupCoords.latitude}, ${pickupCoords.longitude}` : "Fetching..."}</Text>
                    <Text>Destination: {destination.latitude}, {destination.longitude}</Text>

                    {bookingMutation.isPending && <ActivityIndicator size="small" color="#0000ff" />}
                    {/* {error && <Text className="text-red-500">{error}</Text>} */}
                </View>

                {/* Number of Seats */}
                <View className="gap-4">
                    <Text className="text-lg font-bold">Number of Seats:</Text>
                    <TextInput
                        className="border rounded-lg p-3"
                        keyboardType="numeric"
                        placeholder="Enter number of seats"
                        value={seats}
                        onChangeText={setSeats}
                    />
                </View>

                {/* Submit Button */}
                <View className="gap-6">
                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={bookingMutation.isPending}
                        className="h-14 shadow rounded-xl bg-blue-600 items-center justify-center disabled:opacity-30 disabled:bg-gray-400"
                    >
                        <Text className="font-bold text-lg text-center text-white">
                            Book ride
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
