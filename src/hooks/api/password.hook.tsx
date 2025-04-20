import api from "@/src/utils/request";
import { useMutation } from "react-query";


export const usePasswordReset = () =>
  useMutation({
    mutationKey: ["reset-password"],
    async mutationFn(data: object) {
      const res = await api.post("/auth/password/reset/", data);
      return res.data;
    },
  });

export const usePasswordChange = () =>
  useMutation({
    mutationKey: ["change-password"],
    async mutationFn(data: object) {
      const res = await api.post("/auth/password/change/", data);
      return res.data;
    },
  });

export const usePasswordForogot = () =>
  useMutation({
    mutationKey: ["forgot-password"],
    async mutationFn(data: object) {
      const res = await api.post("/auth/password/forgot/", data);
      return res.data;
    },
  });
