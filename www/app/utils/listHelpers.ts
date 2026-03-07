import { ref, computed, watch, type Ref, type Reactive } from 'vue';
import { type listsType, type filterSchemaType, type entityPropertiesType } from '../utils/types';

export interface ListOptions {
  limit?: number;
  autoFetch?: boolean;
  cache?: boolean;
  countMode?: 'paralell' | 'sequential';
}

// Extended filter schema with runtime options for select inputs
export interface ExtendedFilterSchema extends filterSchemaType {
  field: entityPropertiesType & {
    options?: Array<{ value: any; label: string }>;
  };
}

// Type aliases for easier use
export type FilterSchema = filterSchemaType;
export type ListSchema = listsType;

export interface EntityHelper<T = any> {
  fetchAll: (filter: string, page: number, limit: number, options: any) => Promise<any>;
  listLoadable: Reactive<{
    loading: boolean;
    loaded: boolean;
    error: any;
  }>;
}

/**
 * Checks if a value is valid for filtering (not empty, undefined, null, or empty array)
 */
export function isValidFilterValue(value: any): boolean {
  return (
    value !== '' &&
    value !== undefined &&
    value !== null &&
    (!Array.isArray(value) || value.length > 0)
  );
}

/**
 * Converts filter values to OData query string
 * @param values - Object containing filter field values
 * @param filterSchema - Array of filter schema definitions
 * @returns OData-formatted filter string
 */
export function filterValuesToOdata(
  values: Record<string, any>,
  filterSchema: filterSchemaType[]
): string {
  let output = '';
  let lastEntry: 'filter' | 'logic' | '' = '';

  filterSchema.forEach((filter, index) => {
    const previousFilter = filterSchema[index - 1];
    const nextFilter = filterSchema[index + 1];

    // Process field filters
    if (filter.field) {
      const field = filter.field;
      const value = values[field.name];

      if (isValidFilterValue(value)) {
        // Format value based on field type
        const isStringType = !['number', 'boolean'].includes(field.type);
        const formattedValue = isStringType ? `'${value}'` : value;
        
        // Append _contains suffix for string type fields to enable contains search
        const fieldName = isStringType ? `${field.name}_contains` : field.name;
        
        output += `${fieldName} ${filter.operator || 'eq'} ${formattedValue}`;
        lastEntry = 'filter';
      }
    }

    // Process logic operators (and/or) between filters
    if ((previousFilter || nextFilter) && filter.logicOperators) {
      const previousValue = previousFilter?.field ? values[previousFilter.field.name] : null;
      const nextValue = nextFilter?.field ? values[nextFilter.field.name] : null;

      // Only add logic operator if we have valid values on both sides
      if (
        (isValidFilterValue(previousValue) && isValidFilterValue(nextValue)) ||
        (lastEntry === 'filter' && isValidFilterValue(nextValue))
      ) {
        output += ` ${filter.logicOperators} `;
        lastEntry = 'logic';
      }
    }
  });

  return output;
}

/**
 * Processes filter schema to add enum options for select inputs
 * @param filterSchema - Array of filter schema definitions
 * @returns Processed filter schema with enum options
 */
export function processFilterSchema(filterSchema: filterSchemaType[]): ExtendedFilterSchema[] {
  return filterSchema.map((filter) => {
    if (filter.field?.type === 'enum') {
      // Handle enum as either array or comma-separated string
      const enumArray = Array.isArray(filter.field.enum) 
        ? filter.field.enum 
        : String(filter.field.enum || '').split(',');
      
      const options = enumArray.map((option) => ({
        value: typeof option === 'string' ? option.trim() : option,
        label: typeof option === 'string' ? option.trim() : String(option),
      }));

      return {
        ...filter,
        field: {
          ...filter.field,
          options,
        },
        inputTypes: 'select',
      } as ExtendedFilterSchema;
    }
    return filter as ExtendedFilterSchema;
  });
}

/**
 * Main composable for list functionality
 * Provides reactive state and methods for managing paginated, filterable lists
 * 
 * @param entityHelper - Helper object with fetchAll method and listLoadable state
 * @param listSchema - Schema defining filters and table fields
 * @param options - Configuration options
 * @returns Object with state, computed values, and methods for list management
 */
export function useList<T = any>(
  entityHelper: EntityHelper<T>,
  listSchema: listsType,
  options: ListOptions = {}
) {
  const {
    limit = 10,
    autoFetch = true,
    cache = false,
    countMode = 'paralell',
  } = options;

  // State
  const page = ref(1);
  const totalItems = ref(0);
  const totalPages = ref(0);
  const filterValues = ref<Record<string, any>>({});
  const list = ref<T[]>([]);
  const baseFilter = ref('');

  // Computed
  const processedFilters = computed(() => processFilterSchema(listSchema.filterSchema));

  const listFilter = computed(() =>
    filterValuesToOdata(filterValues.value, listSchema.filterSchema)
  );

  const combinedFilter = computed(() => {
    const parts = [baseFilter.value, listFilter.value].filter(Boolean);
    return parts.join(' and ');
  });

  // Methods
  const fetchList = async () => {
    try {
      const response = await entityHelper.fetchAll(
        combinedFilter.value,
        page.value,
        limit,
        { cache, countMode }
      );

      if (response) {
        const { list: items, totalItems: tI, totalPages: tp } = response;
        
        // Handle both ref and regular array responses
        list.value = items?.value || items || [];

        // Update pagination info only on first page load
        if (page.value === 1 && list.value.length >= 0) {
          totalItems.value = tI || 0;
          totalPages.value = tp || 1;
        }
      }

      return response;
    } catch (error) {
      console.error('Error fetching list:', error);
      throw error;
    }
  };

  const resetFilters = () => {
    filterValues.value = {};
  };

  const goToPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages.value) {
      page.value = pageNum;
    }
  };

  const nextPage = () => {
    if (page.value < totalPages.value) {
      page.value++;
    }
  };

  const previousPage = () => {
    if (page.value > 1) {
      page.value--;
    }
  };

  const setBaseFilter = (filter: string) => {
    baseFilter.value = filter;
  };

  const refresh = async () => {
    await fetchList();
  };

  const resetPagination = () => {
    page.value = 1;
    totalItems.value = 0;
    totalPages.value = 0;
  };

  // Watchers
  watch(page, () => fetchList(), { immediate: false });
  
  watch(
    filterValues,
    () => {
      page.value = 1; // Reset to first page on filter change
      fetchList();
    },
    { deep: true }
  );

  watch(baseFilter, () => {
    page.value = 1; // Reset to first page on base filter change
    fetchList();
  });

  // Auto-fetch on mount
  if (autoFetch) {
    fetchList();
  }

  return {
    // State
    page,
    totalItems,
    totalPages,
    filterValues,
    list,
    baseFilter,

    // Computed
    processedFilters,
    listFilter,
    combinedFilter,

    // Methods
    fetchList,
    resetFilters,
    goToPage,
    nextPage,
    previousPage,
    setBaseFilter,
    refresh,
    resetPagination,

    // Entity loadable state
    loading: computed(() => entityHelper.listLoadable.loading),
    loaded: computed(() => entityHelper.listLoadable.loaded),
    error: computed(() => entityHelper.listLoadable.error),
  };
}

/**
 * Optional: List class for more complex scenarios or OOP preference
 * Wraps the useList composable in a class interface
 */
export class ListManager<T = any> {
  private listComposable: ReturnType<typeof useList<T>>;

  constructor(
    entityHelper: EntityHelper<T>,
    listSchema: listsType,
    options?: ListOptions
  ) {
    this.listComposable = useList(entityHelper, listSchema, options);
  }

  get state() {
    return {
      page: this.listComposable.page,
      totalItems: this.listComposable.totalItems,
      totalPages: this.listComposable.totalPages,
      filterValues: this.listComposable.filterValues,
      list: this.listComposable.list,
      baseFilter: this.listComposable.baseFilter,
    };
  }

  get computed() {
    return {
      processedFilters: this.listComposable.processedFilters,
      listFilter: this.listComposable.listFilter,
      combinedFilter: this.listComposable.combinedFilter,
      loading: this.listComposable.loading,
      loaded: this.listComposable.loaded,
      error: this.listComposable.error,
    };
  }

  // Delegate methods
  fetchList() {
    return this.listComposable.fetchList();
  }

  resetFilters() {
    return this.listComposable.resetFilters();
  }

  goToPage(pageNum: number) {
    return this.listComposable.goToPage(pageNum);
  }

  nextPage() {
    return this.listComposable.nextPage();
  }

  previousPage() {
    return this.listComposable.previousPage();
  }

  setBaseFilter(filter: string) {
    return this.listComposable.setBaseFilter(filter);
  }

  refresh() {
    return this.listComposable.refresh();
  }

  resetPagination() {
    return this.listComposable.resetPagination();
  }
} 