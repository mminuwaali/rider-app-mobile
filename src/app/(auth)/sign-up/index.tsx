import React from "react";
import { router } from "expo-router";
import { Header } from "../_layout/header";
import { Formik, FormikHelpers } from "formik";
import Entypo from "@expo/vector-icons/Entypo";
import { signupSchema } from "@/constants/schema";
import { useSignup } from "./_sections/_hooks/signup.hook";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

type Submit<T> = (values: T, helpers: FormikHelpers<T>) => void;

export default function () {
  const signupMutation = useSignup();

  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState({ confirm: false, password: false });

  const roles = [
    { label: "Rider", value: "rider" },
    { label: "Client", value: "client" },
  ];

  const initialValues = {
    email: "",
    confirm: "",
    username: "",
    password: "",
    role: "" as IUser['role'],
  };

  const onSubmit: Submit<typeof initialValues> = async (values, helpers) => {
    signupMutation.mutate(values, {
      onSuccess() {

      }
    })
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={signupSchema}
    >
      {(props) => (
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
                  className={`flex-row items-center justify-center px-4 py-2 rounded-full h-10 border flex-1 ${props.values.role === role.value
                    ? "border-slate-600 bg-slate-600"
                    : "border-gray"
                    }`}
                  onPress={() => props.setFieldValue("role", role.value)}
                >
                  <Text
                    className={`text-center ${props.values.role === role.value ? "text-white" : "text-black"
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
                value={props.values.email}
                className="h-14 grow"
                keyboardType="email-address"
                placeholder="Enter your email"
                onChangeText={(value) => !signupMutation.isPending && props.setFieldValue("email", value)}
              />
            </View>

            <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
              <Entypo name="tag" size={16} />
              <TextInput
                className="h-14 grow"
                keyboardType="default"
                value={props.values.username}
                placeholder="Enter your username"
                onChangeText={(value) => !signupMutation.isPending && props.setFieldValue("username", value)}
              />
            </View>

            <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
              <Entypo name="lock" size={16} />
              <TextInput
                secureTextEntry
                className="h-14 grow"
                value={props.values.password}
                placeholder="Enter your password"
                keyboardType={visible.password ? "visible-password" : "default"}
                onChangeText={(value) => !signupMutation.isPending && props.setFieldValue("password", value)}
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
                value={props.values.confirm}
                placeholder="Confirm your password"
                keyboardType={visible.confirm ? "visible-password" : "default"}
                onChangeText={(value) => !signupMutation.isPending && props.setFieldValue("confirm", value)}
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
              disabled={signupMutation.isPending}
              onPress={() => props.handleSubmit()}
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
