<template>
  <div class="min-h-screen font-sans bg-[#FDFCF9] selection:bg-amber-500 selection:text-white relative overflow-x-hidden" dir="rtl">
    
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-amber-400/10 blur-[120px] animate-aura"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[100px] animate-aura" style="animation-delay: -4s;"></div>
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(#d97706 1px, transparent 1px); background-size: 32px 32px;"></div>
    </div>

    <nav class="print:hidden relative z-50 max-w-6xl mx-auto px-6 py-4 flex justify-between items-center sticky top-0 bg-white/70 backdrop-blur-md border-b border-amber-200/30 shadow-sm rounded-b-2xl">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white text-sm shadow-md">🧭</div>
        <span class="font-black text-slate-700 tracking-tight">CareerCompass</span>
        <span class="text-[10px] bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold uppercase">Jordan 2025</span>
      </div>
      <div class="flex gap-2">
        <button @click="printReport" class="nav-btn flex items-center gap-1.5 hover:bg-amber-50">🖨️ حفظ التقرير</button>
        <button @click="$router.go(-1)" class="nav-btn-primary flex items-center gap-1.5">← تعديل العلامات</button>
      </div>
    </nav>

    <div class="relative z-10 max-w-6xl mx-auto px-5 pb-28 pt-8 print:p-4 print:max-w-none">
      
      <div v-if="source === 'grades'" class="space-y-10">

        <section class="anim-fade text-center">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5 border bg-white border-amber-200 text-amber-700 shadow-sm">
            <span>{{ stage === 'junior' ? '🌱 مرحلة التأسيس (9-11)' : '🎓 مرحلة التوجيهي (12)' }}</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-black text-slate-800 mb-3 leading-tight">
            تحليل جاهزية <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">{{ getFieldName(field) }}</span>
          </h1>
          <p class="text-slate-500 max-w-xl mx-auto text-base leading-relaxed font-medium">
            تقرير أكاديمي شامل يعتمد على معايير القبول الموحد الأردني — مصمم خصيصاً لوضعك.
          </p>
        </section>

        <section class="anim-fade-d1 bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] overflow-hidden relative shadow-xl shadow-amber-500/5">
          <div class="h-1.5 w-full" :class="gpaAccentBar"></div>
          <div class="p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
            <div class="relative shrink-0 transform hover:scale-105 transition-transform duration-500">
              <svg class="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" stroke-width="8"/>
                <circle cx="60" cy="60" r="50" fill="none" :stroke="gpaCircleColor" stroke-width="8"
                  stroke-linecap="round" :stroke-dasharray="314"
                  :stroke-dashoffset="314 - (314 * gpa / 100)"
                  style="transition: stroke-dashoffset 1.8s cubic-bezier(.16,1,.3,1)"/>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-4xl font-black text-slate-800">{{ gpa }}%</span>
                <span class="text-[10px] font-black text-slate-400 mt-1 text-center leading-tight uppercase">المعدل<br>التقريبي</span>
              </div>
            </div>

            <div class="flex-1 text-center md:text-right">
              <div class="flex flex-wrap items-center gap-3 mb-4 justify-center md:justify-start">
                <h2 class="text-2xl font-black text-slate-800">الوضع الأكاديمي:</h2>
                <span class="text-sm px-4 py-1.5 rounded-xl font-bold border-2" :class="gpaStatusBadge">{{ getGPAStatusText(gpa) }}</span>
              </div>
              <p class="font-black text-xl text-slate-700 mb-3">{{ getGPASummaryTitle(gpa) }}</p>
              <p class="text-slate-500 leading-relaxed border-r-4 border-amber-400/30 pr-5 text-base font-medium">{{ getGPADetailedMessage(gpa, field) }}</p>

              <div v-if="hasFailedSubject" class="mt-6 p-4 rounded-2xl bg-rose-50 border-2 border-rose-100 flex items-start gap-3">
                <span class="text-2xl">⚠️</span>
                <p class="text-sm text-rose-700 font-bold leading-relaxed text-right">
                  يوجد مادة راسبة — الرسوب في أي مادة أساسية قد يمنع القبول الجامعي بغض النظر عن المعدل العام.
                </p>
              </div>

              <div class="mt-8 grid grid-cols-3 gap-4">
                <div class="bg-white/50 border border-slate-100 p-3 rounded-2xl text-center shadow-sm">
                  <div class="text-xl font-black" :class="gpa >= privateMin ? 'text-emerald-500' : 'text-rose-400'">{{ gpa >= privateMin ? '✓' : '✗' }}</div>
                  <div class="text-[10px] text-slate-500 font-black mt-1">قبول خاص</div>
                  <div class="text-[10px] text-slate-400 font-bold">{{ privateMin }}%+</div>
                </div>
                <div class="bg-white/50 border border-slate-100 p-3 rounded-2xl text-center shadow-sm">
                  <div class="text-xl font-black" :class="gpa >= govMin ? 'text-emerald-500' : 'text-rose-400'">{{ gpa >= govMin ? '✓' : '✗' }}</div>
                  <div class="text-[10px] text-slate-500 font-black mt-1">قبول حكومي</div>
                  <div class="text-[10px] text-slate-400 font-bold">{{ govMin }}%+</div>
                </div>
                <div class="bg-white/50 border border-slate-100 p-3 rounded-2xl text-center shadow-sm">
                  <div class="text-xl font-black" :class="gpa >= competitiveMin ? 'text-emerald-500' : 'text-rose-400'">{{ gpa >= competitiveMin ? '✓' : '✗' }}</div>
                  <div class="text-[10px] text-slate-500 font-black mt-1">تخصصات منافسة</div>
                  <div class="text-[10px] text-slate-400 font-bold">{{ competitiveMin }}%+</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section v-if="stage === 'senior'" class="anim-fade-d2">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl shadow-sm border border-amber-200">🎯</div>
            <div>
              <h3 class="text-2xl font-black text-slate-800">التخصصات المتاحة في حقلك</h3>
              <p class="text-sm text-slate-500 font-medium">مرتبة حسب الحد الأدنى للقبول — يعتمد القبول الفعلي على التنافس</p>
            </div>
          </div>

          <div v-if="eligibleMajors.length > 0" class="space-y-3">
            <div v-for="(major, idx) in allFieldMajors" :key="major.name"
              class="bg-white border border-slate-100 rounded-2xl p-4 relative overflow-hidden transition-all duration-200 hover:shadow-md group">
              <div class="absolute top-0 right-0 bottom-0 w-1.5 rounded-r-full" :class="major.eligible ? 'bg-emerald-400' : 'bg-slate-300'"></div>
              
              <div class="flex items-center justify-between gap-4 pr-3">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0"
                    :class="major.eligible ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'">
                    {{ idx + 1 }}
                  </div>
                  <div class="min-w-0">
                    <h4 class="font-black text-slate-800 text-sm md:text-base leading-tight">{{ major.name }}</h4>
                    <div class="flex flex-wrap items-center gap-2 mt-1">
                      <span class="text-[10px] font-bold text-slate-500">حد القبول:</span>
                      <span class="text-xs font-black font-mono" :class="major.eligible ? 'text-emerald-600' : 'text-rose-500'">{{ major.minGPA }}%</span>
                      <span v-if="major.govMin" class="text-[10px] font-bold text-slate-400">(حكومي: {{ major.govMin }}%)</span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                  <div class="text-center">
                    <div class="text-[10px] font-bold text-slate-400 mb-0.5">فجوة المعدل</div>
                    <span v-if="major.eligible" class="text-xs font-black text-emerald-500">✓ مؤهل</span>
                    <span v-else class="text-xs font-black text-rose-400">+{{ major.minGPA - gpa }}% مطلوب</span>
                  </div>
                  <div class="w-16 h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-700"
                      :class="major.eligible ? 'bg-emerald-400' : 'bg-rose-400'"
                      :style="{width: Math.min(100, (gpa/major.minGPA)*100)+'%'}"></div>
                  </div>
                </div>
              </div>
              <div v-if="major.eligible && major.competitive" class="mt-2 pr-3 text-[10px] text-amber-600 font-bold flex items-center gap-1">
                <span>⚡</span> تخصص تنافسي — المعدل الفعلي للقبول عادةً أعلى من الحد الأدنى
              </div>
            </div>
          </div>

          <div v-else class="bg-white/80 backdrop-blur-md rounded-3xl p-8 text-center border border-slate-200">
            <span class="text-4xl block mb-3">📋</span>
            <h3 class="text-lg font-black text-slate-600 mb-2">معدل المواد الأساسية لحقلك غير كافٍ بعد للقبول الجامعي</h3>
            <p class="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
              معدلك الحالي ({{ gpa }}%) لا يصل للحد الأدنى. راجع خطة التطوير الأكاديمي أدناه للتحسين.
            </p>
          </div>
        </section>

        <section class="anim-fade-d2">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl shadow-sm border border-orange-200">🔬</div>
            <div>
              <h3 class="text-2xl font-black text-slate-800">التشخيص التفصيلي للمواد</h3>
              <p class="text-sm text-slate-500 font-medium">مرتبة من الأضعف للأقوى — تحليل الفجوة أكاديمياً</p>
            </div>
          </div>

          <div class="space-y-6">
            <div v-for="(item, idx) in sortedImprovementPlan" :key="idx"
              class="bg-white/80 backdrop-blur-lg border border-white rounded-[2rem] overflow-hidden relative shadow-lg shadow-amber-500/5 group transition-all duration-500 hover:-translate-y-1 print:break-inside-avoid">
              
              <div class="absolute right-0 top-0 bottom-0 w-2" :class="item.accentColor"></div>

              <div class="p-6 md:p-8 pr-8">
                <div class="flex flex-col md:flex-row justify-between gap-6 mb-6">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-3">
                      <span class="text-3xl drop-shadow-sm">{{ item.icon }}</span>
                      <h4 class="text-2xl font-black text-slate-800">{{ item.subject }}</h4>
                      <span class="text-[11px] font-black px-3 py-1 rounded-full text-white shadow-sm" :class="item.statusBg">{{ item.statusText }}</span>
                    </div>
                    <div class="flex flex-wrap items-center gap-3 font-bold">
                      <span class="bg-slate-50 px-3 py-1 rounded-xl border border-slate-200 font-mono text-slate-700 text-sm">{{ item.score }}%</span>
                      <span v-if="item.gapToTarget > 0" class="text-orange-600 text-xs">⚠️ تحتاج +{{ item.gapToTarget }}% للقبول</span>
                      <span v-else class="text-emerald-500 text-xs">✓ مستوى تنافسي ممتاز</span>
                    </div>
                  </div>
                  <div class="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center min-w-[100px] shadow-inner shrink-0">
                    <div class="text-3xl font-black mb-2" :class="item.scoreTextColor">{{ item.score }}%</div>
                    <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1">
                      <div class="h-full rounded-full transition-all duration-1000" :class="item.barColor" :style="{width: item.score + '%'}"></div>
                    </div>
                    <div class="text-[9px] font-black text-slate-400 uppercase tracking-widest">من 100</div>
                  </div>
                </div>

                <div class="bg-amber-50/30 rounded-2xl p-4 border border-amber-100/50 mb-5">
                  <div class="text-[10px] font-black text-amber-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">🏛️ الأهمية الجامعية</div>
                  <p class="text-slate-700 text-sm leading-relaxed font-medium">{{ item.universityRelevance }}</p>
                  <div v-if="item.jobImpact?.length" class="mt-3 flex flex-wrap gap-2">
                    <span v-for="job in item.jobImpact" :key="job" class="text-[10px] bg-white text-amber-700 border border-amber-200 px-2 py-1 rounded-lg font-bold">{{ job }}</span>
                  </div>
                </div>

                <div class="grid md:grid-cols-2 gap-5 mb-4">
                  <div>
                    <div class="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">🧐 التشخيص الأكاديمي</div>
                    <div class="bg-white rounded-xl p-4 border border-slate-100 text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-line shadow-sm">{{ item.diagnosis }}</div>
                    <div v-if="item.rootCauses?.length && item.score < 85" class="mt-3 space-y-1.5">
                      <div v-for="cause in item.rootCauses" :key="cause" class="flex items-start gap-2 text-xs text-orange-600 font-bold">
                        <span class="shrink-0 mt-0.5">●</span> {{ cause }}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div class="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">🛠️ الاستراتيجية المقترحة</div>
                    <div class="space-y-2">
                      <div v-for="(step, i) in item.actionSteps" :key="i"
                        class="flex items-start gap-3 p-3 rounded-xl border border-slate-50 bg-slate-50/50 hover:border-amber-200 transition-colors">
                        <span class="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5 border border-amber-200">{{ i+1 }}</span>
                        <span class="text-xs text-slate-700 leading-relaxed font-bold">{{ step }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="item.timelineWeeks" class="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-slate-500 shadow-sm mt-2">
                  ⏱️ الوقت المقدر للهدف: <span class="text-slate-700">{{ item.timelineWeeks }}</span>
                </div>
              </div>

              <div class="bg-slate-50/50 border-t border-slate-100 px-8 py-5 flex flex-wrap items-center gap-3 print:hidden">
                <span class="text-[10px] font-black text-slate-400 uppercase">📚 مصادر مجانية:</span>
                <a v-for="res in item.resources" :key="res.name" :href="res.url" target="_blank"
                  class="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:border-amber-400 hover:text-amber-600 text-xs font-black text-slate-600 transition-all shadow-sm">
                  <span>{{ res.icon }}</span> {{ res.name }}
                  <span class="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-400">{{ res.type }}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section v-if="learningPlan" class="anim-fade-d2 bg-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl text-white print:break-before-page">
          <div class="h-2 w-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600"></div>
          <div class="p-10 md:p-16">
            <div class="flex items-center gap-5 mb-12">
              <div class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl">📋</div>
              <div>
                <h3 class="text-2xl md:text-3xl font-black">{{ learningPlan.title }}</h3>
                <p class="text-amber-400 font-bold opacity-80 mt-1">{{ learningPlan.subtitle }}</p>
                <p v-if="learningPlan.note" class="text-xs text-orange-300 font-bold mt-2 bg-orange-900/30 px-3 py-1 rounded-lg inline-block border border-orange-500/30">{{ learningPlan.note }}</p>
              </div>
            </div>

            <div class="relative">
              <div class="absolute right-5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-amber-500/50 via-white/10 to-transparent"></div>
              <div class="space-y-10">
                <div v-for="(phase, idx) in learningPlan.phases" :key="idx" class="relative flex gap-8 group">
                  <div class="relative z-10 shrink-0">
                    <div class="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-black text-slate-900 shadow-xl group-hover:scale-110 transition-transform">{{ idx+1 }}</div>
                  </div>
                  <div class="flex-1 pb-2">
                    <div class="flex flex-wrap items-center gap-3 mb-4">
                      <h4 class="text-xl font-black text-white">{{ phase.name }}</h4>
                      <span v-if="phase.duration" class="text-[10px] bg-white/10 px-3 py-1 rounded-full font-black border border-white/10 tracking-widest">{{ phase.duration }}</span>
                      <span v-if="phase.target" class="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-black border border-emerald-500/20">🎯 {{ phase.target }}</span>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-4">
                      <div v-for="(step, i) in phase.steps" :key="i"
                        class="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-amber-500/50 transition-colors">
                        <span class="text-amber-500 mt-0.5">✓</span>
                        <span class="text-sm text-slate-300 leading-relaxed font-medium">{{ step }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-16 pt-8 border-t border-white/10 text-center">
              <p class="text-slate-400 italic text-sm md:text-base">"{{ learningPlan.quote }}"</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'

const route = useRoute()
onMounted(() => window.scrollTo({ top: 0, behavior: 'instant' }))

const source = route.query.source || 'grades'
const stage  = route.query.stage
const field  = route.query.field
const grades = JSON.parse(route.query.grades || '{}')
const gpa    = parseFloat(route.query.gpa || 0)

// قاعدة بيانات المواد الخاصة بك (كاملة 100%)
const subjectMeta = {
  math: {
    icon: '📐',
    universityRelevance: `الرياضيات هي "لغة العلوم" الأساسية. في الهندسة ستواجه حساب التفاضل والتكامل والجبر الخطي والمعادلات التفاضلية، وكلها تبني مباشرةً على ما تدرسه الآن. ضعف الرياضيات يعني تعثراً مؤكداً في السنة الأولى الجامعية. علاوةً على ذلك، اختبارات القدرات التنافسية الأردنية تعتمد عليها بشكل رئيسي.`,
    jobImpact: ['مهندس مدني', 'مهندس ميكانيكي', 'مهندس معماري', 'أخصائي إحصاء'],
    rootCauses: [
      'فجوات تراكمية من الصف التاسع والعاشر لم تُعالَج في الوقت المناسب',
      'الاعتماد على الحفظ البصري بدل التطبيق اليدوي والحل الفعلي',
      'خوف نفسي من المادة يُقلل التركيز ويولّد توقع الفشل'
    ],
    targets: { juniorMin: 65, seniorMin: 75 },
    planByLevel: {
      fail: [
        'ابدأ من كتاب الصف التاسع وأعد حل جميع الأمثلة المحلولة يدوياً قبل الانتقال للعاشر.',
        'ركّز على المعادلات الخطية والتربيعية أولاً — هي أساس كل وحدة أخرى.',
        'خصّص ساعتين يومياً للرياضيات فقط، بعيداً عن الهاتف تماماً.',
        'استعن بمعلم خصوصي مرة أسبوعياً على الأقل لتصحيح مسارك.',
        'حل 15 سؤالاً يومياً حتى لو بسيطة جداً — الثقة تبنى بالتراكم.',
        'استخدم Khan Academy العربي يومياً لمراجعة الأساسيات بالتدرج.'
      ],
      weak: [
        'حدّد الوحدات التي تسبب أكبر خسارة في الدرجات وابدأ منها.',
        'حل ورقة امتحان كاملة كل أسبوع ثم حلّل أخطاءك خطأً بخطأ.',
        'أعد ورقة قوانين مختصرة لكل وحدة وعلّقها أمامك أثناء الدراسة.',
        'تدرب على الحل بسرعة — لا تسمح لنفسك بأكثر من 3 دقائق لكل سؤال.',
        'شاهد قناة الأوائل على يوتيوب لكل وحدة تجدها صعبة.',
        'حل 3 سنوات وزارية سابقة بالتسلسل الزمني.'
      ],
      good: [
        'انتقل لحل 5 سنوات وزارية سابقة بشكل منتظم.',
        'ركّز على الأسئلة ذات الدرجات العالية في كل وحدة.',
        'ادخل على منصة وتد لشرح سامر رشاد للمواضيع المعقدة.',
        'راجع وحدة اللوغاريتم والمثلثات — هما مصدر الخسارة الرئيسي.',
        'تدرب على الأسئلة التحليلية التي تتطلب خطوات متعددة.'
      ],
      vgood: [
        'ركّز على الأسئلة عالية الصعوبة من سنوات 2020-2024.',
        'تدرب على الحل في 60% من الوقت المعطى لضمان فائض زمني في الامتحان.',
        'لا تهمل أي وحدة حتى لو تتقنها — خصّص لها مراجعة دورية خفيفة.',
        'حلّل أنماط الأسئلة الوزارية للخمس سنوات الأخيرة وحدّد التكرارات.',
        'ساعد زميلاً ضعيفاً — شرح المادة لغيرك يُرسّخها عندك.'
      ],
      excel: [
        'أنت في مستوى متميز — حافظ على روتينك الدراسي ولا تغير ما ينجح.',
        'ابدأ بتصفح مقدمة حساب التفاضل والتكامل من كانبشر أو Khan Academy استعداداً للجامعة.',
        'فكّر في المشاركة في مسابقات الرياضيات الأردنية أو الأولمبياد.',
        'خصّص وقتاً للراحة والرياضة — المحافظة على الصحة النفسية هي مهمتك الأولى الآن.'
      ]
    }
  },
  math_adv: {
    icon: '🔢',
    universityRelevance: `الرياضيات المتقدمة هي عصب تخصصات الهندسة والذكاء الاصطناعي وعلم البيانات. النهايات والمشتقات والتكاملات التي تدرسها الآن هي حرفياً مواد السنة الأولى الجامعية في كل جامعة أردنية. من يتقنها الآن يجد السنة الأولى مكرراً لما درس، ومن يضعف فيها يعاني في كل مادة علمية.`,
    jobImpact: ['مهندس برمجيات', 'مطور ذكاء اصطناعي', 'عالم بيانات', 'باحث جامعي'],
    rootCauses: [
      'صعوبة في المفاهيم المجردة كالنهايات — لأنها لا تُشاهَد في الحياة اليومية',
      'ضعف في التأسيس الجبري من مراحل سابقة يعيق فهم التفاضل',
      'عدم ربط الرياضيات بتطبيقاتها الحقيقية في الهندسة والتكنولوجيا'
    ],
    targets: { juniorMin: 70, seniorMin: 80 },
    planByLevel: {
      fail: [
        'ابدأ بمراجعة الجبر الأساسي من الصف العاشر — التفاضل يبني عليه مباشرة.',
        'تعلّم مفهوم النهايات (Limits) بمشاهدة شرح 3Blue1Brown أو Prof. Leonard على يوتيوب.',
        'لا تشتت نفسك — التزم بكتابك المدرسي فقط في هذه المرحلة.',
        'استعن بمعلم خصوصي متخصص في الرياضيات المتقدمة — الشرح المباشر ضروري هنا.',
        'حل التمارين يدوياً دون آلة حاسبة في البداية لبناء الفهم الحقيقي.'
      ],
      weak: [
        'وحدة التفاضل أولاً لأنها الأثقل وزناً — حل 50 مثالاً عليها قبل الانتقال.',
        'احفظ قواعد الاشتقاق الأساسية واستظهرها حتى تصبح تلقائية.',
        'ادخل على قناة وتد لسامر رشاد — شرحه لرياضيات التوجيهي من أفضل ما هو متاح.',
        'انتبه لأخطاء الإشارة والكسور — هي مصدر معظم الخسارة في الدرجات.',
        'حل 3 سنوات وزارية سابقة كاملة بتوقيت فعلي.'
      ],
      good: [
        'راجع وحدة التكامل ومجال الدوال بعمق — هما مصدر الأسئلة الصعبة.',
        'تدرب على المسائل التطبيقية (الحركة والمساحة) التي تجمع أكثر من وحدة.',
        'حل 5 سنوات وزارية مع تحليل مفصل لكل خطأ.',
        'ركّز على ربط التفاضل بالتكامل — الفهم التكاملي يميّزك في الامتحان.'
      ],
      vgood: [
        'حل الأسئلة الأصعب من سنوات 2019-2024 التي تتطلب خطوات متعددة.',
        'تدرب على تقليل الأخطاء الحسابية — هي الفارق بين 88% و95%.',
        'راجع الفصل الدراسي الأول بعمق إضافي لأن أسئلته شائعة في الامتحان.',
        'اعمل محاكاة للامتحان الكامل بوقت رسمي مرة أسبوعياً.'
      ],
      excel: [
        'أنت في مستوى استثنائي — حافظ على روتينك ولا تُرهق نفسك بمواد جديدة.',
        'يمكنك الاطلاع على مقدمة الجبر الخطي (Linear Algebra) كمتعة فكرية وتحضيراً للجامعة.',
        'فكّر في مسابقات الرياضيات الوطنية — هي ميزة تنافسية حقيقية في ملف القبول الجامعي.',
        'ساعد زملاءك في الرياضيات — الشرح يُعمّق فهمك ويبني علاقات مهنية مبكرة.'
      ]
    }
  },
  math_biz: {
    icon: '📊',
    universityRelevance: `رياضيات الأعمال هي أساس المحاسبة والمالية والاقتصاد. في الجامعة ستدرس "رياضيات مالية" و"إحصاء تطبيقي" تعتمد مباشرةً على النسب والمعادلات والمتسلسلات التي تدرسها الآن. ضعفها يعني صعوبة في فهم القوائم المالية وحساب الفوائد والاستهلاكات.`,
    jobImpact: ['محاسب قانوني', 'محلل مالي', 'مدير أعمال', 'مستشار اقتصادي'],
    rootCauses: [
      'عدم ربط الأرقام بسياقها التجاري الحقيقي (البنوك، الفوائد، التجارة)',
      'ضعف في العمليات الأساسية وخاصة النسب المئوية والكسور',
      'النظر للمادة كمجموعة معادلات للحفظ لا كأداة تحليل فعلية'
    ],
    targets: { juniorMin: 60, seniorMin: 65 },
    planByLevel: {
      fail: [
        'أتقن النسب المئوية والكسور أولاً — لا يمكن المضي قدماً بدونها.',
        'حل مسائل من الحياة اليومية: ما ربح التاجر؟ كم الفائدة السنوية؟',
        'استخدم Khan Academy قسم الرياضيات الأساسية ثم قسم المالية.',
        'استخدم تطبيق Photomath لفهم خطوات الحل تفصيلياً.',
        'خصّص نصف ساعة يومياً للحل اليدوي بلا آلة حاسبة.'
      ],
      weak: [
        'ركّز على وحدة الفائدة المركبة والبسيطة وافهمها تطبيقياً لا نظرياً.',
        'اعمل ملخصاً بالمعادلات الأساسية مع مثال مالي لكل معادلة.',
        'حل نماذج وزارية من 3 سنوات سابقة وحدّد الأسئلة المتكررة.',
        'اربط كل معادلة بمثال من السوق الأردني (البنوك، العقار).'
      ],
      good: [
        'تدرب على مسائل المتسلسلات في سياق الأعمال (القروض، الادخار).',
        'حل نماذج وزارية كاملة مع تحليل الأخطاء.',
        'ركّز على الأسئلة التحليلية التي تتطلب أكثر من خطوة واحدة.'
      ],
      vgood: [
        'اعمل على دقة الحل وتقليل الأخطاء الحسابية — هي مصدر الدرجات الضائعة.',
        'راجع جميع الوحدات مرة واحدة أسبوعياً للتثبيت.',
        'تدرب على أسئلة الحالة الدراسية (Case Study).'
      ],
      excel: [
        'أنت في مستوى ممتاز — حافظ على روتينك الدراسي.',
        'يمكنك الاطلاع على مقدمة الرياضيات المالية الجامعية كتحضير مبكر.',
        'استكشف منصة Coursera للمقدمة في المالية والاقتصاد (مجانية للمراجعة).'
      ]
    }
  },
  physics: {
    icon: '⚛️',
    universityRelevance: `الفيزياء هي "لغة الهندسة". في كل تخصص هندسي ستواجه مادة "فيزياء هندسية" في السنة الأولى تعتمد كلياً على ما تدرسه الآن. قوانين نيوتن والطاقة والكهرباء والحركة ستظهر في كل مادة هندسية لاحقة. ضعف الفيزياء المدرسية = تعثر مضمون في الجامعة.`,
    jobImpact: ['مهندس مدني', 'مهندس ميكانيكي', 'مهندس كهربائي', 'مهندس معماري'],
    rootCauses: [
      'حفظ القوانين دون فهم متى وكيف تُطبَّق في مسائل مختلفة',
      'ضعف في تحليل المتجهات إلى مركباتها الأفقية والعمودية',
      'عدم ربط القانون بالظاهرة الطبيعية الفعلية التي يصفها'
    ],
    targets: { juniorMin: 65, seniorMin: 75 },
    planByLevel: {
      fail: [
        'ابدأ بالميكانيك — قوانين نيوتن الثلاثة هي البداية الصحيحة لكل شيء.',
        'ارسم مخطط القوى (Free Body Diagram) لكل مسألة قبل كتابة أي معادلة.',
        'شاهد تجارب PhET التفاعلية المجانية لأي مفهوم لا تستطيع تخيله.',
        'افهم وحدات القياس وكيف تُشتَق — هذا يمنع أخطاء التحويل.',
        'شاهد قناة يوسف عودة على يوتيوب — شرحه للفيزياء الأردنية ممتاز.',
        'خصّص ساعة يومياً لحل مسائل من الكتاب يدوياً بلا مراجعة للحل.'
      ],
      weak: [
        'تعلّم تحليل المتجهات إلى مركبتيها الأفقية والعمودية — هذه المهارة الأساسية.',
        'ركّز على الميكانيك والكهرباء لأنهما الأثقل وزناً في الامتحان.',
        'حل مسائل متشابهة مع تغيير الأرقام فقط — هذا يُرسّخ الطريقة.',
        'شاهد قناة الأوائل لشرح الفيزياء الأردنية وحل النماذج الوزارية.',
        'حل 3 سنوات وزارية سابقة كاملة بتوقيت فعلي.'
      ],
      good: [
        'تدرب على المسائل متعددة الخطوات التي تجمع أكثر من قانون.',
        'راجع وحدة الكهرومغناطيسية بعمق — أسئلتها دقيقة ومتشعبة.',
        'حل 5 سنوات وزارية مع تحليل مفصل لكل خطأ.',
        'ركّز على صياغة الحل بشكل منطقي ومتسلسل — الدرجات تُمنح على الأسلوب أيضاً.'
      ],
      vgood: [
        'حل أسئلة صعوبة عالية من سنوات 2020-2024.',
        'ركّز على دقة التعبير الرياضي والتسلسل المنطقي في الحل.',
        'اعمل محاكاة للامتحان الكامل مرة أسبوعياً بوقت رسمي.'
      ],
      excel: [
        'أنت في مستوى ممتاز — حافظ على روتينك ولا تضغط على نفسك.',
        'يمكنك تصفح مقدمة الفيزياء الجامعية من كتاب Halliday & Resnick كتحضير مبكر.',
        'جرب حل بعض أسئلة Physics SAT كتحدٍّ شخصي — ليس للامتحان.'
      ]
    }
  },
  chem: {
    icon: '🧪',
    universityRelevance: `الكيمياء هي بوابة الطب والصيدلة والهندسة الكيميائية. في الطب وطب الأسنان ستدرس كيمياء عضوية وغير عضوية مكثفة جداً. في الصيدلة، كل دواء هو جزيء كيميائي تحتاج لفهمه على المستوى الذري. ضعف الكيمياء المدرسية يعني ضعفاً مباشراً في فهم الأدوية والجسم البشري.`,
    jobImpact: ['طبيب بشري', 'صيدلاني', 'مهندس كيميائي', 'باحث طبي'],
    rootCauses: [
      'نسيان الأساسيات (الجدول الدوري، التوزيع الإلكتروني، الروابط الكيميائية)',
      'صعوبة في تخيّل التفاعلات على المستوى الجزيئي غير المنظور',
      'الاعتماد على حفظ المعادلات دون فهم السبب الكيميائي وراءها'
    ],
    targets: { juniorMin: 70, seniorMin: 80 },
    planByLevel: {
      fail: [
        'احفظ الجدول الدوري: الدورات السبع والمجموعات الرئيسية — هذا شرط قبل أي شيء آخر.',
        'افهم الروابط الكيميائية (تساهمية/أيونية) بمشاهدة فيديو تفاعلي.',
        'اعمل ملخصاً لقوانين الغازات وتطبيقاتها في جدول واضح.',
        'استخدم Khan Academy قسم الكيمياء — شرحه بالعربي والإنجليزي.',
        'شاهد قناة الأوائل للكيمياء الأردنية على يوتيوب.',
        'لا تنتقل لوحدة جديدة قبل أن تحل جميع تمارين الوحدة الحالية.'
      ],
      weak: [
        'ركّز على موازنة المعادلات الكيميائية يومياً — لا تتجاوز يوماً بدون 10 مسائل.',
        'اعمل خرائط ذهنية تربط تفاعلات كل وحدة ببعضها.',
        'اعطِ حسابات الكيمياء (stoichiometry) أولوية قصوى — هي أثقل وزناً.',
        'شاهد قناة سامر عماد للكيمياء على يوتيوب.',
        'حل 3 سنوات وزارية سابقة مع تحليل أخطاء الحساب.'
      ],
      good: [
        'راجع الكيمياء العضوية وتسمية المركبات — أسئلتها دقيقة وتحتاج تركيزاً.',
        'حل نماذج وزارية كاملة بتوقيت فعلي.',
        'ركّز على وحدة التوازن الكيميائي — أسئلتها شائعة جداً.'
      ],
      vgood: [
        'تدرب على الأسئلة التحليلية التي تربط أكثر من مفهوم.',
        'راجع وحدة المحاليل والتوازن الكيميائي بعمق إضافي.',
        'حل أسئلة صعوبة عالية من سنوات 2020-2024.'
      ],
      excel: [
        'أنت في مستوى ممتاز — حافظ على هذا المستوى.',
        'يمكنك الاطلاع على مبادئ الكيمياء العضوية الجامعية (Organic Chemistry Basics).',
        'جرب تطبيق Chemist (محاكاة مختبر افتراضي) كمتعة علمية.'
      ]
    }
  },
  bio: {
    icon: '🧬',
    universityRelevance: `الأحياء هي العمود الفقري لكل العلوم الصحية. في الطب ستواجه علم التشريح والفسيولوجيا والميكروبيولوجيا — وكلها امتداد مباشر للأحياء المدرسية. الطالب الذي لا يفهم الخلية وأجهزة الجسم ووظائفها سيجد السنة الأولى في كلية الطب شبه مستحيلة.`,
    jobImpact: ['طبيب بشري', 'ممرض', 'تقني مخبري', 'باحث في الأحياء'],
    rootCauses: [
      'الاعتماد الكامل على الحفظ الصم دون فهم وظيفة كل عضو أو عملية',
      'عدم ربط أجهزة الجسم ببعضها (الجهاز الهضمي يؤثر على الدم وهكذا)',
      'نقص في التصور البصري للعمليات الحيوية الدقيقة كالانقسام والتنفس الخلوي'
    ],
    targets: { juniorMin: 70, seniorMin: 80 },
    planByLevel: {
      fail: [
        'ابدأ بوحدة الخلية وتعلّم الفرق الدقيق بين حقيقية وبدائية النواة.',
        'شاهد فيديوهات رسوم متحركة لعمليات التنفس الخلوي والبناء الضوئي.',
        'افهم الانقسام الخلوي (ميتوز/ميوز) بالرسم اليدوي — ارسمه 5 مرات.',
        'استخدم قناة Amoeba Sisters على يوتيوب (متاحة بالإنجليزي مع ترجمة).',
        'استخدم Khan Academy قسم الأحياء.',
        'اعمل ملخصات مرئية لكل وحدة قبل حفظها.'
      ],
      weak: [
        'أعد ملخصات مرئية (رسوم تخطيطية) لكل جهاز من أجهزة الجسم.',
        'ركّز على الجينيات لأنها الأثقل وزناً في الامتحان الوزاري.',
        'حل مسائل الجينيات (مربعات بونيت) يومياً حتى تصبح آلية.',
        'شاهد قناة الأوائل للأحياء الأردنية.',
        'حل 3 سنوات وزارية مع تحليل مفصل للأخطاء.'
      ],
      good: [
        'راجع جميع أجهزة جسم الإنسان ووظائفها المتداخلة.',
        'حل نماذج وزارية كاملة بتوقيت فعلي.',
        'ركّز على الفيروسات والبكتيريا — أسئلتها متكررة ودقيقة.'
      ],
      vgood: [
        'ادرس وحدة الفيروسات والبكتيريا بعمق — أسئلتها شائعة جداً.',
        'راجع التعابير العلمية المطلوبة في الإجابات — الصياغة مهمة.',
        'حل أسئلة صعوبة عالية من سنوات 2020-2024.'
      ],
      excel: [
        'أنت في مستوى ممتاز — حافظ على هذا المستوى.',
        'اطّلع على مقدمة التشريح والفسيولوجيا من OpenStax (مجانية تماماً).',
        'جرب تطبيق Visible Body لتصور التشريح ثلاثي الأبعاد — متعة حقيقية.'
      ]
    }
  },
  eng_adv: {
    icon: '📘',
    universityRelevance: `اللغة الإنجليزية هي لغة العلم والعمل والمعرفة. أكثر من 90% من المراجع الجامعية الطبية والهندسية والتكنولوجية باللغة الإنجليزية. مهندس أو طبيب بإنجليزي متقن يحصل على فرص توظيف وراتب أعلى بكثير. ضعفها يعني قطيعة شبه كاملة مع المعرفة العالمية.`,
    jobImpact: ['جميع التخصصات العلمية', 'الطب والهندسة', 'تكنولوجيا المعلومات', 'الأعمال الدولية'],
    rootCauses: [
      'محدودية المفردات (مخزون أقل من 2000 كلمة يكفي للبقاء لا للتفوق)',
      'الخوف من الخطأ يمنع الكتابة والتحدث الفعلي ويعيق التطور',
      'الاكتفاء بحفظ القواعد النحوية دون استخدام فعلي ومستمر'
    ],
    targets: { juniorMin: 60, seniorMin: 70 },
    planByLevel: {
      fail: [
        'احفظ 10 كلمات يومياً في جمل كاملة — وليس كلمات معزولة من القاموس.',
        'اقرأ نصاً إنجليزياً قصيراً يومياً من BBC Learning English.',
        'شاهد 20 دقيقة محتوى إنجليزي يومياً مع ترجمة (يوتيوب أو نتفليكس).',
        'افهم أزمنة Present Simple وPast Simple أولاً قبل باقي الأزمنة.',
        'استخدم تطبيق Duolingo يومياً كتكملة لا كبديل عن الكتاب.',
        'استخدم تطبيق Anki لحفظ المفردات بنظام التكرار المتباعد.'
      ],
      weak: [
        'ركّز على Reading Comprehension وWriting — هما الأثقل وزناً في الامتحان.',
        'تعلّم كتابة فقرة وصفية وحجاجية بنية واضحة (مقدمة، جسم، خاتمة).',
        'حل نماذج وزارية سابقة لفهم نمط الأسئلة المتكررة.',
        'استخدم British Council Online للتمارين المجانية الهادفة.',
        'شاهد قناة "تعلم الإنجليزية بالعربي" على يوتيوب للقواعد المشكلة.'
      ],
      good: [
        'وسّع مفرداتك في مجال تخصصك (English for Science/Business/Medicine).',
        'تدرب على ترجمة نصوص تقنية من وإلى العربية.',
        'احسّن قواعد الجمل الشرطية (Conditionals) والمبني للمجهول (Passive Voice).',
        'شاهد محتوى إنجليزياً تقنياً بلا ترجمة 30 دقيقة يومياً.'
      ],
      vgood: [
        'اقرأ مقالات علمية بسيطة بالإنجليزية يومياً.',
        'تدرب على الكتابة الأكاديمية (IELTS Writing Task 2) لتطوير أسلوبك.',
        'حاول التحدث بالإنجليزية 10 دقائق يومياً مع نفسك أو تطبيق AI.'
      ],
      excel: [
        'أنت في مستوى ممتاز — الإنجليزي أصبح ميزتك التنافسية الفعلية.',
        'استهدف اختبار IELTS أو TOEFL — الشهادة تُفيدك في المنح الجامعية.',
        'ابدأ قراءة ملخصات كتب جامعية بالإنجليزية في مجال تخصصك المستهدف.'
      ]
    }
  },
  arabic_spec: {
    icon: '📖',
    universityRelevance: `اللغة العربية التخصصية هي أساس الحقوق والصحافة والشريعة والتعليم. في كلية الحقوق، تُصاغ القوانين والعقود بلغة فصحى دقيقة للغاية. في الصحافة، أسلوبك اللغوي هو هويتك المهنية. ضعف العربية يعني ضعف الشخصية المهنية كاملاً في هذه المجالات.`,
    jobImpact: ['محامٍ / قاضٍ', 'صحفي / إعلامي', 'معلم', 'مستشار قانوني'],
    rootCauses: [
      'صعوبة في قواعد النحو والإعراب وخاصةً الحالات الإعرابية المختلفة',
      'عدم التمييز بين الأساليب البلاغية المختلفة وتوظيفها الصحيح',
      'ضعف في الكتابة الإبداعية والتحليل الأدبي وليس في الحفظ فقط'
    ],
    targets: { juniorMin: 60, seniorMin: 65 },
    planByLevel: {
      fail: [
        'ابدأ بتعلّم الإعراب الأساسي: المبتدأ والخبر، الفاعل والمفعول به.',
        'اقرأ نصاً أدبياً قصيراً يومياً وحدّد فيه نوع الجملة (اسمية/فعلية).',
        'احفظ 5 أبيات شعرية أسبوعياً وافهم معناها الحقيقي.',
        'استخدم تطبيق "إعراب" لتعلّم قواعد النحو بشكل تفاعلي.',
        'شاهد قناة أدب عربي أو نحو وبلاغة على يوتيوب.',
        'اكتب فقرة يومياً بلغة فصحى حتى لو بسيطة — الممارسة أساسية.'
      ],
      weak: [
        'اعمل ملخصاً منظماً لقواعد النحو الأساسية في جدول مرتب.',
        'تدرب على تحليل النصوص: الفكرة الرئيسية، الأسلوب، الصور البلاغية.',
        'حل أسئلة وزارية سابقة في الإملاء والكتابة — ركّز على الأسئلة المتكررة.',
        'اقرأ نصوصاً من مجمع اللغة العربية أو موقع الأدب العربي يومياً لتطوير أسلوبك.',
        'حل 3 سنوات وزارية مع تحليل أخطاء النحو والإملاء.'
      ],
      good: [
        'ركّز على البلاغة: التشبيه والاستعارة والكناية وأساليب التأكيد.',
        'تدرب على كتابة المقالة والوصف بنية متكاملة.',
        'حل نماذج وزارية كاملة بتوقيت فعلي.'
      ],
      vgood: [
        'اقرأ نصوصاً من التراث الأدبي (المتنبي، طه حسين) لتعميق الأسلوب.',
        'تدرب على الإجابات الكاملة والمدعومة بالأدلة النصية.',
        'حل أسئلة صعوبة عالية من سنوات 2020-2024.'
      ],
      excel: [
        'أنت في مستوى ممتاز — طوّر أسلوبك الكتابي الخاص.',
        'اطلع على مقدمة النقد الأدبي أو اللسانيات كتوسعة فكرية.',
        'جرب كتابة مقالة رأي أو قصة قصيرة — هذه مهارة تُميّزك مهنياً.'
      ]
    }
  },
  islamic_spec: {
    icon: '🕌',
    universityRelevance: `علوم الشريعة هي أساس كليات الشريعة والقانون الإسلامي والدراسات الإسلامية. هذه الكليات تتطلب دقة متناهية في فهم الأحكام الفقهية وأسباب النزول وأصول التشريع الإسلامي. من يفهم "لماذا" الحكم يتفوق دائماً على من يحفظه فقط.`,
    jobImpact: ['قاضٍ شرعي', 'مستشار قانون إسلامي', 'معلم تربية إسلامية', 'داعية'],
    rootCauses: [
      'الخلط بين الأحكام الشرعية وأدلتها من القرآن والسنة',
      'ضعف في الربط بين الأحكام وسياقاتها الفقهية الأشمل',
      'عدم استيعاب الفقه بمقاصده الكلية الخمسة'
    ],
    targets: { juniorMin: 60, seniorMin: 65 },
    planByLevel: {
      fail: [
        'اعمل جدولاً واضحاً بالأحكام الأساسية وأدلتها من القرآن والسنة.',
        'افهم مقاصد الشريعة الخمسة (الدين، النفس، العقل، النسل، المال).',
        'استعن بمعلم ديني لفهم المسائل المعقدة قبل حفظها.',
        'استخدم موقع الدرر السنية للمراجعة والتثبيت.',
        'لا تنتقل لحكم جديد قبل أن تعرف دليله وسياقه.'
      ],
      weak: [
        'ركّز على أبواب العبادات أولاً (الطهارة، الصلاة، الزكاة) لأنها الأثقل.',
        'اربط كل حكم بدليله من القرآن أو السنة — الدليل يُثبّت الحكم.',
        'حل أسئلة وزارية سابقة وحدّد الأسئلة الأكثر تكراراً.',
        'اعمل ملخصاً منظماً لكل باب فقهي بشكل تدريجي.'
      ],
      good: [
        'ادرس باب المعاملات (البيع والإجارة والضمان) بعمق.',
        'ركّز على أسئلة الإجابة الكاملة التي تحتاج لشرح وتدليل.',
        'حل نماذج وزارية من 3 سنوات بتوقيت فعلي.'
      ],
      vgood: [
        'راجع الفقه المقارن وأدلة المذاهب في المسائل الخلافية.',
        'تدرب على صياغة الإجابات المفصلة المدعومة بالأدلة.',
        'حل أسئلة صعوبة عالية من السنوات الأخيرة.'
      ],
      excel: [
        'أنت في مستوى ممتاز — حافظ على هذا الأداء.',
        'اطلع على مبادئ أصول الفقه وتأثيرها في استنباط الأحكام.',
        'اقرأ في كتب الفقه المبسطة من المستوى الجامعي كتوسعة فكرية.'
      ]
    }
  },
  finance: {
    icon: '💰',
    universityRelevance: `الثقافة المالية هي مفتاح تخصصات الأعمال والمحاسبة والاقتصاد. في الجامعة ستدرس "مبادئ الاقتصاد" و"مبادئ المحاسبة" و"إدارة مالية" — وكلها تبني مباشرةً على ما تدرسه الآن. الطالب الذي يفهم الفائدة والسوق المالي والميزانية يجد الجامعة أسهل بكثير.`,
    jobImpact: ['محاسب قانوني', 'مستشار مالي', 'مصرفي', 'محلل اقتصادي'],
    rootCauses: [
      'النظر للمادة كتعريفات تُحفظ لا كظواهر اقتصادية تُفهَم',
      'عدم ربط المفاهيم بالواقع المعاش (البنوك، الأسعار، العرض والطلب)',
      'ضعف في المصطلحات المالية الأساسية التي تُبنى عليها كل المفاهيم اللاحقة'
    ],
    targets: { juniorMin: 60, seniorMin: 65 },
    planByLevel: {
      fail: [
        'افهم الفرق بين المصرف التجاري والمركزي بمثال من الأردن.',
        'تابع أخباراً اقتصادية مبسطة يومياً (BBC Arabic Business أو RT Arabic اقتصاد).',
        'افهم قانون العرض والطلب بمثال من السوق الأردني الفعلي.',
        'استخدم Khan Academy قسم الاقتصاد والمالية.',
        'اكتب تعريفاً بكلماتك الخاصة لكل مصطلح تتعلمه — هذا يُثبّت الفهم.'
      ],
      weak: [
        'ركّز على الوحدات الأثقل وزناً في الامتحان وابدأ منها.',
        'اعمل ملخصاً بالمصطلحات الأساسية وتعريفاتها الدقيقة مع مثال لكل منها.',
        'حل نماذج وزارية سابقة وحدّد الأسئلة المتكررة.',
        'اربط كل مفهوم بمثال من السوق الأردني أو الإقليمي.'
      ],
      good: [
        'تدرب على تحليل الحالات الدراسية التي تربط أكثر من مفهوم.',
        'حل نماذج وزارية كاملة بتوقيت فعلي.',
        'ركّز على وحدة أسواق الأوراق المالية والبورصة.'
      ],
      vgood: [
        'ادرس أسواق الأوراق المالية والبورصة والتداول بعمق.',
        'تدرب على الأسئلة التحليلية الصعبة.',
        'حل أسئلة صعوبة عالية من السنوات الأخيرة.'
      ],
      excel: [
        'أنت في مستوى ممتاز — حافظ على هذا الأداء.',
        'اطلع على مقدمة Microeconomics من MIT OpenCourseWare (مجانية تماماً).',
        'استكشف Coursera للمقدمة في المالية وإدارة الاستثمار.'
      ]
    }
  },
  cs: {
    icon: '💻',
    universityRelevance: `علوم الحاسوب هي حجر الأساس لتخصصات التكنولوجيا (IT, AI, Cybersecurity). البرمجة وتفكير الخوارزميات التي تدرسها الآن ستمنحك أفضلية كبرى في السنة الجامعية الأولى.`,
    jobImpact: ['مطور برمجيات', 'مهندس بيانات', 'مختص أمن سيبراني', 'محلل نظم'],
    rootCauses: [
      'التركيز على الحفظ النظري بدلاً من كتابة الكود الفعلي وتجربته.',
      'صعوبة في فهم التفكير المنطقي المتسلسل للخوارزميات.'
    ],
    targets: { juniorMin: 65, seniorMin: 75 },
    planByLevel: {
      fail: ['ركز على الأساسيات (المتغيرات، الجمل الشرطية، الحلقات).', 'اكتب كوداً بسيطاً كل يوم.'],
      weak: ['ارسم المخطط الانسيابي (Flowchart) قبل كتابة أي كود.', 'حل أخطاء برمجية جاهزة (Debugging).'],
      good: ['انتقل للمفاهيم المتقدمة كالمصفوفات (Arrays).', 'برمج مشروعاً مدرسياً متكاملاً.'],
      vgood: ['شارك في مسابقات البرمجة التنافسية (Competitive Programming).', 'استكشف لغات جديدة كـ Python.'],
      excel: ['مستواك جاهز للجامعة. ابدأ بالاطلاع على Data Structures & Algorithms.']
    }
  },
  mgmt: {
    icon: '💼',
    universityRelevance: `الإدارة والاقتصاد تبني العقلية القيادية لفهم سوق العمل والمؤسسات، وهي مقدمة أساسية لكليات الأعمال.`,
    jobImpact: ['مدير أعمال', 'مسؤول تسويق', 'رائد أعمال', 'محلل أعمال'],
    rootCauses: ['الاعتماد على التلقين دون ربط النظريات بواقع الشركات.'],
    targets: { juniorMin: 65, seniorMin: 70 },
    planByLevel: {
      fail: ['لخّص المفاهيم بكلماتك الخاصة واربطها بشركات أردنية معروفة.'],
      weak: ['حلل حالات دراسية (Case Studies) حقيقية.'],
      good: ['تابع أخبار الاقتصاد والأعمال واربطها بالمناهج.'],
      vgood: ['شارك في مسابقات ريادة الأعمال الطلابية.'],
      excel: ['مستواك قيادي وممتاز.']
    }
  },
  history: {
    icon: '🏛️',
    universityRelevance: `التاريخ يبني الوعي بالماضي لفهم الحاضر، وهو أساس للعلوم الإنسانية والسياسية.`,
    jobImpact: ['محلل سياسي', 'معلم', 'دبلوماسي'],
    rootCauses: ['الحفظ الأصم للتواريخ بدل فهم تسلسل وتأثير الأحداث.'],
    targets: { juniorMin: 60, seniorMin: 65 },
    planByLevel: {
      fail: ['استخدم الخرائط الذهنية والزمنية (Timelines).'],
      weak: ['اربط الأحداث بأسبابها ونتائجها.'],
      good: ['اقرأ عن الأحداث من مصادر تاريخية متعددة.'],
      vgood: ['ركز على التحليل والنقد التاريخي.'],
      excel: ['أداء استثنائي.']
    }
  },
  geo: {
    icon: '🌍',
    universityRelevance: `الجغرافيا الحديثة مرتبطة بالتخطيط البيئي، الاقتصاد، والسياسة المائية.`,
    jobImpact: ['مخطط استراتيجي', 'باحث بيئي', 'خبير نظم معلومات جغرافية GIS'],
    rootCauses: ['عدم القدرة على قراءة وتحليل الخرائط الجغرافية بشكل صحيح.'],
    targets: { juniorMin: 60, seniorMin: 65 },
    planByLevel: {
      fail: ['تدرب على قراءة الخرائط وتحديد المواقع الأساسية.'],
      weak: ['افهم العلاقة بين البيئة الجغرافية والموارد الاقتصادية.'],
      good: ['ركز على الجغرافيا السياسية والبيئية.'],
      vgood: ['استخدم تطبيقات الخرائط الحديثة كـ Google Earth.'],
      excel: ['أداء استثنائي وممتاز.']
    }
  }
}

// المصادر التعليمية (مكتملة 100%)
const resourcesDB = {
  math: [
    { name: 'قناة الأوائل', url: 'https://awa2el.net', icon: '📺', type: 'عربي' },
    { name: 'Khan Academy عربي', url: 'https://ar.khanacademy.org', icon: '🌐', type: 'مجاني' },
    { name: 'وتد — سامر رشاد', url: 'https://watad.me', icon: '📺', type: 'عربي' },
    { name: 'قناة رياضيات مع هشام', url: 'https://www.youtube.com/@HishamMaths', icon: '📺', type: 'عربي' },
    { name: 'Photomath', url: 'https://photomath.com', icon: '📱', type: 'تطبيق' }
  ],
  math_adv: [
    { name: 'وتد — سامر رشاد', url: 'https://watad.me', icon: '📺', type: 'عربي' },
    { name: '3Blue1Brown', url: 'https://www.3blue1brown.com', icon: '🎬', type: 'إنجليزي' },
    { name: 'Prof. Leonard', url: 'https://www.youtube.com/c/ProfessorLeonard', icon: '🎬', type: 'إنجليزي' },
    { name: 'Khan Academy عربي', url: 'https://ar.khanacademy.org', icon: '🌐', type: 'مجاني' }
  ],
  math_biz: [
    { name: 'قناة الأوائل', url: 'https://awa2el.net', icon: '📺', type: 'عربي' },
    { name: 'Khan Academy مالية', url: 'https://www.khanacademy.org/economics-finance-domain', icon: '🌐', type: 'مجاني' },
    { name: 'Coursera - Finance', url: 'https://www.coursera.org', icon: '🌐', type: 'دورة' }
  ],
  physics: [
    { name: 'قناة يوسف عودة', url: 'https://www.youtube.com/@yousufawdeh', icon: '📺', type: 'عربي' },
    { name: 'PhET Simulations', url: 'https://phet.colorado.edu', icon: '🔬', type: 'تفاعلي' },
    { name: 'Khan Academy Physics', url: 'https://www.khanacademy.org/science/physics', icon: '🌐', type: 'مجاني' }
  ],
  chem: [
    { name: 'قناة سامر عماد', url: 'https://www.youtube.com', icon: '📺', type: 'عربي' },
    { name: 'Khan Academy Chemistry', url: 'https://www.khanacademy.org/science/chemistry', icon: '🌐', type: 'مجاني' },
    { name: 'Ptable — الجدول الدوري', url: 'https://ptable.com', icon: '📱', type: 'أداة' }
  ],
  bio: [
    { name: 'قناة الأوائل أحياء', url: 'https://awa2el.net', icon: '📺', type: 'عربي' },
    { name: 'Amoeba Sisters', url: 'https://www.youtube.com/@AmoebaSisters', icon: '📺', type: 'رسوم' },
    { name: 'Visible Body App', url: 'https://www.visiblebody.com', icon: '📱', type: 'تطبيق' }
  ],
  eng_adv: [
    { name: 'BBC Learning English', url: 'https://www.bbc.co.uk/learningenglish', icon: '📻', type: 'مجاني' },
    { name: 'British Council Online', url: 'https://learnenglish.britishcouncil.org', icon: '🌐', type: 'مجاني' },
    { name: 'Duolingo', url: 'https://www.duolingo.com', icon: '📱', type: 'تطبيق' }
  ],
  arabic_spec: [
    { name: 'مجمع اللغة العربية الأردني', url: 'https://www.arabic.jo', icon: '🏛️', type: 'مرجع رسمي' },
    { name: 'تطبيق إعراب', url: 'https://play.google.com/store/apps/details?id=com.erbapp.errab', icon: '📱', type: 'تطبيق' }
  ],
  islamic_spec: [
    { name: 'موقع الدرر السنية', url: 'https://dorar.net', icon: '🌐', type: 'موسوعة' },
    { name: 'إسلام ويب', url: 'https://www.islamweb.net', icon: '🌐', type: 'مجاني' }
  ],
  finance: [
    { name: 'Khan Academy — اقتصاد', url: 'https://www.khanacademy.org/economics-finance-domain', icon: '🌐', type: 'مجاني' },
    { name: 'Investopedia', url: 'https://www.investopedia.com', icon: '🌐', type: 'مرجع' }
  ],
  cs: [
    { name: 'Code.org', url: 'https://code.org', icon: '💻', type: 'مجاني' },
    { name: 'W3Schools', url: 'https://w3schools.com', icon: '🌐', type: 'مرجع' }
  ],
  mgmt: [
    { name: 'إدراك - الإدارة', url: 'https://www.edraak.org', icon: '🌐', type: 'عربي' }
  ],
  history: [
    { name: 'منصة إدراك', url: 'https://www.edraak.org', icon: '📺', type: 'عربي' }
  ],
  geo: [
    { name: 'Google Earth', url: 'https://earth.google.com', icon: '🌍', type: 'أداة' }
  ]
}

// دمج التخصصات لـ 4 حقول أردنية جديدة
const majorsDB = {
  Health: [
    { name: 'طب بشري', minGPA: 85, govMin: 85 },
    { name: 'طب أسنان', minGPA: 85, govMin: 85 },
    { name: 'دكتور صيدلة (PharmD)', minGPA: 80, govMin: 80 },
    { name: 'صيدلة', minGPA: 78, govMin: 78 },
    { name: 'تمريض', minGPA: 65, govMin: 65 },
    { name: 'علوم طبية مخبرية', minGPA: 68, govMin: 68 },
  ],
  EngineeringIT: [
    { name: 'هندسة مدنية', minGPA: 80, govMin: 80, competitive: true },
    { name: 'هندسة عمارة', minGPA: 80, govMin: 80, competitive: true },
    { name: 'هندسة حاسوب', minGPA: 80, govMin: 80, competitive: true },
    { name: 'هندسة ميكاترونيكس', minGPA: 80, govMin: 80, competitive: true },
    { name: 'ذكاء اصطناعي (AI)', minGPA: 75, govMin: 75, competitive: true },
    { name: 'أمن سيبراني', minGPA: 75, govMin: 75, competitive: true },
    { name: 'علم بيانات (Data Science)', minGPA: 75, govMin: 75, competitive: true },
    { name: 'علم حاسوب (CS)', minGPA: 75, govMin: 75 },
    { name: 'نظم معلومات', minGPA: 65, govMin: 65 },
  ],
  Business: [
    { name: 'محاسبة', minGPA: 65, govMin: 65 },
    { name: 'إدارة أعمال', minGPA: 65, govMin: 65 },
    { name: 'تسويق رقمي', minGPA: 65, govMin: 65 },
    { name: 'اقتصاد', minGPA: 67, govMin: 67 },
    { name: 'مالية ومصرفية', minGPA: 67, govMin: 67 },
  ],
  Humanities: [
    { name: 'قانون (حقوق)', minGPA: 65, govMin: 65 },
    { name: 'شريعة إسلامية', minGPA: 65, govMin: 65 },
    { name: 'لغة إنجليزية وآدابها', minGPA: 65, govMin: 65 },
    { name: 'لغة عربية وآدابها', minGPA: 65, govMin: 65 },
    { name: 'ترجمة وتفسير', minGPA: 68, govMin: 68 },
  ]
}

function getFieldName(f) {
  const m = { Health: 'الحقل الصحي والطبي', EngineeringIT: 'الحقل الهندسي والتكنولوجي', Business: 'حقل إدارة الأعمال والمالية', Humanities: 'حقل العلوم الاجتماعية والإنسانية' }
  return m[f] || f
}

function getSubjectName(k) {
  const m = {
    chem: 'الكيمياء', bio: 'الأحياء', math: 'الرياضيات', physics: 'الفيزياء',
    eng_adv: 'اللغة الإنجليزية', math_adv: 'الرياضيات المتقدمة', cs: 'علوم الحاسوب',
    math_biz: 'رياضيات الأعمال', finance: 'الثقافة المالية', mgmt: 'الإدارة والاقتصاد',
    arabic_spec: 'عربي تخصص', history: 'التاريخ', geo: 'الجغرافيا', islamic_spec: 'علوم إسلامية'
  }
  return m[k] || k
}

function getLevel(score) {
  if (score < 50) return 'fail'
  if (score < 65) return 'weak'
  if (score < 80) return 'good'
  if (score < 93) return 'vgood'
  return 'excel'
}
function getSubjectTarget(key) { return subjectMeta[key]?.targets?.seniorMin || 65 }

function buildImprovementItem(key, score) {
  const meta = subjectMeta[key] || {}
  const level = getLevel(score)
  const target = getSubjectTarget(key)
  const gap = Math.max(0, target - score)
  const plan = meta.planByLevel?.[level] || ['راجع المادة يومياً.', 'حل أسئلة سابقة.', 'استعن بمعلم.']

  let diagnosis
  if (score >= 93) {
    diagnosis = `المستوى: ${score}% (امتياز ⭐)\nأداء استثنائي تماماً — أنت فعلاً في مستوى القمة.\nمهمتك الآن: الحفاظ على هذا المستوى وتجنب الإرهاق قبل الامتحان.`
  } else if (score >= 80) {
    diagnosis = `المستوى: ${score}% (جيد جداً)\nأداء قوي وتنافسي — أنت في المنطقة الآمنة.\nالهدف: الوصول لمستوى الامتياز (+٩٣%) لضمان أعلى الخيارات الجامعية.`
  } else if (score >= 65) {
    diagnosis = `المستوى: ${score}% (جيد)\nمؤهل للجامعات الخاصة، لكن تنافسيتك محدودة بعض الشيء.\nالهدف: تجاوز ٨٠% لفتح نطاق أوسع من التخصصات والجامعات.`
  } else if (score >= 50) {
    diagnosis = `المستوى: ${score}% (مقبول)\nناجح مدرسياً لكن غير مؤهل بعد للقبول الجامعي التنافسي.\nالهدف: تجاوز ${target}% كشرط أساسي للدخول للتخصصات المطلوبة.`
  } else {
    diagnosis = `المستوى: ${score}% (راسب)\nالوضع يحتاج تدخلاً فورياً وجدياً.\nالهدف العاجل: الوصول لعلامة النجاح (٥٠%) أولاً، ثم بناء من هناك.`
  }

  const colorMap = {
    fail:  { accent:'bg-rose-400', bar:'bg-rose-400', status:'bg-rose-500', statusText:'راسب', scoreText:'text-rose-500' },
    weak:  { accent:'bg-amber-400', bar:'bg-amber-400', status:'bg-amber-500', statusText:'مقبول', scoreText:'text-amber-600' },
    good:  { accent:'bg-yellow-400', bar:'bg-yellow-400', status:'bg-yellow-500', statusText:'جيد', scoreText:'text-yellow-600' },
    vgood: { accent:'bg-sky-400', bar:'bg-sky-400', status:'bg-sky-500', statusText:'جيد جداً', scoreText:'text-sky-600' },
    excel: { accent:'bg-emerald-400', bar:'bg-emerald-400', status:'bg-emerald-500', statusText:'امتياز', scoreText:'text-emerald-600' },
  }
  const timelineMap = { fail: '8-12 أسبوعاً للنجاح', weak: '6-8 أسابيع للقبول', good: '4-6 أسابيع للتنافس', vgood: '2-4 أسابيع للامتياز', excel: 'استدامة التميز' }
  const c = colorMap[level]

  return {
    subject: getSubjectName(key),
    icon: meta.icon || '📚',
    score,
    gapToTarget: gap,
    statusText: c.statusText,
    statusBg: c.status,
    accentColor: c.accent,
    barColor: c.bar,
    scoreTextColor: c.scoreText,
    universityRelevance: meta.universityRelevance || 'مادة داعمة مهمة لتخصصك الأكاديمي.',
    jobImpact: meta.jobImpact || [],
    diagnosis,
    rootCauses: meta.rootCauses || [],
    actionSteps: plan,
    timelineWeeks: timelineMap[level],
    resources: resourcesDB[key] || [{ name:'موقع الأوائل', url:'https://awa2el.net', icon:'📺', type:'عربي' }]
  }
}

const sortedImprovementPlan = computed(() => {
  if (source !== 'grades') return []
  return Object.entries(grades).map(([k, s]) => buildImprovementItem(k, Number(s))).sort((a, b) => a.score - b.score)
})

const privateMinByField = { Health: 65, EngineeringIT: 60, Business: 60, Humanities: 55 }
const govMinByField     = { Health: 65, EngineeringIT: 75, Business: 65, Humanities: 65 }
const competitiveByField= { Health: 85, EngineeringIT: 80, Business: 75, Humanities: 75 }

const privateMin     = privateMinByField[field]    || 60
const govMin         = govMinByField[field]        || 65
const competitiveMin = competitiveByField[field]   || 80
const hasFailedSubject = Object.values(grades).some(s => Number(s) < 50)

const allFieldMajors = computed(() => {
  return (majorsDB[field] || []).map(m => ({
    ...m,
    eligible: gpa >= m.minGPA,
    competitive: m.minGPA >= 80
  })).sort((a, b) => b.eligible - a.eligible || a.minGPA - b.minGPA)
})

const eligibleMajors = computed(() => allFieldMajors.value.filter(m => m.eligible))

// خطة التعلم الرئيسية (Learning Plan - كاملة من كودك)
const learningPlan = computed(() => {
  if (source !== 'grades') return null
  const weakSubjects = Object.entries(grades).filter(([,s]) => Number(s) < 65).map(([k]) => getSubjectName(k))
  const failedSubjects = Object.entries(grades).filter(([,s]) => Number(s) < 50).map(([k]) => getSubjectName(k))

  if (gpa < 50) return {
    title: 'برنامج التدخل العلاجي المكثف',
    subtitle: 'Academic Remediation Program — المستوى: دون الحد الأدنى للنجاح',
    note: `المواد الحرجة: ${failedSubjects.length ? failedSubjects.join(' · ') : 'جميع المواد تحتاج تعزيزاً'}`,
    quote: 'التعلُّم الفعّال لا يبدأ بالحفظ، بل بتشخيص الفجوة ومعالجتها بمنهجية.',
    phases: [
      { name: 'المرحلة الأولى: التقييم التشخيصي', duration: 'الأسبوعان ١-٢', target: 'تحديد الفجوات المعرفية بدقة', steps: ['طبّق اختباراً تشخيصياً ذاتياً في كل مادة لتحديد المفاهيم الغائبة بالضبط.', 'رتّب المواد حسب الأثر على المعدل: ابدأ بالمادة الأثقل وزناً في الامتحان.', 'حدّد الأنماط المتكررة للأخطاء — هل هي أخطاء إجرائية أم مفاهيمية؟', 'ضع جدولاً زمنياً يومياً صارماً (٤ ساعات دراسة صافية) وأعلِنه لأهلك للمساءلة.'] },
      { name: 'المرحلة الثانية: إعادة البناء المعرفي', duration: 'الأسابيع ٣-٧', target: 'تجاوز حد النجاح ٥٠% في كل مادة', steps: ['استخدم أسلوب "التعلم التراكمي التصاعدي": لا تنتقل لمفهوم جديد قبل إتقان السابق بنسبة ٨٠%.', 'طبّق أسلوب الاسترجاع النشط (Active Recall): أغلق الكتاب وحاول كتابة ما تعلمته.', 'استعن بمدرس متخصص لجلسات أسبوعية منظمة مع أهداف محددة لكل جلسة.', 'حل تمارين الكتاب كاملةً بالتسلسل — لا تتجاوز تمريناً واحداً دون حل.', 'وثّق الأخطاء في دفتر مخصص وعاود حلها يومياً حتى تختفي.'] },
      { name: 'المرحلة الثالثة: التعزيز والتقييم', duration: 'الأسابيع ٨-١٢', target: 'الوصول لـ ٦٠-٦٥% والتأهل الأولي للجامعة', steps: ['حل امتحانًا وزارياً كاملاً أسبوعياً بظروف محاكية للامتحان الحقيقي (صمت، توقيت دقيق).', 'استخدم أسلوب "التكرار المتباعد" (Spaced Repetition) للمعلومات التي تتراكم.', 'راجع نسبة التحسن الأسبوعية وعدّل خطتك بناءً على البيانات لا على الانطباع.', 'حافظ على نوم منتظم ٧-٨ ساعات — الدراسات تؤكد أن النوم ضروري لتوطيد الذاكرة.'] }
    ]
  }

  if (gpa < 65) return {
    title: 'برنامج تعزيز الكفاءة الأكاديمية',
    subtitle: 'Academic Proficiency Enhancement — المستوى: دون حد القبول الجامعي',
    note: weakSubjects.length ? `مواد تحتاج تعزيزاً: ${weakSubjects.join(' · ')}` : 'جميع المواد في نطاق القبول المحدود',
    quote: 'الكفاءة الأكاديمية ليست موهبة فطرية — هي مهارة تُبنى بممارسة منهجية ومقيسة.',
    phases: [
      { name: 'المرحلة الأولى: تحليل الفجوة', duration: 'الأسبوعان ١-٢', target: 'خارطة واضحة للأولويات', steps: ['طبّق تحليل SWOT أكاديمياً: نقاط القوة، الضعف، الفرص، والتهديدات في كل مادة.', 'حدّد الوحدات ذات الوزن الأعلى في كل امتحان وخصّص لها ٦٠% من وقت الدراسة.', 'راجع آخر ٣ سنوات وزارية لاستخراج أنماط الأسئلة المتكررة في كل مادة.', 'وضع خطة دراسية أسبوعية مكتوبة قابلة للقياس — هدف لكل يوم لا لكل أسبوع.'] },
      { name: 'المرحلة الثانية: التعلم النشط المكثف', duration: 'الأسابيع ٣-٨', target: 'رفع كل مادة بمعدل ١٠-١٥%', steps: ['طبّق أسلوب الشرح للآخرين (Feynman Technique): اشرح المفهوم بكلماتك البسيطة — إن عجزت فأنت لا تفهمه حقاً.', 'حل ٣ سنوات وزارية كاملة لكل مادة مع توثيق نوع الخطأ في كل سؤال.', 'انضم لمجموعة دراسية صغيرة (٢-٣ أشخاص) مرة أسبوعياً للمناقشة والتصحيح المتبادل.', 'خصّص ٢٠ دقيقة يومياً للمراجعة التراكمية للمواد السابقة لمنع النسيان.', 'لا تنتقل من مادة لأخرى قبل الوصول لـ ٦٥% في التدريب الذاتي.'] },
      { name: 'المرحلة الثالثة: التحضير للامتحان', duration: 'الأسابيع ٩-١٢', target: 'تجاوز ٦٥% وتأهيل للقبول الجامعي', steps: ['محاكاة كاملة لظروف الامتحان الرسمي: توقيت، صمت، لا مراجعة أثناء الحل.', 'حلّل نتائج كل محاكاة بمنهجية: طوّر معادلة شخصية لمعرفة نقاط الخسارة الأكثر.', 'في الأسبوع الأخير: مراجعة القوانين والعناصر الأساسية فقط — لا تعلُّم مادة جديدة.', 'ضع خطة زمنية لحل الامتحان: كم دقيقة لكل سؤال وكيف توزع الوقت.'] }
    ]
  }

  if (gpa < 80) return {
    title: 'برنامج التطوير الأكاديمي التنافسي',
    subtitle: 'Competitive Academic Development — المستوى: مؤهل للقبول / ما دون التنافسي',
    note: weakSubjects.length ? `مواد تحتاج تعزيزاً: ${weakSubjects.join(' · ')}` : 'جميع المواد فوق حد القبول',
    quote: 'التحسين المستمر المقاس هو الفارق الحقيقي بين الكفاءة والتميز.',
    phases: [
      { name: 'المرحلة الأولى: إغلاق الثغرات التفصيلية', duration: 'الأسابيع ١-٣', target: 'لا مادة دون ٧٠%', steps: ['حلّل خسائرك بدقة على مستوى الوحدة لا المادة: في أي وحدة بالضبط تخسر أكثر الدرجات؟', 'ركّز على "الأسئلة التمييزية" — الأسئلة التي تميّز الجيد عن الممتاز في الامتحان.', 'تحوّل من أسلوب الفهم إلى أسلوب الإتقان: يكفي فهم المادة للنجاح لكن الإتقان فقط يصنع التميز.', 'راجع ٥ سنوات وزارية واستخرج جدول تكرار الأسئلة — خصّص وقتاً بناءً على التكرار.'] },
      { name: 'المرحلة الثانية: بناء الدقة والسرعة', duration: 'الأسابيع ٤-٨', target: 'تجاوز ٨٠% في التدريب', steps: ['تدرب على إنجاز الامتحان في ٧٠% من الوقت الرسمي — الفائض يُعطيك مراجعة نهائية.', 'قلّص الأخطاء الإجرائية (حسابية، إملائية، إغفال وحدات القياس) — هي دائماً أسهل الدرجات تُستعاد.', 'حل كل سؤال ثم تحقق منه فوراً قبل الانتقال — لا تنتظر نهاية الامتحان للمراجعة.', 'استخدم تقنية "الاسترجاع التدريجي" (Retrieval Practice): امتحن نفسك يومياً بلا كتاب أمامك.', 'اعمل مخططاً بيانياً لتقدمك الأسبوعي — التحسن المرئي محفز نفسياً مُثبت علمياً.'] },
      { name: 'المرحلة الثالثة: التحضير النهائي عالي الجودة', duration: 'الأسابيع ٩-١٢', target: 'الوصول للنطاق التنافسي', steps: ['محاكاة يومية كاملة في الأسبوع الأخير قبل الامتحان.', 'ركّز على أسئلة التطبيق التحليلية متعددة الخطوات — هي مصدر الفارق في النتائج.', 'مراجعة خفيفة فقط في الأسبوع الأخير: القوانين، الرسوم البيانية، الخلاصات.', 'احرص على الجانب النفسي: نوم منتظم، تغذية جيدة، تقليل الضغط — الاستعداد البدني جزء من الأداء.'] }
    ]
  }

  if (gpa < 93) return {
    title: 'برنامج الإتقان الأكاديمي',
    subtitle: 'Academic Mastery Program — المستوى: تنافسي / ما دون الامتياز',
    note: 'المستوى الحالي يؤهل لأغلب التخصصات — الهدف: الوصول لمستوى الامتياز',
    quote: '"Excellence is not a destination you arrive at once, but a standard you keep choosing." — Michael Jordan',
    phases: [
      { name: 'المرحلة الأولى: تحليل الأداء المتقدم', duration: 'الأسبوعان ١-٢', target: 'تحديد نقاط الخسارة الخفية', steps: ['حلّل امتحانات التدريب بمنهجية كمية: وثّق كل خطأ ونوعه (مفاهيمي / إجرائي / إهمال).', 'ابحث عن "الأسئلة الفخ" التي تبدو سهلة لكنها مصدر خسارة غير متوقعة.', 'حدّد بدقة الفجوة بين أداء التدريب وأداء الامتحانات الرسمية — وحلّل أسبابها.', 'راجع أصعب أسئلة سنوات ٢٠١٩-٢٠٢٤ واحصِ كم منها كنت ستجيب عنه بشكل كامل.'] },
      { name: 'المرحلة الثانية: الإتقان تحت الضغط', duration: 'الأسابيع ٣-٨', target: 'أداء ٩٠%+ في كل تدريب', steps: ['امتحن نفسك أسبوعياً بامتحان وزاري كامل بتوقيت أقصر من الرسمي (٨٠% من الوقت).', 'حلّل كل خطأ صغير مهما بدا تافهاً: اكتب سببه وطريقة تجنبه مستقبلاً.', 'اعمل على الدقة اللغوية والرياضية في الإجابات — الامتحانات الوزارية تكافئ الصياغة المتقنة.', 'طوّر "ورقة الخلاصة الشخصية" لكل مادة: القوانين المهمة، أبرز الأخطاء، نصائح الوقت.', 'حافظ على التوازن الجسدي: نوم ٨ ساعات، ٣٠ دقيقة رياضة يومياً — البيانات العلمية تؤكد أثرهما على التحصيل.'] },
      { name: 'المرحلة الثالثة: ضبط الأداء والاستعداد الجامعي', duration: 'أسبوعان قبل الامتحان', target: 'الاستعداد الأمثل', steps: ['مراجعة ذهنية خفيفة فقط — لا تتعلم مادة جديدة في هذه المرحلة إطلاقاً.', 'ثق بما أعددته: "الثقة المُبنية على الإعداد" ليست غروراً — هي نتيجة طبيعية.', 'ابدأ البحث المبكر عن متطلبات القبول في تخصصاتك المستهدفة والمنح المتاحة.', 'ضع خطة "اليوم الصفري في الجامعة" — ماذا ستقرأ في الصيف القادم كتحضير؟'] }
    ]
  }

  return {
    title: 'برنامج الحفاظ على التميز والجاهزية الجامعية',
    subtitle: 'Excellence Maintenance & University Readiness — المستوى: امتياز',
    note: 'أنت في مستوى القمة — مهمتك الحفاظ لا الوصول',
    quote: '"The secret to sustained excellence is not working harder, but working smarter with deliberate practice." — Anders Ericsson',
    phases: [
      { name: 'مرحلة الاستدامة الذكية', duration: 'حتى الامتحان', target: 'الحفاظ على الأداء بأقصى كفاءة', steps: ['حافظ على روتينك الحالي دون تغيير جذري — ما وصلك لهنا سيوصلك للنهاية.', 'استخدم أسلوب "الممارسة المتقنة" (Deliberate Practice): ركّز فقط على نقاط الضعف الصغيرة المتبقية.', 'مراجعة دورية خفيفة لا مكثفة — ٣٠ دقيقة يومياً تكفي للحفاظ على ما اكتسبت.', 'تجنّب الإرهاق الأكاديمي (Burnout): حدّد وقتاً ثابتاً للراحة والأنشطة غير الدراسية.'] },
      { name: 'مرحلة الجاهزية الجامعية المبكرة', duration: 'الصيف قبل الجامعة', target: 'التفوق من اليوم الأول', steps: ['اطّلع على مقررات السنة الأولى في تخصصك المستهدف من المناهج المفتوحة (MIT OCW, Coursera).', 'طوّر مهاراتك في اللغة الإنجليزية الأكاديمية — ٩٠% من المراجع العلمية الجامعية بالإنجليزية.', 'ابحث عن المنح الجامعية: الجامعة الأردنية، اليرموك، الهاشمية، الأمير الحسين بن عبدالله.', 'ابنِ ملفك الشخصي المهني على LinkedIn مبكراً — اجعله يعكس إنجازاتك الأكاديمية.', 'اقرأ في تاريخ التخصص الذي ستدرسه وأبرز إسهاماته — هذا يعطيك سياقاً عميقاً يميّزك.'] }
    ]
  }
})

// ألوان شريط المعدل والتقييمات
const gpaAccentBar = computed(() => {
  if (gpa>=85) return 'bg-gradient-to-r from-emerald-400 to-emerald-500'
  if (gpa>=75) return 'bg-gradient-to-r from-sky-400 to-sky-500'
  if (gpa>=65) return 'bg-gradient-to-r from-amber-400 to-amber-500'
  if (gpa>=50) return 'bg-gradient-to-r from-orange-400 to-orange-500'
  return 'bg-gradient-to-r from-rose-400 to-rose-500'
})
const gpaCircleColor = computed(() => {
  if (gpa>=85) return '#10b981'; if (gpa>=75) return '#0ea5e9'
  if (gpa>=65) return '#f59e0b'; if (gpa>=50) return '#f97316'; return '#f43f5e'
})
const gpaStatusBadge = computed(() => {
  if (gpa>=85) return 'bg-emerald-50 border-emerald-200 text-emerald-700'
  if (gpa>=75) return 'bg-sky-50 border-sky-200 text-sky-700'
  if (gpa>=65) return 'bg-amber-50 border-amber-200 text-amber-700'
  if (gpa>=50) return 'bg-orange-50 border-orange-200 text-orange-600'
  return 'bg-rose-50 border-rose-200 text-rose-600'
})
function getGPAStatusText(g) {
  if (g>=85) return '🌟 امتياز'; if (g>=75) return '👍 جيد جداً'
  if (g>=65) return 'جيد';       if (g>=50) return 'مقبول'; return 'راسب ❌'
}
function getGPASummaryTitle(g) {
  if (g<50)  return 'وضع أكاديمي حرج — يتطلب تدخلاً فورياً'
  if (g<65)  return 'ناجح مدرسياً / غير مؤهل للقبول الجامعي بعد'
  if (g<75)  return 'مؤهل للجامعات الخاصة — تنافسية متوسطة'
  if (g<85)  return 'وضع تنافسي قوي — في المنطقة الآمنة'
  return 'نخبة المتفوقين — منافس على أعلى التخصصات'
}
function getGPADetailedMessage(g, f) {
  if (g<50)  return 'المعدل أقل من حد النجاح. يجب تصحيح وضع المواد الراسب فيها فوراً قبل التفكير في الجامعة.'
  if (g<65)  return 'المعدل يُتيح الدخول لكليات المجتمع (دبلوم) أو بعض الجامعات الخاصة. القبول الموحد الحكومي يتطلب +٦٥%.'
  if (g<75 && f==='Health')   return 'مؤهل لتخصصات التمريض والمخبر الطبي. الطب والصيدلة تتطلبان +٨٠-٨٥%. ارفع تركيزك على الكيمياء.'
  if (g<75 && f==='EngineeringIT') return 'أنت على بُعد خطوة من تخصصات الذكاء الاصطناعي وعلم الحاسوب. تركيز إضافي على الرياضيات يفتح الباب.'
  if (g<80 && f==='EngineeringIT') return 'تخصصات الهندسة الحكومية تحتاج +٨٠%. أنت في النطاق التنافسي للجامعات الخاصة. ارفع علامات الفيزياء.'
  return 'معدلك ممتاز ويؤهلك لمجموعة واسعة من التخصصات المميزة. راجع التفاصيل في قسم التخصصات المرشحة أدناه.'
}
function printReport() { window.print() }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=IBM+Plex+Mono:wght@400;700&display=swap');
.font-sans { font-family: 'Tajawal', sans-serif; }
.font-mono { font-family: 'IBM Plex Mono', monospace; }

.anim-fade { animation: fadeUp 0.8s ease-out both; }
.anim-fade-d1 { animation: fadeUp 0.8s 0.2s ease-out both; }
.anim-fade-d2 { animation: fadeUp 0.8s 0.4s ease-out both; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes aura {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -30px) scale(1.1); }
}
.animate-aura { animation: aura 15s ease-in-out infinite; }

.nav-btn {
  font-size: 0.8rem; font-weight: 700; color: #64748b; background: white; 
  border: 1px solid #e2e8f0; border-radius: 12px; padding: 8px 16px; transition: all 0.2s;
}
.nav-btn-primary {
  font-size: 0.8rem; font-weight: 700; color: white; 
  background: #1e293b; border-radius: 12px; padding: 8px 16px; transition: all 0.2s;
}
.nav-btn-primary:hover { background: #0f172a; }

@media print {
  .print\:hidden { display: none !important; }
  body { background: white !important; }
  .anim-fade, .anim-fade-d1, .anim-fade-d2 { animation: none !important; opacity: 1 !important; transform: none !important; }
  .print\:break-before-page { break-before: page; }
  .print\:break-inside-avoid { break-inside: avoid; }
}
</style>