import { useState } from 'react';

const sampleAMCs = [
  { id: 1, client: 'Kaveri Hospitals Pvt Ltd', start: '2025-01-01', end: '2025-12-31', value: '₹1,20,000', services: 'Extinguishers, Fire Alarm, Sprinkler', status: 'Active', daysLeft: 225 },
  { id: 2, client: 'Lakshmi Textile Mills', start: '2025-02-01', end: '2025-07-01', value: '₹85,000', services: 'Extinguishers, Suppression System', status: 'Expiring', daysLeft: 12 },
  { id: 3, client: 'The Grand Regency Hotel', start: '2025-03-01', end: '2026-02-28', value: '₹2,40,000', services: 'Full Fire Safety Package', status: 'Active', daysLeft: 285 },
  { id: 4, client: 'Sun Pharma Manufacturing', start: '2024-06-01', end: '2025-05-31', value: '₹95,000', services: 'Fire Alarm, Extinguishers', status: 'Expired', daysLeft: 0 },
  { id: 5, client: 'Bright Future School', start: '2025-04-01', end: '2025-06-30', value: '₹45,000', services: 'Extinguishers, Training', status: 'Expiring', daysLeft: 5 },
  { id: 6, client: 'Nexus IT Park', start: '2025-01-15', end: '2026-01-14', value: '₹3,60,000', services: 'Complete Fire & CCTV Package', status: 'Active', daysLeft: 240 },
];

const statusBadge: Record<string, string> = {
  Active: 'badge bg-green',
  Expiring: 'badge bg-yellow',
  Expired: 'badge bg-red',
};

export default function AMC() {
  const [modalOpen, setModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [form, setForm] = useState({ client: '', start: '', end: '', value: '', services: '', notes: '' });

  const filtered = sampleAMCs.filter(r => !statusFilter || r.status === statusFilter);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: 0 }}>AMC Management</h2>
        <p style={{ color: 'var(--muted)', margin: '4px 0 0' }}>Manage Annual Maintenance Contracts and renewals.</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#dcfce7' }}>
            <i className="fa fa-file-contract" style={{ color: '#16a34a', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Active AMCs</div>
            <div className="s-value">342</div>
            <div className="s-sub">Currently active</div>
          </div>
          <span className="stat-change sc-up">+5 this month</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#fee2e2' }}>
            <i className="fa fa-triangle-exclamation" style={{ color: '#c0392b', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Expiring Soon</div>
            <div className="s-value">12</div>
            <div className="s-sub">Within 30 days</div>
          </div>
          <span className="stat-change sc-down">Renewal needed</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#f1f5f9' }}>
            <i className="fa fa-ban" style={{ color: '#64748b', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Expired</div>
            <div className="s-value">8</div>
            <div className="s-sub">Lapsed contracts</div>
          </div>
          <span className="stat-change sc-info">Follow up required</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#dbeafe' }}>
            <i className="fa fa-indian-rupee-sign" style={{ color: '#2563eb', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">AMC Revenue</div>
            <div className="s-value">₹38.2L</div>
            <div className="s-sub">FY 2025</div>
          </div>
          <span className="stat-change sc-up">+14% vs last year</span>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-18">
        <div className="card-body">
          <div className="filter-row">
            <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
              <i className="fa fa-plus" /> Add AMC
            </button>
            <select className="f-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option>Active</option>
              <option>Expiring</option>
              <option>Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-head">
          <span className="card-title">AMC Contracts</span>
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>{filtered.length} contracts</span>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Value</th>
                  <th>Services Covered</th>
                  <th>Status</th>
                  <th>Days Left</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td><strong>{r.client}</strong></td>
                    <td>{r.start}</td>
                    <td>{r.end}</td>
                    <td>{r.value}</td>
                    <td style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.services}</td>
                    <td><span className={statusBadge[r.status]}>{r.status}</span></td>
                    <td>
                      {r.daysLeft > 0
                        ? <span style={{ color: r.daysLeft <= 30 ? '#c0392b' : 'var(--text)', fontWeight: r.daysLeft <= 30 ? 700 : 400 }}>{r.daysLeft}d</span>
                        : <span style={{ color: '#64748b' }}>—</span>}
                    </td>
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

      {/* Add AMC Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <span className="modal-title">Add AMC Contract</span>
              <button className="modal-close" onClick={() => setModalOpen(false)}><i className="fa fa-times" /></button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label className="form-label">Client Name</label>
                <input className="form-input" placeholder="Enter client name" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Start Date</label>
                  <input className="form-input" type="date" value={form.start} onChange={e => setForm({ ...form, start: e.target.value })} />
                </div>
                <div className="form-field">
                  <label className="form-label">End Date</label>
                  <input className="form-input" type="date" value={form.end} onChange={e => setForm({ ...form, end: e.target.value })} />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Contract Value (₹)</label>
                <input className="form-input" placeholder="e.g. 120000" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} />
              </div>
              <div className="form-field">
                <label className="form-label">Services Covered</label>
                <textarea className="form-textarea" rows={2} placeholder="List services included in AMC..." value={form.services} onChange={e => setForm({ ...form, services: e.target.value })} />
              </div>
              <div className="form-field">
                <label className="form-label">Notes</label>
                <textarea className="form-textarea" rows={2} placeholder="Additional notes..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary">Save AMC</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
