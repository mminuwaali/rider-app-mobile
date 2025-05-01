import React from "react";
import { formatCurrency } from "@/utils/helpers";
import { View, Text, TouchableOpacity } from "react-native";

interface ISchedleCardProps {
    distance?: number;
    onView?: () => void;
    onEdit?: () => void;
    schedule: ISchedule;
}

export function ScheduleCard(properties: ISchedleCardProps) {
    return (
        <View className="p-4 mb-4 rounded-md bg-white shadow-lg">
            <Text className="text-sm text-gray-600">
                Date: {new Date(properties.schedule.scheduled_date).toLocaleDateString("en-us")}
            </Text>
            <Text className="text-sm text-gray-600">
                Time: {properties.schedule.start_time} - {properties.schedule.end_time}
            </Text>
            <Text className="text-sm text-gray-600">
                Capacity: {properties.schedule.capacity}
            </Text>
            <Text className="text-sm text-gray-600">
                Price per KM: {formatCurrency(+properties.schedule.price_per_km)}
            </Text>

            <View className="flex-row justify-between mt-4">
                {properties.onView && <TouchableOpacity
                    className="px-4 py-2 rounded bg-blue-500"
                    onPress={() => properties.onView?.()}
                >
                    <Text className="text-white text-sm">View Details</Text>
                </TouchableOpacity>}

                {properties.onEdit && <TouchableOpacity
                    className="px-4 py-2 rounded bg-green-500"
                    onPress={() => properties.onEdit?.()}
                >
                    <Text className="text-white text-sm">Edit</Text>
                </TouchableOpacity>}
            </View>
        </View>
    );
}
