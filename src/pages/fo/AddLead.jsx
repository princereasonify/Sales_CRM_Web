import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { leadService } from '../../api/leadService';
import { boards, schoolTypes, leadSources } from '../../data/staticData';

function Section({ title, open, onToggle, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4 border-t border-gray-100">{children}</div>}
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400';

export default function AddLead({ user }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState({ school: true, location: true, contact: true, deal: false, notes: false });
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    school: '', type: '', board: '', students: '',
    city: '', state: '', source: 'Field Visit',
    contactName: '', contactDesignation: '', contactPhone: '', contactEmail: '',
    value: '', closeDate: '', notes: '',
  });

  const toggle = key => setOpen(o => ({ ...o, [key]: !o[key] }));
  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  async function handleSave(e) {
    e.preventDefault();
    if (!form.school || !form.city || !form.contactPhone) {
      alert('Please fill in required fields: School Name, City, and Contact Phone.');
      return;
    }
    setSaving(true);
    try {
      await leadService.createLead({
        school: form.school,
        board: form.board,
        city: form.city,
        state: form.state,
        students: form.students ? Number(form.students) : 0,
        type: form.type,
        source: form.source,
        value: form.value ? Number(form.value) : 0,
        closeDate: form.closeDate || null,
        notes: form.notes,
        contactName: form.contactName,
        contactDesignation: form.contactDesignation,
        contactPhone: form.contactPhone,
        contactEmail: form.contactEmail,
      });
      navigate('/leads');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create lead.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/leads')} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Add New Lead</h2>
          <p className="text-xs text-gray-500">Create a new school lead</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-3">
        <Section title="School Information" open={open.school} onToggle={() => toggle('school')}>
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="School Name" required>
              <input value={form.school} onChange={set('school')} placeholder="e.g. DPS Andheri" className={inputCls} />
            </Field>
            <Field label="School Type">
              <select value={form.type} onChange={set('type')} className={inputCls}>
                <option value="">Select type</option>
                {schoolTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Board">
              <select value={form.board} onChange={set('board')} className={inputCls}>
                <option value="">Select board</option>
                {boards.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Student Strength">
              <input type="number" value={form.students} onChange={set('students')} placeholder="e.g. 1200" className={inputCls} />
            </Field>
          </div>
        </Section>

        <Section title="Location" open={open.location} onToggle={() => toggle('location')}>
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="City" required>
              <input value={form.city} onChange={set('city')} placeholder="e.g. Mumbai" className={inputCls} />
            </Field>
            <Field label="State">
              <input value={form.state} onChange={set('state')} placeholder="e.g. Maharashtra" className={inputCls} />
            </Field>
            <Field label="Lead Source">
              <select value={form.source} onChange={set('source')} className={inputCls}>
                {leadSources.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          </div>
        </Section>

        <Section title="Decision Maker" open={open.contact} onToggle={() => toggle('contact')}>
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Contact Name">
              <input value={form.contactName} onChange={set('contactName')} placeholder="e.g. Mrs. Kavita Sharma" className={inputCls} />
            </Field>
            <Field label="Designation">
              <input value={form.contactDesignation} onChange={set('contactDesignation')} placeholder="e.g. Principal" className={inputCls} />
            </Field>
            <Field label="Phone" required>
              <input value={form.contactPhone} onChange={set('contactPhone')} placeholder="+91 98XXX XXXXX" className={inputCls} />
            </Field>
            <Field label="Email">
              <input type="email" value={form.contactEmail} onChange={set('contactEmail')} placeholder="principal@school.edu" className={inputCls} />
            </Field>
          </div>
        </Section>

        <Section title="Deal Estimates" open={open.deal} onToggle={() => toggle('deal')}>
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Est. Deal Value (₹)">
              <input type="number" value={form.value} onChange={set('value')} placeholder="e.g. 480000" className={inputCls} />
            </Field>
            <Field label="Expected Close Date">
              <input type="date" value={form.closeDate} onChange={set('closeDate')} className={inputCls} />
            </Field>
          </div>
        </Section>

        <Section title="Initial Notes" open={open.notes} onToggle={() => toggle('notes')}>
          <div className="pt-4">
            <textarea value={form.notes} onChange={set('notes')} rows={4}
              placeholder="First impressions, context, anything useful..." className={`${inputCls} resize-none`} />
          </div>
        </Section>

        <div className="flex items-center gap-3 pt-2">
          <button type="button" onClick={() => navigate('/leads')}
            className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={saving}
            className="flex-1 py-2.5 bg-teal-600 rounded-lg text-sm text-white font-medium hover:bg-teal-700 transition-colors disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Lead'}
          </button>
        </div>
      </form>
    </div>
  );
}
