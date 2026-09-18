<template>
  <div class="dashboard-page py-12 bg-gray-50 min-h-screen">
    <div class="container-custom">
      <!-- Welcome Header -->
      <div class="card mb-8 gradient-primary text-white animate-fade-in">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-2">مرحباً، {{ authStore.user?.name }}!</h1>
            <p class="text-blue-100 text-lg">
              الصف {{ getGradeName(authStore.gradeLevel) }}
            </p>
          </div>
          <div class="hidden md:block">
            <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Card -->
      <div v-if="assessmentStore.isCompleted" class="card mb-8 animate-fade-in border-r-4 border-green-500">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-lg text-gray-900">تم إكمال التقييم!</h3>
            <p class="text-gray-600">يمكنك الآن مشاهدة نتائجك وتوصياتك</p>
          </div>
          <router-link to="/results" class="btn-primary">
            عرض النتائج
          </router-link>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <!-- Start Assessment -->
        <div class="card hover:shadow-xl transition-shadow animate-fade-in" style="animation-delay: 0.1s">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-2">اختبار التقييم</h3>
              <p class="text-gray-600 mb-4">48 سؤالاً لتحديد ميولك وقدراتك</p>
              <router-link 
                to="/assessment" 
                class="btn-primary text-sm"
                @click="assessmentStore.resetAssessment()"
              >
                {{ assessmentStore.isCompleted ? 'إعادة الاختبار' : 'بدء الاختبار' }}
              </router-link>
            </div>
          </div>
        </div>

        <!-- Enter Grades -->
        <div class="card hover:shadow-xl transition-shadow animate-fade-in" style="animation-delay: 0.2s">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-12 h-12 gradient-teal rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-2">درجاتي</h3>
              <p class="text-gray-600 mb-4">أدخل درجاتك للحصول على توصيات أدق</p>
              <router-link to="/grades" class="btn-secondary text-sm">
                {{ hasGrades ? 'تحديث الدرجات' : 'إدخال الدرجات' }}
              </router-link>
            </div>
          </div>
        </div>

        <!-- Browse Universities -->
        <div class="card hover:shadow-xl transition-shadow animate-fade-in" style="animation-delay: 0.3s">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-2">الجامعات</h3>
              <p class="text-gray-600 mb-4">استكشف الجامعات والتخصصات</p>
              <router-link to="/universities" class="btn-outline text-sm">
                تصفح الجامعات
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Grade-Specific Content -->
      <div v-if="authStore.isGrade12" class="space-y-6">
        <h2 class="text-2xl font-bold mb-6">خاص بطلاب التوجيهي</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="card bg-gradient-to-br from-primary-50 to-blue-50 border-2 border-primary-200">
            <h3 class="text-xl font-bold mb-3 text-primary-900">توصيات التخصصات</h3>
            <p class="text-gray-700 mb-4 leading-relaxed">
              بعد إتمام الاختبار، ستحصل على قائمة مباشرة بالتخصصات الجامعية المناسبة لك بناءً على تقييم شامل لميولك وقدراتك.
            </p>
            <div v-if="assessmentStore.isCompleted" class="flex gap-3">
              <router-link to="/results" class="btn-primary">
                عرض التخصصات المقترحة
              </router-link>
            </div>
            <div v-else class="bg-blue-100 border border-blue-300 rounded-lg p-4">
              <p class="text-sm text-blue-900">
                أكمل الاختبار أولاً للحصول على توصيات التخصصات
              </p>
            </div>
          </div>

          <div class="card">
            <h3 class="text-xl font-bold mb-3">الجامعات والتخصصات</h3>
            <p class="text-gray-700 mb-4">
              تصفح دليل الجامعات الأردنية الشامل واكتشف التخصصات المتاحة في كل جامعة.
            </p>
            <router-link to="/universities" class="btn-outline">
              استكشف الجامعات
            </router-link>
          </div>
        </div>
      </div>

      <div v-else class="space-y-6">
        <h2 class="text-2xl font-bold mb-6">خطة التطوير الشخصية</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="card bg-gradient-to-br from-teal-50 to-green-50 border-2 border-teal-200">
            <h3 class="text-xl font-bold mb-3 text-teal-900">المجال المقترح</h3>
            <p class="text-gray-700 mb-4 leading-relaxed">
              بعد إتمام الاختبار، ستحصل على توصية بالمجال الدراسي الأنسب (صحي، هندسي، تقني، إداري، إلخ) مع خطة تطوير شخصية.
            </p>
            <div v-if="assessmentStore.isCompleted" class="flex gap-3">
              <router-link to="/results" class="btn-primary">
                عرض المجال المقترح
              </router-link>
            </div>
            <div v-else class="bg-teal-100 border border-teal-300 rounded-lg p-4">
              <p class="text-sm text-teal-900">
                أكمل الاختبار أولاً للحصول على توصية المجال
              </p>
            </div>
          </div>

          <div class="card">
            <h3 class="text-xl font-bold mb-3">خطة التحسين</h3>
            <p class="text-gray-700 mb-4 leading-relaxed">
              نحدد نقاط الضعف ونقدم لك خطة تطوير مخصصة لتحسين مهاراتك قبل دخول الجامعة.
            </p>
            <div v-if="assessmentStore.isCompleted && assessmentStore.results?.improvementPlan?.length > 0" class="space-y-2">
              <div v-for="(item, index) in assessmentStore.results.improvementPlan.slice(0, 2)" :key="index" 
                   class="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p class="font-semibold text-orange-900">{{ item.area }}</p>
                <p class="text-sm text-orange-700">النتيجة: {{ item.score }}%</p>
              </div>
              <router-link to="/results" class="btn-outline text-sm mt-3 inline-block">
                عرض الخطة الكاملة
              </router-link>
            </div>
            <div v-else class="bg-gray-100 border border-gray-300 rounded-lg p-4">
              <p class="text-sm text-gray-700">
                أكمل الاختبار للحصول على خطة التطوير المخصصة
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div class="card text-center">
          <div class="text-4xl font-bold text-primary-600 mb-2">
            {{ assessmentStore.isCompleted ? '100%' : Math.min(assessmentStore.progress, 100) + '%' }}
          </div>
          <p class="text-gray-600">نسبة إتمام التقييم</p>
        </div>

        <div class="card text-center">
          <div class="text-4xl font-bold text-teal-600 mb-2">
            {{ hasGrades ? '4/4' : '0/4' }}
          </div>
          <p class="text-gray-600">المواد المدخلة</p>
        </div>

        <div class="card text-center">
          <div class="text-4xl font-bold text-orange-600 mb-2">
            {{ assessmentStore.isCompleted ? (authStore.isGrade12 ? '5+' : '3+') : '0' }}
          </div>
          <p class="text-gray-600">التوصيات المتاحة</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore, useAssessmentStore } from '@/store'

const authStore = useAuthStore()
const assessmentStore = useAssessmentStore()

const getGradeName = (grade) => {
  const names = {
    9: 'التاسع',
    10: 'العاشر',
    11: 'الحادي عشر',
    12: 'الثاني عشر (التوجيهي)',
  }
  return names[grade] || grade
}

const hasGrades = computed(() => {
  return assessmentStore.grades.math !== null
})
</script>
