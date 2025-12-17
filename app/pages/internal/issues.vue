<script setup lang="ts">
useSeoMeta({
  title: 'Internal • Issues',
  description: 'Raw internal work issues (GitHub Issues).'
})

type GitHubIssue = {
  id: number
  number: number
  title: string
  state: 'open' | 'closed'
  html_url: string
  labels: Array<{ name?: string }>
  updated_at?: string
}

const search = ref('')

const { data, pending, error, refresh } = await useFetch<GitHubIssue[]>('/api/internal/issues', {
  query: { state: 'all' },
  default: () => []
})

const isAuthError = computed(() => {
  const anyErr = error.value as any
  const code = Number(anyErr?.statusCode || anyErr?.status)
  return code === 401 || code === 403
})

const filtered = computed(() => {
  const list = data.value || []
  const q = search.value.trim().toLowerCase()
  if (!q) {
    return list
  }

  return list.filter((i) => {
    const title = String(i.title || '').toLowerCase()
    const number = String(i.number || '')
    return title.includes(q) || number.includes(q)
  })
})

const createOpen = ref(false)
const newIssue = reactive({
  title: '',
  body: '',
  labels: ''
})

async function createIssue() {
  const title = newIssue.title.trim()
  if (!title) {
    return
  }

  const issue = await $fetch<any>('/api/internal/issues', {
    method: 'POST',
    body: {
      title,
      body: newIssue.body || undefined,
      labels: newIssue.labels
    }
  })

  createOpen.value = false
  newIssue.title = ''
  newIssue.body = ''
  newIssue.labels = ''

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
        <h1 class="text-2xl font-semibold">Issues</h1>
        <p class="text-sm text-muted">Raw internal work issues (not only clients).</p>
      </div>
      <div class="flex items-center gap-2">
        <UButton color="primary" @click="createOpen = true">New issue</UButton>
        <UButton to="/internal" variant="soft" color="neutral">Back</UButton>
      </div>
    </div>

    <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <UInput v-model="search" placeholder="Search by title or #…" class="sm:max-w-sm" />
      <UButton variant="ghost" color="neutral" size="sm" :loading="pending" @click="() => refresh()">Refresh</UButton>
    </div>

    <UAlert v-if="error" class="mt-6" color="error" variant="soft" title="Failed to load issues">
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

      <div v-else-if="filtered.length === 0" class="text-sm text-muted">
        <div class="flex flex-col gap-2">
          <div>No issues found.</div>
          <div class="text-xs">
            If this repo is new, that’s normal. Create one to get the internal OS rolling.
          </div>
          <div>
            <UButton color="primary" size="sm" @click="createOpen = true">Create an issue</UButton>
          </div>
        </div>
      </div>

      <ul v-else class="divide-y divide-default">
        <li v-for="issue in filtered" :key="issue.id" class="py-3 flex items-center justify-between gap-3">
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
          <div class="font-medium">New issue</div>
        </template>

        <div class="grid gap-4">
          <UFormField label="Title">
            <UInput v-model="newIssue.title" placeholder="Internal – Task Name" />
          </UFormField>

          <UFormField label="Labels (comma-separated)">
            <UInput v-model="newIssue.labels" placeholder="internal,ops" />
          </UFormField>

          <UFormField label="Body">
            <UTextarea v-model="newIssue.body" :rows="6" placeholder="Details…" />
          </UFormField>
        </div>

        <template #footer>
          <div class="flex items-center justify-end gap-2">
            <UButton variant="soft" color="neutral" @click="createOpen = false">Cancel</UButton>
            <UButton color="primary" :disabled="!newIssue.title.trim()" @click="createIssue">Create</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </UContainer>
</template>
