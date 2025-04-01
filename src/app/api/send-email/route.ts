import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { to, subject, html } = await req.json();
    console.log('Received email request:', { to, subject });

    if (!to || !subject || !html) {
      console.log('Missing required fields:', { to, subject, html });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await sendEmail({
      to,
      subject,
      html,
    });

    if (!result.success) {
      console.error('Email sending failed:', result.error);
      const errorMessage = result.error instanceof Error 
        ? result.error.message 
        : 'Failed to send email';
        
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', result.data);
    return NextResponse.json({ message: 'Email sent successfully', data: result.data });
  } catch (error) {
    console.error('Detailed API route error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
} 