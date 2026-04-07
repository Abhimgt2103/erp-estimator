/* eslint-disable no-unused-vars */
import { useState, useCallback, useRef, useEffect } from "react";

function useXLSX(){const[r,setR]=useState(!!window.XLSX);useEffect(()=>{if(window.XLSX){setR(true);return;}const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';s.onload=()=>setR(true);document.head.appendChild(s);},[]);return r?window.XLSX:null;}

// ─── UPDATED THEME FOR MAXIMUM READABILITY (LIGHT MODE) ───
const T = {
  bg: '#F8FAFC',    // Very light grey/blue background
  cd: '#FFFFFF',    // Pure white cards
  bd: '#CBD5E1',    // Medium grey borders for visibility
  ac: '#1E40AF',    // Strong Blue (Action/Headers)
  ad: '#EFF6FF',    // Soft Blue (Table Headers)
  tx: '#1E293B',    // Dark Slate (Primary Text)
  dm: '#475569',    // Muted Slate (Secondary Text)
  gn: '#15803D',    // Forest Green (Positive/FTE)
  rd: '#B91C1C',    // Crimson (Negative/Remove)
  or: '#C2410C',    // Burnt Orange (References)
  wh: '#020617',    // Near Black (Headings)
  sf: '#F1F5F9'     // Light Slate (Input/Backgrounds)
};

// ─── REAL HISTORICAL REFERENCE CASES ───
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
      'Ellucian Banner SaaS': { internal: 9920549, implementation: 4750000, changeMgmt: 3000000, travelTraining: 927492, software: 10135649, contingency: 1577455, total: 30311145, runRate: null },
      'Oracle':               { internal: 10345549, implementation: 17250000, changeMgmt: 3000000, travelTraining: 1340992, software: 25748907, contingency: 3277455, total: 60962903, runRate: null },
      'Workday':              { internal: 10345549, implementation: 17250000, changeMgmt: 3000000, travelTraining: 5901764, software: 25748907, contingency: 3277455, total: 65523675, runRate: null },
    },
    pricingNotes: 'Dual currency (CAD/USD). USD/CAD rate: 1.4079 as of Nov 2024. CAD salaries used (consultant backfills at 0% benefits).',
    uniqueNotes: 'ONLY public institution in reference set. ONLY multi-campus (14). 14 campuses drives higher complexity.',
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

const MODULES=['HCM','Benefits','Talent Mgmt','Payroll','Time Tracking','Finance','Grants Mgmt','Adaptive Planning','Procure-to-Pay','Strategic Sourcing','Travel & Expense','Student Core/SIS','Recruiting','Admissions','Advising','Financial Aid','Curriculum Mgmt','Prism/DW','Extend','IAM'];
const VCOLORS=['#1E40AF','#C2410C','#15803D','#7E22CE','#BE185D'];
const RCCOLORS=['#0369A1','#166534','#9A3412','#6D28D9'];

const IS={background:T.sf,border:`1px solid ${T.bd}`,borderRadius:5,color:T.tx,padding:'7px 10px',fontSize:12,width:'100%',outline:'none',boxSizing:'border-box',fontFamily:"'Courier New',monospace"};
const $=n=>(n==null?'—':n===0?'–':'$'+Math.round(n).toLocaleString());
const P=n=>(n!=null?(n*100).toFixed(1)+'%':'');
const S=a=>a.reduce((s,v)=>s+v,0);
const sr=a=>[...a.map($),$(S(a))];

function Tb({hd,rows,hl}){return(<div style={{overflowX:'auto',margin:'8px 0'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:11,fontFamily:"'Courier New',monospace"}}><thead><tr>{hd.map((h,i)=><th key={i} style={{padding:'8px 10px',background:T.ad,color:T.ac,textAlign:i?'right':'left',borderBottom:`2px solid ${T.ac}`,whiteSpace:'nowrap',fontSize:10}}>{h}</th>)}</tr></thead><tbody>{rows.map((r,ri)=><tr key={ri} style={{background:ri===rows.length-1&&hl?T.ad:ri%2===0?'#FFFFFF':'#F9FAFB'}}>{r.map((c,ci)=><td key={ci} style={{padding:'7px 10px',borderBottom:`1px solid ${T.bd}`,textAlign:ci?'right':'left',color:ri===rows.length-1&&hl?T.wh:T.tx,fontWeight:ri===rows.length-1&&hl?700:400,whiteSpace:ci?'nowrap':'normal'}}>{c}</td>)}</tr>)}</tbody></table></div>);}

function Section({title,children,color}){return(<div style={{background:T.cd,borderRadius:10,padding:20,border:`1px solid ${color||T.bd}`,borderTop: `4px solid ${color||T.ac}`, marginBottom:14, boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}><h3 style={{margin:'0 0 12px',color:color||T.ac,fontSize:14,fontWeight:800}}>{title}</h3>{children}</div>);}

// Calculations
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

// ─── REFERENCE COMPONENTS ───
function ReferenceTab({currentFse, currentFte}) {
  const [selCase, setSelCase] = useState('clark');
  const rc = REFERENCE_CASES.find(c => c.id === selCase);
  const ci = REFERENCE_CASES.findIndex(c=>c.id===selCase);
  const col = RCCOLORS[ci % RCCOLORS.length];
  const vendors = Object.keys(rc.costSummary);

  return (
    <div style={{display:'grid',gap:12}}>
      <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap',alignItems:'center'}}>
        <span style={{fontSize:11,color:T.dm,fontWeight:700}}>Select Engagement:</span>
        {REFERENCE_CASES.map((rc2,i)=>(
          <button key={rc2.id} onClick={()=>setSelCase(rc2.id)}
            style={{padding:'8px 16px',background:selCase===rc2.id?RCCOLORS[i]:'#FFFFFF',
              color:selCase===rc2.id?T.cd:RCCOLORS[i],border:`2px solid ${RCCOLORS[i]}`,
              borderRadius:6,cursor:'pointer',fontSize:11,fontWeight:800,fontFamily:'inherit'}}>
            {rc2.name}
          </button>
        ))}
      </div>

      <div style={{background:T.cd,borderRadius:10,padding:20,border:`2px solid ${col}`,borderTopWidth:8}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:10}}>
          <div>
            <div style={{fontSize:22,color:col,fontWeight:900}}>{rc.name}</div>
            <div style={{fontSize:12,color:T.dm,marginTop:4,fontWeight:600}}>{rc.type} · {rc.campuses} campus · {rc.horizonYrs}-year estimate</div>
          </div>
          <div style={{display:'flex',gap:8}}>
            {[{l:'FSE Workers',v:rc.fse.toLocaleString(),c:T.ac}, {l:'FTE Students',v:rc.fteStu.toLocaleString(),c:T.gn}].map(({l,v,c})=>(
              <div key={l} style={{background:T.sf,borderRadius:6,padding:'10px 15px',textAlign:'center',borderBottom:`3px solid ${c}`}}>
                <div style={{fontSize:9,color:T.dm,textTransform:'uppercase',fontWeight:800}}>{l}</div>
                <div style={{fontSize:18,color:c,fontWeight:900}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Section title={`📊 Actual Delivered Cost Summary`} color={col}>
        <Tb hd={['Cost Category', ...vendors]} hl rows={[
            ['Internal Costs', ...vendors.map(v=>$(rc.costSummary[v].internal))],
            ['Implementation', ...vendors.map(v=>$(rc.costSummary[v].implementation))],
            ['Change Mgmt', ...vendors.map(v=>$(rc.costSummary[v].changeMgmt))],
            ['Travel/Train', ...vendors.map(v=>$(rc.costSummary[v].travelTraining))],
            ['Software', ...vendors.map(v=>$(rc.costSummary[v].software))],
            ['Contingency', ...vendors.map(v=>$(rc.costSummary[v].contingency))],
            ['TOTAL', ...vendors.map(v=>$(rc.costSummary[v].total))],
          ]} />
      </Section>
    </div>
  );
}

// ─── MAIN APP ───
export default function App(){
const[tab,setTab]=useState('profile');
const[rTab,setRTab]=useState('summary');
const[results,setResults]=useState(null);
const fRef=useRef(null);const propRef=useRef(null);const XL=useXLSX();
const[vendorFiles,setVendorFiles]=useState({});
const[proposalText,setProposalText]=useState('');
const[prof,setProf]=useState({name:'',type:'Private',campuses:1,horizon:10,inclStu:true,fyEnd:'Jun 30',ftFull:700,ftPart:200,associates:500,formerWorkers:200,stuFull:1800,stuPart:100,stuNotIPEDS:20});
const fse=Math.round(prof.ftFull+prof.ftPart*0.25+prof.associates*0.125+prof.formerWorkers*0.025);
const fteStu=Math.round(prof.stuFull+prof.stuPart*0.5+prof.stuNotIPEDS*0.25);
const[sal,setSal]=useState({pm:150000,cm:140000,staff:75000,finStaff:75000,stuStaff:75000,itSal:87000,itFte:3,baSal:75000,benPct:0.30,incPct:0.03});
const[mods,setMods]=useState(MODULES.reduce((o,m)=>({...o,[m]:['HCM','Payroll','Finance','Student Core/SIS'].includes(m)}),{}));
const[vendorList,setVendorList]=useState([{name:'Workday',enabled:true,vpr:null},{name:'Oracle',enabled:true,vpr:null},{name:'Ellucian',enabled:true,vpr:null}]);
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
  if(vn.includes('workday')){const wdSub=bmData.wdSub||BM.jmu.wdSub;const pSub=Math.round(wdSub/bmData.fse*fse);return{...base,pSub,sSub:prof.inclStu?Math.round(fteStu*130):0,hcmI:Math.round((bmData.wdHcmI||BM.jmu.wdHcmI)*r),stuI:prof.inclStu?Math.round((bmData.wdStuI||BM.jmu.wdStuI)*sr2):0,wsp:Math.round(pSub*0.2)};}
  return{...base,pSub:Math.round(1000000*r),sSub:prof.inclStu?Math.round(fteStu*110):0,hcmI:Math.round(BM.jmu.wdHcmI*r*0.7),stuI:prof.inclStu?Math.round(BM.jmu.wdStuI*sr2*0.7):0};
},[fse,fteStu,prof.inclStu,getBmRef]);

const generate=useCallback(()=>{
  const roles=makeRoles(sal);const res={};
  vendorList.filter(v=>v.enabled).forEach(v=>{const vp=v.vpr||defVpr(v.name);res[v.name]=runCalc({...prof,fse,fteStu},vp,roles);});
  setResults(res);setTab('results');
},[prof,sal,vendorList,defVpr,fse,fteStu]);

return(
<div style={{background:T.bg,minHeight:'100vh',color:T.tx,fontFamily:"'Courier New',monospace",padding:16}}>
<div style={{maxWidth:1100,margin:'0 auto'}}>
  
  <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
    <div style={{width:42,height:42,background:T.ac,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,color:'#FFF',fontWeight:900}}>T</div>
    <div>
      <div style={{fontSize:18,color:T.wh,fontWeight:900,letterSpacing:'-0.5px'}}>ERP Budgetary Estimator</div>
      <div style={{fontSize:10,color:T.dm,fontWeight:700,textTransform:'uppercase'}}>Tambellini Group Professional Deliverable Engine</div>
    </div>
  </div>

  <div style={{display:'flex',gap:2,marginBottom:20,background:'#E2E8F0',padding:2,borderRadius:8}}>
    {['profile','pricing','results','reference'].map(t=>(
      <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:'10px',background:tab===t?T.cd:'transparent',color:tab===t?T.ac:T.dm,border:'none',borderRadius:6,cursor:'pointer',fontSize:11,fontWeight:800,fontFamily:'inherit',transition:'0.2s'}}>
        {t.toUpperCase()}
      </button>
    ))}
  </div>

  {tab==='profile' && (
    <div style={{display:'grid',gap:14}}>
      <Section title="🏫 Institution Profile">
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12}}>
          <div><label style={{fontSize:10,color:T.dm,display:'block',marginBottom:4,fontWeight:700}}>Institution Name</label>
          <input type="text" value={prof.name} onChange={e=>setProf(p=>({...p,name:e.target.value}))} style={IS}/></div>
          <div><label style={{fontSize:10,color:T.dm,display:'block',marginBottom:4,fontWeight:700}}>FSE Workers (Calc: {fse})</label>
          <input type="number" value={prof.ftFull} onChange={e=>setProf(p=>({...p,ftFull:+e.target.value}))} style={IS}/></div>
          <div><label style={{fontSize:10,color:T.dm,display:'block',marginBottom:4,fontWeight:700}}>FTE Students (Calc: {fteStu})</label>
          <input type="number" value={prof.stuFull} onChange={e=>setProf(p=>({...p,stuFull:+e.target.value}))} style={IS}/></div>
        </div>
      </Section>
      <button onClick={()=>setTab('pricing')} style={{padding:'16px',background:T.ac,color:'#FFF',border:'none',borderRadius:8,cursor:'pointer',fontSize:14,fontWeight:900,fontFamily:'inherit'}}>CONTINUE TO PRICING →</button>
    </div>
  )}

  {tab==='reference' && <ReferenceTab />}

  {tab==='results' && results && (
    <div style={{background:T.cd,borderRadius:10,padding:20,border:`1px solid ${T.bd}`,boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)'}}>
       <h3 style={{color:T.ac,fontSize:18,fontWeight:900,marginBottom:15}}>Multi-Vendor Estimate Summary</h3>
       <Tb hd={['Cost Category',...Object.keys(results)]} hl rows={[
          ['Internal Staffing',...Object.values(results).map(e=>$(S(e.intYr)))],
          ['Implementation',...Object.values(results).map(e=>$(S(e.hcmYr)+S(e.stuYr)))],
          ['Software Subscription',...Object.values(results).map(e=>$(S(e.swYr)))],
          ['Contingency (20%)',...Object.values(results).map(e=>$(S(e.contYr)))],
          ['TOTAL 10-YEAR BUDGET',...Object.values(results).map(e=>$(S(e.totYr)))],
        ]} />
    </div>
  )}

  {tab==='pricing' && (
     <div style={{textAlign:'center',padding:40}}>
        <button onClick={generate} style={{padding:'20px 40px',background:T.gn,color:'#FFF',border:'none',borderRadius:10,fontSize:18,fontWeight:900,cursor:'pointer'}}>
          GENERATE FINAL ESTIMATE
        </button>
     </div>
  )}

</div>
</div>
);
}