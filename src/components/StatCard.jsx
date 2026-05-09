import { S, C, glow } from '../styles/theme'

export default function StatCard({ icon, label, value, color, accent }) {
  return (
    <div style={{
      ...S.cardGlow,
      display: 'flex', alignItems: 'center', gap: 16,
      transition: 'box-shadow 0.2s',
    }}>
      {/* Corner bracket top-left */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 12, height: 12, borderTop: `2px solid ${color || C.green}`, borderLeft: `2px solid ${color || C.green}` }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderBottom: `2px solid ${color || C.green}`, borderRight: `2px solid ${color || C.green}` }} />

      <div style={{
        fontSize: 22,
        background: 'rgba(0,255,65,0.05)',
        border: `1px solid ${color || C.border2}`,
        borderRadius: 2, width: 50, height: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        boxShadow: `0 0 10px ${color || 'rgba(0,255,65,0.2)'}`,
      }}>
        {icon}
      </div>
      <div>
        <div style={{
          fontSize: 30, fontWeight: 900,
          fontFamily: C.titleFont,
          color: color || C.green,
          lineHeight: 1,
          textShadow: `0 0 15px ${color || C.green}`,
          letterSpacing: '-0.02em',
        }}>{value}</div>
        <div style={{ ...S.sub, fontSize: 11, marginTop: 3 }}>{label}</div>
      </div>
    </div>
  )
}
