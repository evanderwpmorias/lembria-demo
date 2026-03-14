<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from '#vue-router'
import { appAccountMenu } from '@/data/menus'
import { useActiveUserStore } from '@/stores/user'
import { iconBtnStandard, topAppBar, topAppBarTrailing } from '@/theme/md-theme'

const props = defineProps<{
  isMobileDrawerOpen: boolean
  isRailExpanded: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-mobile-drawer'): void
  (e: 'toggle-rail'): void
}>()

const route = useRoute()
const userStore = useActiveUserStore()
const accountOpen = ref(false)
const searchText = ref('')
const mobileSearchOpen = ref(false)

watch(() => route.path, () => {
  accountOpen.value = false
  mobileSearchOpen.value = false
  searchText.value = ''
})

const accountItems = appAccountMenu.menuItems
const user = computed(() => userStore.user)

const userName = computed(() => {
  const currentUser = user.value
  if (!currentUser)
    return 'Account'

  return currentUser.displayName || currentUser.email?.split('@')[0] || 'Account'
})

const userAvatarUrl = computed(() => user.value?.photoURL || '')
const userInitials = computed(() => {
  const name = userName.value.trim()
  if (!name)
    return 'A'

  const parts = name.split(' ').filter(Boolean)
  if (parts.length === 1)
    return parts[0]!.slice(0, 2).toUpperCase()

  return `${parts[0]![0] || ''}${parts[1]![0] || ''}`.toUpperCase()
})

const handleLogout = async () => {
  await userStore.logoutUser()
  await navigateTo('/sign-in')
}

const isAccountActive = (path: string): boolean => {
  if (path === '/app/account')
    return route.path.startsWith('/app/account') || route.path.startsWith('/app/profile')

  return route.path.startsWith(path)
}
</script>

<template>
  <header :class="topAppBar" class="px-3 md:px-5">
    <div class="w-full">
      <div class="flex h-14 items-center gap-2 md:h-16">
        <!-- Menu / rail toggle -->
        <div class="md:w-20">
          <button
            type="button"
            :class="iconBtnStandard"
            class="md:hidden"
            :aria-expanded="props.isMobileDrawerOpen"
            aria-label="Open navigation drawer"
            @click="emit('toggle-mobile-drawer')"
          >
            <span class="material-symbols-outlined">menu</span>
          </button>

          <div class="hidden md:inline-flex">
            <button
              type="button"
              :class="iconBtnStandard"
              :aria-expanded="props.isRailExpanded"
              aria-label="Expand navigation rail"
              @click="emit('toggle-rail')"
            >
              <span class="material-symbols-outlined">{{ props.isRailExpanded ? 'menu' : 'menu_open' }}</span>
            </button>
          </div>
        </div>

        <!-- Logo -->
        <NuxtLink to="/app/home" class="flex shrink-0 items-center gap-2 px-1">
          <img src="/logo_name.svg" alt="Lembria" class="hidden md:inline h-7 object-contain md:h-8" />
          <img src="/logo_slim.svg" alt="Lembria" class="md:hidden h-7 object-contain md:h-8" />
        </NuxtLink>

        <!-- Desktop search bar -->
        <div class="hidden min-w-0 flex-1 md:block">
          <label class="flex h-11 items-center gap-2 max-w-2xl mx-auto rounded-full border border-outline bg-surface-container px-4 text-on-surface-variant">
            <span class="material-symbols-outlined text-[20px]">search</span>
            <input
              v-model="searchText"
              type="search"
              class="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
              placeholder="Search memories, people, events, topics, stories..."
              aria-label="Search across family archive"
            >
          </label>
        </div>

        <!-- Mobile search bar (shown when mobileSearchOpen) -->
        <Transition name="search-expand">
          <div v-if="mobileSearchOpen" class="min-w-0 flex-1 md:hidden">
            <label class="flex h-11 items-center gap-2 rounded-full border border-outline bg-surface-container px-4 text-on-surface-variant">
              <span class="material-symbols-outlined text-[20px]">search</span>
              <input
                v-model="searchText"
                type="search"
                class="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
                placeholder="Search..."
                aria-label="Search across family archive"
                autofocus
              >
            </label>
          </div>
        </Transition>

        <!-- Trailing actions -->
        <div :class="topAppBarTrailing" class="ml-auto">
          <!-- Mobile search open button (hidden when search is active) -->
          <button
            v-if="!mobileSearchOpen"
            type="button"
            :class="iconBtnStandard"
            class="md:hidden"
            aria-label="Open search"
            @click="mobileSearchOpen = true"
          >
            <span class="material-symbols-outlined">search</span>
          </button>

          <!-- Notifications (hidden on mobile when search is active) -->
          <NuxtLink
             v-if="!mobileSearchOpen"
            :class="[iconBtnStandard, mobileSearchOpen ? 'hidden md:inline-flex' : '']"
            to="/app/profile/notifications"
            aria-label="Notifications"
          >
            <span class="material-symbols-outlined">notifications</span>
          </NuxtLink>

          <!-- Account menu (hidden on mobile when search is active) -->
          <div class="relative" :class="mobileSearchOpen ? 'hidden md:block' : ''">
            <button
              type="button"
              class="inline-flex h-10 items-center gap-2 rounded-full border border-outline px-2.5 text-on-surface transition-colors hover:bg-on-surface/8"
              :aria-expanded="accountOpen"
              aria-label="Open account menu"
              @click="accountOpen = !accountOpen"
            >
              <img v-if="userAvatarUrl" :src="userAvatarUrl" alt="User avatar" class="h-6 w-6 rounded-full object-cover">
              <span v-else class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary-container text-[11px] font-semibold text-on-secondary-container">{{ userInitials }}</span>
              <span class="hidden max-w-28 truncate text-sm font-medium lg:inline">{{ userName }}</span>
              <span class="material-symbols-outlined text-[20px]">arrow_drop_down</span>
            </button>

            <Transition name="fade-scale">
              <div
                v-if="accountOpen"
                class="absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-outline-variant bg-surface-container p-2 shadow-xl"
              >
                <div class="mb-2 rounded-xl bg-surface-container-high px-3 py-2">
                  <p class="truncate text-sm font-semibold text-on-surface">{{ userName }}</p>
                  <p class="truncate text-xs text-on-surface-variant">{{ user?.email || 'No email available' }}</p>
                </div>

                <NuxtLink
                  v-for="item in accountItems.filter((item) => item.type !== 'action')"
                  :key="item.url"
                  :to="item.url"
                  class="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-on-surface-variant transition-colors hover:bg-on-surface-variant/8"
                  :class="isAccountActive(item.url) ? 'bg-secondary-container text-on-secondary-container' : ''"
                  @click="accountOpen = false"
                >
                  <span class="material-symbols-outlined text-[19px]">{{ item.icon }}</span>
                  <span>{{ item.displayText }}</span>
                </NuxtLink>

                <div class="my-1 h-px bg-outline-variant" />

                <button
                  type="button"
                  class="flex w-full min-h-11 items-center gap-3 rounded-xl px-3 text-left text-sm text-error transition-colors hover:bg-error/10"
                  @click="handleLogout"
                >
                  <span class="material-symbols-outlined text-[19px]">logout</span>
                  <span>Logout</span>
                </button>
              </div>
            </Transition>
          </div>

          <!-- Mobile close search button (shown when search is active) -->
          <button
            v-if="mobileSearchOpen"
            type="button"
            :class="iconBtnStandard"
            class="md:hidden"
            aria-label="Close search"
            @click="mobileSearchOpen = false; searchText = ''"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.16s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

.search-expand-enter-active,
.search-expand-leave-active {
  transition: all 0.2s ease;
}

.search-expand-enter-from,
.search-expand-leave-to {
  opacity: 0;
  transform: scaleX(0.9);
}
</style>
