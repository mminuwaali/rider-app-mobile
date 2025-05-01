import React from "react";
import Animated from "react-native-reanimated";
import { FadeInUp } from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { geocodeAddress } from "@/utils/geocoding";
import { CreateBookingModal } from "./_modals/booking";
import { useSearchSchedules } from "@/hooks/api/schedule.hook";
import { ScheduleCard } from "../../../rider/schedule/_section/_cards/schedule";
import { TouchableOpacity, TextInput, View, ActivityIndicator, Text, FlatList, Modal } from "react-native";
import { GoogleLocationResult, useGoogleAutocomplete } from "@appandflow/react-native-google-autocomplete";

export default React.Fragment;
export function Search(properties: { placeholder?: string; }) {
  const scheduleMutation = useSearchSchedules();
  const [visible, setVisible] = React.useState<{ distance: number; schedule: ISchedule }>();
  const [destination, setDestination] = React.useState<{ latitude: number; longitude: number; }>()
  const googleMap = useGoogleAutocomplete(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!, { debounce: 500, });

  const clearSearch = () => {
    googleMap.setTerm("");
    scheduleMutation.reset();
  };

  const fetchSchedules = async (item: GoogleLocationResult) => {
    const geocodeResult = await geocodeAddress(item.place_id);
    const coords = {
      latitude: geocodeResult.coordinates!.latitude,
      longitude: geocodeResult.coordinates!.longitude,
    }

    googleMap.setTerm("");
    setDestination(coords)
    scheduleMutation.mutate(coords);
  };


  return (
    <Animated.View entering={FadeInUp.delay(100)} className="gap-10 relative">
      <View className="gap-2">
        <View className="flex-row items-center gap-4">
          <TextInput
            value={googleMap.term}
            onChangeText={googleMap.setTerm}
            placeholder={properties.placeholder ?? "Search for schedules"}
            className="px-4 flex-1 h-12 rounded-full bg-white p-2 shadow"
          />


          {(scheduleMutation.data?.length || 0) > 0 && <TouchableOpacity
            onPress={clearSearch}
            className="w-10 h-10 rounded-full bg-red-500 shadow items-center justify-center"
          >
            <Ionicons name="close" size={16} color="white" />
          </TouchableOpacity>}
        </View>

        {googleMap.locationResults.length > 0 && (
          <View className="p-2 bg-white shadow-md rounded-md z-10">
            {scheduleMutation.isPending ? (
              <View className="p-4 items-center">
                <ActivityIndicator size="small" color="#0000ff" />
                <Text className="text-gray-500 mt-2">Loading...</Text>
              </View>
            ) : (
              <FlatList
                data={googleMap.locationResults}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => fetchSchedules(item)}
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

      <FlatList data={scheduleMutation.data || []}
        renderItem={({ item }) => (
          <ScheduleCard
            distance={item.distance}
            schedule={item.schedule}
            onView={() => { setVisible(item) }}
          />
        )}
      />

      <Modal visible={visible !== undefined} onRequestClose={() => setVisible(undefined)}>
        {visible && <CreateBookingModal
          destination={destination!}
          schedule={visible.schedule}
          onClose={() => setVisible(undefined)}
        />
        }
      </Modal>
    </Animated.View>
  );
}
