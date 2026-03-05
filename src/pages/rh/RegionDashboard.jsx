import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, CheckCircle, Target } from 'lucide-react';
import { regionData, fmt, healthColor } from '../../data/staticData';

export default function RegionDashboard({ user }) {
  const navigate = useNavigate();
  const rd = regionData;

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{rd.name}</h2>
        <p className="text-sm text-gray-500">Regional performance overview · March 2026</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: 'Region Revenue MTD', value: fmt(rd.revenueMTD),
            sub: `${rd.targetPct}% of ${fmt(rd.revenueTarget)}`,
            pct: rd.targetPct, bar: 'bg-amber-500',
            icon: TrendingUp, iconBg: 'bg-amber-50', iconColor: 'text-amber-600',
          },
          {
            label: 'Active Leads', value: rd.activeLeads,
            sub: 'Across all zones', pct: null,
            icon: Users, iconBg: 'bg-blue-50', iconColor: 'text-blue-600',
          },
          {
            label: 'Deals Won MTD', value: rd.dealsWon,
            sub: `${rd.winRate}% win rate`,
            pct: rd.winRate, bar: 'bg-teal-500',
            icon: CheckCircle, iconBg: 'bg-teal-50', iconColor: 'text-teal-600',
          },
          {
            label: 'Forecast Accuracy', value: `${rd.forecastAccuracy}%`,
            sub: 'Target: ±15%',
            pct: rd.forecastAccuracy, bar: 'bg-amber-500',
            icon: Target, iconBg: 'bg-amber-50', iconColor: 'text-amber-600',
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
                <div className={`progress-fill ${bar}`} style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Zone Comparison Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">Zone Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {['Zone', 'Revenue', 'Target %', 'Win Rate', 'Pipeline', 'Health'].map(h => (
                    <th key={h} className="table-th">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rd.zones.map(zone => (
                  <tr key={zone.id}
                    className={`hover:bg-gray-50 transition-colors ${zone.health === 'Weak' ? 'bg-red-50/30' : ''}`}
                  >
                    <td className="table-td font-medium text-gray-800">{zone.name}</td>
                    <td className="table-td text-gray-700">{fmt(zone.revenue)}</td>
                    <td className="table-td">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{zone.targetPct}%</span>
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${zone.targetPct >= 70 ? 'bg-green-500' : zone.targetPct >= 40 ? 'bg-amber-400' : 'bg-red-400'}`}
                            style={{ width: `${zone.targetPct}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="table-td text-gray-600">{zone.winRate}%</td>
                    <td className="table-td text-gray-600">{zone.pipeline}</td>
                    <td className="table-td">
                      <span className={`badge ${healthColor(zone.health)}`}>{zone.health}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Forecast vs Actual */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Forecast vs Actual</h3>
          {[
            { label: 'Forecast MTD',    value: '₹16.2Cr', color: 'text-blue-600' },
            { label: 'Actual MTD',      value: fmt(rd.revenueMTD), color: 'text-teal-600' },
            { label: 'Accuracy',        value: `${rd.forecastAccuracy}%`, color: 'text-amber-600' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-500">{label}</span>
              <span className={`text-base font-bold ${color}`}>{value}</span>
            </div>
          ))}

          {/* Revenue Trend Chart */}
          <h3 className="text-sm font-semibold text-gray-700 mt-5 mb-3">6-Month Revenue Trend</h3>
          <div className="flex items-end gap-1.5 h-24">
            {rd.revenueChart.map(({ month, value }, i) => {
              const maxVal = Math.max(...rd.revenueChart.map(r => r.value));
              const heightPct = (value / maxVal) * 100;
              const isCurrent = i === rd.revenueChart.length - 1;
              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t-md ${isCurrent ? 'bg-amber-500' : 'bg-amber-200'}`}
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-xs text-gray-400">{month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Territory Coverage Map (Schematic) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Territory Coverage</h3>
        <div className="flex flex-wrap gap-3">
          {rd.zones.map(zone => {
            const dot = zone.health === 'Strong' ? 'bg-green-500' :
                        zone.health === 'Good'   ? 'bg-teal-500' :
                        zone.health === 'At Risk'? 'bg-amber-500' : 'bg-red-500';
            const size = zone.pipeline > 35 ? 'w-14 h-14 text-sm' : zone.pipeline > 25 ? 'w-12 h-12 text-xs' : 'w-10 h-10 text-xs';
            return (
              <button key={zone.id}
                className={`${dot} ${size} rounded-full text-white font-semibold flex flex-col items-center justify-center shadow-sm hover:opacity-90 transition-opacity`}
                title={`${zone.name}: ${zone.pipeline} leads`}
              >
                <span>{zone.name.split(' ')[0]}</span>
                <span className="text-xs opacity-80">{zone.pipeline}</span>
              </button>
            );
          })}
          <div className="flex flex-col justify-center ml-4 gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-green-500 rounded-full" />Strong</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-teal-500 rounded-full" />Good</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-amber-500 rounded-full" />At Risk</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-red-500 rounded-full" />Weak</div>
            <p className="text-gray-400">Size = lead count</p>
          </div>
        </div>
      </div>
    </div>
  );
}
