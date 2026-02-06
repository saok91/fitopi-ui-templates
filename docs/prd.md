---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-bmadFitopi-2026-01-03.md
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 0
workflowType: 'prd'
lastStep: 11
project_name: bmadFitopi
user_name: Ata
date: 2026-01-03
---

# Product Requirements Document - bmadFitopi

**Author:** Ata
**Date:** 2026-01-03

## Executive Summary

bmadFitopi is a coaching-first product designed to help people with overweight (Phase 1) achieve sustainable weight loss and maintain it. The core premise is that most people don’t fail due to lack of information—they fail because they lack consistent coaching: support, accountability, and adaptive guidance when real life disrupts routines (stress, fatigue, social events, sleep disruption, and other context shifts).

Unlike calorie counters, static meal plan apps, and one-off diet courses, bmadFitopi creates an interactive feedback loop. It learns the user’s context through lightweight daily check-ins plus calorie and weekly weight data, detects risk of quitting, and revises guidance and plans accordingly. The core coach is AI-first, with the option of human involvement in early phases if needed.

For MVP, the product will be delivered as a web app (for faster iteration and development comfort), while keeping a clear path to a mobile app experience in later phases.

### What Makes This Special

- Coaching-first and outcomes-first (loss + maintenance), not tracking-first
- Continuous feedback loop that adapts to real behavior and context signals
- A “recovery loop” approach: slips are expected; the plan adjusts to help the user return without shame
- Low-friction onboarding designed for users who are tired of “starting again,” with an immediate first-day win

## Project Classification

**Technical Type:** web_app (MVP), mobile_app (later)
**Domain:** general (wellness / weight-loss coaching)
**Complexity:** low (domain/regulatory), assuming no medical positioning
**Project Context:** Greenfield - new project

## Success Criteria

### User Success

**Primary outcome (per 8-week program):**
- Users choose an 8-week diet/program and hit the selected target by week 8:
  - Easy: 3% body weight reduction in 8 weeks
  - Medium: 5% body weight reduction in 8 weeks
  - Challenging: 7% body weight reduction in 8 weeks
- Success metric: % of users who achieve their selected target by the end of week 8 (per program cohort)

**Maintenance (result durability):**
- Definition: maintained results = weight remains within ±1–2% of body weight
- Metrics:
  - % of users within ±1–2% at 4 weeks after week-8 completion
  - % of users within ±1–2% at 8 weeks after week-8 completion

**Engagement behaviors (leading indicators):**
- Daily check-in adherence:
  - Minimum: user answers daily check-in questions
  - Stronger: user also sends coach messages when needed
  - Metric: % of users completing check-ins on ≥5 days/week (Weeks 1–8)
- Calorie logging adherence:
  - Metric: % of users logging calories on ≥5 days/week (Weeks 1–8)
- Regular weigh-ins:
  - Metric: % of users logging weight at least weekly (Weeks 1–8)

### Business Success

**Primary business KPI (North Star):**
- Signup-to-Paid Conversion (14d): % of users who complete a successful payment within 14 days after signup

**Activation (MVP):**
- First Calorie Log Saved Successfully: the first time a user logs calories (via text and/or photo → AI estimation → parse → save)

**Diagnostic leading indicators (to explain conversion changes):**
- Activation rate (24h): % of new signups who log their first calories within 24 hours
- Habit proxy (7d): % of new signups who log calories at least N times within the first 7 days (N to be tuned after initial data)

**3-month objectives:**
- Total signups: 1,000
- Paid users: 60 (overall paid conversion ≈ 6%)

**12-month objectives:**
- Total signups: 10,000
- Paid users: 413 (overall paid conversion ≈ 4.13%)

**Monetization model:**
- 1-week free trial with full access
- After trial: subscription for ongoing coaching; otherwise limited free tier (e.g., tracking-only)

### Technical Success

**AI calorie estimation integration (core requirement):**
- Calorie logging uses an external AI API to estimate calories from:
  - Text description of what the user ate, and/or
  - A photo submitted by the user
- Success requirements:
  - The AI response can be parsed into a stable, predefined structured format (so it can be saved and used for coaching)
  - Graceful handling for AI failures (retry and/or fallback UX so users don’t hit a dead end)
  - Cost + latency are acceptable for frequent usage (daily logging)

**Reliability & data integrity:**
- Calorie estimates, check-ins, messages, and weight logs are saved reliably and retrievable
- No data loss for core tracking events

**Non-medical positioning constraint:**
- The product is wellness/coaching-first and explicitly avoids medical/clinical claims

### Measurable Outcomes

- Signup-to-Paid Conversion (14d) (primary)
- Activation rate (24h): first calorie log saved
- Habit proxy (7d): repeat calorie logs during trial week
- Program outcomes: % hitting 3%/5%/7% by week 8 (per selected track)
- Maintenance: % staying within ±1–2% at +4 and +8 weeks post-program
- Operational: % successful AI estimate calls (and % failures handled gracefully)

## Product Scope

### MVP - Minimum Viable Product (Web App)

**Core experience:**
- Choose an 8-week diet/program (users can take multiple programs over time; product lifecycle is not limited to a single 8-week run)
- Low-friction onboarding that gets users to a first-day win quickly
- Unified authentication page (signin/signup combined, no separate recovery flow)
- Daily check-ins:
  - Minimum: answer daily check-in questions (fixed to display correctly each day)
  - Optional: send coach messages for additional context/support
- Calorie logging using AI API estimation (text and/or photo input → validation → structured calorie output with macronutrients → stored)
- Activity logging for calorie burn tracking
- Past date calorie logging (up to 30 days ago)
- Daily calorie limit calculation and visualization (bar chart for 7 days)
- Weekly weight logging (minimum viable input + simple history with line chart)
- Coach with conversation memory (maintains context of last 20+ messages)
- Profile management integrated into Home dashboard (3-tab navigation: Home/Tracker/Coach)
- 1-week free trial → subscription paywall after trial

**Out of scope (MVP):**
- Wearables/step counter/smartwatch integrations
- Community/groups/social features
- Deep hormonal tracking as a required dataset
- Advanced analytics dashboards and complex progress charts

### Growth Features (Post-MVP)

- Mobile app delivery (primary long-term form factor)
- Improved calorie estimation UX and quality/confidence handling (as needed)
- More sophisticated plan revision and personalization

### Vision (Future)

- Broader lifestyle coaching beyond weight loss (later phases)
- Optional deeper personalization inputs (privacy-first)
- Integrations (sleep/steps) to improve prediction of “break points”

## User Journeys

**Journey 1: Zahra — “This time I won’t quit” (Happy Path + Activation + Trial-to-Paid)**  
Zahra is 29, has tried dieting multiple times, and she’s tired of restarting. She signs up for bmadFitopi because it promises coaching that adapts when real life hits. On the web app, she picks an 8-week program (easy/medium/challenging) and wants to see if this will be different from calorie trackers she abandoned before.

On day 1, the app pushes her toward a quick win: “log your first meal.” She either types what she ate or uploads a photo. The AI estimates calories and the system saves the log. Zahra immediately feels the key value: logging wasn’t painful, and the coach responds in a human tone instead of judgment. She completes the minimum daily check-in questions that night.

During the first week, she repeats the loop: daily check-in + calorie logging + lightweight coach guidance. When she slips (a stressful day or a social event), the coach reframes it as recoverable and suggests a small next step. By day 6 or 7, Zahra feels this is the first time an app “stays with her” instead of shaming her.

As the 1-week trial ends, the paywall is clear: continued adaptive coaching requires subscription. Zahra converts to paid because she already experienced the difference (low-friction calorie logging + empathetic recovery loop + steady accountability) and doesn’t want to lose momentum.

This journey reveals requirements for:
- Onboarding + program selection
- Fast path to first calorie log (activation)
- AI calorie estimation (text/photo) + reliable saving
- Daily check-ins and coach messaging
- Trial → paywall → subscription conversion flow
- Recovery loop UX (slip-up handling)

---

**Journey 2: Zahra — “The AI failed and I’m about to drop” (Edge Case + Recovery + Retention Risk)**  
On day 2, Zahra tries to log dinner by photo. The AI call times out or returns an unclear result. Zahra’s frustration spikes—this is usually the moment she gives up on apps.

Instead of a dead end, the product offers a graceful fallback: retry, or switch to a minimal manual entry (simple calories estimate or “I ate X” text). The coach acknowledges the frustration (“this shouldn’t be hard”) and keeps the loop alive with the smallest next action. Zahra logs something successfully and ends the day with a check-in.

The next day, she continues. The critical part is that the app didn’t break the habit loop on the first failure; it protected the “first calorie log saved” experience and maintained trust.

This journey reveals requirements for:
- AI failure handling (timeouts, partial results, parse errors)
- Fallback logging path that still counts as a saved calorie log
- Coach messaging patterns for frustration + recovery
- Clear user feedback and error states (no blame, no confusion)

---

**Journey 3: Admin/Support (Same Person) — “Keep programs usable and payments unblocked”**  
In the early MVP, one person handles admin operations and support. They need to manage the catalog of 8-week programs (titles, descriptions, basic structure) and ensure users can start quickly without confusion.

A user reports: “I paid but it still shows trial” or “I can’t access coaching.” The admin/support role checks the user record, subscription status, and key events (signup time, first calorie log, trial start/end). They resolve the issue quickly and restore access, because conversion and retention depend on trust.

They also review basic system health: spikes in AI failures, unusual latency, and common support themes (photo uploads failing, confusing check-in questions, paywall friction). They push small content/settings updates (copy fixes, program description clarifications) to reduce support load.

This journey reveals requirements for:
- Admin surface (program management at minimum)
- Support tooling (user lookup, subscription state, event history)
- Basic monitoring/analytics views for AI failures and conversion funnel
- Operational workflows for refunds/cancellation/resubscription (as needed)

---

**Journey 4: Human Coach — “High-touch saves the user on a risky day”**  
In early phases, a human coach exists as an escalation path. Zahra has a high-risk day: stress + social event + low sleep, and she messages the coach (or the system flags her as at-risk).

The human coach reviews the user’s recent check-ins, calorie logs, and weigh-ins quickly and sends a short, supportive message focused on next action (not perfection). The user feels seen and returns to the plan the next day. The coach interaction remains consistent with the product’s non-medical positioning (coaching/wellness, no clinical claims).

This journey reveals requirements for:
- Coach dashboard (minimal): view user timeline + send message
- Risk signals/escalation triggers (manual or simple rules initially)
- Permissions (coach access to user data)
- Guidance boundaries to avoid medical/clinical positioning
- Conversation history continuity between AI coach and human coach

### Journey Requirements Summary

Across all journeys, bmadFitopi needs capabilities in:
- Onboarding and 8-week program selection
- Calorie logging as the activation moment (fast, low friction)
- AI calorie estimation integration with structured output + graceful fallbacks
- Daily check-ins + coaching loop (AI-first) with recovery behavior
- Trial-to-paid conversion flow and subscription gating
- Admin/support operations (program management + user/subscription troubleshooting)
- Human coach workflow (minimal dashboard + messaging + permissions)

## Innovation & Novel Patterns

### Detected Innovation Areas

**1) Quit-risk detection + timely intervention:**
bmadFitopi treats “quitting” as the primary failure mode and aims to detect early signals of drop-off (based on check-ins, calorie logs, weight cadence, and coach interaction). The product then intervenes with adaptive guidance to keep the user on track.

**2) Recovery loop as a first-class product behavior:**
Instead of punishing slip-ups, the system assumes they will happen and is designed to guide users through recovery steps. This shifts the experience from “perfect adherence” to “resilient continuation,” which is especially important for users who historically quit mid-way.

### Market Context & Competitive Landscape

Many calorie trackers and static meal plan tools provide a plan and expect adherence with little ongoing adaptation. bmadFitopi differentiates by continuously re-tuning the user’s path based on the user’s recent behavior and explicit feedback, operating as an interactive coach rather than a static planner.

### Validation Approach

Because the innovation is behavioral (coaching loop + recovery), validation focuses on coaching engagement as the leading indicator:

- **Primary validation signal:** Increased user interaction with the coach (messages and/or completion of daily check-ins)
- Supporting signals (to connect innovation → business):
  - Activation rate (24h): first calorie log saved
  - Signup-to-Paid Conversion (14d)
  - Habit proxy (7d): repeat calorie logs during trial week

### Risk Mitigation

- If quit-risk detection is inaccurate early on, start with simple, explainable rules and user-reported feedback loops, then iterate.
- Ensure recovery experiences do not feel like failure or judgment; keep interventions short, empathetic, and actionable.
- Avoid medical positioning: coaching/wellness only, no clinical claims or medical advice.

## Web App Specific Requirements

### Project-Type Overview

The MVP will be delivered as a web app built using the T3 stack: React + tRPC with Next.js App Router. While the architecture can be hybrid (server/client rendering patterns), the intended user experience should feel close to an SPA: fast navigation, low friction flows, and high interaction frequency (daily check-ins + logging).

### Technical Architecture Considerations

- **App framework:** Next.js (App Router) + React
- **API layer:** tRPC (typed end-to-end)
- **Real-time needs:** Real-time coach interactions are required (e.g., chat-like experience). Use tRPC real-time capabilities (e.g., subscriptions) where appropriate.
- **Reliability:** Real-time transport should degrade gracefully if connectivity is poor (e.g., fallback to refresh/polling patterns where needed) to avoid breaking the habit loop.
- **Cross-platform UX:** Key flows (first calorie log, daily check-in, paywall) must be reliable and consistent across mobile browsers.

### Browser Matrix

The MVP must support:
- **Desktop:** Chrome, Safari, Firefox
- **Mobile:** iOS Safari and Android Chrome (plus Firefox mobile where applicable)

### Responsive Design

- Mobile-first responsive layout is required (core usage is daily and frequent).
- The “first calorie log” flow must be designed for one-handed mobile use and quick completion.
- Media upload UX (photo logging) must work on iOS and Android browsers reliably.

### Performance Targets

- Performance should prioritize “time-to-first-action” for the activation event (first calorie log saved).
- Concrete numeric targets are TBD for MVP and should be set after baseline measurement in the chosen stack (focus: perceived speed for logging + check-in flows).

### SEO Strategy

- SEO is not a priority for the MVP web app.
- If marketing/landing pages are needed later, they can be separated from the authenticated app experience and handled as a distinct scope item.

### Accessibility Level

- Accessibility is not a priority in MVP (no WCAG target committed yet).
- Baseline expectation: avoid obvious blockers (basic keyboard support for core forms, sensible labels, readable contrast per existing design system).

### Implementation Considerations

- Real-time interactions should not introduce brittle dependencies (avoid “the app feels broken if websocket drops”).
- Ensure photo upload and AI estimation workflows are resilient (clear user feedback, retry, and fallback logging path).
- Validate critical flows across the browser matrix, especially mobile Safari.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP  
The MVP will prioritize delivering the “coaching loop” experience quickly and reliably: low-friction calorie logging, daily check-ins, real-time coaching interaction, and a clear trial-to-paid path. The goal is to make users feel value early (first calorie log saved + early support) to drive Signup-to-Paid Conversion (14d).

**Resource Requirements:**  
- Team: 1 full-stack developer (accelerated via AI tools)
- Human coach capacity: up to ~40 hours/week (acts as high-touch support and early learning channel)

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- Zahra happy path: onboarding → choose 8-week program → first calorie log saved → daily check-ins → real-time coaching → trial → paywall → paid
- Zahra edge case: AI calorie estimation fails → fallback logging → recovery loop
- Admin/Support operations: manage programs + resolve access/payment issues
- Human coach escalation: view timeline + message user (non-medical positioning)

**Must-Have Capabilities:**
- Unified authentication (signin/signup combined, OTP-based)
- 8-week program selection (catalog + selection)
- Calorie logging with input validation (text and/or photo → validation → AI estimation → parse → save with macronutrients) + graceful fallback path
- Activity logging for calorie burn tracking
- Past date calorie logging (up to 30 days ago)
- Daily calorie limit calculation and bar chart visualization
- Daily check-ins (minimum questions answered, fixed display logic) + optional coach messaging
- Coach with conversation memory (last 20+ messages preserved in context)
- Real-time coaching interaction in web app (tRPC real-time)
- Trial gating and subscription paywall (1-week trial)
- Weekly weight logging (minimum viable) with line chart visualization
- Profile management integrated into Home dashboard (3-tab navigation)
- Minimal admin/support tools (program management + user/subscription troubleshooting)
- Minimal coach dashboard + messaging, with permissions and non-medical guardrails

### Post-MVP Features

**Phase 2 (Post-MVP):**
- Mobile app delivery (primary long-term form factor)
- Improved personalization and more sophisticated plan revision
- Better analytics/monitoring views and support tooling depth
- More robust risk detection (beyond initial simple rules)

**Phase 3 (Expansion):**
- Broader lifestyle coaching beyond weight loss
- Integrations (sleep/steps) to improve prediction of “break points”
- Optional deeper personalization inputs (privacy-first)

### Risk Mitigation Strategy

**Technical Risks:**
- AI calorie estimation reliability (structured output, error handling, fallback)
- Real-time experience brittleness on mobile browsers (graceful degradation, clear UX for connectivity issues)
- Photo upload consistency on iOS Safari (validate early)

**Market Risks:**
- Users may not perceive value within the 1-week trial → prioritize activation (first calorie log saved) and early coaching engagement
- Coaching engagement may not translate to paid conversion → track activation (24h) + habit proxy (7d) as leading indicators

**Resource Risks:**
- Single developer throughput constraints → keep scope strictly limited to core journeys
- Human coach capacity limits if growth accelerates → start with clear escalation usage patterns and iterate based on demand

## Functional Requirements

### Onboarding & Accounts

- FR1: Visitors can create an account using a signup flow. The system uses a unified authentication page that automatically detects whether the user exists (signin) or is new (signup).
- FR2: Users can sign in and sign out. Authentication uses a unified page that handles both signin and signup flows.
- FR3: ~~Users can reset access to their account (e.g., forgot password or equivalent recovery).~~ (Removed: Recovery flow is not needed for MVP - users can simply sign in with OTP)
- FR4: Users can view and edit basic profile information relevant to coaching (non-medical positioning). Profile management is integrated into the Home dashboard (no separate Profile page).

### Programs (8-week) & Goal Setup

- FR5: Users can browse available 8-week programs.
- FR6: Users can select and start an 8-week program.
- FR7: Users can view their currently active program status (week number / progress).
- FR8: Users can choose a difficulty/target track for an 8-week program (3% / 5% / 7%).
- FR9: Users can complete a program and start another 8-week program later.

### Calorie Logging (AI Estimation + Fallback)

- FR10: Users can log food intake by providing a text description.
- FR11: Users can log food intake by uploading a photo.
- FR12: The system can request an AI-based calorie estimate from user-provided text and/or photo.
- FR13: The system can store a saved calorie log entry with a timestamp and estimated calories.
- FR14: Users can view their calorie log history for recent days.
- FR15: If AI estimation fails or is unavailable, users can retry the estimation later. The system preserves user input (text or photo) to avoid requiring re-entry.
- FR16: Users can edit or delete a previously saved calorie log entry.
- FR38: The system can validate calorie input before processing to ensure the input represents actual food (not invalid entries like "university" or other non-food items).
- FR39: Users can log physical activities and the system can estimate calories burned from activities.
- FR40: The system can store and display macronutrients (protein, carbohydrates, fat) along with calorie estimates.
- FR41: The system can calculate and display daily calorie limits based on the user's program track (3%/5%/7%) and goal weight.
- FR42: Users can log calories for past dates (up to 30 days ago) to account for forgotten entries.

### Daily Check-ins & Coaching (AI + Human)

- FR17: Users can complete a daily check-in by answering a defined set of questions. The system ensures check-ins are displayed correctly each day and prevents duplicate submissions for the same day.
- FR18: Users can view coaching guidance generated based on their recent inputs (check-ins, calorie logs, weigh-ins). The coach maintains conversation memory (at least the last 20 messages) to provide context-aware guidance.
- FR19: Users can send messages to the coach.
- FR20: Users can receive coach messages in a conversation history.
- FR21: The system can support a recovery flow after a slip-up (user indicates non-adherence and is guided to a next step).
- FR22: The system can identify users who may be at risk of quitting based on behavioral signals and/or explicit feedback.
- FR23: Human coaches can view a user's recent timeline (check-ins, calorie logs, weigh-ins, conversation).
- FR24: Human coaches can send messages to users.
- FR25: The system enforces non-medical positioning constraints in coaching content (no clinical claims/advice).
- FR43: The coach system maintains conversation memory, preserving at least the last 20 messages in context when generating responses, enabling continuity and context-aware coaching.

### Weight Tracking

- FR26: Users can record their weight.
- FR27: Users can view their weight history.

### Subscription & Trial Gating

- FR28: The system can grant new signups a free trial period with full access.
- FR29: The system can restrict coaching features after trial ends unless the user has an active subscription.
- FR30: Users can start a paid subscription.
- FR31: Users can view subscription status (trial vs paid vs expired).
- FR32: Users can cancel their subscription.

### Admin/Support & Operations

- FR33: Admin/support users can manage the program catalog (create/edit/disable programs).
- FR34: Admin/support users can look up a user account and view access/subscription state.
- FR35: Admin/support users can view key user events relevant to troubleshooting (signup time, trial window, activation event, payment state).
- FR36: Admin/support users can resolve access issues (e.g., restore access after payment issues) through supported workflows.
- FR37: The system can surface operational signals for support (e.g., AI estimation failure rates and common failure modes).

## Non-Functional Requirements

### Performance

- NFR1: The core logged-in experience (dashboard/home) should become usable quickly on typical mobile and desktop connections, targeting:
  - Page becomes interactive within 3 seconds (p95) on mobile browsers.
- NFR2: Core "activation" flow (first calorie log saved) should complete within 5 seconds (p95), excluding unusually slow third-party AI delays and input validation steps, and must always provide clear progress feedback to the user. Input validation adds minimal overhead (< 2 seconds) and should not significantly impact the activation experience.
- NFR3: Real-time coach messaging should feel responsive:
  - Message send → visible confirmation within 2 seconds (p95) under normal conditions.

### Reliability

- NFR4: The product must not block the core habit loop when the AI calorie estimation API is unavailable:
  - The system preserves user input (text or photo) when AI fails, allowing users to retry without re-entering data.
  - Clear messaging guides users to retry later, preventing abandonment.
- NFR5: The system must store core tracking events durably:
  - No silent loss of saved calorie logs, daily check-ins, messages, or weight logs.
- NFR6: Failure states must be user-safe:
  - Errors in AI estimation, uploads, or real-time transport must result in clear user messaging and a next-step path (retry, fallback, or “send later”).

### Security

- NFR7: All user data must be encrypted in transit (HTTPS/TLS).
- NFR8: Sensitive user data (calorie logs, weights, conversations) must be protected at rest via industry-standard encryption and access controls.
- NFR9: Authentication is OTP-based (no MFA requirement for MVP beyond OTP), with protections against abuse:
  - Rate limiting on OTP requests and verification attempts.
- NFR10: Role-based access controls must ensure only authorized roles can access user data:
  - Users can access only their own data.
  - Admin/Support and Human Coach access is limited to the minimum necessary for their role.

### Integration

- NFR11: External integrations must be resilient:
  - AI estimation and payment systems must have timeouts and error handling.
- NFR12: Payment state must be consistent:
  - If payment succeeds but access state is incorrect, the issue must be detectable and resolvable through support within 24 hours (SLA).

### Scalability

- NFR13: The MVP should operate reliably for an expected load of up to ~200 DAU, with headroom for spikes (e.g., short-term 2–3× bursts) without widespread errors.
- NFR14: The system should degrade gracefully under load (e.g., slower responses) rather than failing core actions like saving logs.

### Data Retention

- NFR15: Data retention should be long-term by default:
  - Prefer indefinite retention if resources allow; otherwise retention must be configurable without breaking user experience.