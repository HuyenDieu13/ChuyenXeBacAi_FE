// 📦 Demo data cho danh sách tình nguyện viên (TNV)
export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedSessions: number;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  rating: number;
  avatar?: string;
}

export const demoVolunteers: Volunteer[] = [
  {
    id: "v001",
    name: "Nguyễn Minh Trường",
    email: "truong.nguyen@example.com",
    phone: "0905123456",
    joinedSessions: 12,
    status: "ACTIVE",
    rating: 4.9,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "v002",
    name: "Lê Thị Lan",
    email: "lan.le@example.com",
    phone: "0937456789",
    joinedSessions: 5,
    status: "PENDING",
    rating: 0,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "v003",
    name: "Phạm Quốc Duy",
    email: "duy.pham@example.com",
    phone: "0912456321",
    joinedSessions: 8,
    status: "ACTIVE",
    rating: 4.5,
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: "v004",
    name: "Võ Hồng Ngọc",
    email: "ngoc.vo@example.com",
    phone: "0908564789",
    joinedSessions: 2,
    status: "INACTIVE",
    rating: 3.7,
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    id: "v005",
    name: "Trần Đức Anh",
    email: "anh.tran@example.com",
    phone: "0987456231",
    joinedSessions: 9,
    status: "ACTIVE",
    rating: 4.3,
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
  },
];
