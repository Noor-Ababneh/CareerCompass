<template>
  <div class="min-h-screen bg-[#FDFCF9] font-sans selection:bg-amber-500 selection:text-white relative overflow-x-hidden" dir="rtl">
    
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-amber-400/10 blur-[120px] animate-aura"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-yellow-500/10 blur-[100px] animate-aura" style="animation-delay: -4s;"></div>
      <div class="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-amber-200/10 blur-[100px] animate-aura" style="animation-delay: -8s;"></div>
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(#d97706 1px, transparent 1px); background-size: 32px 32px;"></div>
    </div>

    <nav class="relative z-50 max-w-7xl mx-auto px-6 py-4 flex justify-between items-center border-b border-slate-200/50 backdrop-blur-md">
      <div class="flex items-center gap-3 cursor-pointer group" @click="$router.push('/')">
        <div class="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
          <span class="text-white text-xl">🧭</span>
        </div>
        <span class="text-2xl font-black text-slate-800">Career<span class="text-amber-500">Compass</span></span>
      </div>
      
      <div class="flex items-center gap-3">
        <button @click="goImprovement" class="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-md hover:-translate-y-0.5">
          خطة التطوير الأكاديمي
        </button>
        <button @click="retake" class="text-slate-500 hover:text-amber-600 font-bold text-sm transition-colors px-2">
          إعادة المقياس
        </button>
      </div>
    </nav>

    <main class="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-16">
      
      <section class="text-center mb-16 anim-fade-up">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border bg-white border-amber-200 text-amber-700 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          تم اكتمال التحليل المنهجي بنجاح
        </div>
        
        <h1 class="text-3xl md:text-5xl font-black text-slate-800 leading-tight mb-6">
          بناءً على ميولك، الحقل الأنسب لك هو <br>
          <span class="inline-block mt-4 px-6 py-2 rounded-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500 border-2 border-amber-200/50 shadow-sm bg-white/50">
             {{ topField.name }}
          </span>
        </h1>
        
        <p class="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          هذا التحليل مبني على تقييم {{ totalQuestions }} معياراً دولياً لمطابقة الأنماط المهنية مع النظام التعليمي الأردني المحدث لعام 2024-2025.
        </p>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        <div class="bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-xl shadow-amber-500/5 anim-fade-up" style="animation-delay: 0.2s;">
          <div class="flex justify-between items-start mb-10">
            <div>
              <h3 class="text-xl font-black text-slate-800 mb-1">توزيع الأبعاد الشخصية</h3>
              <p class="text-xs text-slate-400 font-bold tracking-wider uppercase">RIASEC Profile</p>
            </div>
            <div class="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg font-mono font-black tracking-[4px] border border-amber-200">
              {{ riasecCode }}
            </div>
          </div>

          <div class="space-y-6">
            <div v-for="(dim, key) in dimensionsDisplay" :key="key" class="space-y-2">
              <div class="flex justify-between items-center text-xs font-bold text-slate-600 px-1">
                <span class="flex items-center gap-2">{{ dim.icon }} {{ dim.name }}</span>
                <span class="text-amber-600">{{ dimPercent(key) }}%</span>
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

        <div class="bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-xl shadow-amber-500/5 anim-fade-up" style="animation-delay: 0.3s;">
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

          <div class="bg-amber-50/50 rounded-2xl p-6 border border-amber-100 mb-8">
            <p class="text-slate-700 text-sm leading-relaxed font-medium whitespace-pre-line">
              {{ personalitySummary }}
            </p>
          </div>

          <div class="space-y-4">
            <p class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">نسبة التوافق مع الحقول الأردنية</p>
            <div v-for="(f, key) in fieldsData" :key="key" class="flex items-center gap-4">
              <span class="text-base w-6 text-center">{{ f.icon }}</span>
              <div class="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full rounded-full opacity-80 transition-all duration-[1.2s]" 
                  :style="{ width: mounted ? fieldMatchPercent(key) + '%' : '0%', background: f.color }"></div>
              </div>
              <span class="text-[10px] font-black w-8 text-left" :style="{ color: f.color }">{{ fieldMatchPercent(key) }}%</span>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2 bg-white/80 backdrop-blur-xl border border-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-amber-500/10 anim-fade-up" style="animation-delay: 0.4s;">
          <div class="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-slate-100 pb-8">
            <div class="text-center md:text-right">
              <h3 class="text-2xl font-black text-slate-800 mb-2">أفضل 3 تخصصات مرشحة لك</h3>
              <p class="text-slate-500 font-medium">مرتبة حسب أعلى نسبة تطابق مع قدراتك المكتشفة</p>
            </div>
            <div class="px-6 py-2 rounded-2xl text-white font-black text-lg shadow-lg shadow-amber-500/20" :style="{ background: topField.color }">
               حقل {{ topField.name }}
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="(major, idx) in topMajors" :key="major.name" 
              class="relative bg-white border border-slate-100 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group overflow-hidden">
              
              <div class="absolute -top-4 -left-4 w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-2xl font-black text-slate-200 group-hover:text-amber-200 transition-colors">
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

                <h4 class="text-lg font-black text-slate-800 text-center mb-3 group-hover:text-amber-600 transition-colors">{{ major.name }}</h4>
                
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
            <button @click="goImprovement" class="group relative px-10 py-5 rounded-[2rem] font-black text-xl text-white transition-all shadow-xl hover:shadow-amber-500/30 hover:-translate-y-1 overflow-hidden" :style="{ background: topField.color }">
              <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              احسب علاماتي وابدأ خطة التطوير الأكاديمي ←
            </button>
          </div>
        </div>
      </div>

      <p class="text-center text-slate-400 text-xs font-bold tracking-widest uppercase">
        CareerCompass • دليلك الأكاديمي المعتمد • الأردن 2025
      </p>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// استيراد الثوابت والوظائف الحسابية من ملفك الأصلي 
import { riasecQuestions, JORDANIAN_FIELDS, computeFieldFromRIASEC, computeTopMajors } from '@/data/riasecQuestions'

const router = useRouter()
const route = useRoute()
const mounted = ref(false)

onMounted(() => {
  setTimeout(() => { mounted.value = true }, 100)
  window.scrollTo({ top: 0, behavior: 'instant' })
})

// جلب العلامات من الرابط (التي تم حسابها في صفحة الاختبار) 
const rawScores = JSON.parse(route.query.scores || '{"R":0,"I":0,"A":0,"S":0,"E":0,"C":0}')
const scores = ref(rawScores)

// ترتيب العلامات وتوليد كود RIASEC 
const sortedScores = computed(() => Object.entries(scores.value).sort((a, b) => b[1] - a[1]))
const riasecCode = computed(() => sortedScores.value.slice(0, 3).map(e => e[0]).join(''))

// تحديد الحقل الأكاديمي الأردني 
const topFieldKey = computed(() => computeFieldFromRIASEC(sortedScores.value))
const topField = computed(() => JORDANIAN_FIELDS[topFieldKey.value] || JORDANIAN_FIELDS.Business)
const totalQuestions = riasecQuestions.length

// وظائف حسابية للعرض البصري 
function dimPercent(dim) {
  const qs = riasecQuestions.filter(q => q.dimension === dim)
  const maxScore = qs.reduce((s, q) => s + 5 * (q.type === 'interest' ? 1.0 : q.type === 'aptitude' ? 1.5 : 1.2), 0)
  return maxScore > 0 ? Math.round((scores.value[dim] || 0) / maxScore * 100) : 0
}

function fieldMatchPercent(fieldKey) {
  const field = JORDANIAN_FIELDS[fieldKey]
  if (!field) return 0
  const chars = field.riasecCode.split('')
  const score = chars.reduce((s, d) => s + (scores.value[d] || 0), 0)
  const max = chars.reduce((sum, dim) => {
    const qs = riasecQuestions.filter(q => q.dimension === dim)
    return sum + qs.reduce((s, q) => s + 5 * (q.type === 'interest' ? 1.0 : q.type === 'aptitude' ? 1.5 : 1.2), 0)
  }, 0)
  return max > 0 ? Math.round(score / max * 100) : 0
}

// توليد أفضل 3 تخصصات بناءً على خوارزميتك 
const topMajors = computed(() => computeTopMajors(scores.value, topFieldKey.value))

// بيانات العرض للأبعاد والسمات الشخصية
const dimensionsDisplay = {
  R: { name: 'واقعي تقني', icon: '🛠️', gradient: 'linear-gradient(90deg, #f97316, #fb923c)', delay: '0.1s' },
  I: { name: 'تحليلي بحثي', icon: '🔬', gradient: 'linear-gradient(90deg, #6366f1, #818cf8)', delay: '0.2s' },
  A: { name: 'إبداعي فني', icon: '🎨', gradient: 'linear-gradient(90deg, #ec4899, #f472b6)', delay: '0.3s' },
  S: { name: 'اجتماعي مساعد', icon: '🤝', gradient: 'linear-gradient(90deg, #10b981, #34d399)', delay: '0.4s' },
  E: { name: 'قيادي ريادي', icon: '🚀', gradient: 'linear-gradient(90deg, #f59e0b, #fbbf24)', delay: '0.5s' },
  C: { name: 'دقيق منظم', icon: '📋', gradient: 'linear-gradient(90deg, #0ea5e9, #38bdf8)', delay: '0.6s' }
}

const fieldsData = computed(() => JORDANIAN_FIELDS)

const personalityTraits = computed(() => {
  const top2 = sortedScores.value.slice(0, 2).map(e => e[0])
  const traitMap = {
    R: [{ icon: '⚙️', label: 'عملي وميداني', bg: '#fff7ed', border: '#fed7aa', color: '#c2410c' }],
    I: [{ icon: '🕵️', label: 'فضولي تحليلي', bg: '#eef2ff', border: '#c7d2fe', color: '#4338ca' }],
    A: [{ icon: '✨', label: 'مبدع تعبيري', bg: '#fdf4ff', border: '#e9d5ff', color: '#7e22ce' }],
    S: [{ icon: '❤️', label: 'متعاطف ومتفهم', bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d' }],
    E: [{ icon: '🏆', label: 'قيادي طموح', bg: '#fffbeb', border: '#fde68a', color: '#92400E' }],
    C: [{ icon: '📊', label: 'منظم ومنهجي', bg: '#f0f9ff', border: '#bae6fd', color: '#0c4a6e' }]
  }
  let traits = []
  top2.forEach(d => { if (traitMap[d]) traits.push(...traitMap[d]) })
  return traits.slice(0, 4)
})

const personalitySummary = computed(() => {
  const top = sortedScores.value[0][0]; const sec = sortedScores.value[1][0]
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
  return summaries[top + sec] || 'شخصيتك تجمع أبعاداً متنوعة تتيح لك النجاح في عدة مجالات متداخلة.'
})

function goImprovement() { 
  router.push({ 
    path: '/grades-input', 
    query: { field: topFieldKey.value } 
  }) 
}
function retake() { router.push({ path: '/assessment' }) }
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