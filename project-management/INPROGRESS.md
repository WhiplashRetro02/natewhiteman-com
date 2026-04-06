# In Progress

> Last updated: 2026-04-06

---

## Active Sprints

| Sprint | Status | Features | Gate |
|--------|--------|----------|------|
| [[sprint-1]] | **Ready to Begin** | F-001, F-002, F-003, F-004 | Services page complete |
| [[sprint-2]] | Blocked (waiting on Sprint 1) | F-005, F-006, F-007, F-008, F-011 | Contact form end-to-end |
| [[sprint-3]] | Blocked (waiting on Sprint 2) | F-009, F-010 | Production deployment |

## In-Progress Features

_None yet — Sprint 1 is ready to begin._

## Blocked Features

| Feature | Blocker | Path to Resolution |
|---------|---------|-------------------|
| [[F-002-services-page-styling]] | Depends on [[F-001-services-page-layout]] | Complete F-001 first |
| [[F-003-services-page-content]] | Depends on F-001 and F-002 | Complete F-001 and F-002 first |
| [[F-005-contact-form-frontend]] | Sprint 1 gate (Sprint 1 must complete) | Complete Sprint 1 |
| [[F-007-contact-api-endpoint]] | Depends on [[F-006-astro-hybrid-output]] + Sprint 1 gate | Complete F-006 + Sprint 1 |
| [[F-008-form-api-integration]] | Depends on F-005 and F-007 | Complete F-005 and F-007 |
| [[F-009-cloudflare-env-config]] | Sprint 2 gate | Complete Sprint 2 |
| [[F-010-cloudflare-deployment]] | Depends on F-009 + Sprint 2 gate | Complete Sprint 2 + F-009 |

## Ready to Start Now

These features have NO unmet dependencies and can begin immediately:

1. **[[F-001-services-page-layout]]** — Services page skeleton (Sprint 1)
2. **[[F-004-nav-services-link]]** — Add Services to nav (Sprint 1)

## Troubleshooting / Active Diagnoses

_None at this time._

---

## Dependency Graph (Visual)

```
Sprint 1: Services Page
================================
F-001 (Layout) ──────┬──→ F-002 (Styling) ──→ F-003 (Content)
                     │
F-004 (Nav Link) ────┘
                     
         ║ Sprint 1 Gate ║

Sprint 2: Contact Form & API
================================
F-011 (.env/gitignore) ──────────────────────────┐
                                                  │
F-006 (Hybrid Mode) ──→ F-007 (API Endpoint) ───┤──→ F-008 (Integration)
                                                  │
F-005 (Form Frontend) ──────────────────────────┘

         ║ Sprint 2 Gate ║

Sprint 3: Deployment
================================
F-009 (Env Config) ──→ F-010 (Deploy to Cloudflare)
```
