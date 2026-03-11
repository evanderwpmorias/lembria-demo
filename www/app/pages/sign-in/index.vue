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

const email = ref('');
const password = ref('');
const formError = ref<string | null>(null);

const loading = computed(() => userStore.loading);
const storeError = computed(() => userStore.error);
const activeError = computed(() => formError.value || storeError.value || '');
const hasError = computed(() => Boolean(activeError.value));
const redirectPath = firebaseSettings.redirectPath || '/';
const googleIcon = computed(() => (loading.value ? '/logo_google_gray.svg' : '/logo_google.svg'));
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

  await userStore.loginUser(email.value, password.value);
  await router.push(redirectPath);
};

const handleGoogle = async () => {
  formError.value = null;

  await userStore.loginWithGoogle();
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
      <h1 :class="typeHeadlineLarge">Sign in</h1>
      <p :class="[typeBodyLarge, 'text-on-surface-variant']">
        to continue exploring your shared stories and memories.
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
        autocomplete="current-password"
        :value="password"
        :error="hasError"
        :error-text="activeError"
        @input="password = ($event.target as HTMLInputElement).value"
      />

      <md-filled-button :class="submitClass" type="submit" :disabled="loading">
        <span class="inline-flex min-w-32 text-base items-center justify-center gap-3">
          <md-circular-progress
            v-if="loading"
            indeterminate
            class="[--md-circular-progress-size:18px]"
          />
          <span>{{ loading ? 'Signing In' : 'Sign In' }}</span>
        </span>
      </md-filled-button>

      <button
        type="button"
        :disabled="loading"
        class="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-outline bg-secondary-100 px-1 text-neutral-10 transition-[border-color,box-shadow,background-color,color] duration-200 ease-in-out hover:border-[#d3e3fd] hover:bg-[#f8fbff] hover:shadow-[0_1px_2px_rgba(66,133,244,0.15)] active:border-[#d3e3fd] active:bg-secondary-95 active:shadow-none focus-visible:border-[#a8c7fa] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#d3e3fd] disabled:border-transparent disabled:bg-secondary-95 disabled:text-neutral-50 disabled:shadow-none"
        @click="handleGoogle"
      >
        <span class="inline-flex w-full items-center justify-center gap-3 px-6">
          <img class="h-4.5 w-4.5 shrink-0" :src="googleIcon" alt="" aria-hidden="true" />
          <span class="font-[Roboto] text-base leading-tight font-medium tracking-normal sm:text-xl">
            Sign in with Google
          </span>
        </span>
      </button>
    </form>

    <div class=" text-center">
      <NuxtLink
        class="w-fit text-center font-semibold text-primary no-underline hover:underline hover:underline-offset-[0.2em] focus-visible:rounded-[0.3rem] focus-visible:underline focus-visible:underline-offset-[0.2em] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[0.2rem]"
        to="/forgot-password"
      >
        Forgot Password?
      </NuxtLink>
      <p :class="[typeBodyLarge, 'text-on-surface-variant']">
        Don't have an account?
        <NuxtLink
          class="ml-[0.35rem] w-fit font-semibold text-primary no-underline hover:underline hover:underline-offset-[0.2em] focus-visible:rounded-[0.3rem] focus-visible:underline focus-visible:underline-offset-[0.2em] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[0.2rem]"
          to="/sign-up"
        >
          Create one
        </NuxtLink>
      </p>
    </div>
  </section>
</template>
