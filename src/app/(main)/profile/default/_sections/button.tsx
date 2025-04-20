import { Link } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Animated from "react-native-reanimated";
import { FadeInDown } from "react-native-reanimated";
import { Text, TouchableOpacity } from "react-native";

export function Button() {
  return (
    <Animated.View
    className="flex-1 gap-4"
      entering={FadeInDown.delay(300)}
    >
      <Link asChild href="/profile/edit-profile">
        <TouchableOpacity className="p-4 flex-row rounded-lg items-center justify-between bg-gray-50">
          <Text className="text-gray-500 capitalize text-xl font-inter font-bold">
            edit profile
          </Text>
          <Entypo name="chevron-small-right" size={20} color="black" />
        </TouchableOpacity>
      </Link>

      <Link asChild href="/profile/update-password">
        <TouchableOpacity className="p-4 flex-row rounded-lg items-center justify-between bg-gray-50">
          <Text className="text-gray-500 capitalize text-xl font-inter font-bold">
            update password
          </Text>
          <Entypo name="chevron-small-right" size={20} color="black" />
        </TouchableOpacity>
      </Link>

      <Link asChild href="/">
        <TouchableOpacity className="p-4 flex-row rounded-lg items-center justify-between bg-gray-50">
          <Text className="text-gray-500 capitalize text-xl font-inter font-bold">
            discount voucher
          </Text>
          <Entypo name="chevron-small-right" size={20} color="black" />
        </TouchableOpacity>
      </Link>
    </Animated.View>
  );
}
