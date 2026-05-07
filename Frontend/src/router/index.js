import { createRouter, createWebHistory } from 'vue-router'

// 1. استدعاء الصفحات الأساسية
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import DashboardView from '../views/DashboardView.vue'

// 2. استدعاء صفحات التقييم والنتائج
import AssessmentView from '../views/AssessmentView.vue'
import AssessmentResultsView from '../views/AssessmentResultsView.vue'
import ImprovementPlanView from '../views/ImprovementPlanView.vue'

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
    // --- مسار الاختبار ---
    {
      path: '/assessment',
      name: 'assessment',
      component: AssessmentView
    },
    // --- مسار نتائج الاختبار (الصفحة الذهبية) ---
    {
      path: '/assessment-results',
      name: 'assessment-results',
      component: AssessmentResultsView
    },
    // --- مسار خطة تطوير العلامات ---
    {
      path: '/improvement-plan',
      name: 'improvement-plan',
      component: ImprovementPlanView
    },
    // --- مسارات الجامعات ---
    {
      path: '/grades-input',
      name: 'grades-input',
      component: () => import('../views/GradesInputView.vue')
    },
    {
      path: '/universities',
      name: 'universities',
      component: () => import('../views/UniversitiesView.vue')
    },
    {
      path: '/university/:id', 
      name: 'university-details',
      component: () => import('../views/UniversityDetails.vue'),
      props: true
    }
  ]
})

export default router