# Sprint 2: Contact Form & Lead Capture API

#sprint

**Status:** Not Started
**Timeline:** Begins after Sprint 1 completion
**Goal:** Deliver a working contact form on the Services page that captures leads as markdown files in the GitHub repo.

---

## Sprint Features

| Feature | Status | Dependencies | Parallelizable |
|---------|--------|-------------|----------------|
| [[F-011-env-gitignore-setup]] | Not Started | None | Yes — start immediately |
| [[F-006-astro-hybrid-output]] | Not Started | None | Yes — start immediately |
| [[F-005-contact-form-frontend]] | Not Started | Sprint 1 (F-001, F-002) | Yes — after Sprint 1 gate |
| [[F-007-contact-api-endpoint]] | Not Started | F-006 | No — needs hybrid mode first |
| [[F-008-form-api-integration]] | Not Started | F-005, F-007 | No — needs both form and API |

## Execution Order

```
Phase A (parallel, start of sprint):
  F-011 .env & .gitignore Setup ─────┐
  F-006 Astro Hybrid Output ─────────┤
  F-005 Contact Form Frontend ───────┤  (can start immediately since Sprint 1 provides page)
                                      │
Phase B (after F-006):                │
  F-007 Contact API Endpoint ────────┤
                                      │
Phase C (after F-005 + F-007):        │
  F-008 Form-API Integration ────────┘
```

**Parallelization notes:**
- F-011, F-006, and F-005 are all independent and can run in parallel at sprint start
- F-007 requires F-006 (needs hybrid mode for server endpoints)
- F-008 is the integration point — requires both the form (F-005) and the API (F-007)

## Sprint Completion Criteria

ALL must pass before Sprint 3 begins:

- [ ] Contact form renders on Services page
- [ ] Form validates all fields client-side
- [ ] Honeypot spam prevention active
- [ ] API endpoint validates all fields server-side
- [ ] Rate limiting enforced (3 per IP per hour)
- [ ] Valid submission creates markdown file in GitHub repo `leads/` folder
- [ ] Markdown file contains properly formatted frontmatter and content
- [ ] Success/error states display correctly to user
- [ ] `.env` is gitignored, `.env.example` documents required vars
- [ ] `astro build` succeeds in hybrid mode
- [ ] All existing pages still render correctly (no regressions)

## Testing Gate

Before marking Sprint 2 complete:
1. Run `astro build` — must succeed in hybrid mode
2. Run `astro dev` — full end-to-end form submission test
3. Verify lead file appears in GitHub repo with correct format
4. Test all validation error paths (empty fields, bad email, too short, too long)
5. Test honeypot (submit with hidden field filled — should silently discard)
6. Test rate limiting (submit 4+ times rapidly)
7. Verify all existing pages still work (regression check)

---

**Started:** —
**Completed:** —
**Issues Encountered:** —
**Lessons Learned:** —
