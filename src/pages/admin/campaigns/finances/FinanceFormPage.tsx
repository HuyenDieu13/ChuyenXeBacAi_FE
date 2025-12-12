// src/pages/admin/campaigns/finance/FinanceFormPage.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Save, Upload, Calendar } from "lucide-react";
import { adminCampaignDetailRoute } from "@/routes/admin";
import { demoTransactions } from "./transactionData";
import { TransactionResource, TransactionType, TransactionStatus } from "@/types/transaction.type";

const FinanceFormPage: React.FC = () => {
  const navigate = useNavigate();

  const { id: campaignId } = useParams({ from: adminCampaignDetailRoute.id });
  const { transactionId } = useParams({ strict: false });

  const isEditMode = Boolean(transactionId);
  const existingTransaction = isEditMode
    ? demoTransactions.find((t) => t.id === transactionId && t.campaignId === campaignId)
    : null;

  const [form, setForm] = useState<TransactionResource>(
    existingTransaction || {
      id: "",
      campaignId,
      type: TransactionType.INCOME,
      amount: 0,
      date: new Date().toISOString(),
      description: "",
      source: "",
      receipt: "",
      approvedBy: "",
      status: TransactionStatus.PENDING,
      note: "",
    }
  );

  const [preview, setPreview] = useState<string | null>(existingTransaction?.receipt || null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditMode) {
      const index = demoTransactions.findIndex((t) => t.id === transactionId);
      if (index !== -1) {
        demoTransactions[index] = { ...form, receipt: preview || form.receipt };
      }
      alert("Cập nhật giao dịch thành công!");
    } else {
      const newTransaction = {
        ...form,
        id: Date.now().toString(),
        receipt: preview || "",
      };
      demoTransactions.push(newTransaction);
      alert("Thêm giao dịch thành công!");
    }

    navigate({ to: ".." });
  };

  const handleBack = () => navigate({ to: ".." });

  return (
      <div className="w-full">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-8">
          {/* HEADER */}
          <div className="flex items-center justify-between border-b pb-6">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-[#355C7D]">
                  {isEditMode ? "Chỉnh sửa giao dịch" : "Thêm giao dịch mới"}
                </h1>
                {isEditMode && (
                  <p className="text-sm text-gray-500 mt-1">
                    ID: <span className="font-mono">{transactionId}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Loại giao dịch *</label>
              <select
                required
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:border-[#355C7D]"
              >
                <option value={TransactionType.INCOME}>Thu (tiền vào)</option>
                <option value={TransactionType.EXPENSE}>Chi (tiền ra)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Số tiền *</label>
              <input
                required
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="VD: 1000000"
                className="w-full px-4 py-3 border rounded-lg focus:border-[#355C7D]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="inline mr-1" size={16} /> Ngày giao dịch *
              </label>
              <input
                required
                type="datetime-local"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:border-[#355C7D]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nguồn tiền</label>
              <input
                type="text"
                name="source"
                value={form.source}
                onChange={handleChange}
                placeholder="VD: Chuyển khoản ngân hàng"
                className="w-full px-4 py-3 border rounded-lg focus:border-[#355C7D]"
              />
            </div>
          </div>

          {/* MÔ TẢ */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mô tả *</label>
            <textarea
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Mô tả chi tiết về giao dịch..."
              className="w-full px-4 py-3 border rounded-lg focus:border-[#355C7D]"
            />
          </div>

          {/* RECEIPT */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Hóa đơn / Chứng từ</label>
            <div className="flex items-center gap-6">
              <div className="w-64 h-40 bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="Receipt" className="w-full h-full object-cover" />
                ) : (
                  <Upload size={48} className="text-gray-400" />
                )}
              </div>
              <div>
                <input type="file" accept="image/*,application/pdf" onChange={handleUpload} className="block" />
                <p className="text-xs text-gray-500 mt-2">Hình ảnh hoặc PDF, tối đa 10MB</p>
              </div>
            </div>
          </div>

          {/* GHI CHÚ */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ghi chú</label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              rows={2}
              placeholder="Ghi chú thêm cho giao dịch này..."
              className="w-full px-4 py-3 border rounded-lg focus:border-[#355C7D]"
            />
          </div>

          {/* NÚT HÀNH ĐỘNG */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleBack}
              className="px-8 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="flex items-center gap-3 px-8 py-3 bg-[#355C7D] hover:bg-[#26415D] text-white rounded-full font-medium transition shadow-sm"
            >
              <Save size={20} />
              {isEditMode ? "Cập nhật giao dịch" : "Thêm giao dịch"}
            </button>
          </div>
        </form>
      </div>
  );
};

export default FinanceFormPage;