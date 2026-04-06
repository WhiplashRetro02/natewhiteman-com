# Sprint 1: Services Page — Design, Build, Ship

#sprint

**Status:** Not Started
**Timeline:** Ready to begin immediately
**Goal:** Deliver a complete, polished Services page at `/services` with navigation integration.

---

## Sprint Features

| Feature | Status | Dependencies | Parallelizable |
|---------|--------|-------------|----------------|
| [[F-001-services-page-layout]] | Not Started | None | Yes — start immediately |
| [[F-004-nav-services-link]] | Not Started | F-001 (soft) | Yes — can start in parallel with F-001 |
| [[F-002-services-page-styling]] | Not Started | F-001 | No — needs F-001 done |
| [[F-003-services-page-content]] | Not Started | F-001, F-002 | No — needs structure and styles |

## Execution Order

```
Phase A (parallel):
  F-001 Services Page Layout ──┐
  F-004 Nav Services Link ─────┤
                                │
Phase B (after F-001):          │
  F-002 Services Page Styling ──┤
                                │
Phase C (after F-001 + F-002):  │
  F-003 Services Page Content ──┘
```

**Parallelization notes:**
- F-001 and F-004 can be done simultaneously (F-004 only touches `Base.astro`, F-001 creates a new file)
- F-002 must wait for F-001 (cannot style what does not exist)
- F-003 can partially overlap with F-002 (content can be drafted while styling is in progress, but final integration needs both)

## Sprint Completion Criteria

ALL must pass before Sprint 2 begins:

- [ ] Services page renders at `/services` without errors
- [ ] Page uses Neural Cartography design system consistently
- [ ] All 5 service offerings have complete content
- [ ] Navigation includes Services link, works from all pages
- [ ] Page is responsive at 320px, 768px, 1024px, 1440px
- [ ] Scroll animations work
- [ ] No console errors
- [ ] Anti-Template checklist passes (4+ of 7 design qualities)
- [ ] `astro build` succeeds with the new page included

## Testing Gate

Before marking Sprint 1 complete:
1. Run `astro build` — must succeed
2. Run `astro dev` — navigate to `/services`, verify all sections render
3. Visual inspection at 4 breakpoints
4. Click through all nav links — verify no broken links
5. Verify page matches homepage design quality

---

**Started:** —
**Completed:** —
**Issues Encountered:** —
**Lessons Learned:** —
