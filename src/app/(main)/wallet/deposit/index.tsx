import React from "react";
import { router } from "expo-router";
import { Header } from "../_layout/header";
import { Figure } from "../_layout/figure";
import Animated from "react-native-reanimated";
import { usePaystack } from "react-native-paystack-webview";
import { Modal, Text, TouchableOpacity } from "react-native";
import { useAuthContext } from "@/components/providers/auth.provider";
import { useAuthorizeTransaction } from "@/hooks/api/wallet.hook";

export default function () {
    const { popup } = usePaystack();
    const { user } = useAuthContext();
    const [amount, setAmount] = React.useState("0");
    const [visible, setVisible] = React.useState(false);

    const authrizationMutation = useAuthorizeTransaction();

    const handleSetAmount = (val: string) => {
        const formatedValue = val.replace(/[^0-9]/g, "");
        setAmount(Number(formatedValue).toString());
    };

    const initiatePayment = () => {
        authrizationMutation.mutate({ amount }, {
            onSuccess(data) {
                router.push({ pathname: "/payment", params: { url: data.authorization_url } })
            }
        })
        // setVisible(true);
        // if (user) popup.newTransaction({
        //     amount: +amount,
        //     email: user.email,
        //     onCancel() {
        //         console.error("payment canceled");
        //     },
        //     onSuccess(data) {
        //         console.log("payment success", data);
        //     },
        // })
    };

    return (
        <>
            <Animated.View className="pb-25% flex-1 gap-14">
                <Header title="Fund your account" description="Deposit an amount into your account" />
                <Figure value={amount} setValue={handleSetAmount} />

                <TouchableOpacity
                    onPress={initiatePayment}
                    disabled={amount === "0"}
                    className="w-full h-14 mt-auto rounded-md items-center justify-center bg-blue-600 disabled:bg-gray-300 disabled:opacity-30 transition-all"
                >
                    <Text className="text-white font-bold">continue</Text>
                </TouchableOpacity>
            </Animated.View>
        </>
    );
}