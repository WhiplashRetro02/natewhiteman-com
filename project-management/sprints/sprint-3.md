# Sprint 3: Production Deployment

#sprint

**Status:** Not Started
**Timeline:** Begins after Sprint 2 completion
**Goal:** Deploy the complete site to `natewhiteman.com` via Cloudflare Pages with all features live.

---

## Sprint Features

| Feature | Status | Dependencies | Parallelizable |
|---------|--------|-------------|----------------|
| [[F-009-cloudflare-env-config]] | Not Started | F-007 | Yes — can start at sprint start |
| [[F-010-cloudflare-deployment]] | Not Started | F-009, all Sprint 1+2 features | No — final step |

## Execution Order

```
Phase A (start of sprint):
  F-009 Cloudflare Env Config ──────┐  (Nate: create token, configure dashboard)
                                     │
Phase B (after F-009):               │
  F-010 Cloudflare Deployment ──────┘  (connect repo, deploy, verify)
```

**Notes:**
- F-009 requires Nate's direct action (GitHub token creation, Cloudflare dashboard)
- F-010 is the final deployment step — everything must be ready
- This sprint is lighter on code and heavier on configuration and verification

## Sprint Completion Criteria

ALL must pass to mark the project complete:

- [ ] Site live at `https://natewhiteman.com`
- [ ] SSL certificate active and valid
- [ ] `www.natewhiteman.com` redirects to `natewhiteman.com`
- [ ] Homepage loads correctly
- [ ] Services page loads correctly with all content
- [ ] Blog posts load correctly
- [ ] Annabeth project page loads correctly
- [ ] Contact form works end-to-end in production
- [ ] Lead files appear in GitHub repo after production form submission
- [ ] Security headers present on all responses
- [ ] No mixed content warnings
- [ ] Lighthouse performance score > 90

## Testing Gate

Before marking Sprint 3 (and the project) complete:
1. Load `https://natewhiteman.com` — verify homepage
2. Navigate all pages via nav links
3. Submit contact form — verify lead file in GitHub
4. Check `curl -I https://natewhiteman.com` for security headers
5. Run Lighthouse audit — verify performance > 90
6. Check SSL certificate validity
7. Verify `www` redirect works
8. Test on mobile device (or mobile emulation)

---

**Started:** —
**Completed:** —
**Issues Encountered:** —
**Lessons Learned:** —
