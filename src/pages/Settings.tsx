import { useState } from 'react';

export default function Settings() {
  const [company, setCompany] = useState({
    name: 'Armed Fire Services',
    phone: '+91 98765 43210',
    email: 'info@armedfire.in',
    address: '42, Anna Nagar, Coimbatore – 641001, Tamil Nadu',
    website: 'www.armedfire.in',
  });

  const [notifications, setNotifications] = useState({
    amcExpiry: true,
    newInquiry: true,
    visitReminder: false,
    monthlyReport: true,
  });

  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });

  const [saved, setSaved] = useState(false);

  const handleSaveCompany = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleNotif = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Settings</h2>
        <p style={{ color: 'var(--muted)', margin: '4px 0 0' }}>Manage company information, preferences, and account security.</p>
      </div>

      {saved && (
        <div style={{ background: '#dcfce7', border: '1px solid #16a34a', borderRadius: 8, padding: '10px 16px', marginBottom: 18, color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="fa fa-circle-check" /> Settings saved successfully.
        </div>
      )}

      {/* Company Info */}
      <div className="card mb-18">
        <div className="card-head">
          <span className="card-title">
            <i className="fa fa-building" style={{ color: '#c0392b', marginRight: 8 }} />
            Company Information
          </span>
        </div>
        <div className="card-body">
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Company Name</label>
              <input className="form-input" value={company.name} onChange={e => setCompany({ ...company, name: e.target.value })} />
            </div>
            <div className="form-field">
              <label className="form-label">Phone</label>
              <input className="form-input" value={company.phone} onChange={e => setCompany({ ...company, phone: e.target.value })} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" value={company.email} onChange={e => setCompany({ ...company, email: e.target.value })} />
            </div>
            <div className="form-field">
              <label className="form-label">Website</label>
              <input className="form-input" value={company.website} onChange={e => setCompany({ ...company, website: e.target.value })} />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Address</label>
            <textarea className="form-textarea" rows={2} value={company.address} onChange={e => setCompany({ ...company, address: e.target.value })} />
          </div>
          <div style={{ marginTop: 16 }}>
            <button className="btn btn-primary" onClick={handleSaveCompany}>
              <i className="fa fa-floppy-disk" /> Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card mb-18">
        <div className="card-head">
          <span className="card-title">
            <i className="fa fa-bell" style={{ color: '#c0392b', marginRight: 8 }} />
            Notification Settings
          </span>
        </div>
        <div className="card-body">
          {[
            { key: 'amcExpiry' as const, label: 'AMC Expiry Alerts', desc: 'Get notified when contracts are expiring within 30 days.' },
            { key: 'newInquiry' as const, label: 'New Inquiry Notifications', desc: 'Receive alerts for each new inquiry submitted.' },
            { key: 'visitReminder' as const, label: 'Service Visit Reminders', desc: 'Reminders before scheduled service visits.' },
            { key: 'monthlyReport' as const, label: 'Monthly Report Email', desc: 'Receive a summary report at the end of each month.' },
          ].map(item => (
            <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>{item.label}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{item.desc}</div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 8 }}>
                <span style={{ fontSize: 13, color: notifications[item.key] ? '#16a34a' : 'var(--muted)', fontWeight: 600 }}>
                  {notifications[item.key] ? 'On' : 'Off'}
                </span>
                <div
                  onClick={() => toggleNotif(item.key)}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    background: notifications[item.key] ? '#c0392b' : '#cbd5e1',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 3,
                    left: notifications[item.key] ? 23 : 3,
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: '#fff',
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
                  }} />
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* System / Change Password */}
      <div className="card">
        <div className="card-head">
          <span className="card-title">
            <i className="fa fa-lock" style={{ color: '#c0392b', marginRight: 8 }} />
            Change Password
          </span>
        </div>
        <div className="card-body">
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Current Password</label>
              <input className="form-input" type="password" placeholder="Enter current password" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">New Password</label>
              <input className="form-input" type="password" placeholder="Enter new password" value={passwords.newPass} onChange={e => setPasswords({ ...passwords, newPass: e.target.value })} />
            </div>
            <div className="form-field">
              <label className="form-label">Confirm New Password</label>
              <input className="form-input" type="password" placeholder="Re-enter new password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} />
            </div>
          </div>
          {passwords.newPass && passwords.confirm && passwords.newPass !== passwords.confirm && (
            <div style={{ color: '#c0392b', fontSize: 13, marginBottom: 8 }}>
              <i className="fa fa-circle-exclamation" /> Passwords do not match.
            </div>
          )}
          <div style={{ marginTop: 16 }}>
            <button
              className="btn btn-primary"
              disabled={!passwords.current || !passwords.newPass || passwords.newPass !== passwords.confirm}
              style={{ opacity: (!passwords.current || !passwords.newPass || passwords.newPass !== passwords.confirm) ? 0.5 : 1 }}
            >
              <i className="fa fa-key" /> Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
