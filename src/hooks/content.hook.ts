import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    ContentLatestResponse,
    ContentByIdResponse
} from "@/types/content_finance.type";
import { contentFinanceService } from "@/services/content_finance.service";
import toast from "react-hot-toast";


/* ================= GET LATEST CONTENTS ================= */
export const useGetContentLatest = (params: { page: number, pageSize: number }) =>
    useQuery<ContentLatestResponse>({
        queryKey: ["content-latest", params],
        queryFn: async () => {
            const res = await contentFinanceService.getContentLatest(params);
            return res;
        },
    });


/* ================= GET CONTENT BY ID ================= */
export const useGetContentById = (id: string) =>
    useQuery<ContentByIdResponse>({
        queryKey: ["content-by-id", id],
        queryFn: async () => {
            const res = await contentFinanceService.getContentById(id);
            return res;
        },
        enabled: !!id,
    });