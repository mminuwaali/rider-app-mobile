import React from "react";
import { formatCurrency } from "@/utils/helpers";
import { useUpdateRequest } from "@/hooks/api/request.hook";
import { useClientContext } from "../../_layout/_context/client.context";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

export function Journey() {
    const { rider, setRider, riderStatus } = useClientContext();
    const requestMutation = useUpdateRequest(rider?.id);

    const updateRequestStatus = async (status: string) => {
        requestMutation.mutate({ status }, {
            onSuccess(data) {
                setRider(data);
                riderStatus?.send(JSON.stringify({ data }));
            }
        });
    };

    console.log("rider details", rider?.status)

    if (!rider) return null;

    return (
        <View className="mt-auto bg-white p-4 shadow-md rounded-md mb-4">
            <Text className="text-lg font-bold mb-2">Journey Details</Text>
            <Text className="text-gray-700">Status: {rider.status}</Text>
            <Text className="text-gray-700">Rider: {rider.rider.first_name} {rider.rider.last_name}</Text>
            <Text className="text-gray-700">Price: {formatCurrency(rider.price)}</Text>
            {/* <Text className="text-gray-700">Origin: {rider.origin.address}</Text> */}
            <Text className="text-gray-700">Destination: {rider.destination.address}</Text>

            {rider.status === "pending" && (
                <TouchableOpacity
                    onPress={() => updateRequestStatus("cancelled")}
                    className="mt-4 bg-red-600 rounded-md p-3 items-center"
                >
                    {
                        requestMutation.isPending ?
                            <ActivityIndicator /> :
                            <Text className="text-white font-bold">Cancel Request</Text>
                    }
                </TouchableOpacity>
            )}

            {rider.status === "accepted" && (
                <Text className="mt-4 text-blue-600 font-bold">
                    The rider is on his way!
                </Text>
            )}

            {rider.status === "in_progress" && (
                <View className="gap-2">
                    <Text className="mt-4 text-green-600 font-bold">
                        Your journey is in progress.
                    </Text>

                    <TouchableOpacity
                        onPress={() => updateRequestStatus("completed")}
                        className="mt-4 bg-green-600 rounded-md p-3 items-center"
                    >
                        {
                            requestMutation.isPending ?
                                <ActivityIndicator /> :
                                <Text className="text-white font-bold">Complete Journey</Text>
                        }
                    </TouchableOpacity>
                </View>
            )}

            {rider.status === "completed" && (
                <Text className="mt-4 text-gray-600 font-bold">
                    Your journey has been completed.
                </Text>
            )}

            {rider.status === "cancelled" && (
                <Text className="mt-4 text-red-600 font-bold">
                    This request has been cancelled.
                </Text>
            )}
        </View>
    );
}