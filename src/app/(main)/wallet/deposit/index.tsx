import React from "react";
import { View } from "react-native";
import { Confirm } from "./_sections/confirm";
import { AmountInput } from "./_sections/amount";
import { Balance } from "../_layout/_sections/balance";

export default function () {
  const [amount, setAmount] = React.useState("");

  return (
    <View className="flex-1 p-5% gap-10">
      <Balance />
      <AmountInput amount={amount} setAmount={setAmount} />
      <Confirm amount={amount} />
    </View>
  );
}