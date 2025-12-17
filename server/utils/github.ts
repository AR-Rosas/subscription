import {
  createError,
  getQuery,
  readBody,
  type H3Event
} from 'h3'

const GITHUB_API_BASE = 'https://api.github.com'
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'

export type AllowedRepo = {
  owner: string
  repo: string
  fullName: string
}

function normalizeLogin(value: unknown): string {
  return String(value || '').trim().toLowerCase()
}

function normalizeRepoFullName(value: unknown): string {
  return String(value || '').trim().toLowerCase()
}

function isValidOwnerOrRepoPart(value: string): boolean {
  // GitHub allows alphanumerics plus '-', '_' and '.' in owner/repo names.
  return /^[a-z0-9][a-z0-9_.-]*$/i.test(value)
}

export function parseAllowedRepos(raw: unknown): AllowedRepo[] {
  const list = Array.isArray(raw)
    ? raw
    : typeof raw === 'string'
      ? raw.split(',')
      : []

  return list
    .map(entry => normalizeRepoFullName(entry))
    .filter(Boolean)
    .map((fullName) => {
      const [owner, repo] = fullName.split('/')
      if (!owner || !repo || !isValidOwnerOrRepoPart(owner) || !isValidOwnerOrRepoPart(repo)) {
        return null
      }
      return {
        owner,
        repo,
        fullName: `${owner}/${repo}`
      } satisfies AllowedRepo
    })
    .filter((v): v is AllowedRepo => Boolean(v))
}

export async function requireInternalAccess(event: H3Event) {
  const session = await getUserSession(event)

  const login = normalizeLogin(session?.user?.login)
  const token = String(session?.secure?.githubAccessToken || '').trim()

  if (!token || !login) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    })
  }

  const config = useRuntimeConfig(event)
  const allowedLogins = Array.isArray(config.internal?.githubLogins) ? config.internal.githubLogins : []
  const allowedLogin = normalizeLogin(config.internal?.githubLogin)

  // Enforce allowlist (server-side) to avoid relying on client middleware.
  if (allowedLogins.length > 0 && !allowedLogins.includes(login)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    })
  }

  if (allowedLogins.length === 0 && allowedLogin && login !== allowedLogin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    })
  }

  const allowedRepos = parseAllowedRepos(config.internal?.allowedRepos)
  if (allowedRepos.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server misconfigured (NUXT_INTERNAL_ALLOWED_REPOS is required)'
    })
  }

  return { session, token, login, allowedRepos }
}

export function resolveRepoFromQuery(event: H3Event, allowedRepos: AllowedRepo[]): AllowedRepo {
  const query = getQuery(event)

  const owner = normalizeRepoFullName(query.owner)
  const repo = normalizeRepoFullName(query.repo)

  if (allowedRepos.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server misconfigured (no allowed repos)'
    })
  }

  // Default to the first allowed repo if caller omits owner/repo.
  if (!owner || !repo) {
    const first = allowedRepos[0]
    if (!first) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Server misconfigured (no allowed repos)'
      })
    }
    return first
  }

  const fullName = `${owner}/${repo}`
  const match = allowedRepos.find(r => r.fullName === fullName)

  if (!match) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Repo not allowed'
    })
  }

  return match
}

function normalizeGitHubError(err: unknown) {
  const anyErr = err as any
  const statusCode = Number(anyErr?.statusCode || anyErr?.status || 500)
  const data = anyErr?.data

  const message = typeof data?.message === 'string'
    ? data.message
    : typeof anyErr?.message === 'string'
      ? anyErr.message
      : 'GitHub API request failed'

  return createError({
    statusCode: Number.isFinite(statusCode) ? statusCode : 500,
    statusMessage: message,
    data
  })
}

export async function githubRestFetch<T>(
  event: H3Event,
  path: string,
  options: {
    method?:
      | 'GET'
      | 'HEAD'
      | 'POST'
      | 'PUT'
      | 'PATCH'
      | 'DELETE'
      | 'OPTIONS'
      | 'get'
      | 'head'
      | 'post'
      | 'put'
      | 'patch'
      | 'delete'
      | 'options'
    query?: Record<string, any>
    body?: any
    headers?: Record<string, string>
  } = {}
): Promise<T> {
  const { token } = await requireInternalAccess(event)

  try {
    return (await $fetch(`${GITHUB_API_BASE}${path}`, {
      method: options.method || 'GET',
      query: options.query,
      body: options.body,
      headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Authorization': `Bearer ${token}`,
        ...options.headers
      }
    })) as T
  } catch (err) {
    throw normalizeGitHubError(err)
  }
}

export async function githubGraphqlFetch<T>(
  event: H3Event,
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const { token } = await requireInternalAccess(event)

  try {
    const result = await $fetch<any>(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json'
      },
      body: {
        query,
        variables
      }
    })

    if (Array.isArray(result?.errors) && result.errors.length > 0) {
      throw createError({
        statusCode: 502,
        statusMessage: 'GitHub GraphQL error',
        data: result.errors
      })
    }

    return result as T
  } catch (err) {
    throw normalizeGitHubError(err)
  }
}

export async function readJsonBody<T>(event: H3Event): Promise<T> {
  try {
    return (await readBody(event)) as T
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid JSON body'
    })
  }
}
