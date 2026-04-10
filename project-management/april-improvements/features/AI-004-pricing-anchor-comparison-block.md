# AI-004: Pricing Anchor/Comparison Block

#feature #april-improvements #sprint-ai-1

**Status:** Not Started
**Sprint:** [[sprint-ai-1]]
**Priority:** Rank 10 (Quick Win)
**Estimated Effort:** Medium (2 hours)
**Actual Effort:** --
**Assigned:** Claude Code (implementation agent)

---

## Description

Add a visual pricing anchor section above or near the service accordion cards on the Services page. This is a 3-column comparison block (Starter / Standard / Advanced tiers) that surfaces entry-level prices and anchors the higher-end services.

### Purpose

Pricing anchoring reduces friction for prospects who are evaluating whether they can afford to work with Nate. By showing a clear progression from accessible entry points to premium engagements, visitors can self-select their tier before diving into the service details.

### Tier Structure (Draft — Nate to confirm)

| Tier | Name | Price Anchor | What's Included |
|------|------|-------------|-----------------|
| Starter | Quick Wins | From $150 | Single deliverable, 1-2 week turnaround. Perfect for a one-off analysis, dashboard, or audit. |
| Standard | Full Engagement | From $1,500 | Multi-deliverable project, 2-6 weeks. Includes discovery, build, and handoff. Most popular. |
| Advanced | Strategic Partnership | From $5,000 | Ongoing advisory + build. Monthly retainer or large-scale project. For teams investing seriously in data. |

### Design Direction

- 3-column layout on desktop, stacked on mobile
- Middle column (Standard) should be visually highlighted as "Most Popular" or "Recommended"
- Each column includes: tier name, starting price, 3-4 bullet points, CTA button
- CTA buttons link to the contact form (with optional tier preselection in URL params)
- Visual design should feel premium but accessible — not SaaS-generic
- Must integrate with the existing page rhythm (sits above the accordion cards)

## Dependencies

None — pure dev/design task.

## Acceptance Criteria

- [ ] 3-column pricing comparison block renders on Services page
- [ ] Each tier shows: name, starting price, included features, CTA
- [ ] Middle tier is visually highlighted as recommended/most popular
- [ ] CTA buttons link to the contact/inquiry form
- [ ] Responsive: 3 columns on desktop, stacked cards on mobile
- [ ] Typography, colors, and spacing follow Neural Cartography design system
- [ ] Prices align with existing service card pricing (no contradictions)
- [ ] Accessible: semantic HTML, proper heading hierarchy
- [ ] No layout shift on page load

## Testing Requirements

- [ ] Renders correctly at 320px, 768px, 1024px, 1440px
- [ ] All CTA buttons link to the correct destination
- [ ] Pricing is consistent with service accordion card details
- [ ] `astro build` succeeds
- [ ] No console errors

## Completion Criteria

Pricing comparison block is live, visually anchoring the service tiers, and driving visitors toward the contact form.

---

**Completed:** --
**Blockers Encountered:** --
**Notes:** Tier structure and pricing are draft values. Nate should confirm before final implementation.
