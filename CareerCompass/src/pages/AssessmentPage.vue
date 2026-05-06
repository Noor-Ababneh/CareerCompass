<template>
  <div class="assessment-page min-h-screen bg-gray-50 py-12">
    <div class="container-custom max-w-4xl">
      <!-- Progress Header -->
      <div class="card mb-8 animate-fade-in">
        <div class="mb-4">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-semibold text-gray-700">
              السؤال {{ currentQuestionIndex + 1 }} من {{ totalQuestions }}
            </span>
            <span class="text-sm font-semibold text-primary-600">
              {{ Math.round(progress) }}%
            </span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              class="gradient-primary h-full transition-all duration-500 ease-out rounded-full"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
        </div>
        
        <div class="flex items-center justify-between text-sm text-gray-600">
          <span>{{ getDimensionName(currentQuestion?.dimension) }}</span>
          <span>{{ currentQuestionIndex + 1 }}/{{ totalQuestions }}</span>
        </div>
      </div>

      <!-- Question Card -->
      <div v-if="!isAnalyzing && currentQuestion" class="card animate-fade-in" :key="currentQuestionIndex">
        <div class="mb-8">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-12 h-12 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-white font-bold text-lg">{{ currentQuestionIndex + 1 }}</span>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 leading-relaxed">
              {{ currentQuestion.text_ar }}
            </h2>
          </div>
        </div>

        <!-- Likert Scale Options -->
        <div class="space-y-3">
          <div 
            v-for="option in likertOptions" 
            :key="option.value"
            @click="selectAnswer(option.value)"
            class="p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md"
            :class="[
              selectedAnswer === option.value 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-200 hover:border-primary-300 bg-white'
            ]"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div 
                  class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all"
                  :class="[
                    selectedAnswer === option.value 
                      ? 'border-primary-500 bg-primary-500' 
                      : 'border-gray-300'
                  ]"
                >
                  <div v-if="selectedAnswer === option.value" class="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span class="text-lg font-semibold" :class="selectedAnswer === option.value ? 'text-primary-700' : 'text-gray-700'">
                  {{ option.label }}
                </span>
              </div>
              <span 
                class="text-2xl"
                :class="selectedAnswer === option.value ? 'opacity-100' : 'opacity-50'"
              >
                {{ option.emoji }}
              </span>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8 pt-8 border-t border-gray-200">
          <button 
            @click="goToPrevious"
            :disabled="currentQuestionIndex === 0"
            class="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            السابق
          </button>

          <button 
            v-if="currentQuestionIndex < totalQuestions - 1"
            @click="goToNext"
            :disabled="selectedAnswer === null"
            class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            التالي
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <button 
            v-else
            @click="finishAssessment"
            :disabled="selectedAnswer === null"
            class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700"
          >
            إنهاء الاختبار
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Analyzing Animation -->
      <div v-if="isAnalyzing" class="card text-center py-16 animate-fade-in">
        <div class="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
          </svg>
        </div>
        <h2 class="text-3xl font-bold mb-4 text-gray-900">جاري تحليل إجاباتك...</h2>
        <p class="text-xl text-gray-600 mb-8">نقوم بمعالجة البيانات وتحديد أفضل توصية لك</p>
        <div class="flex justify-center gap-2">
          <div class="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style="animation-delay: 0s"></div>
          <div class="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          <div class="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
        </div>
      </div>

      <!-- Instructions (Show at start) -->
      <div v-if="currentQuestionIndex === 0 && !selectedAnswer" class="card mt-6 bg-blue-50 border-2 border-blue-200">
        <div class="flex items-start gap-4">
          <svg class="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div>
            <h3 class="font-bold text-blue-900 mb-2">تعليمات الاختبار:</h3>
            <ul class="text-blue-800 space-y-1 text-sm">
              <li>• اقرأ كل سؤال بعناية واختر الإجابة الأقرب لشخصيتك</li>
              <li>• لا توجد إجابات صحيحة أو خاطئة، فقط كن صادقاً مع نفسك</li>
              <li>• يمكنك الرجوع لتعديل إجاباتك السابقة</li>
              <li>• يستغرق الاختبار حوالي 10-15 دقيقة</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAssessmentStore } from '@/store'
import { questions } from '@/data/mockData.js'

const router = useRouter()
const assessmentStore = useAssessmentStore()

const currentQuestionIndex = ref(assessmentStore.currentQuestionIndex)
const selectedAnswer = ref(null)
const isAnalyzing = ref(false)

const likertOptions = [
  { value: 5, label: 'أوافق بشدة', emoji: '😊' },
  { value: 4, label: 'أوافق', emoji: '🙂' },
  { value: 3, label: 'محايد', emoji: '😐' },
  { value: 2, label: 'لا أوافق', emoji: '🙁' },
  { value: 1, label: 'لا أوافق بشدة', emoji: '😞' },
]

const currentQuestion = computed(() => questions[currentQuestionIndex.value])
const totalQuestions = computed(() => questions.length)
const progress = computed(() => ((currentQuestionIndex.value + 1) / totalQuestions.value) * 100)

// Load saved answer when question changes
watch(currentQuestionIndex, (newIndex) => {
  const questionId = questions[newIndex].id
  selectedAnswer.value = assessmentStore.answers[questionId] || null
})

// Initialize with saved answer if exists
const questionId = questions[currentQuestionIndex.value].id
selectedAnswer.value = assessmentStore.answers[questionId] || null

const selectAnswer = (value) => {
  selectedAnswer.value = value
  const questionId = currentQuestion.value.id
  assessmentStore.setAnswer(questionId, value)
}

const goToNext = () => {
  if (selectedAnswer.value !== null) {
    currentQuestionIndex.value++
    assessmentStore.currentQuestionIndex = currentQuestionIndex.value
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const goToPrevious = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
    assessmentStore.currentQuestionIndex = currentQuestionIndex.value
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const finishAssessment = async () => {
  if (selectedAnswer.value !== null) {
    isAnalyzing.value = true
    
    // Calculate results
    await assessmentStore.calculateResults()
    
    // Redirect to results
    setTimeout(() => {
      router.push('/results')
    }, 2500)
  }
}

const getDimensionName = (dimension) => {
  const names = {
    interest: 'الميول والاهتمامات',
    aptitude: 'القدرات والمهارات',
    work_style: 'أسلوب العمل',
  }
  return names[dimension] || dimension
}
</script>
