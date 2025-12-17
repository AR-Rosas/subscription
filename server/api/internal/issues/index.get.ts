import { getQuery } from 'h3'
import { githubRestFetch, requireInternalAccess, resolveRepoFromQuery } from '~~/server/utils/github'

export default defineEventHandler(async (event) => {
  const { allowedRepos } = await requireInternalAccess(event)
  const repo = resolveRepoFromQuery(event, allowedRepos)

  const query = getQuery(event)

  const state = typeof query.state === 'string' ? query.state : 'open'
  const labels = typeof query.labels === 'string' ? query.labels : undefined
  const page = typeof query.page === 'string' ? Number(query.page) : undefined
  const perPage = typeof query.perPage === 'string' ? Number(query.perPage) : undefined

  return await githubRestFetch<any[]>(event, `/repos/${repo.owner}/${repo.repo}/issues`, {
    query: {
      state,
      labels,
      page: Number.isFinite(page as number) ? page : undefined,
      per_page: Number.isFinite(perPage as number) ? perPage : 50
    }
  })
})
