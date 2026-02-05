<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { useAppointmentsStore } from '@/stores/appointments.store';
import {
  CalendarIcon,
  ClockIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  NoSymbolIcon,
} from '@heroicons/vue/24/outline';

const auth = useAuthStore();
const appointments = useAppointmentsStore();

const searchQuery = ref('');
const statusFilter = ref<string | null>(null);

onMounted(async () => {
  if (auth.user?.id) {
    await appointments.fetchAppointments(auth.user.id);
  }
});

const pastList = computed(() => {
  let list = appointments.pastAppointments;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    list = list.filter(apt =>
      apt.doctor?.name?.toLowerCase().includes(query) ||
      apt.specialty.toLowerCase().includes(query) ||
      apt.confirmationNumber?.toLowerCase().includes(query)
    );
  }

  if (statusFilter.value) {
    list = list.filter(apt => apt.status === statusFilter.value);
  }

  return list;
});

const stats = computed(() => ({
  total: appointments.pastAppointments.length,
  completed: appointments.pastAppointments.filter(a => a.status === 'completed').length,
  cancelled: appointments.pastAppointments.filter(a => a.status === 'cancelled').length,
  noShow: appointments.pastAppointments.filter(a => a.status === 'no_show').length,
}));

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
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

function getStatusConfig(status: string) {
  const configs: Record<string, { color: string; icon: typeof CheckCircleIcon; label: string }> = {
    completed: {
      color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400',
      icon: CheckCircleIcon,
      label: 'Completed',
    },
    cancelled: {
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-400',
      icon: XCircleIcon,
      label: 'Cancelled',
    },
    no_show: {
      color: 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400',
      icon: NoSymbolIcon,
      label: 'No Show',
    },
  };
  return configs[status] || configs.completed;
}
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Visit History</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">
        Review your past appointments
      </p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
        <p class="text-sm text-gray-600 dark:text-gray-400">Total Visits</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ stats.total }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
        <p class="text-sm text-gray-600 dark:text-gray-400">Completed</p>
        <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{{ stats.completed }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
        <p class="text-sm text-gray-600 dark:text-gray-400">Cancelled</p>
        <p class="text-2xl font-bold text-gray-600 dark:text-gray-400 mt-1">{{ stats.cancelled }}</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
        <p class="text-sm text-gray-600 dark:text-gray-400">Missed</p>
        <p class="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{{ stats.noShow }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1 relative">
        <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by doctor, specialty, or confirmation..."
          class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
      <div class="flex items-center gap-2">
        <FunnelIcon class="w-5 h-5 text-gray-400" />
        <select
          v-model="statusFilter"
          class="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option :value="null">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="no_show">No Show</option>
        </select>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="appointments.loading" class="space-y-4">
      <div v-for="i in 5" :key="i" class="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse">
        <div class="flex gap-4">
          <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="pastList.length === 0"
      class="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center"
    >
      <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <CalendarIcon class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {{ searchQuery || statusFilter ? 'No matching appointments' : 'No visit history yet' }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        {{ searchQuery || statusFilter
          ? 'Try adjusting your filters'
          : 'Your completed appointments will appear here' }}
      </p>
    </div>

    <!-- History List -->
    <div v-else class="space-y-3">
      <div
        v-for="apt in pastList"
        :key="apt.id"
        class="bg-white dark:bg-gray-800 rounded-xl p-4 hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700"
      >
        <div class="flex items-center gap-4">
          <!-- Doctor Avatar -->
          <div class="flex-shrink-0">
            <div
              v-if="apt.doctor?.imageUrl"
              class="w-12 h-12 rounded-full overflow-hidden"
            >
              <img
                :src="apt.doctor.imageUrl"
                :alt="apt.doctor.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div
              v-else
              class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
            >
              <span class="text-lg font-medium text-gray-600 dark:text-gray-400">
                {{ apt.doctor?.name?.charAt(0) || 'D' }}
              </span>
            </div>
          </div>

          <!-- Details -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h3 class="font-medium text-gray-900 dark:text-white truncate">
                {{ apt.doctor?.name || 'Doctor' }}
              </h3>
              <span :class="['px-2 py-0.5 rounded-full text-xs font-medium inline-flex items-center gap-1', getStatusConfig(apt.status).color]">
                <component :is="getStatusConfig(apt.status).icon" class="w-3 h-3" />
                {{ getStatusConfig(apt.status).label }}
              </span>
            </div>
            <div class="flex items-center gap-3 mt-1 text-sm text-gray-600 dark:text-gray-400">
              <span>{{ apt.specialty }}</span>
              <span class="text-gray-300 dark:text-gray-600">|</span>
              <div class="flex items-center gap-1">
                <CalendarIcon class="w-3.5 h-3.5" />
                <span>{{ formatDate(apt.slotDate) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <ClockIcon class="w-3.5 h-3.5" />
                <span>{{ formatTime(apt.slotTime) }}</span>
              </div>
            </div>
          </div>

          <!-- View Details -->
          <RouterLink
            :to="`/cabinet/appointments/${apt.id}`"
            class="flex-shrink-0 p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronRightIcon class="w-5 h-5" />
          </RouterLink>
        </div>

        <!-- Cancellation reason if cancelled -->
        <div
          v-if="apt.status === 'cancelled' && apt.cancellationReason"
          class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"
        >
          <p class="text-sm text-gray-500 dark:text-gray-500">
            <span class="font-medium">Cancellation reason:</span>
            {{ apt.cancellationReason }}
          </p>
        </div>
      </div>
    </div>
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
