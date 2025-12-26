
export enum CampaignStatus {
  PLANNING = "PLANNING",
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export const CAMPAIGN_STATUS_LABEL: Record<CampaignStatus, string> = {
  PLANNING: "Lên kế hoạch",
  DRAFT: "Nháp",
  PUBLISHED: "Công khai",
  ONGOING: "Đang diễn ra",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
};


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