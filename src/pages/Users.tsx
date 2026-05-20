import { useState } from 'react';

const sampleUsers = [
  { id: 1, name: 'Rajan Subramaniam', email: 'rajan@armedfire.in', role: 'Admin', lastLogin: '2025-05-20 09:12', status: 'Active' },
  { id: 2, name: 'Priya Nataraj', email: 'priya@armedfire.in', role: 'Manager', lastLogin: '2025-05-20 08:45', status: 'Active' },
  { id: 3, name: 'Arjun Murugan', email: 'arjun@armedfire.in', role: 'Engineer', lastLogin: '2025-05-19 17:30', status: 'Active' },
  { id: 4, name: 'Dinesh Kumar', email: 'dinesh@armedfire.in', role: 'Engineer', lastLogin: '2025-05-19 16:00', status: 'Active' },
  { id: 5, name: 'Meena Lakshmi', email: 'meena@armedfire.in', role: 'Accounts', lastLogin: '2025-05-18 10:22', status: 'Inactive' },
];

const roleBadge: Record<string, string> = {
  Admin: 'badge bg-red',
  Manager: 'badge bg-blue',
  Engineer: 'badge bg-green',
  Accounts: 'badge bg-orange',
  Viewer: 'badge bg-gray',
};

const statusBadge: Record<string, string> = {
  Active: 'badge bg-green',
  Inactive: 'badge bg-gray',
};

export default function Users() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', status: '' });

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Users</h2>
        <p style={{ color: 'var(--muted)', margin: '4px 0 0' }}>Manage system users and access roles.</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#dbeafe' }}>
            <i className="fa fa-users" style={{ color: '#2563eb', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Total Users</div>
            <div className="s-value">8</div>
            <div className="s-sub">System accounts</div>
          </div>
          <span className="stat-change sc-info">All roles</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#dcfce7' }}>
            <i className="fa fa-user-check" style={{ color: '#16a34a', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Active</div>
            <div className="s-value">7</div>
            <div className="s-sub">Currently active</div>
          </div>
          <span className="stat-change sc-up">87.5%</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#fee2e2' }}>
            <i className="fa fa-user-shield" style={{ color: '#c0392b', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Admin</div>
            <div className="s-value">2</div>
            <div className="s-sub">Full access</div>
          </div>
          <span className="stat-change sc-info">Admin role</span>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-18">
        <div className="card-body">
          <div className="filter-row">
            <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
              <i className="fa fa-plus" /> Add User
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-head">
          <span className="card-title">System Users</span>
          <span style={{ color: 'var(--muted)', fontSize: 13 }}>{sampleUsers.length} users</span>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Last Login</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sampleUsers.map(r => (
                  <tr key={r.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#c0392b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                          {r.name.charAt(0)}
                        </div>
                        <strong>{r.name}</strong>
                      </div>
                    </td>
                    <td>{r.email}</td>
                    <td><span className={roleBadge[r.role]}>{r.role}</span></td>
                    <td style={{ color: 'var(--muted)', fontSize: 13 }}>{r.lastLogin}</td>
                    <td><span className={statusBadge[r.status]}>{r.status}</span></td>
                    <td>
                      <button className="btn btn-outline btn-sm"><i className="fa fa-edit" /></button>{' '}
                      <button className="btn btn-outline btn-sm"><i className="fa fa-trash" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <span className="modal-title">Add User</span>
              <button className="modal-close" onClick={() => setModalOpen(false)}><i className="fa fa-times" /></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" placeholder="Enter full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-field">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="Enter email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Phone</label>
                  <input className="form-input" placeholder="Enter phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="form-field">
                  <label className="form-label">Role</label>
                  <select className="form-select" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                    <option value="">Select role</option>
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Engineer</option>
                    <option>Accounts</option>
                    <option>Viewer</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Status</label>
                <select className="form-select" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option value="">Select status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary">Create User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
