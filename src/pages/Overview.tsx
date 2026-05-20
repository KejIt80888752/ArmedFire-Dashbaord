import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Overview() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (₹ Lakhs)',
        data: [5.2, 6.8, 7.1, 6.4, 8.0, 8.4],
        backgroundColor: '#c0392b',
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  const donutData = {
    labels: ['AMC', 'Installation', 'Training', 'Products'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ['#c0392b', '#2563eb', '#16a34a', '#d97706'],
        borderWidth: 2,
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const } },
  };

  const progress = [
    { label: 'Annual AMC Target', value: 72, color: '#c0392b' },
    { label: 'New Clients', value: 60, color: '#2563eb' },
    { label: 'Training Sessions', value: 45, color: '#16a34a' },
    { label: 'Product Sales', value: 38, color: '#d97706' },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Dashboard Overview</h2>
        <p style={{ color: 'var(--muted)', margin: '4px 0 0' }}>Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#dcfce7' }}>
            <i className="fa fa-building" style={{ color: '#16a34a', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Total Clients</div>
            <div className="s-value">500+</div>
            <div className="s-sub">Across all categories</div>
          </div>
          <span className="stat-change sc-up">+12% this month</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#fee2e2' }}>
            <i className="fa fa-file-contract" style={{ color: '#c0392b', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Active AMCs</div>
            <div className="s-value">342</div>
            <div className="s-sub">Annual contracts</div>
          </div>
          <span className="stat-change sc-up">+5 this month</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#dbeafe' }}>
            <i className="fa fa-calendar" style={{ color: '#2563eb', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Pending Visits</div>
            <div className="s-value">28</div>
            <div className="s-sub">Scheduled this week</div>
          </div>
          <span className="stat-change sc-down">-3 from last week</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#ffedd5' }}>
            <i className="fa fa-indian-rupee-sign" style={{ color: '#d97706', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Revenue This Month</div>
            <div className="s-value">₹8.4L</div>
            <div className="s-sub">vs ₹7.8L last month</div>
          </div>
          <span className="stat-change sc-up">+7.7%</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid-2 mb-18">
        <div className="card">
          <div className="card-head">
            <span className="card-title">Revenue Jan–Jun 2025</span>
          </div>
          <div className="card-body">
            <div className="chart-wrap" style={{ height: 240 }}>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <span className="card-title">Service Breakdown</span>
          </div>
          <div className="card-body">
            <div className="chart-wrap" style={{ height: 240 }}>
              <Doughnut data={donutData} options={donutOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="card mb-18">
        <div className="card-head">
          <span className="card-title">AMC Targets Progress</span>
        </div>
        <div className="card-body">
          {progress.map((p) => (
            <div className="prog-row" key={p.label}>
              <div className="prog-head">
                <span>{p.label}</span>
                <span>{p.value}%</span>
              </div>
              <div className="prog-track">
                <div className="prog-fill" style={{ width: `${p.value}%`, background: p.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts + New Inquiry */}
      <div className="card mb-18">
        <div className="card-head">
          <span className="card-title">Alerts & Actions</span>
          <button className="btn btn-primary btn-sm" onClick={() => setModalOpen(true)}>
            <i className="fa fa-plus" /> New Inquiry
          </button>
        </div>
        <div className="card-body">
          <div className="alert-row">
            <span className="alert-dot" style={{ background: '#c0392b' }} />
            <div className="alert-info">
              <strong>3 AMC contracts expiring</strong> within the next 30 days — renewal action required.
            </div>
          </div>
          <div className="alert-row">
            <span className="alert-dot" style={{ background: '#d97706' }} />
            <div className="alert-info">
              <strong>8 inquiries</strong> have not been contacted in the last 7 days.
            </div>
          </div>
          <div className="alert-row">
            <span className="alert-dot" style={{ background: '#2563eb' }} />
            <div className="alert-info">
              <strong>1 product out of stock</strong> — Smoke Detector (Conventional). Reorder needed.
            </div>
          </div>
        </div>
      </div>

      {/* New Inquiry Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <span className="modal-title">New Inquiry</span>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                <i className="fa fa-times" />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Client Name</label>
                  <input className="form-input" placeholder="Enter client name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-field">
                  <label className="form-label">Phone</label>
                  <input className="form-input" placeholder="Enter phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
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
                <label className="form-label">Message</label>
                <textarea className="form-textarea" rows={3} placeholder="Enter requirements or message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
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
