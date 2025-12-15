<script setup lang="ts">
const { data: posts } = await useAsyncData('directory-list', async () => {
  const docs = await queryCollection('directory').order('title', 'ASC').all()
  return docs
})

useSeoMeta({
  title: 'Free Tools Directory',
  description: 'Explore 200+ curated free tools organized into categories.'
})
</script>

<template>
  <UContainer class="py-8 md:py-12">
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="text-center">
        <h1 class="text-3xl md:text-4xl font-bold">Free Tools Directory</h1>
        <p class="text-muted">Browse curated tools organized by category.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="post in posts"
          :key="post.slug"
          :to="`/directory/${post.slug}`"
          class="block rounded-lg border p-4 hover:border-primary transition-colors"
        >
          <h3 class="font-semibold">{{ post.title }}</h3>
          <p class="text-sm text-muted line-clamp-3">{{ post.description }}</p>
        </NuxtLink>
      </div>
    </div>
  </UContainer>
</template>
