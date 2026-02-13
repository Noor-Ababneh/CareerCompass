import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'       // الصفحة الجديدة
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import DashboardView from '../views/DashboardView.vue' // صفحة الطالب الخاصة

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',          // الرابط الأساسي يفتح الصفحة الرئيسية
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/dashboard', // هذا الرابط ما بفتح إلا لما يسجل دخول
      name: 'dashboard',
      component: DashboardView
    }
  ]
})

export default router