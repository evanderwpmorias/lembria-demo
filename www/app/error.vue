<script setup lang="ts">
import type { NuxtError } from '#app';
import '@material/web/button/filled-button.js';
import '~/assets/theme/main.css';

const props = defineProps<{
  error: NuxtError;
}>();

const statusCode = computed(() => props.error?.statusCode ?? 404);
const isNotFound = computed(() => statusCode.value === 404);
const title = computed(() => (isNotFound.value ? 'Page not dfound' : 'Something went wrong'));
const message = computed(() =>
  isNotFound.value
    ? "The page you're looking for doesn't exist or may have been moved."
    : 'We could not load this page right now.'
);

const handleGoHome = () => clearError({ redirect: '/' });
</script>

<template>
  <main class="error-shell">
    <div class="error-orb error-orb-left" aria-hidden="true"></div>
    <div class="error-orb error-orb-right" aria-hidden="true"></div>

    <section class="error-card">
      <div class="error-badge">Error {{ statusCode }}</div>

      <img
        class="error-logo"
        src="/404-icon.svg"
        alt="404 illustration"
        width="220"
        height="157"
      />

      <div class="error-copy">
        <h1>{{ title }}</h1>
        <p>{{ message }}</p>
      </div>

      <md-filled-button class="error-action" @click="handleGoHome">
        Return home dfgd
      </md-filled-button>
    </section>
  </main>
</template>

<style scoped>
:global(body) {
  margin: 0;
  background:
    radial-gradient(circle at top left, rgb(255 218 214 / 0.85), transparent 34%),
    radial-gradient(circle at bottom right, rgb(245 221 219 / 0.9), transparent 30%),
    linear-gradient(180deg, var(--color-surface-container-lowest) 0%, var(--color-surface) 100%);
  color: var(--color-on-surface);
  font-family: var(--font-body), sans-serif;
}

.error-shell {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: grid;
  place-items: center;
  padding: 2rem;
}

.error-card {
  position: relative;
  z-index: 1;
  width: min(100%, 42rem);
  display: grid;
  gap: 1.5rem;
  justify-items: center;
  border: 1px solid color-mix(in srgb, var(--color-outline) 44%, transparent);
  border-radius: 2rem;
  background: linear-gradient(180deg, rgb(255 255 255 / 0.78), rgb(255 255 255 / 0.9));
  box-shadow: 0 28px 80px rgb(65 0 2 / 0.12);
  padding: 2.5rem 2rem;
  text-align: center;
  backdrop-filter: blur(18px);
}

.error-badge {
  border-radius: 999px;
  background: var(--color-primary-container);
  color: var(--color-on-primary-container);
  padding: 0.45rem 0.85rem;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.error-logo {
  width: min(16rem, 70vw);
  height: auto;
  filter: drop-shadow(0 18px 30px rgb(65 0 2 / 0.18));
}

.error-copy {
  display: grid;
  gap: 0.75rem;
}

.error-copy h1 {
  margin: 0;
  font-family: var(--font-title), serif;
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  line-height: 0.95;
}

.error-copy p {
  margin: 0;
  max-width: 32rem;
  color: var(--color-on-surface-variant);
  font-size: 1.05rem;
  line-height: 1.6;
}

.error-action {
  width: 100%;
  max-width: 15rem;
  --md-filled-button-container-height: 3.4rem;
  --md-filled-button-container-shape: 999px;
  --md-filled-button-label-text-font: var(--font-body);
  --md-filled-button-label-text-size: 0.98rem;
  --md-filled-button-label-text-weight: 700;
  --md-filled-button-container-color: var(--color-primary);
  --md-filled-button-label-text-color: var(--color-on-primary);
}

.error-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(6px);
  opacity: 0.72;
}

.error-orb-left {
  top: 10%;
  left: -4rem;
  width: 12rem;
  height: 12rem;
  background: rgb(255 180 172 / 0.52);
}

.error-orb-right {
  right: -5rem;
  bottom: 8%;
  width: 15rem;
  height: 15rem;
  background: rgb(255 237 234 / 0.88);
}

@media (max-width: 640px) {
  .error-shell {
    padding: 1rem;
  }

  .error-card {
    padding: 2rem 1.25rem;
    border-radius: 1.5rem;
  }

  .error-copy p {
    font-size: 1rem;
  }
}
</style>