<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { supabase } from '@/lib/supabase';
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';

interface Patient {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  appointmentsCount: number;
  lastAppointment: string | null;
  createdAt: string;
}

const patients = ref<Patient[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const currentPage = ref(1);
const totalCount = ref(0);
const pageSize = 12;

const selectedPatient = ref<Patient | null>(null);
const showDetailsModal = ref(false);
const patientAppointments = ref<any[]>([]);
const loadingAppointments = ref(false);

onMounted(() => {
  fetchPatients();
});

watch([searchQuery], () => {
  currentPage.value = 1;
  fetchPatients();
});

watch(currentPage, () => {
  fetchPatients();
});

async function fetchPatients() {
  loading.value = true;
  try {
    let query = supabase
      .from('profiles')
      .select('*', { count: 'exact' })
      .eq('role', 'patient');

    if (searchQuery.value) {
      query = query.or(`first_name.ilike.%${searchQuery.value}%,last_name.ilike.%${searchQuery.value}%,email.ilike.%${searchQuery.value}%`);
    }

    const from = (currentPage.value - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    // Fetch appointment counts for each patient
    const patientIds = (data || []).map(p => p.id);
    const { data: appointmentsData } = await supabase
      .from('patient_appointments')
      .select('patient_id, slot_date')
      .in('patient_id', patientIds);

    const appointmentCounts: Record<string, { count: number; lastDate: string | null }> = {};
    (appointmentsData || []).forEach(apt => {
      if (!appointmentCounts[apt.patient_id]) {
        appointmentCounts[apt.patient_id] = { count: 0, lastDate: null };
      }
      appointmentCounts[apt.patient_id].count++;
      if (!appointmentCounts[apt.patient_id].lastDate || apt.slot_date > appointmentCounts[apt.patient_id].lastDate!) {
        appointmentCounts[apt.patient_id].lastDate = apt.slot_date;
      }
    });

    patients.value = (data || []).map(p => ({
      id: p.id,
      email: p.email || '',
      firstName: p.first_name || '',
      lastName: p.last_name || '',
      phone: p.phone || '',
      dateOfBirth: p.date_of_birth || '',
      gender: p.gender || '',
      address: p.address || '',
      appointmentsCount: appointmentCounts[p.id]?.count || 0,
      lastAppointment: appointmentCounts[p.id]?.lastDate || null,
      createdAt: p.created_at,
    }));

    totalCount.value = count || 0;
  } catch (e) {
    console.error('Error fetching patients:', e);
  } finally {
    loading.value = false;
  }
}

async function openPatientDetails(patient: Patient) {
  selectedPatient.value = patient;
  showDetailsModal.value = true;
  loadingAppointments.value = true;

  try {
    const { data, error } = await supabase
      .from('patient_appointments')
      .select('*')
      .eq('patient_id', patient.id)
      .order('slot_date', { ascending: false })
      .limit(10);

    if (error) throw error;
    patientAppointments.value = data || [];
  } catch (e) {
    console.error('Error fetching patient appointments:', e);
  } finally {
    loadingAppointments.value = false;
  }
}

const totalPages = computed(() => Math.ceil(totalCount.value / pageSize));

function getFullName(patient: Patient): string {
  return `${patient.firstName} ${patient.lastName}`.trim() || 'Unknown';
}

function getInitials(patient: Patient): string {
  const first = patient.firstName?.[0] || '';
  const last = patient.lastName?.[0] || '';
  return (first + last).toUpperCase() || patient.email[0]?.toUpperCase() || 'U';
}

function formatDate(dateStr: string): string {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-amber-500/20 text-amber-400',
    confirmed: 'bg-blue-500/20 text-blue-400',
    completed: 'bg-emerald-500/20 text-emerald-400',
    cancelled: 'bg-gray-500/20 text-gray-400',
    no_show: 'bg-red-500/20 text-red-400',
  };
  return colors[status] || colors.pending;
}

function calculateAge(dateOfBirth: string): number | null {
  if (!dateOfBirth) return null;
  const today = new Date();
  const birth = new Date(dateOfBirth);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Patients</h1>
        <p class="text-gray-400 mt-1">
          View and manage patient records
        </p>
      </div>
      <div class="text-sm text-gray-400">
        {{ totalCount }} registered patients
      </div>
    </div>

    <!-- Search -->
    <div class="relative max-w-md">
      <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name or email..."
        class="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="i in 8" :key="i" class="bg-gray-800/50 rounded-xl p-4 animate-pulse">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-12 h-12 bg-gray-700 rounded-full"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-700 rounded w-24"></div>
            <div class="h-3 bg-gray-700 rounded w-32"></div>
          </div>
        </div>
        <div class="h-3 bg-gray-700 rounded w-20"></div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="patients.length === 0"
      class="bg-gray-800/50 rounded-2xl p-12 text-center border border-gray-700/50"
    >
      <div class="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <UserIcon class="w-8 h-8 text-gray-500" />
      </div>
      <h3 class="text-lg font-medium text-white mb-2">
        {{ searchQuery ? 'No patients found' : 'No patients yet' }}
      </h3>
      <p class="text-gray-400">
        {{ searchQuery ? 'Try a different search term' : 'Patients will appear here once they register' }}
      </p>
    </div>

    <!-- Patients Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="patient in patients"
        :key="patient.id"
        @click="openPatientDetails(patient)"
        class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
      >
        <div class="flex items-center gap-3 mb-3">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center flex-shrink-0">
            <span class="text-sm font-semibold text-white">{{ getInitials(patient) }}</span>
          </div>
          <div class="min-w-0">
            <h3 class="font-medium text-white truncate">{{ getFullName(patient) }}</h3>
            <p class="text-sm text-gray-400 truncate">{{ patient.email }}</p>
          </div>
        </div>

        <div class="space-y-1.5 text-sm">
          <div class="flex items-center gap-2 text-gray-400">
            <CalendarIcon class="w-4 h-4 flex-shrink-0" />
            <span>{{ patient.appointmentsCount }} appointments</span>
          </div>
          <div v-if="patient.lastAppointment" class="text-gray-500 pl-6">
            Last: {{ formatDate(patient.lastAppointment) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex items-center justify-center gap-4">
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
      >
        <ChevronLeftIcon class="w-5 h-5" />
      </button>
      <span class="text-sm text-gray-400">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
      >
        <ChevronRightIcon class="w-5 h-5" />
      </button>
    </div>

    <!-- Patient Details Modal -->
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
          v-if="showDetailsModal && selectedPatient"
          class="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto"
          @click.self="showDetailsModal = false"
        >
          <div class="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full shadow-xl border border-gray-700 my-8">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-semibold text-white">Patient Details</h3>
              <button
                @click="showDetailsModal = false"
                class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>

            <!-- Patient Info -->
            <div class="flex items-start gap-4 mb-6">
              <div class="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <span class="text-2xl font-semibold text-white">{{ getInitials(selectedPatient) }}</span>
              </div>
              <div>
                <h2 class="text-xl font-semibold text-white">{{ getFullName(selectedPatient) }}</h2>
                <div class="flex items-center gap-2 text-gray-400 mt-1">
                  <EnvelopeIcon class="w-4 h-4" />
                  <span>{{ selectedPatient.email }}</span>
                </div>
                <div v-if="selectedPatient.phone" class="flex items-center gap-2 text-gray-400 mt-1">
                  <PhoneIcon class="w-4 h-4" />
                  <span>{{ selectedPatient.phone }}</span>
                </div>
              </div>
            </div>

            <!-- Details Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div class="bg-gray-700/50 rounded-xl p-3">
                <p class="text-xs text-gray-500 mb-1">Gender</p>
                <p class="text-white capitalize">{{ selectedPatient.gender || 'Not specified' }}</p>
              </div>
              <div class="bg-gray-700/50 rounded-xl p-3">
                <p class="text-xs text-gray-500 mb-1">Age</p>
                <p class="text-white">
                  {{ calculateAge(selectedPatient.dateOfBirth) !== null ? `${calculateAge(selectedPatient.dateOfBirth)} years` : 'Not specified' }}
                </p>
              </div>
              <div class="bg-gray-700/50 rounded-xl p-3">
                <p class="text-xs text-gray-500 mb-1">Appointments</p>
                <p class="text-white">{{ selectedPatient.appointmentsCount }}</p>
              </div>
              <div class="bg-gray-700/50 rounded-xl p-3">
                <p class="text-xs text-gray-500 mb-1">Member Since</p>
                <p class="text-white">{{ formatDate(selectedPatient.createdAt) }}</p>
              </div>
            </div>

            <!-- Address -->
            <div v-if="selectedPatient.address" class="bg-gray-700/50 rounded-xl p-4 mb-6">
              <p class="text-xs text-gray-500 mb-1">Address</p>
              <p class="text-white">{{ selectedPatient.address }}</p>
            </div>

            <!-- Recent Appointments -->
            <div>
              <h4 class="text-sm font-medium text-gray-400 uppercase mb-3">Recent Appointments</h4>

              <div v-if="loadingAppointments" class="space-y-2">
                <div v-for="i in 3" :key="i" class="bg-gray-700/30 rounded-lg p-3 animate-pulse">
                  <div class="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                  <div class="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>

              <div v-else-if="patientAppointments.length === 0" class="text-center py-6 text-gray-500">
                No appointments found
              </div>

              <div v-else class="space-y-2 max-h-64 overflow-y-auto">
                <div
                  v-for="apt in patientAppointments"
                  :key="apt.id"
                  class="bg-gray-700/30 rounded-lg p-3 flex items-center justify-between"
                >
                  <div>
                    <p class="text-white font-medium">{{ apt.specialty }}</p>
                    <p class="text-sm text-gray-400">
                      {{ formatDate(apt.slot_date) }} at {{ formatTime(apt.slot_time) }}
                    </p>
                  </div>
                  <span :class="['px-2.5 py-1 rounded-full text-xs font-medium', getStatusColor(apt.status)]">
                    {{ apt.status }}
                  </span>
                </div>
              </div>
            </div>
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
