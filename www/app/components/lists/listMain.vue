<script lang="ts">
export default {
  name: "listMain",
};
</script>
<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { type listsType, type entitiesType } from '~/utils/types';

interface TableField {
  name: string;
  type: string;
  label?: string;
}

interface ListItem {
  _id: string;
  [key: string]: any;
}

interface Props {
  mode?: 'table' | 'card' | 'list';
  listSchema: listsType;
  entitySchema?: entitiesType;
  entityRef?: any;
  items: ListItem[];
  basePath?: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'table',
  basePath: '',
  loading: false,
});

const emit = defineEmits<{
  'item-click': [item: ListItem];
}>();

const router = useRouter();

const tableFields = computed<TableField[]>(() => {
  return props.listSchema?.tableFields || [];
});

const handleItemClick = (item: ListItem, e?: Event) => {
  if (props.basePath && item._id) {
    const path = `${props.basePath}/${item._id}`;
    const isCtrl = e && ((e as MouseEvent).ctrlKey || (e as MouseEvent).metaKey);
    
    if (isCtrl) {
      const route = router.resolve(path);
      window.open(route.href, '_blank');
    } else {
      router.push(path);
    }
  } else {
    emit('item-click', item);
  }
};

const formatFieldValue = (item: ListItem, field: TableField): string => {
  const value = item[field.name];
  
  if (value === null || value === undefined) return '-';
  
  if (field.type === 'boolean') {
    return value ? 'Sim' : 'Não';
  }
  
  if (field.type === 'date') {
    return new Date(value).toLocaleDateString('pt-AO');
  }
  
  if (field.type === 'url' && value) {
    return 'Ver';
  }
  
  return String(value);
};

const fieldLabel = (field: TableField): string => {
  return field.label || field.name.charAt(0).toUpperCase() + field.name.slice(1);
};
</script>
<template>
  <div class="list-main bg-surface shadow-sm rounded-lg overflow-hidden">
    <!-- Table Mode -->
    <div v-if="mode === 'table'" class="overflow-x-auto">
      <table class="w-full text-sm text-left ">
        <thead class="text-xs text-on-surface-variant py-4 rounded-lg uppercase bg-surface-variant dark:bg-surface-variant">
          <tr>
            <th 
              v-for="field in tableFields" 
              :key="field.name"
              class="px-6 py-5 font-bold"
            >
              {{ fieldLabel(field) }}
            </th>
            <th class="px-6 py-3 w-12"></th>
          </tr>
        </thead>
        <tbody class="divide-y text-on-surface divide-outline-variant">
          <slot name="row" v-for="item in items" :key="item._id" :item="item">
            <tr 
              class="hover:bg-light-surface-variant dark:hover:bg-dark-surface-variant cursor-pointer transition-colors"
              @click="handleItemClick(item, $event)"
              @keydown.enter.prevent="handleItemClick(item, $event)"
              role="link"
              tabindex="0"
            >
              <td v-for="field in tableFields" :key="field.name" class="px-6 py-4">
                <img
                  v-if="field.type === 'url' && item[field.name]"
                  :src="item[field.name]"
                  :alt="field.name"
                  class="w-10 h-10 object-contain rounded"
                />
                <span v-else>{{ formatFieldValue(item, field) }}</span>
              </td>
              <td class="px-6 py-4">
                <router-link 
                  v-if="basePath && item._id"
                  :to="`${basePath}/${item._id}`" 
                  class="text-light-primary dark:text-dark-primary hover:underline"
                  @click.stop
                >
                  <span class="material-symbols-outlined">chevron_right</span>
                </router-link>
              </td>
            </tr>
          </slot>
        </tbody>
      </table>
    </div>

    <!-- Card Mode -->
    <div v-else-if="mode === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <slot name="card" v-for="item in items" :key="item._id" :item="item">
        <div 
          class="p-4 rounded-lg bg-light-surface dark:bg-dark-surface shadow cursor-pointer hover:shadow-md transition-shadow"
          @click="handleItemClick(item, $event)"
          @keydown.enter.prevent="handleItemClick(item, $event)"
          role="link"
          tabindex="0"
        >
          <div v-for="field in tableFields.slice(0, 4)" :key="field.name" class="mb-2 last:mb-0">
            <span class="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant">
              {{ fieldLabel(field) }}:
            </span>
            <span class="ml-2 font-medium">
              {{ formatFieldValue(item, field) }}
            </span>
          </div>
          <router-link 
            v-if="basePath && item._id"
            :to="`${basePath}/${item._id}`" 
            class="mt-3 inline-block text-light-primary dark:text-dark-primary hover:underline text-sm"
            @click.stop
          >
            Ver detalhes →
          </router-link>
        </div>
      </slot>
    </div>

    <!-- List Mode -->
    <div v-else class="space-y-2">
      <slot name="list-item" v-for="item in items" :key="item._id" :item="item">
        <div 
          class="flex items-center justify-between p-4 rounded bg-light-surface dark:bg-dark-surface hover:bg-light-surface-variant dark:hover:bg-dark-surface-variant cursor-pointer transition-colors"
          @click="handleItemClick(item, $event)"
          @keydown.enter.prevent="handleItemClick(item, $event)"
          role="link"
          tabindex="0"
        >
          <div class="flex-1">
            <div v-if="tableFields[0]" class="font-medium">
              {{ item[tableFields[0].name] || '-' }}
            </div>
            <div v-if="tableFields[1]" class="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant">
              {{ item[tableFields[1].name] || '-' }}
            </div>
          </div>
          <router-link 
            v-if="basePath && item._id"
            :to="`${basePath}/${item._id}`" 
            class="text-light-primary dark:text-dark-primary"
            @click.stop
          >
            <span class="material-symbols-outlined">chevron_right</span>
          </router-link>
        </div>
      </slot>
    </div>

    <!-- Default slot for custom content -->
    <slot></slot>
  </div>
</template>
<style lang="css" scoped> </style>