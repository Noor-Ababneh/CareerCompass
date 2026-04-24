<template>
  <div
    class="min-h-screen flex items-center justify-center p-4"
    dir="rtl"
    style="background:#F8FAFC; font-family:'Segoe UI',Tahoma,sans-serif"
  >
    <div
      class="w-full relative z-10 transition-all duration-700"
      :class="currentScreen === 'intro' ? 'max-w-3xl' : 'max-w-xl'"
    >
      <!-- card -->
      <div
        class="rounded-[2rem] border overflow-hidden relative shadow-lg"
        style="background:#FFFFFF; border-color:#E2E8F0; box-shadow:0 4px 24px rgba(99,126,186,0.10)"
      >

        <!-- progress bar (questions only) -->
        <div v-if="currentScreen === 'questions'" class="absolute top-0 left-0 w-full h-1.5" style="background:#EEF2FF">
          <div
            class="h-full rounded-r-full transition-all duration-700"
            :class="phaseProgressClass"
            :style="{ width: progress + '%' }"
          />
        </div>

        <transition name="screen" mode="out-in">

          <!-- ══ INTRO ══ -->
          <div v-if="currentScreen === 'intro'" key="intro" class="p-8 md:p-12 text-center">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6" style="background:#EEF2FF">
              🎓
            </div>
            <h1 class="text-2xl md:text-3xl font-black mb-3 leading-tight" style="color:#1E293B">
              مقياس الميول والقدرات الأكاديمية
            </h1>
            <p class="text-sm leading-relaxed mb-2 max-w-lg mx-auto" style="color:#64748B">
              أداة تشخيصية علمية تعتمد على ثلاثة مصادر بحثية معتمدة دولياً
              لتحديد الحقل الأكاديمي والتخصصات الأنسب لك.
            </p>
            <p class="text-xs mb-8 font-medium" style="color:#94A3B8">
              Holland (1997) · Gardner (1983) · Costa & McCrae (1992)
            </p>

            <!-- phase cards -->
            <div class="grid grid-cols-3 gap-3 mb-8">
              <div
                v-for="p in phasesMeta" :key="p.phase"
                class="rounded-2xl border p-4 text-right cursor-default transition-all duration-200 hover:shadow-sm"
                :class="phaseCardClass(p.color)"
              >
                <div class="text-2xl mb-2">{{ p.icon }}</div>
                <div class="font-bold text-xs mb-1" :class="phaseTextClass(p.color)">{{ p.title }}</div>
                <div class="text-xs opacity-60" :class="phaseTextClass(p.color)">{{ p.questionsCount }} سؤالاً</div>
                <div class="text-xs opacity-40 mt-1" :class="phaseTextClass(p.color)">{{ p.weight }}</div>
              </div>
            </div>

            <!-- stats -->
            <div class="flex flex-wrap justify-center gap-5 text-xs mb-8 border-t pt-6" style="color:#94A3B8; border-color:#F1F5F9">
              <span>⏱ نحو 5 دقائق</span>
              <span>📊 45 سؤالاً محكَّماً</span>
              <span>🎓 وفق تخصصات الجامعات الأردنية</span>
              <span>🔬 خوارزمية ترجيحية هجينة</span>
            </div>

            <button
              @click="startAssessment"
              class="px-10 py-3.5 text-white font-black rounded-2xl shadow-md hover:-translate-y-0.5 transition-all duration-300 text-base"
              style="background:linear-gradient(135deg,#6366F1,#818CF8)"
            >
              بدء المقياس
            </button>
          </div>

          <!-- ══ PHASE INTRO ══ -->
          <div v-else-if="currentScreen === 'phaseIntro'" key="phaseIntro" class="p-8 text-center">

            <!-- stepper dots -->
            <div class="flex justify-center gap-3 mb-8">
              <div v-for="p in phasesMeta" :key="p.phase" class="flex items-center gap-2">
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-500 border-2"
                  :class="p.phase < currentPhase
                    ? 'border-transparent text-white'
                    : p.phase === currentPhase
                      ? 'border-indigo-400 text-indigo-700 scale-110 shadow-md'
                      : 'border-slate-200 text-slate-300'"
                  :style="p.phase < currentPhase ? 'background:#6366F1;color:white' : p.phase === currentPhase ? 'background:#EEF2FF' : 'background:#F8FAFC'"
                >
                  {{ p.phase < currentPhase ? '✓' : p.phase }}
                </div>
                <div
                  v-if="p.phase < phasesMeta.length"
                  class="w-10 h-0.5 rounded-full transition-all duration-500"
                  :style="p.phase < currentPhase ? 'background:#6366F1' : 'background:#E2E8F0'"
                />
              </div>
            </div>

            <!-- encouragement badge from previous phase -->
            <transition name="slide-up">
              <div
                v-if="currentPhase > 1"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5 border"
                style="background:#F0FDF4; border-color:#BBF7D0; color:#15803D"
              >
                ✅ {{ prevPhaseMeta?.completedMsg }}
              </div>
            </transition>

            <!-- phase badge -->
            <div
              class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border"
              :class="phaseBadgeClass"
            >
              <span>{{ currentPhaseMeta.icon }}</span>
              <span>المرحلة {{ currentPhase }} من {{ phasesMeta.length }}</span>
            </div>

            <h2 class="text-xl md:text-2xl font-black mb-1" style="color:#1E293B">{{ currentPhaseMeta.title }}</h2>
            <p class="text-sm mb-6" style="color:#64748B">{{ currentPhaseMeta.subtitle }}</p>

            <!-- ── INTERACTIVE PROGRESS CHART ── -->
            <div class="rounded-2xl border p-5 mb-5 text-right" style="background:#F8FAFC; border-color:#E2E8F0">

              <!-- overall progress bar -->
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-semibold" style="color:#475569">نسبة الإنجاز الكلية</span>
                <span class="text-xs font-black" style="color:#6366F1">{{ overallProgress }}%</span>
              </div>
              <div class="h-3 rounded-full overflow-hidden mb-4" style="background:#E2E8F0">
                <div
                  class="h-full rounded-full transition-all duration-700"
                  style="background:linear-gradient(90deg,#6366F1,#818CF8)"
                  :style="{ width: overallProgress + '%' }"
                />
              </div>

              <!-- per-phase mini bars -->
              <div class="space-y-2">
                <div v-for="p in phasesMeta" :key="p.phase" class="flex items-center gap-3">
                  <span class="text-base w-6 flex-shrink-0">{{ p.icon }}</span>
                  <div class="flex-1 h-2 rounded-full overflow-hidden" style="background:#E2E8F0">
                    <div
                      class="h-full rounded-full transition-all duration-700"
                      :class="phaseBarClass(p.color, p.phase)"
                      :style="{ width: phaseCompletionPct(p.phase) + '%' }"
                    />
                  </div>
                  <span class="text-xs font-semibold w-10 text-left flex-shrink-0" :class="phaseTextClass(p.color)">
                    {{ phaseCompletionPct(p.phase) }}%
                  </span>
                </div>
              </div>

              <!-- remaining indicator -->
              <div class="mt-4 pt-3 border-t flex justify-between items-center" style="border-color:#E2E8F0">
                <span class="text-xs" style="color:#94A3B8">الأسئلة المتبقية</span>
                <span class="text-xs font-black" style="color:#475569">
                  {{ riasecQuestions.length - totalAnswered }} / {{ riasecQuestions.length }}
                </span>
              </div>
            </div>

            <!-- hint card -->
            <div class="rounded-2xl border p-4 mb-5 text-right text-sm leading-relaxed" style="background:#FFFBEB; border-color:#FDE68A; color:#92400E">
              <span class="font-bold">💡 تعليمات هذه المرحلة: </span>{{ phaseHint }}
              <div class="mt-1 text-xs" style="color:#B45309">{{ currentPhaseMeta.source }}</div>
            </div>

            <!-- encouragement message based on prev phase -->
            <div
              v-if="currentPhase > 1"
              class="rounded-2xl border p-4 mb-5 text-right text-sm leading-relaxed"
              style="background:#F0F9FF; border-color:#BAE6FD; color:#0C4A6E"
            >
              📊 {{ currentPhaseMeta ? phasesMeta[currentPhase - 2]?.encouragement : '' }}
            </div>

            <button
              @click="startPhase"
              class="px-10 py-3.5 font-black text-white rounded-2xl hover:-translate-y-0.5 transition-all text-sm shadow-sm"
              :class="phaseStartBtnClass"
            >
              {{ currentPhase === 1 ? 'بدء المرحلة الأولى' : `بدء المرحلة ${currentPhase}` }}
            </button>
          </div>

          <!-- ══ QUESTIONS ══ -->
          <div v-else-if="currentScreen === 'questions'" key="questions">
            <div class="p-6 md:p-10 text-center">

              <!-- back -->
              <div class="absolute top-5 left-5 z-10">
                <button
                  v-if="canGoBack"
                  @click="prevQuestion"
                  class="text-sm flex items-center gap-1 px-3 py-2 rounded-xl transition-all font-medium"
                  style="color:#94A3B8"
                  @mouseover="$event.target.style.color='#6366F1'"
                  @mouseout="$event.target.style.color='#94A3B8'"
                >
                  ← السابق
                </button>
              </div>

              <!-- phase + counter badge -->
              <div class="absolute top-5 right-5 z-10">
                <span class="text-xs font-bold px-3 py-1.5 rounded-full border" :class="phaseBadgeClass">
                  {{ currentPhaseMeta.icon }} {{ phaseLocalIdx + 1 }} / {{ currentPhaseMeta.questionsCount }}
                </span>
              </div>

              <transition name="q-slide" mode="out-in">
                <div :key="currentIdx" class="mt-10">

                  <!-- question type badge -->
                  <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-5 border" :class="typeBadgeClass">
                    {{ typeBadgeIcon }} {{ typeBadgeText }}
                  </div>

                  <!-- question -->
                  <h2 class="text-base md:text-lg font-bold leading-relaxed mb-7 px-2 min-h-[72px] flex items-center justify-center" style="color:#1E293B">
                    {{ currentQ.text_ar }}
                  </h2>

                  <!-- options -->
                  <div class="space-y-2.5">
                    <button
                      v-for="opt in OPTIONS"
                      :key="opt.v"
                      @click="answer(opt.v)"
                      class="w-full p-3.5 rounded-2xl border text-right flex items-center justify-between group transition-all duration-200 hover:-translate-y-0.5"
                      style="background:#F8FAFC; border-color:#E2E8F0; color:#475569"
                      @mouseover="e => { e.currentTarget.style.background='#EEF2FF'; e.currentTarget.style.borderColor='#A5B4FC'; e.currentTarget.style.color='#4338CA' }"
                      @mouseout="e => { e.currentTarget.style.background='#F8FAFC'; e.currentTarget.style.borderColor='#E2E8F0'; e.currentTarget.style.color='#475569' }"
                    >
                      <span class="font-semibold text-sm">{{ opt.l }}</span>
                      <span class="text-lg">{{ opt.e }}</span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <!-- ══ TIE-BREAKER ══ -->
          <div v-else-if="currentScreen === 'tieBreaker'" key="tieBreaker">
            <div class="p-8 text-center">
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5" style="background:#FFF7ED; color:#EA580C">
                🎯
              </div>
              <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 border" style="background:#FFF7ED; border-color:#FDBA74; color:#C2410C">
                سؤال تحديد المسار
              </div>
              <h2 class="text-base md:text-lg font-bold mb-2 leading-relaxed px-2" style="color:#1E293B">
                {{ tieBreakerData.question }}
              </h2>
              <p class="text-xs mb-6" style="color:#94A3B8">
                نتائجك متقاربة — يُرجى اختيار السيناريو الأقرب إلى ميولك الفعلية
              </p>
              <div class="space-y-2.5">
                <button
                  v-for="opt in tieBreakerData.options"
                  :key="opt.value"
                  @click="handleTieBreaker(opt)"
                  class="w-full p-4 rounded-2xl border text-right transition-all duration-200 hover:-translate-y-0.5"
                  style="background:#F8FAFC; border-color:#E2E8F0"
                  @mouseover="e => { e.currentTarget.style.background='#FFF7ED'; e.currentTarget.style.borderColor='#FDBA74' }"
                  @mouseout="e => { e.currentTarget.style.background='#F8FAFC'; e.currentTarget.style.borderColor='#E2E8F0' }"
                >
                  <p class="font-semibold text-sm leading-relaxed mb-1" style="color:#1E293B">{{ opt.text }}</p>
                  <p class="text-xs" style="color:#94A3B8">→ {{ opt.field }}</p>
                </button>
              </div>
            </div>
          </div>

          <!-- ══ LOADING ══ -->
          <div v-else-if="currentScreen === 'loading'" key="loading">
            <div class="p-14 text-center">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 animate-spin-slow" style="background:#EEF2FF">
                🔬
              </div>
              <h2 class="text-xl font-black mb-2" style="color:#1E293B">جارٍ تحليل نتائجك...</h2>
              <p class="text-sm mb-8" style="color:#64748B">يُطبَّق النموذج الترجيحي الهجين على {{ riasecQuestions.length }} إجابة</p>
              <div class="space-y-3 max-w-xs mx-auto text-right">
                <div
                  v-for="(s, i) in LOADING_STEPS" :key="i"
                  class="flex items-center gap-3 text-sm transition-all duration-500 px-4 py-2.5 rounded-xl"
                  :style="loadingStep >= i
                    ? 'background:#EEF2FF; color:#4338CA; border:1px solid #C7D2FE'
                    : 'color:#CBD5E1'"
                >
                  <span class="flex-shrink-0">{{ loadingStep > i ? '✅' : loadingStep === i ? '⏳' : '○' }}</span>
                  <span :class="loadingStep >= i ? 'font-semibold' : ''">{{ s }}</span>
                </div>
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
import { riasecQuestions, phasesMeta, tieBreakerQuestions } from '@/data/riasecQuestions'

const router = useRouter()

// ── state ─────────────────────────────────────────────────────
const currentScreen  = ref('intro')
const currentIdx     = ref(0)
const currentPhase   = ref(1)
const scores         = ref({ R:0, I:0, A:0, S:0, E:0, C:0 })
const history        = ref([])
const loadingStep    = ref(-1)
const tieBreakerData = ref(null)
let   loadingTimer   = null

// ── constants ─────────────────────────────────────────────────
const WEIGHTS = { interest:1.0, aptitude:1.5, style:1.2 }
const TIE_THRESHOLD = 8 // فارق < 8% → سؤال حاسم

const OPTIONS = [
  { l:'ينطبق عليّ تماماً',   v:5, e:'🤩' },
  { l:'ينطبق عليّ بدرجة كبيرة', v:4, e:'😊' },
  { l:'ينطبق عليّ أحياناً',  v:3, e:'🤔' },
  { l:'لا ينطبق عليّ',       v:2, e:'😐' },
  { l:'لا ينطبق عليّ إطلاقاً', v:1, e:'🙅' },
]

const LOADING_STEPS = [
  'تحليل أنماط الميول والاهتمامات...',
  'تقييم القدرات وتطبيق المعاملات الترجيحية...',
  'مطابقة نمط الشخصية مع الحقول الأكاديمية الأردنية...',
  'احتساب نسب التطابق مع التخصصات الجامعية...',
]

const PHASE_HINTS = {
  1: 'أجب بصدق عمّا تميل إليه طبيعياً؛ لا عمّا تعتقد أنه الإجابة "الصحيحة". الصدق يُنتج نتيجةً أدق.',
  2: 'تقيس هذه المرحلة قدراتك الفعلية لا تطلعاتك. فكّر في المواقف التي تجيد التعامل معها بصورة طبيعية.',
  3: 'تسعة أسئلة أخيرة تحدد بيئة العمل الأنسب لشخصيتك. بعدها ستظهر توصياتك الأكاديمية.',
}

// ── computed ──────────────────────────────────────────────────
const currentQ         = computed(() => riasecQuestions[currentIdx.value])
const currentPhaseMeta = computed(() => phasesMeta.find(p => p.phase === currentPhase.value) ?? phasesMeta[0])
const prevPhaseMeta    = computed(() => phasesMeta.find(p => p.phase === currentPhase.value - 1))
const phaseHint        = computed(() => PHASE_HINTS[currentPhase.value] ?? '')
const canGoBack        = computed(() => currentIdx.value > 0)
const totalAnswered    = computed(() => currentIdx.value)

const phaseLocalIdx = computed(() => {
  const start = riasecQuestions.findIndex(q => q.phase === currentPhase.value)
  return currentIdx.value - (start < 0 ? 0 : start)
})

const progress = computed(() =>
  Math.round(((phaseLocalIdx.value + 1) / currentPhaseMeta.value.questionsCount) * 100)
)

const overallProgress = computed(() =>
  Math.round((totalAnswered.value / riasecQuestions.length) * 100)
)

function phaseCompletionPct(phase) {
  const phaseQs = riasecQuestions.filter(q => q.phase === phase)
  const answered = Math.min(
    Math.max(totalAnswered.value - riasecQuestions.findIndex(q => q.phase === phase), 0),
    phaseQs.length
  )
  return Math.round((answered / phaseQs.length) * 100)
}

// ── color helpers ──────────────────────────────────────────────
function phaseCardClass(c) {
  return { blue:'border-blue-100 bg-blue-50/60', purple:'border-purple-100 bg-purple-50/60', teal:'border-teal-100 bg-teal-50/60' }[c] ?? 'border-slate-100 bg-slate-50'
}
function phaseTextClass(c) {
  return { blue:'text-blue-800', purple:'text-purple-800', teal:'text-teal-800' }[c] ?? 'text-slate-700'
}
function phaseBarClass(c, phase) {
  if (phase > currentPhase.value) return 'bg-slate-200'
  return { blue:'bg-blue-400', purple:'bg-purple-400', teal:'bg-teal-400' }[c] ?? 'bg-indigo-400'
}

const phaseProgressClass = computed(() => ({
  blue:   'bg-gradient-to-r from-blue-400 to-blue-500',
  purple: 'bg-gradient-to-r from-purple-400 to-purple-500',
  teal:   'bg-gradient-to-r from-teal-400 to-teal-500',
}[currentPhaseMeta.value.color] ?? 'bg-indigo-400'))

const phaseBadgeClass = computed(() => ({
  blue:   'bg-blue-50 border-blue-200 text-blue-700',
  purple: 'bg-purple-50 border-purple-200 text-purple-700',
  teal:   'bg-teal-50 border-teal-200 text-teal-700',
}[currentPhaseMeta.value.color] ?? 'bg-slate-50 border-slate-200 text-slate-600'))

const phaseStartBtnClass = computed(() => ({
  blue:   'bg-blue-500 hover:bg-blue-600',
  purple: 'bg-purple-500 hover:bg-purple-600',
  teal:   'bg-teal-500 hover:bg-teal-600',
}[currentPhaseMeta.value.color] ?? 'bg-indigo-500'))

const typeBadgeClass = computed(() => {
  const t = currentQ.value?.type
  if (t === 'interest') return 'bg-blue-50 border-blue-200 text-blue-700'
  if (t === 'aptitude') return 'bg-purple-50 border-purple-200 text-purple-700'
  return 'bg-teal-50 border-teal-200 text-teal-700'
})
const typeBadgeIcon = computed(() => {
  const t = currentQ.value?.type
  if (t === 'interest') return '❤️'
  if (t === 'aptitude') return '💡'
  return '🧭'
})
const typeBadgeText = computed(() => {
  const t = currentQ.value?.type
  if (t === 'interest') return 'ميول واهتمامات'
  if (t === 'aptitude') return 'قدرات وكفاءات'
  return 'نمط الشخصية'
})

// ── actions ───────────────────────────────────────────────────
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

// ── algorithm ─────────────────────────────────────────────────
function evaluateResults() {
  const sorted     = Object.entries(scores.value).sort((a,b) => b[1]-a[1])
  const top        = sorted[0]
  const runner     = sorted[1]
  const maxPossible = riasecQuestions.reduce((s,q) => s + 5*(WEIGHTS[q.type]??1.0), 0)
  const gapPct     = ((top[1] - runner[1]) / maxPossible) * 100

  if (gapPct < TIE_THRESHOLD && tieBreakerQuestions[top[0]]) {
    tieBreakerData.value = { ...tieBreakerQuestions[top[0]], _winnerCode: top[0] }
    currentScreen.value = 'tieBreaker'
  } else {
    goToResults(top[0], computePath(sorted, scores.value), sorted)
  }
}

function handleTieBreaker(opt) {
  const sorted = Object.entries(scores.value).sort((a,b) => b[1]-a[1])
  goToResults(tieBreakerData.value._winnerCode, opt.value, sorted)
}

function computePath(sorted, raw) {
  const top = sorted[0][0]
  const sec = sorted[1][0]
  if (top === 'S') return raw['R'] >= raw['I'] ? 'Health' : 'Humanities'
  const map = {
    RI:'STEM', IR:'STEM', IA:'Humanities', IS:'Health', IE:'Business', IC:'Business',
    RA:'STEM', RS:'STEM', RE:'STEM',        RC:'STEM',
    AI:'Humanities', AS:'Humanities', AE:'Humanities', AC:'Humanities',
    SI:'Health',    SR:'Health',     SA:'Humanities',  SE:'Humanities',  SC:'Humanities',
    EI:'Business',  EA:'Humanities', ES:'Business',    EC:'Business',
    CI:'Business',  CA:'Humanities', CS:'Humanities',  CE:'Business',
  }
  return map[top+sec] ?? 'Business'
}

function goToResults(winnerCode, field, sorted) {
  currentScreen.value = 'loading'
  loadingStep.value = -1
  let step = 0
  loadingTimer = setInterval(() => { loadingStep.value = step++ }, 480)
  const riasecCode = sorted.slice(0,3).map(e=>e[0]).join('')
  const rawScores  = { ...scores.value }
  setTimeout(() => {
    clearInterval(loadingTimer)
    router.push({ path:'/results', query:{ field, code:winnerCode, riasecCode, scores:JSON.stringify(rawScores) } })
  }, 2400)
}

onUnmounted(() => { if (loadingTimer) clearInterval(loadingTimer) })
</script>

<style scoped>
.screen-enter-active, .screen-leave-active { transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
.screen-enter-from { opacity:0; transform:translateY(8px) scale(0.98); }
.screen-leave-to   { opacity:0; transform:translateY(-6px) scale(1.01); }
.q-slide-enter-active, .q-slide-leave-active { transition: all 0.3s ease; }
.q-slide-enter-from { opacity:0; transform:translateX(-16px); }
.q-slide-leave-to   { opacity:0; transform:translateX(16px); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity:0; }
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.4s ease; }
.slide-up-enter-from { opacity:0; transform:translateY(8px); }
.slide-up-leave-to   { opacity:0; transform:translateY(-4px); }
@keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
.animate-spin-slow { animation: spinSlow 3s linear infinite; }
</style>