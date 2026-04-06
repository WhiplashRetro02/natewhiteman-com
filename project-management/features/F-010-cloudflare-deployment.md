# F-010: Cloudflare Pages Deployment Setup

#feature #sprint-3

**Status:** Not Started
**Sprint:** [[sprint-3]]
**Estimated Effort:** Medium (1-2 hours)
**Actual Effort:** —
**Assigned:** Claude Code (configuration) + Nate (dashboard setup)

---

## Description

Configure and execute the first production deployment of natewhiteman.com to Cloudflare Pages, connecting the custom domain purchased on Cloudflare.

### Build Configuration

| Setting | Value |
|---------|-------|
| **Framework preset:** | Astro |
| **Build command:** | `npm run build` |
| **Build output directory:** | `dist` |
| **Node.js version:** | 18+ (set via `NODE_VERSION` env var if needed) |

### Deployment Steps

1. **Verify local build succeeds:** `npm run build` must complete without errors
2. **Connect GitHub repo to Cloudflare Pages:**
   - Cloudflare dashboard > Pages > Create a Project
   - Connect to Git > Select `natewhiteman-com` repository
   - Configure build settings (above)
3. **Custom domain:**
   - Since the domain was purchased on Cloudflare, DNS is already managed there
   - Add `natewhiteman.com` as custom domain in Pages project
   - Add `www.natewhiteman.com` redirect to `natewhiteman.com`
4. **Verify deployment:**
   - Site loads at `https://natewhiteman.com`
   - All pages render correctly
   - SSL certificate active
   - Contact form endpoint works

### Files to Create/Verify

1. **`.gitignore`** — Ensure it includes: `node_modules/`, `dist/`, `.env`, `.astro/`
2. **`_headers` file** (in `public/`) — Security headers for production:
   ```
   /*
     X-Content-Type-Options: nosniff
     X-Frame-Options: DENY
     Referrer-Policy: strict-origin-when-cross-origin
     Permissions-Policy: camera=(), microphone=(), geolocation=()
   ```
3. **`_redirects` file** (in `public/`) — WWW redirect:
   ```
   https://www.natewhiteman.com/* https://natewhiteman.com/:splat 301
   ```

### Compatibility Flags

For the Cloudflare adapter with Astro 5.x, the `wrangler.toml` or Cloudflare Pages settings may need:
- `nodejs_compat` compatibility flag (for Node.js API usage in workers)

## Dependencies

- [[F-006-astro-hybrid-output]] — Must be Completed (hybrid mode required for server endpoints)
- [[F-009-cloudflare-env-config]] — Must be Completed (env vars needed for contact API)
- All Sprint 1 and Sprint 2 features should be Completed (deploy the complete site)

## Acceptance Criteria

- [ ] `npm run build` succeeds locally
- [ ] Cloudflare Pages project created and connected to GitHub repo
- [ ] Build settings configured correctly
- [ ] `natewhiteman.com` custom domain active with SSL
- [ ] `www.natewhiteman.com` redirects to `natewhiteman.com`
- [ ] Security headers present on all responses
- [ ] Homepage loads correctly at production URL
- [ ] Services page loads correctly
- [ ] Blog posts load correctly
- [ ] Contact form submits successfully in production
- [ ] Lead files appear in GitHub repo after form submission

## Testing Requirements

- [ ] Production: All pages load without errors
- [ ] Production: Navigation works between all pages
- [ ] Production: Contact form end-to-end works
- [ ] Production: SSL certificate valid
- [ ] Production: Security headers present (check with `curl -I`)
- [ ] Production: No mixed content warnings
- [ ] Production: Lighthouse score > 90 on performance

## Completion Criteria

Site live at `natewhiteman.com`. All pages render. Contact form works end-to-end in production. Security headers active. SSL valid.

---

**Completed:** —
**Blockers Encountered:** —
**Notes:** First deployment will likely need a few iterations. The Cloudflare adapter compatibility with Astro 5.7 should be verified — check the adapter changelog if build fails.
