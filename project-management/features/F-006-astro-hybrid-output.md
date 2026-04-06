# F-006: Switch Astro Output to Hybrid Mode

#feature #sprint-2

**Status:** Not Started
**Sprint:** [[sprint-2]]
**Estimated Effort:** Low (30 minutes)
**Actual Effort:** —
**Assigned:** Claude Code (implementation agent)

---

## Description

Change `astro.config.mjs` from `output: 'static'` to `output: 'hybrid'` to enable server-side endpoints while keeping existing pages statically generated.

### Changes Required

1. **`astro.config.mjs`:** Change `output: 'static'` to `output: 'hybrid'`
2. **Existing pages:** Verify all existing pages (`index.astro`, `annabeth.astro`, `404.astro`, `writing/[slug].astro`) still build as static (they should by default in hybrid mode)
3. **Verify adapter:** The `@astrojs/cloudflare` adapter already supports hybrid mode. Confirm it works with the current adapter version (`^12.3.0`).

### Technical Context

In Astro 5.x hybrid mode:
- Pages are **static by default** (prerendered at build time)
- Pages/endpoints can opt into **server rendering** by exporting `export const prerender = false`
- The Cloudflare adapter handles server endpoints as Cloudflare Workers/Functions
- This is the required foundation for the contact form API endpoint ([[F-007-contact-api-endpoint]])

## Dependencies

None — this is a configuration change that enables future features.

However, it should be implemented BEFORE [[F-007-contact-api-endpoint]] since the endpoint requires hybrid mode.

## Acceptance Criteria

- [ ] `astro.config.mjs` has `output: 'hybrid'`
- [ ] `astro build` completes without errors
- [ ] All existing pages still render correctly in dev (`astro dev`)
- [ ] All existing pages are statically generated in build output
- [ ] No behavioral regressions on existing pages

## Testing Requirements

- [ ] `astro build` succeeds
- [ ] `astro dev` serves all existing pages without errors
- [ ] Homepage (`/`) renders correctly
- [ ] Blog posts (`/writing/[slug]`) render correctly
- [ ] Annabeth page (`/annabeth`) renders correctly
- [ ] 404 page renders correctly

## Completion Criteria

Hybrid mode enabled. All existing functionality preserved. Build succeeds.

---

**Completed:** —
**Blockers Encountered:** —
**Notes:** This is a low-risk change since hybrid mode defaults to static. The only risk is adapter compatibility — verify with the Cloudflare adapter docs for v12.x.
