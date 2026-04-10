# AI-009: Lead Magnet PDF + Email Capture

#feature #april-improvements #sprint-ai-3

**Status:** Not Started
**Sprint:** [[sprint-ai-3]]
**Priority:** Rank 6 (Strategic Infrastructure)
**Estimated Effort:** High (half day)
**Actual Effort:** --
**Assigned:** Claude Code (implementation agent)

---

## Description

Create a downloadable PDF lead magnet with an email capture form on the site. The lead magnet provides genuine value (a checklist or guide) in exchange for the visitor's email address, building Nate's email list for future nurture campaigns.

### Three Sub-Tasks

#### A. PDF Content (EXTERNAL DEPENDENCY)

Nate must write or approve the content for the lead magnet. Two candidate topics:
1. **"The SMB Data Readiness Checklist"** — A checklist businesses can use to assess whether they're ready to invest in data/analytics tooling
2. **"5 Questions to Ask Before Buying an AI Tool"** — A practical guide for non-technical business owners evaluating AI solutions

The PDF should be:
- 3-5 pages, visually designed (not a plain Word doc)
- Branded with Nate's site design (Neural Cartography colors, typography)
- Genuinely useful — something the target audience would actually want

#### B. Email Capture Form

Build a form component on the site:
- Fields: Name, Email (minimal friction)
- On submit: add to email list, trigger PDF delivery
- Honeypot spam prevention (consistent with existing contact form pattern)
- Success state: "Check your inbox — your checklist is on the way"
- Error handling for invalid emails, failed submissions

#### C. Email List Tool (EXTERNAL DEPENDENCY / DECISION REQUIRED)

Nate needs to choose an email marketing tool:
- **Resend** — Already integrated for contact form transactional emails. Can it handle list management?
- **ConvertKit** — Popular with solo consultants, good automation, generous free tier
- **Mailchimp** — Most well-known, free tier up to 500 contacts
- **Beehiiv** — Newsletter-focused, growing platform

Decision point: the choice affects implementation approach (API integration, form action, etc.)

## Dependencies

- **EXTERNAL:** Nate must choose the lead magnet topic (A)
- **EXTERNAL:** Nate must write or approve the PDF content (A)
- **EXTERNAL:** Nate must choose the email marketing tool (C)
- **EXTERNAL:** Email marketing tool account must be set up (C)

## Acceptance Criteria

- [ ] PDF lead magnet is created, designed, and hosted
- [ ] Email capture form renders on the site (homepage, services page, or dedicated landing page)
- [ ] Form collects name and email with proper validation
- [ ] Submission adds the contact to the chosen email list
- [ ] PDF is delivered automatically after signup (via email or direct download)
- [ ] Honeypot spam prevention is active
- [ ] Success/error states display correctly
- [ ] Form is responsive at 320px, 768px, 1024px, 1440px
- [ ] Privacy-compliant: no data collected without consent
- [ ] Follows Neural Cartography design system

## Testing Requirements

- [ ] Form submission works end-to-end (email received, contact added to list)
- [ ] PDF download/delivery works
- [ ] Validation catches invalid inputs
- [ ] Honeypot catches spam submissions
- [ ] `astro build` succeeds
- [ ] No console errors
- [ ] Form works in Chrome, Firefox, Safari

## Completion Criteria

Lead magnet PDF is available, email capture form is live, and new signups receive the PDF automatically.

---

**Completed:** --
**Blockers Encountered:** Blocked on multiple external decisions and content.
**Notes:** This feature has the most external dependencies in the april-improvements project.
