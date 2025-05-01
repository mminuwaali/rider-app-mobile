import { Text, View } from "react-native";
import { formatCurrency, formatDate } from "@/utils/helpers";

interface ITransactionCardProps {
  item: ITransaction;
}

export function TransactionCard(props: ITransactionCardProps) {
  const statusColors = {
    failed: "text-red-500",
    pending: "text-yellow-500",
    completed: "text-green-500",
  };

  return (
    <View className="p-4 rounded-md bg-gray-50 shadow-sm">
      <View className="mb-4 flex-row justify-between items-center">
        <Text className="text-sm font-bold text-gray-700 capitalize">
          {props.item.type}
        </Text>
        <Text className={`text-lg font-semibold ${statusColors[props.item.status]}`}>
          {props.item.status.charAt(0).toUpperCase() + props.item.status.slice(1)}
        </Text>
      </View>

      <Text className="text-2xl font-bold text-gray-900">
        {formatCurrency(props.item.amount)}
      </Text>

      <Text className="text-sm text-gray-500">
        Reference: {props.item.reference}
      </Text>

      <Text className="text-xs text-gray-400">
        Date: {formatDate(props.item.created_at)}
      </Text>
    </View>
  );
}
