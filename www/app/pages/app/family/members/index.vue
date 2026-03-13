<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <NuxtLink to="/app/family" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
          <span class="material-symbols-outlined">arrow_back</span>
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-semibold text-on-surface">Members</h1>
          <p class="text-sm text-on-surface-variant mt-0.5">Who's in your family space</p>
        </div>
      </div>
      <NuxtLink to="/app/family/invitations"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary text-label-medium font-medium">
        <span class="material-symbols-outlined text-base">person_add</span>
        Invite
      </NuxtLink>
    </div>

    <!-- Member list -->
    <div class="rounded-3xl bg-surface-container divide-y divide-outline-variant overflow-hidden">
      <div v-for="member in members" :key="member.name" class="flex items-center gap-4 px-5 py-4">
        <div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-secondary">person</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-body-medium text-on-surface font-medium">{{ member.name }}</p>
          <p class="text-label-small text-on-surface-variant">{{ member.role }}</p>
        </div>
        <span :class="[
          'px-3 py-1 rounded-full text-label-small',
          member.status === 'Active' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-surface-container-high text-on-surface-variant'
        ]">{{ member.status }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Family Members — Lembria' })

const members = [
  { name: 'You', role: 'Admin', status: 'Active' },
  { name: 'Jane Smith', role: 'Member', status: 'Active' },
  { name: 'Robert Smith', role: 'Member', status: 'Active' },
  { name: 'Maria Garcia', role: 'Member', status: 'Pending' },
]
</script>
