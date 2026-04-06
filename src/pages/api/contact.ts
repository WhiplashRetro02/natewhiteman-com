import type { APIRoute } from 'astro';

export const prerender = false;

interface ContactBody {
  name: string;
  email: string;
  message: string;
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

export const POST: APIRoute = async ({ request }) => {
  let body: ContactBody;

  try {
    body = await request.json() as ContactBody;
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return new Response(JSON.stringify({ success: false, error: 'All fields required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid email address' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const githubToken = import.meta.env.GITHUB_TOKEN;
  const githubRepo = import.meta.env.GITHUB_REPO;

  if (!githubToken || !githubRepo) {
    console.error('Missing GITHUB_TOKEN or GITHUB_REPO environment variables');
    return new Response(JSON.stringify({ success: false, error: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const date = new Date().toISOString().split('T')[0];
  const slug = toSlug(name);
  const timestamp = Date.now();
  const filename = `leads/${date}-${slug}-${timestamp}.md`;
  const markdown = buildMarkdown(name.trim(), email.trim(), message.trim(), date);
  const encoded = btoa(unescape(encodeURIComponent(markdown)));

  const apiUrl = `https://api.github.com/repos/${githubRepo}/contents/${filename}`;

  const ghResponse = await fetch(apiUrl, {
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
      content: encoded,
    }),
  });

  if (!ghResponse.ok) {
    const errText = await ghResponse.text();
    console.error('GitHub API error:', ghResponse.status, errText);
    return new Response(JSON.stringify({ success: false, error: 'Failed to save inquiry' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Send email notification via Resend (non-blocking — failure doesn't block response)
  const resendKey = import.meta.env.RESEND_API_KEY;
  const resendTo = import.meta.env.RESEND_TO_EMAIL ?? 'nate@natewhiteman.com';
  const resendFrom = import.meta.env.RESEND_FROM_EMAIL ?? 'inquiries@natewhiteman.com';

  if (resendKey) {
    const emailBody = `New inquiry from ${name.trim()}

Name:  ${name.trim()}
Email: ${email.trim()}
Date:  ${date}

---

${message.trim()}

---
Saved to GitHub: leads/${date}-${slug}-${timestamp}.md
`;

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
    }).catch((err: unknown) => {
      console.error('Resend notification failed:', err);
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
