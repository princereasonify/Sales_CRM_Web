import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Building2, DollarSign, Target } from 'lucide-react';
import { nationalData, fmt, healthColor } from '../../data/staticData';

const periods = ['Month-to-Date', 'Quarter-to-Date', 'Full FY'];

export default function NationalDashboard({ user }) {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('Month-to-Date');
  const nd = nationalData;
  const maxChart = Math.max(...nd.revenueChart.map(r => r.value));
  const maxLoss = Math.max(...nd.lossReasons.map(r => r.count));

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">National Dashboard</h2>
          <p className="text-sm text-gray-500">Real-time national sales performance</p>
        </div>
        <select
          value={period}
          onChange={e => setPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {periods.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: 'National Revenue MTD', value: fmt(nd.revenueMTD),
            sub: `${nd.targetPct}% of ${fmt(nd.revenueTarget)}`,
            pct: nd.targetPct, bar: 'bg-blue-500', large: true,
            icon: TrendingUp, iconBg: 'bg-blue-50', iconColor: 'text-blue-600',
          },
          {
            label: 'Schools Won MTD', value: nd.schoolsWon,
            sub: 'New contracts this month', pct: null,
            icon: Building2, iconBg: 'bg-teal-50', iconColor: 'text-teal-600',
          },
          {
            label: 'Total Pipeline Value', value: fmt(nd.pipelineValue),
            sub: `${(nd.pipelineValue / nd.revenueTarget).toFixed(1)}x target`, pct: null,
            icon: DollarSign, iconBg: 'bg-purple-50', iconColor: 'text-purple-600',
          },
          {
            label: 'National Win Rate', value: `${nd.winRate}%`,
            sub: 'All regions combined', pct: nd.winRate, bar: 'bg-teal-500',
            icon: Target, iconBg: 'bg-teal-50', iconColor: 'text-teal-600',
          },
        ].map(({ label, value, sub, pct, bar, icon: Icon, iconBg, iconColor }) => (
          <div key={label} className="kpi-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-2xl font-bold mt-1 text-gray-900">{value}</p>
              </div>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
                <Icon size={18} className={iconColor} />
              </div>
            </div>
            <p className="text-xs text-gray-400">{sub}</p>
            {pct !== null && pct !== undefined && (
              <div className="progress-bar mt-2">
                <div className={`progress-fill ${bar}`} style={{ width: `${pct}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Regional Scorecard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Regional Scorecard</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Region', 'Revenue', 'Target %', 'Schools', 'Win Rate', 'Forecast', 'Health'].map(h => (
                  <th key={h} className="table-th">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {nd.regions.map(region => (
                <tr key={region.id}
                  className={`hover:bg-gray-50 transition-colors cursor-pointer ${region.health === 'Weak' ? 'bg-red-50/30' : ''}`}
                  onClick={() => navigate('/region')}
                >
                  <td className="table-td font-semibold text-gray-800">{region.name}</td>
                  <td className="table-td text-gray-700">{fmt(region.revenue)}</td>
                  <td className="table-td">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{region.targetPct}%</span>
                      <div className="w-14 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${region.targetPct >= 70 ? 'bg-green-500' : region.targetPct >= 40 ? 'bg-amber-400' : 'bg-red-400'}`}
                          style={{ width: `${region.targetPct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="table-td text-gray-600">{region.schools}</td>
                  <td className="table-td text-gray-600">{region.winRate}%</td>
                  <td className="table-td text-gray-600">{fmt(region.forecast)}</td>
                  <td className="table-td">
                    <span className={`badge ${healthColor(region.health)}`}>{region.health}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue vs Forecast */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Revenue vs Forecast (6-Month)</h3>
          <div className="flex items-end gap-2 h-36">
            {nd.revenueChart.map(({ month, value }, i) => {
              const isCurrent = i === nd.revenueChart.length - 1;
              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-500">{fmt(value).replace('₹', '')}</span>
                  <div
                    className={`w-full rounded-t-md ${isCurrent ? 'bg-blue-600' : 'bg-blue-200'}`}
                    style={{ height: `${(value / maxChart) * 90}px` }}
                  />
                  <span className="text-xs text-gray-400">{month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Loss Reasons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Loss Reasons (This Month)</h3>
          <div className="space-y-3">
            {nd.lossReasons.map(({ reason, count }) => (
              <div key={reason}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{reason}</span>
                  <span className="font-medium text-gray-800">{count} deals</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill bg-red-400"
                    style={{ width: `${(count / maxLoss) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">Updated monthly · Guides pricing & product strategy</p>
        </div>
      </div>
    </div>
  );
}
