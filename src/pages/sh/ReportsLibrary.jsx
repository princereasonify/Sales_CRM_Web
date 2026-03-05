import { useState } from 'react';
import { BarChart3, TrendingDown, Filter, AlertOctagon, Map, Users, TrendingUp, School, Settings, Lock, Download, Eye } from 'lucide-react';

const reports = [
  {
    id: 1, title: 'Monthly Performance',
    desc: 'Revenue, targets, win rate, conversion — by region, zone, FO.',
    icon: BarChart3, roles: ['ZH', 'RH', 'SH'], color: 'text-blue-600', bg: 'bg-blue-50',
    category: 'Performance',
  },
  {
    id: 2, title: 'Deal Aging',
    desc: 'Deals stuck in the same stage for 10+ days.',
    icon: AlertOctagon, roles: ['ZH', 'RH', 'SH'], color: 'text-amber-600', bg: 'bg-amber-50',
    category: 'Pipeline',
  },
  {
    id: 3, title: 'Conversion Funnel',
    desc: 'Stage-by-stage drop-off rates across the pipeline.',
    icon: Filter, roles: ['ZH', 'RH', 'SH'], color: 'text-indigo-600', bg: 'bg-indigo-50',
    category: 'Pipeline',
  },
  {
    id: 4, title: 'Lost Deal Analysis',
    desc: 'Full breakdown of lost deals by reason, FO, zone, value.',
    icon: TrendingDown, roles: ['RH', 'SH'], color: 'text-red-600', bg: 'bg-red-50',
    category: 'Analysis',
  },
  {
    id: 5, title: 'Territory Coverage',
    desc: 'Map-based: schools contacted vs unreached by district.',
    icon: Map, roles: ['RH', 'SH'], color: 'text-teal-600', bg: 'bg-teal-50',
    category: 'Territory',
  },
  {
    id: 6, title: 'Team Leaderboard',
    desc: 'FO rankings across all KPIs for a selectable period.',
    icon: Users, roles: ['ZH', 'RH', 'SH'], color: 'text-purple-600', bg: 'bg-purple-50',
    category: 'Performance',
  },
  {
    id: 7, title: 'Revenue Forecast',
    desc: 'Weighted pipeline forecast vs official target.',
    icon: TrendingUp, roles: ['RH', 'SH'], color: 'text-green-600', bg: 'bg-green-50',
    category: 'Finance',
  },
  {
    id: 8, title: 'School Onboarding',
    desc: 'Won deals through kickoff, ERP setup, go-live tracking.',
    icon: School, roles: ['ZH', 'RH', 'SH'], color: 'text-cyan-600', bg: 'bg-cyan-50',
    category: 'Onboarding',
  },
  {
    id: 9, title: 'Custom Report Builder',
    desc: 'Build your own: choose dimensions + metrics, save as named report.',
    icon: Settings, roles: ['RH', 'SH'], color: 'text-gray-600', bg: 'bg-gray-50',
    category: 'Custom',
    custom: true,
  },
];

const categories = ['All', 'Performance', 'Pipeline', 'Analysis', 'Territory', 'Finance', 'Onboarding', 'Custom'];

export default function ReportsLibrary({ user }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewReport, setViewReport] = useState(null);

  const accessible = reports.filter(r => r.roles.includes(user.role));
  const filtered = accessible.filter(r => activeCategory === 'All' || r.category === activeCategory);

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Reports Library</h2>
        <p className="text-sm text-gray-500">Centralised library of all standard and custom reports</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors
              ${activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(report => {
          const Icon = report.icon;
          const hasAccess = report.roles.includes(user.role);

          return (
            <div key={report.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${hasAccess ? '' : 'opacity-60'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${report.bg}`}>
                  <Icon size={18} className={report.color} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{report.category}</span>
                  {!hasAccess && <Lock size={12} className="text-gray-400" />}
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">{report.title}</h3>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">{report.desc}</p>

              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {report.roles.map(role => (
                    <span key={role}
                      className={`text-xs px-1.5 py-0.5 rounded font-medium
                        ${role === 'SH' ? 'bg-blue-50 text-blue-600' :
                          role === 'RH' ? 'bg-amber-50 text-amber-600' :
                          role === 'ZH' ? 'bg-purple-50 text-purple-600' :
                          'bg-teal-50 text-teal-600'}`}>
                      {role}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewReport(report)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Eye size={12} />
                    View
                  </button>
                  <button
                    onClick={() => alert(`Downloading ${report.title}...`)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Download size={12} />
                    Export
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sample Report Modal */}
      {viewReport && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-800">{viewReport.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{viewReport.desc}</p>
              </div>
              <button onClick={() => setViewReport(null)} className="text-gray-400 hover:text-gray-600 text-xl font-light">✕</button>
            </div>
            <div className="p-6">
              <ReportPreview report={viewReport} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ReportPreview({ report }) {
  if (report.id === 1) {
    return (
      <table className="w-full text-sm">
        <thead>
          <tr>{['Region', 'Revenue', 'Target', '%', 'Win Rate'].map(h => <th key={h} className="table-th">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {[
            ['West',      '₹14.2Cr', '₹40Cr', '35%', '31%'],
            ['South',     '₹22.1Cr', '₹50Cr', '44%', '38%'],
            ['North',     '₹18.5Cr', '₹50Cr', '37%', '33%'],
            ['East',      '₹8.2Cr',  '₹30Cr', '27%', '22%'],
            ['North East','₹5.4Cr',  '₹30Cr', '18%', '14%'],
          ].map(row => (
            <tr key={row[0]}>{row.map((cell, i) => <td key={i} className="table-td">{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    );
  }
  if (report.id === 2) {
    return (
      <div className="space-y-3">
        {[
          { school: 'Vibgyor High Thane',  stage: 'Qualified',  days: 20, fo: 'Vikram Nair' },
          { school: 'Euro Kids Malad',     stage: 'Contacted',  days: 13, fo: 'Vikram Nair' },
          { school: 'Orchid Int\'l School', stage: 'Qualified', days: 15, fo: 'Sunita Reddy' },
        ].map(({ school, stage, days, fo }) => (
          <div key={school} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
            <div>
              <p className="text-sm font-medium text-gray-800">{school}</p>
              <p className="text-xs text-gray-500">{fo} · {stage}</p>
            </div>
            <span className="text-sm font-bold text-red-600">{days}d</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="text-center py-12 text-gray-400">
      <BarChart3 size={40} className="mx-auto mb-3 opacity-40" />
      <p className="text-sm">Interactive report preview coming soon.</p>
      <p className="text-xs mt-1">Use Export to download full data.</p>
    </div>
  );
}
