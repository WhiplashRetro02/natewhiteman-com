import type { APIRoute } from 'astro';

export const prerender = false;

interface SessionEvent {
  event: string;
  props: Record<string, unknown>;
  url: string;
  ts: string;
}

interface TrackBody {
  anonId: string;
  sessionId: string;
  email: string;
  props?: { name?: string; source?: string; [key: string]: unknown };
  events?: SessionEvent[];
  ctx?: {
    ua: string;
    lang: string;
    tz: string;
    ref: string;
    sw: number;
    sh: number;
  };
  ts: string;
}

// Minimal D1 types (avoids requiring @cloudflare/workers-types)
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<{ success: boolean }>;
}
interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<{ success: boolean }[]>;
}
interface CloudflareEnv {
  DB?: D1Database;
}

export const POST: APIRoute = async ({ request, locals }) => {
  let body: TrackBody;
  try {
    body = await request.json() as TrackBody;
  } catch {
    return json({ success: false, error: 'Invalid request' }, 400);
  }

  if (!body.anonId || !body.email) {
    return json({ success: false, error: 'Missing required fields' }, 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return json({ success: false, error: 'Invalid email' }, 400);
  }

  const cfEnv = ((locals as { runtime?: { env?: CloudflareEnv } }).runtime?.env) ?? {};
  const db = cfEnv.DB;

  if (db) {
    // Upsert identity — same anon_id can identify again (e.g. return visit)
    await db.prepare(`
      INSERT INTO identities
        (anon_id, session_id, email, name, source, identified_at, ua, lang, tz, referrer, screen_w, screen_h)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(anon_id) DO UPDATE SET
        session_id    = excluded.session_id,
        email         = excluded.email,
        identified_at = excluded.identified_at
    `).bind(
      body.anonId,
      body.sessionId,
      body.email,
      body.props?.name    ?? null,
      body.props?.source  ?? null,
      body.ts,
      body.ctx?.ua  ?? null,
      body.ctx?.lang ?? null,
      body.ctx?.tz  ?? null,
      body.ctx?.ref  ?? null,
      body.ctx?.sw  ?? null,
      body.ctx?.sh  ?? null,
    ).run();

    // Batch-insert all session events collected before identify
    if (body.events?.length) {
      const stmts = body.events.map((e) =>
        db.prepare(`
          INSERT INTO events (anon_id, session_id, event, url, props, ts)
          VALUES (?, ?, ?, ?, ?, ?)
        `).bind(body.anonId, body.sessionId, e.event, e.url, JSON.stringify(e.props), e.ts)
      );
      await db.batch(stmts);
    }
  }

  return json({ success: true }, 200);
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
