<template>
  <div class="min-h-screen bg-slate-50 pb-20 font-sans" dir="rtl">
    
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
      <div class="font-black text-xl text-blue-900 flex items-center gap-2 cursor-pointer" @click="$router.push('/dashboard')">
        <span>🧭</span> CareerCompass
      </div>
      <button @click="$router.go(-1)" class="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition">
        <span>عودة للقائمة</span>
        <span class="text-xl">➜</span>
      </button>
    </nav>

    <div v-if="university" class="max-w-7xl mx-auto px-4 md:px-6 pt-8">
      
      <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 mb-8 relative overflow-hidden animate-fade-in-up">
        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-teal-500"></div>
        
        <div class="flex flex-col md:flex-row gap-8 items-center">
          <div class="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center text-7xl shadow-inner border border-slate-100 shrink-0">
            {{ university.icon }}
          </div>
          
          <div class="text-center md:text-right flex-1 w-full">
            <div class="flex flex-col md:flex-row items-center gap-3 mb-3 justify-center md:justify-start">
              <h1 class="text-3xl md:text-4xl font-black text-slate-800">{{ university.name }}</h1>
              <span class="px-4 py-1.5 rounded-full text-xs font-bold shadow-sm" 
                    :class="university.type === 'public' ? 'bg-teal-100 text-teal-800' : 'bg-orange-100 text-orange-800'">
                {{ university.type === 'public' ? 'جامعة حكومية' : 'جامعة خاصة' }}
              </span>
            </div>
            
            <p class="text-slate-500 text-lg mb-6 flex items-center justify-center md:justify-start gap-2 font-medium">
              📍 {{ university.location }}
            </p>
            
            <div class="flex flex-wrap justify-center md:justify-start gap-4">
              <div class="bg-blue-50 text-blue-700 px-5 py-2.5 rounded-2xl text-sm font-bold border border-blue-100 flex items-center gap-2">
                <span>🎓</span> عدد الكليات: {{ university.facultiesData.length }}
              </div>
              <div class="bg-indigo-50 text-indigo-700 px-5 py-2.5 rounded-2xl text-sm font-bold border border-indigo-100 flex items-center gap-2">
                <span>📚</span> التخصصات: {{ totalMajors }}
              </div>
              <a :href="university.website" target="_blank" class="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-2xl text-sm font-bold transition flex items-center gap-2 shadow-lg shadow-slate-200">
                <span>الموقع الرسمي</span>
                <span>🌐</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8 items-start">
        
        <div class="lg:w-1/4 w-full sticky top-24 z-30">
          <div class="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-3 overflow-hidden">
            <h3 class="font-bold text-slate-400 text-xs uppercase tracking-wider mb-3 px-4 pt-2">الكليات المتاحة</h3>
            <div class="space-y-1 max-h-[70vh] overflow-y-auto pr-1 scrollbar-hide">
              <button 
                v-for="(faculty, index) in university.facultiesData" 
                :key="index"
                @click="activeFaculty = index; scrollToTop()"
                :class="activeFaculty === index ? 'bg-blue-600 text-white shadow-md transform scale-105' : 'text-slate-600 hover:bg-slate-50'"
                class="w-full text-right px-5 py-3.5 rounded-xl font-bold transition-all duration-300 flex justify-between items-center text-sm"
              >
                <div class="flex items-center gap-3">
                  <span>{{ faculty.icon }}</span>
                  <span>{{ faculty.name }}</span>
                </div>
                <span v-if="activeFaculty === index">👈</span>
              </button>
            </div>
          </div>
        </div>

        <div class="lg:w-3/4 w-full">
          <div v-if="selectedFaculty" class="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100 min-h-[600px] animate-fade-in">
            
            <div class="flex items-center gap-4 mb-10 border-b border-slate-100 pb-6">
              <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm text-blue-600">
                {{ selectedFaculty.icon }}
              </div>
              <div>
                <h2 class="text-3xl font-black text-slate-800 mb-1">{{ selectedFaculty.name }}</h2>
                <p class="text-slate-400 text-sm font-medium">عدد التخصصات المتاحة: {{ selectedFaculty.majors.length }}</p>
              </div>
            </div>

            <div class="grid gap-6">
              <div 
                v-for="major in selectedFaculty.majors" 
                :key="major.name"
                class="group border border-slate-100 rounded-3xl p-6 hover:border-blue-300 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 bg-white relative overflow-hidden"
              >
                <div class="absolute right-0 top-0 h-full w-1.5 bg-slate-100 group-hover:bg-blue-500 transition-colors"></div>

                <div class="flex flex-col md:flex-row justify-between items-start gap-6 mb-6 pr-4">
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-3 mb-2">
                      {{ major.name }}
                      <span v-if="major.isNew" class="bg-red-50 text-red-600 text-[10px] px-2 py-1 rounded-lg font-black border border-red-100">جديد 🔥</span>
                    </h3>
                    <p class="text-slate-500 text-sm leading-relaxed max-w-2xl font-medium">{{ major.description }}</p>
                  </div>
                </div>

                <div class="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600 bg-slate-50/80 p-4 rounded-2xl pr-4 border border-slate-100 mb-4">
                  <div class="flex items-center gap-2 px-3 bg-white py-1.5 rounded-lg shadow-sm border border-slate-100">
                    <span class="text-lg">⏳</span>
                    <span>الساعات: <span class="text-slate-900 font-bold">{{ major.hours }}</span></span>
                  </div>
                  <div class="flex items-center gap-2 px-3 bg-white py-1.5 rounded-lg shadow-sm border border-slate-100">
                    <span class="text-lg">🎓</span>
                    <span>المجال: <span class="text-blue-600 font-bold">{{ major.field }}</span></span>
                  </div>
                  <div class="flex items-center gap-2 px-3 bg-white py-1.5 rounded-lg shadow-sm border border-slate-100">
                    <span class="text-lg">📅</span>
                    <span>مدة الدراسة: <span class="text-slate-900 font-bold">{{ major.duration }}</span></span>
                  </div>
                </div>

                <!-- مجالات العمل -->
                <div v-if="major.showCareers" class="mb-4 animate-fade-in">
                  <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5">
                    <h4 class="font-black text-blue-800 mb-3 flex items-center gap-2 text-sm">
                      💼 مجالات العمل المتاحة
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      <span 
                        v-for="career in major.careers" 
                        :key="career"
                        class="bg-white text-blue-700 border border-blue-200 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm"
                      >
                        {{ career }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="mt-2 flex gap-3 pt-0 pr-4">
                  <button 
                    @click="toggleCareers(major)"
                    :class="major.showCareers ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white'"
                    class="px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2"
                  >
                    💼 {{ major.showCareers ? 'إخفاء مجالات العمل' : 'مجالات العمل' }}
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
    
    <div v-else class="h-screen flex flex-col items-center justify-center text-slate-400 bg-white">
      <span class="text-6xl mb-6 animate-bounce">🧭</span>
      <span class="font-bold text-xl text-slate-600">جاري تحميل بيانات الجامعة الشاملة...</span>
      <p class="text-sm mt-2 text-slate-400">يرجى الانتظار قليلاً</p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const universityId = parseInt(route.params.id)
const university = ref(null)
const activeFaculty = ref(0)

function toggleCareers(major) {
  major.showCareers = !major.showCareers
}

/* =========================================================
   🌍 قاعدة بيانات الجامعات الأردنية الشاملة
   ========================================================= */
const database = {

  // =============================================
  // 1. الجامعة الأردنية (JU)
  // =============================================
  1: {
    id: 1, name: "الجامعة الأردنية", type: "public", location: "عمان - الجبيهة", icon: "🏛️", website: "http://ju.edu.jo",
    facultiesData: [
      {
        name: "كلية الطب", icon: "🩺",
        majors: [
          {
            name: "دكتور في الطب", hours: 256, field: "صحي", duration: "6 سنوات", isNew: false, showCareers: false,
            description: "البرنامج الأقوى والأعرق محلياً، يمتد لـ 6 سنوات يدرس فيها الطالب علوم الطب الأساسية والسريرية، ويتدرب في مستشفى الجامعة الأردنية التعليمي.",
            careers: ["طبيب عام", "طبيب متخصص", "طبيب مقيم في المستشفيات", "باحث طبي", "طبيب في المراكز الصحية", "طبيب عسكري"]
          }
        ]
      },
      {
        name: "كلية طب الأسنان", icon: "🦷",
        majors: [
          {
            name: "طب وجراحة الأسنان", hours: 205, field: "صحي", duration: "5 سنوات", isNew: false, showCareers: false,
            description: "دراسة شاملة لعلاج وتقويم الأسنان وجراحتها، تتضمن تدريباً سريرياً مكثفاً في عيادات الجامعة التي تُعدّ من أكثر العيادات التعليمية تطوراً في الأردن.",
            careers: ["طبيب أسنان عام", "أخصائي تقويم أسنان", "جراح فم وأسنان", "أخصائي زراعة أسنان", "طبيب أسنان أطفال", "صاحب عيادة خاصة"]
          }
        ]
      },
      {
        name: "كلية الصيدلة", icon: "💊",
        majors: [
          {
            name: "صيدلة (Pharm.D)", hours: 216, field: "صحي", duration: "5 سنوات", isNew: false, showCareers: false,
            description: "برنامج صيدلة إكلينيكي متكامل يؤهل الصيدلاني للعمل في المستشفيات والصيدليات وشركات الدواء، مع تركيز على التفاعلات الدوائية والرعاية الصيدلانية.",
            careers: ["صيدلاني إكلينيكي", "مدير صيدلية", "مندوب طبي", "باحث في صناعة الدواء", "صيدلاني مستشفى", "مفتش دوائي"]
          }
        ]
      },
      {
        name: "كلية الهندسة", icon: "📐",
        majors: [
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم وتنفيذ المنشآت والطرق والجسور والبنية التحتية، مع تعليم نظري ومختبرات متطورة وتدريب ميداني.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مهندس في شركات المقاولات", "مخطط مدني", "مهندس بلدية"]
          },
          {
            name: "هندسة الكهرباء", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة الأنظمة الكهربائية والإلكترونية والاتصالات والطاقة المتجددة.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة متجددة", "مهندس في شركات الكهرباء", "مصمم أنظمة كهربائية", "مهندس صيانة"]
          },
          {
            name: "هندسة الحاسوب", hours: 160, field: "IT/Eng", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم الأنظمة الحاسوبية والشبكات والمعالجات، مع الجمع بين البرمجة والهندسة الإلكترونية.",
            careers: ["مهندس أجهزة حاسوب", "مهندس شبكات", "مطور أنظمة مدمجة", "مهندس في شركات التقنية", "مصمم معالجات", "مهندس FPGA"]
          },
          {
            name: "هندسة الميكاترونكس", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دمج الميكانيكا والإلكترونيات والبرمجة في تصميم الأنظمة الذكية والروبوتات.",
            careers: ["مهندس روبوتيكس", "مهندس أتمتة صناعية", "مصمم أنظمة تحكم", "مهندس في المصانع الذكية", "مطور أنظمة مدمجة", "مهندس سيارات ذاتية القيادة"]
          },
          {
            name: "هندسة صناعية", hours: 160, field: "هندسي/إداري", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تحسين العمليات الإنتاجية وإدارة الجودة وسلاسل التوريد وتحليل الأنظمة.",
            careers: ["مهندس إنتاج", "مدير جودة", "محلل سلاسل توريد", "مستشار عمليات", "مهندس في المصانع", "محلل بيانات صناعية"]
          },
          {
            name: "هندسة كيميائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم العمليات الكيميائية الصناعية وتحويل المواد الخام إلى منتجات نافعة.",
            careers: ["مهندس كيميائي في المصافي", "مهندس أدوية", "مهندس بيئة", "مهندس في صناعة الأسمدة", "باحث في المواد", "مهندس عمليات"]
          }
        ]
      },
      {
        name: "كلية الملك عبدالله الثاني (IT)", icon: "💻",
        majors: [
          {
            name: "علم الحاسوب", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "البرمجة النظرية والخوارزميات وهياكل البيانات وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات", "باحث في علوم الحاسوب", "مطور ألعاب", "مهندس ذكاء اصطناعي"]
          },
          {
            name: "الذكاء الاصطناعي", hours: 132, field: "IT", duration: "4 سنوات", isNew: true, showCareers: false,
            description: "علم البيانات وتعلم الآلة والشبكات العصبية وتطبيقات الذكاء الاصطناعي في مختلف القطاعات.",
            careers: ["مهندس ذكاء اصطناعي", "عالم بيانات", "مطور نماذج تعلم عميق", "باحث AI", "مهندس MLOps", "محلل بيانات متقدم"]
          },
          {
            name: "الأمن السيبراني", hours: 132, field: "IT", duration: "4 سنوات", isNew: true, showCareers: false,
            description: "حماية المعلومات والشبكات والأنظمة من الهجمات الإلكترونية والاختراق.",
            careers: ["محلل أمن سيبراني", "مختبر اختراق", "مدير أمن معلومات (CISO)", "محلل تهديدات", "مستشار أمن", "محقق جرائم إلكترونية"]
          },
          {
            name: "نظم المعلومات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "إدارة وتطوير نظم المعلومات في المؤسسات مع ربط جانبي الأعمال والتقنية.",
            careers: ["محلل نظم", "مدير مشاريع IT", "مطور ERP", "مستشار تحول رقمي", "مدير قواعد بيانات", "مهندس حلول أعمال"]
          }
        ]
      },
      {
        name: "كلية العلوم", icon: "🔬",
        majors: [
          {
            name: "رياضيات", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة الرياضيات التحليلية والتطبيقية والإحصاء والنمذجة الرياضية.",
            careers: ["أكاديمي وباحث", "محلل إحصاء", "عالم بيانات", "محلل مالي", "مطور خوارزميات", "مدرس رياضيات"]
          },
          {
            name: "فيزياء", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة قوانين الطبيعة والطاقة والمادة والكون.",
            careers: ["باحث في المختبرات", "أكاديمي", "مهندس فيزيائي", "محلل في شركات طاقة", "معلم فيزياء", "مطور أنظمة بصرية"]
          },
          {
            name: "كيمياء", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة تركيب المادة وتفاعلاتها الكيميائية وتطبيقاتها الصناعية.",
            careers: ["كيميائي في المختبرات", "باحث في صناعة الدواء", "مفتش جودة", "مهندس بيئة", "أكاديمي وباحث", "كيميائي شرعي"]
          },
          {
            name: "علم الأحياء", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة الكائنات الحية وعلم الوراثة والتطور والبيئة.",
            careers: ["باحث بيولوجي", "أكاديمي", "فني مختبر", "عالم وراثة", "متخصص بيئة", "مطور أدوية"]
          }
        ]
      },
      {
        name: "كلية الأعمال", icon: "💼",
        majors: [
          {
            name: "محاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تحليل البيانات المالية والتدقيق والمحاسبة الإدارية والضرائب.",
            careers: ["محاسب قانوني", "مدقق حسابات", "محلل مالي", "مدير مالي (CFO)", "مستشار ضريبي", "محاسب حكومي"]
          },
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة الاستراتيجية للمؤسسات والتسويق والموارد البشرية والعمليات.",
            careers: ["مدير أعمال", "مسؤول تسويق", "مدير موارد بشرية", "رائد أعمال", "مستشار إداري", "مدير مبيعات"]
          },
          {
            name: "تمويل ومصارف", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "إدارة الأصول المالية والاستثمار والبنوك والأسواق المالية.",
            careers: ["محلل مالي", "مصرفي", "مدير استثمار", "محلل أسواق مالية", "مستشار مالي", "مدير مخاطر"]
          },
          {
            name: "اقتصاد", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة الأسواق والسياسات الاقتصادية والتحليل الاقتصادي الكلي والجزئي.",
            careers: ["محلل اقتصادي", "مستشار حكومي", "باحث اقتصادي", "محلل في البنوك الدولية", "أكاديمي", "صحفي اقتصادي"]
          }
        ]
      },
      {
        name: "كلية القانون", icon: "⚖️",
        majors: [
          {
            name: "حقوق", hours: 132, field: "قانون", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة القانون المدني والجزائي والدولي والتجاري مع تدريب على الممارسة القانونية.",
            careers: ["محامٍ", "قاضٍ", "مستشار قانوني", "مدعي عام", "موثق عقود", "دبلوماسي"]
          }
        ]
      },
      {
        name: "كلية الآداب", icon: "📖",
        majors: [
          {
            name: "اللغة العربية وآدابها", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة اللغة العربية وآدابها وبلاغتها ونقدها الأدبي والتراث العربي.",
            careers: ["معلم لغة عربية", "كاتب ومحرر", "مصحح لغوي", "مترجم", "أكاديمي", "صحفي"]
          },
          {
            name: "اللغة الإنجليزية وآدابها", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة اللغة الإنجليزية وآدابها وتحليل النصوص والترجمة.",
            careers: ["معلم إنجليزي", "مترجم", "محرر محتوى", "أكاديمي", "مدير محتوى", "كاتب محترف"]
          },
          {
            name: "تاريخ", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة التاريخ العربي والإسلامي والعالمي وتحليل الحضارات.",
            careers: ["مؤرخ", "أكاديمي وباحث", "معلم تاريخ", "مرشد سياحي", "محافظ تراث", "كاتب"]
          },
          {
            name: "جغرافيا", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة الجغرافيا الطبيعية والبشرية ونظم المعلومات الجغرافية (GIS).",
            careers: ["جغرافي", "محلل GIS", "مخطط تعمير", "أكاديمي", "باحث بيئي", "مستشار تخطيط"]
          },
          {
            name: "علم النفس", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة السلوك الإنساني والعمليات العقلية والصحة النفسية.",
            careers: ["معالج نفسي (بعد الدراسات العليا)", "مستشار تربوي", "أخصائي موارد بشرية", "باحث أكاديمي", "مستشار صحة نفسية", "أخصائي اجتماعي"]
          },
          {
            name: "فلسفة", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة الفلسفة الغربية والعربية والمنطق والأخلاق وفلسفة العلوم.",
            careers: ["أكاديمي", "كاتب ومفكر", "معلم", "محلل سياسات", "مستشار أخلاقيات", "صحفي"]
          }
        ]
      },
      {
        name: "كلية الدراسات الدولية", icon: "🌍",
        majors: [
          {
            name: "علوم سياسية", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة الأنظمة السياسية والعلاقات الدولية والسياسة العامة.",
            careers: ["دبلوماسي", "محلل سياسي", "مستشار حكومي", "أكاديمي", "صحفي سياسي", "عامل في المنظمات الدولية"]
          }
        ]
      },
      {
        name: "كلية التربية البدنية", icon: "⚽",
        majors: [
          {
            name: "تربية بدنية", hours: 132, field: "رياضي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة علوم الحركة والتدريب الرياضي والتربية البدنية والصحة.",
            careers: ["مدرب رياضي", "معلم تربية بدنية", "مدير مرافق رياضية", "معالج فيزيائي (بعد دراسة إضافية)", "مسؤول رياضة في الأندية", "محلل أداء رياضي"]
          }
        ]
      },
      {
        name: "كلية الشريعة", icon: "📿",
        majors: [
          {
            name: "الشريعة الإسلامية", hours: 132, field: "شريعة", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة الفقه الإسلامي وأصوله والتفسير والحديث.",
            careers: ["قاضٍ شرعي", "مفتٍ", "إمام مسجد", "معلم دراسات إسلامية", "داعية", "باحث شرعي"]
          }
        ]
      },
      {
        name: "كلية الزراعة", icon: "🌾",
        majors: [
          {
            name: "الإنتاج النباتي", hours: 132, field: "زراعي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة زراعة المحاصيل وتحسين الإنتاج النباتي والتقنيات الزراعية الحديثة.",
            careers: ["مهندس زراعي", "مستشار زراعي", "باحث في المراكز الزراعية", "مدير مزرعة", "مصدّر منتجات زراعية", "أخصائي جودة غذاء"]
          },
          {
            name: "الإنتاج الحيواني", hours: 132, field: "زراعي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة تربية الحيوانات وتغذيتها وإدارة المزارع الحيوانية.",
            careers: ["مهندس إنتاج حيواني", "مدير مزارع", "باحث", "مستشار في شركات الأعلاف", "مصدّر منتجات حيوانية", "مفتش بيطري"]
          }
        ]
      },
      {
        name: "كلية الفنون والتصميم", icon: "🎨",
        majors: [
          {
            name: "الفنون البصرية", hours: 132, field: "فني", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة الفنون التشكيلية والرسم والنحت وتاريخ الفن.",
            careers: ["فنان تشكيلي", "معلم فنون", "مصمم جرافيك", "منسق معارض فنية", "مدير متحف", "مصور فوتوغرافي"]
          },
          {
            name: "تصميم جرافيك", hours: 132, field: "فني", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم الهويات البصرية والمواد الإعلانية والرقمية.",
            careers: ["مصمم جرافيك", "مصمم هوية بصرية", "مدير فني", "مصمم UI/UX", "مصمم في وكالات إعلان", "مصمم محتوى رقمي"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 2. جامعة العلوم والتكنولوجيا (JUST)
  // =============================================
  2: {
    id: 2, name: "جامعة العلوم والتكنولوجيا", type: "public", location: "إربد - الرمثا", icon: "🔬", website: "http://just.edu.jo",
    facultiesData: [
      {
        name: "كلية الطب", icon: "🩺",
        majors: [
          {
            name: "طب وجراحة", hours: 250, field: "صحي", duration: "6 سنوات", isNew: false, showCareers: false,
            description: "دراسة الطب في بيئة مستشفى الملك المؤسس الجامعي، أحد أكبر المستشفيات التعليمية في شمال المملكة.",
            careers: ["طبيب عام", "طبيب متخصص", "طبيب مقيم", "جراح", "باحث طبي", "طبيب في المنظمات الدولية"]
          }
        ]
      },
      {
        name: "كلية الصيدلة", icon: "💊",
        majors: [
          {
            name: "صيدلة (B.Sc)", hours: 162, field: "صحي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "صناعة الدواء والرقابة الدوائية وعلم الصيدلانيات وتحليل الأدوية.",
            careers: ["صيدلاني مجتمعي", "مفتش دوائي", "باحث في صناعة الدواء", "مندوب طبي", "فني صيدلة", "مدير مستودع دواء"]
          },
          {
            name: "دكتور صيدلة (Pharm.D)", hours: 216, field: "صحي", duration: "5 سنوات", isNew: false, showCareers: false,
            description: "التركيز على الجانب السريري في المستشفيات مع تدريب موسع على الرعاية الدوائية للمرضى.",
            careers: ["صيدلاني إكلينيكي", "صيدلاني مستشفى", "أخصائي دواء", "صيدلاني في العناية المركزة", "مدير دوائي", "مستشار دوائي"]
          }
        ]
      },
      {
        name: "كلية الحاسوب (IT)", icon: "🖥️",
        majors: [
          {
            name: "هندسة البرمجيات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "إدارة مشاريع البرمجيات الضخمة ودورة حياة البرنامج ومعايير الجودة والهندسة المتقدمة.",
            careers: ["مهندس برمجيات", "مدير مشاريع تقنية", "مطور تطبيقات", "مهندس جودة برمجيات", "مهندس DevOps", "مهندس حلول سحابية"]
          },
          {
            name: "نظم المعلومات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تحليل النظم وقواعد البيانات وإدارة المعلومات وتكنولوجيا الأعمال.",
            careers: ["محلل نظم", "مدير قواعد بيانات", "مطور ERP", "مستشار IT", "محلل أعمال", "مدير مشاريع رقمية"]
          },
          {
            name: "علم البيانات", hours: 132, field: "IT", duration: "4 سنوات", isNew: true, showCareers: false,
            description: "تحليل البيانات الكبيرة Big Data وتعلم الآلة والإحصاء التطبيقي واستخراج الأنماط.",
            careers: ["عالم بيانات", "محلل بيانات", "مهندس بيانات", "مطور نماذج تنبؤية", "محلل ذكاء أعمال", "مهندس MLOps"]
          },
          {
            name: "هندسة الحاسوب", hours: 160, field: "IT/Eng", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم المعالجات والأنظمة المدمجة والشبكات والأجهزة الإلكترونية.",
            careers: ["مهندس أجهزة", "مطور أنظمة مدمجة", "مهندس شبكات", "مهندس VLSI", "مصمم دوائر", "مهندس في شركات تقنية"]
          }
        ]
      },
      {
        name: "كلية الهندسة", icon: "🏗️",
        majors: [
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم المنشآت والطرق والبنية التحتية مع تركيز على مشاريع إربد الشمالية.",
            careers: ["مهندس إنشاءات", "مهندس طرق", "مشرف مشاريع", "مهندس بلدية", "مخطط مدني", "مهندس ري"]
          },
          {
            name: "هندسة نووية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الوحيد من نوعه في الأردن، يدرّس استخدامات الطاقة النووية والإشعاع والوقاية منه.",
            careers: ["مهندس في هيئة الطاقة الذرية", "فني جرعات إشعاعية", "مهندس مفاعلات", "باحث في المراكز النووية", "مفتش نووي دولي", "أخصائي حماية إشعاع"]
          },
          {
            name: "هندسة كيميائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم وتشغيل المحطات الكيميائية الصناعية والعمليات.",
            careers: ["مهندس عمليات كيميائية", "مهندس في شركات البوتاس", "مهندس تكرير نفط", "باحث في المواد", "مهندس بيئة", "مهندس جودة"]
          },
          {
            name: "هندسة ميكانيكية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم الآلات والمعدات الصناعية وأنظمة الطاقة والتبريد.",
            careers: ["مهندس ميكانيك", "مهندس إنتاج", "مصمم منتجات", "مهندس صيانة", "مهندس طاقة", "مهندس سيارات"]
          }
        ]
      },
      {
        name: "كلية العلوم والفنون", icon: "🔭",
        majors: [
          {
            name: "رياضيات وإحصاء", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الرياضيات التطبيقية والإحصاء الحيوي والنمذجة الرياضية.",
            careers: ["محلل إحصائي", "أكاديمي", "عالم بيانات", "محلل أعمال", "محلل مخاطر", "باحث في شركات التأمين"]
          }
        ]
      },
      {
        name: "كلية الإدارة", icon: "💼",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة الاستراتيجية والتسويق والموارد البشرية والعمليات التجارية.",
            careers: ["مدير أعمال", "مسؤول تسويق", "رائد أعمال", "مدير مبيعات", "مستشار إداري", "مدير موارد بشرية"]
          },
          {
            name: "محاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "المحاسبة المالية والإدارية والتدقيق والضرائب.",
            careers: ["محاسب", "مدقق", "مستشار ضريبي", "محلل مالي", "مدير مالي", "محاسب حكومي"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 3. الجامعة الهاشمية (HU)
  // =============================================
  3: {
    id: 3, name: "الجامعة الهاشمية", type: "public", location: "الزرقاء", icon: "🎓", website: "https://hu.edu.jo",
    facultiesData: [
      {
        name: "كلية الطب", icon: "🩺",
        majors: [
          {
            name: "دكتور في الطب", hours: 256, field: "صحي", duration: "6 سنوات", isNew: false, showCareers: false,
            description: "كلية طب حديثة ومتطورة تعتمد على التعليم السريري في مستشفى الأمير الحسين بن عبدالله الثاني.",
            careers: ["طبيب عام", "طبيب متخصص", "طبيب مقيم", "جراح", "طبيب عسكري", "باحث طبي"]
          }
        ]
      },
      {
        name: "كلية الهندسة", icon: "⚙️",
        majors: [
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم وإنشاء المنشآت والبنية التحتية في منطقة الزرقاء والأردن.",
            careers: ["مهندس إنشاءات", "مهندس طرق", "مخطط مدني", "مشرف مشاريع", "مهندس بلدية", "مهندس ري"]
          },
          {
            name: "هندسة ميكانيكية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم الآلات والأنظمة الميكانيكية وصناعة السيارات والتبريد.",
            careers: ["مهندس ميكانيك", "مهندس صيانة", "مهندس إنتاج", "مصمم ميكانيكي", "مهندس طاقة", "مهندس مصنع"]
          },
          {
            name: "هندسة كهربائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم الأنظمة الكهربائية والإلكترونية والاتصالات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة متجددة", "مهندس في شركات الكهرباء", "مصمم أنظمة", "مهندس أتمتة"]
          },
          {
            name: "هندسة كيميائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم العمليات الكيميائية وصناعة المواد.",
            careers: ["مهندس عمليات كيميائية", "مهندس تكرير", "باحث في مواد", "مهندس بيئة", "مهندس جودة", "مهندس صناعي"]
          }
        ]
      },
      {
        name: "كلية الأمير الحسين (IT)", icon: "💻",
        majors: [
          {
            name: "هندسة البرمجيات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تطوير التطبيقات وإدارة مشاريع البرمجيات وضمان الجودة.",
            careers: ["مطور برمجيات", "مدير مشاريع", "مهندس جودة", "مطور تطبيقات جوال", "مهندس DevOps", "مهندس حلول"]
          },
          {
            name: "علم البيانات والذكاء الاصطناعي", hours: 132, field: "IT", duration: "4 سنوات", isNew: true, showCareers: false,
            description: "مجال واعد جداً يجمع بين علم البيانات والذكاء الاصطناعي وتحليل المعلومات الكبيرة.",
            careers: ["عالم بيانات", "مهندس ذكاء اصطناعي", "محلل بيانات", "مطور نماذج AI", "محلل ذكاء أعمال", "مهندس تعلم آلة"]
          },
          {
            name: "أمن المعلومات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "حماية الأنظمة والشبكات والبيانات من التهديدات الإلكترونية.",
            careers: ["محلل أمن", "مختبر اختراق", "مهندس شبكات آمنة", "مستشار أمن", "محقق جرائم إلكترونية", "مدير أمن معلومات"]
          }
        ]
      },
      {
        name: "كلية العلوم", icon: "🔬",
        majors: [
          {
            name: "الفيزياء التطبيقية", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تطبيقات الفيزياء في الصناعة والطاقة والتكنولوجيا.",
            careers: ["أكاديمي وباحث", "فني في مختبرات", "مهندس في شركات طاقة", "معلم فيزياء", "محلل في شركات تقنية", "مهندس بصريات"]
          }
        ]
      },
      {
        name: "كلية الاقتصاد والعلوم الإدارية", icon: "📊",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة والتسويق وريادة الأعمال والاستراتيجيات التجارية.",
            careers: ["مدير أعمال", "مسؤول تسويق", "رائد أعمال", "مدير مبيعات", "مستشار إداري", "مدير فرع"]
          },
          {
            name: "محاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "المحاسبة المالية والتدقيق والضرائب والمحاسبة الإدارية.",
            careers: ["محاسب قانوني", "مدقق حسابات", "محلل مالي", "مستشار ضريبي", "مدير مالي", "محاسب في شركات"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 4. جامعة اليرموك (YU)
  // =============================================
  4: {
    id: 4, name: "جامعة اليرموك", type: "public", location: "إربد", icon: "📚", website: "https://www.yu.edu.jo",
    facultiesData: [
      {
        name: "كلية الحجاوي للهندسة", icon: "🏗️",
        majors: [
          {
            name: "هندسة العمارة", hours: 165, field: "هندسي", duration: "5 سنوات", isNew: false, showCareers: false,
            description: "التصميم المعماري الإبداعي وتخطيط المدن والتراث المعماري.",
            careers: ["مهندس معماري", "مصمم داخلي", "مخطط عمراني", "باحث في التراث", "مدير مشاريع بناء", "رسام معماري"]
          },
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم المنشآت والطرق وإدارة المشاريع الإنشائية.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مهندس بلدية", "مخطط مدني", "مهندس ري"]
          },
          {
            name: "هندسة كهربائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأنظمة الكهربائية والإلكترونيات والاتصالات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة متجددة", "مهندس أتمتة", "مهندس صيانة", "مصمم دوائر"]
          },
          {
            name: "هندسة ميكانيكية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم الآلات والأنظمة الميكانيكية.",
            careers: ["مهندس ميكانيك", "مهندس إنتاج", "مصمم منتجات", "مهندس صيانة", "مهندس في شركات صناعية", "مهندس سيارات"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات", icon: "💻",
        majors: [
          {
            name: "علم الحاسوب", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "البرمجة والخوارزميات وتطوير البرمجيات وهياكل البيانات.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور ويب", "مطور تطبيقات", "مهندس في شركات تقنية", "مطور ألعاب"]
          },
          {
            name: "أمن المعلومات", hours: 132, field: "IT", duration: "4 سنوات", isNew: true, showCareers: false,
            description: "تأمين الأنظمة والشبكات والبيانات والحماية من الهجمات السيبرانية.",
            careers: ["محلل أمن سيبراني", "مختبر اختراق", "مهندس أمن شبكات", "مستشار أمن", "محقق رقمي", "مدير أمن معلومات"]
          },
          {
            name: "هندسة البرمجيات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تطوير البرمجيات ضمن منهجيات احترافية وإدارة مشاريع التطوير.",
            careers: ["مهندس برمجيات", "مطور تطبيقات", "مدير مشاريع", "مهندس جودة", "مهندس DevOps", "مهندس حلول سحابية"]
          }
        ]
      },
      {
        name: "كلية الطب", icon: "🩺",
        majors: [
          {
            name: "دكتور في الطب", hours: 256, field: "صحي", duration: "6 سنوات", isNew: false, showCareers: false,
            description: "كلية طب معتمدة في إربد مع تدريب في مستشفى الملك المنذر التعليمي.",
            careers: ["طبيب عام", "طبيب متخصص", "طبيب مقيم", "جراح", "باحث طبي", "طبيب عسكري"]
          }
        ]
      },
      {
        name: "كلية العلوم", icon: "🔬",
        majors: [
          {
            name: "رياضيات", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الرياضيات البحثية والتطبيقية والإحصاء.",
            careers: ["أكاديمي", "محلل إحصائي", "عالم بيانات", "محلل مالي", "معلم رياضيات", "محلل أعمال"]
          },
          {
            name: "فيزياء", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الفيزياء النظرية والتطبيقية والبحث العلمي.",
            careers: ["أكاديمي وباحث", "فني مختبر", "مهندس فيزيائي", "معلم فيزياء", "محلل في شركات طاقة", "مطور أدوات قياس"]
          },
          {
            name: "كيمياء", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الكيمياء العضوية وغير العضوية والتحليلية.",
            careers: ["كيميائي مختبر", "باحث في الدواء", "مفتش جودة", "كيميائي شرعي", "أكاديمي", "مهندس بيئة"]
          }
        ]
      },
      {
        name: "كلية الآداب", icon: "📖",
        majors: [
          {
            name: "اللغة العربية", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة اللغة العربية وآدابها وبلاغتها.",
            careers: ["معلم عربي", "كاتب ومحرر", "مصحح لغوي", "أكاديمي", "مترجم", "صحفي"]
          },
          {
            name: "اللغة الإنجليزية", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأدب الإنجليزي واللغويات والترجمة.",
            careers: ["معلم إنجليزي", "مترجم", "محرر محتوى", "كاتب", "مدير محتوى رقمي", "أكاديمي"]
          }
        ]
      },
      {
        name: "كلية الاقتصاد والعلوم الإدارية", icon: "💼",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة والتسويق وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "رائد أعمال", "مدير مبيعات", "مستشار إداري", "مدير موارد بشرية"]
          },
          {
            name: "محاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "المحاسبة المالية والتدقيق والضرائب.",
            careers: ["محاسب قانوني", "مدقق", "محلل مالي", "مستشار ضريبي", "مدير مالي", "محاسب حكومي"]
          },
          {
            name: "اقتصاد", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة الأسواق والسياسات الاقتصادية.",
            careers: ["محلل اقتصادي", "مستشار حكومي", "باحث اقتصادي", "أكاديمي", "محلل بنك", "صحفي اقتصادي"]
          }
        ]
      },
      {
        name: "كلية الفنون الجميلة والتصميم", icon: "🎨",
        majors: [
          {
            name: "الفنون البصرية والتصميم", hours: 132, field: "فني", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الفنون التشكيلية والتصميم الجرافيكي وفنون الطباعة.",
            careers: ["مصمم جرافيك", "فنان تشكيلي", "مدير فني", "مصمم إعلانات", "معلم فنون", "مدير معرض فني"]
          },
          {
            name: "تصميم الأزياء", hours: 132, field: "فني", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم الملابس والأزياء وصناعة النسيج.",
            careers: ["مصمم أزياء", "مصمم في دور الأزياء", "مدير إنتاج ملابس", "أخصائي تسويق أزياء", "مصمم أزياء مسرح", "مستشار موضة"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 5. جامعة البلقاء التطبيقية (BAU)
  // =============================================
  5: {
    id: 5, name: "جامعة البلقاء التطبيقية", type: "public", location: "السلط (المركز)", icon: "🔧", website: "https://www.bau.edu.jo",
    facultiesData: [
      {
        name: "كلية الهندسة التكنولوجية (Polytechnic)", icon: "⚙️",
        majors: [
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "كلية الهندسة التكنولوجية المتخصصة بالتطبيقات العملية في البناء والتشييد.",
            careers: ["مهندس إنشاءات", "مهندس طرق", "مشرف مشاريع", "مهندس بلدية", "مخطط مدني", "مهندس ري"]
          },
          {
            name: "هندسة الطرق والجسور", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تخصص في تصميم وإنشاء الطرق والجسور والأنفاق.",
            careers: ["مهندس طرق", "مهندس جسور", "مصمم بنية تحتية", "مشرف مشاريع طرق", "مهندس في وزارة الأشغال", "مهندس مقاولات"]
          },
          {
            name: "هندسة كهربائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأنظمة الكهربائية والإلكترونيات التطبيقية.",
            careers: ["مهندس كهربائي", "مهندس صيانة", "مهندس في شركات الكهرباء", "مهندس أتمتة", "مصمم لوحات كهربائية", "مهندس طاقة"]
          },
          {
            name: "هندسة ميكانيكية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم وصيانة الآلات الصناعية والمعدات.",
            careers: ["مهندس ميكانيك", "مهندس إنتاج", "مهندس صيانة مصانع", "مصمم ميكانيكي", "مهندس سيارات", "مهندس تبريد"]
          }
        ]
      },
      {
        name: "كلية الذكاء الاصطناعي", icon: "🤖",
        majors: [
          {
            name: "الذكاء الاصطناعي", hours: 132, field: "IT", duration: "4 سنوات", isNew: true, showCareers: false,
            description: "كلية متخصصة بالـ AI وتعلم الآلة والشبكات العصبية والتطبيقات الذكية.",
            careers: ["مهندس ذكاء اصطناعي", "عالم بيانات", "مطور نماذج تعلم عميق", "باحث AI", "مهندس رؤية حاسوبية", "مطور روبوتات ذكية"]
          }
        ]
      },
      {
        name: "كلية الأعمال", icon: "💼",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة والتسويق وريادة الأعمال والتجارة.",
            careers: ["مدير أعمال", "مسؤول تسويق", "رائد أعمال", "مدير مبيعات", "مستشار إداري", "مدير مشاريع"]
          },
          {
            name: "محاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "المحاسبة المالية والتدقيق.",
            careers: ["محاسب", "مدقق", "محلل مالي", "مستشار ضريبي", "مدير مالي", "محاسب حكومي"]
          }
        ]
      },
      {
        name: "كلية العلوم التطبيقية", icon: "🔬",
        majors: [
          {
            name: "علوم حاسوب تطبيقية", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "البرمجة التطبيقية وتطوير الأنظمة العملية.",
            careers: ["مطور تطبيقات", "مهندس برمجيات", "مطور ويب", "مهندس دعم تقني", "محلل نظم", "مطور قواعد بيانات"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 6. جامعة مؤتة
  // =============================================
  6: {
    id: 6, name: "جامعة مؤتة", type: "public", location: "الكرك", icon: "⚔️", website: "https://www.mutah.edu.jo",
    facultiesData: [
      {
        name: "كلية الطب", icon: "🩺",
        majors: [
          {
            name: "دكتور في الطب والجراحة", hours: 256, field: "صحي", duration: "6 سنوات", isNew: false, showCareers: false,
            description: "كلية طب في الجنوب مع تدريب سريري في مستشفى مؤتة الجامعي التعليمي.",
            careers: ["طبيب عام", "طبيب متخصص", "طبيب مقيم", "جراح", "طبيب عسكري", "باحث طبي"]
          }
        ]
      },
      {
        name: "كلية طب الأسنان", icon: "🦷",
        majors: [
          {
            name: "دكتور في طب وجراحة الأسنان", hours: 210, field: "صحي", duration: "5 سنوات", isNew: true, showCareers: false,
            description: "كلية أُسست عام 2024 مجهزة بأحدث التقنيات في طب الفم والأسنان.",
            careers: ["طبيب أسنان عام", "أخصائي تقويم أسنان", "جراح فم وأسنان", "أخصائي زراعة أسنان", "طبيب أسنان أطفال", "صاحب عيادة خاصة"]
          }
        ]
      },
      {
        name: "كلية الصيدلة", icon: "💊",
        majors: [
          {
            name: "الصيدلة", hours: 160, field: "صحي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة الصيدلة المجتمعية والصناعية والإكلينيكية وعلم الأدوية.",
            careers: ["صيدلاني مجتمعي", "صيدلاني مستشفى", "مندوب طبي", "باحث في صناعة الدواء", "مفتش دوائي", "مدير صيدلية"]
          }
        ]
      },
      {
        name: "كلية التمريض", icon: "💉",
        majors: [
          {
            name: "التمريض", hours: 132, field: "صحي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تأهيل ممرضين متخصصين للعمل في المستشفيات والمراكز الصحية.",
            careers: ["ممرض/ممرضة في مستشفيات", "ممرض عناية مركزة", "ممرض غرفة عمليات", "ممرض مجتمعي", "مشرف تمريض", "ممرض في الخليج"]
          }
        ]
      },
      {
        name: "كلية الهندسة", icon: "🏗️",
        majors: [
          {
            name: "هندسة مدنية", hours: 166, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم وإنشاء المنشآت والطرق والمشاريع الكبرى في جنوب المملكة.",
            careers: ["مهندس إنشاءات", "مهندس طرق", "مشرف مشاريع", "مهندس بلدية", "مخطط مدني", "مهندس ري"]
          },
          {
            name: "هندسة كهربائية (اتصالات وإلكترونيات)", hours: 166, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأنظمة الكهربائية والاتصالات والإلكترونيات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة متجددة", "مهندس أتمتة", "مهندس صيانة", "مصمم دوائر"]
          },
          {
            name: "هندسة كهربائية (قوى وتحكم)", hours: 166, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "منظومات الطاقة الكهربائية وأنظمة التحكم الصناعي.",
            careers: ["مهندس قوى كهربائية", "مهندس تحكم آلي", "مهندس في شركات الكهرباء", "مهندس أتمتة صناعية", "مصمم محطات طاقة", "مهندس طاقة متجددة"]
          },
          {
            name: "هندسة ميكانيكية", hours: 166, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم الآلات والأنظمة الميكانيكية وصناعة الطاقة.",
            careers: ["مهندس ميكانيك", "مهندس إنتاج", "مهندس صيانة مصانع", "مصمم ميكانيكي", "مهندس طاقة", "مهندس سيارات"]
          },
          {
            name: "هندسة ميكانيكية (قوى حرارية وطاقة)", hours: 166, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "أنظمة الطاقة الحرارية والمحركات والتبريد وأنظمة طاقة متجددة.",
            careers: ["مهندس طاقة حرارية", "مهندس محطات كهربائية", "مهندس تكييف وتبريد", "مهندس في مصافي النفط", "مهندس طاقة متجددة", "مهندس صيانة توربينات"]
          },
          {
            name: "هندسة مواد وتصنيع", hours: 166, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "علوم المواد الهندسية وعمليات التصنيع والمعالجة السطحية.",
            careers: ["مهندس مواد", "مهندس تصنيع", "مهندس جودة مواد", "مهندس في شركات معدنية", "باحث في المواد", "مهندس تطوير منتجات"]
          },
          {
            name: "هندسة مياه وبيئة", hours: 166, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "إدارة الموارد المائية ومعالجة المياه وحماية البيئة.",
            careers: ["مهندس مياه", "مهندس بيئة", "مهندس محطات معالجة", "مستشار بيئي", "مهندس في سلطة المياه", "باحث بيئي"]
          },
          {
            name: "هندسة كيميائية", hours: 166, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم العمليات الكيميائية الصناعية وصناعة الأدوية.",
            careers: ["مهندس عمليات كيميائية", "مهندس في شركات البوتاس", "مهندس تكرير نفط", "باحث في المواد", "مهندس بيئة", "مهندس صناعة دواء"]
          },
          {
            name: "هندسة الحاسوب", hours: 166, field: "IT/Eng", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم المعالجات والأنظمة المدمجة والشبكات الحاسوبية.",
            careers: ["مهندس أجهزة حاسوب", "مطور أنظمة مدمجة", "مهندس شبكات", "مهندس FPGA", "مصمم دوائر إلكترونية", "مهندس في شركات تقنية"]
          },
          {
            name: "أمن الحاسوب والشبكات", hours: 166, field: "IT/Eng", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "حماية الأنظمة والشبكات والبيانات من الهجمات الإلكترونية.",
            careers: ["محلل أمن سيبراني", "مختبر اختراق", "مهندس أمن شبكات", "مدير أمن معلومات", "محقق رقمي", "مستشار أمن IT"]
          },
          {
            name: "النظم الصناعية", hours: 166, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تحسين العمليات الإنتاجية وإدارة الجودة وتحليل النظم الصناعية.",
            careers: ["مهندس إنتاج", "مدير جودة", "محلل عمليات", "مهندس في المصانع", "مستشار إنتاجية", "محلل بيانات صناعية"]
          }
        ]
      },
      {
        name: "كلية العلوم", icon: "🔬",
        majors: [
          {
            name: "الرياضيات والإحصاء", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الرياضيات التطبيقية والإحصاء الحيوي والنمذجة الرياضية.",
            careers: ["محلل إحصائي", "أكاديمي وباحث", "عالم بيانات", "محلل مالي", "معلم رياضيات", "محلل مخاطر"]
          },
          {
            name: "الفيزياء", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الفيزياء النظرية والتطبيقية ومبادئ العلوم الطبيعية.",
            careers: ["أكاديمي وباحث", "فني مختبر", "مهندس فيزيائي", "معلم فيزياء", "محلل في شركات طاقة", "مطور أدوات قياس"]
          },
          {
            name: "الكيمياء", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الكيمياء العضوية وغير العضوية والتحليلية وتطبيقاتها الصناعية.",
            careers: ["كيميائي مختبر", "باحث في صناعة الدواء", "مفتش جودة", "مهندس بيئة", "أكاديمي", "كيميائي شرعي"]
          },
          {
            name: "علوم حياتية", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأحياء الدقيقة وعلم الوراثة والتطور والبيئة الطبيعية.",
            careers: ["باحث بيولوجي", "أكاديمي", "فني مختبر", "عالم وراثة", "متخصص بيئة", "مطور لقاحات"]
          },
          {
            name: "علوم طبية ومخبرية", hours: 132, field: "صحي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "التحاليل الطبية المختبرية وعلم الأمراض والدم والكيمياء الحيوية.",
            careers: ["أخصائي مختبر طبي", "فني تحاليل", "محلل كيمياء حيوية", "باحث طبي", "فني في المستشفيات", "مفتش جودة مختبرات"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات", icon: "💻",
        majors: [
          {
            name: "هندسة البرمجيات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تطوير البرمجيات وإدارة مشاريع التطوير ومعايير جودة البرمجيات.",
            careers: ["مهندس برمجيات", "مطور تطبيقات", "مدير مشاريع تقنية", "مهندس جودة برمجيات", "مهندس DevOps", "مهندس حلول سحابية"]
          },
          {
            name: "علم الحاسوب", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "البرمجة والخوارزميات وهياكل البيانات وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات", "مطور ويب", "محلل نظم", "مطور قواعد بيانات"]
          },
          {
            name: "نظم المعلومات الحاسوبية", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "إدارة نظم المعلومات وقواعد البيانات وتكنولوجيا الأعمال الرقمية.",
            careers: ["محلل نظم", "مدير قواعد بيانات", "مطور ERP", "مستشار IT", "محلل أعمال", "مدير مشاريع رقمية"]
          }
        ]
      },
      {
        name: "كلية الزراعة", icon: "🌾",
        majors: [
          {
            name: "الإنتاج النباتي", hours: 132, field: "زراعي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "زراعة المحاصيل وتقنيات الإنتاج الزراعي الحديث ومكافحة الآفات.",
            careers: ["مهندس زراعي", "مستشار زراعي", "باحث في المراكز الزراعية", "مدير مزرعة", "مصدّر منتجات زراعية", "أخصائي جودة غذاء"]
          },
          {
            name: "الإنتاج الحيواني", hours: 132, field: "زراعي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تربية الحيوانات وتغذيتها وإدارة مزارع الإنتاج الحيواني.",
            careers: ["مهندس إنتاج حيواني", "مدير مزارع", "باحث", "مستشار في شركات الأعلاف", "مصدّر منتجات حيوانية", "مفتش بيطري"]
          },
          {
            name: "التغذية والصناعات الغذائية", hours: 132, field: "زراعي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "علوم الغذاء والتغذية البشرية وتصنيع المواد الغذائية.",
            careers: ["أخصائي تغذية", "فني صناعات غذائية", "مفتش جودة غذاء", "باحث في سلامة الغذاء", "مطور منتجات غذائية", "مستشار تغذية"]
          },
          {
            name: "الوقاية والمكافحة المتكاملة", hours: 132, field: "زراعي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "مكافحة الآفات الزراعية والحشرات والأمراض النباتية.",
            careers: ["أخصائي مكافحة آفات", "مفتش زراعي", "مستشار وقاية نباتات", "باحث في مراكز بحثية زراعية", "مهندس زراعي", "عامل في وزارة الزراعة"]
          }
        ]
      },
      {
        name: "كلية الأعمال", icon: "💼",
        majors: [
          {
            name: "إدارة الأعمال والتسويق", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة الاستراتيجية والتسويق والتجارة وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "رائد أعمال", "مدير مبيعات", "مستشار إداري", "مدير موارد بشرية"]
          },
          {
            name: "المحاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "المحاسبة المالية والإدارية والتدقيق والضرائب.",
            careers: ["محاسب قانوني", "مدقق حسابات", "محلل مالي", "مستشار ضريبي", "مدير مالي", "محاسب حكومي"]
          },
          {
            name: "الإدارة العامة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "إدارة المؤسسات الحكومية والخاصة وتطوير السياسات الإدارية.",
            careers: ["مدير إداري", "مسؤول موارد بشرية", "مستشار إداري حكومي", "مدير مشاريع", "محلل سياسات", "مدير في القطاع العام"]
          },
          {
            name: "العلوم المالية والمصرفية", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "إدارة الأصول المالية والاستثمار والبنوك والأسواق المالية.",
            careers: ["محلل مالي", "مصرفي", "مدير استثمار", "محلل أسواق مالية", "مستشار مالي", "مدير مخاطر"]
          },
          {
            name: "اقتصاديات المال والأعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "التحليل الاقتصادي التطبيقي وأسواق المال وسياسات الأعمال.",
            careers: ["محلل اقتصادي", "مستشار حكومي", "باحث اقتصادي", "محلل في البنوك", "أكاديمي", "صحفي اقتصادي"]
          },
          {
            name: "نظم المعلومات الإدارية", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "ربط تكنولوجيا المعلومات بالإدارة وتحليل بيانات الأعمال.",
            careers: ["محلل أعمال", "مدير نظم معلومات", "مستشار تحول رقمي", "مطور نظم ERP", "محلل بيانات", "مدير مشاريع رقمية"]
          },
          {
            name: "التسويق", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "استراتيجيات التسويق الرقمي والتقليدي وإدارة العلامات التجارية.",
            careers: ["مدير تسويق", "مسؤول إعلام رقمي", "محلل سوق", "مدير علاقات عامة", "مصمم حملات إعلانية", "مدير مبيعات"]
          }
        ]
      },
      {
        name: "كلية الحقوق", icon: "⚖️",
        majors: [
          {
            name: "القانون", hours: 132, field: "قانون", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "القانون المدني والجزائي والتجاري والدولي مع التطبيق العملي.",
            careers: ["محامٍ", "قاضٍ", "مستشار قانوني", "مدعي عام", "موثق عقود", "مستشار في مؤسسات دولية"]
          }
        ]
      },
      {
        name: "كلية الشريعة", icon: "📿",
        majors: [
          {
            name: "الفقه وأصوله", hours: 132, field: "شريعة", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الفقه الإسلامي وأصوله والاجتهاد والمسائل المعاصرة.",
            careers: ["قاضٍ شرعي", "مفتٍ", "إمام مسجد", "معلم دراسات إسلامية", "داعية", "باحث شرعي"]
          },
          {
            name: "أصول الدين", hours: 132, field: "شريعة", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "العقيدة والتفسير وعلوم القرآن والحديث النبوي الشريف.",
            careers: ["معلم دراسات إسلامية", "داعية", "باحث شرعي", "إمام مسجد", "مدرس قرآن", "أكاديمي"]
          }
        ]
      },
      {
        name: "كلية الآداب", icon: "📖",
        majors: [
          {
            name: "اللغة العربية وآدابها", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "اللغة العربية وآدابها وبلاغتها ونقدها الأدبي.",
            careers: ["معلم لغة عربية", "كاتب ومحرر", "مصحح لغوي", "مترجم", "أكاديمي وباحث", "صحفي"]
          },
          {
            name: "اللغة الإنجليزية وآدابها", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأدب الإنجليزي واللغويات التطبيقية والترجمة.",
            careers: ["معلم إنجليزي", "مترجم", "محرر محتوى", "كاتب محترف", "مدير محتوى رقمي", "أكاديمي"]
          },
          {
            name: "اللغات الأوروبية", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة لغة أوروبية (فرنسية / ألمانية / إسبانية) وآدابها وثقافتها.",
            careers: ["مترجم متعدد اللغات", "معلم لغات أجنبية", "موظف دبلوماسي", "مدير علاقات دولية", "مرشد سياحي دولي", "موظف في منظمات دولية"]
          },
          {
            name: "الترجمة", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "مهارات الترجمة التحريرية والفورية بين العربية والإنجليزية.",
            careers: ["مترجم محترف", "مترجم فوري", "محرر نصوص مترجمة", "أكاديمي", "موظف في منظمات أممية", "مترجم قانوني"]
          }
        ]
      },
      {
        name: "كلية العلوم الاجتماعية", icon: "🌍",
        majors: [
          {
            name: "الآثار والسياحة", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "علم الآثار وإدارة المواقع التراثية والسياحة الثقافية.",
            careers: ["عالم آثار", "مرشد سياحي", "إداري متحف", "محافظ تراث", "باحث تاريخي", "مخطط سياحي"]
          },
          {
            name: "الجغرافيا", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الجغرافيا الطبيعية والبشرية وأنظمة المعلومات الجغرافية.",
            careers: ["جغرافي", "محلل GIS", "مخطط تعمير", "أكاديمي", "باحث بيئي", "مستشار تخطيط"]
          },
          {
            name: "التاريخ", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "التاريخ العربي الإسلامي والعالمي وتحليل الحضارات.",
            careers: ["مؤرخ", "أكاديمي وباحث", "معلم تاريخ", "مرشد سياحي", "محافظ تراث", "كاتب"]
          },
          {
            name: "العلاقات الدولية", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "العلاقات الدولية والدبلوماسية والسياسة الخارجية.",
            careers: ["دبلوماسي", "محلل سياسي", "مستشار حكومي", "عامل في منظمات دولية", "أكاديمي", "صحفي سياسي دولي"]
          },
          {
            name: "علم الاجتماع", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة المجتمع والسلوك الاجتماعي والظواهر الاجتماعية.",
            careers: ["باحث اجتماعي", "أخصائي اجتماعي", "مستشار اجتماعي", "أكاديمي", "عامل في المنظمات الإنسانية", "محلل سياسات اجتماعية"]
          }
        ]
      },
      {
        name: "كلية العلوم التربوية", icon: "📚",
        majors: [
          {
            name: "الإرشاد والصحة النفسية", hours: 132, field: "تربوي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الصحة النفسية والإرشاد الأسري والتربوي والعلاج النفسي.",
            careers: ["مرشد نفسي", "أخصائي صحة نفسية", "معالج نفسي", "مستشار أسري", "مشرف تربوي", "مرشد في المدارس"]
          },
          {
            name: "التربية الخاصة", hours: 132, field: "تربوي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تعليم ودعم ذوي الاحتياجات الخاصة ووضع الخطط التربوية الفردية.",
            careers: ["معلم تربية خاصة", "أخصائي دمج", "مستشار تربوي لذوي الاحتياجات", "معالج تربوي", "مشرف مراكز خاصة", "باحث في الإعاقة"]
          },
          {
            name: "علم النفس التطبيقي", hours: 132, field: "تربوي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "علم النفس التطبيقي والسلوكي وتقييم القدرات والأداء.",
            careers: ["أخصائي نفسي تطبيقي", "محلل سلوكي", "مستشار موارد بشرية", "باحث أكاديمي", "مستشار صحة نفسية", "مدرب مهني"]
          },
          {
            name: "تربية الطفل - رياض الأطفال", hours: 132, field: "تربوي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "رعاية وتعليم الأطفال في سنوات الطفولة المبكرة.",
            careers: ["مربية أطفال", "معلمة رياض أطفال", "مديرة حضانة", "مستشارة تطور طفولة", "أخصائية طفولة مبكرة", "مدربة معلمات"]
          },
          {
            name: "تعليم الصفوف الثلاثة الأولى", hours: 132, field: "تربوي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تأهيل معلمين للصفوف الأولى مع مهارات تدريس القراءة والكتابة.",
            careers: ["معلم صف في المدارس الابتدائية", "مشرف تربوي", "معلم في الأردن والخليج", "مرشد تربوي", "مدير مدرسة (بعد الخبرة)", "مدرب معلمين"]
          }
        ]
      },
      {
        name: "كلية علوم الرياضة", icon: "⚽",
        majors: [
          {
            name: "التربية الرياضية", hours: 132, field: "رياضي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تأهيل معلمي التربية البدنية وأساسيات علم الحركة.",
            careers: ["معلم تربية بدنية", "مدرب رياضي", "مدير مرافق رياضية", "أخصائي لياقة بدنية", "محلل أداء رياضي", "مشرف رياضي"]
          },
          {
            name: "التأهيل الرياضي", hours: 132, field: "رياضي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "إعادة تأهيل المصابين رياضياً والعلاج الفيزيائي الرياضي.",
            careers: ["أخصائي تأهيل رياضي", "معالج فيزيائي رياضي", "مدرب لإعادة التأهيل", "أخصائي في أندية رياضية", "معالج في مراكز طبية", "مستشار رياضي"]
          },
          {
            name: "التدريب الرياضي", hours: 132, field: "رياضي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "منهجيات التدريب الرياضي الحديث وعلوم الأداء الرياضي.",
            careers: ["مدرب رياضي محترف", "مدرب في الأندية", "مدير أكاديمية رياضية", "محلل بيانات رياضية", "مستشار في الاتحادات الرياضية", "مدرب منتخب"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 7. جامعة الحسين بن طلال
  // =============================================
  7: {
    id: 7, name: "جامعة الحسين بن طلال", type: "public", location: "معان", icon: "🏜️", website: "http://www.ahu.edu.jo",
    facultiesData: [
      {
        name: "كلية الهندسة", icon: "⚒️",
        majors: [
          {
            name: "هندسة التعدين والتحجير", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تخصص متميز في الجنوب يدرّس استخراج المعادن والصخور وإدارة مواقع التعدين.",
            careers: ["مهندس تعدين في شركات الفوسفات", "مهندس في البوتاس", "مدير موقع تعدين", "باحث في الجيولوجيا", "مهندس انفجارات", "مستشار معادن"]
          },
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم المنشآت والبنية التحتية في الجنوب.",
            careers: ["مهندس إنشاءات", "مهندس طرق", "مشرف مشاريع", "مهندس بلدية", "مخطط مدني", "مهندس مقاولات"]
          },
          {
            name: "هندسة كهربائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأنظمة الكهربائية والطاقة المتجددة.",
            careers: ["مهندس كهربائي", "مهندس طاقة شمسية", "مهندس صيانة", "مهندس في شركات الكهرباء", "مهندس أتمتة", "مصمم أنظمة طاقة"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات", icon: "💻",
        majors: [
          {
            name: "هندسة البرمجيات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تطوير البرمجيات وإدارة المشاريع التقنية.",
            careers: ["مطور برمجيات", "مدير مشاريع تقنية", "مطور تطبيقات", "مهندس جودة", "مهندس DevOps", "مهندس حلول"]
          },
          {
            name: "علم الحاسوب", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "البرمجة والخوارزميات وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات", "مهندس في شركات تقنية", "مطور ويب", "محلل نظم"]
          }
        ]
      },
      {
        name: "كلية العلوم الإدارية", icon: "📊",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة والتسويق وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "رائد أعمال", "مدير مبيعات", "مستشار إداري", "مدير موارد بشرية"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 8. جامعة الطفيلة التقنية
  // =============================================
  8: {
    id: 8, name: "جامعة الطفيلة التقنية", type: "public", location: "الطفيلة", icon: "⚙️", website: "http://www.ttu.edu.jo",
    facultiesData: [
      {
        name: "كلية الهندسة", icon: "🏗️",
        majors: [
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم المنشآت والطرق والبنية التحتية.",
            careers: ["مهندس إنشاءات", "مهندس طرق", "مشرف مشاريع", "مهندس بلدية", "مخطط مدني", "مهندس ري"]
          },
          {
            name: "هندسة كهربائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأنظمة الكهربائية والطاقة المتجددة والاتصالات.",
            careers: ["مهندس كهربائي", "مهندس طاقة متجددة", "مهندس صيانة", "مهندس اتصالات", "مهندس أتمتة", "مصمم أنظمة طاقة"]
          },
          {
            name: "هندسة ميكانيكية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم وصيانة الآلات الصناعية.",
            careers: ["مهندس ميكانيك", "مهندس إنتاج", "مهندس صيانة", "مصمم ميكانيكي", "مهندس في مصانع", "مهندس سيارات"]
          },
          {
            name: "هندسة طاقة متجددة", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: true, showCareers: false,
            description: "تخصص نادر يركز على الطاقة الشمسية وطاقة الرياح والبيوغاز.",
            careers: ["مهندس طاقة شمسية", "مهندس طاقة رياح", "مستشار طاقة نظيفة", "مصمم محطات طاقة", "باحث طاقة متجددة", "مهندس في شركات الطاقة"]
          }
        ]
      },
      {
        name: "كلية العلوم وتكنولوجيا المعلومات", icon: "💻",
        majors: [
          {
            name: "علم الحاسوب", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "البرمجة وتطوير البرمجيات وهياكل البيانات.",
            careers: ["مطور برمجيات", "مطور تطبيقات", "مطور ويب", "مهندس في شركات تقنية", "محلل نظم", "مطور قواعد بيانات"]
          },
          {
            name: "الذكاء الاصطناعي وعلوم البيانات", hours: 132, field: "IT", duration: "4 سنوات", isNew: true, showCareers: false,
            description: "تعلم الآلة وتحليل البيانات والذكاء الاصطناعي التطبيقي.",
            careers: ["عالم بيانات", "مهندس ذكاء اصطناعي", "محلل بيانات", "مطور نماذج تعلم آلة", "محلل ذكاء أعمال", "مهندس MLOps"]
          }
        ]
      },
      {
        name: "كلية الأعمال", icon: "💼",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة والتسويق وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "رائد أعمال", "مدير مبيعات", "مستشار إداري", "مدير مشاريع"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 9. الجامعة الألمانية الأردنية (GJU)
  // =============================================
  9: {
    id: 9, name: "الجامعة الألمانية الأردنية", type: "public", location: "مادبا / عمان", icon: "🇩🇪", website: "http://www.gju.edu.jo",
    facultiesData: [
      {
        name: "كلية الهندسة والمعلوماتية", icon: "📐",
        majors: [
          {
            name: "هندسة الميكاترونكس", hours: 165, field: "هندسي", duration: "5 سنوات (سنة في ألمانيا)", isNew: false, showCareers: false,
            description: "برنامج مميز يتضمن سنة دراسية في ألمانيا مع شريك ألماني، يجمع بين الميكانيكا والإلكترونيات والبرمجة.",
            careers: ["مهندس روبوتيكس", "مهندس أتمتة صناعية", "مصمم أنظمة تحكم ذكية", "مهندس في مصانع ألمانية", "مطور أنظمة مدمجة", "مهندس سيارات ذاتية"]
          },
          {
            name: "هندسة صناعية", hours: 165, field: "هندسي", duration: "5 سنوات (سنة في ألمانيا)", isNew: false, showCareers: false,
            description: "هندسة الإنتاج وإدارة الجودة وسلاسل التوريد مع سنة دراسية في ألمانيا.",
            careers: ["مهندس إنتاج", "مدير جودة", "محلل سلاسل توريد", "مستشار عمليات", "مهندس في مصانع", "محلل بيانات صناعية"]
          },
          {
            name: "هندسة كيميائية وبيئية", hours: 165, field: "هندسي", duration: "5 سنوات (سنة في ألمانيا)", isNew: false, showCareers: false,
            description: "دراسة العمليات الكيميائية مع التركيز على الاستدامة البيئية.",
            careers: ["مهندس بيئة", "مهندس كيميائي", "مهندس معالجة مياه", "مستشار بيئي", "مهندس في شركات تكرير", "محلل بيئي"]
          }
        ]
      },
      {
        name: "كلية العلوم الإدارية", icon: "📦",
        majors: [
          {
            name: "علوم لوجستية وسلاسل التوريد", hours: 132, field: "أعمال", duration: "5 سنوات (سنة في ألمانيا)", isNew: false, showCareers: false,
            description: "تخصص مطلوب عالمياً في إدارة سلاسل التوريد والخدمات اللوجستية.",
            careers: ["مدير لوجستيات", "محلل سلاسل توريد", "مدير مستودعات", "مستشار لوجستي", "مدير شراء", "أخصائي تصدير واستيراد"]
          },
          {
            name: "إدارة أعمال دولية", hours: 132, field: "أعمال", duration: "5 سنوات (سنة في ألمانيا)", isNew: false, showCareers: false,
            description: "الأعمال الدولية والتجارة والاستثمار مع خبرة في السوق الأوروبي.",
            careers: ["مدير أعمال دولية", "مستشار استثمار", "مدير تصدير", "محلل أسواق دولية", "مدير فروع خارجية", "مندوب تجاري دولي"]
          }
        ]
      },
      {
        name: "كلية العلوم التطبيقية والاجتماعية", icon: "🔬",
        majors: [
          {
            name: "علم الحاسوب", hours: 132, field: "IT", duration: "5 سنوات (سنة في ألمانيا)", isNew: false, showCareers: false,
            description: "البرمجة والخوارزميات وتطوير البرمجيات مع تأهيل دولي.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات", "مهندس في شركات ألمانية", "مطور ألعاب", "مهندس ذكاء اصطناعي"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 10. جامعة آل البيت
  // =============================================
  10: {
    id: 10, name: "جامعة آل البيت", type: "public", location: "المفرق", icon: "🕌", website: "https://www.aabu.edu.jo",
    facultiesData: [
      {
        name: "كلية الشريعة", icon: "📿",
        majors: [
          {
            name: "الفقه وأصوله", hours: 132, field: "شريعة", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الفقه الإسلامي وأصوله والتفسير والحديث النبوي مع تركيز على الفقه المعاصر والقضايا الاجتهادية.",
            careers: ["قاضٍ شرعي", "مفتٍ", "إمام مسجد", "معلم دراسات إسلامية", "داعية", "باحث شرعي"]
          },
          {
            name: "أصول الدين", hours: 132, field: "شريعة", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "العقيدة الإسلامية والتفسير وعلوم القرآن والحديث النبوي الشريف.",
            careers: ["معلم دراسات إسلامية", "داعية", "باحث شرعي", "إمام مسجد", "مدرس قرآن كريم", "أكاديمي"]
          },
          {
            name: "الإمامة والوعظ والإرشاد", hours: 132, field: "شريعة", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تأهيل الأئمة والوعاظ والمرشدين الدينيين للعمل في المساجد والمؤسسات الدينية.",
            careers: ["إمام مسجد", "واعظ ومرشد ديني", "مشرف مساجد", "مدرس دراسات إسلامية", "مستشار ديني", "موظف في وزارة الأوقاف"]
          }
        ]
      },
      {
        name: "كلية القانون", icon: "⚖️",
        majors: [
          {
            name: "القانون", hours: 141, field: "قانون", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة القانون المدني والجزائي والتجاري والدولي مع التركيز على الممارسة القانونية الأردنية.",
            careers: ["محامٍ", "قاضٍ", "مستشار قانوني", "مدعي عام", "موثق عقود", "مستشار في مؤسسات حكومية"]
          }
        ]
      },
      {
        name: "كلية الآداب", icon: "📖",
        majors: [
          {
            name: "اللغة العربية وآدابها", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "اللغة العربية وآدابها وبلاغتها ونقدها الأدبي والتراث العربي الإسلامي.",
            careers: ["معلم لغة عربية", "كاتب ومحرر", "مصحح لغوي", "مترجم", "أكاديمي وباحث", "صحفي"]
          },
          {
            name: "اللغة الإنجليزية وآدابها", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة الأدب الإنجليزي واللغويات والترجمة الأدبية.",
            careers: ["معلم إنجليزي", "مترجم", "محرر محتوى", "كاتب محترف", "مدير محتوى", "أكاديمي"]
          },
          {
            name: "اللغة الفرنسية وآدابها", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "اللغة الفرنسية وآدابها والثقافة الفرانكوفونية.",
            careers: ["معلم فرنسي", "مترجم فرنسي-عربي", "موظف في السفارات", "محرر محتوى فرنسي", "أكاديمي", "مدير علاقات دولية"]
          },
          {
            name: "إيطالي-إنجليزي", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة اللغتين الإيطالية والإنجليزية وآدابهما معاً.",
            careers: ["مترجم متعدد اللغات", "معلم لغات", "موظف دبلوماسي", "مدير علاقات دولية", "موظف في شركات إيطالية", "مرشد سياحي"]
          },
          {
            name: "إسباني-إنجليزي", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة اللغتين الإسبانية والإنجليزية معاً.",
            careers: ["مترجم متعدد اللغات", "معلم لغات", "موظف في منظمات دولية", "مدير علاقات دولية", "موظف في شركات أمريكا اللاتينية", "مرشد سياحي"]
          },
          {
            name: "التاريخ", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "التاريخ العربي الإسلامي والعالمي وتحليل الحضارات والأحداث التاريخية.",
            careers: ["مؤرخ", "أكاديمي وباحث", "معلم تاريخ", "مرشد سياحي", "محافظ تراث", "كاتب"]
          },
          {
            name: "العلوم السياسية", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأنظمة السياسية والعلاقات الدولية والسياسة العامة.",
            careers: ["دبلوماسي", "محلل سياسي", "مستشار حكومي", "أكاديمي", "صحفي سياسي", "عامل في المنظمات الدولية"]
          }
        ]
      },
      {
        name: "كلية العلوم التربوية", icon: "📚",
        majors: [
          {
            name: "معلم الصف", hours: 132, field: "تربوي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تأهيل معلمين للتعليم الأساسي مع مهارات التدريس والإدارة الصفية.",
            careers: ["معلم صف في المدارس", "مشرف تربوي", "مدير مدرسة (بعد الخبرة)", "معلم في الأردن والخليج", "مرشد تربوي", "مدرب معلمين"]
          },
          {
            name: "تربية الطفل", hours: 132, field: "تربوي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "رعاية وتعليم الأطفال في مرحلة ما قبل المدرسة وسنوات الطفولة المبكرة.",
            careers: ["مربية أطفال", "معلمة رياض أطفال", "مديرة حضانة", "مستشارة تطور طفولة", "أخصائية طفولة مبكرة", "مدربة معلمات"]
          },
          {
            name: "التربية الخاصة", hours: 132, field: "تربوي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تعليم ودعم ذوي الاحتياجات الخاصة ووضع الخطط التعليمية الفردية.",
            careers: ["معلم تربية خاصة", "أخصائي دمج", "مستشار تربوي لذوي الاحتياجات", "معالج تربوي", "باحث في الإعاقة", "مشرف مراكز خاصة"]
          }
        ]
      },
      {
        name: "كلية العلوم", icon: "🔬",
        majors: [
          {
            name: "الرياضيات", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دراسة الرياضيات البحثية والتطبيقية والإحصاء والنمذجة الرياضية.",
            careers: ["أكاديمي وباحث", "محلل إحصاء", "عالم بيانات", "محلل مالي", "مطور خوارزميات", "مدرس رياضيات"]
          },
          {
            name: "الفيزياء", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "قوانين الطبيعة والطاقة والمادة والكون مع التطبيقات العلمية.",
            careers: ["باحث في المختبرات", "أكاديمي", "مهندس فيزيائي", "محلل في شركات طاقة", "معلم فيزياء", "مطور أنظمة بصرية"]
          },
          {
            name: "الكيمياء", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تركيب المادة وتفاعلاتها الكيميائية وتطبيقاتها الصناعية.",
            careers: ["كيميائي في المختبرات", "باحث في صناعة الدواء", "مفتش جودة", "مهندس بيئة", "أكاديمي وباحث", "كيميائي شرعي"]
          },
          {
            name: "العلوم الحياتية", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأحياء الدقيقة وعلم الوراثة والتطور والبيئة الطبيعية.",
            careers: ["باحث بيولوجي", "أكاديمي", "فني مختبر", "عالم وراثة", "متخصص بيئة", "مطور لقاحات"]
          },
          {
            name: "علوم الأرض والبيئة التطبيقية", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الجيولوجيا والبيئة وعلوم الأرض التطبيقية ودراسة الموارد الطبيعية.",
            careers: ["جيولوجي", "باحث بيئي", "مفتش بيئي", "مهندس منجم", "متخصص في المياه الجوفية", "أكاديمي"]
          },
          {
            name: "نظم المعلومات الجغرافية والاستشعار عن بعد", hours: 132, field: "علمي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تقنيات GIS والأقمار الصناعية وتحليل البيانات المكانية والخرائط الرقمية.",
            careers: ["محلل GIS", "متخصص استشعار عن بعد", "مخطط عمراني", "محلل بيئي", "باحث في الجغرافيا", "مهندس خرائط"]
          }
        ]
      },
      {
        name: "كلية الهندسة", icon: "📐",
        majors: [
          {
            name: "هندسة العمارة", hours: 165, field: "هندسي", duration: "5 سنوات", isNew: false, showCareers: false,
            description: "تصميم المباني والفضاءات المعمارية مع الاهتمام بالتراث الإسلامي في العمارة.",
            careers: ["مهندس معماري", "مصمم داخلي", "مخطط عمراني", "باحث في التراث المعماري", "مدير مشاريع بناء", "مصمم منشآت"]
          },
          {
            name: "الهندسة المدنية", hours: 162, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم وتنفيذ المنشآت والطرق والجسور والبنية التحتية.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مهندس بلدية", "مخطط مدني", "مهندس مقاولات"]
          },
          {
            name: "هندسة المساحة", hours: 162, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "المسح الجيوديسي وعلوم المساحة والخرائط وأنظمة GIS الهندسية.",
            careers: ["مساح قانوني", "مهندس مساحة", "محلل GIS", "مساح في شركات عقارية", "مهندس طرق", "خبير تسوية أراضي"]
          },
          {
            name: "هندسة الطاقة المتجددة", hours: 162, field: "هندسي", duration: "4 سنوات", isNew: true, showCareers: false,
            description: "تصميم منظومات الطاقة الشمسية وطاقة الرياح والتقنيات النظيفة.",
            careers: ["مهندس طاقة شمسية", "مهندس طاقة رياح", "مستشار طاقة نظيفة", "مصمم محطات طاقة", "باحث طاقة متجددة", "مهندس كهرباء"]
          }
        ]
      },
      {
        name: "كلية الأمير الحسين بن عبدالله الثاني لتكنولوجيا المعلومات", icon: "💻",
        majors: [
          {
            name: "علم الحاسوب", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "البرمجة والخوارزميات وتطوير البرمجيات وهياكل البيانات.",
            careers: ["مطور برمجيات", "مطور تطبيقات", "مطور ويب", "مهندس خوارزميات", "مطور ألعاب", "باحث في علوم الحاسوب"]
          },
          {
            name: "نظم المعلومات الحاسوبية", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "إدارة نظم المعلومات وقواعد البيانات وتطبيقات الأعمال.",
            careers: ["محلل نظم", "مدير قواعد بيانات", "مطور ERP", "مستشار IT", "محلل أعمال رقمية", "مدير مشاريع تقنية"]
          },
          {
            name: "نظم المعلومات الإدارية", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "ربط تكنولوجيا المعلومات بإدارة الأعمال وتحليل النظم الإدارية.",
            careers: ["محلل أعمال", "مدير مشاريع رقمية", "مستشار تحول رقمي", "مدير نظم معلومات", "محلل بيانات أعمال", "مطور نظم ERP"]
          }
        ]
      },
      {
        name: "كلية الاقتصاد والعلوم الإدارية", icon: "💼",
        majors: [
          {
            name: "اقتصاديات المال والأعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "التحليل الاقتصادي للأسواق المالية وإدارة الموارد الاقتصادية.",
            careers: ["محلل اقتصادي", "محلل مالي", "مستشار استثماري", "باحث اقتصادي", "موظف في البنوك", "مستشار حكومي"]
          },
          {
            name: "إدارة الأعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة الاستراتيجية والتسويق والموارد البشرية وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "مدير موارد بشرية", "رائد أعمال", "مستشار إداري", "مدير مبيعات"]
          },
          {
            name: "التمويل والمصارف", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "إدارة الأصول المالية والاستثمار والبنوك والأسواق المالية.",
            careers: ["محلل مالي", "مصرفي", "مدير استثمار", "محلل أسواق مالية", "مستشار مالي", "مدير مخاطر"]
          },
          {
            name: "المحاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تحليل البيانات المالية والتدقيق والمحاسبة الإدارية والضرائب.",
            careers: ["محاسب قانوني", "مدقق حسابات", "محلل مالي", "مدير مالي", "مستشار ضريبي", "محاسب حكومي"]
          },
          {
            name: "نظم المعلومات المحاسبية", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "دمج المحاسبة مع تكنولوجيا المعلومات لإدارة الأنظمة المالية الرقمية.",
            careers: ["محاسب نظم معلومات", "مطور برمجيات محاسبة", "مدير نظم ERP المالية", "مدقق IT", "محلل مالي رقمي", "مستشار تحول مالي رقمي"]
          },
          {
            name: "المحاسبة وقانون الأعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الجمع بين الدراسات المحاسبية والإطار القانوني للأعمال التجارية.",
            careers: ["محاسب قانوني محترف", "مستشار قانوني-مالي", "مدقق خارجي", "محامٍ ضريبي", "مستشار شركات", "مراجع قانوني"]
          },
          {
            name: "نظم المعلومات المالية والمصرفية", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: true, showCareers: false,
            description: "تقنيات التمويل الرقمي والمصرفية الإلكترونية وأنظمة المعلومات المصرفية.",
            careers: ["مدير نظم بنكية", "محلل FinTech", "مطور تطبيقات مصرفية", "محلل مخاطر رقمية", "مستشار تحول رقمي مصرفي", "مدير أمن معلومات مالية"]
          }
        ]
      },
      {
        name: "كلية التمريض", icon: "💉",
        majors: [
          {
            name: "التمريض", hours: 132, field: "صحي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تأهيل ممرضين متخصصين للعمل في المستشفيات والمراكز الصحية والمجتمعات.",
            careers: ["ممرض/ممرضة في مستشفيات", "ممرض عناية مركزة", "ممرض غرف عمليات", "ممرض مجتمعي", "مشرف تمريض", "ممرض في دول الخليج"]
          }
        ]
      },
      {
        name: "كلية علوم الطيران", icon: "✈️",
        majors: [
          {
            name: "إدارة سلامة الطيران", hours: 132, field: "تقني", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "إدارة السلامة في قطاع الطيران والمطارات والامتثال للمعايير الدولية.",
            careers: ["مفتش سلامة طيران", "مدير مطار", "مسؤول سلامة في شركات طيران", "محلل مخاطر طيران", "مستشار سلامة دولي", "موظف في الهيئة العامة للطيران المدني"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 11. جامعة الأميرة سمية (PSUT)
  // =============================================
  11: {
    id: 11, name: "جامعة الأميرة سمية (PSUT)", type: "private", location: "عمان", icon: "💻", website: "https://www.psut.edu.jo",
    facultiesData: [
      {
        name: "كلية الملك الحسين (IT)", icon: "🖥️",
        majors: [
          {
            name: "علم الحاسوب", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "من أفضل كليات الـ IT في المنطقة، تتميز ببيئة تعليمية متطورة وشراكات تقنية مع كبرى الشركات.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات", "مهندس في شركات تقنية كبرى", "مطور ألعاب", "مهندس ذكاء اصطناعي"]
          },
          {
            name: "أمن سيبراني", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تخصص متقدم في حماية الأنظمة والشبكات والبيانات.",
            careers: ["محلل أمن سيبراني", "مختبر اختراق", "مدير أمن معلومات", "محلل تهديدات", "مستشار أمن", "محقق رقمي"]
          },
          {
            name: "الذكاء الاصطناعي", hours: 132, field: "IT", duration: "4 سنوات", isNew: true, showCareers: false,
            description: "تعلم الآلة والشبكات العصبية ومعالجة اللغات الطبيعية.",
            careers: ["مهندس ذكاء اصطناعي", "عالم بيانات", "مطور نماذج AI", "باحث في NLP", "مهندس رؤية حاسوبية", "مطور روبوتات ذكية"]
          },
          {
            name: "هندسة البرمجيات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تطوير البرمجيات المتقدمة وإدارة المشاريع التقنية.",
            careers: ["مهندس برمجيات", "مطور تطبيقات", "مدير مشاريع تقنية", "مهندس DevOps", "مهندس جودة", "مهندس حلول سحابية"]
          }
        ]
      },
      {
        name: "كلية الهندسة", icon: "⚡",
        majors: [
          {
            name: "هندسة الحاسوب", hours: 160, field: "IT/Eng", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم المعالجات والأنظمة المدمجة والشبكات.",
            careers: ["مهندس أجهزة", "مطور أنظمة مدمجة", "مهندس شبكات", "مهندس VLSI", "مصمم دوائر", "مهندس في شركات تقنية"]
          },
          {
            name: "هندسة كهربائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأنظمة الكهربائية والإلكترونيات والاتصالات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة متجددة", "مهندس أتمتة", "مهندس صيانة", "مصمم دوائر"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 12. جامعة العلوم التطبيقية (ASU)
  // =============================================
  12: {
    id: 12, name: "جامعة العلوم التطبيقية (ASU)", type: "private", location: "عمان", icon: "🌐", website: "https://www.asu.edu.jo",
    facultiesData: [
      {
        name: "كلية الصيدلة", icon: "💊",
        majors: [
          {
            name: "صيدلة", hours: 160, field: "صحي", duration: "4-5 سنوات", isNew: false, showCareers: false,
            description: "كلية معتمدة دولياً تدرّس الصيدلة المجتمعية والإكلينيكية وصناعة الدواء.",
            careers: ["صيدلاني مجتمعي", "صيدلاني مستشفى", "مندوب طبي", "باحث في صناعة الدواء", "مفتش دوائي", "مدير صيدلية"]
          }
        ]
      },
      {
        name: "كلية الهندسة", icon: "🏗️",
        majors: [
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم المنشآت والبنية التحتية.",
            careers: ["مهندس إنشاءات", "مهندس طرق", "مشرف مشاريع", "مهندس بلدية", "مخطط مدني", "مهندس ري"]
          },
          {
            name: "هندسة كهربائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأنظمة الكهربائية والاتصالات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس أتمتة", "مهندس صيانة", "مهندس طاقة متجددة", "مصمم أنظمة"]
          },
          {
            name: "هندسة ميكانيكية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم الآلات والأنظمة الصناعية.",
            careers: ["مهندس ميكانيك", "مهندس إنتاج", "مهندس صيانة", "مصمم ميكانيكي", "مهندس طاقة", "مهندس سيارات"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات", icon: "💻",
        majors: [
          {
            name: "علم الحاسوب", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "البرمجة وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مطور تطبيقات", "مطور ويب", "مهندس جودة", "محلل نظم", "مطور قواعد بيانات"]
          },
          {
            name: "هندسة البرمجيات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تطوير وإدارة مشاريع البرمجيات.",
            careers: ["مهندس برمجيات", "مطور تطبيقات", "مدير مشاريع تقنية", "مهندس جودة", "مهندس DevOps", "مهندس حلول"]
          }
        ]
      },
      {
        name: "كلية الأعمال", icon: "💼",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة والتسويق وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "رائد أعمال", "مدير مبيعات", "مستشار إداري", "مدير موارد بشرية"]
          },
          {
            name: "محاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "المحاسبة المالية والتدقيق والضرائب.",
            careers: ["محاسب", "مدقق", "محلل مالي", "مستشار ضريبي", "مدير مالي", "محاسب حكومي"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 13. جامعة البترا
  // =============================================
  13: {
    id: 13, name: "جامعة البترا", type: "private", location: "عمان", icon: "🏛️", website: "https://www.uop.edu.jo",
    facultiesData: [
      {
        name: "كلية العمارة والتصميم", icon: "🎨",
        majors: [
          {
            name: "هندسة عمارة", hours: 165, field: "هندسي", duration: "5 سنوات", isNew: false, showCareers: false,
            description: "بيئة إبداعية مميزة لتعلم التصميم المعماري وتخطيط المدن في بيئة خاصة.",
            careers: ["مهندس معماري", "مصمم داخلي", "مخطط عمراني", "باحث في التراث", "مدير مشاريع بناء", "مصمم منشآت"]
          },
          {
            name: "تصميم جرافيك", hours: 132, field: "فني", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم الهويات البصرية والمواد الإعلانية الرقمية والمطبوعة.",
            careers: ["مصمم جرافيك", "مصمم هوية بصرية", "مدير فني", "مصمم UI/UX", "مصمم في وكالات إعلان", "مصمم محتوى رقمي"]
          },
          {
            name: "تصميم أزياء", hours: 132, field: "فني", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم الملابس والأزياء ومعرفة صناعة النسيج.",
            careers: ["مصمم أزياء", "مصمم في دور الأزياء", "مدير إنتاج ملابس", "أخصائي تسويق أزياء", "مصمم أزياء مسرح", "مستشار موضة"]
          }
        ]
      },
      {
        name: "كلية الصيدلة", icon: "💊",
        majors: [
          {
            name: "صيدلة", hours: 160, field: "صحي", duration: "4-5 سنوات", isNew: false, showCareers: false,
            description: "دراسة الصيدلة في جامعة البترا المعروفة بالتميز الأكاديمي.",
            careers: ["صيدلاني مجتمعي", "صيدلاني مستشفى", "مندوب طبي", "باحث في الدواء", "مفتش دوائي", "مدير صيدلية"]
          }
        ]
      },
      {
        name: "كلية الهندسة", icon: "📐",
        majors: [
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم المنشآت والطرق.",
            careers: ["مهندس إنشاءات", "مهندس طرق", "مشرف مشاريع", "مهندس بلدية", "مخطط مدني", "مهندس مقاولات"]
          },
          {
            name: "هندسة كهربائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأنظمة الكهربائية والإلكترونيات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس أتمتة", "مهندس صيانة", "مهندس طاقة متجددة", "مصمم أنظمة"]
          }
        ]
      },
      {
        name: "كلية الأعمال", icon: "💼",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة والتسويق وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "رائد أعمال", "مدير مبيعات", "مستشار إداري", "مدير موارد بشرية"]
          },
          {
            name: "محاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "المحاسبة المالية والتدقيق.",
            careers: ["محاسب", "مدقق", "محلل مالي", "مستشار ضريبي", "مدير مالي", "محاسب حكومي"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 14. جامعة الزيتونة الأردنية
  // =============================================
  14: {
    id: 14, name: "جامعة الزيتونة الأردنية", type: "private", location: "عمان", icon: "🌿", website: "https://www.zuj.edu.jo",
    facultiesData: [
      {
        name: "كلية الصيدلة", icon: "💊",
        majors: [
          {
            name: "صيدلة", hours: 160, field: "صحي", duration: "4-5 سنوات", isNew: false, showCareers: false,
            description: "دراسة شاملة للصيدلة في بيئة تعليمية متميزة.",
            careers: ["صيدلاني مجتمعي", "صيدلاني مستشفى", "مندوب طبي", "باحث في صناعة الدواء", "مفتش دوائي", "مدير صيدلية"]
          }
        ]
      },
      {
        name: "كلية التمريض", icon: "💉",
        majors: [
          {
            name: "تمريض", hours: 132, field: "صحي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تأهيل ممرضين متخصصين للعمل في المستشفيات والمراكز الصحية.",
            careers: ["ممرض/ممرضة في مستشفيات", "ممرض عناية مركزة", "ممرض غرفة عمليات", "ممرض مجتمعي", "مسؤول صحة مهنية", "مشرف تمريض"]
          }
        ]
      },
      {
        name: "كلية الهندسة", icon: "⚙️",
        majors: [
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم المنشآت والطرق.",
            careers: ["مهندس إنشاءات", "مهندس طرق", "مشرف مشاريع", "مهندس بلدية", "مخطط مدني", "مهندس مقاولات"]
          },
          {
            name: "هندسة كهربائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأنظمة الكهربائية والإلكترونيات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس أتمتة", "مهندس صيانة", "مهندس طاقة متجددة", "مصمم أنظمة"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات", icon: "💻",
        majors: [
          {
            name: "علم الحاسوب", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "البرمجة وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مطور تطبيقات", "مطور ويب", "محلل نظم", "مهندس جودة", "مطور قواعد بيانات"]
          }
        ]
      },
      {
        name: "كلية الأعمال", icon: "💼",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة والتسويق وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "رائد أعمال", "مدير مبيعات", "مستشار إداري", "مدير موارد بشرية"]
          },
          {
            name: "محاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "المحاسبة المالية والتدقيق.",
            careers: ["محاسب", "مدقق", "محلل مالي", "مستشار ضريبي", "مدير مالي", "محاسب حكومي"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 15. جامعة فيلادلفيا
  // =============================================
  15: {
    id: 15, name: "جامعة فيلادلفيا", type: "private", location: "جرش", icon: "📖", website: "https://www.philadelphia.edu.jo",
    facultiesData: [
      {
        name: "كلية الصيدلة", icon: "💊",
        majors: [
          {
            name: "صيدلة", hours: 160, field: "صحي", duration: "4-5 سنوات", isNew: false, showCareers: false,
            description: "دراسة الصيدلة في جامعة فيلادلفيا في جرش.",
            careers: ["صيدلاني مجتمعي", "صيدلاني مستشفى", "مندوب طبي", "باحث في الدواء", "مفتش دوائي", "مدير صيدلية"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات", icon: "💻",
        majors: [
          {
            name: "هندسة برمجيات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تطوير البرمجيات وإدارة مشاريع التطوير.",
            careers: ["مطور برمجيات", "مطور تطبيقات", "مدير مشاريع", "مهندس جودة", "مهندس DevOps", "مهندس حلول"]
          },
          {
            name: "نظم المعلومات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "إدارة المعلومات وقواعد البيانات.",
            careers: ["محلل نظم", "مدير قواعد بيانات", "مطور ERP", "مستشار IT", "محلل أعمال", "مدير مشاريع رقمية"]
          }
        ]
      },
      {
        name: "كلية الهندسة", icon: "🏗️",
        majors: [
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم المنشآت والطرق.",
            careers: ["مهندس إنشاءات", "مهندس طرق", "مشرف مشاريع", "مهندس بلدية", "مخطط مدني", "مهندس مقاولات"]
          },
          {
            name: "هندسة كهربائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأنظمة الكهربائية والإلكترونيات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس أتمتة", "مهندس صيانة", "مهندس طاقة متجددة", "مصمم أنظمة"]
          }
        ]
      },
      {
        name: "كلية الأعمال", icon: "💼",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة والتسويق وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "رائد أعمال", "مدير مبيعات", "مستشار إداري", "مدير موارد بشرية"]
          },
          {
            name: "محاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "المحاسبة المالية والتدقيق.",
            careers: ["محاسب", "مدقق", "محلل مالي", "مستشار ضريبي", "مدير مالي", "محاسب حكومي"]
          }
        ]
      },
      {
        name: "كلية الآداب والفنون", icon: "🎭",
        majors: [
          {
            name: "إعلام وصحافة", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الصحافة والإعلام الرقمي والعلاقات العامة.",
            careers: ["صحفي", "مقدم برامج", "محرر صحفي", "متخصص علاقات عامة", "مدير محتوى رقمي", "مراسل إخباري"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 16. الجامعة الأمريكية في مادبا (AUM)
  // =============================================
  16: {
    id: 16, name: "الجامعة الأمريكية في مادبا", type: "private", location: "مادبا", icon: "🇺🇸", website: "https://aum.edu.jo",
    facultiesData: [
      {
        name: "كلية الهندسة", icon: "📐",
        majors: [
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم المنشآت والبنية التحتية بأسلوب أمريكي.",
            careers: ["مهندس إنشاءات", "مهندس طرق", "مشرف مشاريع", "مهندس بلدية", "مخطط مدني", "مهندس مقاولات"]
          },
          {
            name: "هندسة كهربائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأنظمة الكهربائية والاتصالات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة متجددة", "مهندس أتمتة", "مهندس صيانة", "مصمم دوائر"]
          }
        ]
      },
      {
        name: "كلية العلوم الصحية", icon: "🧪",
        majors: [
          {
            name: "صيدلة", hours: 160, field: "صحي", duration: "4-5 سنوات", isNew: false, showCareers: false,
            description: "دراسة الصيدلة بمنهج أمريكي في بيئة متطورة.",
            careers: ["صيدلاني مجتمعي", "صيدلاني مستشفى", "مندوب طبي", "باحث في الدواء", "مفتش دوائي", "مدير صيدلية"]
          },
          {
            name: "تمريض", hours: 132, field: "صحي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تأهيل ممرضين متخصصين.",
            careers: ["ممرض/ممرضة في مستشفيات", "ممرض عناية مركزة", "ممرض غرفة عمليات", "ممرض مجتمعي", "مسؤول صحة مهنية", "مشرف تمريض"]
          }
        ]
      },
      {
        name: "كلية الأعمال", icon: "💼",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة والتسويق وريادة الأعمال بمنهج أمريكي.",
            careers: ["مدير أعمال", "مسؤول تسويق", "رائد أعمال", "مدير مبيعات", "مستشار إداري", "مدير موارد بشرية"]
          },
          {
            name: "محاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "المحاسبة المالية والتدقيق.",
            careers: ["محاسب", "مدقق", "محلل مالي", "مستشار ضريبي", "مدير مالي", "محاسب حكومي"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات", icon: "💻",
        majors: [
          {
            name: "علم الحاسوب", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "البرمجة وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مطور تطبيقات", "مطور ويب", "محلل نظم", "مهندس جودة", "مطور قواعد بيانات"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 17. جامعة عمان الأهلية
  // =============================================
  17: {
    id: 17, name: "جامعة عمان الأهلية", type: "private", location: "عمان", icon: "🏢", website: "https://www.ammanu.edu.jo",
    facultiesData: [
      {
        name: "كلية الصيدلة", icon: "💊",
        majors: [
          {
            name: "صيدلة", hours: 160, field: "صحي", duration: "4-5 سنوات", isNew: false, showCareers: false,
            description: "أول جامعة خاصة في الأردن تقدم الصيدلة، مع خبرة تاريخية وأكاديمية متميزة.",
            careers: ["صيدلاني مجتمعي", "صيدلاني مستشفى", "مندوب طبي", "باحث في صناعة الدواء", "مفتش دوائي", "مدير صيدلية"]
          }
        ]
      },
      {
        name: "كلية الهندسة", icon: "🏗️",
        majors: [
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم المنشآت والطرق.",
            careers: ["مهندس إنشاءات", "مهندس طرق", "مشرف مشاريع", "مهندس بلدية", "مخطط مدني", "مهندس مقاولات"]
          },
          {
            name: "هندسة كهربائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأنظمة الكهربائية والإلكترونيات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس أتمتة", "مهندس صيانة", "مهندس طاقة متجددة", "مصمم أنظمة"]
          },
          {
            name: "هندسة عمارة", hours: 165, field: "هندسي", duration: "5 سنوات", isNew: false, showCareers: false,
            description: "التصميم المعماري وتخطيط المدن.",
            careers: ["مهندس معماري", "مصمم داخلي", "مخطط عمراني", "مدير مشاريع بناء", "مصمم منشآت", "باحث في التراث"]
          }
        ]
      },
      {
        name: "كلية تقنية المعلومات", icon: "💻",
        majors: [
          {
            name: "علم الحاسوب", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "البرمجة وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مطور تطبيقات", "مطور ويب", "محلل نظم", "مهندس جودة", "مطور قواعد بيانات"]
          },
          {
            name: "أمن المعلومات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "حماية الأنظمة والشبكات.",
            careers: ["محلل أمن سيبراني", "مختبر اختراق", "مهندس أمن شبكات", "مستشار أمن", "محقق رقمي", "مدير أمن معلومات"]
          }
        ]
      },
      {
        name: "كلية الأعمال", icon: "💼",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة والتسويق وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "رائد أعمال", "مدير مبيعات", "مستشار إداري", "مدير موارد بشرية"]
          },
          {
            name: "محاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "المحاسبة المالية والتدقيق.",
            careers: ["محاسب", "مدقق", "محلل مالي", "مستشار ضريبي", "مدير مالي", "محاسب حكومي"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 18. جامعة الإسراء
  // =============================================
  18: {
    id: 18, name: "جامعة الإسراء", type: "private", location: "عمان", icon: "📜", website: "https://www.iu.edu.jo",
    facultiesData: [
      {
        name: "كلية الهندسة", icon: "🏗️",
        majors: [
          {
            name: "هندسة عمارة", hours: 165, field: "هندسي", duration: "5 سنوات", isNew: false, showCareers: false,
            description: "التصميم المعماري وتخطيط الفراغات والمدن.",
            careers: ["مهندس معماري", "مصمم داخلي", "مخطط عمراني", "مدير مشاريع بناء", "مصمم منشآت", "باحث في التراث"]
          },
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "تصميم المنشآت والطرق.",
            careers: ["مهندس إنشاءات", "مهندس طرق", "مشرف مشاريع", "مهندس بلدية", "مخطط مدني", "مهندس مقاولات"]
          },
          {
            name: "هندسة كهربائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الأنظمة الكهربائية والإلكترونيات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس أتمتة", "مهندس صيانة", "مهندس طاقة متجددة", "مصمم أنظمة"]
          }
        ]
      },
      {
        name: "كلية الحقوق", icon: "⚖️",
        majors: [
          {
            name: "حقوق", hours: 132, field: "قانون", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "القانون المدني والجزائي والدولي والتجاري.",
            careers: ["محامٍ", "قاضٍ", "مستشار قانوني", "مدعي عام", "موثق عقود", "دبلوماسي"]
          }
        ]
      },
      {
        name: "كلية الأعمال", icon: "💼",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة والتسويق وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "رائد أعمال", "مدير مبيعات", "مستشار إداري", "مدير موارد بشرية"]
          },
          {
            name: "محاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "المحاسبة المالية والتدقيق.",
            careers: ["محاسب", "مدقق", "محلل مالي", "مستشار ضريبي", "مدير مالي", "محاسب حكومي"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات", icon: "💻",
        majors: [
          {
            name: "علم الحاسوب", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "البرمجة وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مطور تطبيقات", "مطور ويب", "محلل نظم", "مهندس جودة", "مطور قواعد بيانات"]
          }
        ]
      }
    ]
  },

  // =============================================
  // 19. جامعة الشرق الأوسط (MEU)
  // =============================================
  19: {
    id: 19, name: "جامعة الشرق الأوسط", type: "private", location: "عمان", icon: "📡", website: "https://www.meu.edu.jo",
    facultiesData: [
      {
        name: "كلية الإعلام", icon: "🎥",
        majors: [
          {
            name: "إعلام وصحافة", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "كلية إعلام مجهزة باستوديوهات متطورة وأحدث معدات البث والإنتاج.",
            careers: ["صحفي", "مقدم برامج تلفزيونية", "محرر صحفي", "متخصص علاقات عامة", "مدير محتوى رقمي", "مراسل إخباري"]
          },
          {
            name: "علاقات عامة وإعلان", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "إدارة العلاقات العامة وتصميم الحملات الإعلانية.",
            careers: ["مسؤول علاقات عامة", "مصمم حملات إعلانية", "مدير تسويق رقمي", "محلل وسائل التواصل", "مدير علامة تجارية", "مستشار اتصال"]
          }
        ]
      },
      {
        name: "كلية الأعمال", icon: "💼",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "الإدارة الاستراتيجية والتسويق وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "رائد أعمال", "مدير مبيعات", "مستشار إداري", "مدير موارد بشرية"]
          },
          {
            name: "محاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "المحاسبة المالية والتدقيق والضرائب.",
            careers: ["محاسب", "مدقق", "محلل مالي", "مستشار ضريبي", "مدير مالي", "محاسب حكومي"]
          },
          {
            name: "تمويل ومصارف", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "إدارة الأصول المالية والبنوك والأسواق المالية.",
            careers: ["محلل مالي", "مصرفي", "مدير استثمار", "محلل أسواق مالية", "مستشار مالي", "مدير مخاطر"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات", icon: "💻",
        majors: [
          {
            name: "علم الحاسوب", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "البرمجة وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مطور تطبيقات", "مطور ويب", "محلل نظم", "مهندس جودة", "مطور قواعد بيانات"]
          },
          {
            name: "أمن المعلومات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "حماية الأنظمة والشبكات من التهديدات الإلكترونية.",
            careers: ["محلل أمن سيبراني", "مختبر اختراق", "مهندس أمن شبكات", "مستشار أمن", "محقق رقمي", "مدير أمن معلومات"]
          }
        ]
      },
      {
        name: "كلية الحقوق", icon: "⚖️",
        majors: [
          {
            name: "حقوق", hours: 132, field: "قانون", duration: "4 سنوات", isNew: false, showCareers: false,
            description: "القانون المدني والجزائي والتجاري والدولي.",
            careers: ["محامٍ", "قاضٍ", "مستشار قانوني", "مدعي عام", "موثق عقود", "دبلوماسي"]
          }
        ]
      },
      {
        name: "كلية الطب", icon: "🩺",
        majors: [
          {
            name: "دكتور في الطب", hours: 256, field: "صحي", duration: "6 سنوات", isNew: false, showCareers: false,
            description: "كلية طب في جامعة الشرق الأوسط مع تدريب سريري متكامل.",
            careers: ["طبيب عام", "طبيب متخصص", "طبيب مقيم", "جراح", "باحث طبي", "طبيب عسكري"]
          }
        ]
      }
    ]
  }
}

onMounted(() => {
  university.value = database[universityId]
  if (!university.value) {
    console.error("University Not Found")
  }
})

const selectedFaculty = computed(() => {
  if (!university.value || !university.value.facultiesData) return null
  return university.value.facultiesData[activeFaculty.value]
})

const totalMajors = computed(() => {
  if (!university.value) return 0
  return university.value.facultiesData.reduce((acc, fac) => acc + fac.majors.length, 0)
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

.animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
.animate-fade-in { animation: fadeInUp 0.5s ease-out; }

@keyframes fadeInUp { 
  from { opacity: 0; transform: translateY(20px); } 
  to { opacity: 1; transform: translateY(0); } 
}
</style>