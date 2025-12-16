<script setup lang="ts">
useSeoMeta({
  title: 'Unauthorized',
  description: 'Access denied.'
})

const { clear } = useUserSession()
</script>

<template>
  <UContainer class="py-12">
    <UCard>
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-semibold">Access denied</h1>
        <p class="text-sm text-muted">
          This GitHub account is not allow-listed for <code class="font-mono">/internal</code>.
        </p>

        <div class="flex flex-wrap gap-2">
          <UButton color="neutral" variant="soft" @click="clear">Logout</UButton>
          <UButton to="/internal/login" color="primary">Try a different account</UButton>
          <UButton to="/" color="neutral" variant="ghost">Back to site</UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>
