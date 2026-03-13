<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-on-surface-variant">photo_library</span>
        <div>
          <h1 class="text-2xl font-semibold text-on-surface">Memories</h1>
          <p class="text-sm text-on-surface-variant mt-0.5">Your family's collection of moments</p>
        </div>
      </div>
      <NuxtLink to="/app/memories/upload"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary text-label-medium font-medium">
        <span class="material-symbols-outlined text-base">upload</span>
        Upload
      </NuxtLink>
    </div>

    <!-- Filter bar -->
    <div class="flex items-center gap-2 overflow-x-auto pb-1">
      <button v-for="filter in filters" :key="filter"
        :class="[
          'px-4 py-2 rounded-full text-label-medium whitespace-nowrap transition-colors shrink-0',
          activeFilter === filter ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
        ]"
        @click="activeFilter = filter">
        {{ filter }}
      </button>
    </div>

    <!-- Memories grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      <NuxtLink v-for="i in 12" :key="i" :to="`/app/memories/${i}`"
        class="group relative rounded-2xl overflow-hidden bg-surface-container aspect-square">
        <div class="w-full h-full bg-surface-container-high flex items-center justify-center">
          <span class="material-symbols-outlined text-4xl text-on-surface-variant/30">image</span>
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
          <p class="text-white text-label-small">Memory {{ i }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Memories — Lembria' })

const filters = ['All', 'Photos', 'Videos', 'Audio', 'Documents']
const activeFilter = ref('All')
</script>
