import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { CreateCheckinRequest, CheckinsResponse } from "@/types/checkins_media.type";

import { checkinMediaService } from "@/services/checkin_media.service";

export const useCreateCheckin = () => {
    const queryClient = useQueryClient();
    return useMutation<string, Error, CreateCheckinRequest>({
        mutationKey: ["createCheckin"],
        mutationFn: (data) => checkinMediaService.createCheckin(data),
        onSuccess: () => {
            toast.success("Check-in thành công");
            queryClient.invalidateQueries({ queryKey: ["checkins"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Check-in thất bại");
        },
    }); 
};