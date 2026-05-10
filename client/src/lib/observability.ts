/**
 * Observability Module — Sentry (error tracking) + PostHog (product analytics)
 * 
 * Configuration:
 * - VITE_SENTRY_DSN: Sentry DSN for error tracking
 * - VITE_POSTHOG_KEY: PostHog project API key
 * - VITE_POSTHOG_HOST: PostHog host (default: https://app.posthog.com)
 * 
 * These are safe to be in the client bundle (they are public keys).
 */

// ─── Sentry Error Tracking ──────────────────────────────────────────────────

interface SentryConfig {
  dsn: string;
  environment: string;
  release?: string;
}

let sentryInitialized = false;

export async function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) {
    console.log('[Observability] Sentry DSN not configured, skipping');
    return;
  }

  try {
    // Dynamic import to avoid bundling Sentry when not configured
    const Sentry = await import('@sentry/react');

    Sentry.init({
      dsn,
      environment: import.meta.env.MODE || 'production',
      release: `gigis-playhouse@${import.meta.env.VITE_APP_VERSION || '1.0.0'}`,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: true, // COPPA: mask all text in replays
          blockAllMedia: true, // Don't capture media for child safety
        }),
      ],
      tracesSampleRate: 0.1, // 10% of transactions
      replaysSessionSampleRate: 0.01, // 1% of sessions
      replaysOnErrorSampleRate: 0.5, // 50% of error sessions
      beforeSend(event) {
        // Strip any PII from error events
        if (event.user) {
          delete event.user.email;
          delete event.user.ip_address;
        }
        return event;
      },
    });

    sentryInitialized = true;
    console.log('[Observability] Sentry initialized');
  } catch (error) {
    console.warn('[Observability] Failed to initialize Sentry:', error);
  }
}

export function captureError(error: Error, context?: Record<string, any>) {
  if (!sentryInitialized) {
    console.error('[Error]', error, context);
    return;
  }

  import('@sentry/react').then(Sentry => {
    Sentry.captureException(error, { extra: context });
  });
}

export function setUser(userId: string, role?: string) {
  if (!sentryInitialized) return;

  import('@sentry/react').then(Sentry => {
    Sentry.setUser({ id: userId, role });
  });
}

// ─── PostHog Product Analytics ───────────────────────────────────────────────

interface PostHogInstance {
  capture: (event: string, properties?: Record<string, any>) => void;
  identify: (userId: string, properties?: Record<string, any>) => void;
  reset: () => void;
  opt_out_capturing: () => void;
  opt_in_capturing: () => void;
}

let posthog: PostHogInstance | null = null;

export async function initPostHog() {
  const apiKey = import.meta.env.VITE_POSTHOG_KEY;
  if (!apiKey) {
    console.log('[Observability] PostHog key not configured, skipping');
    return;
  }

  try {
    const PostHog = await import('posthog-js');
    PostHog.default.init(apiKey, {
      api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
      autocapture: false, // Manual events only for COPPA compliance
      capture_pageview: true,
      capture_pageleave: true,
      persistence: 'localStorage',
      disable_session_recording: true, // COPPA: no session recording for kids
      respect_dnt: true,
    });

    posthog = PostHog.default as any;
    console.log('[Observability] PostHog initialized');
  } catch (error) {
    console.warn('[Observability] Failed to initialize PostHog:', error);
  }
}

// ─── Analytics Events ────────────────────────────────────────────────────────

export function trackEvent(event: string, properties?: Record<string, any>) {
  posthog?.capture(event, {
    ...properties,
    timestamp: new Date().toISOString(),
  });
}

export function identifyUser(userId: string, traits?: Record<string, any>) {
  posthog?.identify(userId, traits);
}

export function resetAnalytics() {
  posthog?.reset();
}

// ─── Pre-defined Events ──────────────────────────────────────────────────────

export const Analytics = {
  // Auth events
  signUp: () => trackEvent('user_signed_up'),
  signIn: () => trackEvent('user_signed_in'),
  signOut: () => trackEvent('user_signed_out'),

  // Onboarding
  onboardingStarted: () => trackEvent('onboarding_started'),
  onboardingCompleted: () => trackEvent('onboarding_completed'),
  childAdded: (ageBand: string) => trackEvent('child_added', { ageBand }),

  // Learning
  lessonStarted: (domain: string, lessonId: string) => trackEvent('lesson_started', { domain, lessonId }),
  lessonCompleted: (domain: string, lessonId: string) => trackEvent('lesson_completed', { domain, lessonId }),
  quizAttempted: (lessonId: string, score: number, passed: boolean) => trackEvent('quiz_attempted', { lessonId, score, passed }),
  flashcardReviewed: (response: string) => trackEvent('flashcard_reviewed', { response }),
  flashcardSessionCompleted: (cardsReviewed: number) => trackEvent('flashcard_session_completed', { cardsReviewed }),

  // Engagement
  dailyPlanViewed: () => trackEvent('daily_plan_viewed'),
  dailyPlanCompleted: () => trackEvent('daily_plan_completed'),
  videoWatched: (channelId: string, duration: number) => trackEvent('video_watched', { channelId, duration }),
  streakAchieved: (days: number) => trackEvent('streak_achieved', { days }),

  // Subscription
  upgradeViewed: () => trackEvent('upgrade_page_viewed'),
  checkoutStarted: (plan: string) => trackEvent('checkout_started', { plan }),
  subscriptionActivated: (plan: string) => trackEvent('subscription_activated', { plan }),

  // PWA
  appInstalled: () => trackEvent('pwa_installed'),
  offlineUsed: () => trackEvent('offline_mode_used'),
};

// ─── Initialize All Observability ────────────────────────────────────────────

export async function initObservability() {
  await Promise.all([
    initSentry(),
    initPostHog(),
  ]);
}
