import { Link } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import Animated from "react-native-reanimated";
import { FadeInDown } from "react-native-reanimated";
import { Text, TouchableOpacity } from "react-native";

export function Button() {
    return <Animated.View entering={FadeInDown.delay(300)} className="gap-6 px-5%">
        <Link asChild href="/">
            <TouchableOpacity className="flex-row items-center justify-between">
                <Text className="text-gray-500 capitalize text-xl font-inter">
                    edit profile
                </Text>
                <Entypo name="chevron-small-right" size={20} color="black" />
            </TouchableOpacity>
        </Link>

        <Link asChild href="/">
            <TouchableOpacity className="flex-row items-center justify-between">
                <Text className="text-gray-500 capitalize text-xl font-inter">
                    discount voucher
                </Text>
                <Entypo name="chevron-small-right" size={20} color="black" />
            </TouchableOpacity>
        </Link>

        <Link asChild href="/">
            <TouchableOpacity className="flex-row items-center justify-between">
                <Text className="text-red-500 capitalize text-xl font-inter">
                    log out
                </Text>
                <Entypo name="chevron-small-right" size={20} color="red" />
            </TouchableOpacity>
        </Link>

    </Animated.View>
}