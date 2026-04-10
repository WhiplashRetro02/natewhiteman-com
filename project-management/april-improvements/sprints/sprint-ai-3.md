# Sprint AI-3: Strategic Content & Infrastructure

#sprint #april-improvements

**Status:** Not Started
**Timeline:** Begins after Sprint AI-2 completion
**Goal:** Ship the lead magnet email capture system and a research-backed benchmark blog post. These are the highest-effort, most strategic features — they build long-term lead generation infrastructure.

---

## Sprint Features

| Feature | Priority Rank | Status | Dependencies | Effort | Parallelizable |
|---------|--------------|--------|-------------|--------|----------------|
| [[AI-009-lead-magnet-pdf-email-capture]] | Rank 6 | Not Started | EXTERNAL: topic choice, PDF content, email tool choice | Half day | Yes (once decisions made) |
| [[AI-010-vertical-benchmark-blog-post]] | Rank 9 | Not Started | SOFT: align with AI-007 vertical | 1-2 days | Yes |

## External Dependencies (Must Be Resolved Before Dev Starts)

| Dependency | Owner | Status | Question for Nate |
|-----------|-------|--------|-------------------|
| Lead magnet topic choice | Nate | Pending | "SMB Data Readiness Checklist" or "5 Questions Before Buying an AI Tool"? |
| Lead magnet PDF content | Nate | Pending | Content needs to be written or approved |
| Email marketing tool choice | Nate | Pending | Resend (already integrated), ConvertKit, Mailchimp, or Beehiiv? |
| Email tool account setup | Nate | Pending | Account needs to exist and have API credentials |

## Execution Order

```
Phase A (parallel — once external dependencies resolve):
  [Nate decides topic + writes PDF + chooses email tool]
    → AI-009 Lead Magnet + Email Capture

  [No external blockers — can begin research immediately]
    → AI-010 Benchmark Blog Post

Note: AI-010 can start as soon as Sprint AI-2 is complete.
AI-009 requires external decisions before dev can begin.
```

**Parallelization notes:**
- AI-010 has no hard external dependencies — research and writing can begin immediately after Sprint AI-2 gate
- AI-009 is blocked on 4 external decisions/tasks from Nate
- If AI-009's dependencies take time to resolve, AI-010 can proceed independently
- Recommended: start AI-010 research immediately while waiting for AI-009 decisions

## Sprint Completion Criteria

ALL must pass for the april-improvements project to be considered complete:

- [ ] Lead magnet PDF is created and hosted
- [ ] Email capture form is live and functional
- [ ] Email signups are captured in the chosen email tool
- [ ] PDF delivery works automatically
- [ ] Benchmark blog post is published with original analysis
- [ ] Blog post contains 3-5 data visualizations
- [ ] All data sources are properly cited
- [ ] All features are responsive at 320px, 768px, 1024px, 1440px
- [ ] All features follow the Neural Cartography design system
- [ ] `astro build` succeeds
- [ ] No console errors

## Testing Gate

Before marking Sprint AI-3 complete:
1. Run `astro build` — must succeed
2. Test email capture form end-to-end (submit, verify contact added, verify PDF delivered)
3. Navigate to blog post — verify visualizations render
4. Verify all source citations link correctly
5. Verify internal links between blog post, landing page, and services page
6. Visual inspection at 4 breakpoints
7. Full site regression check — all pages still work

---

**Started:** --
**Completed:** --
**Issues Encountered:** --
**Lessons Learned:** --
