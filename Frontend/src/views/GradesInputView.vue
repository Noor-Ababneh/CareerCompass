<template>
  <div class="min-h-screen font-sans bg-[#FDFCF9] selection:bg-amber-500 selection:text-white relative overflow-hidden" dir="rtl">
    
    <div class="fixed inset-0 z-0 opacity-[0.04]" style="background-image: radial-gradient(#d97706 1px, transparent 1px); background-size: 32px 32px;"></div>
    <div class="fixed top-[-10%] right-[-5%] w-[480px] h-[480px] rounded-full bg-amber-400/15 blur-[90px] animate-blob z-0 pointer-events-none"></div>
    <div class="fixed bottom-[-10%] left-[-10%] w-[380px] h-[380px] rounded-full bg-orange-500/10 blur-[100px] animate-blob animation-delay-2000 z-0 pointer-events-none"></div>
    <div class="fixed top-[42%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-yellow-400/10 blur-[80px] animate-blob z-0 pointer-events-none"></div>

    <div class="relative z-10 max-w-2xl mx-auto px-5 py-10 pb-24">
      
      <div class="mb-10 flex items-center justify-between">
        <button @click="$router.push('/')" class="nav-btn flex items-center gap-2 group">
          <span class="group-hover:-translate-x-1 transition-transform duration-200 inline-block text-lg">←</span>
          الرئيسية
        </button>
        <div class="badge-pill flex items-center gap-2 border-amber-200 text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border">
          <div class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
          <span class="text-xs font-bold">محلل المسار الأكاديمي</span>
        </div>
      </div>

      <div class="mb-12 text-center">
        <div class="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full mb-6 shadow-sm">
          <span class="text-amber-500 text-lg">⚡</span>
          <span class="text-amber-700 font-bold text-sm tracking-wide">المنهج الأردني المحدث 2025/2026</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black text-slate-800 mb-4 leading-tight">سجل علاماتك الأكاديمية</h1>
        <p class="text-slate-600 text-base leading-relaxed max-w-md mx-auto font-medium">
          أدخل درجاتك الحالية بدقة، ليقوم النظام بتحليل مستواك وتصميم خطة تطوير مخصصة تسد الفجوات وتضمن لك القبول الجامعي الذي تطمح إليه.
        </p>
      </div>

      <div class="mb-6 bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg shadow-amber-500/5 rounded-3xl p-6 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-1.5 h-full bg-amber-400"></div>
        <div class="step-header mb-5">
          <div class="step-num">١</div>
          <h2 class="font-bold text-slate-800 text-lg">حدد مرحلتك الدراسية الحالية</h2>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button @click="academicStage = 'junior'"
            :class="academicStage === 'junior' ? 'btn-opt-active' : 'btn-opt'"
            class="p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2.5 group">
            <span class="text-3xl group-hover:scale-110 transition-transform duration-300">🌱</span>
            <span class="font-bold text-base">مرحلة التأسيس</span>
            <span class="text-xs font-bold opacity-60">الصفوف 9 - 11</span>
          </button>
          <button @click="academicStage = 'senior'"
            :class="academicStage === 'senior' ? 'btn-opt-active' : 'btn-opt'"
            class="p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2.5 group">
            <span class="text-3xl group-hover:scale-110 transition-transform duration-300">🎓</span>
            <span class="font-bold text-base">مرحلة التوجيهي</span>
            <span class="text-xs font-bold opacity-60">الصف 12</span>
          </button>
        </div>
      </div>

      <div class="mb-6 bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg shadow-amber-500/5 rounded-3xl p-6 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-1.5 h-full bg-orange-400"></div>
        <div class="step-header mb-5">
          <div class="step-num bg-orange-50 text-orange-600 border-orange-200">٢</div>
          <h2 class="font-bold text-slate-800 text-lg">
            {{ academicStage === 'junior' ? 'ما هو الحقل الذي تطمح للوصول إليه؟' : 'ما هو حقلك الأكاديمي الحالي؟' }}
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button v-for="(opt, val) in fieldOptions" :key="val" @click="selectField(val)"
            :class="selectedField === val ? 'btn-opt-active' : 'btn-opt'"
            class="p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 text-right group hover:-translate-y-0.5">
            <span class="text-2xl shrink-0 group-hover:scale-110 transition-transform">{{ opt.icon }}</span>
            <div class="text-right flex-1 min-w-0">
              <div class="font-bold text-slate-700 text-sm leading-tight mb-1 transition-colors" :class="selectedField === val ? 'text-amber-800' : ''">{{ opt.label }}</div>
              <div class="text-[10px] font-bold opacity-60 truncate">{{ opt.sub }}</div>
            </div>
          </button>
        </div>
      </div>

      <transition name="slide-up">
        <div v-if="selectedField" class="mb-6 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-amber-500/10 rounded-[2rem] p-6 md:p-8 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-1.5 h-full bg-yellow-400"></div>
          
          <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div class="step-header">
              <div class="step-num bg-yellow-50 text-yellow-600 border-yellow-200">٣</div>
              <h2 class="font-bold text-slate-800 text-lg">
                {{ academicStage === 'junior' ? 'أدخل علاماتك المدرسية لتقييم جاهزيتك' : 'أدخل علامات التوجيهي المتوقعة' }}
              </h2>
            </div>
            <div class="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 shadow-inner">
              المعدل التقريبي: <span :class="gpaColorClass" class="font-black text-lg mr-1">{{ liveGPA }}%</span>
            </div>
          </div>

          <div class="space-y-8">
            <div v-for="(label, key) in currentSubjects" :key="key" class="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 hover:border-amber-200 transition-colors">
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-3">
                  <span class="text-2xl drop-shadow-sm">{{ subjectIcons[key] || '📚' }}</span>
                  <label class="font-black text-slate-700 text-base">{{ label }}</label>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-bold text-slate-500 bg-white px-2 py-1 rounded-lg border border-slate-200">{{ getSubjectStatusLabel(grades[key]) }}</span>
                  <div :class="getScoreColorClass(grades[key])" class="px-3 py-1.5 rounded-xl font-mono font-black text-base min-w-[60px] text-center border-2 transition-all duration-300 shadow-sm">
                    {{ grades[key] || 0 }}%
                  </div>
                </div>
              </div>
              
              <div class="relative py-2">
                <input type="range" v-model.number="grades[key]" min="0" max="100" step="1"
                  class="slider w-full h-2.5 rounded-full appearance-none cursor-pointer outline-none shadow-inner bg-slate-200"
                  :style="sliderStyle(grades[key] || 0)" />
                <div class="absolute top-6 w-full flex pointer-events-none">
                  <div class="absolute text-[10px] text-rose-400 font-black" style="left:50%">50</div>
                  <div class="absolute text-[10px] text-amber-500 font-black" style="left:65%">65</div>
                  <div class="absolute text-[10px] text-sky-500 font-black" style="left:75%">75</div>
                  <div class="absolute text-[10px] text-emerald-500 font-black" style="left:85%">85</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="errorMessage" class="mb-6 p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl flex items-center gap-3 text-rose-600 font-bold text-sm shadow-sm">
          <span class="text-xl">⚠️</span> {{ errorMessage }}
        </div>
      </transition>

      <button @click="submit" :disabled="!selectedField"
        :class="selectedField ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/30 hover:-translate-y-1' : 'bg-slate-200 text-slate-400 cursor-not-allowed'"
        class="w-full py-5 rounded-[2rem] font-black text-xl tracking-wide transition-all duration-300 group flex items-center justify-center gap-3 border border-amber-400/50">
        <span>{{ academicStage === 'junior' ? 'تحليل الفجوات وبناء الخطة' : 'تصميم خطة التطوير الجامعية' }}</span>
        <span v-if="selectedField" class="group-hover:translate-x-1 transition-transform duration-300 text-2xl">←</span>
      </button>
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const academicStage = ref('junior')
const selectedField  = ref('')
const grades         = ref({})
const errorMessage   = ref('')

// جلب الحقل تلقائياً إذا كان المستخدم قادماً من صفحة نتيجة اختبار الميول
onMounted(() => {
  if (route.query.field) {
    selectedField.value = route.query.field
  }
})

// تم تعديل التسميات هنا لتطابق الحقول الـ 4 المعتمدة مع إبقاء المفاتيح الأصلية
const fieldOptions = {
  Health: { label: 'الحقل الصحي', sub: 'الطب · الأسنان · الصيدلة · التمريض', icon: '🏥' },
  EngineeringIT: { label: 'حقل العلوم والتكنولوجيا والهندسة', sub: 'الهندسة · الحاسوب · الذكاء الاصطناعي', icon: '⚙️' },
  Humanities: { label: 'حقل العلوم الإنسانية والاجتماعية', sub: 'القانون · اللغات · الشريعة · التربية', icon: '📚' },
  Business: { label: 'حقل الأعمال', sub: 'المحاسبة · إدارة الأعمال · التسويق', icon: '💼' }
}

const subjectIcons = {
  chem: '🧪', bio: '🧬', eng_adv: '🇬🇧', math_phys_earth: '📐', 
  math: '🔢', physics: '⚛️', chem_bio_earth: '🔬',
  arabic_spec: '📖', islamic_spec: '🕌', hum_social_opt: '🌍',
  finance: '💰', math_biz: '📊', biz_opt: '🎯'
}

// توزيع المواد كما هي بدون تغيير لتجنب أي مشاكل في الخطة
const curriculum = {
  Health: { 
    chem: 'الكيمياء (إجباري)', 
    bio: 'العلوم الحياتية (إجباري)', 
    eng_adv: 'اللغة الإنجليزية متقدم (إجباري)', 
    math_phys_earth: 'اختياري (رياضيات/فيزياء/علوم أرض)' 
  },
  EngineeringIT: { 
    math: 'الرياضيات (إجباري)', 
    physics: 'الفيزياء (إجباري)', 
    eng_adv: 'اللغة الإنجليزية متقدم (إجباري)', 
    chem_bio_earth: 'اختياري (كيمياء/أحياء/علوم أرض)' 
  },
  Business: { 
    finance: 'الثقافة المالية (إجباري)', 
    eng_adv: 'اللغة الإنجليزية متقدم (إجباري)', 
    math_biz: 'رياضيات الأعمال (إجباري)', 
    biz_opt: 'اختياري (تاريخ/جغرافيا/عربي تخصص...)' 
  },
  Humanities: { 
    eng_adv: 'اللغة الإنجليزية متقدم (إجباري)', 
    arabic_spec: 'اللغة العربية تخصص (إجباري)', 
    islamic_spec: 'التربية الإسلامية تخصص (إجباري)', 
    hum_social_opt: 'اختياري (تاريخ/جغرافيا/ثقافة مالية...)' 
  }
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

function getSubjectStatusLabel(s) {
  if (!s && s !== 0) return 'لم تُدخل'
  if (s >= 85) return 'ممتاز'; if (s >= 75) return 'جيد جداً'
  if (s >= 65) return 'جيد';    if (s >= 50) return 'مقبول'; return 'تحتاج تحسين'
}

function getScoreColorClass(s) {
  if (!s && s !== 0) return 'bg-white border-slate-200 text-slate-400'
  if (s >= 85) return 'bg-emerald-50 border-emerald-300 text-emerald-700'
  if (s >= 75) return 'bg-sky-50 border-sky-300 text-sky-700'
  if (s >= 65) return 'bg-amber-50 border-amber-300 text-amber-700'
  if (s >= 50) return 'bg-orange-50 border-orange-300 text-orange-700'
  return 'bg-rose-50 border-rose-300 text-rose-700'
}

function sliderStyle(v) {
  const c = v >= 85 ? '#10b981' : v >= 75 ? '#0ea5e9' : v >= 65 ? '#f59e0b' : v >= 50 ? '#f97316' : '#f43f5e'
  return `background: linear-gradient(to left, ${c} ${v}%, #e2e8f0 ${v}%)`
}

function selectField(val) {
  if (selectedField.value !== val) { 
    selectedField.value = val; 
    grades.value = {}; 
    errorMessage.value = '' 
  }
}

function submit() {
  errorMessage.value = ''
  if (!selectedField.value) { 
    errorMessage.value = 'الرجاء اختيار الحقل الأكاديمي للمتابعة.'; 
    return 
  }
  const missing = Object.keys(currentSubjects.value).filter(s => grades.value[s] === undefined || grades.value[s] === 0)
  if (missing.length) { 
    errorMessage.value = 'يرجى تحريك شريط العلامات لإدخال درجاتك في جميع المواد الأساسية.'; 
    return 
  }
  
  router.push({ 
    path: '/improvement-plan', 
    query: { 
      source: 'grades', 
      stage: academicStage.value, 
      field: selectedField.value, 
      grades: JSON.stringify(grades.value), 
      gpa: liveGPA.value 
    } 
  })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=IBM+Plex+Mono:wght@400;700&display=swap');
.font-sans { font-family: 'Tajawal', sans-serif; }
.font-mono { font-family: 'IBM Plex Mono', monospace; }

/* حركات الخلفية */
.animate-blob { animation: bfloat 10s infinite alternate; }
.animation-delay-2000 { animation-delay: 2s; }
@keyframes bfloat {
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(20px, -20px) scale(1.05); }
  100% { transform: translate(-10px, 15px) scale(0.95); }
}

.nav-btn {
  font-size: 0.9rem; font-weight: 700; color: #64748b;
  background: rgba(255,255,255,0.8); backdrop-filter: blur(10px);
  border: 1px solid rgba(148,163,184,0.3); border-radius: 14px;
  padding: 8px 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.02); transition: all 0.2s;
}
.nav-btn:hover { color: #d97706; border-color: rgba(245,158,11,0.4); }

.btn-opt {
  background: rgba(255,255,255,0.6); border-color: rgba(148,163,184,0.2) !important; color: #64748b;
}
.btn-opt:hover {
  border-color: rgba(245,158,11,0.4) !important; color: #334155; background: rgba(255,255,255,0.9);
}
.btn-opt-active {
  background: rgba(254,243,199,0.8) !important; border-color: rgba(245,158,11,0.5) !important; 
  color: #b45309 !important; box-shadow: 0 4px 15px rgba(245,158,11,0.1);
}

.step-header { display: flex; align-items: center; gap: 12px; }
.step-num {
  width: 32px; height: 32px; border-radius: 50%; background: #fef3c7; 
  border: 2px solid #fde68a; display: flex; align-items: center; justify-content: center; 
  font-size: 0.9rem; font-weight: 900; color: #d97706;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-up-enter-active { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
.slide-up-enter-from { opacity: 0; transform: translateY(15px); }

.slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; 
  background: white; box-shadow: 0 0 0 3px rgba(245,158,11,0.5), 0 2px 8px rgba(0,0,0,0.15); 
  cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;
}
.slider::-webkit-slider-thumb:hover {
  transform: scale(1.15); box-shadow: 0 0 0 4px rgba(245,158,11,0.3), 0 4px 12px rgba(0,0,0,0.2);
}
.slider::-moz-range-thumb {
  width: 22px; height: 22px; border: none; border-radius: 50%; background: white; 
  box-shadow: 0 0 0 3px rgba(245,158,11,0.5); cursor: pointer;
}
</style>