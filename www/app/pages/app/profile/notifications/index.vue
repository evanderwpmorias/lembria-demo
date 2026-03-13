<template>
  <div class="space-y-6 max-w-2xl">
    <div class="flex items-center gap-3">
      <NuxtLink to="/app/profile" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Notifications</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Choose what you hear about</p>
      </div>
    </div>

    <div v-for="group in groups" :key="group.title" class="rounded-3xl bg-surface-container p-6 space-y-4">
      <h2 class="text-title-small text-on-surface">{{ group.title }}</h2>
      <div v-for="item in group.items" :key="item.label"
        class="flex items-center justify-between py-1">
        <div>
          <p class="text-body-medium text-on-surface">{{ item.label }}</p>
          <p class="text-label-small text-on-surface-variant">{{ item.description }}</p>
        </div>
        <div :class="[
          'w-12 h-7 rounded-full cursor-pointer relative transition-colors',
          item.enabled ? 'bg-primary' : 'bg-surface-container-high'
        ]" @click="item.enabled = !item.enabled">
          <div :class="[
            'w-5 h-5 rounded-full absolute top-1 transition-all',
            item.enabled ? 'bg-on-primary right-1' : 'bg-on-surface-variant left-1'
          ]" />
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
useHead({ title: 'Notifications — Lembria' })

const groups = ref([
  {
    title: 'Family activity',
    items: [
      { label: 'New stories shared', description: 'When a family member adds a story', enabled: true },
      { label: 'New memories uploaded', description: 'Photos and videos added by family', enabled: true },
      { label: 'New members joined', description: 'When someone accepts an invitation', enabled: true },
    ]
  },
  {
    title: 'Reminders',
    items: [
      { label: 'Weekly storytelling prompt', description: 'Get inspired every week', enabled: false },
      { label: 'Session reminders', description: 'Remind me to continue saved sessions', enabled: true },
    ]
  },
  {
    title: 'Account',
    items: [
      { label: 'Security alerts', description: 'Sign-in from new device', enabled: true },
      { label: 'Product updates', description: 'New features and improvements', enabled: false },
    ]
  }
])
</script>
