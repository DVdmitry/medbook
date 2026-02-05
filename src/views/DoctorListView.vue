<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useApi } from '@/composables/useApi';
import type { Doctor, Specialty } from '@/types/medical.types';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  FunnelIcon,
  SparklesIcon,
} from '@heroicons/vue/24/outline';
import DoctorCard from '@/components/DoctorCard.vue';

const router = useRouter();
const route = useRoute();
const { getDoctors } = useApi();

const doctors = ref<Doctor[]>([]);
const selectedSpecialty = ref<Specialty | 'all'>('all');
const searchQuery = ref('');
const isLoading = ref(true);

async function loadDoctors() {
  isLoading.value = true;
  doctors.value = await getDoctors();
  isLoading.value = false;
}

onMounted(async () => {
  const specialtyParam = route.query.specialty as string;
  if (specialtyParam && specialtyParam !== 'all') {
    selectedSpecialty.value = specialtyParam as Specialty;
  }

  await loadDoctors();
});

const specialties: Array<{ value: Specialty | 'all'; label: string; emoji: string }> = [
  { value: 'all', label: 'All Specialties', emoji: '✨' },
  { value: 'cardiologist', label: 'Cardiology', emoji: '❤️' },
  { value: 'dermatologist', label: 'Dermatology', emoji: '🧴' },
  { value: 'general-practitioner', label: 'General Practice', emoji: '🩺' },
  { value: 'orthopedic-surgeon', label: 'Orthopedics', emoji: '🦴' },
  { value: 'neurologist', label: 'Neurology', emoji: '🧠' },
  { value: 'gastroenterologist', label: 'Gastroenterology', emoji: '🫁' },
  { value: 'pediatrician', label: 'Pediatrics', emoji: '👶' }
];

const filteredDoctors = computed(() => {
  let result = doctors.value;

  if (selectedSpecialty.value !== 'all') {
    result = result.filter((d) => d.specialty === selectedSpecialty.value);
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.specialtyLabel.toLowerCase().includes(query)
    );
  }

  return result;
});

const activeFiltersCount = computed(() => {
  let count = 0;
  if (selectedSpecialty.value !== 'all') count++;
  if (searchQuery.value) count++;
  return count;
});

function bookDoctor(doctorId: string) {
  router.push(`/booking/${doctorId}`);
}

function clearFilters() {
  selectedSpecialty.value = 'all';
  searchQuery.value = '';
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-950">
    <!-- Hero Header -->
    <div class="relative bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <!-- Decorative background -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-200/20 dark:bg-accent-900/10 rounded-full blur-3xl"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div class="text-center max-w-3xl mx-auto">
          <!-- Decorative badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 rounded-full border border-primary-200 dark:border-primary-800 mb-6">
            <SparklesIcon class="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span class="text-sm font-semibold text-primary-700 dark:text-primary-300">Trusted Healthcare Professionals</span>
          </div>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-5">
            Find Your
            <span class="text-primary-600 dark:text-primary-400">Perfect Doctor</span>
          </h1>
          <p class="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Browse our network of qualified healthcare professionals and book your appointment with confidence
          </p>

          <!-- Search Bar -->
          <div class="max-w-xl mx-auto mt-10">
            <div class="relative group">
              <div class="absolute -inset-1 bg-gradient-to-r from-primary-300 to-accent-300 dark:from-primary-700 dark:to-accent-700 rounded-3xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300"></div>
              <div class="relative">
                <MagnifyingGlassIcon class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search by doctor name or specialty..."
                  class="w-full pl-14 pr-14 py-4 rounded-2xl bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 text-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/50 transition-all duration-300"
                />
                <button
                  v-if="searchQuery"
                  @click="searchQuery = ''"
                  class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  aria-label="Clear search"
                >
                  <XMarkIcon class="w-5 h-5 text-neutral-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters & Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Filter Pills -->
      <div class="mb-10">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-9 h-9 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
            <FunnelIcon class="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <span class="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Filter by specialty</span>
          <span
            v-if="activeFiltersCount > 0"
            class="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
          >
            {{ activeFiltersCount }} active
          </span>
        </div>

        <div class="flex flex-wrap gap-3">
          <button
            v-for="specialty in specialties"
            :key="specialty.value"
            @click="selectedSpecialty = specialty.value"
            class="px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-300"
            :class="selectedSpecialty === specialty.value
              ? 'bg-primary-600 text-white border-primary-600 shadow-soft'
              : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400'"
          >
            <span class="mr-1.5">{{ specialty.emoji }}</span>
            {{ specialty.label }}
          </button>
        </div>
      </div>

      <!-- Results Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <span class="text-neutral-600 dark:text-neutral-400">
            <span class="text-2xl font-bold text-neutral-900 dark:text-white">{{ filteredDoctors.length }}</span>
            <span class="ml-1">doctor{{ filteredDoctors.length !== 1 ? 's' : '' }} found</span>
          </span>
          <button
            v-if="activeFiltersCount > 0"
            @click="clearFilters"
            class="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline transition-colors"
          >
            Clear filters
          </button>
        </div>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="i in 6"
          :key="i"
          class="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-6 animate-pulse"
        >
          <div class="flex items-start gap-4 mb-5">
            <div class="w-16 h-16 rounded-2xl bg-neutral-200 dark:bg-neutral-700"></div>
            <div class="flex-1 space-y-2">
              <div class="h-5 w-3/4 rounded-lg bg-neutral-200 dark:bg-neutral-700"></div>
              <div class="h-4 w-1/2 rounded-lg bg-neutral-200 dark:bg-neutral-700"></div>
              <div class="h-4 w-1/3 rounded-lg bg-neutral-200 dark:bg-neutral-700"></div>
            </div>
          </div>
          <div class="space-y-3 mb-5">
            <div class="h-4 w-full rounded-lg bg-neutral-200 dark:bg-neutral-700"></div>
            <div class="h-4 w-full rounded-lg bg-neutral-200 dark:bg-neutral-700"></div>
            <div class="h-4 w-2/3 rounded-lg bg-neutral-200 dark:bg-neutral-700"></div>
          </div>
          <div class="h-12 w-full rounded-2xl bg-neutral-200 dark:bg-neutral-700"></div>
        </div>
      </div>

      <!-- Doctor Cards Grid -->
      <div v-else-if="filteredDoctors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DoctorCard
          v-for="doctor in filteredDoctors"
          :key="doctor.id"
          :doctor="doctor"
          variant="full"
          @book="bookDoctor"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="max-w-md mx-auto bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-12">
          <div class="w-20 h-20 mx-auto mb-6 rounded-3xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
            <MagnifyingGlassIcon class="w-10 h-10 text-neutral-400" />
          </div>
          <h3 class="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
            No doctors found
          </h3>
          <p class="text-neutral-600 dark:text-neutral-400 mb-8">
            Try adjusting your search or filters to find what you're looking for
          </p>
          <button
            @click="clearFilters"
            class="btn bg-primary-600 text-white hover:bg-primary-700"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
