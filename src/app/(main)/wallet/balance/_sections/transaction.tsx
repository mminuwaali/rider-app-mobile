import React from "react";
import { View, Text } from "react-native";
import { TransactionCard } from "./_cards/transaction";
import { useGetTransactions } from "@/hooks/api/wallet.hook";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAnimateContext } from "../../_layout/_providers/animate.provider";
import { useAnimatedScrollHandler, withSpring } from "react-native-reanimated";

export default React.Fragment;
export function Transaction() {
  const transactionQuery = useGetTransactions();
  const { scrollY, chartHeight } = useAnimateContext();

  const data = React.useMemo(
    () => transactionQuery.data?.results || [], [transactionQuery]
  );

  console.log(data)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const offset = event.contentOffset.y * 1.2;
      scrollY.value = offset;

      // Calculate new chart height
      const newHeight = 220 - offset;
      chartHeight.value = withSpring(Math.max(0, Math.min(newHeight, 220)));
    },
  });

  return (
    <View className="flex-1 gap-4">
      <View className="-mt-8 flex-row items-center justify-between">
        <Text className="capitalize font-bold text-2xl">
          recent transactions
        </Text>

        <View className=""></View>
      </View>

      <Animated.FlatList
        data={data}
        className="flex-1"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerClassName="gap-4"
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(index * 200)}>
            <TransactionCard item={item} />
          </Animated.View>
        )}
      />
    </View>
  );
}
