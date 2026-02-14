<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900" dir="rtl">

    <div class="absolute w-[600px] h-[600px] bg-blue-500 opacity-20 rounded-full blur-[100px] top-[-100px] right-[-100px] animate-pulse"></div>
    <div class="absolute w-[500px] h-[500px] bg-purple-500 opacity-20 rounded-full blur-[100px] bottom-[-80px] left-[-80px] animate-pulse animation-delay-2000"></div>

    <nav class="relative z-50 max-w-4xl mx-auto px-6 py-8 flex justify-between items-center text-white">
      <div class="text-2xl font-extrabold flex items-center gap-2">
        <span class="text-3xl">🧭</span> <span class="tracking-wide">النتيجة النهائية</span>
      </div>
      <button 
        @click="$router.push('/dashboard')" 
        class="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold border border-white/20 transition flex items-center gap-2"
      >
        الرئيسية 🏠
      </button>
    </nav>

    <div class="relative z-10 max-w-4xl mx-auto px-6 pb-20">
      
      <div v-if="stage === 'junior'" class="animate-slide-up">
        
        <div class="text-center mb-10 text-white">
          <h1 class="text-3xl md:text-5xl font-bold mb-4">
            تحليل مسار 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              {{ getFieldName(targetField) }}
            </span>
          </h1>
          <p class="text-blue-200 text-lg opacity-90">خطة التحسين الخاصة بك 📈</p>
        </div>

        <div :class="plan.statusClass" class="rounded-3xl p-8 mb-8 border border-white/10 shadow-2xl backdrop-blur-md bg-white/5">
          <div class="flex flex-col md:flex-row items-center gap-6 text-center md:text-right">
            <div class="text-6xl bg-white/10 w-24 h-24 flex items-center justify-center rounded-full shadow-inner border border-white/20">
              {{ plan.icon }}
            </div>
            <div class="text-white">
              <h2 class="text-2xl font-bold mb-2">{{ plan.title }}</h2>
              <p class="opacity-90 leading-relaxed text-blue-100">{{ plan.summary }}</p>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-white">
            <h3 class="font-bold text-green-300 mb-4 flex items-center gap-2 text-xl">✅ نقاط القوة</h3>
            <ul v-if="plan.strengths.length > 0" class="space-y-3">
              <li v-for="s in plan.strengths" :key="s" class="flex items-start gap-2 text-sm md:text-base">
                <span class="text-green-400">✔</span> {{ s }}
              </li>
            </ul>
            <p v-else class="text-gray-400 text-sm">تحتاج لرفع مستواك العام.</p>
          </div>

          <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-white">
            <h3 class="font-bold text-red-300 mb-4 flex items-center gap-2 text-xl">🚀 خطة العمل</h3>
            <ul v-if="plan.improvements.length > 0" class="space-y-3">
              <li v-for="imp in plan.improvements" :key="imp" class="bg-red-500/20 p-3 rounded-xl border border-red-500/30">
                <div class="font-bold text-red-200 mb-1">⚠️ {{ imp.subject }}</div>
                <div class="text-sm text-white/90">{{ imp.advice }}</div>
              </li>
            </ul>
            <p v-else class="text-green-300 font-bold">مستواك ممتاز!</p>
          </div>
        </div>
      </div>

      <div v-else class="animate-slide-up">
        
        <div class="text-center mb-12 text-white">
          <div class="inline-block p-4 rounded-full bg-white/10 mb-4 backdrop-blur-sm border border-white/20">
            <span class="text-4xl">🎓</span>
          </div>
          <h1 class="text-3xl md:text-5xl font-bold mb-4">
            التخصصات المتاحة
          </h1>
          <p class="text-xl text-blue-200">
            المسار الأنسب لك: 
            <span class="font-bold text-white border-b-2 border-purple-400 pb-1">
              {{ getFieldName(effectiveField) }}
            </span>
          </p>
        </div>

        <div class="flex flex-col gap-4 max-w-3xl mx-auto">
          
          <div v-for="(major, idx) in suggestedMajors" :key="idx" 
               class="group bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer flex items-center justify-between border-r-8 border-purple-600">
            
            <div class="flex items-center gap-5">
              <div class="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center text-2xl font-bold shadow-inner">
                {{ idx + 1 }}
              </div>
              
              <div>
                <h3 class="text-lg md:text-xl font-bold text-gray-800 group-hover:text-purple-700 transition">
                  {{ major }}
                </h3>
                <span class="text-xs text-gray-500 font-medium">بكالوريوس • 4-6 سنوات</span>
              </div>
            </div>

            <div class="bg-gray-50 text-purple-700 px-4 py-2 rounded-lg text-sm font-bold group-hover:bg-purple-600 group-hover:text-white transition">
              التفاصيل ←
            </div>

          </div>

          <div v-if="suggestedMajors.length === 0" class="text-center py-12 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-white">
            <span class="text-5xl block mb-4">🔮</span>
            <p class="text-xl font-bold">جاري تحليل البيانات...</p>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// 1. استقبال البيانات
const stage = route.query.stage || 'senior' 
const targetFieldInput = route.query.targetField || ''
const currentFieldInput = route.query.currentField || ''
const grades = JSON.parse(route.query.grades || '{}')
const assessmentResultCode = route.query.specificPath || ''

// 2. توحيد الحقل
const effectiveField = computed(() => {
  if (currentFieldInput) return currentFieldInput
  if (assessmentResultCode) return assessmentResultCode
  return targetFieldInput
})

const targetField = targetFieldInput 

// --- منطق خطة التحسين (Junior) ---
const plan = computed(() => {
  if (stage !== 'junior') return {}
  
  let p = { 
    statusClass: '', icon: '', title: '', summary: '', 
    strengths: [], improvements: [] 
  }

  const requirements = {
    'Health': { subjects: ['science'], threshold: 85 },
    'Engineering': { subjects: ['math', 'science'], threshold: 80 },
    'IT': { subjects: ['math', 'tech'], threshold: 75 },
    'Business': { subjects: ['math', 'lang'], threshold: 70 },
    'Law': { subjects: ['lang'], threshold: 80 },
    'Languages': { subjects: ['lang'], threshold: 85 }
  }

  const req = requirements[targetField] || { subjects: [], threshold: 50 }
  let criticalMisses = 0
  
  req.subjects.forEach(sub => {
    let score = grades[sub] || 0
    let subjectName = getSubjectName(sub)
    if (score >= req.threshold) {
      p.strengths.push(`مستواك في ${subjectName} ممتاز (${score}%)`)
    } else {
      criticalMisses++
      p.improvements.push({
        subject: subjectName,
        advice: `علامتك (${score}%) أقل من المطلوب (${req.threshold}%).`
      })
    }
  })

  // ألوان الحالة متوافقة مع الخلفية الغامقة
  if (criticalMisses === 0) {
    p.statusClass = 'border-l-4 border-green-400'
    p.icon = '🌟'
    p.title = 'مسار آمن ومناسب!'
    p.summary = 'قدراتك الحالية تتطابق تماماً مع متطلبات هذا الحقل.'
  } else {
    p.statusClass = 'border-l-4 border-yellow-400'
    p.icon = '⚠️'
    p.title = 'بحاجة لبعض التحسين'
    p.summary = 'أنت قريب من الهدف، لكن هناك مواد تحتاج لتركيز إضافي.'
  }
  return p
})

// --- منطق التخصصات ---
const majorsDB = {
  "Health": ["الطب البشري", "طب الأسنان", "الصيدلة", "التمريض", "التحاليل الطبية", "الأشعة"],
  "Engineering": ["الهندسة المدنية", "هندسة العمارة", "الميكاترونيكس", "هندسة الحاسوب", "هندسة الطاقة"],
  "IT": ["علم الحاسوب (CS)", "هندسة البرمجيات", "الذكاء الاصطناعي", "الأمن السيبراني", "علم البيانات"],
  "Science": ["الفيزياء", "الكيمياء", "الرياضيات", "الجيولوجيا"], 
  "Business": ["إدارة الأعمال", "المحاسبة", "التسويق الرقمي", "العلوم المالية والمصرفية", "نظم المعلومات الإدارية"],
  "Law": ["القانون العام", "القانون الخاص", "العلوم السياسية", "الشريعة"],
  "Languages": ["اللغة الإنجليزية", "الترجمة", "اللغة العربية", "لغات (فرنسي/ألماني/إسباني)"],
  "Design": ["التصميم الجرافيكي", "التصميم الداخلي", "الفنون البصرية"], 
  "Media": ["الصحافة والإعلام", "الإذاعة والتلفزيون", "العلاقات العامة"]
}

const suggestedMajors = computed(() => {
  if (stage === 'junior') return []
  return majorsDB[effectiveField.value] || []
})

// دوال مساعدة
function getFieldName(code) {
  const map = {
    'Health': 'الحقل الطبي والصحي', 'Engineering': 'الهندسة', 'IT': 'تكنولوجيا المعلومات',
    'Business': 'الأعمال', 'Law': 'القانون', 'Languages': 'اللغات', 
    'Science': 'العلوم البحتة', 'Design': 'الفنون والتصميم', 'Media': 'الإعلام'
  }
  return map[code] || code || 'غير محدد'
}

function getSubjectName(code) {
  const map = { 'math': 'الرياضيات', 'science': 'العلوم', 'tech': 'الحاسوب', 'lang': 'اللغات' }
  return map[code] || code
}
</script>

<style scoped>
/* حركة الدخول الناعمة */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
</style>