# AI-006: Loom Video Walkthrough on Dashboarding Card

#feature #april-improvements #sprint-ai-2

**Status:** Not Started
**Sprint:** [[sprint-ai-2]]
**Priority:** Rank 2 (High Leverage)
**Estimated Effort:** Low (1 hour dev, but blocked on content)
**Actual Effort:** --
**Assigned:** Claude Code (implementation agent)

---

## Description

Embed a short Loom video (approx. 3 minutes) inside the Custom Dashboarding service accordion card on the Services page. The video shows Nate giving a live walkthrough of the property dashboard sample, demonstrating real functionality and building trust through transparency.

### Content Requirement (EXTERNAL DEPENDENCY)

Nate must record a ~3 minute Loom video walking through the property dashboard sample. The video should:
- Show the actual dashboard in action (filters, drill-downs, interactivity)
- Include Nate's face in the Loom bubble (builds personal connection)
- Be concise and focused — not a tutorial, but a "here's what I built for a client" walkthrough
- End with a soft CTA: "If this looks like what your team needs, let's talk"

### Technical Implementation

- Use Loom's embed iframe or `<video>` element with Loom's share URL
- Lazy-load the embed (`loading="lazy"` or `client:visible` wrapper)
- Show a thumbnail/poster frame before the video loads to prevent CLS
- Ensure the embed is responsive and doesn't break the accordion layout
- Consider a lightweight custom play button overlay on the thumbnail for faster initial load (avoid loading Loom's full embed until user clicks play)

### Placement

Inside the Custom Dashboarding accordion card, below the description text and above or alongside the before/after visual ([[AI-001-before-after-dashboarding-visual]]).

## Dependencies

- **EXTERNAL:** Nate must record and share the Loom video URL.
- **SOFT:** [[AI-001-before-after-dashboarding-visual]] — not a hard dependency, but ideally both enrich the same card.

## Acceptance Criteria

- [ ] Loom video embed is present inside the Custom Dashboarding accordion card
- [ ] Video plays correctly when clicked
- [ ] Thumbnail/poster is visible before video loads (no blank space)
- [ ] Embed is lazy-loaded (doesn't block initial page load)
- [ ] Responsive at 320px, 768px, 1024px, 1440px
- [ ] Accordion expand/collapse still works smoothly with the embed
- [ ] No layout shift when video loads (CLS < 0.1)
- [ ] Video content is a real Loom recording by Nate (not a placeholder)

## Testing Requirements

- [ ] Video plays in Chrome, Firefox, Safari
- [ ] Embed loads lazily (verify in network tab)
- [ ] Accordion behavior is unaffected
- [ ] `astro build` succeeds
- [ ] No console errors
- [ ] Responsive at all breakpoints

## Completion Criteria

Loom video is embedded in the dashboarding card, plays smoothly, loads efficiently, and shows Nate's real walkthrough.

---

**Completed:** --
**Blockers Encountered:** Blocked on Nate recording the Loom video.
**Notes:** --
