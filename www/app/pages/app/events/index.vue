<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <span class="material-symbols-outlined text-on-surface-variant">event</span>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Life events</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Browse stories around key milestones</p>
      </div>
    </div>

    <!-- Timeline list -->
    <div class="space-y-3">
      <div v-for="(event, i) in events" :key="i"
        class="flex gap-4">
        <!-- Year marker -->
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-secondary text-sm">{{ event.icon }}</span>
          </div>
          <div v-if="i < events.length - 1" class="w-0.5 flex-1 bg-outline-variant mt-1" />
        </div>
        <NuxtLink :to="`/app/events/${event.id}`"
          class="flex-1 pb-4 rounded-0 hover:bg-surface-container rounded-2xl px-4 py-3 mb-1 transition-colors">
          <p class="text-label-large text-on-surface font-medium">{{ event.label }}</p>
          <p class="text-label-small text-on-surface-variant">{{ event.year }} · {{ event.stories }} stories</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Events — Lembria' })

const events = [
  { id: 'wedding-1985', icon: 'favorite', label: "Grandparents' wedding", year: '1985', stories: 3 },
  { id: 'birth-1987', icon: 'child_care', label: 'First child born', year: '1987', stories: 5 },
  { id: 'move-1992', icon: 'moving', label: 'Family moved abroad', year: '1992', stories: 2 },
  { id: 'graduation-2006', icon: 'school', label: 'First university graduation', year: '2006', stories: 4 },
  { id: 'wedding-2015', icon: 'celebration', label: 'Second generation wedding', year: '2015', stories: 6 },
]
</script>
