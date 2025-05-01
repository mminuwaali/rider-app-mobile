import React from "react";
import { Text, View } from "react-native";

interface IHeaderPorps {
  title: string;
  description: string;
}

export default React.Fragment;
export function Header(properties: IHeaderPorps) {
  return (
    <View className="mt-6">
      <Text className="text-4xl font-bold">{properties.title}</Text>
      <Text className="font-inter">{properties.description}</Text>
    </View>
  );
}
