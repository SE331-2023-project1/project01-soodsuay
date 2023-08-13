import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TeacherListView from '../views/TeacherListView.vue'
import TeacherDetailView from '../views/TeacherDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
    path: '/teacher',
    name: 'teacher',
    component: TeacherListView
    },
    {
    path: '/teacher/:id',
    name: 'teacher-detail',
    component: TeacherDetailView,
    props:true
    }
  ]
})

export default router
