import api from "@/utils/request";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface IWalletResponse extends IWallet { }
export interface ITransactionResponse extends ITransaction { }
export interface IVerifyTransaction {
  message: string;
  transaction_id: string;
  transaction_status: string;
}

export const useGetBalance = () =>
  useQuery({
    queryKey: ["wallet-balance"],
    async queryFn() {
      const res = await api.get("/wallet/");
      return res.data as IWalletResponse;
    }
  })


export const useGetTransactions = () =>
  useQuery({
    queryKey: ["get-transactions"],
    async queryFn() {
      const res = await api.get("/wallet/transaction/");
      return res.data as IResponsePage<ITransactionResponse[]>;
    }
  })

export const useGetTransactionStats = () =>
  useQuery({
    queryKey: ["get-transaction-stats"],
    async queryFn() {
      const res = await api.get("/wallet/transaction/transaction-stats/");
      return res.data as { year: number; month: number; total_amount: number }[];
    }
  })

export const useAuthorizeTransaction = () =>
  useMutation({
    mutationKey: ["authorize-transaction"],
    async mutationFn(data: { amount: string }) {
      const res = await api.post(`/wallet/initialize-payment/`, data);
      return res.data as { authorization_url: string };
    }
  })


export const useVerifyTransaction = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["verify-transaction"],
    async mutationFn(reference: string) {
      const res = await api.post(`/wallet/verify/`, { reference });
      return res.data as IVerifyTransaction;
    },
    onSuccess() {
      client.invalidateQueries({ queryKey: ["wallet-balance", "get-transactions"] });
    }
  })
}