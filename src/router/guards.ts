import type { NavigationGuardWithThis } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

// Demo mode - bypass authentication for demonstration purposes
const DEMO_MODE = true;

export const requireAuth: NavigationGuardWithThis<undefined> = async (to, _from, next) => {
  // In demo mode, allow all access
  if (DEMO_MODE) {
    next();
    return;
  }

  const auth = useAuthStore();

  // Wait for auth to initialize
  if (!auth.initialized) {
    await auth.initialize();
  }

  if (!auth.isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
};

export const requireAdmin: NavigationGuardWithThis<undefined> = async (to, _from, next) => {
  // In demo mode, allow all access
  if (DEMO_MODE) {
    next();
    return;
  }

  const auth = useAuthStore();

  // Wait for auth to initialize
  if (!auth.initialized) {
    await auth.initialize();
  }

  if (!auth.isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    });
  } else if (!auth.isAdmin) {
    // Redirect non-admins to patient cabinet
    next({ name: 'cabinet' });
  } else {
    next();
  }
};

export const requireGuest: NavigationGuardWithThis<undefined> = async (_to, _from, next) => {
  // In demo mode, allow all access
  if (DEMO_MODE) {
    next();
    return;
  }

  const auth = useAuthStore();

  // Wait for auth to initialize
  if (!auth.initialized) {
    await auth.initialize();
  }

  if (auth.isAuthenticated) {
    // Redirect authenticated users based on role
    if (auth.isAdmin) {
      next({ name: 'admin-dashboard' });
    } else {
      next({ name: 'cabinet' });
    }
  } else {
    next();
  }
};
