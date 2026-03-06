import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { authService } from '../api/authService';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await authService.login(email, password);
      if (res.success) {
        onLogin(res.data.user, res.data.token);
      } else {
        setError(res.message || 'Login failed.');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Invalid email or password.');
      } else if (err.request) {
        setError('Cannot connect to server. Make sure the backend is running.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function quickLogin(role) {
    const creds = {
      FO: { email: 'arjun@educrm.in', password: 'fo123' },
      ZH: { email: 'priya@educrm.in', password: 'zh123' },
      RH: { email: 'rajesh@educrm.in', password: 'rh123' },
      SH: { email: 'anita@educrm.in', password: 'sh123' },
    }[role];
    if (creds) {
      setEmail(creds.email);
      setPassword(creds.password);
      setError('');
      setLoading(true);
      try {
        const res = await authService.login(creds.email, creds.password);
        if (res.success) {
          onLogin(res.data.user, res.data.token);
        } else {
          setError(res.message || 'Quick login failed.');
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.data?.message || 'Quick login failed.');
        } else if (err.request) {
          setError('Cannot connect to server. Make sure the backend is running.');
        } else {
          setError('Quick login failed. Please try manual login.');
        }
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">EduCRM</span>
          </div>
          <p className="text-blue-300 text-sm">AI-powered CRM for EdTech sales teams</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Sign in</h2>
          <p className="text-sm text-gray-500 mb-6">Role & territory assigned automatically.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
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
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or quick demo login</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { role: 'FO', label: 'Field Officer', color: 'border-teal-300 text-teal-700 hover:bg-teal-50' },
              { role: 'ZH', label: 'Zonal Head', color: 'border-purple-300 text-purple-700 hover:bg-purple-50' },
              { role: 'RH', label: 'Regional Head', color: 'border-amber-300 text-amber-700 hover:bg-amber-50' },
              { role: 'SH', label: 'Sales Head', color: 'border-blue-300 text-blue-700 hover:bg-blue-50' },
            ].map(({ role, label, color }) => (
              <button
                key={role}
                onClick={() => quickLogin(role)}
                disabled={loading}
                className={`border rounded-lg py-2 text-xs font-medium transition-colors disabled:opacity-50 ${color}`}
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
