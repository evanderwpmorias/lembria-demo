<template>
  <div class="space-y-6 max-w-2xl">
    <div class="flex items-center gap-3">
      <NuxtLink to="/app/help" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Storytelling guide</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Tips to capture your best stories</p>
      </div>
    </div>

    <div v-for="section in sections" :key="section.title" class="rounded-3xl bg-surface-container p-6 space-y-3">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary">{{ section.icon }}</span>
        <h2 class="text-title-small text-on-surface">{{ section.title }}</h2>
      </div>
      <p class="text-body-medium text-on-surface-variant leading-relaxed">{{ section.body }}</p>
    </div>

    <div class="rounded-3xl bg-secondary-container p-6 text-center space-y-4">
      <span class="material-symbols-outlined text-4xl text-secondary block">auto_stories</span>
      <h2 class="text-title-medium text-on-secondary-container">Ready to start?</h2>
      <NuxtLink to="/app/studio"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary text-label-large font-medium">
        Open Story Studio
        <span class="material-symbols-outlined text-base">arrow_forward</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Storytelling Guide — Lembria' })

const sections = [
  {
    icon: 'mic',
    title: 'Start with what you know',
    body: "Begin with a specific memory — a place, a person, or a feeling. The AI will gently guide you from there. You don't need to prepare anything; just speak naturally."
  },
  {
    icon: 'photo_library',
    title: 'Use photos as prompts',
    body: "Upload a photo before starting a session. Seeing an image often unlocks memories you didn't know you had. Lembria can weave these into the narrative automatically."
  },
  {
    icon: 'schedule',
    title: 'Short sessions work best',
    body: '15–30 minute sessions tend to produce the richest stories. You can always continue later — your session is saved automatically and you can pick up exactly where you left off.'
  },
  {
    icon: 'group',
    title: 'Invite family to collaborate',
    body: 'The best stories come from multiple perspectives. Invite family members to add their own memories to the same events, then see how the story grows together.'
  },
]
</script>
