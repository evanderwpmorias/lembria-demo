<script setup lang="ts">
import { ref, computed } from 'vue'
import { mdTextField, mdTextFieldInput, mdTextFieldLabel, errorMsg } from '~/theme/md-theme'

interface FormInput {
  label: string
  schemaProperty: string
  defaultValue?: string
  placeholder?: string
  component: {
    type: string
    label: string
  }
  supportingText?: string
  icon?: string
  inputs?: FormInput[]
  isVisible?: boolean
}

const props = defineProps<{
  formSchema: {
    inputs: FormInput[]
    name: string
  }
  modelValue: Record<string, any>
  errors?: Record<string, string>
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>]
  'submit': []
}>()

const updateField = (property: string, value: any) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [property]: value,
  })
}

const handleSubmit = () => {
  emit('submit')
}

const renderInput = (input: FormInput) => {
  if (!input.isVisible && input.isVisible !== undefined) return null

  switch (input.component.type) {
    case 'input':
      return 'text'
    case 'textarea':
      return 'textarea'
    case 'checkbox':
      return 'checkbox'
    case 'select':
      return 'select'
    case 'date':
      return 'date'
    case 'number':
      return 'number'
    default:
      return 'text'
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div
      v-for="input in formSchema.inputs"
      :key="input.schemaProperty"
      v-show="input.isVisible !== false"
    >
      <!-- Text Input -->
      <div
        v-if="input.component.type === 'input'"
        :class="mdTextField"
        class="mb-6"
      >
        <input
          :id="input.schemaProperty"
          :value="modelValue[input.schemaProperty]"
          @input="updateField(input.schemaProperty, ($event.target as HTMLInputElement).value)"
          :placeholder="input.placeholder || input.label"
          :class="mdTextFieldInput"
          type="text"
        />
        <label :for="input.schemaProperty" :class="mdTextFieldLabel">
          {{ input.label }}
        </label>
        <p
          v-if="input.supportingText"
          class="text-xs mt-1 text-light-on-surface-variant dark:text-dark-on-surface-variant"
        >
          {{ input.supportingText }}
        </p>
        <p v-if="errors?.[input.schemaProperty]" :class="errorMsg" class="text-xs mt-1">
          {{ errors[input.schemaProperty] }}
        </p>
      </div>

      <!-- Textarea -->
      <div v-else-if="input.component.type === 'textarea'" class="mb-6">
        <label
          :for="input.schemaProperty"
          class="block text-sm font-medium mb-2"
        >
          {{ input.label }}
        </label>
        <textarea
          :id="input.schemaProperty"
          :value="modelValue[input.schemaProperty]"
          @input="updateField(input.schemaProperty, ($event.target as HTMLTextAreaElement).value)"
          :placeholder="input.placeholder || input.label"
          rows="4"
          class="w-full px-4 py-2 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-outline dark:border-dark-outline focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
        ></textarea>
        <p
          v-if="input.supportingText"
          class="text-xs mt-1 text-light-on-surface-variant dark:text-dark-on-surface-variant"
        >
          {{ input.supportingText }}
        </p>
        <p v-if="errors?.[input.schemaProperty]" :class="errorMsg" class="text-xs mt-1">
          {{ errors[input.schemaProperty] }}
        </p>
      </div>

      <!-- Checkbox -->
      <div v-else-if="input.component.type === 'checkbox'" class="mb-6">
        <div class="flex items-center gap-3">
          <input
            :id="input.schemaProperty"
            :checked="modelValue[input.schemaProperty]"
            @change="updateField(input.schemaProperty, ($event.target as HTMLInputElement).checked)"
            type="checkbox"
            class="w-5 h-5"
          />
          <label :for="input.schemaProperty" class="text-sm font-medium cursor-pointer">
            {{ input.label }}
          </label>
        </div>
        <p
          v-if="input.supportingText"
          class="text-xs mt-1 ml-8 text-light-on-surface-variant dark:text-dark-on-surface-variant"
        >
          {{ input.supportingText }}
        </p>
        <p v-if="errors?.[input.schemaProperty]" :class="errorMsg" class="text-xs mt-1 ml-8">
          {{ errors[input.schemaProperty] }}
        </p>
      </div>

      <!-- Number Input -->
      <div
        v-else-if="input.component.type === 'number'"
        :class="mdTextField"
        class="mb-6"
      >
        <input
          :id="input.schemaProperty"
          :value="modelValue[input.schemaProperty]"
          @input="updateField(input.schemaProperty, ($event.target as HTMLInputElement).valueAsNumber)"
          :placeholder="input.placeholder || input.label"
          :class="mdTextFieldInput"
          type="number"
        />
        <label :for="input.schemaProperty" :class="mdTextFieldLabel">
          {{ input.label }}
        </label>
        <p
          v-if="input.supportingText"
          class="text-xs mt-1 text-light-on-surface-variant dark:text-dark-on-surface-variant"
        >
          {{ input.supportingText }}
        </p>
        <p v-if="errors?.[input.schemaProperty]" :class="errorMsg" class="text-xs mt-1">
          {{ errors[input.schemaProperty] }}
        </p>
      </div>

      <!-- Generic fallback for unsupported types -->
      <div v-else class="mb-6">
        <label :for="input.schemaProperty" class="block text-sm font-medium mb-2">
          {{ input.label }}
        </label>
        <p class="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant">
          Campo tipo "{{ input.component.type }}" ainda não implementado
        </p>
      </div>
    </div>

    <slot name="actions">
      <div class="flex justify-end gap-4 pt-4">
        <slot name="cancel-button" />
        <button
          type="submit"
          :disabled="loading"
          class="px-6 py-3 bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary rounded-3xl font-medium hover:shadow-elevation-2 transition-shadow disabled:opacity-50"
        >
          <span v-if="loading" class="material-symbols-outlined animate-spin">
            progress_activity
          </span>
          <span v-else>Salvar</span>
        </button>
      </div>
    </slot>
  </form>
</template>

<style scoped>

input, textarea, select {
  font-family: inherit;
  font-size: 1rem;
  background-color: white;
  border: solid 1px #ccc;
}
</style>