// src/data/demoCampaigns.ts
import { CampaignResource, CampaignStatus } from "@/types/campaign.type";

export const demoCampaigns: CampaignResource[] = [
  {
    id: "c1",
    title: "Trung Thu Ấm Áp 2025",
    description: "Mang trung thu đến các em nhỏ vùng cao Mường Lát, Thanh Hóa",
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    location: "Xã Mường Lát, Thanh Hóa",
    goalAmount: 50000000,
    collectedAmount: 32500000,
    goalVolunteers: 80,
    registeredVolunteers: 67,
    status: CampaignStatus.ONGOING,
    createdAt: "2025-07-15T10:00:00Z",
    updatedAt: "2025-09-10T14:30:00Z",
    banners: [
      "https://images.unsplash.com/photo-1593113598332-cd288f2f31b4?w=1200",
      "https://images.unsplash.com/photo-1605812830455-2f818b7be3c2?w=1200",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200",
    ],
    totalSessions: 12,
    totalTransactions: 145,
  },
  {
    id: "c2",
    title: "Xanh Hóa Đồi Núi 2025",
    description: "Trồng 5000 cây xanh tại vùng hạn hán Tây Nguyên",
    startDate: "2025-11-01",
    endDate: "2025-12-31",
    location: "Huyện Krông Nô, Đắk Nông",
    goalAmount: 80000000,
    collectedAmount: 12000000,
    status: CampaignStatus.PUBLISHED,
    createdAt: "2025-08-20T08:00:00Z",
    banners: [],
  },
];