import React from "react";
import { Formik } from "formik";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import { View, Text, TextInput } from "react-native";
import { changePasswordSchema } from "@/constants/schema";
import { useChangePassword } from "@/hooks/api/auth.hook";
import { TouchableOpacity, ActivityIndicator } from "react-native";


export default function () {
  const passwordMutation = useChangePassword();

  const [visible, setVisible] = React.useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });

  const initialValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  }

  const onSumit = (values: typeof initialValues) => {
    passwordMutation.mutate(values, {
      onSuccess() {
        alert("Password updated successfully!");
        router.canGoBack() ? router.back() : router.replace("/profile/default");
      }
    })
  };

  return (
    <Formik
      onSubmit={onSumit}
      initialValues={initialValues}
      validationSchema={changePasswordSchema}
    >
      {({ values, setFieldValue, handleSubmit, touched, errors }) => (
        <View className="flex-1 gap-20">
          <View className="">
            <Text className="text-xl font-bold text-center mb-4">
              Change Your Password
            </Text>
            <Text className="text-sm text-gray-600 text-center mb-6">
              For your security:
              {"\n"}- Your password must be at least 8 characters long.
              {"\n"}- Include uppercase, lowercase, and special characters.
              {"\n"}- Avoid using dictionary words or your personal information.
            </Text>
          </View>

          <View className="gap-4">
            <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
              <Entypo name="lock" size={16} />
              <TextInput
                secureTextEntry={!visible.old_password}
                className="h-14 grow"
                placeholder="Enter your old password"
                value={values.old_password}
                onChangeText={(value) => setFieldValue("old_password", value)}
                keyboardType={visible.old_password ? "visible-password" : "default"}
              />
              <Entypo
                size={16}
                name={visible.old_password ? "eye-with-line" : "eye"}
                onPress={() =>
                  setVisible((prev) => ({
                    ...prev,
                    old_password: !prev.old_password,
                  }))
                }
              />
            </View>
            {touched.old_password && errors.old_password && (
              <Text className="text-red-500 text-sm">{errors.old_password}</Text>
            )}

            <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
              <Entypo name="lock" size={16} />
              <TextInput
                secureTextEntry={!visible.new_password}
                className="h-14 grow"
                placeholder="Enter your new password"
                value={values.new_password}
                onChangeText={(value) => setFieldValue("new_password", value)}
                keyboardType={visible.new_password ? "visible-password" : "default"}
              />
              <Entypo
                size={16}
                name={visible.new_password ? "eye-with-line" : "eye"}
                onPress={() =>
                  setVisible((prev) => ({
                    ...prev,
                    new_password: !prev.new_password,
                  }))
                }
              />
            </View>
            {touched.new_password && errors.new_password && (
              <Text className="text-red-500 text-sm">{errors.new_password}</Text>
            )}

            <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
              <Entypo name="lock" size={16} />
              <TextInput
                secureTextEntry={!visible.confirm_password}
                className="h-14 grow"
                placeholder="Confirm your new password"
                value={values.confirm_password}
                onChangeText={(value) =>
                  setFieldValue("confirm_password", value)
                }
                keyboardType={
                  visible.confirm_password ? "visible-password" : "default"
                }
              />
              <Entypo
                size={16}
                name={visible.confirm_password ? "eye-with-line" : "eye"}
                onPress={() =>
                  setVisible((prev) => ({
                    ...prev,
                    confirm_password: !prev.confirm_password,
                  }))
                }
              />
            </View>
            {touched.confirm_password && errors.confirm_password && (
              <Text className="text-red-500 text-sm">{errors.confirm_password}</Text>
            )}
          </View>

          <View className="gap-6">
            <TouchableOpacity
              disabled={passwordMutation.isPending}
              onPress={() => handleSubmit()}
              className="h-14 shadow rounded-xl bg-blue-600 items-center justify-center disabled:opacity-30 disabled:bg-gray-400"
            >
              {passwordMutation.isPending ? (
                <ActivityIndicator className="text-white" />
              ) : (
                <Text className="font-bold text-lg text-center text-white">
                  Update Password
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
}
