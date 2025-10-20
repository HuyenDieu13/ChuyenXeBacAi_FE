import { create } from 'zustand'
import { SessionResource } from '@/types/session.type'

interface SessionState {
    sessions: SessionResource[];
    setSessionsByCampaignId: (sessions: SessionResource[]) => void;
    addSession: (session: SessionResource) => void;
    registerSession: (session: SessionResource) => void;
    reviewSession: (updatedSession: SessionResource) => void;
    clearSessions: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
    sessions: [],
    setSessionsByCampaignId: (sessions) => set({ sessions }),
    addSession: (session) => set((state) => ({ sessions: [...state.sessions, session] })),
    registerSession: (session) => set((state) => ({ sessions: [...state.sessions, session] })),
    reviewSession: (updatedSession) => set((state) => ({
        sessions: state.sessions.map((session) =>
            session.id === updatedSession.id ? updatedSession : session
        ),
    })),
    clearSessions: () => set({ sessions: [] }),
}));
