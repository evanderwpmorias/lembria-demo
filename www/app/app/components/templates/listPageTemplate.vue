
<script setup lang="ts">
import { ref, computed, onMounted, reactive, watch, provide } from "vue";
import { useRouter } from 'vue-router';
import { ListFilters, ListMain, ListPagination, ListItemRow } from "@/components/lists";
import { type listsType, type entitiesType } from "~/utils/types";
import { useList, processFilterSchema, filterValuesToOdata } from "~/utils/listHelpers";
import { 
  btnFilled, 
  scrim,
  typeBodyLarge,
  errorMsg,
  typeHeadlineLarge
} from "~/theme/md-theme";

const props = defineProps({
  entityRefMap: {
    type: Object,
    required: true,
    default: () => {},
  },
  user: {
    type: Object,
    required: false,
    default: () => {},
  },
  viewOnly: {
    type: Boolean,
    required: false,
    default: false,
  },
  allowReordering: {
    type: Boolean,
    required: false,
    default: false,
  },
  updateListOnFetch: {
    type: Boolean,
    required: false,
    default: true,
  },
  basePath: {
    type: String,
    required: false,
    default: '',
  },
  baseFilter: {
    type: String,
    required: false,
    default: '',
  },
  limit: {
    type: Number,
    required: false,
    default: 10,
  },
  showFilters: {
    type: Boolean,
    required: false,
    default: true,
  },
  showPagination: {
    type: Boolean,
    required: false,
    default: true,
  },
  mode: {
    type: String as () => 'table' | 'card' | 'list',
    required: false,
    default: 'table',
  },
});

const emit = defineEmits<{
  'item-click': [item: any];
  'action-click': [action: string, item?: any];
}>();

const router = useRouter();

const entitySchema = computed<entitiesType>(() => {
  return props.entityRefMap?.schema || {};
});

const listSchema = computed<listsType>(() => {
  const schema = props.entityRefMap?.listSchema || {};
  
  if (!schema.actions || schema.actions.length === 0) {
    const children = props.entityRefMap?.children || {};
    const childRoutes = Object.values(children);
    const createRoute: any = childRoutes.find((r: any) => 
      r.path && (r.path.endsWith('/new') || r.path.endsWith('/:id'))
    );

    if (createRoute) {
      let path = createRoute.path;
      if (path.endsWith('/:id')) {
        path = path.replace('/:id', '/new');
      }
      
      return {
        ...schema,
        actions: [
          {
            name: 'create',
            label: 'Novo',
            icon: 'add',
            path: path
          }
        ]
      };
    }
  }
  return schema;
});

const computedBasePath = computed(() => {
  if (props.basePath) return props.basePath;

  const children = props.entityRefMap?.children || {};
  const childRoutes = Object.values(children);
  const detailRoute: any = childRoutes.find((r: any) => 
    r.path && r.path.endsWith('/:id')
  );

  if (detailRoute) {
    return detailRoute.path.replace('/:id', '');
  }
  
  return '';
});

const entityRef = reactive(props.entityRefMap?.helper({ _setListOnFetch: props.updateListOnFetch }) || null);

// Use the list composable from listHelpers
const {
  page,
  totalItems,
  totalPages,
  filterValues,
  list,
  processedFilters,
  listFilter,
  combinedFilter,
  fetchList,
  resetFilters,
  goToPage,
  nextPage,
  previousPage,
  setBaseFilter,
  refresh,
  loading,
  loaded,
  error,
} = useList(entityRef, listSchema.value, {
  limit: props.limit,
  autoFetch: true,
  cache: false,
  countMode: 'paralell',
});

// Set base filter if provided
if (props.baseFilter) {
  setBaseFilter(props.baseFilter);
}

// Provide list context to child components
provide('listContext', {
  page,
  totalItems,
  totalPages,
  filterValues,
  list,
  processedFilters,
  listFilter,
  listSchema,
  entitySchema,
  entityRef,
  basePath: props.basePath,
  loading,
  loaded,
  error,
  goToPage,
  nextPage,
  previousPage,
  resetFilters,
  refresh,
});

const handleItemClick = (item: any) => {
  emit('item-click', item);
};

const handleActionClick = (action: any, item?: any) => {
  if (typeof action === 'object' && action.path) {
    router.push(action.path);
    return;
  }
  const actionName = typeof action === 'string' ? action : action.name;
  emit('action-click', actionName, item);
};

onMounted(() => {
  console.log("entityRef", entityRef);
  console.log("listSchema", listSchema.value);
});
</script>
<template>
<div class="list-page-template">
  <!-- Header: Title + Actions -->
  <div class="flex items-center justify-between my-8 ">
    <div :class="typeHeadlineLarge" class="capitalize">
      {{ listSchema.name || entitySchema.name || 'Lista' }}
    </div>
    <div class="flex gap-2">
      <slot name="actions">
        <button 
          v-for="action in listSchema.actions" 
          :key="action.name"
          :class="btnFilled"
          @click="handleActionClick(action)"
        >
          <span v-if="action.icon" class="material-symbols-outlined mr-2">{{ action.icon }}</span>
          {{ action.label || action.name }}
        </button>
      </slot>
    </div>
  </div>

  <!-- Search and Filters -->
  <div v-if="showFilters && processedFilters.length > 0" class="mb-4">
    <ListFilters
      :filters="processedFilters"
      v-model:filterValues="filterValues"
      :main-search-field="entitySchema.displayName"
      @reset="resetFilters"
    />
  </div>

  <!-- Data List -->
  <div class="relative">
    <!-- Loading State -->

    <!-- Error State -->
    <div v-if="error" :class="['text-center py-12', errorMsg]">
      <span class="material-symbols-outlined text-5xl">error</span>
      <p class="mt-4">Erro ao carregar dados</p>
      <button 
        :class="['mt-2', btnFilled]"
        @click="refresh"
      >
        Tentar novamente
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="loaded && list.length === 0" class="text-center py-12 text-on-surface-variant">
      <span class="material-symbols-outlined text-5xl">inbox</span>
      <p class="mt-4">Nenhum item encontrado</p>
    </div>

    <!-- List Content -->
    <ListMain 
      v-else
      :mode="mode" 
      :listSchema="listSchema" 
      :entityRef="entityRef" 
      :entitySchema="entitySchema"
      :items="list"
      :basePath="computedBasePath"
      @item-click="handleItemClick"
    >
      <template #row="{ item }">
        <ListItemRow
          :item="item"
          :tableFields="listSchema.tableFields"
          :basePath="computedBasePath"
          @click="handleItemClick(item)"
        />
      </template>
    </ListMain>
    
    <div class="flex w-full mx-auto mt-4 items-center">
      <div v-if="loading"  :class="['relative inset-0 flex items-center mx-auto justify-center z-10']">
        <span class="material-symbols-outlined text-4xl animate-spin text-primary">
          progress_activity
        </span>
      </div>
        <!-- Pagination -->
      <ListPagination 
        v-if="showPagination && totalPages > 1"
        :page="page"
        :totalPages="totalPages"
        :totalItems="totalItems"
        @update:page="goToPage"
        @next="nextPage"
        @previous="previousPage"
        class="flex-1"
      />
    </div>
 


  
  </div>
</div>
</template>
<style lang="css" scoped> </style>