import { C } from '../styles/theme'

const COLORS = ['#00ff41', '#00ffcc', '#ff006e', '#ffe600', '#00cc33']

export default function Avatar({ name, size = 40 }) {
  const idx   = (name?.charCodeAt(0) || 0) % COLORS.length
  const color = COLORS[idx]
  return (
    <div style={{
      width: size, height: size, borderRadius: 2,
      background: '#000d00',
      border: `1px solid ${color}`,
      boxShadow: `0 0 8px ${color}55`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: C.monoFont, fontWeight: 700,
      fontSize: size * 0.38, color,
      flexShrink: 0, userSelect: 'none',
      textShadow: `0 0 8px ${color}`,
    }}>
      {name?.[0]?.toUpperCase()}
    </div>
  )
}
