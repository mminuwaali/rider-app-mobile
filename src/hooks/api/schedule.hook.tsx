// hooks/api/schedule.hook.ts
import api from "@/utils/request";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetSchedules = (params: object) =>
  useQuery({
    queryKey: ["schedules", params],
    async queryFn() {
      const res = await api.get("/ride/schedule/", { params });
      return res.data as IResponsePage<ISchedule[]>;
    }
  });

export const useGetTodaysSchedule = () =>
  useQuery({
    queryKey: ["todays-schedule"],
    async queryFn() {
      const res = await api.get("/ride/schedule/get-schedule/");
      return res.data as ISchedule;
    }
  });


export const useStartTodaysSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["start-today's-schedule"],
    async mutationFn() {
      const res = await api.post("/ride/schedule/start-schedule/");
      return res.data as { message: string };
    },
    onSuccess(data) {
      alert(data.message);
      queryClient.invalidateQueries({ queryKey: ["todays-schedule"] });
    }
  });
}


export const useSearchSchedules = () =>
  useMutation({
    mutationKey: ["search-schedules"],
    async mutationFn(params: object) {
      const res = await api.get("/ride/schedule/closest-schedules", { params });
      return res.data as { schedule: ISchedule, distance: number }[];
    }
  });

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-schedule"],
    async mutationFn(data: object) {
      const res = await api.post("/ride/schedule/", data);
      return res.data as ISchedule;
    },
    onSuccess: () => {
      // Invalidate the schedules query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    }
  });
};
