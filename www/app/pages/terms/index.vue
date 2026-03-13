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
              Terms of Service
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
                <h2 class="text-2xl font-semibold text-white">Agreement to Terms</h2>
                <p class="mt-4 text-base leading-7 text-stone-300">
                  By accessing or using Lembria, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                </p>
              </article>

              <article>
                <h2 class="text-2xl font-semibold text-white">Description of Service</h2>
                <p class="mt-4 text-base leading-7 text-stone-300">
                  Lembria is a family memory archiving and storytelling platform that uses AI to help you preserve and explore your family history. Our service allows you to upload photos, videos, audio recordings, and documents, which are then processed to create interactive stories.
                </p>
              </article>

              <article>
                <h2 class="text-2xl font-semibold text-white">User Accounts</h2>
                <div class="mt-4 space-y-4 text-base leading-7 text-stone-300">
                  <p>To use Lembria, you must create an account. You are responsible for:</p>
                  <ul class="list-inside list-disc space-y-2">
                    <li>Providing accurate account information</li>
                    <li>Maintaining the security of your password</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized use</li>
                  </ul>
                </div>
              </article>

              <article>
                <h2 class="text-2xl font-semibold text-white">Your Content</h2>
                <div class="mt-4 space-y-4 text-base leading-7 text-stone-300">
                  <p>You retain ownership of all content you upload to Lembria. By uploading content, you grant us a limited license to:</p>
                  <ul class="list-inside list-disc space-y-2">
                    <li>Store and process your content to provide our service</li>
                    <li>Use AI to analyze and generate stories from your content</li>
                    <li>Display your content to you and authorized family members</li>
                  </ul>
                  <p class="mt-4">You are responsible for ensuring you have the right to upload and share any content. You agree not to upload content that:</p>
                  <ul class="list-inside list-disc space-y-2">
                    <li>Violates any laws or regulations</li>
                    <li>Infringes on intellectual property rights</li>
                    <li>Contains harmful or malicious content</li>
                  </ul>
                </div>
              </article>

              <article>
                <h2 class="text-2xl font-semibold text-white">Family Sharing</h2>
                <p class="mt-4 text-base leading-7 text-stone-300">
                  You may invite family members to view and contribute to your archive. You are responsible for managing access permissions and ensuring that invited members comply with these terms.
                </p>
              </article>

              <article>
                <h2 class="text-2xl font-semibold text-white">AI Features</h2>
                <p class="mt-4 text-base leading-7 text-stone-300">
                  Our AI features are designed to assist with organizing and storytelling. While we strive for accuracy, AI-generated content may contain errors or inaccuracies. You should review and verify AI-generated content before sharing.
                </p>
              </article>

              <article>
                <h2 class="text-2xl font-semibold text-white">Termination</h2>
                <p class="mt-4 text-base leading-7 text-stone-300">
                  You may terminate your account at any time. Upon termination, you can export your data. We reserve the right to suspend or terminate accounts that violate these terms.
                </p>
              </article>

              <article>
                <h2 class="text-2xl font-semibold text-white">Limitation of Liability</h2>
                <p class="mt-4 text-base leading-7 text-stone-300">
                  Lembria is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of our service, including loss of data or content.
                </p>
              </article>

              <article>
                <h2 class="text-2xl font-semibold text-white">Changes to Terms</h2>
                <p class="mt-4 text-base leading-7 text-stone-300">
                  We may update these terms from time to time. We will notify you of significant changes via email or through our service. Continued use after changes constitutes acceptance of the new terms.
                </p>
              </article>

              <article>
                <h2 class="text-2xl font-semibold text-white">Contact Us</h2>
                <p class="mt-4 text-base leading-7 text-stone-300">
                  If you have questions about these Terms of Service, please contact us at:
                </p>
                <p class="mt-4 text-base text-stone-300">
                  <a href="mailto:legal@lembria.com" class="text-red-300 transition hover:text-red-200">legal@lembria.com</a>
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
  title: 'Terms of Service — Lembria',
  meta: [
    {
      name: 'description',
      content: 'Terms of Service for Lembria family memory archiving and storytelling service.'
    }
  ]
})
</script>
