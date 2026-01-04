// src/services/finance.service.ts
import httpClient from "@/config/AxiosConfig";
import { AxiosResponse } from "axios";
import { API_ROUTES } from "@/config/ApiConfig";
import {
  FinanceByCampaignIdResponse,
  MaintainFinanceRequest,
  manualIncomeRequest,
  manualIncomeResponse,
  expenseRequest,
  expenseResponse,
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

