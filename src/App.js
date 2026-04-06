/* eslint-disable no-unused-vars */
import { useState, useCallback, useRef, useEffect } from "react";

function useXLSX(){const[r,setR]=useState(!!window.XLSX);useEffect(()=>{if(window.XLSX){setR(true);return;}const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';s.onload=()=>setR(true);document.head.appendChild(s);},[]);return r?window.XLSX:null;}

// ─── REAL HISTORICAL REFERENCE CASES (extracted from actual deliverables) ───
const REFERENCE_CASES = [
  {
    id: 'clark',
    name: 'Clark University',
    date: 'May 2025',
    type: 'Private',
    campuses: 1,
    horizonYrs: 10,
    fse: 827,
    fteStu: 3936,
    ftFull: 703, ftPart: 227, associates: 500, formerWorkers: 200,
    stuFull: 3931, stuPart: 0, stuNotIPEDS: 20,
    fyEnd: 'May 31',
    vendors: ['Ellucian Banner SaaS','Oracle Cloud','Workday'],
    modules: ['HCM','Benefits','Talent Mgmt','Learning','Time Tracking','Payroll','Finance','Grants Mgmt','Adaptive Planning','Strategic Sourcing','Procure-to-Pay','Travel & Expense','Student Core/SIS','Admissions','Advising','Financial Aid','Curriculum Mgmt','Prism/DW','Extend','IAM'],
    modulesExcluded: ['Recruiting (using Slate)','iPaaS (Talend)'],
    salaries: { pm: 200000, cm: 200000, staff: 75000, finStaff: 75000, stuStaff: 75000, itSal: 87000, itFte: 3, baSal: 75000, benPct: 0.25, incPct: 0.03 },
    costSummary: {
      'Ellucian Banner SaaS': { internal: 14881119, implementation: 5575000, changeMgmt: 4101829, travelTraining: 1081946, software: 12993819, contingency: 1935366, total: 40569078, runRate: 2292806 },
      'Oracle Cloud':         { internal: 15106119, implementation: 10075000, changeMgmt: 4101829, travelTraining: 1441946, software: 8595055, contingency: 2835366, total: 42155314, runRate: 1964179 },
      'Workday':              { internal: 15106119, implementation: 10075000, changeMgmt: 4101829, travelTraining: 1441946, software: 10204568, contingency: 2835366, total: 43764828, runRate: 2157503 },
    },
    pricingNotes: 'Workday via Launch SI; Oracle via HESS/Mythics. WSP Accelerate at 20% of subscription. IAM implementation included. Travel at 8%, contingency 20%.',
    uniqueNotes: 'Uses JMU/UMBC as FSE scaling reference. Ellucian lower impl cost due to SaaS migration. All 3 vendors estimated for side-by-side comparison.',
  },
  {
    id: 'conncoll',
    name: 'Connecticut College',
    date: 'July 2025',
    type: 'Private',
    campuses: 1,
    horizonYrs: 10,
    fse: 828,
    fteStu: 1963,
    ftFull: 733, ftPart: 60, associates: 621, formerWorkers: 100,
    stuFull: 1951, stuPart: 0, stuNotIPEDS: 45,
    fyEnd: 'Jun 30',
    vendors: ['Ellucian Banner SaaS','Oracle Cloud','Workday'],
    modules: ['HCM','Benefits','Talent Mgmt','Learning','Time Tracking','Payroll','Finance','Adaptive Planning','Procure-to-Pay','Travel & Expense','Student Core/SIS','Admissions','Advising','Financial Aid','Curriculum Mgmt','Prism/DW','Extend','IAM'],
    modulesExcluded: ['Grants Mgmt','Strategic Sourcing','Recruiting'],
    salaries: { pm: 200000, cm: 150000, staff: 75000, finStaff: 75000, stuStaff: 75000, itSal: 91700, itFte: 2, baSal: 91700, benPct: 0.37, incPct: 0.025 },
    costSummary: {
      'Ellucian Banner SaaS': { internal: 13622539, implementation: 6075000, changeMgmt: 1398376, travelTraining: 905670, software: 12738413, contingency: 1494675, total: 36429674, runRate: 2620987 },
      'Oracle Cloud':         { internal: 16651728, implementation: 9075000, changeMgmt: 1398376, travelTraining: 1145670, software: 8537486, contingency: 2094675, total: 39097935, runRate: 2035863 },
      'Workday':              { internal: 16651728, implementation: 9075000, changeMgmt: 1398376, travelTraining: 985000,  software: 8156096, contingency: 2094675, total: 38555875, runRate: 2014757 },
    },
    pricingNotes: 'Oracle assumes direct negotiation. Ellucian includes external SI consultants. Selection & Evaluation Support: $195K across all vendors. Benefits rate 37% (higher than peers).',
    uniqueNotes: 'Very similar FSE to Clark (828 vs 827) — useful as a near-identical size comparison. Lower student population (1,963 vs 3,936 at Clark) drives lower software costs.',
  },
  {
    id: 'swarthmore',
    name: 'Swarthmore College',
    date: 'Dec 2024',
    type: 'Private',
    campuses: 1,
    horizonYrs: 5,
    fse: 1120,
    fteStu: 1729,
    ftFull: null, ftPart: null, associates: null, formerWorkers: null,
    stuFull: null, stuPart: null, stuNotIPEDS: null,
    fyEnd: 'Jun 30',
    vendors: ['Workday'],
    modules: ['HCM','Talent Mgmt','Payroll','Finance','Grants Mgmt','Budgeting/Planning','Procure-to-Pay','Student Core/SIS','Recruiting','Advising','Financial Aid','Curriculum Mgmt','Research Admin'],
    modulesExcluded: ['Admissions (using Slate)','Inventory (limited)'],
    salaries: { pm: 125000, cm: 115000, staff: 110000, finStaff: 110000, stuStaff: 110000, itSal: 118000, itFte: 2, baSal: 110000, benPct: 0.35, incPct: 0.03 },
    costSummary: {
      'Workday': { internal: 10513237, implementation: 10200000, changeMgmt: 1275000, travelTraining: 469600, software: 4741138, contingency: 2631646, total: 31293847, runRate: null },
    },
    pricingNotes: 'Workday only. Pricing cross-referenced from ACU/Avaap proposals and William & Mary terms. Subscription: $800K HCM/Fin + $300K Student/yr, 5% annual increase. WSP at 20% of subscription.',
    uniqueNotes: '5-year estimate (shortest horizon). Swarthmore affiliated with TriCo (Bryn Mawr, Haverford, UPenn) — shared registration may require manual processes. Internal version had more detail on pricing sources.',
  },
  {
    id: 'nscc',
    name: 'Nova Scotia Community College',
    date: 'Nov 2024',
    type: 'Public',
    campuses: 14,
    horizonYrs: 8,
    fse: 2727,
    fteStu: 10669,
    ftFull: 2433, ftPart: 568, associates: 0, formerWorkers: 38,
    stuFull: 8977, stuPart: 1884, stuNotIPEDS: 3000,
    fyEnd: 'Mar 31',
    vendors: ['Ellucian Banner SaaS','Oracle','Workday'],
    modules: ['HCM','Talent Mgmt','Payroll','Finance','Grants Mgmt','Planning & Budgeting','Procure-to-Pay','Student Core/SIS','Recruiting & Admissions','Advising','Data Warehouse'],
    modulesExcluded: ['Financial Aid','Curriculum Mgmt (using Leepfrog CIM)','IAM','iPaaS (Azure)'],
    salaries: { pm: 76712, cm: 76712, staff: 74582, finStaff: 74582, stuStaff: 91629, itSal: 69609, itFte: 2, baSal: 74582, benPct: 0.16, incPct: 0.015 },
    costSummary: {
      // USD midpoint of low/high for HCM+Student combined
      'Ellucian Banner SaaS': { internal: 9920549, implementation: 4750000, changeMgmt: 3000000, travelTraining: 927492, software: 10135649, contingency: 1577455, total: 30311145, runRate: null },
      'Oracle':               { internal: 10345549, implementation: 17250000, changeMgmt: 3000000, travelTraining: 1340992, software: 25748907, contingency: 3277455, total: 60962903, runRate: null },
      'Workday':              { internal: 10345549, implementation: 17250000, changeMgmt: 3000000, travelTraining: 5901764, software: 25748907, contingency: 3277455, total: 65523675, runRate: null },
    },
    pricingNotes: 'Dual currency (CAD/USD). USD/CAD rate: 1.4079 as of Nov 2024. CAD salaries used (consultant backfills at 0% benefits). Ellucian subscription $1.1M CAD/yr. Data management products included (~$2.4M USD for HCM phase). ROM format with Low/High ranges.',
    uniqueNotes: 'ONLY public institution in reference set. ONLY multi-campus (14). ONLY dual-currency estimate. Breaks out capital vs. operating expenses. Consultant backfills (not internal staff) — 0% benefits. 14 campuses drives higher complexity.',
  },
];

const BM={
  jmu:{fse:4020,stu:21500,wdSub:2135000,wdHcmI:11000000,wdStuI:12000000,orSub:1500000,orHcmI:10000000,elSub:1800000,elHcmI:5500000,elStuI:6000000},
  clark:{fse:827,stu:3936,wdSub:850000,wdHcmI:4000000,wdStuI:6000000},
  connColl:{fse:828,stu:1963,wdSub:650000,wdHcmI:3500000,wdStuI:5500000},
  swarthmore:{fse:1120,stu:1729,wdSub:800000,wdHcmI:3200000,wdStuI:7000000},
  nscc:{fse:2727,stu:10669,wdSub:1800000,wdHcmI:5000000,wdStuI:9000000},
};
const BM_LIST=[
  {key:'jmu',label:'JMU (4,020 FSE)'},
  {key:'clark',label:'Clark (827 FSE)'},
  {key:'connColl',label:'ConnColl (828 FSE)'},
  {key:'swarthmore',label:'Swarthmore (1,120 FSE)'},
  {key:'nscc',label:'NSCC (2,727 FSE)'},
];
const VENDOR_PROFILES={
  workday:{subMult:1.0,hcmMult:1.0,stuMult:1.0,subInc:0.02,hasWSP:true,wspPct:0.20,label:'Workday'},
  oracle:{subMult:0.75,hcmMult:0.90,stuMult:0.90,subInc:0.02,hasWSP:false,wspPct:0,label:'Oracle'},
  ellucian:{subMult:0.85,hcmMult:0.50,stuMult:0.50,subInc:0.03,hasWSP:false,wspPct:0,label:'Ellucian'},
  jenzabar:{subMult:0.60,hcmMult:0.45,stuMult:0.45,subInc:0.03,hasWSP:false,wspPct:0,label:'Jenzabar'},
  unit4:{subMult:0.70,hcmMult:0.65,stuMult:0.60,subInc:0.02,hasWSP:false,wspPct:0,label:'Unit4'},
};
const MODULES=['HCM','Benefits','Talent Mgmt','Payroll','Time Tracking','Finance','Grants Mgmt','Adaptive Planning','Procure-to-Pay','Strategic Sourcing','Travel & Expense','Student Core/SIS','Recruiting','Admissions','Advising','Financial Aid','Curriculum Mgmt','Prism/DW','Extend','IAM'];
const VCOLORS=['#F97316','#EF4444','#8B5CF6','#06B6D4','#EC4899'];
const RCCOLORS=['#4DA8DA','#4EBF71','#E5A84B','#8B5CF6'];
const T={bg:'#0A0D12',cd:'#12161E',bd:'#1C2230',ac:'#4DA8DA',ad:'#1A2F42',tx:'#C4CACD',dm:'#6B7280',gn:'#4EBF71',rd:'#E85454',or:'#E5A84B',wh:'#ECF0F1',sf:'#171C26'};
const IS={background:T.sf,border:`1px solid ${T.bd}`,borderRadius:5,color:T.tx,padding:'7px 10px',fontSize:12,width:'100%',outline:'none',boxSizing:'border-box',fontFamily:"'Courier New',monospace"};
const $=n=>(n==null?'—':n===0?'–':'$'+Math.round(n).toLocaleString());
const P=n=>(n!=null?(n*100).toFixed(1)+'%':'');
const S=a=>a.reduce((s,v)=>s+v,0);
const sr=a=>[...a.map($),$(S(a))];

function Tb({hd,rows,hl}){return(<div style={{overflowX:'auto',margin:'8px 0'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:11,fontFamily:"'Courier New',monospace"}}><thead><tr>{hd.map((h,i)=><th key={i} style={{padding:'6px 8px',background:T.ad,color:T.ac,textAlign:i?'right':'left',borderBottom:`2px solid ${T.ac}`,whiteSpace:'nowrap',fontSize:10}}>{h}</th>)}</tr></thead><tbody>{rows.map((r,ri)=><tr key={ri} style={{background:ri===rows.length-1&&hl?T.ad:'transparent'}}>{r.map((c,ci)=><td key={ci} style={{padding:'5px 8px',borderBottom:`1px solid ${T.bd}`,textAlign:ci?'right':'left',color:ri===rows.length-1&&hl?T.wh:T.tx,fontWeight:ri===rows.length-1&&hl?700:400,whiteSpace:ci?'nowrap':'normal'}}>{c}</td>)}</tr>)}</tbody></table></div>);}

function Section({title,children,color}){return(<div style={{background:T.cd,borderRadius:10,padding:20,border:`1px solid ${color||T.bd}`,marginBottom:14}}><h3 style={{margin:'0 0 12px',color:color||T.ac,fontSize:14}}>{title}</h3>{children}</div>);}

function makeRoles(s){return[
{role:'Project Manager',cat:'Project',fte:1,sal:s.pm,ben:s.benPct,inc:s.incPct,ph:'impl'},
{role:'Change Manager',cat:'Ongoing',fte:1,sal:s.cm,ben:s.benPct,inc:s.incPct,ph:'all'},
{role:'HR Backfill',cat:'Backfill',fte:1,sal:s.staff,ben:s.benPct,inc:s.incPct,ph:'hcm'},
{role:'Payroll Backfill',cat:'Backfill',fte:1,sal:s.staff,ben:s.benPct,inc:s.incPct,ph:'hcm'},
{role:'Finance Backfill',cat:'Backfill',fte:1,sal:s.finStaff,ben:s.benPct,inc:s.incPct,ph:'hcm'},
{role:'Procurement Backfill',cat:'Backfill',fte:1,sal:s.staff,ben:s.benPct,inc:s.incPct,ph:'hcm'},
{role:'Budget Backfill',cat:'Backfill',fte:1,sal:s.staff,ben:s.benPct,inc:s.incPct,ph:'hcm'},
{role:'Acad Affairs Backfill',cat:'Backfill',fte:1,sal:s.stuStaff,ben:s.benPct,inc:s.incPct,ph:'stu'},
{role:'Registrar Backfill',cat:'Backfill',fte:1,sal:s.stuStaff,ben:s.benPct,inc:s.incPct,ph:'stu'},
{role:'Bursar Backfill',cat:'Backfill',fte:1,sal:s.stuStaff,ben:s.benPct,inc:s.incPct,ph:'stu'},
{role:'Financial Aid Backfill',cat:'Backfill',fte:1,sal:s.stuStaff,ben:s.benPct,inc:s.incPct,ph:'stu'},
{role:'Admissions Backfill',cat:'Backfill',fte:1,sal:s.stuStaff,ben:s.benPct,inc:s.incPct,ph:'stu'},
{role:'IT Developers Backfill',cat:'Backfill',fte:s.itFte,sal:s.itSal,ben:s.benPct,inc:s.incPct,ph:'impl'},
{role:'BA HCM/Finance',cat:'Ongoing',fte:2,sal:s.baSal,ben:s.benPct,inc:s.incPct,ph:'all'},
{role:'BA Student',cat:'Ongoing',fte:2,sal:s.baSal,ben:s.benPct,inc:s.incPct,ph:'stuon'},
{role:'BA Data Mgmt',cat:'Ongoing',fte:1,sal:s.baSal,ben:s.benPct,inc:s.incPct,ph:'all'},
{role:'Testing Lead',cat:'Project',fte:1,sal:s.baSal,ben:s.benPct,inc:s.incPct,ph:'impl'},
{role:'Training Lead',cat:'Project',fte:1,sal:s.baSal,ben:s.benPct,inc:s.incPct,ph:'impl'},
];}

function phFTE(ph,h,is){const a=Array(h).fill(0),e6=Math.ceil(h*0.6),e3=Math.ceil(h*0.3),s2=Math.floor(h*0.25);
if(ph==='all')return a.map(()=>1);if(ph==='impl')return a.map((_,i)=>i<e6?1:0);if(ph==='hcm')return a.map((_,i)=>i<e3?1:0);
if(ph==='stu')return is?a.map((_,i)=>(i>=s2&&i<e6)?1:0):a;if(ph==='stuon')return is?a.map((_,i)=>i>=s2?1:0):a;return a.map(()=>1);}

function runCalc(prof,vpr,roles){
const h=prof.horizon,yrs=Array.from({length:h},(_,i)=>i+1),e3=Math.ceil(h*0.3),e6=Math.ceil(h*0.6),s2=Math.floor(h*0.25),sL=Math.ceil(h*0.35);
const staff=roles.map(r=>{const fy=phFTE(r.ph,h,prof.inclStu).map(f=>f*r.fte);const costs=yrs.map((_,i)=>Math.round(r.sal*Math.pow(1+r.inc,i)*fy[i]*(1+r.ben)));return{...r,fy,costs,total:costs.reduce((a,b)=>a+b,0)};});
const staffYr=yrs.map((_,i)=>staff.reduce((s,r)=>s+r.costs[i],0));
const otherYr=yrs.map((_,i)=>i<e6?Math.round((vpr.hcmI+vpr.stuI)/e6*vpr.otherPct):0);
const intYr=yrs.map((_,i)=>staffYr[i]+otherYr[i]);
const hcmYr=yrs.map((_,i)=>i<e3?Math.round(vpr.hcmI/e3):0);
const stuYr=prof.inclStu?yrs.map((_,i)=>(i>=s2&&i<s2+sL)?Math.round(vpr.stuI/sL):0):yrs.map(()=>0);
const cmYr=yrs.map((_,i)=>i<e6?Math.round(vpr.cmRate*vpr.cmHrs*Math.pow(1.02,i)):0);
const trainYr=yrs.map((_,i)=>i===0?(vpr.hcmTrain||120000):(i===s2&&prof.inclStu)?(vpr.stuTrain||165000):0);
const travYr=yrs.map((_,i)=>Math.round((hcmYr[i]+stuYr[i]+cmYr[i])*vpr.travPct));
const ppsYr=vpr.pps?yrs.map((_,i)=>i>=e3&&i<e6?vpr.pps:0):yrs.map(()=>0);
const extYr=yrs.map((_,i)=>hcmYr[i]+stuYr[i]+cmYr[i]+travYr[i]+trainYr[i]+ppsYr[i]);
const ss=1;
const pSub=yrs.map((_,i)=>i>=ss?Math.round(vpr.pSub*Math.pow(1+vpr.subInc,i-ss)):0);
const sSub=prof.inclStu?yrs.map((_,i)=>i>=ss?Math.round(vpr.sSub*Math.pow(1+vpr.subInc,i-ss)):0):yrs.map(()=>0);
const iamYr=vpr.iam?yrs.map((_,i)=>Math.round(vpr.iam*Math.pow(1.02,i))):yrs.map(()=>0);
const wspYr=vpr.wsp?yrs.map((_,i)=>i>=ss?Math.round(vpr.wsp*Math.pow(1+vpr.subInc,i-ss)):0):yrs.map(()=>0);
const swYr=yrs.map((_,i)=>pSub[i]+sSub[i]+iamYr[i]+wspYr[i]);
const contYr=yrs.map((_,i)=>Math.round((hcmYr[i]+stuYr[i]+cmYr[i])*vpr.contPct));
const totYr=yrs.map((_,i)=>intYr[i]+extYr[i]+swYr[i]+contYr[i]);
let cum=0;const cumYr=totYr.map(v=>{cum+=v;return cum;});
return{yrs,staff,staffYr,otherYr,intYr,hcmYr,stuYr,cmYr,travYr,trainYr,ppsYr,extYr,pSub,sSub,iamYr,wspYr,swYr,contYr,totYr,cumYr,runRate:intYr[h-1]+swYr[h-1]};}

// ─── REFERENCE CASES TAB ───
function ReferenceTab({currentFse, currentFte}) {
  const [selCase, setSelCase] = useState('clark');
  const [compareMode, setCompareMode] = useState(false);
  const rc = REFERENCE_CASES.find(c => c.id === selCase);

  // Per-FSE and per-FTE unit cost analysis
  function unitCosts(cs) {
    const v = Object.values(cs)[0];
    if (!v) return null;
    const tot = v.total;
    return { perFSE: Math.round(tot / (rc.fse||1)), perFTE: Math.round(tot / (rc.fteStu||1)) };
  }

  return (
    <div>
      {/* Header with case selector */}
      <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap',alignItems:'center'}}>
        <span style={{fontSize:11,color:T.dm}}>Select engagement:</span>
        {REFERENCE_CASES.map((rc2,i)=>(
          <button key={rc2.id} onClick={()=>setSelCase(rc2.id)}
            style={{padding:'7px 14px',background:selCase===rc2.id?RCCOLORS[i]:'transparent',
              color:selCase===rc2.id?T.bg:RCCOLORS[i],border:`1px solid ${RCCOLORS[i]}`,
              borderRadius:6,cursor:'pointer',fontSize:11,fontWeight:700,fontFamily:'inherit'}}>
            {rc2.name}
          </button>
        ))}
        <button onClick={()=>setCompareMode(m=>!m)}
          style={{marginLeft:'auto',padding:'7px 14px',background:compareMode?T.ac:'transparent',
            color:compareMode?T.bg:T.ac,border:`1px solid ${T.ac}`,borderRadius:6,cursor:'pointer',fontSize:11,fontWeight:700,fontFamily:'inherit'}}>
          {compareMode ? '← Single View' : '⇄ Compare All'}
        </button>
      </div>

      {compareMode ? <ReferenceCompare currentFse={currentFse} currentFte={currentFte}/> : <ReferenceSingle rc={rc} currentFse={currentFse} currentFte={currentFte}/>}
    </div>
  );
}

function ReferenceSingle({rc, currentFse, currentFte}) {
  const ci = REFERENCE_CASES.findIndex(c=>c.id===rc.id);
  const col = RCCOLORS[ci % RCCOLORS.length];
  const vendors = Object.keys(rc.costSummary);

  return (
    <div style={{display:'grid',gap:12}}>
      {/* Institution header */}
      <div style={{background:T.cd,borderRadius:10,padding:20,border:`2px solid ${col}`}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:10}}>
          <div>
            <div style={{fontSize:18,color:col,fontWeight:800}}>{rc.name}</div>
            <div style={{fontSize:12,color:T.dm,marginTop:4}}>{rc.type} · {rc.campuses} campus{rc.campuses>1?'es':''} · {rc.horizonYrs}-year estimate · {rc.date}</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
            {[
              {l:'FSE Workers',v:rc.fse.toLocaleString(),c:T.ac},
              {l:'FTE Students',v:rc.fteStu.toLocaleString(),c:T.gn},
              {l:'Vendors',v:vendors.length,c:T.or},
            ].map(({l,v,c})=>(
              <div key={l} style={{background:T.sf,borderRadius:6,padding:'8px 12px',textAlign:'center',borderTop:`2px solid ${c}`}}>
                <div style={{fontSize:9,color:T.dm}}>{l}</div>
                <div style={{fontSize:16,color:c,fontWeight:700}}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FSE similarity to current */}
        {currentFse > 0 && (
          <div style={{marginTop:12,padding:'8px 12px',background:T.sf,borderRadius:6,fontSize:11,color:T.dm,borderLeft:`3px solid ${col}`}}>
            <span style={{color:T.tx}}>vs. your institution: </span>
            FSE similarity: <span style={{color:col,fontWeight:700}}>{Math.round((1-Math.abs(currentFse-rc.fse)/Math.max(currentFse,rc.fse))*100)}%</span>
            {' · '}FSE diff: <span style={{color:currentFse>rc.fse?T.or:T.gn}}>{currentFse>rc.fse?'+':''}{(currentFse-rc.fse).toLocaleString()}</span>
            {' · '}FTE diff: <span style={{color:currentFte>rc.fteStu?T.or:T.gn}}>{currentFte>rc.fteStu?'+':''}{(currentFte-rc.fteStu).toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Cost Summary table */}
      <Section title={`📊 ${rc.horizonYrs}-Year Cost Summary (Actual Delivered)`} color={col}>
        <Tb
          hd={['Cost Category', ...vendors, 'Notes']}
          hl
          rows={[
            ['Internal Costs',          ...vendors.map(v=>$(rc.costSummary[v].internal)),         'Staffing + backfills'],
            ['Implementation & Support',...vendors.map(v=>$(rc.costSummary[v].implementation)),   'SI partner fees'],
            ['Change Mgmt Consulting',  ...vendors.map(v=>$(rc.costSummary[v].changeMgmt)),       '$300/hr external CM'],
            ['Travel + Training',       ...vendors.map(v=>$(rc.costSummary[v].travelTraining)),   '8% travel + project training'],
            ['Software Subscription',   ...vendors.map(v=>$(rc.costSummary[v].software)),         'Platform + Student + IAM + WSP'],
            ['Contingency',             ...vendors.map(v=>$(rc.costSummary[v].contingency)),      '20% of impl + CM'],
            ['TOTAL',                   ...vendors.map(v=>$(rc.costSummary[v].total)),            ''],
            ['Run Rate (Ongoing)',       ...vendors.map(v=>$(rc.costSummary[v].runRate)),          `Annual after Y${rc.horizonYrs}`],
          ]}
        />
        {/* Unit cost cards */}
        <div style={{display:'grid',gridTemplateColumns:`repeat(${Math.min(vendors.length,3)},1fr)`,gap:8,marginTop:12}}>
          {vendors.map((v,vi)=>{
            const cs = rc.costSummary[v];
            return (
              <div key={v} style={{background:T.sf,borderRadius:8,padding:14,borderTop:`3px solid ${VCOLORS[vi%VCOLORS.length]}`}}>
                <div style={{fontSize:11,color:VCOLORS[vi%VCOLORS.length],fontWeight:700,marginBottom:6}}>{v}</div>
                <div style={{fontSize:20,color:T.wh,fontWeight:700}}>{$(cs.total)}</div>
                <div style={{fontSize:10,color:T.dm,marginTop:6,lineHeight:1.6}}>
                  Per FSE: <span style={{color:T.ac}}>{$(Math.round(cs.total/rc.fse))}</span><br/>
                  Per FTE student: <span style={{color:T.gn}}>{$(Math.round(cs.total/rc.fteStu))}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Assumptions */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <Section title="👤 Staffing Assumptions" color={col}>
          <Tb hd={['Role','Salary','Benefits','Inc/yr']} rows={[
            ['Project Manager',$(rc.salaries.pm),P(rc.salaries.benPct),P(rc.salaries.incPct)],
            ['Change Manager',$(rc.salaries.cm),P(rc.salaries.benPct),P(rc.salaries.incPct)],
            ['Staff (HCM)',$(rc.salaries.staff),P(rc.salaries.benPct),P(rc.salaries.incPct)],
            ['Student Staff',$(rc.salaries.stuStaff),P(rc.salaries.benPct),P(rc.salaries.incPct)],
            ['IT Staff',$(rc.salaries.itSal)+` (${rc.salaries.itFte} FTE)`,P(rc.salaries.benPct),P(rc.salaries.incPct)],
            ['BAs',$(rc.salaries.baSal),P(rc.salaries.benPct),P(rc.salaries.incPct)],
          ]}/>
        </Section>
        <Section title="📦 Modules & Scope" color={col}>
          <div style={{fontSize:11,color:T.dm,marginBottom:6}}>In scope:</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:10}}>
            {rc.modules.map(m=>(
              <span key={m} style={{padding:'2px 8px',borderRadius:10,fontSize:10,background:'#1a3a1a',border:`1px solid ${T.gn}`,color:T.gn}}>{m}</span>
            ))}
          </div>
          {rc.modulesExcluded.length > 0 && <>
            <div style={{fontSize:11,color:T.dm,marginBottom:4}}>Excluded:</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
              {rc.modulesExcluded.map(m=>(
                <span key={m} style={{padding:'2px 8px',borderRadius:10,fontSize:10,background:'transparent',border:`1px solid ${T.bd}`,color:T.dm}}>{m}</span>
              ))}
            </div>
          </>}
        </Section>
      </div>

      {/* FTE breakdown if available */}
      {rc.ftFull && (
        <Section title="📐 FTE/FSE Breakdown" color={col}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div>
              <div style={{fontSize:11,color:T.dm,marginBottom:6}}>Workers → FSE {rc.fse.toLocaleString()}</div>
              <Tb hd={['Category','Headcount','Weight','FSE']} rows={[
                ['Full-Time', rc.ftFull?.toLocaleString()||'—', '×1.0', Math.round(rc.ftFull*1.0).toLocaleString()],
                ['Part-Time', rc.ftPart?.toLocaleString()||'—', '×0.25', Math.round(rc.ftPart*0.25).toLocaleString()],
                ['Associates', rc.associates?.toLocaleString()||'—', '×0.125', Math.round(rc.associates*0.125).toLocaleString()],
                ['Former Workers', rc.formerWorkers?.toLocaleString()||'—', '×0.025', Math.round(rc.formerWorkers*0.025).toLocaleString()],
              ]}/>
            </div>
            <div>
              <div style={{fontSize:11,color:T.dm,marginBottom:6}}>Students → FTE {rc.fteStu.toLocaleString()}</div>
              <Tb hd={['Category','Headcount','Weight','FTE']} rows={[
                ['Full-Time (IPEDS)', rc.stuFull?.toLocaleString()||'—', '×1.0', Math.round((rc.stuFull||0)*1.0).toLocaleString()],
                ['Part-Time', rc.stuPart?.toLocaleString()||'—', '×0.5', Math.round((rc.stuPart||0)*0.5).toLocaleString()],
                ['Non-IPEDS', rc.stuNotIPEDS?.toLocaleString()||'—', '×0.25', Math.round((rc.stuNotIPEDS||0)*0.25).toLocaleString()],
              ]}/>
            </div>
          </div>
        </Section>
      )}

      {/* Notes */}
      <Section title="📝 Pricing & Methodology Notes" color={col}>
        <div style={{fontSize:12,lineHeight:1.8,color:T.tx,marginBottom:10}}><b style={{color:col}}>Pricing:</b> {rc.pricingNotes}</div>
        <div style={{fontSize:12,lineHeight:1.8,color:T.tx,padding:'10px 14px',background:T.sf,borderRadius:6,borderLeft:`3px solid ${col}`}}><b style={{color:col}}>Key distinguishing factors:</b> {rc.uniqueNotes}</div>
      </Section>
    </div>
  );
}

function ReferenceCompare({currentFse, currentFte}) {
  return (
    <div style={{display:'grid',gap:12}}>
      <Section title="⇄ All Engagements — Side-by-Side Comparison">
        {/* Overview cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:16}}>
          {REFERENCE_CASES.map((rc,i)=>(
            <div key={rc.id} style={{background:T.sf,borderRadius:8,padding:14,borderTop:`3px solid ${RCCOLORS[i]}`}}>
              <div style={{fontSize:12,color:RCCOLORS[i],fontWeight:700}}>{rc.name}</div>
              <div style={{fontSize:10,color:T.dm,margin:'4px 0 8px'}}>{rc.date} · {rc.horizonYrs}yr · {rc.type}</div>
              <div style={{fontSize:10,color:T.tx,lineHeight:1.6}}>
                FSE: <b style={{color:T.ac}}>{rc.fse.toLocaleString()}</b><br/>
                FTE: <b style={{color:T.gn}}>{rc.fteStu.toLocaleString()}</b><br/>
                Campuses: <b style={{color:T.or}}>{rc.campuses}</b>
              </div>
            </div>
          ))}
        </div>

        {/* Cost comparison by vendor */}
        <div style={{fontSize:12,color:T.ac,marginBottom:8,fontWeight:700}}>Workday — Total Cost Comparison</div>
        <Tb hd={['Institution','FSE','FTE Stu','Yrs','Total','Per FSE','Per FTE Stu','Run Rate']}
          rows={REFERENCE_CASES.filter(rc=>rc.costSummary['Workday']).map((rc,i)=>{
            const v=rc.costSummary['Workday'];
            return[rc.name,rc.fse.toLocaleString(),rc.fteStu.toLocaleString(),rc.horizonYrs,$(v.total),$(Math.round(v.total/rc.fse)),$(Math.round(v.total/rc.fteStu)),$(v.runRate)];
          })}
        />

        <div style={{fontSize:12,color:T.or,margin:'14px 0 8px',fontWeight:700}}>Ellucian — Total Cost Comparison</div>
        <Tb hd={['Institution','FSE','FTE Stu','Yrs','Total','Per FSE','Per FTE Stu','Run Rate']}
          rows={REFERENCE_CASES.filter(rc=>rc.costSummary['Ellucian Banner SaaS']||rc.costSummary['Ellucian']).map((rc,i)=>{
            const v=rc.costSummary['Ellucian Banner SaaS']||rc.costSummary['Ellucian'];
            return[rc.name,rc.fse.toLocaleString(),rc.fteStu.toLocaleString(),rc.horizonYrs,$(v.total),$(Math.round(v.total/rc.fse)),$(Math.round(v.total/rc.fteStu)),$(v.runRate)];
          })}
        />

        <div style={{fontSize:12,color:T.rd,margin:'14px 0 8px',fontWeight:700}}>Oracle — Total Cost Comparison</div>
        <Tb hd={['Institution','FSE','FTE Stu','Yrs','Total','Per FSE','Per FTE Stu','Run Rate']}
          rows={REFERENCE_CASES.filter(rc=>rc.costSummary['Oracle Cloud']||rc.costSummary['Oracle']).map((rc,i)=>{
            const v=rc.costSummary['Oracle Cloud']||rc.costSummary['Oracle'];
            return[rc.name,rc.fse.toLocaleString(),rc.fteStu.toLocaleString(),rc.horizonYrs,$(v.total),$(Math.round(v.total/rc.fse)),$(Math.round(v.total/rc.fteStu)),$(v.runRate)];
          })}
        />

        {/* Assumptions comparison */}
        <div style={{fontSize:12,color:T.ac,margin:'14px 0 8px',fontWeight:700}}>Staffing Assumptions Comparison</div>
        <Tb hd={['Institution','Type','PM Salary','CM Salary','Staff Sal','Benefits','Inc/yr','IT FTE']}
          rows={REFERENCE_CASES.map(rc=>[
            rc.name, rc.type,
            $(rc.salaries.pm), $(rc.salaries.cm), $(rc.salaries.staff),
            P(rc.salaries.benPct), P(rc.salaries.incPct), rc.salaries.itFte,
          ])}
        />

        <div style={{marginTop:14,padding:'10px 14px',background:T.sf,borderRadius:6,fontSize:11,color:T.dm,borderLeft:`3px solid ${T.ac}`}}>
          <b style={{color:T.ac}}>Key patterns:</b> Benefits range from 16% (NSCC/public) to 37% (ConnColl/private). PM salaries $125K–$200K. Staff backfills $75K–$110K. 
          All use 20% contingency and 8% (or 2%) travel. NSCC is the only public, multi-campus, dual-currency engagement.
        </div>
      </Section>
    </div>
  );
}

// ─── MAIN APP ───
export default function App(){
const[tab,setTab]=useState('method');
const[rTab,setRTab]=useState('summary');
const[rcSubTab,setRcSubTab]=useState('clark');
const[results,setResults]=useState(null);
const[aiOut,setAiOut]=useState('');const[aiLoad,setAiLoad]=useState(false);
const[aiKey,setAiKey]=useState('');const[azEnd,setAzEnd]=useState('');
const[sbData,setSbData]=useState(null);const[sbStats,setSbStats]=useState(null);
const fRef=useRef(null);const propRef=useRef(null);const XL=useXLSX();
const[vendorFiles,setVendorFiles]=useState({});
const[proposalText,setProposalText]=useState('');
const[proposalFileName,setProposalFileName]=useState('');
const[prof,setProf]=useState({name:'',type:'Private',campuses:1,horizon:10,inclStu:true,fyEnd:'Jun 30',ftFull:700,ftPart:200,associates:500,formerWorkers:200,stuFull:1800,stuPart:100,stuNotIPEDS:20});
const fse=Math.round(prof.ftFull+prof.ftPart*0.25+prof.associates*0.125+prof.formerWorkers*0.025);
const fteStu=Math.round(prof.stuFull+prof.stuPart*0.5+prof.stuNotIPEDS*0.25);
const[sal,setSal]=useState({pm:150000,cm:140000,staff:75000,finStaff:75000,stuStaff:75000,itSal:87000,itFte:3,baSal:75000,benPct:0.30,incPct:0.03});
const[mods,setMods]=useState(MODULES.reduce((o,m)=>({...o,[m]:['HCM','Payroll','Finance','Student Core/SIS','Benefits','Talent Mgmt'].includes(m)}),{}));
const[vendorList,setVendorList]=useState([{name:'Workday',enabled:true,vpr:null},{name:'Oracle',enabled:true,vpr:null},{name:'Ellucian',enabled:true,vpr:null}]);
const[newVendor,setNewVendor]=useState('');
const[bmRef,setBmRef]=useState('auto');

const getBmRef=useCallback(()=>{
  if(bmRef!=='auto') return bmRef;
  let best='jmu',bestDist=Infinity;
  BM_LIST.forEach(b=>{const dist=Math.abs(BM[b.key].fse-fse);if(dist<bestDist){bestDist=dist;best=b.key;}});
  return best;
},[bmRef,fse]);

const defVpr=useCallback((vendorName)=>{
  const ref=getBmRef();const bmData=BM[ref];const r=fse/bmData.fse;const sr2=fteStu/(bmData.stu||21500);
  const vn=(vendorName||'').toLowerCase();
  const base={subInc:0.02,travPct:0.08,contPct:0.20,otherPct:0.05,cmRate:300,cmHrs:2000,hcmTrain:120000,stuTrain:165000,iam:50000,pps:0};
  if(vn.includes('workday')){const wdSub=bmData.wdSub||BM.jmu.wdSub;const pSub=Math.round(wdSub/bmData.fse*fse);return{...base,pSub,sSub:prof.inclStu?Math.round(fteStu*130):0,subInc:0.02,hcmI:Math.round((bmData.wdHcmI||BM.jmu.wdHcmI)*r),stuI:prof.inclStu?Math.round((bmData.wdStuI||BM.jmu.wdStuI)*sr2):0,wsp:Math.round(pSub*0.2)};}
  if(vn.includes('oracle')){const orSub=bmData.orSub||Math.round((bmData.wdSub||BM.jmu.wdSub)*0.7);return{...base,pSub:Math.round(orSub/bmData.fse*fse),sSub:prof.inclStu?Math.round(fteStu*100):0,subInc:0.02,hcmI:Math.round((bmData.orHcmI||BM.jmu.orHcmI||BM.jmu.wdHcmI*0.9)*r),stuI:prof.inclStu?Math.round((bmData.wdStuI||BM.jmu.wdStuI)*sr2*0.9):0,wsp:0};}
  if(vn.includes('ellucian')||vn.includes('banner')){const elSub=bmData.elSub||Math.round((bmData.wdSub||BM.jmu.wdSub)*0.85);return{...base,pSub:Math.round(elSub/bmData.fse*fse),sSub:prof.inclStu?Math.round(fteStu*110):0,subInc:0.03,hcmI:Math.round((bmData.elHcmI||BM.jmu.elHcmI||BM.jmu.wdHcmI*0.5)*r),stuI:prof.inclStu?Math.round((bmData.elStuI||bmData.wdStuI||BM.jmu.wdStuI)*sr2*0.5):0,wsp:0};}
  const genSub=bmData.wdSub||BM.jmu.wdSub;
  return{...base,pSub:Math.round(genSub/bmData.fse*fse*0.8),sSub:prof.inclStu?Math.round(fteStu*110):0,subInc:0.02,hcmI:Math.round(BM.jmu.wdHcmI*r*0.7),stuI:prof.inclStu?Math.round(BM.jmu.wdStuI*sr2*0.7):0,wsp:0};
},[fse,fteStu,prof.inclStu,getBmRef]);

const addVendor=()=>{if(newVendor.trim()){setVendorList(v=>[...v,{name:newVendor.trim(),enabled:true,vpr:null}]);setNewVendor('');}};
const removeVendor=(i)=>setVendorList(v=>v.filter((_,j)=>j!==i));
const toggleVendor=(i)=>setVendorList(v=>v.map((x,j)=>j===i?{...x,enabled:!x.enabled}:x));
const setVpr=(i,vpr)=>setVendorList(v=>v.map((x,j)=>j===i?{...x,vpr}:x));

const onSBFile=useCallback((e)=>{
  const file=e.target.files?.[0];if(!file||!XL)return;
  const reader=new FileReader();
  reader.onload=(ev)=>{try{
    const data=new Uint8Array(ev.target.result);const wb=XL.read(data,{type:'array'});
    const ws=wb.Sheets[wb.SheetNames[0]];const json=XL.utils.sheet_to_json(ws,{defval:''});
    const parsed=json.map(r=>{const price=parseFloat(r['Price']||r['price']||r['Amount']||0);return{buyer:r['Buyer Name']||r['Buyer']||'',price:isNaN(price)?0:price,desc:String(r['Purchase']||'').substring(0,200),detail:String(r['Detailed Purchase Summary']||'').substring(0,500),instType:r['Higher Education Institution Type']||'',fte:r['Higher Education Full Time Equivalent Enrollment']||'',state:r['Buyer State Name']||''};}).filter(r=>r.price>0);
    if(!parsed.length){alert('No prices found');return;}
    const byInst={};parsed.forEach(r=>{if(!byInst[r.buyer])byInst[r.buyer]={total:0,count:0,type:r.instType,fte:r.fte};byInst[r.buyer].total+=r.price;byInst[r.buyer].count++;});
    const byType={};parsed.forEach(r=>{const t=r.instType||'Unknown';if(!byType[t])byType[t]={total:0,count:0};byType[t].total+=r.price;byType[t].count++;});
    const productMap={};const patterns=[[/subscript/i,'Subscription'],[/platform/i,'Platform'],[/implement/i,'Implementation'],[/maintenance|annual fee/i,'Maintenance'],[/hardware|reader|kiosk/i,'Hardware'],[/software|license/i,'Software'],[/support/i,'Support']];
    parsed.forEach(r=>{const txt=(r.desc+' '+r.detail).toLowerCase();let matched=false;patterns.forEach(([pat,label])=>{if(pat.test(txt)){if(!productMap[label])productMap[label]={total:0,count:0,prices:[],insts:new Set()};productMap[label].total+=r.price;productMap[label].count++;productMap[label].prices.push(r.price);productMap[label].insts.add(r.buyer);matched=true;}});if(!matched){if(!productMap['Other'])productMap['Other']={total:0,count:0,prices:[],insts:new Set()};productMap['Other'].total+=r.price;productMap['Other'].count++;productMap['Other'].prices.push(r.price);productMap['Other'].insts.add(r.buyer);}});
    const prods=Object.entries(productMap).map(([n,d])=>{const s=[...d.prices].sort((a,b)=>a-b);return{name:n,total:d.total,count:d.count,median:s[Math.floor(s.length/2)],avg:Math.round(d.total/d.count),min:s[0],max:s[s.length-1],insts:d.insts.size};}).sort((a,b)=>b.total-a.total);
    const prices=parsed.map(r=>r.price).sort((a,b)=>a-b);
    setSbStats({rows:parsed.length,spend:S(prices),med:prices[Math.floor(prices.length/2)],avg:Math.round(S(prices)/prices.length),insts:Object.keys(byInst).length,byInst:Object.entries(byInst).sort((a,b)=>b[1].total-a[1].total),byType:Object.entries(byType).sort((a,b)=>b[1].total-a[1].total),prods,file:file.name});setSbData(parsed);
  }catch(err){alert('Error: '+err.message);}};reader.readAsArrayBuffer(file);
},[XL]);

const onProposalFile=useCallback((e)=>{
  const file=e.target.files?.[0];if(!file)return;const name=file.name;const ext=name.split('.').pop().toLowerCase();
  if(['txt','csv'].includes(ext)){const reader=new FileReader();reader.onload=(ev)=>{setProposalText(prev=>prev+'\n\n--- FROM: '+name+' ---\n'+ev.target.result.substring(0,15000));setProposalFileName(name);};reader.readAsText(file);}
  else if(['xlsx','xls'].includes(ext)&&XL){const reader=new FileReader();reader.onload=(ev)=>{try{const data=new Uint8Array(ev.target.result);const wb=XL.read(data,{type:'array'});let txt='';wb.SheetNames.forEach(sn=>{txt+='\n--- Sheet: '+sn+' ---\n'+XL.utils.sheet_to_csv(wb.Sheets[sn]).substring(0,8000);});setProposalText(prev=>prev+'\n\n--- FROM: '+name+' ---'+txt.substring(0,15000));setProposalFileName(name);}catch(err){alert('Error: '+err.message);}};reader.readAsArrayBuffer(file);}
  else{setProposalFileName(name);setProposalText(prev=>prev+'\n\n[Uploaded: '+name+' — paste key details below if PDF/Word]');}
},[XL]);

const generate=useCallback(()=>{
  const roles=makeRoles(sal);const res={};
  vendorList.filter(v=>v.enabled).forEach(v=>{const vp=v.vpr||defVpr(v.name);res[v.name]=runCalc({...prof,fse,fteStu},vp,roles);});
  setResults(res);setTab('results');setRTab('summary');
},[prof,sal,vendorList,defVpr,fse,fteStu]);

const callAI=useCallback(async()=>{
  if(!aiKey||!results)return;setAiLoad(true);
  const vs=Object.entries(results).map(([v,e])=>`${v}: Total ${$(S(e.totYr))}, Internal ${$(S(e.intYr))}, External ${$(S(e.extYr))}, Software ${$(S(e.swYr))}, RunRate ${$(e.runRate)}`).join('\n');
  const refCtx=REFERENCE_CASES.map(rc=>`${rc.name}(${rc.fse}FSE,${rc.fteStu}FTE,${rc.horizonYrs}yr): `+Object.entries(rc.costSummary).map(([v,c])=>`${v}=${$(c.total)}`).join(', ')).join('\n');
  const propCtx=proposalText?`\nProposal/Context:\n${proposalText.substring(0,3000)}`:'';
  const prompt=`Tambellini Group senior analyst. Review this ERP budgetary estimate.\n\nInstitution: ${prof.name||'Client'} (${prof.type}, ${prof.campuses} campus, ${fteStu} FTE students, ${fse} FSE workers, ${prof.horizon}yr)\nModules: ${MODULES.filter(m=>mods[m]).join(', ')}\n\nEstimate Results:\n${vs}\n\nTambellini Reference Engagements:\n${refCtx}${propCtx}\n\nProvide:\n1) Cross-vendor comparison — which vendor is best value and why\n2) How this estimate compares to Tambellini reference engagements (Clark, ConnColl, Swarthmore, NSCC)\n3) Per-vendor optimization opportunities\n4) Risk factors and negotiation leverage points\n5) Clear recommendation`;
  try{const ep=azEnd||'https://api.openai.com/v1/chat/completions';const hd=azEnd?{'Content-Type':'application/json','api-key':aiKey}:{'Content-Type':'application/json','Authorization':`Bearer ${aiKey}`};const r=await fetch(ep,{method:'POST',headers:hd,body:JSON.stringify({model:azEnd?undefined:'gpt-4o',messages:[{role:'user',content:prompt}],max_tokens:3000})});const d=await r.json();setAiOut(d.choices?.[0]?.message?.content||JSON.stringify(d));}catch(e){setAiOut('Error: '+e.message);}setAiLoad(false);
},[aiKey,azEnd,results,prof,fse,fteStu,mods,proposalText]);

const navTabs=[
  {id:'method',l:'📖 Methodology'},
  {id:'profile',l:'① Institution'},
  {id:'pricing',l:'② Vendor Pricing'},
  {id:'results',l:'③ Estimate'},
  {id:'reference',l:'📚 Reference Cases'},
];
const fv=Object.keys(results||{})[0];

return(
<div style={{background:T.bg,minHeight:'100vh',color:T.tx,fontFamily:"'Courier New',monospace",padding:16}}>
<div style={{maxWidth:1300,margin:'0 auto'}}>
  <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:18}}>
    <div style={{width:36,height:36,background:`linear-gradient(135deg,${T.ac},${T.gn})`,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,color:T.bg,fontWeight:900}}>T</div>
    <div>
      <div style={{fontSize:16,color:T.wh,fontWeight:700}}>ERP Budgetary Estimator</div>
      <div style={{fontSize:9,color:T.dm}}>Tambellini methodology — multi-vendor · formula-driven · benchmark-scaled · 4 reference engagements</div>
    </div>
  </div>

  <div style={{display:'flex',gap:1,marginBottom:16,borderBottom:`1px solid ${T.bd}`,flexWrap:'wrap'}}>
    {navTabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:'9px 16px',background:tab===t.id?T.cd:'transparent',color:tab===t.id?T.wh:t.id==='reference'?T.or:T.tx,border:'none',borderBottom:tab===t.id?`2px solid ${t.id==='reference'?T.or:T.ac}`:'2px solid transparent',cursor:'pointer',fontSize:11,fontWeight:600,fontFamily:'inherit'}}>{t.l}</button>)}
  </div>

  {/* ═══ REFERENCE CASES ═══ */}
  {tab==='reference'&&(
    <div>
      <div style={{background:T.cd,borderRadius:10,padding:16,border:`1px solid ${T.or}`,marginBottom:14}}>
        <div style={{fontSize:13,color:T.or,fontWeight:700,marginBottom:4}}>📚 Tambellini Reference Engagements Database</div>
        <div style={{fontSize:11,color:T.dm,lineHeight:1.7}}>
          Real historical budgetary estimates delivered to clients. Use these as benchmarks when building new estimates — compare FSE/FTE ratios, per-unit costs, salary assumptions, and module scope.
          <span style={{color:T.ac,marginLeft:8}}>Clark (2025) · ConnColl (2025) · Swarthmore (2024) · NSCC (2024)</span>
        </div>
      </div>
      <ReferenceTab currentFse={fse} currentFte={fteStu}/>
    </div>
  )}

  {/* ═══ METHODOLOGY ═══ */}
  {tab==='method'&&(<div style={{display:'grid',gap:14}}>
    <Section title="📖 How This Estimator Works">
      <p style={{fontSize:12,lineHeight:1.8,color:T.tx,margin:0}}>This tool implements the Tambellini Group's budgetary assessment methodology used for ERP transformation cost estimates. It produces the same deliverable format as past engagements (Clark University, Connecticut College, Swarthmore, NSCC). Below is every step, formula, and assumption.</p>
    </Section>

    <Section title="Step 1: Gather Institution Data">
      <p style={{fontSize:12,lineHeight:1.8,color:T.tx,margin:'0 0 8px'}}>Collect the institution's profile from their data request response. Key inputs:</p>
      <Tb hd={['Input','Description','Example (Clark)']} rows={[
        ['FTE Students','Full-time×1.0 + Part-time×0.5 + Non-IPEDS×0.25','3,936'],
        ['FSE Workers','Full-time×1.0 + Part-time×0.25 + Associates×0.125 + Former×0.025','827'],
        ['Institution Type','Private or Public — affects salary benchmarks','Private'],
        ['Campuses','Number of physical locations','1'],
        ['Modules','Which ERP modules are in scope (HCM, Finance, Student, etc.)','HCM, Finance, Student, Grants, Payroll'],
        ['Fiscal Year End','Determines fiscal year alignment','May 31'],
      ]}/>
    </Section>

    <Section title="Step 2: Get Vendor Pricing">
      <p style={{fontSize:12,lineHeight:1.8,color:T.tx,margin:'0 0 8px'}}>Subscription pricing comes from vendor proposals, Starbridge AI, GovSpend, or peer references. The tool can auto-scale from JMU benchmarks:</p>
      <Tb hd={['Formula','Description']} rows={[
        ['Platform Sub = (JMU Sub ÷ JMU FSE) × Client FSE','Per-FSE subscription scaling. JMU paid $2,135,000 at 4,020 FSE = $531/FSE'],
        ['Student Sub = Client FTE Students × $130','Per-FTE student module pricing from peer data'],
        ['WSP = 20% of Platform Subscription','Workday Success Plan (Workday only)'],
      ]}/>
      <p style={{fontSize:11,color:T.dm,marginTop:8}}>Optionally upload a Starbridge/GovSpend Excel file for market benchmark context.</p>
    </Section>

    <Section title="Step 3: Scale Implementation Costs">
      <p style={{fontSize:12,lineHeight:1.8,color:T.tx,margin:'0 0 8px'}}>Implementation costs scale from reference institutions by FSE/FTE ratio:</p>
      <Tb hd={['Formula','Description']} rows={[
        ['HCM/Fin Impl = JMU HCM Impl × (Client FSE ÷ JMU FSE)','JMU paid $11M at 4,020 FSE. Clark at 827 FSE ≈ 20.6% = ~$2.3M. Actual estimate: $4M (includes buffer)'],
        ['Student Impl = JMU Student Impl × (Client FTE ÷ JMU FTE)','JMU paid $12M at 21,500 FTE. Scales by student population ratio'],
      ]}/>
    </Section>

    <Section title="Step 4: Build the Staffing Model">
      <p style={{fontSize:12,lineHeight:1.8,color:T.tx,margin:'0 0 8px'}}>Each role has a base salary, benefits %, annual increase, and phase assignment:</p>
      <Tb hd={['Formula','Each cell in the staffing grid']} rows={[
        ['Cost = Salary × (1 + Annual Increase)^(Year-1) × FTE × (1 + Benefits%)','Salary compounds each year. FTE varies by phase. Benefits added on top.'],
      ]}/>
      <p style={{fontSize:12,lineHeight:1.8,color:T.tx,margin:'8px 0'}}>Phase assignments determine when each role is active:</p>
      <Tb hd={['Phase','Years Active (10yr horizon)','Roles']} rows={[
        ['HCM Implementation','Years 1–3','HR, Payroll, Finance, Procurement, Budget backfills'],
        ['Student Implementation','Years 3–6','Academic Affairs, Registrar, Bursar, Financial Aid, Admissions backfills'],
        ['Full Implementation','Years 1–6','Project Manager, IT Developers, Testing Lead, Training Lead'],
        ['Ongoing (full project)','Years 1–10','Change Manager, BA HCM/Finance, BA Data Mgmt'],
        ['Student Ongoing','Years 3–10','BA Student'],
      ]}/>
    </Section>

    <Section title="Step 5: External Costs">
      <Tb hd={['Line Item','Formula','Typical Value']} rows={[
        ['Change Mgmt Consulting','Rate × Hours/yr × (1.02)^Year','$300/hr × 2,000 hrs, 2% annual increase'],
        ['Travel','% of consulting costs','2–8% depending on institution'],
        ['Training','HCM training Year 1 + Student training at phase start','$120K + $165K'],
        ['Post-Production Support','Fixed annual amount during stabilization','$100K–$130K/yr if included'],
        ['Contingency','20% × (Implementation + Change Mgmt)','Excludes travel. Covers scope changes, delays.'],
        ['Other Project Costs','5% × Implementation costs','Project space, bonuses, tools'],
      ]}/>
    </Section>

    <Section title="Step 6: Software Costs">
      <Tb hd={['Line Item','Formula']} rows={[
        ['Platform Subscription','Base × (1 + Annual Increase)^(Year-2), starting Year 2'],
        ['Student Subscription','Same formula, only if Student module included'],
        ['IAM Solution','Base × (1.02)^Year, from Year 1'],
        ['WSP Accelerate','Base × (1 + Sub Increase)^(Year-2), Workday only'],
      ]}/>
    </Section>

    <Section title="Step 7: Multi-Vendor Comparison">
      <p style={{fontSize:12,lineHeight:1.8,color:T.tx,margin:0}}>Internal staffing costs are the same across vendors (same institution, same roles). External and software costs differ by vendor — different implementation partners, different subscription models, different escalation rates. The Estimate Summary tab shows all vendors side-by-side, matching the format of the Clark/ConnColl deliverables.</p>
    </Section>

    <Section title="Step 8: Output Format">
      <p style={{fontSize:12,lineHeight:1.8,color:T.tx,margin:'0 0 8px'}}>The estimate produces tabs matching the original spreadsheet deliverables:</p>
      <Tb hd={['Tab','Contents','Matches Original']} rows={[
        ['Estimate Summary','Cross-vendor total comparison with run rate','Clark Estimate Summary tab'],
        ['[Vendor] (YoY)','Year-by-year: Internal → External → Software → Contingency → Total → Cumulative','Clark/ConnColl Estimate tabs'],
        ['Staffing','Role-by-role with salary, FTE, benefits, year-by-year costs','Clark/ConnColl Staffing tabs'],
        ['Assumptions','All inputs documented with formulas','Clark/ConnColl Assumptions tabs'],
        ['AI Review','Azure/OpenAI cross-vendor analysis and recommendations','New — AI-powered'],
        ['📚 Reference Cases','Real historical estimates: Clark, ConnColl, Swarthmore, NSCC','New — analyst database'],
      ]}/>
    </Section>

    <div style={{textAlign:'center',padding:20}}>
      <button onClick={()=>setTab('reference')} style={{padding:'12px 30px',background:`linear-gradient(135deg,${T.or},${T.ac})`,color:T.bg,border:'none',borderRadius:8,cursor:'pointer',fontSize:13,fontWeight:800,fontFamily:'inherit',marginRight:12}}>📚 View Reference Cases →</button>
      <button onClick={()=>setTab('profile')} style={{padding:'12px 30px',background:`linear-gradient(135deg,${T.ac},${T.gn})`,color:T.bg,border:'none',borderRadius:8,cursor:'pointer',fontSize:13,fontWeight:800,fontFamily:'inherit'}}>Start Building Estimate →</button>
    </div>
  </div>)}

  {/* ═══ INSTITUTION ═══ */}
  {tab==='profile'&&(<div style={{display:'grid',gap:14}}>
    <Section title="🏫 Institution Profile">
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:10}}>
        {[{l:'Name',k:'name',t:'text'},{l:'Type',k:'type',t:'select',o:['Private','Public']},{l:'Campuses',k:'campuses',t:'number'},{l:'Horizon (yrs)',k:'horizon',t:'number'},{l:'FY End',k:'fyEnd',t:'text'}].map(f=><div key={f.k}><label style={{fontSize:10,color:T.dm,display:'block',marginBottom:3}}>{f.l}</label>{f.t==='select'?<select value={prof[f.k]} onChange={e=>setProf(p=>({...p,[f.k]:e.target.value}))} style={IS}>{f.o.map(o=><option key={o}>{o}</option>)}</select>:<input type={f.t} value={prof[f.k]} onChange={e=>setProf(p=>({...p,[f.k]:f.t==='number'?+e.target.value:e.target.value}))} style={IS}/>}</div>)}
        <div style={{display:'flex',alignItems:'end'}}><label style={{fontSize:11,color:T.tx,display:'flex',alignItems:'center',gap:5,cursor:'pointer'}}><input type="checkbox" checked={prof.inclStu} onChange={e=>setProf(p=>({...p,inclStu:e.target.checked}))}/>Include Student Module</label></div>
      </div>
    </Section>
    {/* FSE similarity hint */}
    {fse > 0 && (
      <div style={{padding:'10px 14px',background:T.cd,borderRadius:8,border:`1px solid ${T.bd}`,fontSize:11,color:T.dm}}>
        <b style={{color:T.or}}>📚 Closest reference: </b>
        {(() => {const best=REFERENCE_CASES.reduce((b,rc)=>Math.abs(rc.fse-fse)<Math.abs(b.fse-fse)?rc:b);return `${best.name} (${best.fse} FSE, ${Math.round((1-Math.abs(fse-best.fse)/Math.max(fse,best.fse))*100)}% FSE match)`;})()}
        <button onClick={()=>setTab('reference')} style={{marginLeft:10,padding:'2px 8px',background:'transparent',color:T.or,border:`1px solid ${T.or}`,borderRadius:4,cursor:'pointer',fontSize:10,fontFamily:'inherit'}}>View →</button>
      </div>
    )}
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
      <Section title="👤 FSE Workers">
        <p style={{fontSize:9,color:T.dm,margin:'0 0 8px'}}>FT×1.0 · PT×0.25 · Associates×0.125 · Former×0.025</p>
        {[{l:'Full-Time',k:'ftFull',w:'1.0'},{l:'Part-Time',k:'ftPart',w:'0.25'},{l:'Associates',k:'associates',w:'0.125'},{l:'Former Workers',k:'formerWorkers',w:'0.025'}].map(f=><div key={f.k} style={{display:'flex',alignItems:'center',gap:8,marginBottom:5}}><label style={{fontSize:11,color:T.dm,width:140}}>{f.l} <span style={{color:T.ac}}>×{f.w}</span></label><input type="number" value={prof[f.k]} onChange={e=>setProf(p=>({...p,[f.k]:+e.target.value}))} style={{...IS,width:90}}/></div>)}
        <div style={{marginTop:8,padding:8,background:T.sf,borderRadius:6,borderLeft:`3px solid ${T.gn}`}}><span style={{fontSize:10,color:T.dm}}>FSE: </span><span style={{fontSize:15,color:T.gn,fontWeight:700}}>{fse.toLocaleString()}</span></div>
      </Section>
      <Section title="🎓 FTE Students">
        <p style={{fontSize:9,color:T.dm,margin:'0 0 8px'}}>FT×1.0 · PT×0.5 · Non-IPEDS×0.25</p>
        {[{l:'Full-Time (IPEDS)',k:'stuFull',w:'1.0'},{l:'Part-Time',k:'stuPart',w:'0.5'},{l:'Non-IPEDS',k:'stuNotIPEDS',w:'0.25'}].map(f=><div key={f.k} style={{display:'flex',alignItems:'center',gap:8,marginBottom:5}}><label style={{fontSize:11,color:T.dm,width:160}}>{f.l} <span style={{color:T.ac}}>×{f.w}</span></label><input type="number" value={prof[f.k]} onChange={e=>setProf(p=>({...p,[f.k]:+e.target.value}))} style={{...IS,width:90}}/></div>)}
        <div style={{marginTop:8,padding:8,background:T.sf,borderRadius:6,borderLeft:`3px solid ${T.gn}`}}><span style={{fontSize:10,color:T.dm}}>FTE: </span><span style={{fontSize:15,color:T.gn,fontWeight:700}}>{fteStu.toLocaleString()}</span></div>
      </Section>
    </div>
    <Section title="📦 Modules In Scope">
      <div style={{display:'flex',flexWrap:'wrap',gap:4}}>{MODULES.map(m=><button key={m} onClick={()=>setMods(ms=>({...ms,[m]:!ms[m]}))} style={{padding:'4px 10px',borderRadius:12,fontSize:10,cursor:'pointer',background:mods[m]?'#1a3a1a':'transparent',border:`1px solid ${mods[m]?T.gn:T.bd}`,color:mods[m]?T.gn:T.dm}}>{m}</button>)}</div>
    </Section>
    <Section title="💰 Staffing Salaries">
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:8}}>
        {[{l:'Project Manager',k:'pm'},{l:'Change Manager',k:'cm'},{l:'Staff (HCM)',k:'staff'},{l:'Finance Staff',k:'finStaff'},{l:'Student Staff',k:'stuStaff'},{l:'IT Salary',k:'itSal'},{l:'IT FTE',k:'itFte'},{l:'BA Salary',k:'baSal'},{l:'Benefits %',k:'benPct',s:0.01},{l:'Annual Increase',k:'incPct',s:0.01}].map(f=><div key={f.k}><label style={{fontSize:10,color:T.dm,display:'block',marginBottom:3}}>{f.l}</label><input type="number" step={f.s||1} value={sal[f.k]} onChange={e=>setSal(s=>({...s,[f.k]:+e.target.value}))} style={IS}/></div>)}
      </div>
    </Section>
    <Section title="🏢 Vendors to Estimate">
      <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:10}}>
        {vendorList.map((v,i)=>(<div key={i} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 12px',borderRadius:8,background:v.enabled?T.sf:'transparent',border:`1px solid ${v.enabled?VCOLORS[i%VCOLORS.length]:T.bd}`}}>
          <input type="checkbox" checked={v.enabled} onChange={()=>toggleVendor(i)}/><span style={{fontSize:12,color:v.enabled?VCOLORS[i%VCOLORS.length]:T.dm,fontWeight:600}}>{v.name}</span>
          {vendorList.length>1&&<button onClick={()=>removeVendor(i)} style={{background:'none',border:'none',color:T.rd,cursor:'pointer',fontSize:14,padding:0}}>×</button>}
        </div>))}
      </div>
      <div style={{display:'flex',gap:8}}>
        <input type="text" value={newVendor} placeholder="Add vendor..." onChange={e=>setNewVendor(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addVendor()} style={{...IS,width:280}}/>
        <button onClick={addVendor} style={{padding:'7px 16px',background:T.ac,color:T.bg,border:'none',borderRadius:5,cursor:'pointer',fontSize:11,fontWeight:700,fontFamily:'inherit'}}>+ Add</button>
      </div>
    </Section>
    <button onClick={()=>setTab('pricing')} style={{padding:'14px',background:`linear-gradient(135deg,${T.ac},${T.gn})`,color:T.bg,border:'none',borderRadius:8,cursor:'pointer',fontSize:14,fontWeight:800,fontFamily:'inherit',width:'100%'}}>Next: Vendor Pricing →</button>
  </div>)}

  {/* ═══ VENDOR PRICING ═══ */}
  {tab==='pricing'&&(<div style={{display:'grid',gap:14}}>
    <Section title="📊 Market Benchmark (Optional)">
      <input ref={fRef} type="file" accept=".xlsx,.xls,.csv" onChange={onSBFile} style={{display:'none'}}/>
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        <button onClick={()=>fRef.current?.click()} disabled={!XL} style={{padding:'8px 20px',background:T.sf,color:T.ac,border:`1px solid ${T.ac}`,borderRadius:6,cursor:'pointer',fontSize:11,fontWeight:600,fontFamily:'inherit'}}>📎 Upload Starbridge/GovSpend File</button>
        {sbStats&&<span style={{fontSize:12,color:T.gn}}>✓ {sbStats.file} — {sbStats.rows} purchases, {sbStats.insts} institutions</span>}
      </div>
    </Section>
    <div style={{display:'flex',gap:8,alignItems:'center',margin:'0 0 8px'}}>
      <label style={{fontSize:10,color:T.dm}}>Scaling Reference:</label>
      <select value={bmRef} onChange={e=>{setBmRef(e.target.value);vendorList.forEach((_,i)=>setVpr(i,null));}} style={{...IS,width:220}}>
        <option value="auto">Auto (closest FSE match)</option>
        {BM_LIST.map(b=><option key={b.key} value={b.key}>{b.label}</option>)}
      </select>
    </div>
    {vendorList.filter(v=>v.enabled).map((v,vi)=>{
      const vp=v.vpr||defVpr(v.name);
      return(<div key={vi} style={{background:T.cd,borderRadius:10,padding:20,border:`1px solid ${T.bd}`,borderLeft:`3px solid ${VCOLORS[vi%VCOLORS.length]}`}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
          <h3 style={{margin:0,color:VCOLORS[vi%VCOLORS.length],fontSize:14}}>{v.name}</h3>
          <button onClick={()=>setVpr(vendorList.indexOf(v),defVpr(v.name))} style={{padding:'4px 10px',background:T.sf,color:T.ac,border:`1px solid ${T.bd}`,borderRadius:4,cursor:'pointer',fontSize:9,fontFamily:'inherit'}}>↻ Reset</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:8}}>
          {[{l:'Platform Sub $/yr',k:'pSub'},{l:'Student Sub $/yr',k:'sSub'},{l:'Sub Increase',k:'subInc',s:0.01},{l:'HCM/Fin Impl',k:'hcmI'},{l:'Student Impl',k:'stuI'},{l:'IAM $/yr',k:'iam'},{l:'WSP $/yr',k:'wsp'},{l:'Travel %',k:'travPct',s:0.01},{l:'Contingency %',k:'contPct',s:0.05},{l:'CM $/hr',k:'cmRate',s:10},{l:'CM hrs/yr',k:'cmHrs',s:100}].map(f=>
            <div key={f.k}><label style={{fontSize:10,color:T.dm,display:'block',marginBottom:3}}>{f.l}</label><input type="number" step={f.s||1} value={vp[f.k]||0} onChange={e=>{const val=+e.target.value;setVpr(vendorList.indexOf(v),{...vp,[f.k]:val});}} style={IS}/></div>
          )}
        </div>
      </div>);
    })}
    <Section title="📄 Proposal / Additional Context (Optional)">
      <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:10}}>
        <input ref={propRef} type="file" accept=".xlsx,.xls,.csv,.pdf,.doc,.docx,.txt" onChange={onProposalFile} style={{display:'none'}}/>
        <button onClick={()=>propRef.current?.click()} style={{padding:'8px 16px',background:T.sf,color:T.ac,border:`1px solid ${T.ac}`,borderRadius:6,cursor:'pointer',fontSize:11,fontWeight:600,fontFamily:'inherit'}}>📎 Upload Document</button>
        {proposalFileName&&<span style={{fontSize:11,color:T.gn}}>✓ {proposalFileName}</span>}
      </div>
      <textarea value={proposalText} placeholder="Paste email thread, vendor proposal details, contract terms..." onChange={e=>setProposalText(e.target.value)} style={{...IS,minHeight:80,resize:'vertical'}}/>
    </Section>
    <button onClick={generate} style={{padding:'14px',background:`linear-gradient(135deg,${T.ac},${T.gn})`,color:T.bg,border:'none',borderRadius:8,cursor:'pointer',fontSize:14,fontWeight:800,fontFamily:'inherit',width:'100%'}}>
      Generate {vendorList.filter(v=>v.enabled).length}-Vendor Estimate →
    </button>
  </div>)}

  {/* ═══ RESULTS ═══ */}
  {tab==='results'&&(<div style={{background:T.cd,borderRadius:10,padding:18,border:`1px solid ${T.bd}`}}>
    {!results?(<div style={{textAlign:'center',padding:40,color:T.dm}}><p>No estimate yet.</p><button onClick={()=>setTab('profile')} style={{marginTop:12,padding:'10px 24px',background:T.ac,color:T.bg,border:'none',borderRadius:6,cursor:'pointer',fontSize:12,fontWeight:700,fontFamily:'inherit'}}>Go to Institution →</button></div>):(<div>
      <div style={{display:'flex',gap:2,marginBottom:12,flexWrap:'wrap'}}>
        {['summary',...Object.keys(results).map(v=>v.toLowerCase()),'staffing','assumptions','ai'].map(t=>{
          const label=t==='summary'?'Estimate Summary':t==='staffing'?'Staffing':t==='assumptions'?'Assumptions':t==='ai'?'AI Review':Object.keys(results).find(v=>v.toLowerCase()===t)+' (YoY)';
          return <button key={t} onClick={()=>setRTab(t)} style={{padding:'6px 12px',background:rTab===t?T.ac:T.sf,color:rTab===t?T.bg:T.dm,border:`1px solid ${T.bd}`,borderRadius:5,cursor:'pointer',fontSize:10,fontWeight:600,fontFamily:'inherit'}}>{label}</button>;
        })}
      </div>

      {rTab==='summary'&&(<div>
        <h3 style={{color:T.ac,margin:'0 0 4px',fontSize:14}}>{prof.horizon}-Year Estimate — {prof.name||'Institution'}</h3>
        <p style={{color:T.dm,fontSize:11,margin:'0 0 14px'}}>{prof.type} · {prof.campuses} campus · {fteStu.toLocaleString()} FTE · {fse.toLocaleString()} FSE</p>
        <Tb hd={['Cost Category',...Object.keys(results),'Formula']} hl rows={[
          ['Internal',...Object.values(results).map(e=>$(S(e.intYr))),'Sal×(1+Inc)^Yr×FTE×(1+Ben%)'],
          ['Implementation',...Object.values(results).map(e=>$(S(e.hcmYr)+S(e.stuYr))),'Scaled by FSE ratio'],
          ['Change Mgmt',...Object.values(results).map(e=>$(S(e.cmYr))),'Rate×Hrs×(1.02)^Yr'],
          ['Travel+Training',...Object.values(results).map(e=>$(S(e.travYr)+S(e.trainYr))),'%+fixed'],
          ['Software',...Object.values(results).map(e=>$(S(e.swYr))),'Sub×(1+Inc)^Yr'],
          ['Contingency',...Object.values(results).map(e=>$(S(e.contYr))),'20% impl+CM'],
          ['TOTAL',...Object.values(results).map(e=>$(S(e.totYr))),''],
          [`Run Rate Y${prof.horizon}`,...Object.values(results).map(e=>$(e.runRate)),'Annual ongoing'],
        ]}/>
        {/* vs. reference cases */}
        <div style={{marginTop:14,padding:'10px 14px',background:T.sf,borderRadius:8,border:`1px solid ${T.or}`,fontSize:11}}>
          <b style={{color:T.or}}>📚 vs. Reference Cases (Workday): </b>
          {REFERENCE_CASES.filter(rc=>rc.costSummary['Workday']).map(rc=>`${rc.name}: ${$(rc.costSummary['Workday'].total)} (${rc.fse} FSE)`).join(' · ')}
        </div>
        <div style={{display:'grid',gridTemplateColumns:`repeat(${Object.keys(results).length},1fr)`,gap:10,marginTop:10}}>
          {Object.entries(results).map(([v,e],i)=>(<div key={v} style={{background:T.sf,borderRadius:8,padding:16,borderTop:`3px solid ${VCOLORS[i%VCOLORS.length]}`}}>
            <div style={{fontSize:12,color:VCOLORS[i%VCOLORS.length],fontWeight:700,marginBottom:6}}>{v}</div>
            <div style={{fontSize:20,color:T.wh,fontWeight:700}}>{$(S(e.totYr))}</div>
            <div style={{fontSize:10,color:T.dm,marginTop:4}}>Run rate: {$(e.runRate)}/yr</div>
          </div>))}
        </div>
      </div>)}

      {Object.keys(results).map((v,vi)=>{if(rTab!==v.toLowerCase())return null;const e=results[v];return(<div key={v}>
        <h3 style={{color:VCOLORS[vi%VCOLORS.length],margin:'0 0 8px',fontSize:14}}>{v} — Year-by-Year</h3>
        <Tb hd={['',...e.yrs.map(y=>`FY${y}`),'Total']} hl rows={[
          ['INTERNAL',...sr(e.intYr)],['  Staffing',...sr(e.staffYr)],['  Other',...sr(e.otherYr)],
          ['EXTERNAL',...sr(e.extYr)],['  HCM/Fin Impl',...sr(e.hcmYr)],['  Student Impl',...sr(e.stuYr)],
          ['  Change Mgmt',...sr(e.cmYr)],['  Travel',...sr(e.travYr)],['  Training',...sr(e.trainYr)],
          ['SOFTWARE',...sr(e.swYr)],['  Platform',...sr(e.pSub)],['  Student',...sr(e.sSub)],['  IAM',...sr(e.iamYr)],['  WSP',...sr(e.wspYr)],
          ['CONTINGENCY',...sr(e.contYr)],['TOTAL',...sr(e.totYr)],['Cumulative',...e.cumYr.map($),''],
        ]}/></div>);})}

      {rTab==='staffing'&&results[fv]&&(<div>
        <h3 style={{color:T.ac,margin:'0 0 8px',fontSize:14}}>Staffing (same across vendors)</h3>
        <Tb hd={['Role','Cat','FTE','Salary','Ben','Inc',...results[fv].yrs.map(y=>`FY${y}`),'Total']} hl rows={[
          ...results[fv].staff.map(s=>[s.role,s.cat,s.fte,$(s.sal),P(s.ben),P(s.inc),...s.costs.map($),$(s.total)]),
          ['TOTAL','','','','','',...results[fv].staffYr.map($),$(S(results[fv].staffYr))],
        ]}/>
      </div>)}

      {rTab==='assumptions'&&(<div>
        <h3 style={{color:T.ac,margin:'0 0 8px',fontSize:14}}>Assumptions</h3>
        <Tb hd={['Parameter','Value','Usage']} rows={[
          ['FTE Students',fteStu.toLocaleString(),'FT×1.0 + PT×0.5 + NonIPEDS×0.25'],
          ['FSE Workers',fse.toLocaleString(),'FT×1.0 + PT×0.25 + Assoc×0.125 + Former×0.025'],
          ['Benefits',P(sal.benPct),'On salary, all roles'],['Salary Inc',P(sal.incPct),'Compounded annually'],
          ['Contingency','20%','Of impl+CM excl travel'],['Travel','8%','Of consulting costs'],
          ['Modules',MODULES.filter(m=>mods[m]).join(', '),'In-scope modules'],
          ['Vendors',vendorList.filter(v=>v.enabled).map(v=>v.name).join(', '),'Estimated vendors'],
        ]}/>
      </div>)}

      {rTab==='ai'&&(<div>
        <h3 style={{color:T.ac,margin:'0 0 8px',fontSize:14}}>AI Cross-Vendor Review</h3>
        <div style={{fontSize:11,color:T.dm,marginBottom:8}}>AI will automatically compare against all 4 Tambellini reference engagements (Clark, ConnColl, Swarthmore, NSCC).</div>
        <div style={{display:'flex',gap:6,marginBottom:10,flexWrap:'wrap'}}>
          <input type="text" placeholder="Azure endpoint URL (optional)" value={azEnd} onChange={e=>setAzEnd(e.target.value)} style={{...IS,flex:1,minWidth:200}}/>
          <input type="password" placeholder="OpenAI/Azure API Key" value={aiKey} onChange={e=>setAiKey(e.target.value)} style={{...IS,width:160}}/>
          <button onClick={callAI} disabled={aiLoad||!aiKey} style={{padding:'7px 14px',background:aiLoad?T.sf:T.ac,color:T.bg,border:'none',borderRadius:5,cursor:aiLoad?'wait':'pointer',fontSize:10,fontWeight:700,fontFamily:'inherit',opacity:!aiKey?0.4:1}}>{aiLoad?'Analyzing...':'Review All Vendors'}</button>
        </div>
        <div style={{padding:14,background:T.sf,borderRadius:6,fontSize:12,color:aiOut?T.tx:T.dm,lineHeight:1.7,whiteSpace:'pre-wrap',minHeight:150,border:`1px solid ${T.bd}`}}>{aiOut||'Enter API key, click Review. AI compares vendors against Tambellini benchmarks and reference engagements.'}</div>
      </div>)}
    </div>)}
  </div>)}

</div>
</div>
);
}