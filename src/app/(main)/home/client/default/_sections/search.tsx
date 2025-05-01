import React from "react";
import { geocodeAddress } from "@/utils/geocoding";
import { useClientContext } from "../../_layout/_context/client.context";
import { useGoogleAutocomplete } from "@appandflow/react-native-google-autocomplete";
import { View, TextInput, FlatList, TouchableOpacity, Text, ActivityIndicator } from "react-native";

export function Search() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { rider, riders, fetchRiders } = useClientContext();
  const [service_type, setType] = React.useState<IRider['service_type'] | "">("");
  const googleMap = useGoogleAutocomplete(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!, {
    debounce: 500,
  });

  const handlePlaceSelection = async (prediction: any) => {
    try {
      setIsLoading(true);
      if (!service_type) return alert("Select a service type")
      const geocodeResult = await geocodeAddress(prediction.place_id);

      if (geocodeResult.success) {
        fetchRiders({
          service_type,
          destination: {
            latitude: geocodeResult.coordinates!.latitude,
            longitude: geocodeResult.coordinates?.longitude,
          }
        })
      } else {
        throw new Error(geocodeResult.error);
      }

      googleMap.setTerm("");
    } catch (error) {
      console.error("Error selecting place:", error);
      alert("Failed to select place. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetSearch = (term: string) => {
    if (!service_type) return alert("Select a service type first");
    googleMap.setTerm(term);
  }

  React.useEffect(() => {
    if (riders.length === 0) {
      setType("");
      googleMap.setTerm("");
    }
  }, [riders]);


  if (rider || riders.length > 0) return null;

  return (
    <View className="bg-white p-4 shadow-md rounded-md mb-4">
      {/* Search Input */}
      <View className="gap-2">
        <TextInput
          value={googleMap.term}
          onChangeText={handleSetSearch}
          placeholder="Search for a location"
          className="h-12 px-4 border border-gray-300 rounded-md"
        />

        <View className="flex-row border rounded-md border-gray-200">
          <TouchableOpacity
            disabled={service_type === "packages"}
            onPress={() => setType("packages")}
            className="h-12 flex-1 items-center justify-center rounded-lg disabled:bg-blue-600">
            <Text className={`capitalize ${service_type === "packages" ? 'text-white' : 'text-black'}`}>delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={service_type === "rides"}
            onPress={() => setType("rides")}
            className="h-12 flex-1 items-center justify-center rounded-lg disabled:bg-blue-600">
            <Text className={`capitalize ${service_type === "rides" ? 'text-white' : 'text-black'}`}>riding</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Floating Results Container */}
      {googleMap.locationResults.length > 0 && (
        <View className="absolute top-16 left-0 right-0 bg-white shadow-md rounded-md z-10">
          {isLoading ? (
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
      )}
    </View>
  );
}