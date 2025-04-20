import React from "react";
import Animated from "react-native-reanimated";
import { FadeInDown } from "react-native-reanimated";
import { formatCurrency } from "@/src/utils/helpers";
import { useAnimationContext } from "../_context/animation";
import { withTiming, useAnimatedStyle } from "react-native-reanimated";
import { useGetWalletBalance } from "@/src/hooks/api/wallet.hook";

export function Balance() {
  const fadeIn = FadeInDown;
  const fadeInDelay = fadeIn.delay(300);

  const balanceQuery = useGetWalletBalance();
  const { chartHeight } = useAnimationContext();

  const balance = React.useMemo(
    () => balanceQuery.data?.amount || "0",
    [balanceQuery.data]
  );

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
        children={formatCurrency(+balance)}
      />
    </Animated.View>
  );
}
