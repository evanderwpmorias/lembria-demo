<script lang="ts">
export default {
  name: "SimpleTableLayout",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    schema: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    caption: {
      type: String,
      default: ''
    },
    displayName: {
      type: Function,
      default: (item: any) => item.name || item.title || 'Untitled'
    }
  },
  emits: ['row-click', 'sort'],
  setup(props, { emit }) {
    const handleRowClick = (item: any) => {
      emit('row-click', item);
    };

    const handleSort = (field: string) => {
      emit('sort', field, 'asc');
    };

    return {
      handleRowClick,
      handleSort
    };
  }
};
</script>

<template>
  <div class="table-layout overflow-x-auto">
    <table class="w-full text-sm text-left">
      <caption v-if="caption" class="sr-only">{{ caption }}</caption>
      
      <caption v-if="loading" class="py-4 text-center text-gray-500">
        <div class="flex items-center justify-center gap-2">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          Loading...
        </div>
      </caption>

      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th 
            v-for="field in schema" 
            :key="field.name"
            scope="col"
            class="px-6 py-3 cursor-pointer hover:bg-gray-100"
            @click="handleSort(field.name)"
          >
            {{ field.label || field.name }}
          </th>
        </tr>
      </thead>

      <tbody class="bg-white divide-y divide-gray-200">
        <tr 
          v-for="(item, index) in data" 
          :key="index"
          class="hover:bg-gray-50 cursor-pointer"
          @click="handleRowClick(item)"
        >
          <td 
            v-for="field in schema" 
            :key="field.name"
            class="px-6 py-4 whitespace-nowrap"
          >
            {{ item[field.name] || '' }}
          </td>
        </tr>

        <tr v-if="!loading && data.length === 0">
          <td 
            :colspan="schema.length"
            class="px-6 py-8 text-center text-gray-500"
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
  --cell-padding: theme('spacing.4');
}

@media (prefers-reduced-motion: reduce) {
  .animate-spin {
    animation: none !important;
  }
}
</style>
