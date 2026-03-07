
<script setup lang="ts">
import { ref, defineProps, computed, onMounted, watch, reactive } from "vue";
import { useRouter } from 'vue-router';
import defaultLayout from "@/components/forms/defaultLayout.vue";
import listPageTemplate from "@/components/templates/listPageTemplate.vue";
import { typeHeadlineLarge } from "~/theme/md-theme";

const props:any = defineProps({
  entityRefMap: {
    type: Object,
    required: false,
    default: () => {},
  },
  id: {
    type: String,
    required: false,
    default: "",
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
});

const router = useRouter();

const entitySchema = computed(() => {
  return props.entityRefMap?.schema || {};
});

const formConfig = computed(() => {
  return props.entityRefMap?.formSchema || {};
});

const computedBasePath = computed(() => {
  return props.entityRefMap?.path || '/';
});

const isCreate = computed(() => {
	const val = props.id?.toLowerCase() || ''
	return val === 'create' || val === 'new'
})


const entityRef = reactive(props.entityRefMap?.helper ? props.entityRefMap.helper({ _initData: false }) : {});

let formData = ref({});
const loadable = computed(() => entityRef?.itemLoadable || { loading: false, error: {} });
const dependencyHelpers = computed(() => entityRef?._dependencyHelpers || {});

const loadData = async () => {  
  if (!isCreate.value && props.id && entityRef?.fetchOne) {
    const res = await entityRef.fetchOne(props.id);
    if (res?.itemData) {
      formData.value = res.itemData;
    }
  } else {
    formData.value = entityRef?.getDefaultData ? {...entityRef.getDefaultData(), _id: undefined} : { };
  }
};

const handleSave = async (data: any) => {
  if (!entityRef?.save) return;
  
  let res;
  if (isCreate.value) {
    res = await entityRef.save(data);
  } else {
    if (entityRef.update) {
        res = await entityRef.update(data, props.id);
    } else {
        res = await entityRef.save(data);
    }
  }
  if (res?.success) {
    const { id: newId, item, message } = res;
    router.push(`${computedBasePath.value}` + (newId ? `/${newId || item?._id}` : ''));
  }
  console.log('Save result:', res);
};

onMounted(() => {
  loadData();
});

</script>
<template>
  
  <div>
    <div class=" mt-12 mb-8 gap-3 text-sm text-gray-500 flex gap-1 items-center">
      <router-link :to="computedBasePath" class="flex items-center">
        <span class="material-symbols-outlined">list</span>
      </router-link>  /
      <h1 :class="typeHeadlineLarge" class="-mt-1">{{ isCreate ? 'Create' : 'Edit' }} <span class="capitalize">{{ entitySchema?.name || 'Item' }}</span></h1>
    </div>

    
  
 
    <defaultLayout
    :form="formConfig"
    :schema="entitySchema"
    v-model="formData"
    :loadable="loadable"
    :onSave="handleSave"
    :id="id == 'create' || id == 'new' ? '' : id"
    :dependencyHelpers="dependencyHelpers"
  />
  </div>
</template>
<style lang="css" scoped>   </style>