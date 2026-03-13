<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from '#vue-router'
import {
  topAppBar,
  topAppBarTrailing,
  topNavItemActive,
  topNavItemInactive,
  iconBtnStandard,
  btnOutlined,
  btnFilled,
  navDrawerModal,
  navDrawerItem,
  dividerHorizontal,
  scrim,
} from '@/theme/md-theme'

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

<template>
  <!-- ================================================================
       Top App Bar — MD3 Small Top App Bar (64dp)
       ================================================================ -->
  <header :class="topAppBar" class="text-base">
    <!-- Leading: hamburger toggle (mobile only) -->
    <button
      type="button"
      :class="[iconBtnStandard, 'md:hidden']"
      :aria-expanded="drawerOpen"
      aria-controls="mobile-drawer"
      aria-label="Toggle navigation menu"
      @click="drawerOpen = !drawerOpen"
    >
      <span class="material-symbols-outlined select-none text-2xl">
        {{ drawerOpen ? 'close' : 'menu' }}
      </span>
    </button>

    <!-- Logo / brand -->
    <NuxtLink to="/" class="flex items-center gap-3 shrink-0">
      <img src="/logo_name.svg" alt="Lembria" class="h-7 object-contain" />
    </NuxtLink>

    <!-- Centre destinations — pill indicator nav (desktop only) -->
    <nav class="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :class="isActive(item.to) ? topNavItemActive : topNavItemInactive"
        :aria-current="isActive(item.to) ? 'page' : undefined"
      >
        <span class="material-symbols-outlined select-none" style="font-size:1.25rem;line-height:1">{{ item.icon }}</span>
        <b>{{ item.label }}</b>
      </NuxtLink>
    </nav>

    <!-- Trailing actions -->
    <div :class="topAppBarTrailing">
      <!-- Sign In — desktop only -->
      <div class="hidden lg:flex">
        <NuxtLink to="/sign-in" :class="btnOutlined">
          <span class="material-symbols-outlined select-none" style="font-size:1rem;line-height:1">login</span>
          Sign In
        </NuxtLink>
      </div>
      <!-- Get Started — always visible -->
      <NuxtLink to="/sign-up" :class="btnFilled">
        <span class="material-symbols-outlined select-none" style="font-size:1rem;line-height:1">person_add</span>
        <span class="hidden lg:inline">Get Started</span>
      </NuxtLink>
    </div>
  </header>

  <!-- ================================================================
       Mobile Navigation Drawer — MD3 modal drawer
       ================================================================ -->
  <!-- Scrim / overlay -->
  <Transition name="scrim">
    <div
      v-if="drawerOpen"
      class="md:hidden fixed inset-0 z-50"
      :class="scrim"
      aria-hidden="true"
      @click="drawerOpen = false"
    />
  </Transition>

  <!-- Drawer panel -->
  <Transition name="drawer">
    <nav
      v-if="drawerOpen"
      id="mobile-drawer"
      class="md:hidden fixed left-0 top-0 bottom-0 z-50 overflow-y-auto"
      :class="navDrawerModal"
      role="navigation"
      aria-label="Main navigation"
    >
      <!-- Drawer header: logo + close -->
      <div class="flex items-center justify-between h-14 px-4 border-b border-outline-variant/50">
        <NuxtLink to="/" class="flex items-center gap-2" @click="drawerOpen = false">
          <img src="/logo_name.svg" alt="Lembria" class="h-7 object-contain" />
        </NuxtLink>
        <button
          type="button"
          :class="iconBtnStandard"
          aria-label="Close navigation menu"
          @click="drawerOpen = false"
        >
          <span class="material-symbols-outlined select-none text-2xl">close</span>
        </button>
      </div>

      <!-- Destination items -->
      <div class="flex flex-col gap-0.5 pt-3">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="navDrawerItem"
          :aria-current="isActive(item.to) ? 'page' : undefined"
          :aria-selected="isActive(item.to) ? 'true' : undefined"
          @click="drawerOpen = false"
        >
          <span class="material-symbols-outlined select-none shrink-0" style="font-size:1.375rem;line-height:1">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </NuxtLink>
      </div>

      <!-- Divider -->
      <div class="my-3" :class="dividerHorizontal" aria-hidden="true" />

      <!-- Auth actions -->
      <div class="flex flex-col gap-2">
        <NuxtLink
          to="/sign-in"
          :class="navDrawerItem"
          :aria-selected="isActive('/sign-in') ? 'true' : undefined"
          @click="drawerOpen = false"
        >
          <span class="material-symbols-outlined select-none shrink-0" style="font-size:1.375rem;line-height:1">login</span>
          <span>Sign In</span>
        </NuxtLink>
        <div class="mx-3 mt-1">
          <NuxtLink
            to="/sign-up"
            :class="[btnFilled, 'w-full']"
            @click="drawerOpen = false"
          >
            <span class="material-symbols-outlined select-none" style="font-size:1rem;line-height:1">person_add</span>
            Get Started
          </NuxtLink>
        </div>
      </div>
    </nav>
  </Transition>
</template>


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
