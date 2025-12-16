<script setup lang="ts">
useSeoMeta({
  title: 'Internal Login',
  description: 'Sign in to internal tools.'
})

const route = useRoute()
const { loggedIn, openInPopup } = useUserSession()

const error = computed(() => String(route.query.error || ''))
const redirect = computed(() => String(route.query.redirect || '/internal'))

watchEffect(() => {
  // If already logged in, bounce back.
  if (loggedIn.value) {
    navigateTo(redirect.value)
  }
})

function signIn() {
  // Popup is nice in-app; normal navigation also works: /auth/github
  openInPopup('/auth/github', { width: 900, height: 700 })
}
</script>

<template>
  <UContainer class="py-12">
    <UCard>
      <div class="flex flex-col gap-4">
        <div>
          <h1 class="text-2xl font-semibold">Login</h1>
          <p class="text-sm text-muted">
            This area is private and gated with GitHub.
          </p>
        </div>

        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          title="Login failed"
          :description="error === 'github' ? 'GitHub OAuth failed or was cancelled.' : `Error: ${error}`"
        />

        <div class="flex flex-wrap gap-2">
          <UButton color="primary" @click="signIn">Continue with GitHub</UButton>
          <UButton to="/" color="neutral" variant="soft">Back to site</UButton>
          <UButton href="/auth/github" color="neutral" variant="ghost">Use full redirect flow</UButton>
        </div>

        <p class="text-xs text-muted">
          OAuth callback URL must be <code class="font-mono">/auth/github</code>.
        </p>
      </div>
    </UCard>
  </UContainer>
</template>
