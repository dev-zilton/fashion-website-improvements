import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'DripGOd - Moda Premium de Moçambique'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
        }}
      >
        <div
          style={{
            width: 80,
            height: 4,
            backgroundColor: '#d4af37',
            marginBottom: 24,
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 90,
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}
        >
          <span style={{ color: '#f5f5f5' }}>DRIP</span>
          <span style={{ color: '#d4af37' }}>GOD</span>
        </div>
        <div
          style={{
            fontSize: 34,
            color: '#aaaaaa',
            marginTop: 20,
          }}
        >
          Moda Premium de Moçambique
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
