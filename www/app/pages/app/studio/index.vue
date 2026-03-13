<template>
  <div class="flex flex-col h-full gap-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-on-surface-variant">auto_stories</span>
        <div>
          <h1 class="text-2xl font-semibold text-on-surface">Story Studio</h1>
          <p class="text-sm text-on-surface-variant mt-0.5">AI-guided storytelling sessions</p>
        </div>
      </div>
      <NuxtLink to="/app/studio/sessions/new"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary text-label-medium font-medium">
        <span class="material-symbols-outlined text-base">add</span>
        New session
      </NuxtLink>
    </div>

    <!-- Session categories -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <button v-for="topic in topics" :key="topic.label"
        class="flex items-start gap-3 p-5 rounded-3xl bg-surface-container hover:bg-surface-container-high transition-colors text-left">
        <span class="material-symbols-outlined text-3xl text-primary mt-0.5">{{ topic.icon }}</span>
        <div>
          <p class="text-label-large text-on-surface font-medium">{{ topic.label }}</p>
          <p class="text-label-small text-on-surface-variant mt-1">{{ topic.description }}</p>
        </div>
      </button>
    </div>

    <!-- Recent sessions -->
    <section class="mt-2">
      <h2 class="text-title-small text-on-surface mb-3">Recent sessions</h2>
      <div class="rounded-3xl bg-surface-container overflow-hidden divide-y divide-outline-variant">
        <div v-for="i in 4" :key="i" class="flex items-center gap-4 px-5 py-4">
          <span class="material-symbols-outlined text-on-surface-variant">chat</span>
          <div class="flex-1 min-w-0">
            <div class="h-3 w-48 rounded bg-surface-container-high animate-pulse mb-1" />
            <div class="h-3 w-28 rounded bg-surface-container-high animate-pulse" />
          </div>
          <span class="text-label-small text-on-surface-variant">2 days ago</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Story Studio — Lembria' })

const topics = [
  { icon: 'child_care', label: 'Childhood memories', description: 'Revisit where it all began' },
  { icon: 'favorite', label: 'Love & relationships', description: 'How your family came together' },
  { icon: 'celebration', label: 'Family milestones', description: 'Weddings, births, anniversaries' },
  { icon: 'travel_explore', label: 'Adventures & travel', description: 'Places and journeys together' },
  { icon: 'school', label: 'Life lessons', description: 'Wisdom passed down the generations' },
  { icon: 'star', label: 'Favourite moments', description: 'The memories that matter most' },
]
</script>
