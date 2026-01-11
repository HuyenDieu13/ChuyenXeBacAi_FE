// src/services/finance.service.ts
import httpClient from "@/config/AxiosConfig";
import axios, { AxiosResponse } from "axios";
import { API_ROUTES } from "@/config/ApiConfig";
import {
  FinanceByCampaignIdResponse,
  MaintainFinanceRequest,
  manualIncomeRequest,
  manualIncomeResponse,
  expenseRequest,
  expenseResponse,
  SyncTimoResponse,
  ExportFinanceExcelResponse,
  RecalculateBalanceResponse,
  FinancialHealthResponse,
  DashboardAnomaliesRespose,
  manualReconcileDecideRequest,
  manualReconcileDecideResponse
  
} from "@/types/content_finance";

export const financeService = {
  /* ================= FINANCE OVERVIEW ================= */
  async getFinanceByCampaignId(
    campaignId: string
  ): Promise<FinanceByCampaignIdResponse | null> {
    try {
      const res: AxiosResponse<FinanceByCampaignIdResponse> =
        await httpClient.get(
          API_ROUTES.finance.getFinanceByCampaignId(campaignId)
        );
      return res.data;
    } catch (error) {
      console.error("getFinanceByCampaignId error:", error);
      return null;
    }
  },

  /* ================= TRANSACTIONS ================= */
  getTransactions(campaignId: string) {
    return httpClient.get(
      API_ROUTES.finance.maintainFinance(campaignId)
    );
  },

  /* ================= DELETE ================= */
  deleteFundTransaction(id: string) {
    return httpClient.delete(
      `/Finance/fund-transaction/${id}`
    );
  },

  deleteManualIncome(id: string) {
    return httpClient.delete(
      `/Finance/manual-income/${id}`
    );
  },

  deleteExpense(id: string) {
    return httpClient.delete(
      `/Finance/expenses/${id}`
    );
  },

  /* ================= MAINTAIN ================= */
  async maintainFinance(
    campaignId: string,
    data: MaintainFinanceRequest
  ): Promise<boolean> {
    try {
      const res = await httpClient.post(
        API_ROUTES.finance.maintainFinance(campaignId),
        data
      );
      return res.status === 200;
    } catch (error) {
      console.error("maintainFinance error:", error);
      return false;
    }
  },

  /* ================= CREATE ================= */
  async createManualIncome(
    data: manualIncomeRequest
  ): Promise<manualIncomeResponse | null> {
    try {
      const res = await httpClient.post(
        API_ROUTES.finance.createFinanceManualIncome(
          data.campaign_id as string
        ),
        data
      );
      return res.data;
    } catch (error) {
      console.error("createManualIncome error:", error);
      return null;
    }
  },

  async createExpense(
    data: expenseRequest
  ): Promise<expenseResponse | null> {
    try {
      const res = await httpClient.post(
        API_ROUTES.finance.createFinanceExpense(
          data.campaignId as string
        ),
        data
      );
      return res.data;
    } catch (error) {
      console.error("createExpense error:", error);
      return null;
    }
  },
};

// finance.service.ts
export const exportFinanceExcelService = async (
  campaignId: string
): Promise<Blob> => {
  const response = await httpClient.get(
    API_ROUTES.finance.exportFinanceExcel(campaignId),
    {
      responseType: "blob", // 
    }
  );

  return response.data; // 
};

export const recalculateBalanceService = async (
  campaignId: string
): Promise<RecalculateBalanceResponse> => {
  const response = await httpClient.post<RecalculateBalanceResponse>(
    API_ROUTES.finance.recalculateBalance(campaignId)
  );

  return response.data;
};
// finance.service.ts
export interface ImportTimoResponse {
  total: number;
  inserted: number;
  duplicates: number;
  message: string;
  toastType: 'success' | 'warning' | 'error';
}

export const importTimoStatementService = async (
  importedBy: string,
  file: File
) => {
  const formData = new FormData();

  formData.append("ImportedBy", importedBy); // đúng
  formData.append("File", file);              

  const response = await httpClient.post(
    API_ROUTES.finance.importTimoStatement,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const syncTimo = async (): Promise<SyncTimoResponse> => {
  const { data } = await axios.post<SyncTimoResponse>(
    API_ROUTES.finance.syncTimo
  );
  return data;
};

export const getFinancialHealthService =
  async (): Promise<FinancialHealthResponse> => {
    const response = await httpClient.get(
      API_ROUTES.finance.financialHealth
    );
    return response.data;
  };

export const getDashboardAnomaliesService =
  async (): Promise<DashboardAnomaliesRespose[]> => {
    const response = await httpClient.get(
      API_ROUTES.finance.getDashboardAnomalies
    );
    return response.data;
  };

export const getManualReconcileDecideService =
  async (
    data: manualReconcileDecideRequest 
  ): Promise<manualReconcileDecideResponse> => {
    const response = await httpClient.post(
      API_ROUTES.finance.manualReconcileDecide,
      data
    );
    return response.data;
  };
