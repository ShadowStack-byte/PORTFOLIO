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

## Prioritized backlog
- P0: None.
- P1: Add real project screenshots or case-study links when available.
- P2: Add social profile URLs and optional analytics.

## Next tasks
- Replace illustrative project art with screenshots from the two hackathon projects.
- Add selected client testimonials when available.