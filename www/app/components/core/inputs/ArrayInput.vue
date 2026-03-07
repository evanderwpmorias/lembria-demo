<script lang="ts">
export default {
  name: "ArrayInput"
};
</script>
<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import ArrayInputHandler from "./ArrayInputHandler.vue";

const props = defineProps({
  allowDuplicate: {
    type: Boolean,
    default: false,
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
</script>

<template>
  <div>
    <!-- Display label if provided -->
    <label v-if="label">{{ label }}</label>
    <ArrayInputHandler
      v-model="modelValue"
      :allowDuplicate="allowDuplicate"
      v-slot="{ addEntry, removeEntry }"
    >
      <input
        :type="type"
        :class="inputClass"
        :placeholder="placeholder"
        v-model="inputValue"
        @keyup.enter.prevent="
          addEntry(inputValue);
          inputValue = '';
        "
      />
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
