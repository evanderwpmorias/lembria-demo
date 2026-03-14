<template>
  <footer class="border-t border-white/10 bg-black/20 px-2 py-4 text-center">
        <div>
        <p class="mt-2">&copy; {{ currentYear }} Lembria. All rights reserved.</p>
      </div>

      <div class="flex flex-wrap gap-5 justify-center">
        <NuxtLink
          v-for="item in footerLegalMenu.menuItems"
          :key="item.url"
          :to="item.url"
          class="transition hover:text-white"
        >
          {{ item.displayText }}
        </NuxtLink>
      </div>
  </footer>
</template>

<script setup lang="ts">
import { footerLegalMenu } from '@/data/menus'

const currentYear = new Date().getFullYear()
</script>