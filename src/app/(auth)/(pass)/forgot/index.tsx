import React from "react";
import { router } from "expo-router";
import { Header } from "../../_layout/header";
import { Formik, FormikHelpers } from "formik";
import Entypo from "@expo/vector-icons/Entypo";
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

type Submit<T> = (values: T, helpers: FormikHelpers<T>) => void;

export default function () {
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState({
    confirm: false,
    password: false,
  });

  const initialValues = { email: "" };

  const onSubmit: Submit<typeof initialValues> = async (values, helpers) => {
    console.log(values);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    router.replace("/verify");
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, setFieldValue, handleSubmit }) => (
        <View className="flex-1 gap-20 justify-center bg-gray-300">
          <Header
            title="Hello there"
            description="We are excited to see you here"
          />

          <View className="gap-4 justify-center">
            <View className="bg-white flex-row items-center bg-gray-100 shadow-sm rounded-md gap-4 px-3">
              <Entypo name="email" size={16} />
              <TextInput
                value={values.email}
                className="h-14 grow"
                keyboardType="email-address"
                placeholder="Enter your email for verification"
                onChangeText={(value) => setFieldValue("email", value)}
              />
            </View>
          </View>

          <View className="gap-6">
            <TouchableOpacity
              disabled={loading}
              onPress={() => handleSubmit()}
              className="h-14 shadow rounded-xl bg-blue-600 items-center justify-center disabled:opacity-30 disabled:bg-gray-400"
            >
              {loading ? (
                <ActivityIndicator className="text-white" />
              ) : (
                <Text className="font-bold text-lg text-center text-white">
                  send OTP
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
}
