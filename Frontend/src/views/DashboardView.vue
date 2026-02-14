<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 font-sans text-white overflow-hidden relative" dir="rtl">
    
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
    </div>

    <nav class="relative z-50 border-b border-white/10 bg-white/5 backdrop-blur-lg">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div class="text-2xl font-extrabold flex items-center gap-2 tracking-wide">
          <span class="text-3xl">🧭</span> CareerCompass
        </div>
        
        <div class="flex items-center gap-4">
          <span class="text-blue-200 text-sm hidden md:inline font-medium bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
            مرحباً، {{ authStore.user?.name || 'يا بطل' }} 👋
          </span>
          <button 
            @click="handleLogout" 
            class="text-red-400 hover:text-white hover:bg-red-500/80 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-bold border border-red-500/30"
          >
            خروج
          </button>
        </div>
      </div>
    </nav>

    <div class="relative z-10 max-w-6xl mx-auto px-6 py-12">

      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
          مرحبا يا طالب يا ضايع يا فاشل 🚀
        </h1>
        <p class="text-gray-300 text-lg max-w-2xl mx-auto">
          كل الأدوات التي تحتاجها لرسم مستقبلك موجودة هنا. اختر وجهتك وابدأ الآن.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">

        <div class="group relative bg-white/5 backdrop-blur-md rounded-3xl p-1 border border-white/10 hover:border-blue-400/50 transition-all duration-500 hover:-translate-y-2" @click="$router.push('/assessment')">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative h-full bg-gray-900/50 rounded-[22px] p-8 flex flex-col items-center text-center cursor-pointer overflow-hidden">
            <div class="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
              🧠
            </div>
            <h3 class="text-xl font-bold text-white mb-2">اختبار الميول</h3>
            <p class="text-gray-400 text-sm mb-6 leading-relaxed">
              اكتشف شخصيتك المهنية من خلال مقياس RIASEC العالمي المطور.
            </p>
            <span class="mt-auto text-blue-400 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
              ابدأ الاختبار <span>←</span>
            </span>
          </div>
        </div>

        <div class="group relative bg-white/5 backdrop-blur-md rounded-3xl p-1 border border-white/10 hover:border-teal-400/50 transition-all duration-500 hover:-translate-y-2" @click="$router.push('/grades-input')">
          <div class="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative h-full bg-gray-900/50 rounded-[22px] p-8 flex flex-col items-center text-center cursor-pointer overflow-hidden">
             <div class="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform duration-500">
              📊
            </div>
            <h3 class="text-xl font-bold text-white mb-2">تحليل العلامات</h3>
            <p class="text-gray-400 text-sm mb-6 leading-relaxed">
              أدخل معدلاتك الدراسية لنقوم بربطها مع خياراتك الجامعية الأنسب.
            </p>
            <span class="mt-auto text-teal-400 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
              إدخال البيانات <span>←</span>
            </span>
          </div>
        </div>

        <div class="group relative bg-white/5 backdrop-blur-md rounded-3xl p-1 border border-white/10 hover:border-orange-400/50 transition-all duration-500 hover:-translate-y-2" @click="$router.push('/universities')">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative h-full bg-gray-900/50 rounded-[22px] p-8 flex flex-col items-center text-center cursor-pointer overflow-hidden">
            <div class="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-500">
              🎓
            </div>
            <h3 class="text-xl font-bold text-white mb-2">دليل الجامعات</h3>
            <p class="text-gray-400 text-sm mb-6 leading-relaxed">
              تصفح الجامعات الأردنية وتخصصاتها بأسلوب عصري وسهل.
            </p>
            <span class="mt-auto text-orange-400 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
              تصفح الدليل <span>←</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
}
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}
.animate-blob {
  animation: blob 10s infinite ease-in-out;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>