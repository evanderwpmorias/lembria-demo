<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/button/filled-button.js';
import '@material/web/progress/circular-progress.js';
import {
  typeBodyLarge,
  typeHeadlineLarge,
  typeLabelLarge,
} from '~/theme/md-theme';
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
const activeError = computed(() => formError.value || storeError.value || '');
const hasError = computed(() => Boolean(activeError.value));
const redirectAuthPath = firebaseSettings.redirectAuthPath || '/sign-in';
const fieldClass = [
  'w-full',
  '[--md-outlined-text-field-container-shape:1rem]',
  '[--md-outlined-text-field-focus-outline-color:var(--md-sys-color-primary)]',
  '[--md-outlined-text-field-hover-outline-color:var(--md-sys-color-on-surface)]',
  '[--md-outlined-text-field-outline-color:var(--md-sys-color-outline)]',
  '[--md-outlined-text-field-input-text-color:var(--md-sys-color-on-surface)]',
  '[--md-outlined-text-field-label-text-color:var(--md-sys-color-on-surface-variant)]',
  '[--md-outlined-text-field-focus-label-text-color:var(--md-sys-color-primary)]',
  '[--md-outlined-text-field-supporting-text-color:var(--md-sys-color-error)]',
  '[--md-outlined-text-field-error-focus-outline-color:var(--md-sys-color-error)]',
  '[--md-outlined-text-field-error-hover-outline-color:var(--md-sys-color-error)]',
].join(' ');
const submitClass = [
  'mt-2',
  'w-full',
  '[--md-filled-button-container-height:3.5rem]',
  '[--md-filled-button-container-shape:999px]',
  '[--md-filled-button-label-text-font:var(--font-body)]',
  '[--md-filled-button-label-text-size:0.95rem]',
  '[--md-filled-button-label-text-weight:600]',
  '[--md-filled-button-container-color:var(--md-sys-color-primary)]',
  '[--md-filled-button-label-text-color:var(--md-sys-color-on-primary)]',
].join(' ');

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
});
</script>

<template>
  <section class="grid gap-12 text-on-surface">
    <img class="h-12 w-auto block mx-auto" src="/logo_name.svg" alt="Lembria" />

    <header class="grid gap-1">
      <h1 :class="typeHeadlineLarge">Choose a new password</h1>
      <p :class="[typeBodyLarge, 'text-on-surface-variant']">
        Enter your new password twice so we can confirm the reset securely.
      </p>
    </header>

    <form class="grid gap-4" @submit.prevent="handleSubmit">
      <p
        v-if="hasError"
        :class="[typeLabelLarge, 'rounded-2xl bg-error-container px-4 py-3.5 text-on-error-container']"
      >
        {{ activeError }}
      </p>

      <md-outlined-text-field
        :class="fieldClass"
        label="New Password"
        type="password"
        autocomplete="new-password"
        :value="newPassword"
        :error="hasError"
        :error-text="activeError"
        @input="newPassword = ($event.target as HTMLInputElement).value"
      />

      <md-outlined-text-field
        :class="fieldClass"
        label="Repeat New Password"
        type="password"
        autocomplete="new-password"
        :value="confirmPassword"
        :error="hasError"
        :error-text="activeError"
        @input="confirmPassword = ($event.target as HTMLInputElement).value"
      />

      <md-filled-button :class="submitClass" type="submit" :disabled="loading">
        <span class="inline-flex min-w-32 items-center justify-center gap-3 text-base">
          <md-circular-progress
            v-if="loading"
            indeterminate
            class="[--md-circular-progress-size:18px]"
          />
          <span>{{ loading ? 'Saving Password' : 'Reset Password' }}</span>
        </span>
      </md-filled-button>
    </form>

    <div class="text-center">
      <p :class="[typeBodyLarge, 'text-on-surface-variant']">
        Need to start over?
        <NuxtLink
          class="ml-[0.35rem] w-fit font-semibold text-primary no-underline hover:underline hover:underline-offset-[0.2em] focus-visible:rounded-[0.3rem] focus-visible:underline focus-visible:underline-offset-[0.2em] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[0.2rem]"
          to="/forgot-password"
        >
          Request another link
        </NuxtLink>
      </p>
      <button
        class="mt-4 inline-flex w-fit justify-center font-semibold text-primary no-underline hover:underline hover:underline-offset-[0.2em] focus-visible:rounded-[0.3rem] focus-visible:underline focus-visible:underline-offset-[0.2em] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[0.2rem]"
        type="button"
        @click="router.push('/sign-in')"
      >
        Back to sign in
      </button>
    </div>
  </section>
</template>
