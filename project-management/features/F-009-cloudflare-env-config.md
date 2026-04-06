# F-009: Cloudflare Pages Environment Configuration

#feature #sprint-3

**Status:** Not Started
**Sprint:** [[sprint-3]]
**Estimated Effort:** Low (30 minutes)
**Actual Effort:** —
**Assigned:** Nate (manual configuration in Cloudflare dashboard)

---

## Description

Document and configure the environment variables required in the Cloudflare Pages dashboard for the contact form API to function in production.

### Required Environment Variables

| Variable | Value | Where to Set | Notes |
|----------|-------|-------------|-------|
| `GITHUB_TOKEN` | `ghp_...` | Cloudflare Pages > Settings > Environment Variables | Must have `contents:write` scope on the target repo. Set as **encrypted**. |
| `GITHUB_REPO` | `natewhiteman/natewhiteman-com` | Cloudflare Pages > Settings > Environment Variables | Format: `owner/repo-name`. Can be plaintext. |

### GitHub Token Creation

1. Go to GitHub > Settings > Developer Settings > Personal Access Tokens > Fine-grained tokens
2. Create a new token with:
   - **Repository access:** Only select `natewhiteman-com` repo
   - **Permissions:** Contents — Read and Write
   - **Expiration:** 90 days (set a calendar reminder to rotate)
3. Copy the token value

### Cloudflare Pages Configuration

1. Go to Cloudflare dashboard > Pages > `natewhiteman-com` project
2. Settings > Environment Variables
3. Add both variables for **Production** environment
4. Optionally add for **Preview** environment (useful for testing PRs)
5. `GITHUB_TOKEN` should be set as **Encrypted** (cannot be read after save)

### Local Development

For local dev, create a `.env` file in the project root:
```
GITHUB_TOKEN=ghp_your_token_here
GITHUB_REPO=natewhiteman/natewhiteman-com
```

Verify `.env` is in `.gitignore` (CRITICAL — never commit tokens).

## Dependencies

- [[F-007-contact-api-endpoint]] — Should be Completed (the endpoint consumes these vars)
- [[F-010-cloudflare-deployment]] — This must be done before or during deployment

## Acceptance Criteria

- [ ] Documentation exists listing all required env vars with descriptions
- [ ] GitHub fine-grained token created with minimal permissions
- [ ] Token has `contents:write` scope on `natewhiteman-com` repo only
- [ ] Cloudflare Pages has `GITHUB_TOKEN` set as encrypted variable
- [ ] Cloudflare Pages has `GITHUB_REPO` set as plaintext variable
- [ ] `.env` file exists locally for development
- [ ] `.env` is listed in `.gitignore`
- [ ] Local dev endpoint can authenticate to GitHub API

## Testing Requirements

- [ ] Local: Submit form, verify lead file created in GitHub
- [ ] Production: Submit form after deployment, verify lead file created

## Completion Criteria

All environment variables configured in both local and Cloudflare environments. Contact form API authenticates to GitHub successfully.

---

**Completed:** —
**Blockers Encountered:** —
**Notes:** This feature requires Nate's direct action — Claude Code cannot create GitHub tokens or access the Cloudflare dashboard. Document the steps clearly so Nate can execute them.
