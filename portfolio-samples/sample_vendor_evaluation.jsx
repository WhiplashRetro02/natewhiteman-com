import { useState, useEffect } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Cell, Legend
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
// FICTIONAL ENGAGEMENT — FOR ILLUSTRATIVE / MARKETING PURPOSES ONLY
// All vendor names, pricing, and client information are fabricated.
// This is a portfolio sample illustrating technology consulting deliverables.
// ═══════════════════════════════════════════════════════════════════════════

const ENGAGEMENT = {
  client:      "Meridian Home Goods",
  clientDesc:  "Regional Retailer · 14 locations · $38M annual revenue",
  project:     "AI Analytics Platform Selection",
  analyst:     "N. Whiteman",
  delivered:   "June 2025",
  question:    "Which of three AI analytics platforms — if any — is the right fit for Meridian's current data environment and operational goals?",
  disclaimer:  "All vendor names, pricing, scoring, and client details are entirely fictional and for portfolio illustration only. This represents the format and depth of a technology consulting deliverable.",
};

const CRITERIA = [
  { id:"fit",     label:"Business Fit",        weight:0.28, desc:"How well the platform addresses Meridian's specific use cases: inventory forecasting, store-level performance, and vendor analytics." },
  { id:"data",    label:"Data Compatibility",  weight:0.22, desc:"Compatibility with Meridian's existing stack: NetSuite ERP, Shopify POS, and a mix of spreadsheet-based reporting." },
  { id:"tco",     label:"Total Cost (3-yr)",   weight:0.20, desc:"All-in cost including licensing, implementation, training, and ongoing support over a 3-year horizon." },
  { id:"ops",     label:"Operational Lift",    weight:0.15, desc:"Internal resources required to maintain and operate the platform post-implementation." },
  { id:"vendor",  label:"Vendor Stability",    weight:0.10, desc:"Company age, funding runway, customer base, and support responsiveness." },
  { id:"scale",   label:"Scalability",         weight:0.05, desc:"Ability to grow with Meridian: additional locations, SKUs, and data volume over 3–5 years." },
];

const VENDORS = [
  {
    id:"A", name:"Clearwave Analytics", color:C.slate,
    tagline:"Enterprise BI platform with an AI add-on module",
    founded:2011, funding:"Public", employees:"800+", seats:"Unlimited",
    annualCost:44000, implCost:18000, trainCost:6000,
    scores: { fit:52, data:60, tco:38, ops:40, vendor:82, scale:80 },
    pros:[
      "Mature, stable platform — 14 years in market",
      "Strong enterprise support SLAs",
      "Unlimited user seats included",
      "Robust audit trail and permissions model",
    ],
    cons:[
      "AI module is bolted-on, not native — limited predictive capability",
      "Implementation quoted at 4–6 months for full deployment",
      "Total 3-year cost significantly exceeds the other options",
      "Salespeople were unable to demonstrate retail-specific use cases",
    ],
    verdict:"overbuilt",
  },
  {
    id:"B", name:"Vantage IQ", color:C.gold,
    tagline:"Retail-native AI analytics with pre-built connectors",
    founded:2019, funding:"Series B · $31M raised", employees:"120", seats:"Up to 25",
    annualCost:28000, implCost:6000, trainCost:2500,
    scores: { fit:84, data:88, tco:78, ops:72, vendor:65, scale:68 },
    pros:[
      "Purpose-built for multi-location retail — Meridian's exact use case",
      "Native NetSuite and Shopify connectors — no ETL build required",
      "Inventory forecasting and store-level P&L out of the box",
      "Competitive 3-year cost relative to capability delivered",
    ],
    cons:[
      "Series B company — funding runway is a monitoring consideration",
      "25-seat cap may require renegotiation at scale",
      "Customer support quality varies (per references — avg 2.1-day response)",
      "Limited self-serve configuration — vendor involvement for major changes",
    ],
    verdict:"recommended",
  },
  {
    id:"C", name:"DataPulse Pro", color:C.forest,
    tagline:"Low-code BI builder with AI-assisted report generation",
    founded:2021, funding:"Seed · $4.2M raised", employees:"28", seats:"15",
    annualCost:9600, implCost:0, trainCost:800,
    scores: { fit:41, data:48, tco:92, ops:85, vendor:30, scale:38 },
    pros:[
      "Lowest cost by a wide margin",
      "No implementation fee — self-serve onboarding",
      "Minimal internal IT lift to maintain",
      "Rapid deployment (demo-to-live in under 2 weeks)",
    ],
    cons:[
      "No native retail forecasting — requires manual model configuration",
      "No NetSuite connector — would require a custom integration build (~$8–12K)",
      "28-person company with $4.2M seed — meaningful business continuity risk",
      "15-seat limit is insufficient for Meridian's current team size",
      "AI capability is generative report writing, not predictive analytics",
    ],
    verdict:"not_recommended",
  },
];

const VERDICT_CFG = {
  recommended:     { bg:"#061208", border:C.emerald,  text:C.emeraldLight, label:"RECOMMENDED"     },
  overbuilt:       { bg:"#0e1400", border:"#8a9010",  text:"#b8c030",      label:"OVERBUILT"        },
  not_recommended: { bg:"#1a0e00", border:C.amber,    text:C.amberLight,   label:"NOT RECOMMENDED"  },
};

const TABS = [
  { id:"summary",    icon:"⬡", label:"Exec Summary"  },
  { id:"scoring",    icon:"◈", label:"Scoring"        },
  { id:"comparison", icon:"⬢", label:"Side by Side"  },
  { id:"financials", icon:"◆", label:"Cost Analysis"  },
  { id:"memo",       icon:"⬟", label:"Decision Memo"  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
const Card = ({ label, value, sub, color, wide }) => (
  <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:wide?"14px 16px":"11px 13px", borderLeft:`3px solid ${color||C.gold}`, position:"relative", overflow:"hidden" }}>
    <div style={{ position:"absolute", top:0, right:0, width:36, height:36, background:`radial-gradient(circle,${color||C.gold}10,transparent)`, borderRadius:"0 0 0 36px" }}/>
    <div style={{ fontSize:8, fontFamily:MONO, color:C.muted, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:4 }}>{label}</div>
    <div style={{ fontSize:wide?20:16, fontFamily:MONO, color:color||C.goldLight, lineHeight:1.1 }}>{value}</div>
    {sub && <div style={{ fontSize:9, color:C.textDim, marginTop:4, fontFamily:BODY, fontStyle:"italic" }}>{sub}</div>}
  </div>
);

const Divider = ({ label, color }) => (
  <div style={{ fontFamily:MONO, fontSize:8, letterSpacing:"0.28em", textTransform:"uppercase", color:color||C.goldDim, borderBottom:`1px solid ${C.border}`, paddingBottom:7, marginBottom:14, marginTop:8, display:"flex", alignItems:"center", gap:8 }}>
    <span style={{ opacity:0.5 }}>───</span>{label}<span style={{ opacity:0.5 }}>───</span>
  </div>
);

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:C.surface, border:`1px solid ${C.borderWarm}`, borderRadius:6, padding:"10px 14px", fontFamily:BODY, fontSize:11, color:C.text, boxShadow:"0 8px 32px #00000099" }}>
      <div style={{ color:C.gold, fontFamily:MONO, fontSize:9, marginBottom:5, letterSpacing:"0.08em" }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display:"flex", justifyContent:"space-between", gap:16, color:p.color||C.muted, marginBottom:2, fontSize:10 }}>
          <span style={{ fontStyle:"italic" }}>{p.name}</span>
          <span style={{ fontFamily:MONO }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

function computeWeighted(vendor) {
  return Math.round(
    CRITERIA.reduce((sum, c) => sum + (vendor.scores[c.id] * c.weight), 0)
  );
}

// ═══════════════════════════════════════════════════════════════════════════
export default function VendorEvaluation() {
  const [tab, setTab] = useState("summary");
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const recommended = VENDORS.find(v => v.verdict === "recommended");
  const radarData = CRITERIA.map(c => ({
    criterion: c.label.split(" ")[0],
    ...Object.fromEntries(VENDORS.map(v => [v.name, v.scores[c.id]])),
  }));

  const costData = VENDORS.map(v => ({
    name: v.name,
    "Year 1": v.annualCost + v.implCost + v.trainCost,
    "Year 2": v.annualCost,
    "Year 3": v.annualCost,
    color: v.color,
  }));

  const totalCost3yr = v => (v.annualCost * 3) + v.implCost + v.trainCost;

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, fontFamily:BODY, backgroundImage:`radial-gradient(ellipse at 20% 0%,#0d1520 0%,transparent 55%),radial-gradient(ellipse at 80% 100%,#0a1510 0%,transparent 55%)`, opacity:mounted?1:0, transition:"opacity 0.5s ease" }}>

      {/* ── HEADER ── */}
      <div style={{ padding:"20px 18px 14px", borderBottom:`1px solid ${C.border}`, backdropFilter:"blur(16px)", background:"#0a0c0fcc", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:`${C.slateDim}88`, border:`1px solid ${C.slate}44`, borderRadius:20, padding:"3px 10px", marginBottom:8 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:C.slateLight, boxShadow:`0 0 6px ${C.slateLight}` }}/>
          <span style={{ fontFamily:MONO, fontSize:8, color:C.slateLight, letterSpacing:"0.14em" }}>PORTFOLIO SAMPLE · TECHNOLOGY CONSULTING DELIVERABLE</span>
        </div>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
          <div>
            <div style={{ fontFamily:DISPLAY, fontSize:22, fontWeight:700, letterSpacing:"-0.02em", color:C.ink }}>{ENGAGEMENT.project}</div>
            <div style={{ fontFamily:MONO, fontSize:9, color:C.textDim, letterSpacing:"0.12em", marginTop:2 }}>{ENGAGEMENT.client} · {ENGAGEMENT.clientDesc}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:MONO, fontSize:8, color:C.muted }}>Analyst: {ENGAGEMENT.analyst}</div>
            <div style={{ fontFamily:MONO, fontSize:8, color:C.muted }}>Delivered: {ENGAGEMENT.delivered}</div>
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

        {/* ════ EXEC SUMMARY ════ */}
        {tab === "summary" && (
          <div>
            <div style={{ background:C.surface, border:`1px solid ${C.borderWarm}`, borderRadius:8, padding:"16px 20px", marginBottom:20, borderLeft:`4px solid ${C.gold}` }}>
              <div style={{ fontFamily:MONO, fontSize:8, color:C.goldDim, letterSpacing:"0.2em", marginBottom:8 }}>ENGAGEMENT QUESTION</div>
              <div style={{ fontFamily:DISPLAY, fontSize:16, color:C.ink, fontStyle:"italic", lineHeight:1.6 }}>"{ENGAGEMENT.question}"</div>
            </div>

            <Divider label="Vendors Evaluated"/>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:20 }}>
              {VENDORS.map(v => {
                const cfg = VERDICT_CFG[v.verdict];
                const weighted = computeWeighted(v);
                return (
                  <div key={v.id} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"14px 16px", borderTop:`3px solid ${v.color}` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                      <div style={{ fontFamily:DISPLAY, fontSize:15, fontWeight:700, color:C.ink }}>{v.name}</div>
                      <span style={{ background:cfg.bg, color:cfg.text, border:`1px solid ${cfg.border}55`, borderRadius:3, padding:"2px 7px", fontSize:7, fontFamily:MONO, letterSpacing:"0.1em", whiteSpace:"nowrap" }}>{cfg.label}</span>
                    </div>
                    <div style={{ fontFamily:BODY, fontSize:11, color:C.textDim, fontStyle:"italic", marginBottom:10 }}>{v.tagline}</div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                      <div>
                        <div style={{ fontFamily:MONO, fontSize:8, color:C.muted, marginBottom:2 }}>Weighted Score</div>
                        <div style={{ fontFamily:MONO, fontSize:28, color:v.color, lineHeight:1 }}>{weighted}</div>
                        <div style={{ fontFamily:MONO, fontSize:7, color:C.muted }}>/ 100</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontFamily:MONO, fontSize:8, color:C.muted, marginBottom:2 }}>3-yr Total Cost</div>
                        <div style={{ fontFamily:MONO, fontSize:14, color:C.textDim }}>${(totalCost3yr(v)/1000).toFixed(0)}K</div>
                      </div>
                    </div>
                    <div style={{ marginTop:10, height:5, background:C.dim, borderRadius:3, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${weighted}%`, background:v.color, borderRadius:3 }}/>
                    </div>
                  </div>
                );
              })}
            </div>

            <Divider label="Bottom Line"/>
            <div style={{ background:`${C.emerald}0a`, border:`1px solid ${C.emerald}33`, borderRadius:8, padding:"16px 20px", marginBottom:16 }}>
              <div style={{ fontFamily:MONO, fontSize:8, color:C.emeraldLight, letterSpacing:"0.16em", marginBottom:8 }}>RECOMMENDATION — {recommended?.name?.toUpperCase()}</div>
              <div style={{ fontFamily:BODY, fontSize:14, color:C.ink, lineHeight:1.75, marginBottom:10 }}>
                {recommended?.name} is the right fit for Meridian at this stage. It is the only vendor evaluated that natively addresses Meridian's two highest-priority use cases — inventory forecasting and store-level performance reporting — without requiring a custom integration build. Its total 3-year cost is competitive, its retail-specific feature set requires substantially less configuration than the alternatives, and it connects directly to NetSuite and Shopify without middleware.
              </div>
              <div style={{ fontFamily:BODY, fontSize:13, color:C.textDim, fontStyle:"italic", lineHeight:1.7 }}>
                The primary risk is vendor stage. Vantage IQ is a Series B company with a $31M raise. This is sufficient runway for a meaningful period, but Meridian should negotiate contract terms that include data portability, an escrow provision for source code, and a 90-day termination clause in the event of acquisition or wind-down.
              </div>
            </div>
          </div>
        )}

        {/* ════ SCORING ════ */}
        {tab === "scoring" && (
          <div>
            <Divider label="Evaluation Criteria & Weights"/>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
              {CRITERIA.map(c => (
                <div key={c.id} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:6, padding:"10px 14px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                    <div style={{ fontFamily:MONO, fontSize:11, color:C.goldLight, width:36, textAlign:"right", flexShrink:0 }}>{Math.round(c.weight*100)}%</div>
                    <div style={{ fontFamily:DISPLAY, fontSize:13, fontWeight:700, color:C.ink }}>{c.label}</div>
                    <div style={{ flex:1, height:4, background:C.dim, borderRadius:2, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${c.weight*100*5}%`, background:C.goldDim, borderRadius:2 }}/>
                    </div>
                  </div>
                  <div style={{ paddingLeft:46, fontFamily:BODY, fontSize:11, color:C.textDim, fontStyle:"italic", lineHeight:1.6 }}>{c.desc}</div>
                </div>
              ))}
            </div>

            <Divider label="Raw Scores by Criterion"/>
            <div style={{ overflowX:"auto", marginBottom:20 }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:MONO, fontSize:10 }}>
                <thead>
                  <tr style={{ borderBottom:`1px solid ${C.borderWarm}` }}>
                    <th style={{ textAlign:"left", padding:"8px 12px", color:C.muted, fontWeight:400, fontSize:8, letterSpacing:"0.14em" }}>CRITERION</th>
                    <th style={{ textAlign:"center", padding:"8px 12px", color:C.muted, fontWeight:400, fontSize:8, letterSpacing:"0.1em" }}>WEIGHT</th>
                    {VENDORS.map(v => (
                      <th key={v.id} style={{ textAlign:"center", padding:"8px 12px", color:v.color, fontWeight:600, fontSize:8, letterSpacing:"0.1em" }}>{v.name.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CRITERIA.map(c => {
                    const best = Math.max(...VENDORS.map(v => v.scores[c.id]));
                    return (
                      <tr key={c.id} style={{ borderBottom:`1px solid ${C.border}` }}>
                        <td style={{ padding:"10px 12px", color:C.text, fontFamily:BODY, fontSize:12 }}>{c.label}</td>
                        <td style={{ padding:"10px 12px", color:C.muted, textAlign:"center", fontSize:9 }}>{Math.round(c.weight*100)}%</td>
                        {VENDORS.map(v => {
                          const score = v.scores[c.id];
                          const isWinner = score === best;
                          return (
                            <td key={v.id} style={{ padding:"10px 12px", textAlign:"center" }}>
                              <span style={{ color:isWinner ? v.color : C.textDim, fontWeight:isWinner ? 600 : 400, fontSize:13 }}>{score}</span>
                              {isWinner && <span style={{ marginLeft:4, fontSize:9, color:v.color }}>▲</span>}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                  <tr style={{ borderTop:`2px solid ${C.borderWarm}` }}>
                    <td style={{ padding:"12px 12px", color:C.goldLight, fontFamily:MONO, fontSize:9, letterSpacing:"0.1em" }}>WEIGHTED TOTAL</td>
                    <td/>
                    {VENDORS.map(v => {
                      const weighted = computeWeighted(v);
                      const isWinner = weighted === Math.max(...VENDORS.map(computeWeighted));
                      return (
                        <td key={v.id} style={{ padding:"12px 12px", textAlign:"center" }}>
                          <span style={{ color:isWinner ? v.color : C.textDim, fontFamily:MONO, fontSize:16, fontWeight:600 }}>{weighted}</span>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

            <Divider label="Radar — Scores Across All Criteria"/>
            <div style={{ height:280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top:10, right:30, bottom:10, left:30 }}>
                  <PolarGrid stroke={C.border}/>
                  <PolarAngleAxis dataKey="criterion" tick={{ fontFamily:MONO, fontSize:8, fill:C.muted }}/>
                  {VENDORS.map(v => (
                    <Radar key={v.id} name={v.name} dataKey={v.name} stroke={v.color} fill={v.color} fillOpacity={0.08} strokeWidth={1.5}/>
                  ))}
                  <Legend wrapperStyle={{ fontFamily:MONO, fontSize:9 }}/>
                  <Tooltip content={<Tip/>}/>
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ════ SIDE BY SIDE ════ */}
        {tab === "comparison" && (
          <div>
            <Divider label="Vendor Profiles"/>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:20 }}>
              {VENDORS.map(v => {
                const cfg = VERDICT_CFG[v.verdict];
                return (
                  <div key={v.id} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, overflow:"hidden" }}>
                    <div style={{ padding:"12px 14px", borderBottom:`1px solid ${C.border}`, background:C.surfaceAlt }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                        <div style={{ fontFamily:DISPLAY, fontSize:14, fontWeight:700, color:v.color }}>{v.name}</div>
                        <span style={{ background:cfg.bg, color:cfg.text, border:`1px solid ${cfg.border}55`, borderRadius:3, padding:"2px 6px", fontSize:7, fontFamily:MONO }}>{cfg.label}</span>
                      </div>
                      <div style={{ fontFamily:BODY, fontSize:10, color:C.textDim, fontStyle:"italic", marginTop:3 }}>{v.tagline}</div>
                    </div>
                    <div style={{ padding:"12px 14px" }}>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:12 }}>
                        {[["Founded", v.founded], ["Funding", v.funding], ["Employees", v.employees], ["Seat Limit", v.seats]].map(([k,val]) => (
                          <div key={k}>
                            <div style={{ fontFamily:MONO, fontSize:7, color:C.muted, letterSpacing:"0.1em", marginBottom:1 }}>{k.toUpperCase()}</div>
                            <div style={{ fontFamily:MONO, fontSize:9, color:C.textDim }}>{val}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginBottom:10 }}>
                        <div style={{ fontFamily:MONO, fontSize:7, color:C.emeraldLight, letterSpacing:"0.1em", marginBottom:5 }}>STRENGTHS</div>
                        {v.pros.map((p, i) => (
                          <div key={i} style={{ display:"flex", gap:6, marginBottom:4 }}>
                            <span style={{ color:C.emeraldLight, fontFamily:MONO, fontSize:9, flexShrink:0, marginTop:1 }}>+</span>
                            <span style={{ fontFamily:BODY, fontSize:10, color:C.textDim, lineHeight:1.5 }}>{p}</span>
                          </div>
                        ))}
                      </div>

                      <div>
                        <div style={{ fontFamily:MONO, fontSize:7, color:C.amberLight, letterSpacing:"0.1em", marginBottom:5 }}>CONCERNS</div>
                        {v.cons.map((con, i) => (
                          <div key={i} style={{ display:"flex", gap:6, marginBottom:4 }}>
                            <span style={{ color:C.amberLight, fontFamily:MONO, fontSize:9, flexShrink:0, marginTop:1 }}>−</span>
                            <span style={{ fontFamily:BODY, fontSize:10, color:C.textDim, lineHeight:1.5 }}>{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ════ COST ANALYSIS ════ */}
        {tab === "financials" && (
          <div>
            <Divider label="3-Year Total Cost of Ownership"/>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20 }}>
              {VENDORS.map(v => (
                <Card key={v.id} label={`${v.name} — 3-yr TCO`} value={`$${(totalCost3yr(v)/1000).toFixed(0)}K`} sub={`$${(v.annualCost/1000).toFixed(0)}K/yr + $${((v.implCost+v.trainCost)/1000).toFixed(0)}K onboarding`} color={v.color} wide/>
              ))}
            </div>

            <Divider label="Year-by-Year Cost Breakdown"/>
            <div style={{ height:240, marginBottom:20 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { year:"Year 1", ...Object.fromEntries(VENDORS.map(v => [v.name, v.annualCost + v.implCost + v.trainCost])) },
                  { year:"Year 2", ...Object.fromEntries(VENDORS.map(v => [v.name, v.annualCost])) },
                  { year:"Year 3", ...Object.fromEntries(VENDORS.map(v => [v.name, v.annualCost])) },
                ]} margin={{ top:0, right:0, bottom:0, left:10 }}>
                  <XAxis dataKey="year" tick={{ fontFamily:MONO, fontSize:8, fill:C.muted }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fontFamily:MONO, fontSize:8, fill:C.muted }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} width={44}/>
                  <Tooltip content={<Tip/>}/>
                  {VENDORS.map(v => (
                    <Bar key={v.id} dataKey={v.name} fill={v.color} radius={[3,3,0,0]}/>
                  ))}
                  <Legend wrapperStyle={{ fontFamily:MONO, fontSize:9 }}/>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <Divider label="Cost Component Detail"/>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:MONO, fontSize:10 }}>
                <thead>
                  <tr style={{ borderBottom:`1px solid ${C.borderWarm}` }}>
                    <th style={{ textAlign:"left", padding:"8px 12px", color:C.muted, fontWeight:400, fontSize:8, letterSpacing:"0.12em" }}>COST COMPONENT</th>
                    {VENDORS.map(v => (
                      <th key={v.id} style={{ textAlign:"right", padding:"8px 12px", color:v.color, fontWeight:600, fontSize:8, letterSpacing:"0.08em" }}>{v.name.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Annual License", v => `$${v.annualCost.toLocaleString()}`],
                    ["Implementation", v => v.implCost > 0 ? `$${v.implCost.toLocaleString()}` : "Included"],
                    ["Training", v => `$${v.trainCost.toLocaleString()}`],
                    ["Year 1 Total", v => `$${(v.annualCost+v.implCost+v.trainCost).toLocaleString()}`],
                    ["3-Year Total", v => `$${totalCost3yr(v).toLocaleString()}`],
                  ].map(([label, fn], i) => (
                    <tr key={i} style={{ borderBottom:`1px solid ${C.border}`, background:i===4?`${C.gold}08`:"transparent" }}>
                      <td style={{ padding:"10px 12px", color:i>=3?C.goldLight:C.textDim, fontFamily:BODY, fontSize:11, fontWeight:i>=3?600:400 }}>{label}</td>
                      {VENDORS.map(v => (
                        <td key={v.id} style={{ padding:"10px 12px", textAlign:"right", color:i>=3?v.color:C.textDim, fontSize:i>=3?12:10 }}>{fn(v)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ════ DECISION MEMO ════ */}
        {tab === "memo" && (
          <div>
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, overflow:"hidden", maxWidth:780, margin:"0 auto" }}>
              {/* Memo header */}
              <div style={{ background:C.surfaceAlt, padding:"16px 24px", borderBottom:`1px solid ${C.border}` }}>
                <div style={{ fontFamily:MONO, fontSize:8, color:C.goldDim, letterSpacing:"0.24em", marginBottom:10 }}>CONFIDENTIAL MEMORANDUM · TECHNOLOGY CONSULTING DELIVERABLE</div>
                {[
                  ["TO",      "Leadership Team, Meridian Home Goods"],
                  ["FROM",    `${ENGAGEMENT.analyst} · Technology Consulting`],
                  ["DATE",    ENGAGEMENT.delivered],
                  ["RE",      ENGAGEMENT.project],
                ].map(([k,v]) => (
                  <div key={k} style={{ display:"flex", gap:16, marginBottom:4 }}>
                    <div style={{ fontFamily:MONO, fontSize:9, color:C.muted, width:44, flexShrink:0 }}>{k}:</div>
                    <div style={{ fontFamily:BODY, fontSize:12, color:C.text }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Memo body */}
              <div style={{ padding:"24px 28px" }}>
                {[
                  {
                    heading:"Purpose",
                    body:`This memo documents the findings and recommendation resulting from a two-week technology consulting engagement commissioned to evaluate three AI analytics platforms under consideration by Meridian Home Goods. The evaluation was conducted independently — no referral arrangements or commissions exist with any vendor assessed.`,
                  },
                  {
                    heading:"Background",
                    body:`Meridian operates 14 retail locations and manages approximately $38M in annual revenue. The business currently lacks a consolidated analytics capability — store performance data lives in NetSuite, point-of-sale data in Shopify, and most reporting is produced manually in spreadsheets. Three vendors approached Meridian with proposals ranging from $9,600 to $44,000 annually. This engagement was retained to assess those proposals against Meridian's actual needs before any purchasing decision was made.`,
                  },
                  {
                    heading:"Methodology",
                    body:`Six criteria were defined in consultation with Meridian's leadership team and weighted by business priority. Each vendor was scored across these criteria through a combination of: product demonstrations (live, against Meridian's sample data), reference interviews (2–3 customers per vendor), technical documentation review, and direct vendor Q&A sessions. Pricing was validated against signed quotes provided by each vendor.`,
                  },
                  {
                    heading:"Recommendation",
                    body:`Vantage IQ is the recommended platform. It scored highest on a weighted basis (74/100) and is the only evaluated option purpose-built for multi-location retail. Its native connectors for NetSuite and Shopify eliminate the integration development cost that would be required to make the other two platforms functional for Meridian's environment — a cost not reflected in their quoted prices.\n\nClearwave Analytics is a capable enterprise platform, but it is materially overbuilt for Meridian's current scale. Its 3-year cost is $156K versus Vantage IQ's $88.5K, and its AI module does not meaningfully advance Meridian's core use cases. DataPulse Pro is not recommended — its low cost is offset by a missing integration layer, an insufficient seat count, and material vendor stability risk for a company at Meridian's revenue scale.`,
                  },
                  {
                    heading:"Contract Negotiation Guidance",
                    body:`Before executing with Vantage IQ, three contract provisions should be negotiated: (1) data portability — Meridian must retain full export rights to all data in machine-readable format with 30-day notice; (2) source code escrow — given vendor stage, a standard software escrow arrangement protects operational continuity in the event of acquisition or wind-down; (3) a 90-day termination for convenience clause — standard practice given the vendor's funding stage. Vantage IQ's sales team indicated openness to all three provisions.`,
                  },
                  {
                    heading:"Implementation Timeline",
                    body:`Based on vendor reference interviews, median time-to-value for a comparable retail deployment is 6–8 weeks from contract execution. Meridian should designate one internal project owner and budget 8–10 hours of internal time in the first month for connector configuration and data validation. Full onboarding and staff training is included in the quoted implementation fee.`,
                  },
                ].map((section, i) => (
                  <div key={i} style={{ marginBottom:22 }}>
                    <div style={{ fontFamily:DISPLAY, fontSize:14, fontWeight:700, color:C.goldLight, marginBottom:8, paddingBottom:5, borderBottom:`1px solid ${C.border}` }}>{section.heading}</div>
                    {section.body.split("\n\n").map((para, j) => (
                      <div key={j} style={{ fontFamily:BODY, fontSize:12, color:C.text, lineHeight:1.85, marginBottom:10 }}>{para}</div>
                    ))}
                  </div>
                ))}

                <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:16, marginTop:8 }}>
                  <div style={{ fontFamily:MONO, fontSize:8, color:C.muted, lineHeight:1.7 }}>
                    This memo represents the professional judgment of the analyst based on information available at the time of the engagement. Meridian Home Goods retains sole decision-making authority. No commission, referral fee, or other compensation was received from any vendor evaluated. This deliverable is the property of Meridian Home Goods and is intended for internal use only.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── DISCLAIMER ── */}
      <div style={{ margin:"0 18px 24px", padding:"10px 14px", background:`${C.slateDim}22`, border:`1px solid ${C.slateDim}`, borderRadius:4 }}>
        <div style={{ fontFamily:MONO, fontSize:8, color:C.muted, letterSpacing:"0.1em", lineHeight:1.7 }}>{ENGAGEMENT.disclaimer}</div>
      </div>
    </div>
  );
}
