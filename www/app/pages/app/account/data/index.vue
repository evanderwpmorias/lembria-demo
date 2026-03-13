<template>
  <div class="space-y-6 max-w-2xl">
    <div class="flex items-center gap-3">
      <NuxtLink to="/app/account" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Your data</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Export or delete your Lembria data</p>
      </div>
    </div>

    <!-- Export -->
    <div class="rounded-3xl bg-surface-container p-6 space-y-3">
      <div class="flex items-start gap-3">
        <span class="material-symbols-outlined text-secondary mt-0.5">download</span>
        <div>
          <h2 class="text-title-small text-on-surface">Export your data</h2>
          <p class="text-body-medium text-on-surface-variant mt-1">
            Download a copy of all your stories, memories, and account information in a portable format.
          </p>
        </div>
      </div>
      <div class="flex gap-3 pt-1">
        <button class="px-5 py-2.5 rounded-full bg-secondary-container text-on-secondary-container text-label-medium font-medium inline-flex items-center gap-2">
          <span class="material-symbols-outlined text-base">download</span>
          Request export
        </button>
      </div>
    </div>

    <!-- What we store -->
    <div class="rounded-3xl bg-surface-container p-6 space-y-3">
      <h2 class="text-title-small text-on-surface">What we store</h2>
      <ul class="space-y-2">
        <li v-for="item in dataItems" :key="item"
          class="flex items-center gap-2 text-body-medium text-on-surface-variant">
          <span class="material-symbols-outlined text-sm text-primary">check_circle</span>
          {{ item }}
        </li>
      </ul>
    </div>

    <!-- Delete account -->
    <div class="rounded-3xl border border-error/30 p-6 space-y-3">
      <div class="flex items-start gap-3">
        <span class="material-symbols-outlined text-error mt-0.5">delete_forever</span>
        <div>
          <h2 class="text-title-small text-error">Delete account</h2>
          <p class="text-body-medium text-on-surface-variant mt-1">
            Permanently delete your account and all associated data. This cannot be undone.
          </p>
        </div>
      </div>
      <button class="px-5 py-2.5 rounded-full border border-error text-error text-label-medium font-medium">
        Delete my account
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Your Data — Lembria' })

const dataItems = [
  'Profile information and preferences',
  'Stories and session transcripts',
  'Uploaded photos, videos, and audio',
  'Family space and membership data',
]
</script>
