import { BaseResponse, DataResponse } from "./base_response.type";
import { Gender } from "@/enum/gender";;
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

export type StatsResponse = {
  totalRaised: number;
  activeCampaigns: number;
  pendingReconcileCount: number;
  newVolunteerApplications: number;
}

export type FinancialPerformanceResponse = {
  id: string;
  title: string;
  goal: number;
  raised: number;
  spent: number;
  balance: number;
  progressPercent: number;
}[];

export type CashflowTrendResponse = {
  date: string;
  income: number;
  expense: number;
}[];

export type VolunteerFunnelResponse = {
  id: string;
  title: string;
  target: number;
  applied: number;
  approved: number;
  attended: number;
  attendanceRate: number;
}[];

export type ApplicationStatusTrendResponse = {
  date: string;
  pending: number;
  approved: number;
  rejected: number;
}[];

export type DemographicsResponse = {
  ageGroups?: {
    group: string;
    count: number;
  }[];
  genderDist?: {
    gender: string;
    count: number;
  }[];
}[];

export type CampaignAlertResponse = {
  fundRisk:{
    id: string;
    title: string;
    end_date: string;
    progress: number;
  }[];
  volunteerRisk: []
};


