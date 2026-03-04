<script setup lang="ts">

import listPageTemplate from '@/components/templates/listPageTemplate.vue';
import { usersRouteSchema } from '~/data/routes';

</script>

<template>
  <div id="users-list"  class="layout-userslist ">
  <div class="min-content-height">
    <list-page-template :entity-ref-map="usersRouteSchema" :user="{}" :view-only="false"></list-page-template>
  </div>
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here */
.layout-userslist {
  /* Layout styles */
  
}
</style>
