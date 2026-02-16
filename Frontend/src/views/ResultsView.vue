<template>
  <div class="min-h-screen bg-[#F8FAFC] text-slate-700 font-sans" dir="rtl">

    <nav class="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center sticky top-0 bg-[#F8FAFC]/90 backdrop-blur-md z-50">
      <div class="flex items-center gap-2">
        <span class="text-3xl">🧭</span>
        <span class="text-xl font-extrabold text-slate-800 tracking-tight">CareerCompass</span>
      </div>
      <button @click="$router.go(-1)" class="bg-white hover:bg-slate-50 text-slate-600 px-6 py-2.5 rounded-xl font-bold border border-slate-200 shadow-sm transition text-sm flex items-center gap-2 group">
        <span class="text-lg group-hover:-translate-x-1 transition-transform">➜</span> العودة للسابق
      </button>
    </nav>

    <div class="max-w-6xl mx-auto px-6 pb-24 pt-8">

      <div v-if="source === 'grades'" class="animate-fade-in-up">
        
        <div class="text-center mb-14">
          <div class="inline-block px-5 py-2 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-4 border border-indigo-100 shadow-sm">
            {{ stage === 'junior' ? 'التقرير التشخيصي وخطة العمل' : 'تقرير الجاهزية الجامعية' }}
          </div>
          <h1 class="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
            التحليل الأكاديمي لمسار <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">{{ getFieldName(field) }}</span>
          </h1>
          <p class="text-slate-500 max-w-3xl mx-auto font-medium text-lg leading-relaxed">
            تحليل استراتيجي لمواطن القوة والضعف، مع خطوات عملية لرفع الأداء وضمان القبول الجامعي.
          </p>
        </div>

        <div class="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100 mb-12 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-2" :class="getGPAStatusColor(gpa)"></div>
          
          <div class="relative z-10 w-36 h-36 rounded-full border-[8px] flex items-center justify-center bg-white shadow-xl transform hover:scale-105 transition-transform duration-500"
               :class="getGPABorderColor(gpa)">
            <span class="text-5xl font-black text-slate-800">{{ gpa }}%</span>
          </div>
          
          <div class="relative z-10 flex-1 text-center md:text-right">
            <h2 class="text-2xl font-bold text-slate-900 mb-3 flex items-center justify-center md:justify-start gap-3">
              التقييم العام
              <span class="text-sm px-3 py-1 rounded-lg text-white font-bold" :class="getGPAStatusBg(gpa)">
                {{ getGPAStatusText(gpa) }}
              </span>
            </h2>
            <p class="text-slate-600 leading-loose font-medium text-lg border-r-4 border-slate-200 pr-4">
              {{ getGPADetailedMessage(gpa, field) }}
            </p>
          </div>
        </div>

        <div class="mb-16">
          <div class="flex items-center gap-3 mb-8">
            <div class="bg-blue-100 text-blue-700 p-3 rounded-xl text-xl">📊</div>
            <h3 class="text-2xl font-bold text-slate-800">التشخيص التفصيلي (الأولوية للأضعف)</h3>
          </div>

          <div class="grid gap-8">
            <div v-for="(item, idx) in sortedImprovementPlan" :key="idx" 
                 class="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              
              <div class="absolute right-0 top-0 h-full w-2" :class="item.statusBg"></div>

              <div class="flex flex-col md:flex-row justify-between gap-6 mb-6 pr-6">
                <div>
                  <h4 class="text-3xl font-black text-slate-800 mb-2">{{ item.subject }}</h4>
                  <div class="flex items-center gap-3">
                    <span class="text-sm font-bold px-3 py-1 rounded-lg text-white shadow-sm" :class="item.statusBg">
                      {{ item.statusText }}
                    </span>
                    <span class="text-slate-500 font-mono text-sm font-bold bg-slate-100 px-3 py-1 rounded-lg">العلامة: {{ item.score }}%</span>
                  </div>
                </div>
                
                <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 md:max-w-md">
                  <p class="text-xs font-black text-slate-400 mb-2 uppercase tracking-wide flex items-center gap-1">🔗 الأهمية الجامعية</p>
                  <p class="text-slate-700 text-sm font-bold leading-relaxed">{{ item.universityRelevance }}</p>
                </div>
              </div>
              
              <div class="grid md:grid-cols-2 gap-8 pr-6 border-t border-slate-100 pt-6">
                <div>
                  <p class="text-sm font-black text-slate-400 mb-3 uppercase tracking-wide flex items-center gap-1">🧐 التشخيص والتحليل</p>
                  <p class="text-slate-700 font-medium leading-relaxed bg-slate-50/50 p-5 rounded-xl border border-slate-100">
                    {{ item.diagnosis }}
                  </p>
                </div>

                <div>
                  <p class="text-sm font-black text-slate-400 mb-3 uppercase tracking-wide flex items-center gap-1">🛠️ خطوات عملية للتحسين</p>
                  <ul class="space-y-3">
                    <li v-for="(step, i) in item.actionSteps" :key="i" class="flex items-start gap-3 text-sm text-slate-600 font-medium">
                      <span class="text-indigo-500 mt-1.5 text-xs">●</span> 
                      <span class="leading-relaxed">{{ step }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="mt-8 pt-6 border-t border-slate-100 pr-6">
                <p class="text-xs font-black text-slate-400 mb-4 uppercase tracking-wide flex items-center gap-1">📚 مصادر مقترحة وموثوقة</p>
                <div class="flex flex-wrap gap-3">
                  <a v-for="res in item.resources" :key="res.name" :href="res.url" target="_blank" class="flex items-center gap-2 bg-white px-5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-indigo-600 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all shadow-sm hover:shadow-md group/link">
                    <span class="group-hover/link:scale-110 transition-transform">📺</span> {{ res.name }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="stage === 'senior'" class="animate-fade-in-up delay-100">
           <div v-if="gpa >= 60">
             <div class="text-center mb-10">
               <h3 class="text-2xl font-black text-slate-800 mb-2">🎓 التخصصات الجامعية المرشحة</h3>
               <p class="text-slate-500">خياراتك بناءً على معدلك التراكمي ({{ gpa }}%)</p>
             </div>
             <div class="grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
               <div v-for="major in suggestedMajors" :key="major" class="bg-white p-6 rounded-2xl border border-slate-100 flex items-center gap-5 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group">
                 <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">✓</div>
                 <span class="font-bold text-slate-700 text-lg">{{ major }}</span>
               </div>
             </div>
           </div>
           <div v-else class="text-center bg-red-50 rounded-[2rem] p-10 border border-red-100 max-w-3xl mx-auto">
             <span class="text-5xl block mb-4">🛑</span>
             <h3 class="text-2xl font-bold text-red-800 mb-3">تنبيه هام</h3>
             <p class="text-red-700/80 leading-relaxed">
               المعدل الحالي ({{ gpa }}%) يضعك في دائرة الخطر. القبول الجامعي يتطلب معدلاً لا يقل عن 60% (خاص) أو 65% (حكومي). 
               ننصحك بالتركيز الشديد على المواد التي تم تشخيصها كـ "نقاط ضعف" أعلاه وإعادتها لرفع المعدل.
             </p>
           </div>
        </div>

      </div>

      <div v-else class="animate-fade-in-up">
        <div class="text-center mb-12">
          <span class="bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4 inline-block border border-purple-100">
            تحليل الشخصية المهنية (RIASEC)
          </span>
          <h1 class="text-3xl md:text-5xl font-black text-slate-900 mb-6">
            شخصيتك تميل لمسار <span class="text-indigo-600">{{ getFieldName(assessmentField) }}</span>
          </h1>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">
            هذا التحليل مبني على ميولك الفطرية، مهاراتك المكتسبة، وبيئة العمل التي تفضلها.
          </p>
        </div>
         <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
             <div v-for="major in suggestedMajorsFromAssessment" :key="major" class="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:-translate-y-1 transition-transform">
               <h3 class="font-bold text-slate-800 text-lg mb-2">{{ major }}</h3>
               <span class="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">مطابق للشخصية</span>
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
const source = route.query.source || 'assessment'
const stage = route.query.stage
const field = route.query.field
const grades = JSON.parse(route.query.grades || '{}')
const gpa = parseFloat(route.query.gpa || 0)
const assessmentField = route.query.specificPath

// --- 1. قاعدة بيانات المصادر (Resources DB) ---
const resourcesDB = {
  'math': [ { name: 'قناة الأوائل (محمد صالح)', url: 'https://www.youtube.com/results?search_query=الاستاذ+محمد+صالح+رياضيات' }, { name: 'Khan Academy (تفاضل)', url: 'https://ar.khanacademy.org/math/calculus-1' } ],
  'math_adv': [ { name: 'CS50 بالعربي', url: 'https://www.youtube.com/results?search_query=cs50+arabic' }, { name: 'قناة وتد التعليمية', url: 'https://watad.me/' } ],
  'math_biz': [ { name: 'ماهر حداد (أدبي)', url: 'https://www.youtube.com/results?search_query=ماهر+حداد+رياضيات+ادبي' }, { name: 'جو أكاديمي', url: 'https://joacademy.com/' } ],
  'physics': [ { name: 'يوسف عودة (فيزياء)', url: 'https://www.youtube.com/results?search_query=الاستاذ+يوسف+عودة+فيزياء' }, { name: 'PhET تجارب', url: 'https://phet.colorado.edu/ar_SA' } ],
  'chem': [ { name: 'نضال الهندي', url: 'https://www.youtube.com/results?search_query=نضال+الهندي+كيمياء' }, { name: 'منهاجي', url: 'https://minhaji.net/' } ],
  'bio': [ { name: 'مصعب القطاوي', url: 'https://www.youtube.com/results?search_query=مصعب+القطاوي+احياء' }, { name: 'Medical Animations', url: 'https://www.youtube.com/results?search_query=biology+animation' } ],
  'eng_adv': [ { name: 'ZAmericanEnglish', url: 'https://zamericanenglish.net/' }, { name: 'شرح المنهاج', url: 'https://www.youtube.com/results?search_query=شرح+انجليزي+توجيهي+الاردن' } ],
  'arabic_spec': [ { name: 'ضياء أبو الرز', url: 'https://www.youtube.com/results?search_query=ضياء+ابو+الرز+عربي+تخصص' }, { name: 'شرح النحو', url: 'https://www.youtube.com/results?search_query=نحو+وصرف+توجيهي' } ],
  'islamic_spec': [ { name: 'العلوم الإسلامية (مكثف)', url: 'https://www.youtube.com/results?search_query=علوم+اسلامية+توجيهي' } ],
  'finance': [ { name: 'عمار حنون (ثقافة مالية)', url: 'https://www.youtube.com/results?search_query=عمار+حنون+ثقافة+مالية' } ]
}

// --- 2. التحليل المعمق (Detailed Subject Insights) ---
const subjectInsights = {
  'math': {
    relevance: 'الرياضيات هي اللغة الأساسية للهندسة والعلوم. الاعتماد عليها كلي في مواد التفاضل والتكامل (Calculus) الجامعية.',
    weakness: { diagnosis: 'يشير هذا المستوى إلى وجود فجوات في الأساسيات المفاهيمية (الجبر، الاقترانات). هذا سيشكل عائقاً كبيراً في السنة الأولى.', actions: ['حل مسائل سنوات سابقة يدوياً.', 'مراجعة قوانين المثلثات والأسس.', 'الاستعانة بمدرس لترميم الأساسيات فوراً.'] },
    strength: { diagnosis: 'تمتلك أساساً رياضياً متيناً وقدرة تحليلية عالية. هذا مؤشر ممتاز للنجاح في التخصصات الهندسية.', actions: ['تحدي نفسك بمسائل المستويات العليا.', 'الاطلاع على مفاهيم التفاضل الجامعي.'] }
  },
  'math_adv': { // للـ IT
    relevance: 'حجر الأساس للخوارزميات والذكاء الاصطناعي.',
    weakness: { diagnosis: 'الضعف هنا يعني صعوبة مستقبلية في فهم "المنطق البرمجي" وهيكلة البيانات.', actions: ['التركيز على فهم المنطق الرياضي (Logic).', 'حل مسائل احتمالات وتباديل.', 'التدرب على التفكير الخوارزمي.'] },
    strength: { diagnosis: 'أداء متميز يبشر بمستقبل واعد في البرمجة المتقدمة.', actions: ['تطبيق المفاهيم الرياضية برمجياً.', 'تعلم لغة بايثون بالتوازي.'] }
  },
  'math_biz': { // للأعمال
    relevance: 'ضرورية لمواد الإحصاء والمحاسبة والتمويل.',
    weakness: { diagnosis: 'قد تواجه صعوبة في تحليل البيانات المالية مستقبلاً.', actions: ['التركيز على الإحصاء والاحتمالات.', 'فهم تطبيقات الرياضيات في الربح والخسارة.'] },
    strength: { diagnosis: 'قدرة ممتازة على التعامل مع الأرقام التجارية.', actions: ['الاطلاع على مبادئ المحاسبة.', 'تعلم استخدام Excel المتقدم.'] }
  },
  'physics': {
    relevance: 'أساس الهندسة الميكانيكية والكهربائية.',
    weakness: { diagnosis: 'المشكلة غالباً في "تطبيق القانون" وليس حفظه. الفيزياء تتطلب تخيل المسألة.', actions: ['رسم مخطط للجسم الحر لكل مسألة.', 'فهم الوحدات واشتقاقها.', 'حل مسائل تعتمد على الفهم وليس التعويض.'] },
    strength: { diagnosis: 'لديك خيال علمي وقدرة على نمذجة المشكلات.', actions: ['مشاهدة وثائقيات هندسية.', 'البحث عن كيفية عمل المحركات.'] }
  },
  'chem': {
    relevance: 'أساس الصيدلة والطب والهندسة الكيميائية.',
    weakness: { diagnosis: 'الكيمياء مادة تراكمية. فقدان الأساسيات (الروابط، التوزيع الإلكتروني) يجعل فهم العضوية مستحيلاً.', actions: ['رسم خرائط ذهنية للتفاعلات.', 'حفظ المجموعات الوظيفية.', 'التدرب على موازنة المعادلات.'] },
    strength: { diagnosis: 'دقة ملاحظة وذاكرة قوية، مفتاح التميز الطبي.', actions: ['قراءة عن كيمياء الأدوية.', 'متابعة أحدث الاكتشافات الكيميائية.'] }
  },
  'bio': {
    relevance: 'العمود الفقري للطب والعلوم الحياتية.',
    weakness: { diagnosis: 'الاعتماد على الحفظ الصم دون تخيل العمليات الحيوية يؤدي لنسيان المعلومة.', actions: ['استخدام الرسومات والأنيميشن.', 'عمل ملخصات وجداول مقارنة.', 'ربط المعلومات بجسم الإنسان.'] },
    strength: { diagnosis: 'شغف وفهم عميق للأنظمة الحيوية.', actions: ['تعلم مصطلحات طبية.', 'قراءة مقالات بيولوجية.'] }
  },
  'eng_adv': {
    relevance: 'لغة العلم والبحث والعمل في الشركات العالمية.',
    weakness: { diagnosis: 'الضعف اللغوي سيشكل عائقاً في الجامعة لأن معظم المراجع بالإنجليزية.', actions: ['الاستماع يومياً لبودكاست إنجليزي.', 'قراءة مقالات قصيرة.', 'ممارسة الكتابة (Writing) وتصحيحها.'] },
    strength: { diagnosis: 'أداة قوية ستسهل عليك الدراسة الجامعية.', actions: ['قراءة كتب تخصصية بالإنجليزية.', 'مشاهدة محاضرات عالمية.'] }
  },
  'arabic_spec': {
    relevance: 'أساس تخصصات اللغة والشريعة والقانون.',
    weakness: { diagnosis: 'صعوبة في استيعاب القواعد النحوية والبلاغية.', actions: ['تلخيص القواعد في جداول.', 'التدرب على الإعراب يومياً.', 'قراءة نصوص أدبية وتحليلها.'] },
    strength: { diagnosis: 'ذائقة أدبية وتمكن لغوي رفيع.', actions: ['كتابة مقالات أو نصوص.', 'المشاركة في نوادي المناظرة.'] }
  },
  'islamic_spec': {
    relevance: 'أساس تخصصات الشريعة والفقه.',
    weakness: { diagnosis: 'الحاجة لمزيد من الدقة في حفظ النصوص والأحكام.', actions: ['التكرار المتباعد للحفظ.', 'فهم أسباب النزول والأحكام الشرعية.'] },
    strength: { diagnosis: 'فهم عميق ودقيق للمسائل الشرعية.', actions: ['التوسع في القراءة الفقهية.', 'متابعة القضايا المعاصرة.'] }
  },
  'finance': {
    relevance: 'أساس تخصصات العلوم المالية والمصرفية.',
    weakness: { diagnosis: 'عدم استيعاب المفاهيم المالية والمصرفية.', actions: ['ربط المادة بالواقع الاقتصادي.', 'حل مسائل الميزانيات.'] },
    strength: { diagnosis: 'وعي مالي واقتصادي ممتاز.', actions: ['قراءة أخبار اقتصادية.', 'تعلم مبادئ الاستثمار.'] }
  }
}

// --- 3. المنطق المتقدم للترتيب (Sorted Logic) ---
const sortedImprovementPlan = computed(() => {
  if (source !== 'grades') return []
  
  let plan = []
  Object.entries(grades).forEach(([key, score]) => {
    // جلب المعلومات من قاعدة البيانات أو استخدام الافتراضي
    let subjInfo = subjectInsights[key] || { 
      relevance: 'مادة داعمة للمعدل.', 
      weakness: { diagnosis: 'تحتاج لمزيد من الجهد والتركيز لرفع المعدل.', actions: ['مراجعة الكتاب المدرسي.', 'حل أسئلة إضافية.', 'تنظيم وقت الدراسة.'] }, 
      strength: { diagnosis: 'أداء جيد ومبشر.', actions: ['الاستمرار على هذا النهج.', 'مراجعة الملاحظات الدورية.'] }
    }

    let analysis = getGradeAnalysis(score, subjInfo)
    
    // البحث عن المصادر (Partial Match)
    let resources = []
    for (const dbKey in resourcesDB) {
      if (key.includes(dbKey)) {
        resources = resourcesDB[dbKey]
        break
      }
    }
    if (resources.length === 0) resources = [{ name: 'موقع الأوائل', url: 'https://awa2el.net/' }]

    plan.push({
      subject: getSubjectName(key),
      score: score,
      universityRelevance: subjInfo.relevance,
      resources: resources,
      ...analysis
    })
  })

  // الترتيب: العلامة الأقل أولاً
  return plan.sort((a, b) => a.score - b.score)
})

function getGradeAnalysis(score, info) {
  let statusText, statusBg, diagnosis, actionSteps

  if (score < 50) {
    statusText = 'وضع حرج / راسب'
    statusBg = 'bg-red-600'
    diagnosis = info.weakness.diagnosis + ' (ملاحظة: هذا المستوى يهدد فرصك بالنجاح، الأولوية القصوى للمعالجة).'
    actionSteps = ['مراجعة المعلم أو المرشد فوراً.', ...info.weakness.actions]
  } else if (score < 65) {
    statusText = 'ضعيف جداً'
    statusBg = 'bg-orange-600'
    diagnosis = info.weakness.diagnosis
    actionSteps = info.weakness.actions
  } else if (score < 80) {
    statusText = 'جيد / يحتاج دعم'
    statusBg = 'bg-yellow-500'
    diagnosis = info.weakness.diagnosis
    actionSteps = info.weakness.actions
  } else {
    statusText = 'ممتاز / نقطة قوة'
    statusBg = 'bg-green-500'
    diagnosis = info.strength.diagnosis
    actionSteps = info.strength.actions
  }

  return { statusText, statusBg, diagnosis, actionSteps }
}

// --- Visual Helpers ---
function getGPAStatusColor(g) {
  if (g >= 85) return 'bg-green-500'
  if (g >= 75) return 'bg-blue-500'
  if (g >= 60) return 'bg-yellow-500'
  if (g >= 50) return 'bg-orange-500'
  return 'bg-red-600'
}

function getGPABorderColor(g) {
  if (g >= 85) return 'border-green-100 text-green-700'
  if (g >= 75) return 'border-blue-100 text-blue-700'
  if (g >= 60) return 'border-yellow-100 text-yellow-700'
  if (g >= 50) return 'border-orange-100 text-orange-700'
  return 'border-red-100 text-red-700'
}

function getGPAStatusText(g) {
  if (g >= 85) return 'مستوى امتياز 🌟'
  if (g >= 75) return 'جيد جداً 👍'
  if (g >= 60) return 'متوسط 😐'
  if (g >= 50) return 'مقبول / حرج ⚠️'
  return 'تعثر أكاديمي 🛑'
}

function getGPAStatusBg(g) {
  if (g >= 85) return 'bg-green-500'
  if (g >= 75) return 'bg-blue-500'
  if (g >= 60) return 'bg-yellow-500'
  if (g >= 50) return 'bg-orange-500'
  return 'bg-red-600'
}

function getGPADetailedMessage(g, f) {
  if (g < 50) return 'المعدل الحالي يشير إلى تعثر أكاديمي. الأولوية القصوى هي النجاح في المواد الأساسية لتجنب الرسوب، ثم التفكير في التخصص.'
  
  if (g < 60) return 'المعدل في المنطقة الحرجة. القبول في الجامعات صعب جداً. ننصحك بالنظر في برامج الدبلوم التقني أو إعادة مواد لرفع المعدل.'

  if (f === 'Health') {
    if (g >= 94) return 'أداء نخبوك! تنافس بقوة على الطب البشري وطب الأسنان في الجامعات الحكومية.'
    if (g >= 85) return 'مستوى ممتاز. الصيدلة ودكتور صيدلة والتمريض خيارات مضمونة لك.'
    return 'معدل جيد للعلوم الطبية المساندة (أشعة، مختبرات) في الجامعات الحكومية أو الخاصة.'
  }
  
  if (f === 'Engineering') {
    if (g >= 88) return 'أداء هندسي رفيع. الهندسة المدنية والمعمارية في الجامعات الكبرى بانتظارك.'
    if (g >= 80) return 'مستوى قوي يؤهلك لدراسة الميكانيك، الكهرباء، والميكاترونيكس.'
    return 'يمكنك دراسة الهندسة في الجامعات الخاصة، أو التخصصات الهندسية التقنية.'
  }

  if (f === 'IT') {
    if (g >= 85) return 'أداء تقني عالي. نافس على مقاعد الذكاء الاصطناعي وعلم البيانات.'
    return 'معدل جيد جداً لعلم الحاسوب وهندسة البرمجيات. ركز على المهارة العملية.'
  }

  return 'أداء جيد يفتح لك خيارات متعددة. اختر التخصص الذي يلامس شغفك.'
}

const majorsDB = {
  'Health': ['طب بشري', 'طب أسنان', 'صيدلة', 'دكتور صيدلة', 'تمريض', 'علوم طبية مخبرية', 'علاج طبيعي'],
  'Engineering': ['هندسة مدنية', 'هندسة عمارة', 'هندسة ميكاترونيكس', 'هندسة حاسوب', 'هندسة صناعية'],
  'IT': ['علم حاسوب (CS)', 'هندسة برمجيات', 'ذكاء اصطناعي (AI)', 'أمن سيبراني', 'علم بيانات'],
  'Business': ['محاسبة', 'إدارة أعمال', 'تسويق رقمي', 'علوم مالية ومصرفية', 'نظم معلومات إدارية'],
  'Law': ['حقوق (قانون)', 'علوم سياسية', 'شريعة ودراسات إسلامية'],
  'Languages': ['لغة إنجليزية وآدابها', 'لغة عربية', 'لغات فرنسي/إسباني', 'ترجمة']
}

const suggestedMajors = computed(() => majorsDB[field] || [])
const suggestedMajorsFromAssessment = computed(() => majorsDB[assessmentField] || [])

function getFieldName(f) {
  const map = { 'Health': 'الفرع العلمي - الصحي', 'Engineering': 'الفرع العلمي - الهندسي', 'IT': 'العلوم والتكنولوجيا', 'Business': 'الأعمال', 'Law': 'القانون', 'Languages': 'اللغات' }
  return map[f] || f
}

function getSubjectName(k) {
  const map = { 
    chem: 'الكيمياء', bio: 'الأحياء', math: 'الرياضيات', physics: 'الفيزياء', 
    eng_adv: 'الغة الإنجليزية (متقدم)', math_adv: 'الرياضيات (متقدم)', math_biz: 'رياضيات الأعمال',
    finance: 'الثقافة المالية', arabic_spec: 'اللغة العربية (تخصص)', islamic_spec: 'العلوم الإسلامية'
  }
  return map[k] || k
}
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>