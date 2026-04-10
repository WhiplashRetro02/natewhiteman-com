# Sprint AI-1: Quick Wins (Dev-Heavy, No External Dependencies)

#sprint #april-improvements

**Status:** Not Started
**Timeline:** Ready to begin immediately
**Goal:** Ship 4 high-impact conversion improvements that require zero external content or decisions from Nate. All features are pure dev/design work.

---

## Sprint Features

| Feature | Priority Rank | Status | Dependencies | Effort | Parallelizable |
|---------|--------------|--------|-------------|--------|----------------|
| [[AI-001-before-after-dashboarding-visual]] | Rank 3 | Not Started | None | 2 hours | Yes |
| [[AI-002-who-this-is-for-copy-block]] | Rank 4 | Not Started | None | 1 hour | Yes |
| [[AI-003-interactive-roi-calculator]] | Rank 7 | Not Started | None | 1-2 days | Yes |
| [[AI-004-pricing-anchor-comparison-block]] | Rank 10 | Not Started | None | 2 hours | Yes |

## Execution Order

```
Phase A (ALL parallel — no dependencies between any Sprint AI-1 features):
  AI-001 Before/After Visual ─────────┐
  AI-002 "Who This Is For" Copy ──────┤
  AI-003 ROI Calculator ──────────────┤
  AI-004 Pricing Anchor Block ────────┘
```

**Parallelization notes:**
- All 4 features are completely independent of each other
- All 4 can be built in parallel by separate agents or sequentially by one agent
- None depend on external content from Nate
- AI-001 and AI-004 are quick (2 hours each); AI-002 is very quick (1 hour); AI-003 is the largest (1-2 days)
- Recommended: start AI-003 first (longest lead time), work on AI-001/AI-002/AI-004 while waiting or in parallel

## Sprint Completion Criteria

ALL must pass before Sprint AI-2 begins:

- [ ] Before/after visual renders inside the dashboarding accordion card
- [ ] "Who This Is For" copy block is live on the Services page
- [ ] ROI calculator is functional with accurate math and proper UX
- [ ] Pricing anchor block displays 3 tiers with CTAs
- [ ] All 4 features are responsive at 320px, 768px, 1024px, 1440px
- [ ] All 4 features follow the Neural Cartography design system
- [ ] No layout shifts introduced (CLS < 0.1)
- [ ] `astro build` succeeds with all features included
- [ ] No console errors on any page
- [ ] Services page still loads within LCP < 2.5s target

## Testing Gate

Before marking Sprint AI-1 complete:
1. Run `astro build` — must succeed
2. Run `astro dev` — navigate to `/services`, verify all 4 new components render
3. Visual inspection at 4 breakpoints (320px, 768px, 1024px, 1440px)
4. Test ROI calculator with known inputs — verify math
5. Test all CTA links — verify they reach the contact form
6. Verify accordion behavior is unaffected by new embedded content
7. Verify no performance regression (page still loads fast)

---

**Started:** --
**Completed:** --
**Issues Encountered:** --
**Lessons Learned:** --
