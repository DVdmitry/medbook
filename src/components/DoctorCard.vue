<script setup lang="ts">
import type { Doctor } from '@/types/medical.types';
import { specialtyDescriptions } from '@/constants/specialties';
import {
  AcademicCapIcon,
  LanguageIcon,
  CurrencyDollarIcon,
  CalendarIcon
} from '@heroicons/vue/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid';

interface Props {
  doctor: Doctor;
  variant?: 'compact' | 'full';
  showBookButton?: boolean;
  interactive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'full',
  showBookButton: true,
  interactive: true
});

const emit = defineEmits<{
  book: [doctorId: string];
}>();
</script>

<template>
  <div
    :class="[
      'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-5 sm:p-6',
      interactive && variant === 'full' ? 'hover:shadow-soft-md hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 group' : '',
      variant === 'full' ? 'animate-fade-in-up' : ''
    ]"
  >
    <!-- Doctor Header -->
    <div class="flex items-start gap-4" :class="{ 'mb-5': variant === 'full' }">
      <div class="relative flex-shrink-0">
        <img
          :src="doctor.avatar"
          :alt="doctor.name"
          :class="[
            'rounded-2xl object-cover ring-2 ring-neutral-200 dark:ring-neutral-700 transition-all duration-300',
            variant === 'compact' ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-16 h-16',
            interactive ? 'group-hover:ring-primary-300 dark:group-hover:ring-primary-700 group-hover:shadow-soft' : ''
          ]"
          loading="lazy"
        />
        <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-white dark:border-neutral-800 shadow-soft-sm" />
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-bold text-neutral-900 dark:text-white truncate group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
          {{ doctor.name }}
        </h3>
        <p class="text-primary-600 dark:text-primary-400 font-semibold text-sm">
          {{ doctor.specialtyLabel }}
        </p>
        <div class="flex items-center gap-1.5 mt-1.5">
          <div class="flex items-center">
            <StarIconSolid class="w-4 h-4 text-warning-500" />
          </div>
          <span class="text-sm font-bold text-neutral-900 dark:text-white">
            {{ doctor.rating }}
          </span>
          <template v-if="variant === 'full'">
            <span class="text-sm text-neutral-500 dark:text-neutral-400">
              ({{ doctor.reviewCount }} reviews)
            </span>
          </template>
          <template v-else>
            <span class="text-neutral-300 dark:text-neutral-600">|</span>
            <span class="text-sm text-neutral-600 dark:text-neutral-400">{{ doctor.experience }} yrs exp</span>
            <span class="text-neutral-300 dark:text-neutral-600">|</span>
            <span class="text-sm font-bold text-neutral-900 dark:text-white">${{ doctor.consultationFee }}</span>
          </template>
        </div>
      </div>
    </div>

    <!-- Extended Info (full variant only) -->
    <template v-if="variant === 'full'">
      <!-- Doctor Info -->
      <div class="space-y-2.5 mb-5">
        <div class="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <div class="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-colors">
            <CalendarIcon class="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
          </div>
          <span>{{ doctor.experience }} years experience</span>
        </div>

        <div class="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <div class="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-colors">
            <AcademicCapIcon class="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
          </div>
          <span class="truncate">{{ doctor.education }}</span>
        </div>

        <div class="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <div class="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-colors">
            <LanguageIcon class="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
          </div>
          <span>{{ doctor.languages.join(', ') }}</span>
        </div>
      </div>

      <!-- Specialty Description -->
      <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed line-clamp-2">
        {{ specialtyDescriptions[doctor.specialty] }}
      </p>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-5 border-t border-neutral-200 dark:border-neutral-700">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center">
            <CurrencyDollarIcon class="w-4 h-4 text-accent-500" />
          </div>
          <div>
            <span class="text-xl font-bold text-neutral-900 dark:text-white">${{ doctor.consultationFee }}</span>
            <span class="text-sm text-neutral-500 dark:text-neutral-400 ml-1">/ visit</span>
          </div>
        </div>
        <button
          v-if="showBookButton"
          @click="emit('book', doctor.id)"
          class="btn btn-sm bg-primary-600 text-white hover:bg-primary-700"
        >
          Book Now
        </button>
      </div>
    </template>
  </div>
</template>
