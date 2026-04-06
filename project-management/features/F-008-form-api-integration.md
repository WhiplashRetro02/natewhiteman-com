# F-008: Connect Contact Form to API Endpoint

#feature #sprint-2

**Status:** Not Started
**Sprint:** [[sprint-2]]
**Estimated Effort:** Low (1 hour)
**Actual Effort:** —
**Assigned:** Claude Code (implementation agent)

---

## Description

Wire the contact form frontend ([[F-005-contact-form-frontend]]) to the API endpoint ([[F-007-contact-api-endpoint]]). Replace any mock/placeholder submission logic with actual `fetch()` calls to `POST /api/contact`.

### Integration Points

1. **Form submit handler:** `fetch('/api/contact', { method: 'POST', ... })`
2. **Request body:** JSON with `name`, `email`, `description`, and `honeypot` fields
3. **Response handling:**
   - `201` → Show success confirmation, clear form
   - `400` → Show validation error messages from response
   - `429` → Show "Too many submissions, please try again later"
   - `500` → Show "Something went wrong, please email directly"
   - Network error → Show offline/connectivity error

### Error Display

- Error messages appear above the form in a styled error banner
- Error banner uses `--node-red` color with `--bg-elevated` background
- Success message replaces the entire form with a green-tinted confirmation
- Include fallback: "You can also reach me at nate@natewhiteman.com"

## Dependencies

- [[F-005-contact-form-frontend]] — Must be Completed (need the form UI)
- [[F-007-contact-api-endpoint]] — Must be Completed (need the API to call)

## Acceptance Criteria

- [ ] Form submits to `/api/contact` via POST
- [ ] Request body is properly formatted JSON
- [ ] All response codes handled with appropriate UI feedback
- [ ] Network errors handled gracefully
- [ ] Success state shows confirmation with fallback email
- [ ] Error state preserves form data for retry
- [ ] Loading state prevents double submission
- [ ] Honeypot field value included in request body

## Testing Requirements

- [ ] End-to-end: Fill form, submit, verify lead file created in GitHub repo
- [ ] Submit with invalid data — verify error messages appear
- [ ] Submit too many times — verify rate limit message appears
- [ ] Disconnect network — verify offline error message
- [ ] Verify no console errors during normal flow

## Completion Criteria

Form and API working end-to-end. Submission creates a lead file in GitHub. All error states handled with user-friendly messages.

---

**Completed:** —
**Blockers Encountered:** —
**Notes:** End-to-end testing requires `GITHUB_TOKEN` and `GITHUB_REPO` environment variables to be set. For local development, these can be in a `.env` file (which must be in `.gitignore`).
