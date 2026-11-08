<template>
  <div class="min-h-screen bg-slate-50 pb-20 font-sans" dir="rtl">
    
    <nav class="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
      <div class="font-black text-xl text-blue-900 flex items-center gap-2 cursor-pointer group" @click="$router.push('/dashboard')">
        <span class="group-hover:rotate-12 transition-transform duration-300">🧭</span> CareerCompass
      </div>
      <button @click="$router.go(-1)" class="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition group">
        <span class="group-hover:-translate-x-1 transition-transform">عودة للقائمة</span>
        <span class="text-xl group-hover:translate-x-1 transition-transform">➜</span>
      </button>
    </nav>

    <div v-if="university" class="max-w-7xl mx-auto px-4 md:px-6 pt-8">
      
      <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 mb-8 relative overflow-hidden animate-fade-in-up">
        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-500 animate-gradient-x"></div>
        
        <div class="flex flex-col md:flex-row gap-8 items-center">
          <div class="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center text-7xl shadow-inner border border-slate-100 shrink-0 animate-float">
            {{ university.icon }}
          </div>
          
          <div class="text-center md:text-right flex-1 w-full">
            <div class="flex flex-col md:flex-row items-center gap-3 mb-3 justify-center md:justify-start">
              <h1 class="text-3xl md:text-4xl font-black text-slate-800">{{ university.name }}</h1>
              <span class="px-4 py-1.5 rounded-full text-xs font-bold shadow-sm animate-pulse-slow" 
                    :class="university.type === 'public' ? 'bg-teal-100 text-teal-800' : 'bg-orange-100 text-orange-800'">
                {{ university.type === 'public' ? 'جامعة حكومية' : 'جامعة خاصة' }}
              </span>
            </div>
            
            <p class="text-slate-500 text-lg mb-6 flex items-center justify-center md:justify-start gap-2 font-medium">
              📍 {{ university.location }}
            </p>
            
            <div class="flex flex-wrap justify-center md:justify-start gap-4">
              <a :href="university.website" target="_blank" class="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-2xl text-sm font-bold transition flex items-center gap-2 shadow-lg shadow-slate-200 hover:shadow-xl hover:-translate-y-0.5 transform duration-200">
                <span>الموقع الرسمي</span>
                <span>🌐</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8 items-start">
        
        <div class="lg:w-1/4 w-full lg:sticky lg:top-24 z-30">
          <div class="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-3 overflow-hidden">
            <h3 class="font-bold text-slate-400 text-xs uppercase tracking-wider mb-3 px-4 pt-2">الكليات المتاحة</h3>
            <div class="space-y-1 max-h-[70vh] overflow-y-auto overflow-x-hidden pr-2 custom-scroll">
              <button 
                v-for="(faculty, index) in university.facultiesData" 
                :key="index"
                @click="activeFaculty = index"
                :class="activeFaculty === index ? 'bg-gradient-to-l from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 transform scale-[1.02]' : 'text-slate-600 hover:bg-slate-50 hover:translate-x-1'"
                class="w-full text-right px-5 py-3.5 rounded-xl font-bold transition-all duration-300 flex justify-between items-center text-sm group"
              >
                <div class="flex items-center gap-3">
                  <span class="group-hover:scale-110 transition-transform">{{ faculty.icon }}</span>
                  <span>{{ faculty.name }}</span>
                </div>
                <span v-if="activeFaculty === index" class="animate-pulse">👈</span>
              </button>
            </div>
          </div>
        </div>

        <div class="lg:w-3/4 w-full">
          <div v-if="selectedFaculty" class="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100 min-h-[600px] animate-fade-in">
            
            <div class="flex items-center gap-4 mb-10 border-b border-slate-100 pb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm text-blue-600 animate-float-slow">
                {{ selectedFaculty.icon }}
              </div>
              <div>
                <h2 class="text-3xl font-black text-slate-800 mb-1">{{ selectedFaculty.name }}</h2>
                <p class="text-slate-400 text-sm font-medium">استكشف التخصصات المتاحة في هذه الكلية</p>
              </div>
            </div>

            <div class="grid gap-6">
              <div 
                v-for="major in selectedFaculty.majors" 
                :key="major.name"
                class="group border border-slate-100 rounded-3xl p-6 hover:border-blue-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 bg-white relative overflow-hidden hover:-translate-y-1"
              >
                <div class="absolute right-0 top-0 h-full w-1.5 bg-slate-100 group-hover:bg-gradient-to-b group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-500"></div>

                <div class="flex flex-col md:flex-row justify-between items-start gap-6 mb-6 pr-4">
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-3 mb-2 flex-wrap">
                      {{ major.name }}
                      <span v-if="major.isNew" class="bg-red-50 text-red-600 text-[10px] px-2 py-1 rounded-lg font-black border border-red-100 animate-pulse">جديد 🔥</span>
                    </h3>
                    <p class="text-slate-500 text-sm leading-relaxed max-w-2xl font-medium">{{ major.description }}</p>
                  </div>
                </div>

                <div class="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600 bg-slate-50/80 p-4 rounded-2xl pr-4 border border-slate-100 mb-4 transition-colors group-hover:bg-blue-50/30 group-hover:border-blue-100">
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
                  <div v-if="major.hourlyFee" class="flex items-center gap-2 px-3 bg-white py-1.5 rounded-lg shadow-sm border border-slate-100">
                    <span class="text-lg">💰</span>
                    <span>سعر الساعة: <span class="text-green-600 font-bold">{{ major.hourlyFee }}</span></span>
                  </div>
                </div>

                <div v-if="major.showCareers" class="mb-4 animate-fade-in">
                  <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5">
                    <h4 class="font-black text-blue-800 mb-3 flex items-center gap-2 text-sm">
                      💼 مجالات العمل المتاحة
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      <span 
                        v-for="career in major.careers" 
                        :key="career"
                        class="bg-white text-blue-700 border border-blue-200 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                      >
                        {{ career }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="mt-2 flex gap-3 pt-0 pr-4">
                  <button 
                    @click="toggleCareers(major)"
                    :class="major.showCareers ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white hover:shadow-md'"
                    class="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

* {
  font-family: 'Tajawal', sans-serif !important;
}

.font-sans { 
  font-family: 'Tajawal', sans-serif !important; 
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes gradient-x {
  0%, 100% { background-size: 200% 200%; background-position: left center; }
  50% { background-size: 200% 200%; background-position: right center; }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
.animate-fade-in { animation: fadeInUp 0.5s ease-out; }
.animate-gradient-x { animation: gradient-x 4s ease infinite; }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-float-slow { animation: float 4s ease-in-out infinite; }
.animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
</style>

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

const database = {

   1: {
    id: 1,
    name: "الجامعة الأردنية (JU)",
    type: "public",
    location: "عمان - الجبيهة",
    icon: "🏛️",
    website: "https://ju.edu.jo",
    facultiesData: [
      {
        name: "كلية الطب",
        icon: "🩺",
        majors: [
          {
            name: "دكتور في الطب البشري",
            hours: 256,
            field: "صحي",
            duration: "6 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "البرنامج الأقوى والأعرق محلياً، يمتد لـ 6 سنوات يدرس فيها الطالب علوم الطب الأساسية والسريرية، ويتدرب في مستشفى الجامعة الأردنية.",
            careers: ["طبيب عام", "طبيب متخصص", "طبيب مقيم", "باحث طبي", "طبيب عسكري"]
          }
        ]
      },
      {
        name: "كلية طب الأسنان",
        icon: "🦷",
        majors: [
          {
            name: "طب وجراحة الأسنان",
            hours: 198,
            field: "صحي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "40 دينار",
            description: "دراسة شاملة لعلاج وتقويم الأسنان وجراحتها، تتضمن تدريباً سريرياً مكثفاً في عيادات الجامعة.",
            careers: ["طبيب أسنان عام", "أخصائي تقويم أسنان", "جراح فم وأسنان", "أخصائي زراعة أسنان"]
          }
        ]
      },
      {
        name: "كلية الصيدلة",
        icon: "💊",
        majors: [
          {
            name: "الصيدلة (B.Sc)",
            hours: 162,
            field: "صحي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "29 دينار",
            description: "برنامج يؤهل الصيدلاني للعمل في المستشفيات والصيدليات وشركات الدواء.",
            careers: ["مدير صيدلية", "مندوب طبي", "باحث في صناعة الدواء", "مفتش دوائي"]
          },
          {
            name: "دكتور صيدلة (Pharm.D)",
            hours: 216,
            field: "صحي",
            duration: "6 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "50 دينار",
            description: "برنامج إكلينيكي متكامل يركز على الرعاية الصيدلانية السريرية المباشرة للمرضى.",
            careers: ["صيدلاني إكلينيكي", "صيدلاني مستشفى", "مستشار دوائي"]
          }
        ]
      },
      {
        name: "كلية التمريض",
        icon: "⚕️",
        majors: [
          {
            name: "التمريض",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "إعداد كوادر تمريضية مؤهلة لتقديم الرعاية الصحية الشاملة في مختلف القطاعات.",
            careers: ["ممرض قانوني", "ممرض طوارئ", "ممرض عناية حثيثة", "مشرف تمريض"]
          }
        ]
      },
      {
        name: "كلية علوم التأهيل",
        icon: "🦿",
        majors: [
          {
            name: "العلاج الطبيعي",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "34 دينار",
            description: "تقييم وعلاج الاضطرابات الحركية الناتجة عن الإصابات والأمراض باستخدام التقنيات الفيزيائية.",
            careers: ["أخصائي علاج طبيعي", "أخصائي تأهيل رياضي", "معالج فيزيائي"]
          },
          {
            name: "العلاج الوظيفي",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "34 دينار",
            description: "تأهيل الأشخاص الذين يعانون من إعاقات جسدية أو نفسية لاستعادة استقلاليتهم في ممارسة أنشطة الحياة اليومية.",
            careers: ["أخصائي علاج وظيفي", "مستشار تأهيل مجتمعي", "مقوم حركي"]
          },
          {
            name: "الأطراف الاصطناعية والأجهزة المساعدة",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "34 دينار",
            description: "تصميم وتصنيع وتركيب الأطراف الصناعية والأجهزة التقويمية لتعويض الأطراف المفقودة أو دعمها.",
            careers: ["أخصائي أطراف صناعية", "فني أجهزة تقويمية", "باحث في التقنيات المساعدة"]
          },
          {
            name: "علوم السمع والنطق",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "34 دينار",
            description: "تشخيص وعلاج اضطرابات السمع والنطق واللغة والتواصل لدى مختلف الفئات العمرية.",
            careers: ["أخصائي سمع ونطق", "معالج لغوي", "أخصائي تأهيل سمعي"]
          }
        ]
      },
      {
        name: "كلية الهندسة",
        icon: "🏗️",
        majors: [
          {
            name: "هندسة العمارة",
            hours: 178,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "29 دينار",
            description: "التصميم المعماري الإبداعي وتخطيط المدن والمحافظة على التراث.",
            careers: ["مهندس معماري", "مصمم داخلي", "مخطط عمراني"]
          },
          {
            name: "الهندسة المدنية",
            hours: 163,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "29 دينار",
            description: "تصميم وتنفيذ المنشآت والطرق والجسور والبنية التحتية والموارد المائية.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مهندس مقاولات"]
          },
          {
            name: "الهندسة الكهربائية",
            hours: 164,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "29 دينار",
            description: "دراسة الأنظمة الكهربائية والإلكترونية والاتصالات والطاقة المتجددة.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة"]
          },
          {
            name: "الهندسة الميكانيكية",
            hours: 163,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "29 دينار",
            description: "تصميم الآلات والمعدات الصناعية وأنظمة الطاقة والتبريد.",
            careers: ["مهندس ميكانيك", "مهندس صيانة", "مصمم منتجات"]
          },
          {
            name: "هندسة الحاسوب",
            hours: 161,
            field: "هندسي/IT",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "29 دينار",
            description: "تصميم الأنظمة الحاسوبية والشبكات والمعالجات والأنظمة المدمجة.",
            careers: ["مهندس أجهزة حاسوب", "مهندس شبكات", "مطور أنظمة مدمجة"]
          },
          {
            name: "هندسة الميكاترونكس",
            hours: 165,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "29 دينار",
            description: "دمج الميكانيكا والإلكترونيات والبرمجة في تصميم الأنظمة الذكية والروبوتات.",
            careers: ["مهندس روبوتيكس", "مهندس أتمتة صناعية", "مصمم أنظمة تحكم"]
          },
          {
            name: "الهندسة الصناعية",
            hours: 163,
            field: "هندسي/إداري",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "29 دينار",
            description: "تحسين العمليات الإنتاجية وإدارة الجودة وسلاسل التوريد وتصميم بيئة العمل.",
            careers: ["مهندس إنتاج", "مدير جودة", "محلل سلاسل توريد"]
          },
          {
            name: "الهندسة الكيميائية",
            hours: 163,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "29 دينار",
            description: "تصميم العمليات الكيميائية الصناعية وتحويل المواد الخام إلى منتجات نافعة.",
            careers: ["مهندس عمليات", "مهندس أدوية", "مهندس بيئة"]
          }
        ]
      },
      {
        name: "كلية الملك عبد الله الثاني (IT)",
        icon: "💻",
        majors: [
          {
            name: "علم الحاسوب",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "47 دينار",
            description: "البرمجة النظرية والخوارزميات وهياكل البيانات وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مطور تطبيقات", "مهندس خوارزميات"]
          },
          {
            name: "الذكاء الاصطناعي",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "70 دينار",
            description: "علم البيانات وتعلم الآلة والشبكات العصبية وتطبيقات الذكاء الاصطناعي.",
            careers: ["مهندس ذكاء اصطناعي", "عالم بيانات", "مهندس MLOps"]
          },
          {
            name: "الأمن السيبراني",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "60 دينار",
            description: "حماية المعلومات والشبكات والأنظمة من الهجمات الإلكترونية والاختراق.",
            careers: ["محلل أمن سيبراني", "مختبر اختراق", "مستشار أمن معلومات"]
          },
          {
            name: "أنظمة المعلومات الحاسوبية",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "47 دينار",
            description: "إدارة وتطوير نظم المعلومات في المؤسسات مع ربط جانبي التقنية والأعمال.",
            careers: ["محلل نظم", "مدير قواعد بيانات", "مستشار تحول رقمي"]
          },
          {
            name: "تكنولوجيا معلومات الأعمال",
            hours: 132,
            field: "IT/أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "47 دينار",
            description: "تطويع أدوات تكنولوجيا المعلومات لحل مشاكل الأعمال وتطوير استراتيجيات الشركات.",
            careers: ["محلل أعمال تقني", "مطور حلول أعمال", "مدير مشاريع رقمية"]
          }
        ]
      },
      {
        name: "كلية الأعمال",
        icon: "📊",
        majors: [
          {
            name: "المحاسبة",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "تحليل البيانات المالية والتدقيق والمحاسبة الإدارية والضرائب.",
            careers: ["محاسب مالي", "مدقق حسابات", "مستشار ضريبي"]
          },
          {
            name: "إدارة الأعمال",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "الإدارة الاستراتيجية للمؤسسات والتسويق والموارد البشرية.",
            careers: ["مدير أعمال", "مدير موارد بشرية", "مستشار إداري"]
          },
          {
            name: "التمويل",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "إدارة الأصول المالية والاستثمار والبنوك والأسواق المالية.",
            careers: ["محلل مالي", "مصرفي", "مدير استثمار"]
          },
          {
            name: "الاقتصاد",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "دراسة الأسواق والسياسات الاقتصادية والتحليل الاقتصادي الكلي والجزئي.",
            careers: ["محلل اقتصادي", "مستشار اقتصادي", "باحث"]
          },
          {
            name: "التسويق",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "استراتيجيات التسويق الرقمي والتقليدي وتطوير المنتجات.",
            careers: ["مدير تسويق", "أخصائي تسويق رقمي", "مدير علامة تجارية"]
          },
          {
            name: "نظم المعلومات الإدارية",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "إدارة وتطوير الأنظمة التقنية لدعم العمليات الإدارية واتخاذ القرار.",
            careers: ["محلل نظم أعمال", "مدير مشاريع تقنية", "مستشار تقني"]
          },
          {
            name: "الإدارة العامة",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "إدارة المؤسسات الحكومية والسياسات العامة والتنظيم الإداري.",
            careers: ["مدير إداري", "مخطط سياسات", "مستشار حكومي"]
          }
        ]
      },
      {
        name: "كلية العلوم",
        icon: "🔬",
        majors: [
          {
            name: "الرياضيات",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "26 دينار",
            description: "الرياضيات التحليلية والتطبيقية والإحصاء والنمذجة الرياضية.",
            careers: ["مدرس رياضيات", "عالم بيانات", "محلل إحصاء", "أكاديمي وباحث"]
          },
          {
            name: "الفيزياء",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "26 دينار",
            description: "الفيزياء النظرية والتطبيقية ودراسة قوانين الطبيعة والطاقة.",
            careers: ["باحث في المختبرات", "فيزيائي", "محلل طاقة", "مدرس فيزياء"]
          },
          {
            name: "الكيمياء",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "26 دينار",
            description: "تركيب المادة وتفاعلاتها الكيميائية وتطبيقاتها الصناعية.",
            careers: ["كيميائي مختبر", "باحث أدوية", "مفتش جودة", "كيميائي شرعي"]
          },
          {
            name: "العلوم الحياتية",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "26 دينار",
            description: "الكائنات الحية وعلم الوراثة والتطور والبيولوجيا الجزيئية.",
            careers: ["باحث بيولوجي", "فني مختبر", "عالم وراثة"]
          },
          {
            name: "الجيولوجيا البيئية والتطبيقية",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "26 دينار",
            description: "علوم الأرض والمياه الجوفية والتنقيب عن المعادن وحماية البيئة.",
            careers: ["جيولوجي", "خبير بيئي", "مستكشف مياه"]
          },
          {
            name: "العلوم الطبية المخبرية",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "التحاليل الطبية المخبرية وعلم الأمراض والدم والكيمياء الحيوية.",
            careers: ["أخصائي مختبرات طبية", "باحث طبي", "محلل كيمياء حيوية"]
          }
        ]
      },
      {
        name: "كلية الحقوق",
        icon: "⚖️",
        majors: [
          {
            name: "الحقوق",
            hours: 132,
            field: "قانون",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "دراسة القانون المدني والجزائي والدولي والتجاري.",
            careers: ["محام", "قاض", "مستشار قانوني", "مدعي عام"]
          }
        ]
      },
      {
        name: "كلية اللغات الأجنبية",
        icon: "🗣️",
        majors: [
          {
            name: "اللغة الإنجليزية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "دراسة اللغة الإنجليزية وآدابها وتحليل النصوص والترجمة.",
            careers: ["معلم لغة إنجليزية", "مترجم", "محرر محتوى"]
          },
          {
            name: "اللغة الفرنسية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "دراسة اللغة الفرنسية والأدب والثقافة الفرانكفونية.",
            careers: ["مترجم", "مرشد سياحي", "معلم لغة فرنسية"]
          },
          {
            name: "اللغات الآسيوية (الصينية - الكورية)",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "دراسة اللغات والثقافات الآسيوية المتنامية الأهمية.",
            careers: ["مترجم", "منسق علاقات دولية", "خبير ثقافي"]
          },
          {
            name: "اللغات الأوروبية (الإسبانية - الإيطالية - الألمانية)",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "تأسيس لغوي متين في اللغات الأوروبية مع التركيز على الثقافة والأدب.",
            careers: ["مترجم", "مرشد سياحي", "مسؤول تواصل دولي"]
          }
        ]
      },
      {
        name: "كلية الآداب",
        icon: "📚",
        majors: [
          {
            name: "اللغة العربية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "دراسة اللغة العربية وآدابها وبلاغتها ونقدها الأدبي.",
            careers: ["معلم لغة عربية", "مصحح لغوي", "كاتب ومحرر"]
          },
          {
            name: "التاريخ",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "التاريخ العربي والإسلامي والعالمي وتحليل الحضارات.",
            careers: ["مؤرخ", "باحث تاريخي", "معلم تاريخ"]
          },
          {
            name: "الجغرافيا",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "الجغرافيا الطبيعية والبشرية ونظم المعلومات الجغرافية (GIS).",
            careers: ["مخطط عمراني", "خبير GIS", "باحث بيئي"]
          },
          {
            name: "علم النفس",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "السلوك الإنساني والعمليات العقلية والصحة النفسية.",
            careers: ["مرشد نفسي", "أخصائي موارد بشرية", "باحث سلوكي"]
          },
          {
            name: "علم الاجتماع",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "دراسة المجتمع والظواهر الاجتماعية والتنمية المجتمعية.",
            careers: ["أخصائي اجتماعي", "باحث اجتماعي", "مرشد أسري"]
          },
          {
            name: "العمل الاجتماعي",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "مساعدة الأفراد والمجتمعات على التغلب على المشاكل الاجتماعية والاقتصادية.",
            careers: ["أخصائي عمل اجتماعي", "مرشد مجتمعي", "باحث ميداني"]
          },
          {
            name: "الفلسفة",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "الفلسفة والمنطق والأخلاق وفلسفة العلوم.",
            careers: ["كاتب ومفكر", "باحث", "محلل سياسات"]
          }
        ]
      },
      {
        name: "كلية الزراعة",
        icon: "🌾",
        majors: [
          {
            name: "الإنتاج النباتي",
            hours: 132,
            field: "زراعي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "زراعة المحاصيل وتحسين الإنتاج وتقنيات الزراعة الحديثة.",
            careers: ["مهندس زراعي", "مستشار زراعي", "مدير مزرعة"]
          },
          {
            name: "الإنتاج الحيواني",
            hours: 132,
            field: "زراعي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "تربية الحيوانات وتغذيتها وإدارة المزارع الحيوانية.",
            careers: ["مهندس إنتاج حيواني", "مستشار أعلاف", "مدير مزارع"]
          },
          {
            name: "التغذية والتصنيع الغذائي",
            hours: 132,
            field: "زراعي/صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "21 دينار",
            description: "تخطيط الحميات الغذائية وعمليات حفظ وتصنيع الغذاء وسلامته.",
            careers: ["أخصائي تغذية", "مفتش جودة غذاء", "فني صناعات غذائية"]
          },
          {
            name: "الاقتصاد الزراعي وإدارة الأعمال الزراعية",
            hours: 132,
            field: "زراعي/أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "إدارة المشاريع الزراعية وتحليل الأسواق وتسويق المنتجات الزراعية.",
            careers: ["محلل اقتصاد زراعي", "مدير مشاريع زراعية", "مسوق زراعي"]
          },
          {
            name: "الأراضي والمياه والبيئة",
            hours: 132,
            field: "زراعي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "إدارة الموارد المائية والتربة وتقنيات الري الحديثة وحماية البيئة.",
            careers: ["مهندس ري", "أخصائي تربة", "مستشار بيئي"]
          },
          {
            name: "وقاية النبات",
            hours: 132,
            field: "زراعي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "دراسة أمراض وحشرات النباتات وطرق مكافحتها المتكاملة.",
            careers: ["مهندس وقاية نبات", "باحث زراعي", "مفتش زراعي"]
          }
        ]
      },
      {
        name: "كلية الشريعة",
        icon: "🕌",
        majors: [
          {
            name: "أصول الدين",
            hours: 132,
            field: "شريعة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "العقيدة والتفسير وعلوم القرآن والحديث النبوي.",
            careers: ["معلم تربية إسلامية", "داعية", "باحث شرعي"]
          },
          {
            name: "الفقه وأصوله",
            hours: 132,
            field: "شريعة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "الفقه الإسلامي وأصوله والأحكام الشرعية المقارنة.",
            careers: ["قاض شرعي", "مفتي", "مستشار قانوني شرعي"]
          },
          {
            name: "المصارف الإسلامية",
            hours: 132,
            field: "شريعة/أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "الاقتصاد الإسلامي وأسس العمل في البنوك والمؤسسات المالية الإسلامية.",
            careers: ["موظف بنك إسلامي", "مستشار مالي شرعي", "مدقق شرعي"]
          }
        ]
      },
      {
        name: "كلية علوم الرياضة",
        icon: "⚽",
        majors: [
          {
            name: "التربية الرياضية",
            hours: 132,
            field: "رياضي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "21 دينار",
            description: "علوم الحركة والتدريب الرياضي والصحة البدنية والإدارة الرياضية.",
            careers: ["مدرس تربية رياضية", "مدرب لياقة", "إداري رياضي"]
          }
        ]
      },
      {
        name: "كلية الفنون والتصميم",
        icon: "🎨",
        majors: [
          {
            name: "الفنون البصرية",
            hours: 132,
            field: "فنون",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "26 دينار",
            description: "الفنون التشكيلية والرسم والنحت وتاريخ الفن وتذوقه.",
            careers: ["فنان تشكيلي", "معلم فنون", "مدير معرض فني"]
          },
          {
            name: "الفنون الموسيقية",
            hours: 132,
            field: "فنون",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "26 دينار",
            description: "الأداء الموسيقي والنظريات الموسيقية والتأليف.",
            careers: ["موسيقي محترف", "معلم موسيقى", "ملحن"]
          },
          {
            name: "الفنون المسرحية",
            hours: 132,
            field: "فنون",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "26 دينار",
            description: "التمثيل والإخراج والديكور المسرحي والنقد.",
            careers: ["ممثل", "مخرج مسرحي", "ناقد فني"]
          }
        ]
      },
      {
        name: "كلية الأمير الحسين بن عبدالله الثاني للدراسات الدولية",
        icon: "🌍",
        majors: [
          {
            name: "العلوم السياسية",
            hours: 132,
            field: "سياسة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "الأنظمة السياسية والعلاقات الدولية والسياسة العامة والفكر السياسي.",
            careers: ["دبلوماسي", "محلل سياسي", "مستشار علاقات دولية"]
          }
        ]
      },
      {
        name: "كلية العلوم التربوية",
        icon: "📖",
        majors: [
          {
            name: "معلم الصف",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "إعداد معلمين مؤهلين لتدريس الصفوف الثلاثة الأولى بأساليب تربوية حديثة.",
            careers: ["معلم صف", "مشرف تربوي", "مطور مناهج ابتدائية"]
          },
          {
            name: "التربية الخاصة",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "طرق تعليم ودمج ذوي الاحتياجات الخاصة والتعامل مع صعوبات التعلم والتفوق.",
            careers: ["معلم تربية خاصة", "أخصائي صعوبات تعلم", "أخصائي تعديل سلوك"]
          },
          {
            name: "الإرشاد والصحة النفسية",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "أسس التوجيه والإرشاد النفسي والتربوي والمهني في المدارس والمؤسسات.",
            careers: ["مرشد تربوي", "مرشد نفسي", "أخصائي تعديل سلوك"]
          }
        ]
      }
    ]
  },
  2: {
    id: 2,
    name: "جامعة العلوم والتكنولوجيا (JUST)",
    type: "public",
    location: "إربد - الرمثا",
    icon: "🔬",
    website: "https://just.edu.jo",
    facultiesData: [
      {
        name: "كلية الطب",
        icon: "🩺",
        majors: [
          {
            name: "الطب والجراحة",
            hours: 257,
            field: "صحي",
            duration: "6 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "36 دينار",
            description: "دراسة الطب في بيئة مستشفى الملك المؤسس الجامعي، مع التركيز على البحث العلمي والممارسة السريرية.",
            careers: ["طبيب عام", "طبيب متخصص", "جراح", "طبيب مقيم", "باحث طبي"]
          }
        ]
      },
      {
        name: "كلية طب الأسنان",
        icon: "🦷",
        majors: [
          {
            name: "طب وجراحة الأسنان",
            hours: 201,
            field: "صحي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "كلية متميزة مصنفة عالمياً، تقدم تدريباً سريرياً متقدماً في عيادات الأسنان الجامعية الحديث.",
            careers: ["طبيب أسنان عام", "أخصائي تقويم أسنان", "جراح فم وأسنان", "أخصائي زراعة أسنان"]
          }
        ]
      },
      {
        name: "كلية الصيدلة",
        icon: "💊",
        majors: [
          {
            name: "الصيدلة (B.Sc)",
            hours: 160,
            field: "صحي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "21 دينار",
            description: "صناعة الدواء والرقابة الدوائية وعلم الصيدلانيات وتحليل الأدوية وفق المعايير الدولية.",
            careers: ["صيدلاني مجتمعي", "مفتش دوائي", "مندوب طبي", "باحث أدوية"]
          },
          {
            name: "دكتور صيدلة (Pharm.D)",
            hours: 216,
            field: "صحي",
            duration: "6 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "برنامج يركز على الجانب السريري في المستشفيات مع تدريب موسع على الرعاية الدوائية للمرضى.",
            careers: ["صيدلاني إكلينيكي", "صيدلاني مستشفى", "مستشار دوائي"]
          }
        ]
      },
      {
        name: "كلية التمريض",
        icon: "⚕️",
        majors: [
          {
            name: "التمريض",
            hours: 132,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "تأهيل كوادر تمريضية للعمل في المستشفيات والمراكز الصحية بمهارات عملية وعلمية فائقة.",
            careers: ["ممرض قانوني", "ممرض عناية حثيثة", "ممرض طوارئ", "مشرف تمريض"]
          }
        ]
      },
      {
        name: "كلية العلوم الطبية التطبيقية",
        icon: "🩸",
        majors: [
          {
            name: "العلوم الطبية المخبرية",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "17 دينار",
            description: "إجراء التحاليل المخبرية السريرية للمساعدة في تشخيص الأمراض ومتابعتها.",
            careers: ["أخصائي مختبرات طبية", "باحث طبي", "محلل كيمياء حيوية"]
          },
          {
            name: "تكنولوجيا الأشعة (التصوير الإشعاعي)",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "17 دينار",
            description: "استخدام تقنيات التصوير الطبي (أشعة، رنين، طبقي) لتشخيص الأمراض.",
            careers: ["فني أشعة وتصوير طبي", "أخصائي رنين مغناطيسي", "مفتش وقاية إشعاعية"]
          },
          {
            name: "العلاج الطبيعي",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "17 دينار",
            description: "تقييم وعلاج الاضطرابات الحركية الناتجة عن الإصابات والأمراض.",
            careers: ["أخصائي علاج طبيعي", "معالج فيزيائي", "أخصائي تأهيل رياضي"]
          },
          {
            name: "العلاج الوظيفي",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "17 دينار",
            description: "تأهيل الأشخاص ذوي الإعاقات الجسدية أو النفسية لاستعادة استقلاليتهم.",
            careers: ["أخصائي علاج وظيفي", "مستشار تأهيل مجتمعي"]
          },
          {
            name: "البصريات",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "17 دينار",
            description: "فحص النظر وتجهيز النظارات والعدسات اللاصقة ومتابعة صحة العين.",
            careers: ["أخصائي بصريات", "فاحص بصر", "مستشار طبي في عيادات العيون"]
          },
          {
            name: "الإسعاف والطوارئ",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "17 دينار",
            description: "التعامل الميداني المتقدم مع الحالات الطبية الطارئة والإصابات.",
            careers: ["مسعف متقدم", "أخصائي طوارئ", "مدرب إسعاف"]
          },
          {
            name: "علوم وتكنولوجيا صناعة الأسنان",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "17 دينار",
            description: "تصميم وتصنيع التركيبات السنية الثابتة والمتحركة وتقويم الأسنان.",
            careers: ["فني أسنان", "مدير مختبر أسنان", "أخصائي تركيبات"]
          },
          {
            name: "علوم طب الأسنان المساندة",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "17 دينار",
            description: "مساعدة طبيب الأسنان وإجراءات صحة الفم والأسنان الوقائية.",
            careers: ["مساعد طبيب أسنان", "أخصائي صحة فم", "مثقف صحي سني"]
          },
          {
            name: "السمع والنطق",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "17 دينار",
            description: "تشخيص وعلاج اضطرابات السمع والنطق والتواصل.",
            careers: ["أخصائي سمع ونطق", "معالج لغوي", "أخصائي تأهيل سمعي"]
          }
        ]
      },
      {
        name: "كلية الطب البيطري",
        icon: "🐾",
        majors: [
          {
            name: "الطب البيطري",
            hours: 176,
            field: "صحي/زراعي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "دراسة صحة الحيوان والأمراض الحيوانية والوقاية منها والصحة العامة البيطرية.",
            careers: ["طبيب بيطري", "مفتش بيطري", "باحث في صحة الحيوان", "طبيب بيطري في مزارع"]
          }
        ]
      },
      {
        name: "كلية الهندسة",
        icon: "🏗️",
        majors: [
          {
            name: "الهندسة المدنية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "21 دينار",
            description: "تصميم المنشآت والطرق والبنية التحتية، معتمد دولياً (ABET).",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مهندس مقاولات"]
          },
          {
            name: "الهندسة الكهربائية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "21 دينار",
            description: "تصميم وتحليل الأنظمة الكهربائية والإلكترونية وتطبيقات الطاقة.",
            careers: ["مهندس كهربائي", "مهندس قوى", "مهندس تحكم"]
          },
          {
            name: "الهندسة الميكانيكية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "21 دينار",
            description: "تصميم الآلات والمعدات الصناعية وأنظمة الطاقة والتبريد والتدفئة.",
            careers: ["مهندس ميكانيك", "مهندس صيانة", "مصمم منتجات", "مهندس طاقة"]
          },
          {
            name: "الهندسة الكيميائية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "21 دينار",
            description: "تصميم وتشغيل المحطات الكيميائية الصناعية ومعالجة المواد.",
            careers: ["مهندس عمليات", "مهندس كيميائي", "مهندس أدوية", "مهندس بيئة"]
          },
          {
            name: "الهندسة الطبية الحيوية",
            hours: 160,
            field: "هندسي/طبي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "دمج الهندسة بالطب لتصميم وتطوير الأجهزة والمعدات الطبية.",
            careers: ["مهندس أجهزة طبية", "مهندس صيانة طبية", "مطور تقنيات صحية"]
          },
          {
            name: "هندسة الطيران",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "تصميم وصيانة الطائرات والديناميكا الهوائية وأنظمة الدفع.",
            careers: ["مهندس طيران", "مهندس صيانة طائرات", "محلل ديناميكا هوائية"]
          },
          {
            name: "الهندسة الصناعية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "21 دينار",
            description: "تصميم وتحسين أنظمة الإنتاج والجودة وإدارة سلاسل الإمداد.",
            careers: ["مهندس إنتاج", "مهندس جودة", "محلل سلاسل توريد"]
          },
          {
            name: "الهندسة النووية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "21 دينار",
            description: "تخصص فريد يدرس استخدامات الطاقة النووية والإشعاع والوقاية منه.",
            careers: ["مهندس مفاعلات", "أخصائي حماية إشعاع", "مفتش نووي"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا الحاسوب والمعلومات",
        icon: "💻",
        majors: [
          {
            name: "علم الحاسوب",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "البرمجة والخوارزميات وهياكل البيانات وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "باحث AI"]
          },
          {
            name: "هندسة البرمجيات",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "إدارة مشاريع البرمجيات الضخمة ودورة حياة البرنامج ومعايير الجودة.",
            careers: ["مهندس برمجيات", "مطور تطبيقات", "مدير مشاريع تقنية"]
          },
          {
            name: "نظم المعلومات الحاسوبية",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "تحليل النظم وقواعد البيانات وإدارة المعلومات وتكنولوجيا الأعمال.",
            careers: ["محلل نظم", "مدير قواعد بيانات", "مستشار IT"]
          },
          {
            name: "هندسة وأمن شبكات الحاسوب",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "تصميم وإدارة وحماية شبكات الحاسوب وبروتوكولات الاتصال.",
            careers: ["مهندس شبكات", "مدير أنظمة", "مستشار بنية تحتية"]
          },
          {
            name: "الأمن السيبراني",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "حماية الأنظمة والشبكات والبيانات، واختبار الاختراق.",
            careers: ["محلل أمن سيبراني", "مختبر اختراق", "محقق جرائم إلكترونية"]
          }
        ]
      },
      {
        name: "كلية العمارة والتصميم",
        icon: "📐",
        majors: [
          {
            name: "هندسة العمارة",
            hours: 165,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "التصميم المعماري الإبداعي وتخطيط المدن والمحافظة على التراث.",
            careers: ["مهندس معماري", "مصمم داخلي", "مخطط عمراني"]
          },
          {
            name: "التصميم والتواصل البصري",
            hours: 132,
            field: "فنون/تصميم",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "دمج الفنون البصرية بالتكنولوجيا لتصميم الهويات البصرية، الوسائط المتعددة، والرسوم المتحركة.",
            careers: ["مصمم جرافيك", "مصمم تجربة المستخدم (UI/UX)", "مخرج فني", "مصمم رسوم متحركة"]
          },
          {
            name: "التخطيط الحضري والإقليمي",
            hours: 132,
            field: "هندسي/تصميم",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "تخطيط استخدامات الأراضي والمواصلات وتطوير المدن والمجتمعات المستدامة.",
            careers: ["مخطط مدن", "مستشار تخطيط", "باحث حضري"]
          }
        ]
      },
      {
        name: "كلية الزراعة",
        icon: "🌾",
        majors: [
          {
            name: "الإنتاج النباتي",
            hours: 134,
            field: "زراعي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "زراعة المحاصيل وتحسين الإنتاج النباتي والتقنيات الزراعية الحديثة.",
            careers: ["مهندس زراعي", "مستشار زراعي", "باحث في المراكز الزراعية"]
          },
          {
            name: "الإنتاج الحيواني",
            hours: 134,
            field: "زراعي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "تربية الحيوانات وتغذيتها وإدارة مزارع الإنتاج الحيواني.",
            careers: ["مهندس إنتاج حيواني", "مدير مزارع", "مستشار أعلاف"]
          },
          {
            name: "التغذية وتكنولوجيا الغذاء",
            hours: 134,
            field: "زراعي/صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "علوم الأغذية وتصنيعها والتغذية العلاجية وحفظ الأطعمة.",
            careers: ["أخصائي تغذية", "فني صناعات غذائية", "مفتش جودة غذاء"]
          },
          {
            name: "الموارد الطبيعية والبيئة",
            hours: 134,
            field: "زراعي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "إدارة التربة والمياه والري والتعامل مع التحديات البيئية.",
            careers: ["مهندس ري", "أخصائي تربة ومياه", "خبير بيئي"]
          }
        ]
      },
      {
        name: "كلية العلوم والآداب",
        icon: "🔬",
        majors: [
          {
            name: "الرياضيات والإحصاء",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "الرياضيات التطبيقية والإحصاء الحيوي والنمذجة الرياضية.",
            careers: ["محلل إحصاء", "عالم بيانات", "مدرس رياضيات"]
          },
          {
            name: "الفيزياء التطبيقية",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "الفيزياء وتطبيقاتها العملية في المجالات الصناعية والطبية.",
            careers: ["فني مختبرات فيزياء", "فيزيائي تطبيقات طبية", "باحث"]
          },
          {
            name: "الكيمياء التطبيقية",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "الكيمياء الصناعية والتحليلية والمواد الكيميائية.",
            careers: ["كيميائي صناعي", "فني مختبرات", "مفتش جودة"]
          },
          {
            name: "اللغة الإنجليزية واللغويات",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "دراسات اللغة الإنجليزية واللغويات التطبيقية والترجمة.",
            careers: ["معلم لغة إنجليزية", "مترجم", "كاتب محتوى"]
          }
        ]
      }
    ]
  },
  3: {
    id: 3,
    name: "الجامعة الهاشمية (HU)",
    type: "public",
    location: "الزرقاء",
    icon: "🏰",
    website: "https://hu.edu.jo",
    facultiesData: [
      {
        name: "كلية الطب البشري",
        icon: "🩺",
        majors: [
          {
            name: "دكتور في الطب",
            hours: 256,
            field: "صحي",
            duration: "6 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "85 دينار",
            description: "كلية طب حديثة ومتطورة تعتمد على التعليم السريري المبكر بالتعاون مع مستشفيات وزارة الصحة.",
            careers: ["طبيب عام", "طبيب متخصص", "طبيب مقيم", "جراح", "باحث طبي"]
          }
        ]
      },
      {
        name: "كلية العلوم الصيدلانية",
        icon: "💊",
        majors: [
          {
            name: "الصيدلة",
            hours: 160,
            field: "صحي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "50 دينار",
            description: "برنامج صيدلة متطور يركز على العلوم الصيدلانية الأساسية والصناعية والتطبيق السريري.",
            careers: ["صيدلاني مجتمعي", "صيدلاني مستشفى", "مندوب طبي", "باحث أدوية"]
          }
        ]
      },
      {
        name: "كلية التمريض",
        icon: "⚕️",
        majors: [
          {
            name: "التمريض",
            hours: 132,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "إعداد كوادر تمريضية لتقديم الرعاية التمريضية الشاملة للمرضى بمختلف الحالات الصحية.",
            careers: ["ممرض قانوني", "ممرض طوارئ", "ممرض عناية حثيثة", "مشرف تمريض"]
          }
        ]
      },
      {
        name: "كلية العلوم الطبية التطبيقية",
        icon: "🔬",
        majors: [
          {
            name: "العلوم الطبية المخبرية",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "إجراء التحاليل المخبرية السريرية للمساعدة في تشخيص الأمراض.",
            careers: ["أخصائي مختبرات طبية", "فني بنك دم", "باحث طبي"]
          },
          {
            name: "التغذية السريرية والحميات",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "تقييم الحالة الغذائية للمرضى وتصميم برامج غذائية علاجية.",
            careers: ["أخصائي تغذية سريرية", "مفتش جودة غذاء", "مستشار تغذية"]
          },
          {
            name: "العلاج الطبيعي",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "تقييم وعلاج الاضطرابات الحركية الناتجة عن الإصابات باستخدام التقنيات الفيزيائية.",
            careers: ["أخصائي علاج طبيعي", "أخصائي تأهيل رياضي", "معالج فيزيائي"]
          },
          {
            name: "العلاج الوظيفي",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "تأهيل الأشخاص ذوي الإعاقات لاستعادة استقلاليتهم في الحياة اليومية.",
            careers: ["أخصائي علاج وظيفي", "مستشار تأهيل مجتمعي", "مقوم حركي"]
          },
          {
            name: "التصوير الطبي والإشعاعي",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "استخدام تقنيات التصوير الإشعاعي لتشخيص الأمراض.",
            careers: ["فني أشعة وتصوير طبي", "أخصائي تصوير رنين مغناطيسي", "مسؤول سلامة إشعاعية"]
          }
        ]
      },
      {
        name: "كلية الهندسة",
        icon: "🏗️",
        majors: [
          {
            name: "الهندسة المدنية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تصميم وإنشاء المنشآت والطرق والجسور والبنية التحتية.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مخطط مدني"]
          },
          {
            name: "الهندسة الميكانيكية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تصميم الآلات والأنظمة الميكانيكية وأنظمة التبريد والطاقة.",
            careers: ["مهندس ميكانيك", "مهندس صيانة", "مهندس إنتاج", "مصمم ميكانيكي"]
          },
          {
            name: "الهندسة الكهربائية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تصميم الأنظمة الكهربائية والإلكترونية والاتصالات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة", "مهندس صيانة"]
          },
          {
            name: "الهندسة الصناعية",
            hours: 160,
            field: "هندسي/إداري",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تحسين العمليات الإنتاجية وإدارة الجودة وسلاسل التوريد.",
            careers: ["مهندس إنتاج", "مدير جودة", "محلل عمليات", "مدير سلاسل توريد"]
          },
          {
            name: "الهندسة الطبية",
            hours: 160,
            field: "هندسي/طبي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "تطبيق المبادئ الهندسية في المجال الطبي لتصميم المعدات والأجهزة الطبية.",
            careers: ["مهندس أجهزة طبية", "مهندس صيانة طبية", "مطور تقنيات صحية"]
          },
          {
            name: "هندسة الميكاترونكس",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "دمج الهندسة الميكانيكية والكهربائية والحاسوب لتطوير أنظمة ذكية.",
            careers: ["مهندس ميكاترونكس", "مهندس أتمتة صناعية", "مبرمج أنظمة تحكم"]
          },
          {
            name: "هندسة العمارة",
            hours: 165,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "فن وعلم التصميم المعماري للمباني والمساحات الحضرية.",
            careers: ["مهندس معماري", "مصمم داخلي", "مخطط عمراني"]
          }
        ]
      },
      {
        name: "كلية الأمير الحسين بن عبدالله الثاني (IT)",
        icon: "💻",
        majors: [
          {
            name: "هندسة البرمجيات",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "تطوير التطبيقات وإدارة مشاريع البرمجيات وضمان الجودة.",
            careers: ["مهندس برمجيات", "مدير مشاريع تقنية", "مطور تطبيقات"]
          },
          {
            name: "علم الحاسوب وتطبيقاته",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "دراسة الخوارزميات، لغات البرمجة، وتطوير الأنظمة المعقدة.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور ألعاب"]
          },
          {
            name: "أنظمة المعلومات الحاسوبية",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "تحليل وتصميم قواعد البيانات ونظم المعلومات لتلبية احتياجات المؤسسات.",
            careers: ["محلل نظم", "مدير قواعد بيانات", "مستشار IT"]
          },
          {
            name: "تكنولوجيا معلومات الأعمال",
            hours: 132,
            field: "IT/أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "الجمع بين مهارات تكنولوجيا المعلومات ومفاهيم إدارة الأعمال.",
            careers: ["محلل أعمال رقمية", "مطور حلول أعمال", "مدير تقني"]
          },
          {
            name: "الذكاء الاصطناعي وعلم البيانات",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "تخصص يجمع بين علم البيانات الضخمة والذكاء الاصطناعي.",
            careers: ["عالم بيانات", "مهندس ذكاء اصطناعي", "مطور نماذج تعلم آلي"]
          },
          {
            name: "الأمن السيبراني",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "40 دينار",
            description: "حماية الأنظمة والشبكات والبيانات من التهديدات والاختراقات.",
            careers: ["محلل أمن سيبراني", "مختبر اختراق", "مستشار أمن معلومات"]
          }
        ]
      },
      {
        name: "كلية العلوم",
        icon: "🔬",
        majors: [
          {
            name: "الفيزياء",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "دراسة الفيزياء الأساسية والتطبيقية في مجالات الصناعة والطاقة.",
            careers: ["أكاديمي وباحث", "فيزيائي", "محلل طاقة", "مدرس فيزياء"]
          },
          {
            name: "الرياضيات",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "الرياضيات البحتة والتطبيقية لحل المشكلات العلمية والتكنولوجية.",
            careers: ["محلل بيانات", "إحصائي", "مدرس رياضيات"]
          },
          {
            name: "الكيمياء",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "فهم التفاعلات الكيميائية وتطبيقاتها في الصناعة والصحة والبيئة.",
            careers: ["كيميائي", "باحث أدوية", "مفتش جودة"]
          },
          {
            name: "العلوم الحياتية (الأحياء)",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "دراسة الكائنات الحية، البيولوجيا الجزيئية، وعلم الوراثة.",
            careers: ["باحث بيولوجي", "فني مختبر", "أخصائي بيئة"]
          }
        ]
      },
      {
        name: "كلية الاقتصاد والعلوم الإدارية",
        icon: "📊",
        majors: [
          {
            name: "إدارة الأعمال",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "مبادئ الإدارة، التسويق، السلوك التنظيمي، وريادة الأعمال.",
            careers: ["مدير أعمال", "مدير موارد بشرية", "رائد أعمال"]
          },
          {
            name: "المحاسبة",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "المحاسبة المالية، التدقيق، الضرائب، والمحاسبة الإدارية.",
            careers: ["محاسب مالي", "مدقق حسابات", "مستشار ضريبي"]
          },
          {
            name: "التمويل والمصارف",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "الأسواق المالية، إدارة الاستثمار، والمؤسسات المصرفية.",
            careers: ["محلل مالي", "مصرفي", "مدير محافظ مالية"]
          },
          {
            name: "الاقتصاد",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "تحليل النظم الاقتصادية الكلية والجزئية والتنمية الاقتصادية.",
            careers: ["محلل اقتصادي", "باحث", "مستشار اقتصادي"]
          },
          {
            name: "إدارة المخاطر والتأمين",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "تحليل وإدارة المخاطر المالية والتشغيلية في المؤسسات وشركات التأمين.",
            careers: ["محلل مخاطر", "وسيط تأمين", "خبير اكتواري"]
          }
        ]
      },
      {
        name: "كلية الآداب",
        icon: "📚",
        majors: [
          {
            name: "اللغة الإنجليزية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "دراسة الأدب الإنجليزي واللغويات وتطوير مهارات الاتصال.",
            careers: ["معلم لغة إنجليزية", "مترجم", "محرر محتوى"]
          },
          {
            name: "اللغة العربية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "الأدب العربي القديم والحديث، النحو، والصرف.",
            careers: ["معلم لغة عربية", "مصحح لغوي", "كاتب"]
          },
          {
            name: "العلاقات الدولية والدراسات الاستراتيجية",
            hours: 132,
            field: "سياسة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "دراسة السياسة الدولية، الدبلوماسية، وتحليل الصراعات.",
            careers: ["دبلوماسي", "محلل سياسي", "باحث استراتيجي"]
          }
        ]
      },
      {
        name: "الملكة رانيا للطفولة",
        icon: "👶",
        majors: [
          {
            name: "تربية الطفولة المبكرة",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "رعاية وتعليم الأطفال في سنوات الطفولة المبكرة (رياض الأطفال).",
            careers: ["معلمة رياض أطفال", "مشرفة حضانة", "أخصائية طفولة"]
          },
          {
            name: "التربية الخاصة",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "تعليم ودعم ذوي الاحتياجات الخاصة وصعوبات التعلم.",
            careers: ["معلم تربية خاصة", "أخصائي تعديل سلوك", "أخصائي صعوبات تعلم"]
          }
        ]
      },
      {
        name: "الملكة رانيا للسياحة والتراث",
        icon: "🏺",
        majors: [
          {
            name: "الإدارة السياحية",
            hours: 132,
            field: "أعمال/سياحة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "إدارة المؤسسات والشركات السياحية، التسويق السياحي، وإدارة الطيران.",
            careers: ["مدير شركة سياحة", "مسؤول علاقات سياحية", "مرشد سياحي"]
          },
          {
            name: "إدارة الموارد التراثية والمتاحف",
            hours: 132,
            field: "سياحة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "حفظ وإدارة المواقع الأثرية والتراثية وإدارة المتاحف.",
            careers: ["أمين متحف", "مدير موقع أثري", "دليل سياحي ثقافي"]
          }
        ]
      },
      {
        name: "كلية التربية البدنية وعلوم الرياضة",
        icon: "⚽",
        majors: [
          {
            name: "التربية البدنية وعلوم الرياضة",
            hours: 132,
            field: "رياضي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "علوم الحركة، التدريب الرياضي، اللياقة البدنية، والإدارة الرياضية.",
            careers: ["مدرس تربية رياضية", "مدرب لياقة بدنية", "أخصائي رياضي"]
          }
        ]
      }
    ]
  },
  4: {
    id: 4,
    name: "جامعة اليرموك (YU)",
    type: "public",
    location: "إربد",
    icon: "🦉",
    website: "https://www.yu.edu.jo",
    facultiesData: [
      {
        name: "كلية الطب",
        icon: "🩺",
        majors: [
          {
            name: "الطب والجراحة",
            hours: 257,
            field: "صحي",
            duration: "6 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "85 دينار",
            description: "كلية طب حديثة ومتميزة في إربد، تعتمد على التعليم الطبي التفاعلي مع تدريب في مستشفيات وزارة الصحة والخدمات الطبية.",
            careers: ["طبيب عام", "طبيب متخصص", "طبيب مقيم", "جراح", "باحث طبي"]
          }
        ]
      },
      {
        name: "كلية الصيدلة",
        icon: "💊",
        majors: [
          {
            name: "الصيدلة",
            hours: 160,
            field: "صحي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "50 دينار",
            description: "برنامج صيدلة شامل يركز على العلوم الصيدلانية، صناعة الدواء، والصيدلة السريرية التطبيقية.",
            careers: ["صيدلاني مجتمعي", "صيدلاني مستشفى", "باحث أدوية", "مفتش دوائي"]
          }
        ]
      },
      {
        name: "كلية الحجاوي للهندسة التكنولوجية",
        icon: "🏗️",
        majors: [
          {
            name: "هندسة العمارة",
            hours: 165,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "التصميم المعماري الإبداعي وتخطيط المدن والمحافظة على التراث العمراني.",
            careers: ["مهندس معماري", "مصمم داخلي", "مخطط عمراني", "مدير مشاريع بناء"]
          },
          {
            name: "الهندسة المدنية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "تصميم المنشآت والطرق وإدارة المشاريع الإنشائية والبنية التحتية.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مخطط مدني"]
          },
          {
            name: "الهندسة الكهربائية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "هندسة القوى الكهربائية وتصميم الأنظمة والآلات الكهربائية والطاقة المتجددة.",
            careers: ["مهندس كهربائي", "مهندس قوى", "مهندس طاقة متجددة"]
          },
          {
            name: "هندسة الإلكترونيات",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "تصميم الدوائر الإلكترونية والأنظمة المدمجة وأجهزة الاتصالات الحديثة.",
            careers: ["مهندس إلكترونيات", "مطور أنظمة مدمجة", "مهندس اتصالات"]
          },
          {
            name: "هندسة الحاسوب",
            hours: 160,
            field: "هندسي/IT",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "تصميم وبناء الأجهزة والأنظمة الحاسوبية والشبكات والمعالجات.",
            careers: ["مهندس حاسوب", "مهندس شبكات", "مطور أنظمة مدمجة"]
          },
          {
            name: "هندسة النظم الطبية الحيوية",
            hours: 160,
            field: "هندسي/طبي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "دمج الهندسة بالطب لتطوير الأجهزة الطبية والمعدات الحيوية والمستشفيات.",
            careers: ["مهندس أجهزة طبية", "مهندس صيانة طبية", "مندوب مبيعات أجهزة طبية"]
          },
          {
            name: "الهندسة الميكانيكية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "تصميم الآلات والأنظمة الميكانيكية، التبريد والتكييف، والطاقة.",
            careers: ["مهندس ميكانيك", "مهندس إنتاج", "مهندس صيانة", "مهندس طاقة"]
          },
          {
            name: "هندسة المعلوماتية والاتصالات",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "تصميم وإدارة شبكات الاتصالات الخلوية والأرضية ونقل البيانات.",
            careers: ["مهندس اتصالات", "مهندس شبكات", "مهندس بث وتلفزة"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات وعلوم الحاسوب",
        icon: "💻",
        majors: [
          {
            name: "علم الحاسوب",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "البرمجة والخوارزميات وتطوير البرمجيات وهياكل البيانات.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "باحث AI"]
          },
          {
            name: "هندسة البرمجيات",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "تطوير البرمجيات ضمن منهجيات احترافية وإدارة مشاريع التطوير والـ QA.",
            careers: ["مهندس برمجيات", "مدير مشاريع تقنية", "مهندس DevOps"]
          },
          {
            name: "نظم المعلومات الحاسوبية",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "إدارة قواعد البيانات ونظم المعلومات لتحسين أداء المؤسسات.",
            careers: ["محلل نظم", "مدير قواعد بيانات", "مستشار IT"]
          },
          {
            name: "الأمن السيبراني",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "40 دينار",
            description: "تأمين الأنظمة والشبكات والبيانات والحماية من الهجمات السيبرانية.",
            careers: ["محلل أمن سيبراني", "مختبر اختراق", "محقق جرائم إلكترونية"]
          },
          {
            name: "الذكاء الاصطناعي",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "تطوير أنظمة تعلم الآلة والشبكات العصبية والبيانات الضخمة.",
            careers: ["عالم بيانات", "مهندس ذكاء اصطناعي", "مطور نماذج ذكية"]
          }
        ]
      },
      {
        name: "كلية الاقتصاد والعلوم الإدارية",
        icon: "📊",
        majors: [
          {
            name: "إدارة الأعمال",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "مبادئ الإدارة والتنظيم والتخطيط الاستراتيجي وريادة الأعمال.",
            careers: ["مدير أعمال", "مدير موارد بشرية", "مستشار إداري"]
          },
          {
            name: "المحاسبة",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "المحاسبة المالية والتدقيق والضرائب والتقارير المالية.",
            careers: ["محاسب مالي", "مدقق حسابات", "مستشار ضريبي"]
          },
          {
            name: "العلوم المالية والمصرفية",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "إدارة الأسواق المالية، العمليات المصرفية، وإدارة المحافظ الاستثمارية.",
            careers: ["محلل مالي", "مصرفي", "مدير استثمار"]
          },
          {
            name: "الاقتصاد",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "دراسة الأسواق والسياسات الاقتصادية والتحليل الاقتصادي الكلي والجزئي.",
            careers: ["محلل اقتصادي", "باحث مالي", "مستشار اقتصادي"]
          },
          {
            name: "التسويق",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "فهم سلوك المستهلك، أبحاث السوق، والتسويق الرقمي وإدارة المبيعات.",
            careers: ["مدير تسويق", "أخصائي تسويق رقمي", "مدير مبيعات"]
          }
        ]
      },
      {
        name: "كلية العلوم",
        icon: "🔬",
        majors: [
          {
            name: "الرياضيات",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "الرياضيات البحثية والتطبيقية والإحصاء والتحليل العددي.",
            careers: ["مدرس رياضيات", "محلل إحصاء", "عالم بيانات"]
          },
          {
            name: "الفيزياء",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "الفيزياء النظرية والتطبيقية، البصريات، وعلوم المواد.",
            careers: ["فيزيائي", "باحث مختبر", "مدرس فيزياء"]
          },
          {
            name: "الكيمياء",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "الكيمياء العضوية وغير العضوية والتحليلية والتطبيقية.",
            careers: ["كيميائي مختبر", "باحث أدوية", "مفتش جودة"]
          },
          {
            name: "العلوم الحياتية (الأحياء)",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "دراسة الكائنات الحية الدقيقة، علم الوراثة، والبيولوجيا الجزيئية.",
            careers: ["باحث بيولوجي", "فني مختبر", "عالم وراثة"]
          },
          {
            name: "علوم الأرض والبيئة",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "دراسة الجيولوجيا، موارد المياه، التنقيب، وحماية البيئة.",
            careers: ["جيولوجي", "خبير بيئي", "باحث مياه"]
          }
        ]
      },
      {
        name: "كلية الآداب",
        icon: "📚",
        majors: [
          {
            name: "اللغة العربية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "دراسة اللغة العربية، النحو، الصرف، والأدب العربي عبر العصور.",
            careers: ["معلم لغة عربية", "كاتب ومحرر", "مصحح لغوي"]
          },
          {
            name: "اللغة الإنجليزية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "الأدب الإنجليزي، اللغويات، وتطوير مهارات الاتصال المتقدمة.",
            careers: ["معلم لغة إنجليزية", "مترجم", "كاتب محتوى"]
          },
          {
            name: "اللغات الحديثة (الفرنسية، الإسبانية، الخ)",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "تأسيس لغوي قوي في اللغات الأوروبية مع التركيز على الترجمة والثقافة.",
            careers: ["مترجم", "مرشد سياحي", "منسق دولي"]
          },
          {
            name: "التاريخ",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "دراسة التاريخ العربي والإسلامي والعالمي وتطور الحضارات.",
            careers: ["مؤرخ", "معلم تاريخ", "باحث تراثي"]
          },
          {
            name: "الجغرافيا",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "الجغرافيا الطبيعية والبشرية وتطبيقات نظم المعلومات الجغرافية (GIS).",
            careers: ["مخطط عمراني", "أخصائي GIS", "باحث بيئي"]
          },
          {
            name: "علم الاجتماع والخدمة الاجتماعية",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "تحليل الظواهر المجتمعية وتقديم الدعم النفسي والاجتماعي للفئات المختلفة.",
            careers: ["أخصائي اجتماعي", "مرشد مجتمعي", "باحث اجتماعي"]
          }
        ]
      },
      {
        name: "كلية الفنون الجميلة",
        icon: "🎨",
        majors: [
          {
            name: "التصميم (جرافيك وداخلي)",
            hours: 132,
            field: "فنون/تصميم",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "تصميم الهويات البصرية، الإعلانات، وتخطيط الفراغات الداخلية للمباني.",
            careers: ["مصمم جرافيك", "مصمم داخلي", "مخرج فني"]
          },
          {
            name: "الفنون التشكيلية",
            hours: 132,
            field: "فنون",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "الرسم، النحت، الخزف، وتاريخ الفنون البصرية.",
            careers: ["فنان تشكيلي", "معلم فنون", "منسق معارض"]
          },
          {
            name: "الموسيقى",
            hours: 132,
            field: "فنون",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "العزف، التأليف الموسيقي، والنظريات الموسيقية الشرقية والغربية.",
            careers: ["موسيقي", "ملحن", "معلم موسيقى"]
          },
          {
            name: "الدراما",
            hours: 132,
            field: "فنون",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "التمثيل، الإخراج المسرحي، كتابة السيناريو، والنقد.",
            careers: ["ممثل", "مخرج مسرحي", "ناقد فني"]
          }
        ]
      },
      {
        name: "كلية الإعلام",
        icon: "🎙️",
        majors: [
          {
            name: "الصحافة",
            hours: 132,
            field: "إعلام",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "الصحافة المكتوبة والرقمية، التحرير الإخباري، والتحقيقات الصحفية.",
            careers: ["صحفي", "محرر أخبار", "مراسل صحفي"]
          },
          {
            name: "الإذاعة والتلفزيون",
            hours: 132,
            field: "إعلام",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "إعداد وتقديم البرامج، التصوير، والمونتاج الإذاعي والتلفزيوني.",
            careers: ["مقدم برامج", "مخرج تلفزيوني", "معد برامج"]
          },
          {
            name: "العلاقات العامة والإعلان",
            hours: 132,
            field: "إعلام",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "إدارة السمعة المؤسسية، تنظيم الفعاليات، وتصميم الحملات الإعلانية.",
            careers: ["مدير علاقات عامة", "مخطط حملات إعلانية", "متحدث رسمي"]
          }
        ]
      },
      {
        name: "كلية القانون",
        icon: "⚖️",
        majors: [
          {
            name: "القانون",
            hours: 132,
            field: "قانون",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "دراسة التشريعات الأردنية والدولية (المدني، الجزائي، التجاري، والإداري).",
            careers: ["محام", "قاض", "مستشار قانوني", "مدعي عام"]
          }
        ]
      },
      {
        name: "كلية السياحة والفنادق",
        icon: "🏨",
        majors: [
          {
            name: "الإدارة السياحية",
            hours: 132,
            field: "سياحة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "التخطيط والتسويق السياحي، وإدارة الشركات السياحية والطيران.",
            careers: ["مدير شركة سياحة", "مسؤول ترويج سياحي", "مرشد سياحي"]
          },
          {
            name: "الإدارة الفندقية",
            hours: 132,
            field: "سياحة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "إدارة العمليات الفندقية، الضيافة، إدارة الأغذية والمشروبات.",
            careers: ["مدير فندق", "مسؤول ضيافة", "مدير مطعم أو منتجع"]
          }
        ]
      },
      {
        name: "كلية الشريعة والدراسات الإسلامية",
        icon: "🕌",
        majors: [
          {
            name: "أصول الدين",
            hours: 132,
            field: "شريعة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "العقيدة والتفسير وعلوم القرآن والحديث الشريف.",
            careers: ["معلم تربية إسلامية", "داعية", "باحث شرعي"]
          },
          {
            name: "الفقه وأصوله",
            hours: 132,
            field: "شريعة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "دراسة الأحكام الشرعية العملية وأصول الفقه.",
            careers: ["قاض شرعي", "مفتي", "مستشار قانوني شرعي"]
          },
          {
            name: "الدراسات الإسلامية",
            hours: 132,
            field: "شريعة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "دراسة شاملة تجمع بين الفقه، العقيدة، والفكر الإسلامي المعاصر.",
            careers: ["معلم تربية إسلامية", "واعظ", "باحث إسلامي"]
          }
        ]
      },
      {
        name: "كلية التربية",
        icon: "📖",
        majors: [
          {
            name: "معلم الصف",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "إعداد معلمين لتدريس الصفوف الابتدائية الثلاثة الأولى.",
            careers: ["معلم صف", "مشرف تربوي"]
          },
          {
            name: "تربية الطفل",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "رعاية وتعليم الأطفال في مرحلة رياض الأطفال والطفولة المبكرة.",
            careers: ["معلمة رياض أطفال", "أخصائية طفولة"]
          },
          {
            name: "الإرشاد النفسي",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "تقديم الدعم والإرشاد النفسي للطلاب والأفراد في المؤسسات.",
            careers: ["مرشد نفسي", "مرشد تربوي", "أخصائي تعديل سلوك"]
          }
        ]
      },
      {
        name: "كلية التربية الرياضية",
        icon: "⚽",
        majors: [
          {
            name: "التربية الرياضية",
            hours: 132,
            field: "رياضي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "علوم الحركة، التدريب الرياضي، والمناهج الرياضية المدرسية.",
            careers: ["مدرس تربية رياضية", "مدرب لياقة", "إداري رياضي"]
          }
        ]
      }
    ]
  },
  5: {
    id: 5,
    name: "جامعة البلقاء التطبيقية (BAU)",
    type: "public",
    location: "السلط (المركز) وكليات جامعية",
    icon: "🏛️",
    website: "https://www.bau.edu.jo",
    facultiesData: [
      {
        name: "كلية الطب البشري",
        icon: "🩺",
        majors: [
          {
            name: "دكتور في الطب",
            hours: 257,
            field: "صحي",
            duration: "6 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "85 دينار",
            description: "برنامج طبي متطور مقره المركز في السلط، يركز على التدريب السريري والبحث العلمي الطبي بالتعاون مع المستشفيات الحكومية.",
            careers: ["طبيب عام", "طبيب متخصص", "طبيب مقيم", "جراح", "باحث طبي"]
          }
        ]
      },
      {
        name: "كلية الهندسة التكنولوجية (البوليتكنك) والهندسة",
        icon: "⚙️",
        majors: [
          {
            name: "الهندسة المدنية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "كلية عريقة متخصصة بالتطبيقات العملية لتصميم وإنشاء المنشآت والبنية التحتية.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مخطط مدني"]
          },
          {
            name: "هندسة الطرق والجسور",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تخصص هندسي دقيق يركز على تصميم وإنشاء وتطوير شبكات الطرق والجسور والأنفاق.",
            careers: ["مهندس طرق", "مهندس مرور", "مدير مشاريع بنية تحتية"]
          },
          {
            name: "الهندسة الميكانيكية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تصميم وصيانة الآلات الصناعية، وأنظمة التبريد والتكييف، ومحطات الطاقة.",
            careers: ["مهندس ميكانيك", "مهندس صيانة", "مهندس إنتاج", "مصمم أنظمة ميكانيكية"]
          },
          {
            name: "الهندسة الكهربائية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "الأنظمة الكهربائية قوى وتحكم، والإلكترونيات التطبيقية.",
            careers: ["مهندس كهربائي", "مهندس قوى", "مهندس صيانة", "مهندس طاقة"]
          },
          {
            name: "هندسة العمارة",
            hours: 165,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "التصميم المعماري الإبداعي والمستدام للمباني والمساحات الحضرية.",
            careers: ["مهندس معماري", "مصمم داخلي", "مخطط حضري"]
          },
          {
            name: "هندسة الحاسوب",
            hours: 160,
            field: "هندسي/IT",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تصميم المكونات المادية والبرمجية للأنظمة الحاسوبية والشبكات.",
            careers: ["مهندس حاسوب", "مهندس شبكات", "مطور أنظمة مدمجة"]
          }
        ]
      },
      {
        name: "كلية الذكاء الاصطناعي",
        icon: "💻",
        majors: [
          {
            name: "الذكاء الاصطناعي",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "كلية رائدة ومتخصصة في تقنيات تعلم الآلة، الشبكات العصبية، والتطبيقات الذكية.",
            careers: ["مهندس ذكاء اصطناعي", "مطور نماذج تعلم آلي", "باحث تقني"]
          },
          {
            name: "الأمن السيبراني",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "حماية الأنظمة والبيانات، واكتشاف الثغرات الأمنية، والتحقيق الجنائي الرقمي.",
            careers: ["محلل أمن سيبراني", "مختبر اختراق", "محقق جرائم رقمية"]
          },
          {
            name: "علم البيانات",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "تحليل البيانات الضخمة لاستخراج الأنماط ودعم اتخاذ القرارات المؤسسية.",
            careers: ["عالم بيانات", "محلل بيانات متقدم", "مهندس بيانات"]
          },
          {
            name: "الواقع الافتراضي والمدمج",
            hours: 132,
            field: "IT/تصميم",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "تطوير بيئات تفاعلية وتطبيقات الواقع المعزز للألعاب والتدريب والتعليم.",
            careers: ["مطور واقع افتراضي (VR)", "مصمم بيئات تفاعلية", "مطور ألعاب"]
          }
        ]
      },
      {
        name: "كلية الأعمال",
        icon: "📊",
        majors: [
          {
            name: "إدارة الأعمال",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "تطوير المهارات القيادية والإدارية والتنظيمية في بيئة الأعمال الحديثة.",
            careers: ["مدير أعمال", "مدير موارد بشرية", "رائد أعمال"]
          },
          {
            name: "المحاسبة",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "المحاسبة المالية، التدقيق، والتقارير المالية للشركات والمؤسسات.",
            careers: ["محاسب مالي", "مدقق حسابات", "مستشار ضريبي"]
          },
          {
            name: "التمويل",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "الأسواق المالية، إدارة الاستثمارات، والعمليات المصرفية.",
            careers: ["محلل مالي", "مصرفي", "مدير محافظ استثمارية"]
          },
          {
            name: "نظم المعلومات الإدارية",
            hours: 132,
            field: "أعمال/IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "توظيف تكنولوجيا المعلومات في تطوير وإدارة الأنظمة المؤسسية.",
            careers: ["محلل نظم أعمال", "مدير مشاريع تقنية", "مستشار IT"]
          }
        ]
      },
      {
        name: "كلية العلوم التطبيقية",
        icon: "🔬",
        majors: [
          {
            name: "الرياضيات",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "الرياضيات البحتة والتطبيقات الإحصائية والنمذجة الرياضية.",
            careers: ["محلل بيانات", "إحصائي", "مدرس رياضيات"]
          },
          {
            name: "الفيزياء",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "دراسة الظواهر الفيزيائية وتطبيقاتها في التكنولوجيا والصناعة.",
            careers: ["باحث فيزيائي", "محلل طاقة", "فني مختبرات"]
          },
          {
            name: "الكيمياء",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "التحليل الكيميائي وتطبيقات الكيمياء في الصناعة والبيئة.",
            careers: ["كيميائي صناعي", "مفتش جودة", "باحث مختبر"]
          },
          {
            name: "علوم الحاسوب التطبيقية",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "البرمجة التطبيقية وتطوير الأنظمة البرمجية لحل المشكلات التقنية.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مبرمج تطبيقات"]
          }
        ]
      },
      {
        name: "كلية التمريض",
        icon: "⚕️",
        majors: [
          {
            name: "التمريض",
            hours: 132,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "تأهيل كوادر تمريضية لتقديم الرعاية الصحية الشاملة للمرضى.",
            careers: ["ممرض قانوني", "ممرض طوارئ", "ممرض عناية حثيثة"]
          }
        ]
      },
      {
        name: "كلية الزراعة التكنولوجية",
        icon: "🌿",
        majors: [
          {
            name: "التغذية والتصنيع الغذائي",
            hours: 132,
            field: "زراعي/صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "علوم الأغذية وتصنيعها، والتغذية العلاجية، وحفظ الأطعمة.",
            careers: ["أخصائي تغذية", "فني صناعات غذائية", "مفتش جودة غذاء"]
          },
          {
            name: "الإنتاج النباتي والوقاية",
            hours: 132,
            field: "زراعي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "زراعة المحاصيل وإدارتها، وتقنيات الوقاية من الآفات والأمراض النباتية.",
            careers: ["مهندس زراعي", "مستشار زراعي", "مفتش زراعي"]
          }
        ]
      },
      {
        name: "كلية الحقوق",
        icon: "⚖️",
        majors: [
          {
            name: "الحقوق",
            hours: 132,
            field: "قانون",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "دراسة التشريعات المدنية، الجزائية، والتجارية، وتطبيقاتها العملية.",
            careers: ["محام", "قاض", "مستشار قانوني", "مدعي عام"]
          }
        ]
      },
      {
        name: "كلية السلط للعلوم الإنسانية",
        icon: "📚",
        majors: [
          {
            name: "اللغة الإنجليزية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "الأدب الإنجليزي واللغويات ومهارات الترجمة والتواصل.",
            careers: ["معلم لغة إنجليزية", "مترجم", "كاتب محتوى"]
          },
          {
            name: "اللغة العربية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "دراسة اللغة العربية، النحو، الصرف، والأدب العربي.",
            careers: ["معلم لغة عربية", "مصحح لغوي", "كاتب"]
          }
        ]
      }
    ]
  },
  6: {
    id: 6,
    name: "جامعة مؤتة",
    type: "public",
    location: "الكرك",
    icon: "🏛️",
    website: "https://www.mutah.edu.jo",
    facultiesData: [
      {
        name: "كلية الطب",
        icon: "🩺",
        majors: [
          {
            name: "دكتور في الطب والجراحة",
            hours: 256,
            field: "صحي",
            duration: "6 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "85 دينار",
            description: "كلية طب رائدة في إقليم الجنوب، تعتمد على التدريب السريري المكثف في مستشفى الكرك الحكومي والمستشفيات العسكرية.",
            careers: ["طبيب عام", "طبيب متخصص", "طبيب مقيم", "جراح", "طبيب عسكري", "باحث طبي"]
          }
        ]
      },
      {
        name: "كلية طب الأسنان",
        icon: "🦷",
        majors: [
          {
            name: "دكتور في طب وجراحة الأسنان",
            hours: 210,
            field: "صحي",
            duration: "5 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "75 دينار",
            description: "كلية حديثة مجهزة بأحدث التقنيات وعيادات المحاكاة في طب الفم والأسنان لخدمة إقليم الجنوب.",
            careers: ["طبيب أسنان عام", "أخصائي تقويم أسنان", "جراح فم وأسنان", "أخصائي زراعة أسنان"]
          }
        ]
      },
      {
        name: "كلية الصيدلة",
        icon: "💊",
        majors: [
          {
            name: "الصيدلة",
            hours: 160,
            field: "صحي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "دراسة الصيدلة المجتمعية والصناعية والإكلينيكية وتأثيرات الأدوية وتفاعلاتها.",
            careers: ["صيدلاني إكلينيكي", "مدير صيدلية", "مندوب طبي", "باحث في صناعة الدواء", "مفتش دوائي"]
          }
        ]
      },
      {
        name: "كلية التمريض",
        icon: "⚕️",
        majors: [
          {
            name: "التمريض",
            hours: 132,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "تأهيل ممرضين متخصصين علمياً وعملياً لتقديم الرعاية في المستشفيات والمراكز الصحية.",
            careers: ["ممرض قانوني", "ممرض عناية مركزة", "ممرض عمليات", "ممرض طوارئ", "مشرف تمريض"]
          }
        ]
      },
      {
        name: "كلية الهندسة",
        icon: "🏗️",
        majors: [
          {
            name: "الهندسة المدنية",
            hours: 166,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تصميم وإنشاء المنشآت والطرق والمشاريع الكبرى وتطوير البنية التحتية.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مخطط مدني"]
          },
          {
            name: "الهندسة الكهربائية (اتصالات وإلكترونيات)",
            hours: 166,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تصميم وتطوير أنظمة الاتصالات الحديثة والدوائر الإلكترونية المعقدة.",
            careers: ["مهندس اتصالات", "مهندس إلكترونيات", "مهندس صيانة"]
          },
          {
            name: "الهندسة الكهربائية (قوى وتحكم)",
            hours: 166,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "منظومات وتوليد الطاقة الكهربائية وأنظمة التحكم الصناعي الآلي.",
            careers: ["مهندس قوى كهربائية", "مهندس تحكم وأتمتة", "مهندس طاقة"]
          },
          {
            name: "الهندسة الميكانيكية (قوى حرارية وطاقة)",
            hours: 166,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تطوير أنظمة الطاقة الحرارية والمحركات والتبريد والطاقة المتجددة.",
            careers: ["مهندس ميكانيك حراري", "مهندس طاقة", "مهندس محطات قوى"]
          },
          {
            name: "هندسة المواد والتصنيع",
            hours: 166,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "علوم المواد الهندسية (معادن، بوليمرات) وعمليات التصنيع والمعالجة السطحية.",
            careers: ["مهندس مواد", "مهندس تصنيع", "مهندس جودة ومقاييس", "باحث مواد"]
          },
          {
            name: "هندسة المياه والبيئة",
            hours: 166,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "إدارة الموارد المائية، معالجة المياه العادمة، وحماية البيئة المستدامة.",
            careers: ["مهندس بيئة", "مهندس معالجة مياه", "مستشار بيئي", "مهندس هيدرولوجي"]
          },
          {
            name: "الهندسة الكيميائية",
            hours: 166,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تصميم وإدارة العمليات الكيميائية الصناعية، وصناعة الأدوية والبتروكيماويات.",
            careers: ["مهندس عمليات", "مهندس كيميائي", "مهندس بيئة", "مهندس أدوية"]
          },
          {
            name: "هندسة الحاسوب",
            hours: 166,
            field: "هندسي/IT",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تصميم المعالجات والأنظمة المدمجة وبنية شبكات الحاسوب.",
            careers: ["مهندس أجهزة حاسوب", "مهندس شبكات", "مطور أنظمة مدمجة"]
          },
          {
            name: "هندسة النظم الصناعية",
            hours: 166,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تحسين العمليات الإنتاجية وإدارة الجودة وتحليل ورفع كفاءة النظم الصناعية.",
            careers: ["مهندس إنتاج", "مدير جودة", "محلل سلاسل توريد", "مستشار عمليات"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات",
        icon: "💻",
        majors: [
          {
            name: "علم الحاسوب",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "البرمجة وهياكل البيانات وتطوير البرمجيات وحل المشكلات حاسوبياً.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات"]
          },
          {
            name: "هندسة البرمجيات",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "دورة حياة تطوير البرمجيات، إدارة المشاريع التقنية، وضمان جودة البرمجيات.",
            careers: ["مهندس برمجيات", "مدير مشاريع تقنية", "مهندس جودة (QA)"]
          },
          {
            name: "نظم المعلومات الحاسوبية",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "إدارة قواعد البيانات وتطوير أنظمة المعلومات وربطها بقطاع الأعمال.",
            careers: ["محلل نظم", "مدير قواعد بيانات", "مستشار IT"]
          }
        ]
      },
      {
        name: "كلية العلوم",
        icon: "🔬",
        majors: [
          {
            name: "الرياضيات والإحصاء",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "الرياضيات البحتة والتطبيقية، الإحصاء الحيوي، والنمذجة الرياضية.",
            careers: ["محلل بيانات", "إحصائي", "مدرس رياضيات", "باحث أكاديمي"]
          },
          {
            name: "الفيزياء",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "الفيزياء النظرية والتطبيقية والعلوم الطبيعية وتطبيقاتها الصناعية.",
            careers: ["باحث مختبرات", "فيزيائي", "محلل طاقة", "معلم فيزياء"]
          },
          {
            name: "الكيمياء",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "الكيمياء العضوية والتحليلية وتطبيقاتها في الصناعة والدواء.",
            careers: ["كيميائي صناعي", "فني مختبر", "مفتش جودة", "كيميائي شرعي"]
          },
          {
            name: "العلوم الحياتية (الأحياء)",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "الأحياء الدقيقة، علم الوراثة، التطور، والبيئة الطبيعية.",
            careers: ["باحث بيولوجي", "فني مختبر", "أخصائي بيئة", "عالم وراثة"]
          },
          {
            name: "العلوم الطبية والمخبرية",
            hours: 132,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "التحاليل الطبية المخبرية وعلم الأمراض والكيمياء الحيوية.",
            careers: ["أخصائي مختبرات طبية", "فني بنك دم", "محلل كيمياء حيوية"]
          }
        ]
      },
      {
        name: "كلية الأعمال",
        icon: "📊",
        majors: [
          {
            name: "إدارة الأعمال والتسويق",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "الإدارة الاستراتيجية، ريادة الأعمال، وتسويق المنتجات والخدمات.",
            careers: ["مدير أعمال", "أخصائي تسويق", "مدير موارد بشرية"]
          },
          {
            name: "المحاسبة",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "المحاسبة المالية والإدارية، التدقيق، والضرائب.",
            careers: ["محاسب مالي", "مدقق حسابات", "مستشار ضريبي"]
          },
          {
            name: "العلوم المالية والمصرفية",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "إدارة الأصول المالية، الاستثمار، البنوك، والأسواق المالية.",
            careers: ["محلل مالي", "مصرفي", "مدير محافظ مالية"]
          },
          {
            name: "اقتصاديات المال والأعمال",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "التحليل الاقتصادي التطبيقي، دراسة الجدوى، وأسواق المال.",
            careers: ["محلل اقتصادي", "مستشار اقتصادي", "باحث مالي"]
          },
          {
            name: "نظم المعلومات الإدارية",
            hours: 132,
            field: "أعمال/IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "ربط تكنولوجيا المعلومات بالإدارة وتحليل بيانات الأعمال لدعم القرار.",
            careers: ["محلل نظم أعمال", "مستشار تحول رقمي", "مدير مشاريع تقنية"]
          },
          {
            name: "الإدارة العامة",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "إدارة المؤسسات الحكومية، الإدارة المحلية، وتطوير السياسات العامة.",
            careers: ["مخطط سياسات", "مدير إداري حكومي", "أخصائي تنظيم"]
          }
        ]
      },
      {
        name: "كلية الزراعة",
        icon: "🌾",
        majors: [
          {
            name: "الإنتاج النباتي",
            hours: 132,
            field: "زراعي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "زراعة المحاصيل وتقنيات الإنتاج الزراعي الحديث وتحسين جودة النبات.",
            careers: ["مهندس زراعي", "مستشار زراعي", "مدير مزرعة"]
          },
          {
            name: "الإنتاج الحيواني",
            hours: 132,
            field: "زراعي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "تربية الحيوانات، تغذيتها، فسيولوجيا الحيوان، وإدارة المزارع الحيوانية.",
            careers: ["مهندس إنتاج حيواني", "مستشار أعلاف", "مفتش بيطري (مساند)"]
          },
          {
            name: "التغذية والصناعات الغذائية",
            hours: 132,
            field: "زراعي/صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "علوم الغذاء، التغذية البشرية، الجودة، وتصنيع وحفظ المواد الغذائية.",
            careers: ["أخصائي تغذية", "فني صناعات غذائية", "مفتش جودة غذاء"]
          },
          {
            name: "الوقاية والمكافحة المتكاملة",
            hours: 132,
            field: "زراعي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "مكافحة الآفات الزراعية والحشرات والأمراض النباتية بطرق مستدامة وآمنة.",
            careers: ["أخصائي وقاية نبات", "مفتش زراعي", "مستشار مكافحة آفات"]
          }
        ]
      },
      {
        name: "كلية الحقوق",
        icon: "⚖️",
        majors: [
          {
            name: "القانون",
            hours: 132,
            field: "قانون",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "القانون المدني، الجزائي، التجاري، والدولي مع التركيز على التطبيق العملي والمحاكم الصورية.",
            careers: ["محام", "قاض", "مستشار قانوني", "مدعي عام", "موثق عقود"]
          }
        ]
      },
      {
        name: "كلية الشريعة",
        icon: "🕌",
        majors: [
          {
            name: "الفقه وأصوله",
            hours: 132,
            field: "شريعة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "دراسة الفقه الإسلامي، أصول الاستنباط، والاجتهاد في المسائل المعاصرة.",
            careers: ["قاض شرعي", "مفتي", "مستشار قانوني شرعي"]
          },
          {
            name: "أصول الدين",
            hours: 132,
            field: "شريعة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "العقيدة الإسلامية، التفسير، علوم القرآن، والحديث النبوي الشريف.",
            careers: ["معلم تربية إسلامية", "داعية", "باحث شرعي"]
          }
        ]
      },
      {
        name: "كلية الآداب",
        icon: "📚",
        majors: [
          {
            name: "اللغة العربية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "دراسة النحو، الصرف، البلاغة، والأدب العربي القديم والحديث.",
            careers: ["معلم لغة عربية", "كاتب ومحرر", "مصحح لغوي"]
          },
          {
            name: "اللغة الإنجليزية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "الأدب الإنجليزي، اللغويات التطبيقية، مهارات الاتصال، والترجمة.",
            careers: ["معلم لغة إنجليزية", "مترجم", "كاتب محتوى"]
          },
          {
            name: "اللغات الأوروبية",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "دراسة لغة أوروبية (فرنسية، ألمانية، إسبانية) وآدابها وثقافتها.",
            careers: ["مترجم", "مرشد سياحي", "منسق دولي"]
          },
          {
            name: "الترجمة",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "مهارات الترجمة التحريرية والفورية المتخصصة بين اللغتين العربية والإنجليزية.",
            careers: ["مترجم فوري", "مترجم تحريري", "محرر دولي"]
          }
        ]
      },
      {
        name: "كلية العلوم الاجتماعية",
        icon: "🌍",
        majors: [
          {
            name: "الآثار والسياحة",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "علم الآثار، التنقيب، إدارة المواقع التراثية، والسياحة الثقافية المستدامة.",
            careers: ["مرشد سياحي", "محافظ تراث", "منقب آثار"]
          },
          {
            name: "الجغرافيا",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "الجغرافيا الطبيعية والبشرية وتطبيقات أنظمة المعلومات الجغرافية (GIS).",
            careers: ["مخطط إقليمي", "أخصائي GIS", "باحث بيئي"]
          },
          {
            name: "التاريخ",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "التاريخ العربي، الإسلامي، والعالمي، وتحليل الوثائق وتطور الحضارات.",
            careers: ["مؤرخ", "باحث تراثي", "معلم تاريخ"]
          },
          {
            name: "العلاقات الدولية",
            hours: 132,
            field: "سياسة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "العلاقات الدولية، الدبلوماسية، السياسة الخارجية، وفض النزاعات.",
            careers: ["دبلوماسي", "محلل سياسي", "باحث استراتيجي"]
          },
          {
            name: "علم الاجتماع",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "دراسة بنية المجتمع، السلوك الاجتماعي، الظواهر، وحل المشكلات الاجتماعية.",
            careers: ["أخصائي اجتماعي", "باحث اجتماعي", "مرشد أسري"]
          }
        ]
      },
      {
        name: "كلية العلوم التربوية",
        icon: "📖",
        majors: [
          {
            name: "الإرشاد والصحة النفسية",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "أسس التوجيه والإرشاد النفسي والتربوي والأسري.",
            careers: ["مرشد نفسي", "مرشد تربوي", "أخصائي تعديل سلوك"]
          },
          {
            name: "التربية الخاصة",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "تعليم ودعم الأفراد ذوي الإعاقات والاحتياجات الخاصة والموهوبين.",
            careers: ["معلم تربية خاصة", "أخصائي صعوبات تعلم", "أخصائي نطق وتخاطب (تأهيلي)"]
          },
          {
            name: "علم النفس التطبيقي",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "تطبيق مبادئ علم النفس في تقييم القدرات وتحسين الأداء والسلوك الإنساني.",
            careers: ["أخصائي نفسي تطبيقي", "أخصائي موارد بشرية", "باحث سلوكي"]
          },
          {
            name: "تربية الطفل",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "رعاية وتعليم الأطفال في سنوات الطفولة المبكرة ورياض الأطفال.",
            careers: ["معلمة رياض أطفال", "مشرفة حضانة", "أخصائية طفولة"]
          },
          {
            name: "تعليم الصفوف الثلاثة الأولى",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "12 دينار",
            description: "تأهيل معلمين متخصصين لتدريس الصفوف التأسيسية وتأسيس القراءة والكتابة.",
            careers: ["معلم صف", "مشرف مراحل أساسية", "مطور مناهج ابتدائية"]
          }
        ]
      },
      {
        name: "كلية علوم الرياضة",
        icon: "⚽",
        majors: [
          {
            name: "التربية الرياضية",
            hours: 132,
            field: "رياضي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "تأهيل معلمي التربية البدنية، أساسيات علم الحركة، والإدارة الرياضية.",
            careers: ["مدرس تربية رياضية", "إداري رياضي", "مدرب عام"]
          },
          {
            name: "التأهيل الرياضي",
            hours: 132,
            field: "رياضي/صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "إعادة تأهيل المصابين رياضياً والعلاج الفيزيائي الرياضي المتخصص.",
            careers: ["أخصائي تأهيل رياضي", "أخصائي إصابات ملاعب", "مدرب لياقة بدنية علاجية"]
          },
          {
            name: "التدريب الرياضي",
            hours: 132,
            field: "رياضي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "16 دينار",
            description: "منهجيات التدريب الرياضي الحديث، علم الأداء، وتطوير قدرات الرياضيين التنافسية.",
            careers: ["مدرب رياضي محترف", "محلل أداء رياضي", "مكتشف مواهب رياضية"]
          }
        ]
      }
    ]
  },
  7: {
    id: 7,
    name: "جامعة الحسين بن طلال (AHU)",
    type: "public",
    location: "معان",
    icon: "🏛️",
    website: "https://www.ahu.edu.jo",
    facultiesData: [
      {
        name: "كلية الهندسة",
        icon: "🏗️",
        majors: [
          {
            name: "هندسة التعدين والمعادن",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "32 دينار",
            description: "تخصص هندسي فريد ومتميز في الجنوب، يدرس استخراج المعادن، الجيولوجيا الهندسية، وإدارة مواقع التعدين.",
            careers: ["مهندس تعدين", "مهندس في شركات الفوسفات والبوتاس", "مدير موقع تعدين", "مستشار معادن", "مهندس تفجيرات"]
          },
          {
            name: "الهندسة المدنية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تصميم المنشآت والبنية التحتية والموارد المائية وتطوير المشاريع العمرانية.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مخطط مدني"]
          },
          {
            name: "الهندسة الكهربائية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "الأنظمة الكهربائية والإلكترونيات وتطبيقات الطاقة والطاقة المتجددة.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة متجددة", "مهندس صيانة"]
          },
          {
            name: "هندسة الحاسوب",
            hours: 160,
            field: "هندسي/IT",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تصميم وبناء الأجهزة والأنظمة الحاسوبية والشبكات والمعالجات المدمجة.",
            careers: ["مهندس حاسوب", "مهندس شبكات", "مطور أنظمة مدمجة"]
          },
          {
            name: "الهندسة الميكانيكية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تصميم الآلات والأنظمة الميكانيكية، وأنظمة التكييف، والطاقة الحرارية.",
            careers: ["مهندس ميكانيك", "مهندس صيانة", "مهندس طاقة حرارية"]
          },
          {
            name: "الهندسة الكيميائية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تصميم وإدارة العمليات الكيميائية الصناعية وتطوير المواد.",
            careers: ["مهندس عمليات", "مهندس كيميائي", "مهندس بيئة"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات",
        icon: "💻",
        majors: [
          {
            name: "هندسة البرمجيات",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تطوير البرمجيات وإدارة المشاريع التقنية وضمان جودة الأنظمة البرمجية.",
            careers: ["مهندس برمجيات", "مدير مشاريع تقنية", "مطور تطبيقات"]
          },
          {
            name: "علم الحاسوب",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "البرمجة والخوارزميات وتطوير البرمجيات وحل المشكلات حاسوبياً.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات"]
          },
          {
            name: "نظم المعلومات الحاسوبية",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "إدارة قواعد البيانات وتحليل وتصميم نظم المعلومات لدعم المؤسسات.",
            careers: ["محلل نظم", "مدير قواعد بيانات", "مستشار IT"]
          },
          {
            name: "الأمن السيبراني",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "حماية الأنظمة والشبكات والبيانات من التهديدات والاختراقات الإلكترونية.",
            careers: ["محلل أمن سيبراني", "مختبر اختراق", "مستشار أمن معلومات"]
          },
          {
            name: "الذكاء الاصطناعي وعلم البيانات",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "35 دينار",
            description: "تحليل البيانات الضخمة وبناء نماذج الذكاء الاصطناعي وتعلم الآلة.",
            careers: ["عالم بيانات", "مهندس ذكاء اصطناعي", "مطور نماذج تعلم آلي"]
          }
        ]
      },
      {
        name: "كلية الأميرة عائشة بنت الحسين للتمريض والعلوم الصحية",
        icon: "⚕️",
        majors: [
          {
            name: "التمريض",
            hours: 132,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "20 دينار",
            description: "تأهيل كوادر تمريضية لتقديم الرعاية الصحية الشاملة للمرضى بمختلف الحالات.",
            careers: ["ممرض قانوني", "ممرض عناية حثيثة", "ممرض طوارئ", "مشرف تمريض"]
          },
          {
            name: "التصوير الإشعاعي",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "استخدام تقنيات التصوير الإشعاعي والطبقي والرنين المغناطيسي لتشخيص الأمراض.",
            careers: ["فني أشعة وتصوير طبي", "أخصائي تصوير رنين مغناطيسي", "مسؤول سلامة إشعاعية"]
          }
        ]
      },
      {
        name: "كلية إدارة الأعمال والاقتصاد",
        icon: "📊",
        majors: [
          {
            name: "إدارة الأعمال",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "الإدارة والتنظيم والتخطيط الاستراتيجي وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "مدير موارد بشرية", "رائد أعمال"]
          },
          {
            name: "المحاسبة",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "المحاسبة المالية والتدقيق والضرائب والتقارير المالية.",
            careers: ["محاسب مالي", "مدقق حسابات", "مستشار ضريبي"]
          },
          {
            name: "العلوم المالية والمصرفية",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "إدارة الأسواق المالية، الاستثمار، البنوك، وتحليل المخاطر.",
            careers: ["محلل مالي", "مصرفي", "مدير استثمار"]
          },
          {
            name: "الاقتصاد",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "دراسة الأسواق والسياسات الاقتصادية والتحليل الاقتصادي الكلي والجزئي.",
            careers: ["محلل اقتصادي", "باحث مالي", "مستشار اقتصادي"]
          },
          {
            name: "نظم المعلومات الإدارية",
            hours: 132,
            field: "أعمال/IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "توظيف تكنولوجيا المعلومات في تطوير وإدارة الأنظمة المؤسسية وحل المشكلات الإدارية.",
            careers: ["محلل نظم أعمال", "مدير مشاريع تقنية", "مستشار تحول رقمي"]
          }
        ]
      },
      {
        name: "كلية العلوم",
        icon: "🔬",
        majors: [
          {
            name: "العلوم الطبية المخبرية",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "إجراء التحاليل الطبية المخبرية السريرية للمساعدة في تشخيص وعلاج الأمراض.",
            careers: ["أخصائي مختبرات طبية", "فني بنك دم", "باحث طبي"]
          },
          {
            name: "الرياضيات",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "الرياضيات التطبيقية والبحتة والتحليل العددي والإحصاء.",
            careers: ["محلل بيانات", "مدرس رياضيات", "إحصائي"]
          },
          {
            name: "الفيزياء",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "الفيزياء النظرية والتطبيقية، البصريات، والإشعاع.",
            careers: ["فيزيائي", "باحث مختبر", "مدرس فيزياء"]
          },
          {
            name: "الكيمياء",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "الكيمياء العضوية والتحليلية وتطبيقاتها الصناعية والمخبرية.",
            careers: ["كيميائي صناعي", "فني مختبر", "مفتش جودة"]
          },
          {
            name: "العلوم الحياتية (الأحياء)",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "الكائنات الحية الدقيقة، علم الوراثة، والبيولوجيا الجزيئية.",
            careers: ["باحث بيولوجي", "فني مختبر", "أخصائي بيئة"]
          }
        ]
      },
      {
        name: "كلية البترا للسياحة والآثار",
        icon: "🏺",
        majors: [
          {
            name: "الآثار",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "التنقيب عن الآثار، ترميم المعالم التاريخية، ودراسة الحضارات القديمة (خاصة الأنباط).",
            careers: ["منقب آثار", "محافظ تراث", "مرشد سياحي ثقافي"]
          },
          {
            name: "الإدارة السياحية",
            hours: 132,
            field: "سياحة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "إدارة المؤسسات والشركات السياحية، والتسويق السياحي المحلي والدولي.",
            careers: ["مدير شركة سياحة", "مسؤول ترويج سياحي", "مرشد سياحي"]
          },
          {
            name: "إدارة الفنادق",
            hours: 132,
            field: "سياحة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "إدارة العمليات الفندقية، الضيافة، وإدارة الأغذية والمشروبات.",
            careers: ["مدير فندق", "مسؤول ضيافة", "مدير منتجع سياحي"]
          }
        ]
      },
      {
        name: "كلية الآداب",
        icon: "📚",
        majors: [
          {
            name: "اللغة العربية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "دراسة النحو، الصرف، البلاغة، والأدب العربي القديم والحديث.",
            careers: ["معلم لغة عربية", "كاتب ومحرر", "مصحح لغوي"]
          },
          {
            name: "اللغة الإنجليزية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "الأدب الإنجليزي، اللغويات، مهارات الاتصال، والترجمة.",
            careers: ["معلم لغة إنجليزية", "مترجم", "كاتب محتوى"]
          },
          {
            name: "التاريخ",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "التاريخ العربي والإسلامي والعالمي وتطور الحضارات.",
            careers: ["مؤرخ", "معلم تاريخ", "باحث تراثي"]
          },
          {
            name: "الجغرافيا",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "الجغرافيا الطبيعية والبشرية وتطبيقات نظم المعلومات الجغرافية (GIS).",
            careers: ["مخطط إقليمي", "أخصائي GIS", "باحث بيئي"]
          },
          {
            name: "العلاقات الدولية والدراسات الاستراتيجية",
            hours: 132,
            field: "سياسة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "العلاقات الدولية، الدبلوماسية، والسياسة الخارجية والدراسات الاستراتيجية.",
            careers: ["دبلوماسي", "محلل سياسي", "باحث استراتيجي"]
          }
        ]
      },
      {
        name: "كلية العلوم التربوية",
        icon: "📖",
        majors: [
          {
            name: "معلم الصف",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "تأهيل معلمين متخصصين لتدريس الصفوف التأسيسية الثلاثة الأولى.",
            careers: ["معلم صف", "مشرف مراحل أساسية", "مطور مناهج ابتدائية"]
          },
          {
            name: "التربية الخاصة",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "تعليم ودعم الأفراد ذوي الإعاقات والاحتياجات الخاصة وصعوبات التعلم.",
            careers: ["معلم تربية خاصة", "أخصائي صعوبات تعلم", "أخصائي تعديل سلوك"]
          },
          {
            name: "تربية الطفل",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "رعاية وتعليم الأطفال في سنوات الطفولة المبكرة (رياض الأطفال).",
            careers: ["معلمة رياض أطفال", "مشرفة حضانة", "أخصائية طفولة"]
          }
        ]
      }
    ]
  },
  8: {
    id: 8,
    name: "جامعة الطفيلة التقنية (TTU)",
    type: "public",
    location: "الطفيلة",
    icon: "⚙️",
    website: "https://www.ttu.edu.jo",
    facultiesData: [
      {
        name: "كلية الهندسة",
        icon: "🏗️",
        majors: [
          {
            name: "الهندسة المدنية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تصميم المنشآت والطرق والبنية التحتية، مع التركيز على التطبيقات التقنية والعملية.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مخطط مدني"]
          },
          {
            name: "الهندسة الكهربائية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "الأنظمة الكهربائية والإلكترونية، هندسة القوى، والطاقة المتجددة.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة متجددة", "مهندس قوى"]
          },
          {
            name: "الهندسة الميكانيكية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تصميم وصيانة الآلات الصناعية، وأنظمة التبريد والتكييف، والطاقة الحرارية.",
            careers: ["مهندس ميكانيك", "مهندس إنتاج", "مصمم أنظمة ميكانيكية", "مهندس صيانة"]
          },
          {
            name: "هندسة الميكاترونكس",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "دمج الهندسة الميكانيكية، والكهربائية، والبرمجة لتصميم أنظمة تحكم ذكية وروبوتات.",
            careers: ["مهندس ميكاترونكس", "مهندس أتمتة صناعية", "مبرمج أنظمة تحكم"]
          },
          {
            name: "هندسة الصناعات الكيميائية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تصميم العمليات الكيميائية وتطويرها وتطبيقها في الصناعات المختلفة (أدوية، أسمدة، بتروكيماويات).",
            careers: ["مهندس عمليات", "مهندس كيميائي", "مهندس جودة وإنتاج", "مفتش سلامة صناعية"]
          },
          {
            name: "هندسة الموارد الطبيعية والبيئة",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "هندسة التعدين، استخراج الموارد الطبيعية، وإدارة البيئة والمياه.",
            careers: ["مهندس تعدين", "مهندس بيئة", "خبير موارد طبيعية", "مهندس معالجة مياه"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات والاتصالات",
        icon: "💻",
        majors: [
          {
            name: "علم الحاسوب",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "البرمجة الأساسية والمتقدمة، تطوير البرمجيات، وهياكل البيانات.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات"]
          },
          {
            name: "هندسة البرمجيات",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "25 دينار",
            description: "منهجيات تطوير البرمجيات، إدارة المشاريع التقنية، وضمان جودة النظم.",
            careers: ["مهندس برمجيات", "مدير مشاريع تقنية", "مهندس DevOps"]
          },
          {
            name: "الذكاء الاصطناعي وعلم البيانات",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "تطوير تطبيقات الذكاء الاصطناعي، تعلم الآلة، وتحليل البيانات الضخمة.",
            careers: ["عالم بيانات", "مهندس ذكاء اصطناعي", "مطور نماذج تعلم آلي"]
          },
          {
            name: "الأمن السيبراني",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "30 دينار",
            description: "حماية الأنظمة والشبكات والبيانات واختبار الاختراق والتحليل الجنائي الرقمي.",
            careers: ["محلل أمن سيبراني", "مختبر اختراق", "مستشار أمن معلومات"]
          }
        ]
      },
      {
        name: "كلية العلوم",
        icon: "🔬",
        majors: [
          {
            name: "الرياضيات",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "الرياضيات التطبيقية والبحتة والإحصاء وحل النماذج الرياضية.",
            careers: ["محلل بيانات", "إحصائي", "مدرس رياضيات"]
          },
          {
            name: "الفيزياء التطبيقية",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "الفيزياء وتطبيقاتها العملية في مجالات الطاقة والإشعاع والتكنولوجيا.",
            careers: ["فيزيائي تطبيقي", "باحث مختبر", "فني أشعة (صناعي)"]
          },
          {
            name: "الكيمياء التطبيقية",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "الكيمياء التحليلية والصناعية وتطبيقاتها في فحص المواد وضبط الجودة.",
            careers: ["كيميائي صناعي", "فني مختبر", "مفتش جودة"]
          },
          {
            name: "العلوم الحياتية التطبيقية",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "الأحياء الدقيقة، علم الوراثة التطبيقي، والتكنولوجيا الحيوية.",
            careers: ["باحث بيولوجي", "فني مختبر", "مراقب جودة حيوية"]
          }
        ]
      },
      {
        name: "كلية الأعمال",
        icon: "📊",
        majors: [
          {
            name: "إدارة الأعمال",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "الإدارة والتنظيم والتخطيط الاستراتيجي، والموارد البشرية.",
            careers: ["مدير أعمال", "أخصائي موارد بشرية", "مستشار إداري"]
          },
          {
            name: "المحاسبة",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "المحاسبة المالية والإدارية، التدقيق، والضرائب.",
            careers: ["محاسب مالي", "مدقق حسابات", "مستشار ضريبي"]
          },
          {
            name: "الاقتصاد المالي",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "دمج النظريات الاقتصادية بالقطاع المالي والمصرفي وتحليل الأسواق.",
            careers: ["محلل اقتصادي", "محلل مالي", "باحث اقتصادي"]
          }
        ]
      },
      {
        name: "كلية الآداب",
        icon: "📚",
        majors: [
          {
            name: "اللغة الإنجليزية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "دراسة الأدب الإنجليزي واللغويات ومهارات الاتصال والترجمة.",
            careers: ["معلم لغة إنجليزية", "مترجم", "كاتب محتوى"]
          },
          {
            name: "اللغة العربية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "النحو، الصرف، البلاغة، والأدب العربي القديم والحديث.",
            careers: ["معلم لغة عربية", "مصحح لغوي", "محرر صحفي"]
          }
        ]
      },
      {
        name: "كلية العلوم التربوية",
        icon: "📖",
        majors: [
          {
            name: "معلم الصف",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "تأهيل معلمين متخصصين لتدريس الصفوف الابتدائية الثلاثة الأولى.",
            careers: ["معلم صف", "مشرف تربوي", "مطور مناهج ابتدائية"]
          },
          {
            name: "التربية الخاصة",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "تعليم وتأهيل الأفراد ذوي الإعاقات والاحتياجات الخاصة والموهوبين.",
            careers: ["معلم تربية خاصة", "أخصائي صعوبات تعلم", "مرشد سلوكي"]
          },
          {
            name: "تربية الطفل",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "15 دينار",
            description: "رعاية وتعليم الأطفال في سنوات الطفولة المبكرة ورياض الأطفال.",
            careers: ["معلمة رياض أطفال", "مشرفة حضانة", "أخصائية طفولة"]
          }
        ]
      }
    ]
  },
  9: {
    id: 9,
    name: "الجامعة الألمانية الأردنية (GJU)",
    type: "public",
    location: "مادبا (المشقر) / عمان",
    icon: "🏛️",
    website: "https://www.gju.edu.jo",
    facultiesData: [
      {
        name: "كلية العلوم التقنية التطبيقية",
        icon: "⚙️",
        majors: [
          {
            name: "هندسة الميكاترونكس",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "110 دينار",
            description: "برنامج مميز يجمع بين الميكانيكا والإلكترونيات والبرمجة لتصميم الأنظمة الذكية والروبوتات وتطبيقها في الصناعة الألمانية.",
            careers: ["مهندس ميكاترونكس", "مهندس أتمتة صناعية", "مصمم أنظمة تحكم ذكية", "مهندس أنظمة مدمجة"]
          },
          {
            name: "الهندسة الصناعية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "110 دينار",
            description: "تحسين العمليات الإنتاجية، وإدارة الجودة، وسلاسل التوريد في المصانع والشركات الصناعية المتقدمة.",
            careers: ["مهندس إنتاج", "مهندس جودة", "محلل عمليات صناعية", "مدير سلاسل توريد"]
          },
          {
            name: "هندسة الصيانة وإدارة الجودة",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "110 دينار",
            description: "تخصص هندسي تطبيقي يركز على إدارة عمليات الصيانة الصناعية وأنظمة إدارة الجودة والسلامة المهنية.",
            careers: ["مهندس صيانة", "مدير جودة ومقاييس", "مهندس سلامة صناعية"]
          }
        ]
      },
      {
        name: "كلية الهندسة",
        icon: "🏗️",
        majors: [
          {
            name: "الهندسة المدنية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "110 دينار",
            description: "تصميم المنشآت والبنية التحتية والموارد المائية مع تطبيق المعايير الهندسية الألمانية والمحلية.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مدير مشاريع", "مهندس تصميم مدني"]
          },
          {
            name: "الهندسة البيئية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "110 دينار",
            description: "حماية البيئة، معالجة المياه العادمة، وإدارة النفايات الصلبة والطاقة المتجددة.",
            careers: ["مهندس بيئي", "أخصائي معالجة مياه", "مستشار بيئي", "مهندس استدامة"]
          },
          {
            name: "هندسة الطاقة",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "110 دينار",
            description: "توليد الطاقة التقليدية والمتجددة، ورفع كفاءة استخدام الطاقة في القطاعات الصناعية والمباني.",
            careers: ["مهندس طاقة", "مهندس طاقة متجددة", "محلل نظم طاقة"]
          }
        ]
      },
      {
        name: "كلية الهندسة الكهربائية وتكنولوجيا المعلومات",
        icon: "💻",
        majors: [
          {
            name: "هندسة الحاسوب",
            hours: 160,
            field: "هندسي/IT",
            duration: "5 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "110 دينار",
            description: "تصميم وبناء الأجهزة والأنظمة الحاسوبية والشبكات، مع خبرة عملية في شركات التكنولوجيا الألمانية.",
            careers: ["مهندس حاسوب", "مهندس شبكات", "مطور أنظمة مدمجة"]
          },
          {
            name: "علم الحاسوب",
            hours: 132,
            field: "IT",
            duration: "4 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "100 دينار",
            description: "البرمجة الأساسية والمتقدمة، الخوارزميات، وتطوير البرمجيات مع تأهيل دولي متقدم.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات"]
          },
          {
            name: "علم البيانات والذكاء الاصطناعي",
            hours: 132,
            field: "IT",
            duration: "4 سنوات (تتضمن سنة في ألمانيا)",
            isNew: true,
            showCareers: false,
            hourlyFee: "100 دينار",
            description: "تحليل البيانات الضخمة، النمذجة التنبؤية، وتطوير وبناء تطبيقات الذكاء الاصطناعي.",
            careers: ["عالم بيانات", "مهندس ذكاء اصطناعي", "مطور نماذج تعلم آلي"]
          },
          {
            name: "الأمن السيبراني",
            hours: 132,
            field: "IT",
            duration: "4 سنوات (تتضمن سنة في ألمانيا)",
            isNew: true,
            showCareers: false,
            hourlyFee: "100 دينار",
            description: "حماية الأنظمة والشبكات والبيانات، واختبار الاختراق، وإدارة المخاطر الرقمية في بيئة عالمية.",
            careers: ["محلل أمن سيبراني", "مختبر اختراق", "مستشار أمن معلومات"]
          }
        ]
      },
      {
        name: "كلية الأعمال واللوجستيات",
        icon: "📊",
        majors: [
          {
            name: "العلوم اللوجستية",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "100 دينار",
            description: "تخصص مطلوب عالمياً في إدارة سلاسل التوريد والنقل والتخزين والعمليات اللوجستية محلياً ودولياً.",
            careers: ["مدير عمليات لوجستية", "أخصائي سلاسل توريد", "محلل تخطيط استراتيجي"]
          },
          {
            name: "إدارة الأعمال الدولية",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "100 دينار",
            description: "الأعمال الدولية، التجارة، التسويق، والاستثمار مع خبرة مباشرة في السوق الأوروبي وتطبيقاته.",
            careers: ["مدير أعمال دولية", "مسؤول تطوير أعمال", "مستشار تجاري"]
          },
          {
            name: "المحاسبة الدولية",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "100 دينار",
            description: "المحاسبة المالية والإدارية والتدقيق وفق معايير الإبلاغ المالي الدولية (IFRS).",
            careers: ["محاسب دولي", "مدقق حسابات خارجي", "مستشار مالي"]
          }
        ]
      },
      {
        name: "كلية العمارة والبيئة المبنية",
        icon: "📐",
        majors: [
          {
            name: "هندسة العمارة",
            hours: 165,
            field: "هندسي",
            duration: "5 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "110 دينار",
            description: "التصميم المعماري الإبداعي وتخطيط المدن بأسلوب يجمع الأصالة المحلية والثقافة المعمارية الألمانية.",
            careers: ["مهندس معماري", "مخطط مدن", "مصمم بيئة مبنية"]
          },
          {
            name: "التصميم والتواصل البصري",
            hours: 132,
            field: "فنون/تصميم",
            duration: "4 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "110 دينار",
            description: "دمج الفنون البصرية بالتكنولوجيا لتصميم الهويات البصرية والوسائط المتعددة وتجربة المستخدم.",
            careers: ["مصمم جرافيك", "مصمم تجربة مستخدم (UI/UX)", "مخرج فني"]
          }
        ]
      },
      {
        name: "كلية الإنسانيات التطبيقية واللغات",
        icon: "🗣️",
        majors: [
          {
            name: "الترجمة (ألماني/إنجليزي/عربي)",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "100 دينار",
            description: "الترجمة التحريرية والفورية بين اللغات الثلاث لتأهيل خريجين للعمل في المنظمات الدولية.",
            careers: ["مترجم فوري", "مترجم تحريري ثلاثي اللغات", "منسق دولي"]
          },
          {
            name: "اللغتين الألمانية والإنجليزية للأعمال والتواصل",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "100 دينار",
            description: "إتقان اللغات الألمانية والإنجليزية مع تطبيقاتها العملية في مجال الأعمال والتواصل المؤسسي.",
            careers: ["مسؤول علاقات دولية", "متخصص تواصل مؤسسي", "مترجم أعمال"]
          }
        ]
      },
      {
        name: "كلية العلوم الطبية التطبيقية",
        icon: "🔬",
        majors: [
          {
            name: "الهندسة الصيدلانية والكيميائية",
            hours: 160,
            field: "هندسي/صحي",
            duration: "5 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "110 دينار",
            description: "تصميم وتطوير العمليات الكيميائية لتصنيع الأدوية والمنتجات الصيدلانية، وهو تخصص نادر ومطلوب.",
            careers: ["مهندس صيدلاني", "مهندس كيميائي تطبيقي", "باحث أدوية وتطوير"]
          },
          {
            name: "الهندسة الطبية الحيوية",
            hours: 160,
            field: "هندسي/طبي",
            duration: "5 سنوات (تتضمن سنة في ألمانيا)",
            isNew: false,
            showCareers: false,
            hourlyFee: "110 دينار",
            description: "دمج مبادئ الهندسة مع العلوم الطبية لتطوير الأجهزة الطبية والرعاية الصحية بأحدث التقنيات الألمانية.",
            careers: ["مهندس أجهزة طبية", "مهندس صيانة تقنيات طبية", "مطور حلول صحية"]
          }
        ]
      }
    ]
  },
 10: {
    id: 10,
    name: "جامعة آل البيت (AABU)",
    type: "public",
    location: "المفرق",
    icon: "🏛️",
    website: "https://www.aabu.edu.jo",
    facultiesData: [
      {
        name: "كلية الأمير الحسين بن عبدالله الثاني لتكنولوجيا المعلومات",
        icon: "💻",
        majors: [
          {
            name: "علم الحاسوب (CS)",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "دراسة شاملة للبرمجة، الخوارزميات، وهياكل البيانات، مع التركيز على حل المشكلات برمجيا.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات", "باحث في علوم الحاسوب", "مطور ألعاب", "مهندس ذكاء اصطناعي"]
          },
          {
            name: "نظم المعلومات الحاسوبية (CIS)",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "الربط بين التكنولوجيا والأعمال من خلال إدارة قواعد البيانات وتطوير النظم المعلوماتية.",
            careers: ["محلل أعمال", "مدير مشاريع رقمية", "مستشار IT", "محلل نظم ERP", "مدير قواعد بيانات", "مطور"]
          },
          {
            name: "نظم المعلومات الإدارية (MIS/BIT)",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "دمج تكنولوجيا المعلومات بإدارة الأعمال وتطوير المنظومات التقنية للشركات.",
            careers: ["مستشار تحول رقمي", "مدير قواعد بيانات", "مهندس ERP", "محلل نظم IT", "مدير مشاريع حلول أعمال"]
          },
          {
            name: "الأمن السيبراني (CYS)",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: null,
            description: "حماية الأنظمة والشبكات من الهجمات الرقمية وتأمين البيانات الحساسة.",
            careers: ["محلل تهديدات", "مستشار أمن", "محلل أمن سيبراني (CISO)", "مختبر اختراق", "مدير أمن معلومات", "محقق جرائم إلكترونية"]
          },
          {
            name: "علم البيانات والذكاء الاصطناعي (AI)",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: null,
            description: "تحليل البيانات الضخمة وبناء نماذج الذكاء الاصطناعي وتطوير تعلم الآلة.",
            careers: ["مهندس MLOps", "مهندس ذكاء اصطناعي AI", "عالم بيانات", "مطور نماذج تعلم عميق", "باحث محلل بيانات متقدم"]
          },
          {
            name: "نظم المعلومات الصحية (HIS)",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: null,
            description: "إدارة وتطوير الأنظمة التقنية المستخدمة في المستشفيات وقطاع الرعاية الصحية.",
            careers: ["محلل نظم صحية", "مدير بيانات طبية", "مطور برامج رعاية صحية", "مستشار IT طبي"]
          },
          {
            name: "تطوير تطبيقات الأجهزة الذكية",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: null,
            description: "تصميم وبرمجة تطبيقات الهواتف الذكية والأجهزة اللوحية (Android & iOS).",
            careers: ["مطور تطبيقات هواتف", "مبرمج Android/iOS", "مهندس برمجيات", "مطور واجهات ذكية"]
          }
        ]
      },
      {
        name: "كلية العلوم الطبية التطبيقية",
        icon: "🔬",
        majors: [
          {
            name: "العلوم الطبية المخبرية",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "75 دينار",
            description: "إجراء التحاليل المخبرية السريرية للمساعدة في تشخيص الأمراض وعلاجها.",
            careers: ["أخصائي مختبرات طبية", "باحث طبي", "فني بنك دم", "مفتش جودة طبية", "فني تحاليل", "محلل كيمياء حيوية"]
          },
          {
            name: "التغذية السريرية والحميات",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: null,
            description: "تقييم الحالة الغذائية للمرضى وتصميم برامج غذائية علاجية للوقاية من الأمراض.",
            careers: ["أخصائي تغذية", "فني صناعات غذائية", "مفتش جودة غذاء", "باحث في سلامة الغذاء", "مستشار تغذية"]
          },
          {
            name: "علوم السمع والنطق",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "75 دينار",
            description: "تشخيص وعلاج اضطرابات السمع والنطق واللغة والتواصل لدى مختلف الفئات العمرية.",
            careers: ["أخصائي سمع ونطق", "معالج لغوي", "باحث في اضطرابات التواصل", "أخصائي تأهيل"]
          },
          {
            name: "العلاج الوظيفي",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: null,
            description: "تأهيل الأشخاص الذين يعانون من إعاقات جسدية أو نفسية لاستعادة استقلاليتهم في الحياة اليومية.",
            careers: ["أخصائي علاج وظيفي", "مستشار تأهيل مجتمعي", "أخصائي دمج", "مقوم حركي"]
          },
          {
            name: "العلاج الطبيعي",
            hours: 136,
            field: "صحي",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: null,
            description: "تقييم وعلاج الاضطرابات الحركية الناتجة عن الإصابات أو الأمراض باستخدام التقنيات الفيزيائية.",
            careers: ["أخصائي علاج طبيعي", "أخصائي تأهيل رياضي", "مدير مركز علاج طبيعي", "معالج فيزيائي"]
          }
        ]
      },
      {
        name: "كلية التمريض",
        icon: "⚕️",
        majors: [
          {
            name: "التمريض",
            hours: 132,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "تأهيل كوادر تمريضية لتقديم الرعاية الصحية الشاملة في المستشفيات والمراكز.",
            careers: ["ممرض مستشفيات", "ممرض عناية مركزة", "ممرض غرفة عمليات", "ممرض مجتمعي", "مشرف تمريض"]
          }
        ]
      },
      {
        name: "كلية الهندسة",
        icon: "🏗️",
        majors: [
          {
            name: "الهندسة المدنية",
            hours: 162,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "60 دينار",
            description: "تصميم وتنفيذ البنى التحتية، الجسور والمباني وإدارة مواقع البناء.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مهندس مقاولات", "مخطط مدني"]
          },
          {
            name: "هندسة العمارة",
            hours: 165,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "60 دينار",
            description: "تصميم المباني والفضاءات المعمارية مع الاهتمام بالتراث واستدامة المنشآت.",
            careers: ["مهندس معماري", "مصمم داخلي", "مخطط عمراني", "باحث تراث", "مدير مشاريع بناء"]
          },
          {
            name: "هندسة المساحة",
            hours: 162,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "المسح الجيوديسي، الخرائط الرقمية، ونظم المعلومات الجغرافية (GIS) للأغراض الإنشائية.",
            careers: ["مهندس مساحة", "أخصائي مسح جوي", "خبير تسوية أراضي", "مهندس GIS"]
          },
          {
            name: "هندسة الطاقة المتجددة والمستدامة",
            hours: 162,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "تصميم وإدارة أنظمة الطاقة الشمسية وطاقة الرياح والتقنيات الخضراء.",
            careers: ["مهندس طاقة شمسية", "مستشار طاقة مستدامة", "مصمم محطات طاقة", "مهندس طاقة رياح"]
          },
          {
            name: "الهندسة الصناعية",
            hours: 162,
            field: "هندسي/إداري",
            duration: "5 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "75 دينار",
            description: "تحسين وتطوير العمليات الصناعية والأنظمة لزيادة الكفاءة وتقليل التكاليف.",
            careers: ["مهندس إنتاج", "مدير جودة", "محلل سلاسل توريد", "مستشار عمليات صناعية"]
          }
        ]
      },
      {
        name: "كلية الأعمال",
        icon: "📊",
        majors: [
          {
            name: "إدارة الأعمال",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "أساسيات الإدارة، التسويق، الموارد البشرية، والتخطيط الاستراتيجي.",
            careers: ["مدير أعمال", "مسؤول تسويق", "مدير موارد بشرية", "رائد أعمال", "مستشار إداري"]
          },
          {
            name: "المحاسبة",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "إدارة السجلات المالية، التدقيق، والتقارير المالية للمؤسسات.",
            careers: ["مستشار ضريبي", "محاسب قانوني (CPA)", "مدقق حسابات", "محلل مالي", "مدير مالي"]
          },
          {
            name: "التمويل والمصارف",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "إدارة الاستثمارات، العمليات البنكية، والأسواق المالية.",
            careers: ["محلل مالي", "مصرفي", "مدير استثمار", "محلل أسواق مالية", "مدير مخاطر"]
          },
          {
            name: "الاقتصاد الرقمي",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "التحليل الاقتصادي للأسواق الرقمية والتجارة الإلكترونية واتخاذ القرارات.",
            careers: ["محلل اقتصادي", "مستشار حكومي", "باحث اقتصادي", "محلل أسواق إلكترونية"]
          },
          {
            name: "النظم المحاسبية وتحليل الأعمال",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "50 دينار",
            description: "الدمج بين التقنيات الحاسوبية والعمليات المحاسبية واستخراج البيانات المالية.",
            careers: ["محاسب تقني", "مدقق أنظمة مالية", "محلل أعمال"]
          },
          {
            name: "محاسبة وقانون الأعمال",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "55 دينار",
            description: "الجمع بين المهارات المحاسبية ومعرفة الإطار القانوني للشركات والتجارة.",
            careers: ["مستشار ضريبي وقانوني", "خبير عقود تجارية", "مدقق قانوني"]
          },
          {
            name: "تكنولوجيا مالية (FinTech)",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "55 دينار",
            description: "تطبيق التكنولوجيا في القطاع المالي، مثل الدفع الإلكتروني والعملات الرقمية والبنوك الذكية.",
            careers: ["محلل تكنولوجيا مالية", "مطور تطبيقات بنكية", "خبير بلوكتشين مالي"]
          },
          {
            name: "التسويق الرقمي",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "65 دينار",
            description: "استراتيجيات التسويق عبر الإنترنت، تحليل السلوك الرقمي للمستهلكين، وإدارة الحملات الإعلانية.",
            careers: ["أخصائي تسويق رقمي", "مدير حملات إعلانية", "محلل سلوك مستهلك"]
          },
          {
            name: "الإدارة اللوجستية",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: "75 دينار",
            description: "إدارة سلاسل الإمداد، النقل، التخزين، وتوزيع المنتجات بكفاءة.",
            careers: ["مدير جودة لوجستية", "محلل سلاسل توريد", "مدير مستودعات وعمليات"]
          }
        ]
      },
      {
        name: "كلية العلوم",
        icon: "🔬",
        majors: [
          {
            name: "الرياضيات",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "دراسة النظريات الرياضية، الإحصاء، والنمذجة التي تخدم العلوم والتكنولوجيا.",
            careers: ["أكاديمي وباحث", "محلل إحصاء", "عالم بيانات", "مطور خوارزميات"]
          },
          {
            name: "الفيزياء",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "فهم قوانين الكون، المادة، والطاقة مع تطبيقات في المختبرات والبحث العلمي.",
            careers: ["باحث في المختبرات", "مهندس فيزيائي", "محلل في شركات طاقة", "مدرس فيزياء"]
          },
          {
            name: "الكيمياء",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "دراسة العناصر والتفاعلات الكيميائية وتطبيقاتها في الصناعة والدواء.",
            careers: ["كيميائي مختبرات", "باحث صناعة دواء", "مفتش جودة", "كيميائي شرعي"]
          },
          {
            name: "العلوم الحياتية (الأحياء)",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "دراسة الكائنات الحية، علم الوراثة، والأحياء الدقيقة وتفاعلاتها البيئية.",
            careers: ["باحث بيولوجي", "فني مختبر", "عالم وراثة", "متخصص بيئة"]
          },
          {
            name: "علوم الأرض والبيئة التطبيقية",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "دراسة الجيولوجيا، المعادن، والموارد المائية وتأثيراتها البيئية.",
            careers: ["مهندس بيئة", "مستشار بيئي", "باحث في سلطة المياه"]
          },
          {
            name: "نظم المعلومات الجغرافية والاستشعار عن بعد (GIS)",
            hours: 132,
            field: "علمي",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: null,
            description: "تحليل البيانات المكانية والخرائط الرقمية باستخدام الأقمار الصناعية وتقنيات GIS.",
            careers: ["مخطط تعمير", "باحث بيئي", "مستشار تخطيط", "أخصائي GIS"]
          }
        ]
      },
      {
        name: "كلية الآداب والعلوم الإنسانية واللغات",
        icon: "📚",
        majors: [
          {
            name: "اللغة العربية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "دراسة الأدب العربي، النحو، البلاغة، والتراث اللغوي.",
            careers: ["معلم لغة عربية", "كاتب ومحرر", "مصحح لغوي", "صحفي"]
          },
          {
            name: "اللغة الإنجليزية وآدابها",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "الأدب الإنجليزي، اللغويات، ومهارات الترجمة والاتصال.",
            careers: ["معلم لغة إنجليزية", "مترجم", "محرر محتوى", "كاتب محترف"]
          },
          {
            name: "اللغة والأدب / فرنسي - إنجليزي",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "دراسة مزدوجة للغتين الفرنسية والإنجليزية وآدابهما لتعزيز مهارات الترجمة والتواصل.",
            careers: ["مترجم مزدوج", "معلم لغات", "منسق علاقات دولية"]
          },
          {
            name: "اللغة والأدب / إيطالي - إنجليزي",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "دراسة اللغة والثقافة الإيطالية والإنجليزية لفتح آفاق في التجارة والسياحة والترجمة.",
            careers: ["مترجم سياحي", "مسؤول تواصل ثقافي", "معلم لغات"]
          },
          {
            name: "اللغة والأدب / إسباني - إنجليزي",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "إتقان اللغتين الإسبانية والإنجليزية، مما يوفر فرصاً واسعة في الترجمة والمنظمات الدولية.",
            careers: ["مترجم دولي", "مسؤول تواصل مؤسسي", "مرشد سياحي"]
          },
          {
            name: "التاريخ",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "تحليل الأحداث التاريخية والحضارات الإنسانية وتطور المجتمعات.",
            careers: ["مؤرخ", "أكاديمي وباحث", "معلم تاريخ", "محافظ تراث"]
          },
          {
            name: "جغرافيا تطبيقية",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "دراسة الظواهر الطبيعية والبشرية وتطبيقها في التخطيط الحضري والبيئي.",
            careers: ["مخطط تعمير", "باحث بيئي", "مستشار تخطيط إقليمي"]
          }
        ]
      },
      {
        name: "كلية بيت الحكمة للعلوم السياسية والدراسات الدولية",
        icon: "🌍",
        majors: [
          {
            name: "العلوم السياسية",
            hours: 132,
            field: "سياسة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "45 دينار",
            description: "دراسة الأنظمة السياسية، العلاقات الدولية، السياسة العامة، والدبلوماسية.",
            careers: ["دبلوماسي", "محلل سياسي", "مستشار حكومي", "عامل في منظمات دولية"]
          }
        ]
      },
      {
        name: "كلية العلوم التربوية",
        icon: "📖",
        majors: [
          {
            name: "معلم الصف",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "تأهيل معلمين متخصصين لتدريس المراحل الأساسية من الصف الأول للثالث.",
            careers: ["معلم صف", "مشرف تعليم أساسي", "مرشد تربوي"]
          },
          {
            name: "التربية الخاصة",
            hours: 132,
            field: "تربوي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "تعليم ودعم الطلبة ذوي الاحتياجات الخاصة وصعوبات التعلم.",
            careers: ["معلم تربية خاصة", "أخصائي صعوبات تعلم", "معالج سلوكي", "مشرف مراكز خاصة"]
          },
          {
            name: "التربية البدنية",
            hours: 132,
            field: "رياضي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "إعداد معلمي ومدربي التربية الرياضية وعلوم الحركة.",
            careers: ["مدرب رياضي", "معلم تربية بدنية", "مدير مرافق رياضية", "محلل أداء رياضي"]
          }
        ]
      },
      {
        name: "كلية الشريعة",
        icon: "🕌",
        majors: [
          {
            name: "الفقه وأصوله",
            hours: 132,
            field: "شريعة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "دراسة الأحكام الشرعية العملية وقواعد استنباطها من المصادر الأصلية.",
            careers: ["قاض شرعي", "مفتي", "إمام مسجد", "مستشار شرعي"]
          },
          {
            name: "أصول الدين",
            hours: 132,
            field: "شريعة",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "دراسة العقيدة، التفسير، الحديث الشريف، وعلوم القرآن.",
            careers: ["معلم دراسات إسلامية", "داعية", "باحث شرعي"]
          },
          {
            name: "دراسات في الأديان",
            hours: 132,
            field: "شريعة",
            duration: "4 سنوات",
            isNew: true,
            showCareers: false,
            hourlyFee: null,
            description: "دراسة مقارنة وعميقة للأديان والمذاهب لتعزيز الحوار والفهم العقائدي.",
            careers: ["باحث في الأديان", "منسق حوار ثقافي", "أكاديمي متخصص"]
          }
        ]
      },
      {
        name: "كلية القانون",
        icon: "⚖️",
        majors: [
          {
            name: "الحقوق",
            hours: 132,
            field: "قانون",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "دراسة التشريعات المدنية، الجزائية، والإدارية الأردنية والدولية.",
            careers: ["محام", "قاض", "مستشار قانوني", "مدعي عام", "موثق عقود"]
          }
        ]
      }
    ]
  },
  11: {
    id: 11,
    name: "جامعة الأميرة سمية للتكنولوجيا (PSUT)",
    type: "private",
    location: "عمان - خليل السالم",
    icon: "🚀",
    website: "https://www.psut.edu.jo",
    facultiesData: [
      {
        name: "كلية الملك الحسين لعلوم الحوسبة",
        icon: "💻",
        majors: [
          {
            name: "علم الحاسوب",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "75 دينار",
            description: "من أفضل كليات الـ IT في المنطقة، تتميز ببيئة تعليمية متطورة وشراكات تقنية مع كبرى الشركات العالمية.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات", "باحث في علوم الحاسوب"]
          },
          {
            name: "هندسة البرمجيات",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "75 دينار",
            description: "تطوير البرمجيات المتقدمة، وإدارة المشاريع التقنية، وضمان جودة الأنظمة البرمجية.",
            careers: ["مهندس برمجيات", "مدير مشاريع تقنية", "مهندس DevOps", "مهندس جودة برمجيات"]
          },
          {
            name: "علم الرسم الحاسوبي",
            hours: 132,
            field: "IT/فنون",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "75 دينار",
            description: "تخصص يجمع بين البرمجة والفنون لإنتاج الرسوم المتحركة، الألعاب الإلكترونية، والواقع الافتراضي.",
            careers: ["مطور ألعاب", "مصمم رسوم متحركة 3D", "مطور واقع افتراضي", "مصمم جرافيك تقني"]
          },
          {
            name: "الأمن السيبراني",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "85 دينار",
            description: "تخصص متقدم ومطلوب جداً في حماية الأنظمة والشبكات والبيانات واختبار الاختراق.",
            careers: ["محلل أمن سيبراني", "مختبر اختراق", "مستشار أمن معلومات", "محقق جرائم إلكترونية"]
          },
          {
            name: "الذكاء الاصطناعي",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "85 دينار",
            description: "تعلم الآلة، الشبكات العصبية، معالجة اللغات الطبيعية، وتطوير الأنظمة الذكية.",
            careers: ["مهندس ذكاء اصطناعي", "مطور نماذج تعلم آلي", "باحث تقني"]
          },
          {
            name: "علم البيانات",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "75 دينار",
            description: "تحليل البيانات الضخمة (Big Data) واستخراج الأنماط لدعم اتخاذ القرارات الاستراتيجية.",
            careers: ["عالم بيانات", "محلل بيانات متقدم", "مهندس بيانات"]
          }
        ]
      },
      {
        name: "كلية الملك عبدالله الثاني للهندسة",
        icon: "🏗️",
        majors: [
          {
            name: "هندسة الحاسوب",
            hours: 160,
            field: "هندسي/IT",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "75 دينار",
            description: "تصميم المعالجات والأنظمة المدمجة والمكونات المادية للأنظمة الذكية.",
            careers: ["مهندس أجهزة حاسوب", "مطور أنظمة مدمجة", "مهندس تصميم عتاد"]
          },
          {
            name: "هندسة الاتصالات",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "75 دينار",
            description: "تصميم وتطوير أنظمة الاتصالات السلكية واللاسلكية الحديثة (مثل شبكات 5G).",
            careers: ["مهندس اتصالات", "مهندس شبكات خلوية", "محلل أنظمة بث"]
          },
          {
            name: "الهندسة الإلكترونية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "75 دينار",
            description: "تصميم وتطوير الدوائر الإلكترونية والأنظمة الدقيقة المستخدمة في التكنولوجيا الحديثة.",
            careers: ["مهندس إلكترونيات", "مهندس صيانة تقنية", "مصمم لوحات إلكترونية"]
          },
          {
            name: "هندسة القدرة والطاقة الكهربائية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "75 دينار",
            description: "توليد ونقل وتوزيع الطاقة الكهربائية وتطبيقات الطاقة المتجددة والشبكات الذكية.",
            careers: ["مهندس قوى كهربائية", "مهندس طاقة متجددة", "مهندس محطات قوى"]
          },
          {
            name: "هندسة الشبكات وأمن المعلومات",
            hours: 160,
            field: "هندسي/IT",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "75 دينار",
            description: "تصميم شبكات الحاسوب الآمنة وإدارة البنية التحتية وحمايتها من الاختراقات.",
            careers: ["مهندس شبكات", "مهندس أمن شبكات", "مستشار بنية تحتية"]
          }
        ]
      },
      {
        name: "كلية الملك طلال لتكنولوجيا الأعمال",
        icon: "📊",
        majors: [
          {
            name: "إدارة الأعمال",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "65 دينار",
            description: "الإدارة والتسويق وريادة الأعمال بتركيز عالٍ على التكنولوجيا والابتكار.",
            careers: ["مدير أعمال", "رائد أعمال", "مستشار إداري", "مدير موارد بشرية"]
          },
          {
            name: "المحاسبة",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "65 دينار",
            description: "المحاسبة المالية والتدقيق واستخدام الأنظمة المحاسبية التقنية الحديثة.",
            careers: ["محاسب مالي", "مدقق حسابات", "محلل مالي", "مستشار ضريبي"]
          },
          {
            name: "نظم المعلومات الإدارية",
            hours: 132,
            field: "أعمال/IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "65 دينار",
            description: "إدارة المعلومات وقواعد البيانات وتوظيفها لخدمة العمليات الإدارية واتخاذ القرار.",
            careers: ["محلل نظم أعمال", "مدير قواعد بيانات", "مدير مشاريع IT"]
          },
          {
            name: "التسويق الإلكتروني والتواصل الاجتماعي",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "65 دينار",
            description: "التسويق الرقمي وإدارة الحملات عبر وسائل التواصل الاجتماعي وتحليل سلوك المستهلك الرقمي.",
            careers: ["أخصائي تسويق رقمي", "مدير منصات تواصل اجتماعي", "محلل بيانات تسويقية"]
          },
          {
            name: "تكنولوجيا معلومات الأعمال",
            hours: 132,
            field: "أعمال/IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: "65 دينار",
            description: "استخدام أدوات التكنولوجيا المتقدمة وتطوير التطبيقات لخدمة وتطوير قطاع الأعمال.",
            careers: ["محلل أعمال تقني", "مطور حلول أعمال", "مستشار تحول رقمي"]
          }
        ]
      }
    ]
  },
  12: {
    id: 12, name: "جامعة العلوم التطبيقية (ASU)", type: "private", location: "عمان", icon: "🌐", website: "https://www.asu.edu.jo",
    facultiesData: [
      {
        name: "كلية الصيدلة", icon: "💊",
        majors: [
          {
            name: "صيدلة", hours: 160, field: "صحي", duration: "4-5 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "كلية معتمدة دولياً تدرّس الصيدلة المجتمعية والإكلينيكية وصناعة الدواء.",
            careers: ["صيدلاني إكلينيكي", "مدير صيدلية", "مندوب طبي", "باحث في صناعة الدواء", "صيدلاني مستشفى", "مفتش دوائي"]
          }
        ]
      },
      {
        name: "كلية الهندسة", icon: "🏗️",
        majors: [
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "تصميم المنشآت والبنية التحتية.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مهندس في شركات المقاولات", "مخطط مدني", "مهندس بلدية"]
          },
          {
            name: "هندسة كهربائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "الأنظمة الكهربائية والاتصالات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة متجددة", "مهندس في شركات الكهرباء", "مصمم أنظمة كهربائية", "مهندس صيانة"]
          },
          {
            name: "هندسة ميكانيكية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "تصميم الآلات والأنظمة الصناعية.",
            careers: ["مهندس ميكانيك", "مهندس إنتاج", "مصمم منتجات", "مهندس صيانة", "مهندس طاقة", "مهندس سيارات"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات", icon: "💻",
        majors: [
          {
            name: "علم الحاسوب", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "البرمجة وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات", "باحث في علوم الحاسوب", "مطور ألعاب", "مهندس ذكاء اصطناعي"]
          },
          {
            name: "هندسة البرمجيات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "تطوير وإدارة مشاريع البرمجيات.",
            careers: ["مهندس برمجيات", "مدير مشاريع تقنية", "مطور تطبيقات", "مهندس جودة برمجيات", "مهندس DevOps", "مهندس حلول سحابية"]
          }
        ]
      },
      {
        name: "كلية الأعمال", icon: "💼",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "الإدارة والتسويق وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "مدير موارد بشرية", "رائد أعمال", "مستشار إداري", "مدير مبيعات"]
          },
          {
            name: "محاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "المحاسبة المالية والتدقيق والضرائب.",
            careers: ["محاسب قانوني", "مدقق حسابات", "محلل مالي", "مدير مالي (CFO)", "مستشار ضريبي", "محاسب حكومي"]
          }
        ]
      }
    ]
  },
  13: {
    id: 13,
    name: "جامعة البترا (UOP)",
    type: "private",
    location: "عمان - طارق",
    icon: "🏛️",
    website: "https://www.uop.edu.jo",
    facultiesData: [
      {
        name: "كلية العمارة والتصميم",
        icon: "📐",
        majors: [
          {
            name: "هندسة العمارة",
            hours: 165,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "بيئة إبداعية مميزة لتعلم التصميم المعماري وتخطيط المدن في بيئة خاصة متميزة.",
            careers: ["مهندس معماري", "مصمم داخلي", "مخطط عمراني", "باحث في التراث", "مدير مشاريع بناء"]
          },
          {
            name: "التصميم الجرافيكي",
            hours: 132,
            field: "فنون/تصميم",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "تصميم الهويات البصرية والمواد الإعلانية الرقمية والمطبوعة، وتجربة المستخدم (UI/UX).",
            careers: ["مصمم في وكالات إعلان", "مصمم جرافيك", "مصمم UI/UX", "مصمم هوية بصرية", "مدير فني"]
          },
          {
            name: "تصميم أزياء",
            hours: 132,
            field: "فنون/تصميم",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "تصميم الملابس والأزياء ومعرفة صناعة النسيج وتقنيات الإنتاج الحديثة.",
            careers: ["مصمم أزياء", "مصمم في دور الأزياء", "مدير إنتاج ملابس", "أخصائي تسويق أزياء", "مستشار موضة"]
          }
        ]
      },
      {
        name: "كلية الصيدلة",
        icon: "💊",
        majors: [
          {
            name: "صيدلة",
            hours: 160,
            field: "صحي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "دراسة الصيدلة في جامعة البترا المعروفة بالتميز الأكاديمي والبحثي في العلوم الصيدلانية.",
            careers: ["صيدلاني إكلينيكي", "مدير صيدلية", "مندوب طبي", "باحث في صناعة الدواء", "صيدلاني مستشفى", "مفتش دوائي"]
          }
        ]
      },
      {
        name: "كلية الهندسة",
        icon: "🏗️",
        majors: [
          {
            name: "هندسة مدنية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "تصميم المنشآت والبنية التحتية، الطرق، وإدارة المشاريع الإنشائية بكفاءة.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مهندس في شركات المقاولات", "مخطط مدني"]
          },
          {
            name: "هندسة كهربائية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "الأنظمة الكهربائية، الإلكترونيات، الاتصالات، وتطبيقات الطاقة المتجددة.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة متجددة", "مهندس في شركات الكهرباء", "مصمم أنظمة"]
          }
        ]
      },
      {
        name: "كلية الأعمال",
        icon: "📊",
        majors: [
          {
            name: "إدارة أعمال",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "الإدارة الاستراتيجية، التسويق، ريادة الأعمال، وإدارة العمليات التجارية.",
            careers: ["مدير أعمال", "مسؤول تسويق", "مدير موارد بشرية", "رائد أعمال", "مستشار إداري", "مدير مبيعات"]
          },
          {
            name: "محاسبة",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "المحاسبة المالية والتدقيق والضرائب وإعداد التقارير المالية للمؤسسات.",
            careers: ["مستشار ضريبي", "محاسب قانوني", "مدقق حسابات", "محلل مالي", "مدير مالي"]
          }
        ]
      }
    ]
  },
  14: {
    id: 14,
    name: "جامعة الزيتونة الأردنية (ZUJ)",
    type: "private",
    location: "عمان",
    icon: "🏛️",
    website: "https://www.zuj.edu.jo",
    facultiesData: [
      {
        name: "كلية الصيدلة",
        icon: "💊",
        majors: [
          {
            name: "صيدلة",
            hours: 160,
            field: "صحي",
            duration: "4-5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "دراسة شاملة للصيدلة في بيئة تعليمية متميزة.",
            careers: ["صيدلاني إكلينيكي", "مدير صيدلية", "مندوب طبي", "باحث في صناعة الدواء", "صيدلاني مستشفى", "مفتش دوائي"]
          }
        ]
      },
      {
        name: "كلية التمريض",
        icon: "⚕️",
        majors: [
          {
            name: "تمريض",
            hours: 132,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "تأهيل ممرضين متخصصين للعمل في المستشفيات والمراكز الصحية.",
            careers: ["ممرض / ممرضة في مستشفيات", "ممرض عناية مركزة", "ممرض غرفة عمليات", "ممرض مجتمعي", "مشرف تمريض"]
          }
        ]
      },
      {
        name: "كلية الهندسة",
        icon: "🏗️",
        majors: [
          {
            name: "هندسة مدنية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "تصميم المنشآت والطرق.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مهندس في شركات المقاولات", "مخطط مدني"]
          },
          {
            name: "هندسة كهربائية",
            hours: 160,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "الأنظمة الكهربائية والإلكترونيات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة متجددة", "مهندس في شركات الكهرباء", "مصمم أنظمة"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات",
        icon: "💻",
        majors: [
          {
            name: "علم الحاسوب",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "البرمجة وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات", "باحث في علوم الحاسوب", "مطور ألعاب", "مهندس ذكاء اصطناعي"]
          }
        ]
      },
      {
        name: "كلية الأعمال",
        icon: "📊",
        majors: [
          {
            name: "إدارة أعمال",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: 70,
            description: "الإدارة والتسويق وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "مدير موارد بشرية", "رائد أعمال", "مستشار إداري", "مدير مبيعات"]
          },
          {
            name: "محاسبة",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "المحاسبة المالية والتدقيق.",
            careers: ["مستشار ضريبي", "محاسب قانوني", "مدقق حسابات", "محلل مالي", "مدير مالي"]
          }
        ]
      }
    ]
  },
  15: {
    id: 15, name: "جامعة فيلادلفيا", type: "private", location: "جرش", icon: "📖", website: "https://www.philadelphia.edu.jo",
    facultiesData: [
      {
        name: "كلية الصيدلة", icon: "💊",
        majors: [
          {
            name: "صيدلة", hours: 160, field: "صحي", duration: "4-5 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "دراسة الصيدلة في جامعة فيلادلفيا في جرش.",
            careers: ["صيدلاني إكلينيكي", "مدير صيدلية", "مندوب طبي", "باحث في صناعة الدواء", "صيدلاني مستشفى", "مفتش دوائي"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات", icon: "💻",
        majors: [
          {
            name: "هندسة برمجيات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "تطوير البرمجيات وإدارة مشاريع التطوير.",
            careers: ["مهندس برمجيات", "مدير مشاريع تقنية", "مطور تطبيقات", "مهندس جودة برمجيات", "مهندس DevOps", "مهندس حلول سحابية"]
          },
          {
            name: "نظم المعلومات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "إدارة المعلومات وقواعد البيانات.",
            careers: ["محلل نظم", "مدير قواعد بيانات", "مطور ERP", "مستشار IT", "محلل أعمال", "مدير مشاريع رقمية"]
          }
        ]
      },
      {
        name: "كلية الهندسة", icon: "🏗️",
        majors: [
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "تصميم المنشآت والطرق.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مهندس في شركات المقاولات", "مخطط مدني", "مهندس بلدية"]
          },
          {
            name: "هندسة كهربائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "الأنظمة الكهربائية والإلكترونيات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة متجددة", "مهندس في شركات الكهرباء", "مصمم أنظمة كهربائية", "مهندس صيانة"]
          }
        ]
      },
      {
        name: "كلية الأعمال", icon: "💼",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "الإدارة والتسويق وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "مدير موارد بشرية", "رائد أعمال", "مستشار إداري", "مدير مبيعات"]
          },
          {
            name: "محاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "المحاسبة المالية والتدقيق.",
            careers: ["محاسب قانوني", "مدقق حسابات", "محلل مالي", "مدير مالي (CFO)", "مستشار ضريبي", "محاسب حكومي"]
          }
        ]
      },
      {
        name: "كلية الآداب والفنون", icon: "🎭",
        majors: [
          {
            name: "إعلام وصحافة", hours: 132, field: "أدبي", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "الصحافة والإعلام الرقمي والعلاقات العامة.",
            careers: ["صحفي", "مقدم برامج", "محرر صحفي", "متخصص علاقات عامة", "مدير محتوى رقمي", "مراسل إخباري"]
          }
        ]
      }
    ]
  },
  16: {
    id: 16,
    name: "الجامعة الأمريكية في مادبا (AUM)",
    type: "private",
    location: "مادبا",
    icon: "🏛️",
    website: "https://aum.edu.jo",
    facultiesData: [
      {
        name: "كلية الهندسة",
        icon: "🏗️",
        majors: [
          {
            name: "هندسة مدنية",
            hours: 160,
            field: "هندسي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "تصميم المنشآت والبنية التحتية بأسلوب أمريكي.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مهندس في شركات المقاولات", "مخطط مدني"]
          },
          {
            name: "هندسة كهربائية",
            hours: 160,
            field: "هندسي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "الأنظمة الكهربائية والاتصالات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة متجددة", "مهندس في شركات الكهرباء", "مصمم أنظمة"]
          }
        ]
      },
      {
        name: "كلية العلوم الصحية",
        icon: "⚕️",
        majors: [
          {
            name: "صيدلة",
            hours: 160,
            field: "صحي",
            duration: "4-5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "دراسة الصيدلة بمنهج أمريكي في بيئة متطورة.",
            careers: ["صيدلاني إكلينيكي", "مدير صيدلية", "مندوب طبي", "باحث في صناعة الدواء", "صيدلاني مستشفى", "مفتش دوائي"]
          },
          {
            name: "تمريض",
            hours: 132,
            field: "صحي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "تأهيل ممرضين متخصصين.",
            careers: ["ممرض / ممرضة في مستشفيات", "ممرض عناية مركزة", "ممرض غرفة عمليات", "ممرض مجتمعي", "مشرف تمريض"]
          }
        ]
      },
      {
        name: "كلية الأعمال",
        icon: "📊",
        majors: [
          {
            name: "إدارة أعمال",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "الإدارة والتسويق وريادة الأعمال بمنهج أمريكي.",
            careers: ["مدير أعمال", "مسؤول تسويق", "مدير موارد بشرية", "رائد أعمال", "مستشار إداري", "مدير مبيعات"]
          },
          {
            name: "محاسبة",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "المحاسبة المالية والتدقيق.",
            careers: ["مستشار ضريبي", "محاسب قانوني", "مدقق حسابات", "محلل مالي", "مدير مالي"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات",
        icon: "💻",
        majors: [
          {
            name: "علم الحاسوب",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "البرمجة وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات", "باحث في علوم الحاسوب", "مطور ألعاب", "مهندس ذكاء اصطناعي"]
          }
        ]
      }
    ]
  },
  17: {
    id: 17, name: "جامعة عمان الأهلية", type: "private", location: "عمان", icon: "🏢", website: "https://www.ammanu.edu.jo",
    facultiesData: [
      {
        name: "كلية الصيدلة", icon: "💊",
        majors: [
          {
            name: "صيدلة", hours: 160, field: "صحي", duration: "4-5 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "أول جامعة خاصة في الأردن تقدم الصيدلة، مع خبرة تاريخية وأكاديمية متميزة.",
            careers: ["صيدلاني إكلينيكي", "مدير صيدلية", "مندوب طبي", "باحث في صناعة الدواء", "صيدلاني مستشفى", "مفتش دوائي"]
          }
        ]
      },
      {
        name: "كلية الهندسة", icon: "🏗️",
        majors: [
          {
            name: "هندسة مدنية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "تصميم المنشآت والطرق.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مهندس في شركات المقاولات", "مخطط مدني", "مهندس بلدية"]
          },
          {
            name: "هندسة كهربائية", hours: 160, field: "هندسي", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "الأنظمة الكهربائية والإلكترونيات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة متجددة", "مهندس في شركات الكهرباء", "مصمم أنظمة كهربائية", "مهندس صيانة"]
          },
          {
            name: "هندسة عمارة", hours: 165, field: "هندسي", duration: "5 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "التصميم المعماري وتخطيط المدن.",
            careers: ["مهندس معماري", "مصمم داخلي", "مخطط عمراني", "باحث في التراث", "مدير مشاريع بناء", "رسام معماري"]
          }
        ]
      },
      {
        name: "كلية تقنية المعلومات", icon: "💻",
        majors: [
          {
            name: "علم الحاسوب", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "البرمجة وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات", "باحث في علوم الحاسوب", "مطور ألعاب", "مهندس ذكاء اصطناعي"]
          },
          {
            name: "أمن المعلومات", hours: 132, field: "IT", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "حماية الأنظمة والشبكات.",
            careers: ["محلل أمن سيبراني", "مختبر اختراق", "مدير أمن معلومات (CISO)", "محلل تهديدات", "مستشار أمن", "محقق جرائم إلكترونية"]
          }
        ]
      },
      {
        name: "كلية الأعمال", icon: "💼",
        majors: [
          {
            name: "إدارة أعمال", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "الإدارة والتسويق وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "مدير موارد بشرية", "رائد أعمال", "مستشار إداري", "مدير مبيعات"]
          },
          {
            name: "محاسبة", hours: 132, field: "أعمال", duration: "4 سنوات", isNew: false, showCareers: false, hourlyFee: null,
            description: "المحاسبة المالية والتدقيق.",
            careers: ["محاسب قانوني", "مدقق حسابات", "محلل مالي", "مدير مالي (CFO)", "مستشار ضريبي", "محاسب حكومي"]
          }
        ]
      }
    ]
  },
  18: {
    id: 18,
    name: "جامعة الإسراء",
    type: "private",
    location: "عمان",
    icon: "🏛️",
    website: "https://www.iu.edu.jo",
    facultiesData: [
      {
        name: "كلية الهندسة",
        icon: "🏗️",
        majors: [
          {
            name: "هندسة عمارة",
            hours: 165,
            field: "هندسي",
            duration: "5 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "التصميم المعماري وتخطيط الفراغات والمدن.",
            careers: ["مهندس معماري", "مصمم داخلي", "مخطط عمراني", "باحث في التراث", "مدير مشاريع بناء"]
          },
          {
            name: "هندسة مدنية",
            hours: 160,
            field: "هندسي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "تصميم المنشآت والطرق.",
            careers: ["مهندس إنشاءات", "مهندس طرق وجسور", "مشرف مشاريع", "مهندس في شركات المقاولات", "مخطط مدني"]
          },
          {
            name: "هندسة كهربائية",
            hours: 160,
            field: "هندسي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "الأنظمة الكهربائية والإلكترونيات.",
            careers: ["مهندس كهربائي", "مهندس اتصالات", "مهندس طاقة متجددة", "مهندس في شركات الكهرباء", "مصمم أنظمة"]
          }
        ]
      },
      {
        name: "كلية الحقوق",
        icon: "⚖️",
        majors: [
          {
            name: "حقوق",
            hours: 132,
            field: "قانون",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "القانون المدني والجزائي والدولي والتجاري.",
            careers: ["محام", "قاض", "مستشار قانوني", "مدعي عام", "موثق عقود", "دبلوماسي"]
          }
        ]
      },
      {
        name: "كلية الأعمال",
        icon: "📊",
        majors: [
          {
            name: "إدارة أعمال",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "الإدارة والتسويق وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "مدير موارد بشرية", "رائد أعمال", "مستشار إداري", "مدير مبيعات"]
          },
          {
            name: "محاسبة",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "المحاسبة المالية والتدقيق.",
            careers: ["مستشار ضريبي", "محاسب قانوني", "مدقق حسابات", "محلل مالي", "مدير مالي"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات",
        icon: "💻",
        majors: [
          {
            name: "علم الحاسوب",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "البرمجة وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات", "باحث في علوم الحاسوب", "مطور ألعاب", "مهندس ذكاء اصطناعي"]
          }
        ]
      }
    ]
  },
  19: {
    id: 19,
    name: "جامعة الشرق الأوسط",
    type: "private",
    location: "عمان",
    icon: "🏛️",
    website: "https://www.meu.edu.jo",
    facultiesData: [
      {
        name: "كلية الإعلام",
        icon: "🎙️",
        majors: [
          {
            name: "إعلام وصحافة",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "كلية إعلام مجهزة باستوديوهات متطورة وأحدث معدات البث والإنتاج.",
            careers: ["صحفي", "مقدم برامج", "محرر صحفي", "متخصص علاقات عامة", "مدير محتوى رقمي", "مراسل"]
          },
          {
            name: "علاقات عامة وإعلان",
            hours: 132,
            field: "أدبي",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "إدارة العلاقات العامة وتصميم الحملات الإعلانية.",
            careers: ["صحفي", "مقدم برامج", "محرر صحفي", "متخصص علاقات عامة", "مدير محتوى رقمي", "مراسل"]
          }
        ]
      },
      {
        name: "كلية الأعمال",
        icon: "📊",
        majors: [
          {
            name: "إدارة أعمال",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "الإدارة الاستراتيجية والتسويق وريادة الأعمال.",
            careers: ["مدير أعمال", "مسؤول تسويق", "مدير موارد بشرية", "رائد أعمال", "مستشار إداري", "مدير مبيعات"]
          },
          {
            name: "محاسبة",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "المحاسبة المالية والتدقيق والضرائب.",
            careers: ["مستشار ضريبي", "محاسب قانوني", "مدقق حسابات", "محلل مالي", "مدير مالي"]
          },
          {
            name: "تمويل ومصارف",
            hours: 132,
            field: "أعمال",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "إدارة الأصول المالية والبنوك والأسواق المالية.",
            careers: ["محلل مالي", "مصرفي", "مدير استثمار", "محلل أسواق مالية", "مستشار مالي", "مدير مخاطر"]
          }
        ]
      },
      {
        name: "كلية تكنولوجيا المعلومات",
        icon: "💻",
        majors: [
          {
            name: "علم الحاسوب",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "البرمجة وتطوير البرمجيات.",
            careers: ["مطور برمجيات", "مهندس خوارزميات", "مطور تطبيقات", "باحث في علوم الحاسوب", "مطور ألعاب", "مهندس ذكاء اصطناعي"]
          },
          {
            name: "أمن المعلومات",
            hours: 132,
            field: "IT",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "حماية الأنظمة والشبكات من التهديدات الإلكترونية.",
            careers: ["محلل تهديدات", "مستشار أمن", "محلل أمن سيبراني", "مختبر اختراق", "مدير أمن معلومات", "محقق جرائم إلكترونية"]
          }
        ]
      },
      {
        name: "كلية الحقوق",
        icon: "⚖️",
        majors: [
          {
            name: "حقوق",
            hours: 132,
            field: "قانون",
            duration: "4 سنوات",
            isNew: false,
            showCareers: false,
            hourlyFee: null,
            description: "القانون المدني والجزائي والتجاري والدولي.",
            careers: ["محام", "قاض", "مستشار قانوني", "مدعي عام", "موثق عقود", "دبلوماسي"]
          }
        ]
      }
    ]
  },
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
</script>

<style scoped>
.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.custom-scroll::-webkit-scrollbar {
  width: 6px; 
}

.custom-scroll::-webkit-scrollbar-track {
  background: transparent; 
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #cbd5e1; 
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8; 
}

.animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
.animate-fade-in { animation: fadeInUp 0.5s ease-out; }

@keyframes fadeInUp { 
  from { opacity: 0; transform: translateY(20px); } 
  to { opacity: 1; transform: translateY(0); } 
}
</style>