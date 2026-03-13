<template>
  <div class="min-h-screen bg-stone-950 text-stone-100">
    <CustomMainHeader />

    <main>
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(185,28,28,0.22),transparent_35%)]"></div>
        <div class="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div class="relative z-10 max-w-3xl">
            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">How It Works</p>
            <h1 class="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
              From scattered memories to a story your family can revisit
            </h1>
            <p class="mt-6 text-lg leading-8 text-stone-300 md:text-xl">
              Lembria gives your family a guided path: gather the materials, let AI understand them, and explore the stories that connect them.
            </p>
          </div>
        </div>
      </section>

      <section class="border-t border-white/10 bg-stone-900/70">
        <div class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div class="grid gap-8 lg:grid-cols-3">
            <article
              v-for="step in steps"
              :key="step.number"
              class="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-lg shadow-black/10"
            >
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-700/20 text-xl font-bold text-red-200">
                {{ step.number }}
              </div>
              <h3 class="mt-6 text-xl font-semibold text-white">{{ step.title }}</h3>
              <p class="mt-4 text-base leading-7 text-stone-300">{{ step.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="border-t border-white/10">
        <div class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div class="max-w-2xl">
            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">What You Can Do</p>
            <h2 class="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">Explore your family history naturally</h2>
          </div>

          <div class="mt-12 grid gap-6 lg:grid-cols-2">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7"
            >
              <h3 class="text-lg font-semibold text-white">{{ feature.title }}</h3>
              <p class="mt-3 text-base leading-7 text-stone-300">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="border-t border-white/10 bg-stone-900/70">
        <div class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div class="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-red-900/35 via-stone-900 to-black p-8 md:p-10">
            <div class="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 class="text-3xl font-semibold tracking-tight text-white md:text-4xl">Ready to start your family archive?</h2>
                <p class="mt-4 max-w-2xl text-lg leading-8 text-stone-300">
                  Begin preserving your family's stories today and create a legacy for future generations.
                </p>
              </div>
              <NuxtLink
                to="/sign-up"
                class="inline-flex items-center justify-center rounded-full bg-red-700 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-red-600"
              >
                Start Your Family Archive
              </NuxtLink>
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
  title: 'How It Works — Lembria',
  meta: [
    {
      name: 'description',
      content: 'Learn how Lembria transforms your family photos, videos, and voices into interactive stories.'
    }
  ]
})

const steps = [
  {
    number: '1',
    title: 'Upload photos, videos, or recordings',
    description: 'Bring together the images, voice notes, clips, and documents that already carry your family history. Lembria accepts photos, videos, audio recordings, and scanned documents.'
  },
  {
    number: '2',
    title: "AI extracts people, places, and moments",
    description: 'Our AI helps identify faces, recognize handwriting, transcribe voices, and connect themes, events, and relationships so your archive becomes searchable and meaningful.'
  },
  {
    number: '3',
    title: 'Explore through interactive stories',
    description: 'Ask about a person, event, topic, or period in time and let Lembria reveal the memories connected to it. Navigate your family history naturally through conversation.'
  }
]

const features = [
  {
    title: 'Ask questions about your family',
    description: "Type questions like \"What was grandma's life like in the 1960s?\" and Lembria will find and connect relevant memories."
  },
  {
    title: 'Discover hidden connections',
    description: 'Lembria identifies relationships between people, places, and events that you might have missed.'
  },
  {
    title: 'Share with family members',
    description: 'Invite family members to contribute their own memories and explore the archive together.'
  },
  {
    title: 'Preserve voices and stories',
    description: 'Record and transcribe interviews with family members to capture their stories in their own words.'
  }
]
</script>
