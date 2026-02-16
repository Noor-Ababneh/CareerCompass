<template>
  <div class="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-4 font-sans text-slate-700" dir="rtl">
    
    <div class="w-full max-w-2xl bg-[#FFFFFF] rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden relative transition-all duration-500" :class="showIntro ? 'max-w-3xl' : 'max-w-2xl'">
      
      <transition name="fade" mode="out-in">
        <div v-if="showIntro" key="intro" class="p-10 md:p-14 text-center">
          
          <div class="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center text-4xl mb-8 mx-auto shadow-sm animate-bounce-slow">
            🧬
          </div>

          <h1 class="text-3xl md:text-4xl font-black text-slate-800 mb-6 leading-tight">
            اكتشف شيفرة مستقبلك المهني
          </h1>
          
          <p class="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg mx-auto">
            هذا ليس مجرد اختبار عادي. نحن نستخدم خوارزمية هجينة (M-Hybrid) تحلل شخصيتك من 3 زوايا دقيقة لضمان النتيجة الأمثل:
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-right">
            <div class="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
              <span class="text-2xl block mb-2">❤️</span>
              <h3 class="font-bold text-blue-900 mb-1">الميول والشغف</h3>
              <p class="text-xs text-blue-700/70">ماذا تحب أن تفعل؟</p>
            </div>
            <div class="bg-purple-50/50 p-5 rounded-2xl border border-purple-100">
              <span class="text-2xl block mb-2">💪</span>
              <h3 class="font-bold text-purple-900 mb-1">القدرات والمهارات</h3>
              <p class="text-xs text-purple-700/70">ماذا تجيد ببراعة؟</p>
            </div>
            <div class="bg-teal-50/50 p-5 rounded-2xl border border-teal-100">
              <span class="text-2xl block mb-2">💼</span>
              <h3 class="font-bold text-teal-900 mb-1">بيئة العمل</h3>
              <p class="text-xs text-teal-700/70">أين تبدع أكثر؟</p>
            </div>
          </div>

          <div class="flex items-center justify-center gap-6 text-sm text-slate-400 font-medium mb-10 border-t border-slate-100 pt-6">
            <span class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-slate-300"></span> 60 سؤال دقيق</span>
            <span class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-slate-300"></span> 5 دقائق تقريباً</span>
          </div>

          <button 
            @click="startAssessment"
            class="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-lg font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            ابدأ التحليل الآن 🚀
          </button>

        </div>

        <div v-else key="questions">
          
          <div class="absolute top-0 left-0 w-full h-2 bg-slate-50">
            <div 
              class="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700 ease-out rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.3)]"
              :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>

          <div class="p-8 md:p-12 text-center">
            
            <div class="absolute top-6 left-6">
              <button 
                v-if="currentQuestionIndex > 0"
                @click="prevQuestion"
                class="text-slate-400 hover:text-indigo-600 font-bold text-sm flex items-center gap-1 transition-colors px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <span class="text-lg">➜</span> السابق
              </button>
            </div>

            <transition name="fade-slide" mode="out-in">
              <div :key="currentQuestionIndex">
                
                <div 
                  class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-8 animate-fade-in mt-6"
                  :class="getBadgeClass(currentQuestion.type)"
                >
                  <span>{{ getBadgeIcon(currentQuestion.type) }}</span>
                  <span>{{ getBadgeText(currentQuestion.type) }}</span>
                </div>

                <h2 class="text-2xl md:text-3xl font-black leading-relaxed mb-6 text-slate-800 min-h-[80px] flex items-center justify-center">
                  {{ currentQuestion.text_ar }}
                </h2>
                
                <p class="text-slate-500 text-sm mb-10 font-medium bg-slate-50 inline-block px-4 py-2 rounded-lg">
                  سؤال {{ currentQuestionIndex + 1 }} من {{ riasecQuestions.length }}
                </p>

                <div class="space-y-3">
                  <button 
                    v-for="option in options" 
                    :key="option.value"
                    @click="handleAnswer(option.value)"
                    class="w-full p-4 rounded-2xl border border-slate-100 bg-[#FAFAFA] hover:bg-white hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 flex items-center justify-between group transform hover:-translate-y-0.5"
                  >
                    <span class="font-bold text-slate-600 group-hover:text-indigo-600 transition-colors text-lg">
                      {{ option.label }}
                    </span>
                    <span class="text-2xl group-hover:scale-125 transition-transform duration-300 drop-shadow-sm">{{ option.emoji }}</span>
                  </button>
                </div>

              </div>
            </transition>

          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { riasecQuestions } from '@/data/riasecQuestions'

const router = useRouter()
const showIntro = ref(true) // حالة للتحكم بظهور المقدمة
const currentQuestionIndex = ref(0)
const scores = ref({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 })
const history = ref([]) // لتخزين الإجابات السابقة للتمكن من التراجع

const options = [
  { label: "ينطبق عليّ تماماً", value: 5, emoji: "🤩" },
  { label: "ينطبق عليّ", value: 4, emoji: "😊" },
  { label: "متردد / نوعاً ما", value: 3, emoji: "🤔" },
  { label: "لا ينطبق عليّ", value: 2, emoji: "🙄" },
  { label: "لا ينطبق إطلاقاً", value: 1, emoji: "🙅‍♂️" }
]

const currentQuestion = computed(() => riasecQuestions[currentQuestionIndex.value])
const progressPercentage = computed(() => ((currentQuestionIndex.value + 1) / riasecQuestions.length) * 100)

// بدء الاختبار
function startAssessment() {
  showIntro.value = false
}

// العودة للسؤال السابق
function prevQuestion() {
  if (currentQuestionIndex.value > 0) {
    // 1. نرجع خطوة للخلف
    currentQuestionIndex.value--
    
    // 2. نحذف تأثير الإجابة الأخيرة من المجموع (Scores)
    const lastAnswer = history.value.pop() // نطلع آخر إجابة من السجل
    if (lastAnswer) {
      scores.value[lastAnswer.dimension] -= lastAnswer.weightedScore
    }
  }
}

function getBadgeClass(type) {
  if (type === 'interest') return 'bg-blue-50 text-blue-600 border border-blue-100'
  if (type === 'skill') return 'bg-purple-50 text-purple-600 border border-purple-100'
  return 'bg-teal-50 text-teal-600 border border-teal-100'
}

function getBadgeText(type) {
  if (type === 'interest') return 'اهتمامات وشغف'
  if (type === 'skill') return 'مهارات وقدرات'
  return 'بيئة العمل المفضلة'
}

function getBadgeIcon(type) {
  if (type === 'interest') return '❤️'
  if (type === 'skill') return '💪'
  return '💼'
}

function handleAnswer(value) {
  const q = currentQuestion.value
  
  // حساب الوزن
  let weight = 1
  if (q.type === 'skill') weight = 1.5
  if (q.type === 'style') weight = 1.2

  const weightedScore = value * weight

  // تحديث المجموع
  scores.value[q.dimension] += weightedScore
  
  // حفظ الإجابة في السجل (عشان نقدر نعمل تراجع)
  history.value.push({
    dimension: q.dimension,
    weightedScore: weightedScore
  })

  // الانتقال للتالي
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.animate-bounce-slow {
  animation: bounce 3s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(-5%); }
  50% { transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>