import { SessionResource, SessionStatus } from "@/types/session.type";
export const demoSessions: SessionResource[] = [
  {
    id: "s1",
    campaignId: "c1",
    title: "Buổi sáng 15/09/2025",
    description: "Hỗ trợ phát quà và kiểm tra hồ sơ học sinh.",
    sessionDate: "2025-09-15T08:00",
    shift: "morning",
    location: "Trường THCS Mường Lát",

    lat: 20.53123,
    lng: 104.12321,

    quota: 20,
    volunteers: ["v1", "v2", "v3"],

    banner: "",
    status: SessionStatus.ENDED,  
    progress: 100,
  },
  {
    id: "s2",
    campaignId: "c1",
    title: "Buổi chiều 16/09/2025",
    description: "Dạy học kỹ năng sống và tổ chức trò chơi.",
    sessionDate: "2025-09-16T13:30",
    shift: "afternoon",
    location: "Nhà văn hóa xã",

    lat: 20.61023,
    lng: 104.14221,

    quota: 15,
    volunteers: ["v4", "v5"],

    banner: "",
    status: SessionStatus.ONGOING,
    progress: 80,
  },
];
