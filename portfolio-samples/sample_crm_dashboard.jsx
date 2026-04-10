import { useState, useEffect, useMemo } from "react";
import {
  BarChart, Bar, FunnelChart, Funnel, LabelList,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  AreaChart, Area, PieChart, Pie
} from "recharts";

const _f = document.createElement("link");
_f.rel = "stylesheet";
_f.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono:wght@400;600&display=swap";
document.head.appendChild(_f);

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const C = {
  bg:           "#0a0c0f",
  surface:      "#10141a",
  surfaceAlt:   "#141a22",
  surfaceHov:   "#1a2230",
  border:       "#1e2c3a",
  borderWarm:   "#2a3c50",
  gold:         "#c8a040",
  goldLight:    "#e8c060",
  goldDim:      "#6a5020",
  slate:        "#3a6090",
  slateLight:   "#5888c0",
  slateDim:     "#1e3450",
  forest:       "#387058",
  forestLight:  "#50a078",
  emerald:      "#30a870",
  emeraldLight: "#50c890",
  crimson:      "#b03030",
  crimsonLight: "#d85050",
  amber:        "#c07020",
  amberLight:   "#e09040",
  sky:          "#2880b0",
  skyLight:     "#50a8d8",
  text:         "#d0dce8",
  textDim:      "#7a9ab0",
  muted:        "#3a5060",
  dim:          "#222e38",
  ink:          "#eef6ff",
};

const DISPLAY = "'Playfair Display', Georgia, serif";
const BODY    = "'Libre Baskerville', Georgia, serif";
const MONO    = "'IBM Plex Mono', 'Courier New', monospace";

// ═══════════════════════════════════════════════════════════════════════════
// FICTIONAL FIRM — FOR ILLUSTRATIVE / MARKETING PURPOSES ONLY
// All client names, deal values, and contact information are fabricated.
// ═══════════════════════════════════════════════════════════════════════════

const FIRM = {
  name:        "Hargrove Capital Advisors",
  type:        "Independent Financial Advisory · 6 Advisors",
  aum:         "~$42M AUM",
  disclaimer:  "All client names, deal values, and pipeline data shown are entirely fictional. This dashboard is a portfolio sample illustrating CRM capabilities for financial advisory workflows.",
};

const STAGES = [
  { id: "lead",        label: "Lead",        color: C.slateDim,   count: 0, value: 0 },
  { id: "qualified",   label: "Qualified",   color: C.slate,      count: 0, value: 0 },
  { id: "proposal",    label: "Proposal",    color: C.gold,       count: 0, value: 0 },
  { id: "negotiation", label: "Negotiation", color: C.amber,      count: 0, value: 0 },
  { id: "closed",      label: "Closed Won",  color: C.emerald,    count: 0, value: 0 },
];

const CONTACTS = [
  { id:1, name:"Margaret Holloway",    co:"Holloway Family Trust",        stage:"closed",      advisor:"KR", aum:2400000, source:"Referral",    lastContact:"2025-05-12", nextAction:"Annual review — schedule Q3",       urgency:"low",    tags:["trust","multi-gen"] },
  { id:2, name:"David & Terri Okafor", co:"Okafor Retirement Planning",   stage:"negotiation", advisor:"SW", aum:880000,  source:"Seminar",     lastContact:"2025-06-01", nextAction:"Send updated fee schedule by Fri",  urgency:"high",   tags:["rollover","IRA"] },
  { id:3, name:"James Whitfield III",  co:"Whitfield Holdings",           stage:"proposal",    advisor:"KR", aum:1750000, source:"LinkedIn",    lastContact:"2025-05-28", nextAction:"Follow up on proposal — no reply",  urgency:"high",   tags:["business-owner"] },
  { id:4, name:"Priya Nair",           co:"Independent · Tech Exec",      stage:"proposal",    advisor:"BL", aum:620000,  source:"Referral",    lastContact:"2025-05-30", nextAction:"Call to discuss RSU strategy",       urgency:"medium", tags:["rsu","equity-comp"] },
  { id:5, name:"Connolly & Reyes LLC", co:"Business Succession Planning", stage:"qualified",   advisor:"SW", aum:3100000, source:"CPA Partner", lastContact:"2025-05-20", nextAction:"Schedule discovery call — week of 6/9", urgency:"medium", tags:["succession","buy-sell"] },
  { id:6, name:"Helen Bartosh",        co:"Bartosh Family Office",        stage:"qualified",   advisor:"BL", aum:4500000, source:"Referral",    lastContact:"2025-05-15", nextAction:"Send family office overview deck",   urgency:"low",    tags:["family-office","estate"] },
  { id:7, name:"Terrence Gupta",       co:"Gupta Wealth Partners",        stage:"lead",        advisor:"KR", aum:310000,  source:"Website",     lastContact:"2025-06-02", nextAction:"Initial intake call — not yet sched", urgency:"medium", tags:["young-professional"] },
  { id:8, name:"Sandra Morrow",        co:"Morrow Charitable Trust",      stage:"lead",        advisor:"BL", aum:950000,  source:"Event",       lastContact:"2025-05-25", nextAction:"Send charitable giving white paper",  urgency:"low",    tags:["philanthropy","donor-adv"] },
  { id:9, name:"Franklin & Doe CPAs",  co:"Partner Referral Network",     stage:"lead",        advisor:"SW", aum:0,       source:"Partner",     lastContact:"2025-06-01", nextAction:"Add to quarterly newsletter list",   urgency:"low",    tags:["referral-source"] },
  { id:10,name:"Nguyen Family",        co:"Nguyen Diversified",           stage:"closed",      advisor:"SW", aum:1900000, source:"Referral",    lastContact:"2025-04-18", nextAction:"Quarterly check-in — June",          urgency:"low",    tags:["diversified","trust"] },
];

// build stage counts/values
CONTACTS.forEach(c => {
  const s = STAGES.find(s => s.id === c.stage);
  if (s) { s.count++; s.value += c.aum || 0; }
});

const ADVISORS = [
  { id:"KR", name:"K. Reyes",    clients: CONTACTS.filter(c=>c.advisor==="KR").length },
  { id:"SW", name:"S. Weston",   clients: CONTACTS.filter(c=>c.advisor==="SW").length },
  { id:"BL", name:"B. Langford", clients: CONTACTS.filter(c=>c.advisor==="BL").length },
];

const ACTIVITIES = [
  { date:"Jun 2",  type:"call",    contact:"David & Terri Okafor",  note:"Discussed fee structure — wants written breakdown. Hot lead.",           advisor:"SW" },
  { date:"Jun 1",  type:"email",   contact:"Connolly & Reyes LLC",  note:"Sent intro deck. CPA introduced us — strong referral source.",            advisor:"SW" },
  { date:"May 30", type:"meeting", contact:"Priya Nair",            note:"90-min discovery. RSU vesting schedule shared. Proposal requested.",      advisor:"BL" },
  { date:"May 28", type:"email",   contact:"James Whitfield III",   note:"Sent $1.75M proposal. No reply in 3 days — follow-up flagged.",           advisor:"KR" },
  { date:"May 25", type:"event",   contact:"Sandra Morrow",         note:"Met at Estate Planning Symposium. Interested in donor-advised funds.",    advisor:"BL" },
  { date:"May 20", type:"call",    contact:"Connolly & Reyes LLC",  note:"Qualification call complete. Decision-maker confirmed. Advancing.",        advisor:"SW" },
  { date:"May 15", type:"meeting", contact:"Helen Bartosh",         note:"Intro meeting at their office. Multi-gen family. Long relationship likely.", advisor:"BL" },
  { date:"May 12", type:"review",  contact:"Margaret Holloway",     note:"Annual review complete. Increased allocation to alternative assets.",      advisor:"KR" },
];

const MONTHLY_PIPELINE = [
  { month:"Jan", leads:3, qualified:2, proposals:1, closed:1, aum_added:1200000 },
  { month:"Feb", leads:5, qualified:3, proposals:2, closed:0, aum_added:0 },
  { month:"Mar", leads:4, qualified:2, proposals:3, closed:2, aum_added:3100000 },
  { month:"Apr", leads:6, qualified:4, proposals:2, closed:1, aum_added:1900000 },
  { month:"May", leads:8, qualified:5, proposals:4, closed:1, aum_added:2400000 },
  { month:"Jun", leads:3, qualified:2, proposals:2, closed:0, aum_added:0 },
];

const SOURCE_DATA = [
  { name:"Referral",    value:5, color:C.emerald },
  { name:"CPA Partner", value:2, color:C.slate },
  { name:"Event",       value:1, color:C.gold },
  { name:"LinkedIn",    value:1, color:C.sky },
  { name:"Website",     value:1, color:C.forest },
];

const fmt = v => "$" + (v >= 1000000 ? (v/1000000).toFixed(1)+"M" : v >= 1000 ? (v/1000).toFixed(0)+"K" : v.toLocaleString());
const fmtFull = v => "$" + v.toLocaleString();

const URGENCY = {
  high:   { bg:"#1a0e00", border:C.amber,       text:C.amberLight,   label:"URGENT"  },
  medium: { bg:"#0e1400", border:"#8a9010",      text:"#b8c030",      label:"THIS WEEK" },
  low:    { bg:"#061208", border:C.forest,       text:C.forestLight,  label:"ROUTINE" },
};

const STAGE_CFG = {
  lead:        { color:C.slateLight,   label:"LEAD"        },
  qualified:   { color:C.skyLight,     label:"QUALIFIED"   },
  proposal:    { color:C.goldLight,    label:"PROPOSAL"    },
  negotiation: { color:C.amberLight,   label:"NEGOTIATION" },
  closed:      { color:C.emeraldLight, label:"CLOSED WON"  },
};

const ACT_ICON = { call:"◉", email:"◈", meeting:"⬡", event:"⬟", review:"◆" };

const TABS = [
  { id:"overview",  icon:"⬡", label:"Overview"  },
  { id:"pipeline",  icon:"◈", label:"Pipeline"  },
  { id:"contacts",  icon:"⬢", label:"Contacts"  },
  { id:"activity",  icon:"⬟", label:"Activity"  },
  { id:"analytics", icon:"◆", label:"Analytics" },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
const Card = ({ label, value, sub, color, wide }) => (
  <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:wide?"14px 16px":"11px 13px", borderLeft:`3px solid ${color||C.gold}`, position:"relative", overflow:"hidden" }}>
    <div style={{ position:"absolute", top:0, right:0, width:36, height:36, background:`radial-gradient(circle,${color||C.gold}10,transparent)`, borderRadius:"0 0 0 36px" }}/>
    <div style={{ fontSize:8, fontFamily:MONO, color:C.muted, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:4 }}>{label}</div>
    <div style={{ fontSize:wide?22:17, fontFamily:MONO, color:color||C.goldLight, lineHeight:1 }}>{value}</div>
    {sub && <div style={{ fontSize:9, color:C.textDim, marginTop:4, fontFamily:BODY, fontStyle:"italic" }}>{sub}</div>}
  </div>
);

const Divider = ({ label, color }) => (
  <div style={{ fontFamily:MONO, fontSize:8, letterSpacing:"0.28em", textTransform:"uppercase", color:color||C.goldDim, borderBottom:`1px solid ${C.border}`, paddingBottom:7, marginBottom:14, marginTop:8, display:"flex", alignItems:"center", gap:8 }}>
    <span style={{ opacity:0.5 }}>───</span>{label}<span style={{ opacity:0.5 }}>───</span>
  </div>
);

const StageBadge = ({ stage }) => {
  const cfg = STAGE_CFG[stage] || STAGE_CFG.lead;
  return (
    <span style={{ color:cfg.color, border:`1px solid ${cfg.color}44`, background:`${cfg.color}11`, borderRadius:3, padding:"1px 6px", fontSize:7, fontFamily:MONO, letterSpacing:"0.1em" }}>{cfg.label}</span>
  );
};

const UrgBadge = ({ urgency }) => {
  const cfg = URGENCY[urgency] || URGENCY.low;
  return (
    <span style={{ background:cfg.bg, color:cfg.text, border:`1px solid ${cfg.border}55`, borderRadius:3, padding:"1px 6px", fontSize:7, fontFamily:MONO, letterSpacing:"0.1em" }}>{cfg.label}</span>
  );
};

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:C.surface, border:`1px solid ${C.borderWarm}`, borderRadius:6, padding:"10px 14px", fontFamily:BODY, fontSize:11, color:C.text, boxShadow:"0 8px 32px #00000099" }}>
      <div style={{ color:C.gold, fontFamily:MONO, fontSize:9, marginBottom:5, letterSpacing:"0.08em" }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display:"flex", justifyContent:"space-between", gap:16, color:p.color||C.muted, marginBottom:2, fontSize:10 }}>
          <span style={{ fontStyle:"italic" }}>{p.name}</span>
          <span style={{ fontFamily:MONO }}>{typeof p.value === "number" ? (p.value >= 1000000 ? fmt(p.value) : p.value.toLocaleString()) : p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
export default function CRMDashboard() {
  const [tab, setTab] = useState("overview");
  const [stageFilter, setStageFilter] = useState("all");
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const totalPipelineAUM = CONTACTS.filter(c => c.stage !== "closed").reduce((s, c) => s + c.aum, 0);
  const closedAUM = CONTACTS.filter(c => c.stage === "closed").reduce((s, c) => s + c.aum, 0);
  const urgentCount = CONTACTS.filter(c => c.urgency === "high").length;
  const overdueCount = CONTACTS.filter(c => c.urgency === "high" && c.stage === "proposal").length;

  const filtered = stageFilter === "all" ? CONTACTS : CONTACTS.filter(c => c.stage === stageFilter);

  const funnelData = STAGES.map(s => ({ name:s.label, value:s.count, aum:s.value, fill:s.color }));

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, fontFamily:BODY, backgroundImage:`radial-gradient(ellipse at 20% 0%,#0d1520 0%,transparent 55%),radial-gradient(ellipse at 80% 100%,#0a1510 0%,transparent 55%)`, opacity:mounted?1:0, transition:"opacity 0.5s ease" }}>

      {/* ── HEADER ── */}
      <div style={{ padding:"20px 18px 14px", borderBottom:`1px solid ${C.border}`, backdropFilter:"blur(16px)", background:"#0a0c0fcc", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:`${C.slateDim}88`, border:`1px solid ${C.slate}44`, borderRadius:20, padding:"3px 10px", marginBottom:8 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:C.slateLight, boxShadow:`0 0 6px ${C.slateLight}` }}/>
          <span style={{ fontFamily:MONO, fontSize:8, color:C.slateLight, letterSpacing:"0.14em" }}>PORTFOLIO SAMPLE · CUSTOM CRM</span>
        </div>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
          <div>
            <div style={{ fontFamily:DISPLAY, fontSize:22, fontWeight:700, letterSpacing:"-0.02em", color:C.ink }}>{FIRM.name}</div>
            <div style={{ fontFamily:MONO, fontSize:9, color:C.textDim, letterSpacing:"0.12em", marginTop:2 }}>{FIRM.type} · {FIRM.aum}</div>
          </div>
          <div style={{ display:"flex", gap:16 }}>
            {ADVISORS.map(a => (
              <div key={a.id} style={{ textAlign:"center" }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:`${C.slate}33`, border:`1px solid ${C.slate}55`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:MONO, fontSize:9, color:C.slateLight, margin:"0 auto 3px" }}>{a.id}</div>
                <div style={{ fontFamily:MONO, fontSize:7, color:C.textDim }}>{a.clients} clients</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ display:"flex", gap:1, padding:"0 18px", borderBottom:`1px solid ${C.border}`, background:C.surface }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background:tab===t.id?C.surfaceAlt:"transparent", border:"none", borderBottom:tab===t.id?`2px solid ${C.gold}`:"2px solid transparent", color:tab===t.id?C.goldLight:C.muted, fontFamily:MONO, fontSize:9, letterSpacing:"0.14em", padding:"10px 14px", cursor:"pointer", transition:"all 0.15s" }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── BODY ── */}
      <div style={{ padding:"20px 18px", maxWidth:1100, margin:"0 auto" }}>

        {/* ════ OVERVIEW ════ */}
        {tab === "overview" && (
          <div>
            <Divider label="Pipeline Health"/>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:20 }}>
              <Card label="Active Pipeline AUM" value={fmt(totalPipelineAUM)} sub="across open opportunities" color={C.gold} wide/>
              <Card label="Closed / Active AUM" value={fmt(closedAUM)} sub="won & currently managed" color={C.emerald} wide/>
              <Card label="Urgent Follow-Ups" value={urgentCount} sub="require action this week" color={urgentCount>0?C.amber:C.forest} wide/>
              <Card label="Total Contacts" value={CONTACTS.length} sub="in current CRM" color={C.slate} wide/>
            </div>

            <Divider label="Stage Breakdown"/>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, marginBottom:20 }}>
              {STAGES.map(s => (
                <div key={s.id} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:6, padding:"12px 14px", borderTop:`3px solid ${s.color}` }}>
                  <div style={{ fontFamily:MONO, fontSize:8, color:C.muted, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:6 }}>{s.label}</div>
                  <div style={{ fontFamily:MONO, fontSize:20, color:s.color, lineHeight:1 }}>{s.count}</div>
                  <div style={{ fontFamily:MONO, fontSize:9, color:C.textDim, marginTop:4 }}>{s.value > 0 ? fmt(s.value) : "—"}</div>
                </div>
              ))}
            </div>

            <Divider label="Urgent Actions Required"/>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
              {CONTACTS.filter(c => c.urgency === "high").map(c => (
                <div key={c.id} style={{ background:C.surface, border:`1px solid ${C.amber}33`, borderLeft:`3px solid ${C.amber}`, borderRadius:6, padding:"10px 14px", display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <span style={{ fontFamily:DISPLAY, fontSize:13, fontWeight:700, color:C.ink }}>{c.name}</span>
                      <StageBadge stage={c.stage}/>
                      <UrgBadge urgency={c.urgency}/>
                    </div>
                    <div style={{ fontFamily:MONO, fontSize:9, color:C.textDim, marginBottom:3 }}>{c.co}</div>
                    <div style={{ fontFamily:BODY, fontSize:11, color:C.amberLight, fontStyle:"italic" }}>→ {c.nextAction}</div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontFamily:MONO, fontSize:12, color:C.goldLight }}>{fmt(c.aum)}</div>
                    <div style={{ fontFamily:MONO, fontSize:8, color:C.textDim, marginTop:2 }}>Advisor: {c.advisor}</div>
                    <div style={{ fontFamily:MONO, fontSize:8, color:C.muted, marginTop:1 }}>Last: {c.lastContact}</div>
                  </div>
                </div>
              ))}
            </div>

            <Divider label="Monthly Activity — Contacts Added by Stage"/>
            <div style={{ height:200, marginBottom:12 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_PIPELINE} margin={{ top:0, right:0, bottom:0, left:0 }}>
                  <XAxis dataKey="month" tick={{ fontFamily:MONO, fontSize:8, fill:C.muted }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fontFamily:MONO, fontSize:8, fill:C.muted }} axisLine={false} tickLine={false} width={20}/>
                  <Tooltip content={<Tip/>}/>
                  <Bar dataKey="leads" name="Leads" stackId="a" fill={C.slateDim} radius={[0,0,0,0]}/>
                  <Bar dataKey="qualified" name="Qualified" stackId="a" fill={C.slate}/>
                  <Bar dataKey="proposals" name="Proposals" stackId="a" fill={C.gold}/>
                  <Bar dataKey="closed" name="Closed" stackId="a" fill={C.emerald} radius={[3,3,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ════ PIPELINE ════ */}
        {tab === "pipeline" && (
          <div>
            <Divider label="Deal Pipeline by Stage"/>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              <div>
                {STAGES.map(s => {
                  const stageContacts = CONTACTS.filter(c => c.stage === s.id);
                  if (!stageContacts.length) return null;
                  return (
                    <div key={s.id} style={{ marginBottom:16 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                        <div style={{ width:8, height:8, background:s.color, borderRadius:"50%" }}/>
                        <span style={{ fontFamily:MONO, fontSize:9, color:s.color, letterSpacing:"0.14em" }}>{s.label.toUpperCase()}</span>
                        <span style={{ fontFamily:MONO, fontSize:9, color:C.muted }}>({s.count})</span>
                        <span style={{ fontFamily:MONO, fontSize:9, color:C.textDim, marginLeft:"auto" }}>{s.value > 0 ? fmt(s.value) : "—"}</span>
                      </div>
                      {stageContacts.map(c => (
                        <div key={c.id} style={{ background:C.surface, border:`1px solid ${C.border}`, borderLeft:`2px solid ${s.color}`, borderRadius:4, padding:"8px 12px", marginBottom:4 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                            <div>
                              <div style={{ fontFamily:DISPLAY, fontSize:12, fontWeight:700, color:C.ink }}>{c.name}</div>
                              <div style={{ fontFamily:MONO, fontSize:8, color:C.textDim, marginTop:1 }}>{c.co}</div>
                            </div>
                            <div style={{ textAlign:"right" }}>
                              {c.aum > 0 && <div style={{ fontFamily:MONO, fontSize:11, color:C.goldLight }}>{fmt(c.aum)}</div>}
                              <UrgBadge urgency={c.urgency}/>
                            </div>
                          </div>
                          <div style={{ fontFamily:BODY, fontSize:10, color:C.textDim, fontStyle:"italic", marginTop:5 }}>→ {c.nextAction}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
              <div>
                <Divider label="Pipeline Funnel — Contact Count"/>
                <div style={{ height:260, marginBottom:20 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={funnelData} layout="vertical" margin={{ top:0, right:60, bottom:0, left:60 }}>
                      <XAxis type="number" hide/>
                      <YAxis type="category" dataKey="name" tick={{ fontFamily:MONO, fontSize:8, fill:C.muted }} axisLine={false} tickLine={false} width={70}/>
                      <Tooltip content={<Tip/>}/>
                      <Bar dataKey="value" name="Contacts" radius={[0,3,3,0]}>
                        {funnelData.map((entry, i) => <Cell key={i} fill={entry.fill}/>)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <Divider label="Pipeline AUM by Stage"/>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {STAGES.filter(s => s.value > 0).map(s => (
                    <div key={s.id} style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:8, height:8, background:s.color, borderRadius:"50%", flexShrink:0 }}/>
                      <div style={{ fontFamily:MONO, fontSize:9, color:C.textDim, width:90 }}>{s.label}</div>
                      <div style={{ flex:1, height:6, background:C.dim, borderRadius:3, overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${(s.value/totalPipelineAUM)*100}%`, background:s.color, borderRadius:3 }}/>
                      </div>
                      <div style={{ fontFamily:MONO, fontSize:9, color:s.color, width:55, textAlign:"right" }}>{fmt(s.value)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════ CONTACTS ════ */}
        {tab === "contacts" && (
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16, flexWrap:"wrap" }}>
              <span style={{ fontFamily:MONO, fontSize:8, color:C.muted, letterSpacing:"0.14em" }}>FILTER BY STAGE:</span>
              {["all", ...STAGES.map(s => s.id)].map(s => (
                <button key={s} onClick={() => setStageFilter(s)} style={{ background:stageFilter===s?`${C.gold}22`:"transparent", border:`1px solid ${stageFilter===s?C.gold:C.border}`, color:stageFilter===s?C.goldLight:C.muted, fontFamily:MONO, fontSize:8, letterSpacing:"0.1em", padding:"3px 10px", cursor:"pointer", borderRadius:3, textTransform:"uppercase" }}>
                  {s === "all" ? "All" : STAGES.find(st => st.id === s)?.label}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {filtered.map(c => (
                <div key={c.id} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:6, padding:"12px 16px" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:6 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3, flexWrap:"wrap" }}>
                        <span style={{ fontFamily:DISPLAY, fontSize:14, fontWeight:700, color:C.ink }}>{c.name}</span>
                        <StageBadge stage={c.stage}/>
                        <UrgBadge urgency={c.urgency}/>
                        {c.tags.map(t => (
                          <span key={t} style={{ background:`${C.slate}22`, color:C.slateLight, border:`1px solid ${C.slate}44`, borderRadius:3, padding:"1px 6px", fontSize:7, fontFamily:MONO }}>{t}</span>
                        ))}
                      </div>
                      <div style={{ fontFamily:MONO, fontSize:9, color:C.textDim }}>{c.co}</div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      {c.aum > 0 && <div style={{ fontFamily:MONO, fontSize:14, color:C.goldLight }}>{fmt(c.aum)}</div>}
                      <div style={{ fontFamily:MONO, fontSize:8, color:C.muted, marginTop:2 }}>Advisor: {c.advisor} · Source: {c.source}</div>
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:8 }}>
                    <div style={{ fontFamily:MONO, fontSize:8, color:C.muted }}>Last contact: <span style={{ color:C.textDim }}>{c.lastContact}</span></div>
                    <div style={{ fontFamily:BODY, fontSize:11, color:URGENCY[c.urgency]?.text || C.forestLight, fontStyle:"italic" }}>→ {c.nextAction}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ ACTIVITY ════ */}
        {tab === "activity" && (
          <div>
            <Divider label="Recent Activity Log"/>
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {ACTIVITIES.map((a, i) => (
                <div key={i} style={{ display:"flex", gap:14, padding:"12px 0", borderBottom:`1px solid ${C.border}` }}>
                  <div style={{ flexShrink:0, width:28, textAlign:"center" }}>
                    <div style={{ fontFamily:MONO, fontSize:16, color:C.gold, lineHeight:1 }}>{ACT_ICON[a.type]}</div>
                    <div style={{ fontFamily:MONO, fontSize:7, color:C.muted, marginTop:2, letterSpacing:"0.08em" }}>{a.type.toUpperCase()}</div>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                      <span style={{ fontFamily:DISPLAY, fontSize:12, fontWeight:700, color:C.ink }}>{a.contact}</span>
                      <span style={{ fontFamily:MONO, fontSize:7, color:C.muted }}>Advisor: {a.advisor}</span>
                    </div>
                    <div style={{ fontFamily:BODY, fontSize:11, color:C.textDim, fontStyle:"italic", lineHeight:1.6 }}>{a.note}</div>
                  </div>
                  <div style={{ fontFamily:MONO, fontSize:8, color:C.muted, flexShrink:0, paddingTop:2 }}>{a.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ ANALYTICS ════ */}
        {tab === "analytics" && (
          <div>
            <Divider label="Lead Source Breakdown"/>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
              <div style={{ height:200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={SOURCE_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={45}>
                      {SOURCE_DATA.map((entry, i) => <Cell key={i} fill={entry.color}/>)}
                    </Pie>
                    <Tooltip content={<Tip/>}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:6, justifyContent:"center" }}>
                {SOURCE_DATA.map(s => (
                  <div key={s.name} style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:8, height:8, background:s.color, borderRadius:"50%", flexShrink:0 }}/>
                    <div style={{ fontFamily:MONO, fontSize:9, color:C.textDim, flex:1 }}>{s.name}</div>
                    <div style={{ fontFamily:MONO, fontSize:11, color:s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <Divider label="Monthly Pipeline — AUM Added by Closed Engagements"/>
            <div style={{ height:200, marginBottom:20 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_PIPELINE} margin={{ top:0, right:0, bottom:0, left:10 }}>
                  <defs>
                    <linearGradient id="aumGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={C.emerald} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={C.emerald} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontFamily:MONO, fontSize:8, fill:C.muted }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fontFamily:MONO, fontSize:8, fill:C.muted }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v)} width={50}/>
                  <Tooltip content={<Tip/>}/>
                  <Area type="monotone" dataKey="aum_added" name="AUM Added" stroke={C.emeraldLight} fill="url(#aumGrad)" strokeWidth={2}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <Divider label="Advisor Workload"/>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
              {ADVISORS.map(a => {
                const ac = CONTACTS.filter(c => c.advisor === a.id);
                const urgent = ac.filter(c => c.urgency === "high").length;
                const aumTotal = ac.reduce((s, c) => s + c.aum, 0);
                return (
                  <div key={a.id} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:6, padding:"14px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                      <div style={{ width:32, height:32, borderRadius:"50%", background:`${C.slate}33`, border:`1px solid ${C.slate}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:MONO, fontSize:10, color:C.slateLight }}>{a.id}</div>
                      <div>
                        <div style={{ fontFamily:DISPLAY, fontSize:13, fontWeight:700, color:C.ink }}>{a.name}</div>
                        <div style={{ fontFamily:MONO, fontSize:8, color:C.textDim }}>{a.clients} contacts</div>
                      </div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      <div style={{ display:"flex", justifyContent:"space-between" }}>
                        <span style={{ fontFamily:MONO, fontSize:8, color:C.muted }}>Pipeline AUM</span>
                        <span style={{ fontFamily:MONO, fontSize:9, color:C.goldLight }}>{fmt(aumTotal)}</span>
                      </div>
                      <div style={{ display:"flex", justifyContent:"space-between" }}>
                        <span style={{ fontFamily:MONO, fontSize:8, color:C.muted }}>Urgent actions</span>
                        <span style={{ fontFamily:MONO, fontSize:9, color:urgent > 0 ? C.amberLight : C.forestLight }}>{urgent}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* ── DISCLAIMER ── */}
      <div style={{ margin:"0 18px 24px", padding:"10px 14px", background:`${C.slateDim}22`, border:`1px solid ${C.slateDim}`, borderRadius:4 }}>
        <div style={{ fontFamily:MONO, fontSize:8, color:C.muted, letterSpacing:"0.1em", lineHeight:1.7 }}>{FIRM.disclaimer}</div>
      </div>
    </div>
  );
}
