import api from "@/src/utils/request";
import { useQuery, useMutation } from "react-query";

export const useSignout = () => {
  return () => {};
};

export const useGetWalletBalance = () =>
  useQuery({
    queryKey: ["wallet-balance"],
    async queryFn() {
      const res = await api.get("/wallet/");
      return res.data as IWallet;
    },
  });

export const useWithdrawAmount = () =>
  useMutation({
    mutationKey: ["withdraw-amount"],
    async mutationFn(data: Partial<IWallet>) {
      const res = await api.post("/wallet/withdraw/", data);
      return res.data as IWallet;
    },
  });

export const useVerifyTransaction = () =>
  useMutation({
    mutationKey: ["verify-transaction"],
    async mutationFn(data: Partial<IWallet>) {
      const res = await api.post("/wallet/verify/", data);
      return res.data as IWallet;
    },
  });
