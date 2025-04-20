import { ProgressChart } from "react-native-chart-kit";
import { Text, View } from "react-native";
import { calculateWidth, formatCurrency } from "@/src/utils/helpers";

interface IInOutChartProps {
    balance?: string;
}


export function InOutChart(properties: IInOutChartProps) {
    const totalDeposit = 80000;
    const totalWithdrawal = 50000;
    const total = totalDeposit + totalWithdrawal;
    const totalBalance = +(properties.balance || 0);

    const progressData = {
        colors: ["#4A5568", "#718096"],
        data: [totalDeposit / total, totalWithdrawal / total],
    };

    const legendItems = [
        { label: "Deposit", color: "#4A5568" },
        { label: "Withdrawal", color: "#718096" },
    ];

    return (
        <View className="items-center">
            <Text className="text-xl font-bold text-gray-700">Financial Overview</Text>
            <Text className="mb-5 text-xl text-gray-500">
                Current Balance: {formatCurrency(+(properties.balance || 0))}
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
                hideLegend={true}
            />
        </View>
    );
}
