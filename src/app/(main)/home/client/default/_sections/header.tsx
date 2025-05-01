import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export function Header() {
    return (
        <View className="flex-row items-center justify-between bg-white p-2 px-4 rounded-md shadow-md">
            <Text className="text-lg font-bold">Home</Text>

            <Link asChild href="/home/client/schedule">
                <TouchableOpacity className="p-2">
                    <Ionicons name="calendar-outline" size={20} color="black" />
                </TouchableOpacity>
            </Link>
        </View>
    )
}