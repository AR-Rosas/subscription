// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({


  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-studio',
    '@nuxt/hints'
  ],

  ui: {
    // Enable automatic component detection for tree-shaking
    // Only components actually used in the project will be included
    experimental: {
      componentDetection: true
    }
  },



  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

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
