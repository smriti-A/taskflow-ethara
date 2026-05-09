import { useState } from 'react'
import { S, C, badge } from '../styles/theme'
import Modal from '../components/Modal'
import Avatar from '../components/Avatar'
import { genId, now, save, fmt } from '../utils/helpers'

export default function Projects({ user, projects, setProjects, users, tasks }) {
  const [modal, setModal]           = useState(false)
  const [addMemberModal, setAddMemberModal] = useState(null)
  const [form, setForm]             = useState({ name: '', description: '' })
  const [err, setErr]               = useState('')

  const myProjects = user.role === 'Admin' ? projects : projects.filter((p) => p.members.includes(user.id))

  const createProject = () => {
    if (!form.name.trim()) return setErr('ERROR: Project name is required.')
    const p = { id: genId(), name: form.name, description: form.description, ownerId: user.id, members: [user.id], createdAt: now() }
    const updated = [...projects, p]
    setProjects(updated); save('pm_projects', updated)
    setModal(false); setForm({ name: '', description: '' }); setErr('')
  }

  const deleteProject = (id) => {
    if (!window.confirm('CONFIRM: Terminate this project?')) return
    const updated = projects.filter((p) => p.id !== id)
    setProjects(updated); save('pm_projects', updated)
  }

  const toggleMember = (projectId, userId) => {
    const updated = projects.map((p) => {
      if (p.id !== projectId) return p
      const members = p.members.includes(userId)
        ? p.members.filter((m) => m !== userId)
        : [...p.members, userId]
      return { ...p, members }
    })
    setProjects(updated); save('pm_projects', updated)
  }

  const inp = { ...S.input, background: '#000a00', borderColor: 'var(--border2)', marginBottom: 14 }

  return (
    <div className="animate-in">
      <div style={{ ...S.spaceBetween, marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: C.monoFont, fontSize: 11, color: C.textDim, letterSpacing: '0.15em', marginBottom: 4 }}>
            LOADED: {myProjects.length}_PROJECTS
          </div>
          <div style={S.h1}>PROJECT_REGISTRY</div>
          <div style={{ height: 1, background: 'linear-gradient(90deg, var(--green), transparent)', marginTop: 8, maxWidth: 300 }} />
        </div>
        {user.role === 'Admin' && (
          <button style={S.btnSm} onClick={() => { setModal(true); setErr('') }}>
            + INIT_PROJECT
          </button>
        )}
      </div>

      <div style={S.grid2}>
        {myProjects.map((p, pi) => {
          const ptasks    = tasks.filter((t) => t.projectId === p.id)
          const done      = ptasks.filter((t) => t.status === 'Done').length
          const pct       = ptasks.length ? Math.round((done / ptasks.length) * 100) : 0
          const owner     = users.find((u) => u.id === p.ownerId)
          const memberObjs = users.filter((u) => p.members.includes(u.id))
          const isOwner   = p.ownerId === user.id || user.role === 'Admin'

          return (
            <div key={p.id} style={{
              ...S.cardGlow,
              animation: `fadeIn 0.3s ${pi * 0.06}s ease backwards`,
              transition: 'box-shadow 0.2s',
            }}>
              {/* Corner accents */}
              <div style={{ position:'absolute',top:0,left:0,width:14,height:14,borderTop:'2px solid var(--green)',borderLeft:'2px solid var(--green)' }} />
              <div style={{ position:'absolute',bottom:0,right:0,width:14,height:14,borderBottom:'2px solid var(--green-dim)',borderRight:'2px solid var(--green-dim)' }} />

              {/* Header */}
              <div style={{ ...S.spaceBetween, marginBottom: 8 }}>
                <div style={{ fontFamily: C.uiFont, fontWeight: 700, fontSize: 16, color: C.white, letterSpacing: '0.05em' }}>
                  {p.name.toUpperCase()}
                </div>
                {isOwner && (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button style={{ ...S.btnOutline, padding: '4px 10px', fontSize: 11 }} onClick={() => setAddMemberModal(p.id)}>
                      TEAM
                    </button>
                    <button style={{ ...S.btnDanger, padding: '4px 10px', fontSize: 11 }} onClick={() => deleteProject(p.id)}>
                      DEL
                    </button>
                  </div>
                )}
              </div>

              <div style={{ fontFamily: C.monoFont, color: C.textDim, fontSize: 12, marginBottom: 14, lineHeight: 1.5 }}>
                {p.description || '// no_description_provided'}
              </div>

              {/* Progress */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontFamily: C.monoFont, fontSize: 11, color: C.textDim }}>COMPLETION</span>
                  <span style={{ fontFamily: C.monoFont, fontSize: 11, color: C.green }}>{pct}%</span>
                </div>
                <div style={{ height: 5, background: '#001000', border: '1px solid #002200', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, var(--green2), var(--green))`, boxShadow: '0 0 8px var(--green)', transition: 'width 0.5s' }} />
                </div>
                <div style={{ fontFamily: C.monoFont, fontSize: 10, color: C.textDim, marginTop: 4 }}>
                  {done}/{ptasks.length} TASKS_COMPLETE
                </div>
              </div>

              {/* Members */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
                {memberObjs.slice(0, 6).map((m) => (
                  <div key={m.id} title={m.name}><Avatar name={m.name} size={26} /></div>
                ))}
                {memberObjs.length > 6 && (
                  <span style={{ fontFamily: C.monoFont, fontSize: 10, color: C.textDim }}>+{memberObjs.length - 6}</span>
                )}
                <span style={{ marginLeft: 'auto', fontFamily: C.monoFont, fontSize: 10, color: C.textDim }}>
                  INIT: {fmt(p.createdAt)}
                </span>
              </div>
            </div>
          )
        })}
        {myProjects.length === 0 && (
          <div style={{ ...S.card, fontFamily: C.monoFont, color: C.textDim, fontSize: 13 }}>
            // NO_PROJECTS_FOUND {user.role === 'Admin' ? '— INITIALIZE ONE' : '— CONTACT_ADMIN'}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {modal && (
        <Modal title="INIT_NEW_PROJECT" onClose={() => { setModal(false); setErr('') }}>
          {err && <div style={S.error}>{err}</div>}
          <label style={S.label}>// PROJECT_NAME *</label>
          <input style={inp} placeholder="project_codename" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <label style={S.label}>// DESCRIPTION</label>
          <textarea style={{ ...inp, resize: 'vertical', minHeight: 80, marginBottom: 20 }} placeholder="// mission_briefing..." value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ ...S.btnSm, flex: 1, padding: 11 }} onClick={createProject}>[ DEPLOY ]</button>
            <button style={{ ...S.btnOutline, flex: 1, padding: 11 }} onClick={() => { setModal(false); setErr('') }}>[ ABORT ]</button>
          </div>
        </Modal>
      )}

      {/* Members Modal */}
      {addMemberModal && (() => {
        const proj = projects.find((p) => p.id === addMemberModal)
        return (
          <Modal title={`TEAM_CONFIG // ${proj?.name?.toUpperCase()}`} onClose={() => setAddMemberModal(null)}>
            {users.map((u) => {
              const inProject = proj?.members.includes(u.id)
              return (
                <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(0,255,65,0.07)' }}>
                  <Avatar name={u.name} size={30} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: C.white, fontSize: 13, fontFamily: C.monoFont }}>{u.name}</div>
                    <span style={badge.role(u.role)}>{u.role}</span>
                  </div>
                  <button
                    style={inProject ? S.btnDanger : S.btnSm}
                    onClick={() => u.id !== proj?.ownerId && toggleMember(addMemberModal, u.id)}
                    disabled={u.id === proj?.ownerId}
                  >
                    {u.id === proj?.ownerId ? 'OWNER' : inProject ? 'REVOKE' : 'GRANT'}
                  </button>
                </div>
              )
            })}
          </Modal>
        )
      })()}
    </div>
  )
}
