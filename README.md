# natewhiteman.com

Personal site and blog. Built with [Astro](https://astro.build), deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Stack

- **Framework:** Astro 5 (static output)
- **Hosting:** Cloudflare Pages (free tier)
- **Domain:** natewhiteman.com via Cloudflare Registrar
- **Email:** Cloudflare Email Routing → personal inbox
- **Analytics:** Cloudflare Web Analytics (free, no cookies)
- **Blog:** Markdown content collections (no CMS, no database)
- **Cost:** ~$10/year (domain only)

## Quick Start

```bash
# Clone and install
git clone https://github.com/YOUR_HANDLE/natewhiteman-com.git
cd natewhiteman-com
npm install

# Run dev server
npm run dev
# → http://localhost:4321

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
natewhiteman-com/
├── src/
│   ├── layouts/
│   │   └── Base.astro              ← shared chrome: head, nav, footer, ambient bg
│   ├── pages/
│   │   ├── index.astro             ← homepage (hero, about, systems, projects, writing, contact)
│   │   └── writing/
│   │       └── [slug].astro        ← dynamic blog post routes
│   ├── content/
│   │   ├── config.ts               ← content collection schema
│   │   └── blog/
│   │       ├── ai-initiatives-fail-at-data.md
│   │       └── knowledge-graphs-for-ai.md
│   └── styles/
│       └── global.css              ← all styles (design tokens, components, responsive)
├── public/
│   ├── favicon.svg
│   └── og-image.png                ← social share image (create this: 1200×630px)
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

## Deploy to Cloudflare Pages

### First-time setup

1. Push this repo to GitHub:
   ```bash
   git init
   git add .
   git commit -m "initial site"
   gh repo create natewhiteman-com --public --push
   ```

2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create**

3. Connect to GitHub → select the `natewhiteman-com` repo

4. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** Set environment variable `NODE_VERSION` = `20`

5. Deploy. Cloudflare builds and deploys automatically.

### Connect your domain

1. In Cloudflare Pages → your project → **Custom domains**
2. Add `natewhiteman.com`
3. Since the domain is on Cloudflare Registrar, DNS records are auto-configured
4. SSL is automatic and free
5. Also add `www.natewhiteman.com` → it will redirect to the apex

### Set up email routing

1. Cloudflare Dashboard → **natewhiteman.com** → **Email** → **Email Routing**
2. Create route: `nate@natewhiteman.com` → forwards to your personal email
3. Done. Professional email, zero cost.

### Enable analytics

1. Cloudflare Dashboard → **natewhiteman.com** → **Web Analytics**
2. Enable. No script injection needed — Cloudflare handles it at the edge.
3. Privacy-friendly: no cookies, no tracking, GDPR compliant.

## Writing New Blog Posts

1. Create a new `.md` file in `src/content/blog/`:

   ```bash
   touch src/content/blog/my-new-post.md
   ```

2. Add frontmatter:

   ```markdown
   ---
   title: "Your Post Title"
   description: "A brief description for SEO and social sharing."
   date: 2026-05-01
   tags: ["technical", "leadership"]
   featured: false
   ---

   Your content here. Standard markdown.

   ## Subheadings work

   So do `code blocks`, **bold**, *italic*, and [links](https://example.com).
   ```

3. Preview locally:
   ```bash
   npm run dev
   ```

4. Deploy:
   ```bash
   git add .
   git commit -m "new post: Your Post Title"
   git push
   ```

   Cloudflare Pages auto-deploys on push. Live in ~30 seconds.

## Customization Checklist

After cloning, update these items:

- [ ] `src/layouts/Base.astro` — update GitHub URL in structured data JSON-LD
- [ ] `src/pages/index.astro` — update GitHub links on project cards
- [ ] `src/pages/index.astro` — update email in contact section
- [ ] `src/pages/index.astro` — remove placeholder writing entries once real posts exist
- [ ] `public/og-image.png` — create a 1200×630px social share image
- [ ] `public/favicon.svg` — customize if desired

## Design System

The site uses a custom design system defined in `src/styles/global.css`:

**Fonts:**
- Display: Bricolage Grotesque (headings — bold, geometric, irregular)
- Body: Libre Franklin (readable, professional)
- Mono: JetBrains Mono (code, labels, metadata)
- Accent: Instrument Serif (italic highlights only)

**Colors:**
- Background: deep space black (`#060608` → `#1b1b23`)
- Text: warm off-white (`#ece9e1`) with three secondary tiers
- Accent: warm ember gold (`#cfa85c`)
- Status: green for live/active, blue/purple for decorative nodes

**Ambient effects:**
- Floating radial gradient orbs (CSS animation)
- Subtle noise texture overlay
- Pulsing graph network nodes (CSS-only, right side of viewport)
- Scroll-triggered fade-up animations via IntersectionObserver

## Performance Notes

- Zero JavaScript frameworks shipped to client (Astro islands architecture)
- Only inline `<script is:inline>` for nav scroll + intersection observer (~30 lines)
- All fonts loaded via Google Fonts with `preconnect`
- Static HTML output — served from Cloudflare's edge CDN globally
- Target: <1s FCP, 100 Lighthouse performance score

## License

Content and design are personal. Code structure can be referenced freely.
