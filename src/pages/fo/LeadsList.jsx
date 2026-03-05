import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, List, KanbanSquare, MapPin, Plus } from 'lucide-react';
import { leads, fmt, stageColor, scoreBarColor, scoreColor, daysAgo } from '../../data/staticData';

const filters = ['All', 'Active', 'Hot', 'Overdue', 'Won'];

export default function LeadsList({ user }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [view, setView] = useState('list');

  const filtered = leads.filter(lead => {
    const matchSearch = !search ||
      lead.school.toLowerCase().includes(search.toLowerCase()) ||
      lead.city.toLowerCase().includes(search.toLowerCase()) ||
      lead.board.toLowerCase().includes(search.toLowerCase()) ||
      lead.contact.name.toLowerCase().includes(search.toLowerCase());

    const daysSince = Math.floor((new Date() - new Date(lead.lastActivity)) / 86400000);

    const matchFilter =
      activeFilter === 'All'     ? true :
      activeFilter === 'Active'  ? !['Won', 'Lost'].includes(lead.stage) :
      activeFilter === 'Hot'     ? lead.score > 70 :
      activeFilter === 'Overdue' ? daysSince > 5 :
      activeFilter === 'Won'     ? lead.stage === 'Won' : true;

    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-4 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Leads</h2>
          <p className="text-sm text-gray-500">{filtered.length} leads found</p>
        </div>
        <button
          onClick={() => navigate('/leads/new')}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Plus size={16} />
          Add Lead
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by school, city, board, or contact..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map(f => (
            <button key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                ${activeFilter === f
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* View switcher */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-1">
          {[
            { id: 'list', icon: List },
            { id: 'kanban', icon: KanbanSquare },
          ].map(({ id, icon: Icon }) => (
            <button key={id} onClick={() => { if (id === 'kanban') navigate('/pipeline'); else setView(id); }}
              className={`p-1.5 rounded-md transition-colors ${view === id ? 'bg-white shadow-sm text-teal-600' : 'text-gray-500'}`}>
              <Icon size={16} />
            </button>
          ))}
        </div>

        <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
          <Download size={14} />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['School Name', 'Board', 'Stage', 'Lead Score', 'Est. Value', 'Last Activity', ''].map(h => (
                  <th key={h} className="table-th">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="table-td text-center text-gray-400 py-12">
                    No leads found matching your filters.
                  </td>
                </tr>
              ) : filtered.map(lead => {
                const daysSince = Math.floor((new Date() - new Date(lead.lastActivity)) / 86400000);
                const overdue = daysSince > 5 && !['Won', 'Lost'].includes(lead.stage);

                return (
                  <tr key={lead.id}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${overdue ? 'bg-red-50/40' : ''}`}
                    onClick={() => navigate(`/leads/${lead.id}`)}
                  >
                    <td className="table-td">
                      <p className="font-medium text-gray-800">{lead.school}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin size={10} />{lead.city}
                      </p>
                    </td>
                    <td className="table-td">
                      <span className="badge bg-gray-100 text-gray-600">{lead.board}</span>
                    </td>
                    <td className="table-td">
                      <span className={`badge ${stageColor(lead.stage)}`}>{lead.stage}</span>
                    </td>
                    <td className="table-td">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${scoreColor(lead.score)}`}>{lead.score}</span>
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${scoreBarColor(lead.score)}`} style={{ width: `${lead.score}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="table-td font-medium text-gray-800">{fmt(lead.value)}</td>
                    <td className={`table-td ${overdue ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                      {overdue && '! '}
                      {daysAgo(lead.lastActivity)}
                    </td>
                    <td className="table-td">
                      <button
                        onClick={e => { e.stopPropagation(); navigate(`/leads/${lead.id}`); }}
                        className="px-3 py-1 text-xs font-medium bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">Showing {filtered.length} of {leads.length} leads</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(p => (
              <button key={p}
                className={`w-7 h-7 text-xs rounded-lg ${p === 1 ? 'bg-teal-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
