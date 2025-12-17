<script setup lang="ts">
useSeoMeta({
  title: 'Internal • Dashboard',
  description: 'Tradealink Internal OS / Mini-CRM.'
})

const { loggedIn, user, session, clear } = useUserSession()
</script>

<template>
  <UContainer class="py-10">
    <div class="flex flex-col gap-6">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold">Internal</h1>
          <p class="text-sm text-muted">
            Private tools for maintaining the site.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <UBadge v-if="loggedIn" color="success" variant="soft">Signed in</UBadge>
          <UBadge v-else color="error" variant="soft">Signed out</UBadge>

          <UButton v-if="loggedIn" color="neutral" variant="soft" @click="clear">
            Logout
          </UButton>
          <UButton v-else to="/internal/login" color="primary">
            Login
          </UButton>
        </div>
      </div>

      <UCard v-if="loggedIn">
        <div class="flex items-center gap-3">
          <UAvatar :src="user?.avatarUrl || undefined" :alt="user?.login || 'User'" />
          <div>
            <div class="font-medium">@{{ user?.login }}</div>
            <div class="text-xs text-muted">
              Logged in at {{ session?.loggedInAt ? new Date(session?.loggedInAt).toLocaleString() : '—' }}
            </div>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex flex-col gap-3">
          <h2 class="text-lg font-medium">Internal OS</h2>
          <div class="flex flex-wrap gap-2">
            <UButton to="/internal/clients" variant="soft" color="primary">Clients</UButton>
            <UButton to="/internal/issues" variant="soft" color="primary">Issues</UButton>
            <UButton to="/internal/projects" variant="soft" color="primary">Projects</UButton>
            <UButton to="/internal/docs" variant="soft" color="primary">Docs</UButton>
            <UButton to="/internal/settings" variant="soft" color="primary">Settings</UButton>
          </div>
          <p class="text-sm text-muted">
            Source of truth lives in GitHub (Issues + Projects). Nuxt is the UI.
          </p>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
