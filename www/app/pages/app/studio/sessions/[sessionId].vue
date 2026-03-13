<template>
  <div class="flex flex-col h-full gap-0">
    <!-- Session header -->
    <div class="flex items-center gap-3 pb-4 border-b border-outline-variant">
      <NuxtLink to="/app/studio" class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div class="flex-1 min-w-0">
        <h1 class="text-title-medium text-on-surface truncate">Story session</h1>
        <p class="text-label-small text-on-surface-variant">Session #{{ sessionId }}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="p-2 rounded-full hover:bg-surface-container text-on-surface-variant" title="Session settings">
          <span class="material-symbols-outlined">more_vert</span>
        </button>
      </div>
    </div>

    <!-- Chat area -->
    <div class="flex-1 overflow-y-auto py-6 space-y-4 min-h-0">
      <!-- AI greeting bubble -->
      <div class="flex items-start gap-3 max-w-2xl">
        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-on-primary text-sm">psychology</span>
        </div>
        <div class="rounded-2xl rounded-tl-sm bg-surface-container px-4 py-3 text-body-medium text-on-surface">
          Hello! I'm here to help you capture your family's stories. What would you like to talk about today?
        </div>
      </div>
    </div>

    <!-- Input area -->
    <div class="pt-4 border-t border-outline-variant">
      <div class="flex items-end gap-3">
        <div class="flex-1 min-h-[48px] rounded-2xl bg-surface-container border border-outline-variant px-4 py-3">
          <textarea v-model="message" rows="1" placeholder="Type your response…"
            class="w-full bg-transparent text-on-surface placeholder:text-on-surface-variant/50 resize-none focus:outline-none text-body-medium"
            @keydown.enter.prevent="send" />
        </div>
        <button @click="send"
          :disabled="!message.trim()"
          class="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center disabled:bg-surface-container-high disabled:text-on-surface-variant transition-colors">
          <span class="material-symbols-outlined">send</span>
        </button>
        <button class="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center" title="Voice input">
          <span class="material-symbols-outlined">mic</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Session — Lembria' })

const route = useRoute()
const sessionId = computed(() => route.params.sessionId)
const message = ref('')

function send() {
  if (!message.value.trim()) return
  // TODO: send message to AI
  message.value = ''
}
</script>
