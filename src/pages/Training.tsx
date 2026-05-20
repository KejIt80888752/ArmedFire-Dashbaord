import { useState } from 'react';

const sampleTraining = [
  { id: 1, program: 'Basic Fire Safety Awareness', client: 'Kaveri Hospitals', location: 'Coimbatore', date: '2025-06-10', attendees: 45, type: 'On-site', status: 'Upcoming' },
  { id: 2, program: 'Fire Extinguisher Operation', client: 'Lakshmi Textile Mills', location: 'Tirupur', date: '2025-06-18', attendees: 80, type: 'On-site', status: 'Upcoming' },
  { id: 3, program: 'Emergency Evacuation Drill', client: 'Bright Future School', location: 'Erode', date: '2025-07-05', attendees: 120, type: 'Drill', status: 'Upcoming' },
  { id: 4, program: 'Advanced Fire Safety Course', client: 'Nexus IT Park', location: 'Chennai', date: '2025-04-15', attendees: 35, type: 'Classroom', status: 'Completed' },
  { id: 5, program: 'Fire Warden Certification', client: 'The Grand Regency', location: 'Coimbatore', date: '2025-03-22', attendees: 12, type: 'Certification', status: 'Completed' },
];

const statusBadge: Record<string, string> = {
  Upcoming: 'badge bg-blue',
  Completed: 'badge bg-green',
  Cancelled: 'badge bg-red',
};

const typeBadge: Record<string, string> = {
  'On-site': 'badge bg-orange',
  Classroom: 'badge bg-blue',
  Drill: 'badge bg-yellow',
  Certification: 'badge bg-green',
};

export default function Training() {
  const [modalOpen, setModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [form, setForm] = useState({ program: '', client: '', location: '', date: '', attendees: '', type: '', notes: '' });

  const filtered = sampleTraining.filter(r => !statusFilter || r.status === statusFilter);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Training Programs</h2>
        <p style={{ color: 'var(--muted)', margin: '4px 0 0' }}>Manage fire safety training sessions and certifications.</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#dcfce7' }}>
            <i className="fa fa-graduation-cap" style={{ color: '#16a34a', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Trained This Year</div>
            <div className="s-value">412</div>
            <div className="s-sub">Total participants</div>
          </div>
          <span className="stat-change sc-up">+28% vs last year</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#dbeafe' }}>
            <i className="fa fa-certificate" style={{ color: '#2563eb', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Certificates Issued</div>
            <div className="s-value">412</div>
            <div className="s-sub">100% pass rate</div>
          </div>
          <span className="stat-change sc-up">All qualified</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#ffedd5' }}>
            <i className="fa fa-calendar-days" style={{ color: '#d97706', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Upcoming Sessions</div>
            <div className="s-value">3</div>
            <div className="s-sub">Scheduled ahead</div>
          </div>
          <span className="stat-change sc-info">Next: Jun 10</span>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-18">
        <div className="card-body">
          <div className="filter-row">
            <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
              <i className="fa fa-plus" /> Schedule Training
            </button>
            <select className="f-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option>Upcoming</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-head">
          <span className="card-title">Training Sessions</span>
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>{filtered.length} sessions</span>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Program</th>
                  <th>Client / Org</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Attendees</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td><strong>{r.program}</strong></td>
                    <td>{r.client}</td>
                    <td>{r.location}</td>
                    <td>{r.date}</td>
                    <td>{r.attendees}</td>
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

      {/* Schedule Training Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <span className="modal-title">Schedule Training</span>
              <button className="modal-close" onClick={() => setModalOpen(false)}><i className="fa fa-times" /></button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label className="form-label">Program Name</label>
                <input className="form-input" placeholder="Enter training program name" value={form.program} onChange={e => setForm({ ...form, program: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Client / Organization</label>
                  <input className="form-input" placeholder="Enter client or org name" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} />
                </div>
                <div className="form-field">
                  <label className="form-label">Location</label>
                  <input className="form-input" placeholder="Enter location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Date</label>
                  <input className="form-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="form-field">
                  <label className="form-label">Expected Attendees</label>
                  <input className="form-input" type="number" placeholder="Number of participants" value={form.attendees} onChange={e => setForm({ ...form, attendees: e.target.value })} />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Training Type</label>
                <select className="form-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="">Select type</option>
                  <option>On-site</option>
                  <option>Classroom</option>
                  <option>Drill</option>
                  <option>Certification</option>
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Notes</label>
                <textarea className="form-textarea" rows={3} placeholder="Additional notes or requirements..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary">Schedule Training</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
