import { ref } from 'vue';
import type { Doctor, Specialty } from '@/types/medical.types';

const API_BASE = '/api';

interface DoctorsResponse {
  doctors: Doctor[];
  total: number;
}

interface Slot {
  id: string;
  time: string;
  status: 'available' | 'booked';
}

interface SlotsResponse {
  slots: Slot[];
  date: string;
  doctorId: string;
}

export function useApi() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function getDoctors(specialty?: Specialty | 'all'): Promise<Doctor[]> {
    loading.value = true;
    error.value = null;

    try {
      const params = new URLSearchParams();
      if (specialty && specialty !== 'all') {
        params.set('specialty', specialty);
      }

      const url = `${API_BASE}/doctors${params.toString() ? `?${params}` : ''}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch doctors: ${response.status}`);
      }

      const data: DoctorsResponse = await response.json();
      return data.doctors;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error';
      console.error('Error fetching doctors:', e);
      return [];
    } finally {
      loading.value = false;
    }
  }

  async function getDoctorById(id: string): Promise<Doctor | null> {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${API_BASE}/doctors/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch doctor: ${response.status}`);
      }

      const doctor: Doctor = await response.json();
      return doctor;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error';
      console.error('Error fetching doctor:', e);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function getDoctorSlots(doctorId: string, date: string): Promise<Slot[]> {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${API_BASE}/doctors/${doctorId}/slots?date=${date}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch slots: ${response.status}`);
      }

      const data: SlotsResponse = await response.json();
      return data.slots;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error';
      console.error('Error fetching slots:', e);
      return [];
    } finally {
      loading.value = false;
    }
  }

  async function getSpecialtyCounts(): Promise<Record<string, number>> {
    try {
      const doctors = await getDoctors();
      const counts: Record<string, number> = {};

      for (const doctor of doctors) {
        counts[doctor.specialty] = (counts[doctor.specialty] || 0) + 1;
      }

      return counts;
    } catch (e) {
      console.error('Error getting specialty counts:', e);
      return {};
    }
  }

  return {
    loading,
    error,
    getDoctors,
    getDoctorById,
    getDoctorSlots,
    getSpecialtyCounts,
  };
}
