<script lang="ts">
export default {
  name: "ArrayInputHandler"
};
</script>
<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  allowDuplicate: {
    type: Boolean,
    default: false,
  },
});

const modelValue = defineModel({ type: Array, default: () => [] });
const emit = defineEmits(["update:modelValue"]);
const addEntry = (string) => {
  if (string && (props.allowDuplicate || !modelValue.value.includes(string))) {
    modelValue.value.push(string);
  }
};

const removeEntry = (index: number) => {
  modelValue.value.splice(index, 1);
};
</script>

<template>
  <slot :remove-entry="removeEntry" :addEntry="addEntry"></slot>
</template>
