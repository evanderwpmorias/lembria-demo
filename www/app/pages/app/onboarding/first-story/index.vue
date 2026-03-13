<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
    <!-- Step indicator (all complete) -->
    <div class="flex items-center gap-2 mb-10">
      <div v-for="(step, i) in steps" :key="i" class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center">
          <span class="material-symbols-outlined text-sm">check</span>
        </div>
        <span v-if="i < steps.length - 1" class="w-8 h-0.5 bg-primary" />
      </div>
    </div>

    <div class="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center mx-auto mb-4">
      <span class="material-symbols-outlined text-5xl text-tertiary" style="font-size:3.5rem">auto_stories</span>
    </div>
    <h1 class="text-3xl font-semibold text-on-surface mb-3">You're ready to tell your first story!</h1>
    <p class="text-on-surface-variant max-w-md mb-8">
      Lembria's AI will guide you through a conversation to capture your family's most treasured moments. Ready to begin?
    </p>

    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <NuxtLink to="/app/studio"
        class="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-on-primary text-label-large font-medium">
        <span class="material-symbols-outlined text-base">mic</span>
        Start my first story
      </NuxtLink>
      <NuxtLink to="/app/home"
        class="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-outline text-on-surface text-label-large">
        Go to dashboard
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'All Set! — Lembria' })

const steps = ['Welcome', 'Family space', 'Add people', 'Upload', 'First story']
</script>
