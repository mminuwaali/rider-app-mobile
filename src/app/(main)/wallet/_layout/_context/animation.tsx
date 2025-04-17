import React from "react";
import { SharedValue } from "react-native-reanimated";

interface AnimationContextType {
  scrollY: SharedValue<number>;
  chartHeight: SharedValue<number>;
}

export const AnimationContext =
  React.createContext<AnimationContextType | null>(null);

export const useAnimationContext = () => {
  const context = React.useContext(AnimationContext);
  if (!context)
    throw new Error("AnimationContext must be used within AnimationProvider");
  return context;
};
