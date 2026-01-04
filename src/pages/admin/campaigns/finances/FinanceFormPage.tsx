// src/pages/admin/campaigns/finance/FinanceFormPage.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Save,
  Upload,
  Calendar,
  PlusCircle,
  MinusCircle,
} from "lucide-react";

import { adminCampaignDetailRoute } from "@/routes/admin";
import { TransactionType } from "@/types/transaction.type";
import {
  useCreateManualIncome,
  useCreateExpense,
} from "@/hooks/finance.hook";

const FinanceFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: campaignId } = useParams({
    from: adminCampaignDetailRoute.id,
  });

  /* ================= HOOKS ================= */
  const createIncomeMutation = useCreateManualIncome();
  const createExpenseMutation = useCreateExpense();

  /* ================= STATE ================= */
  const [type, setType] = useState<TransactionType>(
    TransactionType.INCOME
  );
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [note, setNote] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const loading =
    createIncomeMutation.isPending ||
    createExpenseMutation.isPending;

  /* ================= HANDLERS ================= */
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setReceiptFile(file);
    const reader = new FileReader();
    reader.onload = (ev) =>
      setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignId) return;

    if (type === TransactionType.INCOME) {
      createIncomeMutation.mutate(
        {
          campaign_id: campaignId,
          amount,
          donorName: source,
          note,
          occurredAt: date,
        },
        {
          onSuccess: () => {
            alert("Thêm khoản thu thành công!");
            navigate({ to: ".." });
          },
        }
      );
    } else {
      createExpenseMutation.mutate(
        {
          campaignId,
          Amount: amount,
          Description: description,
          occurredAt: date,
          invoiceUrl: receiptFile?.name,
        },
        {
          onSuccess: () => {
            alert("Thêm khoản chi thành công!");
            navigate({ to: ".." });
          },
        }
      );
    }
  };

  /* ================= RENDER ================= */
  return (
    <div className="max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-8 space-y-10"
      >
        {/* ================= HEADER ================= */}
        <div className="flex items-start gap-4 border-b pb-6">
          <button
            type="button"
            onClick={() => navigate({ to: ".." })}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-[#355C7D]">
              Thêm giao dịch tài chính
            </h1>
            <p className="text-sm text-gray-500">
              Ghi nhận khoản thu hoặc chi cho chiến dịch
            </p>
          </div>
        </div>

        {/* ================= TYPE ================= */}
        <div>
          <label className="label mb-2">Loại giao dịch *</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setType(TransactionType.INCOME)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition
                ${
                  type === TransactionType.INCOME
                    ? "bg-green-50 border-green-500 text-green-700"
                    : "hover:bg-gray-50"
                }`}
            >
              <PlusCircle size={18} />
              Thu tiền
            </button>

            <button
              type="button"
              onClick={() => setType(TransactionType.EXPENSE)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition
                ${
                  type === TransactionType.EXPENSE
                    ? "bg-red-50 border-red-500 text-red-700"
                    : "hover:bg-gray-50"
                }`}
            >
              <MinusCircle size={18} />
              Chi tiền
            </button>
          </div>
        </div>

        {/* ================= MAIN INFO ================= */}
        <div className="bg-gray-50 rounded-xl p-6 space-y-6 border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AMOUNT */}
            <div>
              <label className="label">Số tiền *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                  ₫
                </span>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) =>
                    setAmount(Number(e.target.value))
                  }
                  placeholder="Nhập số tiền"
                  className="input pl-8 text-lg font-bold bg-gray-100 focus:bg-white"
                />
              </div>
            </div>

            {/* DATE */}
            <div>
              <label className="label">
                <Calendar
                  size={14}
                  className="inline mr-1"
                />
                Ngày giao dịch *
              </label>
              <input
                type="datetime-local"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input bg-gray-100 focus:bg-white"
              />
            </div>

            {/* SOURCE */}
            <div className="md:col-span-2">
              <label className="label">
                {type === TransactionType.INCOME
                  ? "Người / Nguồn đóng góp"
                  : "Đơn vị chi"}
              </label>
              <input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Nhập tên người hoặc đơn vị"
                className="input bg-gray-100 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div>
          <label className="label">Mô tả *</label>
          <textarea
            rows={3}
            required
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Mô tả chi tiết giao dịch"
            className="input bg-gray-50 focus:bg-white leading-relaxed"
          />
        </div>

        {/* ================= RECEIPT ================= */}
        <div>
          <label className="label">Hóa đơn / Chứng từ</label>
          <div className="flex gap-6 items-start">
            <div className="relative w-64 h-40 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden bg-gray-50">
              {preview ? (
                <>
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                    <span className="text-white text-sm">
                      Thay đổi
                    </span>
                  </div>
                </>
              ) : (
                <Upload
                  size={36}
                  className="text-gray-400"
                />
              )}
            </div>

            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleUpload}
            />
          </div>
        </div>

        {/* ================= NOTE ================= */}
        <div>
          <label className="label">Ghi chú</label>
          <textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ghi chú thêm (nếu có)"
            className="input bg-gray-50 focus:bg-white"
          />
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate({ to: ".." })}
            className="btn-secondary"
          >
            Hủy
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`btn-primary flex items-center gap-2 ${
              type === TransactionType.EXPENSE
                ? "bg-red-600 hover:bg-red-700"
                : ""
            }`}
          >
            <Save size={18} />
            {loading ? "Đang lưu..." : "Lưu giao dịch"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinanceFormPage;
