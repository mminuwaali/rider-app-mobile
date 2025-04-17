import { Button } from "./_sections/button";
import Animated from "react-native-reanimated";
import { Overview } from "./_sections/overview";
import { Transaction } from "./_sections/transaction";
import { Balance } from "../_layout/_sections/balance";

export default function () {
  return (
    <Animated.View className="flex-1 p-5% gap-14">
      <Balance />
      <Button />
      <Overview />
      <Transaction />
    </Animated.View>
  );
}
