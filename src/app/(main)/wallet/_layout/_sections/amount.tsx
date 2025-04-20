import React from "react";
import { formatCurrency } from "@/src/utils/helpers";
import { Text, TextInput, View } from "react-native";

interface IAmountProps {
    amount: string;
    maxAmount?: string;
    setAmount: (value: string) => void;
};

export function aAmount(properties: IAmountProps) {
    const maxAmount = 20_000;
    const ref = React.useRef<TextInput>(null);

    const handleSetAmount = (value: string) => {
        let filteredValue = value.replaceAll(/\D/g, "");
        properties.setAmount(
            Math.min(
                +filteredValue, +(properties.maxAmount || 0)
            ).toString()
        )
    };

    return <View className="items-center justify-center relative">
        <Text className="mt-6 drop-shadow text-gray-400 text-7xl font-bold pointer-events-none">
            {formatCurrency(+properties.amount)}
        </Text>

        <Text className={`text-sm ${!properties.maxAmount && "hidden"}`}>
            Max Withdrawalable: {properties.maxAmount && formatCurrency(+properties.maxAmount)}
        </Text>

        <TextInput
            ref={ref}
            maxLength={6}
            value={properties.amount}
            keyboardType="number-pad"
            onChangeText={handleSetAmount}
            className="inset-0 absolute opacity-0"
            onSelectionChange={({ nativeEvent: { selection } }) => {
                const length = properties.amount.length;
                if (selection && ref.current) ref.current.setNativeProps({
                    selection: { start: length, end: length }
                })
            }}
        />
    </View>
}