<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useApi } from '@/composables/useApi';
import type { Doctor, Specialty } from '@/types/medical.types';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  FunnelIcon
} from '@heroicons/vue/24/outline';
import DoctorCard from '@/components/DoctorCard.vue';

const router = useRouter();
const route = useRoute();
const { getDoctors, loading: apiLoading } = useApi();

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

const specialties: Array<{ value: Specialty | 'all'; label: string }> = [
  { value: 'all', label: 'All Specialties' },
  { value: 'cardiologist', label: 'Cardiology' },
  { value: 'dermatologist', label: 'Dermatology' },
  { value: 'general-practitioner', label: 'General Practice' },
  { value: 'orthopedic-surgeon', label: 'Orthopedics' },
  { value: 'neurologist', label: 'Neurology' },
  { value: 'gastroenterologist', label: 'Gastroenterology' },
  { value: 'pediatrician', label: 'Pediatrics' }
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
    <!-- Header Section -->
    <div class="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Find Your <span class="text-gradient dark:text-gradient-dark">Doctor</span>
          </h1>
          <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Browse our network of qualified healthcare professionals
          </p>
        </div>

        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto mt-8">
          <div class="relative">
            <MagnifyingGlassIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by doctor name or specialty..."
              class="form-input pl-12 pr-12 py-4 text-lg"
            />
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Clear search"
            >
              <XMarkIcon class="w-5 h-5 text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters & Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filter Pills -->
      <div class="mb-8">
        <div class="flex items-center gap-2 mb-4">
          <FunnelIcon class="w-5 h-5 text-neutral-500" />
          <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Filter by specialty</span>
          <span
            v-if="activeFiltersCount > 0"
            class="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
          >
            {{ activeFiltersCount }} active
          </span>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="specialty in specialties"
            :key="specialty.value"
            @click="selectedSpecialty = specialty.value"
            class="pill transition-all duration-200"
            :class="{ 'pill-active': selectedSpecialty === specialty.value }"
          >
            {{ specialty.label }}
          </button>
        </div>
      </div>

      <!-- Results Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <span class="text-neutral-600 dark:text-neutral-400">
            <span class="font-semibold text-neutral-900 dark:text-white">{{ filteredDoctors.length }}</span>
            doctor{{ filteredDoctors.length !== 1 ? 's' : '' }} found
          </span>
          <button
            v-if="activeFiltersCount > 0"
            @click="clearFilters"
            class="text-sm text-primary-600 dark:text-primary-400 hover:underline"
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
          class="card p-6"
        >
          <div class="flex items-start gap-4 mb-5">
            <div class="skeleton-shimmer w-16 h-16 rounded-xl" />
            <div class="flex-1 space-y-2">
              <div class="skeleton-shimmer h-5 w-3/4 rounded" />
              <div class="skeleton-shimmer h-4 w-1/2 rounded" />
              <div class="skeleton-shimmer h-4 w-1/3 rounded" />
            </div>
          </div>
          <div class="space-y-3 mb-5">
            <div class="skeleton-shimmer h-4 w-full rounded" />
            <div class="skeleton-shimmer h-4 w-full rounded" />
            <div class="skeleton-shimmer h-4 w-2/3 rounded" />
          </div>
          <div class="skeleton-shimmer h-12 w-full rounded-xl" />
        </div>
      </div>

      <!-- Doctor Cards Grid -->
      <div v-else-if="filteredDoctors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
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
        <div class="max-w-md mx-auto card p-12">
          <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <MagnifyingGlassIcon class="w-10 h-10 text-neutral-400" />
          </div>
          <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
            No doctors found
          </h3>
          <p class="text-neutral-600 dark:text-neutral-400 mb-6">
            Try adjusting your search or filters to find what you're looking for
          </p>
          <button
            @click="clearFilters"
            class="btn-primary"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
