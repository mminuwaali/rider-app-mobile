import api from "@/utils/request";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetAddresses = () => {
    return useQuery({
        queryKey: ["get-address"],
        async queryFn() {
            const res = await api.get("/auth/address/");
            return res.data as IAddress[];
        }
    })
}

export const useCreateAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["create-new-address"],
        async mutationFn(data: object) {
            const res = await api.post("/auth/address/", data);
            return res.data as IAddress;
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["get-address"] });
        }
    });
};
