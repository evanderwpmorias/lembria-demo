<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center px-4">
    <!-- Step indicator -->
    <div class="flex items-center gap-2 mb-10">
      <div v-for="(step, i) in steps" :key="i" class="flex items-center gap-2">
        <div :class="[
          'w-8 h-8 rounded-full flex items-center justify-center text-label-small font-medium',
          i <= 2 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
        ]">{{ i + 1 }}</div>
        <span v-if="i < steps.length - 1" class="w-8 h-0.5 bg-outline-variant" />
      </div>
    </div>

    <div class="w-full max-w-md space-y-6">
      <div class="text-center mb-4">
        <span class="material-symbols-outlined text-5xl text-primary mb-2 block">photo_library</span>
        <h1 class="text-2xl font-semibold text-on-surface">Add your first memories</h1>
        <p class="text-sm text-on-surface-variant mt-1">Photos, voice notes, videos — anything that tells your story.</p>
      </div>

      <!-- Upload zone -->
      <div class="border-2 border-dashed border-outline rounded-3xl p-10 flex flex-col items-center gap-3 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
        <span class="material-symbols-outlined text-4xl text-on-surface-variant">cloud_upload</span>
        <p class="text-body-medium text-on-surface-variant">Drag files here or click to browse</p>
        <p class="text-label-small text-on-surface-variant/60">Photos, videos, audio — up to 50 MB each</p>
        <button class="mt-2 px-5 py-2 rounded-full bg-secondary-container text-on-secondary-container text-label-medium">
          Browse files
        </button>
      </div>

      <div class="flex gap-3 pt-2">
        <NuxtLink to="/app/onboarding/people"
          class="flex-1 text-center px-5 py-3 rounded-full border border-outline text-on-surface text-label-large">
          Back
        </NuxtLink>
        <NuxtLink to="/app/onboarding/first-story"
          class="flex-1 text-center px-5 py-3 rounded-full bg-primary text-on-primary text-label-large font-medium">
          Skip
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Upload Memories — Lembria' })

const steps = ['Welcome', 'Family space', 'Add people', 'Upload', 'First story']
</script>
