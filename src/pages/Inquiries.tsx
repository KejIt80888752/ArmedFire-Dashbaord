import { useState } from 'react';

const sampleInquiries = [
  { id: 1, client: 'Kaveri Hospitals', phone: '9876543210', service: 'AMC', date: '2025-05-18', priority: 'High', status: 'New' },
  { id: 2, client: 'Lakshmi Textile Mills', phone: '9845012345', service: 'Fire Extinguisher', date: '2025-05-17', priority: 'Medium', status: 'Contacted' },
  { id: 3, client: 'Sun Pharma Ltd', phone: '9900112233', service: 'Suppression System', date: '2025-05-16', priority: 'High', status: 'Pending Follow-up' },
  { id: 4, client: 'The Grand Hotel', phone: '9712345678', service: 'Fire Alarm', date: '2025-05-15', priority: 'Low', status: 'Converted' },
  { id: 5, client: 'Bright Future School', phone: '8800223344', service: 'Training', date: '2025-05-14', priority: 'Medium', status: 'New' },
  { id: 6, client: 'Nexus IT Park', phone: '9988776655', service: 'CCTV', date: '2025-05-13', priority: 'Low', status: 'Contacted' },
];

const priorityBadge: Record<string, string> = {
  High: 'badge bg-red',
  Medium: 'badge bg-orange',
  Low: 'badge bg-gray',
};

const statusBadge: Record<string, string> = {
  New: 'badge bg-blue',
  Contacted: 'badge bg-yellow',
  'Pending Follow-up': 'badge bg-orange',
  Converted: 'badge bg-green',
};

export default function Inquiries() {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', priority: '', requirements: '' });

  const filtered = sampleInquiries.filter(r =>
    (!statusFilter || r.status === statusFilter) &&
    (!search || r.client.toLowerCase().includes(search.toLowerCase()) || r.service.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Inquiries</h2>
        <p style={{ color: 'var(--muted)', margin: '4px 0 0' }}>Track and manage all incoming service inquiries.</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#fee2e2' }}>
            <i className="fa fa-envelope" style={{ color: '#c0392b', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">New Inquiries</div>
            <div className="s-value">32</div>
            <div className="s-sub">This month</div>
          </div>
          <span className="stat-change sc-up">+8 this week</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#dcfce7' }}>
            <i className="fa fa-handshake" style={{ color: '#16a34a', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Converted</div>
            <div className="s-value">18</div>
            <div className="s-sub">56% conversion rate</div>
          </div>
          <span className="stat-change sc-up">+3 this week</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#ffedd5' }}>
            <i className="fa fa-clock" style={{ color: '#d97706', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Pending Follow-up</div>
            <div className="s-value">8</div>
            <div className="s-sub">Awaiting response</div>
          </div>
          <span className="stat-change sc-info">Needs attention</span>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-18">
        <div className="card-body">
          <div className="filter-row">
            <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
              <i className="fa fa-plus" /> Add Inquiry
            </button>
            <select className="f-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Pending Follow-up</option>
              <option>Converted</option>
            </select>
            <input className="f-input" placeholder="Search client or service..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-head">
          <span className="card-title">Inquiry List</span>
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>{filtered.length} records</span>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Phone</th>
                  <th>Service Type</th>
                  <th>Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td><strong>{r.client}</strong></td>
                    <td>{r.phone}</td>
                    <td>{r.service}</td>
                    <td>{r.date}</td>
                    <td><span className={priorityBadge[r.priority]}>{r.priority}</span></td>
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

      {/* Add Inquiry Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <span className="modal-title">Add Inquiry</span>
              <button className="modal-close" onClick={() => setModalOpen(false)}><i className="fa fa-times" /></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Client Name</label>
                  <input className="form-input" placeholder="Enter client name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-field">
                  <label className="form-label">Phone</label>
                  <input className="form-input" placeholder="Enter phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="Enter email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="form-field">
                  <label className="form-label">Service Type</label>
                  <select className="form-select" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                    <option value="">Select service</option>
                    <option>Fire Extinguisher</option>
                    <option>Fire Alarm</option>
                    <option>AMC</option>
                    <option>Suppression System</option>
                    <option>Training</option>
                    <option>CCTV</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Priority</label>
                <select className="form-select" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                  <option value="">Select priority</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Requirements</label>
                <textarea className="form-textarea" rows={3} placeholder="Describe the requirements..." value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary">Save Inquiry</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
