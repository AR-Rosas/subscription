declare module '#auth-utils' {
  interface User {
    githubId?: number
    login?: string
    avatarUrl?: string
  }

  interface UserSession {
    loggedInAt?: number
  }

  interface SecureSessionData {
    githubAccessToken?: string
  }
}

export {}
