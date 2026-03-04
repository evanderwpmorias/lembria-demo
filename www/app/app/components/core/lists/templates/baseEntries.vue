<script lang="ts">
export default {
  name: "BaseEntries",
};
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, readonly } from 'vue';
// import ListLayout from './listLayout.vue';
// import TableLayout from './tableLayout.vue';
// import CardLayout from './cardLayout.vue';
// import ListFilter from './listFilter.vue';

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

interface LoadingStrategy {
  type: 'pagination' | 'load-more' | 'infinite';
  pageSize?: number;
}

interface ServerPagerResponse {
  items: any[];
  total: number;
}

interface FilterSchema {
  field: string;
  type: 'text' | 'select' | 'range' | 'date';
  label?: string;
  options?: Array<{ value: any; label: string }>;
}

const props = withDefaults(defineProps<{
  entitySchema: FieldSchema[];
  data?: any[];
  viewMode?: 'table' | 'list' | 'card' | 'auto';
  density?: 'comfortable' | 'compact';
  titleField?: string;
  imageField?: string;
  listMainField?: string;
  loadingStrategy?: LoadingStrategy;
  serverPager?: (page: number, pageSize: number, filters?: any) => Promise<ServerPagerResponse>;
  selection?: any[];
  stickyHeader?: boolean;
  caption?: string;
  filterSchema?: FilterSchema[];
  showFilters?: boolean;
  columnOrder?: string[];
}>(), {
  data: () => [],
  viewMode: 'auto',
  density: 'comfortable',
  loadingStrategy: () => ({ type: 'pagination', pageSize: 25 }),
  selection: () => [],
  stickyHeader: false,
  filterSchema: () => [],
  showFilters: true,
});

const emit = defineEmits<{
  'row-click': [item: any];
  'sort-change': [field: string, direction: 'asc' | 'desc'];
  'page-change': [page: number];
  'update:selection': [selection: any[]];
  'filter-change': [filters: any];
}>();

// Reactive state
const currentPage = ref(1);
const totalItems = ref(0);
const isLoading = ref(false);
const internalData = ref<any[]>([]);
const sortField = ref<string>('');
const sortDirection = ref<'asc' | 'desc'>('asc');
const selectedItems = ref<any[]>([...props.selection]);
const activeFilters = ref<any>({});
const windowWidth = ref(window?.innerWidth || 1024);

// Computed properties
const readonlyData = computed(() => readonly(internalData.value));

const displayName = computed(() => {
  return (item: any) => {
    if (props.titleField && item[props.titleField]) {
      return String(item[props.titleField]);
    }
    if (props.listMainField && item[props.listMainField]) {
      return String(item[props.listMainField]);
    }
    
    // Fallback to first string field
    const firstStringField = props.entitySchema.find(field => field.type === 'string');
    if (firstStringField && item[firstStringField.name]) {
      return String(item[firstStringField.name]);
    }
    
    return 'Untitled';
  };
});

const effectiveViewMode = computed(() => {
  if (props.viewMode === 'auto') {
    return windowWidth.value < 640 ? 'card' : 'table';
  }
  return props.viewMode;
});

const pageSize = computed(() => {
  const defaultSize = windowWidth.value < 640 ? 10 : 25;
  return props.loadingStrategy.pageSize || defaultSize;
});

const totalPages = computed(() => {
  return Math.ceil(totalItems.value / pageSize.value);
});

const orderedSchema = computed(() => {
  if (props.columnOrder) {
    const ordered = [];
    for (const fieldName of props.columnOrder) {
      const field = props.entitySchema.find(f => f.name === fieldName);
      if (field) ordered.push(field);
    }
    // Add any remaining fields not in columnOrder
    for (const field of props.entitySchema) {
      if (!props.columnOrder.includes(field.name)) {
        ordered.push(field);
      }
    }
    return ordered;
  }
  return props.entitySchema;
});

// Validation
const validateSchema = () => {
  if (!props.entitySchema || !Array.isArray(props.entitySchema)) {
    console.error('BaseEntries: entitySchema prop must be an array of field objects');
    return false;
  }
  
  if (!props.caption) {
    console.warn('BaseEntries: Missing caption prop for accessibility. Consider providing a description for screen readers.');
  }
  
  return true;
};

// Data loading methods
const loadData = async (page = 1) => {
  if (isLoading.value) return;
  
  isLoading.value = true;
  
  try {
    if (props.serverPager) {
      const response = await props.serverPager(page, pageSize.value, activeFilters.value);
      internalData.value = [...response.items];
      totalItems.value = response.total;
    } else {
      // Client-side data handling
      let filteredData = [...(props.data || [])];
      
      // Apply filters
      if (Object.keys(activeFilters.value).length > 0) {
        filteredData = applyClientFilters(filteredData);
      }
      
      // Apply sorting
      if (sortField.value) {
        filteredData = sortData(filteredData);
      }
      
      totalItems.value = filteredData.length;
      
      // Apply pagination
      const startIndex = (page - 1) * pageSize.value;
      const endIndex = startIndex + pageSize.value;
      internalData.value = filteredData.slice(startIndex, endIndex);
    }
    
    currentPage.value = page;
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    isLoading.value = false;
  }
};

const applyClientFilters = (data: any[]) => {
  return data.filter(item => {
    return Object.entries(activeFilters.value).every(([field, value]) => {
      if (!value || value === '') return true;
      
      const itemValue = item[field];
      const filterSchema = props.filterSchema?.find(f => f.field === field);
      
      if (filterSchema?.type === 'text') {
        return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
      }
      
      return itemValue === value;
    });
  });
};

const sortData = (data: any[]) => {
  return [...data].sort((a, b) => {
    const aValue = a[sortField.value];
    const bValue = b[sortField.value];
    
    if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1;
    return 0;
  });
};

const resetPagination = () => {
  currentPage.value = 1;
  loadData(1);
};

const handleSort = (field: string, direction: 'asc' | 'desc') => {
  sortField.value = field;
  sortDirection.value = direction;
  emit('sort-change', field, direction);
  
  if (!props.serverPager) {
    resetPagination();
  }
};

const handlePageChange = (page: number) => {
  emit('page-change', page);
  loadData(page);
};

const handleRowClick = (item: any) => {
  emit('row-click', item);
};

const handleSelectionUpdate = (selection: any[]) => {
  selectedItems.value = [...selection];
  emit('update:selection', selection);
};

const handleFilterChange = (filters: any) => {
  activeFilters.value = { ...filters };
  emit('filter-change', filters);
  resetPagination();
};

// Window resize handler
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

// Lifecycle
onMounted(() => {
  validateSchema();
  loadData();
  
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// Watchers
watch(() => props.data, () => {
  if (!props.serverPager) {
    loadData(currentPage.value);
  }
}, { deep: true });

watch(() => props.selection, (newSelection) => {
  selectedItems.value = [...newSelection];
});

// Expose methods
defineExpose({
  resetPagination,
  loadData,
  refresh: () => loadData(currentPage.value)
});
</script>

<template>
  <div class="base-entries" role="region" :aria-label="props.caption">
    <!-- Skip link for accessibility -->
    <a 
      href="#main-content" 
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white px-4 py-2 rounded shadow-lg"
    >
      Skip to main content
    </a>

    <!-- Filters -->
    <!-- 
    <ListFilter
      v-if="props.showFilters && props.filterSchema.length > 0"
      :filter-schema="props.filterSchema"
      :model-value="activeFilters"
      @update:model-value="handleFilterChange"
      class="mb-6"
    />
    -->

    <!-- Live region for screen readers -->
    <div
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
    >
      {{ `Showing ${internalData.length} of ${totalItems} items` }}
    </div>

    <!-- Main content -->
    <div id="main-content" tabindex="-1">
      <!-- Simple Table for now -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <caption v-if="props.caption" class="sr-only">{{ props.caption }}</caption>
          
          <caption v-if="isLoading" class="py-4 text-center text-gray-500">
            <div class="flex items-center justify-center gap-2">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              Loading...
            </div>
          </caption>

          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th 
                v-for="field in orderedSchema" 
                :key="field.name"
                scope="col"
                class="px-6 py-3 cursor-pointer hover:bg-gray-100"
                @click="handleSort(field.name, 'asc')"
              >
                {{ field.label || field.name }}
              </th>
            </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="(item, index) in readonlyData" 
              :key="index"
              class="hover:bg-gray-50 cursor-pointer"
              @click="handleRowClick(item)"
            >
              <td 
                v-for="field in orderedSchema" 
                :key="field.name"
                class="px-6 py-4 whitespace-nowrap"
              >
                {{ item[field.name] || '' }}
              </td>
            </tr>

            <tr v-if="!isLoading && readonlyData.length === 0">
              <td 
                :colspan="orderedSchema.length"
                class="px-6 py-8 text-center text-gray-500"
              >
                No items found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div 
      v-if="totalPages > 1 && props.loadingStrategy.type === 'pagination'"
      class="flex items-center justify-between pt-6"
      role="navigation"
      aria-label="Pagination"
    >
      <div class="text-sm text-gray-700">
        Showing {{ ((currentPage - 1) * pageSize) + 1 }} to {{ Math.min(currentPage * pageSize, totalItems) }} of {{ totalItems }} results
      </div>
      
      <div class="flex gap-2">
        <button
          :disabled="currentPage <= 1"
          @click="handlePageChange(currentPage - 1)"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          Previous
        </button>
        
        <button
          :disabled="currentPage >= totalPages"
          @click="handlePageChange(currentPage + 1)"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Load More Button -->
    <div 
      v-if="props.loadingStrategy.type === 'load-more' && currentPage < totalPages"
      class="flex justify-center pt-6"
    >
      <button
        @click="handlePageChange(currentPage + 1)"
        :disabled="isLoading"
        class="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isLoading ? 'Loading...' : 'Load More' }}
      </button>
    </div>

    <!-- Footer slot -->
    <div v-if="$slots.footer" class="pt-6">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.base-entries {
  --cell-padding: theme('spacing.4');
  --list-bg: theme('colors.white');
}

@media (prefers-reduced-motion: reduce) {
  .base-entries * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
