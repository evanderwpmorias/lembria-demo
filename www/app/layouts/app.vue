<script setup lang="ts">
import { computed, ref } from 'vue'
import { useActiveUserStore } from '@/stores/user'

const userStore = useActiveUserStore()
const isMobileDrawerOpen = ref(false)
const isRailExpanded = ref(false)

const userName = computed(() => {
  const currentUser = userStore.user
  if (!currentUser)
    return ''

  return currentUser.displayName || currentUser.email?.split('@')[0] || ''
})

const toggleMobileDrawer = () => {
  isMobileDrawerOpen.value = !isMobileDrawerOpen.value
}

const toggleRail = () => {
  isRailExpanded.value = !isRailExpanded.value
}

const closeMobileDrawer = () => {
  isMobileDrawerOpen.value = false
}

const logout = async () => {
  await userStore.logoutUser()
  await navigateTo('/sign-in')
}
</script>

<template>
  <div class="layout-default min-h-screen bg-surface text-on-surface">
    <CustomAppHeader
      :is-mobile-drawer-open="isMobileDrawerOpen"
      :is-rail-expanded="isRailExpanded"
      @toggle-mobile-drawer="toggleMobileDrawer"
      @toggle-rail="toggleRail"
    />

    <div class="flex ">
      <CustomAppRail
        :mobile-open="isMobileDrawerOpen"
        :expanded="isRailExpanded"
        :user-name="userName"
        @close-mobile="closeMobileDrawer"
        @toggle-expanded="toggleRail"
        @logout="logout"
      />

      <main class="min-w-0 flex-1 px-3 pb-24 pt-4 md:px-5 md:pb-8 md:pt-5 lg:px-8">
        <slot />
      </main>
    </div>

    <CustomAppMoblieNavBar />
  </div>
</template>