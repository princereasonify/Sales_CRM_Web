import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Clock, Target, AlertTriangle, Check, X } from 'lucide-react';
import { dashboardService } from '../../api/dashboardService';
import { dealService } from '../../api/dealService';
import { fmt, statusColor } from '../../data/staticData';

export default function ZoneDashboard({ user }) {
  const navigate = useNavigate();
  const [zd, setZd] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    dashboardService.getZoneDashboard()
      .then(res => setZd(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-gray-400">Loading zone dashboard...</p></div>;
  if (!zd) return <div className="flex items-center justify-center h-64"><p className="text-gray-400">No data available.</p></div>;

  const pct = zd.targetPct;
  const pendingDeals = zd.pendingDeals || [];
  const foPerformance = zd.foPerformance || [];

  const handleApprove = async (dealId, school) => {
    try {
      await dealService.approveDeal(dealId, { approved: true });
      alert(`Deal for ${school} approved!`);
      loadData();
    } catch { alert('Failed to approve deal.'); }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{zd.zoneName}</h2>
        <p className="text-sm text-gray-500">Zone performance overview · March 2026</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: 'Zone Revenue MTD', value: fmt(zd.revenueMTD),
            sub: `${pct}% of ${fmt(zd.revenueTarget)} target`,
            pct, bar: pct >= 70 ? 'bg-purple-500' : pct >= 40 ? 'bg-amber-400' : 'bg-red-400',
            icon: TrendingUp, iconBg: 'bg-purple-50', iconColor: 'text-purple-600',
          },
          {
            label: 'Active Pipeline', value: zd.activePipeline,
            sub: 'Leads across all FOs', pct: null,
            icon: Users, iconBg: 'bg-blue-50', iconColor: 'text-blue-600',
          },
          {
            label: 'Pending Approvals', value: zd.pendingApprovals,
            sub: pendingDeals.length > 0 ? 'Action required' : 'All clear',
            pct: null, warn: pendingDeals.length > 0,
            icon: Clock, iconBg: 'bg-amber-50', iconColor: 'text-amber-600',
          },
          {
            label: 'Zone Win Rate', value: `${zd.winRate}%`,
            sub: 'Month to date', pct: zd.winRate, bar: 'bg-teal-500',
            icon: Target, iconBg: 'bg-teal-50', iconColor: 'text-teal-600',
          },
        ].map(({ label, value, sub, pct: p, bar, warn, icon: Icon, iconBg, iconColor }) => (
          <div key={label} className="kpi-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
                <p className={`text-2xl font-bold mt-1 ${warn ? 'text-red-600' : 'text-gray-900'}`}>{value}</p>
              </div>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
                <Icon size={18} className={iconColor} />
              </div>
            </div>
            <p className="text-xs text-gray-400">{sub}</p>
            {p !== null && p !== undefined && (
              <div className="progress-bar mt-2">
                <div className={`progress-fill ${bar}`} style={{ width: `${p}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pending Approvals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <AlertTriangle size={16} className="text-amber-500" />
            <h3 className="text-sm font-semibold text-gray-700">Pending Deal Approvals</h3>
          </div>
          <div className="p-4 space-y-3">
            {pendingDeals.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">No pending approvals.</p>
            ) : pendingDeals.map(deal => (
              <div key={deal.id} className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{deal.school}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {deal.foName} · {fmt(deal.finalValue)} · {deal.discount}% off
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">Submitted {deal.submittedAt ? new Date(deal.submittedAt).toLocaleDateString() : ''}</p>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => handleApprove(deal.id, deal.school)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
                    >
                      <Check size={12} />
                      Approve
                    </button>
                    <button
                      onClick={() => alert('Rejection note required.')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
                    >
                      <X size={12} />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FO Leaderboard */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">FO Leaderboard</h3>
            <button onClick={() => navigate('/team')} className="text-xs text-purple-600 hover:underline">View Team</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {['FO', 'Revenue', 'Target %', 'Visits/Wk', 'Status'].map(h => (
                    <th key={h} className="table-th">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {foPerformance.map((fo, i) => (
                  <tr key={fo.foId} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate('/team')}>
                    <td className="table-td">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : ''}</span>
                        <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">
                          {fo.avatar}
                        </div>
                        <span className="text-sm font-medium text-gray-800">{fo.name.split(' ')[0]}</span>
                      </div>
                    </td>
                    <td className="table-td text-gray-700 font-medium">{fmt(fo.revenue)}</td>
                    <td className="table-td">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">{fo.targetPct}%</span>
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${fo.targetPct >= 70 ? 'bg-teal-500' : fo.targetPct >= 40 ? 'bg-amber-400' : 'bg-red-400'}`}
                            style={{ width: `${fo.targetPct}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className={`table-td font-medium ${fo.visitsWeek >= 15 ? 'text-teal-600' : fo.visitsWeek >= 10 ? 'text-amber-600' : 'text-red-600'}`}>
                      {fo.visitsWeek}
                    </td>
                    <td className="table-td">
                      <span className={`badge ${statusColor(fo.status)}`}>{fo.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Zone Pipeline Funnel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Zone Pipeline Funnel (All FOs)</h3>
        <div className="flex items-end gap-3 h-32">
          {[
            { stage: 'New/Contacted', count: 7,  color: 'bg-gray-300' },
            { stage: 'Qualified',     count: 9,  color: 'bg-sky-400' },
            { stage: 'Demo',          count: 6,  color: 'bg-indigo-400' },
            { stage: 'Proposal',      count: 4,  color: 'bg-amber-400' },
            { stage: 'Won',           count: 2,  color: 'bg-teal-500' },
          ].map(({ stage, count, color }) => (
            <div key={stage} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-sm font-bold text-gray-700">{count}</span>
              <div className={`w-full ${color} rounded-t-lg`} style={{ height: `${(count / 9) * 80}px` }} />
              <span className="text-xs text-gray-500 text-center">{stage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
