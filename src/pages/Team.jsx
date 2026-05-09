import { useState } from 'react'
import { S, C, badge } from '../styles/theme'
import Modal from '../components/Modal'
import Avatar from '../components/Avatar'
import { genId, save } from '../utils/helpers'

export default function Team({ user, users, setUsers, tasks, projects }) {
  const [modal, setModal] = useState(false)
  const [form,  setForm]  = useState({ name:'', email:'', password:'', role:'Member' })
  const [err,   setErr]   = useState('')

  const addMember = () => {
    if (!form.name || !form.email || !form.password) return setErr('ERROR: All fields required.')
    if (users.find((u) => u.email === form.email))   return setErr('ERROR: Email already registered.')
    const u = { id: genId(), ...form }
    const updated = [...users, u]
    setUsers(updated); save('pm_users', updated)
    setModal(false); setForm({ name:'', email:'', password:'', role:'Member' }); setErr('')
  }

  const removeUser = (id) => {
    if (id === user.id) return alert('DENIED: Cannot remove self.')
    if (!window.confirm('CONFIRM: Revoke operator access?')) return
    const updated = users.filter((u) => u.id !== id)
    setUsers(updated); save('pm_users', updated)
  }

  const changeRole = (id, role) => {
    const updated = users.map((u) => u.id === id ? { ...u, role } : u)
    setUsers(updated); save('pm_users', updated)
  }

  const sel = { ...S.input, background: '#000a00', marginBottom: 14 }

  return (
    <div className="animate-in">
      <div style={{ ...S.spaceBetween, marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: C.monoFont, fontSize: 11, color: C.textDim, letterSpacing: '0.15em', marginBottom: 4 }}>
            ACTIVE_OPERATORS: {users.length}
          </div>
          <div style={S.h1}>TEAM_ROSTER</div>
          <div style={{ height: 1, background: 'linear-gradient(90deg, var(--pink), transparent)', marginTop: 8, maxWidth: 300 }} />
        </div>
        {user.role === 'Admin' && (
          <button style={{ ...S.btnSm, borderColor: 'var(--pink)', color: 'var(--pink)', boxShadow: '0 0 8px rgba(255,0,110,0.3)' }} onClick={() => { setModal(true); setErr('') }}>
            + RECRUIT_OP
          </button>
        )}
      </div>

      <div style={S.grid2}>
        {users.map((u, i) => {
          const uTasks    = tasks.filter((t) => t.assigneeId === u.id)
          const done      = uTasks.filter((t) => t.status === 'Done').length
          const active    = uTasks.filter((t) => t.status === 'In Progress').length
          const uProjects = projects.filter((p) => p.members.includes(u.id))
          const isMe      = u.id === user.id

          return (
            <div key={u.id} style={{
              ...S.cardGlow,
              borderColor: isMe ? 'var(--border2)' : 'var(--border)',
              boxShadow: isMe ? '0 0 20px rgba(0,255,65,0.1)' : undefined,
              animation: `fadeIn 0.3s ${i * 0.07}s ease backwards`,
            }}>
              {/* Corner deco */}
              <div style={{ position:'absolute',top:0,left:0,width:12,height:12,borderTop:`2px solid ${u.role==='Admin'?'var(--pink)':'var(--green)'}`,borderLeft:`2px solid ${u.role==='Admin'?'var(--pink)':'var(--green)'}` }} />

              {/* Identity */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                <Avatar name={u.name} size={46} />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontFamily: C.monoFont, fontWeight: 700, color: C.white, fontSize: 15, letterSpacing: '0.05em' }}>
                    {u.name.toUpperCase()}
                    {isMe && <span style={{ fontSize: 10, color: C.textDim, marginLeft: 6 }}>[YOU]</span>}
                  </div>
                  <div style={{ fontFamily: C.monoFont, fontSize: 11, color: C.textDim, marginTop: 2 }}>{u.email}</div>
                  <span style={{ ...badge.role(u.role), marginTop: 4, display: 'inline-block' }}>{u.role}</span>
                </div>
              </div>

              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: 12 }}>
                {[
                  { lbl:'TASKS',   val: uTasks.length,   col: C.green },
                  { lbl:'DONE',    val: done,             col: '#00ff41' },
                  { lbl:'ACTIVE',  val: active,           col: C.cyan },
                ].map((s) => (
                  <div key={s.lbl} style={{ background: '#000a00', border: '1px solid var(--border)', borderRadius: 2, padding: '8px 6px', textAlign: 'center' }}>
                    <div style={{ fontFamily: C.titleFont, fontSize: 20, fontWeight: 900, color: s.col, textShadow: `0 0 10px ${s.col}` }}>{s.val}</div>
                    <div style={{ fontFamily: C.monoFont, fontSize: 9, color: C.textDim, marginTop: 2, letterSpacing: '0.1em' }}>{s.lbl}</div>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div style={{ fontFamily: C.monoFont, fontSize: 11, color: C.textDim, marginBottom: 12 }}>
                PROJECTS: {uProjects.length > 0 ? uProjects.slice(0,3).map((p) => p.name).join(', ') : 'NONE_ASSIGNED'}
                {uProjects.length > 3 && ` +${uProjects.length - 3}_MORE`}
              </div>

              {/* Admin controls */}
              {user.role === 'Admin' && !isMe && (
                <div style={{ display: 'flex', gap: 8, paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                  <select
                    style={{ ...S.input, flex: 1, padding: '6px 10px', fontSize: 11, background: '#000a00', fontFamily: C.monoFont }}
                    value={u.role}
                    onChange={(e) => changeRole(u.id, e.target.value)}
                  >
                    <option>Member</option><option>Admin</option>
                  </select>
                  <button style={S.btnDanger} onClick={() => removeUser(u.id)}>REVOKE</button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {modal && (
        <Modal title="RECRUIT_OPERATOR" onClose={() => { setModal(false); setErr('') }}>
          {err && <div style={S.error}>{err}</div>}
          {[
            { k:'name',     lbl:'OPERATOR_NAME',   ph:'Full name',          type:'text' },
            { k:'email',    lbl:'EMAIL_ADDRESS',    ph:'operator@net.io',    type:'text' },
            { k:'password', lbl:'ACCESS_KEY',       ph:'••••••••',           type:'password' },
          ].map(({ k, lbl, ph, type }) => (
            <div key={k}>
              <label style={S.label}>// {lbl}</label>
              <input style={sel} type={type} placeholder={ph} value={form[k]} onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))} />
            </div>
          ))}
          <label style={S.label}>// CLEARANCE_LEVEL</label>
          <select style={sel} value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
            <option>Member</option><option>Admin</option>
          </select>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ ...S.btnSm, flex:1, padding:11, borderColor:'var(--pink)', color:'var(--pink)', boxShadow:'0 0 8px rgba(255,0,110,0.3)' }} onClick={addMember}>[ ENLIST ]</button>
            <button style={{ ...S.btnOutline, flex:1, padding:11 }} onClick={() => { setModal(false); setErr('') }}>[ ABORT ]</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
