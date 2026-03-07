<template>
  <div class="key-value-list">
    <div class="space-y-2">
      <!-- Existing key-value pairs -->
      <div 
        v-for="(pair, index) in pairs" 
        :key="index"
        class="flex items-center gap-2"
      >
        <input
          v-model="pair.key"
          @input="updatePair(index, 'key', $event)"
          :placeholder="keyPlaceholder"
          class="flex-1 border rounded px-2 py-1 text-sm"
        />
        <span class="text-gray-400">=</span>
        <input
          v-model="pair.value"
          @input="updatePair(index, 'value', $event)"
          :placeholder="valuePlaceholder"
          class="flex-1 border rounded px-2 py-1 text-sm"
        />
        <button
          @click="removePair(index)"
          class="text-red-500 hover:text-red-700 p-1"
          title="Remove pair"
        >
          <md-icon class="text-sm">close</md-icon>
        </button>
      </div>
      
      <!-- Add new pair button -->
      <button
        @click="addPair"
        class="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
      >
        <md-icon class="text-sm">add</md-icon>
        Add {{ addButtonText }}
      </button>
      
      <!-- Empty state -->
      <div v-if="pairs.length === 0" class="text-gray-400 text-sm italic">
        No {{ emptyStateText }} defined
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

// Define props
const props = defineProps<{
  modelValue: Record<string, any>;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  addButtonText?: string;
  emptyStateText?: string;
}>();

// Define emits
const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>];
}>();

// Internal representation as array of key-value pairs
interface KeyValuePair {
  key: string;
  value: string;
}

const pairs = ref<KeyValuePair[]>([]);

// Convert object to pairs array
const objectToPairs = (obj: Record<string, any>): KeyValuePair[] => {
  if (!obj || typeof obj !== 'object') return [];
  return Object.entries(obj).map(([key, value]) => ({
    key,
    value: String(value)
  }));
};

// Convert pairs array to object
const pairsToObject = (pairsArray: KeyValuePair[]): Record<string, any> => {
  const obj: Record<string, any> = {};
  pairsArray.forEach(pair => {
    if (pair.key.trim()) {
      obj[pair.key.trim()] = pair.value;
    }
  });
  return obj;
};

// Initialize pairs from modelValue
watch(() => props.modelValue, (newValue) => {
  pairs.value = objectToPairs(newValue);
}, { immediate: true });

// Update a specific pair
const updatePair = (index: number, field: 'key' | 'value', event: Event) => {
  const target = event.target as HTMLInputElement;
  pairs.value[index][field] = target.value;
  emitUpdate();
};

// Add a new empty pair
const addPair = () => {
  pairs.value.push({ key: '', value: '' });
};

// Remove a pair
const removePair = (index: number) => {
  pairs.value.splice(index, 1);
  emitUpdate();
};

// Emit the updated object
const emitUpdate = () => {
  const obj = pairsToObject(pairs.value);
  emit('update:modelValue', obj);
};

// Default values for props
const keyPlaceholder = computed(() => props.keyPlaceholder || 'Key');
const valuePlaceholder = computed(() => props.valuePlaceholder || 'Value');
const addButtonText = computed(() => props.addButtonText || 'pair');
const emptyStateText = computed(() => props.emptyStateText || 'pairs');
</script>

<style scoped>
.key-value-list input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}
</style>
