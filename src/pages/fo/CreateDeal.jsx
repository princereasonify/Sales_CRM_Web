import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, CheckCircle } from 'lucide-react';
import { dealService } from '../../api/dealService';
import { leadService } from '../../api/leadService';
import { modules, fmt } from '../../data/staticData';

const paymentTermsOptions = ['100% Upfront', '50% Upfront, 50% Post Go-Live', 'Quarterly', 'Annual'];
const durationOptions = ['1 Year', '2 Years', '3 Years', '5 Years'];

function approvalLevel(discount) {
  if (discount <= 10) return { level: 'Self-Approved', color: 'bg-green-50 border-green-200 text-green-800', approver: 'You (FO)' };
  if (discount <= 20) return { level: 'Zonal Head Approval', color: 'bg-amber-50 border-amber-200 text-amber-800', approver: 'Zonal Head' };
  if (discount <= 30) return { level: 'Regional Head Approval', color: 'bg-orange-50 border-orange-200 text-orange-800', approver: 'Regional Head' };
  return { level: 'Sales Head Approval', color: 'bg-red-50 border-red-200 text-red-800', approver: 'Sales Head' };
}

export default function CreateDeal({ user }) {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [selectedModules, setSelectedModules] = useState(['AI Voice', 'Curriculum', 'ERP']);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    leadId: '', contractValue: 0, discount: 8,
    paymentTerms: '50% Upfront, 50% Post Go-Live', duration: '3 Years',
    notes: '',
  });

  useEffect(() => {
    leadService.getPipeline()
      .then(res => {
        const items = res.data || [];
        setLeads(items);
        if (items.length > 0) setForm(f => ({ ...f, leadId: String(items[0].id), contractValue: items[0].value || 0 }));
      })
      .catch(() => {});
  }, []);

  const finalValue = Math.round(form.contractValue * (1 - form.discount / 100));
  const approval = approvalLevel(Number(form.discount));
  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  function toggleModule(mod) {
    setSelectedModules(prev => prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.leadId) { alert('Please select a lead.'); return; }
    setSaving(true);
    try {
      await dealService.createDeal({
        leadId: Number(form.leadId),
        contractValue: Number(form.contractValue),
        discount: Number(form.discount),
        paymentTerms: form.paymentTerms,
        duration: form.duration,
        modules: selectedModules,
        notes: form.notes,
        submitForApproval: true,
      });
      alert('Deal submitted successfully!');
      navigate('/leads');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create deal.');
    } finally {
      setSaving(false);
    }
  }

  const inputCls = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400';

  return (
    <div className="max-w-2xl space-y-4">
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Linked Lead</h3>
          <select value={form.leadId} onChange={e => {
            const lead = leads.find(l => l.id === Number(e.target.value));
            setForm(f => ({ ...f, leadId: e.target.value, contractValue: lead?.value || f.contractValue }));
          }} className={inputCls}>
            <option value="">Select a lead</option>
            {leads.map(l => <option key={l.id} value={l.id}>{l.school}</option>)}
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Commercial Terms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Contract Value (₹)</label>
              <input type="number" value={form.contractValue} onChange={set('contractValue')} className={inputCls} />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Discount %</label>
              <input type="number" min="0" max="50" value={form.discount} onChange={set('discount')} className={inputCls} />
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
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-600">Final Deal Value</span>
            <span className="text-lg font-bold text-teal-700">{fmt(finalValue)}</span>
          </div>
        </div>

        <div className={`p-4 rounded-xl border flex items-start gap-3 ${approval.color}`}>
          <Info size={16} className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold">{approval.level}</p>
            <p className="text-xs mt-0.5">
              {Number(form.discount) <= 10 ? 'Within your authority. Deal will be self-approved.' : `Approver: ${approval.approver}. Deal will be locked until decision.`}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Product Modules</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {modules.map(mod => (
              <button key={mod} type="button" onClick={() => toggleModule(mod)}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium border-2 transition-colors
                  ${selectedModules.includes(mod) ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                {selectedModules.includes(mod) && <CheckCircle size={11} className="inline mr-1" />}
                {mod}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Deal Notes</h3>
          <textarea value={form.notes} onChange={set('notes')} rows={3}
            placeholder="Context for the approver..." className={`${inputCls} resize-none`} />
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => navigate(-1)}
            className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button type="submit" disabled={saving}
            className="flex-1 py-2.5 bg-teal-600 rounded-lg text-sm text-white font-medium hover:bg-teal-700 transition-colors disabled:opacity-50">
            {saving ? 'Submitting...' : 'Submit Deal'}
          </button>
        </div>
      </form>
    </div>
  );
}
