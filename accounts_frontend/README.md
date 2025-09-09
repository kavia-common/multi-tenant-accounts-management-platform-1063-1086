# Accounts Frontend (Next.js)

Modern, minimalistic, responsive Next.js app for a multi-tenant accounts platform.

Features:
- Registration, login/logout, password reset
- JWT integration with backend, token refresh
- Role-based dashboards (Admin, Manager, Sales Rep, Viewer)
- Multi-tenant organization switcher (UI + API header X-Tenant-Id)
- Persistent sidebar, top header bar
- Dark/light theme with auto-detect and toggle
- Adaptive mobile UX

Configuration:
- Copy `.env.example` to `.env` and set:
  - NEXT_PUBLIC_API_BASE_URL=https://<backend-host>

Scripts:
- npm run dev
- npm run build
- npm start

Routes:
- /login
- /register
- /password-reset
- /password-reset/[token]
- /dashboard
- /users (admin/manager)
- /organizations (admin)
