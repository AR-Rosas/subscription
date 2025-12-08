<script setup lang="ts">
const { data: page } = await useAsyncData('landing-page', () =>
  queryCollection('pages')
    .where('slug', '=', 'index')
    .first()
)

const faqs = [
  { label: 'How fast is delivery?', content: 'Delivery time depends on the service complexity. Most services are completed in 2+ weeks with complete documentation.' },
  { label: 'How do I choose a service?', content: 'Pick from our service list or describe your specific need in the booking form. We handle both predefined services and custom requests.' },
  { label: 'Do I need an account?', content: 'No — Whop creates secure access for you automatically after purchase.' },
  { label: 'What\'s included with vault access?', content: 'Lifetime access to our agency templates, SOPs, automation scripts, tools, themes, and internal wiki.' },
  { label: 'Can I buy multiple services?', content: 'Yes! Each service is $1,500. Purchase multiple services as needed to build your complete business system.' }
]

const scrollToPricing = () => {
  const el = document.getElementById('task-pricing')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

declare global {
  interface Window {
    Tally?: {
      openPopup: (formId: string, options?: any) => void
      closePopup: (formId: string) => void
    }
  }
}

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

const openResearchPopup = () => {
  if (!import.meta.client || !window.Tally) return

  window.Tally.openPopup('jaeo4J', {
    layout: 'modal',
    width: 700,
    emoji: { text: '🔎', animation: 'wave' },
    onSubmit: () => {
      window.location.href = 'https://whop.com'
    }
  })
}

useHead({
  script: [
    {
      src: 'https://tally.so/widgets/embed.js',
      async: true
    }
  ]
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.hero?.title"
      :description="page.hero?.description"
    >
      <template #actions>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <UButton
            size="xl"
            color="primary"
            label="Describe Your Service"
            icon="i-lucide-arrow-right"
            trailing
            @click="scrollToPricing"
          />
          <UButton
            size="xl"
            color="neutral"
            variant="outline"
            label="Browse Free Tools"
            icon="i-lucide-compass"
            to="/directory"
          />
        </div>
        <div class="flex items-center justify-center gap-2 mt-6">
          <UBadge color="primary" variant="soft" size="md">$1,500 Fixed Price</UBadge>
          <UBadge color="success" variant="soft" size="md">2+ Weeks (It Depends)</UBadge>
        </div>
        <p class="text-sm text-center text-muted mt-4">
          Need quick research? Try our <span class="text-primary font-medium">$29 Internet Research Service</span>. We deeply search, verify, and organize useful information about a person, business, product, or topic — delivered fast.
        </p>
      </template>
    </UPageHero>

    <UPageBody class="space-y-20">
      <!-- What We Do -->
      <UPageSection
        :title="(page.sections as any)?.whatWeDo?.title"
        :description="(page.sections as any)?.whatWeDo?.description"
      >
        <UCard class="mt-8">
          <div class="space-y-6">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-grid-3x3" class="w-5 h-5 text-primary" />
              <h3 class="font-semibold text-lg">Choose from our professional services:</h3>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-workflow" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Business Workflow Automation</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-file-check" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Operations Audit + SOP Creation</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-bot" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">AI Automation Integration</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-code-xml" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Custom Business Tool or Calculator</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-database" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Data System Setup</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-package" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Digital Product Packaging</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-users" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">CRM Setup & Optimization</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-calendar-clock" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Appointment + Pipeline Automation</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-book-open" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Knowledge Base + Training System</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-target" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Lead Generation System</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-bar-chart" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Business Analytics Dashboard</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-messages-square" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Internal Communication System</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Documentation & Compliance</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-user-plus" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Client Onboarding Automation</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-goal" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Productivity System for Teams</span>
              </div>
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-file-spreadsheet" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span class="text-sm">Reporting + Document Automation</span>
              </div>
            </div>
            <div class="pt-4 text-center">
              <UButton to="/services" variant="outline" size="sm" icon="i-lucide-arrow-right" trailing>
                View All Service Details
              </UButton>
            </div>
          </div>
        </UCard>
      </UPageSection>

      <!-- How It Works -->
      <UPageSection :title="(page.sections as any)?.howItWorks?.title">
        <div class="grid md:grid-cols-3 gap-8 mt-8">
          <UCard class="space-y-4 hover:shadow-lg transition-shadow">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <UIcon name="i-lucide-shopping-cart" class="w-5 h-5 text-primary" />
              </div>
              <UBadge color="primary" variant="soft">Step 1</UBadge>
            </div>
            <h3 class="font-semibold text-lg">Choose or Describe Your Service</h3>
            <p class="text-sm text-muted">Pick from our services or describe what you need. Fixed $1,500 price, no surprises.</p>
          </UCard>
          <UCard class="space-y-4 hover:shadow-lg transition-shadow">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <UIcon name="i-lucide-rocket" class="w-5 h-5 text-primary" />
              </div>
              <UBadge color="primary" variant="soft">Step 2</UBadge>
            </div>
            <h3 class="font-semibold text-lg">We Build Your System</h3>
            <p class="text-sm text-muted">Quick kickoff call, then we build and configure everything for you. Timeline depends on complexity (typically 2+ weeks).</p>
          </UCard>
          <UCard class="space-y-4 hover:shadow-lg transition-shadow">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <UIcon name="i-lucide-package-check" class="w-5 h-5 text-primary" />
              </div>
              <UBadge color="primary" variant="soft">Step 3</UBadge>
            </div>
            <h3 class="font-semibold text-lg">Launch + Vault Access</h3>
            <p class="text-sm text-muted">Complete deliverables, training materials, and lifetime access to our agency vault.</p>
          </UCard>
        </div>
      </UPageSection>

      <!-- $29 Quick Win Section -->
      <UPageSection :title="(page.sections as any)?.quickWin?.title">
        <div class="max-w-3xl mx-auto">
          <UCard class="relative overflow-hidden bg-gradient-to-br from-primary/5 to-green-500/5">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div class="relative space-y-6">
              <div class="text-center space-y-3">
                <UBadge color="success" variant="solid" size="lg">⚡ Fast Track</UBadge>
                <div class="flex items-baseline justify-center gap-2">
                  <span class="text-4xl md:text-5xl font-bold text-primary">$29</span>
                  <span class="text-muted text-sm">24-72 hour delivery</span>
                </div>
                <p class="text-base max-w-xl mx-auto">{{ (page.sections as any)?.quickWin?.description }}</p>
              </div>

              <div class="bg-background/60 backdrop-blur-sm rounded-lg p-6 space-y-3">
                <p class="font-semibold text-center mb-4">What You'll Receive:</p>
                <div class="grid md:grid-cols-2 gap-3">
                  <div 
                    v-for="(feature, idx) in (page.sections as any)?.quickWin?.features" 
                    :key="idx"
                    class="flex items-start gap-2"
                  >
                    <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span class="text-sm">{{ feature }}</span>
                  </div>
                </div>
              </div>

              <div class="text-center space-y-2">
                <p class="text-sm text-muted">{{ (page.sections as any)?.quickWin?.blurb }}</p>
              </div>

              <div class="pt-2">
                <UButton
                  block
                  color="primary"
                  size="xl"
                  icon="i-lucide-zap"
                  trailing
                  @click="openResearchPopup"
                >
                  Get $29 Internet Research
                </UButton>
                <p class="text-xs text-center text-muted mt-3">Delivered within 24–72 hours • No subscription required</p>
              </div>
            </div>
          </UCard>
        </div>
      </UPageSection>

      <!-- Pricing -->
      <UPageSection id="task-pricing" :title="(page.sections as any)?.pricing?.title">
        <div class="max-w-3xl mx-auto">
          <UCard class="relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            <div class="relative space-y-6">
              <div class="text-center space-y-3">
                <UBadge color="primary" variant="soft" size="lg">One Fixed Price</UBadge>
                <h3 class="text-2xl md:text-3xl font-bold">Any Business Service</h3>
                <div class="flex items-baseline justify-center gap-2">
                  <span class="text-4xl md:text-5xl font-bold text-primary">$1,500</span>
                  <span class="text-muted">flat</span>
                </div>
                <p class="text-base text-muted max-w-xl mx-auto">Choose from our professional services. All include complete deliverables, training, and lifetime vault access.</p>
              </div>

              <div class="bg-muted/20 rounded-lg p-4">
                <p class="text-sm font-medium mb-2">Popular Services:</p>
                <ul class="space-y-1.5 text-sm text-muted">
                  <li class="flex items-start gap-2">
                    <UIcon name="i-lucide-check" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>Workflow automation systems (booking, CRM, invoicing)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <UIcon name="i-lucide-check" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>AI integration & automation (reporting, content, emails)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <UIcon name="i-lucide-check" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>Custom tools, dashboards & data systems</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <UIcon name="i-lucide-check" class="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>SOPs, documentation & knowledge base setup</span>
                  </li>
                </ul>
              </div>

              <div class="space-y-3">
                <p class="font-semibold text-center">Every Service Includes:</p>
                <div class="grid md:grid-cols-2 gap-3">
                  <div class="flex items-start gap-2">
                    <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span class="text-sm">Complete deliverables with documentation</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span class="text-sm">Delivery timeline depends on service (typically 2+ weeks)</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <UIcon name="i-lucide-check-circle" class="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span class="text-sm">Lifetime access to agency vault</span>
                  </div>
                </div>
              </div>

              <div class="pt-4">
                <UButton
                  block
                  color="primary"
                  size="xl"
                  icon="i-lucide-arrow-right"
                  trailing
                  @click="openOrderPopup"
                >
                  Book Your Service for $1,500
                </UButton>
                <p class="text-xs text-center text-muted mt-3">Secure checkout via Whop • Timeline depends on service</p>
              </div>
            </div>
          </UCard>
        </div>
      </UPageSection>

      <!-- Vault Access -->
      <UPageSection :title="(page.sections as any)?.vault?.title">
        <UCard class="mt-8 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          <div class="absolute bottom-0 right-0 w-40 h-40 bg-green-500/5 rounded-full blur-3xl" />

          <div class="relative space-y-6">
            <div class="text-center space-y-2">
              <UBadge color="primary" variant="soft" size="lg">Included With Every Purchase</UBadge>
              <p class="text-lg font-medium">{{ (page.sections as any)?.vault?.intro }}</p>
              <p class="text-muted">{{ (page.sections as any)?.vault?.details }}</p>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div class="flex items-start gap-3">
                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                  <UIcon name="i-lucide-file-text" class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium">Agency-grade templates and workflows</p>
                  <p class="text-xs text-muted">Professional resources we use for client work</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                  <UIcon name="i-lucide-book-open" class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium">SOP documentation templates</p>
                  <p class="text-xs text-muted">Ready-to-use process documentation</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                  <UIcon name="i-lucide-zap" class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium">Automation blueprints and scripts</p>
                  <p class="text-xs text-muted">Pre-built automation frameworks</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                  <UIcon name="i-lucide-database" class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium">Business system frameworks</p>
                  <p class="text-xs text-muted">Complete operational systems</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                  <UIcon name="i-lucide-graduation-cap" class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium">Training materials and guides</p>
                  <p class="text-xs text-muted">Video tutorials and documentation</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                  <UIcon name="i-lucide-calculator" class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium">Pre-built calculators and tools</p>
                  <p class="text-xs text-muted">Business calculators and utilities</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                  <UIcon name="i-lucide-palette" class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium">Design themes and UI kits</p>
                  <p class="text-xs text-muted">Professional design resources</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                  <UIcon name="i-lucide-book-marked" class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium">Internal wiki and knowledge base</p>
                  <p class="text-xs text-muted">Our complete internal documentation</p>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </UPageSection>

      <!-- Free Tools Directory -->
      <UPageSection :title="(page.sections as any)?.directory?.title">
        <UCard class="mt-8">
          <div class="space-y-6">
            <div class="text-center space-y-2">
              <UBadge color="success" variant="soft" size="lg">200+ Free Tools</UBadge>
              <p class="text-lg font-medium">Trusted by developers, students, freelancers, and small businesses worldwide.</p>
            </div>

            <div class="space-y-3">
              <p class="font-semibold text-center">Explore free tools for:</p>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="flex items-center gap-2 text-sm">
                  <UIcon name="i-lucide-sparkles" class="w-4 h-4 text-primary" />
                  <span>AI</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <UIcon name="i-lucide-file-text" class="w-4 h-4 text-primary" />
                  <span>PDF utilities</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <UIcon name="i-lucide-pen-tool" class="w-4 h-4 text-primary" />
                  <span>Writing</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <UIcon name="i-lucide-briefcase" class="w-4 h-4 text-primary" />
                  <span>Business</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <UIcon name="i-lucide-code" class="w-4 h-4 text-primary" />
                  <span>Coding</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <UIcon name="i-lucide-zap" class="w-4 h-4 text-primary" />
                  <span>Productivity</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <UIcon name="i-lucide-search" class="w-4 h-4 text-primary" />
                  <span>Research</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <UIcon name="i-lucide-layout" class="w-4 h-4 text-primary" />
                  <span>Organization</span>
                </div>
              </div>
            </div>

            <div class="pt-4">
              <UButton
                block
                color="primary"
                variant="soft"
                label="Browse Free Tools Directory"
                icon="i-lucide-compass"
                size="lg"
                to="/directory"
              />
            </div>
          </div>
        </UCard>
      </UPageSection>

      <!-- Affiliate Program -->
      <UPageSection :title="(page.sections as any)?.affiliate?.title">
        <UCard class="mt-8">
          <div class="space-y-6">
            <div class="text-center space-y-2">
              <UBadge color="warning" variant="soft" size="lg">Earn 20-40% Commission</UBadge>
              <p class="text-lg font-medium">Join our global affiliate program through Whop.</p>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div class="flex items-start gap-3">
                <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0">
                  <UIcon name="i-lucide-dollar-sign" class="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p class="font-medium text-sm">High Commission</p>
                  <p class="text-xs text-muted">Earn 20–40% per referral</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0">
                  <UIcon name="i-lucide-users" class="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p class="font-medium text-sm">Perfect For</p>
                  <p class="text-xs text-muted">Students, creators, freelancers</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0">
                  <UIcon name="i-lucide-link" class="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p class="font-medium text-sm">Custom Links</p>
                  <p class="text-xs text-muted">Dashboard & tracking provided</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0">
                  <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p class="font-medium text-sm">No Approval</p>
                  <p class="text-xs text-muted">Start promoting immediately</p>
                </div>
              </div>
            </div>

            <UButton
              block
              color="neutral"
              variant="outline"
              label="Join as Affiliate"
              icon="i-lucide-external-link"
              size="lg"
            />
          </div>
        </UCard>
      </UPageSection>

      <!-- Footer CTA for $29 Internet Research -->
      <UPageSection>
        <div class="max-w-2xl mx-auto">
          <UCard class="bg-gradient-to-r from-primary/10 to-green-500/10 border-primary/20">
            <div class="text-center space-y-4">
              <h3 class="text-2xl font-bold">Not Ready for a Full System Yet?</h3>
              <p class="text-muted">Start with a <span class="font-semibold text-foreground">$29 Internet Research Service</span> — deep internet research to gather, verify, and organize useful information.</p>
              <UButton
                color="primary"
                size="lg"
                variant="soft"
                @click="openResearchPopup"
              >
                Get $29 Research Service
              </UButton>
            </div>
          </UCard>
        </div>
      </UPageSection>

      <!-- FAQ -->
      <UPageSection :title="(page.sections as any)?.faq?.title">
        <UAccordion :items="faqs" />
      </UPageSection>
    </UPageBody>
  </UPage>
</template>
