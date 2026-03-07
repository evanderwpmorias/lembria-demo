<script setup lang="ts">

import { computed } from 'vue';
import { useRoute } from 'vue-router';

import formPageTemplate from '@/components/templates/formPageTemplate.vue';
import { memoriesRouteSchema } from '~/data/routes';

const route = useRoute();
const idParam = computed(() => String(route.params.id || ''))
        
</script>

<template>
  <div id="memories-view"  class="layout-memoriesview ">
  <form-page-template :entity-ref-map="memoriesRouteSchema" :user="{}" :view-only="false" :id="idParam"></form-page-template>
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here */
.layout-memoriesview {
  /* Layout styles */
  
}
</style>
