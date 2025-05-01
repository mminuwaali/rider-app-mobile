import * as Yup from "yup";
import { Formik } from "formik";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { geocodeAddress } from "@/utils/geocoding";
import { Header } from "@/app/(auth)/_layout/header";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useGoogleAutocomplete } from "@appandflow/react-native-google-autocomplete";
import { View, Text, TouchableOpacity, ScrollView, TextInput, FlatList, Alert } from "react-native";
import { useCreateSchedule } from "@/hooks/api/schedule.hook";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
    scheduled_date: Yup.date().required("Scheduled date is required"),
    start_time: Yup.date().required("Start time is required"),
    end_time: Yup.date()
        .required("End time is required")
        .test("is-after-start", "End time must be after start time", function (value) {
            const { start_time } = this.parent;
            return value && start_time && new Date(value) > new Date(start_time);
        }),
    routes: Yup.array()
        .of(
            Yup.object().shape({
                title: Yup.string().required(),
                latitude: Yup.number().required(),
                longitude: Yup.number().required(),
            })
        )
        .min(1, "At least one route is required"),
});

interface IRoutes {
    title: string;
    address: string;
    latitude: number;
    longitude: number;
}

export default React.Fragment;
export function CreateSchedule(properties: { schedules?: ISchedule[]; closeMOdal?: () => void }) {
    const scheduleMutation = useCreateSchedule();
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const googleMap = useGoogleAutocomplete(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!, { debounce: 1000 });
    const [currentField, setCurrentField] = useState<"scheduled_date" | "start_time" | "end_time" | null>(null);


    const initialValues = {
        end_time: null,
        price_per_km: 0,
        start_time: null,
        scheduled_date: null,
        routes: [] as IRoutes[],
    };

    const formatDate = (date: Date) => date.toISOString().split("T").shift();
    const formatTime = (date: Date) => date.toTimeString().split(" ").shift();

    const handleRemoveRoute = (index: number, setFieldValue: any, values: any) => {
        try {
            // Get the route that's being removed
            const routeToRemove = values.routes[index];

            // Remove the route from the array
            const newRoutes = values.routes.filter((_: any, i: number) => i !== index);

            // Update the form values
            setFieldValue("routes", newRoutes);
        } catch (error) {
            console.error("Error removing route:", error);
            ("Failed to remove location. Please try again.");
        }
    };

    const handlePlaceSelection = async (prediction: any, setFieldValue: any, values: any) => {
        try {
            const geocodeResult = await geocodeAddress(prediction.place_id);

            // Extract location details from the prediction
            const newRoute = {
                address: geocodeResult.formattedAddress,
                latitude: geocodeResult.coordinates?.latitude,
                longitude: geocodeResult.coordinates?.longitude,
                title: prediction.structured_formatting.main_text,
            };

            // Update the routes array with the new location
            setFieldValue("routes", [...values.routes, newRoute]);

            // Clear the search
            googleMap.setTerm("");

        } catch (error) {
            console.error("Error selecting place:", error);
            alert("Failed to add location. Please try again.");
        }
    };

    const checkForExistingSchedule = (newDate: Date) => {
        const formattedNewDate = newDate.toISOString().split("T")[0]; // Format the date in YYYY-MM-DD
        const existingSchedule = properties.schedules?.find(
            (schedule) => schedule.scheduled_date === formattedNewDate
        );
        return existingSchedule;
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                const newScheduledDate = new Date(values.scheduled_date!);

                // Check if there's already a schedule for the selected date
                const existingSchedule = checkForExistingSchedule(newScheduledDate);
                if (existingSchedule) {
                    Alert.alert(
                        "Schedule Conflict",
                        "A schedule already exists for this date. Please choose another date.",
                        [{ text: "OK" }]
                    );
                    return;
                }
                const formatedValues = {
                    ...values,
                    end_time: values.end_time ? formatTime(new Date(values.end_time)) : null,
                    start_time: values.start_time ? formatTime(new Date(values.start_time)) : null,
                    scheduled_date: values.scheduled_date ? formatDate(new Date(values.scheduled_date)) : null,
                }
                scheduleMutation.mutate(formatedValues, {
                    onSuccess() {
                        if (properties.closeMOdal) properties.closeMOdal();
                    }
                })
            }}
        >
            {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                <ScrollView className="flex-1" contentContainerClassName="py-20% p-10% justify-center" showsVerticalScrollIndicator={false}>
                    <View className="flex-1 gap-20">
                        <Header
                            title="Create Schedule"
                            description="Fill in the details below to create a new schedule"
                        />

                        <View className="gap-4">
                            {/* Scheduled Date */}
                            <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
                                <Entypo name="calendar" size={16} />
                                <TouchableOpacity
                                    onPress={() => {
                                        setCurrentField("scheduled_date");
                                        setDatePickerVisible(true);
                                    }}
                                    className="h-14 grow justify-center"
                                >
                                    <Text>
                                        {values.scheduled_date
                                            ? new Date(values.scheduled_date).toDateString()
                                            : "Select Scheduled Date"}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Time Selection Row */}
                            <View className="flex-row gap-4">
                                {/* Start Time */}
                                <View className="flex-1 bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
                                    <Entypo name="time-slot" size={16} />
                                    <TouchableOpacity
                                        onPress={() => {
                                            setCurrentField("start_time");
                                            setDatePickerVisible(true);
                                        }}
                                        className="h-14 grow justify-center"
                                    >
                                        <Text>
                                            {values.start_time
                                                ? new Date(values.start_time).toLocaleTimeString()
                                                : "Start Time"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {/* End Time */}
                                <View className="flex-1 bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
                                    <Entypo name="time-slot" size={16} />
                                    <TouchableOpacity
                                        onPress={() => {
                                            setCurrentField("end_time");
                                            setDatePickerVisible(true);
                                        }}
                                        className="h-14 grow justify-center"
                                    >
                                        <Text>
                                            {values.end_time
                                                ? new Date(values.end_time).toLocaleTimeString()
                                                : "End Time"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Price per KM */}
                            <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
                                <Entypo name="price-tag" size={16} />
                                <TextInput
                                    value={values.price_per_km.toString()}
                                    onChangeText={(value) => {
                                        // Only allow numbers and decimal point
                                        const numericValue = value.replace(/[^0-9.]/g, '');
                                        setFieldValue("price_per_km", +numericValue);
                                    }}
                                    placeholder="Price per kilometer"
                                    keyboardType="decimal-pad"
                                    className="h-14 grow"
                                />
                                <Text className="text-gray-500">KES/KM</Text>
                            </View>
                            {touched.price_per_km && errors.price_per_km && (
                                <Text className="text-red-500 text-sm">{errors.price_per_km}</Text>
                            )}


                            {/* Location Search */}
                            <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
                                <Entypo name="location-pin" size={16} />
                                <TextInput
                                    value={googleMap.term}
                                    onChangeText={googleMap.setTerm}
                                    placeholder="Search for a location"
                                    className="h-14 grow"
                                />
                            </View>

                            {/* Location Results */}
                            {googleMap.locationResults.length > 0 && (
                                <View className="bg-white shadow-sm rounded-md overflow-hidden">
                                    <FlatList
                                        data={googleMap.locationResults}
                                        keyExtractor={(item) => item.place_id}
                                        ListEmptyComponent={
                                            <Text className="p-3 text-gray-500">No results found</Text>
                                        }
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                onPress={() => handlePlaceSelection(item, setFieldValue, values)}
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
                                </View>
                            )}


                            {/* Selected Routes */}
                            {values.routes.length > 0 && (
                                <View className="gap-2">
                                    <Text className="font-bold text-lg mb-2">Selected Locations</Text>
                                    {values.routes.map((route, index) => (
                                        <View key={index} className="bg-white p-3 rounded-md shadow-sm">
                                            <View className="flex-row justify-between items-start">
                                                <View className="flex-1">
                                                    <Text className="font-bold text-lg">{route.title}</Text>
                                                    <Text className="text-gray-600 text-sm mb-1">
                                                        {route.address}
                                                    </Text>
                                                    <Text className="text-gray-500 text-xs">
                                                        Lat: {route.latitude.toFixed(4)}, Lng: {route.longitude.toFixed(4)}
                                                    </Text>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => handleRemoveRoute(index, setFieldValue, values)}
                                                    className="p-2"
                                                >
                                                    <Entypo name="cross" size={24} color="red" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>

                        {/* Submit Button */}
                        <View className="gap-6">
                            <TouchableOpacity
                                onPress={() => handleSubmit()}
                                className="h-14 shadow rounded-xl bg-blue-600 items-center justify-center"
                            >
                                <Text className="font-bold text-lg text-center text-white">
                                    Create Schedule
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Date/Time Picker */}
                        {datePickerVisible && (
                            <DateTimePicker
                                mode={currentField === "scheduled_date" ? "date" : "time"}
                                value={new Date()}
                                onChange={(_, selectedDate) => {
                                    if (currentField && selectedDate) {
                                        setFieldValue(currentField, selectedDate);
                                    }
                                    setDatePickerVisible(false);
                                }}
                            />
                        )}
                    </View>
                </ScrollView>
            )}
        </Formik>
    );
}
