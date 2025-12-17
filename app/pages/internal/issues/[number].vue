<script setup lang="ts">
useSeoMeta({
  title: 'Internal • Issue',
  description: 'View and update an internal issue.'
})

type GitHubIssue = {
  id: number
  number: number
  title: string
  state: 'open' | 'closed'
  html_url: string
  body?: string
  labels: Array<{ name?: string }>
  updated_at?: string
}

type GitHubComment = {
  id: number
  html_url: string
  body?: string
  created_at?: string
  user?: { login?: string, avatar_url?: string }
}

const route = useRoute()
const number = computed(() => String(route.params.number || ''))

const { data: issue, pending, error, refresh } = await useFetch<GitHubIssue>(() => `/api/internal/issues/${number.value}`, {
  default: () => null as any
})

const { data: comments, pending: commentsPending, refresh: refreshComments } = await useFetch<GitHubComment[]>(
  () => `/api/internal/issues/${number.value}/comments`,
  { default: () => [] }
)

const editing = ref(false)
const form = reactive({
  title: '',
  body: ''
})

watch(
  () => issue.value,
  (v) => {
    if (!v) {
      return
    }
    form.title = v.title || ''
    form.body = v.body || ''
  },
  { immediate: true }
)

const saving = ref(false)
async function save() {
  if (!issue.value) {
    return
  }

  saving.value = true
  try {
    await $fetch(`/api/internal/issues/${issue.value.number}`, {
      method: 'PATCH',
      body: {
        title: form.title,
        body: form.body
      }
    })

    editing.value = false
    await refresh()
  } finally {
    saving.value = false
  }
}

const commentBody = ref('')
const commenting = ref(false)
async function addComment() {
  const body = commentBody.value.trim()
  if (!body || !issue.value) {
    return
  }

  commenting.value = true
  try {
    await $fetch(`/api/internal/issues/${issue.value.number}/comments`, {
      method: 'POST',
      body: { body }
    })

    commentBody.value = ''
    await refreshComments()
    await refresh()
  } finally {
    commenting.value = false
  }
}
</script>

<template>
  <UContainer class="py-10">
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <h1 class="text-2xl font-semibold truncate">Issue #{{ number }}</h1>
        <p v-if="issue" class="text-sm text-muted truncate">
          {{ issue.title }}
        </p>
      </div>

      <div class="flex items-center gap-2">
        <UButton to="/internal/issues" variant="soft" color="neutral">Back</UButton>
        <UButton v-if="issue" :to="issue.html_url" target="_blank" rel="noreferrer" variant="soft" color="neutral">
          Open on GitHub
        </UButton>
      </div>
    </div>

    <UAlert v-if="error" class="mt-6" color="error" variant="soft" title="Failed to load issue">
      <template #description>
        <p class="text-sm">{{ String(error) }}</p>
      </template>
    </UAlert>

    <UCard class="mt-6">
      <div v-if="pending" class="text-sm text-muted">Loading…</div>

      <template v-else-if="issue">
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <UBadge :color="issue.state === 'open' ? 'success' : 'neutral'" variant="soft">{{ issue.state }}</UBadge>
              <div class="flex flex-wrap gap-1">
                <UBadge v-for="label in issue.labels" :key="label.name" color="neutral" variant="soft" size="xs">
                  {{ label.name }}
                </UBadge>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <UButton v-if="!editing" variant="soft" color="primary" @click="editing = true">Edit</UButton>
            <UButton v-else variant="soft" color="neutral" @click="editing = false">Cancel</UButton>
            <UButton v-if="editing" color="primary" :loading="saving" @click="save">Save</UButton>
          </div>
        </div>

        <div class="mt-6 grid gap-4">
          <UFormField label="Title">
            <UInput v-model="form.title" :disabled="!editing" />
          </UFormField>

          <UFormField label="Body">
            <UTextarea v-model="form.body" :rows="10" :disabled="!editing" />
          </UFormField>
        </div>
      </template>
    </UCard>

    <UCard class="mt-6">
      <template #header>
        <div class="font-medium">Comments</div>
      </template>

      <div class="grid gap-4">
        <UFormField label="Add comment">
          <UTextarea v-model="commentBody" :rows="4" placeholder="Status update…" />
        </UFormField>
        <div class="flex justify-end">
          <UButton color="primary" :loading="commenting" :disabled="!commentBody.trim()" @click="addComment">
            Post
          </UButton>
        </div>

        <UDivider />

        <div v-if="commentsPending" class="text-sm text-muted">Loading comments…</div>
        <div v-else-if="comments.length === 0" class="text-sm text-muted">No comments yet.</div>

        <div v-else class="grid gap-3">
          <UCard v-for="c in comments" :key="c.id" class="bg-muted">
            <div class="flex items-center gap-3">
              <UAvatar :src="c.user?.avatar_url || undefined" :alt="c.user?.login || 'User'" size="sm" />
              <div class="min-w-0">
                <div class="text-sm font-medium truncate">@{{ c.user?.login }}</div>
                <div class="text-xs text-muted">
                  {{ c.created_at ? new Date(c.created_at).toLocaleString() : '' }}
                </div>
              </div>
              <div class="ml-auto">
                <UButton :to="c.html_url" target="_blank" rel="noreferrer" size="xs" variant="soft" color="neutral">
                  Open
                </UButton>
              </div>
            </div>

            <div class="mt-3 whitespace-pre-wrap text-sm">
              {{ c.body }}
            </div>
          </UCard>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>
