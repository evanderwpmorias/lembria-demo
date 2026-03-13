<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center px-4">
    <!-- Step indicator -->
    <div class="flex items-center gap-2 mb-10">
      <div v-for="(step, i) in steps" :key="i" class="flex items-center gap-2">
        <div :class="[
          'w-8 h-8 rounded-full flex items-center justify-center text-label-small font-medium transition-colors',
          i === 0 ? 'bg-primary text-on-primary' : i < 1 ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-high text-on-surface-variant'
        ]">{{ i + 1 }}</div>
        <span v-if="i < steps.length - 1" class="w-8 h-0.5 bg-outline-variant" />
      </div>
    </div>

    <div class="w-full max-w-md space-y-6">
      <div class="text-center mb-6">
        <span class="material-symbols-outlined text-5xl text-primary mb-2 block">cottage</span>
        <h1 class="text-2xl font-semibold text-on-surface">Create your family space</h1>
        <p class="text-sm text-on-surface-variant mt-1">Give your family's story a home.</p>
      </div>

      <div class="space-y-4">
        <div class="space-y-1">
          <label class="text-label-medium text-on-surface-variant">Family name</label>
          <input v-model="familyName" type="text" placeholder="e.g. The Johnsons"
            class="w-full px-4 py-3 rounded-2xl bg-surface-container border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary" />
        </div>
        <div class="space-y-1">
          <label class="text-label-medium text-on-surface-variant">About your family <span class="text-on-surface-variant/50">(optional)</span></label>
          <textarea v-model="familyBio" rows="3" placeholder="A short description…"
            class="w-full px-4 py-3 rounded-2xl bg-surface-container border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary resize-none" />
        </div>
      </div>

      <div class="flex gap-3 pt-2">
        <NuxtLink to="/app/onboarding"
          class="flex-1 text-center px-5 py-3 rounded-full border border-outline text-on-surface text-label-large">
          Back
        </NuxtLink>
        <NuxtLink to="/app/onboarding/people"
          class="flex-1 text-center px-5 py-3 rounded-full bg-primary text-on-primary text-label-large font-medium">
          Continue
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Family Space — Lembria' })

const familyName = ref('')
const familyBio = ref('')
const steps = ['Welcome', 'Family space', 'Add people', 'Upload', 'First story']
</script>
