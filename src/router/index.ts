import { createRouter, createWebHashHistory } from 'vue-router'
import { charactersRoute } from '@/modules/characters/router'
import AboutView from '@/shared/pages/AboutView.vue'
import HomeView from '@/shared/pages/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // public
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },

    // characters
    /* {
      path: '/characters',
      name: 'characters',
      component: () => import('@/modules/characters/layout/CharacterLayout.vue')
    }, */
    {
      ...charactersRoute,
      path: '/characters'
    },

    // default
    {
      path: '/:pathMatch(.*)*',
      redirect: () => ({ name: 'home' }),
    },
  ],
})

/* router.addRoute(charactersRoute) */

export default router
