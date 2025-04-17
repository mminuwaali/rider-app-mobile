import { Text, TextInput, View } from "react-native";

type AmountInputProps = {
    amount:string;
    setAmount:(value:string)=>void;
};

export function AmountInput(properties: AmountInputProps) {
    return (
      <View className="gap-4">
        <Text className="text-lg font-bold">Enter Amount</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter amount"
          value={properties.amount}
          onChangeText={(text) => properties.setAmount(text)}
          className="border border-gray-300 rounded-lg px-4 py-3 text-lg"
        />
      </View>
    );
  }