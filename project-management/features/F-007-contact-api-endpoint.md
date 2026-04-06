# F-007: Contact API Endpoint — GitHub Lead Capture

#feature #sprint-2

**Status:** Not Started
**Sprint:** [[sprint-2]]
**Estimated Effort:** High (3-4 hours)
**Actual Effort:** —
**Assigned:** Claude Code (implementation agent)

---

## Description

Create an Astro server endpoint at `src/pages/api/contact.ts` that receives contact form submissions and writes them as markdown files to the GitHub repository's `leads/` folder via the GitHub API.

### Endpoint Specification

**Route:** `POST /api/contact`
**Content-Type:** `application/json`

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "description": "Looking for help building a RAG system for our internal docs."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Thank you! Your inquiry has been received."
}
```

**Error Responses:**
- `400` — Validation failure (missing/invalid fields)
- `429` — Rate limited (too many submissions)
- `500` — GitHub API failure

### Server-Side Validation

1. All fields required and non-empty after trimming
2. Name: 1-100 characters, no HTML tags
3. Email: Valid email format (regex + structure check)
4. Description: 20-2000 characters, no HTML tags
5. Honeypot field must be empty (if filled, return 200 silently — do not tip off bots)

### Rate Limiting

Simple in-memory rate limiting per IP:
- Max 3 submissions per IP per hour
- Use `Map<string, number[]>` with timestamp tracking
- Note: This resets on worker cold start, which is acceptable for this use case

### GitHub API Integration

1. Read `GITHUB_TOKEN` and `GITHUB_REPO` from environment variables (`import.meta.env`)
2. Generate filename: `leads/YYYY-MM-DD-{slugified-name}.md`
3. If filename collision, append `-2`, `-3`, etc.
4. Call GitHub Contents API: `PUT /repos/{owner}/{repo}/contents/{path}`
5. File content (Base64-encoded markdown):

```markdown
---
name: Jane Doe
email: jane@example.com
date: 2026-04-06T14:30:00Z
source: services-page
---

## Inquiry

Looking for help building a RAG system for our internal docs.
```

6. Handle GitHub API errors gracefully (auth failure, repo not found, rate limit)

### Security Considerations

- Sanitize all input (strip HTML, trim whitespace)
- Never expose `GITHUB_TOKEN` in responses or logs
- Never expose internal error details to the client
- Rate limit to prevent abuse
- Honeypot for bot detection

## Dependencies

- [[F-006-astro-hybrid-output]] — Must be Completed (endpoint requires hybrid/server mode)

## Acceptance Criteria

- [ ] Endpoint exists at `src/pages/api/contact.ts`
- [ ] Exports `export const prerender = false` (server-rendered)
- [ ] POST handler validates all fields
- [ ] Honeypot check silently accepts but discards bot submissions
- [ ] Rate limiting enforced (3 per IP per hour)
- [ ] On valid submission, creates markdown file in GitHub repo via API
- [ ] Filename format: `leads/YYYY-MM-DD-{slug}.md`
- [ ] Markdown file contains frontmatter with name, email, date, source
- [ ] Success returns 201 with JSON response
- [ ] Validation errors return 400 with specific error messages
- [ ] GitHub API errors return 500 with generic error message
- [ ] No sensitive data (tokens, internal errors) exposed in any response
- [ ] Non-POST methods return 405

## Testing Requirements

- [ ] Valid submission returns 201
- [ ] Missing name returns 400
- [ ] Missing email returns 400
- [ ] Invalid email format returns 400
- [ ] Description too short (<20 chars) returns 400
- [ ] Description too long (>2000 chars) returns 400
- [ ] Honeypot field filled returns 200 (silent discard)
- [ ] Rate limit exceeded returns 429
- [ ] GET request returns 405
- [ ] GitHub API failure returns 500 with safe message

## Completion Criteria

Endpoint fully functional. Valid submissions create properly formatted markdown files in the GitHub repo. All error cases handled. No security vulnerabilities.

---

**Completed:** —
**Blockers Encountered:** —
**Notes:** The `GITHUB_TOKEN` needs `contents:write` scope on the target repo. The `GITHUB_REPO` format should be `owner/repo-name`. These are configured in Cloudflare Pages environment variables (see [[F-009-cloudflare-env-config]]).
