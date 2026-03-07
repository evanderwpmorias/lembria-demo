<script lang="ts">
export default {
  name: "ListLayout",
};
</script>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface FieldSchema {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'reference' | 'enum' | 'date';
  label?: string;
  tooltip?: string;
  required?: boolean;
  isUnique?: boolean;
  enum?: string;
  formatter?: (value: any) => string;
}

const props = defineProps<{
  data: readonly any[];
  schema: FieldSchema[];
  selection?: any[];
  density?: 'comfortable' | 'compact';
  displayName: (item: any) => string;
  imageField?: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  'row-click': [item: any];
  'update:selection': [selection: any[]];
}>();

const selectedItems = ref<any[]>([...(props.selection || [])]);

const densityClass = computed(() => {
  return props.density === 'compact' ? 'py-2' : 'py-3';
});

const isSelected = (item: any) => {
  return selectedItems.value.some(selected => 
    JSON.stringify(selected) === JSON.stringify(item)
  );
};

const toggleSelection = (item: any) => {
  const index = selectedItems.value.findIndex(selected => 
    JSON.stringify(selected) === JSON.stringify(item)
  );
  
  if (index > -1) {
    selectedItems.value.splice(index, 1);
  } else {
    selectedItems.value.push(item);
  }
  
  emit('update:selection', [...selectedItems.value]);
};

const handleRowClick = (item: any, event: MouseEvent) => {
  // Don't emit row click if clicking on checkbox or action buttons
  const target = event.target as HTMLElement;
  if (target.closest('input[type="checkbox"]') || target.closest('.row-actions')) {
    return;
  }
  
  emit('row-click', item);
};

const getImageUrl = (item: any) => {
  if (props.imageField && item[props.imageField]) {
    return item[props.imageField];
  }
  return null;
};

const formatValue = (value: any, field: FieldSchema) => {
  if (field.formatter) {
    return field.formatter(value);
  }
  
  if (value === null || value === undefined) {
    return '';
  }
  
  if (field.type === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  
  if (field.type === 'date' && value instanceof Date) {
    return value.toLocaleDateString();
  }
  
  return String(value);
};
</script>

<template>
  <div class="list-layout">
    <!-- Loading state -->
    <div v-if="loading" class="flex items-center justify-center py-8">
      <div class="flex items-center gap-2 text-gray-500">
        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        Loading...
      </div>
    </div>

    <!-- List items -->
    <div v-else class="space-y-1">
      <div 
        v-for="(item, index) in data" 
        :key="index"
        class="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
        :class="[
          densityClass,
          {
            'bg-blue-50 border-blue-200': isSelected(item),
            'ring-2 ring-blue-500 ring-inset': isSelected(item)
          }
        ]"
        @click="handleRowClick(item, $event)"
        :tabindex="0"
        :aria-selected="isSelected(item)"
        role="option"
      >
        <!-- Selection checkbox -->
        <div v-if="selection !== undefined" class="flex-shrink-0">
          <input
            type="checkbox"
            :checked="isSelected(item)"
            @change="toggleSelection(item)"
            @click.stop
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            :aria-label="`Select ${displayName(item)}`"
          />
        </div>

        <!-- Image -->
        <div v-if="getImageUrl(item)" class="flex-shrink-0">
          <img 
            :src="getImageUrl(item)" 
            :alt="displayName(item)"
            class="w-10 h-10 rounded-full object-cover"
          />
        </div>

        <!-- Main content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between">
            <div class="min-w-0 flex-1">
              <!-- Primary text (title) -->
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ displayName(item) }}
              </p>
              
              <!-- Secondary text (first non-title field) -->
              <p class="text-sm text-gray-500 truncate mt-1">
                <template v-for="field in schema.slice(0, 2)" :key="field.name">
                  <span v-if="field.name !== schema[0]?.name && item[field.name]">
                    {{ formatValue(item[field.name], field) }}
                  </span>
                </template>
              </p>
            </div>

            <!-- Actions -->
            <div v-if="$slots.actions" class="row-actions flex items-center gap-2 ml-4">
              <slot name="actions" :item="item" :index="index" />
            </div>
          </div>

          <!-- Additional fields (if any) -->
          <div v-if="schema.length > 2" class="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
            <div 
              v-for="field in schema.slice(2, 6)" 
              :key="field.name"
              class="text-xs text-gray-500"
            >
              <span class="font-medium">{{ field.label || field.name }}:</span>
              <span class="ml-1">{{ formatValue(item[field.name], field) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="!loading && data.length === 0" class="text-center py-8">
        <div class="text-gray-500">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No items found</h3>
          <p class="mt-1 text-sm text-gray-500">No data to display at this time.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* RTL support with logical properties */
.list-layout .flex {
  padding-inline-start: theme('spacing.4');
  padding-inline-end: theme('spacing.4');
}

/* Focus styles for accessibility */
[role="option"]:focus {
  outline: 2px solid theme('colors.blue.500');
  outline-offset: -2px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .transition-colors,
  .duration-150 {
    transition: none !important;
  }
  
  .animate-spin {
    animation: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .list-layout [role="option"] {
    border-width: 2px;
  }
}

/* Touch targets */
[role="option"] {
  min-height: 44px; /* Minimum touch target size */
}

@media (pointer: coarse) {
  [role="option"] {
    min-height: 48px; /* Larger touch targets on mobile */
  }
}
</style>
