<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <NuxtLink to="/app/people" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Person</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Stories featuring this family member</p>
      </div>
    </div>

    <!-- Person card -->
    <div class="rounded-3xl bg-surface-container p-6 flex items-center gap-5">
      <div class="w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-4xl text-secondary">person</span>
      </div>
      <div class="flex-1">
        <h2 class="text-xl font-semibold text-on-surface">Family Member</h2>
        <p class="text-body-medium text-on-surface-variant mt-1">Grandmother · Born 1942</p>
        <div class="flex gap-4 mt-3">
          <span class="text-label-small text-on-surface-variant"><span class="text-on-surface font-medium">12</span> stories</span>
          <span class="text-label-small text-on-surface-variant"><span class="text-on-surface font-medium">34</span> memories</span>
        </div>
      </div>
    </div>

    <!-- Their stories -->
    <section>
      <h2 class="text-title-small text-on-surface mb-3">Stories</h2>
      <div class="space-y-3">
        <div v-for="i in 5" :key="i"
          class="flex items-center gap-4 p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer">
          <span class="material-symbols-outlined text-on-surface-variant">auto_stories</span>
          <div class="flex-1 min-w-0">
            <div class="h-3 w-3/4 rounded bg-surface-container-highest mb-1 animate-pulse" />
            <div class="h-3 w-1/2 rounded bg-surface-container-highest animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
const route = useRoute()
useHead({ title: 'Person — Lembria' })
</script>
