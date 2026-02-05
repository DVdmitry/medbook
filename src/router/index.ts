import { createRouter, createWebHistory } from 'vue-router';
import { requireAuth, requireAdmin, requireGuest } from './guards';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ==========================================
    // PUBLIC ROUTES
    // ==========================================
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/doctors',
      name: 'doctors',
      component: () => import('@/views/DoctorListView.vue'),
    },
    {
      path: '/booking/:doctorId',
      name: 'booking',
      component: () => import('@/views/BookingFormView.vue'),
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: () => import('@/views/ConfirmationView.vue'),
    },

    // ==========================================
    // AUTH ROUTES
    // ==========================================
    {
      path: '/auth',
      component: () => import('@/layouts/AuthLayout.vue'),
      beforeEnter: requireGuest,
      children: [
        {
          path: '',
          redirect: { name: 'login' },
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginPage.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth/RegisterPage.vue'),
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('@/views/auth/ForgotPasswordPage.vue'),
        },
        {
          path: 'reset-password',
          name: 'reset-password',
          component: () => import('@/views/auth/ResetPasswordPage.vue'),
        },
      ],
    },

    // ==========================================
    // PATIENT CABINET ROUTES
    // ==========================================
    {
      path: '/cabinet',
      component: () => import('@/layouts/CabinetLayout.vue'),
      beforeEnter: requireAuth,
      children: [
        {
          path: '',
          redirect: { name: 'cabinet-appointments' },
        },
        {
          path: 'appointments',
          name: 'cabinet-appointments',
          component: () => import('@/views/cabinet/AppointmentsPage.vue'),
        },
        {
          path: 'history',
          name: 'cabinet-history',
          component: () => import('@/views/cabinet/HistoryPage.vue'),
        },
        {
          path: 'profile',
          name: 'cabinet-profile',
          component: () => import('@/views/cabinet/ProfilePage.vue'),
        },
        {
          path: 'settings',
          name: 'cabinet-settings',
          component: () => import('@/views/cabinet/SettingsPage.vue'),
        },
      ],
    },

    // ==========================================
    // ADMIN ROUTES
    // ==========================================
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      beforeEnter: requireAdmin,
      children: [
        {
          path: '',
          redirect: { name: 'admin-dashboard' },
        },
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('@/views/admin/DashboardPage.vue'),
        },
        {
          path: 'appointments',
          name: 'admin-appointments',
          component: () => import('@/views/admin/AppointmentsPage.vue'),
        },
        {
          path: 'doctors',
          name: 'admin-doctors',
          component: () => import('@/views/admin/DoctorsPage.vue'),
        },
        {
          path: 'patients',
          name: 'admin-patients',
          component: () => import('@/views/admin/PatientsPage.vue'),
        },
        {
          path: 'reports',
          name: 'admin-reports',
          component: () => import('@/views/admin/ReportsPage.vue'),
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('@/views/admin/SettingsPage.vue'),
        },
      ],
    },

    // ==========================================
    // 404
    // ==========================================
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

export default router;
