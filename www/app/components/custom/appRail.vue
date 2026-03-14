<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from '#vue-router'
import { appAccountMenu, appPrimaryNavMenu, appSecondaryNavMenu } from '@/data/menus'
import {
	navDrawerItem,
	navDrawerModal,
	navRailItem,
	navRailItemExpanded,
	navRailIndicatorActive,
	navRailIndicatorInactive,
	navRailIconActive,
	navRailIconInactive,
	navRailLabel,
	navRailLabelActive,
	fabStandard,
	fabExtended,
} from '@/theme/md-theme'

const props = defineProps<{
	mobileOpen: boolean
	expanded: boolean
	userName: string
}>()

const emit = defineEmits<{
	(e: 'close-mobile'): void
	(e: 'toggle-expanded'): void
	(e: 'logout'): void
}>()

const route = useRoute()

watch(() => route.path, () => emit('close-mobile'))

const primaryItems = appPrimaryNavMenu.menuItems
const secondaryItems = appSecondaryNavMenu.menuItems
const accountItems = appAccountMenu.menuItems

const showStudioFab = computed(() => !route.path.toLowerCase().includes('studio'))

const isActive = (path: string): boolean => {
	if (path === '/app/home')
		return route.path === '/app' || route.path.startsWith('/app/home')

	if (path === '/app/family')
		return route.path.startsWith('/app/family')

	if (path === '/app/stories')
		return route.path.startsWith('/app/stories') || route.path.startsWith('/app/studio')

	return route.path.startsWith(path)
}

const desktopWidthClass = computed(() => (props.expanded ? 'md:w-72' : 'md:w-20'))
</script>

<template>
	<aside class="hidden md:block md:shrink-0" :class="desktopWidthClass">
		<div class="sticky top-16 h-[calc(100vh-4rem)] border-r border-outline-variant bg-surface/85 px-2 pb-2 pt-3 backdrop-blur">
			<nav
                class="flex h-full flex-col gap-2" aria-label="App navigation">
				<!-- Studio FAB: icon-only when collapsed, extended when expanded -->
				<NuxtLink
					v-if="showStudioFab"
					to="/app/studio"
					:class="[props.expanded ? fabExtended : fabStandard, props.expanded ? 'w-full justify-start' : 'mx-auto']"
					aria-label="Start new story"
					class="mb-6"
				>
					<span class="material-symbols-outlined text-[24px]" aria-hidden="true">mic</span>
					<span v-if="props.expanded" class="whitespace-nowrap">Start New Story</span>
				</NuxtLink>

				<!-- Primary destinations -->
				<NuxtLink
					v-for="item in primaryItems"
					:key="item.url"
					:to="item.url"
					:class="props.expanded ? navRailItemExpanded : navRailItem"
					:aria-selected="isActive(item.url) ? 'true' : undefined"
				>
					<!-- Condensed: icon inside indicator pill, label below -->
					<div v-if="!props.expanded" :class="isActive(item.url) ? navRailIndicatorActive : navRailIndicatorInactive">
						<span class="material-symbols-outlined" :class="isActive(item.url) ? navRailIconActive : navRailIconInactive">{{ item.icon }}</span>
					</div>
					<!-- Expanded: plain icon in row -->
					<span v-else class="material-symbols-outlined text-[22px]">{{ item.icon }}</span>
					<!-- Label: always visible; condensed = below pill, expanded = inline -->
					<span :class="!props.expanded ? (isActive(item.url) ? navRailLabelActive : navRailLabel) : ''">{{ item.displayText }}</span>
				</NuxtLink>

				<div class="my-2 h-px bg-outline-variant" />

				<!-- Secondary destinations -->
				<NuxtLink
					v-for="item in secondaryItems"
					:key="item.url"
					:to="item.url"
					:class="props.expanded ? navRailItemExpanded : navRailItem"
					:aria-selected="isActive(item.url) ? 'true' : undefined"
				>
					<div v-if="!props.expanded" :class="isActive(item.url) ? navRailIndicatorActive : navRailIndicatorInactive">
						<span class="material-symbols-outlined" :class="isActive(item.url) ? navRailIconActive : navRailIconInactive">{{ item.icon }}</span>
					</div>
					<span v-else class="material-symbols-outlined text-[22px]">{{ item.icon }}</span>
					<span :class="!props.expanded ? (isActive(item.url) ? navRailLabelActive : navRailLabel) : ''">{{ item.displayText }}</span>
				</NuxtLink>

				<div class="mt-auto flex flex-col gap-1">
					<!-- Logout -->
					<button
						type="button"
						:class="props.expanded ? navRailItemExpanded : navRailItem"
						@click="emit('logout')"
					>
						<div
							v-if="!props.expanded"
							:class="navRailIndicatorInactive"
							class="group-hover:bg-error/8!"
						>
							<span class="material-symbols-outlined text-[22px] text-error">logout</span>
						</div>
						<span v-else class="material-symbols-outlined text-[22px] text-error">logout</span>
						<span :class="!props.expanded ? `${navRailLabel} text-error!` : 'text-error'">Logout</span>
					</button>
				</div>
			</nav>
		</div>
	</aside>

	<Transition name="scrim-fade">
		<div
			v-if="props.mobileOpen"
			class="fixed inset-0 z-50 bg-scrim/40 md:hidden"
			@click="emit('close-mobile')"
		/>
	</Transition>

	<Transition name="drawer-slide">
		<aside
			v-if="props.mobileOpen"
			class="fixed left-0 top-0 z-50 h-full md:hidden"
			:class="navDrawerModal"
		>
			<div class="flex items-center justify-between border-b border-outline-variant/60 px-4 py-3">
				<div>
					<p class="text-base font-semibold text-on-surface">Lembria</p>
					<p class="text-xs text-on-surface-variant">Preserve family memory</p>
				</div>
				<button
					type="button"
					class="inline-flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface-variant/8"
					aria-label="Close drawer"
					@click="emit('close-mobile')"
				>
					<span class="material-symbols-outlined">close</span>
				</button>
			</div>

			<nav class="overflow-y-auto px-2 py-3" aria-label="Mobile app navigation">
				<NuxtLink
					v-for="item in primaryItems"
					:key="item.url"
					:to="item.url"
					:class="navDrawerItem"
					class="mx-1"
					:aria-selected="isActive(item.url) ? 'true' : undefined"
					@click="emit('close-mobile')"
				>
					<span class="material-symbols-outlined text-[21px]">{{ item.icon }}</span>
					<span>{{ item.displayText }}</span>
				</NuxtLink>

				<div class="mx-4 my-2 h-px bg-outline-variant" />

				<NuxtLink
					v-for="item in secondaryItems"
					:key="item.url"
					:to="item.url"
					:class="navDrawerItem"
					class="mx-1"
					:aria-selected="isActive(item.url) ? 'true' : undefined"
					@click="emit('close-mobile')"
				>
					<span class="material-symbols-outlined text-[21px]">{{ item.icon }}</span>
					<span>{{ item.displayText }}</span>
				</NuxtLink>

				<div class="mx-4 my-2 h-px bg-outline-variant" />

				<NuxtLink
					v-for="item in accountItems.filter((item) => item.type !== 'action')"
					:key="item.url"
					:to="item.url"
					:class="navDrawerItem"
					class="mx-1"
					:aria-selected="isActive(item.url) ? 'true' : undefined"
					@click="emit('close-mobile')"
				>
					<span class="material-symbols-outlined text-[21px]">{{ item.icon }}</span>
					<span>{{ item.displayText }}</span>
				</NuxtLink>

				<button
					type="button"
					:class="navDrawerItem"
					class="mx-1 w-[calc(100%-8px)] text-error"
					@click="emit('logout')"
				>
					<span class="material-symbols-outlined text-[21px]">logout</span>
					<span>Logout {{ props.userName ? `(${props.userName})` : '' }}</span>
				</button>
			</nav>
		</aside>
	</Transition>
</template>

<style scoped>
.scrim-fade-enter-active,
.scrim-fade-leave-active {
	transition: opacity 0.22s ease;
}

.scrim-fade-enter-from,
.scrim-fade-leave-to {
	opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
	transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
	transform: translateX(-100%);
}
</style>
