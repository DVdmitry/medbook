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
      'card p-4 sm:p-6',
      interactive && variant === 'full' ? 'card-interactive' : '',
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
            'rounded-xl object-cover ring-2 ring-neutral-100 dark:ring-neutral-800',
            variant === 'compact' ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-16 h-16'
          ]"
          loading="lazy"
        />
        <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-white dark:border-neutral-900" />
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white truncate">
          {{ doctor.name }}
        </h3>
        <p class="text-primary-600 dark:text-primary-400 font-medium text-sm">
          {{ doctor.specialtyLabel }}
        </p>
        <div class="flex items-center gap-1.5 mt-1.5">
          <div class="flex items-center">
            <StarIconSolid class="w-4 h-4 text-warning-500" />
          </div>
          <span class="text-sm font-semibold text-neutral-900 dark:text-white">
            {{ doctor.rating }}
          </span>
          <template v-if="variant === 'full'">
            <span class="text-sm text-neutral-500 dark:text-neutral-400">
              ({{ doctor.reviewCount }} reviews)
            </span>
          </template>
          <template v-else>
            <span class="text-neutral-300 dark:text-neutral-700">|</span>
            <span class="text-sm text-neutral-600 dark:text-neutral-400">{{ doctor.experience }} yrs exp</span>
            <span class="text-neutral-300 dark:text-neutral-700">|</span>
            <span class="text-sm font-semibold text-neutral-900 dark:text-white">${{ doctor.consultationFee }}</span>
          </template>
        </div>
      </div>
    </div>

    <!-- Extended Info (full variant only) -->
    <template v-if="variant === 'full'">
      <!-- Doctor Info -->
      <div class="space-y-2.5 mb-5">
        <div class="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400">
          <div class="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
            <CalendarIcon class="w-4 h-4" />
          </div>
          <span>{{ doctor.experience }} years experience</span>
        </div>

        <div class="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400">
          <div class="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
            <AcademicCapIcon class="w-4 h-4" />
          </div>
          <span class="truncate">{{ doctor.education }}</span>
        </div>

        <div class="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400">
          <div class="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
            <LanguageIcon class="w-4 h-4" />
          </div>
          <span>{{ doctor.languages.join(', ') }}</span>
        </div>
      </div>

      <!-- Specialty Description -->
      <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed line-clamp-2">
        {{ specialtyDescriptions[doctor.specialty] }}
      </p>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <div class="flex items-center gap-1.5">
          <CurrencyDollarIcon class="w-5 h-5 text-neutral-400" />
          <span class="text-xl font-bold text-neutral-900 dark:text-white">${{ doctor.consultationFee }}</span>
          <span class="text-sm text-neutral-500">/ visit</span>
        </div>
        <button
          v-if="showBookButton"
          @click="emit('book', doctor.id)"
          class="btn-primary btn-sm"
        >
          Book Now
        </button>
      </div>
    </template>
  </div>
</template>
