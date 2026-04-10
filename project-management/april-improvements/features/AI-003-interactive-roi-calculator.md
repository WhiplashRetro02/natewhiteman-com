# AI-003: Interactive ROI Calculator

#feature #april-improvements #sprint-ai-1

**Status:** Not Started
**Sprint:** [[sprint-ai-1]]
**Priority:** Rank 7 (Dev-Heavy Feature)
**Estimated Effort:** High (1-2 days)
**Actual Effort:** --
**Assigned:** Claude Code (implementation agent)

---

## Description

Build an interactive calculator component that helps prospective clients quantify the cost of their current manual reporting/analytics workflow. The user inputs a few variables and gets an instant dollar estimate of what their inefficiency costs them annually.

### Calculator Inputs

| Field | Type | Default | Constraints |
|-------|------|---------|-------------|
| Team size (people doing manual reporting) | Number slider or input | 3 | Min 1, max 50 |
| Hours per week spent on manual reporting | Number slider or input | 10 | Min 1, max 40 |
| Average hourly cost (fully loaded) | Number input or preset | $45 | Min $15, max $300 |

### Calculator Output

- **Annual cost of manual reporting:** `team_size * hours_per_week * hourly_cost * 52`
- Display prominently with large typography
- Optional: show monthly cost alongside
- Optional: show "potential savings" assuming 70-80% reduction with automation
- Include a CTA line like: "What if you could cut that by 75%?" linking to the contact form

### Technical Implementation

- Build as a framework component (React, Preact, or Astro `client:visible` island)
- Use `client:visible` directive for progressive enhancement — calculator loads only when scrolled into view
- All calculation is client-side, no API calls needed
- Smooth number transitions when values change (consider `requestAnimationFrame` or CSS transitions)
- Accessible: labels on all inputs, keyboard navigable, screen reader announces results

### Placement

Embed on the Services page, either:
- As its own section between the service cards and the CTA
- Within the Custom Dashboarding or Contract Analytics accordion card
- Decision point for user on placement

## Dependencies

None — pure dev task with no external content dependencies.

## Acceptance Criteria

- [ ] Calculator component renders on the Services page
- [ ] All three inputs are functional with proper constraints
- [ ] Output updates in real-time as inputs change
- [ ] Annual cost calculation is mathematically correct
- [ ] Results displayed prominently with clear formatting ($XX,XXX)
- [ ] CTA linking to contact form is present near the output
- [ ] Component uses `client:visible` for lazy loading
- [ ] Accessible: labeled inputs, keyboard navigable, results announced to screen readers
- [ ] Responsive at 320px, 768px, 1024px, 1440px
- [ ] Follows Neural Cartography design system
- [ ] Reduced motion: respects `prefers-reduced-motion`
- [ ] No layout shift when component loads

## Testing Requirements

- [ ] Verify calculation accuracy with known inputs (e.g., 5 people * 10 hrs * $50 * 52 = $130,000)
- [ ] Test edge cases: minimum values, maximum values, boundary values
- [ ] Test keyboard navigation through all inputs
- [ ] Test at 4 breakpoints
- [ ] `astro build` succeeds
- [ ] No console errors
- [ ] Component loads only when scrolled into view (verify with network tab)

## Completion Criteria

Interactive calculator is live, mathematically accurate, visually polished, and driving users toward the contact form CTA.

---

**Completed:** --
**Blockers Encountered:** --
**Notes:** --
