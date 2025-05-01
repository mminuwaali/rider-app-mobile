import React, { useState } from "react";
import { geocodeAddress } from "@/utils/geocoding";
import { useCreateAddress } from "@/hooks/api/address.hook";
import Animated, { SlideInUp, SlideOutDown } from "react-native-reanimated";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useGoogleAutocomplete } from "@appandflow/react-native-google-autocomplete";

interface CreateAddressModalProps {
    onClose: () => void;
}

export function CreateAddressModal({ onClose }: CreateAddressModalProps) {
    const addressMutation = useCreateAddress();
    const [selectedAddress, setSelectedAddress] = useState<{ name: string; coordinates: { latitude: number; longitude: number } } | null>(null);
    const googleMap = useGoogleAutocomplete(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!, {
        debounce: 500,
    });

    const handlePlaceSelection = async (prediction: any) => {
        const geocodeResult = await geocodeAddress(prediction.place_id);
        if (geocodeResult && geocodeResult.success) {
            const coordinates = {
                latitude: geocodeResult.coordinates?.latitude,
                longitude: geocodeResult.coordinates?.longitude,
            };

            setSelectedAddress({ name: prediction.structured_formatting.main_text, coordinates });
            googleMap.setTerm("");
        }
    };

    const handleSave = () => {
        if (selectedAddress) {
            addressMutation.mutate(selectedAddress, {
                onSuccess() {
                    onClose();
                }
            })
        } else {
            alert("Please select an address.");
        }
    };

    return (
        <Animated.View className="flex-1 justify-center bg-black/50 p-5">
            <View className="bg-white rounded-xl gap-8 p-4">
                {/* Title Section */}
                <View className="">
                    <Text className="text-xl font-bold text-center">Add New Address</Text>
                </View>

                {/* Body Section */}
                <View className="">
                    <TextInput
                        value={googleMap.term}
                        onChangeText={googleMap.setTerm}
                        placeholder="Search for an address"
                        className="h-12 border border-gray-300 rounded-md px-4 mb-2"
                    />
                    {googleMap.locationResults.length > 0 && (
                        <FlatList
                            data={googleMap.locationResults}
                            keyExtractor={(item) => item.place_id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handlePlaceSelection(item)}
                                    className="p-3 border-b border-gray-200"
                                >
                                    <Text className="font-medium">
                                        {item.structured_formatting.main_text}
                                    </Text>
                                    <Text className="text-sm text-gray-500">
                                        {item.structured_formatting.secondary_text}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>

                {/* Footer Section */}
                <View className="flex-row justify-between">
                    <TouchableOpacity onPress={onClose} className="flex-1 h-12 bg-gray-300 rounded-md justify-center items-center mx-1">
                        <Text className="text-black font-bold">Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSave} className="flex-1 h-12 bg-blue-600 rounded-md justify-center items-center mx-1">
                        <Text className="text-white font-bold">Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
}
