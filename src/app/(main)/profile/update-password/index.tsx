import React from "react";
import * as Yup from "yup";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Formik, FormikHelpers } from "formik";

type PasswordChangeValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const passwordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required."),
  newPassword: Yup.string().required("New password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match.")
    .required("Please confirm your new password."),
});

export default function ChangePasswordScreen() {
  const [loading, setLoading] = React.useState(false);

  const handlePasswordChange = async (
    values: PasswordChangeValues,
    helpers: FormikHelpers<PasswordChangeValues>
  ) => {
    setLoading(true);
    console.log(values);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    helpers.resetForm();
    alert("Password updated successfully!");
  };

  return (
    <View className="gap-20 flex-1">
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

      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={passwordValidationSchema}
        onSubmit={handlePasswordChange}
      >
        {(props) => (
          <View className="gap-4">
            <View>
              <Text className="text-gray-800 font-medium mb-1">
                Old Password
              </Text>
              <TextInput
                secureTextEntry
                placeholder="Enter your old password"
                value={props.values.oldPassword}
                onChangeText={props.handleChange("oldPassword")}
                onBlur={() => props.setFieldTouched("oldPassword")}
                className="h-12 px-4 bg-white rounded-md shadow-md"
              />
              {props.touched.oldPassword && props.errors.oldPassword && (
                <Text className="text-red-500 text-sm">
                  {props.errors.oldPassword}
                </Text>
              )}
            </View>

            <View>
              <Text className="text-gray-800 font-medium mb-1">
                New Password
              </Text>
              <TextInput
                secureTextEntry
                placeholder="Enter your new password"
                value={props.values.newPassword}
                onChangeText={props.handleChange("newPassword")}
                onBlur={() => props.setFieldTouched("newPassword")}
                className="h-12 px-4 bg-white rounded-md shadow-md"
              />
              {props.touched.newPassword && props.errors.newPassword && (
                <Text className="text-red-500 text-sm">
                  {props.errors.newPassword}
                </Text>
              )}
            </View>

            <View>
              <Text className="text-gray-800 font-medium mb-1">
                Confirm Password
              </Text>
              <TextInput
                secureTextEntry
                placeholder="Confirm your new password"
                value={props.values.confirmPassword}
                onChangeText={props.handleChange("confirmPassword")}
                onBlur={() => props.setFieldTouched("confirmPassword")}
                className="h-12 px-4 bg-white rounded-md shadow-md"
              />
              {props.touched.confirmPassword &&
                props.errors.confirmPassword && (
                  <Text className="text-red-500 text-sm">
                    {props.errors.confirmPassword}
                  </Text>
                )}
            </View>

            <TouchableOpacity
              disabled={loading}
              onPress={() => props.handleSubmit()}
              className={`h-12 rounded-md bg-blue-600 justify-center items-center ${
                loading ? "opacity-50" : ""
              }`}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-bold text-lg">
                  Update Password
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
