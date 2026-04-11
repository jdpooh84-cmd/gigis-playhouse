// ============================================================
// Gigi's Playhouse — Complete TypeScript Data Model
// Design: "Playroom Canvas" — Bold Geometric Toybox
// ============================================================

export type PlanType = 'free' | 'gold' | 'family' | 'coop';
export type GradeBand = 'pre-k' | 'kindergarten' | 'grade-1' | 'grade-2' | 'grade-3';
export type AttentionSpan = 'short' | 'medium' | 'long';
export type LearningStyle = 'visual' | 'hands-on' | 'auditory' | 'mixed';
export type PathStatus = 'active' | 'paused' | 'completed' | 'dropped';
export type CompletionStatus = 'done' | 'partial' | 'skipped';
export type AlertType = 'quiz-fail' | 'milestone' | 'streak' | 'path-complete';
export type AgeTag = 'toddler' | 'preschool' | 'k3' | 'all';
export type FlashcardResult = 'knew' | 'almost' | 'learning';
export type DomainId = 'literacy' | 'math' | 'science' | 'social-studies' | 'social-emotional' | 'executive-function';
export type GuideAnimal = 'cat' | 'dog' | 'bunny' | 'bear';
export type ChildColor = '#7C3AED' | '#0F6E56' | '#D85A30' | '#3B6D11';

export const CHILD_COLORS: { value: ChildColor; name: string }[] = [
  { value: '#7C3AED', name: 'Purple' },
  { value: '#0F6E56', name: 'Teal' },
  { value: '#D85A30', name: 'Coral' },
  { value: '#3B6D11', name: 'Green' },
];

export const GUIDE_ANIMALS: { value: GuideAnimal; name: string; personality: string }[] = [
  { value: 'cat', name: 'Gigi the Cat', personality: 'Warm, curious, loves words' },
  { value: 'dog', name: 'Dexter the Dog', personality: 'Energetic, loves numbers and puzzles' },
  { value: 'bunny', name: 'Luna the Bunny', personality: 'Gentle, loves science and discovery' },
  { value: 'bear', name: 'Bear', personality: 'Steady, loves social-emotional stories' },
];

export interface Profile {
  id: string;
  email: string;
  plan_type: PlanType;
  trial_started_at: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  created_at: string;
}

export interface Child {
  id: string;
  parent_id: string;
  display_name: string;
  age: number;
  grade_band: GradeBand;
  avatar_emoji: string;
  attention_span: AttentionSpan;
  learning_style: LearningStyle;
  short_day_mode: boolean;
  sensory_notes: string;
  language: string;
  display_color: string;
  avatar_animal: GuideAnimal;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface EnrolledPath {
  id: string;
  child_id: string;
  path_id: DomainId;
  status: PathStatus;
  current_lesson_index: number;
  enrolled_at: string;
}

export interface LessonProgress {
  id: string;
  child_id: string;
  lesson_id: string;
  watch_complete: boolean;
  do_complete: boolean;
  apply_complete: boolean;
  reflect_complete: boolean;
  completion_status: CompletionStatus;
  completed_at?: string;
}

export interface QuizResult {
  id: string;
  child_id: string;
  lesson_id: string;
  score: number;
  total: number;
  attempt_number: number;
  passed: boolean;
  parent_notified: boolean;
  created_at: string;
}

export interface ParentAlert {
  id: string;
  parent_id: string;
  child_id: string;
  type: AlertType;
  message: string;
  read: boolean;
  created_at: string;
}

export interface ApprovedChannel {
  id: string;
  parent_id: string;
  nickname: string;
  emoji: string;
  youtube_channel_id?: string;
  youtube_video_id?: string;
  youtube_playlist_id?: string;
  age_tag: AgeTag;
  is_preloaded: boolean;
  sort_order: number;
  created_at: string;
  // Cached metadata
  thumbnail_url?: string;
  recent_videos?: { id: string; title: string; thumbnail: string }[];
}

export interface FlashcardProgress {
  id: string;
  child_id: string;
  card_id: string;
  next_review_date: string;
  interval_days: number;
  ease_factor: number;
  repetitions: number;
  last_result: FlashcardResult;
}

export interface ComplianceLog {
  id: string;
  child_id: string;
  date: string;
  domain: DomainId;
  minutes_spent: number;
  lessons_completed: number;
}

export interface Lesson {
  id: string;
  domain: DomainId;
  grade_band: GradeBand;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  day_number: number;
  title: string;
  theme: string;
  episode: {
    title: string;
    description: string;
    duration_minutes: number;
    skill_tags: string[];
    search_term: string;
  };
  activity: {
    title: string;
    instructions: string[];
    materials: string[];
    short_version: string;
  };
  apply_prompt: string;
  reflection_prompt: string;
  reflect_script: string[];
  quiz: QuizQuestion[];
  on_track_goal: string;
  stretch_goal: string;
  asl_word: string;
  materials_needed: string[];
}

export interface QuizQuestion {
  question: string;
  type: 'multiple-choice' | 'true-false' | 'image-tap';
  options: string[];
  correct_answer: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  domain: DomainId;
  front: string;
  back: string;
  phonics_notation?: string;
  emoji?: string;
}

export interface DomainInfo {
  id: DomainId;
  name: string;
  character: string;
  color: string;
  colorClass: string;
  emoji: string;
  bgClass: string;
}

// Plan feature gates
export const PLAN_GATES = {
  free: {
    lessons_per_path: 3,
    channel_slots: 5,
    child_profiles: 1,
    languages: ['en'],
    pdf_export: false,
    all_domains: false,
  },
  gold: {
    lessons_per_path: Infinity,
    channel_slots: Infinity,
    child_profiles: 1,
    languages: 'all' as const,
    pdf_export: true,
    all_domains: true,
  },
  family: {
    lessons_per_path: Infinity,
    channel_slots: Infinity,
    child_profiles: 4,
    languages: 'all' as const,
    pdf_export: true,
    all_domains: true,
  },
  coop: {
    lessons_per_path: Infinity,
    channel_slots: Infinity,
    child_profiles: 10,
    languages: 'all' as const,
    pdf_export: true,
    all_domains: true,
  },
} as const;

export const DOMAINS: DomainInfo[] = [
  { id: 'literacy', name: 'Literacy', character: 'Lyric', color: '#4361EE', colorClass: 'domain-literacy', emoji: '📚', bgClass: 'bg-[#4361EE]' },
  { id: 'math', name: 'Math', character: 'Justin Jr', color: '#F72585', colorClass: 'domain-math', emoji: '🔢', bgClass: 'bg-[#F72585]' },
  { id: 'science', name: 'Science', character: 'Rachel', color: '#06B6D4', colorClass: 'domain-science', emoji: '🔬', bgClass: 'bg-[#06B6D4]' },
  { id: 'social-studies', name: 'Social Studies', character: 'Jamie', color: '#F59E0B', colorClass: 'domain-social', emoji: '🌍', bgClass: 'bg-[#F59E0B]' },
  { id: 'social-emotional', name: 'Social-Emotional', character: 'Kaylah', color: '#22C55E', colorClass: 'domain-sel', emoji: '💚', bgClass: 'bg-[#22C55E]' },
  { id: 'executive-function', name: 'Executive Function', character: 'Darian', color: '#8B5CF6', colorClass: 'domain-exec', emoji: '🧠', bgClass: 'bg-[#8B5CF6]' },
];

export const ALL_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Mandarin Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'pt', name: 'Portuguese (Brazilian)' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'tl', name: 'Tagalog' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'it', name: 'Italian' },
  { code: 'ru', name: 'Russian' },
  { code: 'sw', name: 'Swahili' },
  { code: 'ht', name: 'Haitian Creole' },
];

export const PRELOADED_CHANNELS: Omit<ApprovedChannel, 'id' | 'parent_id' | 'created_at'>[] = [
  { nickname: 'Ms. Rachel', emoji: '🎵', youtube_channel_id: 'UCGtq2a7K3UJBDjgwliQCHbA', age_tag: 'toddler', is_preloaded: true, sort_order: 1 },
  { nickname: 'Blippi', emoji: '🧡', youtube_channel_id: 'UC5PYHgAzJ1wLEidB58SK6Xw', age_tag: 'preschool', is_preloaded: true, sort_order: 2 },
  { nickname: 'CoComelon', emoji: '🍉', youtube_channel_id: 'UCbCmjCuTUZos6Inko4u57UQ', age_tag: 'toddler', is_preloaded: true, sort_order: 3 },
  { nickname: 'ChuChu TV', emoji: '🎶', youtube_channel_id: 'UCBnDOXKQ0Q5MBJMHZ68FfQA', age_tag: 'toddler', is_preloaded: true, sort_order: 4 },
  { nickname: "Gracie's Corner", emoji: '🌟', youtube_channel_id: 'UCn6hVDm3eB4pOBaLO0ZERDQ', age_tag: 'toddler', is_preloaded: true, sort_order: 5 },
  { nickname: "Khan Academy Kids", emoji: '📐', youtube_channel_id: 'UCHpe7s3kJBLj1sWem5sAobA', age_tag: 'k3', is_preloaded: true, sort_order: 6 },
  { nickname: 'PBS KIDS', emoji: '🎨', youtube_channel_id: 'UCrNnk0wFBnCS1awGjq_ijGQ', age_tag: 'k3', is_preloaded: true, sort_order: 7 },
  { nickname: 'Numberblocks', emoji: '🔢', youtube_channel_id: 'UCPlwvN0w4qFSP1FllALB92w', age_tag: 'k3', is_preloaded: true, sort_order: 8 },
  { nickname: 'Alphablocks', emoji: '🔤', youtube_channel_id: 'UC_qs3c0ehDvZkbiEbOj6Drg', age_tag: 'k3', is_preloaded: true, sort_order: 9 },
  { nickname: 'SciShow Kids', emoji: '🧪', youtube_channel_id: 'UCvW8JzztV3k3W8toR0DEkbA', age_tag: 'k3', is_preloaded: true, sort_order: 10 },
  { nickname: 'StoryBots', emoji: '🤖', youtube_channel_id: 'UCV2JoHUFoFwox0ISlnLC4Lg', age_tag: 'k3', is_preloaded: true, sort_order: 11 },
  { nickname: 'Nat Geo Kids', emoji: '🦁', youtube_channel_id: 'UCXVCgDuD_QCkI7gTKU7-tpg', age_tag: 'k3', is_preloaded: true, sort_order: 12 },
  { nickname: 'Learn Bright', emoji: '💡', youtube_channel_id: 'UCkQSR0mSAdYPa_0QPOhDYYw', age_tag: 'k3', is_preloaded: true, sort_order: 13 },
  { nickname: 'Homeschool Pop', emoji: '🏠', youtube_channel_id: 'UC7bh52Bv4kPfgaOJOCZmXdQ', age_tag: 'k3', is_preloaded: true, sort_order: 14 },
  { nickname: 'Scratch Garden', emoji: '🌱', youtube_channel_id: 'UCU0fJJqFGBvjJJkMO-IUEMA', age_tag: 'k3', is_preloaded: true, sort_order: 15 },
  { nickname: 'Crash Course Kids', emoji: '🚀', youtube_channel_id: 'UC7DdEm33SyaTDtWYGO2CwdA', age_tag: 'k3', is_preloaded: true, sort_order: 16 },
  { nickname: "Asher's Day", emoji: '💛', youtube_channel_id: 'UCnYzLjkT1RCOonUBMXBFnDg', age_tag: 'preschool', is_preloaded: true, sort_order: 17 },

  // New channels from Apify research
  { nickname: 'Sesame Street', emoji: '📺', youtube_channel_id: 'UCoookXUzPciGrEZEXmh4Jjg', age_tag: 'k3', is_preloaded: true, sort_order: 18 },
  { nickname: 'SciShow Kids', emoji: '🎬', youtube_channel_id: 'UCRFIPG2u1DxKLNuE3y2SjHA', age_tag: 'k3', is_preloaded: true, sort_order: 19 },
  { nickname: 'Art for Kids Hub', emoji: '🎥', youtube_channel_id: 'UC5XMF3Inoi8R9nSI8ChOsdQ', age_tag: 'k3', is_preloaded: true, sort_order: 20 },
  { nickname: 'Crash Course Kids', emoji: '📡', youtube_channel_id: 'UCONtPx56PSebXJOxbFv-2jQ', age_tag: 'k3', is_preloaded: true, sort_order: 21 },
  { nickname: 'Cosmic Kids Yoga', emoji: '🖥️', youtube_channel_id: 'UC5uIZ2KOZZeQDQo_Gsi_qbQ', age_tag: 'k3', is_preloaded: true, sort_order: 22 },
  { nickname: 'ChuChu TV Nursery Rhymes & Kids Songs', emoji: '🎞️', youtube_channel_id: 'UCBnZ16ahKA2DZ_T5W0FPUXg', age_tag: 'k3', is_preloaded: true, sort_order: 23 },
  { nickname: 'Super Simple Songs - Kids Songs', emoji: '📹', youtube_channel_id: 'UCLsooMJoIpl_7ux2jvdPB-Q', age_tag: 'k3', is_preloaded: true, sort_order: 24 },
  { nickname: 'BabyBus - Kids Songs and Cartoons', emoji: '🎦', youtube_channel_id: 'UCpYye8D5fFMUPf9nSfgd4bA', age_tag: 'k3', is_preloaded: true, sort_order: 25 },
  { nickname: 'Mother Goose Club', emoji: '📺', youtube_channel_id: 'UCJkWoS4RsldA1coEIot5yDA', age_tag: 'k3', is_preloaded: true, sort_order: 26 },
  { nickname: 'Jack Hartmann Kids Music Channel', emoji: '🎬', youtube_channel_id: 'UCVcQH8A634mauPrGbWs7QlQ', age_tag: 'k3', is_preloaded: true, sort_order: 27 },
  { nickname: 'Gracie\'s Corner', emoji: '🎥', youtube_channel_id: 'UCQ2FzqIvWSE7ysvL1sLWQ5Q', age_tag: 'k3', is_preloaded: true, sort_order: 28 },
  { nickname: 'Harry Kindergarten Music', emoji: '📡', youtube_channel_id: 'UCNTakNQwoAqVtPSORzswT_A', age_tag: 'k3', is_preloaded: true, sort_order: 29 },
  { nickname: 'Free School', emoji: '🖥️', youtube_channel_id: 'UCebMFnw6WxozGmqGekJHOJg', age_tag: 'k3', is_preloaded: true, sort_order: 30 },
  { nickname: 'Homeschool Pop', emoji: '🎞️', youtube_channel_id: 'UCfPyVJEBD7Di1YYjTdS2v8g', age_tag: 'k3', is_preloaded: true, sort_order: 31 },
  { nickname: 'TheDadLab', emoji: '📹', youtube_channel_id: 'UCc_-hy0u9-oKlNdMKHBudcQ', age_tag: 'k3', is_preloaded: true, sort_order: 32 },
  { nickname: 'BrainPOP', emoji: '🎦', youtube_channel_id: 'UCJ5dVwsCLKlWuOZyi7WDwfw', age_tag: 'k3', is_preloaded: true, sort_order: 33 },
  { nickname: 'TED-Ed', emoji: '📺', youtube_channel_id: 'UCsooa4yRKGN_zEE8iknghZA', age_tag: 'k3', is_preloaded: true, sort_order: 34 },
  { nickname: 'Socratica Kids', emoji: '🎬', youtube_channel_id: 'UCgppk8qs5kcgtjaDi0mAzjw', age_tag: 'k3', is_preloaded: true, sort_order: 35 },
  { nickname: 'Khan Academy Kids', emoji: '🎥', youtube_channel_id: 'UC2ri4rEb8abnNwXvTjg5ARw', age_tag: 'k3', is_preloaded: true, sort_order: 36 },
  { nickname: 'mathantics', emoji: '📡', youtube_channel_id: 'UCBuMwlP7kHkNxdPAqtFSJTw', age_tag: 'k3', is_preloaded: true, sort_order: 37 },
  { nickname: 'Peekaboo Kidz', emoji: '🖥️', youtube_channel_id: 'UCB7u3w8o8Tu8ve1LBfIvtkA', age_tag: 'k3', is_preloaded: true, sort_order: 38 }
];
