<template>
  <div class="min-h-screen bg-[#F8FAFC] text-slate-800" dir="rtl">

    <nav class="max-w-5xl mx-auto px-6 py-6 flex justify-between items-center">
      <div class="text-2xl font-black text-slate-700 flex items-center gap-2">
        <span class="text-3xl">🧭</span> النتيجة
      </div>
      <button @click="$router.push('/dashboard')" class="bg-white hover:bg-slate-50 text-slate-600 px-5 py-2 rounded-xl font-bold border border-slate-200 shadow-sm transition">
        الرئيسية 🏠
      </button>
    </nav>

    <div class="max-w-4xl mx-auto px-6 pb-20 pt-6">
      
      <div v-if="stage === 'junior'" class="animate-fade-in-up">
        
        <div class="text-center mb-10">
          <span class="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-bold mb-4 inline-block border border-indigo-100">
            تحليل الجاهزية 📋
          </span>
          <h1 class="text-3xl md:text-4xl font-black mb-2 text-slate-800">
            نتائج مسار <span class="text-indigo-600">{{ getFieldName(targetField) }}</span>
          </h1>
        </div>

        <div :class="plan.bgClass" class="rounded-[2rem] p-8 mb-8 border flex items-center gap-6 shadow-sm">
          <div class="text-5xl">{{ plan.icon }}</div>
          <div>
            <h2 class="text-xl font-bold mb-1">{{ plan.title }}</h2>
            <p class="text-sm opacity-90 leading-relaxed">{{ plan.summary }}</p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 class="font-bold text-green-700 mb-4 flex items-center gap-2 text-lg">
              <span class="bg-green-100 p-1.5 rounded-lg">✅</span> نقاط القوة
            </h3>
            <ul v-if="plan.strengths.length" class="space-y-3">
              <li v-for="s in plan.strengths" :key="s" class="flex items-start gap-2 text-slate-700 text-sm bg-slate-50 p-3 rounded-xl">
                <span class="text-green-500">✔</span> {{ s }}
              </li>
            </ul>
            <p v-else class="text-slate-400 text-sm text-center py-4">أنت بحاجة لرفع المعدل العام.</p>
          </div>

          <div class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 class="font-bold text-orange-600 mb-4 flex items-center gap-2 text-lg">
              <span class="bg-orange-100 p-1.5 rounded-lg">🚀</span> نصائح التحسين
            </h3>
            <ul v-if="plan.improvements.length" class="space-y-3">
              <li v-for="imp in plan.improvements" :key="imp" class="bg-orange-50/50 p-3 rounded-xl border border-orange-100 text-sm">
                <div class="font-bold text-orange-800 mb-1 flex items-center gap-2">⚠️ {{ imp.subject }} ({{ imp.score }}%)</div>
                <div class="text-slate-600 leading-relaxed">{{ imp.advice }}</div>
              </li>
            </ul>
            <p v-else class="text-green-600 font-bold p-4 bg-green-50 rounded-xl text-center text-sm">مستواك مثالي! استمر.</p>
          </div>
        </div>
      </div>

      <div v-else class="animate-fade-in-up">
        
        <div class="text-center mb-10">
          <h1 class="text-3xl md:text-5xl font-black mb-4 text-slate-800">التخصصات المقترحة 🎓</h1>
          <p class="text-lg text-slate-500">
            المسار الأنسب لك هو: <span class="font-bold text-indigo-600 border-b-2 border-indigo-200">{{ getFieldName(effectiveField) }}</span>
          </p>
        </div>

        <div class="grid gap-4 max-w-2xl mx-auto">
          <div v-for="(major, idx) in suggestedMajors" :key="idx" 
               class="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-lg font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {{ idx + 1 }}
              </div>
              <h3 class="text-base font-bold text-slate-700 group-hover:text-indigo-700 transition">{{ major }}</h3>
            </div>
            <span class="text-slate-400 text-sm group-hover:text-indigo-500 transition">←</span>
          </div>

          <div v-if="suggestedMajors.length === 0" class="text-center py-10 bg-white rounded-3xl border border-dashed border-slate-300">
            <span class="text-4xl block mb-2">🤔</span>
            <p class="text-slate-500 font-medium">لم يتم العثور على نتائج دقيقة لهذا المسار.</p>
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
const stage = route.query.stage || 'senior'
const targetField = route.query.targetField || route.query.field || ''
const grades = JSON.parse(route.query.grades || '{}')

const effectiveField = computed(() => {
  const f = route.query.currentField || route.query.specificPath || route.query.field || ''
  if (f.includes('Engineering')) return 'Engineering'
  if (f.includes('IT')) return 'IT'
  return f
})

const majorsDB = {
  "Health": ["الطب البشري", "طب الأسنان", "الصيدلة", "دكتور صيدلة", "التمريض", "العلوم الطبية المخبرية", "العلاج الطبيعي"],
  "Engineering": ["الهندسة المدنية", "هندسة العمارة", "هندسة الميكاترونيكس", "هندسة الحاسوب", "هندسة الطاقة", "الهندسة الصناعية"],
  "IT": ["علم الحاسوب (CS)", "هندسة البرمجيات", "الذكاء الاصطناعي", "الأمن السيبراني", "علم البيانات", "نظم المعلومات"],
  "Business": ["إدارة الأعمال", "المحاسبة", "التسويق الرقمي", "العلوم المالية والمصرفية", "نظم المعلومات الإدارية"],
  "Law": ["القانون العام", "القانون الخاص", "العلوم السياسية"],
  "Languages": ["اللغة الإنجليزية", "الترجمة", "اللغة العربية", "اللغات الحديثة"],
  "Design": ["التصميم الجرافيكي", "التصميم الداخلي", "الوسائط المتعددة"]
}

const suggestedMajors = computed(() => {
  if (stage === 'junior') return []
  return majorsDB[effectiveField.value] || []
})

const plan = computed(() => {
  if (stage !== 'junior') return {}
  let p = { bgClass: '', icon: '', title: '', summary: '', strengths: [], improvements: [] }
  
  const rules = {
    'Health': { bio: 85, chem: 80 },
    'Engineering': { math: 80, physics: 75 },
    'IT': { math: 75, computer: 80, logic: 70 },
    'Business': { math: 65, english: 70 },
    'Law': { arabic: 80, history: 75 },
    'Languages': { english: 85, arabic: 80 }
  }

  const tips = {
    bio: "ركز على العمليات الحيوية والرسومات.",
    chem: "المعادلات الكيميائية تحتاج ممارسة يومية.",
    math: "قوي أساسك في الجبر والتفاضل.",
    physics: "حل مسائل تطبيقية لفهم القوانين.",
    computer: "طبق ما تتعلمه عملياً بكتابة أكواد بسيطة.",
    english: "شاهد محتوى إنجليزي لتقوية الاستماع.",
    arabic: "ركز على النحو وقواعد اللغة."
  }

  const reqs = rules[targetField] || {}
  let misses = 0

  Object.entries(reqs).forEach(([subject, threshold]) => {
    const score = grades[subject] || 0
    const label = getSubjectName(subject)
    
    if (score >= threshold) {
      p.strengths.push(`مستواك ممتاز في ${label} (${score}%)`)
    } else {
      misses++
      p.improvements.push({
        subject: label,
        score: score,
        advice: `المطلوب ${threshold}%. نصيحة: ${tips[subject] || 'كثف الدراسة.'}`
      })
    }
  })

  if (misses === 0) {
    p.bgClass = 'bg-green-50 border-green-200 text-green-900'
    p.icon = '🌟'
    p.title = 'جاهز تماماً!'
    p.summary = 'علاماتك تؤهلك لهذا التخصص.'
  } else {
    p.bgClass = 'bg-orange-50 border-orange-200 text-orange-900'
    p.icon = '📋'
    p.title = 'تحتاج لخطة عمل'
    p.summary = `يوجد ${misses} مواد تحتاج لتحسين.`
  }
  return p
})

function getFieldName(code) {
  const map = { 'Health': 'القطاع الطبي', 'Engineering': 'الهندسة', 'IT': 'تكنولوجيا المعلومات', 'Business': 'الأعمال', 'Law': 'القانون', 'Languages': 'اللغات', 'Design': 'التصميم' }
  return map[code] || code
}
function getSubjectName(code) {
  const map = { bio: 'الأحياء', chem: 'الكيمياء', math: 'الرياضيات', physics: 'الفيزياء', computer: 'الحاسوب', english: 'الإنجليزي', arabic: 'العربي' }
  return map[code] || code
}
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>