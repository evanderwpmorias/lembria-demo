<script lang="ts">
export default {
  name: "listItemRow",
};
</script>
<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

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
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  basePath: '',
  clickable: true,
});

const emit = defineEmits<{
  'click': [item: ListItem];
}>();

const router = useRouter();

const handleClick = (e: Event) => {
  if (!props.clickable) return;

  if (props.basePath && props.item._id) {
    const path = `${props.basePath}/${props.item._id}`;
    const isCtrl = (e as MouseEvent).ctrlKey || (e as MouseEvent).metaKey;
    
    if (isCtrl) {
      const route = router.resolve(path);
      window.open(route.href, '_blank');
    } else {
      router.push(path);
    }
  } else {
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
  
  if (field.type === 'url' && value) {
    return 'Ver';
  }
  
  if (field.type === 'number') {
    return Number(value).toLocaleString('pt-AO');
  }
  
  return String(value);
};

const isImageField = (field: TableField): boolean => {
  return field.type === 'url' && !!props.item[field.name];
};
</script>
<template>
  <tr 
    :class="[
      'hover:bg-light-surface-variant dark:hover:bg-dark-surface-variant transition-colors',
      clickable ? 'cursor-pointer' : ''
    ]"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    role="link"
    tabindex="0"
  >
    <td v-for="field in tableFields" :key="field.name" class="px-6 py-4">
      <!-- Image -->
      <img
        v-if="isImageField(field)"
        :src="item[field.name]"
        :alt="field.name"
        class="w-10 h-10 object-contain rounded"
      />
      <!-- Boolean with icon -->
      <span v-else-if="field.type === 'boolean'" class="flex items-center">
        <span 
          class="material-symbols-outlined text-lg"
          :class="item[field.name] ? 'text-green-500' : 'text-red-500'"
        >
          {{ item[field.name] ? 'check_circle' : 'cancel' }}
        </span>
      </span>
      <!-- URL link -->
      <a 
        v-else-if="field.type === 'url' && item[field.name]"
        :href="item[field.name]"
        target="_blank"
        class="text-light-primary dark:text-dark-primary hover:underline"
        @click.stop
      >
        Ver
      </a>
      <!-- Default text -->
      <span v-else>{{ formatFieldValue(field) }}</span>
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
      <slot name="actions" :item="item"></slot>
    </td>
  </tr>
</template>
<style lang="css" scoped> </style>