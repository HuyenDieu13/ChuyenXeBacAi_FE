import {create} from 'zustand';
import { CheckinResource, MediaResource } from '@/types/checkins_media.type';
interface CheckinMediaState {
    checkins: CheckinResource[];
    medias: MediaResource[];
    addCheckin: (checkin: CheckinResource) => void;
    addMedia: (media: MediaResource) => void;
}

export const useCheckinMediaStore = create<CheckinMediaState>((set) => ({
    checkins: [],
    medias: [],
    addCheckin: (checkin) => set((state) => ({ checkins: [...state.checkins, checkin] })),
    addMedia: (media) => set((state) => ({ medias: [...state.medias, media] })),
}));