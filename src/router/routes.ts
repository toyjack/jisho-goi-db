import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../pages/Home.vue'),
  },
  {
    path: '/jiruisho',
    component: () => import('../pages/Jiruisho.vue'),
  },
  {
    path: '/rakuyoshu',
    component: () => import('../pages/Rakuyoshu.vue'),
  },
  {
    path: '/wakunnoshiori',
    component: () => import('../pages/Wakunnoshiori.vue'),
  },
  {
    path: '/setsuyoshu',
    component: () => import('../pages/Setsuyoshu.vue'),
  },
  {
    path: '/zozokutaizen',
    component: () => import('../pages/Zozokutaizen.vue'),
  },
  {
    path: '/about',
    component: () => import('../pages/About.vue'),
  },
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/Index.vue') }],
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/Error404.vue'),
  },
];

export default routes;
