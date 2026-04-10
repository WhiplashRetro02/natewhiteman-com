# AI-008: Outcome-Led Case Studies

#feature #april-improvements #sprint-ai-2

**Status:** Not Started
**Sprint:** [[sprint-ai-2]]
**Priority:** Rank 8 (Ongoing)
**Estimated Effort:** Medium (1 day for first case study, ongoing for subsequent ones)
**Actual Effort:** --
**Assigned:** Claude Code (implementation agent)

---

## Description

Replace or supplement the fictional portfolio samples with 1-3 real outcome-led case studies. Each case study follows a structured narrative: business type, specific problem, what was built, and measurable result. These are more powerful than portfolio descriptions because they prove real-world impact.

### Content Requirement (EXTERNAL DEPENDENCY)

Nate must provide real client data (or anonymized real data) for at least 1 case study. Each case study needs:

1. **Client description** — Industry, company size, role of the person who hired Nate (can be anonymized: "A mid-size HVAC company with 3 locations")
2. **The problem** — What was broken? What was costing them time/money?
3. **What was built** — Specific deliverables (dashboard, model, analysis, etc.)
4. **Measurable result** — Quantified outcome: time saved, revenue gained, costs reduced, decisions improved. Must be real or reasonably estimated.
5. **Optional: quote** — A sentence from the client about the engagement

### Page Design

- Can be implemented as:
  - A dedicated `/case-studies` page with individual cards
  - Individual case study pages (`/case-studies/[slug]`)
  - A section on the Services page or homepage
- Each case study should feel like a mini-story, not a bullet list
- Visual hierarchy: problem (hook) > solution (what) > result (proof)
- Consider a "by the numbers" highlight block for the measurable result

### Connection to Existing Portfolio

- Case studies can link to or replace existing portfolio sample pages
- Maintain the portfolio section but enhance individual entries with real outcome data

## Dependencies

- **EXTERNAL:** Nate must provide real case study content (at least 1 engagement with measurable outcome).

## Acceptance Criteria

- [ ] At least 1 real case study is published on the site
- [ ] Case study follows the narrative structure: problem > solution > result
- [ ] Measurable outcome is prominently displayed
- [ ] Case study is discoverable from the Services page and/or homepage
- [ ] Content is based on real client work (not fabricated)
- [ ] Responsive at 320px, 768px, 1024px, 1440px
- [ ] Follows Neural Cartography design system
- [ ] Accessible: semantic HTML, proper heading hierarchy

## Testing Requirements

- [ ] Case study page(s) render correctly at all breakpoints
- [ ] Navigation to/from case studies works
- [ ] `astro build` succeeds
- [ ] No console errors
- [ ] Content is factually accurate (verified by Nate)

## Completion Criteria

At least one real outcome-led case study is live on the site, with quantified results and a clear narrative arc.

---

**Completed:** --
**Blockers Encountered:** Blocked on Nate providing real case study content.
**Notes:** This feature can be delivered incrementally — start with 1 case study and add more over time.
