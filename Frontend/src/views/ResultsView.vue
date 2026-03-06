<template>
  <div class="min-h-screen bg-[#0D0F14] text-white font-body" dir="rtl"
    style="background-image: radial-gradient(ellipse 80% 40% at 50% -10%, rgba(99,102,241,0.12), transparent);">

    <!-- BG effects -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute inset-0 opacity-[0.025]" style="background-image:linear-gradient(rgba(255,255,255,0.8)1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8)1px,transparent 1px);background-size:60px 60px;"></div>
      <div class="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px]" :class="gradientBlobColor" style="opacity:0.06;"></div>
    </div>

    <!-- Navbar -->
    <nav class="print:hidden relative z-50 max-w-6xl mx-auto px-6 py-5 flex justify-between items-center sticky top-0 backdrop-blur-xl border-b border-white/5">
      <div class="flex items-center gap-2.5">
        <span class="text-2xl">🧭</span>
        <span class="font-display text-lg font-black text-white tracking-tight">CareerCompass</span>
        <span class="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded-full font-bold">JO 2025</span>
      </div>
      <div class="flex gap-2.5">
        <button @click="printReport" class="bg-white/8 hover:bg-white/12 text-slate-300 px-4 py-2 rounded-xl text-sm font-bold border border-white/10 transition-all flex items-center gap-1.5">
          <span>🖨️</span> حفظ التقرير
        </button>
        <button @click="$router.go(-1)" class="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 px-4 py-2 rounded-xl text-sm font-bold border border-indigo-500/20 transition-all flex items-center gap-1.5">
          <span>←</span> تعديل العلامات
        </button>
      </div>
    </nav>

    <div class="relative z-10 max-w-6xl mx-auto px-5 pb-28 pt-10 print:p-4 print:max-w-none">

      <!-- ===== GRADES SOURCE VIEW ===== -->
      <div v-if="source === 'grades'" class="space-y-12">

        <!-- Hero Section -->
        <section class="animate-fade text-center mb-4">
          <div class="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-5 text-xs font-bold tracking-widest uppercase text-slate-400">
            {{ stage === 'junior' ? '🌱 تقرير تأسيسي (9-11)' : '🎓 تقرير الجاهزية الجامعية' }}
          </div>
          <h1 class="font-display text-4xl md:text-6xl font-black text-white mb-4 leading-[1.1] tracking-tight">
            تحليل مسار<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-l from-indigo-400 via-violet-400 to-blue-400">{{ getFieldName(field) }}</span>
          </h1>
          <p class="text-slate-400 max-w-2xl mx-auto font-medium text-base leading-relaxed">
            تقرير شامل يعتمد على معايير القبول الموحد الأردني وتحليل الفجوات الأكاديمية — مصمم خصيصاً لوضعك.
          </p>
        </section>

        <!-- GPA Card -->
        <section class="animate-fade-delay card-glass rounded-[2rem] overflow-hidden relative">
          <div class="absolute top-0 left-0 right-0 h-1" :class="gpaAccentBar"></div>
          <div class="p-8 md:p-10 flex flex-col md:flex-row items-center gap-10">
            <!-- Circle -->
            <div class="relative shrink-0">
              <svg class="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10"/>
                <circle cx="60" cy="60" r="50" fill="none" :stroke="gpaCircleColor" stroke-width="10"
                  stroke-linecap="round" :stroke-dasharray="314"
                  :stroke-dashoffset="314 - (314 * gpa / 100)"
                  style="transition: stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1); filter: drop-shadow(0 0 8px currentColor) drop-shadow(0 0 20px currentColor);"/>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="font-display text-4xl font-black text-white">{{ gpa }}%</span>
                <span class="text-[11px] font-bold text-slate-400 mt-0.5">المعدل</span>
              </div>
            </div>
            <!-- Text -->
            <div class="flex-1 text-center md:text-right">
              <div class="flex flex-wrap items-center gap-3 mb-4 justify-center md:justify-start">
                <h2 class="font-display text-3xl font-black text-white">الوضع الأكاديمي:</h2>
                <span class="text-base px-4 py-1.5 rounded-xl font-bold border" :class="gpaStatusBadge">
                  {{ getGPAStatusText(gpa) }}
                </span>
              </div>
              <p class="font-bold text-xl text-slate-200 mb-3">{{ getGPASummaryTitle(gpa) }}</p>
              <p class="text-slate-400 leading-relaxed border-r-2 border-indigo-500/30 pr-4 text-sm font-medium">
                {{ getGPADetailedMessage(gpa, field) }}
              </p>
              <!-- Key stats row -->
              <div class="mt-6 grid grid-cols-3 gap-3">
                <div class="bg-white/4 rounded-xl p-3 text-center border border-white/8">
                  <div class="text-lg font-black" :class="gpa >= 65 ? 'text-green-400' : 'text-red-400'">{{ gpa >= 65 ? '✓' : '✗' }}</div>
                  <div class="text-[10px] text-slate-500 font-bold mt-0.5">قبول خاص</div>
                </div>
                <div class="bg-white/4 rounded-xl p-3 text-center border border-white/8">
                  <div class="text-lg font-black" :class="gpa >= 75 ? 'text-green-400' : 'text-red-400'">{{ gpa >= 75 ? '✓' : '✗' }}</div>
                  <div class="text-[10px] text-slate-500 font-bold mt-0.5">قبول حكومي</div>
                </div>
                <div class="bg-white/4 rounded-xl p-3 text-center border border-white/8">
                  <div class="text-lg font-black" :class="gpa >= 85 ? 'text-green-400' : 'text-red-400'">{{ gpa >= 85 ? '✓' : '✗' }}</div>
                  <div class="text-[10px] text-slate-500 font-bold mt-0.5">تخصصات منافسة</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Ranked Majors (senior only) -->
        <section v-if="stage === 'senior'" class="animate-fade">
          <div class="flex items-center gap-4 mb-7">
            <div class="bg-violet-500/15 text-violet-400 p-2.5 rounded-xl text-lg border border-violet-500/20">🎯</div>
            <div>
              <h3 class="font-display text-2xl font-black text-white">التخصصات المرشحة لك</h3>
              <p class="text-sm text-slate-500 font-medium mt-0.5">الترتيب: المعدل (45%) + قوة المواد (40%) + توافق الشخصية (15%)</p>
            </div>
          </div>

          <div v-if="rankedMajors.length > 0" class="grid gap-5 md:grid-cols-3">
            <div v-for="(major, idx) in rankedMajors" :key="major.name"
              class="card-glass rounded-[1.8rem] p-6 relative overflow-hidden hover:-translate-y-1 hover:border-white/20 transition-all duration-300 group print:border-2">
              <!-- Rank badge -->
              <div class="absolute -left-3 -top-3 w-16 h-16 font-display font-black text-5xl flex items-center justify-center text-white/5 pointer-events-none select-none">
                {{ ['①','②','③'][idx] }}
              </div>
              <!-- Top line color -->
              <div class="absolute top-0 left-0 right-0 h-0.5 rounded-full opacity-70 transition-all duration-300 group-hover:opacity-100" :class="[['bg-yellow-400','bg-slate-400','bg-amber-600'][idx]]"></div>

              <div class="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <div class="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">{{ ['🥇 الأول', '🥈 الثاني', '🥉 الثالث'][idx] }}</div>
                  <h4 class="font-display font-black text-white text-lg leading-tight">{{ major.name }}</h4>
                  <span class="text-[11px] font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded-md mt-1.5 inline-block border border-white/8">
                    حد الأدنى: {{ major.minGPA }}%
                  </span>
                </div>
                <div class="w-14 h-14 rounded-full border-2 flex items-center justify-center font-black text-sm shrink-0 relative"
                  :class="getScoreRingColor(major.finalScore)">
                  <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="3"/>
                    <circle cx="28" cy="28" r="24" fill="none" :stroke="scoreToHex(major.finalScore)" stroke-width="3"
                      stroke-linecap="round" :stroke-dasharray="150.8"
                      :stroke-dashoffset="150.8 - (150.8 * major.finalScore / 100)"/>
                  </svg>
                  <span :class="getScoreTextColor(major.finalScore)" class="relative z-10 font-black text-xs">{{ major.finalScore }}%</span>
                </div>
              </div>

              <!-- Bar -->
              <div class="h-1.5 bg-white/6 rounded-full overflow-hidden mb-4 relative z-10">
                <div class="h-full rounded-full transition-all duration-1000" :class="getProgressBarColor(major.finalScore)"
                  :style="{ width: major.finalScore + '%' }"></div>
              </div>

              <!-- Confidence + Eligibility -->
              <div class="flex items-center justify-between mb-4 relative z-10">
                <span class="text-[11px] font-bold px-2.5 py-1 rounded-lg border" :class="confidenceBadge(major.confidence)">
                  {{ major.confidence }}
                </span>
                <span class="text-[11px] font-bold" :class="gpa >= major.minGPA ? 'text-green-400' : 'text-red-400'">
                  {{ gpa >= major.minGPA ? '✓ مؤهل الآن' : `⚠ يحتاج +${major.minGPA - gpa}%` }}
                </span>
              </div>

              <!-- Score breakdown -->
              <div class="grid grid-cols-3 gap-1.5 text-center relative z-10">
                <div class="bg-white/4 rounded-xl p-2 border border-white/6">
                  <div class="text-xs font-black text-slate-300">{{ Math.round(major.scores.gpaScore) }}%</div>
                  <div class="text-[9px] text-slate-500 font-bold mt-0.5">المعدل</div>
                </div>
                <div class="bg-white/4 rounded-xl p-2 border border-white/6">
                  <div class="text-xs font-black text-slate-300">{{ Math.round(major.scores.subjectScore) }}%</div>
                  <div class="text-[9px] text-slate-500 font-bold mt-0.5">المواد</div>
                </div>
                <div class="bg-white/4 rounded-xl p-2 border border-white/6">
                  <div class="text-xs font-black text-slate-300">{{ Math.round(major.scores.personalityMatch) }}%</div>
                  <div class="text-[9px] text-slate-500 font-bold mt-0.5">التوافق</div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="card-glass rounded-[2rem] p-10 text-center border border-red-500/20">
            <span class="text-5xl block mb-4">🛑</span>
            <h3 class="font-display text-2xl font-black text-red-400 mb-3">المعدل لا يسمح بالقبول الجامعي حالياً</h3>
            <p class="text-slate-400 leading-relaxed text-base max-w-lg mx-auto">
              معدلك ({{ gpa }}%) أقل من الحد الأدنى لهذا المسار. الجامعات الخاصة تبدأ من 60%، والحكومية من 65-75%.
              راجع "خطة الإنقاذ" أدناه أو فكر في برامج الدبلوم كحل مؤقت.
            </p>
          </div>
        </section>

        <!-- ====== SUBJECTS DEEP ANALYSIS ====== -->
        <section class="animate-fade">
          <div class="flex items-center gap-4 mb-7">
            <div class="bg-blue-500/15 text-blue-400 p-2.5 rounded-xl text-lg border border-blue-500/20">🔬</div>
            <div>
              <h3 class="font-display text-2xl font-black text-white">التشخيص التفصيلي للمواد</h3>
              <p class="text-sm text-slate-500 font-medium mt-0.5">مرتبة من الأضعف للأقوى — تحليل الفجوة بين وضعك الحالي والمطلوب جامعياً</p>
            </div>
          </div>

          <div class="space-y-6">
            <div v-for="(item, idx) in sortedImprovementPlan" :key="idx"
              class="card-glass rounded-[2rem] overflow-hidden relative hover:border-white/15 transition-all duration-300 print:break-inside-avoid print:border-2 group">
              <!-- Left accent bar -->
              <div class="absolute right-0 top-0 bottom-0 w-1 rounded-r-full" :class="item.accentColor"></div>

              <!-- Header -->
              <div class="p-7 pb-5 pr-8">
                <div class="flex flex-col md:flex-row justify-between gap-5 mb-5">
                  <div>
                    <div class="flex items-center gap-3 mb-2.5">
                      <span class="text-2xl">{{ item.icon }}</span>
                      <h4 class="font-display text-2xl font-black text-white">{{ item.subject }}</h4>
                      <span class="text-xs font-black px-3 py-1 rounded-lg text-white" :class="item.statusBg">{{ item.statusText }}</span>
                    </div>
                    <div class="flex flex-wrap items-center gap-2 text-sm text-slate-400 font-medium">
                      <span class="bg-white/5 px-2.5 py-1 rounded-lg border border-white/8 font-mono font-bold">{{ item.score }}%</span>
                      <span v-if="item.gapToTarget > 0" class="text-orange-400 font-bold text-xs">⬆ تحتاج +{{ item.gapToTarget }}% للقبول الجامعي</span>
                      <span v-else class="text-green-400 font-bold text-xs">✓ يتجاوز حد القبول</span>
                    </div>
                  </div>
                  <!-- Score Visual -->
                  <div class="md:self-start flex flex-col items-center gap-1 bg-white/4 rounded-2xl p-4 border border-white/8 min-w-[100px] text-center">
                    <div class="font-display text-3xl font-black" :class="item.scoreTextColor">{{ item.score }}</div>
                    <div class="w-full bg-white/8 h-2 rounded-full overflow-hidden">
                      <div class="h-full rounded-full" :class="item.barColor" :style="{ width: item.score + '%' }"></div>
                    </div>
                    <div class="text-[10px] text-slate-500 font-bold">من 100</div>
                  </div>
                </div>

                <!-- University Relevance - Specific per subject -->
                <div class="bg-white/3 rounded-2xl p-5 border border-white/8 mb-5">
                  <div class="text-[11px] font-black text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span>🏛️</span> الأهمية في الجامعة والسوق
                  </div>
                  <p class="text-slate-300 text-sm font-medium leading-relaxed">{{ item.universityRelevance }}</p>
                  <div v-if="item.jobImpact" class="mt-3 flex flex-wrap gap-2">
                    <span v-for="job in item.jobImpact" :key="job" class="text-[11px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/15 px-2.5 py-1 rounded-lg font-bold">
                      {{ job }}
                    </span>
                  </div>
                </div>

                <!-- 2-col Grid: Diagnosis + Plan -->
                <div class="grid md:grid-cols-2 gap-5">
                  <!-- Diagnosis -->
                  <div>
                    <div class="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <span>🧐</span> التشخيص والأسباب الجذرية
                    </div>
                    <div class="bg-white/3 rounded-xl p-4 border border-white/8 text-sm text-slate-400 leading-relaxed font-medium whitespace-pre-line">{{ item.diagnosis }}</div>
                    <!-- Root causes -->
                    <div v-if="item.rootCauses?.length" class="mt-3 space-y-1.5">
                      <div v-for="cause in item.rootCauses" :key="cause" class="flex items-start gap-2 text-xs text-orange-400/80 font-medium">
                        <span class="text-orange-500 mt-0.5 shrink-0">⚠</span> {{ cause }}
                      </div>
                    </div>
                  </div>

                  <!-- Action Plan - UNIQUE per subject/level -->
                  <div>
                    <div class="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <span>🛠️</span> الاستراتيجية المقترحة
                    </div>
                    <div class="space-y-2">
                      <div v-for="(step, i) in item.actionSteps" :key="i"
                        class="flex items-start gap-2.5 bg-white/3 rounded-xl p-3 border border-white/6 text-xs text-slate-300 font-medium hover:border-indigo-500/20 transition-colors">
                        <span class="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">{{ i+1 }}</span>
                        <span class="leading-relaxed">{{ step }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Timeline badge -->
                <div v-if="item.timelineWeeks" class="mt-4 inline-flex items-center gap-2 bg-white/4 border border-white/8 rounded-xl px-3 py-2 text-xs font-bold text-slate-400">
                  <span>⏱️</span> الوقت المقدر للوصول للهدف: <span class="text-white">{{ item.timelineWeeks }}</span>
                </div>
              </div>

              <!-- Resources -->
              <div class="border-t border-white/5 px-8 py-5 print:hidden bg-white/1">
                <div class="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <span>📚</span> مصادر موثوقة ومجانية
                </div>
                <div class="flex flex-wrap gap-2">
                  <a v-for="res in item.resources" :key="res.name" :href="res.url" target="_blank"
                    class="flex items-center gap-2 bg-white/5 hover:bg-indigo-600/20 px-4 py-2.5 rounded-xl border border-white/8 hover:border-indigo-500/30 text-xs font-bold text-slate-300 hover:text-indigo-300 transition-all group/link">
                    <span>{{ res.icon }}</span>
                    <span>{{ res.name }}</span>
                    <span class="text-[10px] bg-white/8 px-1.5 py-0.5 rounded-md font-bold text-slate-500 group-hover/link:text-indigo-400">{{ res.type }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ====== MASTER LEARNING PLAN ====== -->
        <section v-if="learningPlan" class="animate-fade card-glass rounded-[2rem] overflow-hidden relative print:break-before-page">
          <div class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-l from-violet-500 via-indigo-500 to-blue-500"></div>
          <div class="p-8 md:p-10">
            <div class="flex items-center gap-4 mb-8">
              <div class="bg-gradient-to-br from-indigo-600 to-violet-600 p-3 rounded-2xl text-white text-xl shadow-lg shadow-indigo-900/40">🚀</div>
              <div>
                <h3 class="font-display text-2xl font-black text-white">{{ learningPlan.title }}</h3>
                <p class="text-sm text-slate-500 font-medium mt-0.5">{{ learningPlan.subtitle }}</p>
              </div>
            </div>

            <!-- Phases Timeline -->
            <div class="relative">
              <!-- Connecting line -->
              <div class="absolute right-5 top-6 bottom-6 w-0.5 bg-gradient-to-b from-indigo-500/50 via-violet-500/30 to-transparent"></div>

              <div class="space-y-8">
                <div v-for="(phase, idx) in learningPlan.phases" :key="idx" class="relative flex gap-8">
                  <!-- Dot -->
                  <div class="relative z-10 flex-shrink-0">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm text-white shadow-lg"
                      :class="['bg-indigo-600 shadow-indigo-900/50','bg-violet-600 shadow-violet-900/50','bg-blue-600 shadow-blue-900/50','bg-cyan-600 shadow-cyan-900/50'][idx % 4]">
                      {{ idx + 1 }}
                    </div>
                  </div>

                  <div class="flex-1 pb-2">
                    <div class="flex flex-wrap items-center gap-3 mb-4">
                      <h4 class="font-display font-black text-white text-lg">{{ phase.name }}</h4>
                      <span v-if="phase.duration" class="text-[11px] bg-white/6 text-slate-400 px-2.5 py-1 rounded-lg border border-white/8 font-bold">{{ phase.duration }}</span>
                      <span v-if="phase.target" class="text-[11px] bg-green-500/10 text-green-400 px-2.5 py-1 rounded-lg border border-green-500/20 font-bold">🎯 {{ phase.target }}</span>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-2.5">
                      <div v-for="(step, i) in phase.steps" :key="i"
                        class="flex items-start gap-2.5 bg-white/4 rounded-xl p-3.5 border border-white/8 hover:border-indigo-500/25 transition-colors">
                        <span class="text-indigo-400 mt-0.5 shrink-0 text-sm">✓</span>
                        <span class="text-slate-300 font-medium text-sm leading-relaxed">{{ step }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Motivational footer -->
            <div class="mt-8 pt-6 border-t border-white/6 text-center">
              <p class="text-slate-500 text-sm font-medium italic">
                "{{ learningPlan.quote }}"
              </p>
            </div>
          </div>
        </section>

      </div><!-- end grades -->

      <!-- Assessment Source -->
      <div v-else class="animate-fade text-center py-20">
        <h1 class="font-display text-4xl font-black text-white mb-4">شخصيتك تميل لـ <span class="text-indigo-400">{{ getFieldName(assessmentField) }}</span></h1>
        <p class="text-slate-400">تحليل يعتمد على الميول الفطرية والبيئة المهنية المفضلة.</p>
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

/* ============================================================
   DATABASE: Deep Insights per Subject
   ============================================================ */
const subjectMeta = {
  math: {
    icon: '📐',
    universityRelevance: `الرياضيات هي "لغة العلوم" الأساسية. في التخصصات الهندسية ستواجه مواد مثل Calculus وLinear Algebra وDifferential Equations — وكلها تبني على الرياضيات المدرسية. الضعف فيها = تعثر مؤكد في سنة أولى جامعية. كما أن امتحانات القدرات (SAT/التنافسي الأردني) تعتمد بشكل كبير على الرياضيات.`,
    jobImpact: ['هندسة مدنية', 'هندسة ميكانيك', 'عمارة', 'فيزياء'],
    rootCauses: ['فجوات تراكمية من الصف التاسع والعاشر لم تُعالج', 'الاعتماد على النظر والحفظ بدل الحل اليدوي', 'خوف نفسي من المادة يقلل التركيز'],
    targets: { juniorMin: 65, seniorMin: 75 },
    planByLevel: {
      fail:    ['ارجع لكتاب الصف التاسع: حل جميع الأمثلة المحلولة يدوياً.', 'تعلم المعادلات الأساسية (خطية، تربيعية) قبل أي شيء آخر.', 'خصص ساعتين يومياً بلا هاتف — الرياضيات تحتاج تركيزاً كاملاً.', 'استعن بمعلم خصوصي أسبوعياً على الأقل.', 'حل 20 سؤال يومياً حتى لو بسيطة جداً لبناء الثقة.'],
      weak:    ['ركز على الوحدات الأقل درجة أولاً (الاحتمالات، المتتاليات).', 'حل ورقة امتحان كاملة أسبوعياً وحلل أخطاءك.', 'اعمل ورقة مختصرة بجميع القوانين علقها أمامك.', 'تدرب على سرعة الحل (محدد بوقت).'],
      good:    ['انتقل لحل أسئلة وزارية 5 سنوات سابقة.', 'ركز على نقاط الضعف المحددة (حساب مثلثات؟ لوغاريتم؟).', 'حل مسائل من الكتاب الشامل أو منصة وتد.'],
      vgood:   ['حل مسائل صعوبة عالية من سنوات توجيهي سابقة (2019-2024).', 'تدرب على الحل في 60% من الوقت المعطى كبفر أمان.', 'لا تهمل أي وحدة حتى لو تتقنها — راجع دورياً.'],
      excel:   ['ابدأ بتصفح مقدمة Calculus من كورسيرا أو كانبشر أكاديمي.', 'ساعد زملاءك — شرح المادة للآخرين يرسخها فيك.', 'ابحث عن منح دراسية تعتمد على الرياضيات (مسابقات الأولمبياد).']
    }
  },
  math_adv: {
    icon: '🔢',
    universityRelevance: `رياضيات الفرع العلمي (علمي/صناعي) هي عصب تخصصات الهندسة والذكاء الاصطناعي وعلم البيانات. مفاهيم التفاضل والتكامل (Limits, Derivatives, Integrals) التي تدرسها الآن هي نفسها مواد السنة الأولى جامعة. من يتقنها الآن سيجد الجامعة سهلة، ومن يضعف فيها سيعاني في كل مادة علمية.`,
    jobImpact: ['مهندس برمجيات', 'مطور AI', 'عالم بيانات', 'باحث'],
    rootCauses: ['صعوبة في المفاهيم المجردة مثل النهايات والمشتقات', 'ضعف في التأسيس الجبري من مراحل سابقة', 'عدم ربط الرياضيات بتطبيقاتها الحقيقية'],
    targets: { juniorMin: 70, seniorMin: 80 },
    planByLevel: {
      fail:    ['ابدأ بمراجعة الجبر الأساسي (الصف العاشر) لأن التفاضل يبني عليه.', 'تعلم مفهوم النهايات (Limits) بمشاهدة 3Blue1Brown أو Prof. Leonard على يوتيوب.', 'حل تمارين كتابك المدرسي فقط — لا تشتت نفسك.', 'استعن بمعلم خصوصي متخصص في الرياضيات العلمية.'],
      weak:    ['ركز على وحدة التفاضل أولاً لأنها الأثقل وزناً.', 'احفظ قواعد الاشتقاق الأساسية وطبقها على 50 مثال.', 'حل نماذج كاملة من سنوات سابقة.'],
      good:    ['ادخل على قناة "وتد" لسامر رشاد لشرح رياضيات التوجيهي.', 'انتبه لأخطاء الإشارة والكسور الشائعة.', 'راجع التكامل ومجال الدوال.'],
      vgood:   ['تدرب على المسائل التطبيقية (حركة، مساحة).', 'اعمل على سرعة الحل وتقليل الأخطاء الحسابية.'],
      excel:   ['استكشف مقدمة Linear Algebra — ستحتاجها في AI.', 'فكر في المشاركة في مسابقات الرياضيات على المستوى الوطني.']
    }
  },
  math_biz: {
    icon: '💰',
    universityRelevance: `رياضيات الأعمال هي أساس تخصصات المحاسبة والمالية والاقتصاد. في الجامعة ستدرس مواد "رياضيات مالية" و"إحصاء تطبيقي" تعتمد مباشرة على النسب المئوية والمعادلات والمتسلسلات التي تدرسها الآن. الضعف فيها = صعوبة في قراءة القوائم المالية وحل مسائل الفائدة والاستهلاك.`,
    jobImpact: ['محاسب قانوني', 'محلل مالي', 'مصرفي', 'مدير أعمال'],
    rootCauses: ['عدم ربط الأرقام بسياقها التجاري الحقيقي', 'ضعف في العمليات الأساسية والنسب', 'النظر للمادة كحفظ لا كأداة'],
    targets: { juniorMin: 60, seniorMin: 65 },
    planByLevel: {
      fail:    ['تعلم النسب المئوية والكسور بشكل كامل — هذا مطلب لا تفاوض فيه.', 'حل مسائل واقعية: كم ربح التاجر؟ كم دفع الفائدة؟', 'ادخل على كانبشر أكاديمي (قسم الرياضيات الأساسية).'],
      weak:    ['ركز على وحدة الفائدة المركبة والبسيطة وفهمها تطبيقياً.', 'اعمل ملخصاً بالمعادلات الأساسية مع أمثلة مالية.'],
      good:    ['تدرب على مسائل المتسلسلات الحسابية والهندسية في سياق الأعمال.', 'حل نماذج وزارية سابقة بتركيز.'],
      vgood:   ['اعمل على دقة الحل وتقليل الأخطاء الحسابية.', 'راجع جميع الوحدات دورياً.'],
      excel:   ['ابدأ بتصفح مفاهيم "رياضيات مالية" من كتب الجامعة.']
    }
  },
  physics: {
    icon: '⚛️',
    universityRelevance: `الفيزياء هي "لغة الهندسة". في تخصصات الهندسة المدنية والميكانيكية والمعمارية، ستدرس في السنة الأولى مادة "فيزياء هندسية" بشكل مكثف. مفاهيم القوى والطاقة والحركة والكهرباء ستظهر في كل مادة هندسية. حتى في الهندسة المعمارية: حسابات الأحمال والعوازل تحتاج فيزياء صلبة.`,
    jobImpact: ['مهندس مدني', 'مهندس ميكانيكي', 'مهندس كهربائي', 'مهندس معماري'],
    rootCauses: ['حفظ القوانين دون فهم متى وكيف تُطبق', 'ضعف في تحليل المتجهات والرسوم البيانية', 'عدم ربط القانون بالظاهرة الطبيعية الفعلية'],
    targets: { juniorMin: 65, seniorMin: 75 },
    planByLevel: {
      fail:    ['ابدأ بالفيزياء الميكانيكية (قوانين نيوتن) — هي البداية.', 'ارسم كل مسألة قبل الحل (مخطط القوى Free Body Diagram).', 'شاهد تجارب PhET التفاعلية لأي مفهوم لا تفهمه.', 'افهم وحدات القياس وكيفية اشتقاقها.'],
      weak:    ['تعلم كيف تحلل المتجهات إلى مركبتيها أفقية وعمودية.', 'ركز على الوحدات الأعلى وزناً في الامتحان (ميكانيك، كهرباء).', 'حل مسائل مشابهة تغير فيها الأرقام فقط لترسيخ الطريقة.'],
      good:    ['تدرب على المسائل ذات الخطوات المتعددة.', 'راجع وحدة الكهرباء والمغناطيسية بعمق.'],
      vgood:   ['حل أسئلة صعوبة عالية من سنوات 2020-2024.', 'ركز على دقة التعبير والتسلسل المنطقي في الحل.'],
      excel:   ['تصفح مقدمة "فيزياء جامعية" من كتاب Halliday & Resnick.', 'جرب حل أسئلة SAT Physics.']
    }
  },
  chem: {
    icon: '🧪',
    universityRelevance: `الكيمياء هي بوابة الطب والصيدلة والهندسة الكيميائية. في طب الأسنان والطب البشري ستدرس كيمياء عضوية وغير عضوية مكثفة جداً. في الصيدلة، كل دواء هو تركيب كيميائي. الضعف في الكيمياء المدرسية = ضعف في فهم الجزيئات والتفاعلات التي هي أساس علم الأدوية والحياة.`,
    jobImpact: ['طبيب', 'صيدلاني', 'مهندس كيميائي', 'باحث طبي'],
    rootCauses: ['نسيان الأساسيات (الجدول الدوري، التوزيع الإلكتروني، الروابط)', 'صعوبة في تخيل التفاعلات على المستوى الجزيئي', 'الاعتماد على حفظ المعادلات دون فهم سببها'],
    targets: { juniorMin: 70, seniorMin: 80 },
    planByLevel: {
      fail:    ['احفظ الجدول الدوري: الدورات السبع والمجموعات الأساسية — هذا مطلب قبل أي شيء.', 'افهم الروابط الكيميائية (تساهمية/أيونية) بمشاهدة فيديو تفاعلي.', 'اعمل ملخصاً لقوانين الغازات وتطبيقاتها.', 'ادخل على قناة "الكيمياء" على يوتيوب للتوجيهي الأردني.'],
      weak:    ['ركز على موازنة المعادلات الكيميائية يومياً.', 'اعمل خرائط ذهنية لتفاعلات كل وحدة.', 'حل أسئلة الحسابات الكيميائية (stoichiometry) تحديداً.'],
      good:    ['راجع الكيمياء العضوية وتسمية المركبات.', 'حل نماذج وزارية كاملة بتوقيت.'],
      vgood:   ['تدرب على الأسئلة التحليلية والتطبيقية.', 'راجع باب المحاليل والتوازن الكيميائي.'],
      excel:   ['اطلع على مبادئ الكيمياء العضوية الجامعية (Organic Chemistry Basics).', 'سامر عماد يوتيوب للكيمياء المتقدمة.']
    }
  },
  bio: {
    icon: '🧬',
    universityRelevance: `الأحياء هي العمود الفقري للعلوم الصحية. في الطب البشري والتمريض والعلوم المخبرية، ستكون وجهاً لوجه مع علم التشريح والفسيولوجيا والميكروبيولوجيا — وكلها تمتد من الأحياء المدرسية. الطالب الذي لا يفهم الخلية وأجهزة الجسم ووظائفها سيجد السنة الأولى في الطب شبه مستحيلة.`,
    jobImpact: ['طبيب', 'ممرض', 'تقني مخبري', 'باحث أحياء'],
    rootCauses: ['الاعتماد الكامل على الحفظ الصم دون فهم الوظيفة', 'عدم ربط أجهزة الجسم ببعضها (الجهاز الهضمي يؤثر على الدم...)', 'نقص في التصور البصري للعمليات الحيوية'],
    targets: { juniorMin: 70, seniorMin: 80 },
    planByLevel: {
      fail:    ['ابدأ بوحدة الخلية: تعلم الفرق بين حقيقية ووبدائية النواة.', 'شاهد فيديوهات أنيميشن لعمليات مثل التنفس والبناء الضوئي.', 'افهم الانقسام الخلوي (ميتوز/ميوز) بالرسم.', 'ادخل على موقع Amoeba Sisters على يوتيوب (مترجم).'],
      weak:    ['اعمل ملخصات مرئية (رسوم تخطيطية) لكل جهاز.', 'ركز على الجينيات لأنها الأثقل وزناً في التوجيهي.', 'حل أسئلة جينيات متعددة (مسائل المربعات).'],
      good:    ['راجع جميع أجهزة جسم الإنسان ووظائفها.', 'حل نماذج وزارية سابقة.'],
      vgood:   ['ادرس الفيروسات والبكتيريا بعمق لأنها أسئلة شائعة.', 'راجع التعابير المطلوبة في الإجابات.'],
      excel:   ['اطلع على مقدمة Anatomy and Physiology من OpenStax (مجانية).', 'جرب تطبيق Visible Body لتصور التشريح.']
    }
  },
  eng_adv: {
    icon: '🇬🇧',
    universityRelevance: `اللغة الإنجليزية هي لغة العلم والعمل. أكثر من 90% من المراجع الجامعية في التخصصات العلمية والطبية والتقنية باللغة الإنجليزية. في سوق العمل، مهندس أو طبيب بإنجليزي قوي يحصل على راتب أعلى بنسبة 30-50%. ضعفها يعني قطيعة مع المعرفة العالمية.`,
    jobImpact: ['جميع التخصصات العلمية', 'الطب والهندسة', 'تكنولوجيا المعلومات', 'الأعمال الدولية'],
    rootCauses: ['ضعف في المفردات الأساسية (مخزون أقل من 2000 كلمة)', 'الخوف من الكتابة والتحدث بسبب الخطأ', 'الاكتفاء بحفظ قواعد بدون استخدام فعلي'],
    targets: { juniorMin: 60, seniorMin: 70 },
    planByLevel: {
      fail:    ['احفظ 10 كلمات يومياً في جمل كاملة — وليس من القاموس منفردة.', 'اقرأ نصاً إنجليزياً قصيراً يومياً (أخبار BBC Learning English).', 'شاهد 30 دقيقة إنجليزي يومياً مع ترجمة.', 'افهم الـ Simple Tenses أولاً قبل باقي الأزمنة.'],
      weak:    ['ركز على الأقسام الأثقل وزناً: Reading Comprehension + Writing.', 'تعلم كيف تكتب فقرة وصفية وحجاجية.', 'حل نماذج توجيهي سابقة لفهم نمط الأسئلة.'],
      good:    ['توسع في مفردات التخصص (English for Science/Business).', 'تدرب على ترجمة نصوص تقنية.', 'حسّن قواعد الـ Conditionals و Passive Voice.'],
      vgood:   ['اقرأ مقالات علمية بسيطة باللغة الإنجليزية.', 'تدرب على الكتابة الأكاديمية (IELTS Writing Task 2).'],
      excel:   ['استهدف الـ IELTS أو TOEFL — شهاداتهم تفيدك في القبول والمنح.', 'ابدأ بقراءة ملخصات الكتب الجامعية بالإنجليزية.']
    }
  },
  arabic_spec: {
    icon: '📖',
    universityRelevance: `اللغة العربية التخصصية هي أساس تخصصات الحقوق والصحافة والإعلام والعلوم الشرعية والتعليم. في كلية الحقوق، تُصاغ القوانين والعقود بلغة عربية فصحى دقيقة. في الصحافة، أسلوبك اللغوي هو "هويتك المهنية". الضعف اللغوي يعني ضعف الشخصية المهنية كاملاً.`,
    jobImpact: ['محامٍ / قاضٍ', 'صحفي / إعلامي', 'معلم', 'مستشار قانوني'],
    rootCauses: ['صعوبة في قواعد النحو والصرف (الإعراب)', 'عدم التميز بين الأساليب البلاغية', 'ضعف في الكتابة الإبداعية والتحليل الأدبي'],
    targets: { juniorMin: 60, seniorMin: 65 },
    planByLevel: {
      fail:    ['ابدأ بتعلم الإعراب الأساسي: المبتدأ والخبر، الفاعل والمفعول.', 'اقرأ نصاً أدبياً قصيراً كل يوم وحدد فيه الجمل الاسمية والفعلية.', 'احفظ 5 بيوت شعر أسبوعياً وافهم معناها.'],
      weak:    ['اعمل ملخصاً لقواعد النحو الأساسية في جدول.', 'تدرب على تحليل النصوص: الفكرة الرئيسية، الأسلوب، الصور البلاغية.', 'حل أسئلة وزارية سابقة في الإملاء والكتابة.'],
      good:    ['ركز على البلاغة: التشبيه والاستعارة والكناية.', 'تدرب على كتابة المقالة والوصف.'],
      vgood:   ['اقرأ نصوص من التراث الأدبي (المتنبي، طه حسين) لتقوية الأسلوب.', 'تدرب على الإجابات الكاملة والدقيقة.'],
      excel:   ['اطلع على مقدمة النقد الأدبي واللسانيات.', 'جرب الكتابة الإبداعية (قصة قصيرة أو مقال رأي).']
    }
  },
  islamic_spec: {
    icon: '🕌',
    universityRelevance: `علوم الشريعة الإسلامية هي أساس كليات الشريعة والقانون الإسلامي والدراسات الإسلامية. تتطلب هذه الكليات دقة متناهية في فهم الأحكام الفقهية ومعرفة أسباب النزول وأصول التشريع. الطالب الذي يفهم "لماذا" الحكم لا من "يحفظ" فحسب هو من يتفوق في الجامعة.`,
    jobImpact: ['قاضٍ شرعي', 'مستشار إسلامي', 'معلم تربية إسلامية', 'داعية'],
    rootCauses: ['الخلط بين الأحكام الشرعية وأدلتها', 'ضعف في الحفظ وربط الأحكام بسياقها', 'عدم استيعاب الفقه بمقاصده الكلية'],
    targets: { juniorMin: 60, seniorMin: 65 },
    planByLevel: {
      fail:    ['اعمل جدولاً بالأحكام الأساسية وأدلتها من القرآن والسنة.', 'افهم مقاصد الشريعة الخمس (الدين، النفس، العقل، النسل، المال).', 'استعن بمعلم ديني لفهم المسائل المعقدة.'],
      weak:    ['ركز على أبواب العبادات أولاً (الطهارة، الصلاة، الزكاة).', 'اربط كل حكم بدليله من القرآن أو السنة.', 'حل أسئلة وزارية سابقة.'],
      good:    ['ادرس باب المعاملات (البيع والإجارة) بعمق.', 'ركز على مسائل الإجابة الكاملة.'],
      vgood:   ['راجع باب الفقه المقارن وأدلة المذاهب.'],
      excel:   ['اطلع على مبادئ أصول الفقه وتفسير الأحكام.']
    }
  },
  finance: {
    icon: '🏦',
    universityRelevance: `الثقافة المالية هي مفتاح تخصصات الأعمال والمحاسبة والاقتصاد. في الجامعة ستدرس مواد "مبادئ الاقتصاد" و"مبادئ المحاسبة" و"إدارة مالية" — وكلها تبني على المفاهيم التي تتعلمها الآن. الطالب الذي يفهم الفائدة والسوق المالي والميزانية يجد الجامعة أسهل بكثير.`,
    jobImpact: ['محاسب', 'مستشار مالي', 'مصرفي', 'محلل اقتصادي'],
    rootCauses: ['النظر للمادة كحفظ تعريفات بدل فهم الظواهر الاقتصادية', 'عدم ربط المفاهيم بالواقع (بنوك، بورصة، تضخم)', 'ضعف في المصطلحات المالية الإنجليزية'],
    targets: { juniorMin: 60, seniorMin: 65 },
    planByLevel: {
      fail:    ['افهم الفرق بين المصرف التجاري والمركزي أولاً.', 'تابع أخباراً اقتصادية مبسطة (BBC Arabic Business).', 'افهم مفاهيم العرض والطلب بمثال حقيقي من حياتك.'],
      weak:    ['ركز على الوحدات الأعلى وزناً في الامتحان.', 'اعمل ملخصاً بالمصطلحات الأساسية وتعريفاتها الدقيقة.'],
      good:    ['تدرب على تحليل الحالات الدراسية.', 'حل نماذج وزارية سابقة كاملة.'],
      vgood:   ['ادرس أسواق الأوراق المالية والبورصة.'],
      excel:   ['اطلع على مقدمة Microeconomics من كورسيرا (MIT OpenCourseWare).']
    }
  }
}

/* Resources Database - Rich and specific */
const resourcesDB = {
  math: [
    { name: 'قناة الأوائل', url: 'https://awa2el.net', icon: '📺', type: 'يوتيوب' },
    { name: 'Khan Academy عربي', url: 'https://ar.khanacademy.org', icon: '🌐', type: 'مجاني' },
    { name: 'الكتاب الشامل (خلدون)', url: '#', icon: '📗', type: 'كتاب' }
  ],
  math_adv: [
    { name: 'وتد - سامر رشاد', url: 'https://watad.me', icon: '📺', type: 'يوتيوب' },
    { name: '3Blue1Brown', url: 'https://www.3blue1brown.com', icon: '🎬', type: 'إنجليزي' },
    { name: 'Paul\'s Online Math Notes', url: 'https://tutorial.math.lamar.edu', icon: '🌐', type: 'مجاني' }
  ],
  math_biz: [
    { name: 'Khan Academy - Finance', url: 'https://www.khanacademy.org/economics-finance-domain', icon: '🌐', type: 'مجاني' },
    { name: 'قناة الأوائل - رياضيات', url: 'https://awa2el.net', icon: '📺', type: 'يوتيوب' }
  ],
  physics: [
    { name: 'قناة يوسف عودة', url: 'https://www.youtube.com/@yousufawdeh', icon: '📺', type: 'يوتيوب' },
    { name: 'PhET Simulations', url: 'https://phet.colorado.edu', icon: '🔬', type: 'تفاعلي' },
    { name: 'Professor Leonard', url: 'https://www.youtube.com/c/ProfessorLeonard', icon: '🎬', type: 'إنجليزي' }
  ],
  chem: [
    { name: 'قناة سامر عماد', url: '#', icon: '📺', type: 'يوتيوب' },
    { name: 'Khan Academy - Chemistry', url: 'https://www.khanacademy.org/science/chemistry', icon: '🌐', type: 'مجاني' },
    { name: 'ChemLibreTexts', url: 'https://chem.libretexts.org', icon: '🌐', type: 'متقدم' }
  ],
  bio: [
    { name: 'Amoeba Sisters', url: 'https://www.youtube.com/@AmoebaSisters', icon: '📺', type: 'أنيميشن' },
    { name: 'Khan Academy - Biology', url: 'https://www.khanacademy.org/science/biology', icon: '🌐', type: 'مجاني' },
    { name: 'Visible Body', url: 'https://www.visiblebody.com', icon: '📱', type: 'تطبيق' }
  ],
  eng_adv: [
    { name: 'BBC Learning English', url: 'https://www.bbc.co.uk/learningenglish', icon: '📻', type: 'مجاني' },
    { name: 'British Council', url: 'https://learnenglish.britishcouncil.org', icon: '🌐', type: 'مجاني' },
    { name: 'Grammarly Blog', url: 'https://www.grammarly.com/blog/category/handbook', icon: '✍️', type: 'كتابة' }
  ],
  arabic_spec: [
    { name: 'موقع صحيفة الرأي الأردنية', url: 'https://www.alrai.com', icon: '📰', type: 'قراءة' },
    { name: 'قناة أدب عربي', url: '#', icon: '📺', type: 'يوتيوب' }
  ],
  islamic_spec: [
    { name: 'موقع الدرر السنية', url: 'https://dorar.net', icon: '🌐', type: 'مجاني' },
    { name: 'الموسوعة الفقهية الكويتية', url: '#', icon: '📚', type: 'مرجع' }
  ],
  finance: [
    { name: 'Investopedia بالعربي', url: 'https://www.investopedia.com', icon: '🌐', type: 'مصطلحات' },
    { name: 'BBC Arabic Business', url: 'https://www.bbc.com/arabic/business', icon: '📰', type: 'أخبار' }
  ]
}

/* ============================================================
   MAJORS DATABASE
   ============================================================ */
const majorsDB = {
  Health: [
    { name: 'طب بشري', minGPA: 85, related: ['bio','chem'], private: 85, public: 95 },
    { name: 'طب أسنان', minGPA: 85, related: ['bio','chem'], private: 85, public: 90 },
    { name: 'دكتور صيدلة (PharmD)', minGPA: 80, related: ['chem','bio'], private: 80, public: 85 },
    { name: 'صيدلة', minGPA: 78, related: ['chem'], private: 75, public: 80 },
    { name: 'تمريض', minGPA: 65, related: ['bio'], private: 60, public: 70 },
    { name: 'علوم طبية مخبرية', minGPA: 68, related: ['bio','chem'], private: 65, public: 72 }
  ],
  Engineering: [
    { name: 'هندسة مدنية', minGPA: 78, related: ['math','physics'], private: 75, public: 80 },
    { name: 'هندسة عمارة', minGPA: 80, related: ['math','physics'], private: 78, public: 82 },
    { name: 'هندسة حاسوب', minGPA: 80, related: ['math','physics'], private: 78, public: 82 },
    { name: 'هندسة ميكاترونيكس', minGPA: 80, related: ['physics','math'], private: 78, public: 83 },
    { name: 'هندسة ميكانيكية', minGPA: 78, related: ['physics','math'], private: 75, public: 80 }
  ],
  IT: [
    { name: 'ذكاء اصطناعي (AI)', minGPA: 75, related: ['math_adv','eng_adv'], private: 72, public: 78 },
    { name: 'أمن سيبراني', minGPA: 75, related: ['math_adv'], private: 70, public: 78 },
    { name: 'علم بيانات (Data Science)', minGPA: 75, related: ['math_adv'], private: 72, public: 78 },
    { name: 'هندسة برمجيات', minGPA: 75, related: ['math_adv'], private: 70, public: 78 },
    { name: 'علم حاسوب (CS)', minGPA: 75, related: ['math_adv','eng_adv'], private: 72, public: 78 }
  ],
  Business: [
    { name: 'محاسبة', minGPA: 65, related: ['math_biz','finance'], private: 60, public: 67 },
    { name: 'إدارة أعمال', minGPA: 65, related: ['finance','eng_adv'], private: 60, public: 67 },
    { name: 'تسويق رقمي', minGPA: 65, related: ['finance'], private: 60, public: 67 },
    { name: 'اقتصاد', minGPA: 67, related: ['math_biz','finance'], private: 65, public: 70 }
  ],
  Law: [
    { name: 'حقوق (قانون)', minGPA: 65, related: ['arabic_spec','eng_adv'], private: 62, public: 68 },
    { name: 'شريعة إسلامية', minGPA: 65, related: ['islamic_spec','arabic_spec'], private: 60, public: 68 }
  ],
  Languages: [
    { name: 'لغة إنجليزية وآدابها', minGPA: 65, related: ['eng_adv'], private: 60, public: 67 },
    { name: 'لغة عربية وآدابها', minGPA: 65, related: ['arabic_spec'], private: 60, public: 67 },
    { name: 'ترجمة وتفسير', minGPA: 68, related: ['eng_adv','arabic_spec'], private: 65, public: 70 }
  ]
}

/* ============================================================
   HELPERS
   ============================================================ */
function getLevel(score) {
  if (score < 50) return 'fail'
  if (score < 65) return 'weak'
  if (score < 80) return 'good'
  if (score < 95) return 'vgood'
  return 'excel'
}

function getSubjectTarget(key) {
  return subjectMeta[key]?.targets?.seniorMin || 65
}

function buildImprovementItem(key, score) {
  const meta = subjectMeta[key] || {}
  const level = getLevel(score)
  const target = getSubjectTarget(key)
  const gap = Math.max(0, target - score)
  const plan = meta.planByLevel?.[level] || ['راجع المادة يومياً.', 'حل أسئلة سابقة.', 'استعن بمعلم.']

  // Unique diagnosis per subject+level
  const diagnosisMap = {
    fail:  `المستوى: ${score}% (راسب).\nالهدف العاجل: الوصول لعلامة النجاح (50%) أولاً.\nالوضع حرج ويحتاج تدخلاً فورياً وجدياً.`,
    weak:  `المستوى: ${score}% (ضعيف).\nأنت ناجح مدرسياً لكن غير مؤهل للقبول الجامعي.\nالهدف: تجاوز ${target}% للدخول إلى التخصصات المطلوبة.`,
    good:  `المستوى: ${score}% (جيد).\nمؤهل للجامعات الخاصة، لكن تنافسيتك محدودة.\nالهدف: كسر حاجز الـ 80% للحصول على خيارات أكثر.`,
    vgood: `المستوى: ${score}% (جيد جداً).\nأداء قوي! أنت في المنطقة التنافسية.\nالهدف: الوصول للامتياز (90+) لضمان مقعدك الأول.`,
    excel: `المستوى: ${score}% (امتياز 🌟).\nأداء نخبوي! حافظ عليه.\nالهدف: الحفاظ على القمة والبحث عن منح دراسية.`
  }

  // Colors
  const colorMap = {
    fail:  { accent: 'bg-red-500', bar: 'bg-red-500', status: 'bg-red-600', statusText: 'راسب', scoreText: 'text-red-400' },
    weak:  { accent: 'bg-orange-500', bar: 'bg-orange-500', status: 'bg-orange-500', statusText: 'مقبول', scoreText: 'text-orange-400' },
    good:  { accent: 'bg-yellow-500', bar: 'bg-yellow-500', status: 'bg-yellow-600', statusText: 'جيد', scoreText: 'text-yellow-400' },
    vgood: { accent: 'bg-blue-500', bar: 'bg-blue-500', status: 'bg-blue-600', statusText: 'جيد جداً', scoreText: 'text-blue-400' },
    excel: { accent: 'bg-green-500', bar: 'bg-green-500', status: 'bg-green-600', statusText: 'امتياز', scoreText: 'text-green-400' }
  }

  const timelineMap = {
    fail: '8-12 أسبوعاً للوصول للنجاح',
    weak: '6-8 أسابيع للوصول للقبول الجامعي',
    good: '4-6 أسابيع لكسر حاجز 80%',
    vgood: '2-4 أسابيع للوصول للامتياز',
    excel: 'الحفاظ المستمر'
  }

  const c = colorMap[level]
  const resources = resourcesDB[key] || [{ name: 'موقع الأوائل', url: 'https://awa2el.net', icon: '📺', type: 'يوتيوب' }]

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
    universityRelevance: meta.universityRelevance || 'مادة داعمة مهمة.',
    jobImpact: meta.jobImpact || [],
    diagnosis: diagnosisMap[level],
    rootCauses: meta.rootCauses || [],
    actionSteps: plan,
    timelineWeeks: timelineMap[level],
    resources
  }
}

const sortedImprovementPlan = computed(() => {
  if (source !== 'grades') return []
  return Object.entries(grades)
    .map(([key, score]) => buildImprovementItem(key, Number(score)))
    .sort((a, b) => a.score - b.score)
})

/* Ranked Majors */
function personalityScore(majorField) {
  if (!assessmentField) return 50
  return assessmentField === majorField ? 100 : 40
}

const rankedMajors = computed(() => {
  if (!field) return []
  const list = majorsDB[field] || []
  return list
    .map(major => {
      if (gpa < major.minGPA - 12) return null
      const gpaScore = Math.max(0, Math.min(100, ((gpa - (major.minGPA - 5)) / 18) * 100))
      const relevantGrades = (major.related || []).map(s => grades[s] || 0)
      const subjectScore = relevantGrades.length ? relevantGrades.reduce((a,b)=>a+b,0)/relevantGrades.length : 60
      const pScore = personalityScore(field)
      const finalScore = Math.round((gpaScore * 0.45) + (subjectScore * 0.40) + (pScore * 0.15))
      const confidence = finalScore > 85 ? 'عالٍ جداً ✓' : finalScore > 70 ? 'عالٍ' : finalScore > 50 ? 'متوسط' : 'منخفض'
      return {
        ...major,
        finalScore,
        confidence,
        scores: { gpaScore: Math.round(gpaScore), subjectScore: Math.round(subjectScore), personalityMatch: pScore }
      }
    })
    .filter(Boolean)
    .sort((a, b) => b.finalScore - a.finalScore)
    .slice(0, 3)
})

/* Learning Plan */
const learningPlan = computed(() => {
  if (source !== 'grades') return null

  if (gpa < 50) return {
    title: '🚨 خطة الطوارئ الأكاديمية',
    subtitle: 'أولوية قصوى — الوضع يتطلب تدخلاً فورياً',
    quote: 'الفشل ليس السقوط، بل رفض النهوض.',
    phases: [
      { name: 'وقف النزيف', duration: 'الأسبوع 1-2', target: 'تشخيص المشكلة', steps: ['اعترف بالمشكلة وتوقف عن التبريرات.', 'حدد أي 2 مواد هي الأضعف وابدأ منها فقط.', 'لا تحاول إصلاح كل شيء دفعة واحدة.', 'تواصل مع المدرس أو مستشار أكاديمي.'] },
      { name: 'التأسيس الطارئ', duration: 'الأسبوع 3-6', target: 'الوصول لعلامة النجاح', steps: ['ساعتان يومياً للمواد الراسب فيها — بلا مفاوضة.', 'حل الأمثلة المحلولة في الكتاب أولاً قبل التمارين.', 'مدرس خصوصي مرة أسبوعياً على الأقل.', 'أغلق السوشيال ميديا في أوقات الدراسة.'] },
      { name: 'الانطلاق', duration: 'الأسبوع 7-12', target: 'تجاوز 60%', steps: ['حل نماذج امتحانات سابقة لكل مادة.', 'نوم جيد (7-8 ساعات) — الدماغ يحتاج راحة للتعلم.', 'راجع إنجازاتك أسبوعياً وكافئ نفسك.'] }
    ]
  }

  if (gpa < 65) return {
    title: '📈 خطة الهروب من منطقة الخطر',
    subtitle: 'هدفك: تجاوز 65% للقبول الجامعي',
    quote: 'التغيير يبدأ بقرار واحد جاد.',
    phases: [
      { name: 'التشخيص والأولويات', duration: 'الأسبوع 1-2', target: 'خطة واضحة', steps: ['حدد المواد التي تسحب معدلك للأسفل.', 'رتب أولوياتك: الأثقل وزناً في الامتحان أولاً.', '4 ساعات دراسة يومية صافية.'] },
      { name: 'البناء المكثف', duration: 'الأسبوع 3-8', target: 'رفع كل مادة 10%+', steps: ['ملخص شامل لكل مادة (يدوياً).', 'حل 3 سنوات وزارية سابقة لكل مادة.', 'لا مادة تقل عن 60% — هذا الخط الأحمر.', 'مجموعة دراسية أسبوعياً.'] },
      { name: 'الاختبار التجريبي', duration: 'الأسبوع 9-12', target: 'تجاوز 65%', steps: ['حل امتحانات كاملة بوقت حقيقي.', 'راجع أخطاءك وحلها مجدداً.', 'استعد نفسياً لليوم الكبير.'] }
    ]
  }

  if (gpa < 80) return {
    title: '🚀 خطة المنافسة ورفع المعدل',
    subtitle: 'هدفك: تجاوز 80% والتنافس على التخصصات القوية',
    quote: 'الفرق بين جيد وممتاز هو التفاصيل الصغيرة.',
    phases: [
      { name: 'إغلاق الثغرات', duration: 'الأسبوع 1-3', target: 'لا مادة تقل عن 70%', steps: ['حدد الوحدات الضعيفة في كل مادة بدقة.', 'لا تكتفِ بالفهم العام — أتقن الأسئلة الصعبة.', 'تحويل الدراسة من "فهم" إلى "حل مكثف".'] },
      { name: 'السرعة والدقة', duration: 'الأسبوع 4-8', target: 'كسر حاجز 80%', steps: ['تدرب على الحل في 70% من الوقت المعطى.', 'قلل الأخطاء الحسابية والإملائية.', 'مراجعة يومية خفيفة (30 دقيقة) للمعلومات السابقة.', 'حل 5 سنوات وزارية لكل مادة.'] },
      { name: 'التحضير النهائي', duration: 'الأسبوع 9-12', target: 'الوصول للمعدل المستهدف', steps: ['محاكاة يوم الامتحان الحقيقي.', 'تأكد من إتقان الأسئلة الإلزامية (Guaranteed marks).', 'مراجعة نهائية شاملة وخفيفة.'] }
    ]
  }

  if (gpa < 95) return {
    title: '💎 خطة التميز والوصول للقمة',
    subtitle: 'هدفك: 95%+ وضمان المقعد الجامعي الأول',
    quote: 'الامتياز ليس حظاً، بل عادة يومية.',
    phases: [
      { name: 'الكمال في التفاصيل', duration: 'الأسبوع 1-4', target: 'تحديد مواطن الضعف الخفية', steps: ['لا تقبل بأقل من 90% في أي تدريب.', 'ابحث عن الأسئلة "الفخ" التي تُفقد النقاط.', 'راجع الأسئلة الصعبة من سنوات 2020-2024.'] },
      { name: 'الإتقان والسرعة', duration: 'الأسبوع 5-8', target: 'علامة كاملة في التدريب', steps: ['اعمل امتحاناً كاملاً كل أسبوع بوقت رسمي.', 'حلّل كل خطأ واكتب سببه.', 'مراجعة دورية خفيفة لمنع النسيان.', 'جسمك وذهنك: نوم 8 ساعات، رياضة خفيفة.'] },
      { name: 'ما بعد التوجيهي', duration: 'قبل الامتحان بأسبوعين', target: 'الاستعداد النفسي', steps: ['مراجعة خفيفة فقط — لا دراسة جديدة.', 'ثق بنفسك: ما درسته كافٍ.', 'ابدأ البحث عن المنح الجامعية مبكراً.'] }
    ]
  }

  return {
    title: '👑 خطة الحفاظ على القمة والجاهزية الجامعية',
    subtitle: 'أنت في النخبة — الهدف الآن ما بعد التوجيهي',
    quote: 'النجاح الحقيقي هو الاستمرار في التميز، لا الوصول إليه.',
    phases: [
      { name: 'الاستدامة', duration: 'مستمر', target: 'لا تغير ما ينجح', steps: ['حافظ على روتينك الدراسي الحالي.', 'راحة نفسية كاملة — تجنب الإرهاق (Burnout).', 'اجعل المراجعة خفيفة ودورية.'] },
      { name: 'الجاهزية الجامعية', duration: 'صيف قبل الجامعة', target: 'تفوق من اليوم الأول', steps: ['ابدأ قراءة مواد السنة الأولى بتخصصك.', 'طوّر إنجليزيتك الأكاديمية.', 'ابحث عن المنح: هاشمية، يرموك، الأردنية.', 'افتح حساب LinkedIn وابن ملفك الشخصي.'] }
    ]
  }
})

/* ============================================================
   UI HELPERS
   ============================================================ */
function getSubjectName(k) {
  const map = { chem:'كيمياء', bio:'أحياء', math:'رياضيات', physics:'فيزياء', eng_adv:'إنجليزي متقدم', math_adv:'رياضيات متقدم', math_biz:'رياضيات أعمال', finance:'ثقافة مالية', arabic_spec:'عربي تخصص', islamic_spec:'علوم إسلامية' }
  return map[k] || k
}
function getFieldName(f) {
  const map = { Health:'الفرع العلمي الصحي', Engineering:'الفرع الهندسي', IT:'العلوم والتكنولوجيا', Business:'الأعمال والإدارة', Law:'القانون والشريعة', Languages:'اللغات والإنسانيات' }
  return map[f] || f
}
const gradientBlobColor = computed(() => {
  if (gpa >= 85) return 'bg-green-500'
  if (gpa >= 75) return 'bg-blue-500'
  if (gpa >= 65) return 'bg-yellow-500'
  if (gpa >= 50) return 'bg-orange-500'
  return 'bg-red-500'
})
const gpaAccentBar = computed(() => {
  if (gpa >= 85) return 'bg-gradient-to-r from-green-600 to-emerald-400'
  if (gpa >= 75) return 'bg-gradient-to-r from-blue-600 to-blue-400'
  if (gpa >= 65) return 'bg-gradient-to-r from-yellow-600 to-yellow-400'
  if (gpa >= 50) return 'bg-gradient-to-r from-orange-600 to-orange-400'
  return 'bg-gradient-to-r from-red-700 to-red-500'
})
const gpaCircleColor = computed(() => {
  if (gpa >= 85) return '#22c55e'
  if (gpa >= 75) return '#3b82f6'
  if (gpa >= 65) return '#eab308'
  if (gpa >= 50) return '#f97316'
  return '#ef4444'
})
const gpaStatusBadge = computed(() => {
  if (gpa >= 85) return 'bg-green-500/15 border-green-500/30 text-green-400'
  if (gpa >= 75) return 'bg-blue-500/15 border-blue-500/30 text-blue-400'
  if (gpa >= 65) return 'bg-yellow-500/15 border-yellow-500/30 text-yellow-400'
  if (gpa >= 50) return 'bg-orange-500/15 border-orange-500/30 text-orange-400'
  return 'bg-red-500/15 border-red-500/30 text-red-400'
})
function getGPAStatusText(g) {
  if (g >= 85) return 'امتياز 🌟'
  if (g >= 75) return 'جيد جداً 👍'
  if (g >= 65) return 'جيد'
  if (g >= 50) return 'مقبول'
  return 'راسب ❌'
}
function getGPASummaryTitle(g) {
  if (g < 50) return 'وضع أكاديمي حرج — يتطلب تدخلاً فورياً'
  if (g < 65) return 'ناجح مدرسياً / غير مؤهل جامعياً بعد'
  if (g < 75) return 'مؤهل للجامعات الخاصة — تنافس متوسط'
  if (g < 85) return 'وضع تنافسي قوي — في المنطقة الآمنة'
  return 'نخبة المتفوقين — منافس على أفضل التخصصات'
}
function getGPADetailedMessage(g, f) {
  if (g < 50) return 'المعدل أقل من الحد الأدنى للنجاح. يجب إعادة الفحص في المواد الراسب فيها فوراً قبل التفكير بالجامعة.'
  if (g < 65) return 'المعدل يسمح بالدخول لكليات المجتمع (دبلوم 2 سنة) أو بعض الجامعات الخاصة بصعوبة. القبول الموحد الحكومي يتطلب 65%+.'
  if (f === 'Health' && g < 85) return 'وضع جيد لتخصصات التمريض والمخبر، لكن الطب والصيدلة تتطلب 85%+. ارفع تركيزك على الأحياء والكيمياء.'
  if (f === 'IT' && g < 75) return 'أنت على بُعد خطوة من تخصصات الـ IT (تبدأ من 75%). تركيز إضافي على الرياضيات المتقدمة سيفتح أمامك الباب.'
  if (f === 'Engineering' && g < 80) return 'تخصصات الهندسة الحكومية تحتاج 80%+. أنت في النطاق التنافسي للجامعات الخاصة. ارفع علامات الرياضيات والفيزياء.'
  return 'معدلك ممتاز ويؤهلك لمجموعة واسعة من التخصصات. راجع التفاصيل في قسم التخصصات المرشحة.'
}
function getScoreRingColor(s) {
  if (s >= 85) return 'border-green-500'
  if (s >= 70) return 'border-blue-500'
  return 'border-orange-500'
}
function getScoreTextColor(s) {
  if (s >= 85) return 'text-green-400'
  if (s >= 70) return 'text-blue-400'
  return 'text-orange-400'
}
function scoreToHex(s) {
  if (s >= 85) return '#22c55e'
  if (s >= 70) return '#3b82f6'
  return '#f97316'
}
function getProgressBarColor(s) {
  if (s >= 85) return 'bg-green-500'
  if (s >= 70) return 'bg-blue-500'
  return 'bg-orange-500'
}
function confidenceBadge(c) {
  if (c.includes('جداً')) return 'bg-green-500/15 border-green-500/30 text-green-400'
  if (c === 'عالٍ') return 'bg-blue-500/15 border-blue-500/30 text-blue-400'
  if (c === 'متوسط') return 'bg-yellow-500/15 border-yellow-500/30 text-yellow-400'
  return 'bg-red-500/15 border-red-500/30 text-red-400'
}
function printReport() { window.print() }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=IBM+Plex+Mono:wght@400;700&display=swap');

.font-body, .font-display { font-family: 'Tajawal', sans-serif; }
.font-mono { font-family: 'IBM Plex Mono', monospace; }

.card-glass {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
}

.animate-fade { animation: fadeInUp 0.7s ease-out both; }
.animate-fade-delay { animation: fadeInUp 0.7s 0.15s ease-out both; }
@keyframes fadeInUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }

@media print {
  body { background: white !important; color: black !important; }
  .print\:hidden { display:none !important; }
  .card-glass { background: white !important; border: 1px solid #e2e8f0 !important; }
  .print\:break-before-page { break-before: page; }
  .print\:break-inside-avoid { break-inside: avoid; }
}
</style>