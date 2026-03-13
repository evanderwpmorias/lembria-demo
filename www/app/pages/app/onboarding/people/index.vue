<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center px-4">
    <!-- Step indicator -->
    <div class="flex items-center gap-2 mb-10">
      <div v-for="(step, i) in steps" :key="i" class="flex items-center gap-2">
        <div :class="[
          'w-8 h-8 rounded-full flex items-center justify-center text-label-small font-medium',
          i <= 1 ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
        ]">{{ i + 1 }}</div>
        <span v-if="i < steps.length - 1" class="w-8 h-0.5 bg-outline-variant" />
      </div>
    </div>

    <div class="w-full max-w-md space-y-6">
      <div class="text-center mb-4">
        <span class="material-symbols-outlined text-5xl text-primary mb-2 block">group_add</span>
        <h1 class="text-2xl font-semibold text-on-surface">Add family members</h1>
        <p class="text-sm text-on-surface-variant mt-1">Who are the people in your family story?</p>
      </div>

      <!-- Added people list -->
      <div v-if="people.length" class="space-y-2">
        <div v-for="(person, i) in people" :key="i"
          class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-container">
          <span class="material-symbols-outlined text-on-surface-variant">person</span>
          <span class="flex-1 text-on-surface text-body-medium">{{ person.name }}</span>
          <button @click="people.splice(i, 1)" class="text-on-surface-variant hover:text-error">
            <span class="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      </div>

      <!-- Add person form -->
      <div class="flex gap-2">
        <input v-model="newPersonName" type="text" placeholder="Full name"
          @keyup.enter="addPerson"
          class="flex-1 px-4 py-3 rounded-2xl bg-surface-container border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary" />
        <button @click="addPerson"
          class="px-4 py-3 rounded-2xl bg-secondary-container text-on-secondary-container">
          <span class="material-symbols-outlined">add</span>
        </button>
      </div>

      <div class="flex gap-3 pt-2">
        <NuxtLink to="/app/onboarding/family-space"
          class="flex-1 text-center px-5 py-3 rounded-full border border-outline text-on-surface text-label-large">
          Back
        </NuxtLink>
        <NuxtLink to="/app/onboarding/upload"
          class="flex-1 text-center px-5 py-3 rounded-full bg-primary text-on-primary text-label-large font-medium">
          {{ people.length ? 'Continue' : 'Skip' }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'app' })
useHead({ title: 'Add People — Lembria' })

const steps = ['Welcome', 'Family space', 'Add people', 'Upload', 'First story']
const people = ref<{ name: string }[]>([])
const newPersonName = ref('')

function addPerson() {
  if (newPersonName.value.trim()) {
    people.value.push({ name: newPersonName.value.trim() })
    newPersonName.value = ''
  }
}
</script>
