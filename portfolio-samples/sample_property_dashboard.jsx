import { useState, useMemo, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, ComposedChart,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine, PieChart, Pie, Cell
} from "recharts";

const _f = document.createElement("link");
_f.rel = "stylesheet";
_f.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono:wght@400;600&display=swap";
document.head.appendChild(_f);

// ─── PALETTE — Slate / warm gold / forest ────────────────────────────────────
const C = {
  bg:           "#0a0c0f",
  surface:      "#10141a",
  surfaceAlt:   "#141a22",
  surfaceHov:   "#1a2230",
  border:       "#1e2c3a",
  borderWarm:   "#2a3c50",
  // Primaries
  gold:         "#c8a040",
  goldLight:    "#e8c060",
  goldDim:      "#6a5020",
  slate:        "#3a6090",
  slateLight:   "#5888c0",
  slateDim:     "#1e3450",
  forest:       "#387058",
  forestLight:  "#50a078",
  // Semantic
  emerald:      "#30a870",
  emeraldLight: "#50c890",
  crimson:      "#b03030",
  crimsonLight: "#d85050",
  amber:        "#c07020",
  amberLight:   "#e09040",
  sky:          "#2880b0",
  skyLight:     "#50a8d8",
  // Text
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
// FICTIONAL PROPERTY — FOR ILLUSTRATIVE / MARKETING PURPOSES ONLY
// No real address, owner, lender, or inspector information included.
// All figures are representative of current market conditions.
// ═══════════════════════════════════════════════════════════════════════════
const PROP = {
  label:         "The Subject Property",
  type:          "Duplex — 2 Units",
  descriptor:    "1,920 SF · Corner Lot · Established Neighborhood",
  yearBuilt:     1978,
  sqft:          1920,
  lotSqft:       9200,
  purchasePrice: 319000,
  down:          15950,           // 5% conventional
  loanAmount:    303050,
  rate:          0.0688,          // 6.875% — 30-yr conventional, Q2 2026 avg
  termYears:     30,
  taxAnnual:     2640,            // ~$220/mo
  insuranceAnnual: 2040,          // ~$170/mo
  pmiRate:       0.0065,          // conventional PMI at <20% down
  units: 2,
  appreciationRate: 0.038,
  overallGrade:  "B−",
  overallHealth: 64,
  confidence:    71,
  units_data: [
    {
      id: "A", label: "Unit A", floor: "Ground floor",
      br: 2, ba: 1, sqft: 1040,
      rent: 0, marketRent: 1250,
      type: "owner", lease: "Available for owner-occupancy",
      hvac: "Carrier Split System · 2019 · 6 yrs old · Gas/Electric",
      hvacHealth: 72, hvacSev: "low",
      notes: "Larger unit. Recently repainted. Minor countertop wear. Good natural light. Separate entrance confirmed.",
    },
    {
      id: "B", label: "Unit B", floor: "Upper floor",
      br: 2, ba: 1, sqft: 880,
      rent: 1150, marketRent: 1200,
      type: "tenant", lease: "Month-to-month · $1,150/mo · Long-term tenant",
      hvac: "Lennox Split System · 2016 · 9 yrs old · Gas/Electric",
      hvacHealth: 58, hvacSev: "medium",
      notes: "Reliable long-term tenant. Slightly below market — natural rent increase opportunity at next renewal. HVAC approaching mid-life service window.",
    },
  ],
  disclaimer: "All figures are illustrative. This dashboard is intended for marketing and educational purposes only. Consult a licensed real estate professional, lender, and inspector before making investment decisions.",
};

// ─── INSPECTION DATA — B− Grade, Health 64/100 ───────────────────────────────
// Representative of a solid older home with manageable deferred maintenance.
// No critical structural or safety issues. Phased capex realistic for a 46-yr building.
const SYSTEMS = [
  { category: "Roof & Drainage", icon: "◈", items: [
    { label: "Roof Covering",      health: 52, sev: "medium", note: "Architectural shingles, estimated 12–15 yrs remaining. Minor granule loss visible on south slope. Not urgent, but budget for replacement in years 7–10." },
    { label: "Flashing",           health: 68, sev: "low",    note: "Mostly intact. Minor gap at chimney base — recommend roofing contractor caulk and seal within 6 months." },
    { label: "Gutters & Downspouts",health:70, sev: "low",    note: "Clean and functional. One downspout extension missing on rear — simple fix, under $50." },
    { label: "Fascia & Soffits",   health: 75, sev: "low",    note: "Good condition overall. Two small areas of paint peeling at eave. Cosmetic maintenance recommended." },
  ]},
  { category: "Structure & Foundation", icon: "⬡", items: [
    { label: "Foundation",         health: 82, sev: "low",    note: "Poured concrete — no significant cracking. Minor hairline settlement crack on north wall, consistent with age. Monitor annually." },
    { label: "Floor Joists",       health: 76, sev: "low",    note: "Visible joists in basement — straight, no rot, no evidence of insect damage. Solid." },
    { label: "Crawl Space",        health: 68, sev: "low",    note: "Accessible and dry. Vapor barrier in place but partially displaced. Recommend re-securing. No active moisture issues." },
    { label: "Load-Bearing Walls", health: 85, sev: "low",    note: "No concerns identified. No evidence of prior modification or compromise." },
  ]},
  { category: "Electrical", icon: "◉", items: [
    { label: "Main Panel (200A)",  health: 74, sev: "low",    note: "Updated 200A service panel. Breakers labeled and organized. Minor double-tapping on two circuits — recommend licensed electrician correction." },
    { label: "Branch Wiring",      health: 68, sev: "low",    note: "Predominantly Romex throughout. No knob-and-tube or cloth wiring found. Two outlets in Unit A garage without GFCI — correct before close." },
    { label: "GFCI / AFCI",        health: 60, sev: "medium", note: "GFCI missing in Unit B kitchen and both bathrooms. No arc fault breakers on bedroom circuits — recommend upgrade at panel ($300–$600 est.)." },
    { label: "Smoke / CO Detectors",health:55, sev: "medium", note: "Present but outdated — manufactured 2014. Recommend replacement throughout. Under $200 total. FHA-compatible when updated." },
  ]},
  { category: "Plumbing", icon: "⬢", items: [
    { label: "Supply Lines",       health: 65, sev: "medium", note: "Copper supply lines in good condition. Moderate mineral buildup at Unit B kitchen shutoff. Functional, monitor." },
    { label: "Drain / Waste",      health: 60, sev: "medium", note: "PVC drain lines. Slow drain in Unit A shower — likely hair clog, not structural. Recommend clearing before close." },
    { label: "Water Heaters",      health: 58, sev: "medium", note: "Unit A: 2018 (7 yrs). Unit B: 2013 (12 yrs, past avg life). Both functional. Budget Unit B replacement within 12 months ($900–$1,400)." },
    { label: "Fixtures & Hose Bibs",health:70, sev: "low",   note: "All fixtures functional. One dripping faucet in Unit B bathroom — minor washer replacement." },
  ]},
  { category: "HVAC", icon: "◆", items: [
    { label: "Unit A — Carrier 2019", health: 72, sev: "low",    note: "6 years old, functioning well. Annual service recommended. Filters current. Expected useful life 8–12 more years." },
    { label: "Unit B — Lennox 2016", health: 58, sev: "medium",  note: "9 years old. Tested and functional. Approaching mid-life service window — recommend professional tune-up. Budget replacement in 5–8 yrs." },
    { label: "Ductwork",             health: 65, sev: "medium",  note: "Insulated flex duct, no major disconnects. Minor gap at Unit B air handler boot — tape or mastic recommended." },
    { label: "Ventilation",          health: 70, sev: "low",     note: "Both bathroom exhaust fans operational. Kitchen range hood vents to exterior. Attic ventilation adequate." },
  ]},
  { category: "Interior & Exterior", icon: "⬟", items: [
    { label: "Windows",            health: 62, sev: "medium", note: "Double-pane vinyl throughout. Unit A: two windows with broken seals (fogging) — cosmetic, not structural. Budget $400–$800 for replacement." },
    { label: "Doors",              health: 75, sev: "low",    note: "Exterior doors solid and weather-stripped. Unit B rear door frame has minor wood softness at base — recommend paint and sealant." },
    { label: "Floors & Walls",     health: 72, sev: "low",    note: "Hardwood in Unit A in good condition. Carpet in Unit B shows normal wear. Drywall generally good — minor nail pops in Unit B hallway." },
    { label: "Attic Insulation",   health: 60, sev: "medium", note: "R-19 blown insulation — adequate but below modern R-38 standard. Not urgent, but adding insulation would reduce HVAC costs and improve energy efficiency." },
  ]},
];

// ─── REPAIRS ─────────────────────────────────────────────────────────────────
const REPAIRS = [
  { name: "Smoke/CO Detector Replacement",   low: 120,  high: 220,  urg: "high",   timeline: "Day 1",     cat: "Electrical" },
  { name: "GFCI Outlets — Unit B",           low: 150,  high: 350,  urg: "high",   timeline: "Month 1",   cat: "Electrical" },
  { name: "Unit A Shower Drain Clear",       low: 80,   high: 200,  urg: "medium", timeline: "Pre-Close", cat: "Plumbing"   },
  { name: "AFCI Breaker Upgrade",            low: 300,  high: 600,  urg: "medium", timeline: "Year 1",    cat: "Electrical" },
  { name: "Chimney Flashing Seal",           low: 200,  high: 500,  urg: "medium", timeline: "Month 1-3", cat: "Roof"       },
  { name: "Vapor Barrier Re-secure",         low: 200,  high: 500,  urg: "medium", timeline: "Year 1",    cat: "Structure"  },
  { name: "Unit B Water Heater Replace",     low: 900,  high: 1400, urg: "high",   timeline: "Year 1",    cat: "Plumbing"   },
  { name: "Unit B Faucet Repair",            low: 80,   high: 180,  urg: "low",    timeline: "Month 1",   cat: "Plumbing"   },
  { name: "Rear Door Frame Sealant",         low: 100,  high: 300,  urg: "low",    timeline: "Year 1",    cat: "Exterior"   },
  { name: "Unit A Window Seal Replace (×2)", low: 400,  high: 800,  urg: "medium", timeline: "Year 1-2",  cat: "Interior"   },
  { name: "Ductwork Boot Seal (Unit B)",     low: 150,  high: 400,  urg: "medium", timeline: "Year 1",    cat: "HVAC"       },
  { name: "Unit B HVAC Tune-Up",             low: 150,  high: 300,  urg: "medium", timeline: "Year 1",    cat: "HVAC"       },
  { name: "Attic Insulation Top-Up",         low: 1200, high: 2800, urg: "medium", timeline: "Year 1-3",  cat: "Structure"  },
  { name: "Exterior Paint Touch-Up",         low: 400,  high: 1000, urg: "low",    timeline: "Year 1-2",  cat: "Exterior"   },
  { name: "Unit B Carpet Replace",           low: 800,  high: 1800, urg: "low",    timeline: "Year 2-3",  cat: "Interior"   },
  { name: "Roof Replacement (future)",       low: 9000, high: 16000,urg: "low",    timeline: "Years 7-10",cat: "Roof"       },
  { name: "Unit B HVAC Replace (future)",    low: 5000, high: 8000, urg: "low",    timeline: "Years 5-8", cat: "HVAC"       },
];

// ─── FINANCIALS ───────────────────────────────────────────────────────────────
const PI = (() => {
  const r = PROP.rate / 12, n = PROP.termYears * 12, p = PROP.loanAmount;
  return (p * r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1);
})();
const TAX  = PROP.taxAnnual / 12;
const INS  = PROP.insuranceAnnual / 12;
const PMI  = (PROP.loanAmount * PROP.pmiRate) / 12;
const PITI = PI + TAX + INS + PMI;
const GROSS_RENT = 1150;
const NET_HACK   = PITI - GROSS_RENT;
const FULL_RENT  = PROP.units_data.reduce((s,u)=>s+u.marketRent,0);

function buildAmort(appRate) {
  const r = PROP.rate/12, n=360;
  let bal=PROP.loanAmount, cumOwner=PROP.down, cumTenant=0;
  const rows=[];
  for(let yr=1;yr<=30;yr++){
    let intYr=0,prinYr=0;
    for(let m=0;m<12;m++){const i=bal*r,p=PI-i;intYr+=i;prinYr+=p;bal-=p;}
    const tenAnn=GROSS_RENT*12*0.92;
    cumTenant+=tenAnn; cumOwner+=PITI*12-tenAnn;
    const app=PROP.purchasePrice*Math.pow(1+appRate,yr);
    rows.push({year:yr,loanBalance:Math.round(Math.max(bal,0)),ownerPaid:Math.round(cumOwner),tenantPaid:Math.round(cumTenant),appraisedValue:Math.round(app),equity:Math.round(app-Math.max(bal,0)),interestPaid:Math.round(intYr),principalPaid:Math.round(prinYr)});
  }
  return rows;
}

const CF_DATA=[1,2,3,5,7,10,15,20].map(yr=>{
  const rg=Math.pow(1.04,yr-1);
  return{year:`Yr ${yr}`,hackNet:Math.round(GROSS_RENT*rg-PITI),fullNet:Math.round(FULL_RENT*rg*0.92-PITI-150),optimized:Math.round(2700*rg*0.92-PITI-150)};
});

const repairLow   = REPAIRS.reduce((s,r)=>s+r.low,0);
const repairHigh  = REPAIRS.reduce((s,r)=>s+r.high,0);
const urgentItems = REPAIRS.filter(r=>r.urg==="high");
const urgLow      = urgentItems.reduce((s,r)=>s+r.low,0);
const urgHigh     = urgentItems.reduce((s,r)=>s+r.high,0);
const allItems    = SYSTEMS.flatMap(s=>s.items);
const avgHealth   = Math.round(allItems.reduce((s,i)=>s+i.health,0)/allItems.length);

const repairByCat=[...new Set(REPAIRS.map(r=>r.cat))].map((cat,i)=>({
  name:cat,
  value:Math.round(REPAIRS.filter(r=>r.cat===cat).reduce((s,r)=>s+(r.low+r.high)/2,0)),
  color:[C.sky,C.amber,C.forest,C.slate,C.gold,C.emerald,C.crimson][i%7],
}));

const fmt  = v=>"$"+Math.abs(Math.round(v)).toLocaleString();
const fmtK = v=>v>=1000?"$"+(v/1000).toFixed(0)+"k":"$"+Math.round(v);
const pct  = v=>(v*100).toFixed(1)+"%";

const SEV={
  high:    {bg:"#1a0e00",border:C.amber,    text:C.amberLight, label:"WATCH"},
  medium:  {bg:"#0e1400",border:"#8a9010",  text:"#b8c030",    label:"MONITOR"},
  low:     {bg:"#061208",border:C.forest,   text:C.forestLight,label:"GOOD"},
  critical:{bg:"#1a0606",border:C.crimson,  text:C.crimsonLight,label:"CRITICAL"},
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
const HBar=({health,sev,h=7})=>{
  const s=SEV[sev]||SEV.medium;
  return(<div style={{height:h,borderRadius:4,background:s.bg,border:`1px solid ${s.border}22`,overflow:"hidden"}}>
    <div style={{height:"100%",width:`${Math.max(health,2)}%`,background:`linear-gradient(90deg,${s.border}88,${s.text})`,borderRadius:4,boxShadow:`0 0 6px ${s.text}33`,transition:"width 0.7s ease"}}/>
  </div>);
};

const Badge=({s})=>{
  const cfg=SEV[s]||SEV.medium;
  return(<span style={{background:cfg.bg,color:cfg.text,border:`1px solid ${cfg.border}55`,borderRadius:3,padding:"1px 6px",fontSize:7,fontFamily:MONO,letterSpacing:"0.12em"}}>{cfg.label}</span>);
};

const Divider=({label,color})=>(
  <div style={{fontFamily:MONO,fontSize:8,letterSpacing:"0.28em",textTransform:"uppercase",color:color||C.goldDim,borderBottom:`1px solid ${C.border}`,paddingBottom:7,marginBottom:14,marginTop:8,display:"flex",alignItems:"center",gap:8}}>
    <span style={{opacity:0.5}}>───</span>{label}<span style={{opacity:0.5}}>───</span>
  </div>
);

const Card=({label,value,sub,color,wide})=>(
  <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:wide?"14px 16px":"11px 13px",borderLeft:`3px solid ${color||C.gold}`,position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,right:0,width:36,height:36,background:`radial-gradient(circle,${color||C.gold}10,transparent)`,borderRadius:"0 0 0 36px"}}/>
    <div style={{fontSize:8,fontFamily:MONO,color:C.muted,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:4}}>{label}</div>
    <div style={{fontSize:wide?22:17,fontFamily:MONO,color:color||C.goldLight,lineHeight:1}}>{value}</div>
    {sub&&<div style={{fontSize:9,color:C.textDim,marginTop:4,fontFamily:BODY,fontStyle:"italic"}}>{sub}</div>}
  </div>
);

const Tip=({active,payload,label})=>{
  if(!active||!payload?.length)return null;
  return(<div style={{background:C.surface,border:`1px solid ${C.borderWarm}`,borderRadius:6,padding:"10px 14px",fontFamily:BODY,fontSize:11,color:C.text,boxShadow:"0 8px 32px #00000099"}}>
    <div style={{color:C.gold,fontFamily:MONO,fontSize:9,marginBottom:5,letterSpacing:"0.08em"}}>{label}</div>
    {payload.map((p,i)=>(
      <div key={i} style={{display:"flex",justifyContent:"space-between",gap:16,color:p.color||C.muted,marginBottom:2,fontSize:10}}>
        <span style={{fontStyle:"italic"}}>{p.name}</span>
        <span style={{fontFamily:MONO}}>{typeof p.value==="number"?(Math.abs(p.value)>=1000?fmtK(p.value):(p.value>=0?"+":"-")+fmt(Math.abs(p.value))):p.value}</span>
      </div>
    ))}
  </div>);
};

const TABS=[
  {id:"overview", icon:"⬡",label:"Overview"},
  {id:"financial",icon:"◈",label:"Financials"},
  {id:"units",    icon:"⬢",label:"Units"},
  {id:"health",   icon:"⬟",label:"Inspection"},
  {id:"repairs",  icon:"⬣",label:"Repairs"},
  {id:"scenarios",icon:"◆",label:"Scenarios"},
  {id:"equity",   icon:"◉",label:"Equity"},
];

const scoreColor=h=>h<40?C.crimsonLight:h<55?C.amberLight:h<70?"#b8c030":C.emeraldLight;

// ═══════════════════════════════════════════════════════════════════════════
export default function SampleDashboard() {
  const [tab,setTab]=useState("overview");
  const [appRate,setAppRate]=useState(PROP.appreciationRate);
  const [openSys,setOpenSys]=useState(null);
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{setTimeout(()=>setMounted(true),80);},[]);

  const amortData=useMemo(()=>buildAmort(appRate),[appRate]);
  const yr5=amortData[4],yr10=amortData[9],yr20=amortData[19],yr30=amortData[29];

  const radarData=SYSTEMS.map(sys=>({
    system:sys.category.split(" ")[0],
    health:Math.round(sys.items.reduce((s,i)=>s+i.health,0)/sys.items.length),
  }));

  const W="100%";

  return(
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:BODY,backgroundImage:`radial-gradient(ellipse at 20% 0%,#0d1520 0%,transparent 55%),radial-gradient(ellipse at 80% 100%,#0a1510 0%,transparent 55%)`,opacity:mounted?1:0,transition:"opacity 0.5s ease"}}>

      {/* ══ HEADER ══ */}
      <div style={{padding:"20px 18px 14px",borderBottom:`1px solid ${C.border}`,backdropFilter:"blur(16px)",background:"#0a0c0fcc",position:"sticky",top:0,zIndex:50}}>
        {/* Marketing badge */}
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:C.slateDim+"88",border:`1px solid ${C.slate}44`,borderRadius:20,padding:"3px 10px",marginBottom:8}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:C.slateLight,boxShadow:`0 0 6px ${C.slateLight}`}}/>
          <span style={{fontSize:7,fontFamily:MONO,color:C.textDim,letterSpacing:"0.2em",textTransform:"uppercase"}}>Sample Investment Property · For Illustrative Purposes</span>
        </div>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <div style={{opacity:mounted?1:0,transform:mounted?"translateY(0)":"translateY(-6px)",transition:"all 0.5s ease 0.1s"}}>
            <div style={{fontSize:8,fontFamily:MONO,color:C.goldDim,letterSpacing:"0.35em",textTransform:"uppercase",marginBottom:2}}>Duplex Investment Opportunity</div>
            <div style={{fontSize:26,fontFamily:DISPLAY,color:C.goldLight,lineHeight:1,letterSpacing:"0.02em"}}>The Subject Property</div>
            <div style={{fontSize:10,color:C.muted,fontStyle:"italic",marginTop:3}}>1978 Build · 1,920 SF · Duplex · Established Neighborhood · Corner Lot</div>
          </div>
          <div style={{display:"flex",gap:8,flexShrink:0}}>
            {[
              {l:"Grade",  v:PROP.overallGrade, c:C.goldLight},
              {l:"Health", v:avgHealth,          c:scoreColor(avgHealth)},
              {l:"Confidence",v:PROP.confidence, c:C.slateLight},
            ].map(b=>(
              <div key={b.l} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 11px",textAlign:"center",minWidth:52}}>
                <div style={{fontSize:7,fontFamily:MONO,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase"}}>{b.l}</div>
                <div style={{fontSize:b.l==="Grade"?22:20,fontFamily:MONO,color:b.c,lineHeight:1.1}}>{b.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* KPI strip */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:7}}>
          {[
            {l:"Ask Price",       v:"$319,000",     c:C.gold},
            {l:"Rate (6.875%)",   v:fmt(PI)+"/mo",  c:C.slateLight},
            {l:"PITI + PMI",      v:fmt(PITI)+"/mo",c:C.amberLight},
            {l:"Net House Hack",  v:fmt(NET_HACK)+"/mo",c:NET_HACK<900?C.emeraldLight:C.goldLight},
            {l:"Down (5% Conv.)", v:fmt(PROP.down), c:C.forestLight},
          ].map(k=>(
            <div key={k.l} style={{background:"#10141a88",border:`1px solid ${C.border}`,borderRadius:6,padding:"7px 9px",textAlign:"center"}}>
              <div style={{fontSize:7,fontFamily:MONO,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:3}}>{k.l}</div>
              <div style={{fontSize:12,fontFamily:MONO,color:k.c}}>{k.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ TABS ══ */}
      <div style={{display:"flex",overflowX:"auto",borderBottom:`1px solid ${C.border}`,background:"#10141a88",position:"sticky",top:148,zIndex:40,scrollbarWidth:"none"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",cursor:"pointer",padding:"11px 15px",fontFamily:MONO,fontSize:7.5,letterSpacing:"0.12em",textTransform:"uppercase",whiteSpace:"nowrap",color:tab===t.id?C.goldLight:C.muted,borderBottom:tab===t.id?`2px solid ${C.gold}`:"2px solid transparent",display:"flex",alignItems:"center",gap:5,transition:"color 0.2s"}}>
            <span>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      <div style={{padding:"20px 16px 80px"}}>

        {/* ════ OVERVIEW ════ */}
        {tab==="overview"&&(
          <div>
            {/* Opportunity summary */}
            <div style={{background:`linear-gradient(135deg,${C.slateDim}44,${C.goldDim}22)`,border:`1px solid ${C.slate}44`,borderRadius:10,padding:"16px 18px",marginBottom:18}}>
              <div style={{fontSize:8,fontFamily:MONO,color:C.slateLight,textTransform:"uppercase",letterSpacing:"0.2em",marginBottom:6}}>Investment Thesis</div>
              <div style={{fontSize:13,fontFamily:DISPLAY,color:C.goldLight,lineHeight:1.6,marginBottom:8}}>
                A seasoned duplex in move-in condition with one occupied unit generating income from day one. B− inspection means real deferred maintenance — but nothing structural, nothing that requires specialist engineers, and a capex schedule you can plan around.
              </div>
              <div style={{fontSize:10,color:C.textDim,fontStyle:"italic",lineHeight:1.8}}>
                Owner-occupying Unit A while Unit B covers {pct(GROSS_RENT/PITI)} of your total payment. 
                At {fmt(NET_HACK)}/mo net housing cost, you're building equity on a $319K asset 
                instead of paying rent. The corner lot, stable tenant, and improving neighborhood 
                provide optionality that a cookie-cutter new-build simply cannot.
              </div>
            </div>

            <Divider label="property at a glance"/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
              <Card label="Purchase Price"    value="$319,000"         color={C.gold}         sub="5% down conventional" />
              <Card label="Down Payment"      value={fmt(PROP.down)}   color={C.slate}        sub="$303,050 loan amount" />
              <Card label="Net Housing Cost"  value={fmt(NET_HACK)+"/mo"} color={C.emerald}   sub={`Unit B covers ${pct(GROSS_RENT/PITI)} of PITI`} />
              <Card label="Year Built"        value="1978"              color={C.amber}        sub="46 years · well-seasoned bones" />
              <Card label="Total Square Ft"   value="1,920 SF"          color={C.forest}       sub="Corner lot · 9,200 SF lot" />
              <Card label="Inspection Grade"  value="B−"                color={C.goldLight}    sub="No critical structural issues" />
            </div>

            <Divider label="what B− means for this property"/>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 16px",marginBottom:18}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[
                  {icon:"✓", text:"No structural red flags — foundation and framing are sound", c:C.emeraldLight},
                  {icon:"✓", text:"HVAC functional in both units — Unit A has newer Carrier system", c:C.emeraldLight},
                  {icon:"✓", text:"Updated 200A electrical service — no knob-and-tube wiring", c:C.emeraldLight},
                  {icon:"✓", text:"Vapor barrier present in crawl space — no active moisture issues", c:C.emeraldLight},
                  {icon:"△", text:"Unit B water heater past life expectancy — budget replacement yr 1", c:C.amberLight},
                  {icon:"△", text:"GFCI outlets missing in Unit B — licensed electrician fix, under $400", c:C.amberLight},
                  {icon:"△", text:"Smoke/CO detectors outdated — replace on Day 1, under $200", c:C.amberLight},
                  {icon:"△", text:"Attic insulation below modern standard — good energy upgrade candidate", c:C.amberLight},
                ].map((item,i)=>(
                  <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                    <span style={{color:item.c,fontSize:12,flexShrink:0,marginTop:1}}>{item.icon}</span>
                    <span style={{fontSize:10,color:C.textDim,fontStyle:"italic",lineHeight:1.6}}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <Divider label="system health overview"/>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <span style={{fontStyle:"italic",color:C.textDim,fontSize:11}}>Overall Health — All Systems</span>
                <span style={{fontSize:28,fontFamily:MONO,color:scoreColor(avgHealth)}}>{avgHealth}<span style={{fontSize:10,color:C.muted}}>/100</span></span>
              </div>
              <HBar health={avgHealth} sev="medium" h={10}/>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginTop:14}}>
                {SYSTEMS.map(sys=>{
                  const avg=Math.round(sys.items.reduce((s,i)=>s+i.health,0)/sys.items.length);
                  const sev=avg<40?"critical":avg<55?"high":avg<70?"medium":"low";
                  return(
                    <div key={sys.category} style={{background:C.surfaceAlt,border:`1px solid ${C.border}`,borderRadius:6,padding:"9px 10px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                        <span style={{fontSize:9,fontFamily:MONO,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em"}}>{sys.icon} {sys.category}</span>
                        <span style={{fontSize:11,fontFamily:MONO,color:scoreColor(avg)}}>{avg}</span>
                      </div>
                      <HBar health={avg} sev={sev}/>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{marginTop:16}}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div style={{background:C.surfaceAlt,border:`1px solid ${C.amber}44`,borderRadius:8,padding:"12px 14px"}}>
                <div style={{fontSize:8,fontFamily:MONO,color:C.amberLight,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:4}}>Year-1 Priority Capex</div>
                <div style={{fontSize:18,fontFamily:MONO,color:C.amberLight}}>{fmt(urgLow)}–{fmt(urgHigh)}</div>
                <div style={{fontSize:9,color:C.muted,fontStyle:"italic",marginTop:3}}>Manageable — fully plannable</div>
              </div>
              <div style={{background:C.surfaceAlt,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
                <div style={{fontSize:8,fontFamily:MONO,color:C.gold,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:4}}>Total Est. 10-yr Capex</div>
                <div style={{fontSize:18,fontFamily:MONO,color:C.goldLight}}>{fmt(repairLow)}–{fmt(repairHigh)}</div>
                <div style={{fontSize:9,color:C.muted,fontStyle:"italic",marginTop:3}}>Includes future roof + HVAC B</div>
              </div>
            </div>
          </div>
        )}

        {/* ════ FINANCIALS ════ */}
        {tab==="financial"&&(
          <div>
            <Divider label="monthly payment waterfall"/>
            {[
              {label:"Principal & Interest",  val:PI,           c:C.slateLight, note:"30-yr @ 6.875% conventional — current market rate Q2 2026"},
              {label:"Property Tax",          val:TAX,          c:C.amberLight, note:"~$2,640/yr estimate · county average for property class"},
              {label:"Insurance",             val:INS,          c:C.amberLight, note:"~$2,040/yr duplex policy estimate"},
              {label:"PMI (0.65%)",           val:PMI,          c:C.muted,      note:"Conventional PMI · drops at 80% LTV (~year 8 at base appreciation)"},
              {label:"Total PITI + PMI",      val:PITI,         c:C.text,       note:"Gross monthly obligation", bold:true},
              {label:"Unit B Tenant Income",  val:-1150,        c:C.emerald,    note:"Confirmed $1,150/mo · long-term tenant · month-to-month"},
              {label:"Net (House Hack)",       val:NET_HACK,    c:C.goldLight,  note:"Your true monthly outlay while living in Unit A", bold:true},
            ].map(r=>(
              <div key={r.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 12px",borderBottom:`1px solid ${C.border}`,background:r.bold?C.surfaceAlt:"transparent",borderRadius:r.bold?6:0,marginBottom:r.bold?5:0}}>
                <div>
                  <div style={{fontSize:11,color:r.bold?C.ink:C.text,fontWeight:r.bold?"bold":"normal"}}>{r.label}</div>
                  <div style={{fontSize:9,color:C.muted,fontStyle:"italic"}}>{r.note}</div>
                </div>
                <div style={{fontFamily:MONO,fontSize:r.bold?15:13,color:r.c,fontWeight:r.bold?"bold":"normal"}}>
                  {r.val<0?`-${fmt(-r.val)}`:fmt(r.val)}
                </div>
              </div>
            ))}

            <div style={{marginTop:20}}/>
            <Divider label="PMI removal milestone"/>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 16px",marginBottom:18}}>
              <div style={{fontSize:10,color:C.textDim,fontStyle:"italic",lineHeight:1.8,marginBottom:10}}>
                At 5% down on a conventional loan, PMI ({fmt(PMI)}/mo) drops automatically when your loan balance reaches 80% of the original appraised value. With {pct(appRate)} appreciation, that milestone arrives at approximately:
              </div>
              {[
                {label:"Loan-to-value drops to 80%",  v:"~Year 8",  c:C.goldLight, note:"Based on "+pct(appRate)+" annual appreciation"},
                {label:"Monthly PMI saved",            v:fmt(PMI),   c:C.emeraldLight,note:"Permanent reduction to your payment"},
                {label:"PMI total paid over 8 yrs",   v:fmt(PMI*96),c:C.amberLight, note:"Cost of entry-level financing"},
              ].map(s=>(
                <div key={s.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.border}44`}}>
                  <div>
                    <div style={{fontSize:11,color:C.text}}>{s.label}</div>
                    <div style={{fontSize:9,color:C.muted,fontStyle:"italic"}}>{s.note}</div>
                  </div>
                  <span style={{fontFamily:MONO,fontSize:12,color:s.c}}>{s.v}</span>
                </div>
              ))}
            </div>

            <Divider label="30-year amortization"/>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"16px 4px 10px",marginBottom:16}}>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={amortData} margin={{top:4,right:8,bottom:0,left:0}}>
                  <defs>
                    {[["gO",C.slate],["gT",C.forest],["gL",C.crimson]].map(([id,col])=>(
                      <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={col} stopOpacity={0.7}/>
                        <stop offset="100%" stopColor={col} stopOpacity={0.1}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <XAxis dataKey="year" tick={{fill:C.muted,fontSize:9,fontFamily:MONO}} tickLine={false} axisLine={false} interval={4}/>
                  <YAxis tick={{fill:C.muted,fontSize:9,fontFamily:MONO}} tickLine={false} axisLine={false} tickFormatter={fmtK} width={46}/>
                  <Tooltip content={<Tip/>}/>
                  <Legend wrapperStyle={{fontSize:10,fontFamily:BODY,fontStyle:"italic",paddingTop:8}} iconType="square"/>
                  <Area type="monotone" dataKey="ownerPaid"   name="Owner Paid"   stackId="1" stroke={C.slate}  strokeWidth={1.5} fill="url(#gO)" dot={false}/>
                  <Area type="monotone" dataKey="tenantPaid"  name="Tenant Paid"  stackId="1" stroke={C.forest} strokeWidth={1.5} fill="url(#gT)" dot={false}/>
                  <Area type="monotone" dataKey="loanBalance" name="Loan Balance" stackId="1" stroke={C.crimson}strokeWidth={1.5} fill="url(#gL)" dot={false}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <Divider label="interest vs principal over time"/>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"16px 4px 10px"}}>
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={amortData.filter((_,i)=>i%2===0)} margin={{top:4,right:8,bottom:0,left:0}}>
                  <XAxis dataKey="year" tick={{fill:C.muted,fontSize:9,fontFamily:MONO}} tickLine={false} axisLine={false}/>
                  <YAxis tick={{fill:C.muted,fontSize:9,fontFamily:MONO}} tickLine={false} axisLine={false} tickFormatter={fmtK} width={46}/>
                  <Tooltip content={<Tip/>}/>
                  <Legend wrapperStyle={{fontSize:10,fontFamily:BODY,fontStyle:"italic",paddingTop:8}} iconType="square"/>
                  <Area type="monotone" dataKey="interestPaid"  name="Interest Paid"   fill={C.amber+"33"}   stroke={C.amber}   strokeWidth={1.5} dot={false}/>
                  <Line type="monotone" dataKey="principalPaid" name="Principal Paid"  stroke={C.emerald}    strokeWidth={2}    dot={false}/>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ════ UNITS ════ */}
        {tab==="units"&&(
          <div>
            <Divider label="unit details"/>
            {PROP.units_data.map(u=>(
              <div key={u.id} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"16px",marginBottom:14,borderLeft:`4px solid ${u.type==="owner"?C.slate:C.forest}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <div>
                    <div style={{fontSize:14,fontFamily:MONO,color:u.type==="owner"?C.slateLight:C.forestLight}}>{u.label} · {u.floor}</div>
                    <div style={{fontSize:10,color:C.muted,fontStyle:"italic",marginTop:2}}>{u.br}BR / {u.ba}BA · ~{u.sqft} SF · {u.lease}</div>
                  </div>
                  <span style={{background:u.type==="owner"?"#0a1020":"#0a1a0e",border:`1px solid ${u.type==="owner"?C.slate:C.forest}44`,borderRadius:4,padding:"2px 8px",fontSize:8,fontFamily:MONO,color:u.type==="owner"?C.slateLight:C.forestLight,letterSpacing:"0.1em",flexShrink:0}}>
                    {u.type==="owner"?"OWNER OCC.":"TENANT"}
                  </span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
                  {[
                    {l:"Rent",       v:u.type==="owner"?"—":fmt(u.rent),    c:u.type==="owner"?C.muted:C.forestLight},
                    {l:"Market Est.",v:fmt(u.marketRent),                    c:C.goldLight},
                    {l:"Annual",     v:u.type==="owner"?"—":fmt(u.rent*12), c:C.gold},
                  ].map(s=>(
                    <div key={s.l} style={{background:C.surfaceAlt,border:`1px solid ${C.border}`,borderRadius:6,padding:"8px 10px"}}>
                      <div style={{fontSize:7,fontFamily:MONO,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:3}}>{s.l}</div>
                      <div style={{fontSize:15,fontFamily:MONO,color:s.c}}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:C.surfaceAlt,border:`1px solid ${u.hvacSev==="medium"?C.amber+"44":C.border}`,borderRadius:6,padding:"10px 12px",marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                    <span style={{fontSize:9,fontFamily:MONO,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em"}}>HVAC System</span>
                    <Badge s={u.hvacSev}/>
                  </div>
                  <div style={{fontSize:9,color:u.hvacSev==="low"?C.forestLight:C.amberLight,fontStyle:"italic",marginBottom:6,lineHeight:1.6}}>{u.hvac}</div>
                  <HBar health={u.hvacHealth} sev={u.hvacSev}/>
                  <div style={{textAlign:"right",fontSize:8,fontFamily:MONO,color:C.muted,marginTop:4}}>{u.hvacHealth}/100</div>
                </div>
                <div style={{background:C.surfaceAlt,border:`1px solid ${C.border}`,borderRadius:6,padding:"9px 12px"}}>
                  <div style={{fontSize:9,color:C.textDim,fontStyle:"italic",lineHeight:1.7}}>{u.notes}</div>
                </div>
              </div>
            ))}

            <Divider label="rent roll analysis"/>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"16px 4px 10px",marginBottom:16}}>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={PROP.units_data.map(u=>({name:u.label,current:u.type==="owner"?0:u.rent,market:u.marketRent,optimized:u.marketRent+200}))} margin={{top:4,right:12,bottom:0,left:0}}>
                  <XAxis dataKey="name" tick={{fill:C.muted,fontSize:9,fontFamily:MONO}} tickLine={false} axisLine={false}/>
                  <YAxis tick={{fill:C.muted,fontSize:9,fontFamily:MONO}} tickLine={false} axisLine={false} tickFormatter={v=>"$"+v} width={46}/>
                  <Tooltip content={<Tip/>}/>
                  <Legend wrapperStyle={{fontSize:10,fontFamily:BODY,fontStyle:"italic",paddingTop:8}} iconType="square"/>
                  <Bar dataKey="current"   name="Current Rent"   fill={C.forest}    radius={[3,3,0,0]} opacity={0.85}/>
                  <Bar dataKey="market"    name="Market Rent"    fill={C.goldLight}  radius={[3,3,0,0]} opacity={0.7}/>
                  <Bar dataKey="optimized" name="Optimized Rent" fill={C.slateLight} radius={[3,3,0,0]} opacity={0.6}/>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {[
              {label:"Current (Unit B only, you in A)", val:1150,          c:C.forest,       note:"House hack baseline"},
              {label:"Full Market (both rented)",       val:FULL_RENT,     c:C.goldLight,    note:"$1,250 + $1,200 · you vacate Unit A"},
              {label:"Optimized (post-upgrade)",        val:1450+1250,     c:C.slateLight,   note:"$1,450 + $1,250 after improvements"},
              {label:"PITI Breakeven",                  val:PITI,          c:C.amberLight,   note:"Income needed to cover all costs"},
              {label:"Full Rental Net (8% vacancy)",    val:Math.round(FULL_RENT*0.92-PITI-150), c:(FULL_RENT*0.92-PITI-150)>0?C.emeraldLight:C.amberLight, note:"After vacancy + $150 mgmt allowance"},
            ].map(s=>(
              <div key={s.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 12px",borderBottom:`1px solid ${C.border}`}}>
                <div>
                  <div style={{fontSize:11,color:C.text}}>{s.label}</div>
                  <div style={{fontSize:9,color:C.muted,fontStyle:"italic"}}>{s.note}</div>
                </div>
                <span style={{fontFamily:MONO,fontSize:13,color:s.c}}>{fmt(s.val)}/mo</span>
              </div>
            ))}
          </div>
        )}

        {/* ════ INSPECTION ════ */}
        {tab==="health"&&(
          <div>
            <Divider label="inspection summary · B− grade"/>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
              <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 4px"}}>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={radarData} margin={{top:10,right:20,bottom:10,left:20}}>
                    <PolarGrid stroke={C.border}/>
                    <PolarAngleAxis dataKey="system" tick={{fill:C.muted,fontSize:8,fontFamily:MONO}}/>
                    <Radar dataKey="health" stroke={C.gold} fill={C.gold} fillOpacity={0.2} dot={{fill:C.goldLight,r:3}}/>
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 16px"}}>
                <div style={{fontSize:7,fontFamily:MONO,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>Overall Score</div>
                <div style={{fontSize:44,fontFamily:MONO,color:scoreColor(avgHealth),lineHeight:1}}>{avgHealth}</div>
                <div style={{fontSize:8,fontFamily:MONO,color:C.muted,marginBottom:8}}>/100</div>
                <HBar health={avgHealth} sev="medium" h={8}/>
                <div style={{marginTop:10,fontSize:9,color:C.textDim,fontStyle:"italic",lineHeight:1.7}}>
                  B− reflects a well-maintained structure with manageable deferred maintenance. No critical safety hazards. All issues are within normal range for a 46-year building.
                </div>
              </div>
            </div>

            {SYSTEMS.map(sys=>{
              const avg=Math.round(sys.items.reduce((s,i)=>s+i.health,0)/sys.items.length);
              const sev=avg<40?"critical":avg<55?"high":avg<70?"medium":"low";
              const isOpen=openSys===sys.category;
              const sc=SEV[sev];
              return(
                <div key={sys.category} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,marginBottom:10,overflow:"hidden",borderLeft:`3px solid ${sc.border}`}}>
                  <button onClick={()=>setOpenSys(isOpen?null:sys.category)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",padding:"13px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:16,color:sc.text}}>{sys.icon}</span>
                      <div style={{textAlign:"left"}}>
                        <div style={{fontSize:12,fontFamily:MONO,color:C.text}}>{sys.category}</div>
                        <div style={{fontSize:8,color:C.muted,fontFamily:MONO,marginTop:1}}>{sys.items.length} components</div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <Badge s={sev}/>
                      <div style={{fontSize:20,fontFamily:MONO,color:scoreColor(avg)}}>{avg}<span style={{fontSize:9,color:C.muted}}>/100</span></div>
                      <span style={{color:C.muted,fontSize:11}}>{isOpen?"▲":"▼"}</span>
                    </div>
                  </button>
                  <div style={{padding:"0 16px 10px"}}><HBar health={avg} sev={sev}/></div>
                  {isOpen&&(
                    <div style={{borderTop:`1px solid ${C.border}`}}>
                      {sys.items.map((item,i)=>(
                        <div key={item.label} style={{padding:"12px 16px",borderBottom:i<sys.items.length-1?`1px solid ${C.border}`:"none",background:i%2===0?"transparent":"#ffffff05"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                            <div style={{flex:1}}>
                              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                                <span style={{fontSize:11,color:C.textDim}}>{item.label}</span>
                                <Badge s={item.sev}/>
                              </div>
                              <div style={{fontSize:9,color:C.muted,fontStyle:"italic",lineHeight:1.6}}>{item.note}</div>
                            </div>
                            <div style={{fontSize:18,fontFamily:MONO,color:scoreColor(item.health),marginLeft:12,flexShrink:0}}>{item.health}</div>
                          </div>
                          <HBar health={item.health} sev={item.sev}/>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ════ REPAIRS ════ */}
        {tab==="repairs"&&(
          <div>
            <Divider label="repair register · full capex schedule"/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
              <div style={{background:C.surfaceAlt,border:`1px solid ${C.amber}44`,borderRadius:8,padding:"12px 14px"}}>
                <div style={{fontSize:8,fontFamily:MONO,color:C.amberLight,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:4}}>Year-1 Priority Items</div>
                <div style={{fontSize:18,fontFamily:MONO,color:C.amberLight}}>{fmt(urgLow)}–{fmt(urgHigh)}</div>
                <div style={{fontSize:9,color:C.muted,fontStyle:"italic",marginTop:3}}>Fully budgetable — no unknowns</div>
              </div>
              <div style={{background:C.surfaceAlt,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
                <div style={{fontSize:8,fontFamily:MONO,color:C.gold,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:4}}>10-Year Total Range</div>
                <div style={{fontSize:18,fontFamily:MONO,color:C.goldLight}}>{fmt(repairLow)}–{fmt(repairHigh)}</div>
                <div style={{fontSize:9,color:C.muted,fontStyle:"italic",marginTop:3}}>Includes future roof + HVAC B</div>
              </div>
            </div>

            <div style={{display:"flex",gap:14,marginBottom:18,alignItems:"center"}}>
              <div style={{width:148,height:148,flexShrink:0}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={repairByCat} cx="50%" cy="50%" innerRadius={38} outerRadius={62} dataKey="value" stroke="none" paddingAngle={3}>
                      {repairByCat.map((c,i)=><Cell key={i} fill={c.color}/>)}
                    </Pie>
                    <Tooltip content={<Tip/>} formatter={v=>[fmt(v),"Mid est."]}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:8,fontFamily:MONO,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>By Category · Mid Estimate</div>
                {repairByCat.map(c=>(
                  <div key={c.name} style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <div style={{width:7,height:7,borderRadius:1,background:c.color}}/>
                      <span style={{fontSize:9,color:C.muted,fontFamily:MONO}}>{c.name}</span>
                    </div>
                    <span style={{fontSize:9,fontFamily:MONO,color:C.textDim}}>{fmtK(c.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            <Divider label="all items · sorted by priority"/>
            {[...REPAIRS].sort((a,b)=>({high:0,medium:1,low:2}[a.urg]-{high:0,medium:1,low:2}[b.urg])).map(r=>{
              const cfg=SEV[r.urg];
              return(
                <div key={r.name} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"11px 13px",marginBottom:7,borderLeft:`3px solid ${cfg.border}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                        <span style={{fontSize:11,color:C.text}}>{r.name}</span>
                        <Badge s={r.urg}/>
                      </div>
                      <div style={{display:"flex",gap:14}}>
                        <span style={{fontSize:8,fontFamily:MONO,color:C.muted}}>{r.cat}</span>
                        <span style={{fontSize:8,fontFamily:MONO,color:C.muted}}>{r.timeline}</span>
                      </div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0,marginLeft:8}}>
                      <div style={{fontSize:12,fontFamily:MONO,color:C.goldLight}}>{fmt(r.low)}–{fmt(r.high)}</div>
                      <div style={{fontSize:8,fontFamily:MONO,color:C.muted}}>mid: {fmtK((r.low+r.high)/2)}</div>
                    </div>
                  </div>
                  <div style={{position:"relative",height:4,background:C.border,borderRadius:2,overflow:"hidden"}}>
                    <div style={{position:"absolute",left:`${(r.low/repairHigh)*100}%`,width:`${((r.high-r.low)/repairHigh)*100}%`,height:"100%",borderRadius:2,background:cfg.border,opacity:0.9}}/>
                  </div>
                </div>
              );
            })}

            <div style={{marginTop:20}}/>
            <Divider label="phased capex plan"/>
            {[
              {phase:"Day 1",         color:C.amberLight, total:"$120–$220",        items:["Smoke/CO detectors replace"]},
              {phase:"Month 1",       color:C.amber,      total:"$230–$550",        items:["GFCI outlets Unit B","Chimney flashing seal","Unit B faucet repair"]},
              {phase:"Pre-Close",     color:C.gold,       total:"$80–$200",         items:["Unit A shower drain clear"]},
              {phase:"Year 1",        color:C.forestLight,total:"$2,700–$5,000",    items:["Unit B water heater","AFCI breaker upgrade","Vapor barrier re-secure","Ductwork boot seal","HVAC tune-up (B)"]},
              {phase:"Years 1–3",     color:C.slateLight, total:"$2,200–$5,100",    items:["Window seals Unit A","Attic insulation top-up","Exterior paint","Rear door sealant"]},
              {phase:"Years 2–3",     color:C.slate,      total:"$800–$1,800",      items:["Unit B carpet replace"]},
              {phase:"Years 5–8",     color:"#8888d0",    total:"$5,000–$8,000",    items:["Unit B HVAC replacement (future)"]},
              {phase:"Years 7–10",    color:C.muted,      total:"$9,000–$16,000",   items:["Roof replacement (plan ahead)"]},
            ].map((ph,i)=>(
              <div key={ph.phase} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"11px 14px",marginBottom:7,borderTop:`2px solid ${ph.color}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                  <span style={{fontSize:10,fontFamily:MONO,color:ph.color}}>{ph.phase}</span>
                  <span style={{fontSize:10,fontFamily:MONO,color:C.goldLight}}>{ph.total}</span>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                  {ph.items.map(it=>(
                    <span key={it} style={{background:C.surfaceAlt,border:`1px solid ${C.border}`,borderRadius:4,padding:"2px 8px",fontSize:9,color:C.textDim,fontFamily:MONO}}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ════ SCENARIOS ════ */}
        {tab==="scenarios"&&(
          <div>
            <Divider label="rental strategy scenarios"/>
            {[
              {name:"House Hack\n(Current)",       income:1150,               expense:PITI,     note:"You in Unit A · Unit B $1,150/mo",              c:C.slate},
              {name:"Full Rental\n(Vacate A)",     income:FULL_RENT*0.92,    expense:PITI+150, note:"Both at market · 8% vacancy · $150 mgmt",        c:C.forest},
              {name:"Optimized\n(Post-Upgrade)",   income:2700*0.92,         expense:PITI+150, note:"$1,450 + $1,250 · post-improvements · 8% vac",   c:C.gold},
              {name:"Worst Case\n(Full Vacancy)",  income:0,                 expense:PITI,     note:"Both units empty — full PITI on you alone",       c:C.crimsonLight},
            ].map(s=>{
              const cf=s.income-s.expense;
              return(
                <div key={s.name} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"16px",marginBottom:12,borderLeft:`4px solid ${s.c}`}}>
                  <div style={{fontSize:13,fontFamily:MONO,color:s.c,marginBottom:3,whiteSpace:"pre-line"}}>{s.name}</div>
                  <div style={{fontSize:9,color:C.muted,fontStyle:"italic",marginBottom:12,lineHeight:1.6}}>{s.note}</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                    {[
                      {l:"Income", v:fmt(s.income),c:C.forestLight},
                      {l:"Expense",v:fmt(s.expense),c:C.amberLight},
                      {l:"Net",    v:(cf>=0?"+":"-")+fmt(Math.abs(cf)),c:cf>=0?C.emeraldLight:C.crimsonLight},
                    ].map(x=>(
                      <div key={x.l} style={{background:C.surfaceAlt,borderRadius:6,padding:"8px 10px"}}>
                        <div style={{fontSize:7,fontFamily:MONO,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:3}}>{x.l}</div>
                        <div style={{fontSize:14,fontFamily:MONO,color:x.c}}>{x.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            <Divider label="cash flow projection · 4%/yr rent growth"/>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"16px 4px 10px",marginBottom:20}}>
              <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={CF_DATA} margin={{top:4,right:8,bottom:0,left:0}}>
                  <XAxis dataKey="year" tick={{fill:C.muted,fontSize:9,fontFamily:MONO}} tickLine={false} axisLine={false}/>
                  <YAxis tick={{fill:C.muted,fontSize:9,fontFamily:MONO}} tickLine={false} axisLine={false} tickFormatter={v=>(v>=0?"+":"")+fmtK(Math.abs(v))} width={52}/>
                  <Tooltip content={<Tip/>}/>
                  <Legend wrapperStyle={{fontSize:10,fontFamily:BODY,fontStyle:"italic",paddingTop:8}} iconType="square"/>
                  <ReferenceLine y={0} stroke={C.border} strokeDasharray="4 4"/>
                  <Bar dataKey="hackNet"   name="House Hack Net" fill={C.slate}  opacity={0.8} radius={[3,3,0,0]}/>
                  <Line type="monotone" dataKey="fullNet"   name="Full Rental CF"  stroke={C.goldLight}  strokeWidth={2.5} dot={{r:3,fill:C.goldLight}}/>
                  <Line type="monotone" dataKey="optimized" name="Optimized CF"    stroke={C.emerald}    strokeWidth={2}   dot={{r:2,fill:C.emerald}}/>
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <Divider label="key metrics"/>
            {[
              {l:"DSCR (1 tenant)",           v:(1150/PITI).toFixed(2)+"x", c:1150/PITI>0.75?C.goldLight:C.amberLight, note:"Debt service coverage ratio"},
              {l:"1% Rule — Current",         v:((1150/319000)*100).toFixed(2)+"%", c:C.amberLight, note:"0.36% — standard for house-hack strategy"},
              {l:"1% Rule — Full Market",     v:((FULL_RENT/319000)*100).toFixed(2)+"%", c:C.goldLight, note:"0.77% — approaches threshold with both units"},
              {l:"Price / SF",                v:"$"+Math.round(319000/1920),  c:C.slateLight,   note:"$166/SF · competitive for established neighborhood"},
              {l:"Gross Rent Multiplier",     v:(319000/(1150*12)).toFixed(1)+"x", c:C.textDim, note:"GRM of 23 — typical for current market conditions"},
              {l:"Cap Rate (full rental)",    v:pct((FULL_RENT*12*0.92-319000*0.015)/319000), c:C.forestLight, note:"Full rental net / purchase price · pre-leverage"},
            ].map(s=>(
              <div key={s.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 12px",borderBottom:`1px solid ${C.border}`}}>
                <div>
                  <div style={{fontSize:11,color:C.text}}>{s.l}</div>
                  <div style={{fontSize:9,color:C.muted,fontStyle:"italic"}}>{s.note}</div>
                </div>
                <span style={{fontFamily:MONO,fontSize:13,color:s.c}}>{s.v}</span>
              </div>
            ))}
          </div>
        )}

        {/* ════ EQUITY ════ */}
        {tab==="equity"&&(
          <div>
            <Divider label="appreciation rate · adjust below"/>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 16px",marginBottom:18}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontSize:11,color:C.muted,fontStyle:"italic"}}>Annual appreciation rate</span>
                <span style={{fontSize:16,fontFamily:MONO,color:C.goldLight}}>{pct(appRate)}/yr</span>
              </div>
              <input type="range" min="0.01" max="0.08" step="0.005" value={appRate} onChange={e=>setAppRate(parseFloat(e.target.value))} style={{width:"100%",accentColor:C.gold}}/>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                <span style={{fontSize:9,fontFamily:MONO,color:C.muted}}>1% conservative</span>
                <span style={{fontSize:9,fontFamily:MONO,color:C.muted}}>8% bull market</span>
              </div>
            </div>

            <Divider label="equity growth · appraised value"/>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"16px 4px 10px",marginBottom:16}}>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={amortData} margin={{top:4,right:8,bottom:0,left:0}}>
                  <defs>
                    <linearGradient id="gGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.gold} stopOpacity={0.5}/><stop offset="100%" stopColor={C.gold} stopOpacity={0.06}/></linearGradient>
                    <linearGradient id="gSlate" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.slate} stopOpacity={0.7}/><stop offset="100%" stopColor={C.slate} stopOpacity={0.12}/></linearGradient>
                  </defs>
                  <XAxis dataKey="year" tick={{fill:C.muted,fontSize:9,fontFamily:MONO}} tickLine={false} axisLine={false} interval={4}/>
                  <YAxis tick={{fill:C.muted,fontSize:9,fontFamily:MONO}} tickLine={false} axisLine={false} tickFormatter={fmtK} width={46}/>
                  <Tooltip content={<Tip/>}/>
                  <Legend wrapperStyle={{fontSize:10,fontFamily:BODY,fontStyle:"italic",paddingTop:8}} iconType="square"/>
                  <Area type="monotone" dataKey="appraisedValue" name="Appraised Value" stroke={C.gold}  strokeWidth={2}   fill="url(#gGold)"  dot={false}/>
                  <Area type="monotone" dataKey="equity"         name="Your Equity"     stroke={C.slate} strokeWidth={2.5} fill="url(#gSlate)" dot={false}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <Divider label="equity milestones"/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
              {[
                {yr:"Day 1",   eq:PROP.down,    app:PROP.purchasePrice, note:"Down payment + closing (seller paid closing)"},
                {yr:"Year 5",  eq:yr5.equity,   app:yr5.appraisedValue,  note:`${pct(appRate)} appreciation`},
                {yr:"Year 10", eq:yr10.equity,  app:yr10.appraisedValue, note:"BRRRR refi window · PMI dropped"},
                {yr:"Year 30", eq:yr30.equity,  app:yr30.appraisedValue, note:"Full ownership"},
              ].map(e=>(
                <div key={e.yr} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",borderLeft:`3px solid ${C.slate}`}}>
                  <div style={{fontSize:8,fontFamily:MONO,color:C.muted,textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:4}}>{e.yr}</div>
                  <div style={{fontSize:17,fontFamily:MONO,color:C.slateLight,marginBottom:2}}>{fmt(e.eq)}</div>
                  <div style={{fontSize:9,color:C.muted,fontStyle:"italic"}}>Appraised: {fmtK(e.app)}</div>
                  <div style={{fontSize:9,color:C.muted,fontStyle:"italic"}}>{e.note}</div>
                </div>
              ))}
            </div>

            <Divider label="bear · base · bull scenarios"/>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"16px 4px 10px",marginBottom:18}}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[1,3,5,10,15,20,30].map(yr=>({
                  year:`Yr ${yr}`,
                  bear:Math.round(PROP.purchasePrice*Math.pow(1.02,yr)-amortData[yr-1].loanBalance),
                  base:amortData[yr-1].equity,
                  bull:Math.round(PROP.purchasePrice*Math.pow(1.06,yr)-amortData[yr-1].loanBalance),
                }))} margin={{top:4,right:8,bottom:0,left:0}}>
                  <XAxis dataKey="year" tick={{fill:C.muted,fontSize:9,fontFamily:MONO}} tickLine={false} axisLine={false}/>
                  <YAxis tick={{fill:C.muted,fontSize:9,fontFamily:MONO}} tickLine={false} axisLine={false} tickFormatter={fmtK} width={46}/>
                  <Tooltip content={<Tip/>}/>
                  <Legend wrapperStyle={{fontSize:10,fontFamily:BODY,fontStyle:"italic",paddingTop:8}} iconType="square"/>
                  <Bar dataKey="bear" name="2% Bear" fill={C.crimson}    radius={[3,3,0,0]} opacity={0.8}/>
                  <Bar dataKey="base" name={pct(appRate)+" Base"} fill={C.slate} radius={[3,3,0,0]} opacity={0.8}/>
                  <Bar dataKey="bull" name="6% Bull" fill={C.goldLight}  radius={[3,3,0,0]} opacity={0.8}/>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{background:C.surfaceAlt,border:`1px solid ${C.borderWarm}`,borderRadius:8,padding:"16px",textAlign:"center"}}>
              <div style={{fontSize:34,fontFamily:MONO,color:C.goldLight}}>{fmt(yr30.appraisedValue)}</div>
              <div style={{fontSize:9,fontFamily:MONO,color:C.goldDim,letterSpacing:"0.2em",marginTop:4}}>appraised value at year 30 · from $319,000</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:14}}>
                {[
                  {l:"Your Equity",  v:fmt(yr30.equity),      c:C.slateLight},
                  {l:"Tenant Paid",  v:fmtK(yr30.tenantPaid), c:C.forestLight},
                  {l:"You Paid",     v:fmtK(yr30.ownerPaid),  c:C.sky},
                ].map(s=>(
                  <div key={s.l} style={{background:C.surface,borderRadius:6,padding:"10px 8px"}}>
                    <div style={{fontSize:7,fontFamily:MONO,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>{s.l}</div>
                    <div style={{fontSize:14,fontFamily:MONO,color:s.c}}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ══ FOOTER ══ */}
      <div style={{borderTop:`1px solid ${C.border}`,padding:"16px 18px",background:C.surface}}>
        <div style={{fontSize:8,fontFamily:MONO,color:C.muted,textAlign:"center",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:6}}>
          For Illustrative Purposes Only · Sample Investment Property Dashboard
        </div>
        <div style={{fontSize:9,color:C.dim,textAlign:"center",fontStyle:"italic",fontFamily:BODY,lineHeight:1.7,maxWidth:600,margin:"0 auto"}}>
          {PROP.disclaimer}
        </div>
      </div>

    </div>
  );
}
