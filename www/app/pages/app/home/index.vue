<template>
  <div class="space-y-8">
    <!-- Welcome banner -->
    <div class="rounded-3xl bg-secondary-container px-6 py-8 flex flex-col md:flex-row md:items-center gap-4">
      <span class="material-symbols-outlined text-5xl text-secondary">waving_hand</span>
      <div>
        <h1 class="text-2xl font-semibold text-on-secondary-container">Welcome back</h1>
        <p class="text-on-secondary-container/70 mt-1 text-sm">
          Your family's story is waiting to be continued. Start a session or browse memories.
        </p>
      </div>
      <div class="md:ml-auto flex gap-3">
        <NuxtLink to="/app/studio" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary text-sm font-medium">
          <span class="material-symbols-outlined text-base">auto_stories</span>
          New session
        </NuxtLink>
      </div>
    </div>

    <!-- Quick actions -->
    <section>
      <h2 class="text-title-medium text-on-surface mb-4">Quick actions</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <NuxtLink v-for="action in quickActions" :key="action.label" :to="action.to"
          class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer">
          <span class="material-symbols-outlined text-3xl text-primary">{{ action.icon }}</span>
          <span class="text-label-medium text-on-surface text-center">{{ action.label }}</span>
        </NuxtLink>
      </div>
    </section>

    <!-- Recent memories -->
    <section>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-title-medium text-on-surface">Recent memories</h2>
        <NuxtLink to="/app/memories" class="text-sm text-primary hover:underline">View all</NuxtLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="i in 3" :key="i"
          class="rounded-2xl bg-surface-container p-4 space-y-2 animate-pulse">
          <div class="h-24 rounded-xl bg-surface-container-high" />
          <div class="h-3 w-3/4 rounded bg-surface-container-highest" />
          <div class="h-3 w-1/2 rounded bg-surface-container-highest" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Home — Lembria' })

const quickActions = [
  { icon: 'mic', label: 'Start session', to: '/app/studio' },
  { icon: 'upload', label: 'Upload memory', to: '/app/memories/upload' },
  { icon: 'group', label: 'Invite family', to: '/app/family/invitations' },
  { icon: 'explore', label: 'Explore stories', to: '/app/explore' },
]
</script>
