import { BlurView } from "expo-blur";
import { Schedule } from "./_section/schedule";
import { Header } from "@/app/(auth)/_layout/header";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function () {
    return (
        <BlurView tint="light" intensity={500} className="flex-1">
            <Animated.View entering={FadeInDown} className="p-5% flex-1 gap-4 rounded-xl">
                <Header title="schedules" description="the list of your achedules" />
                <Schedule />
            </Animated.View>
        </BlurView>
    )
}