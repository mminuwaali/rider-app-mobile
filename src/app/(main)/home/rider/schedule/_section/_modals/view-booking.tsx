import React from "react";
import { useGetBooking, useUpdateBooking } from "@/hooks/api/booking.hook";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";

export default function ViewScheduleDetail({ schedule }: { onClose: () => void; schedule: ISchedule }) {
    const bookingMutation = useUpdateBooking();
    const bookingQuery = useGetBooking({ schedule: schedule.id });

    const bookings = React.useMemo(
        () => bookingQuery.data?.results || [],
        [bookingQuery],
    )

    const handleApprove = async (id: number) => {
        try {
            await bookingMutation.mutateAsync({ id, status: "confirmed" });
            Alert.alert("Success", "Booking approved successfully");
        } catch (err) {
            Alert.alert("Error", "Failed to approve booking");
        }
    };

    const handleReject = async (id: number) => {
        try {
            await bookingMutation.mutateAsync({ id, status: "cancelled" });
            Alert.alert("Success", "Booking rejected successfully");
        } catch (err) {
            Alert.alert("Error", "Failed to reject booking");
        }
    };

    const renderBookingItem = ({ item }: { item: IBooking }) => (
        <View className="gap-2 border-b pb-2">
            <View className="flex-row justify-between items-center bg-white p-3">
                <View className="flex-1">
                    <Text className="font-medium">{item.client.first_name} {item.client.last_name}</Text>
                    <Text className="text-sm text-gray-500">{new Date(item.created_at).toLocaleString()}</Text>
                </View>

                <View className="flex-row items-center">
                    {item.status === "pending" && (<>
                        <TouchableOpacity
                            onPress={() => handleApprove(item.id)}
                            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                        >
                            <Text className="text-white">Approve</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleReject(item.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                            <Text className="text-white">Reject</Text>
                        </TouchableOpacity>
                    </>)}
                </View>
            </View>

            <View>
                <Text className="">Pick Location: {item.origin.latitude} - {item.origin.longitude}</Text>
                <Text className="">Destination: {item.destination.latitude} - {item.destination.longitude}</Text>
            </View>
        </View>
    );

    if (bookingQuery.isPending || bookingMutation.isPending) return <Text>Loading...</Text>;

    return (
        <View className="flex-1 p-4">
            <Text className="text-2xl font-bold mb-4">Schedule Details</Text>
            <Text className="text-xl mb-2">Scheduled Date: {new Date(schedule?.scheduled_date).toDateString()}</Text>

            <Text className="text-lg mb-3">Bookings:</Text>
            {bookings.length === 0 ? (
                // {true ? (
                <Text>No bookings for this schedule yet.</Text>
            ) : (
                <FlatList
                    data={bookings as any[]}
                    renderItem={renderBookingItem}
                    keyExtractor={(item: IBooking) => item.id.toString()}
                    ListEmptyComponent={<Text className="text-gray-500">No bookings available</Text>}
                />
            )}
        </View>
    );
}
