import React from "react";
import { useCreateRequest } from "@/hooks/api/request.hook";
import { useAuthContext } from "@/components/providers/auth.provider";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { useGetMyRide } from "@/hooks/api/rider.hook";

interface CreateRequestModalProps {
    rider: IRider;
    onClose: () => void;
    service_type: IRider['service_type'];
}

export function CreateRequestModal({ rider, service_type, onClose }: CreateRequestModalProps) {
    const rideQuery = useGetMyRide();
    const { user } = useAuthContext();
    const requestMutation = useCreateRequest();

    const [capacity, setCapacity] = React.useState<number>(
        service_type === "rides" ? 1 : rider.capacity
    );

    const handleSubmit = () => {
        requestMutation.mutate({
            capacity,
            service_type,
            rider_id: rider.id,
            client_id: user?.id,
            origin: (rider as any).location,
            price: rider.price_per_km * capacity,
            destination: (rider as any).destination,
        }, {
            onSuccess() {
                onClose();
                rideQuery.refetch();
            }
        })
    };

    return (
        <View className="p-4 rounded-md bg-white shadow-md">
            <Text className="text-lg font-bold mb-4">Create Request</Text>
            <Text className="text-gray-700 mb-2">
                Rider: {rider.user.username} ({rider.service_type})
            </Text>
            <Text className="text-gray-700 mb-4">Price per KM: {rider.price_per_km}</Text>

            {service_type === "rides" ? (
                <>
                    <Text className="text-gray-700 mb-2">Enter Capacity:</Text>
                    <TextInput
                        value={String(capacity)}
                        onChangeText={(text) => setCapacity(Number(text) || 1)}
                        keyboardType="numeric"
                        className="border border-gray-300 rounded-md p-2 mb-4"
                    />
                </>
            ) : (
                <Text className="text-gray-700 mb-4">Capacity: {rider.capacity}</Text>
            )}

            <TouchableOpacity
                onPress={handleSubmit}
                disabled={requestMutation.isPending}
                className={`${requestMutation.isPending ? "bg-gray-400" : "bg-blue-600"
                    } rounded-md p-3 items-center`}
            >
                {requestMutation.isPending ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white font-bold">Submit Request</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}