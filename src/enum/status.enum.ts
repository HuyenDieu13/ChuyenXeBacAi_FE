import { CANCELLED } from "dns";

export enum CampaignStatus {
    PLANNING = "PLANNING",
    ONGOING = "ONGOING",
    DONE = "DONE",
    CANCELLED = "CANCELLED"
}

export enum SessionShift{
    MORNING = "MORNING",
    AFTERNOON = "AFTERNOON",
    EVENING = "EVENING"
}

export enum RegistrationStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED"
}

export enum AppReviewStatus {
    PENDING_REVIEW = "PENDING_REVIEW",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export enum CheckinMethod {
    MANUAL = "MANUAL",
    QR = "QR",
}

export enum DonationStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED"
}