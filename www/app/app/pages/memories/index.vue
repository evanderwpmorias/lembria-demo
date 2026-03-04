<script setup lang="ts">

import listPageTemplate from '@/components/templates/listPageTemplate.vue';
import { memoriesRouteSchema } from '~/data/routes';

</script>

<template>
  <div id="memories-list"  class="layout-memorieslist ">
  <div class="min-content-height">
    <list-page-template :entity-ref-map="memoriesRouteSchema" :user="{}" :view-only="false"></list-page-template>
  </div>
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here */
.layout-memorieslist {
  /* Layout styles */
  
}
</style>
