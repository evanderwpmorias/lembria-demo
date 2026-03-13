<template>
  <div class="space-y-6 max-w-2xl">
    <div class="flex items-center gap-3">
      <span class="material-symbols-outlined text-on-surface-variant">manage_accounts</span>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Account</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Security and account management</p>
      </div>
    </div>

    <!-- Account overview -->
    <div class="rounded-3xl bg-surface-container p-6 flex items-center gap-4">
      <div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
        <span class="material-symbols-outlined text-secondary">person</span>
      </div>
      <div class="flex-1">
        <p class="text-body-large text-on-surface font-medium">your@email.com</p>
        <p class="text-label-small text-on-surface-variant">Member since 2024</p>
      </div>
    </div>

    <!-- Quick links -->
    <div class="rounded-3xl bg-surface-container divide-y divide-outline-variant overflow-hidden">
      <NuxtLink v-for="link in links" :key="link.label" :to="link.to"
        class="flex items-center gap-4 px-5 py-4 hover:bg-surface-container-high transition-colors">
        <span class="material-symbols-outlined text-on-surface-variant">{{ link.icon }}</span>
        <div class="flex-1">
          <p class="text-body-medium text-on-surface">{{ link.label }}</p>
          <p class="text-label-small text-on-surface-variant">{{ link.description }}</p>
        </div>
        <span class="material-symbols-outlined text-on-surface-variant">chevron_right</span>
      </NuxtLink>
    </div>

    <!-- Sign out -->
    <div class="rounded-3xl bg-surface-container p-5 flex items-center justify-between">
      <div>
        <p class="text-body-medium text-on-surface">Sign out</p>
        <p class="text-label-small text-on-surface-variant">Sign out of your account on this device</p>
      </div>
      <NuxtLink to="/sign-out" class="px-4 py-2 rounded-full border border-outline text-on-surface text-label-medium">
        Sign out
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Account — Lembria' })

const links = [
  { icon: 'security', label: 'Sign-in providers', description: 'Manage how you sign in', to: '/app/account/providers' },
  { icon: 'download', label: 'Your data', description: 'Export or delete your data', to: '/app/account/data' },
]
</script>
