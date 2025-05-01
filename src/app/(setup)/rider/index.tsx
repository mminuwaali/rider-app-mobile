import * as Yup from "yup";
import React from "react";
import { Formik } from "formik";
import { Entypo } from "@expo/vector-icons";
import { Header } from "@/app/(auth)/_layout/header";
import { useGetRiderSetup, useUpdateRiderSetup } from "@/hooks/api/setup.hook";
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

// Define service choices to match Django model
const SERVICE_CHOICES = [
    { value: 'rides', label: 'Rides Only' },
    { value: 'packages', label: 'Packages Only' },
    { value: 'both', label: 'Both Rides & Packages' },
] as const;

interface IRiderSettings {
    capacity: null | number;
    price_per_km: null | number;
    service_type: typeof SERVICE_CHOICES[number]['value'] | undefined;
}

// Validation schema
const validationSchema = Yup.object().shape({
    capacity: Yup.number()
        .required("Capacity is required")
        .min(1, "Capacity must be at least 1")
        .integer("Capacity must be a whole number"),
    price_per_km: Yup.number()
        .required("Price per kilometer is required")
        .min(0, "Price must be greater than or equal to 0")
        .test("decimal", "Price can't have more than 2 decimal places", (value) => {
            if (!value) return true;
            return /^\d+(\.\d{0,2})?$/.test(value.toString());
        }),
    service_type: Yup.string()
        .required("Service type is required")
        .oneOf(['both', 'rides', 'packages'], "Invalid service type"),
});

export default function () {
    const setupQuery = useGetRiderSetup();
    const setupMutation = useUpdateRiderSetup();

    const loading = React.useMemo(
        () => setupQuery.isLoading || setupMutation.isPending, [setupQuery, setupMutation]
    );

    const initialValues: Partial<IRider> = {
        capacity: undefined,
        price_per_km: undefined,
        service_type: undefined,
    };

    const onSubmit = (values: IRiderSettings) => {
        setupMutation.mutate(values, {
            onSuccess(data) {
                alert("success");
                router.replace("/home/" as never);
            }
        })
    };

    const formatPrice = (value: string) => {
        // Remove non-numeric characters except decimal point
        let formatted = value.replace(/[^0-9.]/g, '');

        // Ensure only one decimal point
        const parts = formatted.split('.');
        if (parts.length > 2) {
            formatted = parts[0] + '.' + parts.slice(1).join('');
        }

        // Limit to 2 decimal places
        if (parts[1]?.length > 2) {
            formatted = parts[0] + '.' + parts[1].slice(0, 2);
        }

        return formatted;
    };

    return (
        setupQuery.data &&
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <Formik
                onSubmit={onSubmit}
                initialValues={setupQuery.data}
                validationSchema={validationSchema}
            >
                {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                    < ScrollView className="flex-1" contentContainerClassName="p-5">
                        <View className="flex-1 gap-20">
                            <Header
                                title="Rider Setup"
                                description="Finish setting up your profile before accepting any request"
                            />

                            <View className="gap-4">
                                {/* Capacity Input */}
                                <View>
                                    <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
                                        <Entypo name="users" size={16} />
                                        <TextInput
                                            className="h-14 grow"
                                            keyboardType="numeric"
                                            placeholder="Set your ride capacity"
                                            value={values.capacity.toString()}
                                            onChangeText={(value) => {
                                                const numericValue = value.replace(/[^0-9]/g, '');
                                                setFieldValue("capacity", numericValue ? parseInt(numericValue) : 0);
                                            }}
                                        />
                                    </View>
                                    {touched.capacity && errors.capacity && (
                                        <Text className="text-red-500 text-sm mt-1">{errors.capacity}</Text>
                                    )}
                                </View>

                                {/* Price per KM Input */}
                                <View>
                                    <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
                                        <Entypo name="price-tag" size={16} />
                                        <TextInput
                                            className="h-14 grow"
                                            keyboardType="decimal-pad"
                                            placeholder="Set your pricing per KM"
                                            value={values.price_per_km.toString()}
                                            onChangeText={(value) => {
                                                const formattedValue = formatPrice(value);
                                                setFieldValue("price_per_km", formattedValue ? parseFloat(formattedValue) : 0);
                                            }}
                                        />
                                        <Text className="text-gray-500">KES/KM</Text>
                                    </View>
                                    {touched.price_per_km && errors.price_per_km && (
                                        <Text className="text-red-500 text-sm mt-1">{errors.price_per_km}</Text>
                                    )}
                                </View>

                                {/* Service Type Selection */}
                                <View className="gap-2">
                                    <Text className="font-medium text-gray-700">Select Service Type</Text>
                                    <View className="flex-row flex-wrap gap-2">
                                        {SERVICE_CHOICES.map((service) => (
                                            <TouchableOpacity
                                                key={service.value}
                                                onPress={() => setFieldValue("service_type", service.value)}
                                                className={`px-4 py-2 rounded-full border ${values.service_type === service.value
                                                    ? "bg-blue-600 border-blue-600"
                                                    : "border-gray-300"
                                                    }`}
                                            >
                                                <Text
                                                    className={`text-sm ${values.service_type === service.value
                                                        ? "text-white"
                                                        : "text-gray-700"
                                                        }`}
                                                >
                                                    {service.label}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    {touched.service_type && errors.service_type && (
                                        <Text className="text-red-500 text-sm mt-1">{errors.service_type}</Text>
                                    )}
                                </View>
                            </View>

                            {/* Submit Button */}
                            <View className="gap-6">
                                <TouchableOpacity
                                    disabled={loading}
                                    onPress={() => handleSubmit()}
                                    className="h-14 shadow rounded-xl bg-blue-600 items-center justify-center disabled:opacity-30 disabled:bg-gray-400"
                                >
                                    <Text className="font-bold text-lg text-center text-white">
                                        Continue
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                )
                }
            </Formik >
        </ScrollView >
    );
}