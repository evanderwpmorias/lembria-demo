<script setup lang="ts">

import { computed } from 'vue';
import { useRoute } from 'vue-router';

import formPageTemplate from '@/components/templates/formPageTemplate.vue';
import { storiesRouteSchema } from '~/data/routes';

const route = useRoute();
const idParam = computed(() => String(route.params.id || ''))
        
</script>

<template>
  <div id="stories-view"  class="layout-storiesview ">
  <form-page-template :entity-ref-map="storiesRouteSchema" :user="{}" :view-only="false" :id="idParam"></form-page-template>
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here */
.layout-storiesview {
  /* Layout styles */
  
}
</style>
