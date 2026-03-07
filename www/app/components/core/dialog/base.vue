<!-- accordiong component, with title icon and contnt -->
<script lang="ts">
export default {
  name: "dialog-Base"
};
</script>

<script setup lang="ts">
import { ref, Ref, watch, toRef } from "vue";

const props = defineProps({
  startOpen: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const openState = defineModel({
  type: Boolean,
  required: false,
  default: false,
  validator: (value: boolean) => {
    return typeof value === "boolean";
  },
});
const target: Ref<HTMLDialogElement | null> = ref(null);
const isOpen = ref(props.startOpen);
const setRef = () => {
  if (!isOpen.value) {
    target.value?.close();
  } else {
    target.value?.showModal();
  }
};
const toggle = () => {
  isOpen.value = !isOpen.value;
  setRef();
};
const close = () => {
  isOpen.value = false;
  setRef();
};
const setTarget = (el: any) => {
  target.value = el;
  setRef();
};
watch(isOpen, (newVal) => {
  if (openState.value !== newVal) {
    console.log("isOpen changed", newVal);
    openState.value = newVal;
  }
  setRef();
});



watch(openState, (newVal) => {
  console.log("openState changed", newVal);
  if (newVal !== isOpen.value) {
    isOpen.value = newVal;
  }
});
</script>

<template>
  <slot
    :target="target"
    :is-open="isOpen"
    :set-target="setTarget"
    :close="close"
    :toggle="toggle"
  >
  </slot>
</template>
