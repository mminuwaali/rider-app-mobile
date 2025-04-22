import React from "react";
import { router } from "expo-router";
import { Header } from "../_layout/header";
import Entypo from "@expo/vector-icons/Entypo";
import { Formik, FormikHelpers } from "formik";
import { signinSchema } from "@/constants/schema";
import { useSignIn } from "./_sections/_hooks/signin.hook";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useGetProfile } from "@/hooks/api/profile.hook";

type Submit<T> = (values: T, helpers: FormikHelpers<T>) => void;

export default function () {
  const signinMutation = useSignIn();
  const profileQuery = useGetProfile();

  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const initiaValues = { username: "", password: "" };

  const onSubmit: Submit<typeof initiaValues> = async (values, helpers) => {
    console.log(values, " ");

    signinMutation.mutate(values, {
      onSuccess() {
        profileQuery.refetch();
      }
    })
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initiaValues}
      validationSchema={signinSchema}
    >
      {(props) => (
        <View className="flex-1 gap-20">
          {console.log(props.errors) ?? null}
          <Header title="welcome back" description="Good to see you again" />

          <View className="gap-4">
            <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
              <Entypo name="user" size={16} />
              <TextInput
                className="h-14 grow"
                keyboardType="ascii-capable"
                value={props.values.username}
                placeholder="Enter your username"
                onChangeText={(value) => !signinMutation.isPending && props.setFieldValue("username", value)}
              />
            </View>

            <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
              <Entypo name="lock" size={16} />
              <TextInput
                secureTextEntry
                className="h-14 grow"
                value={props.values.password}
                placeholder="Enter your password"
                keyboardType={visible ? "visible-password" : "default"}
                onChangeText={(value) => !signinMutation.isPending && props.setFieldValue("password", value)}
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
              disabled={signinMutation.isPending}
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