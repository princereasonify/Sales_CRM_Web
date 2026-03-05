import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, CheckCircle } from 'lucide-react';
import { modules, leads, fmt } from '../../data/staticData';

const paymentTermsOptions = ['100% Upfront', '50% Upfront, 50% Post Go-Live', 'Quarterly', 'Annual'];
const durationOptions = ['1 Year', '2 Years', '3 Years', '5 Years'];

function approvalLevel(discount) {
  if (discount <= 10) return { level: 'Self-Approved', color: 'bg-green-50 border-green-200 text-green-800', approver: 'You (FO)' };
  if (discount <= 20) return { level: 'Zonal Head Approval', color: 'bg-amber-50 border-amber-200 text-amber-800', approver: 'Priya Singh (ZH)' };
  if (discount <= 30) return { level: 'Regional Head Approval', color: 'bg-orange-50 border-orange-200 text-orange-800', approver: 'Rajesh Kumar (RH)' };
  return { level: 'Sales Head Approval', color: 'bg-red-50 border-red-200 text-red-800', approver: 'Anita Sharma (SH)' };
}

export default function CreateDeal({ user }) {
  const navigate = useNavigate();
  const [selectedModules, setSelectedModules] = useState(['AI Voice', 'Curriculum', 'ERP']);
  const [form, setForm] = useState({
    leadId: '1',
    contractValue: 480000,
    discount: 8,
    paymentTerms: '50% Upfront, 50% Post Go-Live',
    duration: '3 Years',
    students: 1200,
    closeDate: '2026-03-20',
    notes: '',
  });

  const finalValue = Math.round(form.contractValue * (1 - form.discount / 100));
  const approval = approvalLevel(Number(form.discount));

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  function toggleModule(mod) {
    setSelectedModules(prev =>
      prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const lead = leads.find(l => l.id === Number(form.leadId));
    alert(`Deal for "${lead?.school || 'school'}" submitted!\nApproval route: ${approval.approver}`);
    navigate('/leads');
  }

  const inputCls = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400';

  return (
    <div className="max-w-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Create Deal</h2>
          <p className="text-xs text-gray-500">Formalise a school's purchase intent</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Lead selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Linked Lead</h3>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Select Lead</label>
            <select value={form.leadId} onChange={set('leadId')} className={inputCls}>
              {leads.filter(l => !['New Lead', 'Contacted', 'Won', 'Lost'].includes(l.stage)).map(l => (
                <option key={l.id} value={l.id}>{l.school} — {l.stage}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Commercial Terms */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Commercial Terms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Contract Value (₹)</label>
              <input type="number" value={form.contractValue} onChange={set('contractValue')} className={inputCls} />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Discount %</label>
              <input
                type="number" min="0" max="50" value={form.discount}
                onChange={set('discount')} className={inputCls}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Payment Terms</label>
              <select value={form.paymentTerms} onChange={set('paymentTerms')} className={inputCls}>
                {paymentTermsOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Contract Duration</label>
              <select value={form.duration} onChange={set('duration')} className={inputCls}>
                {durationOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Student Count</label>
              <input type="number" value={form.students} onChange={set('students')} className={inputCls} />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Expected Close Date</label>
              <input type="date" value={form.closeDate} onChange={set('closeDate')} className={inputCls} />
            </div>
          </div>

          {/* Final Value */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-600">Final Deal Value</span>
            <span className="text-lg font-bold text-teal-700">{fmt(finalValue)}</span>
          </div>
        </div>

        {/* Approval Banner */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${approval.color}`}>
          <Info size={16} className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold">{approval.level}</p>
            <p className="text-xs mt-0.5">
              {Number(form.discount) <= 10
                ? 'Within your authority. Deal will be self-approved.'
                : `Approver: ${approval.approver}. Deal will be locked until decision.`}
            </p>
          </div>
        </div>

        {/* Product Modules */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Product Modules</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {modules.map(mod => (
              <button
                key={mod}
                type="button"
                onClick={() => toggleModule(mod)}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium border-2 transition-colors
                  ${selectedModules.includes(mod)
                    ? 'bg-blue-50 border-blue-400 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'}`}
              >
                {selectedModules.includes(mod) && <CheckCircle size={11} className="inline mr-1" />}
                {mod}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">{selectedModules.length} module{selectedModules.length !== 1 ? 's' : ''} selected</p>
        </div>

        {/* Deal Notes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Deal Notes</h3>
          <textarea
            value={form.notes}
            onChange={set('notes')}
            rows={3}
            placeholder="Context for the approver — key school facts, special requests, urgency..."
            className={`${inputCls} resize-none`}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate(-1)}
            className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="button"
            className="flex-1 py-2.5 border border-teal-200 bg-teal-50 rounded-lg text-sm text-teal-700 hover:bg-teal-100 transition-colors">
            Save Draft
          </button>
          <button type="submit"
            className="flex-1 py-2.5 bg-teal-600 rounded-lg text-sm text-white font-medium hover:bg-teal-700 transition-colors">
            Submit Deal
          </button>
        </div>
      </form>
    </div>
  );
}
