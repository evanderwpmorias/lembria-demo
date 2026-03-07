<script setup lang="ts">

import listPageTemplate from '@/components/templates/listPageTemplate.vue';
import { storiesRouteSchema } from '~/data/routes';

</script>

<template>
  <div id="stories-list"  class="layout-storieslist ">
  <div class="min-content-height">
    <list-page-template :entity-ref-map="storiesRouteSchema" :user="{}" :view-only="false"></list-page-template>
  </div>
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here */
.layout-storieslist {
  /* Layout styles */
  
}
</style>
