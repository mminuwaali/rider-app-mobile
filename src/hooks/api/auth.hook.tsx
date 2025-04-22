import api from "@/utils/request";
import { TokenManager } from "@/utils/token";
import { useMutation } from "@tanstack/react-query";

export const useSignout = () => {
  return () => {};
};

export const useSignin = () =>
  useMutation({
    mutationKey: ["sign-in"],
    async mutationFn(data: object) {
      const res = await api.post("/auth/signin/", data);
      return res.data as Record<"access" | "refresh", string>;
    },
    onSuccess(data) {
      TokenManager.setTokens(data.access, data.refresh);
    },
  });

export const useSignup = () =>
  useMutation({
    mutationKey: ["sign-up"],
    async mutationFn(data: object) {
      const res = await api.post("/auth/signup/", data);
      return res.data;
    },
  });

export const useRefreshToken = () =>
  useMutation({
    mutationKey: ["refresh-token"],
    async mutationFn() {
      const res = await api.post("/auth/refresh/");
      return res.data;
    },
  });
