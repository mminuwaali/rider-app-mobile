import api from "@/utils/request";
import { useQuery } from "@tanstack/react-query";

export interface IWalletResponse extends IWallet { }

export const useGetBalance = () =>
  useQuery({
    queryKey: ["wallet-balance"],
    async queryFn() {
      const res = await api.get("/wallet/");
      return res.data as IWalletResponse;
    }
  })