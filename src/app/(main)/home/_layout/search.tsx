import Animated from "react-native-reanimated";
import { FadeInUp } from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, TextInput, View } from "react-native";

interface ISearchProps {
  placeholder?: string;
}

export function Search(properties: ISearchProps) {
  return (
    <Animated.View entering={FadeInUp.delay(100)} className="relative">
      <View className="flex-row items-center gap-4">
        <TextInput
          placeholder={properties.placeholder ?? "Search for places"}
          className="px-4 flex-1 h-12 rounded-full bg-white p-2 shadow"
        />

        <TouchableOpacity className="w-12 h-12 rounded-full bg-white shadow items-center justify-center">
          <Ionicons name="search" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
