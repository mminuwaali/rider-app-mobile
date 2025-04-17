import React from "react";
import { Header } from "../_layout/header";
import { Link, router } from "expo-router";
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
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const initiaValues = { email: "", password: "" };
  const onSubmit: Submit<typeof initiaValues> = async (values, helpers) => {
    console.log(values);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    router.replace("/home/client/default");
  };

  return (
    <Formik initialValues={initiaValues} onSubmit={onSubmit}>
      {({ values, setFieldValue, handleSubmit }) => (
        <View className="flex-1 gap-20">
          <Header title="welcome back" description="Good to see you again" />

          <View className="gap-4">
            <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
              <Entypo name="email" size={16} />
              <TextInput
                value={values.email}
                className="h-14 grow"
                keyboardType="email-address"
                placeholder="Enter your email"
                onChangeText={(value) => setFieldValue("email", value)}
              />
            </View>

            <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
              <Entypo name="lock" size={16} />
              <TextInput
                secureTextEntry
                className="h-14 grow"
                value={values.password}
                placeholder="Enter your password"
                keyboardType={visible ? "visible-password" : "default"}
                onChangeText={(value) => setFieldValue("password", value)}
              />

              <Entypo
                size={16}
                onPress={() => setVisible(!visible)}
                name={visible ? "eye-with-line" : "eye"}
              />
            </View>
            
            {/* Add Forgot Password Link */}
            {/* <View className="items-end">
              <Link href="/forgot" asChild>
                <TouchableOpacity>
                  <Text className="text-blue-600 font-medium">Forgot Password?</Text>
                </TouchableOpacity>
              </Link>
            </View> */}
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
                  continue
                </Text>
              )}
            </TouchableOpacity>

            <View className="flex-row items-center gap-2">
              <View className="flex-1 h-0.5 rounded-full bg-gray-400" />
              <Text className="font-bold text-gray-600">Or continue with</Text>
              <View className="flex-1 h-0.5 rounded-full bg-gray-400" />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}