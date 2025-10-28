<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { doctors, specialtyDescriptions } from '@/data/doctors';
import type { Specialty } from '@/types/medical.types';

const router = useRouter();
const selectedSpecialty = ref<Specialty | 'all'>('all');
const searchQuery = ref('');

const specialties: Array<{ value: Specialty | 'all'; label: string }> = [
  { value: 'all', label: 'All Specialties' },
  { value: 'cardiologist', label: 'Cardiology' },
  { value: 'dermatologist', label: 'Dermatology' },
  { value: 'general-practitioner', label: 'General Practice' },
  { value: 'orthopedic-surgeon', label: 'Orthopedic Surgery' },
  { value: 'neurologist', label: 'Neurology' },
  { value: 'gastroenterologist', label: 'Gastroenterology' },
  { value: 'pediatrician', label: 'Pediatrics' }
];

const filteredDoctors = computed(() => {
  let result = doctors;

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

function bookDoctor(doctorId: string) {
  router.push(`/booking/${doctorId}`);
}
</script>

<template>
  <div class="py-12 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Find Your Doctor</h1>
        <p class="text-xl text-gray-600">
          Browse our network of qualified healthcare professionals
        </p>
      </div>

      <!-- Search and Filter -->
      <div class="mb-8 space-y-4">
        <div class="max-w-2xl mx-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by doctor name or specialty..."
            class="form-input text-lg"
          />
        </div>

        <div class="flex flex-wrap justify-center gap-2">
          <button
            v-for="specialty in specialties"
            :key="specialty.value"
            @click="selectedSpecialty = specialty.value"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-all',
              selectedSpecialty === specialty.value
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            ]"
          >
            {{ specialty.label }}
          </button>
        </div>
      </div>

      <!-- Results count -->
      <div class="text-center mb-6 text-gray-600">
        <p>Found {{ filteredDoctors.length }} doctor{{ filteredDoctors.length !== 1 ? 's' : '' }}</p>
      </div>

      <!-- Doctor Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="doctor in filteredDoctors"
          :key="doctor.id"
          class="card hover:scale-105 transition-transform duration-200"
        >
          <!-- Doctor Avatar -->
          <div class="flex items-start space-x-4 mb-4">
            <img
              :src="doctor.avatar"
              :alt="doctor.name"
              class="w-20 h-20 rounded-full object-cover"
            />
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900">{{ doctor.name }}</h3>
              <p class="text-primary-600 font-medium">{{ doctor.specialtyLabel }}</p>
              <div class="flex items-center mt-1">
                <span class="text-yellow-500">★</span>
                <span class="ml-1 text-sm text-gray-600">
                  {{ doctor.rating }} ({{ doctor.reviewCount }} reviews)
                </span>
              </div>
            </div>
          </div>

          <!-- Doctor Info -->
          <div class="space-y-2 mb-4 text-sm text-gray-600">
            <p>
              <span class="font-medium text-gray-700">Experience:</span>
              {{ doctor.experience }} years
            </p>
            <p>
              <span class="font-medium text-gray-700">Education:</span>
              {{ doctor.education }}
            </p>
            <p>
              <span class="font-medium text-gray-700">Languages:</span>
              {{ doctor.languages.join(', ') }}
            </p>
            <p>
              <span class="font-medium text-gray-700">Consultation Fee:</span>
              ${{ doctor.consultationFee }}
            </p>
          </div>

          <!-- Specialty Description -->
          <p class="text-sm text-gray-600 mb-4 italic">
            {{ specialtyDescriptions[doctor.specialty] }}
          </p>

          <!-- Book Button -->
          <button @click="bookDoctor(doctor.id)" class="btn-primary w-full">
            Book Appointment
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredDoctors.length === 0" class="text-center py-12">
        <p class="text-xl text-gray-600 mb-4">No doctors found matching your criteria</p>
        <button @click="selectedSpecialty = 'all'; searchQuery = ''" class="btn-secondary">
          Clear Filters
        </button>
      </div>
    </div>
  </div>
</template>
