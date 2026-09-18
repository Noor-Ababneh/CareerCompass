<template>
  <div class="grades-page min-h-screen bg-gray-50 py-12">
    <div class="container-custom max-w-3xl">
      <div class="card animate-fade-in">
        <div class="text-center mb-8">
          <div class="w-16 h-16 gradient-teal rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <h1 class="text-3xl font-bold mb-2 text-gray-900">درجاتي الأكاديمية</h1>
          <p class="text-gray-600">أدخل درجاتك في المواد الأساسية للحصول على توصيات أكثر دقة</p>
        </div>

        <form @submit.prevent="saveGrades" class="space-y-6">
          <!-- Math -->
          <div>
            <label class="block text-lg font-semibold text-gray-700 mb-3">
              الرياضيات
            </label>
            <div class="relative">
              <input 
                v-model.number="grades.math"
                type="number" 
                min="0"
                max="100"
                step="0.1"
                required
                class="input-field text-lg"
                placeholder="أدخل الدرجة (0-100)"
              />
              <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">%</span>
            </div>
            <div class="mt-2 flex items-center gap-2">
              <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  class="h-full transition-all duration-300"
                  :class="getGradeColor(grades.math)"
                  :style="{ width: Math.min(grades.math || 0, 100) + '%' }"
                ></div>
              </div>
              <span class="text-sm font-semibold" :class="getGradeTextColor(grades.math)">
                {{ getGradeLabel(grades.math) }}
              </span>
            </div>
          </div>

          <!-- Science -->
          <div>
            <label class="block text-lg font-semibold text-gray-700 mb-3">
              العلوم (أحياء، كيمياء، فيزياء)
            </label>
            <div class="relative">
              <input 
                v-model.number="grades.science"
                type="number" 
                min="0"
                max="100"
                step="0.1"
                required
                class="input-field text-lg"
                placeholder="أدخل الدرجة (0-100)"
              />
              <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">%</span>
            </div>
            <div class="mt-2 flex items-center gap-2">
              <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  class="h-full transition-all duration-300"
                  :class="getGradeColor(grades.science)"
                  :style="{ width: Math.min(grades.science || 0, 100) + '%' }"
                ></div>
              </div>
              <span class="text-sm font-semibold" :class="getGradeTextColor(grades.science)">
                {{ getGradeLabel(grades.science) }}
              </span>
            </div>
          </div>

          <!-- Arabic -->
          <div>
            <label class="block text-lg font-semibold text-gray-700 mb-3">
              اللغة العربية
            </label>
            <div class="relative">
              <input 
                v-model.number="grades.arabic"
                type="number" 
                min="0"
                max="100"
                step="0.1"
                required
                class="input-field text-lg"
                placeholder="أدخل الدرجة (0-100)"
              />
              <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">%</span>
            </div>
            <div class="mt-2 flex items-center gap-2">
              <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  class="h-full transition-all duration-300"
                  :class="getGradeColor(grades.arabic)"
                  :style="{ width: Math.min(grades.arabic || 0, 100) + '%' }"
                ></div>
              </div>
              <span class="text-sm font-semibold" :class="getGradeTextColor(grades.arabic)">
                {{ getGradeLabel(grades.arabic) }}
              </span>
            </div>
          </div>

          <!-- English -->
          <div>
            <label class="block text-lg font-semibold text-gray-700 mb-3">
              اللغة الإنجليزية
            </label>
            <div class="relative">
              <input 
                v-model.number="grades.english"
                type="number" 
                min="0"
                max="100"
                step="0.1"
                required
                class="input-field text-lg"
                placeholder="أدخل الدرجة (0-100)"
              />
              <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">%</span>
            </div>
            <div class="mt-2 flex items-center gap-2">
              <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  class="h-full transition-all duration-300"
                  :class="getGradeColor(grades.english)"
                  :style="{ width: Math.min(grades.english || 0, 100) + '%' }"
                ></div>
              </div>
              <span class="text-sm font-semibold" :class="getGradeTextColor(grades.english)">
                {{ getGradeLabel(grades.english) }}
              </span>
            </div>
          </div>

          <!-- Average Display -->
          <div v-if="average > 0" class="bg-primary-50 border-2 border-primary-200 rounded-xl p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-primary-700 font-semibold mb-1">المعدل العام</p>
                <p class="text-4xl font-bold text-primary-900">{{ average.toFixed(1) }}%</p>
              </div>
              <div class="text-6xl">
                {{ average >= 90 ? '🌟' : average >= 80 ? '⭐' : average >= 70 ? '👍' : '💪' }}
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex gap-4 pt-6">
            <button type="submit" class="btn-primary flex-1">
              <svg class="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              حفظ الدرجات
            </button>
            <router-link to="/dashboard" class="btn-outline flex-1 text-center">
              إلغاء
            </router-link>
          </div>
        </form>

        <!-- Info Box -->
        <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div class="text-sm text-blue-900">
              <p class="font-semibold mb-1">لماذا نحتاج درجاتك؟</p>
              <p class="text-blue-800">
                تساعدنا درجاتك الأكاديمية على تقديم توصيات أكثر دقة تجمع بين ميولك الشخصية وأدائك الفعلي في المواد الدراسية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAssessmentStore } from '@/store'

const router = useRouter()
const assessmentStore = useAssessmentStore()

const grades = ref({
  math: assessmentStore.grades.math || null,
  science: assessmentStore.grades.science || null,
  arabic: assessmentStore.grades.arabic || null,
  english: assessmentStore.grades.english || null,
})

const average = computed(() => {
  const values = Object.values(grades.value).filter(v => v !== null && v !== '')
  if (values.length === 0) return 0
  return values.reduce((sum, val) => sum + val, 0) / values.length
})

const getGradeColor = (grade) => {
  if (!grade) return 'bg-gray-300'
  if (grade >= 90) return 'bg-green-500'
  if (grade >= 80) return 'bg-blue-500'
  if (grade >= 70) return 'bg-yellow-500'
  if (grade >= 60) return 'bg-orange-500'
  return 'bg-red-500'
}

const getGradeTextColor = (grade) => {
  if (!grade) return 'text-gray-500'
  if (grade >= 90) return 'text-green-600'
  if (grade >= 80) return 'text-blue-600'
  if (grade >= 70) return 'text-yellow-600'
  if (grade >= 60) return 'text-orange-600'
  return 'text-red-600'
}

const getGradeLabel = (grade) => {
  if (!grade) return '--'
  if (grade >= 90) return 'ممتاز'
  if (grade >= 80) return 'جيد جداً'
  if (grade >= 70) return 'جيد'
  if (grade >= 60) return 'مقبول'
  return 'ضعيف'
}

const saveGrades = () => {
  assessmentStore.setGrades(grades.value)
  
  // Show success message
  alert('تم حفظ الدرجات بنجاح! ✓')
  
  // Redirect to dashboard
  router.push('/dashboard')
}
</script>
