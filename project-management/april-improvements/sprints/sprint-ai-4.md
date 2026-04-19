# Sprint AI-4: Local Landing Pages

#sprint #april-improvements

**Status:** Ready to Start (pending Cloudflare deployment fix)
**Timeline:** Can begin immediately — all copy is written. However, pages cannot go live until the Cloudflare Pages deployment blocker is resolved (see [[BLOCKED]]).
**Goal:** Ship 2 high-converting local landing pages targeting Knoxville and Inland Empire SMB owners. Both have complete copy specs ready to implement. Pure dev/design work with no external content dependencies.

---

## Sprint Features

| Feature | Priority Rank | Status | Dependencies | Effort | Parallelizable |
|---------|--------------|--------|-------------|--------|----------------|
| [[AI-011-knoxville-landing-page]] | High | Not Started | None (copy written) | 4-6 hours | Yes |
| [[AI-012-inland-empire-landing-page]] | High | Not Started | None (copy written) | 4-6 hours | Yes |

## Dependencies

### External Content Dependencies

**None.** Both pages have complete copy specs ready to implement:
- Knoxville: `project-management/planned-developments/knoxville-landing-page.md`
- Inland Empire: `project-management/planned-developments/inland-empire-landing-page.md`

### Deployment Dependency

**CRITICAL:** Cloudflare Pages deployment is currently broken (`MessageChannel is not defined` error). Both pages can be **built** but cannot be **deployed** until this is resolved. See [[BLOCKED]] for details and fix history.

### Sprint Gate

This sprint does **not** depend on Sprint AI-2 or AI-3 completion. The local landing pages are independent of the content-dependent features. They can be built in parallel with Sprint AI-2/AI-3 work.

## Execution Order

```
Phase A (BOTH parallel — no dependencies between features):
  AI-011 Knoxville Landing Page ─────────┐
  AI-012 Inland Empire Landing Page ─────┘  PARALLEL

Note: Both pages share the same structural pattern. Component reuse
is expected — build Knoxville first, then adapt for IE (or vice versa).
The IE page has 2 additional elements: industry callout grid and
City/Industry dropdowns in the inquiry form.
```

**Parallelization notes:**
- Both features are completely independent of each other
- Both can be built in parallel by separate agents or sequentially by one agent
- Neither depends on external content from Nate — all copy is written
- Component reuse: both follow the same page structure, so the second page should be faster to build
- Recommended: build one page fully, then adapt the template for the second. The IE page has more sections (11 vs 10) due to the industry callout grid.

## Sprint Completion Criteria

ALL must pass before marking Sprint AI-4 complete:

- [ ] Knoxville landing page exists at `/knoxville` with all 10 sections
- [ ] Inland Empire landing page exists at `/inland-empire` with all 11 sections
- [ ] Both pages have correct package pricing (Starter: $297/$49, Pro: $1,200/$149)
- [ ] Both pages have functional inquiry forms
- [ ] IE page has City dropdown (9 cities + Other) and Industry dropdown (7 options)
- [ ] IE page has 2x3 industry callout grid
- [ ] Both pages have proper SEO meta tags
- [ ] Both pages are responsive at 320px, 768px, 1024px, 1440px
- [ ] Both pages follow the Neural Cartography design system
- [ ] All internal links work (CTA, samples, ROI calc, services, Calendly)
- [ ] No layout shifts introduced (CLS < 0.1)
- [ ] `astro build` succeeds with both pages included
- [ ] No console errors on either page
- [ ] Both pages deployed to production (requires Cloudflare fix)

## Testing Gate

Before marking Sprint AI-4 complete:
1. Run `astro build` — must succeed
2. Run `astro dev` — navigate to `/knoxville` and `/inland-empire`, verify all sections render
3. Visual inspection at 4 breakpoints (320px, 768px, 1024px, 1440px) for both pages
4. Test inquiry forms — verify submission works
5. Test all CTA links — verify Calendly and anchor scrolls work
6. Verify FAQ accordion behavior on both pages
7. Verify IE-specific elements: industry grid responsive layout, City/Industry dropdowns
8. Check SEO meta tags are present and correct on both pages
9. Verify internal links to `/services`, `/samples/*`, `/services#roi`
10. Verify no regressions on existing pages
11. Deploy to Cloudflare Pages — verify both pages are live (blocked until Cloudflare fix)

---

**Started:** --
**Completed:** --
**Issues Encountered:** --
**Lessons Learned:** --
