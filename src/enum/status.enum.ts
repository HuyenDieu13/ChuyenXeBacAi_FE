/* =========================
   REGISTRATION
========================= */
export enum RegistrationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  CLOSED = "CLOSED",
}

export const REGISTRATION_STATUS_LABEL: Record<RegistrationStatus, string> = {
  PENDING: "Chờ duyệt",
  APPROVED: "Đã duyệt",
  REJECTED: "Từ chối",
  CANCELLED: "Đã hủy",
  CLOSED: "Đóng đăng ký",
};
// User
export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const USER_STATUS_LABEL: Record<UserStatus, string> = {
  ACTIVE: "Đang hoạt động",
  INACTIVE: "Ngưng hoạt động",
};

/* =========================
   CAMPAIGN
========================= */
export enum CampaignStatus {
  PLANNING = "PLANNING",
  ONGOING = "ONGOING",
  DONE = "DONE",
  CANCELLED = "CANCELLED",
}

export const CAMPAIGN_STATUS_LABEL: Record<CampaignStatus, string> = {
  PLANNING: "Lên kế hoạch",
  ONGOING: "Đang diễn ra",
  DONE: "Hoàn thành",
  CANCELLED: "Đã hủy",
};

/* =========================
   SESSION
========================= */
export enum SessionStatus {
  PLANNED = "PLANNED",
  ONGOING = "ONGOING",
  DONE = "DONE",
  CANCELLED = "CANCELLED",
  Default = "DEFAULT",
  UPCOMING = "UPCOMING",
}

export const SESSION_STATUS_LABEL: Record<SessionStatus, string> = {
  PLANNED: "Đã lên lịch",
  ONGOING: "Đang diễn ra",
  DONE: "Hoàn thành",
  CANCELLED: "Đã hủy",
  DEFAULT: "Chưa xác định",
  [SessionStatus.UPCOMING]: ""
};

export enum SessionShift {
  MORNING = "MORNING",
  AFTERNOON = "AFTERNOON",
  EVENING = "EVENING",
}

export const SESSION_SHIFT_LABEL: Record<SessionShift, string> = {
  MORNING: "Buổi sáng",
  AFTERNOON: "Buổi chiều",
  EVENING: "Buổi tối",
};

/* =========================
   CHECK-IN
========================= */
export enum CheckinMethod {
  QR = "QR",
  MANUAL = "MANUAL",
}

export enum CheckinStatus {
  ON_TIME = "ON_TIME",
  LATE = "LATE",
  INVALID = "INVALID",
}

export const CHECKIN_STATUS_LABEL: Record<CheckinStatus, string> = {
  ON_TIME: "Đúng giờ",
  LATE: "Trễ",
  INVALID: "Không hợp lệ",
};

/* =========================
   DONATION
========================= */
export enum DonationGateway {
  MOMO = "MOMO",
  VNPAY = "VNPAY",
  STRIPE = "STRIPE",
}

export enum DonationStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export const DONATION_STATUS_LABEL: Record<DonationStatus, string> = {
  PENDING: "Chờ thanh toán",
  PAID: "Đã thanh toán",
  FAILED: "Thất bại",
  CANCELLED: "Đã hủy",
};

/* =========================
   FUND / FINANCE
========================= */
export enum FundSource {
  WEBHOOK = "WEBHOOK",
  CSV = "CSV",
  EMAIL = "EMAIL",
  MANUAL = "MANUAL",
}

export enum FundStatus {
  PENDING = "PENDING",
  MATCHED = "MATCHED",
  FLAGGED = "FLAGGED",
}

export const FUND_STATUS_LABEL: Record<FundStatus, string> = {
  PENDING: "Chờ đối soát",
  MATCHED: "Đã khớp",
  FLAGGED: "Đánh dấu lỗi",
};

export enum FundDirection {
  IN = "IN",
  OUT = "OUT",
}

/* =========================
   BANK / RECONCILE
========================= */
export enum BankImportSource {
  CSV = "CSV",
  EMAIL = "EMAIL",
}

export enum ReconcileDecision {
  AUTO = "AUTO",
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
  REVIEW = "REVIEW",
  UNMATCH = "UNMATCH",
}

/* =========================
   SYSTEM
========================= */
export enum Currency {
  VND = "VND",
  USD = "USD",
  EUR = "EUR",
}

export enum ChangeAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export enum PostStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export enum NotificationType {
  REGISTRATION = "REGISTRATION",
  DONATION = "DONATION",
  SYSTEM = "SYSTEM",
}
export enum VolunteerRegistrationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
