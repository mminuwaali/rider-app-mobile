import {View, Text } from "react-native";
import Animated from "react-native-reanimated";
import { TransactionCard } from "./cards/transaction";
import { useAnimationContext } from "../../_layout/_context/animation";
import { useAnimatedScrollHandler, withSpring } from "react-native-reanimated";

export function Transaction() {
  const { scrollY, chartHeight } = useAnimationContext();

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
        className="flex-1"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerClassName="gap-4"
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        data={Array.from({ length: 50 }, (_, id) => ({ id }))}
        renderItem={() => (
          <Animated.View>
            <TransactionCard />
          </Animated.View>
        )}
      />
    </View>
  );
}
