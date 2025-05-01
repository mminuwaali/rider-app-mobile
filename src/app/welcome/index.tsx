import React from "react";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { slides } from "@/constants/data";
import { Text, View, } from "react-native";
import Animated from "react-native-reanimated";
import { Slider } from "./_sections.tsx/slider";
import { Platform, BackHandler, TouchableOpacity } from "react-native";

export default function () {
  const [index, setIndex] = React.useState(0);
  const swiperRef = React.useRef<Swiper>(null);

  React.useEffect(() => {
    function closeAppOnBackButton() {
      if (Platform.OS === "android") {
        BackHandler.exitApp();
        return true;
      }
      return false;
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      closeAppOnBackButton
    );

    // Clean up the event listener when component unmounts
    return () => backHandler.remove();
  }, []);

  const handleSkip = () => {
    router.replace("/sign-in");
  };

  const handleNext = () => {
    if (index + 1 < slides.length) return setIndex(index + 1);
    handleSkip();
  };

  return (
    <Animated.View className="flex-1 gap-4 bg-white">
      <TouchableOpacity
        onPress={handleSkip}
        className="absolute top-12 right-6 z-10"
      >
        <Text className="text-accent text-base font-medium">Skip</Text>
      </TouchableOpacity>

      <Swiper
        loop={false}
        index={index}
        ref={swiperRef}
        paginationStyle={{ bottom: 20 }}
        onIndexChanged={(index) => setIndex(index)}
        dot={<View className="bg-gray-300 w-2 h-2 rounded-full mx-1" />}
        activeDot={<View className="bg-slate-700 w-3 h-3 rounded-full mx-1" />}
      >
        {slides.map((slide, index) => (
          <Slider {...slide} key={index} />
        ))}
      </Swiper>

      <View className="px-10% pb-10">
        <TouchableOpacity
          onPress={handleNext}
          className="bg-cyan-600 py-4 rounded-lg items-center"
        >
          <Text className="text-white font-semibold text-lg">
            {index === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
