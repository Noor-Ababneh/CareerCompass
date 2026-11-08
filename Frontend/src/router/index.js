import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'

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
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/assessment',
      name: 'assessment',
      component: AssessmentView
    },
    {
      path: '/assessment-results',
      name: 'assessment-results',
      component: AssessmentResultsView
    },
    {
      path: '/improvement-plan',
      name: 'improvement-plan',
      component: ImprovementPlanView
    },
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
    },
    {
      path: '/login',
      redirect: '/'
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, left: 0 }
  }
})

export default router