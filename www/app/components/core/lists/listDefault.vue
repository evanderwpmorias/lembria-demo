<script lang="ts">
export default {
  name: "listDefault",
};
</script>
<script setup lang="ts">
import { ref, computed, watch, onMounted, unref } from 'vue';
import  { mdTextFieldInput, mdTextField, mdTextFieldLabel } from '@/theme/md-theme'


const page = ref(1);
const totalItems = ref(0);
const totalPages = ref(0);
const filterValues:any = ref({});

const props = defineProps({
  entityRef: {
    type: Object,
    required: true,
  },
  list: {
    type: Array,
    required: true
  },
  basePath: {
    type: String,
    required: false,
    default: '',
  },
  setListFnc: {
    type: Function,
    required: true,
    default: () => {},
  },
  showFilters: {
    type: Boolean,
    required: false,
    default: true,
  },
  filter: {
    type: String,
    required: false,
    default: '',
  },
  expand: {
    type: Array,
    required: false
  },
  limit: {
    type: Number,
    required: false,
    default: 10,
  },
  listShema: {
    type: Object,
    required: true,
  },
  displayList: {
    type: Boolean,
    required: false,
    default: true,
  },
  displayFilters: {
    type: Boolean,
    required: false,
    default: true,
  } 
});

const list: any = computed(() => {
  return props.list;
});


const filters = computed(() => {
  return props.listShema.filterSchema.map((filter: any) => {
    if ('field' in filter && filter.field?.type === "enum") {
      const enumValues = String(filter.field?.enum || "").split(",");
     
      const options = enumValues.map((option: any) => {
        return {
          value: option,
          label: option,
        };
      });
      return {
        ...filter,
        field: {
          ...filter.field,
          options,
        },
        inputTypes: "select",
      };
    }
    return filter
  });
});

const filterValuesToOdata = (values:any = {} , fields: any = []) => {
  let output = ''
  let lastEntry = ''
  fields.forEach((filter: any, index: number) => {
    const previourFilter = props.listShema.filterSchema[index - 1]
    const nextFilter = props.listShema.filterSchema[index + 1]
    const isValid = (value: any) => {
      // disallow empty strings, undefined, null, and empty arrays
      return value !== '' && value !== undefined && value !== null  ||  (Array.isArray(value) && value.length > 0)

    }
    isValid(filterValues.value[filter.field?.name as any])
    if ('field' in filter ) {
      const field = filter.field
      let value =   filterValues.value[field.name] 
      if (isValid(value)) {
        value = ['number', 'boolean'].includes(field.type) ? value : `'${value}'`
        output += `${field?.name} ${filter.operator} ${value}`
        lastEntry = 'filter'
      }
    }

    if ((previourFilter || nextFilter) && 'logicOperators' in filter) {
      const previourValue = filterValues.value[previourFilter.field?.name as any]
      const nextValue = filterValues.value[nextFilter.field?.name as any]

      if ((isValid(previourValue) && isValid(nextValue)) || (lastEntry === 'filter' && isValid(nextValue))) {
        output += ` ${filter.logicOperators} `
        lastEntry = 'logic'
      }
      
    }
  })
  return output;
}
const listFilter = computed(() => {
  return filterValuesToOdata(filterValues, props.listShema.filterSchema)
});

const fetchList = async () => {
  try {
    let filterQuery = props.filter.length > 0 ? `${props.filter}` : ''
    if (listFilter.value.length > 0) {
      filterQuery += filterQuery.length > 0 ? ` and ${listFilter.value}` : listFilter.value
    }

    const response: any = await props.entityRef.fetchAll(
      filterQuery || "",
      page.value,
      props.limit,
      { cache: false, countMode: "paralell" }
    );
    if (response) {
      console.log("response", response);

      const { list: items, totalItems: tI, totalPages: tp } = response;
      props.setListFnc(items.value || []);
      if (page.value === 1 && items.value.length > 0) {
        console.log("tI", tI);
        console.log("tp", tp);
        totalItems.value = (tI || 0); 
        totalPages.value = (tp || 1);
      }
    }
    return response;
  } catch (error) {
    console.error(error);
    // Optionally handle the error here.
  }
};

onMounted(async () => {
  await fetchList();
});

watch(page, async (nv: any, ov:any) => {
  if (nv) {
    await fetchList();
  }
}, { immediate: false, deep: true });
watch(filterValues, async (nv: any, ov:any) => {
  if (nv) {
    await fetchList();
  }

}, { immediate: false, deep: true });


</script>
<style>

</style>



<template>

   
    <div class="relative overflow-x-auto">
        <div v-if="listShema.filterSchema.length > 0 && showFilters" class="filters gap-4 mb-4 grid grid-cols-2 lg:grid-cols-4">
          <template v-for="(filter, index) in filters" :key="index" >
            <div v-if="'field' in filter" :class="mdTextField">
              <label :for="filter.field.name" class=" capitalize">{{ filter.field.name }}</label>
              <input
                class="block w-full"
                :class="mdTextFieldInput"
                v-if="filter.inputTypes === 'input'"
                :type="filter.field.type === 'email' ? 'email' : 'text'"
                :id="filter.field.name"
                v-model="filterValues[filter.field.name]"
              />
              <select
                class="block w-full"
                  :class="mdTextFieldInput"
                v-else-if="filter.inputTypes === 'select'"
                :id="filter.field.name"
                v-model="filterValues[filter.field.name]"
              >
                <option value="">Select</option>
                <option
                  v-for="(option, index) in filter.field?.options"
                  :key="index"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>

          </template>
        </div>
        
        <table v-if="displayList" class="w-full text-sm text-left rtl:text-right text-black">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th class="px-6 py-3" v-for="field in listShema.tableFields" :key="field.name">{{ field.name }}</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr class="p-4"  v-for="listItem, index in list" :key="`entry-${index}`">
              <td class="px-6 py-2" v-for="field in listShema.tableFields" :key="field.name">
                <span v-if="field.name && listItem">
                  {{ listItem[field.name] }}
                </span>
              </td>
              <td v-if="listItem && listItem._id">
                <router-link :to="basePath + '/' + listItem._id" class="text-blue-500 hover:text-blue-700">View</router-link>
              </td>
            </tr>
            <tr v-if="list.length === 0 && entityRef.listLoadable.loaded">
              <td :colspan="listShema.tableFields.length" class="p-4 min-h-[90px] text-lg py-24 text-center align-middle ">
                No items found.
              </td>

            </tr>
            <tr v-if="entityRef.listLoadable.loading">
              <td :colspan="listShema.tableFields.length" class="p-4 min-h-[90px] text-center align-middle ">
                <!-- <LoadingAnimation
                  class="w-24 block mx-auto"
                  /> -->
              </td>
            </tr>
            <tr >
              <td :colspan="listShema.tableFields.length" class="p-4 min-h-[90px] text-center align-middle ">

                
          
                <nav aria-label="Page navigation example">
                  <ul class="inline-flex -space-x-px text-sm ">
                    <li 
                    >
                      <button
                      :disabled="page <= 1"
                      @click="page--"
                      class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500  border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                    </li>
                    <li v-for="p in totalPages" :key="`page-${p}`">
                      <button  @click="page = p" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"> {{ p }}</button>
                    </li>
                    <li >
                      <button 
                          :disabled="page >= totalPages"
                          @click="page++" 
                          class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                    </li>
                  </ul>
                </nav>

              </td>

            </tr>
          </tbody>
        </table>

    </div>

</template>

<style>

</style>
