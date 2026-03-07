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
    <ArrayInputHandler
      v-model="modelValue"
      :allowDuplicate="allowDuplicate"
      v-slot="{ addEntry, removeEntry }"
    >
      <md-outlined-text-field
        :type="type"
        :class="inputClass"
        :value="inputValue"
        @input="inputValue = $event.target.value"
        :label="label"
        inputClass="w-full"
        :placeholder="placeholder"
        :error="error"
        :error-text="errorText"
        :supporting-text="supportingText"
        @keyup.enter.prevent="
          addEntry(inputValue);
          inputValue = '';
        "
      />
      <md-chip-set class="mt-4">
        <md-input-chip
          v-for="(item, index) in modelValue"
          :key="index"
          :label="item"
          remove-only="true"
          @remove.prevent="removeEntry(index)"
        >
        </md-input-chip>
      </md-chip-set>
    </ArrayInputHandler>
  </div>
</template>
