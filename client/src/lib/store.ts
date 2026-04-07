// ============================================================
// Gigi's Playhouse — Zustand Application Store
// Manages all app state with localStorage persistence
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Profile, Child, EnrolledPath, LessonProgress, QuizResult,
  ParentAlert, ApprovedChannel, FlashcardProgress, ComplianceLog,
  Lesson, Flashcard, PlanType, DomainId,
} from './types';
import { PRELOADED_CHANNELS } from './types';
import { SEED_LESSONS, SEED_FLASHCARDS } from './seed-data';

function uuid() {
  return crypto.randomUUID();
}

interface AppState {
  // Auth
  isAuthenticated: boolean;
  currentProfile: Profile | null;
  onboardingComplete: boolean;

  // Children
  children: Child[];
  activeChildId: string | null;

  // Learning
  enrolledPaths: EnrolledPath[];
  lessonProgress: LessonProgress[];
  quizResults: QuizResult[];
  lessons: Lesson[];
  flashcards: Flashcard[];
  flashcardProgress: FlashcardProgress[];

  // Channels
  approvedChannels: ApprovedChannel[];

  // Alerts
  alerts: ParentAlert[];

  // Compliance
  complianceLogs: ComplianceLog[];

  // Actions
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => void;
  logout: () => void;
  completeOnboarding: () => void;

  addChild: (child: Omit<Child, 'id' | 'parent_id' | 'created_at'>) => string;
  updateChild: (id: string, updates: Partial<Child>) => void;
  removeChild: (id: string) => void;
  setActiveChild: (id: string) => void;

  enrollPath: (childId: string, pathId: DomainId) => void;
  updatePathStatus: (pathId: string, status: EnrolledPath['status']) => void;

  updateLessonProgress: (progress: Partial<LessonProgress> & { child_id: string; lesson_id: string }) => void;
  addQuizResult: (result: Omit<QuizResult, 'id' | 'created_at'>) => void;

  addChannel: (channel: Omit<ApprovedChannel, 'id' | 'parent_id' | 'created_at'>) => void;
  removeChannel: (id: string) => void;

  markAlertRead: (id: string) => void;
  addAlert: (alert: Omit<ParentAlert, 'id' | 'created_at'>) => void;

  upgradePlan: (plan: PlanType) => void;

  addComplianceLog: (log: Omit<ComplianceLog, 'id'>) => void;

  updateFlashcardProgress: (progress: Omit<FlashcardProgress, 'id'>) => void;
}

type SetState = (partial: Partial<AppState> | ((state: AppState) => Partial<AppState>)) => void;
type GetState = () => AppState;

const storeCreator = (set: SetState, get: GetState): AppState => ({
      isAuthenticated: false,
      currentProfile: null,
      onboardingComplete: false,
      children: [],
      activeChildId: null,
      enrolledPaths: [],
      lessonProgress: [],
      quizResults: [],
      lessons: SEED_LESSONS,
      flashcards: SEED_FLASHCARDS,
      flashcardProgress: [],
      approvedChannels: [],
      alerts: [],
      complianceLogs: [],

      login: (email: string, _password: string) => {
        const profile = get().currentProfile;
        if (profile && profile.email === email) {
          set({ isAuthenticated: true });
          return true;
        }
        // Demo: any login works
        set({
          isAuthenticated: true,
          currentProfile: profile || {
            id: uuid(),
            email,
            plan_type: 'free',
            trial_started_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
          },
        });
        return true;
      },

      signup: (email: string, _password: string) => {
        const profileId = uuid();
        const channels: ApprovedChannel[] = PRELOADED_CHANNELS.map((ch, i) => ({
          ...ch,
          id: uuid(),
          parent_id: profileId,
          created_at: new Date().toISOString(),
        }));
        set({
          isAuthenticated: true,
          currentProfile: {
            id: profileId,
            email,
            plan_type: 'free',
            trial_started_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
          },
          approvedChannels: channels,
          onboardingComplete: false,
          children: [],
          activeChildId: null,
          enrolledPaths: [],
          lessonProgress: [],
          quizResults: [],
          flashcardProgress: [],
          alerts: [],
          complianceLogs: [],
        });
      },

      logout: () => {
        set({ isAuthenticated: false });
      },

      completeOnboarding: () => {
        set({ onboardingComplete: true });
      },

      addChild: (child) => {
        const id = uuid();
        const parentId = get().currentProfile?.id || '';
        const newChild: Child = {
          ...child,
          id,
          parent_id: parentId,
          created_at: new Date().toISOString(),
        };
        set((s) => ({
          children: [...s.children, newChild],
          activeChildId: s.activeChildId || id,
        }));
        return id;
      },

      updateChild: (id, updates) => {
        set((s) => ({
          children: s.children.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        }));
      },

      removeChild: (id) => {
        set((s) => ({
          children: s.children.filter((c) => c.id !== id),
          activeChildId: s.activeChildId === id ? (s.children[0]?.id || null) : s.activeChildId,
        }));
      },

      setActiveChild: (id) => {
        set({ activeChildId: id });
      },

      enrollPath: (childId, pathId) => {
        const existing = get().enrolledPaths.find(
          (p) => p.child_id === childId && p.path_id === pathId
        );
        if (existing) return;
        set((s) => ({
          enrolledPaths: [
            ...s.enrolledPaths,
            {
              id: uuid(),
              child_id: childId,
              path_id: pathId,
              status: 'active',
              current_lesson_index: 0,
              enrolled_at: new Date().toISOString(),
            },
          ],
        }));
      },

      updatePathStatus: (pathId, status) => {
        set((s) => ({
          enrolledPaths: s.enrolledPaths.map((p) =>
            p.id === pathId ? { ...p, status } : p
          ),
        }));
      },

      updateLessonProgress: (progress) => {
        set((s) => {
          const existing = s.lessonProgress.find(
            (p) => p.child_id === progress.child_id && p.lesson_id === progress.lesson_id
          );
          if (existing) {
            return {
              lessonProgress: s.lessonProgress.map((p) =>
                p.id === existing.id ? { ...p, ...progress } : p
              ),
            };
          }
          const base: LessonProgress = {
            id: uuid(),
            child_id: progress.child_id,
            lesson_id: progress.lesson_id,
            watch_complete: false,
            do_complete: false,
            apply_complete: false,
            reflect_complete: false,
            completion_status: 'partial',
          };
          Object.assign(base, progress);
          return {
            lessonProgress: [...s.lessonProgress, base],
          };
        });
      },

      addQuizResult: (result) => {
        const newResult: QuizResult = {
          ...result,
          id: uuid(),
          created_at: new Date().toISOString(),
        };
        set((s) => ({ quizResults: [...s.quizResults, newResult] }));

        // Create alert if 2nd fail
        if (!result.passed && result.attempt_number >= 2) {
          const child = get().children.find((c) => c.id === result.child_id);
          const lesson = get().lessons.find((l) => l.id === result.lesson_id);
          if (child && lesson) {
            get().addAlert({
              parent_id: get().currentProfile?.id || '',
              child_id: result.child_id,
              type: 'quiz-fail',
              message: `${child.display_name} needs help with "${lesson.title}". They scored ${result.score}/${result.total} on attempt ${result.attempt_number}.`,
              read: false,
            });
          }
        }
      },

      addChannel: (channel) => {
        set((s) => ({
          approvedChannels: [
            ...s.approvedChannels,
            {
              ...channel,
              id: uuid(),
              parent_id: s.currentProfile?.id || '',
              created_at: new Date().toISOString(),
            },
          ],
        }));
      },

      removeChannel: (id) => {
        set((s) => ({
          approvedChannels: s.approvedChannels.filter((c) => c.id !== id),
        }));
      },

      markAlertRead: (id) => {
        set((s) => ({
          alerts: s.alerts.map((a) => (a.id === id ? { ...a, read: true } : a)),
        }));
      },

      addAlert: (alert) => {
        set((s) => ({
          alerts: [
            ...s.alerts,
            { ...alert, id: uuid(), created_at: new Date().toISOString() },
          ],
        }));
      },

      upgradePlan: (plan) => {
        set((s) => ({
          currentProfile: s.currentProfile
            ? { ...s.currentProfile, plan_type: plan }
            : null,
        }));
      },

      addComplianceLog: (log) => {
        set((s) => ({
          complianceLogs: [...s.complianceLogs, { ...log, id: uuid() }],
        }));
      },

      updateFlashcardProgress: (progress) => {
        set((s) => {
          const existing = s.flashcardProgress.find(
            (p) => p.child_id === progress.child_id && p.card_id === progress.card_id
          );
          if (existing) {
            return {
              flashcardProgress: s.flashcardProgress.map((p) =>
                p.id === existing.id ? { ...p, ...progress } : p
              ),
            };
          }
          return {
            flashcardProgress: [...s.flashcardProgress, { ...progress, id: uuid() }],
          };
        });
      },
});

export const useStore = create<AppState>()(
  persist(
    storeCreator,
    {
      name: 'gigis-playhouse-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentProfile: state.currentProfile,
        onboardingComplete: state.onboardingComplete,
        children: state.children,
        activeChildId: state.activeChildId,
        enrolledPaths: state.enrolledPaths,
        lessonProgress: state.lessonProgress,
        quizResults: state.quizResults,
        flashcardProgress: state.flashcardProgress,
        approvedChannels: state.approvedChannels,
        alerts: state.alerts,
        complianceLogs: state.complianceLogs,
      }),
      merge: (persistedState: any, currentState: AppState) => {
        return {
          ...currentState,
          ...(persistedState || {}),
          // Always use seed data for lessons and flashcards
          lessons: currentState.lessons,
          flashcards: currentState.flashcards,
        };
      },
    }
  )
);

// Expose store for debugging in dev
if (typeof window !== 'undefined') {
  (window as any).__ZUSTAND_STORE__ = useStore;
}
