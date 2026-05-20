import { useTheme } from "../contexts/ThemeContext";

const PAGE_META: Record<string, { title: string; sub: string }> = {
  overview:  { title:"Overview",        sub:"Armed Fire Services — Dashboard" },
  inquiries: { title:"Inquiries",       sub:"Manage client inquiries & quotes" },
  clients:   { title:"Clients",         sub:"Client directory & CRM" },
  amc:       { title:"AMC Contracts",   sub:"Annual Maintenance Contract tracker" },
  visits:    { title:"Service Visits",  sub:"Field service & maintenance log" },
  training:  { title:"Training",        sub:"Training program management" },
  products:  { title:"Products",        sub:"Fire safety product catalog" },
  reports:   { title:"Reports",         sub:"Business intelligence & analytics" },
  users:     { title:"Users",           sub:"Staff accounts & access control" },
  settings:  { title:"Settings",        sub:"System configuration" },
};

interface Props {
  page: string;
  onMenuClick: () => void;
}

export default function Topbar({ page, onMenuClick }: Props) {
  const { isDark, toggleTheme } = useTheme();
  const meta = PAGE_META[page] ?? PAGE_META.overview;

  const btnStyle: React.CSSProperties = {
    width:36, height:36, borderRadius:9,
    background:"var(--card)", border:"1px solid var(--border)",
    display:"flex", alignItems:"center", justifyContent:"center",
    cursor:"pointer", color:"var(--muted)", fontSize:14, flexShrink:0,
    transition:"all .15s",
  };

  return (
    <header style={{ height:60, background:"var(--card)", borderBottom:"1px solid var(--border)", padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexShrink:0, boxShadow:"0 1px 0 rgba(0,0,0,.04)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
        <button onClick={onMenuClick} style={{ ...btnStyle }}>
          <i className="fa fa-bars"/>
        </button>
        <div>
          <div style={{ fontSize:15, fontWeight:800, color:"var(--text)", lineHeight:1.2 }}>{meta.title}</div>
          <div style={{ fontSize:11, color:"var(--muted)" }}>{meta.sub}</div>
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <button style={{ ...btnStyle, background:"var(--red)", border:"none", color:"#fff", padding:"0 14px", width:"auto", gap:6, fontSize:12, fontWeight:600 }}>
          <i className="fa fa-download"/> Export
        </button>
        <div style={{ position:"relative" }}>
          <button style={btnStyle}><i className="fa fa-bell"/></button>
          <span style={{ position:"absolute", top:6, right:6, width:7, height:7, borderRadius:"50%", background:"var(--red)", border:"2px solid var(--card)" }}/>
        </div>
        <button onClick={toggleTheme} style={btnStyle}>
          <i className={`fa ${isDark ? "fa-sun" : "fa-moon"}`}/>
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 12px", background:"var(--red-soft)", border:"1px solid rgba(192,57,43,.2)", borderRadius:9 }}>
          <div style={{ width:26, height:26, borderRadius:"50%", background:"var(--red)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <i className="fa fa-user" style={{ color:"#fff", fontSize:11 }}/>
          </div>
          <span style={{ fontSize:12, fontWeight:600, color:"var(--text)" }}>Anandan</span>
        </div>
      </div>
    </header>
  );
}
