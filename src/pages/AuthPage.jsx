import { useState, useEffect, useRef } from 'react'
import { S, C, glow } from '../styles/theme'
import { genId, save } from '../utils/helpers'

// Animated matrix rain characters in background
function MatrixRain() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const cols = Math.floor(canvas.width / 18)
    const drops = Array(cols).fill(1)
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ'
    let frame
    const draw = () => {
      ctx.fillStyle = 'rgba(0,10,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00ff41'
      ctx.font = '14px Share Tech Mono, monospace'
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.globalAlpha = Math.random() * 0.5 + 0.1
        ctx.fillText(char, i * 18, y * 18)
        ctx.globalAlpha = 1
        if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
      frame = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(frame)
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, opacity: 0.18, zIndex: 0, pointerEvents: 'none' }} />
}

export default function AuthPage({ users, setUsers, onLogin }) {
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Member' })
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const inp = {
    ...S.input, marginBottom: 14,
    background: '#000a00',
    borderColor: 'var(--border2)',
  }

  const handleLogin = () => {
    setBusy(true)
    setTimeout(() => {
      const u = users.find((x) => x.email === form.email && x.password === form.password)
      if (!u) { setErr('ACCESS_DENIED: Invalid credentials.'); setBusy(false); return }
      onLogin(u)
    }, 400)
  }

  const handleSignup = () => {
    if (!form.name || !form.email || !form.password) return setErr('ERROR: All fields required.')
    if (users.find((x) => x.email === form.email)) return setErr('ERROR: Email already registered.')
    const u = { id: genId(), name: form.name, email: form.email, password: form.password, role: form.role }
    const updated = [...users, u]
    setUsers(updated); save('pm_users', updated); onLogin(u)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <MatrixRain />

      <div style={{
        position: 'relative', zIndex: 2,
        background: 'rgba(0,15,0,0.95)',
        border: '1px solid var(--border2)',
        borderRadius: 2, padding: '2.5rem', width: 400,
        boxShadow: '0 0 40px rgba(0,255,65,0.15), 0 0 80px rgba(0,255,65,0.05)',
        backdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.4s ease',
      }}>
        {/* Corner brackets */}
        {[['top:0,left:0', 'borderTop,borderLeft'], ['top:0,right:0', 'borderTop,borderRight'],
        ['bottom:0,left:0', 'borderBottom,borderLeft'], ['bottom:0,right:0', 'borderBottom,borderRight']
        ].map(([pos, borders], i) => {
          const p = Object.fromEntries(pos.split(',').map(s => s.split(':')))
          const b = Object.fromEntries(borders.split(',').map(s => [s, '2px solid var(--green)']))
          return <div key={i} style={{ position: 'absolute', width: 16, height: 16, ...p, ...b }} />
        })}

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontFamily: C.titleFont, fontSize: 28, fontWeight: 900, color: C.green, letterSpacing: '0.2em', textTransform: 'uppercase', textShadow: '0 0 15px var(--green), 0 0 40px var(--green2)' }}>
            TASKFLOW
          </div>
          <div style={{ fontFamily: C.monoFont, fontSize: 11, color: C.textDim, letterSpacing: '0.2em', marginTop: 4 }}>
            PROJECT_MANAGEMENT_SYSTEM v2.0
          </div>
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--green), transparent)', marginTop: 16 }} />
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 22, border: '1px solid var(--border)', borderRadius: 2 }}>
          {['login', 'signup'].map((t, i) => (
            <button key={t} onClick={() => { setTab(t); setErr('') }} style={{
              flex: 1, padding: '9px', border: 'none', borderRight: i === 0 ? '1px solid var(--border)' : 'none',
              background: tab === t ? 'rgba(0,255,65,0.1)' : 'transparent',
              color: tab === t ? C.green : C.textDim,
              fontFamily: C.uiFont, fontWeight: 700, cursor: 'pointer', fontSize: 13,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              boxShadow: tab === t ? 'inset 0 0 10px rgba(0,255,65,0.1)' : 'none',
              transition: 'all 0.15s',
            }}>
              {t === 'login' ? '[ LOGIN ]' : '[ REGISTER ]'}
            </button>
          ))}
        </div>

        {err && (
          <div style={{ ...S.error, fontFamily: C.monoFont, fontSize: 12, marginBottom: 14 }}>
            ⚠ {err}
          </div>
        )}

        {tab === 'signup' && (
          <><label style={S.label}>// OPERATOR_NAME</label>
            <input style={inp} placeholder="Your name" value={form.name} onChange={set('name')} /></>
        )}

        <label style={S.label}>// EMAIL_ADDRESS</label>
        <input style={inp} placeholder="operator@matrix.net" value={form.email} onChange={set('email')} />

        <label style={S.label}>// ACCESS_KEY</label>
        <input style={inp} type="password" placeholder="••••••••" value={form.password} onChange={set('password')} />

        {tab === 'signup' && (
          <><label style={S.label}>// CLEARANCE_LEVEL</label>
            <select style={{ ...inp, background: '#000a00' }} value={form.role} onChange={set('role')}>
              <option>Member</option><option>Admin</option>
            </select></>
        )}

        <button
          style={{ ...S.btn, marginTop: 4, fontSize: 13, letterSpacing: '0.2em', opacity: busy ? 0.6 : 1 }}
          onClick={tab === 'login' ? handleLogin : handleSignup}
          disabled={busy}
        >
          {busy ? '[ AUTHENTICATING... ]' : tab === 'login' ? '[ ENTER SYSTEM ]' : '[ CREATE OPERATOR ]'}
        </button>

        <div style={{ textAlign: 'center', marginTop: 14, fontFamily: C.monoFont, fontSize: 11, color: C.textDim }}>
          DEMO // alice@demo.com : demo123
        </div>
      </div>
    </div>
  )
}
