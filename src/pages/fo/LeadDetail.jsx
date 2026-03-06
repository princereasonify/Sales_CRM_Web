import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Edit, Plus, ArrowRight, Navigation } from 'lucide-react';
import { leadService } from '../../api/leadService';
import { stageColor, activityTypeStyle, outcomeColor, fmt } from '../../data/staticData';

const stageMap = {
  NewLead: 'New Lead', Contacted: 'Contacted', Qualified: 'Qualified',
  DemoStage: 'Demo Stage', DemoDone: 'Demo Done', ProposalSent: 'Proposal Sent',
  Negotiation: 'Negotiation', ContractSent: 'Contract Sent', Won: 'Won', Lost: 'Lost',
};

const stageOrder = [
  'New Lead', 'Contacted', 'Qualified', 'Demo Stage',
  'Demo Done', 'Proposal Sent', 'Negotiation', 'Contract Sent', 'Won',
];

const activityIcons = {
  Visit: '🏫', Call: '📞', Demo: '💻', Proposal: '📄', FollowUp: '🔄', Contract: '✅',
};

export default function LeadDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    leadService.getLeadById(id)
      .then(res => setLead(res.data))
      .catch(err => console.error('Lead detail error:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="text-gray-400">Loading lead...</div></div>;
  if (!lead) {
    return (
      <div className="text-center py-16 text-gray-400">
        Lead not found.
        <br />
        <button onClick={() => navigate('/leads')} className="mt-4 text-teal-600 hover:underline text-sm">Back to Leads</button>
      </div>
    );
  }

  const stage = stageMap[lead.stage] || lead.stage;
  const stageIdx = stageOrder.indexOf(stage);
  const displayStages = stageOrder;
  const canCreateDeal = ['Demo Done', 'Proposal Sent', 'Negotiation', 'Contract Sent', 'Won'].includes(stage);
  const contact = lead.contact || {};
  const activities = lead.activities || [];

  return (
    <div className="max-w-5xl space-y-4">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <button onClick={() => navigate('/leads')} className="flex items-center gap-1 hover:text-teal-600">
          <ArrowLeft size={14} /> Leads
        </button>
        <span>/</span>
        <span className="text-gray-800 font-medium">{lead.school}</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {displayStages.map((s, i) => {
            const done = i < stageIdx;
            const current = i === stageIdx;
            return (
              <div key={s} className="flex items-center gap-1 flex-shrink-0">
                <div className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors
                  ${done ? 'bg-teal-500 text-white' : current ? 'bg-amber-400 text-white ring-2 ring-amber-200' : 'bg-gray-100 text-gray-400'}`}>
                  {s}
                </div>
                {i < displayStages.length - 1 && (
                  <ArrowRight size={12} className={done ? 'text-teal-400' : 'text-gray-300'} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-teal-50 rounded-xl flex items-center justify-center text-teal-700 font-bold text-sm">
                  {lead.school.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800 text-sm">{lead.school}</h2>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10} />{lead.city}, {lead.state}</p>
                </div>
              </div>
              <span className={`badge ${stageColor(stage)}`}>{stage}</span>
            </div>
            <div className="space-y-2 text-sm">
              {[
                ['Board', lead.board],
                ['Type', lead.type],
                ['Students', lead.students?.toLocaleString()],
                ['Est. Value', fmt(lead.value)],
                ['Close Date', lead.closeDate ? new Date(lead.closeDate).toLocaleDateString() : '—'],
                ['Source', lead.source],
                ['Lead Score', `${lead.score}/100`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-gray-400">{k}</span>
                  <span className="text-gray-700 font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {contact.name && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Decision Maker</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold">
                  {contact.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.designation}</p>
                </div>
              </div>
              <div className="space-y-2">
                {contact.phone && (
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800">
                    <Phone size={14} /> {contact.phone}
                  </a>
                )}
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 break-all">
                    <Mail size={14} /> {contact.email}
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <Edit size={14} /> Edit Lead
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-teal-50 rounded-lg text-sm text-teal-700 hover:bg-teal-100 transition-colors">
              <Plus size={14} /> Log Activity
            </button>
            {canCreateDeal && (
              <button onClick={() => navigate('/deals/new')}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-teal-600 rounded-lg text-sm text-white hover:bg-teal-700 transition-colors">
                <ArrowRight size={14} /> Create Deal
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-5">Activity Timeline</h3>
            {lead.notes && (
              <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-100 text-sm text-amber-800">
                <span className="font-medium">Notes: </span>{lead.notes}
              </div>
            )}
            {activities.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">No activities recorded yet.</p>
            ) : (
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200" />
                <div className="space-y-5">
                  {activities.map(act => (
                    <div key={act.id} className="flex gap-4 relative">
                      <div className="w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-base flex-shrink-0 z-10">
                        {activityIcons[act.type] || '📌'}
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className={`badge text-xs ${activityTypeStyle(act.type)}`}>{act.type}</span>
                            {act.gpsVerified && (
                              <span className="flex items-center gap-1 text-xs text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                                <Navigation size={10} /> GPS Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-medium ${outcomeColor(act.outcome)}`}>{act.outcome}</span>
                            <span className="text-xs text-gray-400">{new Date(act.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{act.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
