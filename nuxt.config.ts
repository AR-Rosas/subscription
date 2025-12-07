// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({


  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-studio',
    '@nuxt/hints'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    // Remove Cloudflare-specific preset to keep Nitro portable.
    prerender: {
      autoSubfolderIndex: false
    },
    compatibilityDate: '2025-01-15'
  },

   cloudflare: {
    pages: {
      assets: {
        binding: 'PUBLIC_ASSETS' // <— any name except "ASSETS"
      }
    }
  },


  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/services': { prerender: true },
    '/pages': { redirect: '/' },
    '/directory': { prerender: true },
    '/directory/**': { prerender: true },
    '/template': { prerender: true },
    '/blog': { prerender: true },
    '/blog/**': { prerender: true }

  },

  compatibilityDate: '2025-01-15',

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
