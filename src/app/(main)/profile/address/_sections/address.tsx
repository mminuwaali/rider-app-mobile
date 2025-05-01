import React from "react";
import { useGetAddresses } from "@/hooks/api/address.hook";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export function Address() {
    const addressQuery = useGetAddresses();
    console.log("addresses", addressQuery.data);

    const addresses = React.useMemo(() => addressQuery.data, [addressQuery]);

    if (addressQuery.isFetching) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <FlatList
            data={addresses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View className="p-4 bg-white shadow-sm rounded-md mb-2">
                    <Text className="font-bold capitalize">{item.name}</Text>

                    <View className="gap-1">
                        <Text className="text-gray-500">Coordinates</Text>

                        <View className="flex-row gap-4">
                            <Text className="text-gray-400">Latitude: {item.coordinates.latitude ?? 0}</Text>
                            <Text className="text-gray-400">Longitude: {item.coordinates.longitude ?? 0}</Text>
                        </View>
                    </View>
                </View>
            )}
            ListEmptyComponent={
                <Text className="text-center text-gray-500">No addresses found.</Text>
            }
        />
    );
}