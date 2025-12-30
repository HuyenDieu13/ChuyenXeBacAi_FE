import { useQuery } from "@tanstack/react-query";
import { sessionService } from "@/services/session.service";

export const useSessionRoster = (
  sessionId: string,
  params: {
    page?: number;
    pageSize?: number;
    q?: string;
  }
) => {
  return useQuery({
    queryKey: ["session-roster", sessionId, params],
    queryFn: () =>
      sessionService.getApprovedRoster(sessionId, params),
    enabled: !!sessionId,
  });
};
