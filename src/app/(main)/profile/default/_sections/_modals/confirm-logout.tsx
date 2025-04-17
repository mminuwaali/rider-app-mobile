import React from "react";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";
import { FadeInDown } from "react-native-reanimated";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useSharedValue, Easing, withSpring, withTiming } from "react-native-reanimated";

interface IConfirmLogoutProps {
    onCancel: () => void;
    onAccept: () => void;
}

export function ConfirmLogout(properties: IConfirmLogoutProps) {
    const [loading, setLoading] = React.useState(false);
    const height = useSharedValue(160);

    React.useEffect(() => {
        height.value = loading ?
            withSpring(80, { damping: 8, stiffness: 70 }) :
            withTiming(160, { easing: Easing.bounce, duration: 50 })
    }, [loading]);

    const handleCancel = async () => {
        properties.onCancel();
    }

    const handleAccept = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 3000));

        setLoading(false);
        properties.onAccept();
    }
    return (
        <BlurView tint="dark" intensity={100} className="flex-1 items-center justify-center">
            <Animated.View entering={FadeInDown.easing(Easing.poly(10))} style={{ height }} className="gap-10 p-6 w-4/5 bg-white rounded-md shadow-md">
                {loading ?
                    (
                        <React.Fragment>
                            <ActivityIndicator size="large" className="text-slate-800" />
                        </React.Fragment>
                    ) :
                    (
                        <React.Fragment>
                            <Text className="w-4/5 self-center text-2xl text-center font-bold text-slate-800">
                                Are you sure you want to log out?
                            </Text>

                            <View className="w-full flex-row items-center gap-2">
                                <TouchableOpacity onPress={handleCancel} className="items-center border border-red-600 rounded flex-1">
                                    <Text className="py-2 capitalize text-red-600">cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleAccept} className="items-center border border-green-600 rounded flex-1">
                                    <Text className="py-2 capitalize text-green-600">sure!</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>
                    )
                }
            </Animated.View>
        </BlurView>
    );
}