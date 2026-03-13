<template>
  <div class="space-y-6 max-w-2xl">
    <div class="flex items-center gap-3">
      <NuxtLink to="/app/family" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-semibold text-on-surface">Invitations</h1>
        <p class="text-sm text-on-surface-variant mt-0.5">Invite people to your family space</p>
      </div>
    </div>

    <!-- Invite form -->
    <div class="rounded-3xl bg-surface-container p-6 space-y-4">
      <h2 class="text-title-small text-on-surface">Send an invitation</h2>
      <div class="space-y-1">
        <label class="text-label-medium text-on-surface-variant">Email address</label>
        <div class="flex gap-2">
          <input v-model="email" type="email" placeholder="family@example.com"
            class="flex-1 px-4 py-3 rounded-2xl bg-surface border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary" />
          <button @click="sendInvite"
            class="px-5 py-3 rounded-2xl bg-primary text-on-primary text-label-medium font-medium">
            Send
          </button>
        </div>
      </div>
      <p class="text-label-small text-on-surface-variant">
        They'll receive a link to join your family's story space.
      </p>
    </div>

    <!-- Pending invitations -->
    <section>
      <h2 class="text-title-small text-on-surface mb-3">Pending</h2>
      <div v-if="pending.length" class="rounded-3xl bg-surface-container divide-y divide-outline-variant overflow-hidden">
        <div v-for="inv in pending" :key="inv.email" class="flex items-center gap-4 px-5 py-4">
          <span class="material-symbols-outlined text-on-surface-variant">mail</span>
          <div class="flex-1 min-w-0">
            <p class="text-body-medium text-on-surface truncate">{{ inv.email }}</p>
            <p class="text-label-small text-on-surface-variant">Sent {{ inv.sent }}</p>
          </div>
          <button class="text-label-small text-error hover:underline">Revoke</button>
        </div>
      </div>
      <div v-else class="rounded-3xl bg-surface-container p-6 text-center text-on-surface-variant text-body-medium">
        No pending invitations
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Invitations — Lembria' })

const email = ref('')
const pending = ref([
  { email: 'uncle@example.com', sent: '2 days ago' },
])

function sendInvite() {
  if (!email.value.trim()) return
  // TODO: send invite via API
  pending.value.push({ email: email.value.trim(), sent: 'just now' })
  email.value = ''
}
</script>
