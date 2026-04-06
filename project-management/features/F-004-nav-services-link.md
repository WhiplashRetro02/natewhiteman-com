# F-004: Add Services Link to Navigation

#feature #sprint-1

**Status:** Not Started
**Sprint:** [[sprint-1]]
**Estimated Effort:** Low (15 minutes)
**Actual Effort:** —
**Assigned:** Claude Code (implementation agent)

---

## Description

Add a "Services" navigation link to `Base.astro`'s `<nav>` element. The link should point to `/services` and be positioned logically in the nav order.

### Current Nav Order
```
About | Systems | Projects | Thinking Out Loud | Current Project | Contact
```

### Proposed Nav Order
```
About | Systems | Projects | Services | Thinking Out Loud | Current Project | Contact
```

Services goes after Projects and before Thinking Out Loud because it represents Nate's active offerings — a natural bridge between "what I've built" (Projects) and "what I'm thinking about" (Writing).

## Dependencies

- [[F-001-services-page-layout]] — Should be Completed (the page should exist before linking to it, though technically the link can be added first)

## Acceptance Criteria

- [ ] "Services" link appears in `Base.astro` nav
- [ ] Link points to `/services`
- [ ] Link is positioned between Projects and Thinking Out Loud
- [ ] Link matches existing nav link styling (no additional CSS needed)
- [ ] Navigation remains visually balanced and does not overflow on mobile

## Testing Requirements

- [ ] Link renders in nav on all pages
- [ ] Clicking link navigates to `/services`
- [ ] Nav does not break at narrow viewports with the added link

## Completion Criteria

Services link visible in nav, functional, and visually consistent.

---

**Completed:** —
**Blockers Encountered:** —
**Notes:** Check if mobile nav needs adjustment for the additional link.
