<template>
  <div class="min-h-screen flex items-center justify-center p-4 md:p-8 bg-[#FDFCF9] font-sans selection:bg-amber-500 selection:text-white relative overflow-hidden" dir="rtl">
    
    <div class="absolute inset-0 z-0 opacity-[0.04]" style="background-image: radial-gradient(#d97706 1px, transparent 1px); background-size: 32px 32px;"></div>
    <div class="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-amber-400/10 blur-[80px] animate-pulse z-0"></div>
    <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-yellow-500/10 blur-[100px] animate-pulse z-0" style="animation-delay: 2s;"></div>

    <div class="w-full relative z-10 transition-all duration-700" :class="currentScreen === 'intro' ? 'max-w-3xl' : 'max-w-2xl'">
      
      <!-- Floating Avatar -->
      <div v-if="currentScreen === 'phaseIntro' && (currentPhase === 2 || currentPhase === 3) && userGender" class="fixed left-4 md:left-8 lg:left-12 xl:left-24 top-1/2 -translate-y-1/2 z-20 hidden lg:block animate-float pointer-events-none">
        <div class="border-[3px] border-amber-300 rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/20 bg-white p-2 w-[336px]">
          <img :src="avatarSrc" class="w-full h-auto rounded-2xl" alt="Student Avatar" />
        </div>
      </div>

      <div class="bg-white/85 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(245,158,11,0.15)] overflow-hidden relative min-h-[450px]">
        
        <div v-if="currentScreen === 'questions'" class="absolute top-0 left-0 w-full h-1.5 bg-slate-100 z-20">
          <div class="h-full rounded-l-full transition-all duration-700 bg-gradient-to-r from-amber-400 to-yellow-500" :style="{ width: progress + '%' }"></div>
        </div>

        <transition name="screen" mode="out-in">
          
          <div v-if="currentScreen === 'intro'" key="intro" class="p-8 md:p-12 text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-amber-100 to-yellow-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-amber-200/50">
              <span class="text-4xl">🧭</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-black mb-4 leading-tight text-slate-800">
              مقياس الميول والقدرات الأكاديمية
            </h1>
            <p class="text-base text-slate-600 mb-2 max-w-lg mx-auto font-medium">
              أداة تشخيصية علمية تعتمد على ثلاثة مصادر بحثية معتمدة دولياً لتحديد الحقل الأكاديمي والتخصصات الأنسب لك.
            </p>
            <p class="text-xs mb-10 font-bold text-amber-600/80">
              Holland (1997) • Gardner (1983) • Costa & McCrae (1992)
            </p>

            <div class="grid grid-cols-3 gap-4 mb-10">
              <div v-for="p in phasesMeta" :key="p.phase" class="rounded-2xl border p-4 text-center bg-white/50 border-amber-100 shadow-sm">
                <div class="text-2xl mb-2">{{ p.icon }}</div>
                <div class="font-bold text-sm text-slate-700 mb-1">{{ p.title }}</div>
                <div class="text-xs opacity-70 text-slate-500">{{ p.questionsCount }} سؤالاً</div>
              </div>
            </div>

            <button @click="startAssessment" class="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-2xl font-black text-lg transition-all shadow-lg hover:-translate-y-1">
              البدء بالمقياس الآن
            </button>
          </div>

          <div v-else-if="currentScreen === 'phaseIntro'" key="phaseIntro" class="p-8 md:p-12 text-center flex flex-col items-center justify-center h-full">
            
            <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-6 border bg-amber-50 border-amber-200 text-amber-700">
              <span>{{ currentPhaseMeta.icon }}</span>
              <span>المرحلة {{ currentPhase }} من {{ phasesMeta.length }}</span>
            </div>
            
            <h2 class="text-2xl md:text-3xl font-black mb-3 text-slate-800">{{ currentPhaseMeta.title }}</h2>
            <p class="text-base mb-8 text-slate-600">{{ currentPhaseMeta.subtitle }}</p>

            <div class="rounded-2xl border p-5 mb-8 text-center text-sm leading-relaxed bg-amber-50/50 border-amber-200/50 text-amber-900 max-w-md mx-auto">
              <span class="font-bold text-amber-700 block mb-2">💡 تعليمات هذه المرحلة:</span>
              {{ phaseHint }}
              <div class="mt-2 text-xs text-amber-600/70 font-bold uppercase tracking-wide">
                المصدر العلمي: {{ currentPhaseMeta.source }}
              </div>
            </div>

            <button @click="startPhase" class="px-10 py-3.5 font-black text-white rounded-2xl hover:-translate-y-0.5 transition-all text-base shadow-md bg-amber-500 hover:bg-amber-600">
              {{ currentPhase === 1 ? 'بدء المرحلة الأولى' : 'متابعة التقييم' }}
            </button>
          </div>

          <div v-else-if="currentScreen === 'questions'" key="questions" class="p-6 md:p-10">
            <div class="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border bg-amber-50 border-amber-200 text-amber-700">
                <span>{{ currentPhaseMeta.icon }}</span>
                <span>{{ typeBadgeText }}</span>
              </div>
              <div class="flex items-center gap-4">
                <span class="text-xs font-black text-slate-400">{{ phaseLocalIdx + 1 }} / {{ currentPhaseMeta.questionsCount }}</span>
                <button v-if="canGoBack" @click="prevQuestion" class="text-xs font-bold text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-1">
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
                    class="w-full p-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 text-right flex items-center justify-between group transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-50/30"
                  >
                    <div class="flex items-center gap-3">
                      <span class="text-2xl grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">{{ opt.emoji }}</span>
                      <span class="font-bold text-slate-700 group-hover:text-amber-900 text-base md:text-lg transition-colors">{{ opt.l }}</span>
                    </div>
                    <div class="relative w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-amber-500 flex items-center justify-center transition-colors">
                      <div class="w-2 h-2 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </button>
                </div>

              </div>
            </transition>
          </div>

          <div v-else-if="currentScreen === 'tieBreaker'" key="tieBreaker" class="p-8 md:p-12">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 bg-orange-50 text-orange-500 border border-orange-100">
              ⚖️
            </div>
            <div class="text-center mb-8">
              <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border bg-orange-50 border-orange-200 text-orange-700">
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
                @click="handleTieBreaker(opt)"
                class="w-full p-5 rounded-2xl border-2 text-right transition-all duration-200 hover:-translate-y-1 bg-slate-50/50 border-slate-100 hover:border-orange-400 hover:bg-orange-50/30 group"
              >
                <p class="font-bold text-base md:text-lg leading-relaxed mb-1 text-slate-700 group-hover:text-orange-900">{{ opt.text }}</p>
                <p class="text-xs text-slate-400 font-bold">← يميل نحو: {{ opt.field }}</p>
              </button>
            </div>
          </div>

          <div v-else-if="currentScreen === 'loading'" key="loading" class="p-16 text-center flex flex-col items-center justify-center h-full">
            <div class="relative w-24 h-24 mx-auto mb-8">
              <div class="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
              <div class="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin-slow"></div>
              <div class="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">⚙️</div>
            </div>
            <h2 class="text-2xl font-black mb-3 text-slate-800">جاري تحليل النتائج...</h2>
            
            <div class="space-y-3 max-w-sm mx-auto text-right mt-8">
              <div v-for="(s, i) in LOADING_STEPS" :key="i" class="flex items-center gap-3 text-sm transition-all duration-500 px-4 py-3 rounded-xl"
                :class="loadingStep >= i ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'text-slate-400 border border-transparent'">
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
import { useAuthStore } from '@/stores/auth'
// استدعاء بياناتك الأصلية - لا تغيري فيها شيء!
import { riasecQuestions, phasesMeta, tieBreakerQuestions } from '@/data/riasecQuestions'
import boyGif from '@/assets/avatars/boy2.gif'
import girlGif from '@/assets/avatars/girl2.gif'

const router = useRouter()
const authStore = useAuthStore()

const userGender = computed(() => authStore.user?.gender)
const avatarSrc = computed(() => {
  return userGender.value === 'female' ? girlGif : boyGif
})

// State (كما هي بخوارزميتك)
const currentScreen = ref('intro')
const currentIdx = ref(0)
const currentPhase = ref(1)
const scores = ref({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 })
const history = ref([])
const tieBreakerData = ref(null)
const loadingStep = ref(-1)
let loadingTimer = null

// الثوابت والأوزان (كما هي بملفك الأصلي)
const WEIGHTS = { interest: 1.0, aptitude: 1.5, style: 1.2 }
const TIE_THRESHOLD = 8 // إذا الفارق < 8%

// الخيارات الجديدة (موافق بشدة... الخ)
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

// Computed Properties
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

// Actions
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
    const last = history.value.pop()
    if (last) scores.value[last.d] -= last.w
    // Check if we went back a phase
    const prevQ = riasecQuestions[currentIdx.value]
    if (prevQ && prevQ.phase < currentPhase.value) {
      currentPhase.value = prevQ.phase
    }
  }
}

function answer(val) {
  const q = currentQ.value
  const w = (WEIGHTS[q.type] ?? 1.0) * val
  scores.value[q.dimension] += w
  history.value.push({ d: q.dimension, w })

  const next = riasecQuestions[currentIdx.value + 1]
  if (!next) {
    evaluateResults()
  } else if (next.phase > currentPhase.value) {
    currentPhase.value = next.phase
    currentIdx.value++
    currentScreen.value = 'phaseIntro'
  } else {
    currentIdx.value++
  }
}

// الخوارزمية الخاصة بك
function evaluateResults() {
  const sorted = Object.entries(scores.value).sort((a, b) => b[1] - a[1])
  const top = sorted[0]
  const runner = sorted[1]
  
  const maxPossible = riasecQuestions.reduce((s, q) => s + 5 * (WEIGHTS[q.type] ?? 1.0), 0)
  const gapPct = ((top[1] - runner[1]) / maxPossible) * 100

  // فحص سؤال التعادل
  if (gapPct < TIE_THRESHOLD && tieBreakerQuestions[top[0]]) {
    tieBreakerData.value = { ...tieBreakerQuestions[top[0]], winnerCode: top[0] }
    currentScreen.value = 'tieBreaker'
  } else {
    goToResults(top[0], computePath(sorted, scores.value), sorted)
  }
}

function handleTieBreaker(opt) {
  const sorted = Object.entries(scores.value).sort((a, b) => b[1] - a[1])
  goToResults(tieBreakerData.value.winnerCode, opt.value, sorted)
}

function computePath(sorted, raw) {
  const top = sorted[0][0]
  const sec = sorted[1][0]
  if (top === 'S') return raw['R'] >= raw['I'] ? 'Health' : 'Humanities'
  
  const map = {
    RI: 'Scientific', IR: 'Scientific', IA: 'Humanities', IS: 'Health',
    IE: 'Business', IC: 'Business', RA: 'Scientific', RS: 'Scientific',
    RE: 'Scientific', RC: 'Scientific', AI: 'Humanities', AS: 'Humanities',
    AE: 'Humanities', AC: 'Humanities', SI: 'Health', SA: 'Humanities',
    SC: 'Humanities', EI: 'Business', ES: 'Business', SR: 'Health',
    SE: 'Humanities', EA: 'Humanities', EC: 'Business', CI: 'Business',
    CA: 'Humanities', CE: 'Business', CS: 'Humanities'
  }
  return map[top + sec] ?? 'Business'
}

function goToResults(winnerCode, field, sorted) {
  currentScreen.value = 'loading'
  loadingStep.value = -1
  let step = 0
  
  loadingTimer = setInterval(() => {
    loadingStep.value = step++
  }, 600)

  const riasecCode = sorted.slice(0, 3).map(e => e[0]).join('')
  const rawScores = { ...scores.value }

  setTimeout(() => {
    clearInterval(loadingTimer)
    router.push({ 
      path: '/assessment-results', // <-- تم التعديل هنا ليتطابق مع الراوتر
      query: { 
        field, 
        code: winnerCode, 
        riasecCode, 
        scores: JSON.stringify(rawScores) 
      } 
    })
  }, 3000)
}

onUnmounted(() => { 
  if (loadingTimer) clearInterval(loadingTimer) 
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
.font-sans { font-family: 'Tajawal', sans-serif; }

/* حركة انتقال الشاشات */
.screen-enter-active, .screen-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.screen-enter-from { opacity: 0; transform: translateY(15px) scale(0.98); }
.screen-leave-to { opacity: 0; transform: translateY(-15px) scale(1.02); }

/* حركة انتقال الأسئلة (Fade & Slide) */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease-out;
}
.fade-slide-enter-from { opacity: 0; transform: translateX(-20px); }
.fade-slide-leave-to { opacity: 0; transform: translateX(20px); }

/* الأيقونة اللي بتلف ببطء */
@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spinSlow 2.5s linear infinite;
}

/* حركة طفو الأفاتار */
@keyframes floatAvatar {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}
.animate-float {
  animation: floatAvatar 4s ease-in-out infinite;
}
</style>