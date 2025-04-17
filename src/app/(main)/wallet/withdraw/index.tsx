import React, { useState } from "react";
import { View, Text } from "react-native";
import Animated from "react-native-reanimated";
import Slider from "@react-native-community/slider";
import { formatCurrency } from "@/src/utils/helpers";
import { Balance } from "../_layout/_sections/balance";

export default function () {
  const [amount, setAmount] = useState(0);
  const maxAmount = 20000;

  return (
    <Animated.View className="flex-1 p-5% gap-14">
      <Balance />

      <View className="p-4 bg-gray-200 rounded-md">
        <Text className="text-lg font-bold text-gray-700">Withdraw Amount</Text>
        <Text className="text-gray-600">Selected: {formatCurrency(amount)}</Text>
        <Slider
          step={50}
          value={amount}
          thumbTintColor="#6B7280"
          maximumValue={maxAmount}
          onValueChange={setAmount}
          minimumTrackTintColor="#4B5563"
          maximumTrackTintColor="#D1D5DB"
          style={{ width: "100%", height: 40 }}
        />
      </View>
    </Animated.View>
  );
}
