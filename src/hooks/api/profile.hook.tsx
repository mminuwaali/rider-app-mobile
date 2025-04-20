import api from "@/src/utils/request";
import { useQuery, useMutation } from "react-query";

export const useGetProfile = () =>
  useQuery({
    queryKey: ["get-profile"],
    async queryFn() {
      const res = await api.get("/auth/profile/");
      return res.data as IUser;
    },
  });

export const useUpdateProfile = () =>
  useMutation({
    mutationKey: ["update-profile"],
    async mutationFn(data: Partial<IUser>) {
      const res = await api.patch("/auth/profile/", data);
      return res.data as IUser;
    },
  });
