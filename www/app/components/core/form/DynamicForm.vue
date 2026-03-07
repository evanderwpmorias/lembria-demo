<script setup lang="ts">
import { reactive, defineProps, computed } from "vue";

const props = defineProps({
  schema: {
    type: Object,
    required: false,
    default: () => {
      return;
    },
  },
});

const schema = computed(() => props.schema || {});

const formData = reactive({});

const handleSubmit = () => {
  console.log(formData);
  // Handle form submission, e.g., send data to an API
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="(field, fieldName) in schema.properties" :key="fieldName">
      {{ field }}
      <label class="block text-2xl" :for="fieldName">{{ field.name }}</label>
      <input
        class="border-2 border-gray-300 p-2"
        v-if="
          field.type === 'string' ||
          field.type === 'number' ||
          field.type === 'date' ||
          field.type === 'email' ||
          field.type === 'password'
        "
        :type="field.type"
        :name="fieldName"
        v-model="formData[fieldName]"
      />

      <select
        v-else-if="field.type === 'enum'"
        :name="fieldName"
        v-model="formData[fieldName]"
      >
        <option
          v-for="(option, index) in field.enum"
          :key="index"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>
