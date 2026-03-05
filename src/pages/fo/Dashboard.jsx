import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, CalendarCheck, PresentationIcon, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { leads, todaysTasks, fmt, stageColor, daysAgo } from '../../data/staticData';

const kpiCards = [
  {
    label: 'Month Revenue',
    value: '₹15.4L',
    sub: '77% of ₹20L target',
    pct: 77,
    bar: 'bg-teal-500',
    icon: TrendingUp,
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    label: 'Pipeline Leads',
    value: '8',
    sub: 'Active leads in pipeline',
    pct: null,
    icon: Users,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    label: 'Visits This Week',
    value: '12',
    sub: 'Target: 15/week',
    pct: 80,
    bar: 'bg-amber-400',
    warn: true,
    icon: CalendarCheck,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    label: 'Demos This Month',
    value: '7',
    sub: 'Target: 8/month',
    pct: 87,
    bar: 'bg-indigo-500',
    icon: PresentationIcon,
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
];

const hotLeads = leads.filter(l => l.score >= 70).slice(0, 5);

const pipelineFunnel = [
  { stage: 'New / Contacted', count: 2, color: 'bg-gray-300', width: 'w-full' },
  { stage: 'Qualified',       count: 3, color: 'bg-sky-400',   width: 'w-5/6' },
  { stage: 'Demo Stage',      count: 4, color: 'bg-indigo-400', width: 'w-4/6' },
  { stage: 'Proposal',        count: 3, color: 'bg-amber-400',  width: 'w-3/6' },
  { stage: 'Won',             count: 2, color: 'bg-teal-500',   width: 'w-2/6' },
];

export default function FODashboard({ user }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Good morning, {user.name.split(' ')[0]}!</h2>
        <p className="text-sm text-gray-500">Here's your sales snapshot for today — March 5, 2026</p>
      </div>

      {/* KPI Cards */}
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

      {/* Pipeline Funnel + Today's Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pipeline Funnel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Pipeline Funnel</h3>
          <div className="space-y-2">
            {pipelineFunnel.map(({ stage, count, color, width }) => (
              <div key={stage} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-36 truncate">{stage}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-6 flex items-center">
                  <div className={`${color} ${width} h-6 rounded-full flex items-center px-3`}>
                    <span className="text-white text-xs font-semibold">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Today's Tasks</h3>
          <div className="space-y-2">
            {todaysTasks.map((task, i) => (
              <div key={task.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors
                  ${!task.done && i === todaysTasks.findIndex(t => !t.done)
                    ? 'border-amber-300 bg-amber-50'
                    : task.done ? 'border-gray-100 bg-gray-50' : 'border-gray-100'}`}>
                {task.done
                  ? <CheckCircle size={16} className="text-teal-500 flex-shrink-0" />
                  : <Clock size={16} className="text-amber-500 flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${task.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {task.school}
                  </p>
                  <p className="text-xs text-gray-400">{task.time} · {task.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hot Leads Table */}
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
                {['School', 'Stage', 'Value', 'Last Activity', 'Next Action', ''].map(h => (
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
                    <span className={`badge ${stageColor(lead.stage)}`}>{lead.stage}</span>
                  </td>
                  <td className="table-td font-medium text-gray-800">{fmt(lead.value)}</td>
                  <td className="table-td text-gray-500">{daysAgo(lead.lastActivity)}</td>
                  <td className="table-td">
                    {lead.stage === 'Demo Done' && <span className="text-indigo-600 text-xs font-medium">Send Proposal</span>}
                    {lead.stage === 'Proposal Sent' && <span className="text-amber-600 text-xs font-medium">Follow Up</span>}
                    {lead.stage === 'Negotiation' && <span className="text-orange-600 text-xs font-medium">Close Deal</span>}
                    {lead.stage === 'Qualified' && <span className="text-sky-600 text-xs font-medium">Schedule Demo</span>}
                  </td>
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
    </div>
  );
}
