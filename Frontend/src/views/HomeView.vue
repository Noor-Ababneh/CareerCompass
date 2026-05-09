<template>
  <div class="min-h-screen bg-[#F8FAFF] overflow-hidden font-sans selection:bg-indigo-500 selection:text-white relative" dir="rtl">
    
    <div class="absolute inset-0 z-0 opacity-[0.04]" style="background-image: radial-gradient(#4f46e5 1.5px, transparent 1.5px); background-size: 32px 32px;"></div>
    
    <div class="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none z-0 animate-blob"></div>
    <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-400/15 blur-[100px] pointer-events-none z-0 animate-blob animation-delay-2000"></div>
    <div class="absolute top-[30%] left-[30%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none z-0 animate-blob animation-delay-4000"></div>

    <nav class="relative z-50 max-w-7xl mx-auto px-6 py-4 flex justify-between items-center border-b border-indigo-100/50 backdrop-blur-xl bg-white/60">
      
      <div class="flex items-center gap-3.5 cursor-pointer group" @click="$router.push('/')">
        
        <div class="relative w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-all duration-500 border border-white p-1">
          <img src="@/assets/logo.png" alt="Career Compass Logo" class="w-full h-full object-contain group-hover:rotate-6 transition-transform duration-500" />
        </div>
        
        <div class="flex flex-col">
          <span class="text-2xl font-black text-slate-800 tracking-tight leading-none">Career<span class="text-indigo-600">Compass</span></span>
          <span class="text-[10px] font-bold text-indigo-500 tracking-wider mt-0.5 uppercase">The Future Starts Here</span>
        </div>
      </div>
      
      <div class="flex items-center gap-5">
        <template v-if="authStore.isAuthenticated">
          <button @click="openModal" class="relative overflow-hidden bg-white border border-indigo-200 text-indigo-600 px-7 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-indigo-500/10 hover:-translate-y-0.5 group">
            <span class="relative z-10">تبديل المستخدم</span>
          </button>
        </template>
        <template v-else>
          <button @click="openModal" class="relative overflow-hidden bg-indigo-600 text-white px-7 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 group">
            <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            <span class="relative z-10">ابدأ رحلتك مجاناً</span>
          </button>
        </template>
      </div>
    </nav>

    <main class="relative z-10 max-w-7xl mx-auto px-6 pt-6 pb-12 md:pt-10 lg:pt-12">
      <div v-if="authStore.isAuthenticated && authStore.user?.gender" class="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-4 anim-fade-up">
        
        <div class="flex flex-col items-center md:items-end text-center md:text-right z-10">
          <span class="text-xl md:text-2xl font-bold text-slate-500 mb-1">مرحباً بك،</span>
          <span class="text-4xl md:text-5xl font-black text-indigo-600 tracking-tight">{{ authStore.user?.name }}</span>
        </div>

        <div class="relative animate-float -my-6 md:-my-8">
          <img v-if="authStore.user?.gender === 'female'" src="@/assets/avatars/girl.gif" alt="Girl Avatar" class="w-48 md:w-56 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500" />
          <img v-else-if="authStore.user?.gender === 'male'" src="@/assets/avatars/boy.gif" alt="Boy Avatar" class="w-72 md:w-96 lg:w-[28rem] object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500" />
        </div>
        
      </div>

      <div class="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        
        <div class="flex-1 text-center lg:text-right relative z-20">
          <div class="inline-flex items-center gap-2 bg-indigo-50/80 backdrop-blur-md border border-indigo-100 text-indigo-700 px-5 py-2 rounded-full text-xs font-bold mb-6 shadow-sm">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span>منصة التوجيه الأكاديمي الشاملة لطلاب الأردن</span>
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-[3.2rem] font-black text-slate-800 leading-[1.2] mb-6">
            مسارك من المدرسة ...
            <span class="block mt-2 py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500">
              إلى التخصص الجامعي الأنسب لك!
            </span>
          </h1>
          
          <p class="text-slate-600 text-lg font-medium mb-10 leading-[1.6] max-w-2xl mx-auto lg:mx-0 bg-white/40 p-3 rounded-2xl">
             <span class="text-indigo-800 font-black">كيرير كومباس CareerCompass</span> رفيقك الأكاديمي الأول في مرحلة الانتقال إلى التعليم العالي؛ حيث تدمج بين التحليل العلمي للميول والتقييم الدقيق للأداء المدرسي. نساعدك على استكشاف التخصصات الجامعية وفهم متطلباتها، لنرسم لك مساراً تعليمياً متكاملاً يضمن لك مستقبلاً مبنياً على الشغف والتميز الدراسي.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button @click="handleAction('/assessment')" class="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:-translate-y-1 flex items-center justify-center gap-3 group">
              <span>اكتشف تخصصك الآن</span>
              <span class="group-hover:-translate-x-2 transition-transform duration-300">←</span>
            </button>
            <button @click="handleAction('/grades-input')" class="w-full sm:w-auto bg-white/80 backdrop-blur-sm hover:bg-indigo-50 text-indigo-700 border border-indigo-200 px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:border-indigo-300 shadow-sm">
              <span>تحليل العلامات</span>
            </button>
          </div>
        </div>

        <div class="flex-1 w-full max-w-2xl relative z-10 group">
          <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-400 rounded-[3rem] transform rotate-3 scale-[1.02] opacity-20 blur-2xl group-hover:opacity-30 group-hover:rotate-6 transition-all duration-700"></div>
          
          <div class="relative bg-white/60 backdrop-blur-xl border border-white p-3 rounded-[3rem] shadow-2xl">
            <div class="relative rounded-[2.2rem] overflow-hidden bg-slate-900 aspect-video shadow-inner border border-white/50">
              <iframe 
                class="w-full h-full opacity-95 hover:opacity-100 transition-opacity duration-500" 
                src="https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=1&mute=1&loop=1&playlist=jNQXAC9IVRw&rel=0&controls=0" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen="true">
              </iframe>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto anim-fade-up">
        <div class="bg-white/70 backdrop-blur-md border border-white p-4 rounded-2xl shadow-sm text-center group hover:border-indigo-200 transition-all hover:-translate-y-1">
          <div class="w-10 h-10 mx-auto bg-indigo-50 rounded-full flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">🎯</div>
          <div class="text-slate-800 font-black text-sm md:text-base">+45 مهارة مُقاسة</div>
          <div class="text-slate-500 text-[10px] font-bold uppercase tracking-wider">بمعايير عالمية</div>
        </div>
        <div class="bg-white/70 backdrop-blur-md border border-white p-4 rounded-2xl shadow-sm text-center group hover:border-amber-200 transition-all hover:-translate-y-1">
          <div class="w-10 h-10 mx-auto bg-amber-50 rounded-full flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">🏛️</div>
          <div class="text-slate-800 font-black text-sm md:text-base">+25 جامعة أردنية</div>
          <div class="text-slate-500 text-[10px] font-bold uppercase tracking-wider">بيانات محدثة 2025</div>
        </div>
        <div class="bg-white/70 backdrop-blur-md border border-white p-4 rounded-2xl shadow-sm text-center group hover:border-purple-200 transition-all hover:-translate-y-1">
          <div class="w-10 h-10 mx-auto bg-purple-50 rounded-full flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">🔬</div>
          <div class="text-slate-800 font-black text-sm md:text-base">4 حقول أكاديمية</div>
          <div class="text-slate-500 text-[10px] font-bold uppercase tracking-wider">حسب النظام الجديد</div>
        </div>
        <div class="bg-white/70 backdrop-blur-md border border-white p-4 rounded-2xl shadow-sm text-center group hover:border-emerald-200 transition-all hover:-translate-y-1">
          <div class="w-10 h-10 mx-auto bg-emerald-50 rounded-full flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">🔒</div>
          <div class="text-slate-800 font-black text-sm md:text-base">خصوصية كاملة</div>
          <div class="text-slate-500 text-[10px] font-bold uppercase tracking-wider">بياناتك مشفرة</div>
        </div>
      </div>
    </main>

    <section class="relative z-20 bg-white py-24 rounded-t-[4rem] shadow-[0_-20px_50px_-20px_rgba(79,70,229,0.05)] border-t border-indigo-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">أدوات ذكية تقودك نحو القمة</h2>
          <p class="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">بنينا المنصة لترافقك في كل خطوة؛ من فهم نفسك وحتى اختيار تخصصك الجامعي بكل ثقة.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          
          <div @click="handleAction('/assessment')" class="cursor-pointer bg-[#F8FAFF] rounded-[2.5rem] p-8 border-2 border-transparent hover:border-indigo-200 hover:bg-white transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/10">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-100 to-transparent rounded-bl-full transition-transform duration-500 group-hover:scale-125"></div>
            <div class="relative z-10 w-16 h-16 bg-white rounded-2xl shadow-sm border border-indigo-100 flex items-center justify-center text-3xl mb-6 group-hover:rotate-12 transition-transform duration-500">🧠</div>
            <h3 class="text-2xl font-black text-slate-800 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">مقياس الميول المهنية</h3>
            <p class="text-slate-500 leading-relaxed font-medium text-sm">أجب عن مقياس (RIASEC) العلمي لنحلل نمط شخصيتك ونطابقه مع التخصصات التي تضمن لك شغفاً مستداماً.</p>
            <div class="mt-10 flex items-center gap-2 text-indigo-600 font-black text-sm group-hover:gap-4 transition-all duration-300 uppercase tracking-wider">
              <span>ابدأ التقييم</span>
              <span class="text-lg leading-none mt-0.5">←</span>
            </div>
          </div>

          <div @click="handleAction('/grades-input')" class="cursor-pointer bg-[#F8FAFF] rounded-[2.5rem] p-8 border-2 border-transparent hover:border-amber-200 hover:bg-white transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden shadow-sm hover:shadow-xl hover:shadow-amber-500/10">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100 to-transparent rounded-bl-full transition-transform duration-500 group-hover:scale-125"></div>
            <div class="relative z-10 w-16 h-16 bg-white rounded-2xl shadow-sm border border-amber-100 flex items-center justify-center text-3xl mb-6 group-hover:rotate-12 transition-transform duration-500">📈</div>
            <h3 class="text-2xl font-black text-slate-800 mb-3 leading-tight group-hover:text-amber-500 transition-colors">التشخيص الأكاديمي</h3>
            <p class="text-slate-500 leading-relaxed font-medium text-sm">أدخل علاماتك المدرسية الحالية لنكتشف الفجوات ونبني لك خطة دراسية دقيقة ترفع من فرص قبولك في الجامعات.</p>
            <div class="mt-10 flex items-center gap-2 text-amber-600 font-black text-sm group-hover:gap-4 transition-all duration-300 uppercase tracking-wider">
              <span>ابنِ خطتك</span>
              <span class="text-lg leading-none mt-0.5">←</span>
            </div>
          </div>

          <div @click="handleAction('/universities')" class="cursor-pointer bg-[#F8FAFF] rounded-[2.5rem] p-8 border-2 border-transparent hover:border-purple-200 hover:bg-white transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden shadow-sm hover:shadow-xl hover:shadow-purple-500/10">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100 to-transparent rounded-bl-full transition-transform duration-500 group-hover:scale-125"></div>
            <div class="relative z-10 w-16 h-16 bg-white rounded-2xl shadow-sm border border-purple-100 flex items-center justify-center text-3xl mb-6 group-hover:rotate-12 transition-transform duration-500">🏛️</div>
            <h3 class="text-2xl font-black text-slate-800 mb-3 leading-tight group-hover:text-purple-600 transition-colors">الدليل الجامعي</h3>
            <p class="text-slate-500 leading-relaxed font-medium text-sm">قاعدة بيانات ضخمة تشمل الجامعات الأردنية، التخصصات، رسوم الساعات، والحدود الدنيا المحدثة للقبول الموحد.</p>
            <div class="mt-10 flex items-center gap-2 text-purple-600 font-black text-sm group-hover:gap-4 transition-all duration-300 uppercase tracking-wider">
              <span>تصفح الجامعات</span>
              <span class="text-lg leading-none mt-0.5">←</span>
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function openModal() {
  router.push('/signup')
}

function handleAction(route) {
  if (authStore.isAuthenticated) {
    router.push(route)
  } else {
    router.push(`/signup?redirect=${route}`)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
.font-sans { font-family: 'Tajawal', sans-serif; }

/* تم مسح أنيميشن الـ compassNeedle القديم لأننا استبدلناه بالصورة */

@keyframes blob { 
  0% { transform: translate(0, 0) scale(1); } 
  33% { transform: translate(30px, -50px) scale(1.1); } 
  66% { transform: translate(-20px, 20px) scale(0.9); } 
  100% { transform: translate(0, 0) scale(1); } 
}
.animate-blob { animation: blob 10s infinite alternate; }

.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

@keyframes shimmer { 100% { transform: translateX(100%); } }
.animate-shimmer { animation: shimmer 2.5s infinite; }

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}
.animate-float { animation: float 4s ease-in-out infinite; }

.anim-fade-up { animation: fadeUp 0.8s 0.2s ease-out both; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>