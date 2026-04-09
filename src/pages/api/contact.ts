import type { APIRoute } from 'astro';

export const prerender = false;

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

interface CloudflareEnv {
  GITHUB_TOKEN?: string;
  GITHUB_REPO?: string;
  RESEND_API_KEY?: string;
  RESEND_TO_EMAIL?: string;
  RESEND_FROM_EMAIL?: string;
}

/** Cloudflare Workers compatible base64 — no unescape() */
function toBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .slice(0, 40);
}

function buildMarkdown(name: string, email: string, message: string, date: string): string {
  return `---
date: ${new Date().toISOString()}
name: "${name.replace(/"/g, '\\"')}"
email: "${email.replace(/"/g, '\\"')}"
---

# Inquiry: ${name}

| Field | Value |
|-------|-------|
| **Name** | ${name} |
| **Email** | ${email} |
| **Date** | ${date} |

## What they're looking for

${message}
`;
}

export const POST: APIRoute = async ({ request, locals }) => {
  // Resolve env — try Cloudflare runtime binding first, fall back to import.meta.env
  const cfEnv = ((locals as { runtime?: { env?: CloudflareEnv } }).runtime?.env) ?? {};
  const githubToken   = cfEnv.GITHUB_TOKEN   ?? import.meta.env.GITHUB_TOKEN;
  const githubRepo    = cfEnv.GITHUB_REPO    ?? import.meta.env.GITHUB_REPO;
  const resendKey     = cfEnv.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;
  const resendTo      = cfEnv.RESEND_TO_EMAIL   ?? import.meta.env.RESEND_TO_EMAIL   ?? 'nate@natewhiteman.com';
  const resendFrom    = cfEnv.RESEND_FROM_EMAIL ?? import.meta.env.RESEND_FROM_EMAIL ?? 'inquiries@natewhiteman.com';

  // Parse body
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

  if (!githubToken || !githubRepo) {
    console.error('[contact] Missing GITHUB_TOKEN or GITHUB_REPO');
    return json({ success: false, error: 'Server configuration error — please email nate@natewhiteman.com directly' }, 500);
  }

  // Write lead file to GitHub
  const date = new Date().toISOString().split('T')[0];
  const slug = toSlug(name.trim());
  const timestamp = Date.now();
  const filename = `leads/${date}-${slug}-${timestamp}.md`;
  const markdown = buildMarkdown(name.trim(), email.trim(), message.trim(), date);

  const ghResponse = await fetch(
    `https://api.github.com/repos/${githubRepo}/contents/${filename}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
        'User-Agent': 'natewhiteman-com',
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({
        message: `lead: inquiry from ${name.trim()}`,
        content: toBase64(markdown),
      }),
    }
  );

  if (!ghResponse.ok) {
    const errText = await ghResponse.text();
    console.error('[contact] GitHub API error:', ghResponse.status, errText);
    return json({ success: false, error: 'Failed to save inquiry — please email nate@natewhiteman.com directly' }, 502);
  }

  // Fire-and-forget Resend email
  if (resendKey) {
    const emailBody =
      `New inquiry from ${name.trim()}\n\n` +
      `Name:  ${name.trim()}\n` +
      `Email: ${email.trim()}\n` +
      `Date:  ${date}\n\n` +
      `---\n\n${message.trim()}\n\n` +
      `---\nSaved to GitHub: ${filename}`;

    fetch('https://api.resend.com/emails', {
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
    }).catch((err: unknown) => console.error('[contact] Resend failed:', err));
  }

  return json({ success: true }, 200);
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
