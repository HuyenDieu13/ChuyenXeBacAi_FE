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