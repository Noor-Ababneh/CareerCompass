<template>
  <div class="min-h-screen bg-[#F8FAFF] font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden" dir="rtl">
    
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px] animate-aura"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[100px] animate-aura" style="animation-delay: -4s;"></div>
      <div class="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-blue-400/10 blur-[100px] animate-aura" style="animation-delay: -8s;"></div>
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(#4f46e5 1px, transparent 1px); background-size: 32px 32px;"></div>
    </div>

    <nav class="relative z-50 max-w-7xl mx-auto px-6 py-4 flex justify-between items-center border-b border-slate-200/50 backdrop-blur-md">
      <div class="flex items-center gap-3 cursor-pointer group" @click="$router.push('/')">
        <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
          <span class="text-white text-xl">🧭</span>
        </div>
        <span class="text-2xl font-black text-slate-800">Career<span class="text-indigo-600">Compass</span></span>
      </div>
      
      <div class="flex items-center gap-3">
        <button @click="goImprovement" class="bg-indigo-800 hover:bg-indigo-900 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-md hover:-translate-y-0.5 border border-indigo-700">
          خطة التطوير الأكاديمي
        </button>
        <button @click="retake" class="text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors px-2">
          إعادة المقياس
        </button>
      </div>
    </nav>

    <main class="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-16">
      
      <section class="text-center mb-16 anim-fade-up">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border bg-white border-indigo-200 text-indigo-700 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          تم اكتمال التحليل المنهجي بنجاح
        </div>
        
        <h1 class="text-3xl md:text-5xl font-black text-slate-800 leading-tight mb-6">
          بناءً على ميولك، الحقل الأنسب لك هو <br>
          <span class="inline-flex items-center gap-2 mt-4 px-6 py-2 rounded-2xl border-2 border-indigo-200/50 shadow-sm bg-white/50">
            <span class="pb-1">{{ fieldEmoji }}</span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 font-black pb-2">
              {{ fieldName }}
            </span>
          </span>
        </h1>
        
        <p class="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          هذا التحليل مبني على تقييم {{ totalQuestions }} معياراً دولياً لمطابقة الأنماط المهنية مع النظام التعليمي الأردني المحدث لعام 2024-2025.
        </p>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        <div class="bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-xl shadow-indigo-500/5 anim-fade-up" style="animation-delay: 0.2s;">
          <div class="flex justify-between items-start mb-10">
            <div>
              <h3 class="text-xl font-black text-slate-800 mb-1">توزيع الأبعاد الشخصية</h3>
              <p class="text-xs text-slate-400 font-bold tracking-wider uppercase">RIASEC Profile</p>
            </div>
            <div class="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg font-mono font-black tracking-[4px] border border-indigo-200">
              {{ riasecCode }}
            </div>
          </div>

          <div class="space-y-6">
            <div v-for="(dim, key) in dimensionsDisplay" :key="key" class="space-y-2">
              <div class="flex justify-between items-center text-xs font-bold text-slate-600 px-1">
                <span class="flex items-center gap-2">{{ dim.icon }} {{ dim.name }}</span>
                <span class="text-indigo-600">{{ dimPercent(key) }}%</span>
              </div>
              <div class="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all duration-[1.5s] ease-out"
                  :style="{ width: mounted ? dimPercent(key) + '%' : '0%', background: dim.gradient, transitionDelay: dim.delay }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-xl shadow-indigo-500/5 anim-fade-up" style="animation-delay: 0.3s;">
          <div class="mb-8">
            <h3 class="text-xl font-black text-slate-800 mb-1">سماتك الأكاديمية</h3>
            <p class="text-xs text-slate-400 font-bold">بناءً على أعلى أنماطك: {{ riasecCode.slice(0, 2) }}</p>
          </div>

          <div class="flex flex-wrap gap-2 mb-8">
            <span v-for="trait in personalityTraits" :key="trait.label" 
              class="px-4 py-2 rounded-xl text-xs font-bold border transition-all"
              :style="{ background: trait.bg, borderColor: trait.border, color: trait.color }">
              {{ trait.icon }} {{ trait.label }}
            </span>
          </div>

          <div class="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100 mb-8">
            <p class="text-slate-700 text-sm leading-relaxed font-medium whitespace-pre-line">
              {{ personalitySummary }}
            </p>
          </div>

          <div class="space-y-4">
            <p class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">نسبة التوافق مع الحقول الأردنية</p>
            <div v-for="(f, key) in fieldsData" :key="key" class="flex items-center gap-3">
              <span class="text-xs md:text-sm font-bold text-slate-700 w-36 shrink-0 flex items-center gap-1.5">
                <span class="text-base">{{ f.icon }}</span>
                <span class="truncate">{{ f.name }}</span>
              </span>
              <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full rounded-full opacity-80 transition-all duration-[1.2s]" 
                  :style="{ width: mounted ? fieldMatchPercent(key) + '%' : '0%', background: f.color }"></div>
              </div>
              <span class="text-[10px] font-black w-8 text-left" :style="{ color: f.color }">{{ fieldMatchPercent(key) }}%</span>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2 bg-white/80 backdrop-blur-xl border border-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-indigo-500/10 anim-fade-up" style="animation-delay: 0.4s;">
          <div class="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-slate-100 pb-8">
            <div class="text-center md:text-right">
              <h3 class="text-2xl font-black text-slate-800 mb-2">أفضل 3 تخصصات مرشحة لك</h3>
              <p class="text-slate-500 font-medium">مرتبة حسب أعلى نسبة تطابق مع قدراتك المكتشفة</p>
            </div>
            <div class="inline-flex items-center gap-2 px-6 py-2 rounded-2xl text-white font-black text-lg shadow-lg" :style="{ background: topField.color, boxShadow: `0 10px 15px -3px ${topField.color}33` }">
              <span>{{ fieldEmoji }}</span>
              <span> {{ fieldName }}</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="(major, idx) in topMajors" :key="major.name" 
              class="relative bg-white border border-slate-100 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group overflow-hidden">
              
              <div class="absolute -top-4 -left-4 w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-2xl font-black text-slate-200 group-hover:text-indigo-200 transition-colors">
                #{{ idx + 1 }}
              </div>

              <div class="relative z-10">
                <div class="mb-6 flex justify-center">
                   <div class="relative w-24 h-24">
                     <svg class="w-full h-full -rotate-90" viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r="24" fill="none" stroke="#f1f5f9" stroke-width="5"/>
                        <circle cx="30" cy="30" r="24" fill="none" :stroke="topField.color" stroke-width="5"
                          stroke-linecap="round" stroke-dasharray="150.8"
                          :stroke-dashoffset="mounted ? 150.8 - (150.8 * major.matchPct / 100) : 150.8"
                          style="transition: stroke-dashoffset 1.5s cubic-bezier(.16,1,.3,1)" />
                     </svg>
                     <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <span class="text-lg font-black text-slate-800">{{ major.matchPct }}%</span>
                        <span class="text-[9px] font-bold text-slate-400">تطابق</span>
                     </div>
                   </div>
                </div>

                <h4 class="text-lg font-black text-slate-800 text-center mb-3 group-hover:text-indigo-600 transition-colors">{{ major.name }}</h4>
                
                <div class="bg-slate-50 rounded-xl p-3 mb-4 text-center border border-slate-100">
                  <span class="text-[10px] font-bold text-slate-400 block mb-1">الحد الأدنى للقبول المتوقع</span>
                  <span class="text-base font-black text-slate-700">{{ major.minGPA }}%</span>
                </div>

                <p class="text-xs text-slate-500 leading-relaxed text-center font-medium">
                  {{ major.reason }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-16 text-center">
            <p class="text-sm font-bold text-slate-400 mb-6 italic">لمعرفة العلامات التي تحتاجها للوصول لهذه التخصصات وبناء خطة نجاحك:</p>
            <button @click="goImprovement" class="group relative px-10 py-5 rounded-[2rem] font-black text-xl text-white transition-all shadow-xl hover:-translate-y-1 overflow-hidden" :style="{ background: topField.color, boxShadow: `0 20px 25px -5px ${topField.color}40` }">
              <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              احسب علاماتي وابدأ خطة التطوير الأكاديمي ←
            </button>
          </div>
        </div>
      </div>

      <p class="text-center text-slate-400 text-xs font-bold tracking-widest uppercase">
        CareerCompass • دليلك الأكاديمي المعتمد • الأردن 2026
      </p>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { JORDANIAN_FIELDS } from '@/data/riasecQuestions'

const router = useRouter()
const mounted = ref(false)

// قراءة النتائج بأمان تام من ذاكرة المتصفح localStorage
const savedResult = localStorage.getItem('assessmentResult')
const resultData = savedResult ? JSON.parse(savedResult) : {}

onMounted(() => {
  setTimeout(() => { mounted.value = true }, 100)
  window.scrollTo({ top: 0, behavior: 'instant' })
})

const scores = ref(resultData.scores || { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 })
const riasecCode = ref(resultData.riasec_code || '---')
const topFieldKey = ref(resultData.field || 'Business')
const topMajors = ref(resultData.top_majors || [])

const topField = computed(() => JORDANIAN_FIELDS[topFieldKey.value] || JORDANIAN_FIELDS.Business)
const totalQuestions = 42

const fieldEmoji = computed(() => {
  const name = topField.value.name || ''
  const match = name.match(/\p{Emoji_Presentation}|\p{Emoji}\uFE0F/u)
  return match ? match[0] : ''
})

const fieldName = computed(() => {
  const name = topField.value.name || ''
  return name.replace(/^[\p{Emoji_Presentation}\p{Emoji}\uFE0F\s]+/u, '').trim()
})

function dimPercent(dim) {
  return resultData.dimension_percent ? (resultData.dimension_percent[dim] || 0) : 0
}

function fieldMatchPercent(fieldKey) {
  return resultData.field_match_percent ? (resultData.field_match_percent[fieldKey] || 0) : 0
}

const dimensionsDisplay = {
  R: { name: 'واقعي تقني', icon: '🛠️', gradient: 'linear-gradient(90deg, #64748B, #94A3B8)', delay: '0.1s' },
  I: { name: 'تحليلي بحثي', icon: '🔬', gradient: 'linear-gradient(90deg, #4338CA, #6366F1)', delay: '0.2s' },
  A: { name: 'إبداعي فني', icon: '🎨', gradient: 'linear-gradient(90deg, #F472B6, #FBCFE8)', delay: '0.3s' },
  S: { name: 'اجتماعي مساعد', icon: '🤝', gradient: 'linear-gradient(90deg, #059669, #34D399)', delay: '0.4s' },
  E: { name: 'قيادي ريادي', icon: '🚀', gradient: 'linear-gradient(90deg, #4F46E5, #818CF8)', delay: '0.5s' },
  C: { name: 'دقيق منظم', icon: '📋', gradient: 'linear-gradient(90deg, #0284C7, #38BDF8)', delay: '0.6s' }
}

const fieldsData = computed(() => {
  const updatedFields = { ...JORDANIAN_FIELDS };
  if(updatedFields.Health) updatedFields.Health.color = '#3b82f6';
  if(updatedFields.EngineeringIT) updatedFields.EngineeringIT.color = '#4f46e5';
  if(updatedFields.Humanities) updatedFields.Humanities.color = '#8b5cf6';
  if(updatedFields.Business) updatedFields.Business.color = '#0ea5e9';
  return updatedFields;
})

const personalityTraits = computed(() => {
  const top2 = riasecCode.value.slice(0, 2).split('')
  const traitMap = {
    R: [{ icon: '⚙️', label: 'عملي وميداني', bg: '#f1f5f9', border: '#cbd5e1', color: '#334155' }],
    I: [{ icon: '🕵️', label: 'فضولي تحليلي', bg: '#eef2ff', border: '#c7d2fe', color: '#4338ca' }],
    A: [{ icon: '✨', label: 'مبدع تعبيري', bg: '#fdf2f8', border: '#fbcfe8', color: '#be185d' }],
    S: [{ icon: '❤️', label: 'متعاطف ومتفهم', bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d' }],
    E: [{ icon: '🏆', label: 'قيادي طموح', bg: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8' }],
    C: [{ icon: '📊', label: 'منظم ومنهجي', bg: '#f0f9ff', border: '#bae6fd', color: '#0c4a6e' }]
  }
  let traits = []
  top2.forEach(d => { if (traitMap[d]) traits.push(...traitMap[d]) })
  return traits.slice(0, 4)
})

const personalitySummary = computed(() => {
  const code2 = riasecCode.value.slice(0, 2)
  const summaries = {
    RI: 'أنت شخصية عملية تحليلية، تحول الأفكار المعقدة إلى نتائج ملموسة. تجمع بين الدقة التقنية والتحليل العميق.',
    IR: 'ذهنك تحليلي بطبيعته، تميل لحل المشكلات الهندسية والعلمية المعقدة بمنهجية واضحة ومثبتة.',
    IA: 'مزيج نادر من التحليل والإبداع؛ تستطيع إيجاد حلول مبتكرة خارج الصندوق للمشكلات العلمية.',
    IS: 'عقل تحليلي بقلب إنساني؛ تسعى لتطبيق معرفتك العلمية في خدمة الناس وتحسين حياتهم.',
    AI: 'مبدع بأساس علمي؛ أفكارك الفنية مدعومة بمنطق قوي، مما يجعلك مميزاً في مجالات التصميم والطب.',
    AS: 'مبدع اجتماعي؛ تعبر عن أفكارك بطرق تلمس الآخرين، وتبدع في الإعلام والتعليم الحديث.',
    AE: 'قائد مبدع؛ طاقتك الإبداعية مقرونة بطموح قيادي، مما يجعلك ناجحاً في ريادة المشاريع الثقافية.',
    SA: 'إنسان مبدع يضع الناس في المقدمة؛ تجيد خدمة الآخرين بطرق ابتكارية وغير تقليدية.',
    SE: 'شخصية اجتماعية قيادية؛ تلهم الآخرين وتحفزهم، وتبدع في قيادة المجموعات نحو أهداف مشتركة.',
    SC: 'خادم منظم؛ تدعم الآخرين بأسلوب منهجي ومدروس، مما يجعلك مثالياً للإدارة الصحية والتعليمية.',
    EI: 'قائد تحليلي؛ تتخذ قراراتك بناءً على بيانات وأدلة، وتناسبك الإدارة الاستراتيجية التكنولوجية.',
    EA: 'قائد مبدع؛ تلهم فريقك بأفكار جديدة وتحولها لمشاريع ناجحة، بيئتك المثالية هي التسويق الريادي.',
    EC: 'قائد منظم؛ تجمع بين الطموح والانضباط، وتجيد إدارة الشركات وضمان أعلى معايير الجودة.',
    CI: 'دقيق تحليلي؛ تتقن العمل مع البيانات الكبيرة وتستخلص منها رؤى قيمة تدعم القرار الذكي.',
    CE: 'منظم طموح؛ تجيد إنجاز الأهداف بكفاءة عالية، وتبرع في مجالات المحاسبة وإدارة المشاريع.',
    CS: 'دقيق خادم؛ تتقن تنظيم البيانات وتضعها في خدمة الآخرين، وتناسبك الإدارة الصحية المعلوماتية.'
  }
  return summaries[code2] || 'شخصيتك تجمع أبعاداً متنوعة تتيح لك النجاح في عدة مجالات متداخلة.'
})

function goImprovement() {
  router.push({ path: '/grades-input', query: { field: topFieldKey.value } })
}
function retake() { 
  localStorage.removeItem('assessmentResult')
  router.push({ path: '/assessment' }) 
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
.font-sans { font-family: 'Tajawal', sans-serif; }

.anim-fade-up { animation: fadeUp 0.8s ease-out both; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes aura {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -30px) scale(1.1); }
}
.animate-aura { animation: aura 15s ease-in-out infinite; }
</style>