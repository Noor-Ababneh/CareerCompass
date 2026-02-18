import { createRouter, createWebHistory } from 'vue-router'

// 1. استدعاء الصفحات الأساسية
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import DashboardView from '../views/DashboardView.vue'

// 2. استدعاء الصفحات الجديدة (Assessment & Results)
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
    // --- المسارات الجديدة ---
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
      path: '/grades-input',
      name: 'grades-input',
      // Lazy loading (تحميل عند الطلب) أفضل للأداء
      component: () => import('../views/GradesInputView.vue')
    },
    {
      path: '/universities',
      name: 'universities',
      component: () => import('../views/UniversitiesView.vue')
    },
    {
      // المسار الديناميكي لتفاصيل الجامعة
      path: '/university/:id', 
      name: 'university-details',
      component: () => import('../views/UniversityDetails.vue'),
      props: true // ضروري جداً لتمرير رقم الجامعة للصفحة
    }
  ]
})

export default router