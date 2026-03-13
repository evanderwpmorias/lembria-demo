<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <span class="material-symbols-outlined text-on-surface-variant">family_restroom</span>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Family</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Your shared family space</p>
      </div>
    </div>

    <!-- Family overview card -->
    <div class="rounded-3xl bg-secondary-container p-6 flex items-center gap-5">
      <div class="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-3xl text-on-secondary">cottage</span>
      </div>
      <div class="flex-1">
        <h2 class="text-xl font-semibold text-on-secondary-container">The Family</h2>
        <div class="flex gap-4 mt-2">
          <span class="text-label-small text-on-secondary-container/70"><span class="text-on-secondary-container font-medium">5</span> members</span>
          <span class="text-label-small text-on-secondary-container/70"><span class="text-on-secondary-container font-medium">48</span> stories</span>
        </div>
      </div>
      <NuxtLink to="/app/family/settings" class="p-2 rounded-full hover:bg-secondary/20 text-on-secondary-container">
        <span class="material-symbols-outlined">settings</span>
      </NuxtLink>
    </div>

    <!-- Quick links -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <NuxtLink v-for="link in links" :key="link.label" :to="link.to"
        class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-center">
        <span class="material-symbols-outlined text-2xl text-on-surface-variant">{{ link.icon }}</span>
        <span class="text-label-small text-on-surface">{{ link.label }}</span>
      </NuxtLink>
    </div>

    <!-- Recent activity -->
    <section>
      <h2 class="text-title-small text-on-surface mb-3">Recent activity</h2>
      <div class="rounded-3xl bg-surface-container divide-y divide-outline-variant overflow-hidden">
        <div v-for="i in 4" :key="i" class="flex items-center gap-4 px-5 py-4">
          <div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-sm text-on-surface-variant">person</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="h-3 w-48 rounded bg-surface-container-high animate-pulse mb-1" />
            <div class="h-3 w-28 rounded bg-surface-container-high animate-pulse" />
          </div>
          <span class="text-label-small text-on-surface-variant">1h ago</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Family — Lembria' })

const links = [
  { icon: 'group', label: 'Members', to: '/app/family/members' },
  { icon: 'mail', label: 'Invitations', to: '/app/family/invitations' },
  { icon: 'account_tree', label: 'Family tree', to: '/app/family/graph' },
  { icon: 'settings', label: 'Settings', to: '/app/family/settings' },
]
</script>
