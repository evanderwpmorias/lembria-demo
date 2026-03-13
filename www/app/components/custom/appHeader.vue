<template>
  <div>
    <!-- ================================================================
         DESKTOP (md+): Top Navigation Bar — Material Design 3 style
         ================================================================ -->
    <header class="flex sticky top-0 z-40 items-center justify-between h-16 px-6 lg:px-8 border-b border-white/10 bg-stone-950/10 backdrop-blur">
     <button
        type="button"
        class="flex md:hidden items-center justify-center w-10 h-10 rounded-full text-on-surface-variant transition-colors duration-200 hover:bg-on-surface-variant/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        :aria-expanded="drawerOpen"
        aria-controls="mobile-drawer"
        aria-label="Toggle navigation menu"
        @click="drawerOpen = !drawerOpen"
      >
        <span class="material-symbols-outlined select-none text-2xl">
          {{ drawerOpen ? 'close' : 'menu' }}
        </span>
      </button>
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 shrink-0">
        <img src="/logo_name.svg" alt="Lembria" class="h-7 object-contain" />
    
      </NuxtLink>

      <!-- Center destinations — MD3 Navigation Bar style with indicator pills -->
      <nav class="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="group flex items-center gap-2 h-9 px-4 rounded-full transition-all duration-200 ease-in-out cursor-pointer"
          :class="isActive(item.to)
            ? 'bg-secondary-container text-on-secondary-container'
            : 'text-on-surface-variant hover:bg-on-surface-variant/8 hover:text-on-surface'"
          :aria-current="isActive(item.to) ? 'page' : undefined"
        >
          <span class="material-symbols-outlined select-none" style="font-size:1.25rem;line-height:1">{{ item.icon }}</span>
          <span class="text-[13px] font-medium tracking-wide">{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2 shrink-0">
        <NuxtLink
          to="/sign-in"
          class="hidden lg:inline-flex items-center gap-1.5 h-9 px-4 rounded-full border border-outline text-primary text-sm font-medium transition-all duration-200 hover:bg-primary/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span class="material-symbols-outlined select-none" style="font-size:1rem;line-height:1">login</span>
          Sign In
        </NuxtLink>
        <NuxtLink
          to="/sign-up"
          class="inline-flex items-center gap-1.5 h-9 px-5 rounded-full bg-primary text-on-primary text-sm font-semibold shadow-sm transition-all duration-200 hover:bg-primary/92 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span class="material-symbols-outlined select-none" style="font-size:1rem;line-height:1">person_add</span>
          <span class="hidden lg:inline">Get Started</span>
        </NuxtLink>
      </div>
    </header>

    <!-- ================================================================
         MOBILE: Navigation Drawer (MD3 modal drawer) — slides in from left
         ================================================================ -->
    <!-- Scrim -->
    <Transition name="scrim">
      <div
        v-if="drawerOpen"
        class="md:hidden fixed inset-0 z-50 bg-scrim/40"
        aria-hidden="true"
        @click="drawerOpen = false"
      />
    </Transition>

    <!-- Drawer panel -->
    <Transition name="drawer">
      <nav
        v-if="drawerOpen"
        id="mobile-drawer"
        class="md:hidden fixed left-0 top-0 bottom-0 z-50 flex flex-col w-72 bg-surface-container-low rounded-r-[1.75rem] shadow-xl overflow-y-auto"
        role="navigation"
        aria-label="Main navigation"
      >
        <!-- Drawer header -->
        <div class="flex items-center justify-between h-14 px-4 border-b border-outline-variant/50">
          <NuxtLink to="/" class="flex items-center gap-2" @click="drawerOpen = false">
            <img src="/logo_name.svg" alt="Lembria" class="h-7 object-contain" />
          </NuxtLink>
          <button
            type="button"
            class="flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant transition-colors duration-200 hover:bg-on-surface-variant/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close navigation menu"
            @click="drawerOpen = false"
          >
            <span class="material-symbols-outlined select-none text-2xl">close</span>
          </button>
        </div>

        <!-- Destination items -->
        <div class="flex flex-col gap-0.5 px-3 pt-3">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="group flex items-center gap-3 h-14 px-4 rounded-full transition-all duration-200"
            :class="isActive(item.to)
              ? 'bg-secondary-container text-on-secondary-container'
              : 'text-on-surface-variant hover:bg-on-surface-variant/8 hover:text-on-surface'"
            :aria-current="isActive(item.to) ? 'page' : undefined"
            @click="drawerOpen = false"
          >
            <span class="material-symbols-outlined select-none shrink-0" style="font-size:1.375rem;line-height:1">{{ item.icon }}</span>
            <span class="text-sm font-medium tracking-wide">{{ item.label }}</span>
          </NuxtLink>
        </div>

        <!-- Divider -->
        <div class="mx-4 my-3 h-px bg-outline-variant/50" aria-hidden="true" />

        <!-- Auth actions -->
        <div class="flex flex-col gap-2 px-4">
          <NuxtLink
            to="/sign-in"
            class="flex items-center gap-3 h-14 px-4 rounded-full text-on-surface-variant hover:bg-on-surface-variant/8 hover:text-on-surface transition-all duration-200"
            :class="isActive('/sign-in') ? 'bg-secondary-container text-on-secondary-container' : ''"
            @click="drawerOpen = false"
          >
            <span class="material-symbols-outlined select-none shrink-0" style="font-size:1.375rem;line-height:1">login</span>
            <span class="text-sm font-medium tracking-wide">Sign In</span>
          </NuxtLink>
          <NuxtLink
            to="/sign-up"
            class="flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-primary text-on-primary text-sm font-semibold shadow-sm transition-all duration-200 hover:bg-primary/92 hover:shadow-md"
            @click="drawerOpen = false"
          >
            <span class="material-symbols-outlined select-none" style="font-size:1rem;line-height:1">person_add</span>
            Get Started
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from '#vue-router'

const route = useRoute()
const drawerOpen = ref(false)

// Close drawer on route change
watch(() => route.path, () => { drawerOpen.value = false })

const navItems = [
  { to: '/',             label: 'Home',         icon: 'home'          },
  { to: '/how-it-works', label: 'How it works',  icon: 'help'          },
  { to: '/stories',      label: 'Stories',       icon: 'auto_stories'  },
  { to: '/trust',        label: 'Trust',         icon: 'verified_user' },
]

const isActive = (path: string): boolean => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<style>
.scrim-enter-active,
.scrim-leave-active { transition: opacity 0.25s ease; }
.scrim-enter-from,
.scrim-leave-to    { opacity: 0; }

.drawer-enter-active,
.drawer-leave-active { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.drawer-enter-from,
.drawer-leave-to    { transform: translateX(-100%); }
</style>
