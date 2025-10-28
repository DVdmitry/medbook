import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/doctors',
      name: 'doctors',
      component: () => import('@/views/DoctorListView.vue')
    },
    {
      path: '/booking/:doctorId',
      name: 'booking',
      component: () => import('@/views/BookingFormView.vue')
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: () => import('@/views/ConfirmationView.vue')
    }
  ]
});

export default router;
