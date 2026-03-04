<script setup lang="ts">

import { computed } from 'vue';
import { useRoute } from 'vue-router';

import formPageTemplate from '@/components/templates/formPageTemplate.vue';
import { personsRouteSchema } from '~/data/routes';

const route = useRoute();
const idParam = computed(() => String(route.params.id || ''))

// View persons
// definePageMeta({
//   layout: false // This is a layout firl name when available in the data
// });

</script>

<template>
  <div id="persons-form"  class="layout-personsform ">
  <form-page-template :entity-ref-map="personsRouteSchema" :user="{}" :view-only="false" :id="idParam"></form-page-template>
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here */
.layout-personsform {
  /* Layout styles */
  
}
</style>
