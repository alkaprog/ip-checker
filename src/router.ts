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
    {
      path: '/check/:ip',
      name: 'check',
      component: () => import('./pages/CheckPage.vue'),
    },
  ],
});

export default router;
