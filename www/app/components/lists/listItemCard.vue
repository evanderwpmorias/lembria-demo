<script lang="ts">
export default {
  name: "listItemCard",
};
</script>
<script setup lang="ts">
import { computed } from 'vue';
import { card, cardEleveted } from '~/theme/md-theme';

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
  item: ListItem;
  tableFields: TableField[];
  basePath?: string;
  maxFields?: number;
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  basePath: '',
  maxFields: 4,
  clickable: true,
});

const emit = defineEmits<{
  'click': [item: ListItem];
}>();

const visibleFields = computed(() => {
  return props.tableFields.slice(0, props.maxFields);
});

const handleClick = () => {
  if (props.clickable) {
    emit('click', props.item);
  }
};

const formatFieldValue = (field: TableField): string => {
  const value = props.item[field.name];
  
  if (value === null || value === undefined) return '-';
  
  if (field.type === 'boolean') {
    return value ? 'Sim' : 'Não';
  }
  
  if (field.type === 'date') {
    return new Date(value).toLocaleDateString('pt-AO');
  }
  
  if (field.type === 'datetime') {
    return new Date(value).toLocaleString('pt-AO');
  }
  
  if (field.type === 'number') {
    return Number(value).toLocaleString('pt-AO');
  }
  
  return String(value);
};

const fieldLabel = (field: TableField): string => {
  return field.label || field.name.charAt(0).toUpperCase() + field.name.slice(1);
};

const isImageField = (field: TableField): boolean => {
  return field.type === 'url' && !!props.item[field.name];
};
</script>
<template>
  <div 
    :class="[card, cardEleveted, 'bg-light-surface dark:bg-dark-surface transition-shadow']"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    @click="handleClick"
    @keydown.enter="handleClick"
  >
    <!-- Image header if first field is an image -->
    <div 
      v-if="isImageField(tableFields[0])" 
      class="aspect-video w-full overflow-hidden rounded-t-lg mb-3"
    >
      <img
        :src="item[tableFields[0].name]"
        :alt="tableFields[0].name"
        class="w-full h-full object-cover"
      />
    </div>
    
    <!-- Card content -->
    <div class="p-4">
      <div v-for="field in visibleFields" :key="field.name" class="mb-2 last:mb-0">
        <!-- Skip if it's the image field already shown -->
        <template v-if="!isImageField(field)">
          <span class="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant">
            {{ fieldLabel(field) }}:
          </span>
          <span class="ml-2 font-medium">
            {{ formatFieldValue(field) }}
          </span>
        </template>
      </div>
      
      <!-- Actions slot -->
      <div class="mt-3 flex items-center justify-between">
        <router-link 
          v-if="basePath && item._id"
          :to="`${basePath}/${item._id}`" 
          class="text-light-primary dark:text-dark-primary hover:underline text-sm inline-flex items-center gap-1"
          @click.stop
        >
          Ver detalhes
          <span class="material-symbols-outlined text-base">arrow_forward</span>
        </router-link>
        <slot name="actions" :item="item"></slot>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped> </style>