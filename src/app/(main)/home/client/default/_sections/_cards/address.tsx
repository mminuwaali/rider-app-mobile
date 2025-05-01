import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface IAddressCardProps {
    item: IAddress;
    isSelected?: boolean;
    onSelect: (value: IAddress) => void;
};

export default React.Fragment;
export function AddressCard(properties: IAddressCardProps) {
    return (
        <TouchableOpacity
            style={{ height: 70 }}
            onPress={() => properties.onSelect(properties.item)}
            className={`w-full flex-row items-center justify-between p-4 rounded-md ${properties.isSelected ? "bg-blue-100 border-blue-500" : "bg-gray-100"
                } border`}
        >
            {/* Address Details */}
            <View className="flex-1">
                <Text className="text-base font-bold text-gray-800 capitalize">
                    {properties.item.name}
                </Text>

                <Text className="text-xs text-gray-500">
                    Latitude: {properties.item.coordinates.latitude}, Longitude: {properties.item.coordinates.longitude}
                </Text>
            </View>

            {/* Selection Icon */}
            <Ionicons
                size={16}
                color={properties.isSelected ? "#3b82f6" : "#9ca3af"}
                name={properties.isSelected ? "checkmark-circle" : "ellipse-outline"}
            />
        </TouchableOpacity>
    );
}