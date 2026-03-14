<script setup lang="ts">
import { useRoute } from '#vue-router'
import { appBottomNavMenu } from '@/data/menus'
import { navBar, navBarIconActive, navBarItem } from '@/theme/md-theme'

const route = useRoute()
const bottomItems = appBottomNavMenu.menuItems

const isActive = (path: string): boolean => {
	if (path === '/app/home')
		return route.path === '/app' || route.path.startsWith('/app/home')

	if (path === '/app/stories')
		return route.path.startsWith('/app/stories') || route.path.startsWith('/app/studio')

	return route.path.startsWith(path)
}
</script>

<template>
	<nav :class="navBar" class="fixed bottom-0 left-0 right-0 z-40 border-t border-outline-variant md:hidden" aria-label="Mobile primary navigation">
		<NuxtLink
			v-for="item in bottomItems"
			:key="item.url"
			:to="item.url"
			:class="navBarItem"
			:aria-selected="isActive(item.url) ? 'true' : undefined"
		>
			<span
				class="material-symbols-outlined text-[22px]"
				:class="isActive(item.url) ? navBarIconActive : ''"
			>
				{{ item.icon }}
			</span>
			<span class="text-[11px] leading-3">{{ item.displayText }}</span>
		</NuxtLink>
	</nav>
</template>
