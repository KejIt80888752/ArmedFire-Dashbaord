import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import raiseLogo from "../assets/the-raise-logo.png";

const DEMO = [
  { role: "Super Admin", user: "admin" },
  { role: "Owner", user: "anandan" },
  { role: "Manager", user: "anandan@armedfire.in" },
];

export default function Login() {
  const { login } = useAuth();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (login(user, pass)) {
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"#f1f5f9", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ display:"flex", width:"100%", maxWidth:920, borderRadius:20, overflow:"hidden", boxShadow:"0 24px 80px rgba(0,0,0,.18)", minHeight:560 }}>

        {/* ── LEFT NAVY PANEL ── */}
        <div style={{ flex:1, background:"#1e293b", padding:"40px 36px", display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 80% 10%,rgba(192,57,43,.18) 0%,transparent 55%)", pointerEvents:"none" }}/>

          {/* Brand */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28, position:"relative" }}>
            <div style={{ width:48, height:48, borderRadius:12, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:"#c0392b", flexShrink:0 }}>
              <i className="fa fa-fire-extinguisher"/>
            </div>
            <div>
              <div style={{ fontSize:17, fontWeight:800, color:"#fff", lineHeight:1.2 }}>Armed Fire Services</div>
              <div style={{ fontSize:10, fontWeight:700, color:"#c0392b", letterSpacing:".1em", textTransform:"uppercase" }}>WE FIGHT FIRE</div>
            </div>
          </div>

          <div style={{ fontSize:22, fontWeight:800, color:"#fff", lineHeight:1.3, marginBottom:10, position:"relative" }}>Fire Safety Management<br/>Dashboard</div>
          <div style={{ fontSize:12.5, color:"#94a3b8", lineHeight:1.7, marginBottom:24, position:"relative" }}>
            Comprehensive fire safety operations — AMC contracts, service visits, client CRM, training programs &amp; real-time reports. Coimbatore, Tamil Nadu.
          </div>

          {/* Stats grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:24, position:"relative" }}>
            {[["1995","Est."],["500+","Clients"],["24/7","Support"],["ISO","9001 Certified"]].map(([val,lbl])=>(
              <div key={lbl} style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.08)", borderRadius:12, padding:"14px 16px" }}>
                <div style={{ fontSize:18, fontWeight:800, color:"#c0392b", lineHeight:1.1 }}>{val}</div>
                <div style={{ fontSize:11, color:"#94a3b8", marginTop:3 }}>{lbl}</div>
              </div>
            ))}
          </div>

          {/* Address */}
          <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:14, position:"relative" }}>
            {[
              ["fa-location-dot","No. 12, Industrial Estate, Coimbatore — 641 003"],
              ["fa-phone","+91 98765 43210 / 0422-2345678"],
              ["fa-envelope","anandan@armedfire.in"],
              ["fa-globe","armedfire.in"],
            ].map(([icon,text])=>(
              <div key={text} style={{ fontSize:11.5, color:"#94a3b8", display:"flex", alignItems:"flex-start", gap:7 }}>
                <i className={`fa ${icon}`} style={{ color:"#c0392b", fontSize:11, marginTop:2, flexShrink:0 }}/>
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:"auto", position:"relative" }}>
            {["Fire Safety","AMC Services","Installation","Training","CCTV","Fire Alarm"].map(t=>(
              <span key={t} style={{ fontSize:10, color:"#94a3b8", background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.08)", borderRadius:6, padding:"3px 8px" }}>{t}</span>
            ))}
          </div>

          {/* Footer */}
          <div style={{ marginTop:20, paddingTop:16, borderTop:"1px solid rgba(255,255,255,.08)", position:"relative" }}>
            <img src={raiseLogo} alt="The Raise" style={{ height:36, width:"auto", objectFit:"contain", opacity:.9, display:"block", marginBottom:4 }}/>
            <div style={{ fontSize:10, color:"#94a3b8" }}>POWERED BY <span style={{ color:"#c0392b" }}>KEJ IT</span></div>
            <div style={{ fontSize:10, color:"#475569", marginTop:2 }}>© 2026 Armed Fire Services</div>
          </div>
        </div>

        {/* ── RIGHT WHITE PANEL ── */}
        <div style={{ width:400, background:"#fff", padding:"44px 40px", display:"flex", flexDirection:"column", justifyContent:"center", flexShrink:0 }}>
          <div style={{ fontSize:26, fontWeight:800, color:"#0f172a", marginBottom:4 }}>Sign In</div>
          <div style={{ fontSize:13, color:"#64748b", marginBottom:28 }}>Access your dashboard</div>

          {error && (
            <div style={{ background:"rgba(192,57,43,.08)", border:"1px solid rgba(192,57,43,.2)", borderRadius:8, padding:"9px 13px", fontSize:12.5, color:"#c0392b", marginBottom:14 }}>
              <i className="fa fa-circle-exclamation"/> &nbsp;Invalid credentials. Please try again.
            </div>
          )}

          <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#374151", marginBottom:6 }}>Email Address</label>
          <div style={{ position:"relative", marginBottom:16 }}>
            <input
              value={user} onChange={e=>setUser(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&handleLogin()}
              type="text" placeholder="you@armedfire.in"
              style={{ width:"100%", padding:"11px 14px", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:14, fontFamily:"inherit", color:"#0f172a", outline:"none", background:"#f8fafc" }}
            />
          </div>

          <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#374151", marginBottom:6 }}>Password</label>
          <div style={{ position:"relative", marginBottom:20 }}>
            <input
              value={pass} onChange={e=>setPass(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&handleLogin()}
              type={showPw?"text":"password"} placeholder="••••••••"
              style={{ width:"100%", padding:"11px 40px 11px 14px", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:14, fontFamily:"inherit", color:"#0f172a", outline:"none", background:"#f8fafc" }}
            />
            <span onClick={()=>setShowPw(p=>!p)} style={{ position:"absolute", right:13, top:"50%", transform:"translateY(-50%)", cursor:"pointer", color:"#94a3b8", fontSize:14 }}>
              <i className={`fa ${showPw?"fa-eye-slash":"fa-eye"}`}/>
            </span>
          </div>

          <button onClick={handleLogin} style={{ width:"100%", padding:13, background:"#c0392b", color:"#fff", border:"none", borderRadius:10, fontSize:15, fontWeight:700, fontFamily:"inherit", cursor:"pointer", boxShadow:"0 4px 14px rgba(192,57,43,.35)", marginBottom:20 }}>
            Sign In
          </button>

          <div style={{ fontSize:10.5, fontWeight:700, color:"#94a3b8", letterSpacing:".08em", textTransform:"uppercase", marginBottom:10 }}>Demo Credentials — click to fill</div>
          {DEMO.map(d=>(
            <div key={d.role} onClick={()=>{setUser(d.user);setPass("fire@2025");}}
              style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 12px", borderRadius:9, cursor:"pointer", border:"1px solid transparent", marginBottom:4, transition:"all .15s" }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="#f8fafc";(e.currentTarget as HTMLElement).style.borderColor="#e2e8f0";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="";(e.currentTarget as HTMLElement).style.borderColor="transparent";}}
            >
              <span style={{ fontSize:13, fontWeight:600, color:"#0f172a" }}>{d.role}</span>
              <span style={{ fontSize:12, color:"#94a3b8" }}>{d.user}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
