<template>
  <div class="space-y-6 max-w-2xl">
    <div class="flex items-center gap-3">
      <NuxtLink to="/app/family" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Family settings</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Manage your shared space</p>
      </div>
    </div>

    <!-- Family details -->
    <div class="rounded-3xl bg-surface-container p-6 space-y-4">
      <h2 class="text-title-small text-on-surface">Details</h2>
      <div class="space-y-1">
        <label class="text-label-medium text-on-surface-variant">Family name</label>
        <input v-model="familyName" type="text"
          class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary" />
      </div>
      <div class="space-y-1">
        <label class="text-label-medium text-on-surface-variant">Description</label>
        <textarea v-model="familyBio" rows="3"
          class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary resize-none" />
      </div>
      <button class="px-5 py-2.5 rounded-full bg-primary text-on-primary text-label-medium font-medium">
        Save changes
      </button>
    </div>

    <!-- Privacy -->
    <div class="rounded-3xl bg-surface-container p-6 space-y-4">
      <h2 class="text-title-small text-on-surface">Privacy</h2>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-body-medium text-on-surface">Private family space</p>
          <p class="text-label-small text-on-surface-variant">Only invited members can view stories</p>
        </div>
        <div class="w-12 h-7 rounded-full bg-primary cursor-pointer relative">
          <div class="w-5 h-5 rounded-full bg-on-primary absolute right-1 top-1" />
        </div>
      </div>
    </div>

    <!-- Danger zone -->
    <div class="rounded-3xl border border-error/30 p-5 space-y-3">
      <h3 class="text-label-large text-error">Danger zone</h3>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-body-medium text-on-surface">Delete family space</p>
          <p class="text-label-small text-on-surface-variant">All stories and memories will be permanently deleted.</p>
        </div>
        <button class="px-4 py-2 rounded-full border border-error text-error text-label-medium">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Family Settings — Lembria' })

const familyName = ref('The Family')
const familyBio = ref('')
</script>
