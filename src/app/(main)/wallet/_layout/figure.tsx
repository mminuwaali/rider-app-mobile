import React from "react";
import { View, TextInput } from "react-native";
import Animated from "react-native-reanimated";
import { formatCurrency } from "@/utils/helpers";
import { withTiming, useSharedValue } from "react-native-reanimated";

interface IFigurePorps {
  value: string;
  setValue: (value: IFigurePorps['value']) => void;
}

export default React.Fragment;
export function Figure(properties: IFigurePorps) {
  const opacity = useSharedValue(0.3);
  const ref = React.useRef<TextInput>(null);

  React.useEffect(() => {
    opacity.value = withTiming(properties.value !== "0" ? 1 : 0.3);
  }, [properties.value]);

  const handleFocus = () => {
    const input = ref.current;
    if (!input) return;
    input.setSelection(
      properties.value.length,
      properties.value.length,
    );
  }

  return (
    <View className="items-center justify-center relative">
      <Animated.Text style={{ opacity }} className="py-10 font-bold text-7xl pointer-events-none">
        {formatCurrency(+properties.value)}
      </Animated.Text>

      <TextInput
        ref={ref}
        maxLength={6}
        keyboardType="numeric"
        onFocus={handleFocus}
        value={properties.value}
        onSelectionChange={handleFocus}
        onChangeText={properties.setValue}
        className="absolute w-full h-full text-center opacity-0"
      />
    </View>
  );
}
