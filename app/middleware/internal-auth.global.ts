export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/internal')) {
    return
  }

  // Allow unauthenticated access to the login and unauthorized pages.
  if (to.path === '/internal/login' || to.path === '/internal/unauthorized') {
    return
  }

  const { loggedIn, ready, fetch, user } = useUserSession()

  // Ensure session state is loaded before gating.
  if (!ready.value) {
    try {
      await fetch()
    } catch {
      // ignore
    }
  }

  if (!loggedIn.value) {
    const redirect = encodeURIComponent(to.fullPath || '/internal')
    return navigateTo(`/internal/login?redirect=${redirect}`)
  }

  // Authorization: allow only GitHub users on the allow-list (if configured).
  const config = useRuntimeConfig()
  const allowlist = Array.isArray(config.public?.internalGithubAllowlist)
    ? config.public.internalGithubAllowlist
    : []

  if (allowlist.length > 0) {
    const login = String(user.value?.login || '').trim().toLowerCase()
    if (!login || !allowlist.includes(login)) {
      return navigateTo('/internal/unauthorized')
    }
  }
})
