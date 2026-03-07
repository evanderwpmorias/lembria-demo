<script lang="ts">
export default {
  name: "ListDemo",
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import BaseEntries from './baseEntries.vue';

// Sample data for demo
const sampleData = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', active: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', active: false },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', active: true },
]);

// Schema definition
const schema = [
  { name: 'name', label: 'Name', type: 'string' },
  { name: 'email', label: 'Email', type: 'string' },
  { name: 'role', label: 'Role', type: 'string' },
  { name: 'active', label: 'Active', type: 'boolean' },
];

const handleRowClick = (item: any) => {
  console.log('Row clicked:', item);
};

const handleSort = (field: string, direction: 'asc' | 'desc') => {
  console.log('Sort:', field, direction);
};
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">List Component Demo</h1>
    
    <BaseEntries
      :data="sampleData"
      :entity-schema="schema"
      :title-field="'name'"
      :caption="'User Management Table'"
      view-mode="table"
      density="comfortable"
      @row-click="handleRowClick"
      @sort-change="handleSort"
    />
  </div>
</template>

<style>
/* Add any custom styles here */
</style>
