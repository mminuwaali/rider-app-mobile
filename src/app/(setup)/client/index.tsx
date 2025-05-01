import * as Yup from "yup";
import React from "react";
import { Formik } from "formik";
import { Entypo } from "@expo/vector-icons";
import { geocodeAddress } from "@/utils/geocoding";
import { Header } from "@/app/(auth)/_layout/header";
import { useGoogleAutocomplete } from "@appandflow/react-native-google-autocomplete";
import { 
    View, 
    Text, 
    TextInput, 
    ScrollView, 
    FlatList,
    TouchableOpacity, 
    ActivityIndicator 
} from "react-native";

interface IAddress {
    name: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

interface IClientSettings {
    addresses: IAddress[];
}

// Validation schema
const validationSchema = Yup.object().shape({
    addresses: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().required("Address name is required"),
                coordinates: Yup.object().shape({
                    latitude: Yup.number().required(),
                    longitude: Yup.number().required(),
                }),
            })
        )
        .min(1, "At least one address is required"),
});

export default function () {
    const [isLoading, setIsLoading] = React.useState(false);
    const googleMap = useGoogleAutocomplete(
        process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!, 
        { debounce: 1000 }
    );

    const initialValues: IClientSettings = {
        addresses: [],
    };

    const handlePlaceSelection = async (prediction: any, setFieldValue: any, values: any) => {
        try {
            setIsLoading(true);
            const geocodeResult = await geocodeAddress(prediction.place_id);

            if (geocodeResult.success) {
                const newAddress: IAddress = {
                    name: prediction.structured_formatting.main_text,
                    coordinates: {
                        latitude: geocodeResult.coordinates?.latitude,
                        longitude: geocodeResult.coordinates?.longitude,
                    },
                };

                setFieldValue("addresses", [...values.addresses, newAddress]);
                googleMap.setTerm("");
            } else {
                throw new Error(geocodeResult.error);
            }
        } catch (error) {
            console.error("Error selecting place:", error);
            alert("Failed to add address. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveAddress = (index: number, setFieldValue: any, values: any) => {
        try {
            const newAddresses = values.addresses.filter((_: any, i: number) => i !== index);
            setFieldValue("addresses", newAddresses);
        } catch (error) {
            console.error("Error removing address:", error);
            alert("Failed to remove address. Please try again.");
        }
    };

    return (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                    // Add your API call here
                }}
            >
                {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                    <ScrollView className="flex-1" contentContainerClassName="p-5">
                        <View className="flex-1 gap-20">
                            <Header
                                title="Client Setup"
                                description="Add your frequently visited addresses for easier booking"
                            />

                            <View className="gap-4">
                                {/* Address Search */}
                                <View>
                                    <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
                                        <Entypo name="location-pin" size={16} />
                                        <TextInput
                                            value={googleMap.term}
                                            onChangeText={googleMap.setTerm}
                                            placeholder="Search for an address"
                                            className="h-14 grow"
                                        />
                                    </View>

                                    {/* Location Results */}
                                    {googleMap.locationResults.length > 0 && (
                                        <View className="bg-white shadow-sm rounded-md overflow-hidden mt-2">
                                            {isLoading ? (
                                                <View className="p-4 items-center">
                                                    <ActivityIndicator size="small" color="#0000ff" />
                                                    <Text className="text-gray-500 mt-2">
                                                        Getting address details...
                                                    </Text>
                                                </View>
                                            ) : (
                                                <FlatList
                                                    data={googleMap.locationResults}
                                                    keyExtractor={(item) => item.place_id}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            onPress={() => 
                                                                handlePlaceSelection(item, setFieldValue, values)
                                                            }
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
                                    )}
                                </View>

                                {/* Saved Addresses */}
                                {values.addresses.length > 0 && (
                                    <View className="gap-2">
                                        <Text className="font-bold text-lg">Saved Addresses</Text>
                                        {values.addresses.map((address, index) => (
                                            <View 
                                                key={index} 
                                                className="bg-white p-3 rounded-md shadow-sm"
                                            >
                                                <View className="flex-row justify-between items-start">
                                                    <View className="flex-1">
                                                        <Text className="font-bold text-lg">
                                                            {address.name}
                                                        </Text>
                                                        <Text className="text-gray-500 text-xs">
                                                            Lat: {address.coordinates.latitude.toFixed(4)},
                                                            Lng: {address.coordinates.longitude.toFixed(4)}
                                                        </Text>
                                                    </View>
                                                    <TouchableOpacity
                                                        onPress={() => 
                                                            handleRemoveAddress(index, setFieldValue, values)
                                                        }
                                                        className="p-2"
                                                    >
                                                        <Entypo name="cross" size={24} color="red" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {touched.addresses && errors.addresses && (
                                    <Text className="text-red-500 text-sm">
                                        {typeof errors.addresses === 'string' 
                                            ? errors.addresses 
                                            : 'Please add at least one address'}
                                    </Text>
                                )}
                            </View>

                            {/* Submit Button */}
                            <View className="gap-6">
                                <TouchableOpacity
                                    onPress={() => handleSubmit()}
                                    className="h-14 shadow rounded-xl bg-blue-600 items-center justify-center"
                                >
                                    <Text className="font-bold text-lg text-center text-white">
                                        Complete Setup
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                )}
            </Formik>
        </ScrollView>
    );
}