import { createError, getRouterParam } from 'h3'
import { githubRestFetch, requireInternalAccess, resolveRepoFromQuery } from '~~/server/utils/github'

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

  return await githubRestFetch(event, `/repos/${repo.owner}/${repo.repo}/issues/${number}`)
})
