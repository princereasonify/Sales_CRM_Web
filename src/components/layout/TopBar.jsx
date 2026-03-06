import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { notificationService } from '../../api/notificationService';
import { useLocation } from 'react-router-dom';

const roleColor = {
  FO: { accent: '#00897B' },
  ZH: { accent: '#6A1B9A' },
  RH: { accent: '#F57C00' },
  SH: { accent: '#1565C0' },
};

const pageTitles = {
  '/dashboard':  'FO Dashboard',
  '/leads':      'Leads',
  '/pipeline':   'Pipeline Kanban',
  '/activities': 'Activity Log',
  '/deals/new':  'Create Deal',
  '/zone':       'Zone Dashboard',
  '/team':       'Team Management',
  '/region':     'Region Dashboard',
  '/national':   'National Dashboard',
  '/reports':    'Reports Library',
};

export default function TopBar({ user }) {
  const location = useLocation();
  const rc = roleColor[user.role] || roleColor.FO;
  const title = pageTitles[location.pathname] || 'EduCRM';
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    notificationService.getNotifications()
      .then(res => {
        const list = res.data || res || [];
        setUnread(Array.isArray(list) ? list.filter(n => !n.isRead).length : 0);
      })
      .catch(() => setUnread(0));
  }, []);

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
      <h1 className="text-base font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell size={18} className="text-gray-600" />
          {unread > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full" />
          )}
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold cursor-pointer"
          style={{ backgroundColor: rc.accent }}
        >
          {user.avatar}
        </div>
      </div>
    </header>
  );
}
