# EduCRM — Frontend

React 18 single-page application for the EduCRM Sales CRM. Provides role-based dashboards, lead management, pipeline visualization, and deal workflows.

---

## How Frontend & Backend Are Connected

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER                                  │
│                                                                 │
│  React App (localhost:5173)                                     │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────────┐  │
│  │  Pages       │───►│  API Service │───►│  Axios Instance   │  │
│  │  (Dashboard, │    │  Layer       │    │  (src/api/axios.js)│  │
│  │   Leads,     │    │  (src/api/)  │    │                   │  │
│  │   Deals...)  │    │              │    │  baseURL:          │  │
│  └─────────────┘    └──────────────┘    │  localhost:5097/api│  │
│                                          │                   │  │
│                                          │  Adds JWT token   │  │
│                                          │  to every request │  │
│                                          └────────┬──────────┘  │
└───────────────────────────────────────────────────┼─────────────┘
                                                    │
                                          HTTP Request (JSON)
                                        Authorization: Bearer <token>
                                                    │
                                                    ▼
                                  ┌─────────────────────────────┐
                                  │  .NET Backend API            │
                                  │  (localhost:5097)             │
                                  │                              │
                                  │  /api/auth/login             │
                                  │  /api/leads                  │
                                  │  /api/activities             │
                                  │  /api/deals                  │
                                  │  /api/dashboard/fo           │
                                  │  /api/notifications          │
                                  │         │                    │
                                  │         ▼                    │
                                  │    PostgreSQL Database       │
                                  └─────────────────────────────┘
```

### Connection Summary:
1. **Frontend** runs on `http://localhost:5173` (Vite dev server)
2. **Backend** runs on `http://localhost:5097` (ASP.NET Core)
3. Frontend sends HTTP requests via **Axios** to backend API endpoints
4. Backend returns **JSON responses** wrapped in `{ success, data, message }`
5. **JWT token** is stored in `localStorage` and sent with every request
6. On **401 Unauthorized**, frontend auto-clears token and redirects to login

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework (component-based) |
| Vite 5 | Build tool & dev server (fast HMR) |
| React Router v6 | Client-side page navigation |
| Axios | HTTP client for API communication |
| Tailwind CSS 3 | Utility-first CSS styling |
| Lucide React | Modern icon library |

---

## Project Structure

```
Sales_CRM_Web/
├── public/
│   └── user-manual.html         ← Downloadable user manual
│
├── src/
│   ├── api/                     ← ★ API LAYER (connects to backend)
│   │   ├── axios.js             ← Axios instance + JWT interceptor
│   │   ├── authService.js       ← login(email, password)
│   │   ├── leadService.js       ← getLeads, createLead, updateLead, deleteLead
│   │   ├── activityService.js   ← getActivities, createActivity
│   │   ├── dealService.js       ← getDeals, createDeal, approveDeal
│   │   ├── dashboardService.js  ← getFoDashboard, getZoneDashboard, etc.
│   │   └── notificationService.js ← getNotifications, markAsRead
│   │
│   ├── components/
│   │   └── layout/
│   │       ├── AppShell.jsx     ← Main layout (sidebar + topbar + page content)
│   │       ├── Sidebar.jsx      ← Left navigation (role-based menu items)
│   │       └── TopBar.jsx       ← Top header (page title, notifications, avatar)
│   │
│   ├── pages/
│   │   ├── Login.jsx            ← Login page (email/password + quick login)
│   │   │
│   │   ├── fo/                  ← Field Officer pages
│   │   │   ├── Dashboard.jsx    ← FO dashboard → dashboardService.getFoDashboard()
│   │   │   ├── LeadsList.jsx    ← Leads table → leadService.getLeads()
│   │   │   ├── LeadDetail.jsx   ← Lead profile → leadService.getLeadById()
│   │   │   ├── AddLead.jsx      ← Create lead → leadService.createLead()
│   │   │   ├── ActivityLog.jsx  ← Activities → activityService.getActivities()
│   │   │   ├── CreateDeal.jsx   ← New deal → dealService.createDeal()
│   │   │   └── PipelineKanban.jsx ← Kanban → leadService.getPipeline()
│   │   │
│   │   ├── zh/                  ← Zonal Head pages
│   │   │   ├── ZoneDashboard.jsx ← Zone KPIs → dashboardService.getZoneDashboard()
│   │   │   └── TeamManagement.jsx ← FO cards → dashboardService.getTeamPerformance()
│   │   │
│   │   ├── rh/                  ← Regional Head pages
│   │   │   └── RegionDashboard.jsx ← Region → dashboardService.getRegionDashboard()
│   │   │
│   │   └── sh/                  ← Sales Head pages
│   │       ├── NationalDashboard.jsx ← National → dashboardService.getNationalDashboard()
│   │       └── ReportsLibrary.jsx    ← Report catalog (static UI)
│   │
│   ├── data/
│   │   └── staticData.js       ← Helper functions only (fmt, colors, enums)
│   │
│   ├── App.jsx                  ← Root component (routing, auth state)
│   ├── main.jsx                 ← Entry point (renders App)
│   └── index.css                ← Tailwind imports + custom styles
│
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## How Each Page Connects to the Backend

### Authentication Flow
```
Login.jsx
  │
  ├─ User enters email + password
  ├─ Calls: authService.login(email, password)
  │    └─ POST /api/auth/login → { email, password }
  │
  ├─ Backend returns: { success: true, data: { token, user } }
  │
  ├─ Stores in localStorage:
  │    ├─ localStorage.setItem('token', token)
  │    └─ localStorage.setItem('user', JSON.stringify(user))
  │
  └─ App.jsx sets user state → redirects to role dashboard
```

### API Service Layer (src/api/)
Every page uses a service file to talk to the backend:

```
Page Component  →  Service File  →  Axios Instance  →  Backend API
─────────────     ─────────────     ──────────────     ───────────
Dashboard.jsx  →  dashboardService  →  api.get(...)  →  GET /api/dashboard/fo
LeadsList.jsx  →  leadService       →  api.get(...)  →  GET /api/leads?page=1
AddLead.jsx    →  leadService       →  api.post(...) →  POST /api/leads
ActivityLog    →  activityService   →  api.post(...) →  POST /api/activities
CreateDeal     →  dealService       →  api.post(...) →  POST /api/deals
ZoneDashboard  →  dashboardService  →  api.get(...)  →  GET /api/dashboard/zone
TopBar.jsx     →  notificationService → api.get(...) →  GET /api/notifications
```

### JWT Token Flow
```
1. axios.js interceptor automatically adds token to EVERY request:
   config.headers.Authorization = `Bearer ${token}`

2. If any API returns 401 (token expired/invalid):
   - Clears localStorage
   - Redirects to login page
   - Exception: /auth/login 401 shows error message instead of redirect
```

---

## Routing (App.jsx)

| Path | Component | Role | API Used |
|---|---|---|---|
| `/` | Redirect | All | — |
| `/dashboard` | FODashboard | FO | `GET /api/dashboard/fo` |
| `/leads` | LeadsList | FO, ZH, RH | `GET /api/leads` |
| `/leads/:id` | LeadDetail | FO | `GET /api/leads/{id}` |
| `/leads/new` | AddLead | FO | `POST /api/leads` |
| `/activities` | ActivityLog | FO | `GET/POST /api/activities` |
| `/deals/new` | CreateDeal | FO | `POST /api/deals` |
| `/pipeline` | PipelineKanban | FO | `GET /api/leads/pipeline` |
| `/zone` | ZoneDashboard | ZH | `GET /api/dashboard/zone` |
| `/team` | TeamManagement | ZH | `GET /api/dashboard/team-performance` |
| `/region` | RegionDashboard | RH | `GET /api/dashboard/region` |
| `/national` | NationalDashboard | SH | `GET /api/dashboard/national` |
| `/reports` | ReportsLibrary | RH, SH | — (static catalog) |

### Default redirects by role:
- **FO** → `/dashboard`
- **ZH** → `/zone`
- **RH** → `/region`
- **SH** → `/national`

---

## API Response Format

Every backend response follows this format:

```json
{
  "success": true,
  "message": null,
  "data": { ... }
}
```

For paginated lists:
```json
{
  "success": true,
  "data": {
    "items": [ ... ],
    "totalCount": 42,
    "page": 1,
    "pageSize": 10,
    "totalPages": 5
  }
}
```

Frontend code pattern:
```javascript
// In a React component
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  dashboardService.getFoDashboard()
    .then(res => setData(res.data))      // res = { success, data }
    .catch(console.error)
    .finally(() => setLoading(false));
}, []);
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Backend API running on `http://localhost:5097`

### Install & Run

```bash
cd Sales_CRM_Web

# Install dependencies
npm install

# Start dev server
npm run dev
```

App opens at `http://localhost:5173`.

### Build for Production

```bash
npm run build      # Output in /dist
npm run preview    # Preview production build
```

---

## Key Design Decisions

| Decision | Why |
|---|---|
| **API service layer** (`src/api/`) | Centralizes all backend calls. Pages don't use Axios directly. |
| **JWT in localStorage** | Simple token persistence across page refreshes. |
| **401 interceptor** | Auto-logout on expired tokens (except login page). |
| **Role-based routing** | Each role sees only relevant pages in sidebar. |
| **Loading states** | Every page shows "Loading..." while fetching API data. |
| **Helper functions in staticData.js** | `fmt()` for currency, color functions — shared across pages. |

---

## Test Credentials

| Role | Email | Password |
|---|---|---|
| Field Officer | arjun@educrm.in | fo123 |
| Zonal Head | priya@educrm.in | zh123 |
| Regional Head | rajesh@educrm.in | rh123 |
| Sales Head | anita@educrm.in | sh123 |
