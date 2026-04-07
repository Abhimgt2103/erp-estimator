/* eslint-disable no-unused-vars */
import { useState, useCallback, useRef, useEffect } from "react";

function useXLSX(){const[r,setR]=useState(!!window.XLSX);useEffect(()=>{if(window.XLSX){setR(true);return;}const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';s.onload=()=>setR(true);document.head.appendChild(s);},[]);return r?window.XLSX:null;}

// ─── HIGH-CONTRAST "LEGAL PAD" THEME ───
const T = {
  bg: '#FEF9C3',    // Light Yellowish Background
  cd: '#FFFFFF',    // Pure White for Contrast inside cards
  bd: '#000000',    // Heavy Black Borders
  tx: '#000000',    // Jet Black Text
  ac: '#000000',    // Black Accents
  ad: '#FDE047',    // Stronger Yellow for Headers
  sf: '#FFFBEB'     // Pale cream for inputs
};

// Global Bold Styles
const BOLD = { fontWeight: '900' };
const IS = { 
  background: T.sf, 
  border: `3px solid #000`, 
  borderRadius: '0', 
  color: '#000', 
  padding: '12px', 
  fontSize: '15px', 
  width: '100%', 
  fontWeight: '900', 
  fontFamily: "'Courier New', monospace" 
};

const $ = n => (n == null ? '—' : n === 0 ? '–' : '$' + Math.round(n).toLocaleString());
const S = a => a.reduce((s, v) => s + v, 0);

// ─── UI COMPONENTS ───
function Tb({ hd, rows, hl }) {
  return (
    <div style={{ overflowX: 'auto', margin: '20px 0', border: '3px solid #000' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', fontFamily: "'Courier New', monospace", color: '#000' }}>
        <thead>
          <tr>
            {hd.map((h, i) => (
              <th key={i} style={{ padding: '15px', background: '#000', color: '#FFF', textAlign: i ? 'right' : 'left', border: '1px solid #000', ...BOLD }}>
                {h.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? '#FFF' : '#FEF9C3' }}>
              {r.map((c, ci) => (
                <td key={ci} style={{ padding: '12px', border: '2px solid #000', textAlign: ci ? 'right' : 'left', ...BOLD }}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ background: '#FFF', padding: '30px', border: '4px solid #000', marginBottom: '25px', boxShadow: '12px 12px 0px #000' }}>
      <h2 style={{ margin: '0 0 20px', color: '#000', fontSize: '22px', ...BOLD, textTransform: 'uppercase', borderBottom: '6px solid #000', paddingBottom: '5px' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

// ─── MAIN APPLICATION ───
export default function App() {
  const [tab, setTab] = useState('profile');
  const [results, setResults] = useState(null);
  const [prof, setProf] = useState({ name: 'TAMBELLINI CLIENT', ftFull: 800, stuFull: 2500, horizon: 10 });

  const generate = () => {
    const res = {
      'Workday': { total: 45000000, sub: 12000000, impl: 15000000 },
      'Oracle': { total: 42000000, sub: 10000000, impl: 14000000 },
      'Ellucian': { total: 39000000, sub: 11000000, impl: 9000000 }
    };
    setResults(res);
    setTab('results');
  };

  return (
    <div style={{ background: T.bg, minHeight: '100vh', color: '#000', fontFamily: "'Courier New', monospace", padding: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ border: '5px solid #000', padding: '25px', marginBottom: '40px', background: '#FFF', boxShadow: '10px 10px 0px #000' }}>
          <h1 style={{ margin: 0, fontSize: '32px', ...BOLD, textTransform: 'uppercase' }}>ERP BUDGETARY ESTIMATOR</h1>
          <p style={{ margin: '5px 0 0', fontSize: '14px', ...BOLD }}>STATUS: HIGH-CONTRAST ANALYST MODE ENABLED</p>
        </div>

        {/* NAVIGATION */}
        <div style={{ display: 'flex', gap: '5px', marginBottom: '30px' }}>
          {['profile', 'pricing', 'results', 'reference'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '15px', border: '4px solid #000', ...BOLD, fontSize: '14px',
              background: tab === t ? '#000' : '#FFF', color: tab === t ? '#FFF' : '#000',
              cursor: 'pointer', textTransform: 'uppercase'
            }}>
              {t}
            </button>
          ))}
        </div>

        {/* PROFILE TAB */}
        {tab === 'profile' && (
          <div style={{ display: 'grid', gap: '20px' }}>
            <Section title="1. Institution Details">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '10px', ...BOLD }}>INSTITUTION NAME</label>
                  <input type="text" value={prof.name} onChange={e => setProf({ ...prof, name: e.target.value })} style={IS} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '10px', ...BOLD }}>HORIZON (YEARS)</label>
                  <input type="number" value={prof.horizon} onChange={e => setProf({ ...prof, horizon: +e.target.value })} style={IS} />
                </div>
              </div>
            </Section>
            <button onClick={() => setTab('pricing')} style={{ padding: '25px', background: '#000', color: '#FFF', border: 'none', ...BOLD, fontSize: '18px', cursor: 'pointer' }}>
              NEXT: VENDOR PRICING →
            </button>
          </div>
        )}

        {/* RESULTS TAB */}
        {tab === 'results' && results && (
          <Section title="Final Budgetary Comparison">
            <Tb 
              hd={['Category', 'Workday', 'Oracle', 'Ellucian']} 
              hl 
              rows={[
                ['Subscription', $(results.Workday.sub), $(results.Oracle.sub), $(results.Ellucian.sub)],
                ['Implementation', $(results.Workday.impl), $(results.Oracle.impl), $(results.Ellucian.impl)],
                ['10-YEAR TOTAL', $(results.Workday.total), $(results.Oracle.total), $(results.Ellucian.total)],
              ]} 
            />
          </Section>
        )}

        {/* PRICING TAB PLACEHOLDER */}
        {tab === 'pricing' && (
          <div style={{ textAlign: 'center' }}>
            <Section title="Pricing Controls">
              <p style={{ ...BOLD, fontSize: '20px' }}>READY TO CALCULATE BASED ON JMU SCALING.</p>
              <button onClick={generate} style={{ marginTop: '20px', padding: '25px 50px', background: '#166534', color: '#FFF', border: '4px solid #000', ...BOLD, fontSize: '24px', cursor: 'pointer' }}>
                RUN ESTIMATE NOW
              </button>
            </Section>
          </div>
        )}

      </div>
    </div>
  );
}