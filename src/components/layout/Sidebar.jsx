import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, ClipboardList, Activity,
  Briefcase, KanbanSquare, Map, BarChart3, FileText, LogOut,
} from 'lucide-react';

const roleColor = {
  FO: { accent: '#00897B', light: '#E0F2F1', name: 'Field Officer' },
  ZH: { accent: '#6A1B9A', light: '#F3E5F5', name: 'Zonal Head' },
  RH: { accent: '#F57C00', light: '#FFF3E0', name: 'Regional Head' },
  SH: { accent: '#1565C0', light: '#E3F2FD', name: 'Sales Head' },
};

const navsByRole = {
  FO: [
    { to: '/dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/leads',      icon: Users,            label: 'Leads' },
    { to: '/pipeline',   icon: KanbanSquare,     label: 'Pipeline' },
    { to: '/activities', icon: Activity,          label: 'Activity Log' },
    { to: '/deals/new',  icon: Briefcase,         label: 'Create Deal' },
  ],
  ZH: [
    { to: '/zone',       icon: LayoutDashboard,   label: 'Zone Dashboard' },
    { to: '/team',       icon: Users,             label: 'Team' },
    { to: '/leads',      icon: ClipboardList,     label: 'All Leads' },
  ],
  RH: [
    { to: '/region',     icon: LayoutDashboard,   label: 'Region Dashboard' },
    { to: '/reports',    icon: BarChart3,          label: 'Reports' },
    { to: '/leads',      icon: ClipboardList,     label: 'Leads' },
  ],
  SH: [
    { to: '/national',   icon: LayoutDashboard,   label: 'National Dashboard' },
    { to: '/reports',    icon: FileText,           label: 'Reports Library' },
    { to: '/region',     icon: Map,               label: 'Regions' },
  ],
};


export default function Sidebar({ user, onLogout }) {
  const rc = roleColor[user.role] || roleColor.FO;
  const navItems = navsByRole[user.role] || navsByRole.FO;

  return (
    <aside className="w-56 bg-white border-r border-gray-100 flex flex-col flex-shrink-0 h-full">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: rc.accent }}>
          E
        </div>
        <span className="font-bold text-gray-800 text-base tracking-tight">EduCRM</span>
      </div>

      {/* User badge */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
            style={{ backgroundColor: rc.accent }}>
            {user.avatar}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
            <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: rc.light, color: rc.accent }}>
              {rc.name}
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative
               ${isActive
                 ? 'text-gray-900'
                 : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`
            }
            style={({ isActive }) => isActive
              ? { backgroundColor: rc.light, color: rc.accent, borderLeft: `3px solid ${rc.accent}` }
              : {}}
          >
            <Icon size={17} />
            <span>{label}</span>
            {label === 'Activity Log' && (
              <span className="ml-auto w-2 h-2 bg-orange-400 rounded-full" />
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
