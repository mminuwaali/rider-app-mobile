import api from "@/utils/request";
import { TokenManager } from "@/utils/token";
import { useMutation } from "@tanstack/react-query";

export interface ISigninPayload {
    username: string;
    password: string;
}
export interface ISigninResponse {
    access: string;
    refresh: string;
}

export const useSignIn = () =>
    useMutation({
        mutationKey: ["sign-in"],
        async mutationFn(data: ISigninPayload) {
            const res = await api.post("/auth/signin/", data);
            return res.data as ISigninResponse;
        },
        onSuccess(data) {
            TokenManager.setTokens(data.access, data.refresh)
        },
    })