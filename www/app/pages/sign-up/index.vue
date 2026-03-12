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
import { firebaseSettings } from '@/utils/firebase/config';

const router = useRouter();
const userStore = useUserStore();

const fullName = ref('');
const email = ref('');
const password = ref('');
const formError = ref<string | null>(null);

const loading = computed(() => userStore.loading);
const storeError = computed(() => userStore.error);
const activeError = computed(() => formError.value || storeError.value || '');
const hasError = computed(() => Boolean(activeError.value));
const redirectPath = firebaseSettings.redirectPath || '/';
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

  if (!email.value || !password.value) {
    formError.value = 'Email address and password are required.';
    return;
  }

  await userStore.registerUser(email.value, password.value);
  await router.push(redirectPath);
};

definePageMeta({
  layout: 'auth',
});
</script>

<template>
  <section class="grid gap-12 text-on-surface">
    <img class="h-12 w-auto block mx-auto" src="/logo_name.svg" alt="Lembria" />

    <header class="grid gap-1">
      <h1 :class="typeHeadlineLarge">Create your account</h1>
      <p :class="[typeBodyLarge, 'text-on-surface-variant']">
        Start collecting the people, stories, and memories you want to keep close.
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
        label="Full Name (optional)"
        type="text"
        autocomplete="name"
        :value="fullName"
        @input="fullName = ($event.target as HTMLInputElement).value"
      />

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

      <md-outlined-text-field
        :class="fieldClass"
        label="Password"
        type="password"
        autocomplete="new-password"
        :value="password"
        :error="hasError"
        :error-text="activeError"
        @input="password = ($event.target as HTMLInputElement).value"
      />

      <md-filled-button :class="submitClass" type="submit" :disabled="loading">
        <span class="inline-flex min-w-32 items-center justify-center gap-3 text-base">
          <md-circular-progress
            v-if="loading"
            indeterminate
            class="[--md-circular-progress-size:18px]"
          />
          <span>{{ loading ? 'Creating Account' : 'Create Account' }}</span>
        </span>
      </md-filled-button>
    </form>

    <div class="text-center">
      <p :class="[typeBodyLarge, 'text-on-surface-variant']">
        Already have an account?
        <NuxtLink
          class="ml-[0.35rem] w-fit font-semibold text-primary no-underline hover:underline hover:underline-offset-[0.2em] focus-visible:rounded-[0.3rem] focus-visible:underline focus-visible:underline-offset-[0.2em] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[0.2rem]"
          to="/sign-in"
        >
          Sign in
        </NuxtLink>
      </p>
      <NuxtLink
        class="mt-4 inline-flex w-fit justify-center font-semibold text-primary no-underline hover:underline hover:underline-offset-[0.2em] focus-visible:rounded-[0.3rem] focus-visible:underline focus-visible:underline-offset-[0.2em] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[0.2rem]"
        to="/"
      >
        Return home
      </NuxtLink>
    </div>
  </section>
</template>
