<script setup lang="ts">
import { computed } from 'vue'
import { card, cardEleveted } from '~/theme/md-theme'

interface TableField {
  name: string
  type: string
  label?: string
}

interface ListItem {
  _id: string
  [key: string]: any
}

const props = defineProps<{
  items: ListItem[]
  tableFields: TableField[]
  loading?: boolean
  emptyMessage?: string
  emptyIcon?: string
  onItemClick?: (item: ListItem) => void
}>()

const emit = defineEmits<{
  'item-click': [item: ListItem]
}>()

const handleItemClick = (item: ListItem) => {
  if (props.onItemClick) {
    props.onItemClick(item)
  }
  emit('item-click', item)
}

const formatFieldValue = (item: ListItem, field: TableField) => {
  const value = item[field.name]
  
  if (value === null || value === undefined) return '-'
  
  if (field.type === 'boolean') {
    return value ? 'Sim' : 'Não'
  }
  
  if (field.type === 'date') {
    return new Date(value).toLocaleDateString('pt-AO')
  }
  
  if (field.type === 'url' && value) {
    return 'Ver'
  }
  
  return String(value)
}

const fieldLabel = (field: TableField) => {
  return field.label || field.name.charAt(0).toUpperCase() + field.name.slice(1)
}
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <span class="material-symbols-outlined text-5xl animate-spin text-light-primary dark:text-dark-primary">
        progress_activity
      </span>
      <p class="mt-4 text-light-on-surface-variant dark:text-dark-on-surface-variant">
        Carregando...
      </p>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="items.length === 0"
      class="text-center py-12 text-light-on-surface-variant dark:text-dark-on-surface-variant"
    >
      <span class="material-symbols-outlined text-5xl">
        {{ emptyIcon || 'inbox' }}
      </span>
      <p class="mt-4">{{ emptyMessage || 'Nenhum item encontrado' }}</p>
    </div>

    <div v-else>
      <!-- List View (Mobile) -->
      <div class="md:hidden space-y-4">
        <div
          v-for="item in items"
          :key="item._id"
          :class="[card, 'bg-light-surface dark:bg-dark-surface', cardEleveted]"
          class="cursor-pointer transition-shadow"
          @click="handleItemClick(item)"
        >
          <div
            v-for="field in tableFields.slice(0, 3)"
            :key="field.name"
            class="mb-2 last:mb-0"
          >
            <span class="text-sm text-light-on-surface-variant dark:text-dark-on-surface-variant">
              {{ fieldLabel(field) }}:
            </span>
            <span class="ml-2 font-medium">
              {{ formatFieldValue(item, field) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Table View (Desktop) -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full">
          <thead class="bg-neutral-variant-20 dark:bg-neutral-20">
            <tr>
              <th
                v-for="field in tableFields"
                :key="field.name"
                class="px-4 py-3 text-left text-sm font-semibold"
              >
                {{ fieldLabel(field) }}
              </th>
              <th class="px-4 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item._id"
              class="border-b border-light-outline dark:border-dark-outline hover:bg-neutral-variant-20 dark:hover:bg-neutral-20 cursor-pointer transition-colors"
              @click="handleItemClick(item)"
            >
              <td
                v-for="field in tableFields"
                :key="field.name"
                class="px-4 py-3"
              >
                <img
                  v-if="field.type === 'url' && item[field.name]"
                  :src="item[field.name]"
                  :alt="field.name"
                  class="w-10 h-10 object-contain rounded"
                />
                <span v-else>{{ formatFieldValue(item, field) }}</span>
              </td>
              <td class="px-4 py-3">
                <span class="material-symbols-outlined text-light-on-surface-variant dark:text-dark-on-surface-variant">
                  chevron_right
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
