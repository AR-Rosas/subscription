/// <reference types="node" />

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-studio',
    '@nuxt/hints',
    'nuxt-auth-utils'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  ui: {
    // Enable automatic component detection for tree-shaking
    // Only components actually used in the project will be included
    experimental: {
      componentDetection: true
    }
  },

  runtimeConfig: {
    internal: {
      // GitHub login that is allowed to access /internal (case-insensitive)
      // Set via NUXT_INTERNAL_GITHUB_LOGIN in .env / hosting provider env vars.
      githubLogin: process.env.NUXT_INTERNAL_GITHUB_LOGIN || '',

      // GitHub logins that are allowed to access /internal (case-insensitive)
      // Set via NUXT_INTERNAL_GITHUB_LOGINS as a comma-separated list.
      githubLogins: (process.env.NUXT_INTERNAL_GITHUB_LOGINS || '')
        .split(',')
        .map(s => s.trim().toLowerCase())
        .filter(Boolean)
    },

    public: {
      // Public mirror of the allow-list for client-side route middleware.
      // NOTE: This is not a secret (it only contains GitHub usernames).
      internalGithubAllowlist: (process.env.NUXT_INTERNAL_GITHUB_LOGINS || '')
        .split(',')
        .map(s => s.trim().toLowerCase())
        .filter(Boolean)
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/services': { prerender: true },
    '/build': { prerender: true },
    '/concierge': { redirect: { to: '/build', statusCode: 301 } },
    '/concierge/**': { redirect: { to: '/build', statusCode: 301 } },
    // Internal tools should never be pre-rendered.
    '/internal/**': { prerender: false },
    '/products': { prerender: true },
    '/pages': { redirect: '/' },

    '/products/**': { prerender: true },
    '/directory/**': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    // Target Cloudflare Pages preset for zero-config deployment on Cloudflare
    // Use 'cloudflare_pages' so Nitro emits a Pages-compatible output.
    // You can also override at build time with NITRO_PRESET or --preset.
    preset: 'cloudflare_pages',
    prerender: {
      autoSubfolderIndex: false
    },
    compatibilityDate: '2025-01-15'
  },

  debug: true,

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  studio: {
    repository: {
      provider: 'github',
      owner: 'AR-Rosas',
      repo: 'subscription',
      branch: 'main'
    }
  }
})
