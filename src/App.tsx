import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Overview from './pages/Overview';
import Inquiries from './pages/Inquiries';
import Clients from './pages/Clients';
import AMC from './pages/AMC';
import Visits from './pages/Visits';
import Training from './pages/Training';
import Products from './pages/Products';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Settings from './pages/Settings';
import './index.css';

const PAGES: Record<string, React.ComponentType> = {
  overview: Overview,
  inquiries: Inquiries,
  clients: Clients,
  amc: AMC,
  visits: Visits,
  training: Training,
  products: Products,
  reports: Reports,
  users: Users,
  settings: Settings,
};

function Dashboard() {
  const [page, setPage] = useState('overview');
  const [collapsed, setCollapsed] = useState(false);
  const PageComponent = PAGES[page] ?? Overview;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar page={page} setPage={setPage} collapsed={collapsed} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg)' }}>
        <Topbar page={page} onMenuClick={() => setCollapsed(c => !c)} />
        <main style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          <PageComponent />
        </main>
      </div>
    </div>
  );
}

function AppInner() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Dashboard /> : <Login />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </ThemeProvider>
  );
}
