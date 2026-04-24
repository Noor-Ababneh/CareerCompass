<template>
  <div class="min-h-screen font-body page-bg" dir="rtl">
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
      <div class="fixed inset-0 grid-texture"></div>
    </div>

    <div class="relative z-10 max-w-2xl mx-auto px-5 py-10 pb-24">
      <!-- Header -->
      <div class="mb-10 flex items-center justify-between">
        <button @click="$router.push('/dashboard')" class="nav-btn flex items-center gap-2 group">
          <span class="group-hover:-translate-x-1 transition-transform duration-200 inline-block">←</span>
          الرئيسية
        </button>
        <div class="badge-pill flex items-center gap-2">
          <div class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></div>
          <span>Jordan Academic Analyzer</span>
        </div>
      </div>

      <!-- Title -->
      <div class="mb-12 text-center">
        <div class="inline-flex items-center gap-2 tag-pill mb-6">
          <span class="text-indigo-500">⚡</span>
          <span class="text-indigo-600 font-bold text-sm">تحليل ذكي للمسار الأكاديمي</span>
        </div>
        <h1 class="font-display text-4xl md:text-5xl font-black text-slate-800 mb-4 leading-tight">إدخال العلامات</h1>
        <p class="text-slate-500 text-base leading-relaxed max-w-md mx-auto">أدخل علاماتك بدقة وسيقوم النظام بتحليل وضعك الأكاديمي وبناء خطة مخصصة لك كطالب أردني.</p>
      </div>

      <!-- Step 1 -->
      <div class="mb-6 card rounded-3xl p-6">
        <div class="step-header mb-5">
          <div class="step-num">١</div>
          <h2 class="font-display font-bold text-slate-700 text-lg">المرحلة الدراسية</h2>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button @click="academicStage = 'junior'"
            :class="academicStage === 'junior' ? 'btn-opt-active-indigo' : 'btn-opt'"
            class="p-5 rounded-2xl border transition-all duration-200 flex flex-col items-center gap-2.5 group">
            <span class="text-2xl group-hover:scale-110 transition-transform duration-200">🌱</span>
            <span class="font-bold text-sm">تأسيس</span>
            <span class="text-xs opacity-50">الصف 9 - 11</span>
          </button>
          <button @click="academicStage = 'senior'"
            :class="academicStage === 'senior' ? 'btn-opt-active-violet' : 'btn-opt'"
            class="p-5 rounded-2xl border transition-all duration-200 flex flex-col items-center gap-2.5 group">
            <span class="text-2xl group-hover:scale-110 transition-transform duration-200">🎓</span>
            <span class="font-bold text-sm">توجيهي</span>
            <span class="text-xs opacity-50">الصف 12</span>
          </button>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="mb-6 card rounded-3xl p-6">
        <div class="step-header mb-5">
          <div class="step-num">٢</div>
          <h2 class="font-display font-bold text-slate-700 text-lg">الحقل الأكاديمي</h2>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button v-for="(opt, val) in fieldOptions" :key="val" @click="selectField(val)"
            :class="selectedField === val ? 'btn-opt-active-indigo' : 'btn-opt'"
            class="p-4 rounded-2xl border transition-all duration-200 flex items-center gap-3 text-right group">
            <span class="text-xl shrink-0">{{ opt.icon }}</span>
            <div class="text-right flex-1 min-w-0">
              <div class="font-bold text-sm leading-tight">{{ opt.label }}</div>
              <div class="text-[11px] opacity-50 mt-0.5 truncate">{{ opt.sub }}</div>
            </div>
          </button>
        </div>
      </div>

      <!-- Step 3 -->
      <transition name="slide-up">
        <div v-if="selectedField" class="mb-6 card rounded-3xl p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="step-header">
              <div class="step-num">٣</div>
              <h2 class="font-display font-bold text-slate-700 text-lg">علامات المواد</h2>
            </div>
            <div class="badge-pill">
              المعدل: <span :class="gpaColorClass" class="font-black mr-1">{{ liveGPA }}%</span>
            </div>
          </div>

          <!-- GPA bar -->
          <div class="mb-8 p-4 rounded-2xl bg-white/50 border border-slate-200/60">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-bold text-slate-500">المعدل العام</span>
              <span class="text-xs font-bold" :class="gpaColorClass">{{ getGPALabel(liveGPA) }}</span>
            </div>
            <div class="h-2 bg-slate-200/70 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-500" :class="gpaBarColor" :style="{ width: liveGPA + '%' }"></div>
            </div>
            <div class="flex justify-between text-[10px] text-slate-400 mt-1.5 font-bold">
              <span>0</span><span>50</span><span>65</span><span>75</span><span>85</span><span>100</span>
            </div>
          </div>

          <div class="space-y-7">
            <div v-for="(label, key) in currentSubjects" :key="key">
              <div class="flex justify-between items-center mb-3">
                <div class="flex items-center gap-2">
                  <span class="text-base">{{ subjectIcons[key] || '📚' }}</span>
                  <label class="font-bold text-slate-700 text-sm">{{ label }}</label>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-bold text-slate-400 bg-white/60 px-2 py-0.5 rounded-lg border border-slate-200/70">{{ getSubjectStatusLabel(grades[key]) }}</span>
                  <div :class="getScoreColorClass(grades[key])" class="px-3 py-1 rounded-xl font-mono font-black text-sm min-w-[52px] text-center border transition-all duration-200">
                    {{ grades[key] || 0 }}%
                  </div>
                </div>
              </div>
              <div class="relative">
                <input type="range" v-model.number="grades[key]" min="0" max="100" step="1"
                  class="slider w-full h-2 rounded-full appearance-none cursor-pointer outline-none"
                  :style="sliderStyle(grades[key] || 0)" />
                <div class="absolute top-4 w-full flex pointer-events-none">
                  <div class="absolute text-[9px] text-rose-400/60 font-bold" style="left:50%">50</div>
                  <div class="absolute text-[9px] text-amber-500/60 font-bold" style="left:65%">65</div>
                  <div class="absolute text-[9px] text-sky-500/60 font-bold" style="left:75%">75</div>
                  <div class="absolute text-[9px] text-emerald-500/60 font-bold" style="left:85%">85</div>
                </div>
              </div>
              <div class="flex justify-between text-[10px] font-bold text-slate-400 mt-5 px-0.5">
                <span class="text-rose-400/70">راسب</span>
                <span class="text-amber-500/70">مقبول</span>
                <span class="text-yellow-600/70">جيد</span>
                <span class="text-sky-500/70">جيد جداً</span>
                <span class="text-emerald-500/70">امتياز</span>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Error -->
      <transition name="fade">
        <div v-if="errorMessage" class="mb-5 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-500 font-bold text-sm">
          <span>⚠️</span> {{ errorMessage }}
        </div>
      </transition>

      <!-- Submit -->
      <button @click="submit" :disabled="!selectedField"
        :class="selectedField ? 'btn-primary' : 'btn-disabled'"
        class="w-full py-5 rounded-2xl font-display font-black text-lg tracking-wide transition-all duration-300 group">
        <span class="flex items-center justify-center gap-3">
          <span>{{ academicStage === 'junior' ? 'تحليل نقاط الضعف' : 'حساب المعدل والنتيجة' }}</span>
          <span class="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
        </span>
      </button>
      <p class="text-center text-xs text-slate-400 mt-4">خاص بالمنهج الأردني · القبول الموحد ٢٠٢٥</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const academicStage = ref('junior')
const selectedField  = ref('')
const grades         = ref({})
const errorMessage   = ref('')

const fieldOptions = {
  Health:     { label: 'الطبي والصحي',        sub: 'طب · صيدلة · تمريض',          icon: '🏥' },
  Engineering:{ label: 'الهندسي',             sub: 'مدني · معماري · ميكاترونيكس',  icon: '⚙️' },
  IT:         { label: 'تكنولوجيا المعلومات', sub: 'ذكاء اصطناعي · سيبراني · CS',  icon: '💻' },
  Business:   { label: 'الأعمال والإدارة',    sub: 'محاسبة · تسويق · مالية',        icon: '📈' },
  Law:        { label: 'القانون والشريعة',     sub: 'حقوق · شريعة إسلامية',         icon: '⚖️' },
  Languages:  { label: 'اللغات والإنسانيات',  sub: 'إنجليزي · عربي · ترجمة',        icon: '🌐' },
}
const subjectIcons = {
  chem:'🧪', bio:'🧬', math:'📐', physics:'⚛️',
  eng_adv:'📘', math_adv:'🔢', math_biz:'💰', finance:'🏦', arabic_spec:'📖', islamic_spec:'🕌'
}
const curriculum = {
  Health:     { chem:'الكيمياء', bio:'الأحياء', eng_adv:'إنجليزي متقدم' },
  Engineering:{ math:'الرياضيات', physics:'الفيزياء', eng_adv:'إنجليزي متقدم' },
  IT:         { math_adv:'رياضيات متقدم', eng_adv:'إنجليزي متقدم' },
  Languages:  { eng_adv:'إنجليزي متقدم', arabic_spec:'عربي تخصص' },
  Law:        { arabic_spec:'عربي تخصص', islamic_spec:'تربية إسلامية تخصص', eng_adv:'إنجليزي متقدم' },
  Business:   { finance:'ثقافة مالية', math_biz:'رياضيات أعمال', eng_adv:'إنجليزي متقدم' }
}

const currentSubjects = computed(() => selectedField.value ? curriculum[selectedField.value] : {})

const liveGPA = computed(() => {
  const s = Object.values(grades.value).map(Number).filter(n => !isNaN(n) && n > 0)
  return s.length ? Math.round(s.reduce((a,b)=>a+b,0)/s.length) : 0
})

const gpaColorClass = computed(() => {
  const g = liveGPA.value
  if (g >= 85) return 'text-emerald-600'; if (g >= 75) return 'text-sky-600'
  if (g >= 65) return 'text-amber-600';   if (g >= 50) return 'text-orange-500'
  return 'text-rose-500'
})
const gpaBarColor = computed(() => {
  const g = liveGPA.value
  if (g >= 85) return 'bg-gradient-to-r from-emerald-400 to-emerald-500'
  if (g >= 75) return 'bg-gradient-to-r from-sky-400 to-sky-500'
  if (g >= 65) return 'bg-gradient-to-r from-amber-400 to-amber-500'
  if (g >= 50) return 'bg-gradient-to-r from-orange-400 to-orange-500'
  return 'bg-gradient-to-r from-rose-400 to-rose-500'
})
function getGPALabel(g) {
  if (g >= 85) return '🌟 امتياز'; if (g >= 75) return 'جيد جداً'
  if (g >= 65) return 'جيد';       if (g >= 50) return 'مقبول'
  if (g > 0)   return 'راسب';      return '—'
}
function getSubjectStatusLabel(s) {
  if (!s && s !== 0) return '—'
  if (s >= 85) return 'امتياز'; if (s >= 75) return 'جيد جداً'
  if (s >= 65) return 'جيد';    if (s >= 50) return 'مقبول'; return 'راسب'
}
function getScoreColorClass(s) {
  if (!s && s !== 0) return 'bg-slate-50 border-slate-200 text-slate-400'
  if (s >= 85) return 'bg-emerald-50 border-emerald-200 text-emerald-700'
  if (s >= 75) return 'bg-sky-50 border-sky-200 text-sky-700'
  if (s >= 65) return 'bg-amber-50 border-amber-200 text-amber-700'
  if (s >= 50) return 'bg-orange-50 border-orange-200 text-orange-600'
  return 'bg-rose-50 border-rose-200 text-rose-600'
}
function sliderStyle(v) {
  const c = v>=85?'#10b981':v>=75?'#0ea5e9':v>=65?'#f59e0b':v>=50?'#f97316':'#f43f5e'
  return `background:linear-gradient(to left,${c} ${v}%,#e2e8f0 ${v}%)`
}
function selectField(val) {
  if (selectedField.value !== val) { selectedField.value = val; grades.value = {}; errorMessage.value = '' }
}
function submit() {
  errorMessage.value = ''
  if (!selectedField.value) { errorMessage.value = 'الرجاء اختيار الحقل الأكاديمي أولاً'; return }
  const missing = Object.keys(currentSubjects.value).filter(s => grades.value[s] === undefined)
  if (missing.length) { errorMessage.value = 'يرجى تحريك شريط كل مادة لإدخال العلامة.'; return }
  router.push({ path:'/results', query:{ source:'grades', stage:academicStage.value, field:selectedField.value, grades:JSON.stringify(grades.value), gpa:liveGPA.value } })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=IBM+Plex+Mono:wght@400;700&display=swap');
.font-body,.font-display{font-family:'Tajawal',sans-serif}.font-mono{font-family:'IBM Plex Mono',monospace}

.page-bg {
  background-color: #e8ecf4;
  background-image:
    radial-gradient(ellipse 80% 55% at 85% -5%, rgba(165,180,252,0.22) 0%, transparent 60%),
    radial-gradient(ellipse 60% 45% at 15% 105%, rgba(110,231,183,0.12) 0%, transparent 60%);
}
.grid-texture {
  background-image: linear-gradient(rgba(71,85,105,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71,85,105,0.05) 1px, transparent 1px);
  background-size: 48px 48px;
}
.blob{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none}
.blob-1{width:480px;height:480px;top:-100px;right:-80px;background:rgba(165,180,252,0.18);animation:bfloat 9s ease-in-out infinite}
.blob-2{width:380px;height:380px;bottom:-60px;left:-60px;background:rgba(110,231,183,0.11);animation:bfloat 11s ease-in-out infinite reverse}
.blob-3{width:280px;height:280px;top:42%;left:48%;transform:translate(-50%,-50%);background:rgba(253,230,138,0.09);animation:bfloat 13s ease-in-out infinite}
@keyframes bfloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-18px) scale(1.025)}}
.blob-2{animation-name:bfloat2}
@keyframes bfloat2{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(16px) scale(0.98)}}

.card{
  background:rgba(255,255,255,0.68);
  border:1px solid rgba(148,163,184,0.18);
  backdrop-filter:blur(20px);
  box-shadow:0 2px 14px rgba(100,116,139,0.07),0 1px 3px rgba(0,0,0,0.04);
  transition:box-shadow .2s;
}
.card:hover{box-shadow:0 4px 24px rgba(99,102,241,0.08),0 1px 4px rgba(0,0,0,0.05)}

.nav-btn{font-size:.8rem;font-weight:700;color:#64748b;background:rgba(255,255,255,0.68);backdrop-filter:blur(10px);border:1px solid rgba(148,163,184,0.22);border-radius:12px;padding:6px 14px;box-shadow:0 1px 4px rgba(0,0,0,0.05);transition:all .2s}
.nav-btn:hover{color:#4f46e5;border-color:rgba(99,102,241,0.28)}

.btn-opt{background:rgba(255,255,255,0.5);border-color:rgba(148,163,184,0.22)!important;color:#64748b}
.btn-opt:hover{border-color:rgba(99,102,241,0.22)!important;color:#334155;background:rgba(255,255,255,0.72)}
.btn-opt-active-indigo{background:rgba(238,242,255,0.88)!important;border-color:rgba(99,102,241,0.35)!important;color:#4338ca!important;box-shadow:0 2px 10px rgba(99,102,241,0.1)}
.btn-opt-active-violet{background:rgba(245,243,255,0.88)!important;border-color:rgba(139,92,246,0.35)!important;color:#6d28d9!important;box-shadow:0 2px 10px rgba(139,92,246,0.1)}

.btn-primary{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;box-shadow:0 4px 18px rgba(99,102,241,0.28)}
.btn-primary:hover{box-shadow:0 6px 24px rgba(99,102,241,0.38);transform:translateY(-1px)}
.btn-disabled{background:#e8eaf0;color:#94a3b8;cursor:not-allowed}

.badge-pill{font-size:.7rem;font-weight:700;color:#64748b;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:1px solid rgba(148,163,184,0.2);border-radius:999px;padding:4px 12px;box-shadow:0 1px 3px rgba(0,0,0,0.04)}
.tag-pill{display:inline-flex;align-items:center;gap:8px;background:rgba(238,242,255,0.78);border:1px solid rgba(99,102,241,0.18);border-radius:14px;padding:7px 16px;box-shadow:0 1px 5px rgba(99,102,241,0.07)}
.step-header{display:flex;align-items:center;gap:10px}
.step-num{width:25px;height:25px;border-radius:50%;background:rgba(238,242,255,0.9);border:1px solid rgba(99,102,241,0.22);display:flex;align-items:center;justify-content:center;font-size:.68rem;font-weight:900;color:#4f46e5}

.fade-enter-active,.fade-leave-active{transition:opacity .3s}
.fade-enter-from,.fade-leave-to{opacity:0}
.slide-up-enter-active{transition:all .4s cubic-bezier(.16,1,.3,1)}
.slide-up-enter-from{opacity:0;transform:translateY(14px)}

.slider::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:white;box-shadow:0 0 0 2.5px rgba(99,102,241,0.4),0 2px 6px rgba(0,0,0,0.1);cursor:pointer;transition:transform .15s,box-shadow .15s}
.slider::-webkit-slider-thumb:hover{transform:scale(1.2);box-shadow:0 0 0 4px rgba(99,102,241,0.28),0 2px 10px rgba(0,0,0,0.12)}
.slider::-moz-range-thumb{width:18px;height:18px;border:none;border-radius:50%;background:white;box-shadow:0 0 0 2.5px rgba(99,102,241,0.4);cursor:pointer}
</style>