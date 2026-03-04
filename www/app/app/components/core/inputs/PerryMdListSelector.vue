<script lang="ts">
import { ref, unref, defineProps, defineModel, watch, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { mdTextFieldInput, mdTextField, mdTextFieldLabel, chip, chipFilled, chipOutlined, button, filled } from '@/theme/md-theme'
import ArrayInputHandler from "./ArrayInputHandler.vue";


export default {
  name: 'LsitSelector',
};
</script>

<script setup lang="ts">
const inputText = ref('');
const dropdownOpen = ref(false);
const selectedItem = ref(null); // Add this line
const focusedItem = ref(null); // Add this line
const DBSelectedItems = ref([]);

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
});

 let modelValue = defineModel({});

const outputList = defineModel('outputList', {
  type: Array,
  default: () => [],
});

// Conditional check before calling props.handler
const searchRef = typeof props.handler === 'function' 
  ? reactive(props.handler({_setListOnFetch: true}))
  : reactive({});

let editTimeInterval: any = null

const checkInput = async (val: string) => {
  if (val === '') return;
  const { fetchAll } = searchRef;
  if (typeof fetchAll !== 'function') {
    console.warn('fetchAll is not a function', fetchAll);
    return;
  }
  if (editTimeInterval) clearTimeout(editTimeInterval);
  console.log('timeInterval set')
  editTimeInterval = setTimeout(async () => {
    console.log('something Is missing')
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
  if (props.field.isArray) {
    console.log('modelValue.value', modelValue.value)
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

watch(inputText, (val) => { checkInput(val); });
onMounted(async () => {
  const { fetchAll } = searchRef;
  if (typeof fetchAll !== 'function') {
    console.warn('fetchAll is not a function', fetchAll);
    return;
  }
  if(props.field.isArray && !modelValue.value) {
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
  // New code: If modelValue is set as a non-empty string or non-empty array, fetch DB items where _id equals media value.
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

    // append props.filter if provided
    if (props.filter && props.filter.trim() !== '') {
      // wrap ID filters in () to ensure proper precedence
      filterStr = `(${filterStr}) and (${props.filter.trim()})`;
    }

    const res = await searchRef.fetchAll(filterStr, 1, 1000, { cache: true });
    if (res) {
      DBSelectedItems.value = unref(res.list);
    }
  }
});

onBeforeUnmount(() => {

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
</script>

<template>

  <div class=" dropdown-container">
    <div class="relative" :class="{ 'hidden': !field?.isArray  && String(modelValue).length > 0 }">

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
        <md-icon v-if="!dropdownOpen" >arrow_drop_down</md-icon>
        <md-icon v-if="dropdownOpen" >arrow_drop_up</md-icon>
      </button>
      <template v-if="inputText.length > 0">
        <slot :outputList="outputList"></slot>
      </template>
    </div>

    <template v-if="!field?.isArray  && modelValue ">
      <div>
        {{label}}
      </div>
      <div class="flex items-center justify-between rounded-md bg-gray-100 p-2 mt-2">
        {{ showLabelByID(String(modelValue)) }}
        <button @click="modelValue = ''" type="button" class="cursor-pointer flex items-center">
          <md-icon class="text-gray-500 hover:text-gray-700">
            close
          </md-icon>
        </button>
      </div>
    </template>

    <div >
      <template v-if="field?.isArray">
        <ArrayInputHandler
        v-model="modelValue"
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
              >
              </md-input-chip>
            </md-chip-set>
            <div class="mt-2 bg-white rounded-md border overflow-auto max-h-[200px]" v-if="dropdownOpen">

              <div v-for="item in outputList" :key="item._id" class="mb-1" :class="{ 'bg-gray-200': item._id === focusedItem, 'bg-blue-100': item._id === selectedItem }">
          
                <button @click="addSelectedItems(item); addEntry(item._id); selectedItem = item._id"  type="button"   class="text-blue-900 w-full text-left block p-2 cursor-pointer hover:underline">{{ item[field._schema.displayName] }}</button>
              </div>

            </div>

        </ArrayInputHandler>
      </template>
      <template v-else>
            <div :class="{ 'hidden': !field?.isArray  && String(modelValue).length > 0 }" class="mt-2 bg-white rounded-md border overflow-auto max-h-[200px]">
                <div v-for="item in outputList" :key="item._id" class="mb-1" :class="{ 'bg-gray-200': item._id === focusedItem, 'bg-blue-100': item._id === selectedItem }">
          
                  <button @click="addSelectedItems(item); modelValue = item._id; selectedItem = item._id" type="button"   class="text-blue-900 w-full text-left block p-2 cursor-pointer hover:underline">{{ item[field._schema.displayName] }}</button>
                </div>

            </div>
      </template>
    </div>

  </div>
</template>

<style scoped>
/* Add styles for the icons if needed */
</style>
