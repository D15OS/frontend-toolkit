import { createRouter, createWebHistory } from 'vue-router'
import portal from '@/views/portal/portal.vue'
import vue3 from '@/views/componentList/vue3.vue'
import react from '@/views/componentList/react.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'portal',
      component: portal,
      redirect: '/vue3',
      children: [
        {
          path: '/vue3',
          name: 'components-vue3',
          component: vue3,
        },
        {
          path: '/react',
          name: 'components-react',
          component: react,
        },
      ],
    },
  ],
})

export default router
