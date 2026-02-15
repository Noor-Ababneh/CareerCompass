<template>
  <div class="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-4 font-sans text-slate-800" dir="rtl">
    
    <div class="w-full max-w-2xl bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden relative">
      
      <div class="absolute top-0 left-0 w-full h-2 bg-slate-100">
        <div 
          class="h-full bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-700 ease-out rounded-r-full"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>

      <div class="p-8 md:p-12 text-center">
        
        <transition name="slide-fade" mode="out-in">
          <div :key="currentQuestionIndex">
            
            <div class="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm font-bold text-blue-600 mb-6 animate-pulse-slow">
              سؤال {{ currentQuestionIndex + 1 }} من {{ riasecQuestions.length }}
            </div>

            <h2 class="text-2xl md:text-3xl font-bold leading-relaxed mb-4 text-slate-800">
              {{ currentQuestion.text_ar }}
            </h2>
            
            <p class="text-slate-500 text-sm mb-10 font-medium">
              {{ currentQuestion.type === 'interest' ? '✨ ما مدى اهتمامك بهذا النشاط؟' : '💪 ما مدى إجادتك لهذه المهارة؟' }}
            </p>

            <div class="space-y-3">
              <button 
                v-for="option in options" 
                :key="option.value"
                @click="handleAnswer(option.value)"
                class="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 hover:shadow-md transition-all duration-300 flex items-center justify-between group transform hover:-translate-y-0.5"
              >
                <span class="font-bold text-slate-700 group-hover:text-indigo-700 transition-colors text-lg">
                  {{ option.label }}
                </span>
                <span class="text-2xl group-hover:scale-110 transition-transform">{{ option.emoji }}</span>
              </button>
            </div>

          </div>
        </transition>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { riasecQuestions } from '@/data/riasecQuestions'

const router = useRouter()
const currentQuestionIndex = ref(0)
const scores = ref({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 })

// خيارات الإجابة اللطيفة
const options = [
  { label: "أوافق بشدة", value: 5, emoji: "😍" },
  { label: "أوافق", value: 4, emoji: "🙂" },
  { label: "متردد / غير متأكد", value: 3, emoji: "😐" },
  { label: "لا أوافق", value: 2, emoji: "😕" },
  { label: "لا أوافق بشدة", value: 1, emoji: "😞" }
]

const currentQuestion = computed(() => riasecQuestions[currentQuestionIndex.value])
const progressPercentage = computed(() => ((currentQuestionIndex.value + 1) / riasecQuestions.length) * 100)

function handleAnswer(value) {
  const q = currentQuestion.value
  
  // الخوارزمية الموزونة: المهارة لها وزن أعلى قليلاً (1.5) لزيادة الواقعية
  const weight = q.type === 'skill' ? 1.5 : 1
  scores.value[q.dimension] += (value * weight)

  if (currentQuestionIndex.value < riasecQuestions.length - 1) {
    currentQuestionIndex.value++
  } else {
    finishAssessment()
  }
}

function finishAssessment() {
  const sortedScores = Object.entries(scores.value).sort((a, b) => b[1] - a[1])
  const topResult = sortedScores[0]
  
  const fieldMap = {
    'R': 'Engineering',
    'I': 'IT',
    'A': 'Design',
    'S': 'Health',
    'E': 'Business',
    'C': 'Business' 
  }

  router.push({
    path: '/results',
    query: {
      specificPath: fieldMap[topResult[0]],
      code: topResult[0]
    }
  })
}
</script>

<style scoped>
/* تأثيرات الانتقال الناعمة جداً */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .7; }
}
</style>