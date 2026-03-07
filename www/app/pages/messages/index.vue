<script setup lang="ts">

import listPageTemplate from '@/components/templates/listPageTemplate.vue';
import { messagesRouteSchema } from '~/data/routes';

</script>

<template>
  <div id="messages-list"  class="layout-messageslist ">
  <div class="min-content-height">
    <list-page-template :entity-ref-map="messagesRouteSchema" :user="{}" :view-only="false"></list-page-template>
  </div>
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here */
.layout-messageslist {
  /* Layout styles */
  
}
</style>
