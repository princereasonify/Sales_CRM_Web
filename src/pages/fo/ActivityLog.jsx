import React, { useState, useEffect } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { activityService } from '../../api/activityService';
import { leadService } from '../../api/leadService';
import { activityTypeStyle, outcomeColor, daysAgo } from '../../data/staticData';

const typeOptions = ['All', 'Visit', 'Call', 'Demo', 'Proposal', 'FollowUp', 'Contract'];
const typeLabels = { FollowUp: 'Follow-up' };
const outcomeOptions = ['All', 'Positive', 'Neutral', 'Negative', 'Pending'];

export default function ActivityLog({ user }) {
  const [typeFilter, setTypeFilter] = useState('All');
  const [outcomeFilter, setOutcomeFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);

  const [actForm, setActForm] = useState({ type: 'Visit', leadId: '', outcome: 'Positive', notes: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const params = {};
    if (typeFilter !== 'All') params.type = typeFilter;
    activityService.getActivities(params)
      .then(res => setActivities(res.data.items || []))
      .catch(err => console.error('Activities error:', err))
      .finally(() => setLoading(false));
  }, [typeFilter]);

  useEffect(() => {
    leadService.getLeads({ pageSize: 50 })
      .then(res => setLeads(res.data.items || []))
      .catch(() => {});
  }, []);

  const filtered = activities.filter(a => {
    return outcomeFilter === 'All' || a.outcome === outcomeFilter;
  });

  async function handleSaveActivity() {
    if (!actForm.leadId) { alert('Please select a lead.'); return; }
    setSaving(true);
    try {
      await activityService.createActivity({
        type: actForm.type,
        date: new Date().toISOString(),
        outcome: actForm.outcome,
        notes: actForm.notes,
        leadId: Number(actForm.leadId),
        gpsVerified: false,
      });
      setShowModal(false);
      setActForm({ type: 'Visit', leadId: '', outcome: 'Positive', notes: '' });
      // Refresh
      const res = await activityService.getActivities(typeFilter !== 'All' ? { type: typeFilter } : {});
      setActivities(res.data.items || []);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to log activity.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-5xl space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Activity Log</h2>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors">
          <Plus size={15} /> Log Activity
        </button>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Type:</span>
          <div className="flex gap-1 flex-wrap">
            {typeOptions.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors
                  ${typeFilter === t ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {typeLabels[t] || t}
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading activities...</div>
        ) : (
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
                  <tr><td colSpan={6} className="table-td text-center text-gray-400 py-10">No activities match your filters.</td></tr>
                ) : filtered.map(act => (
                  <React.Fragment key={act.id}>
                    <tr className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setExpanded(expanded === act.id ? null : act.id)}>
                      <td className="table-td">
                        <span className={`badge ${activityTypeStyle(act.type)}`}>{typeLabels[act.type] || act.type}</span>
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
                      <tr>
                        <td colSpan={6} className="px-4 pb-4 pt-0 bg-gray-50">
                          <div className="p-4 bg-white rounded-lg border border-gray-100 text-sm text-gray-600">
                            <p className="font-medium text-gray-700 mb-1">Full Notes</p>
                            <p>{act.notes}</p>
                            <p className="text-xs text-gray-400 mt-2">{new Date(act.date).toLocaleDateString()}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-semibold text-gray-800">Log New Activity</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Activity Type</label>
                <select value={actForm.type} onChange={e => setActForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                  {['Visit', 'Call', 'Demo', 'Proposal', 'FollowUp', 'Contract'].map(t => <option key={t} value={t}>{typeLabels[t] || t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Linked Lead</label>
                <select value={actForm.leadId} onChange={e => setActForm(f => ({ ...f, leadId: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                  <option value="">Select a lead</option>
                  {leads.map(l => <option key={l.id} value={l.id}>{l.school}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Outcome</label>
                <select value={actForm.outcome} onChange={e => setActForm(f => ({ ...f, outcome: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                  {['Positive', 'Neutral', 'Negative', 'Pending'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Notes</label>
                <textarea rows={3} value={actForm.notes} onChange={e => setActForm(f => ({ ...f, notes: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none" placeholder="What happened?" />
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveActivity} disabled={saving}
                className="flex-1 py-2.5 bg-teal-600 rounded-lg text-sm text-white hover:bg-teal-700 disabled:opacity-50">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
