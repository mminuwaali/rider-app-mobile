import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { useGetTodaysSchedule, useStartTodaysSchedule } from "@/hooks/api/schedule.hook";

export function Header() {
    const todayQuery = useGetTodaysSchedule();
    const todayMutation = useStartTodaysSchedule();

    // Log the fetched data for debugging purposes
    console.log("getting today's schedule", todayQuery.data);

    const handleStartSchedule = () => {
        if (todayQuery.data) {
            // Invoke the mutation to start today's schedule
            todayMutation.mutate(undefined, {
                onSuccess: () => {
                    // Handle success response
                    Alert.alert("Success", "Today's schedule has been started!");
                },
            });
        } else {
            Alert.alert("No Schedule", "There is no schedule for today.");
        }
    };

    return (
        <View>
            <View className="flex-row items-center justify-between bg-white p-2 px-4 rounded-md">
                <Text className="text-lg font-bold">Home</Text>

                <Link asChild href="/home/rider/schedule">
                    <TouchableOpacity className="p-2">
                        <Ionicons name="calendar-outline" size={20} color="black" />
                    </TouchableOpacity>
                </Link>
            </View>

            {todayQuery.data && !todayQuery.data.is_started && (
                <TouchableOpacity
                    onPress={handleStartSchedule}
                    className="bg-blue-500 p-3 rounded-md mt-4"
                >
                    <Text className="text-white text-center text-lg">Start Today's Schedule</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
