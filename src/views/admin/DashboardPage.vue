<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { supabase } from '@/lib/supabase';
import {
  CalendarDaysIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChevronRightIcon,
  SparklesIcon,
} from '@heroicons/vue/24/outline';

interface DashboardStats {
  totalAppointments: number;
  appointmentsToday: number;
  totalPatients: number;
  completionRate: number;
  pendingAppointments: number;
  cancelledToday: number;
  trends: {
    appointments: number;
    patients: number;
    completion: number;
  };
}

interface RecentAppointment {
  id: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  time: string;
  status: string;
}

const stats = ref<DashboardStats | null>(null);
const recentAppointments = ref<RecentAppointment[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const today = new Date().toISOString().split('T')[0];

onMounted(async () => {
  await Promise.all([
    fetchStats(),
    fetchRecentAppointments(),
  ]);
  loading.value = false;
});

async function fetchStats() {
  try {
    // Total appointments
    const { count: totalAppointments } = await supabase
      .from('patient_appointments')
      .select('*', { count: 'exact', head: true });

    // Today's appointments
    const { count: appointmentsToday } = await supabase
      .from('patient_appointments')
      .select('*', { count: 'exact', head: true })
      .eq('slot_date', today);

    // Total patients (unique patient_ids)
    const { data: patientsData } = await supabase
      .from('patient_appointments')
      .select('patient_id');
    const uniquePatients = new Set(patientsData?.map(p => p.patient_id) || []);

    // Completed appointments
    const { count: completedCount } = await supabase
      .from('patient_appointments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed');

    // Pending appointments
    const { count: pendingCount } = await supabase
      .from('patient_appointments')
      .select('*', { count: 'exact', head: true })
      .in('status', ['pending', 'confirmed']);

    // Cancelled today
    const { count: cancelledToday } = await supabase
      .from('patient_appointments')
      .select('*', { count: 'exact', head: true })
      .eq('slot_date', today)
      .eq('status', 'cancelled');

    const completionRate = totalAppointments
      ? Math.round(((completedCount || 0) / totalAppointments) * 100)
      : 0;

    stats.value = {
      totalAppointments: totalAppointments || 0,
      appointmentsToday: appointmentsToday || 0,
      totalPatients: uniquePatients.size,
      completionRate,
      pendingAppointments: pendingCount || 0,
      cancelledToday: cancelledToday || 0,
      trends: {
        appointments: 12, // Placeholder - would need historical data
        patients: 8,
        completion: 5,
      },
    };
  } catch (e) {
    error.value = (e as Error).message;
    console.error('Error fetching stats:', e);
  }
}

async function fetchRecentAppointments() {
  try {
    const { data, error: fetchError } = await supabase
      .from('patient_appointments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (fetchError) throw fetchError;

    recentAppointments.value = (data || []).map(apt => ({
      id: apt.id,
      patientName: `${apt.patient_first_name || 'Unknown'} ${apt.patient_last_name || ''}`.trim(),
      doctorName: 'Dr. ' + apt.doctor_id.substring(0, 8),
      specialty: apt.specialty,
      time: formatDateTime(apt.slot_date, apt.slot_time),
      status: apt.status,
    }));
  } catch (e) {
    console.error('Error fetching recent appointments:', e);
  }
}

function formatDateTime(date: string, time: string): string {
  const d = new Date(date);
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${hour12}:${minutes} ${ampm}`;
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-warning-500/20 text-warning-400',
    confirmed: 'bg-primary-500/20 text-primary-400',
    completed: 'bg-success-500/20 text-success-400',
    cancelled: 'bg-neutral-600 text-neutral-300',
    no_show: 'bg-error-500/20 text-error-400',
  };
  return colors[status] || colors.pending;
}

const statsCards = computed(() => [
  {
    title: 'Total Appointments',
    value: stats.value?.totalAppointments || 0,
    trend: stats.value?.trends.appointments || 0,
    icon: CalendarDaysIcon,
    gradient: 'from-primary-500 to-primary-600',
    iconBg: 'bg-primary-500/20',
    iconColor: 'text-primary-400',
  },
  {
    title: 'Today\'s Schedule',
    value: stats.value?.appointmentsToday || 0,
    subtitle: `${stats.value?.cancelledToday || 0} cancelled`,
    icon: ClockIcon,
    gradient: 'from-accent-500 to-accent-600',
    iconBg: 'bg-accent-500/20',
    iconColor: 'text-accent-400',
  },
  {
    title: 'Total Patients',
    value: stats.value?.totalPatients || 0,
    trend: stats.value?.trends.patients || 0,
    icon: UserGroupIcon,
    gradient: 'from-neutral-400 to-neutral-500',
    iconBg: 'bg-neutral-300/20',
    iconColor: 'text-neutral-300',
  },
  {
    title: 'Completion Rate',
    value: `${stats.value?.completionRate || 0}%`,
    trend: stats.value?.trends.completion || 0,
    icon: CheckCircleIcon,
    gradient: 'from-success-500 to-success-600',
    iconBg: 'bg-success-500/20',
    iconColor: 'text-success-400',
  },
]);
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div class="flex items-center gap-3 mb-2">
          <SparklesIcon class="w-5 h-5 text-primary-400" />
          <span class="text-sm font-semibold text-primary-400">Admin Dashboard</span>
        </div>
        <h1 class="text-2xl font-bold text-white">Welcome back!</h1>
        <p class="text-neutral-400 mt-1">
          Here's what's happening with your clinic today.
        </p>
      </div>
      <div class="text-right">
        <p class="text-sm text-neutral-500">Today</p>
        <p class="text-lg font-semibold text-neutral-200">
          {{ new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) }}
        </p>
      </div>
    </div>

    <!-- Stats Grid -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="i in 4" :key="i" class="bg-neutral-800/50 rounded-3xl p-6 animate-pulse">
        <div class="h-4 bg-neutral-700 rounded-lg w-24 mb-4"></div>
        <div class="h-8 bg-neutral-700 rounded-lg w-16"></div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="card in statsCards"
        :key="card.title"
        class="relative overflow-hidden bg-neutral-800/50 backdrop-blur-sm rounded-3xl p-6 border border-neutral-700/50 hover:border-neutral-600/50 transition-all duration-300 hover:shadow-dark-soft group"
      >
        <!-- Gradient accent -->
        <div :class="['absolute top-0 left-0 w-full h-1 bg-gradient-to-r', card.gradient]"></div>

        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-neutral-400 mb-1.5">{{ card.title }}</p>
            <p class="text-3xl font-bold text-white">{{ card.value }}</p>
            <div v-if="card.trend !== undefined" class="flex items-center gap-1 mt-2.5">
              <component
                :is="card.trend >= 0 ? ArrowTrendingUpIcon : ArrowTrendingDownIcon"
                :class="['w-4 h-4', card.trend >= 0 ? 'text-success-400' : 'text-error-400']"
              />
              <span :class="['text-sm font-medium', card.trend >= 0 ? 'text-success-400' : 'text-error-400']">
                {{ Math.abs(card.trend) }}%
              </span>
              <span class="text-sm text-neutral-500">vs last month</span>
            </div>
            <p v-else-if="card.subtitle" class="text-sm text-neutral-500 mt-2.5">
              {{ card.subtitle }}
            </p>
          </div>
          <div :class="['p-3 rounded-xl transition-colors', card.iconBg]">
            <component :is="card.icon" :class="['w-6 h-6', card.iconColor]" />
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions & Recent Appointments -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Quick Actions -->
      <div class="bg-neutral-800/50 backdrop-blur-sm rounded-3xl p-6 border border-neutral-700/50">
        <h2 class="text-lg font-bold text-white mb-5">Quick Actions</h2>
        <div class="space-y-3">
          <RouterLink
            to="/admin/appointments"
            class="flex items-center gap-3 p-3.5 bg-neutral-700/30 hover:bg-neutral-700/50 rounded-2xl transition-colors group"
          >
            <div class="p-2.5 bg-primary-500/20 rounded-xl">
              <CalendarDaysIcon class="w-5 h-5 text-primary-400" />
            </div>
            <div class="flex-1">
              <p class="font-semibold text-white group-hover:text-primary-300 transition-colors">View Appointments</p>
              <p class="text-sm text-neutral-400">{{ stats?.pendingAppointments || 0 }} pending</p>
            </div>
            <ChevronRightIcon class="w-5 h-5 text-neutral-500 group-hover:text-primary-400 transition-colors" />
          </RouterLink>

          <RouterLink
            to="/admin/doctors"
            class="flex items-center gap-3 p-3.5 bg-neutral-700/30 hover:bg-neutral-700/50 rounded-2xl transition-colors group"
          >
            <div class="p-2.5 bg-accent-500/20 rounded-xl">
              <UserGroupIcon class="w-5 h-5 text-accent-400" />
            </div>
            <div class="flex-1">
              <p class="font-semibold text-white group-hover:text-accent-300 transition-colors">Manage Doctors</p>
              <p class="text-sm text-neutral-400">Schedules & profiles</p>
            </div>
            <ChevronRightIcon class="w-5 h-5 text-neutral-500 group-hover:text-accent-400 transition-colors" />
          </RouterLink>

          <RouterLink
            to="/admin/patients"
            class="flex items-center gap-3 p-3.5 bg-neutral-700/30 hover:bg-neutral-700/50 rounded-2xl transition-colors group"
          >
            <div class="p-2.5 bg-success-500/20 rounded-xl">
              <UserGroupIcon class="w-5 h-5 text-success-400" />
            </div>
            <div class="flex-1">
              <p class="font-semibold text-white group-hover:text-success-300 transition-colors">Patient Records</p>
              <p class="text-sm text-neutral-400">{{ stats?.totalPatients || 0 }} patients</p>
            </div>
            <ChevronRightIcon class="w-5 h-5 text-neutral-500 group-hover:text-success-400 transition-colors" />
          </RouterLink>
        </div>
      </div>

      <!-- Recent Appointments -->
      <div class="lg:col-span-2 bg-neutral-800/50 backdrop-blur-sm rounded-3xl p-6 border border-neutral-700/50">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-lg font-bold text-white">Recent Appointments</h2>
          <RouterLink
            to="/admin/appointments"
            class="text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors"
          >
            View all
          </RouterLink>
        </div>

        <div v-if="loading" class="space-y-3">
          <div v-for="i in 5" :key="i" class="flex items-center gap-4 p-3.5 animate-pulse">
            <div class="w-11 h-11 bg-neutral-700 rounded-xl"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-neutral-700 rounded-lg w-1/3"></div>
              <div class="h-3 bg-neutral-700 rounded-lg w-1/2"></div>
            </div>
          </div>
        </div>

        <div v-else-if="recentAppointments.length === 0" class="text-center py-10">
          <div class="w-16 h-16 bg-neutral-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CalendarDaysIcon class="w-8 h-8 text-neutral-500" />
          </div>
          <p class="text-neutral-400 font-medium">No appointments yet</p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="apt in recentAppointments"
            :key="apt.id"
            class="flex items-center gap-4 p-3.5 bg-neutral-700/30 hover:bg-neutral-700/50 rounded-2xl transition-colors"
          >
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-dark-soft">
              <span class="text-sm font-bold text-white">
                {{ apt.patientName.charAt(0) }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-white truncate">{{ apt.patientName }}</p>
              <p class="text-sm text-neutral-400 truncate">
                {{ apt.specialty }} • {{ apt.time }}
              </p>
            </div>
            <span :class="['px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide', getStatusColor(apt.status)]">
              {{ apt.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
