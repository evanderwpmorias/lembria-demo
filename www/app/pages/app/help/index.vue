<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <span class="material-symbols-outlined text-on-surface-variant">help</span>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Help & support</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Find answers or get in touch</p>
      </div>
    </div>

    <!-- Search -->
    <div class="relative">
      <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
      <input type="search" placeholder="Search help articles…"
        class="w-full pl-12 pr-4 py-3 rounded-2xl bg-surface-container border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary" />
    </div>

    <!-- Help categories -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <NuxtLink v-for="cat in categories" :key="cat.label" :to="cat.to"
        class="flex items-center gap-4 p-5 rounded-3xl bg-surface-container hover:bg-surface-container-high transition-colors">
        <div class="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-secondary">{{ cat.icon }}</span>
        </div>
        <div>
          <p class="text-label-large text-on-surface font-medium">{{ cat.label }}</p>
          <p class="text-label-small text-on-surface-variant">{{ cat.description }}</p>
        </div>
      </NuxtLink>
    </div>

    <!-- Popular articles -->
    <section>
      <h2 class="text-title-small text-on-surface mb-3">Popular articles</h2>
      <div class="rounded-3xl bg-surface-container divide-y divide-outline-variant overflow-hidden">
        <button v-for="article in articles" :key="article"
          class="w-full flex items-center gap-4 px-5 py-4 hover:bg-surface-container-high transition-colors text-left">
          <span class="material-symbols-outlined text-on-surface-variant text-sm">article</span>
          <span class="flex-1 text-body-medium text-on-surface">{{ article }}</span>
          <span class="material-symbols-outlined text-on-surface-variant">chevron_right</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Help — Lembria' })

const categories = [
  { icon: 'auto_stories', label: 'Storytelling guide', description: 'Get the most from your sessions', to: '/app/help/storytelling' },
  { icon: 'chat', label: 'Contact us', description: 'Reach our support team', to: '/app/help/contact' },
]

const articles = [
  'How do I start my first story session?',
  'Can I add photos to a story?',
  'How do I invite family members?',
  'Is my data private and secure?',
  'How do I export my stories?',
]
</script>
