import { View } from "react-native";
import { Address } from "./_sections/address";
import { CreateButton } from "./_sections/create";

export default function () {
    return (
        <View className="flex-1 gap-10">
            <CreateButton />
            <Address />
        </View>
    );
}