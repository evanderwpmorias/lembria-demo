<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <NuxtLink to="/app/memories" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div class="flex-1 min-w-0">
        <h1 class="text-2xl font-semibold text-on-surface truncate">Memory</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">#{{ memoryId }}</p>
      </div>
      <NuxtLink :to="`/app/memories/${memoryId}/edit`"
        class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-outline text-on-surface text-label-medium">
        <span class="material-symbols-outlined text-sm">edit</span>
        Edit
      </NuxtLink>
    </div>

    <!-- Media viewer placeholder -->
    <div class="w-full aspect-video rounded-3xl bg-surface-container-high flex items-center justify-center">
      <span class="material-symbols-outlined text-6xl text-on-surface-variant/30">image</span>
    </div>

    <!-- Details card -->
    <div class="rounded-3xl bg-surface-container p-6 space-y-4">
      <div>
        <p class="text-label-small text-on-surface-variant uppercase tracking-wide mb-1">Caption</p>
        <p class="text-body-large text-on-surface">A beautiful family moment captured in time</p>
      </div>
      <div class="flex gap-6">
        <div>
          <p class="text-label-small text-on-surface-variant uppercase tracking-wide mb-1">Date</p>
          <p class="text-body-medium text-on-surface">January 2024</p>
        </div>
        <div>
          <p class="text-label-small text-on-surface-variant uppercase tracking-wide mb-1">Type</p>
          <p class="text-body-medium text-on-surface">Photo</p>
        </div>
      </div>
    </div>

    <!-- Related stories -->
    <section>
      <h2 class="text-title-small text-on-surface mb-3">Appears in stories</h2>
      <div class="rounded-3xl bg-surface-container p-4 text-center text-on-surface-variant text-body-medium">
        No stories yet — start a session to include this memory.
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Memory — Lembria' })

const route = useRoute()
const memoryId = computed(() => route.params.memoryId)
</script>
