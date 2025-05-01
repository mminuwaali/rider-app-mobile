import { View } from "react-native";
import { Header } from "./_sections/header";
import { Search } from "./_sections/search";
import { Request } from "./_sections/request";
import { Journey } from "./_sections/journey";

export default function () {
    return <View className="flex-1 gaap-4 pointer-events-box-none">
        <Header />
        <Journey />
        <Search />
        <Request />
    </View>
}