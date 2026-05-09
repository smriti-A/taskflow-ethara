export const genId = () => Math.random().toString(36).slice(2, 9)
export const now = () => new Date().toISOString()
export const fmt = (iso) => iso ? new Date(iso).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '—'
export const isOverdue = (due) => due && new Date(due) < new Date()

export const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch { return fallback }
}

export const save = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
}
