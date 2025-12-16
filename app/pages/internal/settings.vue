<script setup lang="ts">
useSeoMeta({
  title: 'Internal • Settings',
  description: 'Internal settings (planned).'
})
</script>

<template>
  <UContainer class="py-10">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold">Settings</h1>
        <p class="text-sm text-muted">
          Planned: tokens, repo selection, and internal preferences.
        </p>
      </div>
      <UButton to="/internal" variant="soft" color="neutral">Back</UButton>
    </div>

    <UCard class="mt-6">
      <p class="text-sm text-muted">
        Consider storing preferences in localStorage (client) and keeping secrets only in server session.
      </p>
    </UCard>
  </UContainer>
</template>
