import React from "react";
import { Header } from "../../_layout/header";
import {
  View,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";

const OTP_LENGTH = 4;

export default function OTPInputScreen() {
  const [otp, setOtp] = React.useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = React.useRef<Array<TextInput | null>>([]);

  const handleInputChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move to the next input
      if (index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        Keyboard.dismiss();
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index]) {
      const newOtp = [...otp];
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    console.log("Entered OTP:", otpValue);
    // Add your OTP submission logic here
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <Header
        title="Verify OTP"
        description="Please enter the code sent to your email"
      />

      {/* OTP Inputs */}
      <View className="flex-1 justify-center px-6">
        <View className="flex-row justify-center mb-8 gap-4">
          {Array(OTP_LENGTH)
            .fill("")
            .map((_, index) => (
              <TextInput
                key={index}
                className="w-12 h-12 text-center text-xl bg-white rounded-full shadow border border-gray-300"
                value={otp[index]}
                keyboardType="numeric"
                maxLength={1}
                ref={(ref) => (inputRefs.current[index] = ref)}
                onChangeText={(text) => handleInputChange(text, index)}
                onKeyPress={({ nativeEvent: { key } }) =>
                  handleKeyPress(key, index)
                }
              />
            ))}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="h-14 shadow rounded-full bg-blue-600 items-center justify-center"
        >
          <Text className="font-bold text-lg text-center text-white">
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
