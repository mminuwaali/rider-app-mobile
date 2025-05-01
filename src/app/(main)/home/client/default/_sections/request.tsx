import React from "react";
import { RiderCard } from "./_cards/rider";
import Animated from "react-native-reanimated";
import { AddressCard } from "./_cards/address";
import { useSearchRiders } from "@/hooks/api/rider.hook";
import { useGetAddresses } from "@/hooks/api/address.hook";
import { useClientContext } from "../../_layout/_context/client.context";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { LinearTransition, FadeInUp, FadeInDown, FadeOutDown, FadeOutUp } from "react-native-reanimated";

export default React.Fragment;
export function Request() {
    const addressQuery = useGetAddresses();
    const ridersMutation = useSearchRiders();
    const [loading, setLoading] = React.useState(false);
    const [address, setAddress] = React.useState<IAddress>();
    const { rider, riders, setRiders, fetchRiders } = useClientContext();
    const [service_type, setType] = React.useState<IRider['service_type'] | "">("");

    console.log(riders);

    React.useEffect(() => {
        if (ridersMutation.status == "success" && ridersMutation.data.length === 0)
            alert("Could not find riders with your given specifications");
    }, [ridersMutation])

    const addresses = React.useMemo(
        () => addressQuery.data || [], [addressQuery]
    );

    const handleFetchRiders = async () => {
        setLoading(true);
        if (service_type) await fetchRiders({ service_type, destination: address!.coordinates })
        setLoading(false);
    };

    if (rider) return <></>;

    return (
        <View className="gap-2 flex-1 pointer-events-box-none">
            {riders.length ?
                (
                    <Animated.View
                        exiting={FadeOutDown}
                        layout={LinearTransition}
                        entering={FadeInUp.delay(400)}
                        className="absolute top-0 left-0 right-0 bottom-0 bg-white p-4"
                    >
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-bold">Available Riders</Text>
                            <TouchableOpacity
                                className="p-2"
                                onPress={() => {
                                    setType("");
                                    setRiders([]);
                                    setAddress(undefined);
                                }}
                            >
                                <Text className="text-red-500">Close</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={riders}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => (<RiderCard
                                rider={item}
                                distance={item.distance!}
                                service_type={service_type as IRider['service_type']}
                            />)}
                        />
                    </Animated.View>
                ) : (
                    <Animated.View
                        exiting={FadeOutUp}
                        layout={LinearTransition}
                        entering={FadeInDown.delay(400)}
                        className="rounded-md bg-white p-2 gap-2 mt-auto"
                    >
                        {!loading && (
                            <>
                                <FlatList
                                    data={addresses}
                                    className="w-full"
                                    snapToInterval={70}
                                    style={{ height: 70 }}
                                    snapToAlignment="center"
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(_, id) => id.toString()}
                                    renderItem={({ item }) => (
                                        <AddressCard
                                            item={item}
                                            onSelect={() => setAddress(item)}
                                            isSelected={item.name === address?.name}
                                        />
                                    )}
                                />

                                <View className="flex-row border rounded-md border-gray-200">
                                    <TouchableOpacity
                                        onPress={() => setType("packages")}
                                        disabled={service_type === "packages"}
                                        className="h-12 flex-1 items-center justify-center rounded-lg disabled:bg-blue-600">
                                        <Text className={`capitalize ${service_type === "packages" ? 'text-white' : 'text-black'}`}>delivery</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => setType("rides")}
                                        disabled={service_type === "rides"}
                                        className="h-12 flex-1 items-center justify-center rounded-lg disabled:bg-blue-600">
                                        <Text className={`capitalize ${service_type === "rides" ? 'text-white' : 'text-black'}`}>riding</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}

                        <TouchableOpacity
                            disabled={loading}
                            onPress={handleFetchRiders}
                            className="items-center justify-center bg-blue-600 h-12 rounded-md disabled:opacity-40"
                        >
                            {
                                loading ?
                                    <ActivityIndicator /> :
                                    <Text className="font-bold capitalize text-white">fetch riders</Text>
                            }
                        </TouchableOpacity>
                    </Animated.View>
                )}
        </View>
    );
}