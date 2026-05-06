import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/pages/SignupPage.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/DashboardPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/assessment',
    name: 'Assessment',
    component: () => import('@/pages/AssessmentPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/grades',
    name: 'Grades',
    component: () => import('@/pages/GradesPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/results',
    name: 'Results',
    component: () => import('@/pages/ResultsPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/universities',
    name: 'Universities',
    component: () => import('@/pages/UniversitiesPage.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/AboutPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
