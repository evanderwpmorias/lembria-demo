<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <span class="material-symbols-outlined text-on-surface-variant">tag</span>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Topics</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Browse stories by theme</p>
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      <NuxtLink v-for="topic in topics" :key="topic.slug" :to="`/app/topics/${topic.slug}`"
        class="flex flex-col items-center gap-2 p-5 rounded-3xl bg-surface-container hover:bg-surface-container-high transition-colors text-center">
        <span class="material-symbols-outlined text-3xl text-primary">{{ topic.icon }}</span>
        <p class="text-label-large text-on-surface font-medium">{{ topic.label }}</p>
        <p class="text-label-small text-on-surface-variant">{{ topic.count }} stories</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Topics — Lembria' })

const topics = [
  { slug: 'childhood', icon: 'child_care', label: 'Childhood', count: 12 },
  { slug: 'love', icon: 'favorite', label: 'Love', count: 8 },
  { slug: 'travel', icon: 'travel_explore', label: 'Travel', count: 15 },
  { slug: 'milestones', icon: 'celebration', label: 'Milestones', count: 6 },
  { slug: 'education', icon: 'school', label: 'Education', count: 9 },
  { slug: 'traditions', icon: 'star', label: 'Traditions', count: 11 },
  { slug: 'food', icon: 'restaurant', label: 'Food & recipes', count: 4 },
  { slug: 'hardships', icon: 'healing', label: 'Resilience', count: 7 },
]
</script>
