# AI-005: Testimonials Section

#feature #april-improvements #sprint-ai-2

**Status:** Not Started
**Sprint:** [[sprint-ai-2]]
**Priority:** Rank 1 (Highest Leverage)
**Estimated Effort:** Low (30 minutes dev, but blocked on content)
**Actual Effort:** --
**Assigned:** Claude Code (implementation agent)

---

## Description

Add a testimonials section to the site — on the homepage and/or the Services page — displaying 1 or more real testimonials from past clients. Social proof is the single highest-leverage conversion improvement for the site.

### Content Requirement (EXTERNAL DEPENDENCY)

Nate must obtain at least one real testimonial from a past client before this feature can be implemented. The testimonial should include:
- Client name (or "Anonymous, [Industry]" if anonymized)
- Client title/role (optional but adds credibility)
- Company name or industry vertical
- 1-3 sentence quote about the engagement and outcome
- Optional: headshot or company logo

### Design Direction

- Testimonial cards or a quote block with proper attribution
- If multiple testimonials: horizontal carousel or stacked cards
- Visual emphasis through pull-quote styling, larger type, or background treatment
- Should feel authentic, not templated
- Consider placement: below services, above CTA, or as a dedicated section

### Scalability

Design the component to handle 1-5 testimonials gracefully. Start with 1, expand as more are collected.

## Dependencies

- **EXTERNAL:** Nate must provide at least one real testimonial — text content, attribution, and permission to use it.

## Acceptance Criteria

- [ ] Testimonials section exists on the homepage and/or Services page
- [ ] At least 1 real testimonial is displayed with proper attribution
- [ ] Component handles 1-5 testimonials without layout issues
- [ ] Design feels authentic and premium (not a stock template)
- [ ] Responsive at 320px, 768px, 1024px, 1440px
- [ ] Follows Neural Cartography design system
- [ ] Accessible: blockquote semantics, proper cite element
- [ ] Testimonial content is real (not fabricated)

## Testing Requirements

- [ ] Section renders correctly at all breakpoints
- [ ] Testimonial attribution is accurate
- [ ] `astro build` succeeds
- [ ] No console errors
- [ ] Component gracefully handles different testimonial counts (1, 2, 3+)

## Completion Criteria

At least one real testimonial is live on the site with proper attribution, displayed in a visually compelling component.

---

**Completed:** --
**Blockers Encountered:** Blocked on Nate providing real testimonial content.
**Notes:** This is the highest-leverage improvement on the list but requires Nate to reach out to past clients.
