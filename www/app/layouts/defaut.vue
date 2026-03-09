<script lang="ts">
export default {
  name: "defaut"
};
</script>
<script setup lang="ts">
// import { NavigationSideBar } from '@/components/core';

</script>

<template>
  <div id=""  class="layout-default ">
  <div class="min-h-screen flex">
    <aside class="w-56 bg-gray-800 text-white sticky top-0 h-screen">
     
    </aside>
    <main class="flex-1 p-6 flex flex-col">
      <div class="flex-1">
        <slot class="flex-1"></slot>
      </div>
      <footer class="text-center">Copyright 2026</footer>
    </main>
  </div>
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here */
.layout-default {
  /* Layout styles */
  
}
</style>