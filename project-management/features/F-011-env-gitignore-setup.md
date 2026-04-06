# F-011: .env and .gitignore Setup

#feature #sprint-2

**Status:** Not Started
**Sprint:** [[sprint-2]]
**Estimated Effort:** Low (15 minutes)
**Actual Effort:** —
**Assigned:** Claude Code (implementation agent)

---

## Description

Ensure the project has a proper `.gitignore` that excludes sensitive files and build artifacts, and create a `.env.example` file documenting required environment variables without containing actual secrets.

### .gitignore Requirements

Must include at minimum:
```
# Dependencies
node_modules/

# Build output
dist/

# Astro cache
.astro/

# Environment variables (NEVER commit)
.env
.env.local
.env.production

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Leads (stored in GitHub via API, not in local checkout)
leads/
```

### .env.example File

```
# GitHub API — for contact form lead capture
# Create a fine-grained token at: https://github.com/settings/tokens?type=beta
# Required permissions: Contents (Read and Write) on natewhiteman-com repo
GITHUB_TOKEN=ghp_your_token_here

# Repository in owner/name format
GITHUB_REPO=natewhiteman/natewhiteman-com
```

## Dependencies

None — this is a foundational hygiene feature.

Should be completed BEFORE [[F-007-contact-api-endpoint]] to prevent accidental token commits.

## Acceptance Criteria

- [ ] `.gitignore` exists with all required entries
- [ ] `.env.example` exists with documented variables (no real secrets)
- [ ] `.env` is not tracked by git
- [ ] `node_modules/` is not tracked by git
- [ ] `dist/` is not tracked by git

## Testing Requirements

- [ ] `git status` does not show `.env` as tracked
- [ ] `git status` does not show `node_modules/` as tracked

## Completion Criteria

Project has clean `.gitignore` and documented environment variable template.

---

**Completed:** —
**Blockers Encountered:** —
**Notes:** This is a quick hygiene task but CRITICAL for security. Must be done before any tokens are created.
