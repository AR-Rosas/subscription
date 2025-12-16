<script setup lang="ts">
useSeoMeta({
  title: 'Internal • Docs',
  description: 'Personal site docs and upgrade notes (planned).'
})
</script>

<template>
  <UContainer class="py-10">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold">Docs</h1>
        <p class="text-sm text-muted">
          Planned: gated documentation for site upgrades.
        </p>
      </div>
      <UButton to="/internal" variant="soft" color="neutral">Back</UButton>
    </div>

    <UCard class="mt-6">
      <p class="text-sm text-muted">
        You can later back this with GitHub Issues, Discussions, or a Project board.
      </p>
    </UCard>
  </UContainer>
</template>
