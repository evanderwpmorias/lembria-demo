<script lang="ts">
export default {
  name: "defaultFormLayout",
};
</script>
<script setup lang="ts">
import { ref, defineProps, computed, onMounted } from "vue";
import materialInputList from "./inputs/materialInputList.vue";
import { baseItemValue } from "@/utils/formHelpers";


const props = defineProps({
  form: {
    type: Object,
    required: false,
    default: () => {},
  },
  id: {
    type: String,
    required: false,
    default: '',
  },
  schema: {
    type: Object,
    required: false,
    default: () => {},
  },
  dependencyHelpers: {
    type: Object,
    required: false,
    default: () => {},
  },
  dependencyFilters: {
    type: Object,
    required: false,
    default: () => {},
  },
  loadable: {
    type: Object,
    required: false,
    default: () => {
      return { loading: true, error: {} };
    },
  },
  meta: {
    type: Array,
    required: false,
    default: () => [],
  },
  onSave: {
    type: Function,
    required: false,
    default: () => {},
  },
  focusInput: {
    type: String,
    required: false,
    default: "",
  },
});



const schema = computed(() => props.schema || {});
const form = computed(() => props.form || {});
const meta = computed(() => props.meta || []);
const loadable: any = computed(() => props.loadable);
const focusMode = computed(() => props.focusInput.length > 0);

const formData = defineModel({ type: Object });
const formSchema: any = ref([]);

const setFormData = () => {
  if (formData.value && Object.keys(formData.value).length > 0) {
    return;
  }
  
  // Ensure schema is valid before processing
  if (!schema.value || !schema.value.properties) {
    formData.value = {};
    return;
  }
  
  formData.value = baseItemValue(schema.value);
};

const handleSubmit = () => {
  if (props.onSave) {
    props.onSave(formData.value);
  }
};

onMounted(() => {
  // formSchema.value = z(schema.value, form.value);
  if (!props.id) {

    setFormData();
  }
});
</script>

<template>
  <form @submit.prevent="handleSubmit()">
    <div class="mb-8" v-if="!focusMode">
      <h1 class="block text-3xl">{{ form.title }}</h1>
      <p>{{ form.supportingText }}</p>
    </div>
    

    <materialInputList
      v-if="form.inputs && form.inputs.length > 0 && formData"
      :form="form"
      :schema="schema"
      v-model="formData"
      :loadable="loadable"
      :focusInput="focusInput"
      :dependencyHelpers="dependencyHelpers"
      :dependencyFilters="dependencyFilters"
    ></materialInputList>

    <md-elevated-button
      :disabled="loadable.loading"
      type="submit"
      class="w-full uppercase"
      v-if="!focusMode"
    >
      <div class="flex gap-3 items-center">
        <md-circular-progress
          style="--md-circular-progress-size: 24px"
          indeterminate
          v-if="loadable.loading"
        />
        <span>Save</span>
      </div>
    </md-elevated-button>
  </form>
</template>
