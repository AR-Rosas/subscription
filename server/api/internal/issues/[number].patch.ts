import { createError, getRouterParam } from 'h3'
import { githubRestFetch, readJsonBody, requireInternalAccess, resolveRepoFromQuery } from '~~/server/utils/github'

type UpdateIssueBody = {
  title?: string
  body?: string
  state?: 'open' | 'closed'
  labels?: string[] | string
}

export default defineEventHandler(async (event) => {
  const { allowedRepos } = await requireInternalAccess(event)
  const repo = resolveRepoFromQuery(event, allowedRepos)

  const numberRaw = getRouterParam(event, 'number')
  const number = Number(numberRaw)
  if (!Number.isFinite(number)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid issue number'
    })
  }

  const payload = await readJsonBody<UpdateIssueBody>(event)

  const labels = Array.isArray(payload?.labels)
    ? payload.labels
    : typeof payload?.labels === 'string'
      ? payload.labels.split(',').map(s => s.trim()).filter(Boolean)
      : undefined

  return await githubRestFetch(event, `/repos/${repo.owner}/${repo.repo}/issues/${number}`, {
    method: 'PATCH',
    body: {
      title: typeof payload.title === 'string' ? payload.title : undefined,
      body: typeof payload.body === 'string' ? payload.body : undefined,
      state: payload.state,
      labels
    }
  })
})
