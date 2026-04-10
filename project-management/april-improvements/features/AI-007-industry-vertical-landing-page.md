# AI-007: Industry-Specific Landing Page

#feature #april-improvements #sprint-ai-2

**Status:** Not Started
**Sprint:** [[sprint-ai-2]]
**Priority:** Rank 5 (Strategic)
**Estimated Effort:** High (half day)
**Actual Effort:** --
**Assigned:** Claude Code (implementation agent)

---

## Description

Build one niche vertical landing page targeting a specific industry with pain-point-specific copy, relevant portfolio samples, and a direct CTA to the inquiry form. This page is designed for SEO and targeted outreach — Nate can link to it when reaching out to prospects in that vertical.

### Content Requirement (EXTERNAL DEPENDENCY)

Nate must choose which industry vertical to target first. Options based on portfolio samples already on the site:
- **Financial Advisors** — `/services/financial-advisors`
- **HVAC** — `/services/hvac`
- **Real Estate** — `/services/real-estate`
- **Retail** — `/services/retail`
- **Law Firms** — `/services/law-firms`

### Page Structure

1. **Hero** — Industry-specific headline addressing the core pain point (e.g., "Financial Advisors: Stop Losing 10 Hours a Week to Manual Reporting")
2. **Pain Points** — 3-4 specific problems this industry faces with data/reporting
3. **Solution** — How Nate's services solve those specific problems
4. **Social Proof** — Relevant portfolio sample link + testimonial if available ([[AI-005-testimonials-section]])
5. **ROI Hook** — Industry-specific cost calculation or stat (can link to [[AI-003-interactive-roi-calculator]])
6. **CTA** — Direct link to the inquiry form, pre-populated with industry context if possible

### SEO Considerations

- Page title and meta description targeting `[industry] + data analytics consultant` keywords
- Proper heading hierarchy (H1, H2, H3)
- Schema markup for service page (optional but valuable)
- Internal linking to/from the main Services page

## Dependencies

- **EXTERNAL:** Nate must choose the target industry vertical.
- **SOFT:** [[AI-005-testimonials-section]] — if a relevant testimonial exists, include it.
- **SOFT:** [[AI-003-interactive-roi-calculator]] — can link to calculator if it exists.

## Acceptance Criteria

- [ ] Landing page exists at `/services/[chosen-vertical]`
- [ ] Page content is specific to the chosen industry (not generic)
- [ ] Pain points are relevant and specific to the industry
- [ ] Solution section maps Nate's services to industry problems
- [ ] CTA links to the contact/inquiry form
- [ ] Page has proper SEO meta tags (title, description)
- [ ] Internal links to/from the main Services page
- [ ] Responsive at 320px, 768px, 1024px, 1440px
- [ ] Follows Neural Cartography design system
- [ ] Accessible: semantic HTML, proper heading hierarchy

## Testing Requirements

- [ ] Page renders correctly at all breakpoints
- [ ] All links work (CTA, portfolio sample, internal nav)
- [ ] SEO meta tags are present and correct
- [ ] `astro build` succeeds
- [ ] No console errors
- [ ] Page is discoverable from the main Services page

## Completion Criteria

Industry-specific landing page is live, with targeted copy, relevant portfolio links, and a clear conversion path to the inquiry form.

---

**Completed:** --
**Blockers Encountered:** Blocked on Nate choosing the target industry vertical.
**Notes:** --
