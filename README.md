# Tradealink — $1,500 Business Automation & Systems + Free Tools Directory

[![Nuxt UI](https://img.shields.io/badge/Built%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

Tradealink offers professional business services at a fixed $1,500 price point. Choose from workflow automation, CRM setup, AI integration, custom tools, data systems, and more. Every service includes complete deliverables, documentation, and lifetime access to our internal agency vault (tools, templates, SOPs, and resources). The site also features a curated free tools directory with 200+ resources for developers, students, freelancers, and small businesses.

## Key Features

- Fixed-price professional services: $1,500 per service (delivery time depends on complexity, typically 2+ weeks)
- Quick research service: $29 Internet Research Service delivered in 24–72 hours
- 16+ professional services including workflow automation, CRM setup, AI integration, data systems, and more
- Tally popup for intake with Whop checkout integration
- Lifetime vault access included with every $1,500 service (agency templates, SOPs, tools, themes, wiki)
- "Trade a link" unlock flow for the free tools directory (200+ curated resources)
- Directory organized as content pages powered by `@nuxt/content`
- Mobile-first UI built on `@nuxt/ui` components and Iconify icons

## Services Offered

### Premium Services ($1,500 flat)

All services include complete deliverables, documentation, and lifetime vault access:

- Business Workflow Automation System
- Operations Audit + SOP Creation
- AI Automation Integration
- Custom Business Tool or Calculator
- Data System Setup (Sheets/Notion/Airtable)
- Digital Product Packaging
- CRM Setup & Optimization
- Appointment + Customer Pipeline Automation
- Knowledge Base + Training System Setup
- Lead Generation System Setup
- Business Analytics Dashboard
- Internal Communication System Build
- Documentation & Compliance Package
- Onboarding Automation for Clients
- Productivity System Setup for CEOs & Teams
- Reporting + Document Automation Service

### Internet Research Service ($29)

Delivered in 24–72 hours

A focused internet research service that gathers, verifies, and organizes useful information about a person, business, product, or topic. Perfect if you’re not ready for a full $1,500 system but still want fast, useful insights.

Includes:
- Verified sources and citations
- Key findings summary
- Profiles or company overview (as applicable)
- Competitors or related alternatives overview
- Organized notes and links
- Practical recommendations and next steps

## Features

- Professional Services: 16+ business services from workflow automation to CRM setup at $1,500 flat
- Quick Research: $29 Internet Research Service delivered in 24–72 hours for fast insights
- Smooth Scroll: "Describe Your Service" scrolls to pricing for quicker conversion
- Tally Intake: Popup with Whop checkout integration (service booking: `q45GQg`, diagnostic: `jaeo4J`)
- Vault Access: Every $1,500 service includes lifetime access to agency templates, SOPs, automation scripts, tools, themes, and internal wiki
- Directory Unlock: Tally popup (`xXVMRk`) with localStorage gate (`tradealink-directory-unlocked`) to reveal 200+ free tools
- Organized Directory: Alphabetically sorted, mobile-first list of categories with detailed descriptions
- SEO & Meta: `useHead` + `useSeoMeta` applied at app and page levels
- Prerendered Routes: `/`, `/services`, `/vault`, `/directory`, `/blog`, and nested routes for fast static delivery
- Content Schema: Validated via zod in `content.config.ts` for consistency across directory and blog pages
- Icons: Iconify-powered icons (Lucide, Simple Icons) via `UIcon` shorthand like `i-lucide-arrow-right`

## Quick Start

Use pnpm with Windows PowerShell (v5.1):

```powershell
pnpm install
pnpm run dev
```

Common scripts:

```powershell
pnpm typecheck
pnpm lint
pnpm build
pnpm preview
```

## User Flow

### Premium Services ($1,500)

1. **Choose a Service**: Browse the service list on the landing page (`app/pages/index.vue`) or visit the dedicated services page
2. **Book via Tally**: Click "Describe Your Service" to open a Tally popup that collects project details
3. **Checkout via Whop**: On form submission, redirect to Whop for secure $1,500 payment
4. **Service Delivery**: Receive complete deliverables with documentation (timeline depends on service complexity, typically 2+ weeks)
5. **Vault Access**: Get lifetime access to our agency vault containing templates, SOPs, automation scripts, tools, themes, and internal wiki

### Internet Research Service ($29)

1. **Order Research**: Click "Get $29 Internet Research Service" on the landing page
2. **Submit via Tally**: Provide the topic, person, business, or product to research
3. **Fast Checkout**: Pay $29 via Whop checkout
4. **Receive Findings**: Get organized research within 24–72 hours including verified sources, summaries, links, and recommendations

### Free Tools Directory

Optionally unlock the tools directory by sharing a free tool via the Tally popup; access persists in localStorage

## Directory Categories (Examples)

Markdown pages live in `content/directory/` and include link-based sections:

- AI and Automation (`ai-and-automation.md`)
- Business Ops (`business-ops.md`)
- Career & Freelance (`career-and-freelance.md`)
- Document Utilities (`document-utilities.md`)
- Learning & Research (`learning-and-research.md`)
- Payment Gateway (`payment-gateway.md`)
- Remote Desktop Tools (`remote-desktop-tools.md`)
- Web Hosting (`web-hosting.md`)
- Forms (`forms.md`)
- CMS (`cms.md`)
- Low-code Platform (`low-code-platform.md`)
- OSINT (`osint.md`)
- Marketing (`marketing.md`)
- Subreddits to Market Product (`subreddits-to-market-product.md`)
- Education & Career Development (`education-and-career-development.md`)
- Web Development (`web-development.md`)
- Web Design (`web-design.md`)

## About

Tradealink delivers professional business services at a transparent $1,500 fixed price. We handle workflow automation, CRM setup, AI integration, custom tools, data systems, and more. Every service includes complete deliverables, documentation, and lifetime access to our internal agency vault (templates, SOPs, automation scripts, tools, themes, and wiki).

### How We Work

- **Intake**: Book via Tally; we gather the essentials about your service needs
- **Kickoff**: Align on requirements, deliverables, and timeline (typically 2+ weeks depending on complexity)
- **Execution**: Build your system with best-practice tools and frameworks
- **Handoff**: Deliverables, documentation, and immediate vault access for future self-service

### What's Included

- **Fixed Price**: $1,500 flat per service, no hidden fees or subscriptions
- **Complete Deliverables**: Fully functional systems with documentation
- **Lifetime Vault Access**: Agency templates, SOPs, automation blueprints, tools, themes, internal wiki
- **Expert Delivery**: Professional implementation with 2+ weeks typical timeline (depends on service complexity)
- **No Accounts Needed**: Whop handles secure access automatically

### Vault Contents

Every service purchase includes permanent access to:

- Agency-grade templates and workflows
- SOP documentation templates
- Automation blueprints and scripts
- Business system frameworks
- Training materials and guides
- Pre-built calculators and tools
- Design themes and UI kits
- Internal wiki and knowledge base

### Accessibility & Performance

- Mobile-first design using Nuxt UI primitives
- Pre-rendered static routes for quick loads (landing, services, vault, directory, blog)
- Minimal external scripts beyond Tally for forms
- YAML-driven content for easy updates without code changes

## Tech Stack

- Nuxt 4 (app directory) + TypeScript
- `@nuxt/ui` for layout and components (auto-imported with tree-shaking enabled)
- `@nuxt/content` with a validated content schema (`content.config.ts`)
- Iconify JSON packages for icons (Lucide, Simple Icons)
- Automatic component detection enabled for optimal bundle size

## Performance Optimizations

- **Tree-shaking**: Nuxt UI's experimental component detection automatically includes only the components used in the project
- **Pre-rendering**: Static routes pre-rendered at build time for instant page loads
- **Minimal dependencies**: Only essential UI components are included in the bundle
- **Iconify**: On-demand icon loading with automatic purging of unused icons

## Safe Changes Checklist

Before pushing a change, verify:

- Builds: `pnpm build` succeeds; `pnpm preview` runs locally.
- Lint & Types: `pnpm lint` and `pnpm typecheck` pass (stylistic rules include `braceStyle: '1tbs'`, `commaDangle: 'never'`).
- UI Consistency: Prefer Nuxt UI primitives (`UApp`, `UHeader`, `UMain`, `UFooter`, `UCard`, etc.) and props (`color`, `variant`, `size`). Keep theme colors from `app/app.config.ts` (`ui.colors.primary='green'`, `neutral='slate'`).
- Content Schema: Any new markdown under `content/directory/` satisfies `content.config.ts` (zod) fields.
- Directory Flow: Preserve localStorage gate `tradealink-directory-unlocked` and Tally IDs unless intentionally changed.

## App Structure

```
app/
  app.vue                 # Global shell: UApp, UHeader, UMain, UFooter
  app.config.ts           # Nuxt UI theme (primary/neutral colors)
  assets/css/main.css     # Global stylesheet
  components/             # Auto-imported Vue components
    AppLogo.vue
    TemplateMenu.vue
  layouts/                # Page layouts (default, landing)
    default.vue
    landing.vue
  pages/
    index.vue             # Landing page with services list + Tally/Whop
    services.vue          # Dedicated services list page
    vault.vue             # Vault overview page
    blog/
      index.vue           # Blog listing
      [slug].vue          # Individual blog posts
    directory/
      index.vue           # Directory unlock + category list
      [slug].vue          # Category detail (renders markdown)
    template/
      index.vue           # Template marketplace
      ecommerce.vue
      product/
        [slug].vue        # Template product pages
content/
  blog/*.md               # Blog posts
  directory/*.md          # Free tools directory categories
  pages/*.md              # YAML-driven marketing pages
  template/
    product/*.md          # Template products (micro-task-landing, white-label-platform)
content.config.ts         # @nuxt/content schema (validated with zod)
nuxt.config.ts            # Modules, CSS, route rules (prerender)
```

### Architecture Highlights

- Global shell at `app/app.vue` using `UApp`, `UHeader`, `UMain`, `UFooter`.
- Styling via `assets/css/main.css` and Nuxt UI theme in `app/app.config.ts`.
- Content powered by `@nuxt/content`; markdown lives under `content/**`, queried via `queryCollection`.
- Routing & SSG: `nuxt.config.ts` prerenders `/`, `/directory`, and `/directory/**` via `routeRules`.

## Directory Content Model

Defined in `content.config.ts` as a `page` collection sourced from `content/directory/*.md`.

Required frontmatter fields:

```yaml
slug: string
title: string
description: string
category: string
date: YYYY-MM-DD (coerced)
tags: string[] (optional, defaults to [])
heroImage: url (optional)
readingTime: number (optional)
author: { name: string; role?: string; avatar?: url } (optional)
```

Each markdown file then contains link sections. Example:

```md
---
slug: web-design
title: Web Design Resources
description: Free tools for UI design, assets, and performance-friendly images.
category: Design
date: 2025-11-27
tags: [Design, UI]
---

## Design Tools

- [Figma](https://www.figma.com/)
- [Penpot](https://penpot.app/)
```

## Landing Page (Services + Checkout)

- Located at `app/pages/index.vue`
- "Describe Your Service" scrolls to pricing section
- Lists 16+ professional services at $1,500 each
- Features $29 Systems Diagnostic as a quick-win option (positioned strategically after "How It Works")
- Multiple Tally popups for different offerings:
  - Premium Service Booking: `q45GQg`
  - Systems Diagnostic: `jaeo4J`
- The Tally embed script is injected with `useHead`; `window.Tally` is typed in TypeScript
- Content driven by `content/pages/index.md` with YAML frontmatter for easy updates
- Strategic placement of $29 service:
  1. Soft mention under hero (not a primary CTA)
  2. Dedicated section after "How It Works" (primary placement)
  3. Footer CTA before FAQ section

## Free Tools Directory (200+ Resources)

- Index: `app/pages/directory/index.vue`
- Gated by a simple Tally popup form (ID `xXVMRk`). On submit, access is unlocked via `localStorage` key `tradealink-directory-unlocked`
- Once unlocked, users see a comprehensive, mobile-first list of 17+ categories sorted alphabetically by title
- 200+ curated free tools for developers, students, freelancers, and small businesses
- Category pages use `app/pages/directory/[slug].vue` to render metadata and the markdown body via `<ContentRenderer>`
- Categories include: AI & Automation, Business Ops, Career & Freelance, CMS, Document Utilities, Education, Forms, Learning & Research, Low-code Platforms, Marketing, OSINT, Payment Gateways, Remote Desktop Tools, Subreddit Marketing, Web Design, Web Development, and Web Hosting

Nuxt Content runs with `experimental.sqliteConnector='native'` via `better-sqlite3`. No manual DB setup is needed.

## Routing & Prerendering

`nuxt.config.ts` pre-renders key pages for fast static delivery:

```ts
routeRules: {
  '/': { prerender: true },
  '/pages': { redirect: '/' },
  '/services': { prerender: true },
  '/vault': { prerender: true },
  '/directory': { prerender: true },
  '/directory/**': { prerender: true },
  '/blog': { prerender: true },
  '/blog/**': { prerender: true },
  '/template': { prerender: true },
  '/template/**': { prerender: true }
}
```

To prerender additional static pages:

```ts
// nuxt.config.ts
routeRules: {
  '/new-page': { prerender: true }
}
```

## Development

Install dependencies:

```powershell
pnpm install
```

Start dev server (http://localhost:3000):

```powershell
pnpm run dev
```

Type check and lint:

```powershell
pnpm typecheck
pnpm lint
```

Build and preview production:

```powershell
pnpm build
pnpm preview
```

## Conventions

- Prefer Nuxt UI props (color, variant, size) over custom utility classes.
- Use `<script setup>` with Composition API; components in `app/components/` use PascalCase filenames.
- Add new directory categories as markdown under `content/directory/` with required frontmatter.
- ESLint stylistic rules: `braceStyle: '1tbs'`, `commaDangle: 'never'`.

Vue SFCs should use `<script setup>` and PascalCase filenames in `app/components/`. Prefer `UIcon` shorthand (e.g., `i-lucide-arrow-right`). Avoid global side effects outside `app/app.vue`.

## Roadmap

- Add search/filter to `/directory` for faster tool discovery
- Expand service offerings based on customer demand
- Add case studies and service examples
- Wire product-specific Whop URLs and pass service details as query params
- Enhance vault preview with sample resources
- Add testimonials and success stories
- Create video walkthroughs for popular services

## Contributing

PRs welcome. Please:

- Run `pnpm typecheck` and `pnpm lint` before submitting.
- Follow Nuxt UI component patterns and content schema.
- Keep changes minimal, focused, and stylistically consistent.

## Customization Notes

## YAML-Driven Pages

Marketing pages and the blog hero are fully content-driven via `@nuxt/content` with YAML frontmatter:

- Landing: `content/pages/index.md`
- Vault: `content/pages/vault.md`
- White-Label Platform: `content/pages/white-label-platform.md`
- Blog Index Hero: `content/pages/blog.md`

Pages query the `pages` collection and bind fields like `hero.title`, `hero.description`, and `sections.*`:

```ts
// Example in a page component
const { data: page } = await useAsyncData('landing-page', () =>
  queryCollection('pages')
    .where('slug', '=', 'index')
    .first()
)
```

Common section structures:

```yaml
hero:
  title: string
  description: string
sections:
  whatWeDo:
    title: string
    description: string
    tasks: string[]
  howItWorks:
    title: string
    steps:
      - { title: string, description: string }
  pricing:
    title: string
    tiers:
      - { name: string, price: string, blurb: string, examples: string[], tallyFormId: string }
    includes: string[]
  vault:
    title: string
    intro: string
    details: string
    items: string[]
  directory:
    title: string
    intro: string
    categories: string[]
  affiliate:
    title: string
    intro: string
    perks: string[]
  faq:
    title: string
    items:
      - { label: string, content: string }
```

Bind conservatively with optional chaining and light casting when needed:

```vue
<UPageSection
  :title="(page.sections as any)?.pricing?.title"
>
  <!-- render pricing tiers from YAML -->
</UPageSection>
```

## Blog

Blog posts live under `content/blog/*.md` and are listed on `/blog`. The blog index hero pulls from `content/pages/blog.md`.

## Template Products

The site includes a template marketplace at `/template` with ready-to-use Nuxt UI templates:

- **Micro Task Landing Page Template** ($49): Conversion-focused landing page for micro-task services, prewired with Tally + Whop
  - Nuxt UI hero, sections, and clear CTAs
  - Tally popups with onSubmit Whop redirect
  - YAML-driven copy via @nuxt/content
  - Mobile-first, fast, and prerender-friendly

- **White-Label Platform Template** ($49): Launch a branded micro-SaaS fast
  - Branded landing page and theme application
  - Task catalog with tiered pricing
  - Whop checkout wiring and Vault unlock
  - Content-driven pages with @nuxt/content

Template products are defined in `content/template/product/*.md` with frontmatter including price, features, and purchase URLs.

## Studio

This project currently edits content via markdown/YAML. If you decide to re-enable in-app Studio later, add `nuxt-studio` and its config to `nuxt.config.ts`. Otherwise, keep editing via files.

## Route Rules

Alongside prerendering, `/pages` is redirected to `/` to avoid content-generated path warnings:

```ts
routeRules: {
  '/': { prerender: true },
  '/pages': { redirect: '/' },
  '/directory': { prerender: true },
  '/directory/**': { prerender: true },
  '/white-label-platform': { prerender: true },
  '/blog': { prerender: true },
  '/blog/**': { prerender: true }
}
```

- Update site branding and header/footer links in `app/app.vue`.
- Adjust theme colors in `app/app.config.ts`.
- Replace Tally form IDs and Whop redirect logic in `app/pages/index.vue` and `app/pages/directory/index.vue` as needed.

### Tally + Whop Integration Notes

- **Premium Service Booking** (`app/pages/index.vue`): Tally popup opens with `window.Tally.openPopup('q45GQg', { onSubmit: () => window.location.href = 'https://whop.com' })`. The Tally embed script is injected via `useHead`
- **Systems Diagnostic** (`app/pages/index.vue`): Tally popup opens with `window.Tally.openPopup('jaeo4J', { onSubmit: () => window.location.href = 'https://whop.com' })` for the $29 quick diagnostic service
- **Directory Unlock** (`app/pages/directory/index.vue`): Popup `xXVMRk` unlocks access by setting localStorage key `tradealink-directory-unlocked`. UI state reflects unlock with `useState('directory-unlocked')` and sorted listing from `queryCollection('directory').all()`
- All premium service purchases ($1,500) are processed through Whop
- All diagnostic purchases ($29) are processed through Whop
- Vault access is granted automatically via Whop after premium service purchase

---

Questions or improvements welcome. PRs encouraged.
