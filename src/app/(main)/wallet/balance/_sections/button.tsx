import { Link } from "expo-router";
import { Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";

export function Button() {
  return (
    <View className="flex-row gap-4 -mt-10">
      <Link asChild href="/wallet/deposit">
        <TouchableOpacity className="flex-1 border-2 border-green-500/60 rounded-md py-3 items-center justify-center">
          <Text className="text-green-500 font-bold">Deposit</Text>
        </TouchableOpacity>
      </Link>

      <Link asChild href="/wallet/withdraw">
        <TouchableOpacity className="flex-1 border-2 border-red-500/60 rounded-md py-3 items-center justify-center">
          <Text className="text-red-500 font-bold">Withdraw</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
