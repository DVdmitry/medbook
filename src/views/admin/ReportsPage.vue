<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { supabase } from '@/lib/supabase';
import {
  ChartBarIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
} from '@heroicons/vue/24/outline';

interface MonthlyData {
  month: string;
  appointments: number;
  completed: number;
  cancelled: number;
  revenue: number;
}

interface SpecialtyData {
  specialty: string;
  count: number;
  percentage: number;
}

const loading = ref(true);
const dateRange = ref<'week' | 'month' | 'quarter' | 'year'>('month');
const monthlyData = ref<MonthlyData[]>([]);
const specialtyData = ref<SpecialtyData[]>([]);
const totals = ref({
  appointments: 0,
  patients: 0,
  doctors: 0,
  revenue: 0,
});

onMounted(() => {
  fetchReports();
});

async function fetchReports() {
  loading.value = true;
  try {
    // Fetch total appointments
    const { count: appointmentsCount } = await supabase
      .from('patient_appointments')
      .select('*', { count: 'exact', head: true });

    // Fetch unique patients
    const { data: patientsData } = await supabase
      .from('patient_appointments')
      .select('patient_id');
    const uniquePatients = new Set(patientsData?.map(p => p.patient_id) || []);

    // Fetch doctors count
    const { count: doctorsCount } = await supabase
      .from('doctors')
      .select('*', { count: 'exact', head: true });

    totals.value = {
      appointments: appointmentsCount || 0,
      patients: uniquePatients.size,
      doctors: doctorsCount || 0,
      revenue: (appointmentsCount || 0) * 75, // Average consultation fee
    };

    // Fetch specialty distribution
    const { data: specialtyRaw } = await supabase
      .from('patient_appointments')
      .select('specialty');

    const specialtyCounts: Record<string, number> = {};
    (specialtyRaw || []).forEach(apt => {
      specialtyCounts[apt.specialty] = (specialtyCounts[apt.specialty] || 0) + 1;
    });

    const total = Object.values(specialtyCounts).reduce((a, b) => a + b, 0);
    specialtyData.value = Object.entries(specialtyCounts)
      .map(([specialty, count]) => ({
        specialty,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    // Generate monthly data (mock for now - would need proper date aggregation)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    monthlyData.value = months.map(month => ({
      month,
      appointments: Math.floor(Math.random() * 50) + 20,
      completed: Math.floor(Math.random() * 40) + 15,
      cancelled: Math.floor(Math.random() * 10),
      revenue: Math.floor(Math.random() * 5000) + 2000,
    }));
  } catch (e) {
    console.error('Error fetching reports:', e);
  } finally {
    loading.value = false;
  }
}

const maxAppointments = computed(() =>
  Math.max(...monthlyData.value.map(d => d.appointments), 1)
);

function getBarHeight(value: number): string {
  return `${(value / maxAppointments.value) * 100}%`;
}

function exportReport() {
  // TODO: Implement CSV/PDF export
  alert('Export functionality coming soon!');
}
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Reports & Analytics</h1>
        <p class="text-gray-400 mt-1">
          Track performance metrics and trends
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="fetchReports"
          :disabled="loading"
          class="p-2.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-xl transition-colors"
        >
          <ArrowPathIcon :class="['w-5 h-5', loading && 'animate-spin']" />
        </button>
        <button
          @click="exportReport"
          class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
        >
          <ArrowDownTrayIcon class="w-5 h-5" />
          <span>Export</span>
        </button>
      </div>
    </div>

    <!-- Date Range Tabs -->
    <div class="flex items-center gap-2 bg-gray-800/50 p-1 rounded-xl w-fit">
      <button
        v-for="range in ['week', 'month', 'quarter', 'year'] as const"
        :key="range"
        @click="dateRange = range"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
          dateRange === range
            ? 'bg-primary-600 text-white'
            : 'text-gray-400 hover:text-white'
        ]"
      >
        {{ range.charAt(0).toUpperCase() + range.slice(1) }}
      </button>
    </div>

    <!-- Summary Cards -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="i in 4" :key="i" class="bg-gray-800/50 rounded-2xl p-6 animate-pulse">
        <div class="h-4 bg-gray-700 rounded w-24 mb-3"></div>
        <div class="h-8 bg-gray-700 rounded w-16"></div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <div class="flex items-center gap-3 mb-3">
          <div class="p-2 bg-blue-500/20 rounded-lg">
            <CalendarDaysIcon class="w-5 h-5 text-blue-400" />
          </div>
          <span class="text-gray-400 text-sm">Total Appointments</span>
        </div>
        <p class="text-3xl font-bold text-white">{{ totals.appointments.toLocaleString() }}</p>
      </div>

      <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <div class="flex items-center gap-3 mb-3">
          <div class="p-2 bg-purple-500/20 rounded-lg">
            <UserGroupIcon class="w-5 h-5 text-purple-400" />
          </div>
          <span class="text-gray-400 text-sm">Total Patients</span>
        </div>
        <p class="text-3xl font-bold text-white">{{ totals.patients.toLocaleString() }}</p>
      </div>

      <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <div class="flex items-center gap-3 mb-3">
          <div class="p-2 bg-emerald-500/20 rounded-lg">
            <UserGroupIcon class="w-5 h-5 text-emerald-400" />
          </div>
          <span class="text-gray-400 text-sm">Active Doctors</span>
        </div>
        <p class="text-3xl font-bold text-white">{{ totals.doctors.toLocaleString() }}</p>
      </div>

      <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <div class="flex items-center gap-3 mb-3">
          <div class="p-2 bg-amber-500/20 rounded-lg">
            <ChartBarIcon class="w-5 h-5 text-amber-400" />
          </div>
          <span class="text-gray-400 text-sm">Est. Revenue</span>
        </div>
        <p class="text-3xl font-bold text-white">${{ totals.revenue.toLocaleString() }}</p>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Monthly Appointments Chart -->
      <div class="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <h3 class="text-lg font-semibold text-white mb-6">Appointments Overview</h3>

        <div v-if="loading" class="h-64 flex items-end gap-4">
          <div v-for="i in 6" :key="i" class="flex-1 bg-gray-700 rounded-t animate-pulse" style="height: 60%"></div>
        </div>

        <div v-else class="h-64 flex items-end gap-4">
          <div
            v-for="data in monthlyData"
            :key="data.month"
            class="flex-1 flex flex-col items-center gap-2"
          >
            <div class="w-full flex flex-col gap-1" style="height: 200px">
              <div
                class="w-full bg-primary-500 rounded-t transition-all duration-500"
                :style="{ height: getBarHeight(data.appointments) }"
              ></div>
            </div>
            <span class="text-xs text-gray-400">{{ data.month }}</span>
          </div>
        </div>

        <div class="flex items-center gap-6 mt-4 pt-4 border-t border-gray-700">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded bg-primary-500"></div>
            <span class="text-sm text-gray-400">Appointments</span>
          </div>
        </div>
      </div>

      <!-- Specialty Distribution -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <h3 class="text-lg font-semibold text-white mb-6">By Specialty</h3>

        <div v-if="loading" class="space-y-4">
          <div v-for="i in 5" :key="i" class="animate-pulse">
            <div class="h-3 bg-gray-700 rounded w-24 mb-2"></div>
            <div class="h-2 bg-gray-700 rounded"></div>
          </div>
        </div>

        <div v-else-if="specialtyData.length === 0" class="text-center py-8 text-gray-500">
          No data available
        </div>

        <div v-else class="space-y-4">
          <div v-for="item in specialtyData" :key="item.specialty">
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="text-gray-300">{{ item.specialty }}</span>
              <span class="text-gray-400">{{ item.count }} ({{ item.percentage }}%)</span>
            </div>
            <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-500"
                :style="{ width: `${item.percentage}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Monthly Breakdown Table -->
    <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
      <div class="p-6 border-b border-gray-700">
        <h3 class="text-lg font-semibold text-white">Monthly Breakdown</h3>
      </div>

      <div v-if="loading" class="p-6">
        <div class="space-y-4 animate-pulse">
          <div v-for="i in 6" :key="i" class="h-10 bg-gray-700 rounded"></div>
        </div>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-700">
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Month</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Appointments</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Completed</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Cancelled</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Revenue</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700/50">
            <tr v-for="data in monthlyData" :key="data.month" class="hover:bg-gray-700/30">
              <td class="px-6 py-4 text-white font-medium">{{ data.month }}</td>
              <td class="px-6 py-4 text-gray-300">{{ data.appointments }}</td>
              <td class="px-6 py-4">
                <span class="text-emerald-400">{{ data.completed }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-red-400">{{ data.cancelled }}</span>
              </td>
              <td class="px-6 py-4 text-gray-300">${{ data.revenue.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
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
