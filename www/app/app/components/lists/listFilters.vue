<script lang="ts">
export default {
  name: "listFilters",
};
</script>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { 
  mdTextFieldInput, 
  mdTextField, 
  mdTextFieldLabel, 
  buttonRoundedNormal, 
  buttonRoundedSecondary,
  card,
  cardNeutral,
  outlined,
  chip,
  chipOutlined,
  errorMsg
} from '~/theme/md-theme';
import { type ExtendedFilterSchema } from '~/utils/listHelpers';

interface Props {
  filters: ExtendedFilterSchema[];
  filterValues: Record<string, any>;
  showResetButton?: boolean;
  columns?: number;
  mainSearchField?: string;
  debounceMs?: number;
}

const props = withDefaults(defineProps<Props>(), {
  showResetButton: true,
  columns: 4,
  mainSearchField: '',
  debounceMs: 500,
});

const emit = defineEmits<{
  'update:filterValues': [value: Record<string, any>];
  'reset': [];
}>();

const showAdvancedFilters = ref(false);

// Local state for immediate input display
const localInputValues = ref<Record<string, any>>({});

const mainFilter = computed(() => {
  if (!props.mainSearchField) return null;
  return props.filters.find(f => f.field.name === props.mainSearchField);
});

const otherFilters = computed(() => {
  if (!props.mainSearchField) return props.filters;
  return props.filters.filter(f => f.field.name !== props.mainSearchField);
});

const localFilterValues = computed({
  get: () => props.filterValues,
  set: (value) => emit('update:filterValues', value),
});

// Debounced emit function
const debouncedEmit = useDebounceFn((fieldName: string, value: any) => {
  emit('update:filterValues', {
    ...props.filterValues,
    [fieldName]: value,
  });
}, props.debounceMs);

// Get the display value (local if being edited, otherwise from props)
const getInputValue = (fieldName: string) => {
  return fieldName in localInputValues.value 
    ? localInputValues.value[fieldName] 
    : props.filterValues[fieldName];
};

const updateFilterValue = (fieldName: string, value: any) => {
  // Update local value immediately for responsive UI
  localInputValues.value[fieldName] = value;
  // Debounce the actual filter update
  debouncedEmit(fieldName, value);
};

// Immediate update for non-text inputs (select, checkbox, date)
const updateFilterValueImmediate = (fieldName: string, value: any) => {
  emit('update:filterValues', {
    ...props.filterValues,
    [fieldName]: value,
  });
};

const handleReset = () => {
  localInputValues.value = {};
  emit('reset');
};

const gridColsClass = computed(() => {
  const colsMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };
  return colsMap[props.columns] || colsMap[4];
});
</script>
<template>
  <div class="list-filters space-y-4">
    <!-- Main Search Bar (Only if mainSearchField is set) -->
    <div v-if="mainSearchField" class="flex gap-2 items-center">
      <div v-if="mainFilter" class="flex-1">
        <div :class="[ ' rounded-full relative  transition-shadow flex items-center gap-2 bg-surface' ]">
          
        <span class="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2">search</span>
          <input
            :id="mainFilter.field.name"
            type="text"
            class="flex-1 py-2 pl-14 min-h-12 rounded-full bg-transparent border-none focus:outline-none"
            :value="getInputValue(mainFilter.field.name)"
            :placeholder="`Pesquisar por ${ mainFilter.field.name}`"
            @input="updateFilterValue(mainFilter.field.name, ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>

      <button 
        v-if="otherFilters.length > 0"
        @click="showAdvancedFilters = !showAdvancedFilters"
        :class="[buttonRoundedNormal, buttonRoundedSecondary]"
        title="Filtros avançados"
      >
        <span class="material-symbols-outlined">filter_list</span>
      </button>
    </div>

    <!-- Grid Filters (Either all filters, or otherFilters inside dropdown) -->
    <div 
      v-if="!mainSearchField || (showAdvancedFilters && otherFilters.length > 0)" 
      :class="mainSearchField ? [card, cardNeutral,] : ''"

      class=" shadow-sm focus-within:shadow-md transition-shadow p-4"
    >
      <div :class="['filters gap-4 grid', gridColsClass]">
        <template v-for="(filter, index) in (mainSearchField ? otherFilters : filters)" :key="index">
          <div v-if="filter.field" :class="mdTextField">
            <label :for="filter.field.name" :class="mdTextFieldLabel" class="capitalize">
              {{ filter.field.label || filter.field.name }}
            </label>
            
            <!-- Text/Email Input -->
            <input
              v-if="filter.inputTypes === 'input'"
              :id="filter.field.name"
              :type="filter.field.type === 'email' ? 'email' : filter.field.type === 'number' ? 'number' : 'text'"
              :class="[mdTextFieldInput, 'block w-full']"
              :value="getInputValue(filter.field.name)"
              :placeholder="filter.field.placeholder || `Filtrar por ${filter.field.name}`"
              @input="updateFilterValue(filter.field.name, ($event.target as HTMLInputElement).value)"
            />
            
            <!-- Select Input -->
            <select
              v-else-if="filter.inputTypes === 'select'"
              :id="filter.field.name"
              :class="[mdTextFieldInput, 'block w-full']"
              :value="filterValues[filter.field.name]"
              @change="updateFilterValueImmediate(filter.field.name, ($event.target as HTMLSelectElement).value)"
            >
              <option value="">Selecionar...</option>
              <option
                v-for="(option, optIndex) in filter.field?.options"
                :key="optIndex"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
            
            <!-- Date Input -->
            <input
              v-else-if="filter.field.type === 'date'"
              :id="filter.field.name"
              type="date"
              :class="[mdTextFieldInput, 'block w-full']"
              :value="filterValues[filter.field.name]"
              @input="updateFilterValueImmediate(filter.field.name, ($event.target as HTMLInputElement).value)"
            />
            
            <!-- Boolean/Checkbox Input -->
            <div v-else-if="filter.field.type === 'boolean'" class="flex items-center gap-2 mt-2">
              <input
                :id="filter.field.name"
                type="checkbox"
                class="w-4 h-4"
                :checked="filterValues[filter.field.name]"
                @change="updateFilterValueImmediate(filter.field.name, ($event.target as HTMLInputElement).checked)"
              />
              <span class="text-sm">{{ filter.field.label || filter.field.name }}</span>
            </div>
            
            <!-- Default Text Input -->
            <input
              v-else
              :id="filter.field.name"
              type="text"
              :class="[mdTextFieldInput, 'block w-full']"
              :value="getInputValue(filter.field.name)"
              :placeholder="filter.field.placeholder || `Filtrar por ${filter.field.name}`"
              @input="updateFilterValue(filter.field.name, ($event.target as HTMLInputElement).value)"
            />
          </div>
        </template>
      </div>
      
      <!-- Filter Actions -->
      <div v-if="mainSearchField ? otherFilters.length > 0 : filters.length > 0" class="mt-4 flex justify-between items-center">
        <!-- Hide Filters Button -->
        <button
          v-if="mainSearchField"
          type="button"
          :class="[chip, chipOutlined, 'gap-1']"
          @click="showAdvancedFilters = false"
        >
          <span class="material-symbols-outlined text-base">keyboard_arrow_up</span>
          Ocultar filtros
        </button>
        <div v-else></div>

        <!-- Reset Button -->
        <button
          v-if="showResetButton"
          type="button"
          :class="[chip, outlined, errorMsg, 'gap-1.5 hover:bg-light-error-container dark:hover:bg-dark-error-container border-light-error dark:border-dark-error']"
          @click="handleReset"
        >
          <span class="material-symbols-outlined text-base">filter_alt_off</span>
          Limpar filtros
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped> </style>