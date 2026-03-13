<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <NuxtLink to="/app/family" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Family tree</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Visualise your family connections</p>
      </div>
    </div>

    <!-- Placeholder canvas area -->
    <div class="w-full min-h-[60vh] rounded-3xl bg-surface-container flex flex-col items-center justify-center gap-4 text-center p-8">
      <span class="material-symbols-outlined text-6xl text-on-surface-variant/30">account_tree</span>
      <p class="text-title-medium text-on-surface">Family tree coming soon</p>
      <p class="text-body-medium text-on-surface-variant max-w-sm">
        We're building an interactive view of your family connections. Add people and we'll start connecting the dots.
      </p>
      <NuxtLink to="/app/family/members"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary-container text-on-secondary-container text-label-medium">
        <span class="material-symbols-outlined text-base">group</span>
        Manage members
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Family Tree — Lembria' })
</script>
