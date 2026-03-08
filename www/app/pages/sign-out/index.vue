<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  alias: ['/sign-out', '/logout'],
})
</script>

<template>
  <div class="layout-auth-signout">
    <div class="container py-12 mx-auto">
      <div class="flex flex-col items-center justify-center min-h-[50vh]">
        <div class="bg-white rounded-lg shadow-md p-8 text-center max-w-md w-full">
          <!-- Loading Spinner -->
          <div class="mb-6">
            <svg
              class="animate-spin h-12 w-12 text-blue-600 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>

          <!-- Message -->
          <h1 class="text-2xl font-bold text-gray-800 mb-2">Signing out...</h1>
          <p class="text-gray-600">Please wait while we securely log you out.</p>
        </div>
      </div>
    </div>
  </div>
</template>
