import Animated from "react-native-reanimated";
import { BarChart } from "react-native-chart-kit";
import { calculateWidth } from "@/src/utils/helpers";
import * as Reanimated from "react-native-reanimated";
import { Text, TouchableOpacity, View } from "react-native";
import { useAnimationContext } from "../../_layout/_context/animation";

export function Overview() {
  const { chartHeight } = useAnimationContext();

  const chartAnimatedStyle = Reanimated.useAnimatedStyle(() => {
    return { height: chartHeight.value };
  });
  const containerAnimatedStyle = Reanimated.useAnimatedStyle(() => {
    return { display: chartHeight.value <= 5 ? "none" : "flex" };
  });

  const data = {
    datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  };

  return (
    <Animated.View
      className="gap-6"
      entering={Reanimated.FadeIn}
      exiting={Reanimated.FadeOut}
      style={containerAnimatedStyle}
    >
      <View className="flex-row items-center justify-between">
        <Text className="capitalize font-bold text-2xl">overview</Text>

        <TouchableOpacity>
          <Text className="text-xs font-bold px-4 py-1 capitalize rounded-md border border-slate-600 text-slate-600">
            monthly
          </Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[chartAnimatedStyle, containerAnimatedStyle]}
        className="w-full bg-white rounded-xl overflow-hidden"
      >
        <BarChart
          fromZero
          data={data}
          yAxisLabel="$"
          yAxisSuffix="k"
          showValuesOnTopOfBars
          height={chartHeight.get()}
          width={calculateWidth(90)}
          chartConfig={{
            barRadius: 6,
            decimalPlaces: 0,
            barPercentage: 0.2,
            backgroundColor: "blue",
            backgroundGradientTo: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            labelColor: () => `rgba(0, 0, 0, 0.6)`,
            color: (opacity = 1) => `rgba(71, 85, 105, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForLabels: {
              fontSize: 10,
            },
          }}
        />
      </Animated.View>
    </Animated.View>
  );
}
