import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, CalendarCheck, PresentationIcon, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { dashboardService } from '../../api/dashboardService';
import { fmt, stageColor, daysAgo } from '../../data/staticData';

const stageMap = {
  NewLead: 'New Lead', Contacted: 'Contacted', Qualified: 'Qualified',
  DemoStage: 'Demo Stage', DemoDone: 'Demo Done', ProposalSent: 'Proposal Sent',
  Negotiation: 'Negotiation', ContractSent: 'Contract Sent', Won: 'Won', Lost: 'Lost',
};

export default function FODashboard({ user }) {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService.getFoDashboard()
      .then(res => setData(res.data))
      .catch(err => console.error('Dashboard error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="text-gray-400">Loading dashboard...</div></div>;
  if (!data) return <div className="text-center py-20 text-gray-400">Failed to load dashboard.</div>;

  const targetPct = data.revenueTarget > 0 ? Math.round((data.revenue / data.revenueTarget) * 100) : 0;

  const kpiCards = [
    {
      label: 'Month Revenue', value: fmt(data.revenue),
      sub: `${targetPct}% of ${fmt(data.revenueTarget)} target`,
      pct: targetPct, bar: 'bg-teal-500',
      icon: TrendingUp, iconBg: 'bg-teal-50', iconColor: 'text-teal-600',
    },
    {
      label: 'Pipeline Leads', value: String(data.pipelineLeads),
      sub: `Pipeline value: ${fmt(data.pipelineValue)}`,
      pct: null, icon: Users, iconBg: 'bg-blue-50', iconColor: 'text-blue-600',
    },
    {
      label: 'Visits This Week', value: String(data.visitsThisWeek),
      sub: 'Target: 15/week',
      pct: Math.min(Math.round((data.visitsThisWeek / 15) * 100), 100),
      bar: data.visitsThisWeek >= 15 ? 'bg-teal-500' : 'bg-amber-400',
      warn: data.visitsThisWeek < 15,
      icon: CalendarCheck, iconBg: 'bg-amber-50', iconColor: 'text-amber-600',
    },
    {
      label: 'Demos This Month', value: String(data.demosThisMonth),
      sub: 'Target: 8/month',
      pct: Math.min(Math.round((data.demosThisMonth / 8) * 100), 100),
      bar: 'bg-indigo-500',
      icon: PresentationIcon, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600',
    },
  ];

  const hotLeads = (data.hotLeads || []).slice(0, 5);
  const tasks = data.todaysTasks || [];

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Good morning, {user.name.split(' ')[0]}!</h2>
        <p className="text-sm text-gray-500">Here's your sales snapshot for today</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiCards.map(({ label, value, sub, pct, bar, warn, icon: Icon, iconBg, iconColor }) => (
          <div key={label} className="kpi-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
                <p className={`text-2xl font-bold mt-1 ${warn ? 'text-amber-600' : 'text-gray-900'}`}>{value}</p>
              </div>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
                <Icon size={18} className={iconColor} />
              </div>
            </div>
            <p className="text-xs text-gray-400">{sub}</p>
            {pct !== null && (
              <div className="progress-bar mt-2">
                <div className={`progress-fill ${bar}`} style={{ width: `${pct}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Today's Tasks</h3>
          <div className="space-y-2">
            {tasks.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">No tasks scheduled for today.</p>
            ) : tasks.map((task, i) => (
              <div key={task.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors
                  ${!task.isDone && i === tasks.findIndex(t => !t.isDone)
                    ? 'border-amber-300 bg-amber-50'
                    : task.isDone ? 'border-gray-100 bg-gray-50' : 'border-gray-100'}`}>
                {task.isDone
                  ? <CheckCircle size={16} className="text-teal-500 flex-shrink-0" />
                  : <Clock size={16} className="text-amber-500 flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${task.isDone ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {task.school}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(task.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {task.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Pipeline Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Pipeline Leads</span>
              <span className="font-bold text-gray-800">{data.pipelineLeads}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Pipeline Value</span>
              <span className="font-bold text-teal-700">{fmt(data.pipelineValue)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Deals Won</span>
              <span className="font-bold text-green-600">{data.dealsWon}</span>
            </div>
          </div>
        </div>
      </div>

      {hotLeads.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-orange-500" />
              <h3 className="text-sm font-semibold text-gray-700">Hot Leads — Immediate Action Required</h3>
            </div>
            <button onClick={() => navigate('/leads')} className="text-xs text-teal-600 hover:underline font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {['School', 'Stage', 'Value', 'Last Activity', ''].map(h => (
                    <th key={h} className="table-th">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {hotLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="table-td">
                      <p className="font-medium text-gray-800">{lead.school}</p>
                      <p className="text-xs text-gray-400">{lead.city} · {lead.board}</p>
                    </td>
                    <td className="table-td">
                      <span className={`badge ${stageColor(stageMap[lead.stage] || lead.stage)}`}>{stageMap[lead.stage] || lead.stage}</span>
                    </td>
                    <td className="table-td font-medium text-gray-800">{fmt(lead.value)}</td>
                    <td className="table-td text-gray-500">{lead.lastActivityDate ? daysAgo(lead.lastActivityDate) : '—'}</td>
                    <td className="table-td">
                      <button
                        onClick={() => navigate(`/leads/${lead.id}`)}
                        className="px-3 py-1 text-xs font-medium bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors"
                      >
                        Act
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
