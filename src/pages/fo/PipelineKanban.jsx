import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, AlertCircle } from 'lucide-react';
import { leads, kanbanStages, fmt, scoreColor } from '../../data/staticData';

function LeadCard({ lead, onClick }) {
  const daysSince = Math.floor((new Date() - new Date(lead.lastActivity)) / 86400000);
  const overdue = daysSince > 5 && !['Won', 'Lost'].includes(lead.stage);
  const hot = lead.score >= 70;
  const won = lead.stage === 'Won';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border-2 p-3.5 cursor-pointer hover:shadow-md transition-all
        ${won     ? 'border-teal-300 bg-teal-50/30' :
          hot     ? 'border-amber-300' :
          overdue ? 'border-red-200' :
                    'border-gray-100'}`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-800 leading-tight">{lead.school}</h4>
        {overdue && <AlertCircle size={14} className="text-red-400 flex-shrink-0 ml-1" />}
      </div>
      <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
        <MapPin size={10} />
        {lead.city} · {lead.board}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-800">{fmt(lead.value)}</span>
        <span className={`text-xs font-semibold ${scoreColor(lead.score)}`}>{lead.score}</span>
      </div>
    </div>
  );
}

export default function PipelineKanban({ user }) {
  const navigate = useNavigate();

  const getLeadsForColumn = col =>
    leads.filter(l => col.stages.includes(l.stage));

  return (
    <div className="space-y-4 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Pipeline Kanban</h2>
          <p className="text-sm text-gray-500">Drag cards to advance stages (visual mode)</p>
        </div>
        <button
          onClick={() => navigate('/leads/new')}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Plus size={15} />
          Add Lead
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded border-2 border-amber-300 bg-white" />Hot lead (&gt;70 score)</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded border-2 border-red-300 bg-white" />Overdue (&gt;5 days)</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded border-2 border-teal-300 bg-teal-50/30" />Won</div>
      </div>

      {/* Kanban columns */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {kanbanStages.map(col => {
          const colLeads = getLeadsForColumn(col);
          return (
            <div key={col.id} className="flex-shrink-0 w-64">
              {/* Column header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{col.label}</h3>
                <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {colLeads.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2.5 min-h-32">
                {colLeads.map(lead => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onClick={() => navigate(`/leads/${lead.id}`)}
                  />
                ))}
              </div>

              {/* Add button */}
              <button
                onClick={() => navigate('/leads/new')}
                className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 border-2 border-dashed border-gray-200 rounded-xl text-xs text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors"
              >
                <Plus size={13} />
                Add card
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
