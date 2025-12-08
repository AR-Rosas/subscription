<script setup lang="ts">
const ACCESS_STORAGE_KEY = 'tradealink-directory-unlocked'

type DirectoryPost = {
  _id?: string
  _path?: string
  slug: string
  title: string
  description: string
  category: string
  date: string
  tags?: string[]
}

declare global {
  interface Window {
    Tally?: {
      openPopup: (formId: string, options?: any) => void
      closePopup: (formId: string) => void
    }
  }
}

const { data: directoryDocs } = await useAsyncData('directory-entries', () =>
  queryCollection('directory').all()
)

const hasUnlockedDirectory = useState('directory-unlocked', () => false)

const enableAccess = () => {
  hasUnlockedDirectory.value = true
  if (import.meta.client) {
    localStorage.setItem(ACCESS_STORAGE_KEY, 'true')
  }
}

const openTallyForm = () => {
  // Form disabled - auto-unlock for now
  enableAccess()
  // if (import.meta.client && window.Tally) {
  //   window.Tally.openPopup('xXVMRk', {
  //     layout: 'modal',
  //     width: 700,
  //     emoji: {
  //       text: '👋',
  //       animation: 'wave'
  //     },
  //     onSubmit: (payload: any) => {
  //       console.log('Form submitted:', payload)
  //       enableAccess()
  //     }
  //   })
  // }
}

onMounted(() => {
  if (!import.meta.client) {
    return
  }

  // Auto-unlock for testing (form disabled)
  hasUnlockedDirectory.value = true
  localStorage.setItem(ACCESS_STORAGE_KEY, 'true')
  
  // if (localStorage.getItem(ACCESS_STORAGE_KEY) === 'true') {
  //   hasUnlockedDirectory.value = true
  // }
})

const posts = computed<DirectoryPost[]>(() => {
  const docs = (directoryDocs.value ?? []) as unknown as DirectoryPost[]
  return docs
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
})

const columns = [{
  key: 'title',
  label: 'Category'
}, {
  key: 'description',
  label: 'Description'
}, {
  key: 'actions',
  label: ''
}] as const

useHead({
  script: [
    {
      src: 'https://tally.so/widgets/embed.js',
      async: true
    }
  ]
})

useSeoMeta({
  title: 'Free Tools Directory - 200+ Curated Resources',
  description: 'Explore our curated collection of 200+ free tools for developers, students, freelancers, and small businesses. Organized into 17+ categories.'
})
</script>

<template>
  <UContainer v-if="hasUnlockedDirectory" class="py-4 md:py-6 space-y-6">
    <div class="text-center space-y-3 mb-8">
      <div class="flex items-center justify-center gap-3">
        <UIcon name="i-lucide-compass" class="w-6 h-6 text-primary" />
        <h1 class="text-2xl md:text-3xl font-bold">
          Free Tools Directory
        </h1>
        <UBadge color="primary" variant="soft" size="md">
          Unlocked
        </UBadge>
      </div>
      <p class="text-sm md:text-base text-muted max-w-xl mx-auto">
        Explore our curated collection of 200+ free tools. Click any category to discover resources.
      </p>
    </div>

    <UTable
      :columns="columns as any"
      :rows="posts"
      sort-mode="manual"
    >
      <template #title-data="{ row }">
        <ULink
          :to="`/directory/${(row as any).slug}`"
          class="font-medium hover:text-primary transition-colors"
        >
          {{ (row as any).title }}
        </ULink>
      </template>

      <template #description-data="{ row }">
        <span class="text-muted line-clamp-2">{{ (row as any).description }}</span>
      </template>

      <template #actions-data="{ row }">
        <ULink
          :to="`/directory/${(row as any).slug}`"
          class="flex items-center gap-1 text-muted hover:text-primary transition-colors"
        >
          <span class="text-xs hidden sm:inline">View</span>
          <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
        </ULink>
      </template>
    </UTable>
  </UContainer>

  <UContainer v-else class="py-10 md:py-16">
    <UCard class="text-center space-y-8 max-w-2xl mx-auto relative overflow-hidden">
      <div class="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      <div class="absolute bottom-0 left-0 w-40 h-40 bg-green-500/5 rounded-full blur-3xl" />

      <div class="relative space-y-6">
        <div class="flex justify-center">
          <div class="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <UIcon name="i-lucide-lock" class="w-8 h-8 text-primary" />
          </div>
        </div>

        <div class="space-y-3">
          <UBadge color="primary" variant="soft" size="lg">
            Trade a Link
          </UBadge>
          <h1 class="text-3xl md:text-4xl font-bold">
            Unlock the Free Tools Directory
          </h1>
          <p class="text-base md:text-lg text-muted max-w-xl mx-auto">
            Share your favorite free tool and we'll unlock the full Tradealink directory plus lifetime updates.
          </p>
        </div>

        <div class="bg-muted/20 rounded-lg p-6 space-y-3">
          <p class="font-semibold">
            What you'll get:
          </p>
          <div class="grid md:grid-cols-2 gap-3 text-left">
            <div class="flex items-start gap-2">
              <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span class="text-sm">Access to 200+ curated free tools</span>
            </div>
            <div class="flex items-start gap-2">
              <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span class="text-sm">Lifetime updates to the directory</span>
            </div>
            <div class="flex items-start gap-2">
              <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span class="text-sm">Categorized and searchable</span>
            </div>
            <div class="flex items-start gap-2">
              <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span class="text-sm">Your tool added to our list</span>
            </div>
          </div>
        </div>

        <div class="pt-2">
          <UButton
            block
            color="primary"
            size="xl"
            icon="i-lucide-sparkles"
            trailing
            @click="openTallyForm"
          >
            Share a Tool to Unlock
          </UButton>
          <p class="text-xs text-muted mt-3">
            Takes less than 1 minute • Instant unlock
          </p>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>
