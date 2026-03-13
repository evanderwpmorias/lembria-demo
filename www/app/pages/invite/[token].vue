<template>
  <div class="min-h-screen bg-stone-950 text-stone-100">
    <CustomMainHeader />

    <main>
      <section class="flex min-h-[70vh] items-center justify-center px-6 py-20">
        <div class="w-full max-w-md">
          <div class="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-xl shadow-black/20">
            <!-- Loading State -->
            <div v-if="loading" class="text-center">
              <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-red-700 border-t-transparent"></div>
              <p class="mt-6 text-lg text-stone-300">Verifying your invitation...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center">
              <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-900/30">
                <svg class="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 class="mt-6 text-2xl font-semibold text-white">Invalid Invitation</h2>
              <p class="mt-4 text-base leading-7 text-stone-300">{{ errorMessage }}</p>
              <NuxtLink
                to="/"
                class="mt-8 inline-flex items-center justify-center rounded-full bg-red-700 px-6 py-3 text-base font-semibold text-white transition hover:bg-red-600"
              >
                Go to Home
              </NuxtLink>
            </div>

            <!-- Success State -->
            <div v-else class="text-center">
              <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-900/30">
                <svg class="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 class="mt-6 text-2xl font-semibold text-white">You're Invited!</h2>
              <p class="mt-4 text-base leading-7 text-stone-300">
                You've been invited to join <span class="font-medium text-white">{{ familyName }}</span>'s family archive on Lembria.
              </p>
              
              <div class="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p class="text-sm text-stone-400">Invited by</p>
                <p class="mt-1 text-base font-medium text-white">{{ inviterName }}</p>
              </div>

              <div class="mt-8 space-y-4">
                <NuxtLink
                  v-if="isNewUser"
                  :to="`/sign-up?invite=${token}`"
                  class="block w-full rounded-full bg-red-700 px-6 py-3.5 text-center text-base font-semibold text-white transition hover:bg-red-600"
                >
                  Create Account & Join
                </NuxtLink>
                <NuxtLink
                  v-else
                  :to="`/sign-in?invite=${token}`"
                  class="block w-full rounded-full bg-red-700 px-6 py-3.5 text-center text-base font-semibold text-white transition hover:bg-red-600"
                >
                  Sign In & Join
                </NuxtLink>
                <p class="text-sm text-stone-400">
                  {{ isNewUser ? 'Already have an account?' : "Don't have an account?" }}
                  <NuxtLink
                    :to="isNewUser ? `/sign-in?invite=${token}` : `/sign-up?invite=${token}`"
                    class="text-red-300 transition hover:text-red-200"
                  >
                    {{ isNewUser ? 'Sign in' : 'Sign up' }}
                  </NuxtLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <CustomFooter />
  </div>
</template>

<script setup>
const route = useRoute()
const token = route.params.token

const loading = ref(true)
const error = ref(false)
const errorMessage = ref('')
const familyName = ref('')
const inviterName = ref('')
const isNewUser = ref(true)

useHead({
  title: 'Accept Invitation — Lembria',
  meta: [
    {
      name: 'description',
      content: 'Accept your invitation to join a family archive on Lembria.'
    }
  ]
})

// Simulate invitation verification
onMounted(async () => {
  try {
    // TODO: Replace with actual API call to verify invitation
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simulated response - replace with actual API integration
    if (token && token.length > 5) {
      familyName.value = 'The Smith Family'
      inviterName.value = 'John Smith'
      loading.value = false
    } else {
      throw new Error('Invalid or expired invitation token')
    }
  } catch (e) {
    error.value = true
    errorMessage.value = e.message || 'This invitation link is invalid or has expired. Please ask for a new invitation.'
    loading.value = false
  }
})
</script>
