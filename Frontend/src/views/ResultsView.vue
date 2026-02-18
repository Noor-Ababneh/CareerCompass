<template>
  <div class="min-h-screen bg-[#F8FAFC] text-slate-700 font-sans" dir="rtl">

    <nav class="print:hidden max-w-7xl mx-auto px-6 py-6 flex justify-between items-center sticky top-0 bg-[#F8FAFC]/90 backdrop-blur-md z-50">
      <div class="flex items-center gap-2">
        <span class="text-3xl">🧭</span>
        <span class="text-xl font-extrabold text-slate-800 tracking-tight">CareerCompass</span>
      </div>
      <div class="flex gap-3">
        <button @click="printReport" class="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-5 py-2.5 rounded-xl font-bold border border-indigo-200 transition text-sm flex items-center gap-2">
          <span>🖨️</span> حفظ التقرير
        </button>
        <button @click="$router.go(-1)" class="bg-white hover:bg-slate-50 text-slate-600 px-5 py-2.5 rounded-xl font-bold border border-slate-200 shadow-sm transition text-sm flex items-center gap-2">
          <span>➜</span> عودة
        </button>
      </div>
    </nav>

    <div class="max-w-6xl mx-auto px-6 pb-24 pt-8 print:p-0 print:max-w-none">

      <div v-if="source === 'grades'" class="animate-fade-in-up">
        
        <div class="text-center mb-14 print:mb-8">
          <div class="print:hidden inline-block px-5 py-2 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-4 border border-indigo-100 shadow-sm">
            {{ stage === 'junior' ? 'التحليل التشخيصي (تأسيس)' : 'تقرير الجاهزية الجامعية (توجيهي)' }}
          </div>
          <h1 class="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
            التحليل الأكاديمي لمسار <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 print:text-indigo-700">{{ getFieldName(field) }}</span>
          </h1>
          <p class="text-slate-500 max-w-3xl mx-auto font-medium text-lg leading-relaxed print:text-sm">
            تقرير تفصيلي يعتمد على معايير القبول الموحد الأردنية وتحليل الفجوات الأكاديمية الدقيق.
          </p>
        </div>

        <div class="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100 mb-12 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden print:border-2 print:shadow-none">
          <div class="absolute top-0 left-0 w-full h-3" :class="getGPAStatusColor(gpa)"></div>
          
          <div class="relative z-10 w-44 h-44 rounded-full border-[8px] flex items-center justify-center bg-white shadow-xl transform hover:scale-105 transition-transform duration-500 print:shadow-none"
               :class="getGPABorderColor(gpa)">
            <div class="text-center">
              <span class="text-6xl font-black text-slate-800 block tracking-tighter">{{ gpa }}%</span>
              <span class="text-sm font-bold text-slate-400 mt-1">المعدل العام</span>
            </div>
          </div>
          
          <div class="relative z-10 flex-1 text-center md:text-right">
            <h2 class="text-3xl font-black text-slate-900 mb-4 flex items-center justify-center md:justify-start gap-4">
              الوضع الأكاديمي: 
              <span class="text-lg px-5 py-2 rounded-xl text-white font-bold shadow-sm print:text-black print:bg-transparent print:border print:border-black" :class="getGPAStatusBg(gpa)">
                {{ getGPAStatusText(gpa) }}
              </span>
            </h2>
            <div class="space-y-3">
              <p class="text-slate-700 font-bold text-xl">
                {{ getGPASummaryTitle(gpa) }}
              </p>
              <p class="text-slate-500 leading-relaxed font-medium text-base border-r-4 border-slate-200 pr-4 print:text-sm">
                {{ getGPADetailedMessage(gpa, field) }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="stage === 'senior'" class="mb-20 animate-fade-in-up delay-100 break-inside-avoid">
           <div class="text-center mb-10 print:mb-5">
             <h3 class="text-2xl font-black text-slate-800 mb-2">🎓 التخصصات المرشحة لك (AI Ranking)</h3>
             <p class="text-slate-500 print:hidden">
               الترتيب يعتمد على: المعدل (45%) + قوة مواد التخصص (40%) + توافق الشخصية (15%).
             </p>
           </div>

           <div v-if="rankedMajors.length > 0" class="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
             <div v-for="(major, idx) in rankedMajors" :key="major.name" 
                  class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group print:border-2 print:shadow-none">
               
               <div class="absolute left-6 top-6 text-6xl font-black text-slate-100 -z-0 print:hidden opacity-50">{{ idx + 1 }}</div>

               <div class="relative z-10">
                 <div class="flex justify-between items-start mb-4">
                   <div>
                     <h3 class="text-xl font-bold text-slate-800 mb-1">{{ major.name }}</h3>
                     <span class="text-xs font-bold px-2 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
                       الحد الأدنى للقبول: {{ major.minGPA }}%
                     </span>
                   </div>
                   <div class="flex flex-col items-center">
                     <div class="w-14 h-14 rounded-full border-4 flex items-center justify-center font-bold text-sm bg-white"
                          :class="getScoreColor(major.finalScore)">
                       {{ major.finalScore }}%
                     </div>
                     <span class="text-[10px] font-bold mt-1 text-slate-400 print:hidden">الملاءمة</span>
                   </div>
                 </div>

                 <div class="w-full bg-slate-100 h-3 rounded-full mb-2 overflow-hidden print:border print:bg-white">
                   <div class="h-full rounded-full transition-all duration-1000 print:bg-black" 
                        :class="getProgressBarColor(major.finalScore)"
                        :style="{ width: major.finalScore + '%' }"></div>
                 </div>

                 <div class="mt-2 mb-5 flex justify-between items-center text-xs font-bold px-1">
                    <span class="text-slate-400">مستوى التوصية:</span>
                    <span :class="getConfidenceColor(major.confidence)">{{ major.confidence }}</span>
                 </div>

                 <div class="bg-slate-50 rounded-xl p-3 text-xs text-slate-500 font-medium grid grid-cols-3 gap-2 text-center print:bg-transparent print:border">
                   <div>
                     <span class="block font-bold text-slate-700 mb-1">المعدل</span>
                     {{ Math.round(major.scores.gpaScore) }}%
                   </div>
                   <div class="border-r border-l border-slate-200">
                     <span class="block font-bold text-slate-700 mb-1">المواد</span>
                     {{ Math.round(major.scores.subjectScore) }}%
                   </div>
                   <div>
                     <span class="block font-bold text-slate-700 mb-1">الشخصية</span>
                     {{ Math.round(major.scores.personalityMatch) }}%
                   </div>
                 </div>
               </div>
             </div>
           </div>
           
           <div v-else class="text-center bg-red-50 rounded-[2rem] p-10 border border-red-100 max-w-3xl mx-auto">
             <span class="text-6xl block mb-4">🛑</span>
             <h3 class="text-2xl font-black text-red-800 mb-3">عذراً، المعدل لا يسمح بالقبول الجامعي</h3>
             <p class="text-red-700/80 leading-relaxed text-lg">
               معدلك الحالي ({{ gpa }}%) أقل من الحد الأدنى المطلوب لتخصصات هذا المسار (الجامعات الخاصة تطلب 60% والحكومية 65-75%).
               <br/><br/>
               <strong>الخيار الأمثل الآن:</strong> التركيز الكامل على "خطة الإنقاذ" أدناه لرفع المعدل وتجاوز مرحلة الخطر، أو التفكير في برامج الدبلوم الشامل.
             </p>
           </div>
        </div>

        <div class="mb-16 break-before-page">
          <div class="flex items-center gap-3 mb-8">
            <div class="bg-blue-100 text-blue-700 p-3 rounded-xl text-xl">📊</div>
            <h3 class="text-2xl font-bold text-slate-800">التشخيص التفصيلي للمواد (تحليل الفجوات)</h3>
          </div>

          <div class="grid gap-8">
            <div v-for="(item, idx) in sortedImprovementPlan" :key="idx" 
                 class="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group print:break-inside-avoid print:border-2">
              
              <div class="absolute right-0 top-0 h-full w-2" :class="item.statusBg"></div>

              <div class="flex flex-col md:flex-row justify-between gap-6 mb-6 pr-6">
                <div>
                  <h4 class="text-3xl font-black text-slate-800 mb-2">{{ item.subject }}</h4>
                  <div class="flex items-center gap-3">
                    <span class="text-sm font-bold px-4 py-1.5 rounded-lg text-white shadow-sm print:text-black print:border" :class="item.statusBg">
                      {{ item.statusText }}
                    </span>
                    <span class="text-slate-500 font-mono text-sm font-bold bg-slate-100 px-3 py-1 rounded-lg">العلامة: {{ item.score }}%</span>
                  </div>
                </div>
                
                <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 md:max-w-md print:bg-transparent">
                  <p class="text-xs font-black text-slate-400 mb-2 uppercase tracking-wide flex items-center gap-1">🔗 الأهمية الجامعية والمهنية</p>
                  <p class="text-slate-700 text-sm font-bold leading-relaxed">{{ item.universityRelevance }}</p>
                </div>
              </div>
              
              <div class="grid md:grid-cols-2 gap-8 pr-6 border-t border-slate-100 pt-6">
                <div>
                  <p class="text-sm font-black text-slate-400 mb-3 uppercase tracking-wide flex items-center gap-1">🧐 التشخيص والهدف</p>
                  <div class="text-slate-700 font-medium leading-relaxed bg-slate-50/50 p-5 rounded-xl border border-slate-100 print:bg-transparent whitespace-pre-line">
                    {{ item.diagnosis }}
                  </div>
                </div>

                <div>
                  <p class="text-sm font-black text-slate-400 mb-3 uppercase tracking-wide flex items-center gap-1">🛠️ استراتيجيات المعالجة</p>
                  <ul class="space-y-3">
                    <li v-for="(step, i) in item.actionSteps" :key="i" class="flex items-start gap-3 text-sm text-slate-600 font-medium">
                      <span class="text-indigo-500 mt-1.5 text-xs">●</span> 
                      <span class="leading-relaxed">{{ step }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="mt-8 pt-6 border-t border-slate-100 pr-6 print:hidden">
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

      </div>

      <div v-else class="animate-fade-in-up">
        <div class="text-center mb-12">
          <span class="bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4 inline-block border border-purple-100">تحليل الشخصية المهنية (RIASEC)</span>
          <h1 class="text-3xl md:text-5xl font-black text-slate-900 mb-6">شخصيتك تميل لمسار <span class="text-indigo-600">{{ getFieldName(assessmentField) }}</span></h1>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">هذا التحليل مبني على ميولك الفطرية، مهاراتك المكتسبة، وبيئة العمل التي تفضلها.</p>
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

  <div v-if="learningPlan" class="max-w-6xl mx-auto px-6 pb-24 mt-8 print:mt-4 bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-sm relative overflow-hidden break-before-page" dir="rtl">
    <div class="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
    
    <h3 class="text-2xl font-black mb-10 relative z-10 flex items-center gap-3">
      <span class="bg-indigo-600 text-white p-2 rounded-lg text-xl">🚀</span>
      {{ learningPlan.title }}
    </h3>

    <div class="relative z-10 border-r-2 border-indigo-100 mr-4 space-y-12">
      <div v-for="(phase, idx) in learningPlan.phases" :key="idx" class="relative pr-8">
        <div class="absolute -right-[9px] top-0 w-4 h-4 bg-indigo-600 rounded-full ring-4 ring-indigo-50"></div>
        
        <h4 class="font-bold text-xl mb-4 text-indigo-900">{{ phase.name }}</h4>
        <div class="space-y-3">
          <div v-for="(step,i) in phase.steps" :key="i" class="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span class="text-indigo-500 mt-1 font-bold">✓</span>
            <span class="text-slate-700 font-medium leading-relaxed">{{ step }}</span>
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

/* =========================================
   1. DATABASE: University Relevance & Insights
   ========================================= */
const subjectDeepInsights = {
  math: {
    relevance: "الرياضيات هي 'لغة العلوم' الأساسية. في الجامعة، ستعتمد عليها مواد الفيزياء، الإحصاء، والتحليل المنطقي. ضعفها يعني تعثراً حتمياً في السنة الأولى.",
    rootCauses: ["فجوات تراكمية من صفوف سابقة (تاسع وعاشر).", "عدم الحل باليد والاعتماد على النظر.", "الخوف النفسي من المادة."],
    recoveryPlan: ["العودة لكتاب الصف التاسع والعاشر لترميم الأساسيات.", "تخصيص ساعة يومياً للحل اليدوي حصراً.", "الاستعانة بمدرس خصوصي فوراً لإنقاذ الموقف."]
  },
  math_adv: {
    relevance: "الرياضيات المتقدمة (علمي/صناعي) هي عصب تخصصات الهندسة والذكاء الاصطناعي. بدونها، لا يمكن فهم الخوارزميات أو التفاضل الجامعي (Calculus).",
    rootCauses: ["عدم استيعاب المفاهيم المجردة (Limits, Derivatives).", "ضعف في التأسيس الجبري."],
    recoveryPlan: ["التركيز المكثف على وحدة النهايات والتفاضل.", "حل مسائل سنوات سابقة بشكل يومي."]
  },
  math_biz: {
    relevance: "أساس المحاسبة والعلوم المالية. الضعف هنا يعني صعوبة في فهم القوائم المالية والاحتمالات في الجامعة.",
    rootCauses: ["عدم ربط الأرقام بالواقع التجاري.", "ضعف في العمليات الحسابية والنسب المئوية."],
    recoveryPlan: ["تقوية المهارات في النسب المئوية والكسور.", "فهم تطبيقات الرياضيات في الربح والخسارة."]
  },
  physics: {
    relevance: "الفيزياء هي أساس كل التخصصات الهندسية (مدني، ميكانيك، عمارة). تتطلب خيالاً علمياً وقدرة على تطبيق الرياضيات في الواقع.",
    rootCauses: ["حفظ القوانين دون فهم متى تستخدم.", "ضعف في تحليل الرسم البياني والمتجهات."],
    recoveryPlan: ["رسم كل مسألة قبل حلها (Free Body Diagram).", "فهم وحدات القياس واشتقاقها."]
  },
  chem: {
    relevance: "الكيمياء هي بوابة الطب، الصيدلة، والهندسة الكيميائية. تتطلب دقة وذاكرة قوية وربطاً للمعلومات.",
    rootCauses: ["نسيان الأساسيات (الجدول الدوري، التوزيع الإلكتروني).", "صعوبة في تخيل التفاعلات."],
    recoveryPlan: ["عمل ملخصات وخرائط ذهنية للتفاعلات.", "مراجعة أساسيات الروابط الكيميائية."]
  },
  bio: {
    relevance: "الأحياء هي العمود الفقري للطب والتمريض والعلوم الصحية. الجامعة تتطلب فهماً للعمليات الحيوية وليس مجرد حفظ.",
    rootCauses: ["الاعتماد على الحفظ الصم.", "عدم القدرة على ربط أجهزة الجسم ببعضها."],
    recoveryPlan: ["مشاهدة فيديوهات أنيميشن للعمليات الحيوية.", "ربط المعلومات بجسمك ووظائفه."]
  },
  eng_adv: {
    relevance: "اللغة الإنجليزية هي لغة العلم والعمل عالمياً. 90% من مراجع الجامعة في التخصصات العلمية والطبية تكون بالإنجليزية.",
    rootCauses: ["ضعف المخزون اللغوي.", "الخوف من الممارسة والكتابة."],
    recoveryPlan: ["قراءة نصوص قصيرة يومياً.", "حفظ 10 كلمات جديدة في جمل يومياً."]
  },
  arabic_spec: {
    relevance: "اللغة العربية (تخصص) هي أساس الحقوق، الإعلام، والشريعة. تتطلب تذوقاً أدبياً وقوة في النحو.",
    rootCauses: ["صعوبة في قواعد النحو والصرف.", "عدم فهم النصوص البلاغية."],
    recoveryPlan: ["التدرب اليومي على الإعراب.", "قراءة نصوص أدبية وتحليلها."]
  },
  islamic_spec: {
    relevance: "أساس كليات الشريعة والدراسات الإسلامية. تتطلب دقة في الحفظ وفهماً عميقاً للأحكام.",
    rootCauses: ["الخلط بين الأحكام الشرعية.", "ضعف في الحفظ."],
    recoveryPlan: ["التكرار المتباعد للحفظ.", "فهم أسباب النزول والمقاصد."]
  },
  finance: {
    relevance: "الثقافة المالية هي مدخل تخصصات الأعمال. الضعف فيها يعني عدم فهم للمصطلحات الاقتصادية الأساسية.",
    rootCauses: ["النظر للمادة على أنها حفظ فقط.", "عدم فهم المصطلحات البنكية."],
    recoveryPlan: ["قراءة أخبار اقتصادية مبسطة.", "ربط المادة بالواقع (البنوك، القروض)."]
  }
}

const resourcesDB = {
  'math': [ { name: 'قناة الأوائل (محمد صالح)', url: 'https://awa2el.net' }, { name: 'Khan Academy', url: 'https://ar.khanacademy.org' } ],
  'math_adv': [ { name: 'وتد (سامر رشاد)', url: 'https://watad.me' }, { name: 'أساسيات Calculus', url: '#' } ],
  'physics': [ { name: 'يوسف عودة', url: '#' }, { name: 'PhET Simulations', url: 'https://phet.colorado.edu/' } ],
  // ... (Add generalized resources for safety)
}

/* =========================================
   2. MAJORS DATABASE (Updated Thresholds)
   ========================================= */
const majorsDB = {
  Health: [
    { name: 'طب بشري', minGPA: 85, related: ['bio','chem'] },
    { name: 'طب أسنان', minGPA: 85, related: ['bio','chem'] },
    { name: 'دكتور صيدلة', minGPA: 80, related: ['chem','bio'] },
    { name: 'صيدلة', minGPA: 80, related: ['chem'] },
    { name: 'تمريض', minGPA: 70, related: ['bio'] },
    { name: 'علوم طبية مخبرية', minGPA: 70, related: ['bio','chem'] }
  ],
  Engineering: [
    { name: 'هندسة مدنية', minGPA: 80, related: ['math','physics'] },
    { name: 'هندسة عمارة', minGPA: 80, related: ['math','physics'] },
    { name: 'هندسة حاسوب', minGPA: 80, related: ['math','physics'] },
    { name: 'هندسة ميكاترونيكس', minGPA: 80, related: ['physics','math'] }
  ],
  IT: [
    { name: 'ذكاء اصطناعي (AI)', minGPA: 75, related: ['math_adv'] },  // Updated to 75
    { name: 'أمن سيبراني', minGPA: 75, related: ['math_adv'] },        // Updated to 75
    { name: 'علم بيانات', minGPA: 75, related: ['math_adv'] },         // Updated to 75
    { name: 'هندسة برمجيات', minGPA: 75, related: ['math_adv'] },      // Updated to 75
    { name: 'علم حاسوب (CS)', minGPA: 75, related: ['math_adv'] }      // Updated to 75
  ],
  Business: [
    { name: 'محاسبة', minGPA: 65, related: ['math_biz','finance'] },
    { name: 'إدارة أعمال', minGPA: 65, related: ['finance','eng_adv'] },
    { name: 'تسويق إلكتروني', minGPA: 65, related: ['finance'] }
  ],
  Law: [
    { name: 'حقوق', minGPA: 65, related: ['arabic_spec','eng_adv'] },
    { name: 'شريعة', minGPA: 65, related: ['islamic_spec','arabic_spec'] }
  ],
  Languages: [
    { name: 'لغة إنجليزية', minGPA: 65, related: ['eng_adv'] },
    { name: 'لغة عربية', minGPA: 65, related: ['arabic_spec'] },
    { name: 'ترجمة', minGPA: 65, related: ['eng_adv','arabic_spec'] }
  ]
}

/* =========================================
   3. SMART LOGIC & COMPUTED PROPERTIES
   ========================================= */

// --- A. Grade Logic & Analysis ---
function getGradeAnalysis(score, info) {
  let statusText, statusBg, diagnosis, actionSteps

  if (score < 50) {
    statusText = "راسب"; statusBg = "bg-red-600";
    diagnosis = `المستوى الحالي: ${score}% (راسب). \nالهدف العاجل: الوصول لعلامة النجاح (50%) ثم الانطلاق نحو القبول الجامعي (65%). \nبدون معالجة جذرية، القبول الجامعي مستحيل.`;
    actionSteps = generateDetailedPlan(score, info.recoveryPlan);
  } else if (score < 65) {
    statusText = "مقبول (ضعيف)"; statusBg = "bg-orange-500";
    diagnosis = `المستوى الحالي: ${score}%. \nأنت ناجح مدرسياً لكنك "غير منافس" جامعياً. \nالهدف: الوصول لـ 75% لفتح خيارات الجامعات الحكومية والخاصة.`;
    actionSteps = generateDetailedPlan(score, info.recoveryPlan);
  } else if (score < 80) {
    statusText = "جيد"; statusBg = "bg-yellow-500";
    diagnosis = `المستوى الحالي: ${score}%. \nوضعك جيد، لكن المنافسة على التخصصات القوية تتطلب 85%+. \nالهدف: كسر حاجز الـ 80% للحصول على أمان في القبول.`;
    actionSteps = generateDetailedPlan(score, info.recoveryPlan);
  } else if (score < 95) {
    statusText = "جيد جداً"; statusBg = "bg-blue-500";
    diagnosis = `المستوى الحالي: ${score}%. \nأداء ممتاز! أنت تنافس بقوة. \nالهدف: الوصول للامتياز (90+) لضمان المقعد الجامعي الأول.`;
    actionSteps = generateDetailedPlan(score, info.recoveryPlan); // Uses specialized steps inside
  } else {
    statusText = "امتياز 🌟"; statusBg = "bg-green-600";
    diagnosis = `المستوى الحالي: ${score}%. \nأداء نخبوك! \nالهدف: الحفاظ على القمة والتحضير للمنح الدراسية.`;
    actionSteps = ["حل أسئلة سنوات سابقة (مستويات عليا).", "مساعدة الزملاء (شرح المادة يثبت المعلومة).", "البدء بالاطلاع على كتب الجامعة."];
  }

  return { statusText, statusBg, diagnosis, actionSteps }
}

function generateDetailedPlan(score, specificRecovery) {
  if (score < 50) return ["تخصيص ساعتين يومياً لهذه المادة حصراً.", "الاستعانة بمدرس/منصة فوراً، الدراسة الذاتية قد لا تكفي.", "حل أسئلة الكتاب المدرسي (الأمثلة المحلولة) أولاً.", ...specificRecovery];
  if (score < 65) return ["حل 50 سؤال وزاري سابق.", "تلخيص القوانين/القواعد في ورقة واحدة.", "التركيز على الوحدات ذات الوزن الأعلى في العلامات.", "مراجعة أسبوعية للأخطاء."];
  if (score < 80) return ["حل أسئلة قدرات عليا.", "السرعة في الحل (تدريب تحت ضغط وقت).", "تقليل الأخطاء البسيطة (الإشارات، الحسابات)."];
  if (score < 95) return ["حل امتحانات كاملة في وقت قياسي.", "البحث عن التريكات في الأسئلة الوزارية الصعبة.", "عدم إهمال المراجعة الدورية."];
  return ["استمر على نفس النهج.", "مراجعة خفيفة لضمان عدم النسيان."];
}

// --- B. Improvement Plan List ---
const sortedImprovementPlan = computed(() => {
  if (source !== 'grades') return []
  let plan = []
  Object.entries(grades).forEach(([key, score]) => {
    // Default Fallback info
    let subjInfo = subjectDeepInsights[key] || { 
      relevance: "مادة داعمة.", 
      recoveryPlan: ["تنظيم الوقت.", "المتابعة اليومية."] 
    }
    
    let analysis = getGradeAnalysis(score, subjInfo)
    
    let resources = []
    for (const dbKey in resourcesDB) {
      if (key.includes(dbKey)) { resources = resourcesDB[dbKey]; break; }
    }
    if (resources.length === 0) resources = [{ name: 'موقع الأوائل', url: 'https://awa2el.net/' }]

    plan.push({
      subject: getSubjectName(key),
      score,
      universityRelevance: subjInfo.relevance,
      resources: resources,
      ...analysis
    })
  })
  return plan.sort((a, b) => a.score - b.score) // Sort by weakest first
})

// --- C. AI Recommendation Engine ---
function personalityScore(majorField) {
  // Logic: 100 if matches exactly, 50 if assessment exists but differs, 0 if no assessment
  if (!assessmentField) return 50 // Neutral start
  return assessmentField === majorField ? 100 : 40
}

const rankedMajors = computed(() => {
  if (!field) return []
  const list = majorsDB[field] || []
  if (!list.length) return []

  const personalityWeight = 0.15
  const gpaWeight = 0.45
  const subjectWeight = 0.40

  return list
    .map(major => {
      // Hard Filter: Don't show major if GPA is way too low (e.g. 10 marks below min)
      if (gpa < major.minGPA - 10) return null

      // GPA Score (0-100)
      const gpaScore = Math.max(0, Math.min(100, ((gpa - (major.minGPA - 5)) / 15) * 100))

      // Subject Score
      let subjectScore = 0
      if (major.related?.length) {
        const relevantGrades = major.related.map(sub => grades[sub] || 0)
        const avg = relevantGrades.reduce((a, b) => a + b, 0) / relevantGrades.length
        subjectScore = avg
      }

      // Personality Score
      const pScore = personalityScore(field)

      // Final Weighted Score
      const finalScore = (gpaScore * gpaWeight) + (subjectScore * subjectWeight) + (pScore * personalityWeight)

      // Confidence Label
      const confidence = finalScore > 85 ? "عالي جداً" : finalScore > 70 ? "عالي" : finalScore > 50 ? "متوسط" : "منخفض"

      return {
        ...major,
        finalScore: Math.round(finalScore),
        confidence,
        scores: {
          gpaScore: Math.round(gpaScore),
          subjectScore: Math.round(subjectScore),
          personalityMatch: pScore
        }
      }
    })
    .filter(Boolean)
    .sort((a, b) => b.finalScore - a.finalScore)
    .slice(0, 3) // Top 3
})

// --- D. Detailed Master Learning Plan (Roadmap) ---
const learningPlan = computed(() => {
  if (source !== 'grades') return null

  // Case 1: Fail (<50)
  if (gpa < 50) {
    return {
      title: "🚨 خطة الطوارئ والإنقاذ (Code Red)",
      phases: [
        { name: "المرحلة 1: وقف النزيف (أسبوع 1-4)", steps: ["الاعتراف بالمشكلة: معدلك الحالي (راسب).", "التركيز فقط على المواد التي رسبت بها.", "الدراسة مع معلم خصوصي أو منصة (الدراسة الذاتية لا تكفي الآن)."] },
        { name: "المرحلة 2: التأسيس (أسبوع 5-8)", steps: ["حل أسئلة الكتاب (الأمثلة والتمارين) لضمان علامة النجاح.", "عدم التفكير في المعدل العالي الآن، الهدف هو النجاح (50%)."] },
        { name: "المرحلة 3: النجاة (أسبوع 9-12)", steps: ["حل نماذج امتحانات سابقة لضمان كسر حاجز الـ 50%.", "النوم الجيد والابتعاد عن التوتر."] }
      ]
    }
  }

  // Case 2: Weak/College Level (50-64)
  if (gpa < 65) {
    return {
      title: "📈 خطة الهروب من منطقة الخطر (Target: 65%)",
      phases: [
        { name: "المرحلة 1: تحديد الأولويات", steps: ["تحديد المواد التي تسحب المعدل للأسفل.", "زيادة ساعات الدراسة إلى 4 ساعات يومياً صافية."] },
        { name: "المرحلة 2: البناء", steps: ["تلخيص القوانين والقواعد.", "حل 3 سنوات سابقة لكل مادة.", "ضمان عدم وجود أي مادة تحت الـ 60%."] }
      ]
    }
  }

  // Case 3: Good/Uni Acceptable (65-79)
  if (gpa < 80) {
    return {
      title: "🚀 خطة المنافسة ورفع المعدل (Target: 85%)",
      phases: [
        { name: "المرحلة 1: الإغلاق والثغرات", steps: ["تحديد نقاط الضعف الدقيقة في كل مادة.", "تحويل الدراسة من (فهم) إلى (حل مكثف)."] },
        { name: "المرحلة 2: السرعة والدقة", steps: ["التدرب على الحل تحت ضغط الوقت.", "تقليل الأخطاء الحسابية البسيطة."] }
      ]
    }
  }

  // Case 4: Excellent (80-94)
  if (gpa < 95) {
    return {
      title: "💎 خطة التميز (Target: 95+)",
      phases: [
        { name: "المرحلة 1: التفاصيل الدقيقة", steps: ["التركيز على الأسئلة التي تميز الطالب المتفوق.", "حل أسئلة من مناهج دولية أو خارجية (إثرائية)."] },
        { name: "المرحلة 2: العلامة الكاملة", steps: ["عدم القبول بأقل من العلامة الكاملة في التدريب.", "مراجعة شاملة وسريعة."] }
      ]
    }
  }

  // Case 5: Top Tier (95+)
  return {
    title: "👑 خطة الحفاظ على القمة والجاهزية الجامعية",
    phases: [
      { name: "المرحلة 1: الاستدامة", steps: ["الحفاظ على روتين الدراسة الحالي (لا تغير ما ينجح).", "الراحة النفسية والجسدية لضمان عدم الاحتراق (Burnout)."] },
      { name: "المرحلة 2: ما بعد التوجيهي", steps: ["البدء بقراءة مواد السنة الأولى للتخصص الجامعي.", "تطوير اللغة الإنجليزية الأكاديمية.", "البحث عن المنح الدراسية."] }
    ]
  }
})

const suggestedMajorsFromAssessment = computed(() => {
  return [] // Fallback
})

/* =========================================
   4. Helper Functions
   ========================================= */
function getSubjectName(k) {
  const map = { chem: 'كيمياء', bio: 'أحياء', math: 'رياضيات', physics: 'فيزياء', eng_adv: 'إنجليزي متقدم', math_adv: 'رياضيات متقدم', math_biz: 'رياضيات أعمال', finance: 'ثقافة مالية', arabic_spec: 'عربي تخصص', islamic_spec: 'علوم إسلامية' }
  return map[k] || k
}

function getFieldName(f) {
  const map = { 'Health': 'الفرع العلمي - الصحي', 'Engineering': 'الفرع العلمي - الهندسي', 'IT': 'العلوم والتكنولوجيا', 'Business': 'الأعمال', 'Law': 'القانون' }
  return map[f] || f
}

function getGPAStatusColor(g) { return g >= 85 ? 'bg-green-600' : g >= 75 ? 'bg-blue-500' : g >= 65 ? 'bg-yellow-500' : g >= 50 ? 'bg-orange-500' : 'bg-red-600' }
function getGPABorderColor(g) { return g >= 85 ? 'border-green-600' : g >= 75 ? 'border-blue-500' : g >= 65 ? 'border-yellow-500' : g >= 50 ? 'border-orange-500' : 'border-red-600' }
function getGPAStatusBg(g) { return getGPAStatusColor(g) }
function getGPAStatusText(g) { return g >= 85 ? 'امتياز 🌟' : g >= 75 ? 'جيد جداً 👍' : g >= 65 ? 'جيد' : g >= 50 ? 'مقبول (ضعيف)' : 'راسب ❌' }

function getGPASummaryTitle(g) {
  if (g < 50) return "وضع أكاديمي حرج (رسوب)"
  if (g < 65) return "ناجح مدرسياً / غير مؤهل جامعياً"
  if (g < 75) return "مؤهل للجامعات (تنافس متوسط)"
  if (g < 85) return "وضع تنافسي قوي"
  return "نخبة المتفوقين"
}

function getGPADetailedMessage(g, f) {
  if (g < 50) return "المعدل الحالي أقل من 50% ويعتبر رسوباً. يجب إعادة المواد فوراً."
  if (g < 65) return "المعدل الحالي يسمح بدخول كليات المجتمع (الدبلوم) أو الجامعات الخاصة بصعوبة. القبول الموحد الحكومي يتطلب 65%."
  if (f === 'Health' && g < 85) return "معدل جيد لكن تخصصات الطب تتطلب معدلات 95+، والصيدلة 80+."
  if (f === 'IT' && g < 75) return "أنت قريب من معدلات الـ IT (75%)، تحتاج رفعة بسيطة لضمان المقعد."
  return "معدلك يؤهلك لمجموعة ممتازة من التخصصات."
}

function getScoreColor(score) { return score >= 85 ? 'border-green-500 text-green-600' : score >= 70 ? 'border-blue-500 text-blue-600' : 'border-orange-500 text-orange-600' }
function getProgressBarColor(score) { return score >= 85 ? 'bg-green-500' : score >= 70 ? 'bg-blue-500' : 'bg-orange-500' }
function getConfidenceColor(c) { return c.includes('جداً') ? 'text-green-600' : c === 'عالي' ? 'text-blue-600' : 'text-orange-500' }

function printReport() { window.print() }
</script>

<style scoped>
.animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@media print {
  .print\:hidden { display: none !important; }
  .print\:border-2 { border-width: 2px !important; border-color: #e2e8f0 !important; }
  .print\:shadow-none { box-shadow: none !important; }
  .print\:bg-white { background-color: white !important; }
  .print\:text-black { color: black !important; }
  .print\:p-0 { padding: 0 !important; }
  .print\:max-w-none { max-width: none !important; }
  .break-before-page { break-before: page; }
  .break-inside-avoid { break-inside: avoid; }
}
</style>