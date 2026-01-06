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
