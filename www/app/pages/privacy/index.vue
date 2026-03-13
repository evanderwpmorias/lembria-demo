<template>
  <div class="min-h-screen bg-stone-950 text-stone-100">
    <CustomMainHeader />

    <main>
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(185,28,28,0.22),transparent_35%)]"></div>
        <div class="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div class="relative z-10 max-w-3xl">
            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">Legal</p>
            <h1 class="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Privacy Policy
            </h1>
            <p class="mt-6 text-base text-stone-400">Last updated: March 13, 2026</p>
          </div>
        </div>
      </section>

      <section class="border-t border-white/10">
        <div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <div class="prose prose-invert prose-stone max-w-none">
            <div class="space-y-12">
              <article>
                <h2 class="text-2xl font-semibold text-white">Introduction</h2>
                <p class="mt-4 text-base leading-7 text-stone-300">
                  Lembria ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our family memory archiving and storytelling service.
                </p>
              </article>

              <article>
                <h2 class="text-2xl font-semibold text-white">Information We Collect</h2>
                <div class="mt-4 space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-stone-200">Personal Information</h3>
                    <p class="mt-2 text-base leading-7 text-stone-300">
                      When you create an account, we collect your name, email address, and password. You may also choose to provide additional profile information.
                    </p>
                  </div>
                  <div>
                    <h3 class="text-lg font-medium text-stone-200">Family Content</h3>
                    <p class="mt-2 text-base leading-7 text-stone-300">
                      You may upload photos, videos, audio recordings, and documents to your family archive. This content is stored securely and is only accessible to you and family members you invite.
                    </p>
                  </div>
                  <div>
                    <h3 class="text-lg font-medium text-stone-200">Usage Information</h3>
                    <p class="mt-2 text-base leading-7 text-stone-300">
                      We collect information about how you use our service, including your interactions with the AI storytelling features, to improve our service and your experience.
                    </p>
                  </div>
                </div>
              </article>

              <article>
                <h2 class="text-2xl font-semibold text-white">How We Use Your Information</h2>
                <ul class="mt-4 list-inside list-disc space-y-2 text-base leading-7 text-stone-300">
                  <li>To provide and maintain our service</li>
                  <li>To process and analyze your uploaded content using AI</li>
                  <li>To generate interactive stories from your family memories</li>
                  <li>To send you important updates about your account</li>
                  <li>To respond to your inquiries and provide support</li>
                  <li>To improve and develop new features</li>
                </ul>
              </article>

              <article>
                <h2 class="text-2xl font-semibold text-white">Data Security</h2>
                <p class="mt-4 text-base leading-7 text-stone-300">
                  We implement industry-standard security measures to protect your personal information and family content. Your data is encrypted both in transit and at rest. We regularly review and update our security practices.
                </p>
              </article>

              <article>
                <h2 class="text-2xl font-semibold text-white">Data Sharing</h2>
                <p class="mt-4 text-base leading-7 text-stone-300">
                  We do not sell, rent, or trade your personal information. We may share your information only in the following circumstances:
                </p>
                <ul class="mt-4 list-inside list-disc space-y-2 text-base leading-7 text-stone-300">
                  <li>With family members you explicitly invite to your archive</li>
                  <li>With service providers who help us operate our platform</li>
                  <li>When required by law or to protect our rights</li>
                </ul>
              </article>

              <article>
                <h2 class="text-2xl font-semibold text-white">Your Rights</h2>
                <p class="mt-4 text-base leading-7 text-stone-300">
                  You have the right to access, correct, or delete your personal information. You can export your data at any time. To exercise these rights, please contact us at privacy@lembria.com.
                </p>
              </article>

              <article>
                <h2 class="text-2xl font-semibold text-white">Contact Us</h2>
                <p class="mt-4 text-base leading-7 text-stone-300">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p class="mt-4 text-base text-stone-300">
                  <a href="mailto:privacy@lembria.com" class="text-red-300 transition hover:text-red-200">privacy@lembria.com</a>
                </p>
              </article>
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
  title: 'Privacy Policy — Lembria',
  meta: [
    {
      name: 'description',
      content: 'Privacy Policy for Lembria family memory archiving and storytelling service.'
    }
  ]
})
</script>
