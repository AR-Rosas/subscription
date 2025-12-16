<script setup lang="ts">
useSeoMeta({
  title: 'Internal • Projects',
  description: 'Manage GitHub Projects from the site (planned).'
})
</script>

<template>
  <UContainer class="py-10">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold">Projects</h1>
        <p class="text-sm text-muted">
          Planned: read/update GitHub Projects (Project V2) items.
        </p>
      </div>
      <UButton to="/internal" variant="soft" color="neutral">Back</UButton>
    </div>

    <UCard class="mt-6">
      <p class="text-sm text-muted">
        Next we’ll add GraphQL calls (Projects V2 API) from server endpoints.
      </p>
    </UCard>
  </UContainer>
</template>
