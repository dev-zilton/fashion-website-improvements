import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'DripGOD Newsletter <onboarding@resend.dev>',
      to: 'Ziltontuaireabdulj@gmail.com',
      subject: 'Nova inscrição na newsletter DripGOD',
      html: `<p>Novo email inscrito na newsletter: <strong>${email}</strong></p>`,
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
