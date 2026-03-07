<script lang="ts">
export default {
  name: "TableLayout",
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
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  density?: 'comfortable' | 'compact';
  stickyHeader?: boolean;
  caption?: string;
  displayName: (item: any) => string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  'sort': [field: string, direction: 'asc' | 'desc'];
  'row-click': [item: any];
  'update:selection': [selection: any[]];
}>();

const tableRef = ref<HTMLTableElement>();
const selectedItems = ref<any[]>([...(props.selection || [])]);

const densityClass = computed(() => {
  return props.density === 'compact' ? 'compact' : 'comfortable';
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

const toggleSelectAll = () => {
  if (selectedItems.value.length === props.data.length) {
    selectedItems.value = [];
  } else {
    selectedItems.value = [...props.data];
  }
  emit('update:selection', [...selectedItems.value]);
};

const handleSort = (field: string) => {
  let direction: 'asc' | 'desc' = 'asc';
  
  if (props.sortField === field && props.sortDirection === 'asc') {
    direction = 'desc';
  }
  
  emit('sort', field, direction);
};

const handleRowClick = (item: any, event: MouseEvent) => {
  // Don't emit row click if clicking on checkbox or action buttons
  const target = event.target as HTMLElement;
  if (target.closest('input[type="checkbox"]') || target.closest('.row-actions')) {
    return;
  }
  
  emit('row-click', item);
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

const getSortIcon = (field: string) => {
  if (props.sortField !== field) {
    return 'sort';
  }
  return props.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc';
};

// Keyboard navigation
const handleKeyDown = (event: KeyboardEvent, item: any, index: number) => {
  const table = tableRef.value;
  if (!table) return;
  
  const rows = table.querySelectorAll('tbody tr');
  const currentRow = rows[index];
  
  switch (event.key) {
    case 'Enter':
      event.preventDefault();
      emit('row-click', item);
      break;
    case ' ':
      event.preventDefault();
      toggleSelection(item);
      break;
    case 'ArrowDown':
      event.preventDefault();
      const nextRow = rows[index + 1] as HTMLElement;
      nextRow?.focus();
      break;
    case 'ArrowUp':
      event.preventDefault();
      const prevRow = rows[index - 1] as HTMLElement;
      prevRow?.focus();
      break;
    case 'Home':
      event.preventDefault();
      const firstRow = rows[0] as HTMLElement;
      firstRow?.focus();
      break;
    case 'End':
      event.preventDefault();
      const lastRow = rows[rows.length - 1] as HTMLElement;
      lastRow?.focus();
      break;
  }
};
</script>

<template>
  <div class="table-layout overflow-x-auto">
    <table 
      ref="tableRef"
      class="w-full text-sm text-left text-on-surface"
      :class="[densityClass, { 'sticky-header': stickyHeader }]"
      role="table"
      :aria-label="caption"
    >
      <!-- Caption for accessibility -->
      <caption v-if="caption" class="sr-only">
        {{ caption }}
      </caption>
      
      <!-- Loading state -->
      <caption v-if="loading" class="py-4 text-center text-gray-500">
        <div class="flex items-center justify-center gap-2">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          Loading...
        </div>
      </caption>

      <!-- Table Header -->
      <thead 
        class="text-xs text-on-surface-variant uppercase bg-surface-container-highest"
        :class="{ 'sticky top-0 z-10': stickyHeader }"
      >
        <tr>
          <!-- Selection header -->
          <th 
            v-if="selection !== undefined"
            scope="col" 
            class="px-4 py-3"
          >
            <input
              type="checkbox"
              :checked="selectedItems.length === data.length && data.length > 0"
              :indeterminate="selectedItems.length > 0 && selectedItems.length < data.length"
              @change="toggleSelectAll"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              aria-label="Select all rows"
            />
          </th>

          <!-- Field headers -->
          <th 
            v-for="field in schema" 
            :key="field.name"
            scope="col"
            class="px-4 py-3"
          >
            <button
              @click="handleSort(field.name)"
              class="flex items-center gap-2 font-medium hover:text-primary focus:outline-none focus:text-primary group"
              :aria-sort="sortField?.value === field.name ? (sortDirection?.value === 'asc' ? 'ascending' : 'descending') : 'none'"
              :title="field.tooltip"
            >
              <span>{{ field.label || field.name }}</span>
              
              <!-- Sort icon -->
              <svg 
                class="w-4 h-4 transition-transform duration-200"
                :class="{
                  'rotate-180': sortField === field.name && sortDirection === 'desc',
                  'opacity-50 group-hover:opacity-100': sortField !== field.name
                }"
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  v-if="getSortIcon(field.name) === 'sort'"
                  fill-rule="evenodd" 
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                  clip-rule="evenodd" 
                />
                <path 
                  v-else
                  fill-rule="evenodd" 
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                  clip-rule="evenodd" 
                />
              </svg>
            </button>
          </th>

          <!-- Actions header -->
          <th v-if="$slots.actions" scope="col" class="px-4 py-3">
            <slot name="header-extra" />
          </th>
        </tr>
      </thead>

      <!-- Table Body -->
      <tbody class="bg-surface divide-y divide-outline-variant">
        <tr 
          v-for="(item, index) in data" 
          :key="index"
          class="hover:bg-surface-container-highest cursor-pointer transition-colors duration-150"
          :class="{
            'bg-primary-container/12': isSelected(item),
            'ring-2 ring-primary ring-inset': isSelected(item)
          }"
          :tabindex="0"
          :aria-selected="isSelected(item)"
          role="row"
          @click="handleRowClick(item, $event)"
          @keydown="handleKeyDown($event, item, index)"
        >
          <!-- Selection cell -->
          <td v-if="selection !== undefined" class="px-4 py-3">
            <input
              type="checkbox"
              :checked="isSelected(item)"
              @change="toggleSelection(item)"
              @click.stop
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              :aria-label="`Select ${displayName(item)}`"
            />
          </td>

          <!-- Data cells -->
          <td 
            v-for="field in schema" 
            :key="field.name"
            class="px-4 py-3"
            :class="{
              'font-medium text-on-surface': field.name === schema[0]?.name,
              'text-on-surface-variant': field.name !== schema[0]?.name
            }"
          >
            <slot 
              name="item" 
              :item="item" 
              :field="field" 
              :value="item[field.name as keyof T]"
            >
              {{ formatValue(item[field.name as keyof T], field) }}
            </slot>
          </td>

          <!-- Actions cell -->
          <td v-if="$slots.actions" class="px-4 py-3">
            <div class="row-actions flex items-center gap-2">
              <slot name="actions" :item="item" :index="index" />
            </div>
          </td>
        </tr>

        <!-- Empty state -->
        <tr v-if="!loading && data.length === 0">
          <td 
            :colspan="schema.length + (selection !== undefined ? 1 : 0) + ($slots.actions ? 1 : 0)"
            class="px-4 py-8 text-center text-on-surface-variant"
          >
            No items found
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-layout {
  --cell-padding-comfortable: theme('spacing.3');
  --cell-padding-compact: theme('spacing.2');
}

.comfortable td,
.comfortable th {
  min-height: 56px;
  padding-block: var(--cell-padding-comfortable);
  padding-inline: theme('spacing.4');
}

.compact td,
.compact th {
  min-height: 48px;
  padding-block: var(--cell-padding-compact);
  padding-inline: theme('spacing.4');
}

/* RTL support with logical properties */
.table-layout td,
.table-layout th {
  padding-inline-start: theme('spacing.4');
  padding-inline-end: theme('spacing.4');
}

/* Focus styles for accessibility */
tr:focus {
  outline: 2px solid theme('colors.blue.500');
  outline-offset: -2px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .transition-colors,
  .transition-transform,
  .duration-150,
  .duration-200 {
    transition: none !important;
  }
}

/* Sticky header with proper elevation */
.sticky-header thead {
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .table-layout {
    border: 2px solid;
  }
  
  .table-layout td,
  .table-layout th {
    border: 1px solid;
  }
}
</style>
