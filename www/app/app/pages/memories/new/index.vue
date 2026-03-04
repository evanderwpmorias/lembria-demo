<script setup lang="ts">

import { computed } from 'vue';
import { useRoute } from 'vue-router';

import formPageTemplate from '@/components/templates/formPageTemplate.vue';
import { memoriesRouteSchema } from '~/data/routes';

const route = useRoute();
const idParam = computed(() => String(route.params.id || ''))

// View memories
// definePageMeta({
//   layout: false // This is a layout firl name when available in the data
// });

</script>

<template>
  <div id="memories-form"  class="layout-memoriesform ">
  <form-page-template :entity-ref-map="memoriesRouteSchema" :user="{}" :view-only="false" :id="idParam"></form-page-template>
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here */
.layout-memoriesform {
  /* Layout styles */
  
}
</style>
