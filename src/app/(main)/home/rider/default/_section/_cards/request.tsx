import { Dimensions, View } from "react-native"

export function RequestCard() {
    const width = Dimensions.get("screen").width * .9;

    return (
        <View style={{ width }} className='h-40 rounded-xl bg-white'></View>
    );
}