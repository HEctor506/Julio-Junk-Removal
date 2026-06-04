import { NextRequest, NextResponse } from 'next/server';

interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  message: string;
  locale: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();
    const { name, phone, email, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: Connect to Resend, Nodemailer, or any email provider
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: process.env.NEXT_PUBLIC_EMAIL!,
    //   subject: `New estimate request from ${name}`,
    //   html: `<p>Name: ${name}</p><p>Phone: ${phone}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    // });

    console.log('Contact form submission:', { name, phone, email, message });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
