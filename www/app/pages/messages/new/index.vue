<script setup lang="ts">

import { computed } from 'vue';
import { useRoute } from 'vue-router';

import formPageTemplate from '@/components/templates/formPageTemplate.vue';
import { messagesRouteSchema } from '~/data/routes';

const route = useRoute();
const idParam = computed(() => String(route.params.id || ''))

// View messages
// definePageMeta({
//   layout: false // This is a layout firl name when available in the data
// });

</script>

<template>
  <div id="messages-form"  class="layout-messagesform ">
  <form-page-template :entity-ref-map="messagesRouteSchema" :user="{}" :view-only="false" :id="idParam"></form-page-template>
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here */
.layout-messagesform {
  /* Layout styles */
  
}
</style>
