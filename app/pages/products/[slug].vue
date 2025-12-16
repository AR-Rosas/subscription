<script setup lang="ts">
interface ProductPage {
  slug: string
  title: string
  description: string
  price: string
  comingSoon?: boolean
  purchaseUrl?: string
  image?: string
  tags?: string[]
  features?: string[]
  body?: unknown
}

const route = useRoute()
const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value || ''
})

const { data: product } = await useAsyncData<ProductPage | null>(
  () => `product-${slug.value}`,
  async () => {
    if (!slug.value) {
      return null
    }

    const entry = await queryCollection('products').where('slug', '=', slug.value).first()
    return entry as ProductPage | null
  },
  { watch: [slug] }
)

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
    fatal: true
  })
}

const fallbackDescription = 'Curated product recommendations from curateai.xyz.'

const metaTitle = computed(() => product.value ? `${product.value.title} · curateai.xyz` : 'curateai.xyz')
const metaDescription = computed(() => product.value?.description ?? fallbackDescription)
const metaImage = computed(() => product.value?.image)

useSeoMeta({
  title: metaTitle,
  description: metaDescription,
  ogTitle: metaTitle,
  ogDescription: metaDescription,
  ogImage: metaImage,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UContainer class="py-8 md:py-12">
    <div class="max-w-4xl mx-auto">
      <UButton
        to="/products"
        variant="ghost"
        color="neutral"
        size="sm"
        icon="i-lucide-arrow-left"
        class="mb-6"
      >
        Back to Products
      </UButton>

      <div class="space-y-6">
        <div class="space-y-3">
          <div class="flex flex-wrap items-center gap-2">
            <UBadge color="primary" variant="soft" size="lg">
              Digital product
            </UBadge>
            <UBadge color="neutral" variant="outline" size="lg">
              {{ product?.price }}
            </UBadge>
            <UBadge
              v-if="product?.comingSoon"
              color="neutral"
              variant="outline"
              size="lg"
            >
              Coming soon
            </UBadge>
          </div>

          <h1 class="text-3xl md:text-5xl font-bold">
            {{ product?.title }}
          </h1>
        </div>

        <p class="text-lg md:text-xl text-muted">
          {{ product?.description }}
        </p>

        <div v-if="product?.tags?.length" class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in product.tags"
            :key="tag"
            color="neutral"
            variant="soft"
            size="sm"
          >
            {{ tag }}
          </UBadge>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <UButton
            v-if="product?.purchaseUrl && !product?.comingSoon"
            :to="product.purchaseUrl"
            target="_blank"
            rel="noopener"
            color="primary"
            size="md"
            icon="i-lucide-external-link"
          >
            Get it
          </UButton>
          <UButton
            v-else-if="product?.comingSoon"
            disabled
            color="neutral"
            variant="outline"
            size="md"
            icon="i-lucide-clock"
          >
            Coming soon
          </UButton>
          <UButton
            to="/#pricing"
            color="neutral"
            variant="outline"
            size="md"
          >
            Request early access
          </UButton>
        </div>
      </div>

      <div v-if="product?.image" class="my-8 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
        <img
          :src="product.image"
          :alt="product.title"
          class="w-full h-auto"
        >
      </div>

      <div v-if="product?.features?.length" class="my-8">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-check-circle-2" class="w-5 h-5 text-primary" />
              <h2 class="font-semibold">What you get</h2>
            </div>
          </template>

          <ul class="space-y-2 text-sm">
            <li v-for="(feature, idx) in product.features" :key="idx" class="flex items-start gap-2">
              <UIcon name="i-lucide-dot" class="w-4 h-4 mt-1 text-muted" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </UCard>
      </div>

      <USeparator class="my-8" />

      <div class="prose prose-gray dark:prose-invert max-w-none">
        <ContentRenderer v-if="product" :value="product" />
      </div>

      <div class="mt-10">
        <UCard class="bg-white/60 dark:bg-gray-950/30">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="space-y-1">
              <p class="font-semibold">Want a faster, tailored recommendation?</p>
              <p class="text-sm text-muted">
                Tell me your constraints and I’ll respond with a short, human-filtered shortlist.
              </p>
            </div>
            <UButton to="/#pricing" color="primary" variant="soft">
              Get a Quick Answer ($5)
            </UButton>
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
