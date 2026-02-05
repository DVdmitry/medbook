<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import {
  CalendarDaysIcon,
  ClockIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  HeartIcon,
} from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const sidebarOpen = ref(false);

const navigation = [
  { name: 'Upcoming', href: '/cabinet/appointments', icon: CalendarDaysIcon, description: 'Your scheduled visits' },
  { name: 'History', href: '/cabinet/history', icon: ClockIcon, description: 'Past appointments' },
  { name: 'Profile', href: '/cabinet/profile', icon: UserCircleIcon, description: 'Personal information' },
  { name: 'Settings', href: '/cabinet/settings', icon: Cog6ToothIcon, description: 'Preferences' },
];

const currentPath = computed(() => route.path);

function isActive(href: string) {
  return currentPath.value === href || currentPath.value.startsWith(href + '/');
}

async function handleSignOut() {
  await auth.signOut();
  router.push('/');
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950">
    <!-- Mobile sidebar backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-40 lg:hidden"
        @click="sidebarOpen = false"
      />
    </Transition>

    <!-- Mobile sidebar -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-out"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-if="sidebarOpen"
        class="fixed inset-y-0 left-0 w-72 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 shadow-soft-lg z-50 lg:hidden"
      >
        <div class="flex items-center justify-between p-5 border-b border-neutral-200 dark:border-neutral-800">
          <RouterLink to="/" class="flex items-center gap-3">
            <div class="relative w-10 h-10">
              <div class="absolute inset-0 bg-primary-500 rounded-xl rotate-6 opacity-60"></div>
              <div class="absolute inset-0 bg-accent-400 rounded-xl -rotate-6 opacity-40"></div>
              <div class="relative w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-soft">
                <HeartIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <span class="font-bold text-xl text-neutral-900 dark:text-white">MedBook</span>
          </RouterLink>
          <button
            @click="sidebarOpen = false"
            class="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <div class="px-4 py-3">
          <span class="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">My Cabinet</span>
        </div>

        <nav class="px-3 space-y-1.5">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300"
            :class="[
              isActive(item.href)
                ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-soft-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
            ]"
            @click="sidebarOpen = false"
          >
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              :class="isActive(item.href) ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'"
            >
              <component :is="item.icon" class="w-5 h-5" />
            </div>
            <div class="flex-1">
              <span class="block">{{ item.name }}</span>
              <span class="text-xs font-normal text-neutral-400 dark:text-neutral-500">{{ item.description }}</span>
            </div>
          </RouterLink>
        </nav>
      </aside>
    </Transition>

    <!-- Desktop sidebar -->
    <aside class="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:flex lg:flex-col bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800">
      <!-- Logo -->
      <div class="flex items-center gap-3 p-5 border-b border-neutral-200 dark:border-neutral-800">
        <RouterLink to="/" class="flex items-center gap-3">
          <div class="relative w-10 h-10">
            <div class="absolute inset-0 bg-primary-500 rounded-xl rotate-6 opacity-60"></div>
            <div class="absolute inset-0 bg-accent-400 rounded-xl -rotate-6 opacity-40"></div>
            <div class="relative w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-soft">
              <HeartIcon class="w-5 h-5 text-white" />
            </div>
          </div>
          <span class="font-bold text-xl text-neutral-900 dark:text-white">MedBook</span>
        </RouterLink>
      </div>

      <div class="px-5 py-3">
        <span class="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">My Cabinet</span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 space-y-1.5 overflow-y-auto">
        <RouterLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300"
          :class="[
            isActive(item.href)
              ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-soft-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
          ]"
        >
          <div
            class="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
            :class="isActive(item.href) ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'"
          >
            <component :is="item.icon" class="w-5 h-5" />
          </div>
          <div class="flex-1">
            <span class="block">{{ item.name }}</span>
            <span class="text-xs font-normal text-neutral-400 dark:text-neutral-500">{{ item.description }}</span>
          </div>
        </RouterLink>
      </nav>

      <!-- User section -->
      <div class="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
        <div class="flex items-center gap-3 mb-4 p-3 bg-white dark:bg-neutral-800 rounded-2xl shadow-soft-sm border border-neutral-100 dark:border-neutral-700">
          <div class="w-11 h-11 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-soft">
            {{ auth.initials }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-neutral-900 dark:text-white truncate">
              {{ auth.fullName }}
            </p>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 truncate">
              {{ auth.profile?.email }}
            </p>
          </div>
        </div>
        <div class="flex gap-2">
          <RouterLink
            to="/"
            class="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
          >
            <HomeIcon class="w-4 h-4" />
            Home
          </RouterLink>
          <button
            @click="handleSignOut"
            class="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-xl transition-colors"
          >
            <ArrowRightOnRectangleIcon class="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="lg:pl-72">
      <!-- Mobile header -->
      <header class="lg:hidden sticky top-0 z-30 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800">
        <div class="flex items-center justify-between px-4 py-3">
          <button
            @click="sidebarOpen = true"
            class="p-2 -ml-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
          >
            <Bars3Icon class="w-6 h-6" />
          </button>
          <span class="font-semibold text-neutral-900 dark:text-white">My Cabinet</span>
          <div class="w-10" />
        </div>
      </header>

      <!-- Page content -->
      <main class="p-4 lg:p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
