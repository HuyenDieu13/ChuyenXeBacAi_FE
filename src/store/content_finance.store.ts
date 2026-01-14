import { create } from 'zustand';
import { ContentResource } from '@/types/content_finance.type';

interface ContentFinanceState {
    contents: ContentResource[];
    addContent: (content: ContentResource) => void;
    subcribeContent: (content: ContentResource) => void;
    donateContent: (content: ContentResource) => void;
}

export const useContentFinanceStore = create<ContentFinanceState>((set) => ({
    contents: [],
    addContent: (content) => set((state) => ({ contents: [...state.contents, content] })),
    subcribeContent: (content) => set((state) => ({ contents: [...state.contents, content] })),
    donateContent: (content) => set((state) => ({ contents: [...state.contents, content] })),
}));
