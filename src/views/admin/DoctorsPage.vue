<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { supabase } from '@/lib/supabase';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  StarIcon,
  MapPinIcon,
  LanguageIcon,
} from '@heroicons/vue/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  location: string;
  languages: string[];
  education: string;
  about: string;
  consultationFee: number;
  isActive: boolean;
}

const doctors = ref<Doctor[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const showModal = ref(false);
const editingDoctor = ref<Doctor | null>(null);
const isSaving = ref(false);
const isDeleting = ref(false);

const form = ref({
  name: '',
  specialty: '',
  experience: 0,
  imageUrl: '',
  location: '',
  languages: '',
  education: '',
  about: '',
  consultationFee: 0,
  isActive: true,
});

onMounted(() => {
  fetchDoctors();
});

async function fetchDoctors() {
  loading.value = true;
  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('name');

    if (error) throw error;

    doctors.value = (data || []).map(d => ({
      id: d.id,
      name: d.name,
      specialty: d.specialty,
      experience: d.experience || 0,
      rating: d.rating || 0,
      reviewCount: d.review_count || 0,
      imageUrl: d.image_url || '',
      location: d.location || '',
      languages: Array.isArray(d.languages) ? d.languages : (d.languages?.split(',') || []),
      education: d.education || '',
      about: d.about || '',
      consultationFee: d.consultation_fee || 0,
      isActive: d.is_active !== false,
    }));
  } catch (e) {
    console.error('Error fetching doctors:', e);
  } finally {
    loading.value = false;
  }
}

const filteredDoctors = computed(() => {
  if (!searchQuery.value) return doctors.value;
  const query = searchQuery.value.toLowerCase();
  return doctors.value.filter(d =>
    d.name.toLowerCase().includes(query) ||
    d.specialty.toLowerCase().includes(query) ||
    d.location.toLowerCase().includes(query)
  );
});

function openAddModal() {
  editingDoctor.value = null;
  form.value = {
    name: '',
    specialty: '',
    experience: 0,
    imageUrl: '',
    location: '',
    languages: '',
    education: '',
    about: '',
    consultationFee: 0,
    isActive: true,
  };
  showModal.value = true;
}

function openEditModal(doctor: Doctor) {
  editingDoctor.value = doctor;
  form.value = {
    name: doctor.name,
    specialty: doctor.specialty,
    experience: doctor.experience,
    imageUrl: doctor.imageUrl,
    location: doctor.location,
    languages: doctor.languages.join(', '),
    education: doctor.education,
    about: doctor.about,
    consultationFee: doctor.consultationFee,
    isActive: doctor.isActive,
  };
  showModal.value = true;
}

async function saveDoctor() {
  isSaving.value = true;
  try {
    const doctorData = {
      name: form.value.name,
      specialty: form.value.specialty,
      experience: form.value.experience,
      image_url: form.value.imageUrl,
      location: form.value.location,
      languages: form.value.languages.split(',').map(l => l.trim()).filter(Boolean),
      education: form.value.education,
      about: form.value.about,
      consultation_fee: form.value.consultationFee,
      is_active: form.value.isActive,
    };

    if (editingDoctor.value) {
      const { error } = await supabase
        .from('doctors')
        .update(doctorData)
        .eq('id', editingDoctor.value.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('doctors')
        .insert(doctorData);
      if (error) throw error;
    }

    showModal.value = false;
    await fetchDoctors();
  } catch (e) {
    console.error('Error saving doctor:', e);
  } finally {
    isSaving.value = false;
  }
}

async function deleteDoctor(doctor: Doctor) {
  if (!confirm(`Are you sure you want to delete ${doctor.name}?`)) return;

  isDeleting.value = true;
  try {
    const { error } = await supabase
      .from('doctors')
      .delete()
      .eq('id', doctor.id);

    if (error) throw error;
    await fetchDoctors();
  } catch (e) {
    console.error('Error deleting doctor:', e);
  } finally {
    isDeleting.value = false;
  }
}

async function toggleActive(doctor: Doctor) {
  try {
    const { error } = await supabase
      .from('doctors')
      .update({ is_active: !doctor.isActive })
      .eq('id', doctor.id);

    if (error) throw error;
    doctor.isActive = !doctor.isActive;
  } catch (e) {
    console.error('Error toggling doctor status:', e);
  }
}
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Doctors</h1>
        <p class="text-gray-400 mt-1">
          Manage doctor profiles and schedules
        </p>
      </div>
      <button
        @click="openAddModal"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
      >
        <PlusIcon class="w-5 h-5" />
        <span>Add Doctor</span>
      </button>
    </div>

    <!-- Search -->
    <div class="relative max-w-md">
      <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search doctors..."
        class="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="bg-gray-800/50 rounded-2xl p-6 animate-pulse">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-16 h-16 bg-gray-700 rounded-full"></div>
          <div class="space-y-2">
            <div class="h-5 bg-gray-700 rounded w-32"></div>
            <div class="h-4 bg-gray-700 rounded w-24"></div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="h-3 bg-gray-700 rounded w-full"></div>
          <div class="h-3 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="filteredDoctors.length === 0"
      class="bg-gray-800/50 rounded-2xl p-12 text-center border border-gray-700/50"
    >
      <div class="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <PlusIcon class="w-8 h-8 text-gray-500" />
      </div>
      <h3 class="text-lg font-medium text-white mb-2">
        {{ searchQuery ? 'No doctors found' : 'No doctors yet' }}
      </h3>
      <p class="text-gray-400 mb-6">
        {{ searchQuery ? 'Try a different search term' : 'Add your first doctor to get started' }}
      </p>
      <button
        v-if="!searchQuery"
        @click="openAddModal"
        class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
      >
        <PlusIcon class="w-5 h-5" />
        <span>Add Doctor</span>
      </button>
    </div>

    <!-- Doctors Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="doctor in filteredDoctors"
        :key="doctor.id"
        class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
      >
        <!-- Header -->
        <div class="flex items-start gap-4 mb-4">
          <div class="relative">
            <img
              v-if="doctor.imageUrl"
              :src="doctor.imageUrl"
              :alt="doctor.name"
              class="w-16 h-16 rounded-full object-cover"
            />
            <div
              v-else
              class="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center"
            >
              <span class="text-xl font-semibold text-white">{{ doctor.name.charAt(0) }}</span>
            </div>
            <div
              :class="[
                'absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800',
                doctor.isActive ? 'bg-emerald-500' : 'bg-gray-500'
              ]"
            ></div>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-white truncate">{{ doctor.name }}</h3>
            <p class="text-sm text-primary-400">{{ doctor.specialty }}</p>
            <div class="flex items-center gap-1 mt-1">
              <StarSolidIcon class="w-4 h-4 text-amber-400" />
              <span class="text-sm text-gray-300">{{ doctor.rating.toFixed(1) }}</span>
              <span class="text-sm text-gray-500">({{ doctor.reviewCount }})</span>
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="space-y-2 mb-4">
          <div class="flex items-center gap-2 text-sm text-gray-400">
            <MapPinIcon class="w-4 h-4" />
            <span class="truncate">{{ doctor.location || 'No location set' }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-400">
            <LanguageIcon class="w-4 h-4" />
            <span class="truncate">{{ doctor.languages.join(', ') || 'No languages set' }}</span>
          </div>
          <div class="text-sm text-gray-400">
            {{ doctor.experience }} years experience
          </div>
        </div>

        <!-- Fee -->
        <div class="flex items-center justify-between py-3 border-t border-gray-700">
          <span class="text-gray-400">Consultation Fee</span>
          <span class="text-lg font-semibold text-white">${{ doctor.consultationFee }}</span>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 pt-3 border-t border-gray-700">
          <button
            @click="toggleActive(doctor)"
            :class="[
              'flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
              doctor.isActive
                ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            ]"
          >
            {{ doctor.isActive ? 'Active' : 'Inactive' }}
          </button>
          <button
            @click="openEditModal(doctor)"
            class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <PencilIcon class="w-5 h-5" />
          </button>
          <button
            @click="deleteDoctor(doctor)"
            :disabled="isDeleting"
            class="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
          >
            <TrashIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto"
          @click.self="showModal = false"
        >
          <div class="bg-gray-800 rounded-2xl p-6 max-w-xl w-full shadow-xl border border-gray-700 my-8">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-semibold text-white">
                {{ editingDoctor ? 'Edit Doctor' : 'Add New Doctor' }}
              </h3>
              <button
                @click="showModal = false"
                class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>

            <form @submit.prevent="saveDoctor" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Name -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1.5">Name *</label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Dr. John Doe"
                  />
                </div>

                <!-- Specialty -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1.5">Specialty *</label>
                  <input
                    v-model="form.specialty"
                    type="text"
                    required
                    class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Cardiologist"
                  />
                </div>

                <!-- Experience -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1.5">Experience (years)</label>
                  <input
                    v-model.number="form.experience"
                    type="number"
                    min="0"
                    class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <!-- Consultation Fee -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1.5">Consultation Fee ($)</label>
                  <input
                    v-model.number="form.consultationFee"
                    type="number"
                    min="0"
                    class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <!-- Location -->
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-300 mb-1.5">Location</label>
                  <input
                    v-model="form.location"
                    type="text"
                    class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Medical Center, City"
                  />
                </div>

                <!-- Languages -->
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-300 mb-1.5">Languages (comma separated)</label>
                  <input
                    v-model="form.languages"
                    type="text"
                    class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="English, Spanish"
                  />
                </div>

                <!-- Education -->
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-300 mb-1.5">Education</label>
                  <input
                    v-model="form.education"
                    type="text"
                    class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="MD, Harvard Medical School"
                  />
                </div>

                <!-- Image URL -->
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-300 mb-1.5">Image URL</label>
                  <input
                    v-model="form.imageUrl"
                    type="url"
                    class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                <!-- About -->
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-300 mb-1.5">About</label>
                  <textarea
                    v-model="form.about"
                    rows="3"
                    class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Brief description..."
                  ></textarea>
                </div>

                <!-- Active Status -->
                <div class="sm:col-span-2">
                  <label class="flex items-center gap-3 cursor-pointer">
                    <div class="relative">
                      <input
                        v-model="form.isActive"
                        type="checkbox"
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-gray-600 peer-checked:bg-primary-600 rounded-full transition-colors"></div>
                      <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5"></div>
                    </div>
                    <span class="text-gray-300">Active (visible to patients)</span>
                  </label>
                </div>
              </div>

              <div class="flex gap-3 pt-4">
                <button
                  type="button"
                  @click="showModal = false"
                  class="flex-1 px-4 py-2.5 text-gray-300 hover:bg-gray-700 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="isSaving || !form.name || !form.specialty"
                  class="flex-1 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-800 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    v-if="isSaving"
                    class="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>{{ isSaving ? 'Saving...' : editingDoctor ? 'Save Changes' : 'Add Doctor' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
