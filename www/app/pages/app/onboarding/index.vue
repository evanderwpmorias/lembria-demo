<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
    <!-- Step indicator -->
    <div class="flex items-center gap-2 mb-10">
      <div v-for="(step, i) in steps" :key="i" class="flex items-center gap-2">
        <div :class="[
          'w-8 h-8 rounded-full flex items-center justify-center text-label-small font-medium transition-colors',
          i === 0 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
        ]">
          <span v-if="i < 0" class="material-symbols-outlined text-sm">check</span>
          <span v-else>{{ i + 1 }}</span>
        </div>
        <span v-if="i < steps.length - 1" class="w-8 h-0.5 bg-outline-variant" />
      </div>
    </div>

    <span class="material-symbols-outlined text-6xl text-primary mb-4">celebration</span>
    <h1 class="text-3xl font-semibold text-on-surface mb-3">Welcome to Lembria</h1>
    <p class="text-on-surface-variant max-w-md mb-8">
      Your family's story starts here. Let's set up your space in just a few steps — it only takes a couple of minutes.
    </p>

    <NuxtLink to="/app/onboarding/family-space"
      class="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-on-primary text-label-large font-medium">
      Get started
      <span class="material-symbols-outlined text-base">arrow_forward</span>
    </NuxtLink>

    <NuxtLink to="/app/home" class="mt-4 text-sm text-on-surface-variant hover:text-on-surface underline">
      Skip for now
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Welcome — Lembria' })

const steps = ['Welcome', 'Family space', 'Add people', 'Upload', 'First story']
</script>
