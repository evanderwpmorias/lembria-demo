<template>
  <div class="space-y-6 max-w-2xl">
    <div class="flex items-center gap-3">
      <NuxtLink to="/app/account" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Sign-in providers</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Manage how you access your account</p>
      </div>
    </div>

    <!-- Connected providers -->
    <div class="rounded-3xl bg-surface-container divide-y divide-outline-variant overflow-hidden">
      <div v-for="provider in providers" :key="provider.id" class="flex items-center gap-4 px-5 py-4">
        <div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-on-surface-variant">{{ provider.icon }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-body-medium text-on-surface font-medium">{{ provider.label }}</p>
          <p class="text-label-small text-on-surface-variant">{{ provider.connected ? 'Connected' : 'Not connected' }}</p>
        </div>
        <button :class="[
          'px-4 py-2 rounded-full text-label-medium',
          provider.connected ? 'border border-outline text-on-surface' : 'bg-secondary-container text-on-secondary-container'
        ]">
          {{ provider.connected ? 'Disconnect' : 'Connect' }}
        </button>
      </div>
    </div>

    <!-- Password section -->
    <div class="rounded-3xl bg-surface-container p-6 space-y-4">
      <h2 class="text-title-small text-on-surface">Password</h2>
      <div class="space-y-3">
        <div class="space-y-1">
          <label class="text-label-medium text-on-surface-variant">Current password</label>
          <input type="password"
            class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary" />
        </div>
        <div class="space-y-1">
          <label class="text-label-medium text-on-surface-variant">New password</label>
          <input type="password"
            class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary" />
        </div>
      </div>
      <button class="px-5 py-2.5 rounded-full bg-primary text-on-primary text-label-medium font-medium">
        Update password
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Sign-in Providers — Lembria' })

const providers = ref([
  { id: 'password', icon: 'lock', label: 'Email & password', connected: true },
  { id: 'google', icon: 'account_circle', label: 'Google', connected: false },
  { id: 'apple', icon: 'phone_iphone', label: 'Apple', connected: false },
])
</script>
