<template>
  <div class="min-h-screen font-sans bg-[#F8FAFF] selection:bg-indigo-500 selection:text-white relative overflow-hidden" dir="rtl">
    
    <div class="fixed inset-0 z-0 opacity-[0.03]" style="background-image: radial-gradient(#3730a3 1px, transparent 1px); background-size: 32px 32px;"></div>
    <div class="fixed top-[-10%] right-[-5%] w-[480px] h-[480px] rounded-full bg-indigo-500/10 blur-[90px] animate-blob z-0 pointer-events-none"></div>
    <div class="fixed bottom-[-10%] left-[-10%] w-[380px] h-[380px] rounded-full bg-purple-500/10 blur-[100px] animate-blob animation-delay-2000 z-0 pointer-events-none"></div>
    <div class="fixed top-[42%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-blue-400/10 blur-[80px] animate-blob z-0 pointer-events-none"></div>

    <div class="relative z-10 max-w-3xl mx-auto px-5 py-10 pb-24">
      
      <div class="mb-10 flex items-center justify-between">
        <button @click="$router.push('/')" class="nav-btn flex items-center gap-2 group">
          <span class="text-xl">🏠</span>
          الرئيسية
        </button>
        <div class="badge-pill flex items-center gap-2 border-indigo-200 text-indigo-700 bg-indigo-50 px-4 py-2 rounded-full border shadow-sm">
          <div class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
          <span class="text-xs font-bold">محلل المسار الأكاديمي</span>
        </div>
      </div>

      <div class="mb-12 text-center bg-white/60 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white shadow-xl shadow-indigo-500/5">
        <div class="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-4 py-1.5 rounded-full mb-6 shadow-sm">
          <span class="text-indigo-500 text-lg">⚡</span>
          <span class="text-indigo-700 font-bold text-sm tracking-wide">المنهج الأردني المحدث 2025/2026</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black text-slate-800 mb-4 leading-tight">سجل علاماتك الأكاديمية</h1>
        <p class="text-slate-600 text-base leading-relaxed max-w-lg mx-auto font-medium">
          أدخل درجاتك الحالية بدقة، ليقوم النظام بتحليل مستواك وتصميم خطة تطوير مخصصة تسد الفجوات وتضمن لك القبول الجامعي الذي تطمح إليه.
        </p>
      </div>

      <div class="space-y-6">
        
        <div class="bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg shadow-indigo-500/5 rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all hover:shadow-indigo-500/10">
          <div class="absolute top-0 right-0 w-1.5 h-full bg-indigo-400"></div>
          <div class="step-header mb-6 flex justify-between items-center">
            <div class="flex items-center gap-4">
              <div class="step-num bg-indigo-50 text-indigo-600 border-indigo-200">١</div>
              <h2 class="font-bold text-slate-800 text-xl">حدد مرحلتك الدراسية الحالية</h2>
            </div>
            <span v-if="authStore.user?.gradeLevel" class="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100 shadow-sm">
              مأخوذة من ملفك ✨
            </span>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <button @click="academicStage = 'junior'"
              :class="academicStage === 'junior' ? 'btn-opt-active' : 'btn-opt'"
              class="p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 group">
              <span class="text-4xl group-hover:scale-110 transition-transform duration-300">🌱</span>
              <span class="font-black text-lg">مرحلة التأسيس</span>
              <span class="text-xs font-bold opacity-70">الصفوف 9 - 11</span>
            </button>
            <button @click="academicStage = 'senior'"
              :class="academicStage === 'senior' ? 'btn-opt-active' : 'btn-opt'"
              class="p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 group">
              <span class="text-4xl group-hover:scale-110 transition-transform duration-300">🎓</span>
              <span class="font-black text-lg">مرحلة التوجيهي</span>
              <span class="text-xs font-bold opacity-70">الصف 12</span>
            </button>
          </div>
        </div>

        <div class="bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg shadow-indigo-500/5 rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all hover:shadow-indigo-500/10">
          <div class="absolute top-0 right-0 w-1.5 h-full bg-purple-400"></div>
          <div class="step-header mb-6">
            <div class="flex items-center gap-4">
              <div class="step-num bg-purple-50 text-purple-600 border-purple-200">٢</div>
              <h2 class="font-bold text-slate-800 text-xl">
                {{ academicStage === 'junior' ? 'ما هو الحقل الذي تطمح للوصول إليه؟' : 'ما هو حقلك الأكاديمي الحالي؟' }}
              </h2>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button v-for="(opt, val) in fieldOptions" :key="val" @click="selectField(val)"
              :class="selectedField === val ? 'btn-opt-active-purple' : 'btn-opt'"
              class="p-5 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 text-right group hover:-translate-y-1">
              <div class="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform border border-slate-100 shadow-sm" :class="selectedField === val ? 'bg-white border-purple-100' : ''">{{ opt.icon }}</div>
              <div class="text-right flex-1 min-w-0">
                <div class="font-black text-slate-700 text-sm leading-tight mb-1 transition-colors" :class="selectedField === val ? 'text-purple-800' : ''">{{ opt.label }}</div>
                <div class="text-[10px] font-bold opacity-60 truncate">{{ opt.sub }}</div>
              </div>
            </button>
          </div>
        </div>

        <transition name="slide-up">
          <div v-if="selectedField" class="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-blue-500/10 rounded-[2.5rem] p-6 md:p-8 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-1.5 h-full bg-blue-400"></div>
            
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-100 pb-6">
              <div class="step-header">
                <div class="flex items-center gap-4">
                  <div class="step-num bg-blue-50 text-blue-600 border-blue-200">٣</div>
                  <h2 class="font-bold text-slate-800 text-xl">
                    {{ academicStage === 'junior' ? 'أدخل علاماتك المدرسية للتقييم' : 'أدخل علامات التوجيهي بدقة' }}
                  </h2>
                </div>
              </div>
              <div class="bg-slate-50/80 border border-slate-200 px-5 py-3 rounded-2xl text-sm font-bold text-slate-600 shadow-inner flex items-center gap-2">
                المعدل التقريبي: <span :class="gpaColorClass" class="font-black text-2xl mr-1">{{ liveGPA }}<span class="text-sm">%</span></span>
              </div>
            </div>

            <div class="space-y-4">
              <div v-for="(label, key) in currentSubjects" :key="key" class="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all hover:shadow-md flex flex-col md:flex-row justify-between items-center gap-4 group">
                
                <div class="flex items-center gap-4 w-full md:w-auto">
                  <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                    {{ subjectIcons[key] || '📚' }}
                  </div>
                  <div>
                    <label class="font-black text-slate-700 text-base block mb-0.5">{{ label }}</label>
                    <span class="text-[10px] font-bold" :class="getScoreColorClassText(grades[key])">{{ getSubjectStatusLabel(grades[key]) }}</span>
                  </div>
                </div>
                
                <div class="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all w-full md:w-auto">
                  <div class="relative flex-1 md:w-32">
                    <input 
                      type="text" 
                      inputmode="numeric"
                      v-model="grades[key]" 
                      class="w-full text-center bg-transparent border-none font-black text-2xl text-slate-800 focus:ring-0 p-0"
                      placeholder="0"
                      @blur="validateGrade(key)"
                      @input="validateGrade(key)"
                    />
                    <span class="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm pointer-events-none">%</span>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </transition>

        <transition name="fade">
          <div v-if="errorMessage" class="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-600 font-bold text-sm shadow-sm">
            <span class="text-xl">⚠️</span> {{ errorMessage }}
          </div>
        </transition>

        <button @click="submit" :disabled="!selectedField"
          :class="selectedField ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/20 hover:-translate-y-1' : 'bg-slate-200 text-slate-400 cursor-not-allowed'"
          class="w-full py-5 rounded-3xl font-black text-xl tracking-wide transition-all duration-300 group flex items-center justify-center gap-3 border border-indigo-700/50 mt-8">
          <span>{{ academicStage === 'junior' ? 'تحليل الفجوات وبناء الخطة الأكاديمية' : 'تصميم خطة التطوير الجامعية' }}</span>
          <span v-if="selectedField" class="group-hover:translate-x-2 transition-transform duration-300 text-2xl">←</span>
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const academicStage = ref('junior')
const selectedField  = ref('')
const grades         = ref({})
const errorMessage   = ref('')

onMounted(() => {
  if (route.query.field) {
    selectedField.value = route.query.field
  }
  if (authStore.user?.gradeLevel) {
    academicStage.value = authStore.user.gradeLevel === '12' ? 'senior' : 'junior'
  }
})

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
  if (g >= 85) return 'text-[#10b981]'; if (g >= 75) return 'text-[#0ea5e9]'
  if (g >= 65) return 'text-[#f59e0b]';   if (g >= 50) return 'text-[#f97316]'
  return 'text-[#f43f5e]'
})

function normalizeNumber(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  return str.replace(/[٠-٩]/g, d => d.charCodeAt(0) - 0x0660)
            .replace(/[۰-۹]/g, d => d.charCodeAt(0) - 0x06F0)
            .replace(/[^0-9]/g, '');
}

function validateGrade(key) {
  let rawVal = normalizeNumber(grades.value[key]);
  
  if (rawVal === '') {
    grades.value[key] = '';
    return;
  }

  let val = Number(rawVal);
  if (isNaN(val) || val < 0) val = 0;
  if (val > 100) val = 100;
  
  grades.value[key] = val;
}

function getSubjectStatusLabel(s) {
  if (!s && s !== 0) return 'لم تُدخل بعد'
  if (s >= 85) return 'أداء ممتاز'; if (s >= 75) return 'أداء جيد جداً'
  if (s >= 65) return 'أداء جيد';    if (s >= 50) return 'مقبول'; return 'تحتاج تحسين'
}

function getScoreColorClassText(s) {
  if (!s && s !== 0) return 'text-slate-400'
  if (s >= 85) return 'text-emerald-500'
  if (s >= 75) return 'text-sky-500'
  if (s >= 65) return 'text-amber-500'
  if (s >= 50) return 'text-orange-500'
  return 'text-rose-500'
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
  
  Object.keys(grades.value).forEach(k => {
    grades.value[k] = Number(normalizeNumber(grades.value[k])) || 0;
  });

  const missing = Object.keys(currentSubjects.value).filter(s => grades.value[s] === undefined || grades.value[s] === 0)
  if (missing.length) { 
    errorMessage.value = 'يرجى إدخال درجاتك في جميع المواد الأساسية لحساب المعدل.'; 
    return 
  }
  
  // الانتقال الآمن مع تشفير الـ JSON لتجنب مشاكل المتصفحات والهواتف
  router.push({ 
    path: '/improvement-plan', 
    query: { 
      source: 'grades', 
      stage: academicStage.value, 
      field: selectedField.value, 
      grades: encodeURIComponent(JSON.stringify(grades.value)), 
      gpa: liveGPA.value 
    } 
  });
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=IBM+Plex+Mono:wght@400;700&display=swap');
.font-sans { font-family: 'Tajawal', sans-serif; }
.font-mono { font-family: 'IBM Plex Mono', monospace; }

input[type="text"]::-webkit-inner-spin-button,
input[type="text"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.animate-blob { animation: bfloat 15s infinite alternate ease-in-out; }
.animation-delay-2000 { animation-delay: 2s; }
@keyframes bfloat {
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(30px, -30px) scale(1.05); }
  100% { transform: translate(-20px, 20px) scale(0.95); }
}

.nav-btn {
  font-size: 0.95rem; font-weight: 700; color: #64748b;
  background: rgba(255,255,255,0.8); backdrop-filter: blur(10px);
  border: 1px solid rgba(148,163,184,0.3); border-radius: 1rem;
  padding: 10px 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.02); transition: all 0.2s;
}
.nav-btn:hover { color: #4f46e5; border-color: rgba(79,70,229,0.3); background: white; }

.btn-opt {
  background: rgba(255,255,255,0.7); border-color: rgba(148,163,184,0.2) !important; color: #64748b;
}
.btn-opt:hover {
  border-color: rgba(99,102,241,0.4) !important; color: #334155; background: rgba(255,255,255,0.95);
}
.btn-opt-active {
  background: rgba(238,242,255,0.9) !important; border-color: rgba(99,102,241,0.5) !important; 
  color: #4338ca !important; box-shadow: 0 4px 15px rgba(99,102,241,0.1);
}
.btn-opt-active-purple {
  background: rgba(250,245,255,0.9) !important; border-color: rgba(168,85,247,0.5) !important; 
  color: #7e22ce !important; box-shadow: 0 4px 15px rgba(168,85,247,0.1);
}

.step-header { display: flex; align-items: center; gap: 12px; }
.step-num {
  width: 36px; height: 36px; border-radius: 50%; 
  border-width: 2px; display: flex; align-items: center; justify-content: center; 
  font-size: 1rem; font-weight: 900;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-up-enter-active { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
.slide-up-enter-from { opacity: 0; transform: translateY(20px); }
</style>