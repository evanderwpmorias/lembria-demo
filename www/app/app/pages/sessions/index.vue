<script setup lang="ts">

import listPageTemplate from '@/components/templates/listPageTemplate.vue';
import { sessionsRouteSchema } from '~/data/routes';

</script>

<template>
  <div id="sessions-list"  class="layout-sessionslist ">
  <div class="min-content-height">
    <list-page-template :entity-ref-map="sessionsRouteSchema" :user="{}" :view-only="false"></list-page-template>
  </div>
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here */
.layout-sessionslist {
  /* Layout styles */
  
}
</style>
