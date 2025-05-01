import React from "react";
import { formatCurrency } from "@/utils/helpers";
import { useUpdateRequest } from "@/hooks/api/request.hook";
import { useRiderContext } from "../../_layout/_context/rider.context";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

export function Journey() {
    const { requests: request, setRequests: setRequest, riderStatus } = useRiderContext();
    const requestMutation = useUpdateRequest(request?.id);

    const updateRequestStatus = async (status: string) => {
        requestMutation.mutate({ status }, {
            onSuccess(data) {
                setRequest(data);
                riderStatus?.send(JSON.stringify({ data }));
            }
        });
    };

    if (!request) return null;

    const renderActionButton = () => {
        if (request.status === "pending") {
            return (
                <View className="mt-4 flex gap-4 flex-row">
                    <TouchableOpacity
                        onPress={() => updateRequestStatus("accepted")}
                        className="bg-green-600 rounded-md p-3 flex-1 items-center"
                    >
                        {
                            requestMutation.isPending ?
                                <ActivityIndicator /> :
                                <Text className="text-white font-bold">Accept Request</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => updateRequestStatus("cancelled")}
                        className="bg-red-600 rounded-md p-3 flex-1 items-center"
                    >
                        {
                            requestMutation.isPending ?
                                <ActivityIndicator /> :
                                <Text className="text-white font-bold">Reject Request</Text>
                        }
                    </TouchableOpacity>
                </View>
            );
        }

        if (request.status === "accepted") {
            return (
                <TouchableOpacity
                    onPress={() => updateRequestStatus("in_progress")}
                    className="mt-4 bg-blue-600 rounded-md p-3 items-center"
                >
                    {
                        requestMutation.isPending ?
                            <ActivityIndicator /> :
                            <Text className="text-white font-bold">Acknowledge Pickup</Text>
                    }
                </TouchableOpacity>
            );
        }

        if (request.status === "in_progress") {
            return (
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
            );
        }

        return null;
    };

    return (
        <View className="mt-auto bg-white p-4 shadow-md rounded-md mb-4">
            <Text className="text-lg font-bold mb-2">Journey Details</Text>
            <Text className="text-gray-700">Status: {request.status}</Text>
            <Text className="text-gray-700">Rider: {request.client.first_name} {request.client.last_name}</Text>
            <Text className="text-gray-700">Price: {formatCurrency(request.price)}</Text>

            {request.status === "pending" && (
                <Text className="text-gray-700">Origin: {request.origin.address}</Text>
            )}

            {request.status === "accepted" && (
                <Text className="text-gray-700">Pickup Location: {request.origin.address}</Text>
            )}

            {request.status === "in_progress" && (
                <>
                    <Text className="text-gray-700">Pickup Location: {request.origin.address}</Text>
                    <Text className="text-gray-700">Destination: {request.destination.address}</Text>
                </>
            )}

            {request.status === "completed" && (
                <>
                    <Text className="text-gray-700">Pickup Location: {request.origin.address}</Text>
                    <Text className="text-gray-700">Destination: {request.destination.address}</Text>
                </>
            )}

            {renderActionButton()}
        </View>
    );
}
