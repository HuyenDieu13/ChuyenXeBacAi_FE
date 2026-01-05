// src/hooks/media.hooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { financeService, syncTimo,exportFinanceExcelService,recalculateBalanceService, importTimoStatementService, getFinancialHealthService } from "@/services/finance.service";
import {
  FinanceByCampaignIdResponse,
  manualIncomeRequest,
  manualIncomeResponse,
  expenseRequest,
  expenseResponse,
  SyncTimoResponse,
  ExportFinanceExcelParams,
} from "@/types/content_finance";
import { API_ROUTES } from "@/config/ApiConfig";

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
    onSuccess: (_, variables) => {
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


