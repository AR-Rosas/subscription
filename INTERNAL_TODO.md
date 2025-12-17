# INTERNAL_TODO.md

**Tradealink – Internal OS / Mini-CRM**

> Private, GitHub-gated internal system for running Tradealink in production.
> Public site remains marketing + sales. `/internal` is the operating system.

---

## 1. PURPOSE & SCOPE

### What this is

A **private internal area** used to:

* document operations
* manage clients
* track tasks & delivery
* manage deal pipelines
* store internal knowledge

### What this is NOT

* Not client-facing
* Not a SaaS feature
* Not multi-tenant
* Not a full CRM like HubSpot

This is a **founder/operator control system**.

### Explicit Non-Goals

- No customer login
- No billing logic
- No notifications system
- No real-time collaboration
- No external integrations (Zapier, etc.)

---

## 2. CORE CONCEPT (MENTAL MODEL)

| Business Concept | Implementation           |
| ---------------- | ------------------------ |
| Authentication   | GitHub OAuth             |
| Access Control   | GitHub login allowlist   |
| Database         | GitHub Issues + Projects |
| Clients          | GitHub Issues            |
| Tasks / Updates  | Issue comments           |
| Pipeline         | GitHub Projects (V2)     |
| Internal Docs    | Markdown + Issues        |
| API Layer        | Nitro server proxy       |
| Token Security   | Encrypted session only   |

**GitHub is the backend. Nuxt is the UI.**

---

## Operating Rules (Authoritative)

- Every client MUST have exactly one Issue
- No client communication without updating the Issue
- Status labels must reflect reality, not optimism
- Closed issues mean delivered or dropped — never abandoned
- If it’s not in /internal, it doesn’t exist

---

## 3. ROUTE STRUCTURE

### Public

```
/
├─ landing
├─ pricing
├─ services
├─ blog
├─ checkout
```

### Internal (protected)

```
/internal
├─ dashboard
├─ clients
├─ issues
├─ projects
├─ docs
├─ unauthorized
```

All `/internal/**` routes require:

* GitHub OAuth login
* allowlisted GitHub username

---

## 4. ENVIRONMENT VARIABLES

Required:

```env
NUXT_OAUTH_GITHUB_CLIENT_ID=
NUXT_OAUTH_GITHUB_CLIENT_SECRET=
NUXT_SESSION_PASSWORD=
NUXT_INTERNAL_GITHUB_LOGINS=AR-Rosas
NUXT_INTERNAL_ALLOWED_REPOS=AR-Rosas/tradealink
```

---

## 5. SECURITY & AUTH RULES (MANDATORY)

Every internal request must:

1. Verify session exists
2. Verify GitHub user is logged in
3. Verify `user.login` is in allowlist
4. Verify the request targets only repos in `NUXT_INTERNAL_ALLOWED_REPOS`
5. Never expose GitHub token to client
6. Fail closed → redirect to `/internal/unauthorized`

Tokens are stored only in:

```
secure.githubAccessToken
```

---

## 6. DATA MODEL (IMPORTANT)

### Clients

* 1 client = 1 GitHub Issue
* Repo: `AR-Rosas/tradealink`

**Issue Title**

```
Client – Name (Service)
```

**Required Labels**

```
client
lead | active | completed | dropped
```

**Optional Labels**

```
paid
php-1500
web
plumbing
automation
```

### Label Taxonomy (Authoritative)

Client Status:
- lead
- active
- completed
- dropped

Payment:
- paid
- unpaid

Service Type:
- web
- plumbing
- automation

Pricing:
- php-500
- php-1500
- php-3000

**Body**

* Contact details
* Scope
* Notes
* Deadlines

---

### Tasks / Follow-ups

* No separate task table
* Use:

  * comments for updates
  * labels for status

---

### Pipeline

* GitHub Projects (V2)
* Columns:

```
Lead → Contacted → Paid → In Progress → Completed → Dropped
```

Each item = Issue (client).

---

### Internal Docs

Two layers:

#### A) Stable Docs (Markdown)

```
content/internal/docs/
├─ pricing.md
├─ onboarding.md
├─ sales-playbook.md
├─ ops.md
```

#### B) Living Docs (Issues)

Use labels:

```
doc
idea
lesson
postmortem
```

---

## 7. SERVER API SPEC (NITRO)

Base path:

```
/api/internal
```

### Issues – REST Proxy

#### List issues

```
GET /api/internal/issues?owner=&repo=&labels=&state=
```

#### Get issue

```
GET /api/internal/issues/{number}?owner=&repo=
```

#### Create issue

```
POST /api/internal/issues?owner=&repo=
Body: { title, body, labels }
```

#### Update issue

```
PATCH /api/internal/issues/{number}?owner=&repo=
Body: { title?, body?, state?, labels? }
```

#### Close issue (optional)

```
PATCH state=closed
```

---

### Projects – GraphQL Proxy

```
POST /api/internal/projects/graphql
```

* Proxies to `https://api.github.com/graphql`
* Supports:

  * list projects
  * list items
  * move items
  * add issue to project

---

## 8. SERVER UTILITIES

Create:

```
server/utils/github.ts
```

Responsibilities:

* getSessionToken(event)
* restFetch(path, options)
* graphqlFetch(query, variables)
* normalize GitHub errors
* map 401/403 correctly

---

## 9. CLIENT PAGES (FEATURES)

### `/internal/dashboard`

* Active clients count
* Leads this week
* In-progress items
* Recently updated issues

---

## Internal Metrics (Definitions Only)

- Active Clients = Issues labeled `client` + `active`
- Conversion Rate = Paid / Lead
- Drop Rate = Dropped / Lead
- Average Deal Size = Average of pricing labels (e.g., `php-500`, `php-1500`, `php-3000`) across paid clients

---

### `/internal/clients`

* List issues with `client` label
  * This is the **CRM view** (filtered Issues where `label=client`).
* Filter by status
* Create new client
* Quick label edits

---

### `/internal/issues`

* Raw issues view (all internal work issues, not only clients)
* Search + filter by labels
* Create internal tasks (non-client work)

### `/internal/issues/[number]`

* View client
* Edit title/body
* Add comments
* Update labels/state

---

### `/internal/projects`

* Show pipeline board
* Move items between columns
* Assign issues to project

---

### `/internal/docs`

* Render markdown docs
* Sidebar navigation
* Optional search

---

## Usage Loop

Daily:
- Check /internal/dashboard
- Update comments on active clients
- Move pipeline cards if status changed

Weekly:
- Review leads
- Close completed issues
- Add lessons learned as Issues (label: lesson)

Monthly:
- Review dropped clients
- Review pricing labels vs revenue

---

## Known Failure Modes

- Forgetting to update issues → system becomes useless
- Overusing labels → loss of clarity
- Treating comments as chat → noisy history
- Expanding scope prematurely → tool fatigue

---

## Naming Conventions

Issue Titles:
- Client – Name (Service)
- Internal – Task Name
- Doc – Topic

Comments:
- Start with date if status-changing
- Short, factual, no chatty language

---

## Backup & Exit Strategy

- GitHub Issues = primary source of truth
- Repo can be cloned anytime
- Markdown docs are portable
- If GitHub is unavailable, export issues via API

---

## 10. IMPLEMENTATION PHASES (PRIORITY)

### Phase 1 – Core CRM (MVP)

* GitHub OAuth
* `/internal/clients`
* Issues API (GET/POST/PATCH)
* Allowlist enforcement
* Repo allowlist enforcement (`NUXT_INTERNAL_ALLOWED_REPOS` is mandatory)

### Phase 2 – Pipeline

* Projects GraphQL proxy
* `/internal/projects` UI

### Phase 3 – Knowledge Base

* `/internal/docs`
* Markdown rendering

### Phase 4 – Polish

* Dashboard metrics
* UX improvements
* Keyboard actions

---

## 11. DEV COMMANDS

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
```

All must pass before production deploy.

---

## 12. OPEN QUESTIONS (INTENTIONAL)

* Should we ever allow more than `AR-Rosas/tradealink`? If yes, how do we manage the repo allowlist safely?
* Required GitHub scopes:

  * `repo` / `public_repo`
  * `project` (Projects V2)
* Future DB migration or stay GitHub-only?

---

## Future Evolution (Non-Commitment)

- Replace GitHub Issues with a DB only if volume requires it
- Keep GitHub as an audit log even if a DB is added
- Possible migration path: Issues → DB sync

---

## 13. FINAL NOTE

This system is designed to be:

* **lean**
* **owned**
* **auditable**
* **production-safe**
* **evolvable**

It is your **internal operating system**, not a product feature.

---

**Owner:** AR-Rosas
**Last updated:** 2025-12-17
