# AI-011: Knoxville Local Landing Page

#feature #april-improvements #sprint-ai-4

**Status:** Not Started
**Sprint:** [[sprint-ai-4]]
**Priority:** High (local SEO + lead generation)
**Estimated Effort:** Medium (4-6 hours)
**Actual Effort:** --
**Assigned:** Claude Code (implementation agent)

---

## Description

Build a high-converting local landing page at `/knoxville` targeting Knoxville SMB owners. Full copy is written and ready to implement — see [[knoxville-landing-page]] spec at `project-management/planned-developments/knoxville-landing-page.md`. No external content dependencies from Nate.

This page follows the same structural pattern as the existing real estate vertical landing page at `/services/real-estate` but is geo-targeted rather than industry-targeted.

### Page Structure

1. **Hero** — "Your Knoxville Business Deserves Better Than Spreadsheets" + dual CTAs (Calendly + anchor to packages)
2. **Trust Bar** — Fixed-Price / Knoxville-Based / Fast Delivery / You Own Everything
3. **Problem Section** — "The Real Cost of Doing It Manually" with 3-column stat callouts + ROI calculator link
4. **Packages** — Two tiers: Knoxville Starter ($297 + $49/mo) and Knoxville Pro Build ($1,200 + $149/mo) with comparison table
5. **How It Works** — 4-step process: Discovery Call, Scoped Proposal, Build, Handoff + Ongoing
6. **Work Samples Hook** — 3 sample cards linking to existing portfolio samples
7. **Who This Is For** — Two-column good fit / not a fit layout, Knoxville-specific
8. **Objection Block** — 6-question FAQ accordion
9. **Final CTA** — Calendly + inquiry form (Name, Business, Email, Phone, Package dropdown, Open text)
10. **Footer** — Links back to main site, services, samples

### Design Direction

- Match existing natewhiteman.com aesthetic (Neural Cartography design system)
- Subtle local identity signal (Tennessee/Knox County background element)
- Same clean, dark/neutral palette as the rest of the site
- No stock photos

### SEO

- Title: "Knoxville Small Business Data & CRM Services | Nate Whiteman"
- Description: "Custom CRMs, dashboards, and automation for Knoxville SMBs. Fixed price, fast delivery, $49/mo to maintain. Built by a local data consultant."
- URL: `/knoxville`
- Target keywords: Knoxville small business CRM, Knoxville data consultant, small business dashboard Knoxville TN, business automation Knoxville

## Dependencies

- **None** — all copy is written, no external content needed from Nate
- **DEPLOYMENT BLOCKER:** Cloudflare Pages deployment must be fixed before this page can go live (see [[BLOCKED]])
- **SOFT:** Can link to [[AI-003-interactive-roi-calculator]] (already shipped)
- **SOFT:** Can link to existing portfolio samples at `/samples/*`

## Acceptance Criteria

- [ ] Landing page exists at `/knoxville`
- [ ] All 10 sections from the spec are implemented
- [ ] Hero has dual CTAs (Calendly link + anchor scroll to packages)
- [ ] Both package tiers display with correct pricing ($297/$49 and $1,200/$149)
- [ ] Comparison table renders cleanly
- [ ] How It Works section has 4 numbered steps
- [ ] Work samples link to existing `/samples/*` pages
- [ ] Who This Is For has two-column good fit / not a fit layout
- [ ] FAQ accordion is functional with 6 questions
- [ ] Inquiry form has all specified fields (Name, Business, Email, Phone, Package dropdown, Open text)
- [ ] Internal links work: ROI calculator, services page, samples, Calendly
- [ ] Proper SEO meta tags (title, description, keywords)
- [ ] Responsive at 320px, 768px, 1024px, 1440px
- [ ] Follows Neural Cartography design system
- [ ] Accessible: semantic HTML, proper heading hierarchy, ARIA labels
- [ ] No layout shifts (CLS < 0.1)

## Testing Requirements

- [ ] Page renders correctly at all 4 breakpoints (320, 768, 1024, 1440)
- [ ] All internal links work (CTA, portfolio samples, ROI calc, services page)
- [ ] Calendly link opens correctly
- [ ] Inquiry form submits successfully
- [ ] FAQ accordion expand/collapse works
- [ ] SEO meta tags present and correct
- [ ] `astro build` succeeds
- [ ] No console errors
- [ ] Page is discoverable from the main site navigation or footer

## Completion Criteria

Knoxville local landing page is live at `/knoxville` with all 10 sections implemented, both package tiers displayed, functional inquiry form, and proper SEO metadata. All links work and the page is responsive.

---

**Completed:** --
**Blockers Encountered:** --
**Notes:** Full copy spec at `project-management/planned-developments/knoxville-landing-page.md`. This is a pure dev/design task with no external content dependencies.
