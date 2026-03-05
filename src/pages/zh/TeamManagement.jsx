import { useState } from 'react';
import { AlertTriangle, Plus } from 'lucide-react';
import { foPerformance, fmt, statusColor } from '../../data/staticData';

function FOCard({ fo }) {
  const [showModal, setShowModal] = useState(false);
  const borderColor = fo.status === 'On Track' ? 'border-l-green-400' : fo.status === 'At Risk' ? 'border-l-amber-400' : 'border-l-red-400';

  return (
    <>
      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 ${borderColor} p-5`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold text-sm flex items-center justify-center">
              {fo.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{fo.name}</p>
              <p className="text-xs text-gray-500">{fo.territory}</p>
            </div>
          </div>
          <span className={`badge ${statusColor(fo.status)}`}>{fo.status}</span>
        </div>

        {/* 3 mini stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Revenue', value: fmt(fo.revenue), sub: `${fo.targetPct}%` },
            { label: 'Visits/Wk', value: fo.visitsWeek, warn: fo.visitsWeek < 15 },
            { label: 'Deals Won', value: fo.dealsWon },
          ].map(({ label, value, sub, warn }) => (
            <div key={label} className="text-center bg-gray-50 rounded-lg p-2">
              <p className={`text-base font-bold ${warn ? 'text-amber-600' : 'text-gray-800'}`}>{value}</p>
              {sub && <p className="text-xs text-teal-600 font-medium">{sub}</p>}
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Target Progress</span>
            <span>{fo.targetPct}%</span>
          </div>
          <div className="progress-bar">
            <div
              className={`progress-fill ${fo.targetPct >= 70 ? 'bg-green-500' : fo.targetPct >= 40 ? 'bg-amber-400' : 'bg-red-400'}`}
              style={{ width: `${fo.targetPct}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-100 transition-colors"
          >
            <Plus size={12} />
            Assign Task
          </button>
          {fo.status === 'Underperforming' && (
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors">
              <AlertTriangle size={12} />
              Coaching Needed
            </button>
          )}
        </div>
      </div>

      {/* Assign Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
            <h3 className="text-base font-semibold text-gray-800">Assign Task to {fo.name}</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Task</label>
                <input
                  type="text"
                  placeholder="e.g. Schedule demo for DPS Andheri"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Due Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => { alert(`Task assigned to ${fo.name}!`); setShowModal(false); }} className="flex-1 py-2.5 bg-purple-600 rounded-lg text-sm text-white hover:bg-purple-700">Assign</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function TeamManagement({ user }) {
  return (
    <div className="space-y-5 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Team Management</h2>
          <p className="text-sm text-gray-500">Mumbai West Zone · {foPerformance.length} Field Officers</p>
        </div>
        <div className="flex gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full inline-block" />On Track</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-400 rounded-full inline-block" />At Risk</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-400 rounded-full inline-block" />Underperforming</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...foPerformance].sort((a, b) => b.targetPct - a.targetPct).map(fo => (
          <FOCard key={fo.id} fo={fo} />
        ))}
      </div>
    </div>
  );
}
