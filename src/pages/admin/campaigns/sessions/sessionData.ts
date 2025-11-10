export interface Session {
  id: string;
  name: string;
  date: string;
  location: string;
  progress: number;
  volunteers: string[];
  banner?: string;
}

export const demoSessions: Session[] = [
  {
    id: "s1",
    name: "Buổi sáng 15/09/2025",
    date: "2025-09-15 08:00",
    location: "Trường THCS Mường Lát",
    progress: 100,
    volunteers: ["v1", "v2", "v3"],
  },
  {
    id: "s2",
    name: "Buổi chiều 16/09/2025",
    date: "2025-09-16 13:30",
    location: "Nhà văn hóa xã",
    progress: 80,
    volunteers: ["v4", "v5"],
  },
];
