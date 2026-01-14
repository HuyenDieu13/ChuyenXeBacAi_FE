import { BaseResponse, DataResponse } from "./base_response.type";

export interface DashboardAnomaliesItem {
  totalRaised?: number;
  activeCampaigns?: number;
  pendingReconcileCount?: number;
  totalDonors?: number;
}

export interface CashflowTrend {
  id?: string;
  title?: string;
  collectedAmount?: number;
  goalAmount?: number;
  percent_of_goal?: number;
}
