import { useState } from 'react';

const sampleVisits = [
  { id: 1, client: 'Kaveri Hospitals', address: '14, Avinashi Rd, Coimbatore', engineer: 'Arjun M', date: '2025-05-22', type: 'Preventive', status: 'Scheduled' },
  { id: 2, client: 'Nexus IT Park', address: '7th Floor, Chennai Tech Hub', engineer: 'Dinesh K', date: '2025-05-20', type: 'Inspection', status: 'In Progress' },
  { id: 3, client: 'Lakshmi Textile Mills', address: 'SIDCO Industrial Estate, Tirupur', engineer: 'Arjun M', date: '2025-05-19', type: 'Preventive', status: 'Completed' },
  { id: 4, client: 'Sun Pharma', address: 'Ambattur Industrial Area, Chennai', engineer: 'Selvam R', date: '2025-05-18', type: 'Breakdown', status: 'Completed' },
  { id: 5, client: 'The Grand Regency', address: 'Race Course Rd, Coimbatore', engineer: 'Dinesh K', date: '2025-05-24', type: 'Installation', status: 'Scheduled' },
  { id: 6, client: 'Bright Future School', address: 'NH-47, Erode', engineer: 'Selvam R', date: '2025-05-21', type: 'Preventive', status: 'Pending Report' },
];

const statusBadge: Record<string, string> = {
  Scheduled: 'badge bg-blue',
  'In Progress': 'badge bg-orange',
  Completed: 'badge bg-green',
  'Pending Report': 'badge bg-yellow',
};

const typeBadge: Record<string, string> = {
  Preventive: 'badge bg-blue',
  Breakdown: 'badge bg-red',
  Installation: 'badge bg-green',
  Inspection: 'badge bg-gray',
};

export default function Visits() {
  const [modalOpen, setModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [form, setForm] = useState({ client: '', address: '', engineer: '', date: '', type: '', notes: '' });

  const filtered = sampleVisits.filter(r =>
    (!statusFilter || r.status === statusFilter) &&
    (!monthFilter || r.date.startsWith(monthFilter))
  );

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Service Visits</h2>
        <p style={{ color: 'var(--muted)', margin: '4px 0 0' }}>Schedule and track all field service visits.</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#dbeafe' }}>
            <i className="fa fa-calendar-check" style={{ color: '#2563eb', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Scheduled</div>
            <div className="s-value">12</div>
            <div className="s-sub">Upcoming visits</div>
          </div>
          <span className="stat-change sc-info">This week</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#dcfce7' }}>
            <i className="fa fa-circle-check" style={{ color: '#16a34a', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Completed</div>
            <div className="s-value">28</div>
            <div className="s-sub">This month</div>
          </div>
          <span className="stat-change sc-up">+6 vs last month</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#ffedd5' }}>
            <i className="fa fa-spinner" style={{ color: '#d97706', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">In Progress</div>
            <div className="s-value">3</div>
            <div className="s-sub">Active today</div>
          </div>
          <span className="stat-change sc-info">Live</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#fef9c3' }}>
            <i className="fa fa-file-pen" style={{ color: '#ca8a04', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Pending Report</div>
            <div className="s-value">5</div>
            <div className="s-sub">Awaiting submission</div>
          </div>
          <span className="stat-change sc-down">Overdue</span>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-18">
        <div className="card-body">
          <div className="filter-row">
            <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
              <i className="fa fa-plus" /> Schedule Visit
            </button>
            <select className="f-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option>Scheduled</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Pending Report</option>
            </select>
            <select className="f-select" value={monthFilter} onChange={e => setMonthFilter(e.target.value)}>
              <option value="">All Months</option>
              <option value="2025-05">May 2025</option>
              <option value="2025-04">April 2025</option>
              <option value="2025-03">March 2025</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-head">
          <span className="card-title">Visit Schedule</span>
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>{filtered.length} visits</span>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Address</th>
                  <th>Engineer</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td><strong>{r.client}</strong></td>
                    <td style={{ maxWidth: 180, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.address}</td>
                    <td>{r.engineer}</td>
                    <td>{r.date}</td>
                    <td><span className={typeBadge[r.type]}>{r.type}</span></td>
                    <td><span className={statusBadge[r.status]}>{r.status}</span></td>
                    <td>
                      <button className="btn btn-outline btn-sm"><i className="fa fa-eye" /></button>{' '}
                      <button className="btn btn-outline btn-sm"><i className="fa fa-edit" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Schedule Visit Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <span className="modal-title">Schedule Visit</span>
              <button className="modal-close" onClick={() => setModalOpen(false)}><i className="fa fa-times" /></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Client Name</label>
                  <input className="form-input" placeholder="Enter client name" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} />
                </div>
                <div className="form-field">
                  <label className="form-label">Visit Date</label>
                  <input className="form-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Address</label>
                <input className="form-input" placeholder="Enter visit location" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Engineer Assigned</label>
                  <input className="form-input" placeholder="Engineer name" value={form.engineer} onChange={e => setForm({ ...form, engineer: e.target.value })} />
                </div>
                <div className="form-field">
                  <label className="form-label">Visit Type</label>
                  <select className="form-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="">Select type</option>
                    <option>Preventive</option>
                    <option>Breakdown</option>
                    <option>Installation</option>
                    <option>Inspection</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Notes</label>
                <textarea className="form-textarea" rows={3} placeholder="Enter visit notes or instructions..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary">Schedule Visit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
