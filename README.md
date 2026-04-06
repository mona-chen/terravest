# TerraVest Full-Stack Investment Platform

## Overview

TerraVest is a production-ready full-stack investment platform with:
- **Backend**: Node.js + Express + TypeScript + PostgreSQL + Prisma
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Authentication**: JWT with access tokens (15min) and refresh tokens (7days)
- **Authorization**: Role-based access control (ADMIN, INVESTOR)
- **Testing**: Jest with 100% coverage target
- **Deployment**: Docker + Docker Compose

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│   Backend API   │────▶│   PostgreSQL    │
│   (Vite/React)  │     │   (Express)     │     │   (Prisma)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Quick Start

### Using Docker (Recommended)

```bash
# Start all services
docker-compose up --build

# Access:
# Frontend: http://localhost
# Backend API: http://localhost:3001/api
# Health Check: http://localhost:3001/api/health
```

### Manual Setup

1. **Install dependencies**
   ```bash
   # Frontend
   npm install

   # Backend
   cd server && npm install
   ```

2. **Setup environment**
   ```bash
   # server/.env
   PORT=3001
   DATABASE_URL="postgresql://user:password@localhost:5432/terravest"
   JWT_SECRET="your-jwt-secret-min-32-characters"
   JWT_REFRESH_SECRET="your-refresh-secret-min-32-characters"
   ```

3. **Initialize database**
   ```bash
   cd server
   npx prisma migrate dev
   npx prisma db seed
   ```

4. **Start servers**
   ```bash
   # Backend (Terminal 1)
   cd server && npm run dev

   # Frontend (Terminal 2)
   npm run dev
   ```

## Project Structure

```
├── src/                          # Frontend source
│   ├── lib/api/                  # API client library
│   │   ├── client.ts             # Axios with interceptors
│   │   ├── auth.api.ts           # Auth endpoints
│   │   ├── portal.api.ts         # Portal endpoints
│   │   └── types.ts              # TypeScript interfaces
│   ├── portal/
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx   # JWT auth state
│   │   │   └── DataContext.tsx   # API data state
│   │   └── pages/                # 15+ portal pages
│   └── ...
├── server/                       # Backend source
│   ├── src/
│   │   ├── controllers/          # Route controllers
│   │   ├── services/             # Business logic
│   │   ├── middleware/           # Auth, validation
│   │   ├── utils/                # JWT, password
│   │   └── routes/               # API routes
│   ├── prisma/
│   │   └── schema.prisma         # 10 models
│   └── tests/                    # Comprehensive tests
├── docker-compose.yml
└── .github/workflows/ci.yml      # CI/CD
```

## Database Schema

| Model | Description |
|-------|-------------|
| User | Base user accounts |
| Investor | Extended investor profiles |
| Company | Portfolio companies |
| PortfolioHolding | Investor investments |
| Document | Files and reports |
| Notification | User notifications |
| Message | Internal messaging |
| Opportunity | Investment opportunities |
| CapitalCall | Capital call records |
| RefreshToken | JWT refresh tokens |

## API Endpoints

### Auth (`/api/auth`)
- `POST /register` - Register new investor
- `POST /login` - Login
- `POST /logout` - Logout
- `GET /me` - Get current user

### Portal (`/api/portal`) - Investor only
- `GET /dashboard` - Dashboard stats
- `GET /profile` - User profile
- `PATCH /profile` - Update profile
- `GET /portfolio` - Portfolio holdings
- `GET /companies` - List companies
- `GET /documents` - Documents
- `GET /notifications` - Notifications
- `GET /messages` - Messages

### Admin (`/api/admin`) - Admin only
- `GET /dashboard` - Admin dashboard
- `GET /users` - List users
- `GET /users/:id` - User details
- `GET /companies` - List companies
- `POST /companies` - Create company
- `GET /documents` - All documents
- `POST /documents` - Upload document

## Demo Credentials

- **Email**: investor@terravest.cm
- **Password**: password123

## Testing

```bash
# Backend tests with coverage
cd server
npm run test:coverage

# Frontend tests
npm test
```

## Security Features

- JWT authentication (access/refresh tokens)
- Bcrypt password hashing
- Role-based access control
- Rate limiting
- Helmet security headers
- CORS protection

## CI/CD

GitHub Actions automatically:
1. Tests backend with coverage
2. Tests frontend build
3. Builds Docker images
4. Deploys on main branch

## License

MIT
