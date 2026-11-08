<template>
  <div class="min-h-screen bg-[#F4F7FB] overflow-hidden font-sans selection:bg-indigo-500 selection:text-white relative pb-10" dir="rtl">
    
    <div class="fixed inset-0 z-0 opacity-[0.04]" style="background-image: radial-gradient(#4f46e5 1.5px, transparent 1.5px); background-size: 32px 32px;"></div>
    <div class="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-400/20 blur-[100px] pointer-events-none z-0 animate-blob"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-400/20 blur-[100px] pointer-events-none z-0 animate-blob animation-delay-2000"></div>
    <div class="fixed top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-fuchsia-300/20 blur-[90px] pointer-events-none z-0 animate-blob"></div>

    <nav class="relative z-50 bg-white/70 backdrop-blur-xl border-b border-indigo-100/60 sticky top-0 shadow-sm">
      <div class="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div class="flex items-center gap-3 cursor-pointer group" @click="$router.push('/dashboard')">
          <div class="relative w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:rotate-12 transition-all">
            <span class="text-white text-lg">🧭</span>
          </div>
          <div class="flex flex-col">
            <span class="text-xl font-black text-slate-800 leading-none">Career<span class="text-indigo-600">Compass</span></span>
          </div>
        </div>
        <button @click="$router.push('/dashboard')" class="text-slate-500 hover:text-indigo-700 font-bold transition flex items-center gap-2 text-sm bg-white px-4 py-2 rounded-xl border border-slate-200 hover:border-indigo-200 shadow-sm hover:shadow-md group">
          <span>العودة للرئيسية</span>
          <span class="text-lg group-hover:-translate-x-1 transition-transform">🏠</span>
        </button>
      </div>
    </nav>

    <!-- 1. تم تقليل الـ padding-bottom والـ margin-bottom هنا -->
    <div class="relative pt-8 pb-2 px-6 text-center mb-4 overflow-hidden">
      <div class="relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4 border bg-white border-indigo-100 text-indigo-600 shadow-sm">
          <span class="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
          الدليل الأكاديمي الشامل 2025/2026
        </div>
        <h1 class="text-3xl md:text-4xl font-black text-slate-800 mb-3 animate-fade-in-up leading-tight">
          دليل الجامعات <span class="jordan-flag-text pb-1">الأردنية</span>
        </h1>
        <p class="text-slate-500 text-sm md:text-base max-w-2xl mx-auto font-medium animate-fade-in-up delay-100 leading-relaxed bg-white/50 p-3 rounded-2xl border border-white">
          استكشف الجامعات الحكومية والخاصة في الأردن، وتعرف على التخصصات والكليات المتاحة لتختار وجهتك الأكاديمية بدقة.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">

      <!-- 2. تم تقليل الـ margin-bottom هنا من mb-6 لـ mb-4 -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-4 bg-white/90 backdrop-blur-xl p-4 md:p-5 rounded-[2rem] shadow-xl shadow-indigo-500/5 border border-white">
        <div class="w-full md:w-1/2 relative">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="ابحث عن اسم الجامعة..." 
            aria-label="ابحث عن اسم الجامعة"
            class="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-100 bg-[#F8FAFF] focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-300 transition-all outline-none font-bold shadow-inner text-slate-700 text-sm"
          >
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 text-lg" aria-hidden="true">🔍</span>
        </div>

        <div class="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
          <button 
            @click="activeFilter = 'all'" 
            :aria-pressed="activeFilter === 'all'"
            :class="activeFilter === 'all' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border-indigo-600' : 'bg-white text-slate-500 hover:bg-indigo-50 border-slate-200'"
            class="px-5 py-2.5 rounded-xl font-black text-sm transition-all whitespace-nowrap border"
          >
            الكل
          </button>
          <button 
            @click="activeFilter = 'public'" 
            :aria-pressed="activeFilter === 'public'"
            :class="activeFilter === 'public' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 border-blue-500' : 'bg-white text-slate-500 hover:bg-blue-50 border-slate-200 hover:border-blue-200'"
            class="px-5 py-2.5 rounded-xl font-black text-sm transition-all whitespace-nowrap flex items-center gap-2 border"
          >
            <span>حكومية</span> <span class="text-base">🏛️</span>
          </button>
          <button 
            @click="activeFilter = 'private'" 
            :aria-pressed="activeFilter === 'private'"
            :class="activeFilter === 'private' ? 'bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 border-purple-500' : 'bg-white text-slate-500 hover:bg-purple-50 border-slate-200 hover:border-purple-200'"
            class="px-5 py-2.5 rounded-xl font-black text-sm transition-all whitespace-nowrap flex items-center gap-2 border"
          >
            <span>خاصة</span> <span class="text-base">🎓</span>
          </button>
        </div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        <div 
          v-for="uni in filteredUniversities" 
          :key="uni.id"
          class="uni-card group animate-fade-in flex flex-col h-full bg-white/80 backdrop-blur-md"
        >
          <span 
            :class="uni.type === 'public' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'"
            class="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black z-20 uppercase tracking-wider border shadow-sm"
          >
            {{ uni.type === 'public' ? 'جامعة حكومية' : 'جامعة خاصة' }}
          </span>

          <div class="h-40 bg-gradient-to-br from-[#F8FAFF] via-white to-[#F0F5FF] flex items-center justify-center relative overflow-hidden group-hover:bg-indigo-50/50 transition-colors duration-500 rounded-t-[2.5rem] border-b border-indigo-50">
            <div class="absolute -right-4 -top-4 w-28 h-28 bg-purple-200/40 rounded-full blur-2xl group-hover:bg-purple-300/50 transition-colors duration-500"></div>
            <div class="absolute -left-4 -bottom-4 w-32 h-32 bg-indigo-200/40 rounded-full blur-2xl group-hover:bg-indigo-300/50 transition-colors duration-500"></div>
            
            <div class="relative z-10 w-20 h-20 bg-white/60 backdrop-blur-md border border-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center text-4xl group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 group-hover:shadow-indigo-500/20">
              {{ uni.icon }}
            </div>
          </div>

          <div class="p-5 flex flex-col flex-1">
            <h3 class="text-lg font-black text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors truncate">{{ uni.name }}</h3>
            <div class="flex items-center text-slate-500 text-xs mb-4 font-medium gap-1.5 bg-slate-50 w-fit px-2.5 py-1 rounded-lg border border-slate-100">
              <span class="text-sm">📍</span>
              <span>{{ uni.location }}</span>
            </div>

            <div class="border-t border-slate-100 pt-4">
              <h4 class="text-[10px] font-black text-slate-400 mb-2.5 uppercase tracking-widest">أبرز الكليات</h4>
              <div class="flex flex-wrap gap-1.5 items-center">
                <span 
                  v-for="faculty in uni.faculties.slice(0, 3)" 
                  :key="faculty"
                  class="bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-sm group-hover:border-indigo-200 transition-colors"
                >
                  {{ faculty }}
                </span>
                <span v-if="uni.faculties.length > 3" class="text-indigo-400 font-black py-1 px-1.5 flex items-center justify-center bg-indigo-50/50 rounded-lg tracking-widest leading-none text-xs">...</span>
              </div>
            </div>

            <div class="mt-auto pt-5 flex gap-2.5">
              <button 
                @click="$router.push({ name: 'university-details', params: { id: uni.id } })"
                class="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2.5 rounded-xl font-black text-xs transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-1.5 group/btn hover:-translate-y-0.5"
              >
                <span>تصفح التخصصات</span>
                <span class="text-base group-hover/btn:-translate-x-1 transition-transform">📋</span>
              </button>

              <a 
                :href="uni.website" 
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`زيارة موقع ${uni.name} (يفتح في نافذة جديدة)`"
                class="w-10 h-10 flex items-center justify-center bg-white hover:bg-indigo-50 text-indigo-400 hover:text-indigo-600 rounded-xl border border-indigo-100 transition-all shadow-sm flex-shrink-0 group/link"
                title="زيارة موقع الجامعة"
              >
                <span class="text-lg group-hover/link:scale-110 transition-transform" aria-hidden="true">🌐</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredUniversities.length === 0" class="text-center py-20 bg-white/60 rounded-[2rem] border border-white backdrop-blur-md mt-6 shadow-xl shadow-indigo-500/5">
        <div class="text-6xl mb-4">😕</div>
        <h3 class="text-xl font-black text-slate-800 mb-2">لم نجد نتائج تطابق بحثك</h3>
        <p class="text-slate-500 font-medium text-sm">جرب البحث بكلمات أخرى أو تغيير الفلتر للحصول على نتائج.</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  window.scrollTo(0, 0)
})

const searchQuery = ref('')
const activeFilter = ref('all')
const universities = [
  {
    id: 10,
    name: "جامعة آل البيت (AABU)",
    type: "public",
    location: "المفرق",
    icon: "🥇",
    website: "https://www.aabu.edu.jo",
    faculties: ["الشريعة", "القانون", "تكنولوجيا المعلومات", "العلوم", "الآداب"]
  },
  {
    id: 1,
    name: "الجامعة الأردنية (JU)",
    type: "public",
    location: "عمان - الجبيهة",
    icon: "🏛️", 
    website: "http://ju.edu.jo",
    faculties: ["الطب", "الهندسة", "العلوم", "IT", "الأعمال", "الشريعة", "الآداب", "الحقوق"]
  },
  {
    id: 2,
    name: "جامعة العلوم والتكنولوجيا (JUST)",
    type: "public",
    location: "إربد - الرمثا",
    icon: "💎",
    website: "http://just.edu.jo",
    faculties: ["الطب", "الهندسة", "الصيدلة", "تكنولوجيا المعلومات", "العلوم الطبية المساندة", "الزراعة"]
  },
  {
    id: 3,
    name: "الجامعة الهاشمية (HU)",
    type: "public",
    location: "الزرقاء",
    icon: "🎓", 
    website: "https://hu.edu.jo",
    faculties: ["الهندسة", "الطب", "الأمير حسين (IT)", "الملكة رانيا (سياحة)", "العلوم التربوية"]
  },
  {
    id: 4,
    name: "جامعة اليرموك (YU)",
    type: "public",
    location: "إربد",
    icon: "📚", 
    website: "https://www.yu.edu.jo",
    faculties: ["الطب", "الحجاوي (هندسة)", "IT", "الإعلام", "الفنون الجميلة", "الآداب", "الشريعة"]
  },
  {
    id: 5,
    name: "جامعة البلقاء التطبيقية (BAU)",
    type: "public",
    location: "السلط (والكليات التابعة)",
    icon: "📘", 
    website: "https://www.bau.edu.jo",
    faculties: ["الهندسة (Polytechnic)", "الذكاء الاصطناعي", "الطب", "الزراعة", "الأعمال"]
  },
  {
    id: 6,
    name: "جامعة مؤتة",
    type: "public",
    location: "الكرك",
    icon: "🏛️", 
    website: "https://www.mutah.edu.jo",
    faculties: ["الجناح العسكري", "الطب", "الهندسة", "العلوم", "العلوم الاجتماعية"]
  },
  {
    id: 7,
    name: "جامعة الحسين بن طلال",
    type: "public",
    location: "معان",
    icon: "🏫", 
    website: "http://www.ahu.edu.jo",
    faculties: ["الهندسة", "تكنولوجيا المعلومات", "التمريض", "العلوم", "الآداب"]
  },
  {
    id: 8,
    name: "جامعة الطفيلة التقنية",
    type: "public",
    location: "الطفيلة",
    icon: "📙", 
    website: "http://www.ttu.edu.jo",
    faculties: ["الهندسة", "العلوم", "الآداب", "الأعمال"]
  },
  {
    id: 9,
    name: "الجامعة الألمانية الأردنية (GJU)",
    type: "public",
    location: "مادبا / عمان",
    icon: "🎓", 
    website: "http://www.gju.edu.jo",
    faculties: ["الهندسة", "العلوم الإدارية واللوجستية", "العمارة والتصميم", "تكنولوجيا المعلومات"]
  },
  {
    id: 11,
    name: "جامعة الأميرة سمية للتكنولوجيا (PSUT)",
    type: "private",
    location: "عمان",
    icon: "💻", 
    website: "https://www.psut.edu.jo",
    faculties: ["الملك عبدالله (الهندسة)", "الملك الحسين (IT)", "الملك طلال (الأعمال)"]
  },
  {
    id: 12,
    name: "جامعة العلوم التطبيقية (ASU)",
    type: "private",
    location: "عمان - شفا بدران",
    icon: "🏫", 
    website: "https://www.asu.edu.jo",
    faculties: ["الصيدلة", "الهندسة", "IT", "التمريض", "الفنون والتصميم", "الحقوق"]
  },
  {
    id: 13,
    name: "جامعة البترا",
    type: "private",
    location: "عمان - طريق المطار",
    icon: "📚", 
    website: "https://www.uop.edu.jo",
    faculties: ["الصيدلة", "العمارة والتصميم", "الآداب والعلوم", "IT", "الإعلام"]
  },
  {
    id: 14,
    name: "جامعة الزيتونة الأردنية",
    type: "private",
    location: "عمان - طريق المطار",
    icon: "🫒",
    website: "https://www.zuj.edu.jo",
    faculties: ["الصيدلة", "التمريض", "الهندسة", "العلوم والتكنولوجيا", "الأعمال"]
  },
  {
    id: 15,
    name: "جامعة فيلادلفيا",
    type: "private",
    location: "جرش",
    icon: "📖", 
    website: "https://www.philadelphia.edu.jo",
    faculties: ["الصيدلة", "الهندسة", "IT", "الآداب والفنون", "الحقوق"]
  },
  {
    id: 16,
    name: "الجامعة الأمريكية في مادبا",
    type: "private",
    location: "مادبا",
    icon: "🎓", 
    website: "https://aum.edu.jo",
    faculties: ["الهندسة", "العلوم الصحية", "IT", "العمارة والتصميم", "المال والأعمال"]
  },
  {
    id: 17,
    name: "جامعة عمان الأهلية",
    type: "private",
    location: "عمان - السلط",
    icon: "🏛️", 
    website: "https://www.ammanu.edu.jo",
    faculties: ["الصيدلة", "الهندسة", "التمريض", "العمارة والتصميم", "الحقوق", "IT"]
  },
  {
    id: 18,
    name: "جامعة الإسراء",
    type: "private",
    location: "عمان - طريق المطار",
    icon: "📘", 
    website: "https://www.iu.edu.jo",
    faculties: ["الصيدلة", "الهندسة", "تكنولوجيا المعلومات", "الحقوق", "الآداب"]
  },
  {
    id: 19,
    name: "جامعة الشرق الأوسط (MEU)",
    type: "private",
    location: "عمان - طريق المطار",
    icon: "🏫", 
    website: "https://www.meu.edu.jo",
    faculties: ["الهندسة", "IT", "الإعلام", "الحقوق", "الصيدلة", "العمارة والتصميم"]
  }
]

const filteredUniversities = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return universities.filter(uni => {
    const matchesType = activeFilter.value === 'all' || uni.type === activeFilter.value
    const matchesSearch = uni.name.toLowerCase().includes(query)
    return matchesType && matchesSearch
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
.font-sans { font-family: 'Tajawal', sans-serif; }

.jordan-flag-text {
  background-image: linear-gradient(
    135deg, 
    #CE1126 0%, #CE1126 20%,  
    #FFFFFF 25%, #FFFFFF 35%,  
    #000000 40%, #000000 55%,  
    #007A3D 60%, #007A3D 85%,  
    #CE1126 90%, #CE1126 100%  
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  padding-bottom: 0.25rem;
  padding-top: 0.1rem;
  line-height: 1.3;
  filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.15));
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.uni-card {
  @apply rounded-[2.5rem] overflow-hidden shadow-sm border border-white hover:shadow-2xl hover:shadow-indigo-500/15 hover:-translate-y-2 transition-all duration-500 relative;
}

@keyframes blob { 
  0% { transform: translate(0, 0) scale(1); } 
  33% { transform: translate(30px, -50px) scale(1.1); } 
  66% { transform: translate(-20px, 20px) scale(0.9); } 
  100% { transform: translate(0, 0) scale(1); } 
}
.animate-blob { animation: blob 10s infinite alternate; }
.animation-delay-2000 { animation-delay: 2s; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
.delay-100 { animation-delay: 0.2s; }
.animate-fade-in { animation: fadeInUp 0.5s ease-out; }
</style>