import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AppShell({ user, onLogout, children }) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar user={user} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar user={user} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
