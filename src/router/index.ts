import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';

export default function () {
  const routerHistory = import.meta.env.SSR === false ? createWebHistory() : createMemoryHistory();

  return createRouter({
    history: routerHistory,
    routes: [
      {
        path: '/',
        name: 'home',
        alias: '/home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About.vue'),
        meta: {
          title: 'About Page'
        }
      },
      {
        path: '/:catchAll(.*)*',
        name: '404',
        component: () => import('@/components/NotFound.vue'),
        meta: {
          title: '404 Not Found'
        }
      }
    ]
  });
}
