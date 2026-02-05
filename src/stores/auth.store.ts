import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  gender: 'male' | 'female' | 'other' | null;
  address: string | null;
  avatarUrl: string | null;
  role: 'patient' | 'admin' | 'doctor';
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  medicalHistory: Record<string, unknown>;
  emergencyContact: string | null;
  emergencyPhone: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SignUpData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface ProfileUpdate {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  avatarUrl?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  notificationPreferences?: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
  };
  medicalHistory?: Record<string, unknown>;
}

function mapDbProfile(data: Record<string, unknown>): Profile {
  return {
    id: data.id as string,
    email: data.email as string,
    firstName: data.first_name as string | null,
    lastName: data.last_name as string | null,
    phone: data.phone as string | null,
    dateOfBirth: data.date_of_birth as string | null,
    gender: data.gender as 'male' | 'female' | 'other' | null,
    address: data.address as string | null,
    avatarUrl: data.avatar_url as string | null,
    role: (data.role as 'patient' | 'admin' | 'doctor') || 'patient',
    notificationPreferences: (data.notification_preferences as Profile['notificationPreferences']) || {
      email: true,
      sms: false,
      push: true,
    },
    medicalHistory: (data.medical_history as Record<string, unknown>) || {},
    emergencyContact: data.emergency_contact as string | null,
    emergencyPhone: data.emergency_phone as string | null,
    createdAt: data.created_at as string,
    updatedAt: data.updated_at as string,
  };
}

function mapProfileToDb(updates: ProfileUpdate): Record<string, unknown> {
  const mapped: Record<string, unknown> = {};

  if (updates.firstName !== undefined) mapped.first_name = updates.firstName;
  if (updates.lastName !== undefined) mapped.last_name = updates.lastName;
  if (updates.phone !== undefined) mapped.phone = updates.phone;
  if (updates.dateOfBirth !== undefined) mapped.date_of_birth = updates.dateOfBirth;
  if (updates.gender !== undefined) mapped.gender = updates.gender;
  if (updates.address !== undefined) mapped.address = updates.address;
  if (updates.avatarUrl !== undefined) mapped.avatar_url = updates.avatarUrl;
  if (updates.emergencyContact !== undefined) mapped.emergency_contact = updates.emergencyContact;
  if (updates.emergencyPhone !== undefined) mapped.emergency_phone = updates.emergencyPhone;
  if (updates.notificationPreferences !== undefined) mapped.notification_preferences = updates.notificationPreferences;
  if (updates.medicalHistory !== undefined) mapped.medical_history = updates.medicalHistory;

  return mapped;
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null);
  const session = ref<Session | null>(null);
  const profile = ref<Profile | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const initialized = ref(false);

  // Computed
  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => profile.value?.role === 'admin');
  const isDoctor = computed(() => profile.value?.role === 'doctor');
  const isPatient = computed(() => profile.value?.role === 'patient');
  const fullName = computed(() => {
    if (!profile.value) return '';
    const parts = [profile.value.firstName, profile.value.lastName].filter(Boolean);
    return parts.join(' ') || profile.value.email;
  });
  const initials = computed(() => {
    if (!profile.value) return '';
    const first = profile.value.firstName?.[0] || '';
    const last = profile.value.lastName?.[0] || '';
    return (first + last).toUpperCase() || profile.value.email[0].toUpperCase();
  });

  // Actions
  async function initialize() {
    if (initialized.value) return;

    loading.value = true;
    error.value = null;

    try {
      // Get current session
      const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      if (currentSession) {
        session.value = currentSession;
        user.value = currentSession.user;
        await fetchProfile();
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, newSession) => {
        session.value = newSession;
        user.value = newSession?.user ?? null;

        if (event === 'SIGNED_IN' && newSession) {
          await fetchProfile();
        } else if (event === 'SIGNED_OUT') {
          profile.value = null;
        }
      });

      initialized.value = true;
    } catch (e) {
      error.value = (e as Error).message;
      console.error('Auth initialization error:', e);
    } finally {
      loading.value = false;
    }
  }

  async function signIn(email: string, password: string, rememberMe = true) {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      session.value = data.session;
      user.value = data.user;
      await fetchProfile();

      if (rememberMe) {
        localStorage.setItem('medbook_remember', 'true');
      }

      return { user: data.user, session: data.session };
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function signUp(data: SignUpData) {
    loading.value = true;
    error.value = null;

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
          },
        },
      });

      if (authError) throw authError;

      // If email confirmation is disabled, user will be signed in automatically
      if (authData.session) {
        session.value = authData.session;
        user.value = authData.user;

        // Update profile with additional data
        if (data.phone) {
          await updateProfile({ phone: data.phone });
        } else {
          await fetchProfile();
        }
      }

      return authData;
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function signOut() {
    loading.value = true;
    error.value = null;

    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;

      user.value = null;
      session.value = null;
      profile.value = null;
      localStorage.removeItem('medbook_remember');
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function fetchProfile() {
    if (!user.value) return;

    try {
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .single();

      if (profileError) {
        // Profile might not exist yet (trigger hasn't run or failed)
        if (profileError.code === 'PGRST116') {
          // Create profile manually
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: user.value.id,
              email: user.value.email,
              first_name: user.value.user_metadata?.first_name,
              last_name: user.value.user_metadata?.last_name,
            })
            .select()
            .single();

          if (createError) throw createError;
          profile.value = mapDbProfile(newProfile);
          return;
        }
        throw profileError;
      }

      profile.value = mapDbProfile(data);
    } catch (e) {
      console.error('Error fetching profile:', e);
      error.value = (e as Error).message;
    }
  }

  async function updateProfile(updates: ProfileUpdate) {
    if (!user.value) throw new Error('Not authenticated');

    loading.value = true;
    error.value = null;

    try {
      const dbUpdates = mapProfileToDb(updates);

      const { error: updateError } = await supabase
        .from('profiles')
        .update(dbUpdates)
        .eq('id', user.value.id);

      if (updateError) throw updateError;

      await fetchProfile();
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function resetPassword(email: string) {
    loading.value = true;
    error.value = null;

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (resetError) throw resetError;
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function updatePassword(newPassword: string) {
    loading.value = true;
    error.value = null;

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;
    } catch (e) {
      error.value = (e as Error).message;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  function clearError() {
    error.value = null;
  }

  return {
    // State
    user,
    session,
    profile,
    loading,
    error,
    initialized,
    // Computed
    isAuthenticated,
    isAdmin,
    isDoctor,
    isPatient,
    fullName,
    initials,
    // Actions
    initialize,
    signIn,
    signUp,
    signOut,
    fetchProfile,
    updateProfile,
    resetPassword,
    updatePassword,
    clearError,
  };
});
