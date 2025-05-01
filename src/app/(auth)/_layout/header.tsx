import React from "react";
import { Text, View } from "react-native";

interface IHeaderPorps {
  title: string;
  description: string;
}

export default React.Fragment;
export function Header(properties: IHeaderPorps) {
  return (
    <View>
      <Text className="text-5xl">{properties.title}</Text>
      <Text className="text-lg font-inter">{properties.description}</Text>
    </View>
  );
}
