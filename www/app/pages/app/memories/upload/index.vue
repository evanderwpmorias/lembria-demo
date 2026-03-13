<template>
  <div class="space-y-6 max-w-2xl">
    <div class="flex items-center gap-3">
      <NuxtLink to="/app/memories" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Upload memories</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Add photos, videos, or audio to your collection</p>
      </div>
    </div>

    <!-- Drop zone -->
    <div class="border-2 border-dashed border-outline rounded-3xl p-12 flex flex-col items-center gap-4 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
      <span class="material-symbols-outlined text-5xl text-on-surface-variant">cloud_upload</span>
      <div>
        <p class="text-body-large text-on-surface font-medium">Drop files here</p>
        <p class="text-body-medium text-on-surface-variant mt-1">or click to browse from your device</p>
      </div>
      <button class="px-6 py-2.5 rounded-full bg-secondary-container text-on-secondary-container text-label-medium">
        Browse files
      </button>
      <p class="text-label-small text-on-surface-variant/60">Supported: JPG, PNG, MP4, MOV, MP3, M4A — Max 50 MB each</p>
    </div>

    <!-- Add details -->
    <div class="space-y-4 rounded-3xl bg-surface-container p-6">
      <h2 class="text-title-small text-on-surface">Add details</h2>
      <div class="space-y-1">
        <label class="text-label-medium text-on-surface-variant">Caption <span class="text-on-surface-variant/50">(optional)</span></label>
        <input type="text" placeholder="What's this memory about?"
          class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary" />
      </div>
      <div class="space-y-1">
        <label class="text-label-medium text-on-surface-variant">Date <span class="text-on-surface-variant/50">(optional)</span></label>
        <input type="date"
          class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary" />
      </div>
    </div>

    <div class="flex gap-3">
      <NuxtLink to="/app/memories"
        class="flex-1 text-center px-5 py-3 rounded-full border border-outline text-on-surface text-label-large">
        Cancel
      </NuxtLink>
      <button class="flex-1 px-5 py-3 rounded-full bg-primary text-on-primary text-label-large font-medium">
        Upload
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Upload Memories — Lembria' })
</script>
