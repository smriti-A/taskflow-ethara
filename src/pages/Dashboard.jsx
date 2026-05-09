import { S, C, badge } from '../styles/theme'
import StatCard from '../components/StatCard'
import { isOverdue, fmt } from '../utils/helpers'
import { STATUSES } from '../utils/seed'

// Animated progress bar
function NeonBar({ pct, color = 'var(--green)' }) {
  return (
    <div style={{ height: 6, background: '#001000', borderRadius: 0, overflow: 'hidden', border: '1px solid #002200' }}>
      <div style={{
        height: '100%', width: `${pct}%`,
        background: `linear-gradient(90deg, ${color}88, ${color})`,
        boxShadow: `0 0 8px ${color}`,
        transition: 'width 0.6s ease',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 3, background: color, boxShadow: `0 0 6px ${color}` }} />
      </div>
    </div>
  )
}

export default function Dashboard({ user, projects, tasks }) {
  const myProjects = projects.filter((p) => p.members.includes(user.id))
  const myTasks    = tasks.filter((t) => t.assigneeId === user.id)
  const overdue    = myTasks.filter((t) => t.status !== 'Done' && isOverdue(t.dueDate))

  const statusColors = {
    'Todo': '#00cc33', 'In Progress': '#00ffcc', 'Done': '#00ff41', 'Blocked': '#ff0040'
  }
  const statusCounts = STATUSES.map((s) => ({
    s, n: myTasks.filter((t) => t.status === s).length, color: statusColors[s]
  }))

  const recentTasks = [...tasks]
    .filter((t) => projects.find((p) => p.id === t.projectId)?.members.includes(user.id))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6)

  return (
    <div className="animate-in">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: C.monoFont, fontSize: 11, color: C.textDim, letterSpacing: '0.15em', marginBottom: 4 }}>
          OPERATOR: {user.name.toUpperCase()} // {user.role.toUpperCase()}
        </div>
        <div style={S.h1}>SYSTEM_DASHBOARD</div>
        <div style={{ height: 1, background: 'linear-gradient(90deg, var(--green), transparent)', marginTop: 8, maxWidth: 300 }} />
      </div>

      {/* Stats */}
      <div style={{ ...S.grid4, marginBottom: 24 }}>
        <StatCard icon="⬡" label="ACTIVE_PROJECTS"  value={myProjects.length} color="var(--green)" />
        <StatCard icon="◈" label="TOTAL_TASKS"       value={myTasks.length}    color="var(--cyan)"  />
        <StatCard icon="◉" label="IN_PROGRESS"       value={myTasks.filter((t) => t.status === 'In Progress').length} color="#a78bfa" />
        <StatCard icon="⚠" label="CRITICAL_OVERDUE"  value={overdue.length}    color="var(--red)"   />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Status bars */}
        <div style={S.cardGlow}>
          <div style={S.h2}>// TASK_STATUS_MATRIX</div>
          {statusCounts.map(({ s, n, color }) => (
            <div key={s} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={badge.status(s)}>{s}</span>
                <span style={{ fontFamily: C.monoFont, fontSize: 12, color }}>{n} / {myTasks.length}</span>
              </div>
              <NeonBar pct={myTasks.length ? (n / myTasks.length) * 100 : 0} color={color} />
            </div>
          ))}
          {myTasks.length === 0 && <div style={{ ...S.sub, fontSize: 12 }}>NO_TASKS_ASSIGNED</div>}
        </div>

        {/* Overdue */}
        <div style={S.cardGlow}>
          <div style={S.h2}>// CRITICAL_ALERTS</div>
          {overdue.length === 0 ? (
            <div style={{ fontFamily: C.monoFont, fontSize: 13, color: C.green }}>
              ✓ STATUS: ALL_SYSTEMS_NOMINAL
            </div>
          ) : overdue.slice(0, 4).map((t) => (
            <div key={t.id} style={{
              marginBottom: 10, padding: '8px 12px',
              background: 'rgba(255,0,64,0.05)',
              border: '1px solid rgba(255,0,64,0.2)',
              borderLeft: '3px solid var(--red)',
              borderRadius: 2,
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.white, fontFamily: C.monoFont }}>{t.title}</div>
              <div style={{ fontSize: 11, color: C.red, marginTop: 2, fontFamily: C.monoFont }}>OVERDUE: {fmt(t.dueDate)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div style={S.cardGlow}>
        <div style={S.h2}>// RECENT_ACTIVITY_LOG</div>
        {recentTasks.length === 0
          ? <div style={{ ...S.sub, fontSize: 12 }}>NO_ACTIVITY_RECORDED</div>
          : recentTasks.map((t, i) => {
              const proj = projects.find((p) => p.id === t.projectId)
              const od   = t.status !== 'Done' && isOverdue(t.dueDate)
              return (
                <div key={t.id} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '10px 0',
                  borderBottom: i < recentTasks.length - 1 ? '1px solid rgba(0,255,65,0.06)' : 'none',
                  animation: `fadeIn 0.3s ${i * 0.05}s ease backwards`,
                }}>
                  <span style={badge.status(t.status)}>{t.status}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: C.white, fontWeight: 600, fontFamily: C.monoFont }}>{t.title}</div>
                    <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>PROJECT: {proj?.name}</div>
                  </div>
                  {t.dueDate && (
                    <div style={{ fontSize: 11, color: od ? C.red : C.textDim, fontFamily: C.monoFont, flexShrink: 0 }}>
                      {od ? '⚠ ' : ''}{fmt(t.dueDate)}
                    </div>
                  )}
                </div>
              )
            })
        }
      </div>
    </div>
  )
}
