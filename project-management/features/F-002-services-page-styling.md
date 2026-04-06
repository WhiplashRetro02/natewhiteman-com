# F-002: Services Page Styling — Neural Cartography Design

#feature #sprint-1

**Status:** Not Started
**Sprint:** [[sprint-1]]
**Estimated Effort:** High (3-5 hours)
**Actual Effort:** —
**Assigned:** Claude Code (implementation agent)

---

## Description

Apply the "Neural Cartography" design system to the Services page skeleton created in [[F-001-services-page-layout]]. This is the visual design feature — everything that makes the page look premium and intentional rather than template-generic.

### Design System Tokens (from `global.css`)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-void` | `#060608` | Page background |
| `--bg-elevated` | `#111116` | Card backgrounds |
| `--bg-surface` | `#16161d` | Elevated surfaces |
| `--accent` | `#cfa85c` | Gold accent color |
| `--font-display` | Bricolage Grotesque | Headings |
| `--font-body` | Libre Franklin | Body text |
| `--font-mono` | JetBrains Mono | Monospace accents |
| `--font-serif` | Instrument Serif | Italic display accents |

### Required Design Qualities (per Anti-Template Policy)

The Services page MUST demonstrate at least 4 of these:

1. **Clear hierarchy through scale contrast** — Hero title vs service card titles vs body
2. **Intentional rhythm in spacing** — Not uniform padding; varied section spacing
3. **Depth/layering** — Card surfaces, hover elevation, subtle shadows
4. **Typography with character** — Bricolage headings, Instrument Serif accents, JetBrains Mono labels
5. **Color used semantically** — Gold for CTAs and emphasis, not just decoration
6. **Hover/focus/active states** — Cards lift, buttons pulse, links glow
7. **Motion that clarifies** — `.animate-in` scroll reveals, hover transitions

### Specific Styling Requirements

- **Service Cards:** Elevated surface (`--bg-card`) with `--border-subtle` border, hover state that shifts to `--bg-card-hover` with `--border-accent` glow. Each card should have a monospace label/number prefix (like the index page's "01", "02" pattern).
- **Hero:** Large Bricolage Grotesque heading with Instrument Serif italic accent word. Match the scale contrast of the homepage hero.
- **Section transitions:** Gradient fade between sections, not hard cuts.
- **CTA buttons:** Match existing `.btn--primary` and `.btn--ghost` patterns.
- **Scroll animations:** Apply `.animate-in` class for intersection observer reveals.

## Dependencies

- [[F-001-services-page-layout]] — Must be Completed (need HTML structure to style)

## Acceptance Criteria

- [ ] All CSS uses existing design tokens from `global.css` (no hardcoded colors/fonts)
- [ ] Service cards have distinct hover/focus/active states
- [ ] Page hero has scale contrast matching homepage quality
- [ ] Typography uses the correct font stack per element type
- [ ] Responsive: renders well at 320px, 768px, 1024px, 1440px
- [ ] Scroll animations applied to sections (`.animate-in`)
- [ ] No layout shifts during scroll animations
- [ ] Page visually coheres with homepage — same design family
- [ ] Anti-Template checklist: at least 4 of 7 design qualities demonstrated

## Testing Requirements

- [ ] Visual inspection at 4 breakpoints (320, 768, 1024, 1440)
- [ ] Hover states verified on interactive elements
- [ ] Scroll animation triggers verified
- [ ] No overflow issues at any breakpoint
- [ ] Page matches design system — no off-brand elements

## Completion Criteria

Page looks premium and intentional. Passes Anti-Template checklist. Visually coheres with the homepage's Neural Cartography aesthetic.

---

**Completed:** —
**Blockers Encountered:** —
**Notes:** Styling may be scoped within `services.astro` or added to `global.css` depending on reuse. Prefer scoped `<style>` in the Astro file for page-specific styles.
