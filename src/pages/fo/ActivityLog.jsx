import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { activities, activityTypeStyle, outcomeColor, daysAgo } from '../../data/staticData';

const kpiCards = [
  { label: 'Visits This Week',   value: 12, target: 15, pct: 80,  bar: 'bg-amber-400', warn: true  },
  { label: 'Demos This Month',   value: 7,  target: 8,  pct: 87,  bar: 'bg-indigo-500', warn: false },
  { label: 'Calls This Week',    value: 14, target: 15, pct: 93,  bar: 'bg-teal-500',  warn: false },
];

const typeOptions = ['All', 'Visit', 'Call', 'Demo', 'Proposal', 'Follow-up', 'Contract'];
const outcomeOptions = ['All', 'Positive', 'Neutral', 'Negative', 'Pending'];

export default function ActivityLog({ user }) {
  const [typeFilter, setTypeFilter] = useState('All');
  const [outcomeFilter, setOutcomeFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = activities.filter(a => {
    const matchType = typeFilter === 'All' || a.type === typeFilter;
    const matchOutcome = outcomeFilter === 'All' || a.outcome === outcomeFilter;
    return matchType && matchOutcome;
  });

  return (
    <div className="max-w-5xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Activity Log</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Plus size={15} />
          Log Activity
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {kpiCards.map(({ label, value, target, pct, bar, warn }) => (
          <div key={label} className="kpi-card">
            <div className="flex items-end justify-between mb-1">
              <p className="text-xs text-gray-500 font-medium">{label}</p>
              <p className="text-xs text-gray-400">Target: {target}</p>
            </div>
            <p className={`text-2xl font-bold ${warn ? 'text-amber-600' : 'text-gray-900'}`}>{value}</p>
            <div className="progress-bar mt-2">
              <div className={`progress-fill ${bar}`} style={{ width: `${pct}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">{pct}% of target</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Type:</span>
          <div className="flex gap-1 flex-wrap">
            {typeOptions.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors
                  ${typeFilter === t ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Outcome:</span>
          <div className="flex gap-1 flex-wrap">
            {outcomeOptions.map(o => (
              <button key={o} onClick={() => setOutcomeFilter(o)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors
                  ${outcomeFilter === o ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {o}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Type', 'School', 'Notes', 'Date', 'Outcome', ''].map(h => (
                  <th key={h} className="table-th">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="table-td text-center text-gray-400 py-10">
                    No activities match your filters.
                  </td>
                </tr>
              ) : filtered.map(act => (
                <>
                  <tr key={act.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setExpanded(expanded === act.id ? null : act.id)}
                  >
                    <td className="table-td">
                      <span className={`badge ${activityTypeStyle(act.type)}`}>{act.type}</span>
                    </td>
                    <td className="table-td font-medium text-gray-800">{act.school}</td>
                    <td className="table-td text-gray-500 max-w-xs truncate">{act.notes}</td>
                    <td className="table-td text-gray-500">{daysAgo(act.date)}</td>
                    <td className="table-td">
                      <span className={`text-sm font-medium ${outcomeColor(act.outcome)}`}>{act.outcome}</span>
                    </td>
                    <td className="table-td">
                      <ChevronDown size={14} className={`text-gray-400 transition-transform ${expanded === act.id ? 'rotate-180' : ''}`} />
                    </td>
                  </tr>
                  {expanded === act.id && (
                    <tr key={`${act.id}-expanded`}>
                      <td colSpan={6} className="px-4 pb-4 pt-0 bg-gray-50">
                        <div className="p-4 bg-white rounded-lg border border-gray-100 text-sm text-gray-600">
                          <p className="font-medium text-gray-700 mb-1">Full Notes</p>
                          <p>{act.notes}</p>
                          <p className="text-xs text-gray-400 mt-2">{act.date}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Activity Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-semibold text-gray-800">Log New Activity</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Activity Type</label>
                <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                  {['Visit', 'Call', 'Demo', 'Proposal', 'Follow-up'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Linked Lead</label>
                <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                  <option>DPS Andheri</option>
                  <option>Ryan International Borivali</option>
                  <option>Campion School</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Outcome</label>
                <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                  {['Positive', 'Neutral', 'Negative', 'Pending'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Notes</label>
                <textarea rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none" placeholder="What happened?" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Next Action</label>
                <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="e.g. Send proposal by March 8" />
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => { alert('Activity logged!'); setShowModal(false); }} className="flex-1 py-2.5 bg-teal-600 rounded-lg text-sm text-white hover:bg-teal-700">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
