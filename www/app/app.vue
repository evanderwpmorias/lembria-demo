<script setup lang="ts">
// import '~/theme/theme.css'
import '~/assets/theme/main.css'
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/auth';
// import { getIdTokenResult } from 'firebase/auth';
// // import { useUserStore } from '@/stores/auth';
// import { getCurrentUser } from '@/utils/firebase/auth';

// const router = useRouter();
// const route = useRoute();
// const userStore = useUserStore();
// const _sessionToken = useCookie('__session');

// const authPages = ['/sign-in', '/sign-up', '/forgot-password', '/reset-password'];
// const isAuthPage = authPages.some((page) => route.path.startsWith(page));

// let user = getCurrentUser();

const userStore = useUserStore();



onMounted(async () => {
  userStore.initAuth();

})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

html {
  scroll-behavior: smooth;
}
</style>