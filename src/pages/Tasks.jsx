import { useState } from 'react'
import { S, C, badge } from '../styles/theme'
import Modal from '../components/Modal'
import { genId, now, save, fmt, isOverdue } from '../utils/helpers'
import { STATUSES } from '../utils/seed'

export default function Tasks({ user, tasks, setTasks, projects, users }) {
  const [modal,    setModal]    = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [filterProject,  setFP] = useState('all')
  const [filterStatus,   setFS] = useState('all')
  const [filterAssignee, setFA] = useState('all')
  const [form, setForm] = useState({ title:'', description:'', status:'Todo', assigneeId:user.id, projectId:'', dueDate:'' })
  const [err,  setErr]  = useState('')

  const myProjects = user.role === 'Admin' ? projects : projects.filter((p) => p.members.includes(user.id))

  const visible = tasks.filter((t) => {
    const proj = projects.find((p) => p.id === t.projectId)
    if (!proj) return false
    if (!proj.members.includes(user.id) && user.role !== 'Admin') return false
    if (filterProject  !== 'all' && t.projectId  !== filterProject)  return false
    if (filterStatus   !== 'all' && t.status     !== filterStatus)   return false
    if (filterAssignee !== 'all' && t.assigneeId !== filterAssignee) return false
    return true
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const openCreate = () => {
    setEditTask(null)
    setForm({ title:'', description:'', status:'Todo', assigneeId:user.id, projectId:myProjects[0]?.id||'', dueDate:'' })
    setErr(''); setModal(true)
  }
  const openEdit = (t) => {
    setEditTask(t)
    setForm({ title:t.title, description:t.description, status:t.status, assigneeId:t.assigneeId, projectId:t.projectId, dueDate:t.dueDate||'' })
    setErr(''); setModal(true)
  }
  const saveTask = () => {
    if (!form.title.trim()) return setErr('ERROR: Title is required.')
    if (!form.projectId)    return setErr('ERROR: Select a project.')
    const updated = editTask
      ? tasks.map((t) => t.id === editTask.id ? { ...t, ...form } : t)
      : [...tasks, { id:genId(), ...form, createdAt:now() }]
    setTasks(updated); save('pm_tasks', updated); setModal(false); setErr('')
  }
  const deleteTask = (id) => {
    if (!window.confirm('CONFIRM: Delete task?')) return
    const updated = tasks.filter((t) => t.id !== id)
    setTasks(updated); save('pm_tasks', updated)
  }
  const quickStatus = (task, status) => {
    const updated = tasks.map((t) => t.id === task.id ? { ...t, status } : t)
    setTasks(updated); save('pm_tasks', updated)
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const sel = { ...S.input, background: '#000a00', marginBottom: 14 }
  const filterSel = { ...S.input, width: 'auto', padding: '7px 12px', background: '#001000', fontSize: 12, fontFamily: C.monoFont }

  return (
    <div className="animate-in">
      <div style={{ ...S.spaceBetween, marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: C.monoFont, fontSize: 11, color: C.textDim, letterSpacing: '0.15em', marginBottom: 4 }}>
            FOUND: {visible.length}_TASKS
          </div>
          <div style={S.h1}>TASK_QUEUE</div>
          <div style={{ height: 1, background: 'linear-gradient(90deg, var(--cyan), transparent)', marginTop: 8, maxWidth: 300 }} />
        </div>
        <button style={{ ...S.btnSm, borderColor: 'var(--cyan)', color: 'var(--cyan)', boxShadow: '0 0 8px rgba(0,255,204,0.3)' }} onClick={openCreate}>
          + SPAWN_TASK
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap', padding: '10px 12px', background: 'rgba(0,255,65,0.03)', border: '1px solid var(--border)', borderRadius: 2 }}>
        <span style={{ fontFamily: C.monoFont, fontSize: 11, color: C.textDim, alignSelf: 'center', marginRight: 4 }}>FILTER //</span>
        {[
          { val: filterProject,  set: setFP, opts: myProjects.map((p) => ({ v:p.id, l:p.name.toUpperCase() })),   ph:'ALL_PROJECTS' },
          { val: filterStatus,   set: setFS, opts: STATUSES.map((s)   => ({ v:s,    l:s.toUpperCase().replace(' ','_') })), ph:'ALL_STATUS' },
          { val: filterAssignee, set: setFA, opts: users.map((u)      => ({ v:u.id, l:u.name.split(' ')[0].toUpperCase() })), ph:'ALL_OPS' },
        ].map((f, i) => (
          <select key={i} style={filterSel} value={f.val} onChange={(e) => f.set(e.target.value)}>
            <option value="all">{f.ph}</option>
            {f.opts.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
        ))}
      </div>

      {/* Task list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {visible.map((t, i) => {
          const proj     = projects.find((p) => p.id === t.projectId)
          const assignee = users.find((u) => u.id === t.assigneeId)
          const od       = t.status !== 'Done' && isOverdue(t.dueDate)
          const canEdit  = user.role === 'Admin' || t.assigneeId === user.id

          return (
            <div key={t.id} style={{
              ...S.cardGlow,
              borderLeft: `3px solid ${od ? 'var(--red)' : t.status === 'Done' ? 'var(--green)' : t.status === 'In Progress' ? 'var(--cyan)' : 'var(--border)'}`,
              display: 'flex', alignItems: 'flex-start', gap: 14,
              animation: `fadeIn 0.25s ${i * 0.04}s ease backwards`,
              padding: '1rem 1.2rem',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                  <span style={{ fontFamily: C.monoFont, fontWeight: 700, color: C.white, fontSize: 14 }}>{t.title}</span>
                  <span style={badge.status(t.status)}>{t.status}</span>
                  {od && <span style={badge.overdue}>⚠ OVERDUE</span>}
                </div>
                {t.description && (
                  <div style={{ fontFamily: C.monoFont, fontSize: 12, color: C.textDim, marginBottom: 8, lineHeight: 1.5 }}>
                    // {t.description}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={S.tag}>PROJECT: {proj?.name}</span>
                  <span style={S.tag}>OP: {assignee?.name?.split(' ')[0]}</span>
                  {t.dueDate && <span style={{ ...S.tag, color: od ? C.red : C.textDim, borderColor: od ? 'rgba(255,0,64,0.3)' : undefined }}>DUE: {fmt(t.dueDate)}</span>}
                </div>
                {canEdit && (
                  <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    {STATUSES.filter((s) => s !== t.status).map((s) => (
                      <button key={s} onClick={() => quickStatus(t, s)} style={{ ...S.btnOutline, padding: '2px 9px', fontSize: 10, letterSpacing: '0.08em' }}>
                        → {s.toUpperCase().replace(' ', '_')}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {canEdit && (
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <button style={S.btnOutline} onClick={() => openEdit(t)}>EDIT</button>
                  <button style={S.btnDanger}  onClick={() => deleteTask(t.id)}>DEL</button>
                </div>
              )}
            </div>
          )
        })}
        {visible.length === 0 && (
          <div style={{ ...S.card, fontFamily: C.monoFont, color: C.textDim, fontSize: 13 }}>
            // NO_TASKS_MATCH_FILTER_CRITERIA
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <Modal title={editTask ? 'MODIFY_TASK' : 'SPAWN_TASK'} onClose={() => { setModal(false); setErr('') }}>
          {err && <div style={S.error}>{err}</div>}
          <label style={S.label}>// TASK_TITLE *</label>
          <input style={sel} placeholder="task_identifier" value={form.title} onChange={set('title')} />
          <label style={S.label}>// DESCRIPTION</label>
          <textarea style={{ ...sel, resize:'vertical', minHeight:70 }} placeholder="// mission_details..." value={form.description} onChange={set('description')} />
          <label style={S.label}>// PROJECT *</label>
          <select style={sel} value={form.projectId} onChange={set('projectId')}>
            <option value="">— SELECT_PROJECT —</option>
            {myProjects.map((p) => <option key={p.id} value={p.id}>{p.name.toUpperCase()}</option>)}
          </select>
          <label style={S.label}>// STATUS</label>
          <select style={sel} value={form.status} onChange={set('status')}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <label style={S.label}>// ASSIGNED_OPERATOR</label>
          <select style={sel} value={form.assigneeId} onChange={set('assigneeId')}>
            {users.map((u) => <option key={u.id} value={u.id}>{u.name.toUpperCase()} [{u.role.toUpperCase()}]</option>)}
          </select>
          <label style={S.label}>// DEADLINE</label>
          <input type="date" style={{ ...sel, marginBottom: 22 }} value={form.dueDate} onChange={set('dueDate')} />
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ ...S.btnSm, flex:1, padding:11 }} onClick={saveTask}>[ {editTask ? 'UPDATE' : 'DEPLOY'} ]</button>
            <button style={{ ...S.btnOutline, flex:1, padding:11 }} onClick={() => { setModal(false); setErr('') }}>[ ABORT ]</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
