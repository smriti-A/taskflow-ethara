import { useEffect } from 'react'
import { S, C } from '../styles/theme'

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ ...S.modal, animation: 'fadeIn 0.2s ease' }}>
        {/* Corner decorations */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: '2px solid var(--green)', borderLeft: '2px solid var(--green)' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 20, height: 20, borderTop: '2px solid var(--green)', borderRight: '2px solid var(--green)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 20, height: 20, borderBottom: '2px solid var(--green)', borderLeft: '2px solid var(--green)' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: '2px solid var(--green)', borderRight: '2px solid var(--green)' }} />

        <div style={{ ...S.spaceBetween, marginBottom: 20 }}>
          <span style={{
            fontFamily: C.titleFont, fontSize: 14, fontWeight: 700,
            color: C.green, letterSpacing: '0.15em', textTransform: 'uppercase',
            textShadow: '0 0 10px var(--green)',
          }}>
            ▶ {title}
          </span>
          <button onClick={onClose} style={{
            background: 'none', border: '1px solid var(--border)',
            color: C.textDim, fontSize: 18, cursor: 'pointer',
            width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 2, fontFamily: C.monoFont,
            transition: 'all 0.15s',
          }}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}
