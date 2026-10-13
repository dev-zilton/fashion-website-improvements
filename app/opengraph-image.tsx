import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
export const alt = 'DripGOd - O drip do mundo, em Moçambique'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  // Logótipo com letras claras e auréola dourada (gerado a partir do logótipo oficial)
  const logo = `data:image/png;base64,${(await readFile(join(process.cwd(), 'app/og-logo.png'))).toString('base64')}`
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
        <img src={logo} alt="DripGOd" width={720} height={202} />
        <div
          style={{
            fontSize: 34,
            color: '#aaaaaa',
            marginTop: 20,
          }}
        >
          O drip do mundo, em Moçambique
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
