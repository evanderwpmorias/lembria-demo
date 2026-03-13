<template>
  <div class="space-y-6 max-w-2xl">
    <div class="flex items-center gap-3">
      <NuxtLink :to="`/app/memories/${memoryId}`" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Edit memory</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">#{{ memoryId }}</p>
      </div>
    </div>

    <!-- Preview -->
    <div class="w-full aspect-video rounded-3xl bg-surface-container-high flex items-center justify-center">
      <span class="material-symbols-outlined text-6xl text-on-surface-variant/30">image</span>
    </div>

    <!-- Edit form -->
    <div class="rounded-3xl bg-surface-container p-6 space-y-4">
      <div class="space-y-1">
        <label class="text-label-medium text-on-surface-variant">Caption</label>
        <input v-model="caption" type="text"
          class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary" />
      </div>
      <div class="space-y-1">
        <label class="text-label-medium text-on-surface-variant">Date</label>
        <input v-model="date" type="date"
          class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary" />
      </div>
      <div class="space-y-1">
        <label class="text-label-medium text-on-surface-variant">Tags</label>
        <input v-model="tags" type="text" placeholder="e.g. holiday, grandma, 1990s"
          class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary" />
      </div>
    </div>

    <div class="flex gap-3">
      <NuxtLink :to="`/app/memories/${memoryId}`"
        class="flex-1 text-center px-5 py-3 rounded-full border border-outline text-on-surface text-label-large">
        Cancel
      </NuxtLink>
      <button class="flex-1 px-5 py-3 rounded-full bg-primary text-on-primary text-label-large font-medium">
        Save changes
      </button>
    </div>

    <!-- Danger zone -->
    <div class="rounded-3xl border border-error/30 p-5">
      <h3 class="text-label-large text-error mb-1">Delete memory</h3>
      <p class="text-label-small text-on-surface-variant mb-3">This action cannot be undone.</p>
      <button class="px-4 py-2 rounded-full border border-error text-error text-label-medium">
        Delete memory
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Edit Memory — Lembria' })

const route = useRoute()
const memoryId = computed(() => route.params.memoryId)
const caption = ref('')
const date = ref('')
const tags = ref('')
</script>
