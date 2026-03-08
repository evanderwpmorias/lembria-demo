<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/auth';
import { firebaseSettings } from '@/utils/firebase/config';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const newPassword = ref('');
const confirmPassword = ref('');
const formError = ref<string | null>(null);

const loading = computed(() => userStore.loading);
const storeError = computed(() => userStore.error);
const redirectAuthPath = firebaseSettings.redirectAuthPath || '/sign-in';

const handleSubmit = async () => {
  formError.value = null;
  const oobCode = route.query.oobCode as string | undefined;

  if (!oobCode) {
  formError.value = 'Reset code is missing.';
  return;
  }

  if (!newPassword.value || !confirmPassword.value) {
  formError.value = 'Please enter and confirm your new password.';
  return;
  }

  if (newPassword.value !== confirmPassword.value) {
  formError.value = 'Passwords do not match.';
  return;
  }

  await userStore.confirmUserPasswordReset(oobCode, newPassword.value);
  await router.push(redirectAuthPath);
};
definePageMeta({
  layout: 'auth',
})
</script>

<template>
  <div class="layout-resetpassword">
  <div class="container py-12 mx-auto">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold">Reset Password</h1>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-md p-6">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <p v-if="formError || storeError" class="text-sm text-red-600">
            {{ formError || storeError }}
          </p>
          <div class="form-group">
            <label class="block text-sm font-medium mb-1" for="reset-password">New Password</label>
            <input
              id="reset-password"
              v-model="newPassword"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              type="password"
              autocomplete="new-password"
            />
          </div>
          <div class="form-group">
            <label class="block text-sm font-medium mb-1" for="reset-password-confirm">Repeat New Password</label>
            <input
              id="reset-password-confirm"
              v-model="confirmPassword"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              type="password"
              autocomplete="new-password"
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button class="px-4 py-2 bg-blue-600 text-white rounded-md" type="submit" :disabled="loading">
              {{ loading ? 'Saving...' : 'Reset Password' }}
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
.layout-resetpassword {
  /* Layout styles */
  
}
</style>
