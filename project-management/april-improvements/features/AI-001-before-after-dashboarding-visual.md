# AI-001: Before/After Visual on Dashboarding Card

#feature #april-improvements #sprint-ai-1

**Status:** Not Started
**Sprint:** [[sprint-ai-1]]
**Priority:** Rank 3 (Quick Win)
**Estimated Effort:** Medium (2 hours)
**Actual Effort:** --
**Assigned:** Claude Code (implementation agent)

---

## Description

Create a side-by-side before/after visual component embedded within the Custom Dashboarding service accordion card on the Services page. The left side shows a messy, chaotic spreadsheet screenshot; the right side shows a clean, polished dashboard.

This is a pure design/dev task with no external content dependencies. The visual can be created using:
- Actual screenshots (messy spreadsheet vs. the property dashboard sample already on the site)
- A stylized CSS illustration showing the transformation
- An interactive slider component where users drag to reveal the "after" state

The component should reinforce the value proposition: "This is what you're dealing with now. This is what I'll build for you."

## Dependencies

None — this is a standalone component that inserts into the existing dashboarding accordion card.

## Acceptance Criteria

- [ ] Before/after visual component exists and renders inside the Custom Dashboarding accordion
- [ ] "Before" side clearly communicates chaos/inefficiency (messy spreadsheet aesthetic)
- [ ] "After" side clearly communicates clarity/professionalism (clean dashboard aesthetic)
- [ ] Visual is responsive at 320px, 768px, 1024px, 1440px
- [ ] Component follows the Neural Cartography design system (colors, typography, spacing)
- [ ] No layout shift (CLS < 0.1) when the accordion expands
- [ ] Accessible: alt text on images, works without JavaScript (static fallback)
- [ ] Reduced motion: respects `prefers-reduced-motion` if using any transitions
- [ ] Loads efficiently — images are optimized (WebP/AVIF, lazy-loaded if below the fold)

## Testing Requirements

- [ ] Component renders correctly inside the accordion card
- [ ] Visual is clear and communicates the transformation at all breakpoints
- [ ] `astro build` succeeds
- [ ] No console errors
- [ ] Images are optimized and lazy-loaded appropriately
- [ ] Accordion expand/collapse still works smoothly with the visual embedded

## Completion Criteria

Before/after visual is live inside the dashboarding card, visually compelling, responsive, and accessible.

---

**Completed:** --
**Blockers Encountered:** --
**Notes:** --
