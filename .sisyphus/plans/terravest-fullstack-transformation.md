# TerraVest Full-Stack Transformation Plan

## Goal
Transform TerraVest from a demo/prototype to a production-ready full-stack investment platform with:
- Backend: Node.js + Express + PostgreSQL + Prisma
- Auth: JWT + Refresh Tokens
- Frontend: React + TypeScript (existing) integrated with real APIs
- Testing: 100% test coverage on backend, frontend tests
- All APIs integrated and working

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Vite + React)                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Public Site    │  │  Investor Portal │  │   Admin Portal   │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘ │
└───────────┼─────────────────────┼─────────────────────┼─────────┘
            │                     │                     │
            ▼                     ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY (Express)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   /api/auth  │  │ /api/portal │  │  /api/admin  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                              │                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    MIDDLEWARE STACK                        │   │
│  │  rate-limit → cors → helmet → auth → validation → error  │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE (PostgreSQL)                         │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │  Users  │ │Companies │ │Documents │ │Notifications     │   │
│  └─────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │Portfolio │ │Messages  │ │Opportunit│ │CapitalCalls      │   │
│  └─────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Project Setup & Backend Foundation

### 1.1 Backend Project Structure
```
server/
├── src/
│   ├── app.ts                 # Express app setup
│   ├── server.ts              # Server entry point
│   ├── config/
│   │   ├── database.ts        # Prisma client
│   │   ├── env.ts             # Environment validation
│   │   └── constants.ts       # App constants
│   ├── middleware/
│   │   ├── auth.ts           # JWT verification
│   │   ├── rateLimit.ts      # Rate limiting
│   │   ├── errorHandler.ts   # Global error handler
│   │   ├── validate.ts       # Request validation
│   │   └── cors.ts           # CORS configuration
│   ├── routes/
│   │   ├── auth.routes.ts    # /api/auth/*
│   │   ├── portal.routes.ts  # /api/portal/*
│   │   └── admin.routes.ts   # /api/admin/*
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── company.controller.ts
│   │   ├── document.controller.ts
│   │   ├── notification.controller.ts
│   │   ├── message.controller.ts
│   │   └── opportunity.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── company.service.ts
│   │   ├── document.service.ts
│   │   ├── email.service.ts
│   │   └── token.service.ts
│   ├── utils/
│   │   ├── jwt.ts           # JWT utilities
│   │   ├── password.ts       # Password hashing
│   │   └── apiResponse.ts   # Response helpers
│   └── types/
│       └── express.d.ts      # Express type augmentations
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts               # Database seeding
│   └── migrations/
├── tests/
│   ├── unit/
│   └── integration/
├── package.json
└── tsconfig.json
```

### 1.2 Database Schema (Prisma)

**Entities:**
- [ ] User (id, email, password, name, role, status, profile)
- [ ] Investor (extends User - additional financial fields)
- [ ] Company (investment portfolio companies)
- [ ] PortfolioHolding (user investments in companies)
- [ ] Document (reports, statements, legal docs)
- [ ] Notification (user notifications)
- [ ] Message (internal messaging)
- [ ] Opportunity (investment opportunities)
- [ ] CapitalCall (capital call records)
- [ ] RefreshToken (JWT refresh tokens)

### 1.3 Authentication Flow

```
┌─────────┐      ┌─────────────┐      ┌──────────────┐
│  Login  │─────▶│  Validate   │─────▶│  Generate    │
│ Request │      │  Credentials│      │  Tokens      │
└─────────┘      └─────────────┘      └──────┬───────┘
                                             │
                    ┌─────────────────────────┴────────────┐
                    │                                       │
                    ▼                                       ▼
           ┌────────────────┐                   ┌────────────────┐
           │ Access Token   │                   │ Refresh Token  │
           │ (15 min TTL)   │                   │ (7 days TTL)   │
           └────────────────┘                   └───────┬────────┘
                    │                                    │
                    ▼                                    ▼
           ┌────────────────┐                   ┌────────────────┐
           │ Request with   │                   │ Request new    │
           │ Authorization  │                   │ Access Token   │
           └────────────────┘                   └────────────────┘
```

### 1.4 API Endpoints

**Auth Routes (/api/auth)**
- [ ] `POST /register` - User registration
- [ ] `POST /login` - User login
- [ ] `POST /logout` - Logout (invalidate tokens)
- [ ] `POST /refresh` - Refresh access token
- [ ] `POST /forgot-password` - Password reset request
- [ ] `POST /reset-password` - Password reset
- [ ] `GET /me` - Get current user

**Portal Routes (/api/portal) - Protected**
- [ ] `GET /dashboard` - Dashboard stats
- [ ] `GET /portfolio` - User's portfolio
- [ ] `GET /portfolio/:companyId` - Company details
- [ ] `GET /documents` - User's documents
- [ ] `GET /documents/:id` - Download document
- [ ] `GET /notifications` - User notifications
- [ ] `PATCH /notifications/:id` - Mark notification read
- [ ] `GET /messages` - User messages
- [ ] `POST /messages` - Send message
- [ ] `GET /performance` - Performance data
- [ ] `GET /opportunities` - Investment opportunities

**Admin Routes (/api/admin) - Admin only**
- [ ] `GET /users` - List all users
- [ ] `GET /users/:id` - User details
- [ ] `PATCH /users/:id` - Update user
- [ ] `GET /companies` - All companies
- [ ] `POST /companies` - Create company
- [ ] `PATCH /companies/:id` - Update company
- [ ] `GET /documents` - All documents
- [ ] `POST /documents` - Upload document
- [ ] `GET /analytics` - Platform analytics
- [ ] `POST /notifications` - Send notification
- [ ] `GET /opportunities` - All opportunities
- [ ] `POST /opportunities` - Create opportunity

---

## Phase 2: Frontend Integration

### 2.1 API Client Setup
- [ ] Create `src/lib/api/client.ts` - Axios instance with interceptors
- [ ] Create `src/lib/api/endpoints.ts` - API endpoint definitions
- [ ] Create `src/lib/api/auth.api.ts` - Auth API functions
- [ ] Create `src/lib/api/portal.api.ts` - Portal API functions
- [ ] Create `src/lib/api/admin.api.ts` - Admin API functions

### 2.2 Auth Context Rewrite
- [ ] Replace localStorage auth with JWT-based auth
- [ ] Implement token refresh logic
- [ ] Handle 401 errors with token refresh
- [ ] Proper logout flow (clear tokens, redirect)

### 2.3 Data Layer Rewrite
- [ ] Remove localStorage store.ts
- [ ] Create API-based data fetching hooks
- [ ] Implement React Query or SWR for caching
- [ ] Create `usePortfolio`, `useDocuments`, `useNotifications`, etc.

### 2.4 Page Integration
- [ ] LoginPage - Connect to real auth API
- [ ] DashboardPage - Fetch from API
- [ ] PortfolioPage - Fetch from API
- [ ] DocumentsPage - Fetch + file download
- [ ] All other pages - API integration

### 2.5 Error Handling
- [ ] Global API error handler
- [ ] Toast notifications for errors
- [ ] Loading states for all async operations
- [ ] Retry logic for failed requests

---

## Phase 3: Testing

### 3.1 Backend Tests (Target: 100%)

**Unit Tests:**
- [ ] `tests/unit/auth.service.test.ts`
- [ ] `tests/unit/user.service.test.ts`
- [ ] `tests/unit/company.service.test.ts`
- [ ] `tests/unit/jwt.utils.test.ts`
- [ ] `tests/unit/password.utils.test.ts`

**Integration Tests:**
- [ ] `tests/integration/auth.routes.test.ts`
- [ ] `tests/integration/portal.routes.test.ts`
- [ ] `tests/integration/admin.routes.test.ts`
- [ ] `tests/integration/middleware.test.ts`

**Coverage Requirements:**
- Statements: 100%
- Branches: 100%
- Functions: 100%
- Lines: 100%

### 3.2 Frontend Tests

**Unit Tests:**
- [ ] `tests/unit/components/*.test.tsx`
- [ ] `tests/unit/hooks/*.test.ts`
- [ ] `tests/unit/utils/*.test.ts`

**Integration Tests:**
- [ ] `tests/integration/auth.test.tsx`
- [ ] `tests/integration/portal.test.tsx`

**E2E Tests (Playwright):**
- [ ] `tests/e2e/login.spec.ts`
- [ ] `tests/e2e/dashboard.spec.ts`
- [ ] `tests/e2e/portfolio.spec.ts`

---

## Phase 4: Security Hardening

- [ ] Input validation (Zod schemas)
- [ ] SQL injection prevention (Prisma)
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Helmet security headers
- [ ] Password hashing (bcrypt)
- [ ] Secure cookie settings
- [ ] Environment variable validation

---

## Phase 5: DevOps & Deployment

- [ ] Docker configuration
- [ ] Docker Compose (app + db)
- [ ] CI/CD pipeline
- [ ] Environment configs (dev, staging, prod)
- [ ] Database migrations
- [ ] Seed data scripts

---

## Implementation Order

```
Week 1: Foundation
├── Setup server project structure
├── Configure Prisma + PostgreSQL
├── Create database schema
├── Implement JWT auth service
├── Write backend unit tests (services)

Week 2: API Development
├── Implement auth routes
├── Implement portal routes
├── Implement admin routes
├── Add middleware (rate limit, validation)
├── Write backend integration tests

Week 3: Frontend Integration
├── Create API client
├── Rewrite AuthContext
├── Rewrite DataContext
├── Integrate all pages
├── Add error handling

Week 4: Testing & Security
├── Achieve 100% backend coverage
├── Frontend unit tests
├── E2E tests with Playwright
├── Security audit & hardening
├── Documentation

Week 5: Polish & Deploy
├── Docker setup
├── CI/CD pipeline
├── Staging deployment
├── Performance optimization
├── Production deployment
```

---

## Success Criteria

- [ ] All API endpoints return correct responses
- [ ] JWT auth works (login, logout, refresh, protected routes)
- [ ] Admin role properly restricts access
- [ ] Frontend fully integrated with backend
- [ ] Backend test coverage: 100%
- [ ] All E2E tests pass
- [ ] No security vulnerabilities
- [ ] Application builds without errors
- [ ] Application runs in Docker

---

## Key Files to Create/Modify

### New Files (Backend)
1. `server/src/app.ts`
2. `server/src/server.ts`
3. `server/prisma/schema.prisma`
4. `server/src/config/*.ts`
5. `server/src/middleware/*.ts`
6. `server/src/routes/*.ts`
7. `server/src/controllers/*.ts`
8. `server/src/services/*.ts`
9. `server/src/utils/*.ts`
10. `server/tests/**/*.test.ts`

### New Files (Frontend)
1. `src/lib/api/client.ts`
2. `src/lib/api/endpoints.ts`
3. `src/lib/api/*.ts`
4. `src/hooks/useApi*.ts`
5. `src/contexts/AuthContext.tsx` (rewrite)
6. `src/contexts/DataContext.tsx` (rewrite)
7. `src/portal/data/store.ts` (deprecate)

### Modify Existing
1. `src/portal/pages/LoginPage.tsx`
2. `src/portal/pages/DashboardPage.tsx`
3. `src/portal/pages/*.tsx` (all pages)
4. `package.json` (add server dependencies)
5. `vite.config.ts` (proxy to backend)
6. `.env.example`
