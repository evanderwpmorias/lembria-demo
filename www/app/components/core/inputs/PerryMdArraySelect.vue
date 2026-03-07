<script lang="ts">
export default {
  name: "MdArraySelect"
};
</script>
<script setup lang="ts">
import { ref, computed, defineProps } from "vue";
import ArrayInputHandler from "./ArrayInputHandler.vue";

const props = defineProps({
  allowDuplicate: {
    type: Boolean,
    default: false,
  },
  // New props to support material select options
  options: {
    type: Array,
    default: () => [],
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

// Compute options for the material select with duplicate filtering
const selectOptions = computed(() => {
  let opts = props.enum?.length > 0 
    ? props.enum.split(',').map(item => ({ value: item.trim(), label: item.trim() }))
    : props.options;
  if (!props.allowDuplicate) {
    return opts.filter(option => !modelValue.value.includes(option.value));
  }
  return opts;
});
</script>

<template>
  <div>
    <ArrayInputHandler
      v-model="modelValue"
      :allowDuplicate="allowDuplicate"
      v-slot="{ addEntry, removeEntry }"
    >
      <!-- Material select instead of text field -->
      <md-outlined-select
        :value="inputValue"
        @input="inputValue = $event.target.value"
        :label="label"
        inputClass="w-full"
        :placeholder="placeholder"
        :error="error"
        :error-text="errorText"
        :supporting-text="supportingText"
        @change="addEntry(inputValue)"
      >
        <!-- Placeholder option -->
        <md-select-option v-if="placeholder" disabled value="">
          {{ placeholder }}
        </md-select-option>
        <!-- Options -->
        <md-select-option
          v-for="(item, index) in selectOptions"
          :key="index"
          :value="item.value"
        >
          {{ item.label }}
        </md-select-option>
      </md-outlined-select>
      <!-- Display selected items -->
      <md-chip-set class="mt-4">
        <md-input-chip
          v-for="(item, index) in modelValue"
          :key="index"
          :label="item"
          remove-only="true"
          @remove.prevent="removeEntry(index)"
        ></md-input-chip>
      </md-chip-set>
    </ArrayInputHandler>
  </div>
</template>
