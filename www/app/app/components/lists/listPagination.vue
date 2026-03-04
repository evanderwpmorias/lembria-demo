<script lang="ts">
export default {
  name: "listPagination",
};
</script>
<script setup lang="ts">
import { computed } from 'vue';
import {
  segmentedButtonContainer,
  segmentedButtonBase,
  segmentedButtonUnselected,
  segmentedButtonSelected,
  segmentedButtonFirst,
  segmentedButtonMiddle,
  segmentedButtonLast,
  typeLabelLarge,
} from '~/theme/md-theme';

interface Props {
  page: number;
  totalPages: number;
  totalItems?: number;
  maxVisiblePages?: number;
  showItemCount?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 5,
  showItemCount: true,
});

const emit = defineEmits<{
  'update:page': [page: number];
  'next': [];
  'previous': [];
}>();

const canGoPrevious = computed(() => props.page > 1);
const canGoNext = computed(() => props.page < props.totalPages);

// Computed class getters for segmented button styling
const getSegmentPosition = (index: number, total: number) => {
  if (total === 1) return 'rounded-full';
  if (index === 0) return segmentedButtonFirst;
  if (index === total - 1) return segmentedButtonLast;
  return segmentedButtonMiddle;
};

const visiblePages = computed(() => {
  const pages: number[] = [];
  const maxPages = props.maxVisiblePages;
  const total = props.totalPages;
  const current = props.page;
  
  if (total <= maxPages) {
    // Show all pages if total is less than max visible
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // Calculate range around current page
    const half = Math.floor(maxPages / 2);
    let start = Math.max(1, current - half);
    let end = Math.min(total, start + maxPages - 1);
    
    // Adjust start if end is at max
    if (end === total) {
      start = Math.max(1, end - maxPages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }
  
  return pages;
});

const handlePageClick = (pageNum: number) => {
  if (pageNum !== props.page && pageNum >= 1 && pageNum <= props.totalPages) {
    emit('update:page', pageNum);
  }
};

const handlePrevious = () => {
  if (canGoPrevious.value) {
    emit('previous');
  }
};

const handleNext = () => {
  if (canGoNext.value) {
    emit('next');
  }
};

// Build all pagination items (buttons + ellipsis) for unified positioning
const paginationItems = computed(() => {
  const items: Array<{ type: 'button' | 'ellipsis' | 'nav'; value: number | string; label?: string }> = [];
  const pages = visiblePages.value;
  const firstPage = pages[0];
  const lastPage = pages[pages.length - 1];
  
  // Previous button
  items.push({ type: 'nav', value: 'prev', label: 'previous' });
  
  // First page if needed
  if (firstPage !== undefined && firstPage > 1) {
    items.push({ type: 'button', value: 1 });
  }
  
  // First ellipsis
  if (firstPage !== undefined && firstPage > 2) {
    items.push({ type: 'ellipsis', value: 'start' });
  }
  
  // Visible page numbers
  for (const pageNum of pages) {
    items.push({ type: 'button', value: pageNum });
  }
  
  // Last ellipsis
  if (lastPage !== undefined && lastPage < props.totalPages - 1) {
    items.push({ type: 'ellipsis', value: 'end' });
  }
  
  // Last page if needed
  if (lastPage !== undefined && lastPage < props.totalPages) {
    items.push({ type: 'button', value: props.totalPages });
  }
  
  // Next button
  items.push({ type: 'nav', value: 'next', label: 'next' });
  
  return items;
});

// Get position class for segmented button styling
const getItemPositionClass = (index: number) => {
  const total = paginationItems.value.length;
  if (total === 1) return 'rounded-full';
  if (index === 0) return segmentedButtonFirst;
  if (index === total - 1) return segmentedButtonLast;
  return segmentedButtonMiddle;
};
</script>
<template>
  <nav class="list-pagination flex flex-col sm:flex-row items-center justify-between gap-4" aria-label="Paginação">
    <!-- Item count -->
    <div v-if="showItemCount && totalItems !== undefined" class="text-sm text-on-surface-variant">
      {{ totalItems }} {{ totalItems === 1 ? 'item' : 'itens' }} encontrados
    </div>
    
    <!-- Pagination controls - Segmented Button Group -->
    <div :class="segmentedButtonContainer" role="group" aria-label="Navegação de páginas">
      <template v-for="(item, index) in paginationItems" :key="`item-${index}`">
        <!-- Previous navigation button -->
        <button
          v-if="item.type === 'nav' && item.value === 'prev'"
          :disabled="!canGoPrevious"
          :class="[
            segmentedButtonBase,
            getItemPositionClass(index),
            canGoPrevious ? segmentedButtonUnselected : ''
          ]"
          @click="handlePrevious"
          aria-label="Página anterior"
        >
          <span class="material-symbols-outlined text-lg">chevron_left</span>
          <span class="hidden sm:inline">Anterior</span>
        </button>
        
        <!-- Next navigation button -->
        <button
          v-else-if="item.type === 'nav' && item.value === 'next'"
          :disabled="!canGoNext"
          :class="[
            segmentedButtonBase,
            getItemPositionClass(index),
            canGoNext ? segmentedButtonUnselected : ''
          ]"
          @click="handleNext"
          aria-label="Próxima página"
        >
          <span class="hidden sm:inline">Próximo</span>
          <span class="material-symbols-outlined text-lg">chevron_right</span>
        </button>
        
        <!-- Ellipsis -->
        <span
          v-else-if="item.type === 'ellipsis'"
          :class="[
            segmentedButtonBase,
            getItemPositionClass(index),
            'cursor-default'
          ]"
          aria-hidden="true"
        >
          ...
        </span>
        
        <!-- Page number button -->
        <button
          v-else-if="item.type === 'button'"
          :class="[
            segmentedButtonBase,
            getItemPositionClass(index),
            item.value === page ? segmentedButtonSelected : segmentedButtonUnselected
          ]"
          :aria-current="item.value === page ? 'page' : undefined"
          :aria-label="`Página ${item.value}`"
          @click="handlePageClick(item.value as number)"
        >
          {{ item.value }}
        </button>
      </template>
    </div>
  </nav>
</template>
<style lang="css" scoped> </style>