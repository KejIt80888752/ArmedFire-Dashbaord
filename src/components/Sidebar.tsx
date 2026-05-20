import { useAuth } from "../contexts/AuthContext";
import raiseLogo from "../assets/the-raise-logo.png";

const NAV = [
  { id:"overview",   icon:"fa-gauge-high",         label:"Overview" },
  { id:"inquiries",  icon:"fa-envelope-open-text",  label:"Inquiries" },
  { id:"clients",    icon:"fa-building-user",       label:"Clients" },
  { id:"amc",        icon:"fa-file-contract",       label:"AMC Contracts" },
  { id:"visits",     icon:"fa-calendar-check",      label:"Service Visits" },
  { id:"training",   icon:"fa-graduation-cap",      label:"Training" },
  { id:"products",   icon:"fa-box-seam",            label:"Products" },
  { id:"reports",    icon:"fa-chart-line",          label:"Reports" },
  { id:"users",      icon:"fa-users",               label:"Users" },
  { id:"settings",   icon:"fa-gear",                label:"Settings" },
];

interface Props {
  page: string;
  setPage: (p: string) => void;
  collapsed: boolean;
}

export default function Sidebar({ page, setPage, collapsed }: Props) {
  const { logout } = useAuth();
  const w = collapsed ? 64 : 260;

  return (
    <aside style={{
      width: w, minWidth: w, height:"100vh", background:"#1e293b",
      display:"flex", flexDirection:"column", transition:"width .25s",
      overflow:"hidden", flexShrink:0, position:"relative", zIndex:10,
    }}>

      {/* Logo */}
      <div style={{ padding: collapsed ? "18px 0" : "20px 20px 16px", borderBottom:"1px solid rgba(255,255,255,.07)", display:"flex", alignItems:"center", gap:10, justifyContent: collapsed ? "center" : "flex-start" }}>
        <div style={{ width:36, height:36, borderRadius:10, background:"#c0392b", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <i className="fa fa-fire-extinguisher" style={{ color:"#fff", fontSize:16 }}/>
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontSize:13, fontWeight:800, color:"#fff", lineHeight:1.2 }}>Armed Fire</div>
            <div style={{ fontSize:10, color:"#94a3b8", fontWeight:500 }}>Admin Dashboard</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:"12px 8px", overflowY:"auto" }}>
        {NAV.map(item => {
          const active = page === item.id;
          return (
            <div key={item.id} onClick={()=>setPage(item.id)}
              title={collapsed ? item.label : ""}
              style={{
                display:"flex", alignItems:"center", gap:12,
                padding: collapsed ? "11px 0" : "10px 14px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius:10, marginBottom:2, cursor:"pointer",
                background: active ? "#c0392b" : "transparent",
                color: active ? "#fff" : "#94a3b8",
                boxShadow: active ? "0 2px 12px rgba(192,57,43,.35)" : "none",
                transition:"all .15s",
              }}
              onMouseEnter={e=>{ if(!active)(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.06)"; }}
              onMouseLeave={e=>{ if(!active)(e.currentTarget as HTMLElement).style.background="transparent"; }}
            >
              <i className={`fa ${item.icon}`} style={{ fontSize:15, width:16, textAlign:"center", flexShrink:0 }}/>
              {!collapsed && <span style={{ fontSize:13, fontWeight:500, whiteSpace:"nowrap" }}>{item.label}</span>}
            </div>
          );
        })}
      </nav>

      {/* User + logout */}
      {!collapsed && (
        <div style={{ padding:"14px 16px", borderTop:"1px solid rgba(255,255,255,.07)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <div style={{ width:34, height:34, borderRadius:"50%", background:"rgba(192,57,43,.2)", border:"2px solid rgba(192,57,43,.4)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <i className="fa fa-user" style={{ color:"#c0392b", fontSize:14 }}/>
            </div>
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:"#fff" }}>Anandan</div>
              <div style={{ fontSize:10, color:"#94a3b8" }}>Administrator</div>
            </div>
          </div>
          <button onClick={logout} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:7, padding:"8px 12px", borderRadius:9, background:"rgba(192,57,43,.12)", border:"1px solid rgba(192,57,43,.25)", color:"#f87171", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
            <i className="fa fa-right-from-bracket"/>
            Sign Out
          </button>
        </div>
      )}

      {/* Raise logo */}
      {!collapsed && (
        <div style={{ padding:"10px 16px 14px", borderTop:"1px solid rgba(255,255,255,.05)" }}>
          <img src={raiseLogo} alt="The Raise" style={{ height:28, width:"auto", objectFit:"contain", opacity:.7 }}/>
          <div style={{ fontSize:9, color:"#475569", marginTop:3 }}>POWERED BY <span style={{ color:"#c0392b" }}>KEJ IT</span> · © 2026</div>
        </div>
      )}
    </aside>
  );
}
