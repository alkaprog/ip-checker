import {createRouter, createWebHistory} from 'vue-router';

import HomePage from "./pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    // {
    //   path: '/check',
    //   name: 'about',
    //   component: async () => await import('@/views/AboutView.vue'),
    // },
  ],
});

export default router;
