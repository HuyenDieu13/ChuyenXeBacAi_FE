import dayjs from "dayjs";

/**
 * Format ISO date (yyyy-mm-dd | ISO) → dd/MM/yyyy (hiển thị)
 */
export const formatDateVN = (date?: string): string => {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY");
};

/**
 * Parse dd/MM/yyyy → yyyy-mm-dd (lưu state / gửi BE)
 * Trả về "" nếu invalid
 */
export const parseDateVN = (value: string): string => {
  const parsed = dayjs(value, "DD/MM/YYYY", true);
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "";
};
