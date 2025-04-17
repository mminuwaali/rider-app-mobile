import api from "@/src/utils/request";
import { useMutation } from "react-query";

export const useSignout = () => {
  return () => {};
};

export const useSignin = useMutation({
  mutationKey: ["sign-in"],
  async mutationFn(data: object) {
    const res = await api.post("/auth/signin/", data);
    return res.data;
  },
});

export const useSignup = useMutation({
  mutationKey: ["sign-up"],
  async mutationFn(data: object) {
    const res = await api.post("/auth/signup/", data);
    return res.data;
  },
});

export const usePasswordReset = useMutation({
  mutationKey: ["reset-password"],
  async mutationFn(data: object) {
    const res = await api.post("/auth/password/reset/", data);
    return res.data;
  },
});

export const usePasswordChange = useMutation({
  mutationKey: ["change-password"],
  async mutationFn(data: object) {
    const res = await api.post("/auth/password/change/", data);
    return res.data;
  },
});

export const usePasswordForogot = useMutation({
  mutationKey: ["forgot-password"],
  async mutationFn(data: object) {
    const res = await api.post("/auth/password/forgot/", data);
    return res.data;
  },
});
