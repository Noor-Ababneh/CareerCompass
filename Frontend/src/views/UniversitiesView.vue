<template>
  <div class="min-h-screen bg-gray-50 pb-20" dir="rtl">

    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="text-2xl font-extrabold text-blue-900 flex items-center gap-2 cursor-pointer" @click="$router.push('/dashboard')">
          <span>🧭</span> CareerCompass
        </div>
        <button @click="$router.push('/dashboard')" class="text-gray-500 hover:text-blue-600 font-medium transition flex items-center gap-2">
          <span>العودة للرئيسية</span>
          <span>🏠</span>
        </button>
      </div>
    </nav>

    <div class="bg-gradient-to-r from-blue-900 to-teal-800 text-white py-16 px-6 text-center mb-10">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">دليل الجامعات الأردنية 🇯🇴</h1>
      <p class="text-blue-100 text-lg max-w-2xl mx-auto animate-fade-in-up delay-100">
        اكتشف الجامعات الحكومية والخاصة في الأردن، وتعرف على التخصصات والكليات المتاحة في كل منها لتختار وجهتك الأكاديمية بدقة.
      </p>
    </div>

    <div class="max-w-7xl mx-auto px-6">

      <div class="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        
        <div class="w-full md:w-1/2 relative">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="ابحث عن اسم الجامعة..." 
            class="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition outline-none"
          >
          <span class="absolute right-4 top-3.5 text-gray-400 text-xl">🔍</span>
        </div>

        <div class="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <button 
            @click="activeFilter = 'all'" 
            :class="activeFilter === 'all' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            class="px-6 py-2.5 rounded-xl font-bold transition whitespace-nowrap"
          >
            الكل
          </button>
          <button 
            @click="activeFilter = 'public'" 
            :class="activeFilter === 'public' ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            class="px-6 py-2.5 rounded-xl font-bold transition whitespace-nowrap"
          >
            جامعات حكومية 🏛️
          </button>
          <button 
            @click="activeFilter = 'private'" 
            :class="activeFilter === 'private' ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            class="px-6 py-2.5 rounded-xl font-bold transition whitespace-nowrap"
          >
            جامعات خاصة 🎓
          </button>
        </div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="uni in filteredUniversities" 
          :key="uni.id"
          class="uni-card group animate-fade-in"
        >
          <span 
            :class="uni.type === 'public' ? 'bg-teal-100 text-teal-800' : 'bg-orange-100 text-orange-800'"
            class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold z-10"
          >
            {{ uni.type === 'public' ? 'حكومية' : 'خاصة' }}
          </span>

          <div class="h-32 bg-gray-100 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
            {{ uni.icon }}
          </div>

          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">{{ uni.name }}</h3>
            <div class="flex items-center text-gray-500 text-sm mb-4">
              <span>📍 {{ uni.location }}</span>
            </div>

            <div class="border-t border-gray-100 pt-4">
              <h4 class="text-sm font-bold text-gray-700 mb-2">أبرز الكليات:</h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="(faculty, idx) in uni.faculties.slice(0, 3)" 
                  :key="idx"
                  class="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-medium"
                >
                  {{ faculty }}
                </span>
                <span v-if="uni.faculties.length > 3" class="text-xs text-gray-400 py-1">+{{ uni.faculties.length - 3 }} المزيد</span>
              </div>
            </div>

            <a 
              :href="uni.website" 
              target="_blank"
              class="mt-6 block w-full py-2.5 text-center bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-700 font-bold rounded-xl transition duration-300 border border-gray-200 hover:border-blue-600"
            >
              زيارة الموقع الرسمي 🌐
            </a>
          </div>
        </div>
      </div>

      <div v-if="filteredUniversities.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">😕</div>
        <h3 class="text-xl font-bold text-gray-600">لم نجد نتائج تطابق بحثك</h3>
        <p class="text-gray-400">جرب البحث باسم آخر أو تغيير الفلتر.</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const activeFilter = ref('all') // all, public, private

// 🇯🇴 قاعدة بيانات الجامعات الأردنية الشاملة
const universities = [
  // --- الجامعات الحكومية ---
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
    icon: "🔬",
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
    icon: "🔧",
    website: "https://www.bau.edu.jo",
    faculties: ["الهندسة (Polytechnic)", "الذكاء الاصطناعي", "الطب", "الزراعة", "الأعمال"]
  },
  {
    id: 6,
    name: "جامعة مؤتة",
    type: "public",
    location: "الكرك",
    icon: "⚔️",
    website: "https://www.mutah.edu.jo",
    faculties: ["الجناح العسكري", "الطب", "الهندسة", "العلوم", "العلوم الاجتماعية"]
  },
  {
    id: 7,
    name: "جامعة الحسين بن طلال",
    type: "public",
    location: "معان",
    icon: "🏜️",
    website: "http://www.ahu.edu.jo",
    faculties: ["الهندسة", "تكنولوجيا المعلومات", "التمريض", "العلوم", "الآداب"]
  },
  {
    id: 8,
    name: "جامعة الطفيلة التقنية",
    type: "public",
    location: "الطفيلة",
    icon: "⚙️",
    website: "http://www.ttu.edu.jo",
    faculties: ["الهندسة", "العلوم", "الآداب", "الأعمال"]
  },
  {
    id: 9,
    name: "الجامعة الألمانية الأردنية (GJU)",
    type: "public",
    location: "مادبا / عمان",
    icon: "🇩🇪",
    website: "http://www.gju.edu.jo",
    faculties: ["الهندسة", "العلوم الإدارية واللوجستية", "العمارة والتصميم", "تكنولوجيا المعلومات"]
  },
  {
    id: 10,
    name: "جامعة آل البيت",
    type: "public",
    location: "المفرق",
    icon: "🕌",
    website: "https://www.aabu.edu.jo",
    faculties: ["الشريعة", "القانون", "تكنولوجيا المعلومات", "العلوم", "الآداب"]
  },

  // --- الجامعات الخاصة ---
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
    icon: "🌐",
    website: "https://www.asu.edu.jo",
    faculties: ["الصيدلة", "الهندسة", "IT", "التمريض", "الفنون والتصميم", "الحقوق"]
  },
  {
    id: 13,
    name: "جامعة البترا",
    type: "private",
    location: "عمان - طريق المطار",
    icon: "🏛️",
    website: "https://www.uop.edu.jo",
    faculties: ["الصيدلة", "العمارة والتصميم", "الآداب والعلوم", "IT", "الإعلام"]
  },
  {
    id: 14,
    name: "جامعة الزيتونة الأردنية",
    type: "private",
    location: "عمان - طريق المطار",
    icon: "🌿",
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
    icon: "🇺🇸",
    website: "https://aum.edu.jo",
    faculties: ["الهندسة", "العلوم الصحية", "IT", "العمارة والتصميم", "المال والأعمال"]
  },
  {
    id: 17,
    name: "جامعة عمان الأهلية",
    type: "private",
    location: "عمان - السلط",
    icon: "🏢",
    website: "https://www.ammanu.edu.jo",
    faculties: ["الصيدلة", "الهندسة", "التمريض", "العمارة والتصميم", "الحقوق", "IT"]
  },
  {
    id: 18,
    name: "جامعة الإسراء",
    type: "private",
    location: "عمان - طريق المطار",
    icon: "📜",
    website: "https://www.iu.edu.jo",
    faculties: ["الصيدلة", "الهندسة", "تكنولوجيا المعلومات", "الحقوق", "الآداب"]
  },
  {
    id: 19,
    name: "جامعة الشرق الأوسط (MEU)",
    type: "private",
    location: "عمان - طريق المطار",
    icon: "📡",
    website: "https://www.meu.edu.jo",
    faculties: ["الهندسة", "IT", "الإعلام", "الحقوق", "الصيدلة", "العمارة والتصميم"]
  }
]

// منطق الفلترة والبحث
const filteredUniversities = computed(() => {
  return universities.filter(uni => {
    // 1. فلتر النوع (حكومي/خاص)
    const matchesType = activeFilter.value === 'all' || uni.type === activeFilter.value
    // 2. فلتر البحث (الاسم)
    const matchesSearch = uni.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    return matchesType && matchesSearch
  })
})
</script>

<style scoped>
.uni-card {
  @apply bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.delay-100 {
  animation-delay: 0.2s;
}

.animate-fade-in {
  animation: fadeInUp 0.5s ease-out;
}
</style>