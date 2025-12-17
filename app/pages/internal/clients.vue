<script setup lang="ts">
useSeoMeta({
  title: 'Internal • Clients',
  description: 'Mini-CRM: clients are GitHub issues labeled client.'
})

type ClientStatus = 'lead' | 'active' | 'completed' | 'dropped'

type GitHubIssue = {
  id: number
  number: number
  title: string
  state: 'open' | 'closed'
  html_url: string
  labels: Array<{ name?: string }>
  updated_at?: string
  created_at?: string
}

// Default to showing all client issues; many repos won't have status labels yet.
const status = ref<ClientStatus | 'all'>('all')

const labelsQuery = computed(() => {
  const base = ['client']
  if (status.value !== 'all') {
    base.push(status.value)
  }
  return base.join(',')
})

const { data, pending, error, refresh } = await useFetch<GitHubIssue[]>('/api/internal/issues', {
  query: computed(() => ({
    labels: labelsQuery.value,
    state: 'all'
  })),
  default: () => []
})

const isAuthError = computed(() => {
  const anyErr = error.value as any
  const code = Number(anyErr?.statusCode || anyErr?.status)
  return code === 401 || code === 403
})

const items = computed(() => data.value || [])

const createOpen = ref(false)
const newClient = reactive({
  name: '',
  service: 'Web',
  status: 'lead' as ClientStatus,
  payment: 'unpaid' as 'paid' | 'unpaid',
  price: 'php-1500' as 'php-500' | 'php-1500' | 'php-3000',
  notes: ''
})

function buildClientIssueTitle() {
  const name = newClient.name.trim()
  const service = newClient.service.trim()
  return `Client – ${name}${service ? ` (${service})` : ''}`
}

function buildClientIssueBody() {
  const lines: string[] = []
  lines.push('## Contact')
  lines.push('- Name:')
  lines.push('- Phone:')
  lines.push('- Email:')
  lines.push('')
  lines.push('## Scope')
  lines.push('-')
  lines.push('')
  lines.push('## Notes')
  lines.push(newClient.notes?.trim() ? newClient.notes.trim() : '-')
  lines.push('')
  lines.push('## Deadlines')
  lines.push('-')
  return lines.join('\n')
}

async function createClient() {
  const title = buildClientIssueTitle()
  if (!newClient.name.trim()) {
    return
  }

  const labels = [
    'client',
    newClient.status,
    newClient.payment,
    newClient.price,
    newClient.service.toLowerCase()
  ]

  const issue = await $fetch<any>('/api/internal/issues', {
    method: 'POST',
    body: {
      title,
      body: buildClientIssueBody(),
      labels
    }
  })

  createOpen.value = false
  newClient.name = ''
  newClient.notes = ''

  await refresh()

  if (issue?.number) {
    await navigateTo(`/internal/issues/${issue.number}`)
  }
}
</script>

<template>
  <UContainer class="py-10">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold">Clients</h1>
        <p class="text-sm text-muted">CRM view (GitHub issues where <code>label=client</code>).</p>
      </div>

      <div class="flex items-center gap-2">
        <UButton color="primary" @click="createOpen = true">New client</UButton>
        <UButton to="/internal" variant="soft" color="neutral">Back</UButton>
      </div>
    </div>

    <div class="mt-6 flex flex-wrap items-center gap-2">
      <UButton
        v-for="s in ['all', 'lead', 'active', 'completed', 'dropped']"
        :key="s"
        :variant="status === s ? 'solid' : 'soft'"
        color="primary"
        size="sm"
        @click="status = s as any"
      >
        {{ s }}
      </UButton>

      <UButton variant="ghost" color="neutral" size="sm" :loading="pending" @click="() => refresh()">
        Refresh
      </UButton>
    </div>

    <UAlert v-if="error" class="mt-6" color="error" variant="soft" title="Failed to load clients">
      <template #description>
        <p class="text-sm">{{ String(error) }}</p>

        <div v-if="isAuthError" class="mt-3 flex flex-wrap gap-2">
          <UButton to="/internal/login" color="primary" size="sm">Go to login</UButton>
          <UButton to="/auth/github" external target="_self" color="neutral" variant="soft" size="sm">
            Re-auth with GitHub
          </UButton>
        </div>
      </template>
    </UAlert>

    <UCard class="mt-6">
      <div v-if="pending" class="text-sm text-muted">Loading…</div>

      <div v-else-if="items.length === 0" class="text-sm text-muted">
        <div class="flex flex-col gap-2">
          <div>No clients found.</div>
          <div class="text-xs">
            Tip: start by creating your first client issue (it will be labeled <code>client</code> automatically).
            If you haven’t applied status labels yet, use the <code>all</code> filter.
          </div>
          <div>
            <UButton color="primary" size="sm" @click="createOpen = true">Create a client</UButton>
          </div>
        </div>
      </div>

      <ul v-else class="divide-y divide-default">
        <li v-for="issue in items" :key="issue.id" class="py-3 flex items-center justify-between gap-3">
          <div class="min-w-0">
            <NuxtLink :to="`/internal/issues/${issue.number}`" class="font-medium hover:underline">
              #{{ issue.number }} — {{ issue.title }}
            </NuxtLink>
            <div class="mt-1 flex flex-wrap gap-1">
              <UBadge
                v-for="label in issue.labels"
                :key="label.name"
                color="neutral"
                variant="soft"
                size="xs"
              >
                {{ label.name }}
              </UBadge>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <UBadge :color="issue.state === 'open' ? 'success' : 'neutral'" variant="soft">
              {{ issue.state }}
            </UBadge>
            <UButton
              :to="issue.html_url"
              target="_blank"
              rel="noreferrer"
              size="xs"
              variant="soft"
              color="neutral"
            >
              Open on GitHub
            </UButton>
          </div>
        </li>
      </ul>
    </UCard>

    <UModal v-model:open="createOpen">
      <UCard>
        <template #header>
          <div class="font-medium">New client</div>
        </template>

        <div class="grid gap-4">
          <UFormField label="Client name">
            <UInput v-model="newClient.name" placeholder="e.g., Juan Dela Cruz" />
          </UFormField>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Service">
              <UInput v-model="newClient.service" placeholder="Web" />
            </UFormField>

            <UFormField label="Status">
              <USelect v-model="newClient.status" :items="['lead', 'active', 'completed', 'dropped']" />
            </UFormField>

            <UFormField label="Payment">
              <USelect v-model="newClient.payment" :items="['paid', 'unpaid']" />
            </UFormField>

            <UFormField label="Pricing">
              <USelect v-model="newClient.price" :items="['php-500', 'php-1500', 'php-3000']" />
            </UFormField>
          </div>

          <UFormField label="Notes">
            <UTextarea v-model="newClient.notes" :rows="4" placeholder="Quick notes…" />
          </UFormField>
        </div>

        <template #footer>
          <div class="flex items-center justify-end gap-2">
            <UButton variant="soft" color="neutral" @click="createOpen = false">Cancel</UButton>
            <UButton color="primary" :disabled="!newClient.name.trim()" @click="createClient">
              Create
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </UContainer>
</template>
