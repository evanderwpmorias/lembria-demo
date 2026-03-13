<template>
  <div class="space-y-8">
    <div class="flex items-center gap-3">
      <span class="material-symbols-outlined text-on-surface-variant">explore</span>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Explore</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Discover stories, topics, and people</p>
      </div>
    </div>

    <!-- Categories -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <NuxtLink v-for="cat in categories" :key="cat.label" :to="cat.to"
        class="flex items-center gap-4 p-5 rounded-3xl bg-surface-container hover:bg-surface-container-high transition-colors">
        <div class="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-secondary">{{ cat.icon }}</span>
        </div>
        <div>
          <p class="text-label-large text-on-surface font-medium">{{ cat.label }}</p>
          <p class="text-label-small text-on-surface-variant">{{ cat.count }}</p>
        </div>
      </NuxtLink>
    </div>

    <!-- Featured stories -->
    <section>
      <h2 class="text-title-small text-on-surface mb-3">Featured stories</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="i in 6" :key="i"
          class="rounded-3xl bg-surface-container overflow-hidden hover:bg-surface-container-high transition-colors cursor-pointer">
          <div class="h-36 bg-surface-container-high flex items-center justify-center">
            <span class="material-symbols-outlined text-4xl text-on-surface-variant/30">auto_stories</span>
          </div>
          <div class="p-4">
            <div class="h-3 w-3/4 rounded bg-surface-container-highest mb-2 animate-pulse" />
            <div class="h-3 w-1/2 rounded bg-surface-container-highest animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Explore — Lembria' })

const categories = [
  { icon: 'tag', label: 'Topics', count: '24 topics', to: '/app/topics' },
  { icon: 'event', label: 'Events', count: 'Life milestones', to: '/app/events' },
  { icon: 'people', label: 'People', count: 'Family members', to: '/app/people' },
]
</script>
