<script setup lang="ts">
interface DirectoryArticle {
  slug: string
  title: string
  description: string
  category: string
  date: string
  tags?: string[]
  heroImage?: string
  readingTime?: number
  author?: {
    name: string
    role?: string
    avatar?: string
  }
  body?: unknown
}

const route = useRoute()
const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value || ''
})

const { data: category } = await useAsyncData<DirectoryArticle | null>(
  () => `directory-${slug.value}`,
  async () => {
    if (!slug.value) {
      return null
    }
    const entry = await queryCollection('directory').where('slug', '=', slug.value).first()
    return entry as DirectoryArticle | null
  },
  { watch: [slug] }
)

if (!category.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Directory category not found',
    fatal: true
  })
}

const fallbackDescription = 'Field notes, experiments, and templates from the Tradealink crew.'

const metaTitle = computed(() => category.value ? `${category.value.title} · Tradealink Field Notes` : 'Tradealink Field Notes')
const metaDescription = computed(() => category.value?.description ?? fallbackDescription)
const metaImage = computed(() => category.value?.heroImage)

const formattedDate = computed(() => {
  if (!category.value?.date) {
    return ''
  }
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(category.value.date))
})

const readingTimeLabel = computed(() => {
  if (!category.value?.readingTime) {
    return null
  }
  return `${category.value.readingTime} min read`
})

useSeoMeta({
  title: metaTitle,
  description: metaDescription,
  ogTitle: metaTitle,
  ogDescription: metaDescription,
  ogImage: metaImage
})
</script>

<template>
  <UContainer v-if="category" class="py-10 md:py-16 space-y-10">
    <div class="flex items-center gap-2 text-sm">
      <ULink to="/" class="text-muted hover:text-primary transition-colors flex items-center gap-1">
        <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
        <span>Directory</span>
      </ULink>
      <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-muted" />
      <span class="text-muted">{{ category.category }}</span>
    </div>

    <div class="space-y-6">
      <div class="flex flex-wrap items-center gap-3 text-sm">
        <UBadge color="primary" variant="soft" size="md">{{ category.category }}</UBadge>
        <span v-if="formattedDate" class="text-muted">Updated {{ formattedDate }}</span>
        <span v-if="readingTimeLabel" class="text-muted">{{ readingTimeLabel }}</span>
      </div>

      <div class="space-y-4">
        <h1 class="text-3xl md:text-5xl font-bold">{{ category.title }}</h1>
        <p class="text-lg md:text-xl text-muted max-w-3xl">{{ category.description }}</p>
      </div>

      <div v-if="category.author" class="flex items-center gap-3">
        <UAvatar
          :alt="category.author.name"
          :src="category.author.avatar"
          size="lg"
        >
          {{ category.author.name.slice(0, 1) }}
        </UAvatar>
        <div>
          <p class="font-medium">{{ category.author.name }}</p>
          <p v-if="category.author.role" class="text-sm text-muted">{{ category.author.role }}</p>
        </div>
      </div>

      <div v-if="category.tags?.length" class="space-y-2">
        <p class="text-xs font-medium text-muted">Tags</p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in category.tags"
            :key="tag"
            color="neutral"
            variant="soft"
            size="sm"
          >
            {{ tag }}
          </UBadge>
        </div>
      </div>
    </div>

    <div v-if="category.heroImage" class="aspect-16/7 w-full overflow-hidden rounded-2xl border border-default">
      <img
        :src="category.heroImage"
        :alt="category.title"
        loading="lazy"
        class="size-full object-cover"
      >
    </div>

    <ContentRenderer
      v-if="category.body"
      :value="category"
      class="prose prose-base dark:prose-invert"
    />
  </UContainer>
</template>
