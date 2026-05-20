import { useState } from 'react';

const sampleClients = [
  { id: 1, company: 'Kaveri Hospitals Pvt Ltd', contact: 'Mr. Rajan K', phone: '9876543210', city: 'Coimbatore', category: 'Healthcare', amcStatus: 'Active' },
  { id: 2, company: 'Lakshmi Textile Mills', contact: 'Mr. Selvam R', phone: '9845012345', city: 'Tirupur', category: 'Textile', amcStatus: 'Active' },
  { id: 3, company: 'Sun Pharma Manufacturing', contact: 'Ms. Priya N', phone: '9900112233', city: 'Chennai', category: 'Pharma', amcStatus: 'Expired' },
  { id: 4, company: 'The Grand Regency Hotel', contact: 'Mr. Anand S', phone: '9712345678', city: 'Coimbatore', category: 'Hospitality', amcStatus: 'Active' },
  { id: 5, company: 'Bright Future School', contact: 'Mrs. Meena L', phone: '8800223344', city: 'Erode', category: 'Education', amcStatus: 'Expiring' },
  { id: 6, company: 'Nexus IT Park', contact: 'Mr. Karthik V', phone: '9988776655', city: 'Chennai', category: 'IT', amcStatus: 'Active' },
];

const amcBadge: Record<string, string> = {
  Active: 'badge bg-green',
  Expired: 'badge bg-red',
  Expiring: 'badge bg-yellow',
  None: 'badge bg-gray',
};

export default function Clients() {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [form, setForm] = useState({ company: '', contact: '', phone: '', email: '', city: '', category: '', address: '' });

  const filtered = sampleClients.filter(r =>
    (!catFilter || r.category === catFilter) &&
    (!search || r.company.toLowerCase().includes(search.toLowerCase()) || r.city.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Clients</h2>
        <p style={{ color: 'var(--muted)', margin: '4px 0 0' }}>Manage all client accounts and AMC details.</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#fee2e2' }}>
            <i className="fa fa-building" style={{ color: '#c0392b', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Total Clients</div>
            <div className="s-value">500+</div>
            <div className="s-sub">All time</div>
          </div>
          <span className="stat-change sc-up">+14 this month</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#dcfce7' }}>
            <i className="fa fa-file-contract" style={{ color: '#16a34a', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Active AMC Clients</div>
            <div className="s-value">342</div>
            <div className="s-sub">68% of total</div>
          </div>
          <span className="stat-change sc-up">+5 this month</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#dbeafe' }}>
            <i className="fa fa-user-plus" style={{ color: '#2563eb', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">New This Month</div>
            <div className="s-value">14</div>
            <div className="s-sub">May 2025</div>
          </div>
          <span className="stat-change sc-up">+2 vs April</span>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-18">
        <div className="card-body">
          <div className="filter-row">
            <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
              <i className="fa fa-plus" /> Add Client
            </button>
            <select className="f-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
              <option value="">All Categories</option>
              <option>Healthcare</option>
              <option>Textile</option>
              <option>Pharma</option>
              <option>Hospitality</option>
              <option>Education</option>
              <option>IT</option>
              <option>Manufacturing</option>
            </select>
            <input className="f-input" placeholder="Search company or city..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-head">
          <span className="card-title">Client List</span>
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>{filtered.length} records</span>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Contact Person</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Category</th>
                  <th>AMC Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td><strong>{r.company}</strong></td>
                    <td>{r.contact}</td>
                    <td>{r.phone}</td>
                    <td>{r.city}</td>
                    <td><span className="badge bg-blue">{r.category}</span></td>
                    <td><span className={amcBadge[r.amcStatus]}>{r.amcStatus}</span></td>
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

      {/* Add Client Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <span className="modal-title">Add Client</span>
              <button className="modal-close" onClick={() => setModalOpen(false)}><i className="fa fa-times" /></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Company Name</label>
                  <input className="form-input" placeholder="Enter company name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                </div>
                <div className="form-field">
                  <label className="form-label">Contact Person</label>
                  <input className="form-input" placeholder="Enter contact name" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Phone</label>
                  <input className="form-input" placeholder="Enter phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="form-field">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="Enter email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">City</label>
                  <input className="form-input" placeholder="Enter city" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                </div>
                <div className="form-field">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option value="">Select category</option>
                    <option>Healthcare</option>
                    <option>Textile</option>
                    <option>Pharma</option>
                    <option>Hospitality</option>
                    <option>Education</option>
                    <option>IT</option>
                    <option>Manufacturing</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Address</label>
                <textarea className="form-textarea" rows={3} placeholder="Enter full address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary">Save Client</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
