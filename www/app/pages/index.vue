<script setup lang="ts">

definePageMeta({
  layout: 'defaut',
}); 

</script>


<template>
  <div class="min-h-screen bg-surface text-on-surface">

    <!-- ===== HERO ===== -->
    <header class="relative overflow-hidden pt-16 pb-24 px-4 md:px-8 bg-surface">
      <!-- decorative blobs -->
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-surface-variant rounded-full blur-3xl opacity-60 -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="flex flex-col gap-10 lg:flex-row lg:items-center">

          <!-- Left copy -->
          <div class="flex-1 space-y-7">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container text-xs font-medium tracking-wider uppercase">
              <span class="material-symbols-outlined text-sm">auto_awesome</span>
              AI-Powered Memory Keeping
            </div>

            <h1 class="text-5xl md:text-6xl font-title font-normal leading-tight tracking-tight text-on-surface">
              Where Family Memories<br/>
              <span class="text-primary">Become Living Stories.</span>
            </h1>

            <p class="text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Lembria uses AI to transform your family photos, videos, and voices into interactive stories that future generations can explore.
            </p>

            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/app" class="btn-base btn btn-filled inline-flex items-center justify-center gap-2 px-8 h-14 rounded-full font-medium text-base shadow-md hover:shadow-lg transition-shadow">
                <span class="material-symbols-outlined text-xl">family_restroom</span>
                Start Your Family Archive
              </NuxtLink>
              <a href="#how-it-works" class="btn-base btn btn-outlined inline-flex items-center justify-center gap-2 px-8 h-14 rounded-full font-medium text-base transition-colors hover:bg-primary/8">
                <span class="material-symbols-outlined text-xl">play_circle</span>
                See How It Works
              </a>
            </div>

            <!-- Social proof -->
            <!-- <div class="flex items-center gap-3 pt-2">
              <div class="flex -space-x-2">
                <div class="w-8 h-8 rounded-full bg-primary-30 border-2 border-surface flex items-center justify-center text-white text-xs font-bold">M</div>
                <div class="w-8 h-8 rounded-full bg-tertiary-30 border-2 border-surface flex items-center justify-center text-white text-xs font-bold">S</div>
                <div class="w-8 h-8 rounded-full bg-secondary-40 border-2 border-surface flex items-center justify-center text-white text-xs font-bold">J</div>
              </div>
              <p class="text-sm text-on-surface-variant">Trusted by <strong class="text-on-surface">2,400+ families</strong> preserving their legacy</p>
            </div> -->
          </div>

          <!-- Right visual -->
          <div class="flex-1 max-w-lg lg:max-w-none mx-auto lg:mx-0">
            <div class="relative group">
              <!-- <div class="absolute -inset-1 bg-gradient-to-br from-primary to-tertiary rounded-3xl blur opacity-20 group-hover:opacity-35 transition duration-700"></div> -->
              <div class="relative bg-surface-container-low rounded-3xl overflow-hidden  border border-outline-variant">
                <img
                  class="w-full aspect-4/3 object-cover"
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                  alt="Family gathering, generations together"
                />
                <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent flex items-end p-7">
                  <div class="flex items-center gap-4 text-white">
                    <span class="material-symbols-outlined text-4xl opacity-90">auto_stories</span>
                    <div>
                      <p class="font-medium text-base">The Santos Family Archive</p>
                      <p class="text-sm opacity-75">1958 – 2024 · 347 memories</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>

    <main>

      <!-- ===== WHY LEMBRIA ===== -->
      <section class="py-24 bg-surface-container-low">
        <div class="max-w-7xl mx-auto px-4 md:px-8">
          <div class="text-center mb-16 space-y-4">
            <span class="inline-block px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container text-xs font-medium tracking-wider uppercase">Why Lembria</span>
            <h2 class="text-4xl md:text-5xl font-title font-normal tracking-tight text-on-surface">Preserve What Matters</h2>
            <p class="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">
              Family stories fade over time. Lembria captures the memories behind your photos and keeps them alive for the next generation.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Card 1 -->
            <div class="card card-elevated bg-surface group  transition-shadow cursor-default border border-outline-variant hover:border-primary/30">
              <div class="w-14 h-14 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center mb-6 transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <span class="material-symbols-outlined text-3xl">photo_library</span>
              </div>
              <h3 class="text-xl font-title font-normal text-on-surface mb-3">Preserve What Matters</h3>
              <p class="text-on-surface-variant leading-relaxed text-sm">
                Family stories fade over time. Lembria captures the memories behind your photos and keeps them alive.
              </p>
            </div>

            <!-- Card 2 -->
            <div class="card card-elevated bg-surface group hover:shadow-md transition-shadow cursor-default border border-outline-variant hover:border-primary/30">
              <div class="w-14 h-14 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center mb-6 transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <span class="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <h3 class="text-xl font-title font-normal text-on-surface mb-3">AI That Understands Your Story</h3>
              <p class="text-on-surface-variant leading-relaxed text-sm">
                Our AI helps organise memories into life topics and events so stories can be explored naturally.
              </p>
            </div>

            <!-- Card 3 -->
            <div class="card card-elevated bg-surface group hover:shadow-md transition-shadow cursor-default border border-outline-variant hover:border-primary/30">
              <div class="w-14 h-14 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center mb-6 transition-colors group-hover:bg-primary group-hover:text-on-primary">
                <span class="material-symbols-outlined text-3xl">hub</span>
              </div>
              <h3 class="text-xl font-title font-normal text-on-surface mb-3">Explore Your Family History</h3>
              <p class="text-on-surface-variant leading-relaxed text-sm">
                Ask questions about your family and let Lembria connect memories across generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== LIFE TOPICS (Concrete Examples) ===== -->
      <section class="py-24 px-4 md:px-8 bg-surface">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div class="space-y-4">
              <span class="inline-block px-4 py-1.5 rounded-full bg-surface-variant text-on-surface-variant text-xs font-medium tracking-wider uppercase">Life Topics</span>
              <h2 class="text-4xl md:text-5xl font-title font-normal tracking-tight text-on-surface">Stories Worth Telling</h2>
              <p class="text-on-surface-variant text-lg">Choose a theme and let Lembria guide your storytelling process.</p>
            </div>
            <a class="text-primary font-medium flex items-center gap-1.5 hover:underline underline-offset-2 transition-opacity" href="#">
              View all themes <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div class="group relative aspect-3/4 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
              <img class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80" alt="Migration journey" />
              <div class="absolute bottom-0 left-0 p-5 z-20">
                <span class="chip chip-filled text-xs mb-2">Migration</span>
                <h4 class="text-white text-xl font-title">The Journey</h4>
                <p class="text-white/75 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Across oceans and generations.</p>
              </div>
            </div>

            <div class="group relative aspect-3/4 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
              <img class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=600&q=80" alt="Love stories" />
              <div class="absolute bottom-0 left-0 p-5 z-20">
                <span class="chip chip-filled text-xs mb-2">Love Stories</span>
                <h4 class="text-white text-xl font-title">Romance</h4>
                <p class="text-white/75 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Letters and lifetime vows.</p>
              </div>
            </div>

            <div class="group relative aspect-3/4 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
              <img class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80" alt="Family traditions" />
              <div class="absolute bottom-0 left-0 p-5 z-20">
                <span class="chip chip-filled text-xs mb-2">Traditions</span>
                <h4 class="text-white text-xl font-title">Rituals</h4>
                <p class="text-white/75 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Recipes and rituals passed down.</p>
              </div>
            </div>

            <div class="group relative aspect-3/4 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
              <img class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80" alt="Childhood memories" />
              <div class="absolute bottom-0 left-0 p-5 z-20">
                <span class="chip chip-filled text-xs mb-2">Childhood</span>
                <h4 class="text-white text-xl font-title">First Memories</h4>
                <p class="text-white/75 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Simple joys and wonder.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== HOW IT WORKS ===== -->
      <section id="how-it-works" class="py-24 bg-surface-container-low">
        <div class="max-w-5xl mx-auto px-4 md:px-8">
          <div class="text-center mb-16 space-y-4">
            <span class="inline-block px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container text-xs font-medium tracking-wider uppercase">How It Works</span>
            <h2 class="text-4xl md:text-5xl font-title font-normal tracking-tight text-on-surface">Three Steps to Your Archive</h2>
          </div>

          <div class="flex flex-col md:flex-row gap-6">
            <div class="flex-1 flex flex-col items-center text-center p-8 rounded-3xl bg-surface border border-outline-variant">
              <div class="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center text-2xl font-title mb-5 shadow-md">1</div>
              <span class="material-symbols-outlined text-4xl text-primary mb-4">upload</span>
              <h3 class="text-lg font-medium text-on-surface mb-2">Upload</h3>
              <p class="text-on-surface-variant text-sm leading-relaxed">Upload photos, videos, or voice recordings from any era of your family's life.</p>
            </div>

            <div class="hidden md:flex items-center text-on-surface-variant">
              <span class="material-symbols-outlined text-3xl">arrow_forward</span>
            </div>

            <div class="flex-1 flex flex-col items-center text-center p-8 rounded-3xl bg-surface border border-outline-variant">
              <div class="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center text-2xl font-title mb-5 shadow-md">2</div>
              <span class="material-symbols-outlined text-4xl text-primary mb-4">manage_search</span>
              <h3 class="text-lg font-medium text-on-surface mb-2">AI Extracts</h3>
              <p class="text-on-surface-variant text-sm leading-relaxed">Lembria's AI identifies people, places, moments, and the stories hidden in your memories.</p>
            </div>

            <div class="hidden md:flex items-center text-on-surface-variant">
              <span class="material-symbols-outlined text-3xl">arrow_forward</span>
            </div>

            <div class="flex-1 flex flex-col items-center text-center p-8 rounded-3xl bg-surface border border-outline-variant">
              <div class="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center text-2xl font-title mb-5 shadow-md">3</div>
              <span class="material-symbols-outlined text-4xl text-primary mb-4">explore</span>
              <h3 class="text-lg font-medium text-on-surface mb-2">Explore</h3>
              <p class="text-on-surface-variant text-sm leading-relaxed">Navigate your family history through interactive, AI-generated stories your whole family can enjoy.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== PRIVACY & OWNERSHIP ===== -->
      <section class="py-24 px-4 md:px-8 bg-surface">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-col lg:flex-row gap-12 items-center">
            <!-- Icon side -->
            <div class="shrink-0">
              <div class="w-32 h-32 rounded-4xl bg-primary-container flex items-center justify-center shadow-lg">
                <span class="material-symbols-outlined text-6xl text-on-primary-container">lock</span>
              </div>
            </div>

            <!-- Text side -->
            <div class="flex-1 space-y-6">
              <div>
                <span class="inline-block px-4 py-1.5 rounded-full bg-surface-variant text-on-surface-variant text-xs font-medium tracking-wider uppercase mb-4">Privacy & Ownership</span>
                <h2 class="text-4xl md:text-5xl font-title font-normal tracking-tight text-on-surface">Your memories.<br/>Your archive. Always.</h2>
              </div>
              <p class="text-on-surface-variant text-lg leading-relaxed">
                We believe your family's story belongs to you. Lembria never sells your data, never uses your photos to train AI for others, and gives you full control to export or delete everything at any time.
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex items-start gap-3 p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
                  <span class="material-symbols-outlined text-primary text-2xl mt-0.5">encrypted</span>
                  <div>
                    <p class="font-medium text-on-surface text-sm">End-to-end encrypted</p>
                    <p class="text-on-surface-variant text-xs leading-relaxed mt-0.5">Your files are encrypted at rest and in transit.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
                  <span class="material-symbols-outlined text-primary text-2xl mt-0.5">person</span>
                  <div>
                    <p class="font-medium text-on-surface text-sm">You own your data</p>
                    <p class="text-on-surface-variant text-xs leading-relaxed mt-0.5">Export or delete your archive at any time.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
                  <span class="material-symbols-outlined text-primary text-2xl mt-0.5">block</span>
                  <div>
                    <p class="font-medium text-on-surface text-sm">No third-party sharing</p>
                    <p class="text-on-surface-variant text-xs leading-relaxed mt-0.5">We never sell or share your personal memories.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
                  <span class="material-symbols-outlined text-primary text-2xl mt-0.5">group</span>
                  <div>
                    <p class="font-medium text-on-surface text-sm">Family access controls</p>
                    <p class="text-on-surface-variant text-xs leading-relaxed mt-0.5">Decide who sees what inside your archive.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== FINAL CTA ===== -->
      <section class="py-24 px-4 bg-surface-container-low">
        <div class="max-w-5xl mx-auto bg-primary rounded-[2.5rem] p-12 md:p-20 text-center text-on-primary relative overflow-hidden shadow-2xl">
          <!-- Decorative circles -->
          <div class="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-80 h-80 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 space-y-8">
            <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium tracking-wider uppercase">
              <span class="material-symbols-outlined text-sm">family_restroom</span>
              Start Today
            </span>
            <h2 class="text-4xl md:text-6xl font-title font-normal tracking-tight leading-tight">
              Don't let your stories<br/>fade into silence.
            </h2>
            <p class="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Join thousands of families already preserving their history for the next century.
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <NuxtLink to="/app" class="inline-flex items-center justify-center gap-2 bg-on-primary text-primary h-16 px-10 rounded-full font-medium text-lg hover:bg-on-primary/90 transition-colors shadow-md">
                <span class="material-symbols-outlined">family_restroom</span>
                Start Building Your Family Story
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

