import React from 'react';
import { formatCurrency } from '@/utils/helpers';
import { MaterialIcons } from '@expo/vector-icons';
import { CreateRequestModal } from '../_modals/request';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';

interface IRiderCardProps {
    rider: IRider;
    distance: number; // in kilometers
    service_type: IRider['service_type'];
}

export function RiderCard({ rider, service_type, distance = 1 }: IRiderCardProps) {
    const [open, setOpen] = React.useState(false);
    const estimatedCost = (rider.price_per_km * distance).toFixed(2);
    console.log(rider)

    return (
        <>
            <TouchableOpacity
                onPress={() => setOpen(true)}
                className="p-4 bg-white border-b border-gray-200 flex-row items-center space-x-3"
            >
                {/* Profile Image */}
                <View className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    {rider.user.profile ? (
                        <Image
                            source={{ uri: rider.user.profile }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    ) : (
                        <View className="w-full h-full items-center justify-center bg-blue-100">
                            <Text className="text-blue-600 text-lg font-bold">
                                {rider.user.first_name[0]}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Rider Details */}
                <View className="flex-1">
                    <Text className="text-base font-semibold">
                        {rider.user.first_name} {rider.user.last_name}
                    </Text>

                    <View className="flex-row items-center mt-1">
                        <MaterialIcons name="delivery-dining" size={16} color="#4B5563" />
                        <Text className="text-sm text-gray-600 ml-1 capitalize">
                            {rider.service_type}
                        </Text>

                        <View className="w-1 h-1 bg-gray-400 rounded-full mx-2" />

                        <MaterialIcons name="electric-bike" size={16} color="#4B5563" />
                        <Text className="text-sm text-gray-600 ml-1">
                            {rider.capacity} capacity
                        </Text>
                    </View>
                </View>

                {/* Price Information */}
                <View className="items-end">
                    <Text className="text-lg font-bold text-blue-600">
                        {formatCurrency(+estimatedCost)}
                    </Text>
                    <Text className="text-xs text-gray-500">
                        {formatCurrency(rider.price_per_km)}/km
                    </Text>
                </View>
            </TouchableOpacity>

            <Modal visible={open} onRequestClose={() => setOpen(false)}>
                <CreateRequestModal
                    rider={rider}
                    service_type={service_type}
                    onClose={() => setOpen(false)}
                />
            </Modal>
        </>
    );
};