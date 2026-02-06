---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-01-06'
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-bmadFitopi-2026-01-03.md
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - README.md
workflowType: 'architecture'
project_name: 'bmadFitopi'
user_name: 'Ata'
date: '2026-01-06'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

پروژه شامل 37 Functional Requirement در 7 دسته اصلی است:

1. **Onboarding & Accounts (4 FR):** احراز هویت OTP-based، مدیریت پروفایل
2. **Programs & Goal Setup (5 FR):** کاتالوگ برنامه‌های 8 هفته‌ای، انتخاب track (3%/5%/7%)
3. **Calorie Logging (7 FR):** ثبت کالری از متن/عکس با AI estimation، fallback path، تاریخچه
4. **Daily Check-ins & Coaching (9 FR):** چک‌این روزانه، پیام‌رسانی real-time با کوچ (AI + Human)، recovery flow، quit-risk detection
5. **Weight Tracking (2 FR):** ثبت و نمایش تاریخچه وزن
6. **Subscription & Trial (5 FR):** Trial 7 روزه، paywall، subscription management
7. **Admin/Support (5 FR):** مدیریت کاتالوگ برنامه‌ها، troubleshooting، monitoring

**Non-Functional Requirements:**

15 NFR که معماری را شکل می‌دهند:

- **Performance:** Time-to-interactive < 3s (p95) موبایل، activation flow < 5s، real-time messaging < 2s
- **Reliability:** عدم از دست رفتن داده‌های core، graceful degradation در خطای AI
- **Security:** Encryption (transit + at rest)، RBAC، OTP rate limiting
- **Integration:** Resilient external integrations (AI, Payment) با timeout و error handling
- **Scalability:** ~200 DAU با headroom برای spikes 2-3x
- **Data Retention:** Long-term retention با قابلیت تنظیم

**Scale & Complexity:**

- Primary domain: Full-stack Web Application (Next.js + tRPC)
- Complexity level: Medium
- Estimated architectural components: 8-10 major components
  - Authentication & Authorization
  - Program Management
  - Calorie Logging & AI Integration
  - Real-time Messaging (Coach)
  - Check-in System
  - Weight Tracking
  - Subscription & Payment
  - Admin/Support Dashboard

### Technical Constraints & Dependencies

**Technology Stack (از PRD):**
- Framework: Next.js (App Router) + React
- API Layer: tRPC (typed end-to-end)
- Real-time: tRPC subscriptions (با polling fallback برای MVP)
- Database: Prisma (از project structure)
- Styling: Tailwind CSS + shadcn/ui

**Platform Strategy:**
- MVP: Web app (mobile-first responsive)
- Future: Native mobile app
- Browser support: Chrome, Safari, Firefox (desktop + mobile)

**External Dependencies:**
- AI API برای calorie estimation (text + photo) - نیاز به abstraction layer
- Payment provider برای subscription management
- OTP service provider با rate limiting
- Storage provider برای photo uploads (local برای MVP، cloud برای scale)

**UX Constraints (از UX Design):**
- RTL/Persian language support (Vazirmatn font)
- Mobile-first design
- Real-time chat experience (با graceful degradation)
- PWA optional (اگر ساده باشد)

**Regulatory Constraints:**
- Non-medical positioning (wellness/coaching only)
- No clinical claims or medical advice

### Cross-Cutting Concerns Identified

1. **Real-time Communication:**
   - Coach messaging نیازمند real-time transport
   - Strategy: Polling برای MVP، migration path به tRPC subscriptions
   - Graceful degradation در صورت قطع اتصال
   - State management برای conversation history

2. **AI Integration Resilience:**
   - Abstraction layer برای AI API (`CalorieEstimationService` interface)
   - Error handling برای AI estimation failures
   - Fallback path برای حفظ habit loop (حتی اگر ساده باشد - "log pending")
   - Cost + latency management
   - Caching strategy برای calorie estimates (avoid duplicate AI calls)

3. **Role-Based Access Control:**
   - User, Admin/Support, Human Coach roles
   - Authorization layer در middleware/API (نه فقط frontend)
   - Data isolation و permission boundaries
   - Audit trail برای admin actions

4. **Error Handling & User Experience:**
   - Centralized error handler برای تبدیل خطاها به user-safe messages
   - Non-judgmental error messaging
   - Clear recovery paths
   - State preservation در خطاها

5. **Data Consistency:**
   - Payment state consistency checks
   - Background job برای payment reconciliation (NFR12)
   - Core tracking events durability
   - Subscription state synchronization

6. **Background Processing:**
   - Payment reconciliation job (24h SLA)
   - Quit-risk detection analysis (FR22)
   - Scheduled tasks برای program progress tracking

7. **Storage Strategy:**
   - Photo upload storage: Local برای MVP، cloud migration path
   - Structured logging برای troubleshooting (خصوصاً AI failures)
   - Data retention configuration

8. **Internationalization (i18n):**
   - Persian language support
   - RTL layout handling
   - Date/time formatting (Jalali calendar)

### Architectural Strategies (از Party Mode Analysis)

**Real-time Strategy:**
- MVP: Polling-based messaging برای کاهش پیچیدگی اولیه
- Migration path: tRPC subscriptions برای scale
- Graceful degradation: Fallback به polling در صورت قطع real-time

**AI Integration Strategy:**
- Abstraction layer: `CalorieEstimationService` interface
- Fallback path: "Log pending" mechanism برای حفظ habit loop
- Caching: Cache calorie estimates برای duplicate entries
- Error handling: User-safe messages + retry mechanism

**Background Jobs Strategy:**
- Payment reconciliation: Scheduled job برای consistency checks
- Quit-risk detection: Background analysis برای behavioral signals
- Program progress: Scheduled updates برای week tracking

**Storage Strategy:**
- MVP: Local storage برای photo uploads
- Scale: Cloud migration path (S3 یا مشابه)
- Structured logging: Centralized logging برای operational signals

**Testing Strategy:**
- Unit tests: Core business logic (calorie estimation, quit-risk detection)
- Integration tests: API endpoints, database operations
- E2E tests: Critical user journeys (activation, trial-to-paid)

## Starter Template Evaluation

### Primary Technology Domain

**Full-stack Web Application** بر اساس تحلیل project requirements:
- Next.js (App Router) برای frontend و backend
- tRPC برای type-safe API layer
- Prisma برای database ORM
- React برای UI framework

### Starter Options Considered

**پروژه فعلی با create-t3-app (v7.40.0) راه‌اندازی شده است.**

**تحلیل Starter Template موجود:**

پروژه از T3 Stack starter template استفاده می‌کند که شامل:
- Next.js 15.2.3 (App Router)
- React 19.0.0
- tRPC 11.0.0
- Prisma 6.6.0
- NextAuth 5.0.0-beta.25
- Tailwind CSS 4.0.15
- TypeScript 5.8.2

**سازگاری با Requirements:**
- ✅ Next.js + tRPC: کاملاً سازگار با PRD requirements
- ✅ Prisma: مناسب برای database operations
- ✅ Tailwind CSS: سازگار با UX Design requirements (shadcn/ui)
- ⚠️ NextAuth: نیاز به تغییر - PRD به OTP-based authentication اشاره دارد

### Selected Starter: T3 Stack (create-t3-app)

**Rationale for Selection:**

1. **سازگاری کامل با Stack:** T3 Stack دقیقاً همان تکنولوژی‌هایی را فراهم می‌کند که در PRD مشخص شده است (Next.js + tRPC + Prisma)

2. **Type Safety:** tRPC end-to-end type safety برای کاهش bugs و بهبود developer experience

3. **Production Ready:** T3 Stack یک starter template production-ready است که best practices را دنبال می‌کند

4. **Maintenance:** T3 Stack به‌طور فعال maintain می‌شود و community support قوی دارد

5. **Flexibility:** ساختار T3 Stack به اندازه‌ای flexible است که می‌توانیم authentication را از NextAuth به OTP-based تغییر دهیم

**Initialization Command:**

```bash
# پروژه قبلاً با این command راه‌اندازی شده:
npx create-t3-app@latest fitopi-v0.2

# یا برای پروژه جدید:
npx create-t3-app@latest <project-name> \
  --nextAuth \
  --prisma \
  --tailwind \
  --trpc
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript 5.8.2 با strict mode
- ES2022 target
- ESNext modules
- Path aliases: `~/*` → `./src/*`

**Styling Solution:**
- Tailwind CSS 4.0.15
- PostCSS configuration
- Prettier plugin برای Tailwind class sorting
- Global CSS support

**Build Tooling:**
- Next.js 15.2.3 با Turbopack (dev mode)
- TypeScript compilation
- ESLint configuration
- Prettier formatting

**Testing Framework:**
- نیاز به اضافه کردن: Vitest یا Jest برای unit tests
- نیاز به اضافه کردن: Playwright یا Cypress برای E2E tests
- (T3 Stack به‌صورت پیش‌فرض testing framework ندارد)

**Code Organization:**
- App Router structure: `src/app/`
- API routes: `src/app/api/`
- Server code: `src/server/`
- Client utilities: `src/trpc/`
- tRPC routers: `src/server/api/routers/`
- Database: Prisma schema در `prisma/schema.prisma`

**Development Experience:**
- Hot reloading با Turbopack
- TypeScript strict checking
- ESLint + Prettier برای code quality
- Environment variable validation با `@t3-oss/env-nextjs`
- Prisma Studio برای database inspection

**Modifications Required for bmadFitopi:**

1. **Authentication:**
   - **Decision:** استفاده از NextAuth با Custom OTP Provider (Kavenegar)
   - NextAuth v5 از custom providers پشتیبانی می‌کند
   - ایجاد Custom Provider برای Kavenegar OTP integration
   - استفاده از Kavenegar API برای ارسال OTP via SMS
   - Add rate limiting برای OTP requests (NextAuth built-in یا custom middleware)
   - **Alternative:** اگر NextAuth برای OTP مناسب نبود، می‌توان از Kavenegar SDK مستقیم استفاده کرد و session management را با NextAuth sessions handle کرد

2. **Real-time Messaging:**
   - Implement polling-based messaging برای MVP
   - Prepare migration path به tRPC subscriptions

3. **Storage (Photo Upload):**
   - **Decision:** ساده‌ترین روش - Next.js API Route با `formidable` یا `multer`
   - برای MVP: ذخیره فایل‌ها در `public/uploads` یا `public/temp` (local filesystem)
   - Add file validation (type, size limits)
   - Add cleanup job برای temporary files
   - **Future:** Migration path به cloud storage (S3, Cloudinary) برای scale

4. **Background Jobs:**
   - **Constraint:** عدم استفاده از Vercel
   - **Options:**
     - Next.js API Routes با cron triggers (external cron service مثل cron-job.org)
     - Dedicated worker process با Node.js cron library
     - Queue system (BullMQ با Redis) برای complex jobs
   - Implement payment reconciliation job
   - Implement quit-risk detection analysis
   - Implement program progress tracking

5. **Testing:**
   - **Decision:** Vitest + Playwright (سازگار با T3 Stack)
   - Vitest برای unit tests و integration tests
   - Playwright برای E2E tests (بهتر از Cypress برای Next.js)
   - Setup tRPC testing utilities
   - Setup Prisma test database (Docker Compose یا test environment)
   - Mock Kavenegar API برای testing
   - Set up CI/CD pipeline (GitHub Actions یا GitLab CI)

6. **Internationalization:**
   - Add Persian language support
   - Add RTL layout handling (`dir="rtl"` در root layout)
   - Add Jalali calendar support (`jalaali-js` یا `date-fns-jalali`)
   - Add Vazirmatn font loading

**Architectural Decisions Summary:**

**Authentication Strategy:**
- Primary: NextAuth v5 با Custom Kavenegar OTP Provider
- Fallback: Direct Kavenegar SDK integration با NextAuth sessions
- Rate limiting: NextAuth middleware یا custom implementation

**Photo Upload Strategy:**
- MVP: Next.js API Route + local filesystem storage
- File handling: `formidable` یا `multer` library
- **Storage Abstraction Layer:** `StorageService` interface برای photo upload
  - Implementation: `LocalStorageService` برای MVP
  - Future: `SupabaseStorageService` برای production migration
  - Benefits: Easy migration path, testable, consistent API
- Future: Cloud storage migration (Supabase Storage)

**Background Jobs Strategy:**
- MVP: Next.js API Routes + external cron service
- Alternative: Node.js cron library در dedicated process
- Scale: Queue system (BullMQ + Redis) برای complex workflows

**Testing Strategy:**
- Framework: Vitest (unit/integration) + Playwright (E2E)
- Test database: Prisma test environment یا Docker Compose
- Mocking: Kavenegar API, external services
- **Seed Data:** Required seed file برای:
  - Programs (initial 8-week programs)
  - SubscriptionPlans (trial, monthly, yearly)
  - Test users (for E2E tests)
- **Schema Validation Tests:** Prisma schema validation
- **Relation Tests:** Cascade delete behavior
- **Query Performance Tests:** Index effectiveness
- **Type Safety Tests:** Zod schema validation برای CheckIn.answers

**Note:** پروژه قبلاً با T3 Stack راه‌اندازی شده است. تغییرات بالا باید به‌صورت incremental اضافه شوند، نه re-initialization.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Data Architecture (Prisma schema design)
- Authentication & Authorization (NextAuth + Kavenegar OTP)
- API Error Handling (tRPC built-in)
- Database Strategy (Local dev, Supabase production)

**Important Decisions (Shape Architecture):**
- Photo Upload Strategy (Local filesystem MVP)
- Background Jobs Strategy (External cron)
- Rate Limiting (Simple implementation)
- State Management (React Query + Context, no global state for MVP)

**Deferred Decisions (Post-MVP):**
- Caching Strategy (Not needed for MVP)
- Global State Management (Deferred if not critical)
- Advanced monitoring (Basic logging for MVP)

### Data Architecture

**Database Choice:**
- **Development:** Local PostgreSQL (Docker یا local install)
- **Production:** Supabase PostgreSQL (managed service)
- **ORM:** Prisma 6.6.0 (from T3 Stack)

**Data Modeling Approach:**

**Schema Structure:**
- Prisma schema در `prisma/schema.prisma`
- Generator output: `../generated/prisma`
- PostgreSQL provider

**Core Models:**

1. **User** (Extended from NextAuth)
   - Fields: `id`, `name`, `email`, `phoneNumber`, `role`, `trialEndsAt`
   - Role enum: USER, ADMIN, COACH
   - Relations: accounts, sessions, programs, calorieLogs, checkIns, weightLogs, coachMessages, subscription

2. **Program** (8-week Programs Catalog)
   - Fields: `id`, `name`, `description`, `durationWeeks` (default 8), `isActive`
   - Admin-managed: No (hard-coded for MVP, admin can't edit)
   - **Future Consideration:** Program versioning system for A/B testing and program changes
   - User can: Delete/start new program (via UserProgram)

3. **UserProgram** (User's Active Program)
   - Fields: `id`, `userId`, `programId`, `track` (EASY/MEDIUM/HARD), `startWeight`, `goalWeight`, `startDate`, `endDate`, `status`, `dailyCalorieLimit`
   - Track enum: EASY (3%), MEDIUM (5%), HARD (7%)
   - Status enum: ACTIVE, COMPLETED, CANCELLED, PAUSED
   - **Sprint Changes 2026-01-29:** اضافه شدن `dailyCalorieLimit` (number) برای محاسبه و ذخیره کالری مجاز روزانه
   - Indexes: `[userId, status]`, `[userId, startDate]`

4. **CalorieLog** (Calorie Tracking)
   - Fields: `id`, `userId`, `loggedAt`, `source` (PHOTO/TEXT), `photoPath`, `textInput`, `estimatedCalories`, `aiModel`, `aiConfidence`, `status`, `proteinGrams`, `carbsGrams`, `fatGrams`
   - Source enum: PHOTO, TEXT
   - Status enum: PENDING (AI failed/fallback), CONFIRMED (AI success), DISCARDED
   - **Sprint Changes 2026-01-29:** 
     - اضافه شدن `proteinGrams`, `carbsGrams`, `fatGrams` (optional numbers) برای macronutrients
     - `loggedAt` می‌تواند تاریخ گذشته باشد (تا 30 روز گذشته)
   - Photo storage: Local filesystem path (`public/uploads` یا `public/temp`)
   - Index: `[userId, loggedAt]`

5. **ActivityLog** (Activity & Calorie Burn Tracking) - **NEW**
   - Fields: `id`, `userId`, `activityType`, `duration` (minutes), `caloriesBurned`, `recordedAt`, `createdAt`
   - **Sprint Changes 2026-01-29:** مدل جدید برای ثبت فعالیت‌ها و کالری مصرفی
   - Activity types: پیاده‌روی, دویدن, شنا, etc. (string)
   - Index: `[userId, recordedAt]`

6. **CheckIn** (Daily Check-ins)
   - Fields: `id`, `userId`, `checkedAt`, `answers` (JSON), `createdAt`, `updatedAt`
   - Answers: JSON format برای dynamic questions/answers (ساده‌تر برای MVP)
   - **Type Safety:** Zod schema برای JSON validation (maintain type safety even with JSON)
   - **Note:** MVP decision - JSON format may need migration to structured schema for analytics
   - Purpose: Help coach model provide better guidance
   - Constraints: One check-in per day per user (`@@unique([userId, checkedAt])`)
   - Index: `[userId, checkedAt]`

7. **WeightLog** (Weight Tracking)
   - Fields: `id`, `userId`, `recordedAt`, `weightKg`, `note`
   - Index: `[userId, recordedAt]`

8. **CoachMessage** (Coach Communication)
   - Fields: `id`, `userId`, `role` (USER/COACH/SYSTEM), `messageType`, `content`, `metadata` (JSON), `createdAt`
   - Role enum: USER, COACH (human), SYSTEM (AI)
   - MessageType enum: PLAIN, CHECK_IN_RESPONSE, RECOVERY_GUIDANCE, TIP, ERROR
   - Metadata: برای recovery flow, quit-risk signals, etc.
   - Index: `[userId, createdAt]`

9. **SubscriptionPlan** (Subscription Plans Catalog)
   - Fields: `id`, `code`, `name`, `description`, `billingPeriod`, `priceCents`, `currency` (default "IRR"), `features` (JSON), `isActive`

10. **UserSubscription** (User's Subscription)
   - Fields: `id`, `userId` (unique), `planId`, `status`, `startsAt`, `expiresAt`, `cancelledAt`, `willAutoRenew`, `latestPaymentProvider`, `latestPaymentRef`
   - Status enum: NONE, TRIAL, ACTIVE, PAST_DUE, CANCELED, EXPIRED
   - Index: `[status]`

**Data Validation Strategy:**
- Zod schemas برای tRPC input validation
- Prisma schema validation
- Database constraints (unique, foreign keys)

**Migration Strategy:**
- Prisma migrations: `prisma migrate dev` برای development
- Migration files در `prisma/migrations/`
- Seeding: Seed file برای initial data (Programs, SubscriptionPlans) - required for testing

**Schema Design Notes (MVP Decisions):**
- **CheckIn.answers JSON:** MVP decision for simplicity. May need migration to structured schema for future analytics.
- **Program hard-coded:** MVP decision. Future admin features may require schema changes.
- **UserSubscription.userId unique:** MVP decision. Future subscription history may require schema changes.
- **Photo storage local:** MVP decision. Migration to Supabase Storage requires abstraction layer.

**Caching Strategy:**
- **MVP:** No caching layer (deferred to post-MVP)
- Rationale: MVP scale (~200 DAU) doesn't require caching
- Future: Redis یا in-memory cache برای calorie estimates, program data

**Indexing Strategy:**
- User queries: `userId` + timestamp fields
- Program queries: `userId` + `status`
- Check-in: Unique constraint on `[userId, checkedAt]`
- Weight logs: `userId` + `recordedAt` for history queries
- Activity logs: `userId` + `recordedAt` for history queries
- Coach messages: `userId` + `createdAt` for conversation history (optimized for memory system)

### Authentication & Security

**Authentication Method:**
- **Primary:** NextAuth v5 با Custom Kavenegar OTP Provider
- **Fallback:** Direct Kavenegar SDK integration با NextAuth sessions
- **OTP Service:** Kavenegar API برای SMS OTP
- **Phone Number:** Required field در User model

**Authorization Patterns (RBAC):**
- **Roles:** USER (default), ADMIN, COACH
- **Role Storage:** `User.role` field (enum)
- **Permission Checking:** Middleware در tRPC routers
- **Data Isolation:** User can only access own data (enforced in queries)
- **Admin Access:** Admin can view all users, manage programs (read-only for MVP)
- **Coach Access:** Coach can view assigned users' timeline, send messages

**Security Middleware:**
- **Rate Limiting:** Simple implementation (NextAuth middleware یا custom)
  - OTP requests: Rate limit per phone number
  - API calls: Per-user rate limits
  - Strategy: ساده‌ترین روش (library یا custom middleware)
- **CORS:** Next.js default (configured for production domain)
- **Input Validation:** Zod schemas در tRPC procedures

**Data Encryption:**
- **At Rest:** PostgreSQL native encryption (Supabase managed)
- **In Transit:** HTTPS/TLS (automatic با Next.js)
- **Sensitive Fields:** Phone numbers, weights, calorie logs encrypted at database level

**API Security Strategy:**
- **Authentication:** NextAuth session-based
- **Authorization:** Role-based checks در tRPC middleware
- **Error Handling:** tRPC built-in error codes (no sensitive data exposure)

### API & Communication Patterns

**API Design:**
- **Pattern:** tRPC 11.0.0 (from T3 Stack)
- **Type Safety:** End-to-end TypeScript types
- **Routers:** Organized in `src/server/api/routers/`
- **Procedures:** Query (read), Mutation (write), Subscription (future)

**Error Handling Standards:**
- **Strategy:** tRPC built-in error handling
- **Error Codes:** tRPC standard codes (UNAUTHORIZED, FORBIDDEN, NOT_FOUND, etc.)
- **User-Safe Messages:** Transform technical errors to user-friendly messages
- **Logging:** Structured logging برای errors (خصوصاً AI failures)

**Rate Limiting Strategy:**
- **Implementation:** ساده‌ترین روش (library یا custom)
- **OTP Endpoints:** Strict rate limiting (per phone number)
- **API Endpoints:** Per-user rate limits
- **Calorie Estimation:** Rate limiting برای AI API calls

**Real-time Communication:**
- **MVP:** Polling-based messaging
- **Future:** tRPC subscriptions migration path
- **Graceful Degradation:** Fallback به polling در صورت قطع real-time

### Frontend Architecture

**State Management:**
- **Server State:** React Query (via tRPC hooks)
- **Local State:** useState/useReducer
- **Global State:** Context API (if needed for MVP)
- **Global State Management:** Deferred (Zustand/Jotai not needed for MVP)

**Component Architecture:**
- **UI Library:** shadcn/ui (Tailwind CSS based)
- **Custom Components:** Feature-specific components در `src/app/components/`
- **RTL Support:** `dir="rtl"` در root layout, RTL-aware components
- **Theme Management:** `next-themes` برای Light/Dark theme toggle (Sprint Changes 2026-01-29)
- **Component Structure:**
  - AppShell + BottomNav (**3 tabs: Home, Tracker, Coach** - Sprint Changes 2026-01-29: Profile tab حذف شد)
  - HomeDashboardCard (با Profile editing section ادغام شده)
  - CoachChat (full-page, بدون action buttons - Sprint Changes 2026-01-29)
  - TrackerLogFoodDialog (با validation, past date, macronutrients - Sprint Changes 2026-01-29)
  - CheckInInlineCard
  - **Sprint Changes 2026-01-29 - New Components:**
    - ThemeToggle (next-themes integration)
    - CalorieLimitBarChart (Recharts BarChart - 7 days calorie vs limit)
    - WeightHistoryLineChart (Recharts LineChart - weight history)
    - ValidationErrorBanner (برای validation errors)
    - UnifiedAuthPage (ادغام Signin/Signup/Recover)

**Routing Strategy:**
- **Framework:** Next.js App Router (from T3 Stack)
- **Structure:** `src/app/` directory
- **Navigation:** Bottom navigation برای main tabs
- **Deep Linking:** Support برای direct navigation

**Performance Optimization:**
- **Code Splitting:** Next.js automatic
- **Image Optimization:** Next.js Image component
- **Bundle Optimization:** Next.js built-in optimization
- **Lazy Loading:** Dynamic imports برای heavy components

### Infrastructure & Deployment

**Hosting Strategy:**
- **Platform:** لیارا (Iranian Vercel-like service)
- **Deployment:** Next.js application
- **Database:** 
  - Development: Local PostgreSQL
  - Production: Supabase PostgreSQL
- **Storage:**
  - Development: Local filesystem (`public/uploads`)
  - Production: Supabase Storage (future migration)

**CI/CD Pipeline:**
- **Platform:** GitHub Actions یا GitLab CI
- **Workflow:**
  1. Run tests (Vitest + Playwright)
  2. Build Next.js application
  3. Deploy to لیارا
- **Testing:** Automated tests در CI pipeline

**Environment Configuration:**
- **Validation:** `@t3-oss/env-nextjs` (from T3 Stack)
- **Variables:** `.env.local` برای development, لیارا environment variables برای production
- **Secrets:** Kavenegar API key, Database URLs, etc.

**Monitoring & Logging:**
- **MVP:** Basic console logging
- **Error Tracking:** Structured logging برای errors
- **Performance:** Next.js built-in metrics
- **Future:** Sentry یا LogRocket برای production monitoring

**Scaling Strategy:**
- **MVP:** Single instance (لیارا)
- **Database:** Supabase managed PostgreSQL (auto-scaling)
- **Storage:** Local filesystem → Supabase Storage migration
- **Future:** Horizontal scaling با load balancer (if needed)

### Decision Impact Analysis

**Implementation Sequence:**

1. **Phase 1: Foundation**
   - Prisma schema setup
   - Database migrations
   - NextAuth + Kavenegar OTP integration
   - Basic tRPC routers

2. **Phase 2: Core Features**
   - User registration/login
   - Program selection
   - Calorie logging (text + photo)
   - Check-in system

3. **Phase 3: Coaching**
   - Coach messaging (polling)
   - AI integration (calorie estimation)
   - Recovery flow

4. **Phase 4: Subscription**
   - Trial management
   - Paywall
   - Subscription handling

5. **Phase 5: Admin/Support**
   - Admin dashboard
   - User lookup
   - Support tools

**Cross-Component Dependencies:**

- **Authentication → All Features:** All features require authenticated user
- **CalorieLog → Coach:** Coach messages based on calorie logs
- **CheckIn → Coach:** Coach responses based on check-in answers
- **UserProgram → All Tracking:** Program context affects all tracking features
- **Subscription → Coaching:** Coaching features gated by subscription status
- **Photo Upload → CalorieLog:** Photo storage needed for calorie estimation
- **StorageService → Photo Upload:** Abstraction layer enables easy migration

**Implementation Considerations (از Party Mode Analysis):**

- **Storage Abstraction:** `StorageService` interface برای photo upload (local → Supabase migration)
- **Type Safety:** Zod schema برای CheckIn.answers JSON validation
- **Program Versioning:** Future consideration برای program changes و A/B testing
- **Testing Infrastructure:** Seed data برای Programs و SubscriptionPlans
- **Schema Evolution:** MVP decisions documented for future migration planning

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
5 major areas where AI agents could make different choices:
- Naming conventions (files, components, procedures)
- Project structure organization
- API response formats
- Error handling patterns
- Loading state management

### Naming Patterns

**Database Naming Conventions:**
- **Models:** PascalCase (از Prisma schema) - `User`, `CalorieLog`, `UserProgram`
- **Fields:** camelCase - `userId`, `loggedAt`, `phoneNumber`
- **Relations:** camelCase - `userPrograms`, `calorieLogs`, `checkIns`
- **Indexes:** Prisma auto-generated یا explicit naming در schema

**tRPC Router Naming:**
- **Router files:** `kebab-case.ts` - `calorie-log.ts`, `user-program.ts`, `check-in.ts`
- **Router exports:** `camelCase` + `Router` suffix - `calorieLogRouter`, `userProgramRouter`
- **Procedures:** `camelCase` - `create`, `getLatest`, `getByDate`, `updateStatus`
- **Procedure types:** Use `query` برای reads, `mutation` برای writes

**Component Naming:**
- **React components:** PascalCase - `UserCard`, `CalorieLogDialog`, `CheckInCard`
- **Component files:** PascalCase.tsx - `UserCard.tsx`, `HomeDashboardCard.tsx`
- **Custom hooks:** `use` prefix + camelCase - `useCalorieLog`, `useCheckIn`, `useCoachMessages`
- **Shared components:** در `src/app/_components/` با PascalCase

**Service/Utility Naming:**
- **Services:** PascalCase + `Service` suffix - `StorageService`, `CalorieEstimationService`, `OTPService`
- **Utilities:** camelCase - `formatDate`, `validatePhoneNumber`, `parseCalorieEstimate`
- **Service files:** PascalCase.ts - `StorageService.ts`, `CalorieEstimationService.ts`

**API Naming:**
- **tRPC procedures:** camelCase - `getUserProgram`, `createCalorieLog`, `updateWeight`
- **Route parameters:** camelCase در tRPC input - `{ userId: string }`
- **Query parameters:** camelCase - `startDate`, `endDate`, `status`

### Structure Patterns

**Project Organization:**

```
src/
├── app/                          # Next.js App Router
│   ├── _components/              # Shared UI components (shadcn/ui)
│   ├── api/                      # API routes
│   │   ├── auth/                 # NextAuth routes
│   │   └── trpc/                 # tRPC handler
│   ├── (routes)/                 # Feature routes (optional grouping)
│   └── layout.tsx                # Root layout
├── server/
│   ├── api/
│   │   ├── routers/              # tRPC routers (kebab-case.ts)
│   │   │   ├── calorie-log.ts
│   │   │   ├── user-program.ts
│   │   │   └── check-in.ts
│   │   ├── root.ts               # Root router
│   │   └── trpc.ts               # tRPC setup
│   ├── services/                 # Business logic services
│   │   ├── StorageService.ts
│   │   ├── CalorieEstimationService.ts
│   │   └── OTPService.ts
│   ├── utils/                    # Server utilities
│   ├── auth/                     # NextAuth config
│   └── db.ts                     # Prisma client
├── trpc/                         # tRPC client setup
│   ├── react.tsx
│   ├── server.ts
│   └── query-client.ts
└── lib/                          # Shared utilities
    └── utils.ts
```

**Test Organization:**
- **Unit tests:** Co-located با `*.test.ts` - `calorie-log.test.ts`, `StorageService.test.ts`
- **Integration tests:** `__tests__/integration/` directory
- **E2E tests:** `e2e/` directory (Playwright)
- **Test utilities:** `__tests__/utils/` برای test helpers

**Component Organization:**
- **Feature components:** `src/app/components/` - `HomeDashboardCard.tsx`, `CoachChat.tsx`
- **Shared UI:** `src/app/_components/` - shadcn/ui components
- **Services:** `src/server/services/` - Business logic layer
- **Utilities:** `src/lib/` برای shared, `src/server/utils/` برای server-only

**File Structure Patterns:**
- **Config files:** Root level یا `src/config/` - `next.config.js`, `tailwind.config.ts`
- **Environment:** `.env.local` برای development, لیارا env vars برای production
- **Static assets:** `public/` directory
- **Documentation:** Root level یا `docs/` directory

### Format Patterns

**API Response Formats:**

**tRPC Response:**
- **Direct return:** No wrapper object - `return data;`
- **Success:** Direct data return - `return calorieLog;`
- **Errors:** tRPC built-in `TRPCError` - `throw new TRPCError({ code: "NOT_FOUND" })`
- **No wrapper:** Avoid `{ data: ..., error: ... }` pattern

**Error Format:**
- **tRPC errors:** `TRPCError` با standard codes:
  - `UNAUTHORIZED` - Authentication required
  - `FORBIDDEN` - Authorization failed
  - `NOT_FOUND` - Resource not found
  - `BAD_REQUEST` - Invalid input
  - `INTERNAL_SERVER_ERROR` - Server error
- **User-safe messages:** Transform در error formatter یا UI layer
- **Logging:** Structured logging برای technical errors (server-side)

**Data Exchange Formats:**
- **JSON field naming:** camelCase - `userId`, `loggedAt`, `phoneNumber`
- **Date format:** ISO 8601 strings در API - `"2026-01-06T10:30:00Z"`
- **Database storage:** UTC timestamps (Prisma DateTime)
- **UI display:** Jalali calendar (Persian) با `jalaali-js` library
- **Boolean:** `true`/`false` (not 1/0)
- **Null handling:** Use `null` (not `undefined` in JSON)

**API Status Codes:**
- **tRPC:** Uses error codes (not HTTP status codes directly)
- **Next.js API routes:** Standard HTTP status codes (200, 400, 401, 404, 500)

### Communication Patterns

**State Management Patterns:**
- **Server state:** React Query (via tRPC hooks) - `useQuery`, `useMutation`
- **Local state:** `useState` برای UI-specific state
- **Global state:** Context API (if needed for MVP)
- **State updates:** Immutable updates (React best practices)
- **Loading states:** `isLoading`, `isFetching` از React Query hooks

**Event System Patterns:**
- **No custom event system:** Use tRPC subscriptions (future) یا polling (MVP)
- **Real-time updates:** Polling-based برای MVP
- **Future:** tRPC subscriptions برای real-time messaging

**Action Naming:**
- **Mutations:** Verb-based - `createCalorieLog`, `updateWeight`, `deleteCheckIn`
- **Queries:** Noun-based یا `get` prefix - `getUserProgram`, `getCalorieLogs`, `getLatestWeight`

### Process Patterns

**Error Handling Patterns:**

**Server-side (tRPC):**
- **Validation errors:** Zod validation در input schema
- **Business logic errors:** `TRPCError` با appropriate code
- **External API errors:** Catch و transform به `TRPCError`
- **Logging:** Structured logging برای all errors (خصوصاً AI failures)

**Client-side:**
- **Error handling:** `error` object از React Query hooks
- **User messages:** Transform technical errors به user-friendly messages
- **Error boundaries:** React Error Boundaries برای component errors
- **Retry logic:** React Query automatic retry (configurable)

**Loading State Patterns:**
- **Naming:** `isLoading` (initial load) یا `isFetching` (refetch)
- **Global loading:** React Query `isLoading` state
- **Local loading:** `useState` برای UI-specific loading (form submissions)
- **Loading UI:** Consistent loading indicators (shadcn/ui Skeleton component)

**Validation Patterns:**
- **Input validation:** Zod schemas در tRPC procedures
- **Client validation:** Zod schemas در forms (React Hook Form integration)
- **Database validation:** Prisma schema constraints
- **Validation timing:** Client-side برای UX, server-side برای security

**Retry Implementation:**
- **tRPC/React Query:** Automatic retry با exponential backoff
- **Manual retry:** User-triggered retry buttons در error states
- **AI API retry:** Configurable retry برای calorie estimation API

### Enforcement Guidelines

**All AI Agents MUST:**

1. **Follow naming conventions:**
   - Router files: `kebab-case.ts`
   - Components: `PascalCase.tsx`
   - Services: `PascalCaseService.ts`
   - Procedures: `camelCase`

2. **Use established patterns:**
   - tRPC procedures: `query` برای reads, `mutation` برای writes
   - Error handling: `TRPCError` با standard codes
   - Loading states: React Query hooks
   - Validation: Zod schemas

3. **Maintain structure:**
   - Services در `src/server/services/`
   - Routers در `src/server/api/routers/`
   - Components در `src/app/components/`
   - Tests co-located با `*.test.ts`

4. **Follow format standards:**
   - API responses: Direct return (no wrapper)
   - Date format: ISO 8601 strings
   - JSON fields: camelCase
   - Error format: tRPC `TRPCError`

**Pattern Enforcement:**
- **Code review:** Check patterns در PR reviews
- **Linting:** ESLint rules برای naming conventions
- **TypeScript:** Type safety ensures consistency
- **Documentation:** Patterns documented in architecture doc

### Pattern Examples

**Good Examples:**

**tRPC Router:**
```typescript
// src/server/api/routers/calorie-log.ts
export const calorieLogRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ textInput: z.string(), source: z.enum(["PHOTO", "TEXT"]) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.calorieLog.create({
        data: {
          userId: ctx.session.user.id,
          textInput: input.textInput,
          source: input.source,
        },
      });
    }),
  
  getLatest: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.calorieLog.findFirst({
      where: { userId: ctx.session.user.id },
      orderBy: { loggedAt: "desc" },
    });
  }),
});
```

**Service:**
```typescript
// src/server/services/StorageService.ts
export class StorageService {
  async uploadPhoto(file: File): Promise<string> {
    // Implementation
  }
}
```

**Component:**
```typescript
// src/app/components/CalorieLogDialog.tsx
export function CalorieLogDialog() {
  const { data, isLoading } = api.calorieLog.getLatest.useQuery();
  // ...
}
```

**Anti-Patterns:**

❌ **Wrong:** Router file named `CalorieLog.ts` (should be `calorie-log.ts`)
❌ **Wrong:** Procedure named `get_latest` (should be `getLatest`)
❌ **Wrong:** Service named `storageService.ts` (should be `StorageService.ts`)
❌ **Wrong:** API response `{ data: result }` (should be direct return)
❌ **Wrong:** Date format `"2026/01/06"` (should be ISO 8601)
❌ **Wrong:** Error handling `throw new Error()` (should use `TRPCError`)

## Project Structure & Boundaries

### Complete Project Directory Structure

```
fitopi-v0.2/
├── README.md
├── package.json
├── pnpm-lock.yaml
├── next.config.js
├── tsconfig.json
├── eslint.config.js
├── prettier.config.js
├── postcss.config.js
├── next-env.d.ts
├── .env.local                    # Local environment variables
├── .env.example                  # Example environment variables
├── .gitignore
├── .github/
│   └── workflows/
│       └── ci.yml                # CI/CD pipeline
├── prisma/
│   ├── schema.prisma             # Prisma schema
│   ├── migrations/               # Database migrations
│   └── seed.ts                   # Seed data (Programs, SubscriptionPlans)
├── public/
│   ├── favicon.ico
│   ├── uploads/                  # Photo uploads (local storage MVP)
│   └── temp/                     # Temporary files
├── generated/
│   └── prisma/                   # Generated Prisma client
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout (RTL, Persian)
│   │   ├── page.tsx              # Home page
│   │   ├── globals.css           # Global styles
│   │   ├── _components/          # Shared UI components (shadcn/ui)
│   │   │   ├── ui/               # shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   └── ...
│   │   │   └── post.tsx          # Example component (to be removed)
│   │   ├── components/           # Feature components
│   │   │   ├── AppShell.tsx      # App shell with BottomNav
│   │   │   ├── BottomNav.tsx     # Bottom navigation (3 tabs: Home, Tracker, Coach - Sprint Changes 2026-01-29)
│   │   │   ├── HomeDashboardCard.tsx
│   │   │   ├── CoachChat.tsx     # Coach chat interface
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── TrackerLogFoodDialog.tsx
│   │   │   ├── CheckInInlineCard.tsx
│   │   │   ├── ErrorBanner.tsx   # AI error handling
│   │   │   └── AIAnalyzingState.tsx
│   │   ├── (home)/               # Home route group
│   │   │   └── page.tsx
│   │   ├── (tracker)/            # Tracker route group
│   │   │   └── page.tsx
│   │   ├── (coach)/              # Coach route group
│   │   │   └── page.tsx
│   │   ├── (auth)/               # Unified Auth route group (Sprint Changes 2026-01-29)
│   │   │   └── page.tsx          # Unified auth page (Signin/Signup/Recover merged)
│   │   └── api/                  # API routes
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts  # NextAuth handler
│   │       ├── trpc/
│   │       │   └── [trpc]/
│   │       │       └── route.ts  # tRPC handler
│   │       └── upload/           # Photo upload endpoint
│   │           └── route.ts
│   ├── server/
│   │   ├── api/
│   │   │   ├── routers/          # tRPC routers (kebab-case.ts)
│   │   │   │   ├── calorie-log.ts        # UPDATED - Sprint Changes 2026-01-29 (validation, past date, macronutrients)
│   │   │   │   ├── user-program.ts
│   │   │   │   ├── check-in.ts           # UPDATED - Sprint Changes 2026-01-29 (fix daily flow)
│   │   │   │   ├── weight-log.ts          # UPDATED - Sprint Changes 2026-01-29 (merged into Tracker)
│   │   │   │   ├── activity-log.ts        # NEW - Sprint Changes 2026-01-29
│   │   │   │   ├── coach-message.ts       # UPDATED - Sprint Changes 2026-01-29 (conversation memory)
│   │   │   │   ├── subscription.ts
│   │   │   │   ├── program.ts
│   │   │   │   └── admin.ts
│   │   │   ├── root.ts           # Root router
│   │   │   └── trpc.ts           # tRPC setup
│   │   ├── services/             # Business logic services
│   │   │   ├── StorageService.ts
│   │   │   │   ├── LocalStorageService.ts
│   │   │   │   └── SupabaseStorageService.ts (future)
│   │   │   ├── CalorieEstimationService.ts
│   │   │   ├── CalorieInputValidationService.ts  # NEW - Sprint Changes 2026-01-29
│   │   │   ├── DailyCalorieLimitService.ts        # NEW - Sprint Changes 2026-01-29
│   │   │   ├── ActivityEstimationService.ts       # NEW - Sprint Changes 2026-01-29
│   │   │   ├── OTPService.ts
│   │   │   └── CoachService.ts                    # UPDATED - Sprint Changes 2026-01-29 (memory system)
│   │   ├── utils/                # Server utilities
│   │   │   ├── date.ts           # Jalali date utilities
│   │   │   ├── validation.ts
│   │   │   └── rate-limit.ts
│   │   ├── auth/
│   │   │   ├── config.ts         # NextAuth config
│   │   │   └── index.ts
│   │   └── db.ts                 # Prisma client
│   ├── trpc/                     # tRPC client setup
│   │   ├── react.tsx
│   │   ├── server.ts
│   │   └── query-client.ts
│   ├── lib/                      # Shared utilities
│   │   ├── utils.ts
│   │   └── cn.ts                 # className utility
│   ├── styles/
│   │   └── globals.css           # Global styles
│   └── env.js                    # Environment validation
├── __tests__/                    # Test utilities
│   ├── utils/
│   │   ├── test-utils.tsx
│   │   └── db-utils.ts
│   └── integration/              # Integration tests
├── e2e/                          # E2E tests (Playwright)
│   ├── auth.spec.ts
│   ├── calorie-log.spec.ts
│   └── coach.spec.ts
└── start-database.sh             # Local database setup script
```

### Architectural Boundaries

**API Boundaries:**

**tRPC API:**
- **Entry Point:** `src/app/api/trpc/[trpc]/route.ts`
- **Routers:** `src/server/api/routers/*.ts`
- **Procedures:** `query` (read) و `mutation` (write)
- **Authentication:** `protectedProcedure` middleware
- **Authorization:** Role-based checks در procedures

**Next.js API Routes:**
- **NextAuth:** `src/app/api/auth/[...nextauth]/route.ts`
- **Photo Upload:** `src/app/api/upload/route.ts`
  - **Authentication:** Middleware برای authenticated requests
  - **Validation:** File size limits (max 10MB), file type validation (image/*)
  - **Error Handling:** User-safe error messages
- **Cron Jobs:** `src/app/api/cron/` (payment-reconciliation, quit-risk-detection)
  - **Authentication:** Secret key یا IP whitelist برای security
- **Boundary:** tRPC برای business logic، Next.js routes برای file uploads و cron jobs

**External API Integrations:**
- **Kavenegar OTP:** `src/server/services/OTPService.ts`
- **AI Calorie Estimation:** `src/server/services/CalorieEstimationService.ts`
- **Payment Provider:** `src/server/services/PaymentService.ts` (future)

**Component Boundaries:**

**Frontend Components:**
- **Shared UI:** `src/app/_components/ui/` - shadcn/ui components (reusable)
- **Feature Components:** `src/app/components/` - bmadFitopi-specific components
- **Component Hierarchy:**
  - **AppShell** → Root layout wrapper
    - **BottomNav** → Navigation component (3 tabs: Home, Tracker, Coach - Sprint Changes 2026-01-29)
    - **Feature Pages** → Home (با Profile section), Tracker (با Weight logging), Coach
      - **Feature Components** → HomeDashboardCard, TrackerLogFoodDialog, etc.
- **Communication:** Props passing, React Context برای shared state
- **State Management:** React Query برای server state، useState برای local state

**Service Layer Boundaries:**
- **Services:** `src/server/services/` - Business logic abstraction
- **Storage Abstraction:** `StorageService` interface برای photo upload
- **AI Integration:** `CalorieEstimationService` interface برای AI API
- **Sprint Changes 2026-01-29 - New Services:**
  - **CalorieInputValidationService:** Validation ورودی کالری قبل از ارسال به AI (confidence threshold: 0.7)
  - **DailyCalorieLimitService:** محاسبه کالری مجاز روزانه بر اساس track و goal weight
  - **ActivityEstimationService:** محاسبه کالری مصرفی از فعالیت‌ها (activity type + duration + user weight)
  - **CoachService (Updated):** حافظه مکالمه (conversation memory) - حداقل 20 پیام قبلی در context
- **Communication:** Services called from tRPC routers
- **Testing:** Services should be testable with dependency injection
  - External APIs (Kavenegar, AI) should be injectable for testing
  - Database access through Prisma client (mockable)
  - Service interfaces enable easy mocking در tests

**Data Boundaries:**

**Database Access:**
- **ORM:** Prisma (`src/server/db.ts`)
- **Schema:** `prisma/schema.prisma`
- **Migrations:** `prisma/migrations/`
- **Boundary:** All database access through Prisma client

**Data Flow:**
1. **Client → tRPC:** React Query hooks call tRPC procedures
2. **tRPC → Service:** Routers call services for business logic
3. **Service → Database:** Services use Prisma client
4. **Service → External API:** Services call external APIs (Kavenegar, AI)

### Requirements to Structure Mapping

**FR Category: Onboarding & Accounts (FR1-FR4)**
- **Components:** `src/app/components/` (Auth forms)
- **Routers:** `src/server/api/routers/auth.ts` (if needed)
- **Services:** `src/server/services/OTPService.ts`
- **Database:** `prisma/schema.prisma` (User model)
- **Tests:** `__tests__/integration/auth.test.ts`, `e2e/auth.spec.ts`

**FR Category: Programs (FR5-FR9)**
- **Components:** `src/app/components/ProgramSelection.tsx`
- **Routers:** `src/server/api/routers/program.ts`, `user-program.ts`
- **Database:** `prisma/schema.prisma` (Program, UserProgram models)
- **Tests:** `program.test.ts`, `user-program.test.ts`

**FR Category: Calorie Logging (FR10-FR16) - Updated Sprint Changes 2026-01-29**
- **Components:** `src/app/components/TrackerLogFoodDialog.tsx`, `ErrorBanner.tsx`, `ValidationErrorBanner.tsx`, `CalorieLimitBarChart.tsx`
- **Routers:** `src/server/api/routers/calorie-log.ts` (updated: validation, past date, macronutrients)
- **Services:** 
  - `src/server/services/CalorieEstimationService.ts`, `StorageService.ts`
  - **NEW:** `CalorieInputValidationService.ts` (validation قبل از AI)
  - **NEW:** `DailyCalorieLimitService.ts` (محاسبه کالری مجاز)
- **API Routes:** `src/app/api/upload/route.ts`
- **Database:** `prisma/schema.prisma` (CalorieLog model - updated: macronutrients fields)
- **Tests:** `calorie-log.test.ts`, `e2e/calorie-log.spec.ts`

**FR Category: Daily Check-ins & Coaching (FR17-FR25) - Updated Sprint Changes 2026-01-29**
- **Components:** `src/app/components/CheckInInlineCard.tsx`, `CoachChat.tsx`, `MessageBubble.tsx` (updated: no action buttons)
- **Routers:** `src/server/api/routers/check-in.ts` (updated: fix daily flow), `coach-message.ts` (updated: conversation memory)
- **Services:** `src/server/services/CoachService.ts` (updated: `generateResponseWithMemory()` method)
- **Database:** `prisma/schema.prisma` (CheckIn, CoachMessage models)
- **Tests:** `check-in.test.ts`, `coach-message.test.ts`

**FR Category: Weight Tracking (FR26-FR27) - Updated Sprint Changes 2026-01-29**
- **Components:** `src/app/components/WeightHistoryLineChart.tsx` (NEW), Weight logging section در Tracker page (merged)
- **Routers:** `src/server/api/routers/weight-log.ts` (updated: merged into Tracker)
- **Database:** `prisma/schema.prisma` (WeightLog model)
- **Tests:** `weight-log.test.ts`

**FR Category: Activity Logging (NEW - Sprint Changes 2026-01-29)**
- **Components:** Activity logging section در Tracker page
- **Routers:** `src/server/api/routers/activity-log.ts` (NEW)
- **Services:** `src/server/services/ActivityEstimationService.ts` (NEW)
- **Database:** `prisma/schema.prisma` (ActivityLog model - NEW)
- **Tests:** `activity-log.test.ts`

**FR Category: Subscription & Trial (FR28-FR32)**
- **Components:** `src/app/components/SubscriptionStatus.tsx`, `Paywall.tsx`
- **Routers:** `src/server/api/routers/subscription.ts`
- **Services:** `src/server/services/PaymentService.ts` (future)
- **Database:** `prisma/schema.prisma` (SubscriptionPlan, UserSubscription models)
- **Tests:** `subscription.test.ts`

**FR Category: Admin/Support (FR33-FR37)**
- **Components:** `src/app/components/admin/` (Admin dashboard)
- **Routers:** `src/server/api/routers/admin.ts`
- **Database:** `prisma/schema.prisma` (User.role = ADMIN)
- **Tests:** `admin.test.ts`

**Cross-Cutting Concerns:**

**Authentication & Authorization:**
- **Middleware:** `src/server/api/trpc.ts` (protectedProcedure)
- **Config:** `src/server/auth/config.ts`
- **Services:** `src/server/services/OTPService.ts`
- **Components:** Auth forms در `src/app/components/`

**Error Handling:**
- **tRPC:** `src/server/api/trpc.ts` (errorFormatter)
- **Components:** `src/app/components/ErrorBanner.tsx`
- **Services:** Error handling در service layer

**Photo Upload:**
- **API Route:** `src/app/api/upload/route.ts`
  - **Authentication:** Middleware برای authenticated requests
  - **Validation:** File size limits (max 10MB), file type validation (image/*)
  - **Error Handling:** User-safe error messages
- **Service:** `src/server/services/StorageService.ts`
- **Storage:** `public/uploads/` (MVP), Supabase Storage (future)

**Background Jobs:**
- **Cron Jobs:** External cron service calls Next.js API routes
- **Routes:** `src/app/api/cron/` (payment-reconciliation, quit-risk-detection)
- **Services:** Business logic در `src/server/services/`

### Integration Points

**Internal Communication:**

**Frontend → Backend:**
- **tRPC:** React Query hooks (`api.calorieLog.create.useMutation()`)
- **File Upload:** FormData به `src/app/api/upload/route.ts`
- **Real-time:** Polling-based messaging (MVP)

**Backend → Database:**
- **Prisma Client:** `src/server/db.ts` در تمام services و routers
- **Migrations:** `prisma migrate dev` برای schema changes

**Service Layer:**
- **Routers → Services:** tRPC routers call services
- **Services → External APIs:** Services call Kavenegar, AI APIs
- **Services → Storage:** Services use StorageService interface

**External Integrations:**

**Kavenegar OTP:**
- **Service:** `src/server/services/OTPService.ts`
- **Integration:** Kavenegar API calls
- **Usage:** NextAuth custom provider

**AI Calorie Estimation:**
- **Service:** `src/server/services/CalorieEstimationService.ts`
- **Integration:** External AI API (to be determined)
- **Usage:** Calorie logging flow

**Payment Provider:**
- **Service:** `src/server/services/PaymentService.ts` (future)
- **Integration:** Payment provider API (to be determined)
- **Usage:** Subscription management

**Supabase (Production):**
- **Database:** Supabase PostgreSQL connection
- **Storage:** Supabase Storage برای photo uploads (future)
- **Migration:** Local PostgreSQL → Supabase

**Data Flow:**

**Calorie Logging Flow (Updated - Sprint Changes 2026-01-29):**
1. User uploads photo/text → `src/app/api/upload/route.ts` (if photo)
2. File saved → `StorageService.uploadPhoto()` (if photo)
3. tRPC mutation → `calorie-log.create`
4. **NEW:** Router calls → `CalorieInputValidationService.validateInput()` (validation قبل از AI)
5. If validation passed → Router calls → `CalorieEstimationService.estimate()` (با macronutrients request)
6. AI API call → External AI service (returns calories + macronutrients)
7. Result saved → Prisma `CalorieLog.create()` (با macronutrients fields)
8. Response → React Query updates UI

**Coach Messaging Flow (Updated - Sprint Changes 2026-01-29):**
1. User sends message → `coach-message.create` mutation
2. Router saves → Prisma `CoachMessage.create()`
3. Router fetches → Last 20 messages from database (conversation history)
4. Router fetches → Complete user profile (not just dataSummary)
5. Router calls → `CoachService.generateResponseWithMemory()` (با conversation history + full profile)
6. AI/Coach response → Generated با context کامل
7. Response saved → Prisma `CoachMessage.create()`
8. UI updates → React Query refetch

**Activity Logging Flow (NEW - Sprint Changes 2026-01-29):**
1. User logs activity → `activity-log.create` mutation
2. Router calls → `ActivityEstimationService.estimateCaloriesBurned()`
3. Calories calculated → Based on activity type, duration, user weight
4. Result saved → Prisma `ActivityLog.create()`
5. Response → React Query updates UI (Bar chart updated)

**Subscription Flow:**
1. Trial check → `subscription.getStatus` query
2. Paywall shown → If trial expired
3. Payment → External payment provider
4. Webhook → `src/app/api/payment/webhook/route.ts`
5. Subscription updated → Prisma `UserSubscription.update()`
6. Access granted → Role-based checks

### File Organization Patterns

**Configuration Files:**
- **Root level:** `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.js`
- **Environment:** `.env.local` (gitignored), `.env.example` (committed)
- **Prisma:** `prisma/schema.prisma`, `prisma/migrations/`

**Source Organization:**
- **App Router:** `src/app/` - Next.js pages و API routes
- **Server:** `src/server/` - Backend logic (routers, services, utils)
- **Client:** `src/trpc/` - tRPC client setup
- **Shared:** `src/lib/` - Shared utilities

**Test Organization:**
- **Unit tests:** Co-located با `*.test.ts`
- **Integration tests:** `__tests__/integration/`
- **E2E tests:** `e2e/` directory
- **Test utilities:** `__tests__/utils/`
  - **Test Database:** Prisma test database setup
    - Option 1: Docker Compose برای test database
    - Option 2: Prisma test environment
    - Configuration در `__tests__/utils/db-utils.ts`
  - **Service Testing:** Dependency injection برای services
    - Mock external APIs (Kavenegar, AI) در tests
    - Mock Prisma client برای unit tests
  - **File Upload Testing:** Mock file uploads در E2E tests

**Asset Organization:**
- **Static assets:** `public/` directory
- **Photo uploads:** `public/uploads/` (MVP)
- **Temporary files:** `public/temp/`
- **Fonts:** `public/fonts/` (Vazirmatn)

### Development Workflow Integration

**Development Server Structure:**
- **Next.js dev:** `pnpm dev` - Runs Next.js development server
- **Database:** Local PostgreSQL (Docker یا local install)
- **Prisma Studio:** `pnpm db:studio` - Database inspection
- **Hot reloading:** Automatic با Turbopack

**Build Process Structure:**
- **Build command:** `pnpm build` - Next.js production build
- **Type checking:** `pnpm typecheck` - TypeScript validation
- **Linting:** `pnpm lint` - ESLint checks
- **Formatting:** `pnpm format:write` - Prettier formatting

**Deployment Structure:**
- **Platform:** لیارا (Iranian hosting)
- **Database:** Supabase PostgreSQL (production)
- **Storage:** Local filesystem → Supabase Storage (migration)
- **Environment:** لیارا environment variables
- **CI/CD:** GitHub Actions workflow

### Implementation Considerations (از Party Mode Analysis)

**API Route Security:**
- **Authentication Middleware:** برای Next.js API routes (upload, cron)
- **File Upload Validation:** File size limits (10MB) و type validation در API route
- **Cron Job Security:** Secret key یا IP whitelist برای cron endpoints

**Service Layer Testing:**
- **Dependency Injection:** Services should accept dependencies (external APIs, database) برای testability
- **Interface-based Design:** Service interfaces enable easy mocking
- **Test Database:** Prisma test database setup (Docker Compose یا test environment)

**Component Organization:**
- **Clear Hierarchy:** AppShell → BottomNav → Feature Pages → Feature Components
- **Reusability:** Shared components در `_components/ui/`, feature-specific در `components/`

**Testing Infrastructure:**
- **Test Database:** Prisma test database configuration
- **Service Mocking:** Dependency injection برای external APIs
- **File Upload Testing:** Mock file uploads در E2E tests
- **Test Coverage:** Critical paths (calorie logging, coach messaging) must have coverage

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
- ✅ **Technology Stack:** Next.js 15.2.3 + React 19.0.0 + tRPC 11.0.0 + Prisma 6.6.0 - همه versions compatible هستند
- ✅ **Authentication:** NextAuth v5 با Kavenegar OTP - سازگار و قابل پیاده‌سازی
- ✅ **Database:** Prisma + PostgreSQL (local dev, Supabase production) - seamless migration path
- ✅ **Storage:** Local filesystem → Supabase Storage با abstraction layer - migration path واضح
- ✅ **No Conflicts:** هیچ تصمیم متضادی وجود ندارد

**Pattern Consistency:**
- ✅ **Naming Conventions:** Consistent across all areas (kebab-case files, PascalCase components, camelCase procedures)
- ✅ **Structure Patterns:** Aligned with T3 Stack و Next.js App Router
- ✅ **Communication Patterns:** tRPC patterns consistent با technology stack
- ✅ **Error Handling:** tRPC built-in errors در تمام procedures

**Structure Alignment:**
- ✅ **Project Structure:** Supports all architectural decisions
- ✅ **Component Boundaries:** Clear separation (shared UI, feature components, services)
- ✅ **Service Layer:** Proper abstraction برای business logic
- ✅ **Integration Points:** Well-defined boundaries برای external APIs

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**

**Onboarding & Accounts (FR1-FR4):** ✅
- NextAuth + Kavenegar OTP integration
- User model با phoneNumber field
- OTP rate limiting strategy
- Profile management support

**Programs (FR5-FR9):** ✅
- Program و UserProgram models
- Program selection routers
- Track selection (3%/5%/7%)
- Program status tracking

**Calorie Logging (FR10-FR16):** ✅
- CalorieLog model با PHOTO/TEXT sources
- StorageService برای photo upload
- CalorieEstimationService برای AI integration
- Fallback path (PENDING status)
- Edit/delete capabilities

**Daily Check-ins & Coaching (FR17-FR25):** ✅
- CheckIn model با JSON answers
- CoachMessage model با role (USER/COACH/SYSTEM)
- CoachService برای message generation
- Recovery flow support (metadata field)
- Quit-risk detection (background job)
- Human coach access (role-based)

**Weight Tracking (FR26-FR27):** ✅
- WeightLog model
- Record و view history support

**Subscription & Trial (FR28-FR32):** ✅
- SubscriptionPlan و UserSubscription models
- Trial management (trialEndsAt در User)
- Paywall implementation path
- Subscription status tracking

**Admin/Support (FR33-FR37):** ✅
- Admin router برای user lookup
- Role-based access (ADMIN role)
- Operational signals support

**Non-Functional Requirements Coverage:**

**Performance (NFR1-NFR3):** ✅
- Next.js optimization strategies
- React Query برای efficient data fetching
- Polling-based messaging برای MVP (meets 2s requirement)
- Performance targets documented

**Reliability (NFR4-NFR6):** ✅
- Fallback path برای AI failures (PENDING status)
- Prisma durable storage
- User-safe error messages
- Graceful degradation patterns

**Security (NFR7-NFR10):** ✅
- HTTPS/TLS (Next.js automatic)
- Database encryption (Supabase managed)
- OTP-based authentication
- Rate limiting strategy
- RBAC implementation

**Integration (NFR11-NFR12):** ✅
- Timeout و error handling در services
- Payment reconciliation job (background job)
- External API resilience patterns

**Scalability (NFR13-NFR14):** ✅
- ~200 DAU target documented
- Graceful degradation strategy
- Database indexing strategy

**Data Retention (NFR15):** ✅
- Long-term retention strategy
- Configurable retention support

### Implementation Readiness Validation ✅

**Decision Completeness:**
- ✅ **All Critical Decisions:** Documented with versions و rationale
- ✅ **Technology Versions:** All verified و documented
- ✅ **Integration Patterns:** Fully specified
- ✅ **Migration Paths:** Clear برای future changes

**Structure Completeness:**
- ✅ **Complete Directory Tree:** All files و directories defined
- ✅ **Component Boundaries:** Well-defined
- ✅ **Integration Points:** Clearly specified
- ✅ **Requirements Mapping:** Complete mapping از FRs به structure

**Pattern Completeness:**
- ✅ **Naming Conventions:** Comprehensive coverage
- ✅ **Structure Patterns:** Complete project organization
- ✅ **Communication Patterns:** tRPC patterns fully specified
- ✅ **Process Patterns:** Error handling, loading states, validation documented
- ✅ **Examples Provided:** Good examples و anti-patterns documented

### Gap Analysis Results

**Critical Gaps:** None
- همه critical decisions documented
- همه blocking requirements covered
- Structure complete برای implementation

**Important Gaps:**
- **AI API Selection:** Calorie estimation API provider باید انتخاب شود (implementation decision)
- **Payment Provider:** Payment provider باید انتخاب شود (implementation decision)
- **Rate Limiting Library:** Specific library باید انتخاب شود (implementation decision)

**Nice-to-Have Gaps:**
- **Advanced Monitoring:** Basic logging برای MVP، advanced monitoring برای future
- **Performance Monitoring:** Next.js built-in metrics برای MVP
- **Documentation:** Additional implementation examples could be helpful

### Validation Issues Addressed

**No Critical Issues Found:** ✅
- Architecture is coherent و complete
- All requirements are supported
- Implementation patterns are comprehensive

**Minor Considerations:**
- Some implementation decisions (AI API, payment provider) will be made during development
- These are not architectural decisions but implementation choices

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (Medium complexity, ~200 DAU)
- [x] Technical constraints identified (لیارا hosting, Supabase database)
- [x] Cross-cutting concerns mapped (8 major concerns identified)

**✅ Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified (Next.js 15, tRPC 11, Prisma 6, React 19)
- [x] Integration patterns defined (Kavenegar OTP, AI API, Payment)
- [x] Performance considerations addressed (NFR1-NFR3)

**✅ Implementation Patterns**
- [x] Naming conventions established (comprehensive coverage)
- [x] Structure patterns defined (complete project organization)
- [x] Communication patterns specified (tRPC patterns)
- [x] Process patterns documented (error handling, loading, validation)

**✅ Project Structure**
- [x] Complete directory structure defined (all files and directories)
- [x] Component boundaries established (clear separation)
- [x] Integration points mapped (internal and external)
- [x] Requirements to structure mapping complete (all FR categories mapped)

### Architecture Readiness Assessment

**Overall Status:** ✅ **READY FOR IMPLEMENTATION**

**Confidence Level:** **HIGH** - Architecture is comprehensive, coherent, and complete

**Key Strengths:**
- ✅ Complete technology stack specification با verified versions
- ✅ Comprehensive requirements coverage (all 37 FRs و 15 NFRs)
- ✅ Clear implementation patterns برای consistency
- ✅ Well-defined project structure با complete mapping
- ✅ Service layer abstraction برای testability و maintainability
- ✅ Migration paths documented برای future changes
- ✅ MVP decisions clearly documented برای future evolution

**Areas for Future Enhancement:**
- Advanced monitoring و observability (post-MVP)
- Caching layer implementation (when scale requires)
- Real-time subscriptions migration (from polling)
- Global state management (if needed)
- Advanced analytics (CheckIn.answers migration)

### Implementation Handoff

**AI Agent Guidelines:**

- **Follow Architectural Decisions:** تمام تصمیمات معماری باید دقیقاً طبق documentation پیاده‌سازی شوند
- **Use Implementation Patterns:** تمام patterns (naming, structure, communication) باید consistently استفاده شوند
- **Respect Project Structure:** تمام فایل‌ها باید در directories مشخص شده قرار گیرند
- **Refer to Architecture Document:** برای هر سوال معماری، به این document مراجعه شود
- **Service Layer Pattern:** Business logic در services، routers فقط input validation و service calls
- **Error Handling:** همیشه از tRPC `TRPCError` استفاده شود، نه `throw new Error()`
- **Type Safety:** Zod schemas برای validation، TypeScript برای type safety

**First Implementation Priority:**

1. **Prisma Schema Implementation:**
   - Update `prisma/schema.prisma` با models تعریف شده
   - Run `prisma migrate dev` برای create migrations
   - Create seed file برای Programs و SubscriptionPlans

2. **Service Layer Setup:**
   - Create `StorageService` interface
   - Implement `LocalStorageService`
   - Create `CalorieEstimationService` interface
   - Create `OTPService` برای Kavenegar integration

3. **tRPC Routers:**
   - Create routers: `calorie-log.ts`, `user-program.ts`, `check-in.ts`, etc.
   - Implement procedures با Zod validation
   - Add role-based authorization checks

4. **Frontend Components:**
   - Setup AppShell و BottomNav
   - Create feature components (HomeDashboardCard, CoachChat, etc.)
   - Implement RTL support در root layout

**Implementation Sequence:**
1. Database schema و migrations
2. Service layer (StorageService, OTPService)
3. tRPC routers (core features)
4. Frontend components (UI implementation)
5. Integration testing
6. E2E testing

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** 2026-01-06
**Document Location:** `_bmad-output/planning-artifacts/architecture.md`

### Final Architecture Deliverables

**📋 Complete Architecture Document**

- All architectural decisions documented with specific versions
- Implementation patterns ensuring AI agent consistency
- Complete project structure with all files and directories
- Requirements to architecture mapping (37 FRs + 15 NFRs)
- Validation confirming coherence and completeness

**🏗️ Implementation Ready Foundation**

- **9 Core Architectural Decisions:** Data, Authentication, API, Frontend, Infrastructure
- **5 Implementation Pattern Categories:** Naming, Structure, Format, Communication, Process
- **10+ Architectural Components:** Routers, Services, Components, Models
- **52 Requirements:** All 37 FRs و 15 NFRs fully supported

**📚 AI Agent Implementation Guide**

- Technology stack with verified versions (Next.js 15, tRPC 11, Prisma 6, React 19)
- Consistency rules that prevent implementation conflicts
- Project structure with clear boundaries
- Integration patterns and communication standards

### Implementation Handoff

**For AI Agents:**
This architecture document is your complete guide for implementing **bmadFitopi**. Follow all decisions, patterns, and structures exactly as documented.

**First Implementation Priority:**

1. **Prisma Schema Implementation:**
   - Update `prisma/schema.prisma` با models تعریف شده
   - Run `prisma migrate dev` برای create migrations
   - Create seed file برای Programs و SubscriptionPlans

2. **Service Layer Setup:**
   - Create `StorageService` interface
   - Implement `LocalStorageService`
   - Create `CalorieEstimationService` interface
   - Create `OTPService` برای Kavenegar integration

3. **tRPC Routers:**
   - Create routers: `calorie-log.ts`, `user-program.ts`, `check-in.ts`, etc.
   - Implement procedures با Zod validation
   - Add role-based authorization checks

4. **Frontend Components:**
   - Setup AppShell و BottomNav
   - Create feature components (HomeDashboardCard, CoachChat, etc.)
   - Implement RTL support در root layout

**Development Sequence:**

1. Initialize project using documented starter template (T3 Stack - already done)
2. Set up development environment per architecture (Local PostgreSQL, Prisma)
3. Implement core architectural foundations (Services, Routers, Components)
4. Build features following established patterns
5. Maintain consistency with documented rules

### Quality Assurance Checklist

**✅ Architecture Coherence**

- [x] All decisions work together without conflicts
- [x] Technology choices are compatible (Next.js 15 + tRPC 11 + Prisma 6 + React 19)
- [x] Patterns support the architectural decisions
- [x] Structure aligns with all choices

**✅ Requirements Coverage**

- [x] All functional requirements are supported (37 FRs mapped)
- [x] All non-functional requirements are addressed (15 NFRs covered)
- [x] Cross-cutting concerns are handled (8 major concerns identified)
- [x] Integration points are defined (Kavenegar, AI API, Payment)

**✅ Implementation Readiness**

- [x] Decisions are specific and actionable (versions documented)
- [x] Patterns prevent agent conflicts (comprehensive naming, structure rules)
- [x] Structure is complete and unambiguous (complete directory tree)
- [x] Examples are provided for clarity (good examples و anti-patterns)

### Project Success Factors

**🎯 Clear Decision Framework**
Every technology choice was made collaboratively with clear rationale, ensuring all stakeholders understand the architectural direction.

**🔧 Consistency Guarantee**
Implementation patterns and rules ensure that multiple AI agents will produce compatible, consistent code that works together seamlessly.

**📋 Complete Coverage**
All project requirements are architecturally supported, with clear mapping from business needs to technical implementation.

**🏗️ Solid Foundation**
The chosen starter template (T3 Stack) and architectural patterns provide a production-ready foundation following current best practices.

---

**Architecture Status:** ✅ **READY FOR IMPLEMENTATION**

**Next Phase:** Begin implementation using the architectural decisions and patterns documented herein.

**Document Maintenance:** Update this architecture when major technical decisions are made during implementation.

---

## Sprint Changes Summary (2026-01-29)

این بخش تغییرات شناسایی شده در Sprint Change Proposal 2026-01-29 و Implementation Plan را خلاصه می‌کند:

### Data Model Changes

**New Models:**
- **ActivityLog:** مدل جدید برای ثبت فعالیت‌ها و کالری مصرفی
  - Fields: `id`, `userId`, `activityType`, `duration`, `caloriesBurned`, `recordedAt`, `createdAt`
  - Index: `[userId, recordedAt]`

**Updated Models:**
- **UserProgram:** اضافه شدن `dailyCalorieLimit` (number) برای محاسبه و ذخیره کالری مجاز روزانه
- **CalorieLog:** 
  - اضافه شدن `proteinGrams`, `carbsGrams`, `fatGrams` (optional numbers) برای macronutrients
  - `loggedAt` می‌تواند تاریخ گذشته باشد (تا 30 روز گذشته)

### Service Layer Changes

**New Services:**
- **CalorieInputValidationService:** Validation ورودی کالری قبل از ارسال به AI
  - Method: `validateInput(textInput?, photoPath?): Promise<ValidationResult>`
  - Confidence threshold: 0.7
  - False positive rate target: < 5%
- **DailyCalorieLimitService:** محاسبه کالری مجاز روزانه
  - Method: `calculateDailyLimit(userProgram, userProfile): number`
  - Formula: بر اساس track (3%/5%/7%) و goal weight
- **ActivityEstimationService:** محاسبه کالری مصرفی از فعالیت‌ها
  - Method: `estimateCaloriesBurned(activityType, duration, userWeight): number`

**Updated Services:**
- **CoachService:** اضافه شدن `generateResponseWithMemory()` method
  - Parameters: `conversationHistory` (20+ messages), `userProfile` (full profile), `dataSummary`, `userProgram`
  - Context: مربی حداقل 20 پیام قبلی را در context دارد

### Component Architecture Changes

**Navigation Changes:**
- **BottomNav:** از 4 تب (Home/Tracker/Coach/Profile) به 3 تب (Home/Tracker/Coach)
- **Profile tab حذف شد:** Profile editing در Home dashboard ادغام شد
- **Weight route حذف شد:** Weight logging در Tracker page ادغام شد

**New Components:**
- **ThemeToggle:** Toggle بین Light/Dark theme (next-themes)
- **CalorieLimitBarChart:** Bar chart برای کالری (7 روز گذشته) با daily limit reference line (Recharts)
- **WeightHistoryLineChart:** Line chart برای تاریخچه وزن (Recharts)
- **ValidationErrorBanner:** پیام خطا برای validation failures
- **UnifiedAuthPage:** ادغام Signin/Signup/Recover به یک صفحه واحد

**Updated Components:**
- **HomeDashboardCard:** اضافه شدن Profile editing section + Bar chart
- **CoachChat:** حذف action buttons ("کمک می‌خوام", "لغزش داشتم")
- **TrackerLogFoodDialog:** 
  - اضافه شدن validation قبل از AI
  - اضافه شدن past date picker (تا 30 روز گذشته)
  - اضافه شدن macronutrients display
  - ادغام Weight logging section

### Router Changes

**New Routers:**
- **activity-log.ts:** Router جدید برای Activity logging
  - Procedures: `create`, `getHistory`, `getTodayTotal`

**Updated Routers:**
- **calorie-log.ts:** 
  - اضافه شدن validation step قبل از AI
  - اضافه شدن past date support
  - اضافه شدن macronutrients در response
- **coach-message.ts:**
  - اضافه شدن conversation history fetching (20+ messages)
  - اضافه شدن full user profile fetching
  - Update `generateAutoResponse()` و `respondToUserMessage()` برای استفاده از memory
- **check-in.ts:**
  - رفع مشکل daily flow (date handling, unique constraint)
- **weight-log.ts:**
  - ادغام در Tracker page (حذف route جداگانه)

### API & Communication Changes

**Calorie Logging Flow (Updated):**
- اضافه شدن validation step قبل از AI estimation
- اضافه شدن macronutrients در AI response
- اضافه شدن past date support

**Coach Messaging Flow (Updated):**
- اضافه شدن conversation history (20+ messages) در context
- اضافه شدن full user profile (نه فقط dataSummary) در context
- Update AI prompt برای استفاده از memory

**New Flow:**
- **Activity Logging Flow:** Flow جدید برای ثبت فعالیت و کالری مصرفی

### Infrastructure Changes

**Dependencies:**
- **next-themes:** برای theme management (Light/Dark toggle)
- **recharts:** برای charts (Bar chart و Line chart)

**Theme Management:**
- استفاده از `next-themes` برای theme switching
- CSS variables برای theme colors (Light/Dark)
- رفع مشکلات Firefox در theme switching

### Implementation Priority

**Phase 1: Critical Fixes (Weeks 1-3)**
1. Coach Conversation Memory System (CRITICAL)
2. Calorie Input Validation (HIGH)
3. Fix Check-in Daily Flow (HIGH)

**Phase 2: UX Improvements (Weeks 4-5)**
1. Merge Profile into Home
2. Theme Toggle (Light/Dark)
3. Merge Weight into Tracker

**Phase 3: Feature Enhancements (Weeks 6-8)**
1. Daily Calorie Limit & Bar Chart
2. Activity Logging & Calorie Burn
3. Macronutrients Support
4. Past Date Calorie Logging
5. Weight History Line Chart

**Phase 4: Auth Simplification (Week 9)**
1. Unified Auth Page
2. Remove Chat Action Buttons

### Migration Notes

**Database Migrations Required:**
- اضافه کردن `dailyCalorieLimit` به UserProgram
- اضافه کردن `proteinGrams`, `carbsGrams`, `fatGrams` به CalorieLog
- ایجاد جدول ActivityLog

**Code Migration:**
- Update CoachService برای memory system
- Update calorie-log router برای validation
- Update UI components برای navigation changes
- Update theme system برای next-themes

**Breaking Changes:**
- Profile route حذف شده → redirect به Home
- Weight route حذف شده → redirect به Tracker
- Auth routes (signin/signup/recover) → unified `/auth` route

---

**Document Status:** Updated with Sprint Changes 2026-01-29  
**Last Updated:** 2026-01-29
