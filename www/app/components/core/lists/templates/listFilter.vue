<script lang="ts">
export default {
  name: "ListFilter",
};
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface FilterSchema {
  field: string;
  type: 'text' | 'select' | 'range' | 'date';
  label?: string;
  options?: Array<{ value: any; label: string }>;
}

const props = defineProps<{
  filterSchema: FilterSchema[];
  modelValue: Record<string, any>;
}>();

const emit = defineEmits<{
  'update:modelValue': [filters: Record<string, any>];
}>();

const localFilters = ref<Record<string, any>>({ ...props.modelValue });

const activeFilterCount = computed(() => {
  return Object.values(localFilters.value).filter(value => 
    value !== null && value !== undefined && value !== ''
  ).length;
});

const clearAllFilters = () => {
  localFilters.value = {};
  emit('update:modelValue', {});
};

const removeFilter = (field: string) => {
  const newFilters = { ...localFilters.value };
  delete newFilters[field];
  localFilters.value = newFilters;
  emit('update:modelValue', newFilters);
};

// Debounce filter changes
let debounceTimer: ReturnType<typeof setTimeout>;
watch(localFilters, (newFilters) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    emit('update:modelValue', newFilters);
  }, 300);
}, { deep: true });

watch(() => props.modelValue, (newValue) => {
  localFilters.value = { ...newValue };
}, { deep: true });
</script>

<template>
  <div class="list-filter">
    <!-- Filter Controls -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
      <template v-for="filter in filterSchema" :key="filter.field">
        <!-- Text Input -->
        <div v-if="filter.type === 'text'" class="filter-group">
          <label 
            :for="`filter-${filter.field}`"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            {{ filter.label || filter.field }}
          </label>
          <input
            :id="`filter-${filter.field}`"
            v-model="localFilters[filter.field]"
            type="text"
            :placeholder="`Filter by ${filter.label || filter.field}`"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <!-- Select Input -->
        <div v-else-if="filter.type === 'select'" class="filter-group">
          <label 
            :for="`filter-${filter.field}`"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            {{ filter.label || filter.field }}
          </label>
          <select
            :id="`filter-${filter.field}`"
            v-model="localFilters[filter.field]"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">All</option>
            <option 
              v-for="option in filter.options" 
              :key="option.value" 
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Date Input -->
        <div v-else-if="filter.type === 'date'" class="filter-group">
          <label 
            :for="`filter-${filter.field}`"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            {{ filter.label || filter.field }}
          </label>
          <input
            :id="`filter-${filter.field}`"
            v-model="localFilters[filter.field]"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <!-- Range Input -->
        <div v-else-if="filter.type === 'range'" class="filter-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ filter.label || filter.field }}
          </label>
          <div class="grid grid-cols-2 gap-2">
            <input
              v-model="localFilters[`${filter.field}_min`]"
              type="number"
              placeholder="Min"
              class="px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <input
              v-model="localFilters[`${filter.field}_max`]"
              type="number"
              placeholder="Max"
              class="px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>
      </template>
    </div>

    <!-- Active Filters (Chips) -->
    <div v-if="activeFilterCount > 0" class="mb-4">
      <div class="flex flex-wrap gap-2 items-center">
        <span class="text-sm font-medium text-gray-700">Active filters:</span>
        
        <template v-for="(value, field) in localFilters" :key="field">
          <div 
            v-if="value !== null && value !== undefined && value !== ''"
            class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
          >
            <span>{{ field }}: {{ value }}</span>
            <button
              @click="removeFilter(field)"
              class="ml-1 hover:bg-blue-200 rounded-full p-0.5"
              :aria-label="`Remove ${field} filter`"
            >
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </template>

        <button
          @click="clearAllFilters"
          class="text-sm text-red-600 hover:text-red-800 underline"
          :aria-label="'Clear all filters'"
        >
          Clear all
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-group {
  @apply relative;
}

.filter-group input:focus,
.filter-group select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

@media (prefers-reduced-motion: reduce) {
  .filter-group * {
    transition: none !important;
  }
}
</style>
