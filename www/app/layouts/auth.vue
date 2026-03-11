<script lang="ts">
export default {
  name: "auth"
};
</script>
<script setup lang="ts">

</script>

<template>
  <div id=""  class="layout-auth ">
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-lg bg-white shadow rounded p-8 min-h-[300px]" action="">
      <slot class="text-2xl mb-4"></slot>
    </div>
  </div>
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here */
.layout-auth {
  /* Layout styles */
  
}
</style>
