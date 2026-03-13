<template>
  <div class="space-y-6 max-w-2xl">
    <div class="flex items-center gap-3">
      <NuxtLink to="/app/profile" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Preferences</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Customise your experience</p>
      </div>
    </div>

    <!-- Language & region -->
    <div class="rounded-3xl bg-surface-container p-6 space-y-4">
      <h2 class="text-title-small text-on-surface">Language & region</h2>
      <div class="space-y-1">
        <label class="text-label-medium text-on-surface-variant">Language</label>
        <select v-model="language"
          class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="pt">Português</option>
          <option value="fr">Français</option>
        </select>
      </div>
    </div>

    <!-- Appearance -->
    <div class="rounded-3xl bg-surface-container p-6 space-y-4">
      <h2 class="text-title-small text-on-surface">Appearance</h2>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-body-medium text-on-surface">Dark mode</p>
          <p class="text-label-small text-on-surface-variant">Follow system setting</p>
        </div>
        <div class="w-12 h-7 rounded-full bg-surface-container-high cursor-pointer relative">
          <div class="w-5 h-5 rounded-full bg-on-surface-variant absolute left-1 top-1" />
        </div>
      </div>
    </div>

    <!-- AI storytelling -->
    <div class="rounded-3xl bg-surface-container p-6 space-y-4">
      <h2 class="text-title-small text-on-surface">Storytelling</h2>
      <div class="space-y-1">
        <label class="text-label-medium text-on-surface-variant">Preferred session length</label>
        <select v-model="sessionLength"
          class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary">
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
        </select>
      </div>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-body-medium text-on-surface">Auto-save sessions</p>
          <p class="text-label-small text-on-surface-variant">Save progress automatically</p>
        </div>
        <div class="w-12 h-7 rounded-full bg-primary cursor-pointer relative">
          <div class="w-5 h-5 rounded-full bg-on-primary absolute right-1 top-1" />
        </div>
      </div>
    </div>

    <button class="px-5 py-2.5 rounded-full bg-primary text-on-primary text-label-medium font-medium">
      Save preferences
    </button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Preferences — Lembria' })

const language = ref('en')
const sessionLength = ref('30')
</script>
