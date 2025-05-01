import api from "@/utils/request";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetRiderSetup = () => {
    return useQuery({
        queryKey: ["rider-setup"],
        async queryFn() {
            const res = await api.get("/auth/rider/");
            return res.data as IRider;
        }
    })
}

export const useUpdateRiderSetup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["update-rider-setp"],
        async mutationFn(data: object) {
            const res = await api.patch("/auth/rider/", data);
            return res.data as IRider;
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["rider-setup"] });
        }
    });
};
