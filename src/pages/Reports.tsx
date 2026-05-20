import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue (₹ Lakhs)',
      data: [5.2, 6.8, 7.1, 6.4, 8.0, 8.4],
      borderColor: '#c0392b',
      backgroundColor: 'rgba(192, 57, 43, 0.08)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#c0392b',
      pointRadius: 5,
    },
    {
      label: 'AMC Revenue (₹ Lakhs)',
      data: [3.1, 3.8, 4.0, 3.9, 4.5, 4.8],
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.05)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#2563eb',
      pointRadius: 5,
    },
  ],
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' as const },
  },
  scales: {
    y: { beginAtZero: true },
  },
};

const monthlySummary = [
  { label: 'New Inquiries', value: 32, max: 50, color: '#c0392b' },
  { label: 'Deals Converted', value: 18, max: 32, color: '#16a34a' },
  { label: 'Service Visits', value: 24, max: 40, color: '#2563eb' },
  { label: 'AMC Renewals', value: 9, max: 15, color: '#d97706' },
];

const pendingActions = [
  { label: '3 AMC contracts expiring in 30 days', icon: 'fa-triangle-exclamation', color: '#c0392b' },
  { label: '8 inquiries pending follow-up', icon: 'fa-clock', color: '#d97706' },
  { label: '5 visit reports not submitted', icon: 'fa-file-pen', color: '#ca8a04' },
  { label: '1 product out of stock', icon: 'fa-box-open', color: '#2563eb' },
];

export default function Reports() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Reports</h2>
        <p style={{ color: 'var(--muted)', margin: '4px 0 0' }}>Performance analytics and business summary.</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#fee2e2' }}>
            <i className="fa fa-indian-rupee-sign" style={{ color: '#c0392b', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Revenue This Month</div>
            <div className="s-value">₹8.4L</div>
            <div className="s-sub">May 2025</div>
          </div>
          <span className="stat-change sc-up">+7.7% vs Apr</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#dbeafe' }}>
            <i className="fa fa-file-contract" style={{ color: '#2563eb', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">AMC Revenue</div>
            <div className="s-value">₹38.2L</div>
            <div className="s-sub">FY 2025 total</div>
          </div>
          <span className="stat-change sc-up">+14% YoY</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#dcfce7' }}>
            <i className="fa fa-handshake" style={{ color: '#16a34a', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Deals Won</div>
            <div className="s-value">18</div>
            <div className="s-sub">56% conversion</div>
          </div>
          <span className="stat-change sc-up">+3 this month</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box" style={{ background: '#ffedd5' }}>
            <i className="fa fa-wrench" style={{ color: '#d97706', fontSize: 22 }} />
          </div>
          <div>
            <div className="s-label">Service Visits</div>
            <div className="s-value">24</div>
            <div className="s-sub">Completed this month</div>
          </div>
          <span className="stat-change sc-up">+6 vs Apr</span>
        </div>
      </div>

      {/* Grid 2-1 */}
      <div className="grid-2-1 mb-18">
        {/* Line Chart */}
        <div className="card">
          <div className="card-head">
            <span className="card-title">Revenue Trend — Jan to Jun 2025</span>
          </div>
          <div className="card-body">
            <div className="chart-wrap-lg" style={{ height: 280 }}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Monthly Summary */}
          <div className="card">
            <div className="card-head">
              <span className="card-title">Monthly Summary</span>
            </div>
            <div className="card-body">
              {monthlySummary.map(item => (
                <div className="prog-row" key={item.label}>
                  <div className="prog-head">
                    <span>{item.label}</span>
                    <span>{item.value} / {item.max}</span>
                  </div>
                  <div className="prog-track">
                    <div className="prog-fill" style={{ width: `${Math.round((item.value / item.max) * 100)}%`, background: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Actions */}
          <div className="card">
            <div className="card-head">
              <span className="card-title">Pending Actions</span>
            </div>
            <div className="card-body">
              {pendingActions.map((a, i) => (
                <div className="alert-row" key={i}>
                  <span className="alert-dot" style={{ background: a.color }} />
                  <div className="alert-info">
                    <i className={`fa ${a.icon}`} style={{ color: a.color, marginRight: 6 }} />
                    {a.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
