<script setup lang="ts">

import { computed } from 'vue';
import { useRoute } from 'vue-router';

import formPageTemplate from '@/components/templates/formPageTemplate.vue';
import { storiesRouteSchema } from '~/data/routes';

const route = useRoute();
const idParam = computed(() => String(route.params.id || ''))

// View stories
// definePageMeta({
//   layout: false // This is a layout firl name when available in the data
// });

</script>

<template>
  <div id="stories-form"  class="layout-storiesform ">
  <form-page-template :entity-ref-map="storiesRouteSchema" :user="{}" :view-only="false" :id="idParam"></form-page-template>
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here */
.layout-storiesform {
  /* Layout styles */
  
}
</style>
