<script lang="ts">
export default {
  name: "ArraySelect"
};
</script>
<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from "vue";
import ArrayInputHandler from "./ArrayInputHandler.vue";

const props = defineProps({
  allowDuplicate: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    required: true,
  },
  enum: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: "text",
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
  label: {
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
});

const modelValue = defineModel({ type: Array, default: () => [] });
const inputValue = ref("");

// Updated computed property for selectOptions with filtering when duplicates not allowed
const selectOptions = computed(() => {
  let options = props.enum?.length > 0 
    ? props.enum.split(',').map(item => ({ value: item.trim(), label: item.trim() }))
    : props.options;
  if(!props.allowDuplicate){
    return options.filter(option => !modelValue.value.includes(option.value));
  }
  return options;
});
</script>

<template>
  <div>
    <!-- Render label if provided -->
    <label v-if="label" class="block mb-1">{{ label }}</label>
    <ArrayInputHandler
      v-model="modelValue"
      :allowDuplicate="allowDuplicate"
      v-slot="{ addEntry, removeEntry }"
    >
      <!-- Add data attribute for type and bind inputClass with error styling -->
      <select
        v-model="inputValue"
        @change="addEntry(inputValue)"
        :data-type="type"
        :class="[inputClass, error ? 'border-red-500' : '']"
      >
        <!-- Add placeholder option if provided -->
        <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
        <option
          v-for="(item, index) in selectOptions"
          :key="index"
          :value="item.value"
        >
          {{ item.label }}
        </option>
      </select>
      <!-- Render supporting text if provided -->
      <p v-if="supportingText" class="text-sm text-gray-500 mt-1">{{ supportingText }}</p>
      <!-- Render error text if error is true -->
      <p v-if="error && errorText" class="text-sm text-red-500 mt-1">{{ errorText }}</p>
      <ul class="flex flex-wrap">
        <li
          class="rounded-md bg-blue-500 text-white px-2 py-1"
          v-for="(item, index) in modelValue"
          :key="index"
        >
          {{ item }}
          <button type="button" @click="removeEntry(index)">
            <span class="material-symbols-outlined"> backspace </span>
          </button>
        </li>
      </ul>
    </ArrayInputHandler>
  </div>
</template>
