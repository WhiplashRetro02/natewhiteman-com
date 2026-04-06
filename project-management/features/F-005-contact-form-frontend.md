# F-005: Contact Form — Frontend Component

#feature #sprint-2

**Status:** Not Started
**Sprint:** [[sprint-2]]
**Estimated Effort:** Medium (2-3 hours)
**Actual Effort:** —
**Assigned:** Claude Code (implementation agent)

---

## Description

Build the contact form UI as a section within the Services page (`/services`). The form collects lead information and submits it to the API endpoint created in [[F-007-contact-api-endpoint]].

### Form Fields

1. **Name** — Text input, required, max 100 characters
2. **Email** — Email input, required, validated for email format
3. **Description** — Textarea, required, min 20 characters, max 2000 characters
   - Placeholder: "Briefly describe what you're looking for..."

### Form Behavior

- Client-side validation before submission (HTML5 + JS)
- Submit button disabled while submitting (prevent double-submit)
- Loading state shown during API call
- Success state: Replace form with confirmation message
- Error state: Show error message above form, keep form data intact
- Honeypot field for spam prevention (hidden field that bots will fill)

### Design Requirements

- Form section uses Neural Cartography design system
- Input fields: `--bg-elevated` background, `--border-default` border, `--border-accent` on focus
- Labels: `--font-body` in `--text-secondary`, move above input on focus (float label pattern or standard label-above)
- Submit button: `.btn--primary` styling
- Form card: Elevated surface with subtle border, matching service card depth
- Character count display for textarea

## Dependencies

- [[F-001-services-page-layout]] — Must be Completed (form lives inside Services page)
- [[F-002-services-page-styling]] — Must be Completed (form styling must cohere with page)

Note: The form frontend can be built before the API endpoint ([[F-007-contact-api-endpoint]]) — it just needs a POST target URL configured. During development, the form can submit to a placeholder that returns mock responses.

## Acceptance Criteria

- [ ] Form renders within the Services page contact section
- [ ] All 3 fields present with proper labels and placeholders
- [ ] Client-side validation prevents empty/invalid submissions
- [ ] Email format validation works
- [ ] Textarea enforces min/max length with character count
- [ ] Honeypot hidden field present (not visible to users, catches bots)
- [ ] Submit button shows loading state during submission
- [ ] Success message replaces form on successful submission
- [ ] Error message shown on failure (form data preserved)
- [ ] Form is keyboard-navigable (Tab between fields, Enter to submit)
- [ ] Form inputs have proper `autocomplete` attributes

## Testing Requirements

- [ ] Form renders correctly at all breakpoints (320, 768, 1024, 1440)
- [ ] Validation messages appear for empty required fields
- [ ] Invalid email format is rejected
- [ ] Textarea min/max length enforced
- [ ] Keyboard navigation works (Tab order, Enter submit)
- [ ] Screen reader: labels associated with inputs, error messages announced
- [ ] Focus states visible and styled

## Completion Criteria

Form UI is complete, styled, validates input, and is ready to connect to the API endpoint. Works in isolation with mock responses.

---

**Completed:** —
**Blockers Encountered:** —
**Notes:** Use vanilla JS for form handling — no need for a framework. Astro's `<script>` tag with `is:inline` or a separate client-side script.
