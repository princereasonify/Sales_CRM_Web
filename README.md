# EduCRM - Sales CRM Frontend

A modern, role-based Sales CRM built for education technology companies to manage school leads, deals, and team performance.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| React Router v6 | Client-side routing |
| Axios | HTTP client for API calls |
| Tailwind CSS 3 | Utility-first styling |
| Lucide React | Icon library |

## Prerequisites

- **Node.js** 18+ and **npm** (or yarn/pnpm)
- **Backend API** running on `http://localhost:5097` (see backend README)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Build for Production

```bash
npm run build      # Outputs to /dist
npm run preview    # Preview production build locally
```

## Project Structure

```
src/
├── api/                    # API service layer (Axios calls)
│   ├── axios.js            # Axios instance with JWT interceptor
│   ├── authService.js      # Login API
│   ├── leadService.js      # Leads CRUD, pipeline, duplicate check
│   ├── activityService.js  # Activity log APIs
│   ├── dealService.js      # Deals CRUD, approvals
│   ├── dashboardService.js # Dashboard data for all roles
│   └── notificationService.js # Notifications API
│
├── components/
│   └── layout/
│       ├── AppShell.jsx    # Main layout (sidebar + topbar + content)
│       ├── Sidebar.jsx     # Role-based navigation sidebar
│       └── TopBar.jsx      # Header with notifications & avatar
│
├── pages/
│   ├── Login.jsx           # Login page with quick-login buttons
│   ├── fo/                 # Field Officer pages
│   │   ├── Dashboard.jsx   # FO dashboard (KPIs, tasks, hot leads)
│   │   ├── LeadsList.jsx   # Leads table with search, filter, pagination
│   │   ├── LeadDetail.jsx  # Single lead view with activity timeline
│   │   ├── AddLead.jsx     # Create new lead form
│   │   ├── ActivityLog.jsx # Activity log with add activity modal
│   │   ├── CreateDeal.jsx  # Create deal from qualified lead
│   │   └── PipelineKanban.jsx # Visual kanban board by stage
│   ├── zh/                 # Zonal Head pages
│   │   ├── ZoneDashboard.jsx  # Zone KPIs, pending approvals, leaderboard
│   │   └── TeamManagement.jsx # FO cards with performance & task assignment
│   ├── rh/                 # Regional Head pages
│   │   └── RegionDashboard.jsx # Region KPIs, zone comparison, territory map
│   └── sh/                 # Sales Head pages
│       ├── NationalDashboard.jsx # National KPIs, regional scorecard
│       └── ReportsLibrary.jsx    # Report catalog with role-based access
│
├── data/
│   └── staticData.js       # Helper functions (fmt, colors) & enums
│
├── App.jsx                 # Root component with routing & auth state
├── main.jsx                # Entry point
└── index.css               # Tailwind imports & custom styles
```

## User Roles & Access

| Role | Code | Dashboard | Key Features |
|---|---|---|---|
| Field Officer | FO | `/dashboard` | Manage leads, log activities, create deals, pipeline view |
| Zonal Head | ZH | `/zone` | Approve deals, monitor FO performance, assign tasks |
| Regional Head | RH | `/region` | Zone comparison, territory coverage, reports |
| Sales Head | SH | `/national` | National overview, regional scorecard, reports library |

## Authentication

- JWT-based authentication via the backend API
- Token stored in `localStorage` and automatically attached to all API requests
- 401 responses trigger automatic logout and redirect to login
- Quick-login buttons available on the login page for development/testing

### Test Credentials

| Role | Email | Password |
|---|---|---|
| Field Officer | arjun@educrm.in | fo123 |
| Zonal Head | priya@educrm.in | zh123 |
| Regional Head | rajesh@educrm.in | rh123 |
| Sales Head | anita@educrm.in | sh123 |

## API Configuration

The API base URL is configured in `src/api/axios.js`:

```js
const api = axios.create({
  baseURL: 'http://localhost:5097/api',
});
```

To change the backend URL, update this file.

## Key Design Decisions

- **Role-based routing** — Each role sees different navigation items and dashboards
- **API-first** — All data comes from the backend API; no hardcoded dummy data in views
- **Optimistic loading** — Pages show loading states while fetching data
- **Responsive** — Works on desktop and tablet screens using Tailwind's responsive utilities
- **Minimal dependencies** — Only essential packages (React, Router, Axios, Tailwind, Lucide)
