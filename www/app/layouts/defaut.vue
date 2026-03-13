<script lang="ts">
export default {
  name: "defaut"
};
</script>
<script setup lang="ts">

</script>

<template>
  <div id="" class="layout-default min-h-screen ">
    <CustomMainHeader />
      <main class="min-h-screen flex flex-col">
        <div class="flex-1">
          <slot class="flex-1"></slot>
        </div>
      </main>
    <CustomFooter />
  </div>
</template>
