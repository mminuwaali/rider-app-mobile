import Animated from "react-native-reanimated";
import { FadeInDown } from "react-native-reanimated";
import { formatCurrency } from "@/src/utils/helpers";
import { useAnimationContext } from "../_context/animation";
import { withTiming, useAnimatedStyle } from "react-native-reanimated";

export function Balance() {
  const fadeIn = FadeInDown;
  const fadeInDelay = fadeIn.delay(300);
  const { chartHeight } = useAnimationContext();

  const balanceAnimatedStyle = useAnimatedStyle(() => ({
    fontSize: withTiming(chartHeight.value <= 0 ? 20 : 48),
    fontWeight: withTiming(chartHeight.value <= 0 ? "bold" : "thin"),
  }));

  return (
    <Animated.View className="">
      <Animated.Text
        entering={fadeIn}
        children={"available balance"}
        className="capitalize text-lg text-gray-400 font-bold"
      />

      <Animated.Text
        className="font-inter"
        entering={fadeInDelay}
        style={balanceAnimatedStyle}
        children={formatCurrency(20_000)}
      />
    </Animated.View>
  );
}
