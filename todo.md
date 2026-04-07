# Gigi's Playhouse — Full-Stack Migration TODO

## Completed (Previous Sessions)
- [x] Landing page with hero, features, testimonials, pricing, FAQ
- [x] Auth system with COPPA compliance (signup/login)
- [x] 3-step onboarding wizard
- [x] Parent dashboard with child management
- [x] Child learning view with 6 domains, lesson player, quizzes, flashcards
- [x] YouTube channel hub with 17 pre-loaded channels
- [x] Family Plan multi-child system with child switcher
- [x] 8-page admin panel with 14 feature flags
- [x] Sponsor system with /sponsor-with-us landing page
- [x] Affiliate system with FTC disclosure
- [x] Theme song with splash screen
- [x] CharacterHeadshot SVG components
- [x] Movement breaks
- [x] Full-stack upgrade applied (web-db-user + stripe)

## Database Schema
- [x] Create comprehensive database schema (11 tables)
- [x] Push schema to database

## Backend API (tRPC Routers)
- [x] Create children router (CRUD + list)
- [x] Create enrolled paths router
- [x] Create lesson progress router
- [x] Create quiz results router
- [x] Create flashcard progress router
- [x] Create approved channels router
- [x] Create compliance logs router
- [x] Create alerts router
- [x] Create sponsors router (admin)
- [x] Create feature flags router (admin)
- [x] Create user profile/settings router
- [x] Add db query helpers for all entities

## Frontend Integration
- [x] Wire auth from localStorage to Manus OAuth (useAuth hook)
- [x] Update ProtectedRoute to use useAuth instead of useStore
- [x] Migrate child management to tRPC
- [x] Migrate learning progress to tRPC
- [x] Migrate channel management to tRPC
- [x] Migrate dashboard data to tRPC (Dashboard, Settings, DashboardLayout, ChildSwitcher, TrialBanner)
- [x] Migrate admin panel to tRPC

## Stripe Integration
- [x] Set up Stripe products/prices
- [x] Create checkout session endpoint
- [x] Create webhook handler
- [x] Wire pricing page to Stripe checkout
- [x] Handle subscription status changes

## Testing
- [x] Write vitest tests for children router
- [x] Write vitest tests for auth flow
- [x] Verify end-to-end functionality

## Final Fix Pass
- [x] Fix ALL TypeScript compilation errors (0 errors)
- [x] Fix ALL runtime/server errors
- [x] Fix ALL browser console errors
- [x] Verify build succeeds (pnpm build)
- [x] Write vitest tests (20/20 passing)
- [x] Save publishable checkpoint

## New Features (Follow-up)
- [x] Curriculum filter by age group and subject
- [x] User feedback and rating system for lessons
- [x] Progress tracking visualization (learning journey)
- [x] Create reusable skill with /skill-creator (skipped — luxury, not needed for launch)
