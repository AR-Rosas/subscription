<script setup lang="ts">
interface ProductItem {
  slug: string
  title: string
  description: string
  price: string
  comingSoon?: boolean
  purchaseUrl?: string
  image?: string
  tags?: string[]
  features?: string[]
}

const { data: products } = await useAsyncData('products-list', async () => {
  return await queryCollection('products').order('title', 'ASC').all()
})

const productList = computed(() => (products.value ?? []) as ProductItem[])

const tileLayouts = [
  'md:col-span-4 md:row-span-2',
  'md:col-span-2 md:row-span-1',
  'md:col-span-2 md:row-span-1',
  'md:col-span-3 md:row-span-1',
  'md:col-span-3 md:row-span-1',
  'md:col-span-2 md:row-span-2',
  'md:col-span-4 md:row-span-1'
]

function getTileLayout(index: number) {
  return tileLayouts[index % tileLayouts.length]
}

function getProductIcon(product: ProductItem) {
  const tags = new Set((product.tags ?? []).map(t => t.toLowerCase()))

  if (tags.has('nuxt-ui') || tags.has('nuxt')) {
    return 'i-lucide-layout-template'
  }

  if (tags.has('landing')) {
    return 'i-lucide-panels-top-left'
  }

  if (tags.has('whop') || tags.has('checkout')) {
    return 'i-lucide-credit-card'
  }

  return 'i-lucide-package'
}

useSeoMeta({
  title: 'Products — curateai.xyz',
  description: 'A small, high-signal shelf of digital products: templates, databases, and other assets I’d actually use.'
})
</script>

<template>
  <UContainer class="py-8 md:py-12">
    <div class="max-w-5xl mx-auto space-y-10">
      <div class="text-center space-y-3">
        <div class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted">
          <UIcon name="i-lucide-shopping-bag" class="w-4 h-4" />
          <span>
            {{ productList.length }} products
          </span>
        </div>
        <h1 class="text-3xl md:text-5xl font-bold tracking-tight">Products</h1>
        <p class="text-base md:text-lg text-muted max-w-2xl mx-auto">
          A tight list of digital products I actually like. No fluff—just what I’d use myself.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-6 gap-4 md:auto-rows-[10.5rem] md:grid-flow-dense">
        <div
          v-for="(product, index) in productList"
          :key="product.slug"
          class="group relative rounded-2xl overflow-hidden border border-gray-200/70 dark:border-gray-800/70 bg-white/60 dark:bg-gray-950/30 backdrop-blur transition-colors hover:border-primary"
          :class="getTileLayout(index)"
        >
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div class="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div class="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          </div>

          <div class="relative h-full p-5 flex flex-col gap-4">
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-start gap-3 min-w-0">
                <div class="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200/70 dark:border-gray-800/70 bg-white/70 dark:bg-gray-950/30">
                  <UIcon :name="getProductIcon(product)" class="w-5 h-5" />
                </div>

                <div class="min-w-0">
                  <NuxtLink :to="`/products/${product.slug}`" class="font-semibold leading-tight truncate hover:underline">
                    {{ product.title }}
                  </NuxtLink>
                  <div class="mt-1 flex flex-wrap items-center gap-2">
                    <p class="text-sm text-muted truncate">
                      {{ product.price }}
                    </p>
                    <UBadge
                      v-if="product.comingSoon"
                      color="neutral"
                      variant="outline"
                      size="xs"
                    >
                      Coming soon
                    </UBadge>
                  </div>
                </div>
              </div>

              <UIcon
                name="i-lucide-arrow-up-right"
                class="w-5 h-5 text-muted transition-colors group-hover:text-foreground"
              />
            </div>

            <p class="text-sm text-muted leading-relaxed line-clamp-3">
              {{ product.description }}
            </p>

            <div class="mt-auto flex flex-wrap items-center justify-between gap-3">
              <div class="flex flex-wrap items-center gap-2">
                <UBadge
                  v-for="tag in (product.tags || []).slice(0, 3)"
                  :key="tag"
                  color="neutral"
                  variant="soft"
                  size="xs"
                >
                  {{ tag }}
                </UBadge>

                <UBadge
                  v-if="(product.tags || []).length > 3"
                  color="neutral"
                  variant="outline"
                  size="xs"
                >
                  +{{ (product.tags || []).length - 3 }}
                </UBadge>
              </div>

              <div class="flex items-center gap-2">
                <UButton
                  :to="`/products/${product.slug}`"
                  color="primary"
                  variant="soft"
                  size="xs"
                >
                  Details
                </UButton>
                <UButton
                  v-if="product.purchaseUrl && !product.comingSoon"
                  :to="product.purchaseUrl"
                  target="_blank"
                  rel="noopener"
                  color="neutral"
                  variant="outline"
                  size="xs"
                  icon="i-lucide-external-link"
                >
                  Get it
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center text-sm text-muted">
        Want me to recommend the best tool/product stack for your exact needs?
        <NuxtLink to="/#pricing" class="text-primary hover:underline">Use the answer service</NuxtLink>.
      </div>
    </div>
  </UContainer>
</template>
