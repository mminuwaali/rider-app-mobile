import React from "react";
import { router } from "expo-router";
import { Header } from "../_layout/header";
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

  const initialValues = { email: "", username: "", password: "", confirm: "", role: "" };

  const roles = [
    { label: "Rider", value: "rider" },
    { label: "Client", value: "client" },
  ];

  const onSubmit: Submit<typeof initialValues> = async (values, helpers) => {
    console.log(values);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    router.replace("/sign-in");
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, setFieldValue, handleSubmit }) => (
        <View className="flex-1 gap-20">
          <Header
            title="Hello there"
            description="We are excited to see you here"
          />

          <View className="gap-4">
            <View className="flex-row justify-center mb-4 gap-4">
              {roles.map((role) => (
                <TouchableOpacity
                  key={role.value}
                  className={`flex-row items-center justify-center px-4 py-2 rounded-full h-10 border flex-1 ${
                    values.role === role.value
                      ? "border-slate-600 bg-slate-600"
                      : "border-gray"
                  }`}
                  onPress={() => setFieldValue("role", role.value)}
                >
                  <Text
                    className={`text-center ${
                      values.role === role.value ? "text-white" : "text-black"
                    }`}
                  >
                    {role.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

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
              <Entypo name="tag" size={16} />
              <TextInput
                className="h-14 grow"
                keyboardType="default"
                value={values.username}
                placeholder="Enter your username"
                onChangeText={(value) => setFieldValue("username", value)}
              />
            </View>

            <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
              <Entypo name="lock" size={16} />
              <TextInput
                secureTextEntry
                className="h-14 grow"
                value={values.password}
                placeholder="Enter your password"
                onChangeText={(value) => setFieldValue("password", value)}
                keyboardType={visible.password ? "visible-password" : "default"}
              />

              <Entypo
                size={16}
                name={visible.password ? "eye-with-line" : "eye"}
                onPress={() =>
                  setVisible((prev) => ({ ...prev, password: !prev.password }))
                }
              />
            </View>

            <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
              <Entypo name="lock" size={16} />
              <TextInput
                secureTextEntry
                className="h-14 grow"
                value={values.confirm}
                placeholder="Confirm your password"
                onChangeText={(value) => setFieldValue("confirm", value)}
                keyboardType={visible.confirm ? "visible-password" : "default"}
              />

              <Entypo
                size={16}
                name={visible.confirm ? "eye-with-line" : "eye"}
                onPress={() =>
                  setVisible((prev) => ({ ...prev, confirm: !prev.confirm }))
                }
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
