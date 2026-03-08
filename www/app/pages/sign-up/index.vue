<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/auth';
import { firebaseSettings } from '@/utils/firebase/config';

const router = useRouter();
const userStore = useUserStore();

const fullName = ref('');
const email = ref('');
const password = ref('');
const formError = ref<string | null>(null);

const loading = computed(() => userStore.loading);
const storeError = computed(() => userStore.error);
const redirectPath = firebaseSettings.redirectPath || '/';

const handleSubmit = async () => {
  formError.value = null;
  if (!email.value || !password.value) {
  formError.value = 'Email and password are required.';
  return;
  }

  await userStore.registerUser(email.value, password.value);
  await router.push(redirectPath);
};

definePageMeta({
  layout: 'auth',
})
</script>

<template>
  <div class="layout-authsignup">
  <div class="container py-12 mx-auto">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold">Sign UP</h1>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-md p-6">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <p v-if="formError || storeError" class="text-sm text-red-600">
            {{ formError || storeError }}
          </p>
          <div class="form-group">
            <label class="block text-sm font-medium mb-1" for="signup-name">Full Name</label>
            <input
              id="signup-name"
              v-model="fullName"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              type="text"
              autocomplete="name"
            />
          </div>
          <div class="form-group">
            <label class="block text-sm font-medium mb-1" for="signup-email">Email</label>
            <input
              id="signup-email"
              v-model="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              type="email"
              autocomplete="email"
            />
          </div>
          <div class="form-group">
            <label class="block text-sm font-medium mb-1" for="signup-password">Password</label>
            <input
              id="signup-password"
              v-model="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              type="password"
              autocomplete="new-password"
            />
          </div>
          <div class="flex items-center justify-between text-sm">
            <NuxtLink class="text-blue-600 hover:underline" to="/sign-in">
              Already have an account?
            </NuxtLink>
          </div>
          <div class="flex justify-end space-x-2">
            <button
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              type="button"
              :disabled="loading"
              @click="router.push('/')"
            >
              Cancel
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-md" type="submit" :disabled="loading">
              {{ loading ? 'Creating...' : 'Create Account' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<style scoped>
/* Add any layout-specific styles here */
.layout-authsignup {
  /* Layout styles */
  
}
</style>
