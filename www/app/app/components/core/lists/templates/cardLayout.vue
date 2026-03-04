<script lang="ts">
export default {
  name: "CardLayout",
};
</script>

<script setup lang="ts">
import { ref, computed, toRefs } from 'vue';

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

const { data, schema, selection, density, displayName, imageField, loading } = toRefs(props);

const emit = defineEmits<{
  'row-click': [item: any];
  'update:selection': [selection: any[]];
}>();

const selectedItems = ref<any[]>([...(props.selection || [])]);

const densityClass = computed(() => {
  return density?.value === 'compact' ? 'p-3' : 'p-4';
});

const cardSpacing = computed(() => {
  return density?.value === 'compact' ? 'gap-3' : 'gap-4';
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
  if (imageField?.value && item[imageField.value]) {
    return item[imageField.value];
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
  <div class="card-layout">
    <!-- Loading state -->
    <div v-if="loading" class="flex items-center justify-center py-8">
      <div class="flex items-center gap-2 text-gray-500">
        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        Loading...
      </div>
    </div>

    <!-- Card grid -->
    <div 
      v-else 
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      :class="cardSpacing"
    >
      <div 
        v-for="(item, index) in data" 
        :key="index"
        class="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all duration-150 overflow-hidden"
        :class="[
          densityClass,
          {
            'bg-blue-50 border-blue-200 shadow-md': isSelected(item),
            'ring-2 ring-blue-500': isSelected(item)
          }
        ]"
        @click="handleRowClick(item, $event)"
        :tabindex="0"
        :aria-selected="isSelected(item)"
        role="option"
      >
        <!-- Selection checkbox -->
        <div v-if="selection !== undefined" class="absolute top-3 right-3 z-10">
          <input
            type="checkbox"
            :checked="isSelected(item)"
            @change="toggleSelection(item)"
            @click.stop
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            :aria-label="`Select ${displayName ? displayName(item) : 'item'}`"
          />
        </div>

        <!-- Card header with image -->
        <div v-if="getImageUrl(item)" class="aspect-w-16 aspect-h-9 bg-gray-200">
          <img 
            :src="getImageUrl(item)" 
            :alt="displayName ? displayName(item) : 'Item image'"
            class="w-full h-32 object-cover"
          />
        </div>

        <!-- Card content -->
        <div class="p-4">
          <!-- Primary text (title) -->
          <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {{ displayName ? displayName(item) : 'Untitled' }}
          </h3>
          
          <!-- Fields -->
          <div class="space-y-2">
            <div 
              v-for="field in schema.slice(0, 4)" 
              :key="field.name"
              class="flex justify-between items-start"
            >
              <dt class="text-sm font-medium text-gray-500 truncate flex-shrink-0 mr-2">
                {{ field.label || field.name }}:
              </dt>
              <dd class="text-sm text-gray-900 text-right min-w-0 flex-1">
                <slot 
                  name="item" 
                  :item="item" 
                  :field="field" 
                  :value="item[field.name]"
                >
                  {{ formatValue(item[field.name], field) }}
                </slot>
              </dd>
            </div>
          </div>

          <!-- Additional fields indicator -->
          <div v-if="schema.length > 4" class="mt-3 pt-3 border-t border-gray-200">
            <p class="text-xs text-gray-500">
              +{{ schema.length - 4 }} more fields
            </p>
          </div>

          <!-- Actions -->
          <div v-if="$slots.actions" class="row-actions mt-4 pt-3 border-t border-gray-200 flex items-center justify-end gap-2">
            <slot name="actions" :item="item" :index="index" />
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="!loading && data && data.length === 0" class="text-center py-12">
      <div class="text-gray-500">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No items found</h3>
        <p class="mt-1 text-sm text-gray-500">No data to display at this time.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Line clamping for title */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* RTL support with logical properties */
.card-layout [role="option"] {
  padding-inline: theme('spacing.4');
}

/* Focus styles for accessibility */
[role="option"]:focus {
  outline: 2px solid theme('colors.blue.500');
  outline-offset: -2px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .transition-all,
  .duration-150 {
    transition: none !important;
  }
  
  .animate-spin {
    animation: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .card-layout [role="option"] {
    border-width: 2px;
  }
}

/* Touch targets */
[role="option"] {
  min-height: 120px; /* Minimum touch target size for cards */
}

/* Responsive grid adjustments */
@media (max-width: 640px) {
  .card-layout .grid {
    grid-template-columns: 1fr;
  }
}

/* Aspect ratio utility for images */
.aspect-w-16 {
  position: relative;
  padding-bottom: calc(9 / 16 * 100%);
}

.aspect-w-16 > img {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
