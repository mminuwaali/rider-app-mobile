import React from "react";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";
import { Modal, BackHandler } from "react-native";
import { FadeInDown } from "react-native-reanimated";
import { useRouter, useSegments, Slot, Stack } from "expo-router";

export default function () {
  const router = useRouter();
  const segments = useSegments();

  React.useEffect(() => {
    const handleBackPress = () => {
      router.back();
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => backHandler.remove();
  }, [router]);

  const isModalVisible = segments.some((segment) => segment.includes("pass"));

  return <Modal visible={isModalVisible} onRequestClose={router.back}>
    <Animated.View entering={FadeInDown} className="p-10%">
    <Slot />
    </Animated.View>
  </Modal>
  // return (
  //   <Modal visible={isModalVisible} onRequestClose={router.back}>
  //     <Animated.View className="bg-black p-10%">

  //       {/* <BlurView tint="dark" intensity={500} className="px-5% py-20% flex-1 bg-black/80"> */}
  //       <Animated.View entering={FadeInDown} className="p-10% flex-1 shadow rounded-md bg-white">
  //         <Slot />
  //       </Animated.View>
  //       {/* </BlurView> */}
  //     </Animated.View>
  //   </Modal>
  // );
}
