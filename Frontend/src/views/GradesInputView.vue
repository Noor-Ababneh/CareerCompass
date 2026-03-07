<template>
  <div class="min-h-screen font-body" dir="rtl" style="background: linear-gradient(135deg, #f0f4ff 0%, #faf5ff 40%, #f0fdf9 100%);">
    <!-- Soft background blobs -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30"
        style="background: radial-gradient(circle, #c7d2fe 0%, transparent 70%); transform: translate(30%, -30%);"></div>
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-20"
        style="background: radial-gradient(circle, #bbf7d0 0%, transparent 70%); transform: translate(-30%, 30%);"></div>
      <div class="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full opacity-15"
        style="background: radial-gradient(circle, #fde68a 0%, transparent 70%); transform: translate(-50%, -50%);"></div>
      <!-- Subtle grid -->
      <div class="absolute inset-0 opacity-[0.04]"
        style="background-image: linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>

    <div class="relative z-10 max-w-2xl mx-auto px-5 py-10 pb-24">
      <!-- Header -->
      <div class="mb-10 flex items-center justify-between">
        <button @click="$router.push('/dashboard')"
          class="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all duration-200 group font-display text-sm font-bold tracking-wide bg-white/70 backdrop-blur px-4 py-2 rounded-xl border border-indigo-100 shadow-sm hover:shadow-indigo-100 hover:border-indigo-200">
          <span class="group-hover:-translate-x-1 transition-transform duration-200 inline-block">←</span>
          الرئيسية
        </button>
        <div class="flex items-center gap-2 bg-white/60 backdrop-blur px-3 py-1.5 rounded-full border border-indigo-100 shadow-sm">
          <div class="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
          <span class="text-xs text-slate-500 font-bold tracking-widest uppercase">Jordan Academic Analyzer</span>
        </div>
      </div>

      <!-- Title Block -->
      <div class="mb-12 text-center">
        <div class="inline-flex items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-2xl px-5 py-2.5 mb-6 shadow-sm">
          <span class="text-indigo-500 text-lg">⚡</span>
          <span class="text-indigo-600 font-bold text-sm tracking-wide">تحليل ذكي للمسار الأكاديمي</span>
        </div>
        <h1 class="font-display text-4xl md:text-5xl font-black text-slate-800 mb-4 leading-tight tracking-tight">
          إدخال العلامات
        </h1>
        <p class="text-slate-500 text-base font-medium leading-relaxed max-w-md mx-auto">
          أدخل علاماتك بدقة وسيقوم النظام بتحليل وضعك الأكاديمي وبناء خطة مخصصة لك كطالب أردني.
        </p>
      </div>

      <!-- Step 1: Stage Selection -->
      <div class="mb-8 card-soft rounded-3xl p-6">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-7 h-7 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-xs font-black text-indigo-600">١</div>
          <h2 class="font-display font-bold text-slate-700 text-lg">المرحلة الدراسية</h2>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button
            @click="academicStage = 'junior'"
            :class="academicStage === 'junior'
              ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-indigo-100 shadow-md'
              : 'bg-white/50 border-slate-200 text-slate-500 hover:border-indigo-200 hover:text-slate-700'"
            class="p-5 rounded-2xl border transition-all duration-200 flex flex-col items-center gap-2.5 group">
            <span class="text-2xl group-hover:scale-110 transition-transform duration-200">🌱</span>
            <span class="font-bold text-sm">تأسيس</span>
            <span class="text-xs opacity-60">الصف 9 - 11</span>
          </button>
          <button
            @click="academicStage = 'senior'"
            :class="academicStage === 'senior'
              ? 'bg-violet-50 border-violet-300 text-violet-700 shadow-violet-100 shadow-md'
              : 'bg-white/50 border-slate-200 text-slate-500 hover:border-violet-200 hover:text-slate-700'"
            class="p-5 rounded-2xl border transition-all duration-200 flex flex-col items-center gap-2.5 group">
            <span class="text-2xl group-hover:scale-110 transition-transform duration-200">🎓</span>
            <span class="font-bold text-sm">توجيهي</span>
            <span class="text-xs opacity-60">الصف 12</span>
          </button>
        </div>
      </div>

      <!-- Step 2: Field Selection -->
      <div class="mb-8 card-soft rounded-3xl p-6">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-7 h-7 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-xs font-black text-indigo-600">٢</div>
          <h2 class="font-display font-bold text-slate-700 text-lg">الحقل الأكاديمي</h2>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="(opt, val) in fieldOptions" :key="val"
            @click="selectField(val)"
            :class="selectedField === val
              ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-md shadow-indigo-100'
              : 'bg-white/50 border-slate-200 text-slate-500 hover:border-indigo-200 hover:text-slate-700'"
            class="p-4 rounded-2xl border transition-all duration-200 flex items-center gap-3 text-right group">
            <span class="text-xl shrink-0">{{ opt.icon }}</span>
            <div class="text-right flex-1 min-w-0">
              <div class="font-bold text-sm leading-tight">{{ opt.label }}</div>
              <div class="text-[11px] opacity-50 mt-0.5 truncate">{{ opt.sub }}</div>
            </div>
          </button>
        </div>
      </div>

      <!-- Step 3: Grades Input -->
      <transition name="slide-up">
        <div v-if="selectedField" class="mb-8 card-soft rounded-3xl p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="w-7 h-7 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-xs font-black text-indigo-600">٣</div>
              <h2 class="font-display font-bold text-slate-700 text-lg">علامات المواد</h2>
            </div>
            <div class="text-xs text-slate-500 font-bold bg-white/70 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
              المعدل الحالي: <span :class="gpaColorClass" class="font-black mr-1">{{ liveGPA }}%</span>
            </div>
          </div>

          <!-- Overall progress bar -->
          <div class="mb-8 p-4 rounded-2xl bg-white/60 border border-slate-200 shadow-sm">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-bold text-slate-500">المعدل العام</span>
              <span class="text-xs font-bold" :class="gpaColorClass">{{ getGPALabel(liveGPA) }}</span>
            </div>
            <div class="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-500" :class="gpaBarColor" :style="{ width: liveGPA + '%' }"></div>
            </div>
            <div class="flex justify-between text-[10px] text-slate-400 mt-1.5 font-bold">
              <span>0</span><span>50</span><span>65</span><span>75</span><span>85</span><span>100</span>
            </div>
          </div>

          <div class="space-y-7">
            <div v-for="(label, key) in currentSubjects" :key="key" class="group">
              <div class="flex justify-between items-center mb-3">
                <div class="flex items-center gap-2">
                  <span class="text-base">{{ subjectIcons[key] || '📚' }}</span>
                  <label class="font-bold text-slate-700 text-sm">{{ label }}</label>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-bold text-slate-400 bg-white/70 px-2 py-0.5 rounded border border-slate-200">{{ getSubjectStatusLabel(grades[key]) }}</span>
                  <div :class="getScoreColorClass(grades[key])" class="px-3 py-1 rounded-xl font-mono font-black text-sm min-w-[52px] text-center border transition-all duration-200">
                    {{ grades[key] || 0 }}%
                  </div>
                </div>
              </div>

              <!-- Custom Slider -->
              <div class="relative">
                <input
                  type="range"
                  v-model.number="grades[key]"
                  min="0" max="100" step="1"
                  class="slider w-full h-2 rounded-full appearance-none cursor-pointer outline-none"
                  :style="sliderStyle(grades[key] || 0)"
                />
                <!-- Threshold markers -->
                <div class="absolute top-4 w-full flex pointer-events-none">
                  <div class="absolute text-[9px] text-red-400/70 font-bold" style="left: 50%">50</div>
                  <div class="absolute text-[9px] text-orange-400/70 font-bold" style="left: 65%">65</div>
                  <div class="absolute text-[9px] text-blue-400/70 font-bold" style="left: 75%">75</div>
                  <div class="absolute text-[9px] text-green-500/70 font-bold" style="left: 85%">85</div>
                </div>
              </div>
              <div class="flex justify-between text-[10px] font-bold text-slate-400 mt-5 px-0.5">
                <span class="text-red-400/70">راسب</span>
                <span class="text-orange-400/70">مقبول</span>
                <span class="text-yellow-500/70">جيد</span>
                <span class="text-blue-400/70">جيد جداً</span>
                <span class="text-green-500/70">امتياز</span>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Error -->
      <transition name="fade">
        <div v-if="errorMessage" class="mb-5 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-500 font-bold text-sm shadow-sm">
          <span class="text-xl">⚠️</span> {{ errorMessage }}
        </div>
      </transition>

      <!-- Submit Button -->
      <button
        @click="submit"
        :disabled="!selectedField"
        :class="selectedField
          ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-xl shadow-indigo-200 hover:-translate-y-0.5 hover:shadow-indigo-300'
          : 'bg-slate-100 text-slate-400 cursor-not-allowed'"
        class="w-full py-5 rounded-2xl font-display font-black text-lg tracking-wide transition-all duration-300 relative overflow-hidden group disabled:opacity-60">
        <span class="relative z-10 flex items-center justify-center gap-3">
          <span>{{ academicStage === 'junior' ? 'تحليل نقاط الضعف' : 'حساب المعدل والنتيجة' }}</span>
          <span class="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
        </span>
        <div v-if="selectedField" class="absolute inset-0 bg-gradient-to-l from-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
      <p class="text-center text-xs text-slate-400 mt-5 font-medium">خاص بالمنهج الأردني · القبول الموحد ٢٠٢٥</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const academicStage = ref('junior')
const selectedField = ref('')
const grades = ref({})
const errorMessage = ref('')

const fieldOptions = {
  Health:  { label: 'الطبي والصحي',        sub: 'طب · صيدلة · تمريض',          icon: '🏥' },
  Engineering: { label: 'الهندسي',         sub: 'مدني · معماري · ميكاترونيكس',  icon: '⚙️' },
  IT:      { label: 'تكنولوجيا المعلومات', sub: 'ذكاء اصطناعي · سيبراني · CS',  icon: '💻' },
  Business:{ label: 'الأعمال والإدارة',    sub: 'محاسبة · تسويق · مالية',        icon: '📈' },
  Law:     { label: 'القانون والشريعة',     sub: 'حقوق · شريعة إسلامية',         icon: '⚖️' },
  Languages:{ label: 'اللغات والإنسانيات', sub: 'إنجليزي · عربي · ترجمة',        icon: '🌐' },
}

const subjectIcons = {
  chem: '🧪', bio: '🧬', math: '📐', physics: '⚛️',
  eng_adv: '📘', math_adv: '🔢', math_biz: '💰',
  finance: '🏦', arabic_spec: '📖', islamic_spec: '🕌'
}

const curriculum = {
  Health:      { chem: 'الكيمياء',             bio: 'الأحياء',            eng_adv: 'إنجليزي متقدم' },
  Engineering: { math: 'الرياضيات',            physics: 'الفيزياء',       eng_adv: 'إنجليزي متقدم' },
  IT:          { math_adv: 'رياضيات متقدم',    eng_adv: 'إنجليزي متقدم' },
  Languages:   { eng_adv: 'إنجليزي متقدم',     arabic_spec: 'عربي تخصص' },
  Law:         { arabic_spec: 'عربي تخصص',     islamic_spec: 'تربية إسلامية تخصص', eng_adv: 'إنجليزي متقدم' },
  Business:    { finance: 'ثقافة مالية',        math_biz: 'رياضيات أعمال', eng_adv: 'إنجليزي متقدم' }
}

const currentSubjects = computed(() => selectedField.value ? curriculum[selectedField.value] : {})

const liveGPA = computed(() => {
  const scores = Object.values(grades.value).map(Number).filter(n => !isNaN(n) && n > 0)
  if (!scores.length) return 0
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
})

const gpaColorClass = computed(() => {
  const g = liveGPA.value
  if (g >= 85) return 'text-green-600'
  if (g >= 75) return 'text-blue-600'
  if (g >= 65) return 'text-yellow-600'
  if (g >= 50) return 'text-orange-500'
  return 'text-red-500'
})

const gpaBarColor = computed(() => {
  const g = liveGPA.value
  if (g >= 85) return 'bg-gradient-to-r from-emerald-400 to-green-500'
  if (g >= 75) return 'bg-gradient-to-r from-blue-400 to-blue-500'
  if (g >= 65) return 'bg-gradient-to-r from-yellow-400 to-yellow-500'
  if (g >= 50) return 'bg-gradient-to-r from-orange-400 to-orange-500'
  return 'bg-gradient-to-r from-red-500 to-red-600'
})

function getGPALabel(g) {
  if (g >= 85) return '🌟 امتياز'
  if (g >= 75) return 'جيد جداً'
  if (g >= 65) return 'جيد'
  if (g >= 50) return 'مقبول'
  if (g > 0)   return 'راسب'
  return '—'
}

function getSubjectStatusLabel(score) {
  if (!score && score !== 0) return '—'
  if (score >= 85) return 'امتياز'
  if (score >= 75) return 'جيد جداً'
  if (score >= 65) return 'جيد'
  if (score >= 50) return 'مقبول'
  return 'راسب'
}

function getScoreColorClass(score) {
  if (!score && score !== 0) return 'bg-slate-50 border-slate-200 text-slate-400'
  if (score >= 85) return 'bg-green-50 border-green-300 text-green-600'
  if (score >= 75) return 'bg-blue-50 border-blue-300 text-blue-600'
  if (score >= 65) return 'bg-yellow-50 border-yellow-300 text-yellow-600'
  if (score >= 50) return 'bg-orange-50 border-orange-300 text-orange-600'
  return 'bg-red-50 border-red-300 text-red-500'
}

function sliderStyle(value) {
  let color
  if (value >= 85)      color = '#22c55e'
  else if (value >= 75) color = '#3b82f6'
  else if (value >= 65) color = '#eab308'
  else if (value >= 50) color = '#f97316'
  else                  color = '#ef4444'
  return `background: linear-gradient(to left, ${color} ${value}%, #e2e8f0 ${value}%)`
}

function selectField(val) {
  if (selectedField.value !== val) {
    selectedField.value = val
    grades.value = {}
    errorMessage.value = ''
  }
}

function submit() {
  errorMessage.value = ''
  if (!selectedField.value) { errorMessage.value = 'الرجاء اختيار الحقل الأكاديمي أولاً'; return }
  const required = Object.keys(currentSubjects.value)
  const missing = required.filter(sub => grades.value[sub] === undefined)
  if (missing.length) { errorMessage.value = 'يرجى تحريك شريط كل مادة لإدخال العلامة.'; return }
  const gpa = liveGPA.value
  router.push({ path: '/results', query: { source: 'grades', stage: academicStage.value, field: selectedField.value, grades: JSON.stringify(grades.value), gpa } })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=IBM+Plex+Mono:wght@400;700&display=swap');
.font-body, .font-display { font-family: 'Tajawal', sans-serif; }
.font-mono { font-family: 'IBM Plex Mono', monospace; }

.card-soft {
  background: rgba(255,255,255,0.65);
  border: 1px solid rgba(99,102,241,0.12);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 24px rgba(99,102,241,0.06), 0 1px 4px rgba(0,0,0,0.04);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-up-enter-active { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
.slide-up-enter-from { opacity: 0; transform: translateY(16px); }

/* Custom Slider */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.4), 0 2px 8px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}
.slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 0 5px rgba(99,102,241,0.3), 0 2px 12px rgba(0,0,0,0.2);
}
.slider::-moz-range-thumb {
  width: 20px; height: 20px;
  border: none; border-radius: 50%;
  background: white;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.4);
  cursor: pointer;
}
</style>