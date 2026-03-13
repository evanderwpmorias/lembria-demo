<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-on-surface-variant">people</span>
        <div>
          <h1 class="text-2xl font-semibold text-on-surface">People</h1>
          <p class="text-sm text-on-surface-variant mt-0.5">Family members in your story</p>
        </div>
      </div>
      <NuxtLink to="/app/family/members"
        class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-outline text-on-surface text-label-medium">
        <span class="material-symbols-outlined text-sm">settings</span>
        Manage
      </NuxtLink>
    </div>

    <!-- People grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <NuxtLink v-for="i in 8" :key="i" :to="`/app/people/${i}`"
        class="flex flex-col items-center gap-2 p-5 rounded-3xl bg-surface-container hover:bg-surface-container-high transition-colors text-center">
        <div class="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl text-secondary">person</span>
        </div>
        <p class="text-label-large text-on-surface font-medium">Family Member</p>
        <p class="text-label-small text-on-surface-variant">{{ i }} stories</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'People — Lembria' })
</script>
