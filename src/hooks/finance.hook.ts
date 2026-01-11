// src/hooks/media.hooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { financeService, syncTimo, exportFinanceExcelService, recalculateBalanceService, importTimoStatementService, getFinancialHealthService, getDashboardAnomaliesService , getManualReconcileDecideService} from "@/services/finance.service";
import {
  FinanceByCampaignIdResponse,
  manualIncomeRequest,
  manualIncomeResponse,
  expenseRequest,
  expenseResponse,
  SyncTimoResponse,
  ExportFinanceExcelParams,
  CreateContentRequest,
  CreateContentResponse,
  SubcribeRequest,
  SubcribeResponse,
  DashboardAnomaliesRespose,
  FundChartsResponse,
  FundStatsResponse,
  manualReconcileDecideResponse,
  manualReconcileDecideRequest,

} from "@/types/content_finance";
import { contentFinanceService} from "@/services/content_finance.service";
import toast from "react-hot-toast";

/* ================= GET FINANCE ================= */
export const useGetFinanceByCampaignId = (campaignId?: string) =>
  useQuery<FinanceByCampaignIdResponse | null>({
    queryKey: ["finance-by-campaign", campaignId],
    enabled: !!campaignId,
    queryFn: async () => {
      const res = await financeService.getFinanceByCampaignId(
        campaignId as string
      );
      return res ?? null; // ⛔ không bao giờ undefined
    },
  });

/* ================= GET TRANSACTIONS ================= */
export const useGetFinanceTransactions = (campaignId?: string) =>
  useQuery({
    queryKey: ["finance-transactions", campaignId],
    enabled: !!campaignId,
    queryFn: async () => {
      const res = await financeService.getTransactions(
        campaignId as string
      );
      return res.data;
    },
  });

/* ================= DELETE ================= */
export const useDeleteFinanceTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      direction,
    }: {
      id: string;
      direction: "IN" | "OUT";
    }) => {
      return direction === "IN"
        ? financeService.deleteManualIncome(id)
        : financeService.deleteExpense(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["finance-transactions"],
        exact: false,
      });
    },
  });
};

/* ================= CREATE ================= */
export const useCreateManualIncome = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: manualIncomeRequest) =>
      financeService.createManualIncome(data),
    onSuccess: (
      _: manualIncomeResponse | null,
      variables: manualIncomeRequest
    ) => {
      queryClient.invalidateQueries({
        queryKey: ["finance-transactions", variables.campaign_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["finance-by-campaign", variables.campaign_id],
      });
    },
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: expenseRequest) =>
      financeService.createExpense(data),
    onSuccess: (
      _: expenseResponse | null,
      variables: expenseRequest
    ) => {
      queryClient.invalidateQueries({
        queryKey: ["finance-transactions", variables.campaignId],
      });
      queryClient.invalidateQueries({
        queryKey: ["finance-by-campaign", variables.campaignId],
      });
    },
  });
};
export const useSyncTimo = () => {
  return useMutation<SyncTimoResponse>({
    mutationFn: syncTimo,
  });
};
// finance.hook.ts
export const useExportFinanceExcel = () => {
  return useMutation({
    mutationFn: (campaignId: string) =>
      exportFinanceExcelService(campaignId),
  });
};
export const useRecalculateBalance = () => {
  return useMutation({
    mutationFn: (campaignId: string) =>
      recalculateBalanceService(campaignId),
  });
};
export const useImportTimoStatement = () => {
  return useMutation({
    mutationFn: ({
      importedBy,
      file,
    }: {
      importedBy: string;
      file: File;
    }) => importTimoStatementService(importedBy, file),
  });
};
export const useGetFinancialHealth = () => {
  return useQuery({
    queryKey: ["financial-health"],
    queryFn: getFinancialHealthService,
  });
};

export const useSubscribeContent = () => {
  const queryClient = useQueryClient();
  return useMutation<SubcribeResponse, Error, SubcribeRequest>({
    mutationKey: ["subscribe-content"],
    mutationFn: (data) => contentFinanceService.subscribe(data),
    onSuccess: (res) => {
      toast.success(res?.message || "Đăng ký thành công");
      queryClient.invalidateQueries({ queryKey: ["content-by-campaign"] });
    },
    onError: (error) => {
      toast.error(`Đăng ký thất bại: ${error.message}`);
    },
  });
};

export const useGetFundCharts = (campaignId?: string, year?: number) => {
  return useQuery<FundChartsResponse>({
    queryKey: ["fund-charts", campaignId, year],
    enabled: !!campaignId && !!year,
    queryFn: () => contentFinanceService.getFundCharts(campaignId as string, year as number),
  });
}

export const useGetFundStats = (campaignId?: string) => {
  return useQuery<FundStatsResponse>({
    queryKey: ["fund-stats", campaignId],
    enabled: !!campaignId,
    queryFn: () => contentFinanceService.getFundStats(campaignId as string),
  });
}

export const useGetDashboardAnomalies = () => {
  return useQuery<DashboardAnomaliesRespose[]>({
    queryKey: ["dashboard-anomalies"],
    queryFn: getDashboardAnomaliesService,
  });

} 

export const useManualReconcileDecide = () => {
  return useMutation<manualReconcileDecideResponse, Error, manualReconcileDecideRequest>({
    mutationKey: ["manual-reconcile-decide"],
    mutationFn: (data) => getManualReconcileDecideService(data),
  });
}