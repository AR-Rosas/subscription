<script setup lang="ts">
useSeoMeta({
  title: 'Internal • Issues',
  description: 'Manage GitHub issues from the site (planned).'
})
</script>

<template>
  <UContainer class="py-10">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold">Issues</h1>
        <p class="text-sm text-muted">
          Planned: view & edit repo issues (AR-Rosas/subscription).
        </p>
      </div>
      <UButton to="/internal" variant="soft" color="neutral">Back</UButton>
    </div>

    <UCard class="mt-6">
      <p class="text-sm text-muted">
        Next we’ll add a server API endpoint that calls GitHub using the encrypted access token stored in the session.
      </p>
    </UCard>
  </UContainer>
</template>
