import { DataResponse } from "./base_response.type";

// Loại giao dịch
export enum TransactionType {
  INCOME = "INCOME",  // Tiền vào
  EXPENSE = "EXPENSE", // Tiền ra
}

// Trạng thái giao dịch (nếu cần mở rộng)
export enum TransactionStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

// Giao dịch quỹ
export interface TransactionResource {
  id: string;
  campaignId: string;

  type: TransactionType;
  amount: number;          // Số tiền (dương cho income, âm cho expense)
  date: string;            // ISO datetime
  description: string;

  source?: string;         // Nguồn tiền (VD: "Quyên góp từ A", "Chi phí vật liệu")
  receipt?: string;        // Link hóa đơn hoặc ảnh
  approvedBy?: string;     // ID admin duyệt
  status: TransactionStatus;

  note?: string;           // Ghi chú
}

// Request thêm/sửa giao dịch
export interface CreateTransactionRequest {
  campaignId: string;
  type: TransactionType;
  amount: number;
  date: string;
  description: string;
  source?: string;
}

// Response
export interface TransactionResponse extends DataResponse<TransactionResource[]> {}
export interface CreateTransactionResponse extends DataResponse<TransactionResource> {}

