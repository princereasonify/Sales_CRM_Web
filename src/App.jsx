import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import AppShell from './components/layout/AppShell';
import FODashboard from './pages/fo/Dashboard';
import LeadsList from './pages/fo/LeadsList';
import LeadDetail from './pages/fo/LeadDetail';
import AddLead from './pages/fo/AddLead';
import ActivityLog from './pages/fo/ActivityLog';
import CreateDeal from './pages/fo/CreateDeal';
import PipelineKanban from './pages/fo/PipelineKanban';
import ZoneDashboard from './pages/zh/ZoneDashboard';
import TeamManagement from './pages/zh/TeamManagement';
import RegionDashboard from './pages/rh/RegionDashboard';
import NationalDashboard from './pages/sh/NationalDashboard';
import ReportsLibrary from './pages/sh/ReportsLibrary';

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const defaultPath = {
    FO: '/dashboard',
    ZH: '/zone',
    RH: '/region',
    SH: '/national',
  }[user.role] || '/dashboard';

  return (
    <BrowserRouter>
      <AppShell user={user} onLogout={() => setUser(null)}>
        <Routes>
          <Route path="/" element={<Navigate to={defaultPath} replace />} />

          {/* Field Officer */}
          <Route path="/dashboard"  element={<FODashboard user={user} />} />
          <Route path="/leads"      element={<LeadsList user={user} />} />
          <Route path="/leads/:id"  element={<LeadDetail user={user} />} />
          <Route path="/leads/new"  element={<AddLead user={user} />} />
          <Route path="/activities" element={<ActivityLog user={user} />} />
          <Route path="/deals/new"  element={<CreateDeal user={user} />} />
          <Route path="/pipeline"   element={<PipelineKanban user={user} />} />

          {/* Zonal Head */}
          <Route path="/zone"       element={<ZoneDashboard user={user} />} />
          <Route path="/team"       element={<TeamManagement user={user} />} />

          {/* Regional Head */}
          <Route path="/region"     element={<RegionDashboard user={user} />} />

          {/* Sales Head */}
          <Route path="/national"   element={<NationalDashboard user={user} />} />
          <Route path="/reports"    element={<ReportsLibrary user={user} />} />

          <Route path="*" element={<Navigate to={defaultPath} replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
