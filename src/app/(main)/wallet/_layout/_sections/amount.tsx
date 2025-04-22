import React from "react";
import { formatCurrency } from "@/utils/helpers";
import { Text, TextInput, View } from "react-native";
import { useGetBalance } from "@/hooks/api/wallet.hook";

interface IAmountProps {
    maxAmount?: string;
    setAmount: (value: string) => void;
};

export function Amount(properties: IAmountProps) {
    const walletQuery = useGetBalance();
    const ref = React.useRef<TextInput>(null);

    const handleSetAmount = (value: string) => {
        let filteredValue = value.replaceAll(/\D/g, "");
        properties.setAmount(
            Math.min(
                +filteredValue, Number(walletQuery.data?.amount)
            ).toString()
        )
    };

    return <View className="items-center justify-center relative">
        <Text className="mt-6 drop-shadow text-gray-400 text-7xl font-bold pointer-events-none">
            {formatCurrency(Number(walletQuery.data?.amount))}
        </Text>

        <Text className={`text-sm ${!properties.maxAmount && "hidden"}`}>
            Max Withdrawalable: {properties.maxAmount && formatCurrency(+properties.maxAmount)}
        </Text>

        <TextInput
            ref={ref}
            maxLength={6}
            keyboardType="number-pad"
            onChangeText={handleSetAmount}
            className="inset-0 absolute opacity-0"
            value={walletQuery.data?.amount ?? ""}
            onSelectionChange={({ nativeEvent: { selection } }) => {
                const length = walletQuery.data?.amount.length ?? 0;
                if (selection && ref.current) ref.current.setNativeProps({
                    selection: { start: length, end: length }
                })
            }}
        />
    </View>
}