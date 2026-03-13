<template>
  <div class="space-y-6 max-w-2xl">
    <div class="flex items-center gap-3">
      <span class="material-symbols-outlined text-on-surface-variant">account_circle</span>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Profile</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Your personal information</p>
      </div>
    </div>

    <!-- Avatar + name -->
    <div class="rounded-3xl bg-surface-container p-6 flex items-center gap-5">
      <div class="w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center shrink-0 relative">
        <span class="material-symbols-outlined text-4xl text-secondary">person</span>
        <button class="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center">
          <span class="material-symbols-outlined text-xs">edit</span>
        </button>
      </div>
      <div>
        <h2 class="text-title-medium text-on-surface">Your Name</h2>
        <p class="text-body-medium text-on-surface-variant">your@email.com</p>
      </div>
    </div>

    <!-- Profile fields -->
    <div class="rounded-3xl bg-surface-container p-6 space-y-4">
      <h2 class="text-title-small text-on-surface">Personal details</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="space-y-1">
          <label class="text-label-medium text-on-surface-variant">First name</label>
          <input v-model="firstName" type="text"
            class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary" />
        </div>
        <div class="space-y-1">
          <label class="text-label-medium text-on-surface-variant">Last name</label>
          <input v-model="lastName" type="text"
            class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary" />
        </div>
      </div>
      <div class="space-y-1">
        <label class="text-label-medium text-on-surface-variant">Display name</label>
        <input v-model="displayName" type="text"
          class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary" />
      </div>
      <div class="space-y-1">
        <label class="text-label-medium text-on-surface-variant">Bio <span class="text-on-surface-variant/50">(optional)</span></label>
        <textarea v-model="bio" rows="3"
          class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary resize-none" />
      </div>
      <button class="px-5 py-2.5 rounded-full bg-primary text-on-primary text-label-medium font-medium">
        Save changes
      </button>
    </div>

    <!-- Quick links -->
    <div class="grid grid-cols-2 gap-3">
      <NuxtLink v-for="link in links" :key="link.label" :to="link.to"
        class="flex items-center gap-3 p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors">
        <span class="material-symbols-outlined text-on-surface-variant">{{ link.icon }}</span>
        <span class="text-label-medium text-on-surface">{{ link.label }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Profile — Lembria' })

const firstName = ref('')
const lastName = ref('')
const displayName = ref('')
const bio = ref('')

const links = [
  { icon: 'tune', label: 'Preferences', to: '/app/profile/preferences' },
  { icon: 'notifications', label: 'Notifications', to: '/app/profile/notifications' },
  { icon: 'manage_accounts', label: 'Account', to: '/app/account' },
  { icon: 'security', label: 'Providers', to: '/app/account/providers' },
]
</script>
