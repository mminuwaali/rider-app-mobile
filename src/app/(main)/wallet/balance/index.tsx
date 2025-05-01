import { Amount } from "./_sections/amount";
import { Button } from "./_sections/button";
import Animated from "react-native-reanimated";
import { Overview } from "./_sections/overview";
import { Transaction } from "./_sections/transaction";

export default function () {
    return (
        <Animated.View className="flex-1 gap-14">
            <Amount />
            <Button />
            <Overview />
            <Transaction />
        </Animated.View>
    );
}