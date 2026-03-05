// ─── Users / Auth ────────────────────────────────────────────────────────────
export const users = [
  { id: 1, name: 'Arjun Mehta',   email: 'arjun@educrm.in',  password: 'fo123',  role: 'FO', zone: 'Mumbai West',  region: 'West',    avatar: 'AM' },
  { id: 2, name: 'Sunita Reddy',  email: 'sunita@educrm.in', password: 'fo123',  role: 'FO', zone: 'Mumbai West',  region: 'West',    avatar: 'SR' },
  { id: 3, name: 'Vikram Nair',   email: 'vikram@educrm.in', password: 'fo123',  role: 'FO', zone: 'Pune Central', region: 'West',    avatar: 'VN' },
  { id: 4, name: 'Priya Singh',   email: 'priya@educrm.in',  password: 'zh123',  role: 'ZH', zone: 'Mumbai West',  region: 'West',    avatar: 'PS' },
  { id: 5, name: 'Rajesh Kumar',  email: 'rajesh@educrm.in', password: 'rh123',  role: 'RH', zone: null,           region: 'West',    avatar: 'RK' },
  { id: 6, name: 'Anita Sharma',  email: 'anita@educrm.in',  password: 'sh123',  role: 'SH', zone: null,           region: null,      avatar: 'AS' },
];

// ─── Leads ───────────────────────────────────────────────────────────────────
export const leads = [
  {
    id: 1,
    school: 'DPS Andheri',
    board: 'CBSE',
    city: 'Mumbai',
    state: 'Maharashtra',
    students: 1200,
    type: 'Private',
    stage: 'Demo Done',
    score: 82,
    value: 480000,
    closeDate: '2026-03-20',
    lastActivity: '2026-03-02',
    source: 'Field Visit',
    foId: 1,
    foName: 'Arjun Mehta',
    contact: { name: 'Mrs. Kavita Sharma', designation: 'Principal', phone: '+91 98201 12345', email: 'principal@dpsandheri.edu.in' },
    notes: 'Principal very interested in AI Video module. Budget confirmed at ₹4.8L. Demo went well.',
    activities: [
      { id: 1, type: 'Visit',    date: '2026-03-02', outcome: 'Positive',  notes: 'Conducted AI demo with principal and IT head. Positive feedback on curriculum module.', gps: true },
      { id: 2, type: 'Call',     date: '2026-02-22', outcome: 'Positive',  notes: 'Confirmed demo appointment for March 2nd.', gps: false },
      { id: 3, type: 'Visit',    date: '2026-02-15', outcome: 'Neutral',   notes: 'Initial discovery visit. Met vice-principal. Principal unavailable.', gps: true },
      { id: 4, type: 'Call',     date: '2026-02-08', outcome: 'Positive',  notes: 'Cold call. School interested. Scheduled physical visit.', gps: false },
    ],
  },
  {
    id: 2,
    school: 'Ryan International Borivali',
    board: 'ICSE',
    city: 'Mumbai',
    state: 'Maharashtra',
    students: 2100,
    type: 'Private',
    stage: 'Proposal Sent',
    score: 74,
    value: 720000,
    closeDate: '2026-03-30',
    lastActivity: '2026-02-28',
    source: 'Referral',
    foId: 1,
    foName: 'Arjun Mehta',
    contact: { name: 'Mr. Thomas George', designation: 'Director', phone: '+91 98202 23456', email: 'director@ryanborivali.edu.in' },
    notes: 'Large school. Director is the key decision maker. Interested in full suite.',
    activities: [
      { id: 5, type: 'Proposal', date: '2026-02-28', outcome: 'Pending',  notes: 'Sent formal proposal with 8% discount. Awaiting response.', gps: false },
      { id: 6, type: 'Demo',     date: '2026-02-20', outcome: 'Positive', notes: 'Full platform demo conducted. Director impressed with ERP module.', gps: true },
    ],
  },
  {
    id: 3,
    school: 'Orchid International School',
    board: 'IB',
    city: 'Pune',
    state: 'Maharashtra',
    students: 850,
    type: 'Private',
    stage: 'Qualified',
    score: 58,
    value: 320000,
    closeDate: '2026-04-15',
    lastActivity: '2026-02-18',
    source: 'Website',
    foId: 2,
    foName: 'Sunita Reddy',
    contact: { name: 'Ms. Pooja Nair', designation: 'Academic Coordinator', phone: '+91 98203 34567', email: 'academic@orchidpune.edu.in' },
    notes: 'Interested but budget not confirmed. IB board — curriculum module fit is critical.',
    activities: [
      { id: 7, type: 'Call',  date: '2026-02-18', outcome: 'Neutral',  notes: 'Follow-up call. Budget discussion — academic year budget already allocated.', gps: false },
      { id: 8, type: 'Visit', date: '2026-02-05', outcome: 'Positive', notes: 'Discovery visit. Good fit for curriculum module.', gps: true },
    ],
  },
  {
    id: 4,
    school: 'Shri Ram Global School',
    board: 'CBSE',
    city: 'Mumbai',
    state: 'Maharashtra',
    students: 1800,
    type: 'Private',
    stage: 'New Lead',
    score: 35,
    value: 560000,
    closeDate: '2026-05-01',
    lastActivity: '2026-02-25',
    source: 'Field Visit',
    foId: 1,
    foName: 'Arjun Mehta',
    contact: { name: 'Mr. Alok Verma', designation: 'Principal', phone: '+91 98204 45678', email: 'principal@shriramglobal.edu.in' },
    notes: 'Just added. Initial conversation via cold visit. Receptionist provided principal contact.',
    activities: [
      { id: 9, type: 'Visit', date: '2026-02-25', outcome: 'Neutral', notes: 'Cold visit. School was receptive. Scheduled callback with principal for next week.', gps: true },
    ],
  },
  {
    id: 5,
    school: 'Podar International School',
    board: 'CBSE',
    city: 'Mumbai',
    state: 'Maharashtra',
    students: 3200,
    type: 'Private',
    stage: 'Won',
    score: 95,
    value: 1200000,
    closeDate: '2026-02-15',
    lastActivity: '2026-02-15',
    source: 'Referral',
    foId: 2,
    foName: 'Sunita Reddy',
    contact: { name: 'Mr. Rahul Podar', designation: 'Chairman', phone: '+91 98205 56789', email: 'chairman@podarinternational.edu.in' },
    notes: 'Closed! Full suite including AI Voice and ERP. Champion deal of the month.',
    activities: [
      { id: 10, type: 'Contract', date: '2026-02-15', outcome: 'Positive', notes: 'Contract signed. Onboarding scheduled for March 10th.', gps: false },
    ],
  },
  {
    id: 6,
    school: 'Vibgyor High Thane',
    board: 'CBSE',
    city: 'Thane',
    state: 'Maharashtra',
    students: 1400,
    type: 'Private',
    stage: 'Qualified',
    score: 47,
    value: 420000,
    closeDate: '2026-04-01',
    lastActivity: '2026-02-10',
    source: 'Field Visit',
    foId: 3,
    foName: 'Vikram Nair',
    contact: { name: 'Ms. Deepa Krishnan', designation: 'Principal', phone: '+91 98206 67890', email: 'principal@vibgyorthane.edu.in' },
    notes: 'Lead stagnant for 20 days. Need to schedule follow-up urgently.',
    activities: [
      { id: 11, type: 'Visit', date: '2026-02-10', outcome: 'Neutral', notes: 'Second visit. Principal busy with board exams. Rescheduled for after March exams.', gps: true },
    ],
  },
  {
    id: 7,
    school: 'Euro Kids Malad',
    board: 'State Board',
    city: 'Mumbai',
    state: 'Maharashtra',
    students: 480,
    type: 'Franchise',
    stage: 'Contacted',
    score: 28,
    value: 180000,
    closeDate: '2026-04-30',
    lastActivity: '2026-02-20',
    source: 'Cold Call',
    foId: 3,
    foName: 'Vikram Nair',
    contact: { name: 'Mrs. Reena Joshi', designation: 'Centre Head', phone: '+91 98207 78901', email: 'malad@eurokids.in' },
    notes: 'Small franchise. Limited budget. Exploring Homework module only.',
    activities: [
      { id: 12, type: 'Call', date: '2026-02-20', outcome: 'Neutral', notes: 'Centre head interested but needs approval from franchise owner.', gps: false },
    ],
  },
  {
    id: 8,
    school: 'Campion School',
    board: 'ICSE',
    city: 'Mumbai',
    state: 'Maharashtra',
    students: 2600,
    type: 'Private',
    stage: 'Negotiation',
    score: 78,
    value: 890000,
    closeDate: '2026-03-15',
    lastActivity: '2026-03-01',
    source: 'Referral',
    foId: 1,
    foName: 'Arjun Mehta',
    contact: { name: 'Fr. Sebastian D\'Cruz', designation: 'Principal', phone: '+91 98208 89012', email: 'principal@campionmumbai.edu.in' },
    notes: 'In final negotiation. Requesting 15% discount — needs ZH approval.',
    activities: [
      { id: 13, type: 'Follow-up', date: '2026-03-01', outcome: 'Positive', notes: 'Price negotiation call. Principal wants 15% discount. Submitted deal for ZH approval.', gps: false },
      { id: 14, type: 'Demo',      date: '2026-02-18', outcome: 'Positive', notes: 'Full platform demo. All 7 modules shown. School leadership very impressed.', gps: true },
    ],
  },
];

// ─── Deals ────────────────────────────────────────────────────────────────────
export const deals = [
  {
    id: 1,
    leadId: 8,
    school: 'Campion School',
    foId: 1,
    foName: 'Arjun Mehta',
    contractValue: 890000,
    discount: 15,
    finalValue: 756500,
    paymentTerms: '50% upfront, 50% post-go-live',
    duration: '3 years',
    students: 2600,
    closeDate: '2026-03-15',
    modules: ['AI Voice', 'Curriculum', 'AI Videos', 'ERP', 'Homework'],
    notes: 'Principal is motivated to close before academic year end. Board approval pending.',
    approvalStatus: 'Pending ZH',
    submittedAt: '2026-03-01',
    approver: 'Priya Singh (ZH)',
  },
  {
    id: 2,
    leadId: 2,
    school: 'Ryan International Borivali',
    foId: 1,
    foName: 'Arjun Mehta',
    contractValue: 720000,
    discount: 8,
    finalValue: 662400,
    paymentTerms: '100% upfront',
    duration: '2 years',
    students: 2100,
    closeDate: '2026-03-30',
    modules: ['AI Voice', 'Curriculum', 'AI Videos', 'ERP'],
    notes: 'Director wants full suite. 8% discount within FO authority.',
    approvalStatus: 'Self-Approved',
    submittedAt: '2026-02-28',
    approver: 'Arjun Mehta (FO)',
  },
  {
    id: 3,
    leadId: 5,
    school: 'Podar International School',
    foId: 2,
    foName: 'Sunita Reddy',
    contractValue: 1200000,
    discount: 5,
    finalValue: 1140000,
    paymentTerms: '100% upfront',
    duration: '5 years',
    students: 3200,
    closeDate: '2026-02-15',
    modules: ['AI Voice', 'Curriculum', 'AI Videos', 'Lab Simulator', 'ERP', 'Homework', 'Exam'],
    notes: 'Full suite deal. 5-year contract. Biggest win this quarter.',
    approvalStatus: 'Approved',
    submittedAt: '2026-02-10',
    approver: 'Priya Singh (ZH)',
  },
];

// ─── Activities (all FOs) ─────────────────────────────────────────────────────
export const activities = [
  { id: 1,  foId: 1, type: 'Visit',     school: 'DPS Andheri',               date: '2026-03-02', outcome: 'Positive', notes: 'Conducted AI demo with principal and IT head.' },
  { id: 2,  foId: 1, type: 'Call',      school: 'Ryan International Borivali', date: '2026-02-28', outcome: 'Positive', notes: 'Confirmed proposal acceptance timeline.' },
  { id: 3,  foId: 1, type: 'Demo',      school: 'Campion School',             date: '2026-02-18', outcome: 'Positive', notes: 'Full platform demo — all stakeholders present.' },
  { id: 4,  foId: 1, type: 'Visit',     school: 'Shri Ram Global School',     date: '2026-02-25', outcome: 'Neutral',  notes: 'Cold visit. Scheduled callback.' },
  { id: 5,  foId: 1, type: 'Follow-up', school: 'Campion School',             date: '2026-03-01', outcome: 'Positive', notes: 'Negotiation call. Submitted deal for ZH approval.' },
  { id: 6,  foId: 2, type: 'Contract',  school: 'Podar International School', date: '2026-02-15', outcome: 'Positive', notes: 'Contract signed. Onboarding March 10th.' },
  { id: 7,  foId: 2, type: 'Call',      school: 'Orchid International School', date: '2026-02-18', outcome: 'Neutral',  notes: 'Follow-up on budget discussion.' },
  { id: 8,  foId: 2, type: 'Visit',     school: 'Euro Kids Malad',            date: '2026-02-20', outcome: 'Neutral',  notes: 'Met centre head. Low budget concern.' },
  { id: 9,  foId: 3, type: 'Visit',     school: 'Vibgyor High Thane',         date: '2026-02-10', outcome: 'Neutral',  notes: 'Principal busy with board exams.' },
  { id: 10, foId: 3, type: 'Call',      school: 'Euro Kids Malad',            date: '2026-02-20', outcome: 'Neutral',  notes: 'Franchise owner approval awaited.' },
];

// ─── FO Performance ───────────────────────────────────────────────────────────
export const foPerformance = [
  {
    id: 1, foId: 1, name: 'Arjun Mehta',   avatar: 'AM', territory: 'Mumbai North & West',
    revenue: 1542000, target: 2000000, targetPct: 77,
    visitsWeek: 18, demosMonth: 7, dealsWon: 2,
    pipelineLeads: 8, status: 'On Track',
    weeklyRevenue: [280000, 310000, 420000, 532000],
  },
  {
    id: 2, foId: 2, name: 'Sunita Reddy',  avatar: 'SR', territory: 'Mumbai South & Central',
    revenue: 820000, target: 2000000, targetPct: 41,
    visitsWeek: 11, demosMonth: 3, dealsWon: 1,
    pipelineLeads: 5, status: 'At Risk',
    weeklyRevenue: [120000, 200000, 250000, 250000],
  },
  {
    id: 3, foId: 3, name: 'Vikram Nair',   avatar: 'VN', territory: 'Thane & Navi Mumbai',
    revenue: 340000, target: 2000000, targetPct: 17,
    visitsWeek: 8,  demosMonth: 2, dealsWon: 0,
    pipelineLeads: 4, status: 'Underperforming',
    weeklyRevenue: [80000, 90000, 80000, 90000],
  },
  {
    id: 4, foId: 4, name: 'Meera Pillai',  avatar: 'MP', territory: 'Pune East',
    revenue: 1780000, target: 2000000, targetPct: 89,
    visitsWeek: 19, demosMonth: 9, dealsWon: 3,
    pipelineLeads: 10, status: 'On Track',
    weeklyRevenue: [380000, 420000, 480000, 500000],
  },
];

// ─── Zone Data ────────────────────────────────────────────────────────────────
export const zoneData = {
  name: 'Mumbai West Zone',
  revenueMTD: 2702000,
  revenueTarget: 8000000,
  targetPct: 34,
  activePipeline: 27,
  pendingApprovals: 2,
  winRate: 28,
  atRiskFOs: 2,
};

// ─── Region Data ──────────────────────────────────────────────────────────────
export const regionData = {
  name: 'West Region',
  revenueMTD: 14200000,
  revenueTarget: 40000000,
  targetPct: 35,
  activeLeads: 112,
  dealsWon: 18,
  winRate: 31,
  forecastAccuracy: 88,
  zones: [
    { id: 1, name: 'Mumbai West',   revenue: 2702000,  target: 8000000,  targetPct: 34, winRate: 28, pipeline: 27, health: 'At Risk' },
    { id: 2, name: 'Mumbai East',   revenue: 4100000,  target: 8000000,  targetPct: 51, winRate: 42, pipeline: 34, health: 'Good' },
    { id: 3, name: 'Pune Central',  revenue: 5200000,  target: 10000000, targetPct: 52, winRate: 38, pipeline: 41, health: 'Strong' },
    { id: 4, name: 'Pune North',    revenue: 1500000,  target: 8000000,  targetPct: 19, winRate: 15, pipeline: 22, health: 'Weak' },
    { id: 5, name: 'Nashik',        revenue: 698000,   target: 6000000,  targetPct: 12, winRate: 10, pipeline: 18, health: 'Weak' },
  ],
  revenueChart: [
    { month: 'Oct', value: 9200000 },
    { month: 'Nov', value: 11400000 },
    { month: 'Dec', value: 13800000 },
    { month: 'Jan', value: 15200000 },
    { month: 'Feb', value: 13100000 },
    { month: 'Mar', value: 14200000 },
  ],
};

// ─── National Data ────────────────────────────────────────────────────────────
export const nationalData = {
  revenueMTD: 68400000,
  revenueTarget: 200000000,
  targetPct: 34,
  schoolsWon: 84,
  pipelineValue: 320000000,
  winRate: 29,
  regions: [
    { id: 1, name: 'West',  revenue: 14200000, target: 40000000, targetPct: 35, schools: 18, winRate: 31, forecast: 38000000, health: 'Good' },
    { id: 2, name: 'South', revenue: 22100000, target: 50000000, targetPct: 44, schools: 29, winRate: 38, forecast: 48000000, health: 'Strong' },
    { id: 3, name: 'North', revenue: 18500000, target: 50000000, targetPct: 37, schools: 22, winRate: 33, forecast: 46000000, health: 'Good' },
    { id: 4, name: 'East',  revenue: 8200000,  target: 30000000, targetPct: 27, schools: 10, winRate: 22, forecast: 26000000, health: 'At Risk' },
    { id: 5, name: 'North East', revenue: 5400000, target: 30000000, targetPct: 18, schools: 5, winRate: 14, forecast: 22000000, health: 'Weak' },
  ],
  revenueChart: [
    { month: 'Oct', value: 48000000 },
    { month: 'Nov', value: 55000000 },
    { month: 'Dec', value: 72000000 },
    { month: 'Jan', value: 78000000 },
    { month: 'Feb', value: 61000000 },
    { month: 'Mar', value: 68400000 },
  ],
  lossReasons: [
    { reason: 'Price / Budget',  count: 38 },
    { reason: 'Competitor',      count: 24 },
    { reason: 'No Decision',     count: 18 },
    { reason: 'No Fit',          count: 9  },
  ],
};

// ─── Notifications ────────────────────────────────────────────────────────────
export const notifications = [
  { id: 1, type: 'urgent',   title: 'Overdue Follow-up',          body: 'Vibgyor High Thane — no activity for 20 days. Schedule call now.',     time: '2h ago' },
  { id: 2, type: 'reminder', title: 'Demo Scheduled Today 3 PM',  body: 'Campion School — prepare full platform demo materials.',               time: '6h ago' },
  { id: 3, type: 'success',  title: 'Deal Approved',              body: 'Ryan International Borivali — ZH approved 8% discount deal.',          time: '1d ago' },
  { id: 4, type: 'info',     title: 'Zone Announcement',          body: 'Monthly target updated: ₹20L per FO for March. Push hard this week!',  time: '2d ago' },
  { id: 5, type: 'warning',  title: 'Stage Stagnation Alert',     body: 'Euro Kids Malad — stuck in Contacted for 13 days.',                   time: '3d ago' },
  { id: 6, type: 'info',     title: 'Weekly Summary',             body: 'Last week: 12 visits, 3 demos, 2 proposals. Target was 15/8/5.',       time: '5d ago' },
];

// ─── Tasks (Today's schedule) ─────────────────────────────────────────────────
export const todaysTasks = [
  { id: 1, time: '09:00',  type: 'Call',    school: 'Shri Ram Global School',      done: true  },
  { id: 2, time: '11:00',  type: 'Visit',   school: 'DPS Andheri',                 done: true  },
  { id: 3, time: '15:00',  type: 'Demo',    school: 'Campion School',              done: false },
  { id: 4, time: '17:30',  type: 'Follow-up', school: 'Ryan International Borivali', done: false },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const stageOrder = [
  'New Lead', 'Contacted', 'Qualified', 'Demo Stage',
  'Demo Done', 'Proposal Sent', 'Negotiation', 'Contract Sent',
  'Won', 'Lost',
];

export const kanbanStages = [
  { id: 'new',         label: 'New / Contacted',        stages: ['New Lead', 'Contacted'] },
  { id: 'qualified',   label: 'Qualified',               stages: ['Qualified'] },
  { id: 'demo',        label: 'Demo Stage',              stages: ['Demo Stage', 'Demo Done'] },
  { id: 'proposal',    label: 'Proposal / Negotiation',  stages: ['Proposal Sent', 'Negotiation', 'Contract Sent'] },
  { id: 'won',         label: 'Won',                     stages: ['Won'] },
];

export const activityTypes = [
  { type: 'Visit',      color: 'bg-green-100 text-green-700' },
  { type: 'Call',       color: 'bg-gray-100 text-gray-700' },
  { type: 'Demo',       color: 'bg-blue-100 text-blue-700' },
  { type: 'Proposal',   color: 'bg-amber-100 text-amber-700' },
  { type: 'Follow-up',  color: 'bg-gray-100 text-gray-600' },
  { type: 'Contract',   color: 'bg-teal-100 text-teal-700' },
];

export const modules = [
  'AI Voice', 'Curriculum', 'AI Videos', 'Lab Simulator', 'ERP', 'Homework', 'Exam',
];

export const boards = ['CBSE', 'ICSE', 'IB', 'State Board', 'IGCSE'];
export const schoolTypes = ['Private', 'Government', 'Franchise', 'Trust'];
export const leadSources = ['Field Visit', 'Referral', 'Website', 'Cold Call', 'Partner'];

export function fmt(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)     return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

export function scoreColor(score) {
  if (score >= 70) return 'text-green-600';
  if (score >= 40) return 'text-amber-500';
  return 'text-red-500';
}

export function scoreBarColor(score) {
  if (score >= 70) return 'bg-green-500';
  if (score >= 40) return 'bg-amber-400';
  return 'bg-red-400';
}

export function stageColor(stage) {
  const map = {
    'New Lead':       'bg-gray-100 text-gray-600',
    'Contacted':      'bg-blue-100 text-blue-600',
    'Qualified':      'bg-sky-100 text-sky-700',
    'Demo Stage':     'bg-purple-100 text-purple-700',
    'Demo Done':      'bg-indigo-100 text-indigo-700',
    'Proposal Sent':  'bg-amber-100 text-amber-700',
    'Negotiation':    'bg-orange-100 text-orange-700',
    'Contract Sent':  'bg-teal-100 text-teal-700',
    'Won':            'bg-green-100 text-green-700',
    'Lost':           'bg-red-100 text-red-700',
  };
  return map[stage] || 'bg-gray-100 text-gray-600';
}

export function healthColor(health) {
  const map = {
    'Strong':  'bg-green-100 text-green-700',
    'Good':    'bg-teal-100 text-teal-700',
    'At Risk': 'bg-amber-100 text-amber-700',
    'Weak':    'bg-red-100 text-red-700',
  };
  return map[health] || 'bg-gray-100 text-gray-600';
}

export function statusColor(status) {
  const map = {
    'On Track':         'bg-green-100 text-green-700',
    'At Risk':          'bg-amber-100 text-amber-700',
    'Underperforming':  'bg-red-100 text-red-700',
  };
  return map[status] || 'bg-gray-100 text-gray-600';
}

export function activityTypeStyle(type) {
  const found = activityTypes.find(a => a.type === type);
  return found ? found.color : 'bg-gray-100 text-gray-600';
}

export function outcomeColor(outcome) {
  const map = {
    'Positive': 'text-green-600',
    'Neutral':  'text-gray-500',
    'Negative': 'text-red-500',
    'Pending':  'text-amber-500',
  };
  return map[outcome] || 'text-gray-500';
}

export function daysAgo(dateStr) {
  const diff = Math.floor((new Date() - new Date(dateStr)) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return `${diff}d ago`;
}
