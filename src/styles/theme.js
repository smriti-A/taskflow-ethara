// ── CYBERPUNK MATRIX THEME ──────────────────────────────────────────────────

export const C = {
  bg:        'var(--bg)',
  surface:   'var(--surface)',
  surface2:  'var(--surface2)',
  border:    'var(--border)',
  border2:   'var(--border2)',
  green:     'var(--green)',
  green2:    'var(--green2)',
  green3:    'var(--green3)',
  cyan:      'var(--cyan)',
  pink:      'var(--pink)',
  yellow:    'var(--yellow)',
  text:      'var(--text)',
  textDim:   'var(--text-dim)',
  bright:    'var(--text-bright)',
  white:     'var(--white)',
  red:       'var(--red)',
  monoFont:  'var(--font-mono)',
  uiFont:    'var(--font-ui)',
  titleFont: 'var(--font-title)',
}

// Neon box shadow helpers
export const glow = {
  green:  '0 0 8px var(--green), 0 0 20px var(--green2), inset 0 0 8px rgba(0,255,65,0.05)',
  greenSm:'0 0 4px var(--green), 0 0 10px var(--green2)',
  cyan:   '0 0 8px var(--cyan), 0 0 20px rgba(0,255,204,0.3)',
  pink:   '0 0 8px var(--pink), 0 0 20px rgba(255,0,110,0.3)',
  red:    '0 0 8px var(--red),  0 0 20px rgba(255,0,64,0.3)',
  none:   'none',
}

// Status badge styles
export const badge = {
  status: (s) => {
    const map = {
      'Todo':        { bg: '#001a00', col: '#00cc33',  border: '#003300', glow_: 'none' },
      'In Progress': { bg: '#001a1a', col: '#00ffcc',  border: '#003333', glow_: '0 0 6px rgba(0,255,204,0.4)' },
      'Done':        { bg: '#001a00', col: '#00ff41',  border: '#00ff4144', glow_: '0 0 6px rgba(0,255,65,0.5)' },
      'Blocked':     { bg: '#1a0000', col: '#ff0040',  border: '#33000044', glow_: '0 0 6px rgba(255,0,64,0.5)' },
    }
    const { bg, col, border, glow_ } = map[s] || map['Todo']
    return {
      background: bg, color: col,
      border: `1px solid ${border}`,
      boxShadow: glow_,
      padding: '2px 10px', borderRadius: 2,
      fontSize: 11, fontWeight: 600,
      fontFamily: 'var(--font-mono)',
      letterSpacing: '0.05em',
      display: 'inline-block',
      textTransform: 'uppercase',
    }
  },
  role: (r) => ({
    background: r === 'Admin' ? '#1a0010' : '#001a00',
    color:      r === 'Admin' ? '#ff006e' : '#00ff41',
    border:     `1px solid ${r === 'Admin' ? '#33001a' : '#003300'}`,
    boxShadow:  r === 'Admin' ? '0 0 6px rgba(255,0,110,0.4)' : '0 0 6px rgba(0,255,65,0.3)',
    padding: '2px 10px', borderRadius: 2,
    fontSize: 11, fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase', letterSpacing: '0.08em',
  }),
  overdue: {
    background: '#1a0000', color: '#ff0040',
    border: '1px solid #33000066',
    boxShadow: '0 0 6px rgba(255,0,64,0.5)',
    padding: '2px 8px', borderRadius: 2,
    fontSize: 10, fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase', letterSpacing: '0.1em',
  },
}

// ── Core style objects ───────────────────────────────────────────────────────
export const S = {
  app:    { fontFamily: C.uiFont, minHeight: '100vh', background: C.bg, color: C.text, position: 'relative', zIndex: 1 },
  layout: { display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 1 },

  // Sidebar
  sidebar: {
    width: 250, flexShrink: 0,
    background: 'linear-gradient(180deg, #001500 0%, #000a00 100%)',
    borderRight: '1px solid var(--border2)',
    boxShadow: '4px 0 20px rgba(0,255,65,0.08)',
    display: 'flex', flexDirection: 'column',
    padding: '1.5rem 1rem', gap: 2,
    position: 'relative',
  },
  sideTitle: {
    fontFamily: C.titleFont,
    fontSize: 16, fontWeight: 900, letterSpacing: '0.15em',
    color: C.green, textTransform: 'uppercase',
    padding: '0 8px 16px',
    borderBottom: '1px solid var(--border2)',
    marginBottom: 8,
    textShadow: '0 0 10px var(--green), 0 0 30px var(--green2)',
  },
  navItem: (active) => ({
    padding: '10px 12px', borderRadius: 2, cursor: 'pointer',
    fontFamily: C.uiFont, fontSize: 14, fontWeight: active ? 700 : 500,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    background:  active ? 'rgba(0,255,65,0.08)' : 'transparent',
    color:       active ? C.green : C.text,
    border:      active ? '1px solid var(--border2)' : '1px solid transparent',
    boxShadow:   active ? glow.greenSm : 'none',
    display: 'flex', alignItems: 'center', gap: 10,
    transition: 'all 0.15s ease',
    position: 'relative',
  }),

  // Main content
  main: { flex: 1, padding: '2rem', overflow: 'auto', minHeight: '100vh', position: 'relative', zIndex: 1 },

  // Cards — cyberpunk bordered panels
  card: {
    background: 'linear-gradient(135deg, #001500 0%, #000d00 100%)',
    borderRadius: 2,
    padding: '1.25rem',
    border: '1px solid var(--border)',
    position: 'relative',
    overflow: 'hidden',
  },
  cardGlow: {
    background: 'linear-gradient(135deg, #001a00 0%, #000f00 100%)',
    borderRadius: 2, padding: '1.25rem',
    border: '1px solid var(--border2)',
    boxShadow: '0 0 15px rgba(0,255,65,0.07)',
    position: 'relative', overflow: 'hidden',
  },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 16 },
  grid4: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 14 },

  // Typography
  h1: {
    fontFamily: C.titleFont, fontSize: 22, fontWeight: 900,
    color: C.green, letterSpacing: '0.12em', textTransform: 'uppercase',
    textShadow: '0 0 10px var(--green), 0 0 30px var(--green2)',
    marginBottom: 4,
  },
  h2: {
    fontFamily: C.uiFont, fontSize: 15, fontWeight: 700,
    color: C.bright, letterSpacing: '0.1em', textTransform: 'uppercase',
    marginBottom: 14,
    borderLeft: '3px solid var(--green)',
    paddingLeft: 8,
  },
  sub:  { color: C.textDim, fontSize: 13, fontFamily: C.monoFont, letterSpacing: '0.05em' },
  tag:  {
    background: 'rgba(0,255,65,0.05)',
    color: C.textDim, border: '1px solid var(--border)',
    padding: '2px 8px', borderRadius: 2, fontSize: 11,
    fontFamily: C.monoFont,
  },

  // Forms
  label: {
    display: 'block', fontSize: 12, fontWeight: 600,
    color: C.green2, marginBottom: 5,
    fontFamily: C.monoFont, textTransform: 'uppercase', letterSpacing: '0.1em',
  },
  input: {
    width: '100%', padding: '9px 12px',
    borderRadius: 2, border: '1px solid var(--border)',
    background: '#000d00', color: C.bright,
    fontSize: 13, fontFamily: C.monoFont,
    boxSizing: 'border-box', outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    letterSpacing: '0.03em',
  },

  // Buttons
  btn: {
    width: '100%', padding: '11px', borderRadius: 2,
    border: '1px solid var(--green)',
    background: 'transparent',
    color: C.green, fontWeight: 700,
    fontFamily: C.uiFont, fontSize: 14, cursor: 'pointer',
    letterSpacing: '0.15em', textTransform: 'uppercase',
    boxShadow: glow.greenSm,
    transition: 'all 0.2s',
  },
  btnSm: {
    padding: '7px 16px', borderRadius: 2,
    border: '1px solid var(--green)',
    background: 'rgba(0,255,65,0.08)',
    color: C.green, fontWeight: 700,
    fontFamily: C.uiFont, fontSize: 12, cursor: 'pointer',
    letterSpacing: '0.12em', textTransform: 'uppercase',
    boxShadow: glow.greenSm, transition: 'all 0.15s',
  },
  btnOutline: {
    padding: '7px 16px', borderRadius: 2,
    border: '1px solid var(--border)',
    background: 'transparent',
    color: C.text, fontWeight: 600,
    fontFamily: C.uiFont, fontSize: 12, cursor: 'pointer',
    letterSpacing: '0.08em', textTransform: 'uppercase',
    transition: 'all 0.15s',
  },
  btnDanger: {
    padding: '6px 12px', borderRadius: 2,
    border: '1px solid var(--red)',
    background: 'rgba(255,0,64,0.08)',
    color: C.red, fontWeight: 700,
    fontFamily: C.uiFont, fontSize: 12, cursor: 'pointer',
    letterSpacing: '0.1em', textTransform: 'uppercase',
    boxShadow: '0 0 6px rgba(255,0,64,0.3)',
    transition: 'all 0.15s',
  },

  // Utility
  row:          { display: 'flex', alignItems: 'center', gap: 10 },
  spaceBetween: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  error: {
    background: 'rgba(255,0,64,0.08)',
    border: '1px solid rgba(255,0,64,0.4)',
    color: C.red, padding: '10px 14px',
    borderRadius: 2, fontSize: 13,
    fontFamily: C.monoFont, marginBottom: 16,
    boxShadow: '0 0 10px rgba(255,0,64,0.2)',
  },

  // Modal
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,5,0,0.85)',
    backdropFilter: 'blur(4px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'linear-gradient(135deg, #001a00 0%, #000d00 100%)',
    borderRadius: 2, padding: '2rem', width: 490, maxWidth: '95vw',
    border: '1px solid var(--border2)',
    boxShadow: '0 0 40px rgba(0,255,65,0.15), 0 0 80px rgba(0,255,65,0.05)',
    maxHeight: '90vh', overflowY: 'auto',
  },
}
