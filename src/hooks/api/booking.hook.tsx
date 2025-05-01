import api from "@/utils/request";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetBooking = (params: object = {}) => {
    return useQuery({
        queryKey: ["get-booking", params],
        async queryFn() {
            const res = await api.get("/ride/booking/", { params });
            console.log(res.data);
            return res.data as IResponsePage<IBooking[]>;
        }
    })
}

export const useUpdateBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["update-booking"],
        async mutationFn(data: { id: number; status: string }) {
            const res = await api.patch(`/ride/booking/${data.id}/`, { status: data.status });

            return res.data as IBooking;
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["get-booking"] });
        }
    });
};



export const useCreateBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["create-booking"],
        async mutationFn(data: object) {
            console.log(data);
            const res = await api.post("/ride/booking/", data);

            return res.data as IBooking;
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["get-booking", "get-my-ride"] });
        }
    });
};

