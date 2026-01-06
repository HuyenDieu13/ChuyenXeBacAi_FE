# Giải pháp: Lưu lại trạng thái QR khi chuyển trang

## Vấn đề
Khi người dùng chuyển trang rồi quay lại CheckinPage, QR code phải load lại thay vì giữ lại dữ liệu đã load trước đó.

## Nguyên nhân
- State của component (`qrSession`, `qrSessionIdForDisplay`, `userLocation`) được khởi tạo lại khi component re-mount
- Mặc dù React Query đã cache dữ liệu với `staleTime: Infinity`, nhưng component không biết phải hiển thị QR (vì state bị reset)

## Giải pháp
Sử dụng **Zustand store** để lưu trữ trạng thái QR **toàn cầu**, không bị ảnh hưởng bởi việc mount/unmount component.

### Các file thay đổi:

#### 1. **src/store/checkin.store.ts** (NEW)
```typescript
import { create } from "zustand";
import { SessionResource } from "@/types/session.type";

interface CheckinState {
  qrSession: SessionResource | null;
  qrSessionIdForDisplay: string;
  userLocation: { lat?: number; lng?: number };
  setQrSession: (session: SessionResource | null) => void;
  setQrSessionIdForDisplay: (id: string) => void;
  setUserLocation: (location: { lat?: number; lng?: number }) => void;
  resetQrState: () => void;
}

export const useCheckinStore = create<CheckinState>((set) => ({
  qrSession: null,
  qrSessionIdForDisplay: "",
  userLocation: {},
  setQrSession: (session) => set({ qrSession: session }),
  setQrSessionIdForDisplay: (id) => set({ qrSessionIdForDisplay: id }),
  setUserLocation: (location) => set({ userLocation: location }),
  resetQrState: () =>
    set({
      qrSession: null,
      qrSessionIdForDisplay: "",
      userLocation: {},
    }),
}));
```

#### 2. **src/pages/home/CheckinPage.tsx** (MODIFIED)
- Thay thế `useState` bằng `useCheckinStore` cho các state: `qrSession`, `qrSessionIdForDisplay`, `userLocation`
- Cập nhật tất cả các hàm gọi để sử dụng store functions thay vì `setQrSession`, `setQrSessionIdForDisplay`, `setUserLocation`
- Sử dụng `resetQrState()` để đóng modal QR

### Các thay đổi trong CheckinPage:

**Import store:**
```typescript
import { useCheckinStore } from "@/store/checkin.store";
```

**Thay thế useState bằng store:**
```typescript
// Trước:
const [qrSession, setQrSession] = useState<SessionResource | null>(null);
const [qrSessionIdForDisplay, setQrSessionIdForDisplay] = useState<string>("");
const [userLocation, setUserLocation] = useState<{ lat?: number; lng?: number }>({});

// Sau:
const { qrSession, qrSessionIdForDisplay, userLocation, setQrSession, setQrSessionIdForDisplay, setUserLocation, resetQrState } = useCheckinStore();
```

**Ví dụ cập nhật handlers:**
- `setQrSession(null)` → `resetQrState()`
- `setQrSessionIdForDisplay("")` → `setQrSessionIdForDisplay("")` (từ store)
- `setUserLocation({})` → `setUserLocation({})` (từ store)

## Lợi ích
✅ QR code được lưu cache khi chuyển trang
✅ Dữ liệu không bị mất khi quay lại
✅ Giảm số lần call API (React Query đã cache)
✅ User experience tốt hơn - không phải chờ load lại

## Cách hoạt động
1. Khi user bấm "Quét QR" → lưu sessionId vào store
2. React Query lấy QR image theo sessionId (được cache)
3. Khi chuyển trang → store vẫn giữ sessionId
4. Quay lại CheckinPage → React Query trả về cached QR image ngay
5. Không phải load lại!
