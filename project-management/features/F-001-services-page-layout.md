# F-001: Services Page Layout & Structure

#feature #sprint-1

**Status:** Not Started
**Sprint:** [[sprint-1]]
**Estimated Effort:** Medium (2-3 hours)
**Actual Effort:** —
**Assigned:** Claude Code (implementation agent)

---

## Description

Create the dedicated Services page at `/services` (`src/pages/services.astro`) using the existing `Base.astro` layout. This is the structural skeleton — the page scaffolding, semantic HTML sections, and integration with the site's existing layout system.

The page must include these content sections (empty/placeholder content is fine — styling and content are separate features):

1. **Hero/Header** — Page title, value proposition tagline
2. **Services Grid** — Container for 5 service offering cards
3. **Process Section** — How Nate works with clients (discovery, execution, delivery)
4. **CTA Section** — Call-to-action driving visitors to the contact form
5. **Contact Form Section** — Placeholder for the form (implemented in [[F-005-contact-form-frontend]])

## Dependencies

None — this is a foundational feature.

## Acceptance Criteria

- [ ] File exists at `src/pages/services.astro`
- [ ] Page imports and uses `Base.astro` layout
- [ ] Page is accessible at `/services` in dev server
- [ ] All 5 semantic sections are present with proper HTML structure
- [ ] Page uses semantic HTML (`<section>`, `<article>`, proper headings hierarchy)
- [ ] `aria-labelledby` attributes on sections with corresponding heading IDs
- [ ] Page passes basic HTML validation (no unclosed tags, proper nesting)

## Testing Requirements

- [ ] Dev server renders page without errors at `/services`
- [ ] HTML structure passes semantic validation
- [ ] Layout renders correctly using Base.astro (nav, footer present)
- [ ] No console errors in browser

## Completion Criteria

All acceptance criteria checked. Page skeleton ready for styling (F-002) and content (F-003).

---

**Completed:** —
**Blockers Encountered:** —
**Notes:** —
