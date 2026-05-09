<template>
  <div class="min-h-screen bg-[#F8FAFC] font-sans selection:bg-amber-500 selection:text-white relative overflow-x-hidden" dir="rtl">

    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(#4F46E5 1.5px, transparent 1.5px); background-size: 32px 32px;"></div>
      <div class="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#4F46E5]/10 blur-[100px] animate-slow-spin"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#10B981]/10 blur-[100px] animate-blob"></div>
    </div>

    <nav class="relative z-50 max-w-7xl mx-auto px-6 py-5 flex justify-between items-center border-b border-indigo-100/50 backdrop-blur-xl bg-white/50">
      
      <div class="flex items-center gap-3.5 cursor-pointer group" @click="$router.push('/')">
        <div class="relative w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md border border-indigo-50 p-1 group-hover:scale-105 transition-all">
            <img src="@/assets/logo.png" alt="Logo" class="w-full h-full object-contain" />
        </div>
        <div class="flex flex-col">
          <span class="text-2xl font-black text-slate-800 tracking-tight leading-none">Career<span class="text-amber-500">Compass</span></span>
          <span class="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">البوصلة الخاصة بك</span>
        </div>
      </div>

      <div class="flex items-center gap-2 md:gap-4">
        
        <button @click="$router.push('/')" class="hidden sm:flex items-center gap-2 px-4 py-2 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-600 hover:text-indigo-600 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm group">
          <span class="text-lg group-hover:-translate-x-1 transition-transform">🏠</span>
          <span>الرئيسية</span>
        </button>

        <div class="hidden md:flex items-center gap-3 bg-white/80 border border-amber-100 px-4 py-1.5 rounded-full shadow-sm">
          <div class="w-8 h-8 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 flex items-center justify-center text-amber-700 font-black text-sm border border-amber-200">
            {{ firstName.charAt(0) }}
          </div>
          <div class="flex flex-col pr-1">
            <span class="text-xs font-black text-slate-700">{{ firstName }}</span>
            <span class="text-[9px] font-bold text-amber-600">أهلا وسهلا نورتنا يا غالي</span>
          </div>
        </div>
        
        <button @click="openModal" class="flex items-center gap-2 px-4 py-2 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-600 hover:text-indigo-600 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm group">
          <span class="hidden sm:inline">تبديل المستخدم</span>
        </button>

      </div>
    </nav>

    <main class="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-16">

      <div class="mb-16 bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-indigo-500/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group">
        <div class="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-amber-400 to-orange-500"></div>
        <div class="absolute -left-20 -top-20 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-all duration-700"></div>

        <div class="relative z-10 text-center md:text-right flex-1">
          <div class="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
            <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            {{ greetingMessage }}
          </div>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 leading-tight mb-4">
            جاهز ترسم <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">مستقبلك الجامعي؟</span>
          </h1>
          <p class="text-slate-500 text-base md:text-lg font-medium max-w-xl leading-relaxed">
            لا تترك اختيار تخصصك للصدفة! اتبع الخطوات الثلاث أدناه لتعرف ميولك الحقيقية، وتحلل فرص قبولك بناءً على معدلك الحالي.
          </p>
          
          <div class="mt-6 inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-slate-200 px-4 py-2 rounded-2xl text-xs font-bold text-slate-500 shadow-sm">
            <span class="text-[#10B981] text-sm font-black">✓</span>
            تم التحديث وفق معدلات القبول لعام 2025/2026
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

        <div @click="$router.push('/assessment')" class="card-step group">
          <div class="card-glow from-amber-400/20 to-transparent"></div>
          <div class="relative z-10 flex flex-col h-full">
            <div class="flex justify-between items-start mb-6">
              <div class="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-amber-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                🎯
              </div>
              <span class="text-[10px] font-black text-amber-500 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">الخطوة الأولى</span>
            </div>
            <h3 class="text-2xl font-black text-slate-800 mb-3 group-hover:text-amber-600 transition-colors">اكتشاف الميول</h3>
            <p class="text-slate-500 text-sm leading-relaxed font-medium mb-8 flex-1">
              مقياس علمي دقيق يحلل شخصيتك المهنية ليرشح لك الحقل الأكاديمي الأقرب لإبداعك.
            </p>
            <div class="flex items-center gap-2 text-amber-600 font-bold text-sm mt-auto">
              <span>ابدأ التقييم الآن</span>
              <span class="group-hover:-translate-x-2 transition-transform duration-300 text-lg leading-none">←</span>
            </div>
          </div>
        </div>

        <div @click="$router.push('/grades-input')" class="card-step group">
          <div class="card-glow from-orange-400/20 to-transparent"></div>
          <div class="relative z-10 flex flex-col h-full">
            <div class="flex justify-between items-start mb-6">
              <div class="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-orange-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                📈
              </div>
              <span class="text-[10px] font-black text-orange-500 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-wider">الخطوة الثانية</span>
            </div>
            <h3 class="text-2xl font-black text-slate-800 mb-3 group-hover:text-orange-600 transition-colors">تحليل العلامات</h3>
            <p class="text-slate-500 text-sm leading-relaxed font-medium mb-8 flex-1">
              أدخل علاماتك المدرسية وسنقوم بتحليل فجواتك وبناء خطة دراسية لتضمن قبولك الجامعي.
            </p>
            <div class="flex items-center gap-2 text-orange-600 font-bold text-sm mt-auto">
              <span>ابنِ خطتك الأكاديمية</span>
              <span class="group-hover:-translate-x-2 transition-transform duration-300 text-lg leading-none">←</span>
            </div>
          </div>
        </div>

        <div @click="$router.push('/universities')" class="card-step group">
          <div class="card-glow from-yellow-400/20 to-transparent"></div>
          <div class="relative z-10 flex flex-col h-full">
            <div class="flex justify-between items-start mb-6">
              <div class="w-14 h-14 bg-gradient-to-br from-yellow-100 to-amber-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-yellow-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                🏛️
              </div>
              <span class="text-[10px] font-black text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full uppercase tracking-wider">الخطوة الثالثة</span>
            </div>
            <h3 class="text-2xl font-black text-slate-800 mb-3 group-hover:text-yellow-600 transition-colors">دليل الجامعات</h3>
            <p class="text-slate-500 text-sm leading-relaxed font-medium mb-8 flex-1">
              استكشف الجامعات الحكومية والخاصة وتعرف على التخصصات ومعدلات القبول المحدثة.
            </p>
            <div class="flex items-center gap-2 text-yellow-600 font-bold text-sm mt-auto">
              <span>تصفح الدليل الشامل</span>
              <span class="group-hover:-translate-x-2 transition-transform duration-300 text-lg leading-none">←</span>
            </div>
          </div>
        </div>

      </div>

      <p class="mt-14 text-center text-xs font-bold text-slate-400 flex items-center justify-center gap-2">
        <span class="text-[#10B981]">🔒</span>
        جميع بياناتك مشفرة ومحفوظة بأمان. النتائج المعروضة هي للإرشاد الأكاديمي.
      </p>
    </main>
    <!-- User Data Modal -->
    <UserModal 
      :is-open="isModalOpen" 
      @close="isModalOpen = false" 
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import UserModal from '@/components/UserModal.vue'

const router = useRouter()
const authStore = useAuthStore()

const isModalOpen = ref(false)

function openModal() {
  isModalOpen.value = true
}

// ☀️ رسالة ترحيب ذكية تتغير حسب وقت اليوم بتوقيت إربد
const greetingMessage = computed(() => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'صباح الخير والهمة العالية ☀️'
  if (hour >= 12 && hour < 18) return 'مساؤك إنجاز وطموح 🎯'
  return 'مساء الخير، وقت التخطيط للمستقبل 🌙'
})

// ✨ استخراج الاسم الأول فقط ليكون الرد ودياً
const firstName = computed(() => {
  const fullName = authStore.user?.name || ''
  const first = fullName.split(' ')[0]
  return first ? first : 'يا اسم الشخص هون'
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
.font-sans { font-family: 'Tajawal', sans-serif; }

/* 🌟 حركات الخلفية الهادئة */
@keyframes slowSpin {
  from { transform: rotate(0deg) scale(1); }
  to { transform: rotate(360deg) scale(1.1); }
}
.animate-slow-spin {
  animation: slowSpin 25s linear infinite alternate;
}

@keyframes blob {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -20px) scale(1.05); }
  100% { transform: translate(-20px, 20px) scale(0.95); }
}
.animate-blob {
  animation: blob 12s ease-in-out infinite alternate;
}

/* 🎯 تنسيق البطاقات الزجاجية ثلاثية الأبعاد (مُحدث مع حركة القفز) */
.card-step {
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 2rem;
  padding: 2rem;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(79, 70, 229, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  animation: cardIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.card-step:nth-child(1) { animation-delay: 0.1s; }
.card-step:nth-child(2) { animation-delay: 0.2s; }
.card-step:nth-child(3) { animation-delay: 0.3s; }

@keyframes cardIn {
  from { opacity: 0; transform: translateY(40px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* حركة الكروت عند التأشير */
.card-step:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(245, 158, 11, 0.15);
  border-color: rgba(245, 158, 11, 0.4);
}

.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 100% 0%, var(--tw-gradient-from), var(--tw-gradient-to));
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}
.card-step:hover .card-glow {
  opacity: 1;
}
</style>