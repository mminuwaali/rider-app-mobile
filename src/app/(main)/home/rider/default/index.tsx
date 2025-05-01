import { View } from "react-native";
import { Header } from "./_section/header";
import { Journey } from "./_section/journey";

export default function () {
    return (
        <View className="flex-1">
            <Header />
            <Journey />
        </View>
    );
}