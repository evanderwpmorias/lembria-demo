<template>
  <div class="space-y-6 max-w-2xl">
    <div class="flex items-center gap-3">
      <NuxtLink to="/app/help" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Contact support</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">We're here to help</p>
      </div>
    </div>

    <!-- Contact options -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div v-for="option in options" :key="option.label"
        class="flex items-start gap-3 p-5 rounded-3xl bg-surface-container">
        <div class="w-10 h-10 rounded-2xl bg-secondary-container flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-secondary">{{ option.icon }}</span>
        </div>
        <div>
          <p class="text-label-large text-on-surface font-medium">{{ option.label }}</p>
          <p class="text-label-small text-on-surface-variant mt-1">{{ option.description }}</p>
        </div>
      </div>
    </div>

    <!-- Message form -->
    <div class="rounded-3xl bg-surface-container p-6 space-y-4">
      <h2 class="text-title-small text-on-surface">Send us a message</h2>
      <div class="space-y-1">
        <label class="text-label-medium text-on-surface-variant">Subject</label>
        <select v-model="subject"
          class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary">
          <option value="">Select a topic…</option>
          <option value="technical">Technical issue</option>
          <option value="account">Account question</option>
          <option value="billing">Billing</option>
          <option value="feedback">Feedback or suggestion</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="space-y-1">
        <label class="text-label-medium text-on-surface-variant">Message</label>
        <textarea v-model="messageBody" rows="5" placeholder="Describe your issue or question…"
          class="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary resize-none" />
      </div>
      <button :disabled="!subject || !messageBody.trim()"
        class="px-5 py-2.5 rounded-full bg-primary text-on-primary text-label-medium font-medium disabled:bg-surface-container-high disabled:text-on-surface-variant transition-colors">
        Send message
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Contact Support — Lembria' })

const subject = ref('')
const messageBody = ref('')

const options = [
  { icon: 'schedule', label: 'Response time', description: 'We typically reply within 1 business day' },
  { icon: 'mail', label: 'Email', description: 'support@lembria.com' },
]
</script>
