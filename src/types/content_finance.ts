import { BaseResponse, DataResponse } from "./base_response.type";

export interface FinanceResource {
  id: string;
  campaignTitle: string;
  goalAmount: number;
  totalRaised: number;
  currentBalance: number;
  progressPercent: number;
  donorCount: number;
}


export interface FinanceByCampaignIdResponse {
  campaigntitle: string;
  goalamount: number;
  totalRaised: number;
  currentbalance: number;
  progressPercent: number;
  donorcount: number;
}

export interface MaintainFinanceRequest {
  totalCount?: number;
  items?: Array<{
    id?: string;
    occurred_at?: string;
    amount?: number;
    direction?: "IN" | "OUT";
    donarName?: string;
  }>;
}

// src/types/finance-ledger.type.ts
export interface FinanceLedgerItem {
  id: string;
  occurred_at: string;
  amount: number;
  direction: "IN" | "OUT";
  donorName?: string;
}

export interface FinanceLedgerResponse {
  totalCount: number;
  items: FinanceLedgerItem[];
}

export interface manualIncomeRequest {
  campaign_id?: string;
  amount?: number
  donorName?: string;
  note?: string;
  occurredAt?: string;
}

export interface manualIncomeResponse {
  id: string;
  campaign_id: string;
}

export interface expenseRequest {
  campaignId?: string;
  Amount?: number;
  Description?: string;
  occurredAt?: string;
  invoiceUrl?: string;
}

export interface expenseResponse {
  id: string;
  campaignId: string;
}

export interface DashboardAnomalyItemResponse {
  bank_stmt_id?: string;
  bank_time?: string;
  amount?: number;
  description?: string;
  aiSuggestionId?: string | null;
  status?: "YELLOW" | "RED" | "GREEN";
  source?: string;
}

export interface manualReconcileDecide{
  bankStmtId?:string;
}


/* ================================
 * Dashboard Anomalies
 * ================================ */

export type AnomalyType =
  | "MISSING_BANK_MATCH"
  | "DUPLICATE_AMOUNT"
  | "MANUAL_INCOME"
  | "UNKNOWN_SOURCE";

/* ================================
 * API Response
 * ================================ */



export interface ContentResource {

}

export interface CreateContentRequest {

}

export interface SubcribeRequest {

}

export interface CreateDonationRequest {
}

export interface ContentByCampaignIdResponse extends DataResponse<ContentResource> {}
export interface CreateContentResponse extends DataResponse<ContentResource> {}
export interface SubcribeResponse extends BaseResponse {}
export interface CreateDonationResponse extends BaseResponse {}