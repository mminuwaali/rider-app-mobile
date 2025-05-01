import React from "react";
import { SharedValue } from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";

interface IAnimateContext {
    scrollY: SharedValue<number>;
    chartHeight: SharedValue<number>;
}

const AnimateContext = React.createContext<null | IAnimateContext>();
export const useAnimateContext = () => React.useContext(AnimateContext)!;

export default function AnimateProvider(properties: React.PropsWithChildren) {
    const scrollY = useSharedValue(0);
    const chartHeight = useSharedValue(200);

    return (
        <AnimateContext.Provider
            {...properties}
            value={{ scrollY, chartHeight }}
        />
    );
}