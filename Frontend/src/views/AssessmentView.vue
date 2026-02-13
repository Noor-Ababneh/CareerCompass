<template>
  <div class="assessment-container" dir="rtl">
    
    <div class="card relative overflow-hidden">
      
      <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-teal-400"></div>

      <div v-if="!showTieBreaker">
        <div class="progress-wrapper mb-6">
          <div class="flex justify-between text-xs text-blue-200 mb-1">
            <span>البداية</span>
            <span>النهاية</span>
          </div>
          <div class="h-2 bg-blue-900/30 rounded-full overflow-hidden">
             <div class="h-full bg-blue-400 transition-all duration-500" :style="{ width: progress + '%' }"></div>
          </div>
        </div>

        <div class="question-count text-blue-300 text-sm mb-4">
          سؤال {{ currentIndex + 1 }} من {{ questions.length }}
        </div>

        <transition name="fade" mode="out-in">
          <div :key="currentQuestion.id" class="question-box">
            <h2 class="text-2xl font-bold text-white mb-8 leading-relaxed">
              {{ currentQuestion.text_ar }}
            </h2>

            <div class="grid gap-3">
              <button
                v-for="(label, index) in likertLabels"
                :key="index"
                class="option-btn group"
                @click="selectAnswer(index + 1)"
              >
                <span class="group-hover:scale-110 transition-transform inline-block">
                  {{ getEmoji(index) }}
                </span>
                <span class="mr-3">{{ label }}</span>
              </button>
            </div>
          </div>
        </transition>
      </div>

      <div v-else class="tie-breaker-section text-center animate-fade-in">
        <div class="icon-header text-5xl mb-4">🎯</div>
        <h2 class="text-2xl font-bold text-white mb-2">سؤال أخير لزيادة الدقة!</h2>
        <p class="text-blue-200 mb-8 text-lg">
          {{ tieBreakerData.question }}
        </p>

        <div class="grid gap-4">
          <button
            v-for="(option, idx) in tieBreakerData.options"
            :key="idx"
            class="tie-breaker-btn"
            @click="finishWithTieBreaker(option)"
          >
            {{ option.text }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { riasecQuestions } from "@/data/riasecQuestions"
import { tieBreakerQuestions } from "@/data/tieBreakers" // استيراد الأسئلة الفاصلة

const router = useRouter()
const questions = riasecQuestions
const currentIndex = ref(0)
const showTieBreaker = ref(false) // للتحكم في ظهور السؤال الفاصل
const topResultCode = ref("") // لتخزين النمط الأعلى (R, I, A...)

// تجميع النقاط
const scores = ref({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 })

const likertLabels = ["لا أوافق بشدة", "لا أوافق", "محايد", "أوافق", "أوافق بشدة"]

// دالة مساعدة للإيموجي
const getEmoji = (idx) => ["😠", "🙁", "😐", "🙂", "😍"][idx]

const currentQuestion = computed(() => questions[currentIndex.value])
const progress = computed(() => ((currentIndex.value) / questions.length) * 100)

// بيانات السؤال الفاصل الحالي
const tieBreakerData = computed(() => {
  return tieBreakerQuestions[topResultCode.value] || {}
})

function selectAnswer(value) {
  const question = currentQuestion.value
  let finalScore = question.reverse ? 6 - value : value
  scores.value[question.dimension] += finalScore

  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++
  } else {
    calculateTopResult() // انتهت الأسئلة، نحسب النتيجة
  }
}

function calculateTopResult() {
  // حساب النمط الأعلى
  const sorted = Object.entries(scores.value).sort((a, b) => b[1] - a[1])
  topResultCode.value = sorted[0][0] // نأخذ الحرف الأول (مثلاً I)
  
  // إظهار السؤال الفاصل
  showTieBreaker.value = true
}

function finishWithTieBreaker(selectedOption) {
  // هنا نرسل النتيجة النهائية + اختيار المستخدم الدقيق
  router.push({
    path: "/results",
    query: {
      code: topResultCode.value, // النمط العام (I)
      specificPath: selectedOption.value, // التخصص الدقيق (مثلاً Medical)
      specificField: selectedOption.field // اسم الحقل (مثلاً الحقل الطبي)
    }
  })
}
</script>

<style scoped>
.assessment-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top right, #1e3a8a, #0f172a);
  padding: 20px;
}

.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 24px;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.option-btn {
  width: 100%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  text-align: right;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
}

.option-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-5px);
  border-color: #60a5fa;
}

.tie-breaker-btn {
  @apply w-full p-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-bold hover:scale-[1.02] transition shadow-lg border border-white/20;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>