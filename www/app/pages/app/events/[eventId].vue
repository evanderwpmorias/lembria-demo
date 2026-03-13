<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <NuxtLink to="/app/events" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Event</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Stories from this milestone</p>
      </div>
    </div>

    <!-- Event hero -->
    <div class="rounded-3xl bg-secondary-container px-6 py-8 flex items-center gap-4">
      <span class="material-symbols-outlined text-5xl text-secondary">celebration</span>
      <div>
        <h2 class="text-xl font-semibold text-on-secondary-container">Event title</h2>
        <p class="text-sm text-on-secondary-container/70 mt-1">Year · N stories</p>
      </div>
    </div>

    <!-- Related stories -->
    <section>
      <h2 class="text-title-small text-on-surface mb-3">Stories</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="i in 4" :key="i"
          class="rounded-3xl bg-surface-container p-5 space-y-3 cursor-pointer hover:bg-surface-container-high transition-colors">
          <div class="h-3 w-3/4 rounded bg-surface-container-highest animate-pulse" />
          <div class="h-3 w-full rounded bg-surface-container-highest animate-pulse" />
          <div class="h-3 w-1/2 rounded bg-surface-container-highest animate-pulse" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
const route = useRoute()
useHead({ title: 'Event — Lembria' })
</script>
