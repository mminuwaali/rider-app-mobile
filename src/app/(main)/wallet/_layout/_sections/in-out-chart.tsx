import React from "react";
import { Text, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { useGetBalance } from "@/hooks/api/wallet.hook";
import { calculateWidth, formatCurrency } from "@/utils/helpers";

export function InOutChart() {
    const balanceQuery = useGetBalance();
    const wallet = React.useMemo(() => balanceQuery.data, [balanceQuery.data])

    const totalDeposit = Number(wallet?.total_deposit);
    const totalWithdrawal = Number(wallet?.total_withdrawn);
    const totalAll = Number(totalDeposit + totalWithdrawal);


    const progressData = {
        colors: ["#4A5568", "#718096"],
        data: [(totalDeposit / totalAll) || 0, (totalWithdrawal / totalAll || 0)],
    };

    const legendItems = [
        { label: "Deposit", color: "#4A5568" },
        { label: "Withdrawal", color: "#718096" },
    ];

    return (
        <View className="items-center">
            <Text className="text-xl font-bold text-gray-700">Financial Overview</Text>
            <Text className="mb-5 text-xl text-gray-500">
                Current Balance: {formatCurrency(Number(wallet?.amount))}
            </Text>
            <View className="w-full flex-row justify-around">
                {legendItems.map((item, index) => (
                    <View key={index} className="gap-2 flex-row items-center">
                        <View className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <Text className="text-lg font-semibold text-gray-700">{item.label}</Text>
                    </View>
                ))}
            </View>

            <ProgressChart
                hideLegend
                radius={32}
                height={220}
                strokeWidth={16}
                data={progressData}
                width={calculateWidth(90)}
                chartConfig={{
                    labelColor: () => "#718096",
                    backgroundGradientTo: "#FFFFFF",
                    backgroundGradientFrom: "#FFFFFF",
                    color: (opacity = 1, index) => progressData.colors[index!],
                }}
            />
        </View>
    );
}
