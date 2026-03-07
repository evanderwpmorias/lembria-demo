<!-- accordiong component, with title icon and contnt -->
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  open: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const isOpen = ref(props.open);
const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div>
    <slot :is-open="isOpen" :toggle="toggle"> </slot>
  </div>
</template>
