<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/button/filled-button.js';
import '@material/web/progress/circular-progress.js';
import {
  typeBodyLarge,
  typeHeadlineLarge,
  typeLabelLarge,
} from '~/theme/md-theme';
import { useUserStore } from '@/stores/auth';

const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const formError = ref<string | null>(null);
const sent = ref(false);

const loading = computed(() => userStore.loading);
const storeError = computed(() => userStore.error);
const activeError = computed(() => formError.value || storeError.value || '');
const hasError = computed(() => Boolean(activeError.value));
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
  sent.value = false;

  if (!email.value) {
    formError.value = 'Email address is required.';
    return;
  }

  await userStore.resetUserPassword(email.value);
  sent.value = true;
};

definePageMeta({
  layout: 'auth',
});
</script>

<template>
  <section class="grid gap-12 text-on-surface">
    <img class="h-12 w-auto block mx-auto" src="/logo_name.svg" alt="Lembria" />

    <header class="grid gap-1">
      <h1 :class="typeHeadlineLarge">Forgot your password?</h1>
      <p :class="[typeBodyLarge, 'text-on-surface-variant']">
        Enter your email and we&apos;ll send a secure reset link if the account exists.
      </p>
    </header>

    <form class="grid gap-4" @submit.prevent="handleSubmit">
      <p
        v-if="hasError"
        :class="[typeLabelLarge, 'rounded-2xl bg-error-container px-4 py-3.5 text-on-error-container']"
      >
        {{ activeError }}
      </p>

      <p
        v-if="sent"
        :class="[typeLabelLarge, 'rounded-2xl bg-primary-container px-4 py-3.5 text-on-primary-container']"
      >
        If the email exists, a reset link has been sent.
      </p>

      <md-outlined-text-field
        :class="fieldClass"
        label="Email Address"
        type="email"
        autocomplete="email"
        :value="email"
        :error="hasError"
        :error-text="activeError"
        @input="email = ($event.target as HTMLInputElement).value"
      />

      <md-filled-button :class="submitClass" type="submit" :disabled="loading">
        <span class="inline-flex min-w-32 items-center justify-center gap-3 text-base">
          <md-circular-progress
            v-if="loading"
            indeterminate
            class="[--md-circular-progress-size:18px]"
          />
          <span>{{ loading ? 'Sending Reset Link' : 'Send Reset Link' }}</span>
        </span>
      </md-filled-button>
    </form>

    <div class="text-center">
      <p :class="[typeBodyLarge, 'text-on-surface-variant']">
        Remembered your password?
        <NuxtLink
          class="ml-[0.35rem] w-fit font-semibold text-primary no-underline hover:underline hover:underline-offset-[0.2em] focus-visible:rounded-[0.3rem] focus-visible:underline focus-visible:underline-offset-[0.2em] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[0.2rem]"
          to="/sign-in"
        >
          Sign in
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
