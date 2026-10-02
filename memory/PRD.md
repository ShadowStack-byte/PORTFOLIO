# Vikas Subramani Portfolio

## Original problem statement
Build a unique and beautiful portfolio using Vikas Subramani's profile, capabilities, skills, hackathon projects, education, GCP training, contact details, and client outreach pitch.

## Architecture decisions
- React single-page portfolio with anchor navigation and Framer Motion interactions.
- FastAPI `/api/inquiries` endpoint stores project inquiries in the existing MongoDB database.
- Frontend uses the protected `REACT_APP_BACKEND_URL`; backend uses existing MongoDB environment variables.
- Editorial light visual system with Playfair Display, Manrope, and DM Mono typography.

## Implemented
- Editorial hero with availability badge, workspace image, CTAs, custom cursor, and responsive navigation.
- Capabilities bento cards, concise interactive hackathon case studies, skills matrix, education and GCP section.
- Copyable client pitch with clipboard fallback and toast feedback.
- Direct email, phone, and WhatsApp actions.
- Project inquiry form with required validation, success/error toasts, and MongoDB persistence.
- Responsive mobile menu, scroll reveal animations, marquee, hover states, and mobile-safe layouts.
- 2026-07: First production deployment initiated (user confirmed 50 ECU charge; deploy job 8bde924a).

## Prioritized backlog
- P0: Gmail API integration — send enquiry notifications to vikasvikkim143@gmail.com. BLOCKED: needs user's GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET from Google Cloud Console (OAuth consent screen + redirect URI <backend-url>/api/oauth/gmail/callback).
- P1: Award-worthy redesign (user-requested): kinetic masked-line hero, lenis smooth scroll, framer-motion reveals, slow editorial marquee, original SVG logo + favicon, aligned bento, subtle parallax/3D hero. Brand name idea: "ShadowStack" (user's GitHub handle).
- P1: GitHub save to https://github.com/ShadowStack-byte/PORTFOLIO — user must use the "Save to Github" button in chat input (agent cannot push).
- P2: Add real project screenshots or case-study links when available.
- P2: Add social profile URLs and optional analytics.

## Next tasks
- Collect Google OAuth credentials from user, then wire Gmail send into POST /api/inquiries.
- Execute the award-worthy redesign after user confirms direction.
- Replace illustrative project art with screenshots from the two hackathon projects.
- Add selected client testimonials when available.