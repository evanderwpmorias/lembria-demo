<script setup lang="ts">

import listPageTemplate from '@/components/templates/listPageTemplate.vue';
import { familiesRouteSchema } from '~/data/routes';

</script>

<template>
  <div id="families-list"  class="layout-familieslist ">
  <div class="min-content-height">
    <list-page-template :entity-ref-map="familiesRouteSchema" :user="{}" :view-only="false"></list-page-template>
  </div>
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here */
.layout-familieslist {
  /* Layout styles */
  
}
</style>
