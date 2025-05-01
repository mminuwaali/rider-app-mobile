import React from "react";
import { router } from "expo-router";
import { Formik, FormikHelpers } from "formik";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import { Text, View, Image, TextInput } from "react-native";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { useAuthContext } from "@/components/providers/auth.provider";
import { useGetProfile, useUpdateProfile } from "@/hooks/api/profile.hook";

type Submit<T> = (values: T, helpers: FormikHelpers<T>) => void;

export default function () {
  const { user } = useAuthContext();
  const profileQuery = useGetProfile();
  const profileMutation = useUpdateProfile();

  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const initialValues = user!;

  const onSubmit: Submit<typeof initialValues> = async (values, helpers) => {
    profileMutation.mutate(values, {
      onSuccess() {
        profileQuery.refetch();
        router.canGoBack() ? router.back() : router.replace("/profile/default");
      }
    })
  };

  const pickImage = async (
    setFieldValue: (field: string, value: any) => void
  ) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], //ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri; // Access the uri of the first asset
      setFieldValue("profileImage", uri); // Set the uri as the profileImage
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, setFieldValue, handleSubmit }) => (
        <View className="flex-1 gap-20">
          {/* Image Upload Section */}
          <View className="gap-4">
            {values?.profile ? (
              <Image
                source={{ uri: values.profile }}
                className="w-32 h-32 rounded-full self-center"
              />
            ) : (
              <TouchableOpacity
                className="h-32 w-32 rounded-full border-dashed border-2 border-gray-400 items-center justify-center self-center"
                onPress={() => pickImage(setFieldValue)}
              >
                <Text className="text-gray-500">Upload Image</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              className="self-center mt-2"
              onPress={() => pickImage(setFieldValue)}
            >
              <Text className="text-blue-600">Change Image</Text>
            </TouchableOpacity>
          </View>

          {/* Input Fields */}
          <View className="gap-4">
            <View className="flex-row justify-center mb-4 gap-4">
              {genders.map((gender) => (
                <TouchableOpacity
                  key={gender.value}
                  className={`flex-row items-center justify-center px-4 py-2 rounded-full h-10 border flex-1 ${values.gender === gender.value
                    ? "border-slate-600 bg-slate-600"
                    : "border-gray"
                    }`}
                  onPress={() => setFieldValue("gender", gender.value)}
                >
                  <Text
                    className={`text-center ${values.gender === gender.value ? "text-white" : "text-black"
                      }`}
                  >
                    {gender.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
              <Entypo name="user" size={16} />
              <TextInput
                value={values.first_name}
                className="h-14 grow"
                keyboardType="default"
                placeholder="Enter your first name"
                onChangeText={(value) => setFieldValue("first_name", value)}
              />
            </View>

            <View className="bg-white flex-row items-center shadow-sm rounded-md gap-4 px-3">
              <Entypo name="user" size={16} />
              <TextInput
                value={values.last_name}
                className="h-14 grow"
                keyboardType="default"
                placeholder="Enter your last name"
                onChangeText={(value) => setFieldValue("last_name", value)}
              />
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
          </View>

          {/* Submit Button */}
          <View className="gap-6">
            <TouchableOpacity
              disabled={profileMutation.isPending}
              onPress={() => handleSubmit()}
              className="h-14 shadow rounded-xl bg-blue-600 items-center justify-center disabled:opacity-30 disabled:bg-gray-400"
            >
              {profileMutation.isPending ? (
                <ActivityIndicator className="text-white" />
              ) : (
                <Text className="font-bold text-lg text-center text-white">
                  Continue
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
}
