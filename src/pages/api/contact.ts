import type { APIRoute } from 'astro';

export const prerender = false;

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

interface CloudflareEnv {
  RESEND_API_KEY?: string;
  RESEND_TO_EMAIL?: string;
  RESEND_FROM_EMAIL?: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const cfEnv = ((locals as { runtime?: { env?: CloudflareEnv } }).runtime?.env) ?? {};
  const resendKey  = cfEnv.RESEND_API_KEY    ?? import.meta.env.RESEND_API_KEY;
  const resendTo   = cfEnv.RESEND_TO_EMAIL   ?? import.meta.env.RESEND_TO_EMAIL;
  const resendFrom = cfEnv.RESEND_FROM_EMAIL ?? import.meta.env.RESEND_FROM_EMAIL;

  if (!resendKey || !resendTo || !resendFrom) {
    console.error('[contact] Missing Resend configuration');
    return json({ success: false, error: 'Server configuration error — please email nate@natewhiteman.com directly' }, 500);
  }

  let body: ContactBody;
  try {
    body = await request.json() as ContactBody;
  } catch {
    return json({ success: false, error: 'Invalid request' }, 400);
  }

  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return json({ success: false, error: 'All fields are required' }, 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return json({ success: false, error: 'Invalid email address' }, 400);
  }

  const date = new Date().toISOString().split('T')[0];
  const emailBody =
    `New inquiry from ${name.trim()}\n\n` +
    `Name:  ${name.trim()}\n` +
    `Email: ${email.trim()}\n` +
    `Date:  ${date}\n\n` +
    `---\n\n${message.trim()}`;

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [resendTo],
      subject: `New inquiry: ${name.trim()}`,
      text: emailBody,
    }),
  });

  if (!resendResponse.ok) {
    const errText = await resendResponse.text();
    console.error('[contact] Resend error:', resendResponse.status, errText);
    return json({ success: false, error: 'Failed to send message — please email nate@natewhiteman.com directly' }, 502);
  }

  return json({ success: true }, 200);
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
