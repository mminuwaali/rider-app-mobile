import api from "@/utils/request";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/app/(providers)/auth.provider";

export const useGetProfile = () => {
  const { setUser } = useAuthContext();

  return useQuery({
    enabled: false,
    queryKey: ["get-profile"],
    async queryFn() {
      const res = await api.get<IUser>("/auth/profile/");

      setUser(res.data);
      return res.data as IUser;
    },
  });
}

export const useUpdateProfile = () =>
  useMutation({
    mutationKey: ["update-profile"],
    async mutationFn(data: Partial<IUser>) {
      const res = await api.patch("/auth/profile/", data);
      return res.data as IUser;
    },
  });
