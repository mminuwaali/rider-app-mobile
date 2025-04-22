import React from "react";
import Animated from "react-native-reanimated";
import { Amount } from "../_layout/_sections/amount";
import { InOutChart } from "../_layout/_sections/in-out-chart";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function () {
  const [loading] = React.useState(false);
  const [amount, setAmount] = React.useState("");

  return (
    <Animated.View className="flex-1 p-5% pb-60 gap-14">
      <Amount
        maxAmount="20000"
        setAmount={setAmount}
      />
      <InOutChart />

      <View className="mt-auto gap-6">
        <TouchableOpacity
          disabled={amount.length <= 0}
          className="h-14 shadow rounded-xl bg-blue-600 items-center justify-center disabled:opacity-30 disabled:bg-gray-400"
        >
          {loading ? (
            <ActivityIndicator className="text-white" />
          ) : (
            <Text className="font-bold text-lg text-center text-white">
              Continue
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
