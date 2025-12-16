export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user, tokens }) {
    const config = useRuntimeConfig(event)
    const allowedLogin = String(config.internal?.githubLogin || '').trim().toLowerCase()
    const allowedLogins = Array.isArray(config.internal?.githubLogins) ? config.internal.githubLogins : []
    const actualLogin = String(user?.login || '').trim().toLowerCase()

    // If allow-list is configured, enforce it.
    // Prefer multi-user allow-list, otherwise fall back to single-login allow-list.
    if (allowedLogins.length > 0 && !allowedLogins.includes(actualLogin)) {
      await clearUserSession(event)
      return sendRedirect(event, '/internal/unauthorized')
    }

    if (allowedLogins.length === 0 && allowedLogin && actualLogin !== allowedLogin) {
      await clearUserSession(event)
      return sendRedirect(event, '/internal/unauthorized')
    }

    await setUserSession(event, {
      user: {
        githubId: user.id,
        login: user.login,
        avatarUrl: user.avatar_url
      },
      // Stored encrypted in the session cookie; accessible only from server routes.
      secure: {
        githubAccessToken: tokens.access_token
      },
      loggedInAt: Date.now()
    })

    return sendRedirect(event, '/internal')
  },
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/internal/login?error=github')
  }
})
