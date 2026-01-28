import { useQuery } from "@tanstack/react-query";
import { logService } from "@/services/log.service";
import { LogRecentActivityResponse } from "@/types/log.type";

export const useRecentLogActivities = (limit?: number) => {
    return useQuery<LogRecentActivityResponse>({
        queryKey: ["recent-log-activities", limit],
        queryFn: () => logService.getRecentActivity(limit),
    });
}