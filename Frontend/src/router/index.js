import { createRouter, createWebHistory } from 'vue-router'

// استدعاء الصفحات القديمة
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import DashboardView from '../views/DashboardView.vue'

// 👇 استدعاء الصفحات الجديدة
import AssessmentView from '../views/AssessmentView.vue'
import ResultsView from '../views/ResultsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    // 👇 روابط الصفحات الجديدة
    {
      path: '/assessment',
      name: 'assessment',
      component: AssessmentView
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsView
    },
    {
      path: '/universities',
      name: 'universities',
      component: () => import('../views/UniversitiesView.vue')
    },
    {
      path: '/grades-input',
      name: 'grades-input',
      component: () => import('../views/GradesInputView.vue')
    },
  ]
})

export default router