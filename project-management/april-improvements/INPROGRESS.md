# April Improvements — In Progress

> Last updated: 2026-04-09

---

## Project Overview

10 marketing/conversion improvements for natewhiteman.com, decomposed into 3 sprints with proper dependency management. Sprint AI-1 contains dev-only quick wins; Sprint AI-2 depends on content from Nate; Sprint AI-3 contains strategic infrastructure.

## Active Sprints

| Sprint | Status | Features | Gate |
|--------|--------|----------|------|
| [[sprint-ai-1]] | **✅ Complete** | AI-001, AI-002, AI-003, AI-004 | All 4 shipped 2026-04-09 |
| [[sprint-ai-2]] | **Blocked — awaiting answers from Nate** | AI-005, AI-006, AI-007, AI-008 | See planning questions below |
| [[sprint-ai-3]] | Blocked (Sprint AI-2 gate + external decisions) | AI-009, AI-010 | Lead magnet + blog post complete |

## In-Progress Features

_None yet — Sprint AI-1 is ready to begin._

## Blocked Features

| Feature | Blocker | Path to Resolution |
|---------|---------|-------------------|
| [[AI-005-testimonials-section]] | Sprint AI-1 gate + Nate must provide testimonial content | Complete Sprint AI-1, then Nate provides testimonial |
| [[AI-006-loom-video-dashboarding]] | Sprint AI-1 gate + Nate must record Loom video | Complete Sprint AI-1, then Nate records video |
| [[AI-007-industry-vertical-landing-page]] | Sprint AI-1 gate + Nate must choose industry vertical | Complete Sprint AI-1, then Nate decides vertical |
| [[AI-008-outcome-led-case-studies]] | Sprint AI-1 gate + Nate must provide case study data | Complete Sprint AI-1, then Nate provides data |
| [[AI-009-lead-magnet-pdf-email-capture]] | Sprint AI-2 gate + 4 external decisions from Nate | Complete Sprint AI-2, then Nate makes decisions |
| [[AI-010-vertical-benchmark-blog-post]] | Sprint AI-2 gate | Complete Sprint AI-2 |

## Ready to Start Now

These features have NO unmet dependencies and can begin immediately:

1. **[[AI-001-before-after-dashboarding-visual]]** — Before/after component for dashboarding card (2 hours)
2. **[[AI-002-who-this-is-for-copy-block]]** — Client qualification copy block (1 hour)
3. **[[AI-003-interactive-roi-calculator]]** — ROI calculator component (1-2 days)
4. **[[AI-004-pricing-anchor-comparison-block]]** — 3-tier pricing comparison (2 hours)

All 4 can be built in parallel.

## Troubleshooting / Active Diagnoses

_None at this time._

---

## Planning Questions for Nate

These decisions are needed before Sprint AI-2 and AI-3 features can proceed. Nate can begin working on these now while Sprint AI-1 is being built.

### Sprint AI-2 Blockers

1. **Testimonials (AI-005):** Do you have any past clients who could provide a testimonial? If yes, are you comfortable reaching out to them? Even an anonymized quote ("Data Scientist at a mid-size HVAC company") is valuable.

2. **Loom Video (AI-006):** Are you ready to record a ~3 minute Loom walkthrough of the property dashboard sample? It should show the dashboard in action and include your face in the Loom bubble.

3. **Industry Vertical (AI-007):** Which industry do you want to target first for the niche landing page? Options based on your portfolio samples:
   - Financial Advisory
   - HVAC
   - Real Estate
   - Retail
   - Law Firms

4. **Case Studies (AI-008):** Do you have 1-3 real engagements you can describe (even anonymized by industry/size)? Each needs: client description, the problem, what you built, and a measurable result.

### Sprint AI-3 Blockers

5. **Lead Magnet Topic (AI-009):** Which topic do you prefer?
   - A: "The SMB Data Readiness Checklist"
   - B: "5 Questions to Ask Before Buying an AI Tool"

6. **Email Marketing Tool (AI-009):** Do you already use an email marketing tool, or do you need one set up? Options:
   - **Resend** — already integrated for transactional emails
   - **ConvertKit** — popular with solo consultants, good free tier
   - **Mailchimp** — most well-known, free up to 500 contacts
   - **Beehiiv** — newsletter-focused, growing platform

---

## Dependency Graph (Visual)

```
Sprint AI-1: Quick Wins (No External Dependencies)
====================================================
AI-001 (Before/After Visual) ────────┐
AI-002 ("Who This Is For") ──────────┤  ALL PARALLEL
AI-003 (ROI Calculator) ─────────────┤
AI-004 (Pricing Anchor) ─────────────┘

         ║ Sprint AI-1 Gate ║

Sprint AI-2: Content-Dependent (Each Blocked on Nate)
====================================================
[Nate: testimonial]   → AI-005 (Testimonials) ────────┐
[Nate: Loom video]    → AI-006 (Loom Embed) ──────────┤  ALL PARALLEL
[Nate: vertical pick] → AI-007 (Landing Page) ────────┤  (once content arrives)
[Nate: case study]    → AI-008 (Case Studies) ─────────┘

         ║ Sprint AI-2 Gate ║

Sprint AI-3: Strategic Infrastructure
====================================================
[Nate: topic + PDF + email tool] → AI-009 (Lead Magnet) ──┐
                                                            ├  PARALLEL
[No hard blockers]               → AI-010 (Blog Post) ────┘
```
