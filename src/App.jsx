import { useState } from 'react'
import { S, C, badge } from './styles/theme'
import { load, save } from './utils/helpers'
import { SEED_USERS, SEED_PROJECTS, SEED_TASKS } from './utils/seed'
import AuthPage  from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import Projects  from './pages/Projects'
import Tasks     from './pages/Tasks'
import Team      from './pages/Team'
import Avatar    from './components/Avatar'

const NAV = [
  { id: 'dashboard', icon: '⬡', label: 'DASHBOARD'  },
  { id: 'projects',  icon: '◈', label: 'PROJECTS'   },
  { id: 'tasks',     icon: '◉', label: 'TASK_QUEUE'  },
  { id: 'team',      icon: '◆', label: 'OPERATORS'   },
]

// Animated blinking cursor
function Cursor() {
  return (
    <span style={{
      display: 'inline-block', width: 8, height: 14,
      background: 'var(--green)', marginLeft: 4,
      animation: 'neon-pulse 1s step-end infinite',
      verticalAlign: 'middle',
    }} />
  )
}

// Sidebar corner decoration line
function SideAccent() {
  return (
    <div style={{
      position: 'absolute', top: 0, right: 0, bottom: 0, width: 1,
      background: 'linear-gradient(180deg, transparent, var(--green2), var(--green-dim), transparent)',
      opacity: 0.4,
    }} />
  )
}

export default function App() {
  const [users,    setUsers]    = useState(() => load('pm_users',    SEED_USERS))
  const [projects, setProjects] = useState(() => load('pm_projects', SEED_PROJECTS))
  const [tasks,    setTasks]    = useState(() => load('pm_tasks',    SEED_TASKS))
  const [user,     setUser]     = useState(null)
  const [page,     setPage]     = useState('dashboard')

  if (!user) return <AuthPage users={users} setUsers={setUsers} onLogin={setUser} />

  const overdueMine = tasks.filter(
    (t) => t.assigneeId === user.id && t.status !== 'Done' && t.dueDate && new Date(t.dueDate) < new Date()
  )

  const props = { user, users, setUsers, projects, setProjects, tasks, setTasks }

  return (
    <div style={S.app}>
      <div style={S.layout}>

        {/* ── SIDEBAR ── */}
        <aside style={S.sidebar}>
          <SideAccent />

          {/* Logo */}
          <div style={{ padding: '0 8px 20px', borderBottom: '1px solid var(--border2)', marginBottom: 10 }}>
            <div style={{
              fontFamily: C.titleFont, fontSize: 15, fontWeight: 900,
              color: C.green, letterSpacing: '0.18em', textTransform: 'uppercase',
              textShadow: '0 0 10px var(--green), 0 0 30px var(--green2)',
            }}>
              TASK<span style={{ color: C.cyan }}>FLOW</span>
              <Cursor />
            </div>
            <div style={{ fontFamily: C.monoFont, fontSize: 9, color: C.textDim, letterSpacing: '0.15em', marginTop: 4 }}>
              SYSTEM_v2.0 // {user.role.toUpperCase()}
            </div>
          </div>

          {/* Nav items */}
          {NAV.map((n) => (
            <div
              key={n.id}
              className={page === n.id ? 'flicker' : ''}
              style={{
                ...S.navItem(page === n.id),
                position: 'relative',
              }}
              onClick={() => setPage(n.id)}
            >
              {/* Active left bar */}
              {page === n.id && (
                <div style={{
                  position: 'absolute', left: 0, top: 4, bottom: 4,
                  width: 2, background: C.green,
                  boxShadow: '0 0 8px var(--green)',
                  borderRadius: 2,
                }} />
              )}
              <span style={{ fontSize: 14, marginLeft: page === n.id ? 4 : 0, transition: 'margin 0.15s' }}>{n.icon}</span>
              <span style={{ letterSpacing: '0.1em' }}>{n.label}</span>
              {n.id === 'tasks' && overdueMine.length > 0 && (
                <span style={{
                  marginLeft: 'auto',
                  background: 'rgba(255,0,64,0.15)',
                  color: C.red, border: '1px solid rgba(255,0,64,0.4)',
                  borderRadius: 2, fontSize: 10, padding: '1px 6px',
                  fontFamily: C.monoFont, fontWeight: 700,
                  boxShadow: '0 0 6px rgba(255,0,64,0.4)',
                }}>
                  {overdueMine.length}
                </span>
              )}
            </div>
          ))}

          {/* System status */}
          <div style={{
            marginTop: 'auto',
            padding: '10px 8px',
            border: '1px solid var(--border)',
            borderRadius: 2,
            background: 'rgba(0,255,65,0.03)',
            marginBottom: 10,
          }}>
            <div style={{ fontFamily: C.monoFont, fontSize: 9, color: C.textDim, letterSpacing: '0.12em', marginBottom: 6 }}>
              // SYS_STATUS
            </div>
            {[
              { lbl: 'PROJECTS', val: projects.filter((p) => p.members.includes(user.id)).length },
              { lbl: 'MY_TASKS', val: tasks.filter((t) => t.assigneeId === user.id).length },
              { lbl: 'CRITICAL', val: overdueMine.length, danger: true },
            ].map((s) => (
              <div key={s.lbl} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontFamily: C.monoFont, fontSize: 10, color: C.textDim, letterSpacing: '0.08em' }}>{s.lbl}</span>
                <span style={{ fontFamily: C.monoFont, fontSize: 10, color: s.danger && s.val > 0 ? C.red : C.green, fontWeight: 700 }}>
                  {String(s.val).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>

          {/* User footer */}
          <div style={{ padding: '12px 8px 0', borderTop: '1px solid var(--border2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <Avatar name={user.name} size={36} />
              <div style={{ overflow: 'hidden', flex: 1 }}>
                <div style={{ fontFamily: C.monoFont, fontSize: 12, fontWeight: 700, color: C.white, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user.name.split(' ')[0].toUpperCase()}
                </div>
                <span style={badge.role(user.role)}>{user.role}</span>
              </div>
            </div>
            <button
              style={{ ...S.btnOutline, width: '100%', fontSize: 11, letterSpacing: '0.12em' }}
              onClick={() => { setUser(null); setPage('dashboard') }}
            >
              [ DISCONNECT ]
            </button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main style={S.main}>
          {/* Top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 28, paddingBottom: 14,
            borderBottom: '1px solid var(--border)',
          }}>
            <div style={{ fontFamily: C.monoFont, fontSize: 11, color: C.textDim, letterSpacing: '0.1em' }}>
              {'>>'} {NAV.find((n) => n.id === page)?.label}_MODULE
            </div>
            <div style={{ fontFamily: C.monoFont, fontSize: 10, color: C.textDim, letterSpacing: '0.08em' }}>
              {new Date().toLocaleString('en-IN', { hour12: false }).toUpperCase()}
            </div>
          </div>

          {/* Page content */}
          {page === 'dashboard' && <Dashboard {...props} />}
          {page === 'projects'  && <Projects  {...props} />}
          {page === 'tasks'     && <Tasks     {...props} />}
          {page === 'team'      && <Team      {...props} />}
        </main>
      </div>
    </div>
  )
}
