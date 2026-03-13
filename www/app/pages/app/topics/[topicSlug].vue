<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <NuxtLink to="/app/topics" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface capitalize">{{ topicSlug?.toString().replace(/-/g, ' ') }}</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Stories tagged with this topic</p>
      </div>
    </div>

    <!-- Stories grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="i in 6" :key="i"
        class="rounded-3xl bg-surface-container overflow-hidden hover:bg-surface-container-high transition-colors cursor-pointer">
        <div class="h-40 bg-surface-container-high flex items-center justify-center">
          <span class="material-symbols-outlined text-4xl text-on-surface-variant/30">auto_stories</span>
        </div>
        <div class="p-4 space-y-2">
          <div class="h-3 w-3/4 rounded bg-surface-container-highest animate-pulse" />
          <div class="h-3 w-1/2 rounded bg-surface-container-highest animate-pulse" />
          <div class="flex items-center gap-1.5 mt-2">
            <span class="material-symbols-outlined text-sm text-on-surface-variant">person</span>
            <span class="text-label-small text-on-surface-variant">Family member</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
const route = useRoute()
const topicSlug = computed(() => route.params.topicSlug)
useHead({ title: `${topicSlug.value?.toString()} — Topics — Lembria` })
</script>
