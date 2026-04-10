# Sprint AI-2: Content-Dependent Features (Blocked on Nate)

#sprint #april-improvements

**Status:** Not Started
**Timeline:** Begins after Sprint AI-1 completion AND when Nate provides required content
**Goal:** Ship 4 high-leverage conversion features that require real content from Nate: testimonials, video, industry choice, and case study data.

---

## Sprint Features

| Feature | Priority Rank | Status | Dependencies | Effort | Parallelizable |
|---------|--------------|--------|-------------|--------|----------------|
| [[AI-005-testimonials-section]] | Rank 1 | Not Started | EXTERNAL: Nate provides testimonial | 30 min dev | Yes (once content arrives) |
| [[AI-006-loom-video-dashboarding]] | Rank 2 | Not Started | EXTERNAL: Nate records Loom video | 1 hour dev | Yes (once video is ready) |
| [[AI-007-industry-vertical-landing-page]] | Rank 5 | Not Started | EXTERNAL: Nate chooses vertical | Half day | Yes (once vertical is chosen) |
| [[AI-008-outcome-led-case-studies]] | Rank 8 | Not Started | EXTERNAL: Nate provides case study data | 1 day | Yes (once data arrives) |

## External Dependencies (Must Be Resolved Before Dev Starts)

| Dependency | Owner | Status | Question for Nate |
|-----------|-------|--------|-------------------|
| Testimonial content | Nate | Pending | Do you have past clients who can provide a testimonial? |
| Loom video recording | Nate | Pending | Ready to record a 3-min property dashboard walkthrough? |
| Industry vertical choice | Nate | Pending | Which vertical to target first? (Financial advisory, HVAC, real estate, retail, law firms) |
| Case study data | Nate | Pending | Do you have 1-3 real engagements you can describe (even anonymized)? |

## Execution Order

```
Phase A (parallel — each unblocks independently as Nate provides content):
  [Nate provides testimonial]     → AI-005 Testimonials Section
  [Nate records Loom video]       → AI-006 Loom Video Embed
  [Nate chooses vertical]         → AI-007 Industry Landing Page
  [Nate provides case study data] → AI-008 Case Studies

Note: Each feature can be built independently as soon as its
external dependency is resolved. They do not depend on each other.
```

**Parallelization notes:**
- All 4 features are independent of each other
- Each is independently blocked on a different piece of external content
- As each external dependency is resolved, that feature can begin immediately
- AI-005 and AI-006 are quick dev tasks (< 1 hour each) once content arrives
- AI-007 and AI-008 are larger but still independent

**Sprint AI-1 gate applies:** Sprint AI-1 must be completed before Sprint AI-2 work begins, regardless of when external content arrives.

## Sprint Completion Criteria

ALL must pass before Sprint AI-3 begins:

- [ ] At least 1 real testimonial is displayed on the site
- [ ] Loom video is embedded and playing in the dashboarding card
- [ ] Industry vertical landing page is live at `/services/[vertical]`
- [ ] At least 1 real case study is published
- [ ] All features are responsive at 320px, 768px, 1024px, 1440px
- [ ] All features follow the Neural Cartography design system
- [ ] All content is real (not fabricated or placeholder)
- [ ] `astro build` succeeds
- [ ] No console errors

## Testing Gate

Before marking Sprint AI-2 complete:
1. Run `astro build` — must succeed
2. Verify testimonial displays with real attribution
3. Verify Loom video plays in the dashboarding card
4. Navigate to industry landing page — verify content is industry-specific
5. Navigate to case study — verify outcome data is present
6. Visual inspection at 4 breakpoints
7. Verify all new CTA links work
8. Verify no regressions on existing pages

---

**Started:** --
**Completed:** --
**Issues Encountered:** --
**Lessons Learned:** --
