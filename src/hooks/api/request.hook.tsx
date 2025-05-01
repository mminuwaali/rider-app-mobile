import api from "@/utils/request";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetRequest = () => {
    return useQuery({
        queryKey: ["get-request"],
        async queryFn() {
            const res = await api.get("/ride/request/");
            return res.data as IRequest[];
        }
    })
}

export const useCreateRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["create-request"],
        async mutationFn(data: object) {
            console.log(data);
            const res = await api.post("/ride/request/", data);
            return res.data as IRequest;
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["get-reqest", "get-my-ride"] });
        }
    });
};


export const useUpdateRequest = (id?: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["create-new-address"],
        async mutationFn(data: object) {
            const res = await api.patch(`/ride/request/${id}/`, data);
            return res.data as IRequest;
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["get-request"] });
        }
    });
};
