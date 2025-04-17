import { formatCurrency } from "@/src/utils/helpers";
import { Text, TouchableOpacity, View } from "react-native";

type ConfirmType = {
    amount: string;
}

export function Confirm(properties: ConfirmType) {
    return (
        <View className="gap-4">
            <Text className="text-lg font-bold">Confirm Deposit</Text>

            <View className="flex-row justify-between">
                <Text className="text-gray-500 font-bold">Amount:</Text>
                <Text className="text-gray-700 font-bold">{formatCurrency(+properties.amount)}</Text>
            </View>

            <TouchableOpacity
                disabled={!properties.amount}
                className={`mt-4 py-4 rounded-lg items-center justify-center ${properties.amount ? "bg-green-500" : "bg-gray-300"}`}
            >
                <Text className={`font-bold ${properties.amount ? "text-white" : "text-gray-500"}`}>
                    Confirm Deposit
                </Text>
            </TouchableOpacity>
        </View>
    );
}