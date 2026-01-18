import { useQuery } from "@tanstack/react-query";
import {
    StatsResponse,
    FinancialPerformanceResponse,
    CashflowTrendResponse,
    VolunteerFunnelResponse,
    ApplicationStatusTrendResponse,
    DemographicsResponse,
    CampaignAlertResponse
} from "@/types/dashboard.type";
import { dashboardService } from "@/services/dashboard.service";

export const useGetStats = () =>
    useQuery<StatsResponse>({
        queryKey: ["dashboard-stats"],
        queryFn: async () => {
            const res = await dashboardService.getStats();
            return res;
        },
    });
export const useGetFinancialPerformance = (start?: string, end?: string) =>
    useQuery<FinancialPerformanceResponse>({
        queryKey: ["dashboard-financial-performance", start, end],
        enabled: Boolean(start) && Boolean(end),
        queryFn: async () => {
            const res = await dashboardService.getFinancialPerformance(start as string, end as string);
            return res;
        },
    });
export const useGetCashflowTrend = (range: string) =>
    useQuery<CashflowTrendResponse>({
        queryKey: ["dashboard-cashflow-trend", range],
        queryFn: async () => {
            const res = await dashboardService.getCashFlowTrend(range);
            return res;
        },
    });
export const useGetVolunteerFunnel = (start?: string, end?: string) =>
    useQuery<VolunteerFunnelResponse>({
        queryKey: ["dashboard-volunteer-funnel", start, end],
        enabled: Boolean(start) && Boolean(end),
        queryFn: async () => {
            const res = await dashboardService.getVolunteerFunnel(start as string, end as string);
            return res;
        },
    });
export const useGetApplicationStatusTrend = (range: string) =>
    useQuery<ApplicationStatusTrendResponse>({
        queryKey: ["dashboard-application-status-trend", range],
        queryFn: async () => {
            const res = await dashboardService.getApplicationStatusTrend(range);
            return res;
        },
    });
export const useGetDemographics = () =>
    useQuery<DemographicsResponse>({
        queryKey: ["dashboard-demographics"],
        queryFn: async () => {
            const res = await dashboardService.getDemographics();
            return res;
        },
    });
export const useGetCampaignAlert = () =>
    useQuery<CampaignAlertResponse>({
        queryKey: ["dashboard-campaign-alert"],
        queryFn: async () => {
            const res = await dashboardService.getCampaignAlert();
            return res;
        },
    });

