<script setup lang="ts">

import listPageTemplate from '@/components/templates/listPageTemplate.vue';
import { personsRouteSchema } from '~/data/routes';

</script>

<template>
  <div id="persons-list"  class="layout-personslist ">
  <div class="min-content-height">
    <list-page-template :entity-ref-map="personsRouteSchema" :user="{}" :view-only="false"></list-page-template>
  </div>
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here */
.layout-personslist {
  /* Layout styles */
  
}
</style>
