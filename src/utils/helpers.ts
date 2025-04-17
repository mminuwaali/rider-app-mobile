import { Dimensions } from "react-native";

export function formatCurrency(num: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(num);
}

export function calculateWidth(percentage: number) {
  if (percentage < 0 || percentage > 100)
    throw new Error("Percentage must be between 0 and 100");

  return (Dimensions.get("window").width * percentage) / 100;
}

export function calculateHeight(percentage: number) {
  if (percentage < 0 || percentage > 100)
    throw new Error("Percentage must be between 0 and 100");

  return (Dimensions.get("window").height * percentage) / 100;
}
