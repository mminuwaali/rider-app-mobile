import api from "@/utils/request";
import { useMutation } from "@tanstack/react-query";

export interface ISignupPayload extends Partial<IUser> { }

export interface ISignupResponse extends IUser { }

export const useSignup = () =>
    useMutation({
        mutationKey: ["sign-up"],
        async mutationFn(data: ISignupPayload) {
            const res = await api.post("/auth/signup/", data);
            return res.data as ISignupResponse;
        }
    })