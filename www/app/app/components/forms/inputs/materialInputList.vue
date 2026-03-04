<script lang="ts">
export default {
  name: "materialInputList",
};
</script>
<script setup lang="ts">
import { ref, defineProps, computed, onMounted, watch } from "vue";
import materialInputs from "./materialInputs.vue";
import { buildFormSchema, baseItemValue } from "@/utils/formHelpers";


const props = defineProps({
  form: {
    type: Object,
    required: false,
    default: () => {},
  },
  schema: {
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
  focusInput: {
    type: String,
    required: false,
    default: "",
  },
  nested: {
    type: Boolean,
    default: false,
  },
});

const schema = computed(() => props.schema || {});
const form = computed(() => props.form || {});
const loadable: any = computed(() => props.loadable);

const formData = defineModel({ type: Object, default: () => ({}) });
const formSchema: any = ref([]);

if (props.nested === false && props.form.inputs.length > 0) {
  watch(
    form,
    () => {
      if (!form.value) {
        return;
      }
      formSchema.value = buildFormSchema(schema.value, form.value, props.dependencyHelpers);
    },
    { deep: true }
  );
}

const showInput = (schemaProperty: string) => {
  if (props.focusInput.length > 0 && props.focusInput !== schemaProperty) {
    return false;
  }
  return true;
};

onMounted(() => {
  formSchema.value = buildFormSchema(schema.value, form.value, props.dependencyHelpers);
});
const addArrayItem = (array: any, schema: any) => {
  array.push(baseItemValue(schema));
  formData.value = { ...formData.value };
};
const removeArrayItem = (array: any, index: number) => {
  array.splice(index, 1);
  formData.value = { ...formData.value };
};
</script>

<template>
  <div
    v-for="(field, index) in formSchema"
    class="mb-6"
    :key="`fields-${index}`"
  >
    <template v-if="showInput(field.schemaProperty)">
      <template v-if="field.inputs && field.inputs.length > 0">
        <div>
          <h2 class="text-lg font-bold">
            {{ field.label }}
          </h2>
          <span class="text-sm block">{{ field.supportingText }}</span>
        </div>
        <div class="pl-4 py-4" v-if="field.isArray">
          <div
            v-for="(item, index) in formData[field.schemaProperty]"
            :key="index"
          >
            <materialInputList
              :form="field"
              :schema="field._schema"
              v-model="formData[field.schemaProperty][index]"
              :nested="true"
              :dependencyHelpers="dependencyHelpers"
              :dependencyFilters="dependencyFilters?.[field.schemaProperty]"
            ></materialInputList>
            <button
              type="button"
              @click="removeArrayItem(formData[field.schemaProperty], index)"
            >
              remove
            </button>
          </div>
          <button
            type="button"
            @click="addArrayItem(formData[field.schemaProperty], field._schema)"
          >
            Add
          </button>
        </div>
        <div v-else>
          <materialInputList
            :form="field"
            :schema="field._schema"
            v-model="formData[field.schemaProperty]"
            :loadable="loadable?.error?.[field.schemaProperty]"
            :nested="true"
            :dependencyHelpers="dependencyHelpers"
            :dependencyFilters="dependencyFilters?.[field.schemaProperty]"
          ></materialInputList>
        </div>
      </template>
      <template v-else>
        <materialInputs
          :field="field"
          v-model="formData[field.schemaProperty]"
          :helpers="dependencyHelpers"
          :filters="dependencyFilters"
          :error="
            loadable.error &&
            loadable?.error[field.schemaProperty]?._errors &&
            loadable?.error[field.schemaProperty]?._errors.length > 0
          "
          :error-text="
            loadable.error  &&
            loadable?.error[field.schemaProperty]?._errors &&
            loadable?.error[field.schemaProperty]?._errors.length > 0 ? String(loadable?.error[field.schemaProperty]?._errors[0]) ?? '' : ''
          "
        />
      </template>
    </template>
  </div>
</template>
