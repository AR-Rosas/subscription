import { createError } from 'h3'
import { githubRestFetch, readJsonBody, requireInternalAccess, resolveRepoFromQuery } from '~~/server/utils/github'

type CreateIssueBody = {
  title: string
  body?: string
  labels?: string[] | string
}

export default defineEventHandler(async (event) => {
  const { allowedRepos } = await requireInternalAccess(event)
  const repo = resolveRepoFromQuery(event, allowedRepos)

  const payload = await readJsonBody<CreateIssueBody>(event)

  const title = String(payload?.title || '').trim()
  if (!title) {
    throw createError({
      statusCode: 400,
      statusMessage: 'title is required'
    })
  }

  const labels = Array.isArray(payload?.labels)
    ? payload.labels
    : typeof payload?.labels === 'string'
      ? payload.labels.split(',').map(s => s.trim()).filter(Boolean)
      : undefined

  return await githubRestFetch(event, `/repos/${repo.owner}/${repo.repo}/issues`, {
    method: 'POST',
    body: {
      title,
      body: payload?.body || undefined,
      labels
    }
  })
})
