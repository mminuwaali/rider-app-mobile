import api from "@/utils/request";
import { TokenManager } from "@/utils/token";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "@/components/providers/auth.provider";

export const useSignout = () => {
  const { setUser } = useAuthContext();

  return async () => {
    setUser(undefined);

    await TokenManager.clearTokens();
    await AsyncStorage.removeItem("user");
  };
};

export const useSignin = () => {
  return useMutation({
    mutationKey: ["sign-in"],
    async mutationFn(data: Pick<IUser, "username" | "password">) {
      const res = await api.post("/auth/signin/", data);
      return res.data as Record<"access" | "refresh", string>;
    },
    onSuccess(data) {
      TokenManager.setTokens(data.access, data.refresh);
    },
  });
}

export const useSignup = () => {
  return useMutation({
    mutationKey: ["sign-up"],
    async mutationFn(data: Partial<IUser>) {
      const res = await api.post("/auth/signup/", data);
      return res.data as void;
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationKey: ["refresh-token"],
    async mutationFn() {
      const res = await api.post("/auth/refresh/");
      return res.data;
    },
  });
}


export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["change-password"],
    async mutationFn(data: object) {
      const res = await api.post("/auth/change-password/", data);
      return res.data as void;
    },
  });
};