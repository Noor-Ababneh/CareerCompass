<template>
  <div class="min-h-screen flex items-center justify-center p-4 md:p-8 bg-[#F8FAFF] font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden" dir="rtl">
    
    <div class="absolute top-0 left-0 right-0 w-full max-w-7xl mx-auto px-6 pt-6 md:pt-10 flex justify-end gap-4 z-50 pointer-events-none">
      <button @click="$router.push('/')" class="pointer-events-auto flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all duration-300 font-bold group bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-sm hover:shadow-md border border-slate-200">
        <span class="text-xl">🏠</span>
        <span>الرئيسية</span>
      </button>
      
      <button @click="$router.push('/dashboard')" 
        class="pointer-events-auto bg-indigo-800 hover:bg-indigo-900 text-white px-5 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 border border-indigo-700">
        <span>📊</span>
        <span>لوحة التحكم</span>
      </button>
    </div>

    <div class="absolute inset-0 z-0 opacity-[0.03]" style="background-image: radial-gradient(#3730a3 1px, transparent 1px); background-size: 32px 32px;"></div>
    <div class="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-800/10 blur-[100px] animate-pulse z-0"></div>
    <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-800/10 blur-[100px] animate-pulse z-0" style="animation-delay: 2s;"></div>

    <div class="w-full relative z-10 transition-all duration-700 flex items-center justify-center mt-12" :class="currentScreen === 'intro' ? 'max-w-3xl' : 'max-w-2xl'">
      
      <div v-if="currentScreen === 'phaseIntro' && (currentPhase === 2 || currentPhase === 3)" class="fixed right-[calc(50%+450px)] top-[35%] z-20 hidden xl:block animate-float pointer-events-none">
        <div class="w-[300px] bg-white rounded-3xl shadow-xl shadow-indigo-500/10 p-2 border-2 border-white overflow-hidden">
          <img :src="avatarSrc" class="w-full h-auto rounded-2xl object-cover" alt="Student Avatar" />
        </div>
      </div>

      <div class="bg-white/90 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(49,46,129,0.1)] overflow-hidden relative min-h-[450px] w-full">
        
        <div v-if="currentScreen === 'questions'" class="absolute top-0 left-0 w-full h-1.5 bg-slate-100 z-20">
          <div class="h-full rounded-l-full transition-all duration-700 bg-gradient-to-r from-indigo-500 to-purple-500" :style="{ width: progress + '%' }"></div>
        </div>

        <transition name="screen" mode="out-in">
          
          <div v-if="currentScreen === 'intro'" key="intro" class="p-8 md:p-12 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-indigo-100/50">
              <span class="text-4xl">🧭</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-black mb-4 leading-tight text-slate-800">
              مقياس الميول والقدرات الأكاديمية
            </h1>
            <p class="text-base text-slate-600 mb-2 max-w-lg mx-auto font-medium">
              أداة تشخيصية علمية تعتمد على ثلاثة مصادر بحثية معتمدة دولياً لتحديد الحقل الأكاديمي والتخصصات الأنسب لك.
            </p>
            <p class="text-xs mb-10 font-bold text-indigo-600/80">
              Holland (1997) • Fleishman & Reilly (1992) • O*NET Framework
            </p>

            <div class="grid grid-cols-3 gap-4 mb-10">
              <div v-for="p in phasesMeta" :key="p.phase" class="rounded-2xl border p-4 text-center bg-[#F8FAFF] border-indigo-100 shadow-sm">
                <div class="text-2xl mb-2">{{ p.icon }}</div>
                <div class="font-bold text-sm text-slate-700 mb-1">{{ p.title }}</div>
                <div class="text-xs opacity-70 text-slate-500">{{ p.questionsCount }} سؤالاً</div>
              </div>
            </div>

            <button @click="startAssessment" class="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-indigo-900 hover:to-purple-900 text-white rounded-2xl font-black text-lg transition-all shadow-lg shadow-indigo-900/20 hover:-translate-y-1">
              البدء بالمقياس الآن
            </button>
            
          </div>

          <div v-else-if="currentScreen === 'phaseIntro'" key="phaseIntro" class="p-8 md:p-12 text-center flex flex-col items-center justify-center h-full">
            
            <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-6 border bg-indigo-50 border-indigo-200 text-indigo-700">
              <span>{{ currentPhaseMeta.icon }}</span>
              <span>المرحلة {{ currentPhase }} من {{ phasesMeta.length }}</span>
            </div>
            
            <h2 class="text-2xl md:text-3xl font-black mb-3 text-slate-800">{{ currentPhaseMeta.title }}</h2>
            <p class="text-base mb-8 text-slate-600">{{ currentPhaseMeta.subtitle }}</p>

            <div class="rounded-2xl border p-5 mb-8 text-center text-sm leading-relaxed bg-[#F8FAFF] border-indigo-200/50 text-indigo-900 max-w-md mx-auto">
              <span class="font-bold text-indigo-700 block mb-2">💡 تعليمات هذه المرحلة:</span>
              {{ phaseHint }}
              <div class="mt-2 text-xs text-indigo-600/70 font-bold uppercase tracking-wide">
                المصدر العلمي: 
                <span v-if="currentPhase === 1">Holland (1997)</span>
                <span v-else-if="currentPhase === 2">Fleishman & Reilly (1992)</span>
                <span v-else>O*NET Work Context</span>
              </div>
            </div>

            <button @click="startPhase" class="px-10 py-3.5 font-black text-white rounded-2xl hover:-translate-y-0.5 transition-all text-base shadow-md shadow-indigo-900/20 bg-indigo-800 hover:bg-indigo-900">
              {{ currentPhase === 1 ? 'بدء المرحلة الأولى' : 'متابعة التقييم' }}
            </button>
          </div>

          <div v-else-if="currentScreen === 'questions'" key="questions" class="p-6 md:p-10">
            <div class="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border bg-indigo-50 border-indigo-200 text-indigo-700">
                <span>{{ currentPhaseMeta.icon }}</span>
                <span>{{ typeBadgeText }}</span>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-xs font-black text-slate-400">{{ phaseLocalIdx + 1 }} / {{ currentPhaseMeta.questionsCount }}</span>
                <button v-if="canGoBack" @click="prevQuestion" class="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1">
                  السابق <span class="text-lg leading-none">→</span>
                </button>
              </div>
            </div>

            <transition name="fade-slide" mode="out-in">
              <div :key="currentIdx" class="min-h-[250px] flex flex-col justify-between">
                
                <h2 class="text-xl md:text-2xl font-black leading-relaxed mb-8 text-center text-slate-800">
                  {{ currentQ.text_ar }}
                </h2>

                <div class="space-y-3">
                  <button
                    v-for="opt in OPTIONS"
                    :key="opt.v"
                    @click="answer(opt.v)"
                    class="w-full p-4 rounded-2xl border-2 border-slate-100 bg-[#F8FAFF]/50 text-right flex items-center justify-between group transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-indigo-50/30"
                  >
                    <div class="flex items-center gap-3">
                      <span class="text-2xl grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">{{ opt.emoji }}</span>
                      <span class="font-bold text-slate-700 group-hover:text-indigo-900 text-base md:text-lg transition-colors">{{ opt.l }}</span>
                    </div>
                    <div class="relative w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-indigo-500 flex items-center justify-center transition-colors">
                      <div class="w-2 h-2 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </button>
                </div>

              </div>
            </transition>
          </div>

          <div v-else-if="currentScreen === 'tieBreaker'" key="tieBreaker" class="p-8 md:p-12">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 bg-purple-50 text-purple-600 border border-purple-100">
              ⚖️
            </div>
            <div class="text-center mb-8">
              <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border bg-purple-50 border-purple-200 text-purple-700">
                سؤال التوجيه الحاسم
              </div>
              <h2 class="text-xl md:text-2xl font-black leading-relaxed text-slate-800 mb-2">
                {{ tieBreakerData.question }}
              </h2>
              <p class="text-sm text-slate-500 font-medium">
                نتائجك متقاربة جداً! يرجى اختيار السيناريو الأقرب إلى شغفك الفعلي.
              </p>
            </div>

            <div class="space-y-3">
              <button
                v-for="opt in tieBreakerData.options"
                :key="opt.value"
                @click="submitAssessment(opt.value)"
                class="w-full p-5 rounded-2xl border-2 text-right transition-all duration-200 hover:-translate-y-1 bg-[#F8FAFF]/50 border-slate-100 hover:border-purple-400 hover:bg-purple-50/30 group"
              >
                <p class="font-bold text-base md:text-lg leading-relaxed text-slate-700 group-hover:text-purple-900">{{ opt.text }}</p>
              </button>
            </div>
          </div>

          <div v-else-if="currentScreen === 'loading'" key="loading" class="p-16 text-center flex flex-col items-center justify-center h-full">
            <div class="relative w-24 h-24 mx-auto mb-8">
              <div class="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
              <div class="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin-slow"></div>
              <div class="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">⚙️</div>
            </div>
            <h2 class="text-2xl font-black mb-3 text-slate-800">جاري تحليل النتائج...</h2>
            
            <div class="space-y-3 max-w-sm mx-auto text-right mt-8">
              <div v-for="(s, i) in LOADING_STEPS" :key="i" class="flex items-center gap-3 text-sm transition-all duration-500 px-4 py-3 rounded-xl"
                :class="loadingStep >= i ? 'bg-indigo-50 text-indigo-800 border border-indigo-200' : 'text-slate-400 border border-transparent'">
                <span class="flex-shrink-0 text-lg">{{ loadingStep > i ? '✅' : loadingStep === i ? '⏳' : '⚪' }}</span>
                <span :class="loadingStep >= i ? 'font-bold' : 'font-medium'">{{ s }}</span>
              </div>
            </div>
          </div>

        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { phasesMeta } from '@/data/riasecQuestions' 
import riasecQuestionsData from '@/assets/questions_ar.json' 

import boyGif from '@/assets/avatars/boy2.gif'
import girlGif from '@/assets/avatars/girl2.gif'

const router = useRouter()
const authStore = useAuthStore()

const userGender = computed(() => authStore.user?.gender)
const avatarSrc = computed(() => {
  return userGender.value === 'female' ? girlGif : boyGif
})

// الرابط الصحيح والمطابق للوحة تحكم Render تماماً
const API_URL = 'https://careercompass-bngv.onrender.com'

const currentScreen = ref('intro')
const currentIdx = ref(0)
const currentPhase = ref(1)
const answers = ref({})  
const history = ref([])  
const tieBreakerData = ref(null)
const loadingStep = ref(-1)
let loadingTimer = null

const riasecQuestions = riasecQuestionsData

const OPTIONS = [
  { v: 5, l: 'موافق بشدة', emoji: '🤩' },
  { v: 4, l: 'موافق', emoji: '🙂' },
  { v: 3, l: 'حيادي', emoji: '😐' },
  { v: 2, l: 'غير موافق', emoji: '😕' },
  { v: 1, l: 'غير موافق بشدة', emoji: '😞' }
]

const LOADING_STEPS = [
  'تحليل أنماط الميول والاهتمامات...',
  'تطبيق المعاملات الترجيحية للقدرات...',
  'مطابقة النمط مع الحقول الأكاديمية الأردنية...',
  'احتساب نسب التوافق النهائية...'
]

const PHASE_HINTS = {
  1: 'أجب بصدق عما تميل إليه طبيعياً؛ لا عما تعتقد أنه "الصحيح".',
  2: 'تقيس هذه المرحلة قدراتك الفعلية. فكر في المهام التي تنجزها بسهولة.',
  3: 'الأسئلة الأخيرة تحدد بيئة العمل الأنسب والأكثر راحة لك.'
}

const currentQ = computed(() => riasecQuestions[currentIdx.value] || {})
const currentPhaseMeta = computed(() => phasesMeta.find(p => p.phase === currentPhase.value) || phasesMeta[0])
const phaseHint = computed(() => PHASE_HINTS[currentPhase.value] || '')
const canGoBack = computed(() => currentIdx.value > 0)
const phaseLocalIdx = computed(() => {
  const start = riasecQuestions.findIndex(q => q.phase === currentPhase.value)
  return currentIdx.value - (start < 0 ? 0 : start)
})
const progress = computed(() => Math.round(((phaseLocalIdx.value + 1) / currentPhaseMeta.value.questionsCount) * 100))

const typeBadgeText = computed(() => {
  const t = currentQ.value?.type
  if (t === 'interest') return 'ميول واهتمامات'
  if (t === 'aptitude') return 'قدرات وكفاءات'
  return 'نمط الشخصية'
})

function startAssessment() {
  currentPhase.value = 1
  currentScreen.value = 'phaseIntro'
}

function startPhase() {
  currentScreen.value = 'questions'
}

function prevQuestion() {
  if (currentIdx.value > 0) {
    currentIdx.value--
    const lastQId = history.value.pop()
    if (lastQId) delete answers.value[lastQId]
    
    const prevQ = riasecQuestions[currentIdx.value]
    if (prevQ && prevQ.phase < currentPhase.value) {
      currentPhase.value = prevQ.phase
    }
  }
}

function answer(val) {
  const q = currentQ.value
  answers.value[q.id] = val
  history.value.push(q.id)

  const next = riasecQuestions[currentIdx.value + 1]
  if (!next) {
    submitAssessment(null) 
  } else if (next.phase > currentPhase.value) {
    currentPhase.value = next.phase
    currentIdx.value++
    currentScreen.value = 'phaseIntro'
  } else {
    currentIdx.value++
  }
}

async function submitAssessment(tiebreakChoice = null) {
  currentScreen.value = 'loading'
  loadingStep.value = -1
  let step = 0
  
  if (loadingTimer) clearInterval(loadingTimer)
  loadingTimer = setInterval(() => {
    loadingStep.value = step++
  }, 600)

  try {
    const response = await axios.post(`${API_URL}/api/assessment/score`, {
      answers: answers.value,
      tiebreak_choice: tiebreakChoice
    })
    
    clearInterval(loadingTimer)
    const result = response.data

    if (result.needs_tiebreak && !tiebreakChoice) {
      tieBreakerData.value = result.tiebreak
      currentScreen.value = 'tieBreaker'
    } else {
      localStorage.setItem('assessmentResult', JSON.stringify(result))
      router.push('/assessment-results')
    }
  } catch (error) {
    clearInterval(loadingTimer)
    console.error("Error evaluating assessment:", error)
    alert("حدث خطأ أثناء تحليل البيانات. يرجى التأكد من اتصالك بالإنترنت والمحاولة مجدداً.")
    currentScreen.value = 'questions' 
  }
}

onUnmounted(() => { 
  if (loadingTimer) clearInterval(loadingTimer) 
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
.font-sans { font-family: 'Tajawal', sans-serif; }

.screen-enter-active, .screen-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.screen-enter-from { opacity: 0; transform: translateY(15px) scale(0.98); }
.screen-leave-to { opacity: 0; transform: translateY(-15px) scale(1.02); }

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease-out;
}
.fade-slide-enter-from { opacity: 0; transform: translateX(-20px); }
.fade-slide-leave-to { opacity: 0; transform: translateX(20px); }

@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spinSlow 2.5s linear infinite;
}

@keyframes floatAvatar {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
.animate-float {
  animation: floatAvatar 5s ease-in-out infinite;
}
</style>