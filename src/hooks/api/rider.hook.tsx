import api from "@/utils/request";
import { useQuery, useMutation } from "@tanstack/react-query";

interface ISearchRiderData {
    "total_distance": number;
    "distance_to_user": number;
    "distance_to_destination": number;
    "rider": IRider,
    "location": {
        "latitude": number;
        "longitudenumber": number;
    },
}


export const useSearchRiders = () => {
    return useMutation({
        mutationKey: ["get-rides"],
        async mutationFn(params: object = {}) {
            const res = await api.post("/auth/riders/get-closest-riders/", params);
            console.log("getting data", (res.data as ISearchRiderData[]).at(0)?.rider);
            // return { results: [], count: 0, next: null, previous: null } as IResponsePage<IRider[]>;
            return res.data as ISearchRiderData[];
        },
    });
};


export const useGetMyRide = () => {
    return useQuery({
        queryKey: ["get-my-ride"],
        async queryFn() {
            const res = await api.get("/ride/request/my-ride/");
            return res.data as IRequest;
        },
    });
};

