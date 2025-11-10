export interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  status: "ONGOING" | "UPCOMING" | "ENDED" | "CANCELLED";
  targetFund: number;
  banner?: string;
}

export const demoCampaigns: Campaign[] = [
  {
    id: "c1",
    name: "Trung Thu Ấm Áp",
    startDate: "2025-09-15",
    endDate: "2025-09-20",
    location: "Xã Mường Lát, Thanh Hóa",
    status: "ENDED",
    targetFund: 50000000,
  },
  {
    id: "c2",
    name: "Tết Yêu Thương 2026",
    startDate: "2025-12-15",
    endDate: "2026-01-20",
    location: "Hà Giang",
    status: "UPCOMING",
    targetFund: 100000000,
  },
  {
    id: "c3",
    name: "Hành Trình Mùa Hè Xanh",
    startDate: "2025-06-10",
    endDate: "2025-06-30",
    location: "Bình Phước",
    status: "ONGOING",
    targetFund: 70000000,
  },
];
