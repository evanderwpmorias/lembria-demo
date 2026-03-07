<script lang="ts">
import { ref, unref, defineProps, defineModel, watch, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { buildFormSchema, baseItemValue } from '../../../utils/formHelpers'
import ArrayInputHandler from "./ArrayInputHandler.vue";

export default {
  name: 'MdListSelectorWithCreate',
};
</script>

<script setup lang="ts">
interface ListItem {
  _id: string;
  [key: string]: any;
}

const inputText = ref('');
const dropdownOpen = ref(false);
const selectedItem = ref<string | null>(null);
const focusedItem = ref<string | null>(null);
const DBSelectedItems = ref<ListItem[]>([]);
const showCreateDialog = ref(false);
const createFormData = ref<Record<string, any>>({});
const createFormSchema = ref<any[]>([]);
const isCreating = ref(false);
const dialogRef = ref<HTMLDialogElement | null>(null);

const props = defineProps({
  handler: {
    type: Function,
  },
  filterAttr: {
    type: String,
  },
  label: {
    type: String,
    default: 'Search',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  hideInput: {
    type: Boolean,
    default: false,
  },
  allowDuplicate: {
    type: Boolean,
    default: false,
  },
  inputClass: {
    type: String,
    default: "",
  },
  supportingText: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorText: {
    type: String,
    default: "",
  },
  field: {
    type: Object,
    required: true,
  },
  filter: {
    type: String
  },
  allowCreate: {
    type: Boolean,
    default: false,
  },
  createSchema: {
    type: Object,
    default: () => ({}),
  },
});

let modelValue = defineModel<string | string[]>({});

const outputList = defineModel('outputList', {
  type: Array as () => ListItem[],
  default: () => [],
});

// Conditional check before calling props.handler
const searchRef = typeof props.handler === 'function' 
  ? reactive(props.handler({_setListOnFetch: true}))
  : reactive({});

let editTimeInterval: any = null;

const checkInput = async (val: string) => {
  if (val === '') return;
  const { fetchAll } = searchRef;
  if (typeof fetchAll !== 'function') {
    console.warn('fetchAll is not a function', fetchAll);
    return;
  }
  if (editTimeInterval) clearTimeout(editTimeInterval);
  editTimeInterval = setTimeout(async () => {
    if ((props.filterAttr && props.filterAttr.trim() !== '') || (props.field && props.field._schema && props.field._schema.displayName)) {
      const effectiveFilterAttr = (props.filterAttr && props.filterAttr.trim() !== '')
      ? props.filterAttr
      : props.field._schema.displayName;
      let filterStr = `${effectiveFilterAttr.trim()}_contains eq '${val}'`;
      if (props.filter && props.filter.trim() !== '') {
        filterStr += ` and ${props.filter}`;
      }
      const res = await fetchAll(filterStr, 1, 5, {});
      if (res) {
        outputList.value = unref(res.list);
      }
    }
  }, 500);
};

const selectionLabels = computed(() => {
  if (props.field.isArray && Array.isArray(modelValue.value)) {
    return modelValue.value.map((item) => {
      const found = outputList.value.find((el) => el._id === item);
      return found ? found[props.field._schema.displayName] : '';
    });
  }
  const found = outputList.value.find((el) => el._id === modelValue.value);
  return found ? found[props.field._schema.displayName] : '';
});

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const openCreateDialog = () => {
  if (props.createSchema && Object.keys(props.createSchema).length > 0) {
    createFormSchema.value = buildFormSchema(props.createSchema, { 
      inputs: props.createSchema.properties?.map(prop => ({
        schemaProperty: prop.name,
        label: prop.label || prop.name,
        placeholder: prop.placeholder || `Enter ${prop.name}`,
        supportingText: prop.description || '',
        required: prop.required || false,
      })) || []
    });
    createFormData.value = baseItemValue(props.createSchema);
    showCreateDialog.value = true;
    // Use native dialog showModal
    if (dialogRef.value) {
      dialogRef.value.showModal();
    }
  }
};

const closeCreateDialog = () => {
  showCreateDialog.value = false;
  createFormData.value = {};
  isCreating.value = false;
  // Use native dialog close
  if (dialogRef.value) {
    dialogRef.value.close();
  }
};

const createNewItem = async () => {
  if (!props.handler || typeof props.handler !== 'function') {
    console.warn('Handler is required for creating new items');
    return;
  }

  isCreating.value = true;
  try {
    const { create } = searchRef;
    if (typeof create === 'function') {
      const newItem = await create(createFormData.value);
      if (newItem) {
        // Add to output list
        outputList.value.push(newItem);
        DBSelectedItems.value.push(newItem);
        
        // Select the new item
        if (props.field.isArray) {
          if (!Array.isArray(modelValue.value)) modelValue.value = [];
          (modelValue.value as string[]).push(newItem._id);
        } else {
          modelValue.value = newItem._id;
        }
        
        closeCreateDialog();
        inputText.value = '';
        dropdownOpen.value = false;
      }
    }
  } catch (error) {
    console.error('Error creating new item:', error);
  } finally {
    isCreating.value = false;
  }
};

watch(inputText, (val) => { checkInput(val); });

onMounted(async () => {
  const { fetchAll } = searchRef;
  if (typeof fetchAll !== 'function') {
    console.warn('fetchAll is not a function', fetchAll);
    return;
  }
  if(props.field.isArray && !Array.isArray(modelValue.value)) {
    modelValue.value = [];
  }
  if (['pre-load-all', 'pre-load'].includes(props.field.refferenceMode)) {
    const count = props.field.refferenceMode === 'pre-load-all' ? 1000 : 5;
    const filterStr = props.filter?.trim() ? props.filter : '';
    const res = await searchRef.fetchAll(filterStr, 1, count, { cache: true });
    if (res) {
      outputList.value = unref(res.list);
    }
  }
  
  // Fetch selected items
  if (
    modelValue.value &&
    (
      (typeof modelValue.value === 'string' && modelValue.value.trim() !== '') ||
      (Array.isArray(modelValue.value) && modelValue.value.length > 0)
    )
  ) {
    let filterStr = '';
    if (Array.isArray(modelValue.value)) {
      filterStr = modelValue.value
        .map(id => `_id eq '${id}'`)
        .join(' or ');
    } else {
      filterStr = `_id eq '${modelValue.value}'`;
    }

    if (props.filter && props.filter.trim() !== '') {
      filterStr = `(${filterStr}) and (${props.filter.trim()})`;
    }

    const res = await searchRef.fetchAll(filterStr, 1, 1000, { cache: true });
    if (res) {
      DBSelectedItems.value = unref(res.list);
    }
  }
});

onBeforeUnmount(() => {
  if (editTimeInterval) clearTimeout(editTimeInterval);
});

const showLabelByID = (id: string) => {
  const found = DBSelectedItems.value.find((el) => el._id === id);
  return found ? found[props.field._schema.displayName] : ' Unknown';
};

const addSelectedItems = (item: any) => {
  if (!DBSelectedItems.value.some(existingItem => existingItem._id === item._id)) {
    DBSelectedItems.value.push(item);
  }
};

const hasNoResults = computed(() => {
  return inputText.value.length > 0 && outputList.value.length === 0;
});

const showCreateButton = computed(() => {
  // Show create button if:
  // 1. allowCreate is true AND
  // 2. Either no results from search OR using pre-load strategies
  return props.allowCreate && (
    hasNoResults.value || 
    ['pre-load-all', 'pre-load'].includes(props.field.refferenceMode)
  );
});
</script>

<template>
  <div class="dropdown-container">
    <div class="relative" :class="{ 'hidden': !field?.isArray && String(modelValue).length > 0 }">
      <md-outlined-text-field
        type="text"
        :class="inputClass"
        :value="inputText"
        @input="inputText = $event.target.value"
        :label="label"
        inputClass="w-full"
        :placeholder="placeholder"
        :error="error"
        :error-text="errorText"
        :supporting-text="supportingText"
        :readonly="readonly"
        v-if="!hideInput"
        @focus="toggleDropdown"
        class="w-full"
      />
      <button @click="toggleDropdown" type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2">
        <md-icon v-if="!dropdownOpen">arrow_drop_down</md-icon>
        <md-icon v-if="dropdownOpen">arrow_drop_up</md-icon>
      </button>
    </div>

    <!-- Add new item button for pre-load strategies -->
    <div v-if="allowCreate && ['pre-load-all', 'pre-load'].includes(field.refferenceMode)" class="mt-2">
      <md-outlined-button
        @click="openCreateDialog"
        type="button"
        class="w-full flex items-center justify-center gap-2 text-green-600 border-green-600 hover:bg-green-50"
      >
        <md-icon>add</md-icon>
        Add New {{ field._schema?.name || 'Item' }}
      </md-outlined-button>
    </div>

    <!-- Single selection display -->
    <template v-if="!field?.isArray && modelValue">
      <div>{{ label }}</div>
      <div class="flex items-center justify-between rounded-md bg-gray-100 p-2 mt-2">
        {{ showLabelByID(String(modelValue)) }}
        <button @click="modelValue = ''" type="button" class="cursor-pointer flex items-center">
          <md-icon class="text-gray-500 hover:text-gray-700">close</md-icon>
        </button>
      </div>
    </template>

    <!-- Array selection with chips -->
    <div>
      <template v-if="field?.isArray">
        <ArrayInputHandler
          :model-value="(modelValue as string[]) || []"
          @update:model-value="(value: string[]) => modelValue = value"
          :allowDuplicate="allowDuplicate"
          v-slot="{ addEntry, removeEntry }"
        >
          <md-chip-set class="mt-4">
            <md-input-chip
              v-for="(item, index) in selectionLabels"
              :key="index"
              :label="item"
              remove-only="true"
              @remove.prevent="removeEntry(index)"
            />
          </md-chip-set>
          
          <!-- Dropdown for array selection -->
          <div class="mt-2 bg-white rounded-md border overflow-auto max-h-[200px]" v-if="dropdownOpen">
            <div v-for="item in outputList" :key="item._id" class="mb-1" :class="{ 'bg-gray-200': item._id === focusedItem, 'bg-blue-100': item._id === selectedItem }">
              <button 
                @click="addSelectedItems(item); addEntry(item._id); selectedItem = item._id"  
                type="button"   
                class="text-blue-900 w-full text-left block p-2 cursor-pointer hover:underline"
              >
                {{ item[field._schema.displayName] }}
              </button>
            </div>
            
            <!-- Create new item option -->
            <div v-if="showCreateButton" class="border-t">
              <button 
                @click="openCreateDialog" 
                type="button" 
                class="text-green-600 w-full text-left p-2 cursor-pointer hover:bg-green-50 flex items-center gap-2"
              >
                <md-icon>add</md-icon>
                <span v-if="hasNoResults">Create new "{{ inputText }}"</span>
                <span v-else>Create new {{ field._schema?.name || 'item' }}</span>
              </button>
            </div>
          </div>
        </ArrayInputHandler>
      </template>
      
      <!-- Dropdown for single selection -->
      <template v-else>
        <div :class="{ 'hidden': !field?.isArray && String(modelValue).length > 0 }" class="mt-2 bg-white rounded-md border overflow-auto max-h-[200px]">
          <div v-for="item in outputList" :key="item._id" class="mb-1" :class="{ 'bg-gray-200': item._id === focusedItem, 'bg-blue-100': item._id === selectedItem }">
            <button 
              @click="addSelectedItems(item); modelValue = item._id; selectedItem = item._id" 
              type="button"   
              class="text-blue-900 w-full text-left block p-2 cursor-pointer hover:underline"
            >
              {{ item[field._schema.displayName] }}
            </button>
          </div>
          
          <!-- Create new item option for single selection -->
          <div v-if="showCreateButton" class="border-t">
            <button 
              @click="openCreateDialog" 
              type="button" 
              class="text-green-600 w-full text-left p-2 cursor-pointer hover:bg-green-50 flex items-center gap-2"
            >
              <md-icon>add</md-icon>
              <span v-if="hasNoResults">Create new "{{ inputText }}"</span>
              <span v-else>Create new {{ field._schema?.name || 'item' }}</span>
            </button>
          </div>
        </div>
      </template>
    </div>

    <!-- Create Dialog -->
    <dialog 
      ref="dialogRef" 
      class="create-dialog rounded-lg border-0 shadow-xl backdrop:bg-black backdrop:bg-opacity-50"
      @click="(e) => e.target === e.currentTarget && closeCreateDialog()"
      @keydown.esc="closeCreateDialog"
    >
      <div class="p-6 min-w-96 max-w-2xl">
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-900">
            Create New {{ createSchema.name || 'Item' }}
          </h2>
        </div>
        
        <form @submit.prevent="createNewItem" class="space-y-4">
          <div v-for="(fieldSchema, index) in createFormSchema" :key="index">
            <md-outlined-text-field
              :value="createFormData[fieldSchema.schemaProperty]"
              @input="createFormData[fieldSchema.schemaProperty] = $event.target.value"
              :label="fieldSchema.label"
              :placeholder="fieldSchema.placeholder"
              :supporting-text="fieldSchema.supportingText"
              :required="fieldSchema.required"
              class="w-full"
            />
          </div>
          
          <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button 
              type="button"
              @click="closeCreateDialog" 
              :disabled="isCreating"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="isCreating"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg v-if="isCreating" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isCreating ? 'Creating...' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.create-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.create-dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

/* Reset default dialog styles */
.create-dialog {
  border: none;
  padding: 0;
  background: white;
}

/* Animation for dialog open/close */
.create-dialog[open] {
  animation: dialog-fade-in 0.2s ease-out;
}

@keyframes dialog-fade-in {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
