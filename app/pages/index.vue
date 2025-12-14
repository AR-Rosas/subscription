<script setup lang="ts">

declare global {
  interface Window {
    Tally?: {
      openPopup: (formId: string, options?: any) => void
      closePopup: (formId: string) => void
    }
  }
}

const { data: posts } = await useAsyncData('directory-entries', async () => {
  const docs = await queryCollection('directory')
    .order('title', 'ASC')
    .all()

  return docs
})

// Icon mapping for categories
const categoryIcons: Record<string, string> = {
  'AI & Automation': 'i-lucide-sparkles',
  'Business Operations': 'i-lucide-briefcase',
  'Career & Freelance': 'i-lucide-user-circle',
  'CMS': 'i-lucide-layout-dashboard',
  'Document Utilities': 'i-lucide-file-text',
  'Education & Career Development': 'i-lucide-graduation-cap',
  'Forms': 'i-lucide-file-input',
  'Freelancer Starter CRM': 'i-lucide-users',
  'Learning & Research': 'i-lucide-book-open',
  'Low-Code Platform': 'i-lucide-blocks',
  'Marketing': 'i-lucide-megaphone',
  'OSINT': 'i-lucide-search',
  'Payment Gateway': 'i-lucide-credit-card',
  'Remote Desktop Tools': 'i-lucide-monitor',
  'Subreddits to Market Product': 'i-lucide-message-circle',
  'Web Design': 'i-lucide-palette',
  'Web Development': 'i-lucide-code',
  'Web Hosting': 'i-lucide-server'
}

// Bento grid size patterns (optimized to minimize gaps)
const getGridClass = (index: number) => {
  // Pattern: every 5th and 8th item spans 2 columns on larger screens
  const pattern = index % 8
  if (pattern === 4 || pattern === 7) {
    return 'md:col-span-2'
  }
  return 'md:col-span-1'
}

// Directory is always visible now; removed unlock modal

const openOrderPopup = () => {
  if (!import.meta.client || !window.Tally) return

  window.Tally.openPopup('q45GQg', {
    layout: 'modal',
    width: 700,
    emoji: { text: '👋', animation: 'wave' },
    onSubmit: () => {
      window.location.href = 'https://whop.com'
    }
  })
}

onMounted(() => {
  if (!import.meta.client) return
  // Debug: Log the data
  console.log('Directory posts:', posts.value)
})

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
  <UContainer class="py-4 md:py-6 space-y-6">
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

      <!-- Added $39 Whop CTA -->
      <div class="flex items-center justify-center gap-3 mt-4">
        <a
          href="https://whop.com/tradealink/systems-diagnostic-report/"
          target="_blank"
          rel="noopener noreferrer"
          class="no-underline"
        >
          <UButton color="primary" size="sm">
            Get Internet Research Service - $39
          </UButton>
        </a>
      </div>
      <p class="text-xs text-muted max-w-2xl mx-auto">
        Focused internet research delivered in 24–72 hours — we gather, verify, and organize useful information about a person, business, product, or topic.
      </p>

      <p class="text-sm md:text-base text-muted max-w-xl mx-auto">
        Explore our curated collection of 200+ free tools. Click any category to discover resources.
      </p>
    </div>

    <!-- Bento Grid Layout -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <NuxtLink
        v-for="(post, index) in posts"
        :key="post.slug"
        :to="`/${post.slug}`"
        :class="[
          'group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800',
          'hover:border-primary hover:shadow-lg transition-all duration-300',
          'bg-linear-to-br from-background to-muted/20',
          'p-6 flex flex-col min-h-[200px]',
          getGridClass(index)
        ]"
      >
        <!-- Decorative blob -->
        <div class="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
        
        <!-- Icon -->
        <div class="relative flex items-center gap-3 mb-4">
          <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <UIcon 
              :name="categoryIcons[post.title] || 'i-lucide-folder'" 
              class="w-6 h-6 text-primary"
            />
          </div>
          <UBadge color="neutral" variant="soft" size="xs">
            {{ post.category || 'Tools' }}
          </UBadge>
        </div>

        <!-- Content -->
        <div class="relative flex-1 space-y-2">
          <h3 class="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
            {{ post.title }}
          </h3>
          <p class="text-sm text-muted line-clamp-3">
            {{ post.description }}
          </p>
        </div>

        <!-- Arrow indicator -->
        <div class="relative mt-4 flex items-center justify-between">
          <span class="text-xs text-muted">Explore tools</span>
          <UIcon 
            name="i-lucide-arrow-right" 
            class="w-5 h-5 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all"
          />
        </div>
      </NuxtLink>
    </div>

    <!-- Professional Services CTA Section -->
    <div class="mt-16 mb-8">
      <UCard class="relative overflow-hidden border-2 border-primary/20">
        <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
        
        <div class="relative space-y-8 p-6 md:p-8">
          <!-- Header -->
          <div class="text-center space-y-3">
            <UBadge color="primary" variant="soft" size="lg">
              Professional Services
            </UBadge>
            <h2 class="text-3xl md:text-4xl font-bold">
              Need More Than Tools?
            </h2>
            <p class="text-lg text-muted max-w-2xl mx-auto">
              Get complete business systems built for you. Fixed $1,500 price per service with lifetime vault access included.
            </p>
          </div>

          <!-- Services Grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <div class="flex items-start gap-3 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
              <UIcon name="i-lucide-workflow" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p class="font-medium text-sm">Business Workflow Automation</p>
                <p class="text-xs text-muted">Booking, CRM, invoicing systems</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
              <UIcon name="i-lucide-bot" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p class="font-medium text-sm">AI Automation Integration</p>
                <p class="text-xs text-muted">Reports, content, email automation</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
              <UIcon name="i-lucide-database" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p class="font-medium text-sm">Data System Setup</p>
                <p class="text-xs text-muted">Custom dashboards & analytics</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
              <UIcon name="i-lucide-users" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p class="font-medium text-sm">CRM Setup & Optimization</p>
                <p class="text-xs text-muted">Pipeline & client management</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
              <UIcon name="i-lucide-book-open" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p class="font-medium text-sm">Knowledge Base System</p>
                <p class="text-xs text-muted">Training & documentation hub</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
              <UIcon name="i-lucide-code-xml" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p class="font-medium text-sm">Custom Business Tools</p>
                <p class="text-xs text-muted">Calculators, forms & integrations</p>
              </div>
            </div>
          </div>

          <!-- What's Included -->
          <div class="bg-background/60 backdrop-blur-sm rounded-lg p-6 space-y-4 max-w-3xl mx-auto">
            <p class="font-semibold text-center">Every Service Includes:</p>
            <div class="grid md:grid-cols-3 gap-4">
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Complete deliverables with documentation</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Delivery in 2+ weeks (depends on service)</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Lifetime access to agency vault</span>
              </div>
            </div>
          </div>

          <!-- Pricing & CTA -->
          <div class="text-center space-y-4">
            <div class="flex items-baseline justify-center gap-2">
              <span class="text-4xl md:text-5xl font-bold text-primary">$1,500</span>
              <span class="text-muted">per service</span>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <UButton
                size="xl"
                color="primary"
                icon="i-lucide-arrow-right"
                trailing
                @click="openOrderPopup"
              >
                Book Your Service
              </UButton>
              <UButton
                size="xl"
                color="neutral"
                variant="outline"
                icon="i-lucide-list"
                to="/services"
              >
                View All Services
              </UButton>
            </div>
            <p class="text-xs text-muted">
              Fixed pricing • Secure checkout via Whop • Timeline depends on complexity
            </p>
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
