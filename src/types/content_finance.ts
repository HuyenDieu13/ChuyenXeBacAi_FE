import { BaseResponse, DataResponse } from "./base_response.type";

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