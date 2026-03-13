<template>
  <div class="min-h-screen bg-stone-950 text-stone-100">
    <CustomMainHeader />

    <main>
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(185,28,28,0.22),transparent_35%)]"></div>
        <div class="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div class="relative z-10 max-w-3xl">
            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">Trust & Privacy</p>
            <h1 class="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
              A product for sensitive family memories should feel respectful from the start
            </h1>
            <p class="mt-6 text-lg leading-8 text-stone-300 md:text-xl">
              Your family memories are precious. We've built Lembria with privacy and security at its core.
            </p>
          </div>
        </div>
      </section>

      <section class="border-t border-white/10 bg-stone-900/70">
        <div class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div class="grid gap-8 lg:grid-cols-2">
            <article
              v-for="principle in principles"
              :key="principle.title"
              class="rounded-4xl border border-white/10 bg-white/3 p-8 shadow-lg shadow-black/10"
            >
              <h3 class="text-xl font-semibold text-white">{{ principle.title }}</h3>
              <p class="mt-4 text-base leading-7 text-stone-300">{{ principle.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="border-t border-white/10">
        <div class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div class="max-w-2xl">
            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">Our Commitments</p>
            <h2 class="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">What we promise to you and your family</h2>
          </div>

          <div class="mt-12 space-y-6">
            <div
              v-for="commitment in commitments"
              :key="commitment.title"
              class="rounded-4xl border border-white/10 bg-white/3 p-7"
            >
              <h3 class="text-lg font-semibold text-white">{{ commitment.title }}</h3>
              <p class="mt-3 text-base leading-7 text-stone-300">{{ commitment.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="border-t border-white/10 bg-stone-900/70">
        <div class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div class="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">Questions?</p>
              <h2 class="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">We're here to help</h2>
              <p class="mt-6 text-lg leading-8 text-stone-300">
                Have questions about how we handle your data? Want to know more about our security practices? 
                We're happy to answer any questions you have.
              </p>
              <div class="mt-8 flex flex-wrap gap-4">
                <NuxtLink
                  to="/privacy"
                  class="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/3 px-6 py-3 text-base font-semibold text-stone-100 transition hover:border-white/20 hover:bg-white/6"
                >
                  Privacy Policy
                </NuxtLink>
                <NuxtLink
                  to="/terms"
                  class="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/3 px-6 py-3 text-base font-semibold text-stone-100 transition hover:border-white/20 hover:bg-white/6"
                >
                  Terms of Service
                </NuxtLink>
              </div>
            </div>
            <div class="rounded-4xl border border-white/10 bg-white/3 p-8">
              <h3 class="text-xl font-semibold text-white">Contact our privacy team</h3>
              <p class="mt-4 text-base leading-7 text-stone-300">
                For privacy-related inquiries or data requests, please contact us at:
              </p>
              <a href="mailto:privacy@lembria.com" class="mt-4 block text-lg font-medium text-red-300 transition hover:text-red-200">
                privacy@lembria.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <CustomFooter />
  </div>
</template>

<script setup>
useHead({
  title: 'Trust & Privacy — Lembria',
  meta: [
    {
      name: 'description',
      content: 'Learn about how Lembria protects your family memories with privacy and security at its core.'
    }
  ]
})

const principles = [
  {
    title: 'Private by design',
    description: 'Your archive is meant for family members and trusted contributors, not public feeds. We never share your content with third parties.'
  },
  {
    title: 'Human + AI collaboration',
    description: 'AI can suggest people, places, topics, and events, while your family stays in control of meaning and context. You decide what gets saved and how it\'s organized.'
  },
  {
    title: 'Your data, your control',
    description: 'You can export or delete your data at any time. We provide easy-to-use tools to manage your archive and permissions.'
  },
  {
    title: 'End-to-end encryption',
    description: 'Your photos, videos, and recordings are encrypted both in transit and at rest. Only you and your authorized family members can access them.'
  }
]

const commitments = [
  {
    title: 'We will never sell your data',
    description: 'Your family memories are not for sale. We will never sell, rent, or trade your personal information or content to third parties for advertising or any other purpose.'
  },
  {
    title: 'We will never train AI on your content without permission',
    description: 'Your family photos and stories will not be used to train AI models unless you explicitly opt in. Your memories remain yours.'
  },
  {
    title: 'We will always give you a way out',
    description: 'If you ever want to leave Lembria, we provide full data export in standard formats. You can take your memories with you.'
  },
  {
    title: 'We will be transparent about changes',
    description: 'We will notify you of any significant changes to our privacy practices and give you the opportunity to review them before they take effect.'
  }
]
</script>
