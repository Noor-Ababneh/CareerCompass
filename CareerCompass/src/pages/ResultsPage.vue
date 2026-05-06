<template>
  <div class="results-page min-h-screen bg-gray-50 py-12">
    <div class="container-custom" v-if="results">
      <!-- Header -->
      <div class="card mb-8 gradient-primary text-white animate-fade-in">
        <div class="text-center">
          <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h1 class="text-4xl font-bold mb-3">نتائج التقييم</h1>
          <p class="text-xl text-blue-100">بناءً على تحليل شامل لإجاباتك</p>
        </div>
      </div>

      <!-- Main Recommendation -->
      <div class="card mb-8 animate-fade-in border-r-4" 
           :class="authStore.isGrade12 ? 'border-purple-500' : 'border-teal-500'"
           style="animation-delay: 0.1s">
        <div class="flex items-start gap-6">
          <div class="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
               :class="authStore.isGrade12 ? 'bg-purple-100' : 'bg-teal-100'">
            {{ authStore.isGrade12 ? '🎓' : '🎯' }}
          </div>
          <div class="flex-1">
            <h2 class="text-2xl font-bold mb-3 text-gray-900">
              {{ authStore.isGrade12 ? 'التخصصات المقترحة' : 'المجال المقترح' }}
            </h2>
            <div class="text-3xl font-bold mb-4" 
                 :class="authStore.isGrade12 ? 'text-purple-700' : 'text-teal-700'">
              {{ results.recommendation.field }}
            </div>
            
            <!-- For Grade 12: Show Majors -->
            <div v-if="authStore.isGrade12" class="space-y-3">
              <p class="text-gray-700 mb-4">التخصصات الموصى بها:</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div v-for="(major, index) in results.recommendation.majors" :key="index"
                     class="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center gap-3">
                  <div class="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    {{ index + 1 }}
                  </div>
                  <span class="text-lg font-semibold text-purple-900">{{ major }}</span>
                </div>
              </div>
            </div>

            <div class="mt-4 bg-gray-50 rounded-lg p-4">
              <p class="text-sm text-gray-600">
                <strong>نسبة التوافق:</strong> {{ results.recommendation.score }}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Field Scores Chart -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="card animate-fade-in" style="animation-delay: 0.2s">
          <h3 class="text-xl font-bold mb-6 text-gray-900">التوافق مع المجالات</h3>
          <div class="space-y-4">
            <div v-for="field in results.recommendation.topFields" :key="field.name">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold text-gray-700">{{ field.name }}</span>
                <span class="text-primary-600 font-bold">{{ field.score }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  class="h-full transition-all duration-1000 rounded-full"
                  :class="getScoreColor(field.score)"
                  :style="{ width: field.score + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Scores -->
        <div class="card animate-fade-in" style="animation-delay: 0.3s">
          <h3 class="text-xl font-bold mb-6 text-gray-900">نقاط القوة</h3>
          <div class="space-y-3">
            <div v-for="(item, index) in topStrengths" :key="index"
                 class="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <div class="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                {{ index + 1 }}
              </div>
              <div class="flex-1">
                <p class="font-semibold text-green-900">{{ item.name }}</p>
                <p class="text-sm text-green-700">{{ item.score }}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Improvement Plan (For Grades 9-11 Only) -->
      <div v-if="!authStore.isGrade12 && results.improvementPlan?.length > 0" class="card mb-8 animate-fade-in" style="animation-delay: 0.4s">
        <div class="flex items-start gap-4 mb-6">
          <div class="w-12 h-12 gradient-orange rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-2xl font-bold mb-3 text-gray-900">خطة التطوير الشخصية</h3>
            <p class="text-gray-700 mb-6">نقاط يُنصح بتطويرها قبل دخول الجامعة:</p>
            
            <div class="space-y-6">
              <div v-for="(item, index) in results.improvementPlan" :key="index"
                   class="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                <div class="flex items-center justify-between mb-4">
                  <h4 class="text-xl font-bold text-orange-900">{{ item.area }}</h4>
                  <span class="px-4 py-2 bg-orange-600 text-white rounded-full font-bold">
                    {{ item.score }}%
                  </span>
                </div>
                <p class="text-gray-700 font-semibold mb-3">توصيات التحسين:</p>
                <ul class="space-y-2">
                  <li v-for="(suggestion, sIndex) in item.suggestions" :key="sIndex"
                      class="flex items-start gap-3 text-gray-700">
                    <svg class="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                    <span>{{ suggestion }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style="animation-delay: 0.5s">
        <div class="card bg-primary-50 border-2 border-primary-200">
          <h3 class="text-xl font-bold mb-3 text-primary-900">الخطوات التالية</h3>
          <ul class="space-y-3 text-gray-700">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>استكشف الجامعات التي تقدم التخصصات الموصى بها</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ authStore.isGrade12 ? 'راجع متطلبات القبول لكل تخصص' : 'اعمل على خطة التطوير المقترحة' }}</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>استشر معلميك ومرشدك الأكاديمي</span>
            </li>
          </ul>
          <router-link to="/universities" class="btn-primary mt-6 inline-block">
            استكشف الجامعات
          </router-link>
        </div>

        <div class="card">
          <h3 class="text-xl font-bold mb-3 text-gray-900">تحميل النتائج</h3>
          <p class="text-gray-700 mb-6">احفظ نتائجك للرجوع إليها لاحقاً أو مشاركتها مع مرشدك الأكاديمي</p>
          <div class="flex gap-3">
            <button class="btn-outline flex-1" @click="printResults">
              <svg class="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
              </svg>
              طباعة
            </button>
            <button class="btn-secondary flex-1" @click="shareResults">
              <svg class="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
              </svg>
              مشاركة
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results State -->
    <div v-else class="container-custom">
      <div class="card text-center py-16">
        <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
        </div>
        <h2 class="text-2xl font-bold mb-3 text-gray-900">لا توجد نتائج بعد</h2>
        <p class="text-gray-600 mb-8">يجب إكمال الاختبار أولاً للحصول على نتائجك</p>
        <router-link to="/assessment" class="btn-primary inline-block">
          بدء الاختبار
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore, useAssessmentStore } from '@/store'

const authStore = useAuthStore()
const assessmentStore = useAssessmentStore()

const results = computed(() => assessmentStore.results)

const topStrengths = computed(() => {
  if (!results.value?.scores) return []
  
  const scores = results.value.scores
  const strengths = []
  
  const nameMap = {
    realistic: 'التطبيق العملي',
    investigative: 'التحليل والبحث',
    social: 'التعامل الاجتماعي',
    artistic: 'الإبداع والفن',
    enterprising: 'القيادة والمبادرة',
    math: 'الرياضيات',
    biology: 'الأحياء',
    technology: 'التكنولوجيا',
    communication: 'التواصل',
    stress: 'التعامل مع الضغط',
    analytical: 'التفكير التحليلي',
    organization: 'التنظيم',
  }
  
  Object.entries(scores).forEach(([key, value]) => {
    if (nameMap[key]) {
      strengths.push({ name: nameMap[key], score: value, key })
    }
  })
  
  return strengths.sort((a, b) => b.score - a.score).slice(0, 5)
})

const getScoreColor = (score) => {
  if (score >= 80) return 'bg-green-500'
  if (score >= 60) return 'bg-blue-500'
  if (score >= 40) return 'bg-yellow-500'
  return 'bg-orange-500'
}

const printResults = () => {
  window.print()
}

const shareResults = () => {
  if (navigator.share) {
    navigator.share({
      title: 'نتائج بوصلة المسار',
      text: `حصلت على توصية بـ ${results.value.recommendation.field} في نظام بوصلة المسار!`,
      url: window.location.href,
    })
  } else {
    alert('تم نسخ الرابط إلى الحافظة')
    navigator.clipboard.writeText(window.location.href)
  }
}
</script>
