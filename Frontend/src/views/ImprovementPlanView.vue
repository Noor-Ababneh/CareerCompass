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
      <button @click="printReport" class="nav-btn flex items-center gap-1.5 hover:bg-amber-50 hover:text-amber-600">
        حفظ التقرير <span>📄</span>
      </button>
      <button @click="$router.go(-1)" class="nav-btn-primary flex items-center gap-1.5">
        تعديل العلامات
      </button>
    </div>
  </nav>

  <div class="relative z-10 max-w-6xl mx-auto px-5 pb-28 pt-8 print:p-4 print:max-w-none">
    <div v-if="source === 'grades'" class="space-y-10">

      <!-- Hero Section -->
      <section class="anim-fade text-center">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5 border bg-white border-amber-200 text-amber-700 shadow-sm">
          <span>{{ stage === 'junior' ? 'مرحلة التأسيس (الصفوف 9-11)' : 'مرحلة التوجيهي' }}</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black text-slate-800 mb-3 leading-tight">
          جاهزية تحليل <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">{{ getFieldName(field) }}</span>
        </h1>
        <p class="text-slate-500 max-w-xl mx-auto text-base leading-relaxed font-medium">
          تقرير أكاديمي شامل يعتمد على معايير القبول الموحد الأردني - مصمم خصيصاً لوضعك
        </p>
      </section>

      <!-- GPA Overview Card -->
      <section class="anim-fade-d1 bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] overflow-hidden relative shadow-xl shadow-amber-500/5">
        <div class="h-1.5 w-full" :class="gpaAccentBar"></div>
        <div class="p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
          <div class="relative shrink-0 transform hover:scale-105 transition-transform duration-500">
            <svg class="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" stroke-width="8"/>
              <circle cx="60" cy="60" r="50" fill="none" :stroke="gpaCircleColor" stroke-width="8" stroke-linecap="round" stroke-dasharray="314" :stroke-dashoffset="314 - (314 * gpa / 100)" style="transition: stroke-dashoffset 1.8s cubic-bezier(.16,1,.3,1)"/>
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
                يوجد مادة راسبة - الرسوب في أي مادة أساسية قد يمنع القبول الجامعي بغض النظر عن المعدل العام
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

      <!-- Available Majors -->
      <section v-if="stage === 'senior'" class="anim-fade-d2">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl shadow-sm border border-amber-200">🎯</div>
          <div>
            <h3 class="text-2xl font-black text-slate-800">التخصصات المتاحة في حقلك</h3>
            <p class="text-sm text-slate-500 font-medium">مرتبة حسب الحد الأدنى للقبول. يعتمد القبول الفعلي على التنافس</p>
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
                  <!-- CHANGED: removed gap display, show only eligible/not -->
                  <span v-if="major.eligible" class="text-xs font-black text-emerald-500">✓ مؤهل</span>
                  <span v-else class="text-xs font-black text-rose-400">غير مؤهل بعد</span>
                </div>
                <div class="w-16 h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-700"
                    :class="major.eligible ? 'bg-emerald-400' : 'bg-rose-400'"
                    :style="{width: Math.min(100, (gpa/major.minGPA)*100)+'%'}"></div>
                </div>
              </div>
            </div>
            <div v-if="major.eligible && major.competitive" class="mt-2 pr-3 text-[10px] text-amber-600 font-bold flex items-center gap-1">
              <span>⚠️</span> تخصص تنافسي - المعدل الفعلي للقبول عادة أعلى من الحد الأدنى
            </div>
          </div>
        </div>
        <div v-else class="bg-white/80 backdrop-blur-md rounded-3xl p-8 text-center border border-slate-200">
          <span class="text-4xl block mb-3">📉</span>
          <h3 class="text-lg font-black text-slate-600 mb-2">معدل المواد الأساسية لحقلك غير كافٍ بعد للقبول الجامعي</h3>
          <p class="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
            معدلك الحالي ({{ gpa }}%) لا يصل للحد الأدنى. راجع خطة التطوير الأكاديمي أدناه للتحسين.
          </p>
        </div>
      </section>

      <!-- Subject Diagnosis -->
      <section class="anim-fade-d2">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl shadow-sm border border-orange-200">🔍</div>
          <div>
            <h3 class="text-2xl font-black text-slate-800">التشخيص التفصيلي للمواد</h3>
            <p class="text-sm text-slate-500 font-medium">مرتبة من الأضعف للأقوى - تحليل الفجوة أكاديمياً</p>
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
                    <!-- CHANGED: no gap display, clean status only -->
                    <span v-if="item.gapToTarget <= 0" class="text-emerald-500 text-xs">✓ مستوى تنافسي ممتاز</span>
                    <span v-else class="text-orange-500 text-xs">{{ item.levelRangeLabel }}</span>
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
                <div class="text-[10px] font-black text-amber-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">الأهمية الجامعية</div>
                <p class="text-slate-700 text-sm leading-relaxed font-medium">{{ item.universityRelevance }}</p>
                <div v-if="item.jobImpact?.length" class="mt-3 flex flex-wrap gap-2">
                  <span v-for="job in item.jobImpact" :key="job" class="text-[10px] bg-white text-amber-700 border border-amber-200 px-2 py-1 rounded-lg font-bold">{{ job }}</span>
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-5 mb-4">
                <div>
                  <div class="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">التشخيص الأكاديمي</div>
                  <div class="bg-white rounded-xl p-4 border border-slate-100 text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-line shadow-sm">{{ item.diagnosis }}</div>
                  <div v-if="item.rootCauses?.length && item.score < 85" class="mt-3 space-y-1.5">
                    <div v-for="cause in item.rootCauses" :key="cause" class="flex items-start gap-2 text-xs text-orange-600 font-bold">
                      <span class="shrink-0 mt-0.5">⚠️</span> {{ cause }}
                    </div>
                  </div>
                </div>
                <div>
                  <div class="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">الاستراتيجية المقترحة</div>
                  <div class="space-y-2">
                    <div v-for="(step, i) in item.actionSteps" :key="i" class="flex items-start gap-3 p-3 rounded-xl border border-slate-50 bg-slate-50/50 hover:border-amber-200 transition-colors">
                      <span class="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5 border border-amber-200">{{ i+1 }}</span>
                      <span class="text-xs text-slate-700 leading-relaxed font-bold">{{ step }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="item.timelineWeeks" class="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-slate-500 shadow-sm mt-2">
                الوقت المقدر للهدف: <span class="text-slate-700">{{ item.timelineWeeks }}</span>
              </div>
              <div class="bg-slate-50/50 border-t border-slate-100 mt-5 pt-5 flex flex-wrap items-center gap-3 print:hidden">
                <span class="text-[10px] font-black text-slate-400 uppercase">مصادر مجانية</span>
                <a v-for="res in item.resources" :key="res.name" :href="res.url" target="_blank"
                  class="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:border-amber-400 hover:text-amber-600 text-xs font-black text-slate-600 transition-all shadow-sm">
                  <span>{{ res.icon }}</span> {{ res.name }}
                  <span class="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-400">{{ res.type }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Learning Plan -->
      <section v-if="learningPlan" class="anim-fade-d2 mt-16 bg-white/90 backdrop-blur-xl border border-white rounded-[3rem] overflow-hidden relative shadow-2xl shadow-amber-500/10 print:break-before-page">
        <div class="h-2.5 w-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600"></div>
        <div class="p-8 md:p-14 relative z-10">
          <div class="absolute top-0 left-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>
          <div class="flex items-start gap-5 mb-12 relative z-10">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-3xl shadow-sm border border-amber-200 shrink-0">📈</div>
            <div>
              <h3 class="text-2xl md:text-3xl font-black text-slate-800">{{ learningPlan.title }}</h3>
              <p class="text-amber-600 font-bold mt-1.5 text-sm uppercase tracking-wide">{{ learningPlan.subtitle }}</p>
              <p v-if="learningPlan.note" class="text-xs text-rose-600 font-bold mt-3 bg-rose-50 px-3 py-1.5 rounded-lg inline-block border border-rose-200">{{ learningPlan.note }}</p>
            </div>
          </div>
          <div class="relative z-10 pr-4">
            <div class="absolute right-[19px] md:right-[23px] top-5 bottom-5 w-1 bg-gradient-to-b from-amber-200 via-orange-200 to-transparent rounded-full"></div>
            <div class="space-y-10">
              <div v-for="(phase, idx) in learningPlan.phases" :key="idx" class="relative flex gap-6 md:gap-8 group">
                <div class="relative z-10 shrink-0">
                  <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-4 border-amber-400 flex items-center justify-center text-amber-600 font-black text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">{{ idx+1 }}</div>
                </div>
                <div class="flex-1 pb-2">
                  <div class="flex flex-wrap items-center gap-3 mb-4">
                    <h4 class="text-xl font-black text-slate-800">{{ phase.name }}</h4>
                    <span v-if="phase.duration" class="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-black border border-slate-200 tracking-widest">{{ phase.duration }}</span>
                    <span v-if="phase.target" class="text-[10px] bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-black border border-emerald-200">{{ phase.target }}</span>
                  </div>
                  <div class="grid sm:grid-cols-2 gap-4">
                    <div v-for="(step, i) in phase.steps" :key="i" class="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-amber-300 hover:shadow-md transition-all">
                      <span class="text-amber-500 mt-0.5">✓</span>
                      <span class="text-sm text-slate-600 leading-relaxed font-bold">{{ step }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-16 pt-8 border-t border-slate-100 text-center relative z-10">
            <p class="text-slate-500 font-bold text-sm md:text-base leading-relaxed max-w-2xl mx-auto">"{{ learningPlan.quote }}"</p>
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
const stage = route.query.stage || 'senior'
const field = route.query.field || 'EngineeringIT'
const grades = JSON.parse(route.query.grades || '{}')
const gpa = parseFloat(route.query.gpa || 0)

// =============================================
// LEVEL RANGES - UNIFIED ACROSS ALL COMPONENTS
// fail:   0–49   | راسب
// weak:   50–64  | مقبول
// good:   65–79  | جيد
// vgood:  80–92  | جيد جداً
// excel:  93–100 | امتياز
// =============================================

const subjectMeta = {
  math: {
    icon: '🔢',
    universityRelevance: 'الرياضيات هي لغة العلوم الأساسية. في الهندسة ستواجه حساب التفاضل والتكامل والجبر الخطي والمعادلات التفاضلية في السنة الأولى الجامعية، وكلها تبني مباشرة على ما تدرسه الآن. ضعف الرياضيات يعني تعثراً مؤكداً في الجامعة. علاوة على ذلك، اختبارات القدرات التنافسية الأردنية (QAT) تعتمد عليها بشكل رئيسي.',
    jobImpact: ['مهندس مدني', 'مهندس ميكانيكي', 'مهندس معماري', 'أخصائي إحصاء'],
    rootCauses: [
      'فجوات تراكمية من الصف التاسع والعاشر لم تُعالج في الوقت المناسب.',
      'الاعتماد على الحفظ البصري بدل التطبيق اليدوي والحل الفعلي.',
      'خوف نفسي من المادة يُقلل التركيز ويولد توقع الفشل.'
    ],
    targets: { juniorMin: 65, seniorMin: 75 },
    planByLevel: {
      fail: [
        'ابدأ من كتاب الصف التاسع وأعد حل جميع الأمثلة المحلولة يدوياً قبل الانتقال للعاشر. ركز على المعادلات الخطية والتربيعية أولاً.',
        'خصص ساعتين يومياً للرياضيات فقط، بعيداً عن الهاتف تماماً. اختر نفس الوقت كل يوم لبناء عادة.',
        'استعن بمعلم خصوصي أسبوعياً على الأقل لتصحيح مسارك. حل 15 سؤالاً يومياً حتى لو بسيطة جداً - الثقة تبنى بالتراكم.',
        'استخدم Khan Academy بالعربي يومياً لمراجعة الأساسيات بالتدرج. لا تنتقل لدرس جديد قبل الحصول على 80% في تمارين الدرس الحالي.',
        'استخدم تطبيق Photomath لفهم خطوات الحل التفصيلية - لكن لا تعتمد عليه بدل التفكير الذاتي.',
        'سجّل أخطاءك في دفتر مخصص: اكتب الخطأ، وسببه، والحل الصحيح. راجع هذا الدفتر كل أسبوع.'
      ],
      weak: [
        'حدد الوحدات التي تسبب أكبر خسارة في الدرجات وابدأ منها. حلل آخر 3 امتحانات لمعرفة الأنماط المتكررة.',
        'حل ورقة امتحان كاملة كل أسبوع ثم حلل أخطاءك خطأً بخطأ. سجّل نوع كل خطأ (مفاهيمي / إجرائي / إهمال).',
        'أعد ورقة قوانين مختصرة لكل وحدة وعلقها أمامك أثناء الدراسة. القوانين يجب أن تكون تلقائية.',
        'تدرب على الحل بسرعة - لا تسمح لنفسك بأكثر من 3 دقائق لكل سؤال متوسط.',
        'شاهد قناة الأوائل على يوتيوب لكل وحدة تجدها صعبة. شاهد شرح سامر رشاد على منصة وتد للمواضيع الأعمق.',
        'حل 3 سنوات وزارية سابقة بالتسلسل الزمني من الأقدم للأحدث لرؤية تطور نمط الأسئلة.'
      ],
      good: [
        'انتقل لحل 5 سنوات وزارية سابقة بشكل منتظم. استخرج جدول تكرار الوحدات والأسئلة.',
        'ركز على الأسئلة ذات الدرجات العالية في كل وحدة - هي مصدر الفارق الحقيقي.',
        'ادخل على منصة وتد لشرح سامر رشاد للمواضيع المعقدة مثل اللوغاريتم والدوال الأسية.',
        'راجع وحدة اللوغاريتم والمثلثات بعمق - هما مصدر الخسارة الرئيسي لطلاب مستوى جيد.',
        'تدرب على الأسئلة التحليلية التي تتطلب خطوات متعددة. هدفك تجاوز 80% في كل تدريب.',
        'قبل كل وحدة، اكتب قائمة بالمفاهيم التي تعرفها والتي لا تعرفها - الوعي الذاتي يسرّع التعلم.'
      ],
      vgood: [
        'ركز على الأسئلة عالية الصعوبة من سنوات 2020-2024 فقط - لا تضيع وقتاً في الأسئلة السهلة.',
        'تدرب على الحل في 60% من الوقت المعطى لضمان فائض زمني للمراجعة في الامتحان.',
        'لا تهمل أي وحدة حتى لو تتقنها - خصص لها مراجعة دورية خفيفة كل أسبوعين.',
        'حلل أنماط الأسئلة الوزارية للخمس سنوات الأخيرة وحدد التكرارات بالضبط.',
        'ساعد زميلاً ضعيفاً في الرياضيات - شرح المادة لغيرك يُرسخها عندك بشكل أعمق بكثير.',
        'طور "ورقة الخلاصة الشخصية": القوانين الأهم، أبرز الأخطاء، نصائح إدارة الوقت.'
      ],
      excel: [
        'أنت في مستوى متميز. حافظ على روتينك الدراسي ولا تغير ما ينجح. الاستقرار أهم من التحسين.',
        'ابدأ بتصفح مقدمة حساب التفاضل والتكامل من Khan Academy استعداداً للجامعة.',
        'فكر في المشاركة في مسابقات الرياضيات الأردنية أو الأولمبياد - هي ميزة حقيقية في ملف القبول.',
        'خصص وقتاً للراحة والرياضة. المحافظة على الصحة النفسية والجسدية هي مهمتك الأولى الآن.'
      ]
    }
  },

  math_adv: {
    icon: '📐',
    universityRelevance: 'الرياضيات المتقدمة هي عصب تخصصات الهندسة والذكاء الاصطناعي وعلم البيانات. النهايات والمشتقات والتكاملات التي تدرسها الآن هي حرفياً مواد السنة الأولى الجامعية في كل جامعة أردنية. من يتقنها الآن يجد السنة الأولى مكررة لما درس، ومن يضعف فيها يعاني في كل مادة علمية.',
    jobImpact: ['مهندس برمجيات', 'مطور ذكاء اصطناعي', 'عالم بيانات', 'باحث جامعي'],
    rootCauses: [
      'صعوبة في المفاهيم المجردة كالنهايات - لأنها لا تُشاهد في الحياة اليومية.',
      'ضعف في التأسيس الجبري من مراحل سابقة يعيق فهم التفاضل.',
      'عدم ربط الرياضيات بتطبيقاتها الحقيقية في الهندسة والتكنولوجيا.'
    ],
    targets: { juniorMin: 70, seniorMin: 80 },
    planByLevel: {
      fail: [
        'ابدأ بمراجعة الجبر الأساسي من الصف العاشر - التفاضل يبني عليه مباشرة. لا تتجاوز هذه الخطوة.',
        'تعلم مفهوم النهايات (Limits) بمشاهدة شرح 3Blue1Brown أو Prof. Leonard على يوتيوب - الفهم البصري ضروري.',
        'التزم بكتابك المدرسي فقط في هذه المرحلة. لا تشتت نفسك بمصادر متعددة.',
        'استعن بمعلم خصوصي متخصص في الرياضيات المتقدمة - الشرح المباشر ضروري لهذه المادة تحديداً.',
        'حل التمارين يدوياً دون آلة حاسبة في البداية لبناء الفهم الحقيقي وليس مجرد الحصول على الجواب.',
        'استخدم منصة وتد (watad.me) لشرح سامر رشاد - من أفضل المصادر العربية للرياضيات المتقدمة.'
      ],
      weak: [
        'وحدة التفاضل أولاً لأنها الأثقل وزناً - حل 50 مثالاً عليها قبل الانتقال لأي وحدة أخرى.',
        'احفظ قواعد الاشتقاق الأساسية (القدرة، السلسلة، الحاصل) واستظهرها حتى تصبح تلقائية تماماً.',
        'انتبه لأخطاء الإشارة والكسور - هي مصدر معظم الخسارة في الدرجات حتى للطلاب الذين يفهمون.',
        'حل 3 سنوات وزارية سابقة كاملة بتوقيت فعلي. حلل نوع كل خطأ.',
        'استخدم Wolfram Alpha للتحقق من إجاباتك - لكن حاول دائماً الحل يدوياً أولاً.',
        'اعمل مجموعة دراسية صغيرة لمناقشة التمارين الصعبة - التعلم التعاوني يعمق الفهم.'
      ],
      good: [
        'راجع وحدة التكامل ومجال الدوال بعمق - هما مصدر الأسئلة الصعبة في الامتحان.',
        'تدرب على المسائل التطبيقية (الحركة والمساحة) التي تجمع أكثر من وحدة.',
        'حل 5 سنوات وزارية مع تحليل مفصل لكل خطأ. صنّف الأخطاء: مفاهيمية أم إجرائية.',
        'ركز على ربط التفاضل بالتكامل - الفهم التكاملي يميزك في الامتحان.',
        'استخدم Desmos (مجاني) لرسم الدوال وتصور سلوكها - يقوي الحدس الرياضي.',
        'هدفك تجاوز 80% في التدريبات قبل الامتحان الفعلي بشهر على الأقل.'
      ],
      vgood: [
        'حل الأسئلة الأصعب من سنوات 2019-2024 التي تتطلب خطوات متعددة.',
        'تدرب على تقليل الأخطاء الحسابية - هي الفارق بين 88% و95%.',
        'راجع الفصل الدراسي الأول بعمق إضافي لأن أسئلته شائعة في الامتحان.',
        'اعمل محاكاة للامتحان الكامل بوقت رسمي مرة أسبوعياً على الأقل.',
        'ركز على دقة التعبير الرياضي - الامتحانات الوزارية تكافئ الصياغة المنطقية المتسلسلة.',
        'ابدأ بالاطلاع على مقدمة الجبر الخطي (Linear Algebra) كتحضير جامعي مبكر.'
      ],
      excel: [
        'أنت في مستوى استثنائي. حافظ على روتينك ولا ترهق نفسك بمواد جديدة.',
        'يمكنك الاطلاع على مقدمة الجبر الخطي (Linear Algebra) كمتعة فكرية وتحضيراً للجامعة.',
        'فكر في مسابقات الرياضيات الوطنية - هي ميزة تنافسية حقيقية في ملف القبول الجامعي.',
        'ساعد زملاءك في الرياضيات - الشرح يُعمّق فهمك ويبني علاقات مهنية مبكرة.'
      ]
    }
  },

  math_biz: {
    icon: '📊',
    universityRelevance: 'رياضيات الأعمال هي أساس المحاسبة والمالية والاقتصاد في الجامعة. ستدرس رياضيات مالية وإحصاء تطبيقي تعتمد مباشرة على النسب والمعادلات والمتسلسلات التي تدرسها الآن. ضعفها يعني صعوبة في فهم القوائم المالية وحساب الفوائد والاستهلاكات.',
    jobImpact: ['محاسب قانوني', 'محلل مالي', 'مدير أعمال', 'مستشار اقتصادي'],
    rootCauses: [
      'عدم ربط الأرقام بسياقها التجاري الحقيقي (البنوك، الفوائد، التجارة).',
      'ضعف في العمليات الأساسية وخاصة النسب المئوية والكسور.',
      'النظر للمادة كمجموعة معادلات للحفظ لا كأداة تحليل فعلية.'
    ],
    targets: { juniorMin: 60, seniorMin: 65 },
    planByLevel: {
      fail: [
        'أتقن النسب المئوية والكسور أولاً - لا يمكن المضي قدماً بدونها. خصص أسبوعاً كاملاً لهذا فقط.',
        'حل مسائل من الحياة اليومية: ما ربح التاجر؟ كم الفائدة السنوية؟ ربط الرياضيات بالواقع يبني الفهم.',
        'استخدم Khan Academy قسم الرياضيات الأساسية ثم قسم المالية بالتسلسل.',
        'استخدم تطبيق Photomath لفهم خطوات الحل تفصيلياً - لكن بعدها اعزل الهاتف وحل بنفسك.',
        'خصص نصف ساعة يومياً للحل اليدوي بلا آلة حاسبة. البطء في البداية طبيعي.',
        'اعمل جدولاً بالمعادلات الأساسية مع مثال مالي تطبيقي لكل معادلة.'
      ],
      weak: [
        'ركز على وحدة الفائدة المركبة والبسيطة وافهمها تطبيقياً لا نظرياً - هي الأثقل وزناً.',
        'اعمل ملخصاً بالمعادلات الأساسية مع مثال مالي لكل معادلة.',
        'حل نماذج وزارية من 3 سنوات سابقة وحدد الأسئلة المتكررة.',
        'اربط كل معادلة بمثال من السوق الأردني (البنوك، العقار، التجارة).',
        'استخدم Investopedia للاطلاع على تطبيقات المفاهيم في الواقع المالي الحقيقي.',
        'هدفك أن تشرح لأي شخص ما هي الفائدة المركبة وكيف تؤثر على القروض.'
      ],
      good: [
        'تدرب على مسائل المتسلسلات في سياق الأعمال (القروض، الادخار، التقاعد).',
        'حل نماذج وزارية كاملة مع تحليل الأخطاء.',
        'ركز على الأسئلة التحليلية التي تتطلب أكثر من خطوة واحدة.',
        'استخدم Excel أو Google Sheets لحل مسائل المتسلسلات - يقوي الربط بين الرياضيات والأدوات المهنية.',
        'استكشف منصة Coursera لدورة مجانية في الرياضيات المالية كتحضير جامعي مبكر.'
      ],
      vgood: [
        'اعمل على دقة الحل وتقليل الأخطاء الحسابية - هي مصدر الدرجات الضائعة.',
        'راجع جميع الوحدات مرة واحدة أسبوعياً للتثبيت.',
        'تدرب على أسئلة الحالة الدراسية (Case Studies).',
        'أنت في مستوى ممتاز - ركز على السرعة والدقة معاً.'
      ],
      excel: [
        'حافظ على روتينك الدراسي.',
        'يمكنك الاطلاع على مقدمة الرياضيات المالية الجامعية كتحضير مبكر.',
        'استكشف منصة Coursera للمقدمة في المالية والاقتصاد (مجانية للمراجعة).'
      ]
    }
  },

  physics: {
    icon: '⚛️',
    universityRelevance: 'الفيزياء هي لغة الهندسة. في كل تخصص هندسي ستواجه مادة "فيزياء هندسية" في السنة الأولى تعتمد كلياً على ما تدرسه الآن. قوانين نيوتن والطاقة والكهرباء والحركة ستظهر في كل مادة هندسية لاحقة. ضعف الفيزياء المدرسية = تعثر مضمون في الجامعة.',
    jobImpact: ['مهندس مدني', 'مهندس ميكانيكي', 'مهندس كهربائي', 'مهندس معماري'],
    rootCauses: [
      'حفظ القوانين دون فهم متى وكيف تُطبق في مسائل مختلفة.',
      'ضعف في تحليل المتجهات إلى مركباتها الأفقية والعمودية.',
      'عدم ربط القانون بالظاهرة الطبيعية الفعلية التي يصفها.'
    ],
    targets: { juniorMin: 65, seniorMin: 75 },
    planByLevel: {
      fail: [
        'ابدأ بالميكانيك - قوانين نيوتن الثالثة هي البداية الصحيحة لكل شيء. لا تنتقل قبل إتقانها.',
        'ارسم مخطط القوى (Free Body Diagram) لكل مسألة قبل كتابة أي معادلة - هذه عادة لا تتفاوت عنها.',
        'شاهد تجارب PhET التفاعلية المجانية لأي مفهوم لا تستطيع تخيله - الفيزياء تُرى لا تُحفظ.',
        'افهم وحدات القياس وكيف تشتق - هذا يمنع أخطاء التحويل الشائعة.',
        'شاهد قناة يوسف عودة على يوتيوب - شرحه للفيزياء الأردنية من أفضل ما هو متاح.',
        'خصص ساعة يومياً لحل مسائل من الكتاب يدوياً بلا مراجعة للحل مسبقاً. الكفاح مع المسألة هو التعلم.'
      ],
      weak: [
        'تعلم تحليل المتجهات إلى مركبتيها الأفقية والعمودية - هذه المهارة الأساسية لكل مسائل الميكانيك.',
        'ركز على الميكانيك والكهرباء لأنهما الأثقل وزناً في الامتحان.',
        'حل مسائل متشابهة مع تغيير الأرقام فقط - هذا يُرسخ الطريقة بشكل عميق.',
        'شاهد قناة الأوائل لشرح الفيزياء الأردنية وحل النماذج الوزارية.',
        'حل 3 سنوات وزارية سابقة كاملة بتوقيت فعلي.',
        'احرص على كتابة وحدات القياس دائماً في كل خطوة - تُمنح عليها درجات.'
      ],
      good: [
        'تدرب على المسائل متعددة الخطوات التي تجمع أكثر من قانون.',
        'راجع وحدة الكهرومغناطيسية بعمق - أسئلتها دقيقة ومتشعبة.',
        'حل 5 سنوات وزارية مع تحليل مفصل لكل خطأ.',
        'ركز على صياغة الحل بشكل منطقي ومتسلسل - تُمنح درجات على الأسلوب أيضاً.',
        'استخدم PhET لتصور المفاهيم الصعبة كالتداخل الموجي والحقول المغناطيسية.',
        'هدفك تجاوز 80% في كل تدريب قبل الامتحان بشهر على الأقل.'
      ],
      vgood: [
        'حل أسئلة صعوبة عالية من سنوات 2020-2024.',
        'ركز على دقة التعبير الرياضي والتسلسل المنطقي في الحل.',
        'اعمل محاكاة للامتحان الكامل مرة أسبوعياً بوقت رسمي.',
        'تدرب على المسائل التطبيقية المركبة التي تجمع الميكانيك والكهرباء.',
        'طور "ورقة قوانين شخصية" تحتوي القوانين الأهم مع ملاحظاتك الخاصة.'
      ],
      excel: [
        'أنت في مستوى ممتاز. حافظ على روتينك ولا تضغط على نفسك.',
        'كتحضير مبكر، يمكنك تصفح مقدمة الفيزياء الجامعية من كتاب Halliday & Resnick.',
        'جرب حل بعض أسئلة SAT Physics كتحدٍ شخصي - ليس للامتحان.'
      ]
    }
  },

  chem: {
    icon: '🧪',
    universityRelevance: 'الكيمياء هي بوابة الطب والصيدلة والهندسة الكيميائية. في الطب وطب الأسنان ستدرس كيمياء عضوية وغير عضوية مكثفة جداً. في الصيدلة، كل دواء هو جزيء كيميائي تحتاج لفهمه على المستوى الذري. ضعف الكيمياء المدرسية يعني ضعفاً مباشراً في فهم الأدوية والجسم البشري.',
    jobImpact: ['طبيب بشري', 'صيدلاني', 'مهندس كيميائي', 'باحث طبي'],
    rootCauses: [
      'نسيان الأساسيات (الجدول الدوري، التوزيع الإلكتروني، الروابط الكيميائية).',
      'صعوبة في تخيل التفاعلات على المستوى الجزيئي غير المنظور.',
      'الاعتماد على حفظ المعادلات دون فهم السبب الكيميائي وراءها.'
    ],
    targets: { juniorMin: 70, seniorMin: 80 },
    planByLevel: {
      fail: [
        'احفظ الجدول الدوري - الدورات السبع والمجموعات الرئيسية - هذا شرط قبل أي شيء آخر.',
        'افهم الروابط الكيميائية (تساهمية / أيونية) بمشاهدة فيديو تفاعلي من PhET.',
        'اعمل ملخصاً لقوانين الغازات وتطبيقاتها في جدول واضح.',
        'استخدم Khan Academy قسم الكيمياء - شرحه بالعربي والإنجليزي ممتاز.',
        'شاهد قناة الأوائل للكيمياء الأردنية على يوتيوب.',
        'لا تنتقل لوحدة جديدة قبل أن تحل جميع تمارين الوحدة الحالية. الاستمرارية لا الكمية.'
      ],
      weak: [
        'ركز على موازنة المعادلات الكيميائية يومياً - لا تتجاوز يوماً بدون 10 مسائل.',
        'اعمل خرائط ذهنية تربط تفاعلات كل وحدة ببعضها.',
        'أعطِ حسابات الكيمياء (stoichiometry) أولوية قصوى - هي الأثقل وزناً.',
        'شاهد قناة سامر عماد للكيمياء على يوتيوب.',
        'حل 3 سنوات وزارية سابقة مع تحليل أخطاء الحساب تحديداً.',
        'استخدم موقع Ptable.com للجدول الدوري التفاعلي - يساعد على فهم الخصائص الدورية.'
      ],
      good: [
        'راجع الكيمياء العضوية وتسمية المركبات - أسئلتها دقيقة وتحتاج تركيزاً.',
        'حل نماذج وزارية كاملة بتوقيت فعلي.',
        'ركز على وحدة التوازن الكيميائي - أسئلتها شائعة جداً.',
        'استخدم تطبيق Chemist للتجارب الافتراضية - يعزز الفهم البصري للتفاعلات.',
        'هدفك تجاوز 80% في التدريبات مع تحليل كل خطأ.'
      ],
      vgood: [
        'تدرب على الأسئلة التحليلية التي تربط أكثر من مفهوم.',
        'راجع وحدة المحاليل والتوازن الكيميائي بعمق إضافي.',
        'حل أسئلة صعوبة عالية من سنوات 2020-2024.',
        'ركز على دقة الحسابات الكيميائية - الخطأ في المقاييس يُضيع كل الدرجات.'
      ],
      excel: [
        'أنت في مستوى ممتاز. حافظ على هذا المستوى.',
        'يمكنك الاطلاع على مبادئ الكيمياء العضوية الجامعية (Organic Chemistry Basics).',
        'جرب تطبيق Chemist لمحاكاة مختبر افتراضي كمتعة علمية.'
      ]
    }
  },

  bio: {
    icon: '🧬',
    universityRelevance: 'الأحياء هي العمود الفقري لكل العلوم الصحية. في الطب ستواجه علم التشريح والفسيولوجيا والميكروبيولوجيا - وكلها امتداد مباشر للأحياء المدرسية. الطالب الذي لا يفهم الخلية وأجهزة الجسم ووظائفها سيجد السنة الأولى في كلية الطب شبه مستحيلة.',
    jobImpact: ['طبيب بشري', 'ممرض', 'تقني مخبري', 'باحث في الأحياء'],
    rootCauses: [
      'الاعتماد الكامل على الحفظ الصم دون فهم وظيفة كل عضو أو عملية.',
      'عدم ربط أجهزة الجسم ببعضها (الجهاز الهضمي يؤثر على الدم وهكذا).',
      'نقص في التصور البصري للعمليات الحيوية الدقيقة كالانقسام والتنفس الخلوي.'
    ],
    targets: { juniorMin: 70, seniorMin: 80 },
    planByLevel: {
      fail: [
        'ابدأ بوحدة الخلية وتعلم الفرق الدقيق بين حقيقية وبدائية النواة - هذا الأساس.',
        'شاهد فيديوهات رسوم متحركة لعمليات التنفس الخلوي والبناء الضوئي من Amoeba Sisters.',
        'افهم الانقسام الخلوي (ميتوز / ميوز) بالرسم اليدوي - ارسمه 5 مرات حتى تحفظه بصرياً.',
        'استخدم قناة Amoeba Sisters على يوتيوب (متاحة بالإنجليزي مع ترجمة عربية).',
        'استخدم Khan Academy قسم الأحياء.',
        'اعمل ملخصات مرئية (رسوم تخطيطية) لكل وحدة قبل حفظها - الصورة أبقى من الكلمة.'
      ],
      weak: [
        'أعد ملخصات مرئية (رسوم تخطيطية) لكل جهاز من أجهزة الجسم.',
        'ركز على الجينيات لأنها الأثقل وزناً في الامتحان الوزاري.',
        'حل مسائل الجينيات (مربعات بونيت) يومياً حتى تصبح آلية تماماً.',
        'شاهد قناة الأوائل للأحياء الأردنية.',
        'حل 3 سنوات وزارية مع تحليل مفصل للأخطاء.',
        'استخدم تطبيق Visible Body لتصور التشريح ثلاثي الأبعاد - يقوي الفهم البصري.'
      ],
      good: [
        'راجع جميع أجهزة جسم الإنسان ووظائفها المتداخلة.',
        'حل نماذج وزارية كاملة بتوقيت فعلي.',
        'ركز على الفيروسات والبكتيريا - أسئلتها متكررة ودقيقة.',
        'اربط الوحدات ببعضها: كيف يؤثر الجهاز الهضمي على الجهاز الدوري؟ الفهم التكاملي مهم.',
        'استخدم OpenStax Biology (مجاني) كمرجع إضافي للمفاهيم الصعبة.'
      ],
      vgood: [
        'ادرس وحدة الفيروسات والبكتيريا بعمق - أسئلتها شائعة جداً.',
        'راجع التعابير العلمية المطلوبة في الإجابات - الصياغة الدقيقة مهمة.',
        'حل أسئلة صعوبة عالية من سنوات 2020-2024.',
        'ركز على التكاثر والوراثة - هي الوحدات الأكثر تعقيداً والأعلى تمييزاً.'
      ],
      excel: [
        'أنت في مستوى ممتاز - حافظ على هذا المستوى.',
        'اطلع على مقدمة التشريح والفسيولوجيا من OpenStax (مجانية تماماً).',
        'جرب تطبيق Visible Body لتصور التشريح ثلاثي الأبعاد - متعة حقيقية.'
      ]
    }
  },

  eng_adv: {
    icon: '📝',
    universityRelevance: 'اللغة الإنجليزية هي لغة العلم والعمل والمعرفة. أكثر من 90% من المراجع الجامعية الطبية والهندسية والتكنولوجية باللغة الإنجليزية. مهندس أو طبيب بإنجليزي متقن يحصل على فرص توظيف وراتب أعلى بكثير. ضعفها يعني قطيعة شبه كاملة مع المعرفة العالمية.',
    jobImpact: ['جميع التخصصات العلمية', 'الطب والهندسة', 'تكنولوجيا المعلومات', 'الأعمال الدولية'],
    rootCauses: [
      'محدودية المفردات (مخزون أقل من 2000 كلمة يكفي للبقاء لا للتفوق).',
      'الخوف من الخطأ يمنع الكتابة والتحدث الفعلي ويعيق التطور.',
      'الاكتفاء بحفظ القواعد النحوية دون استخدام فعلي ومستمر.'
    ],
    targets: { juniorMin: 60, seniorMin: 70 },
    planByLevel: {
      fail: [
        'احفظ 10 كلمات يومياً في جمل كاملة - وليس كلمات معزولة من القاموس.',
        'اقرأ نصاً إنجليزياً قصيراً يومياً من BBC Learning English.',
        'شاهد 20 دقيقة محتوى إنجليزي يومياً مع ترجمة (يوتيوب أو نتفليكس).',
        'افهم أزمنة Simple Present و Simple Past أولاً قبل باقي الأزمنة.',
        'استخدم تطبيق Duolingo يومياً كتكملة لا كبديل عن الكتاب.',
        'استخدم تطبيق Anki لحفظ المفردات بنظام التكرار المتباعد - أثبت علمياً.'
      ],
      weak: [
        'ركز على Reading Comprehension و Writing لأنهما الأثقل وزناً في الامتحان.',
        'تعلم كتابة فقرة وصفية وحجاجية ببنية واضحة (مقدمة، جسم، خاتمة).',
        'حل نماذج وزارية سابقة لفهم نمط الأسئلة المتكررة.',
        'استخدم British Council Online للتمارين المجانية الهادفة.',
        'شاهد قناة "تعلم الإنجليزية بالعربي" على يوتيوب للقواعد المشكلة.',
        'اكتب 5 جمل يومياً بالإنجليزية عن يومك - الممارسة تبني الثقة.'
      ],
      good: [
        'وسّع مفرداتك في مجال تخصصك (English for Medicine/Business/Science).',
        'تدرب على ترجمة نصوص تقنية من وإلى العربية.',
        'شاهد 30 دقيقة يومياً محتوى إنجليزياً تقنياً بلا ترجمة.',
        'أتقن قواعد الجمل الشرطية (Conditionals) والمبني للمجهول (Passive Voice).',
        'استخدم Grammarly (مجاني) للتحقق من كتاباتك والتعلم من الأخطاء.'
      ],
      vgood: [
        'اقرأ مقالات علمية بسيطة بالإنجليزية يومياً.',
        'تدرب على الكتابة الأكاديمية (IELTS Writing Task 1/2) لتطوير أسلوبك.',
        'حاول التحدث بالإنجليزية 10 دقائق يومياً مع نفسك أو تطبيق AI.',
        'استهدف تطوير مهارة الاستماع بمشاهدة TED Talks بدون ترجمة.'
      ],
      excel: [
        'أنت في مستوى ممتاز - الإنجليزي أصبح ميزتك التنافسية الفعلية.',
        'استهدف اختبار TOEFL أو IELTS - الشهادة تفيدك في المنح الجامعية.',
        'ابدأ قراءة ملخصات كتب جامعية بالإنجليزية في مجال تخصصك المستهدف.'
      ]
    }
  },

  arabic_spec: {
    icon: '📖',
    universityRelevance: 'اللغة العربية التخصصية هي أساس الحقوق والصحافة والشريعة والتعليم. في كلية الحقوق، تُصاغ القوانين والعقود بلغة فصحى دقيقة للغاية. في الصحافة، أسلوبك اللغوي هو هويتك المهنية. ضعف العربية يعني ضعف الشخصية المهنية في هذه المجالات كاملاً.',
    jobImpact: ['محامٍ / قاضٍ', 'صحفي / إعلامي', 'معلم', 'مستشار قانوني'],
    rootCauses: [
      'صعوبة في قواعد النحو والإعراب وخاصة الحالات الإعرابية المختلفة.',
      'عدم التمييز بين الأساليب البلاغية المختلفة وتوظيفها الصحيح.',
      'ضعف في الكتابة الإبداعية والتحليل الأدبي وليس في الحفظ فقط.'
    ],
    targets: { juniorMin: 60, seniorMin: 65 },
    planByLevel: {
      fail: [
        'ابدأ بتعلم الإعراب الأساسي: المبتدأ والخبر، الفاعل والمفعول به.',
        'اقرأ نصاً أدبياً قصيراً يومياً وحدد فيه نوع الجملة (اسمية، فعلية).',
        'احفظ 5 أبيات شعرية أسبوعياً وافهم معناها الحقيقي.',
        'استخدم تطبيق "إعراب" لتعلم قواعد النحو بشكل تفاعلي.',
        'شاهد قناة أدب عربي أو نحو وبلاغة على يوتيوب.',
        'اكتب فقرة يومياً بلغة فصحى حتى لو بسيطة - الممارسة اليومية أساسية.'
      ],
      weak: [
        'اعمل ملخصاً منظماً لقواعد النحو الأساسية في جدول مرتب.',
        'تدرب على تحليل النصوص: الفكرة الرئيسية، الأسلوب، الصور البلاغية.',
        'حل أسئلة وزارية سابقة في الإملاء والكتابة - ركز على الأسئلة المتكررة.',
        'اقرأ نصوصاً من مجمع اللغة العربية الأردني يومياً لتطوير أسلوبك.',
        'حل 3 سنوات وزارية مع تحليل أخطاء النحو والإملاء.'
      ],
      good: [
        'ركز على البلاغة: التشبيه والاستعارة والكناية وأساليب التأكيد.',
        'تدرب على كتابة المقالة والوصف ببنية متكاملة.',
        'حل نماذج وزارية كاملة بتوقيت فعلي.'
      ],
      vgood: [
        'اقرأ نصوصاً من التراث الأدبي (المتنبي، طه حسين) لتعميق الأسلوب.',
        'تدرب على الإجابات الكاملة والمدعومة بالأدلة النصية.',
        'حل أسئلة صعوبة عالية من سنوات 2020-2024.'
      ],
      excel: [
        'أنت في مستوى ممتاز - طوّر أسلوبك الكتابي الخاص.',
        'اطلع على مقدمة النقد الأدبي أو اللسانيات كتوسعة فكرية.',
        'جرب كتابة مقالة رأي أو قصة قصيرة - هذه مهارة تميزك مهنياً.'
      ]
    }
  },

  islamic_spec: {
    icon: '🕌',
    universityRelevance: 'علوم الشريعة هي أساس كليات الشريعة والقانون الإسلامي والدراسات الإسلامية. هذه الكليات تتطلب دقة متناهية في فهم الأحكام الفقهية وأسباب النزول وأصول التشريع الإسلامي. من يفهم "لماذا" الحكم يتفوق دائماً على من يحفظه فقط.',
    jobImpact: ['قاضٍ شرعي', 'مستشار قانون إسلامي', 'معلم تربية إسلامية', 'داعية'],
    rootCauses: [
      'الخلط بين الأحكام الشرعية وأدلتها من القرآن والسنة.',
      'ضعف في الربط بين الأحكام وسياقاتها الفقهية الأشمل.',
      'عدم استيعاب الفقه بمقاصده الكلية الخمسة.'
    ],
    targets: { juniorMin: 60, seniorMin: 65 },
    planByLevel: {
      fail: [
        'اعمل جدولاً واضحاً بالأحكام الأساسية وأدلتها من القرآن والسنة.',
        'افهم مقاصد الشريعة الخمسة: الدين، النفس، العقل، النسل، المال.',
        'استعن بمعلم ديني لفهم المسائل المعقدة قبل حفظها.',
        'استخدم موقع الدرر السنية للمراجعة والتثبيت.',
        'لا تنتقل لحكم جديد قبل أن تعرف دليله وسياقه.'
      ],
      weak: [
        'ركز على أبواب العبادات أولاً (الطهارة، الصلاة، الزكاة) لأنها الأثقل.',
        'اربط كل حكم بدليله من القرآن أو السنة - الدليل يُثبت الحكم.',
        'حل أسئلة وزارية سابقة وحدد الأسئلة الأكثر تكراراً.',
        'اعمل ملخصاً منظماً لكل باب فقهي بشكل تدريجي.',
        'استخدم موقع إسلام ويب للبحث في المسائل الفقهية.'
      ],
      good: [
        'ادرس باب المعاملات (البيع والإجارة والضمان) بعمق.',
        'ركز على أسئلة الإجابة الكاملة التي تحتاج لشرح وتدليل.',
        'حل نماذج وزارية من 3 سنوات بتوقيت فعلي.'
      ],
      vgood: [
        'راجع الفقه المقارن وأدلة المذاهب في المسائل الخلافية.',
        'تدرب على صياغة الإجابات المفصلة المدعومة بالأدلة.',
        'حل أسئلة صعوبة عالية من السنوات الأخيرة.'
      ],
      excel: [
        'أنت في مستوى ممتاز. حافظ على هذا الأداء.',
        'اطلع على مبادئ أصول الفقه وتأثيرها في استنباط الأحكام.',
        'اقرأ في كتب الفقه المبسطة من المستوى الجامعي كتوسعة فكرية.'
      ]
    }
  },

  cs: {
    icon: '💻',
    universityRelevance: 'علوم الحاسوب هي حجر الأساس لتخصصات التكنولوجيا (IT, AI, Cybersecurity). البرمجة وتفكير الخوارزميات التي تدرسها الآن ستمنحك أفضلية كبرى في السنة الجامعية الأولى.',
    jobImpact: ['مطور برمجيات', 'مهندس بيانات', 'مختص أمن سيبراني', 'محلل نظم'],
    rootCauses: [
      'التركيز على الحفظ النظري بدلاً من كتابة الكود الفعلي وتجربته.',
      'صعوبة في فهم التفكير المنطقي المتسلسل للخوارزميات.'
    ],
    targets: { juniorMin: 65, seniorMin: 75 },
    planByLevel: {
      fail: [
        'ركز على الأساسيات (المتغيرات، الجمل الشرطية، الحلقات). اكتب كوداً بسيطاً كل يوم.',
        'ارسم المخطط الانسيابي (Flowchart) قبل كتابة أي كود. التفكير قبل الكتابة.',
        'استخدم Code.org للبدء - مجاني وتفاعلي ومصمم للمبتدئين.',
        'حل تمارين بسيطة من W3Schools لبناء الثقة.',
        'لا تخف من رسائل الخطأ - كل خطأ فرصة تعلم حقيقية.'
      ],
      weak: [
        'اعمل على فهم المصفوفات (Arrays) وحلقات التكرار بعمق - هي الأساس.',
        'حل أخطاء برمجية جاهزة (Debugging) قبل كتابة كود جديد.',
        'استخدم replit.com لكتابة الكود مباشرة في المتصفح بلا تثبيت.',
        'شاهد قناة CS50 على يوتيوب من هارفارد - أفضل مقدمة في العالم لعلوم الحاسوب.',
        'حل 3 سنوات وزارية مع تحليل الأسئلة النظرية والتطبيقية.'
      ],
      good: [
        'انتقل للمفاهيم المتقدمة كالمصفوفات (Arrays). برمّج مشروعاً مدرسياً متكاملاً.',
        'استخدم منصة Codecademy لتعلم Python أو JavaScript بشكل منهجي.',
        'شارك في مسابقات البرمجة المدرسية (Competitive Programming) للتحدي الفعلي.',
        'ابنِ مشروعاً بسيطاً: حاسبة، أو قائمة مهام، أو لعبة صغيرة.'
      ],
      vgood: [
        'استكشف لغات جديدة كـ Python. ابدأ بمشاريع فعلية على GitHub.',
        'شارك في مسابقات البرمجة التنافسية (Competitive Programming).',
        'تعلم أساسيات قواعد البيانات (SQL) - مهارة مطلوبة في كل وظيفة تقنية.',
        'استكشف منصة LeetCode لتمارين الخوارزميات.'
      ],
      excel: [
        'مستواك جاهز للجامعة. ابدأ بالاطلاع على Data Structures & Algorithms.',
        'ساهم في مشاريع مفتوحة المصدر (Open Source) على GitHub.',
        'ابنِ محفظة مشاريع (Portfolio) تُظهر مهاراتك لجهات القبول والتوظيف.'
      ]
    }
  },

  mgmt: {
    icon: '💼',
    universityRelevance: 'الإدارة والاقتصاد تبني العقلية القيادية لفهم سوق العمل والمؤسسات، وهي مقدمة أساسية لكليات الأعمال.',
    jobImpact: ['مدير أعمال', 'مسؤول تسويق', 'رائد أعمال', 'محلل أعمال'],
    rootCauses: ['الاعتماد على التلقين دون ربط النظريات بواقع الشركات.'],
    targets: { juniorMin: 65, seniorMin: 70 },
    planByLevel: {
      fail: [
        'لخص المفاهيم بكلماتك الخاصة واربطها بشركات أردنية معروفة.',
        'ابحث عن أمثلة حقيقية لكل نظرية إدارية من السوق المحلي.',
        'استخدم منصة إدراك للدورات الإدارية بالعربي.'
      ],
      weak: [
        'حلل حالات دراسية حقيقية (Case Studies) من الشركات الأردنية.',
        'اربط النظريات بالواقع: كيف تطبق شركة زين أو الأردن للاتصالات نظرية بعينها؟',
        'حل نماذج وزارية سابقة.'
      ],
      good: [
        'تابع أخبار الاقتصاد والأعمال واربطها بالمناهج.',
        'اقرأ ملخصات كتب إدارية مثل "من تحريك الجبن" أو "7 عادات الناس الأكثر فاعلية".'
      ],
      vgood: [
        'شارك في مسابقات ريادة الأعمال الطلابية.',
        'تعلم أساسيات Excel للتحليل المالي - مهارة ضرورية لكل تخصص أعمال.'
      ],
      excel: [
        'مستواك قيادي وممتاز.',
        'ابدأ بقراءة مقدمة كتاب Principles of Management الجامعي.'
      ]
    }
  },

  history: {
    icon: '🏛',
    universityRelevance: 'التاريخ يبني الوعي بالماضي لفهم الحاضر، وهو أساس للعلوم الإنسانية والسياسية.',
    jobImpact: ['محلل سياسي', 'معلم', 'دبلوماسي'],
    rootCauses: ['الحفظ الأصم للتواريخ بدل فهم تسلسل وتأثير الأحداث.'],
    targets: { juniorMin: 60, seniorMin: 65 },
    planByLevel: {
      fail: [
        'استخدم الخرائط الذهنية والزمنية (Timelines) لتنظيم الأحداث.',
        'اربط كل حدث بسببه المباشر والبعيد - التاريخ سلسلة من الأسباب والنتائج.',
        'شاهد فيديوهات توضيحية من منصة إدراك.'
      ],
      weak: [
        'اربط الأحداث بأسبابها ونتائجها.',
        'حل نماذج وزارية سابقة وركز على الأسئلة التحليلية.',
        'اعمل ملخصات زمنية لكل حقبة تاريخية.'
      ],
      good: [
        'اقرأ عن الأحداث من مصادر تاريخية متعددة.',
        'تدرب على الإجابة التحليلية المدعومة بالأدلة التاريخية.'
      ],
      vgood: [
        'ركز على التحليل والنقد التاريخي.',
        'تدرب على مقارنة الحقب التاريخية والاستخلاص منها.'
      ],
      excel: ['أداء استثنائي. ابدأ بقراءة مقدمة العلوم السياسية والعلاقات الدولية.']
    }
  },

  geo: {
    icon: '🌍',
    universityRelevance: 'الجغرافيا الحديثة مرتبطة بالتخطيط البيئي والاقتصاد والسياسة المائية.',
    jobImpact: ['مخطط استراتيجي', 'باحث بيئي', 'خبير نظم معلومات جغرافية (GIS)'],
    rootCauses: ['عدم القدرة على قراءة وتحليل الخرائط الجغرافية بشكل صحيح.'],
    targets: { juniorMin: 60, seniorMin: 65 },
    planByLevel: {
      fail: [
        'تدرب على قراءة الخرائط وتحديد المواقع الأساسية.',
        'استخدم Google Earth لرؤية المناطق الجغرافية بشكل مرئي حقيقي.',
        'ابدأ بالجغرافيا الطبيعية قبل البشرية.'
      ],
      weak: [
        'افهم العلاقة بين البيئة الجغرافية والموارد الاقتصادية.',
        'حل نماذج وزارية سابقة.'
      ],
      good: [
        'ركز على الجغرافيا السياسية والبيئية.',
        'تدرب على تحليل الخرائط والرسوم البيانية الجغرافية.'
      ],
      vgood: [
        'استخدم تطبيقات الخرائط الحديثة كـ Google Earth.',
        'تعلم أساسيات نظم المعلومات الجغرافية (GIS).'
      ],
      excel: ['أداء استثنائي وممتاز. ابدأ بالاطلاع على نظم GIS.']
    }
  }
}

// =============================================
// RESOURCES DATABASE - COMPREHENSIVE
// =============================================
const resourcesDB = {
  math: [
    { name: 'قناة الأوائل', url: 'https://awa2el.net', icon: '▶️', type: 'عربي' },
    { name: 'Khan Academy عربي', url: 'https://ar.khanacademy.org', icon: '🌐', type: 'مجاني' },
    { name: 'سامر رشاد - وتد', url: 'https://watad.me', icon: '🎓', type: 'عربي' },
    { name: 'Photomath', url: 'https://photomath.com', icon: '📱', type: 'تطبيق' },
    { name: 'Desmos Graphing', url: 'https://www.desmos.com/calculator', icon: '📊', type: 'أداة' }
  ],
  math_adv: [
    { name: 'سامر رشاد - وتد', url: 'https://watad.me', icon: '🎓', type: 'عربي' },
    { name: '3Blue1Brown', url: 'https://www.3blue1brown.com', icon: '🧠', type: 'إنجليزي' },
    { name: 'Prof. Leonard', url: 'https://www.youtube.com/c/ProfessorLeonard', icon: '▶️', type: 'إنجليزي' },
    { name: 'Khan Academy عربي', url: 'https://ar.khanacademy.org', icon: '🌐', type: 'مجاني' },
    { name: 'Wolfram Alpha', url: 'https://www.wolframalpha.com', icon: '🔢', type: 'أداة' }
  ],
  math_biz: [
    { name: 'قناة الأوائل', url: 'https://awa2el.net', icon: '▶️', type: 'عربي' },
    { name: 'Khan Academy - مالية', url: 'https://www.khanacademy.org/economics-finance-domain', icon: '🌐', type: 'مجاني' },
    { name: 'Coursera - Finance', url: 'https://www.coursera.org', icon: '🎓', type: 'دورة' },
    { name: 'Investopedia', url: 'https://www.investopedia.com', icon: '📈', type: 'مرجع' }
  ],
  physics: [
    { name: 'قناة يوسف عودة', url: 'https://www.youtube.com/@yousufawdeh', icon: '▶️', type: 'عربي' },
    { name: 'PhET Simulations', url: 'https://phet.colorado.edu', icon: '🧪', type: 'تفاعلي' },
    { name: 'Khan Academy Physics', url: 'https://www.khanacademy.org/science/physics', icon: '🌐', type: 'مجاني' },
    { name: 'قناة الأوائل - فيزياء', url: 'https://awa2el.net', icon: '▶️', type: 'عربي' }
  ],
  chem: [
    { name: 'قناة سامر عماد', url: 'https://www.youtube.com', icon: '▶️', type: 'عربي' },
    { name: 'Khan Academy Chemistry', url: 'https://www.khanacademy.org/science/chemistry', icon: '🌐', type: 'مجاني' },
    { name: 'Ptable - الجدول الدوري', url: 'https://ptable.com', icon: '📊', type: 'أداة' },
    { name: 'PhET Chemistry', url: 'https://phet.colorado.edu', icon: '🧪', type: 'تفاعلي' },
    { name: 'Chemist App', url: 'https://chemist.su', icon: '📱', type: 'تطبيق' }
  ],
  bio: [
    { name: 'قناة الأوائل - أحياء', url: 'https://awa2el.net', icon: '▶️', type: 'عربي' },
    { name: 'Amoeba Sisters', url: 'https://www.youtube.com/@AmoebaSisters', icon: '▶️', type: 'رسوم' },
    { name: 'Visible Body App', url: 'https://www.visiblebody.com', icon: '📱', type: 'تطبيق' },
    { name: 'OpenStax Biology', url: 'https://openstax.org/subjects/science', icon: '📚', type: 'مجاني' },
    { name: 'Khan Academy Biology', url: 'https://www.khanacademy.org/science/biology', icon: '🌐', type: 'مجاني' }
  ],
  eng_adv: [
    { name: 'BBC Learning English', url: 'https://www.bbc.co.uk/learningenglish', icon: '🌐', type: 'مجاني' },
    { name: 'British Council Online', url: 'https://learnenglish.britishcouncil.org', icon: '🌐', type: 'مجاني' },
    { name: 'Duolingo', url: 'https://www.duolingo.com', icon: '📱', type: 'تطبيق' },
    { name: 'Anki Flashcards', url: 'https://apps.ankiweb.net', icon: '🃏', type: 'تطبيق' },
    { name: 'Grammarly', url: 'https://www.grammarly.com', icon: '✍️', type: 'أداة' }
  ],
  arabic_spec: [
    { name: 'مجمع اللغة العربية الأردني', url: 'https://www.arabic.jo', icon: '🏛', type: 'مرجع رسمي' },
    { name: 'تطبيق إعراب', url: 'https://play.google.com/store/apps/details?id=com.erbapp.errab', icon: '📱', type: 'تطبيق' },
    { name: 'موقع الأدب العربي', url: 'https://www.adab.com', icon: '📖', type: 'مرجع' }
  ],
  islamic_spec: [
    { name: 'موقع الدرر السنية', url: 'https://dorar.net', icon: '📚', type: 'موسوعة' },
    { name: 'إسلام ويب', url: 'https://www.islamweb.net', icon: '🌐', type: 'مجاني' }
  ],
  finance: [
    { name: 'Khan Academy - اقتصاد', url: 'https://www.khanacademy.org/economics-finance-domain', icon: '🌐', type: 'مجاني' },
    { name: 'Investopedia', url: 'https://www.investopedia.com', icon: '📈', type: 'مرجع' }
  ],
  cs: [
    { name: 'Code.org', url: 'https://code.org', icon: '💻', type: 'مجاني' },
    { name: 'W3Schools', url: 'https://w3schools.com', icon: '🌐', type: 'مرجع' },
    { name: 'CS50 Harvard', url: 'https://cs50.harvard.edu', icon: '🎓', type: 'مجاني' },
    { name: 'Codecademy', url: 'https://www.codecademy.com', icon: '🖥️', type: 'دورة' },
    { name: 'Replit', url: 'https://replit.com', icon: '⚡', type: 'أداة' }
  ],
  mgmt: [
    { name: 'إدراك - إدارة', url: 'https://www.edraak.org', icon: '🎓', type: 'عربي' },
    { name: 'Coursera - Business', url: 'https://www.coursera.org', icon: '📚', type: 'دورة' }
  ],
  history: [
    { name: 'منصة إدراك', url: 'https://www.edraak.org', icon: '🎓', type: 'عربي' }
  ],
  geo: [
    { name: 'Google Earth', url: 'https://earth.google.com', icon: '🌍', type: 'أداة' }
  ]
}

// =============================================
// MAJORS DB - FIXED: All IT majors min 75
// =============================================
const majorsDB = {
  Health: [
    { name: 'طب بشري', minGPA: 85, govMin: 85, competitive: true },
    { name: 'طب أسنان', minGPA: 85, govMin: 85, competitive: true },
    { name: 'دكتور صيدلة (PharmD)', minGPA: 80, govMin: 80, competitive: true },
    { name: 'صيدلة', minGPA: 78, govMin: 78, competitive: true },
    { name: 'تمريض', minGPA: 65, govMin: 65, competitive: false },
    { name: 'علوم طبية مخبرية', minGPA: 68, govMin: 68, competitive: false }
  ],
  EngineeringIT: [
    { name: 'هندسة مدنية', minGPA: 80, govMin: 80, competitive: true },
    { name: 'هندسة عمارة', minGPA: 80, govMin: 80, competitive: true },
    { name: 'هندسة حاسوب', minGPA: 80, govMin: 80, competitive: true },
    { name: 'هندسة ميكاترونيكس', minGPA: 80, govMin: 80, competitive: true },
    { name: 'ذكاء اصطناعي (AI)', minGPA: 75, govMin: 75, competitive: true },
    { name: 'أمن سيبراني', minGPA: 75, govMin: 75, competitive: true },
    { name: 'علم البيانات (Data Science)', minGPA: 75, govMin: 75, competitive: true },
    { name: 'علم حاسوب (CS)', minGPA: 75, govMin: 75, competitive: true },
    // FIXED: نظم معلومات now 75 like all IT majors
    { name: 'نظم معلومات', minGPA: 75, govMin: 75, competitive: false }
  ],
  Business: [
    { name: 'محاسبة', minGPA: 65, govMin: 65, competitive: false },
    { name: 'إدارة أعمال', minGPA: 65, govMin: 65, competitive: false },
    { name: 'تسويق رقمي', minGPA: 65, govMin: 65, competitive: false },
    { name: 'اقتصاد', minGPA: 67, govMin: 67, competitive: false },
    { name: 'مالية ومصرفية', minGPA: 67, govMin: 67, competitive: false }
  ],
  Humanities: [
    { name: 'حقوق (قانون)', minGPA: 65, govMin: 65, competitive: false },
    { name: 'شريعة إسلامية', minGPA: 65, govMin: 65, competitive: false },
    { name: 'لغة إنجليزية وآدابها', minGPA: 65, govMin: 65, competitive: false },
    { name: 'لغة عربية وآدابها', minGPA: 65, govMin: 65, competitive: false },
    { name: 'ترجمة وتفسير', minGPA: 68, govMin: 68, competitive: false }
  ]
}

function getFieldName(f) {
  const m = {
    Health: 'الحقل الصحي والطبي',
    EngineeringIT: 'الحقل الهندسي والتكنولوجي',
    Business: 'حقل إدارة الأعمال والمالية',
    Humanities: 'حقل العلوم الاجتماعية والإنسانية'
  }
  return m[f] || f
}

function getSubjectName(k) {
  const m = {
    math: 'الرياضيات',
    physics: 'الفيزياء',
    chem: 'الكيمياء',
    bio: 'الأحياء',
    math_adv: 'الرياضيات المتقدمة',
    adv_eng: 'اللغة الإنجليزية',
    eng_adv: 'اللغة الإنجليزية',
    adv_math: 'الرياضيات المتقدمة',
    biz_math: 'رياضيات الأعمال',
    math_biz: 'رياضيات الأعمال',
    finance: 'الثقافة المالية',
    mgmt: 'الإدارة والاقتصاد',
    spec_arabic: 'عربي تخصص',
    arabic_spec: 'عربي تخصص',
    history: 'التاريخ',
    geo: 'الجغرافيا',
    spec_islamic: 'علوم إسلامية',
    islamic_spec: 'علوم إسلامية',
    cs: 'علوم الحاسوب',
    math_phys_earth: 'المادة الاختيارية',
    chem_bio_earth: 'المادة الاختيارية',
    biz_opt: 'المادة الاختيارية',
    hum_social_opt: 'المادة الاختيارية'
  }
  return m[k] || k
}

// UNIFIED LEVEL FUNCTION - consistent across all components
// fail: 0-49 | weak: 50-64 | good: 65-79 | vgood: 80-92 | excel: 93-100
function getLevel(score) {
  if (score < 50) return 'fail'
  if (score < 65) return 'weak'
  if (score < 80) return 'good'
  if (score < 93) return 'vgood'
  return 'excel'
}

function getSubjectTarget(key) {
  return subjectMeta[key]?.targets?.seniorMin || 65
}

// LEVEL RANGE LABELS - consistent display
function getLevelRangeLabel(level) {
  const labels = {
    fail: 'راسب (0–49%)',
    weak: 'مقبول (50–64%)',
    good: 'جيد (65–79%)',
    vgood: 'جيد جداً (80–92%)',
    excel: 'امتياز (93–100%)'
  }
  return labels[level] || level
}

function buildImprovementItem(key, score) {
  const meta = subjectMeta[key] || {}
  const level = getLevel(score)
  const target = getSubjectTarget(key)
  const gap = Math.max(0, target - score)
  const plan = meta.planByLevel?.[level] || ['راجع المادة يومياً.', 'حل أسئلة سابقة.', 'استعن بمعلم.']

  // UNIFIED DIAGNOSIS MESSAGES
  let diagnosis
  if (score >= 93) {
    diagnosis = 'المستوى: امتياز (93%+). أداء استثنائي فعلاً - أنت في قمة المتفوقين. مهمتك الآن الحفاظ على هذا المستوى وتجنب الإرهاق قبل الامتحان.'
  } else if (score >= 80) {
    diagnosis = 'المستوى: جيد جداً (80–92%). أنت في المنطقة التنافسية بأداء قوي. الهدف: الوصول لمستوى الامتياز لضمان أعلى الخيارات الجامعية.'
  } else if (score >= 65) {
    diagnosis = 'المستوى: جيد (65–79%). مؤهل للجامعات الخاصة، لكن تنافسيتك محدودة. الهدف: تجاوز 80% لفتح نطاق أوسع من التخصصات.'
  } else if (score >= 50) {
    diagnosis = 'المستوى: مقبول (50–64%). ناجح مدرسياً لكن غير مؤهل بعد للقبول الجامعي التنافسي. الهدف العاجل: الوصول لـ 65% كحد أدنى.'
  } else {
    diagnosis = 'المستوى: راسب (أقل من 50%). الوضع يحتاج تدخلاً فورياً وجدياً. الهدف العاجل: الوصول لعلامة النجاح أولاً قبل أي هدف آخر.'
  }

  const colorMap = {
    fail: { accent: 'bg-rose-400', bar: 'bg-rose-400', status: 'bg-rose-500', statusText: 'راسب', scoreText: 'text-rose-500' },
    weak: { accent: 'bg-amber-400', bar: 'bg-amber-400', status: 'bg-amber-500', statusText: 'مقبول', scoreText: 'text-amber-600' },
    good: { accent: 'bg-yellow-400', bar: 'bg-yellow-400', status: 'bg-yellow-500', statusText: 'جيد', scoreText: 'text-yellow-600' },
    vgood: { accent: 'bg-sky-400', bar: 'bg-sky-400', status: 'bg-sky-500', statusText: 'جيد جداً', scoreText: 'text-sky-600' },
    excel: { accent: 'bg-emerald-400', bar: 'bg-emerald-400', status: 'bg-emerald-500', statusText: 'امتياز', scoreText: 'text-emerald-600' }
  }
  const timelineMap = {
    fail: '8–12 أسبوعاً للنجاح',
    weak: '6–8 أسابيع للقبول',
    good: '4–6 أسابيع للتنافس',
    vgood: '2–4 أسابيع للامتياز',
    excel: 'استدامة التميز'
  }

  const c = colorMap[level]
  return {
    subject: getSubjectName(key),
    icon: meta.icon || '📚',
    score,
    gapToTarget: gap,
    statusText: c.statusText,
    levelRangeLabel: getLevelRangeLabel(level),
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
    resources: resourcesDB[key] || [{ name: 'موقع الأوائل', url: 'https://awa2el.net', icon: '▶️', type: 'عربي' }]
  }
}

const sortedImprovementPlan = computed(() => {
  if (source !== 'grades') return []
  return Object.entries(grades).map(([k, s]) => buildImprovementItem(k, Number(s))).sort((a, b) => a.score - b.score)
})

const privateMinByField = { Health: 65, EngineeringIT: 60, Business: 60, Humanities: 55 }
const govMinByField = { Health: 65, EngineeringIT: 75, Business: 65, Humanities: 65 }
const competitiveByField = { Health: 85, EngineeringIT: 80, Business: 75, Humanities: 75 }

const privateMin = privateMinByField[field] || 60
const govMin = govMinByField[field] || 65
const competitiveMin = competitiveByField[field] || 80

const hasFailedSubject = Object.values(grades).some(s => Number(s) < 50)

const allFieldMajors = computed(() => {
  return (majorsDB[field] || []).map(m => ({
    ...m,
    eligible: gpa >= m.minGPA,
    competitive: m.minGPA >= 80
  })).sort((a, b) => b.eligible - a.eligible || a.minGPA - b.minGPA)
})

const eligibleMajors = computed(() => allFieldMajors.value.filter(m => m.eligible))

// =============================================
// LEARNING PLAN - FULLY DETAILED
// Uses same unified level ranges: 0-49, 50-64, 65-79, 80-92, 93-100
// =============================================
const learningPlan = computed(() => {
  if (source !== 'grades') return null
  const weakSubjects = Object.entries(grades).filter(([, s]) => Number(s) < 65).map(([k]) => getSubjectName(k))
  const failedSubjects = Object.entries(grades).filter(([, s]) => Number(s) < 50).map(([k]) => getSubjectName(k))

  // LEVEL: fail (gpa < 50) or has failed subject
  if (gpa < 50 || hasFailedSubject) return {
    title: 'برنامج التدخل العلاجي المكثف',
    subtitle: 'Academic Remediation Program - المستوى دون الحد الأدنى للنجاح',
    note: failedSubjects.length ? `المواد الحرجة: ${failedSubjects.join('، ')}` : 'جميع المواد تحتاج تعزيزاً',
    quote: 'التعلم الفعّال لا يبدأ بالحفظ، بل بتشخيص الفجوة ومعالجتها بمنهجية.',
    phases: [
      {
        name: 'المرحلة الأولى: التقييم التشخيصي',
        duration: 'الأسبوعان 1-2',
        target: 'تحديد الفجوات المعرفية بدقة',
        steps: [
          'طبّق اختباراً تشخيصياً ذاتياً في كل مادة لتحديد المفاهيم الغائبة بالضبط - لا تخمن، اختبر نفسك فعلياً.',
          'رتّب المواد حسب الأثر على المعدل. ابدأ بالمادة الأثقل وزناً في الامتحان.',
          'حدد الأنماط المتكررة للأخطاء. هل هي أخطاء إجرائية (حسابية) أم مفاهيمية (سوء فهم)؟',
          'ضع جدولاً زمنياً صارماً يومياً (4 ساعات دراسة صافية) وأعلنه لأهلك للمساءلة.'
        ]
      },
      {
        name: 'المرحلة الثانية: إعادة البناء المعرفي',
        duration: 'الأسابيع 3-8',
        target: 'تجاوز حد النجاح 50% في كل مادة',
        steps: [
          'استخدم أسلوب التعلم التراكمي التصاعدي: لا تنتقل لمفهوم جديد قبل إتقان السابق بنسبة 80%.',
          'طبّق أسلوب الاسترجاع النشط (Active Recall): أغلق الكتاب وحاول كتابة ما تعلمته - هذا يرسّخ المعلومات 3 أضعاف الإعادة.',
          'استعن بمدرس متخصص لجلسات أسبوعية منظمة مع أهداف محددة لكل جلسة.',
          'حل تمارين الكتاب كاملة بالتسلسل - لا تتجاوز تمريناً واحداً دون حل.',
          'وثّق الأخطاء في دفتر مخصص وعاود حلها يومياً حتى تختفي.'
        ]
      },
      {
        name: 'المرحلة الثالثة: التعزيز والتقييم',
        duration: 'الأسابيع 9-12',
        target: 'الوصول لـ 60-65% والتأهل الأولي للجامعة',
        steps: [
          'حل امتحاناً وزارياً كاملاً أسبوعياً بظروف محاكية للامتحان الحقيقي (صمت، توقيت دقيق).',
          'استخدم أسلوب التكرار المتباعد (Spaced Repetition) للمعلومات التي تتراكم.',
          'راجع نسبة التحسن الأسبوعية وعدّل خطتك بناءً على البيانات لا على الانطباع.',
          'حافظ على نوم منتظم 7-8 ساعات. الدراسات تؤكد أن النوم ضروري لتوطيد الذاكرة طويلة الأمد.'
        ]
      }
    ]
  }

  // LEVEL: weak (gpa 50-64)
  if (gpa < 65) return {
    title: 'برنامج تعزيز الكفاءة الأكاديمية',
    subtitle: 'Academic Proficiency Enhancement - المستوى دون حد القبول الجامعي',
    note: weakSubjects.length ? `مواد تحتاج تعزيزاً: ${weakSubjects.join('، ')}` : 'جميع المواد في نطاق القبول المحدود',
    quote: 'الكفاءة الأكاديمية ليست موهبة فطرية، هي مهارة تُبنى بممارسة منهجية ومقيسة.',
    phases: [
      {
        name: 'المرحلة الأولى: تحليل الفجوة',
        duration: 'الأسبوعان 1-2',
        target: 'خارطة واضحة للأولويات',
        steps: [
          'طبّق تحليل SWOT أكاديمياً: نقاط القوة، الضعف، الفرص، والتهديدات في كل مادة.',
          'حدّد الوحدات ذات الوزن الأعلى في كل امتحان وخصص لها 60% من وقت الدراسة.',
          'راجع آخر 3 سنوات وزارية لاستخراج أنماط الأسئلة المتكررة في كل مادة.',
          'ضع خطة دراسية أسبوعية مكتوبة قابلة للقياس. هدف لكل يوم لا لكل أسبوع.'
        ]
      },
      {
        name: 'المرحلة الثانية: التعلم النشط المكثف',
        duration: 'الأسابيع 3-8',
        target: 'رفع كل مادة بمعدل 10-15%',
        steps: [
          'طبّق أسلوب فاينمان (Feynman Technique): اشرح المفهوم بكلماتك البسيطة - إن عجزت فأنت لا تفهمه حقاً.',
          'حل 3 سنوات وزارية كاملة لكل مادة مع توثيق نوع الخطأ في كل سؤال.',
          'انضم لمجموعة دراسية صغيرة (2-3 أشخاص) مرة أسبوعياً للمناقشة والتصحيح المتبادل.',
          'خصص 20 دقيقة يومياً للمراجعة التراكمية للمواد السابقة لمنع النسيان.',
          'لا تنتقل من مادة لأخرى قبل الوصول لـ 65% في التدريب الذاتي.'
        ]
      },
      {
        name: 'المرحلة الثالثة: التحضير للامتحان',
        duration: 'الأسابيع 9-12',
        target: 'تجاوز 65% وتأهيل للقبول الجامعي',
        steps: [
          'محاكاة كاملة لظروف الامتحان الرسمي: توقيت، صمت، لا مراجعة أثناء الحل.',
          'حلل نتائج كل محاكاة بمنهجية - طوّر معادلة شخصية لمعرفة نقاط الخسارة الأكثر.',
          'في الأسبوع الأخير: مراجعة القوانين والعناصر الأساسية فقط - لا تتعلم مادة جديدة.',
          'ضع خطة زمنية لحل الامتحان: كم دقيقة لكل سؤال وكيف توزع الوقت.'
        ]
      }
    ]
  }

  // LEVEL: good (gpa 65-79)
  if (gpa < 80) return {
    title: 'برنامج التطوير الأكاديمي التنافسي',
    subtitle: 'Competitive Academic Development - المستوى: مؤهل للقبول / ما دون التنافسي',
    note: weakSubjects.length ? `مواد تحتاج تعزيزاً: ${weakSubjects.join('، ')}` : 'جميع المواد فوق حد القبول',
    quote: 'التحسين المستمر المقاس هو الفارق الحقيقي بين الكفاءة والتميز.',
    phases: [
      {
        name: 'المرحلة الأولى: إغلاق الثغرات التفصيلية',
        duration: 'الأسابيع 1-3',
        target: 'لا مادة دون 70%',
        steps: [
          'حلل خسائرك بدقة على مستوى الوحدة لا المادة: في أي وحدة بالضبط تخسر أكثر الدرجات؟',
          'ركز على "الأسئلة التمييزية" - الأسئلة التي تميز الجيد عن الممتاز في الامتحان.',
          'تحوّل من أسلوب الفهم إلى أسلوب الإتقان: الفهم يكفي للنجاح، لكن الإتقان فقط يصنع التميز.',
          'راجع 5 سنوات وزارية واستخرج جدول تكرار الأسئلة - خصص وقتاً بناءً على التكرار.'
        ]
      },
      {
        name: 'المرحلة الثانية: بناء الدقة والسرعة',
        duration: 'الأسابيع 4-8',
        target: 'تجاوز 80% في التدريب',
        steps: [
          'تدرب على إنجاز الامتحان في 70% من الوقت الرسمي - الفائض يُعطيك مراجعة نهائية.',
          'قلّص الأخطاء الإجرائية (حسابية، إملائية، إغفال وحدات القياس) - هي دائماً أسهل الدرجات تُستعاد.',
          'حل كل سؤال ثم تحقق منه فوراً قبل الانتقال - لا تنتظر نهاية الامتحان للمراجعة.',
          'استخدم تقنية "الاسترجاع التدريجي" (Retrieval Practice): امتحن نفسك يومياً بلا كتاب أمامك.',
          'اعمل مخططاً بيانياً لتقدمك الأسبوعي - التحسن المرئي محفز نفسياً مثبت علمياً.'
        ]
      },
      {
        name: 'المرحلة الثالثة: التحضير النهائي عالي الجودة',
        duration: 'الأسابيع 9-12',
        target: 'الوصول للنطاق التنافسي (80%+)',
        steps: [
          'محاكاة يومية كاملة في الأسبوع الأخير قبل الامتحان.',
          'ركز على أسئلة التطبيق التحليلية متعددة الخطوات - هي مصدر الفارق في النتائج.',
          'مراجعة خفيفة فقط في الأسبوع الأخير: القوانين، الرسوم البيانية، الخلاصات.',
          'احرص على الجانب النفسي: نوم منتظم، تغذية جيدة، تقليل الضغط - الاستعداد البدني جزء من الأداء.'
        ]
      }
    ]
  }

  // LEVEL: vgood (gpa 80-92)
  if (gpa < 93) return {
    title: 'برنامج الإتقان الأكاديمي',
    subtitle: 'Academic Mastery Program - المستوى: تنافسي / ما دون الامتياز',
    note: 'المستوى الحالي يؤهل لأغلب التخصصات - الهدف الوصول لمستوى الامتياز',
    quote: '"Excellence is not a destination you arrive at once, but a standard you keep choosing." - Michael Jordan',
    phases: [
      {
        name: 'المرحلة الأولى: تحليل الأداء المتقدم',
        duration: 'الأسبوعان 1-2',
        target: 'تحديد نقاط الخسارة الخفية',
        steps: [
          'حلل امتحانات التدريب بمنهجية كمية: وثّق كل خطأ ونوعه (مفاهيمي / إجرائي / إهمال).',
          'ابحث عن "الأسئلة الفخ" التي تبدو سهلة لكنها مصدر خسارة غير متوقعة.',
          'حدّد بدقة الفجوة بين أداء التدريب وأداء الامتحانات الرسمية - وحلل أسبابها.',
          'راجع أصعب أسئلة سنوات 2019-2024 واحصُ كم منها كنت ستجيب عنه بشكل كامل.'
        ]
      },
      {
        name: 'المرحلة الثانية: الإتقان تحت الضغط',
        duration: 'الأسابيع 3-8',
        target: 'أداء +90% في كل تدريب',
        steps: [
          'امتحن نفسك أسبوعياً بامتحان وزاري كامل بتوقيت أقصر من الرسمي (80% من الوقت).',
          'حلّل كل خطأ صغير مهما بدا تافهاً: اكتب سببه وطريقة تجنبه مستقبلاً.',
          'اعمل على الدقة اللغوية والرياضية في الإجابات. الامتحانات الوزارية تكافئ الصياغة المتقنة.',
          'طوّر "ورقة الخلاصة الشخصية" لكل مادة: القوانين المهمة، أبرز الأخطاء، نصائح الوقت.',
          'حافظ على التوازن الجسدي: نوم 8 ساعات، 30 دقيقة رياضة يومياً - البيانات العلمية تؤكد أثرهما.'
        ]
      },
      {
        name: 'المرحلة الثالثة: ضبط الأداء والجاهزية الجامعية',
        duration: 'أسبوعان قبل الامتحان',
        target: 'الاستعداد الأمثل',
        steps: [
          'مراجعة ذهنية خفيفة فقط - لا تتعلم مادة جديدة في هذه المرحلة إطلاقاً.',
          'ثق بما أعددته: "الثقة المبنية على الإعداد" ليست غروراً - هي نتيجة طبيعية.',
          'ابدأ البحث المبكر عن متطلبات القبول في تخصصاتك المستهدفة والمنح المتاحة.',
          'ضع خطة "اليوم الصفري في الجامعة": ماذا ستقرأ في الصيف القادم كتحضير؟'
        ]
      }
    ]
  }

  // LEVEL: excel (gpa 93+)
  return {
    title: 'برنامج الحفاظ على التميز والجاهزية الجامعية',
    subtitle: 'Excellence Maintenance & University Readiness - المستوى: امتياز',
    note: 'أنت في مستوى القمة. مهمتك الحفاظ لا الوصول.',
    quote: '"The secret to sustained excellence is not working harder, but working smarter with deliberate practice." - Anders Ericsson',
    phases: [
      {
        name: 'مرحلة الاستدامة الذكية',
        duration: 'حتى الامتحان',
        target: 'الحفاظ على الأداء بأقصى كفاءة',
        steps: [
          'حافظ على روتينك الحالي دون تغيير جذري - ما وصلك لهنا سيوصلك للنهاية.',
          'استخدم أسلوب "الممارسة المتقنة" (Deliberate Practice): ركز فقط على نقاط الضعف الصغيرة المتبقية.',
          'مراجعة دورية خفيفة لا مكثفة. 30 دقيقة يومياً تكفي للحفاظ على ما اكتسبت.',
          'تجنب الإرهاق الأكاديمي (Burnout). حدّد وقتاً ثابتاً للراحة والأنشطة غير الدراسية.'
        ]
      },
      {
        name: 'مرحلة الجاهزية الجامعية المبكرة',
        duration: 'الصيف قبل الجامعة',
        target: 'التفوق من اليوم الأول',
        steps: [
          'اطلع على مقررات السنة الأولى في تخصصك المستهدف من المناهج المفتوحة (Coursera, MIT OCW).',
          'طوّر مهاراتك في اللغة الإنجليزية الأكاديمية - 90% من المراجع العلمية الجامعية بالإنجليزية.',
          'ابحث عن المنح الجامعية مبكراً - كثير منها يتطلب تقديماً قبل نتائج التوجيهي.',
          'أنشئ ملفك الشخصي المهني على LinkedIn مبكراً - اجعله يعكس إنجازاتك الأكاديمية.',
          'اقرأ في تاريخ التخصص الذي ستدرسه وأبرز إسهاماته. هذا يعطيك سياقاً عميقاً يميزك.'
        ]
      }
    ]
  }
})

// =============================================
// COMPUTED STYLING - unified level ranges
// =============================================
const gpaAccentBar = computed(() => {
  if (gpa >= 93) return 'bg-gradient-to-r from-emerald-400 to-emerald-500'
  if (gpa >= 80) return 'bg-gradient-to-r from-sky-400 to-sky-500'
  if (gpa >= 65) return 'bg-gradient-to-r from-amber-400 to-amber-500'
  if (gpa >= 50) return 'bg-gradient-to-r from-orange-400 to-orange-500'
  return 'bg-gradient-to-r from-rose-400 to-rose-500'
})

const gpaCircleColor = computed(() => {
  if (gpa >= 93) return '#10b981'
  if (gpa >= 80) return '#0ea5e9'
  if (gpa >= 65) return '#f59e0b'
  if (gpa >= 50) return '#f97316'
  return '#f43f5e'
})

const gpaStatusBadge = computed(() => {
  if (gpa >= 93) return 'bg-emerald-50 border-emerald-200 text-emerald-700'
  if (gpa >= 80) return 'bg-sky-50 border-sky-200 text-sky-700'
  if (gpa >= 65) return 'bg-amber-50 border-amber-200 text-amber-700'
  if (gpa >= 50) return 'bg-orange-50 border-orange-200 text-orange-600'
  return 'bg-rose-50 border-rose-200 text-rose-600'
})

function getGPAStatusText(g) {
  if (g >= 93) return 'امتياز'
  if (g >= 80) return 'جيد جداً'
  if (g >= 65) return 'جيد'
  if (g >= 50) return 'مقبول'
  return 'راسب'
}

function getGPASummaryTitle(g) {
  if (g < 50) return 'وضع أكاديمي حرج. يتطلب تدخلاً فورياً.'
  if (g < 65) return 'ناجح مدرسياً / غير مؤهل للقبول الجامعي بعد.'
  if (g < 80) return 'مؤهل للجامعات الخاصة. تنافسية متوسطة.'
  if (g < 93) return 'وضع تنافسي قوي - في المنطقة الآمنة.'
  return 'نخبة المتفوقين - منافس على أعلى التخصصات.'
}

function getGPADetailedMessage(g, f) {
  if (hasFailedSubject || g < 50) return 'المعدل أقل من حد النجاح. يجب تصحيح وضع المواد الراسب فيها فوراً قبل التفكير في الجامعة.'
  if (g < 65) return 'المعدل يتيح الدخول لكليات المجتمع (دبلوم) أو بعض الجامعات الخاصة. القبول الموحد الحكومي يتطلب 65%.'
  if (f === 'Health' && g < 80) return 'مؤهل لتخصصات التمريض والمخبر الطبي. الطب والصيدلة تتطلب 80-85%. ارفع تركيزك على الكيمياء والأحياء.'
  if (f === 'EngineeringIT' && g < 80) return 'أنت على بعد خطوة من تخصصات الذكاء الاصطناعي وعلم الحاسوب. تركيز إضافي على الرياضيات والفيزياء يفتح الباب.'
  if (f === 'EngineeringIT' && g >= 80) return 'أنت في النطاق التنافسي. تخصصات الهندسة الحكومية تحتاج +80%. ارفع علامات الفيزياء والرياضيات.'
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