import { createError, getRouterParam } from 'h3'
import { githubRestFetch, readJsonBody, requireInternalAccess, resolveRepoFromQuery } from '~~/server/utils/github'

type CreateCommentBody = {
  body: string
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

  const payload = await readJsonBody<CreateCommentBody>(event)
  const body = String(payload?.body || '').trim()

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'body is required'
    })
  }

  return await githubRestFetch(event, `/repos/${repo.owner}/${repo.repo}/issues/${number}/comments`, {
    method: 'POST',
    body: { body }
  })
})
