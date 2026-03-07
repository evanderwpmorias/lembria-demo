2<script lang="ts">
export default {
  name: "MdMapInput",
};
</script>

<script setup lang="ts">
import { ref, computed } from "vue";

defineProps({
  label: {
    type: String,
    default: "Map",
  },
  placeholder: {
    type: String,
    default: "Enter key-value pairs",
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorText: {
    type: String,
    default: "",
  },
  supportingText: {
    type: String,
    default: "",
  },
  inputClass: {
    type: String,
    default: "",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const modelValue = defineModel({ type: Object, default: () => ({}) });

const newKey = ref("");
const newValue = ref("");

const entries = computed(() => {
  return Object.entries(modelValue.value || {});
});

const addEntry = () => {
  if (newKey.value.trim() && newValue.value.trim()) {
    modelValue.value = {
      ...modelValue.value,
      [newKey.value.trim()]: newValue.value.trim(),
    };
    newKey.value = "";
    newValue.value = "";
  }
};

const removeEntry = (key: string) => {
  const updated = { ...modelValue.value };
  delete updated[key];
  modelValue.value = updated;
};

const updateEntry = (oldKey: string, newKey: string, newValue: string) => {
  if (newKey.trim() && newValue.trim()) {
    const updated = { ...modelValue.value };
    if (oldKey !== newKey.trim()) {
      delete updated[oldKey];
    }
    updated[newKey.trim()] = newValue.trim();
    modelValue.value = updated;
  }
};

const updateKey = (oldKey: string, newKey: string) => {
  const value = modelValue.value[oldKey];
  updateEntry(oldKey, newKey, value);
};

const updateValue = (key: string, newValue: string) => {
  updateEntry(key, key, newValue);
};
</script>

<template>
  <div class="md-map-input" :class="inputClass">
    <div class="mb-2">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        {{ label }}
      </label>
      <p v-if="supportingText" class="text-sm text-gray-500 mb-2">
        {{ supportingText }}
      </p>
    </div>

    <!-- Existing entries -->
    <div v-if="entries.length > 0" class="space-y-2 mb-4">
      <div
        v-for="([key, value], index) in entries"
        :key="index"
        class="flex gap-2 items-center p-2 bg-gray-50 rounded-md"
      >
        <md-outlined-text-field
          :model-value="key"
          @update:model-value="(newKey) => updateKey(key, String(newKey))"
          placeholder="Key"
          class="flex-1"
          :readonly="readonly"
        />
        <md-outlined-text-field
          :model-value="value"
          @update:model-value="(newValue) => updateValue(key, String(newValue))"
          placeholder="Value"
          class="flex-1"
          :readonly="readonly"
        />
        <md-icon-button
          v-if="!readonly"
          @click="removeEntry(key)"
          type="button"
        >
          <md-icon>delete</md-icon>
        </md-icon-button>
      </div>
    </div>

    <!-- Add new entry -->
    <div v-if="!readonly" class="flex gap-2 items-end">
      <md-outlined-text-field
        :value="newKey"
        @input="newKey = $event.target.value"
        placeholder="New key"
        class="flex-1"
        :error="error && !newKey.trim()"
      />
      <md-outlined-text-field
        :value="newValue"
        @input="newValue = $event.target.value"
        placeholder="New value"
        class="flex-1"
        :error="error && !newValue.trim()"
      />
      <md-filled-button
        @click="addEntry"
        type="button"
        :disabled="!newKey.trim() || !newValue.trim()"
      >
        <md-icon>add</md-icon>
        Add
      </md-filled-button>
    </div>

    <!-- Error message -->
    <div v-if="error && errorText" class="mt-1 text-sm text-red-600">
      {{ errorText }}
    </div>
  </div>
</template>

<style scoped>
.md-map-input {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
}

.md-map-input:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}
</style>
