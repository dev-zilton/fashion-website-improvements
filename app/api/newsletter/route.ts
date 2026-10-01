import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { CONTACT_EMAIL } from '@/lib/config'

const EMAIL_REGEX = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const hits = new Map<string, number[]>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_LIMIT_MAX
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Demasiados pedidos. Tente novamente dentro de instantes.' },
        { status: 429 }
      )
    }

    const { email } = await request.json()

    if (
      !email ||
      typeof email !== 'string' ||
      email.length > 254 ||
      !EMAIL_REGEX.test(email)
    ) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: process.env.NEWSLETTER_FROM ?? 'DripGOD Newsletter <onboarding@resend.dev>',
      to: process.env.NEWSLETTER_TO ?? CONTACT_EMAIL,
      subject: 'Nova inscrição na newsletter DripGOD',
      html: `<p>Novo email inscrito na newsletter: <strong>${escapeHtml(email)}</strong></p>`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao processar inscrição na newsletter:', error)
    return NextResponse.json(
      { error: 'Erro ao processar a subscrição. Tente novamente.' },
      { status: 500 }
    )
  }
}
