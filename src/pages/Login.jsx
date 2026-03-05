import { useState } from 'react';
import { users } from '../data/staticData';

const roleColors = { FO: 'teal', ZH: 'purple', RH: 'amber', SH: 'blue' };

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid email or password. Please try again.');
    }
  }

  function quickLogin(role) {
    const u = users.find(r => r.role === role);
    if (u) onLogin(u);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">EduCRM</span>
          </div>
          <p className="text-blue-300 text-sm">AI-powered CRM for EdTech sales teams</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Sign in</h2>
          <p className="text-sm text-gray-500 mb-6">Role & territory assigned automatically.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="you@educrm.in"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-xs text-sky-600 hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or quick demo login</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Quick login buttons */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { role: 'FO', label: 'Field Officer', color: 'border-teal-300 text-teal-700 hover:bg-teal-50' },
              { role: 'ZH', label: 'Zonal Head',    color: 'border-purple-300 text-purple-700 hover:bg-purple-50' },
              { role: 'RH', label: 'Regional Head', color: 'border-amber-300 text-amber-700 hover:bg-amber-50' },
              { role: 'SH', label: 'Sales Head',    color: 'border-blue-300 text-blue-700 hover:bg-blue-50' },
            ].map(({ role, label, color }) => (
              <button
                key={role}
                onClick={() => quickLogin(role)}
                className={`border rounded-lg py-2 text-xs font-medium transition-colors ${color}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-blue-400 text-xs mt-6">
          EduCRM v2.1 · Secure login · All rights reserved
        </p>
      </div>
    </div>
  );
}
