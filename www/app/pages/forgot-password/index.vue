<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/auth';

const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const formError = ref<string | null>(null);
const sent = ref(false);

const loading = computed(() => userStore.loading);
const storeError = computed(() => userStore.error);

const handleSubmit = async () => {
  formError.value = null;
  sent.value = false;
  if (!email.value) {
  formError.value = 'Email is required.';
  return;
  }

  await userStore.resetUserPassword(email.value);
  sent.value = true;
};
definePageMeta({
  layout: 'auth',
})
</script>

<template>
  <div class="layout-authforgotpassword">
  <div class="container py-12 mx-auto">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold">Forgot Password</h1>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-md p-6">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <p v-if="formError || storeError" class="text-sm text-red-600">
            {{ formError || storeError }}
          </p>
          <p v-if="sent" class="text-sm text-green-600">
            If the email exists, a reset link has been sent.
          </p>
          <div class="form-group">
            <label class="block text-sm font-medium mb-1" for="forgot-email">Email</label>
            <input
              id="forgot-email"
              v-model="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              type="email"
              autocomplete="email"
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              type="button"
              :disabled="loading"
              @click="router.push('/sign-in')"
            >
              Back
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-md" type="submit" :disabled="loading">
              {{ loading ? 'Sending...' : 'Send Reset Link' }}
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
.layout-authforgotpassword {
  /* Layout styles */
  
}
</style>
