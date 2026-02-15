<template>
  <div class="min-h-screen bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#0f172a] font-sans text-white overflow-hidden relative" dir="rtl">
    
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse animation-delay-2000"></div>
    </div>

    <nav class="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/5 bg-white/5 backdrop-blur-md rounded-b-3xl">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center text-2xl">🧭</div>
        <span class="text-2xl font-black text-white tracking-tight drop-shadow-md">CareerCompass</span>
      </div>
      
      <div class="flex items-center gap-4">
        <div class="hidden md:flex flex-col items-end">
          <span class="text-sm font-bold text-blue-100">مرحباً، {{ authStore.user?.name || 'يا بطل' }} 👋</span>
        </div>
        <button 
          @click="handleLogout" 
          class="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 text-sm backdrop-blur-sm"
        >
          خروج
        </button>
      </div>
    </nav>

    <div class="relative z-10 max-w-6xl mx-auto px-6 py-12">

      <div class="text-center mb-16 animate-fade-in-up">
        <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
          أهلا يا طالب يا فاشل يا ضايع<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">   يا فاشل مرة تانية بس بالأزرق. </span>
        </h1>
        <p class="text-lg text-blue-100/80 max-w-2xl mx-auto font-medium">
           أدوات يوزلس زي مشروعنا تماما
            أدوات غير متطورة، تصميم سيئ، ونتائج غير دقيقة لمساعدتك في الضياع أكتر باتخاذ القرار.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">

        <div 
          @click="$router.push('/assessment')"
          class="group bg-white/10 backdrop-blur-lg rounded-[2rem] p-8 border border-white/10 hover:bg-white/15 hover:border-white/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10">
            <div class="w-16 h-16 bg-blue-500/20 text-blue-200 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner border border-white/5 group-hover:scale-110 transition-transform">
              🧠
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">اختبار الميول</h3>
            <p class="text-blue-100/70 text-sm leading-relaxed mb-8">
              اكتشف شخصيتك المهنية بدقة عالية.
            </p>
            <div class="flex items-center justify-between mt-auto">
              <span class="text-blue-200 font-bold text-sm bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                ابدأ الاختبار
              </span>
            </div>
          </div>
        </div>

        <div 
          @click="$router.push('/grades-input')"
          class="group bg-white/10 backdrop-blur-lg rounded-[2rem] p-8 border border-white/10 hover:bg-white/15 hover:border-white/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10">
            <div class="w-16 h-16 bg-teal-500/20 text-teal-200 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner border border-white/5 group-hover:scale-110 transition-transform">
              📊
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">تحليل العلامات</h3>
            <p class="text-blue-100/70 text-sm leading-relaxed mb-8">
              أدخل علاماتك لننصحك بالتخصص الأنسب.
            </p>
            <div class="flex items-center justify-between mt-auto">
              <span class="text-teal-200 font-bold text-sm bg-teal-500/20 px-4 py-2 rounded-full border border-teal-500/30 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                إدخال البيانات
              </span>
            </div>
          </div>
        </div>

        <div 
          @click="$router.push('/universities')"
          class="group bg-white/10 backdrop-blur-lg rounded-[2rem] p-8 border border-white/10 hover:bg-white/15 hover:border-white/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-rose-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10">
            <div class="w-16 h-16 bg-rose-500/20 text-rose-200 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner border border-white/5 group-hover:scale-110 transition-transform">
              🎓
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">دليل الجامعات</h3>
            <p class="text-blue-100/70 text-sm leading-relaxed mb-8">
              تصفح كافة الجامعات والتخصصات.
            </p>
            <div class="flex items-center justify-between mt-auto">
              <span class="text-rose-200 font-bold text-sm bg-rose-500/20 px-4 py-2 rounded-full border border-rose-500/30 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                تصفح الدليل
              </span>
            </div>
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
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}
</style>