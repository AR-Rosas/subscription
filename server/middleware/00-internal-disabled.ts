import { createError, getRequestURL } from 'h3'

function isTruthy(value: unknown): boolean {
  const v = String(value || '').trim().toLowerCase()
  return v === '1' || v === 'true' || v === 'yes' || v === 'on'
}

export default defineEventHandler((event) => {
  // Default behavior: internal tools are DISABLED in production.
  // To enable later, set NUXT_INTERNAL_ENABLED=true in your hosting env.
  const internalEnabled = isTruthy(process.env.NUXT_INTERNAL_ENABLED)
  const isProduction = process.env.NODE_ENV === 'production'

  if (internalEnabled || !isProduction) {
    return
  }

  const { pathname } = getRequestURL(event)

  // Block all internal UI routes + server APIs.
  if (pathname.startsWith('/internal') || pathname.startsWith('/api/internal')) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found'
    })
  }

  // Block GitHub OAuth entrypoint used for internal.
  if (pathname === '/auth/github') {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found'
    })
  }
})
