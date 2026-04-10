# AI-002: "Who This Is For / Isn't For" Copy Block

#feature #april-improvements #sprint-ai-1

**Status:** Not Started
**Sprint:** [[sprint-ai-1]]
**Priority:** Rank 4 (Quick Win)
**Estimated Effort:** Low (1 hour)
**Actual Effort:** --
**Assigned:** Claude Code (implementation agent)

---

## Description

Add a clearly designed copy section to the Services page (and optionally the homepage) that explicitly states who Nate's ideal client is and who he does not work with. This section serves as a qualification filter — it attracts the right leads and repels the wrong ones before they ever fill out the contact form.

### Content Direction

**Who this is for:**
- Small-to-mid-size business owners drowning in spreadsheets and manual reporting
- Operations leaders who know they need better data visibility but don't have an in-house data team
- Founders who want to make decisions from dashboards, not gut instinct
- Teams already using tools like Excel, Google Sheets, QuickBooks, or Salesforce but not getting the insights they need

**Who this is NOT for:**
- Enterprise companies with existing data engineering teams (you don't need a solo consultant)
- Anyone looking for a cheap chatbot or off-the-shelf SaaS — Nate builds custom solutions
- Projects with no budget for quality work (see pricing on the service cards)
- People who want AI buzzwords without a real business problem to solve

### Design Direction

This should not look like a generic two-column pros/cons list. Consider:
- A single flowing section with a clear visual divide
- Checkmark/X iconography with personality
- Slightly editorial tone — confident, not aggressive
- Integrates with the existing page rhythm and spacing

## Dependencies

None — pure content and design task.

## Acceptance Criteria

- [ ] "Who This Is For / Isn't For" section exists on the Services page
- [ ] Content clearly defines the ideal client profile
- [ ] Content clearly states who Nate does NOT work with
- [ ] Tone matches Nate's brand voice: approachable, expert, direct
- [ ] Section is visually distinct and scannable (not a wall of text)
- [ ] Responsive at 320px, 768px, 1024px, 1440px
- [ ] Typography and spacing follow the Neural Cartography design system
- [ ] Accessible: proper heading hierarchy, semantic HTML
- [ ] Section placement makes sense in the page flow (above or near the CTA)

## Testing Requirements

- [ ] Section renders correctly at all breakpoints
- [ ] Content is readable and scannable
- [ ] `astro build` succeeds
- [ ] No console errors
- [ ] Page flow still feels cohesive with the new section added

## Completion Criteria

Copy block is live on the Services page, clearly qualifying the audience, and visually integrated with the existing design.

---

**Completed:** --
**Blockers Encountered:** --
**Notes:** --
