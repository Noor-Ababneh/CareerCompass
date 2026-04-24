<template>
  <div class="min-h-screen bg-[#F8FAFC] overflow-hidden font-sans selection:bg-indigo-500 selection:text-white relative" dir="rtl">
    
    <div class="absolute inset-0 z-0 opacity-[0.03]" style="background-image: radial-gradient(#4f46e5 1px, transparent 1px); background-size: 32px 32px;"></div>

    <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-[80px] pointer-events-none z-0"></div>
    <div class="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none z-0"></div>

    <nav class="relative z-50 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-200/50 backdrop-blur-sm">
      <div class="flex items-center gap-3 cursor-pointer group" @click="$router.push('/')">
        <div class="relative w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:rotate-12 transition-transform duration-300 border border-white/20">
          <svg class="w-7 h-7 text-white drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
          </svg>
          <div class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-teal-400 rounded-full border-2 border-white shadow-sm"></div>
        </div>
        <div class="flex flex-col">
          <span class="text-2xl font-black text-slate-800 tracking-tight leading-none">Career<span class="text-indigo-600">Compass</span></span>
          <span class="text-[10px] font-bold text-slate-500 tracking-wider">البوصلة المهنية</span>
        </div>
      </div>
      
      <div class="flex items-center gap-4">
        <button @click="$router.push('/login')" class="hidden md:block text-slate-600 font-bold hover:text-indigo-600 transition-colors">
          تسجيل الدخول
        </button>
        <button @click="$router.push('/signup')" class="bg-slate-800 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-slate-700 hover:border-indigo-500">
          ابدأ رحلتك
        </button>
      </div>
    </nav>

    <main class="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20 md:pt-16 lg:pt-24">
      <div class="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
        
        <div class="flex-1 text-center lg:text-right">
          <div class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200/80 text-slate-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6 shadow-sm">
            <span class="text-lg">🇯🇴</span>
            دليلك الأكاديمي المعتمد في المملكة الأردنية الهاشمية
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-[3.2rem] font-black text-slate-800 leading-tight mb-6">
  مسارك من المرحلة الثانوية إلى التعليم الجامعي... 
  
  <span class="block mt-2 py-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
    أصبح أكثر وضوحاً وذكاءً!
  </span>
</h1>
          
          <p class="text-slate-600 text-lg md:text-xl font-medium mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            ودّع الحيرة والتخمين! تقوم منصتنا بتحليل شخصيتك المهنية وتقييم تحصيلك الأكاديمي، لترسم لك خريطة مخصصة نحو التخصصات الجامعية التي تلائم طموحك وتواكب متطلبات سوق العمل.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button @click="$router.push('/assessment')" class="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all duration-300 shadow-[0_8px_25px_-8px_rgba(79,70,229,0.6)] hover:-translate-y-1 flex items-center justify-center gap-3 group border border-indigo-500">
              <span>اكتشف تخصصك الآن</span>
              <span class="group-hover:-translate-x-2 transition-transform duration-300">←</span>
            </button>
            <button @click="$router.push('/universities')" class="w-full sm:w-auto bg-white/80 backdrop-blur-sm hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-sm flex items-center justify-center gap-2 hover:border-slate-300">
              <span>تصفح دليل الجامعات</span>
            </button>
          </div>
        </div>

        <div class="flex-1 w-full max-w-2xl relative">
          <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-blue-400 rounded-[2.5rem] transform rotate-2 scale-[1.02] opacity-15 blur-xl"></div>
          
          <div class="relative bg-white/80 backdrop-blur-xl border border-white/60 p-3 rounded-[2.5rem] shadow-2xl">
            <div class="relative rounded-[1.8rem] overflow-hidden bg-slate-800 border border-slate-100/10 aspect-video shadow-inner">
              <iframe 
                class="w-full h-full" 
                src="https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=1&mute=1&loop=1&playlist=jNQXAC9IVRw&rel=0&controls=0" 
                title="CareerCompass Intro" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>
            
            <div class="absolute -left-4 top-1/4 w-8 h-8 bg-amber-400 rounded-full mix-blend-multiply filter blur-md opacity-70 animate-pulse"></div>
          </div>
        </div>

      </div>

      <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-slate-200/60 py-10 bg-white/40 backdrop-blur-sm rounded-3xl">
        <div class="text-center px-4 border-l border-slate-200/60 last:border-0">
          <div class="text-3xl font-black text-slate-800 mb-1">19+</div>
          <div class="text-sm font-bold text-slate-500">جامعة أردنية معتمدة</div>
        </div>
        <div class="text-center px-4 border-l border-slate-200/60 last:border-0">
          <div class="text-3xl font-black text-slate-800 mb-1">100%</div>
          <div class="text-sm font-bold text-slate-500">متوافق مع القبول الموحد</div>
        </div>
        <div class="text-center px-4 border-l border-slate-200/60 last:border-0">
          <div class="text-3xl font-black text-slate-800 mb-1">6</div>
          <div class="text-sm font-bold text-slate-500">أنماط مهنية عالمية</div>
        </div>
        <div class="text-center px-4 border-l border-slate-200/60 last:border-0">
          <div class="text-3xl font-black text-slate-800 mb-1">100+</div>
          <div class="text-sm font-bold text-slate-500">تخصص أكاديمي مفصل</div>
        </div>
      </div>
    </main>

    <section class="relative z-10 bg-white py-24 rounded-t-[3rem] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.03)] border-t border-slate-100">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-black text-slate-800 mb-4">كل ما تحتاجه لبناء مستقبلك في منصة واحدة</h2>
          <p class="text-slate-500 font-medium text-lg">صُممت المنصة لترافقك في كل خطوة نحو اختيارك الجامعي الأمثل</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          
          <div @click="$router.push('/assessment')" class="cursor-pointer bg-[#F8FAFC] rounded-[2rem] p-8 border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
            <div class="relative z-10 w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-3xl mb-6 group-hover:rotate-12 transition-transform duration-300">🧩</div>
            <h3 class="text-2xl font-bold text-slate-800 mb-3">مقياس الميول المهنية</h3>
            <p class="text-slate-600 leading-relaxed font-medium">
              أجب عن أسئلة دقيقة لنحدد نمط شخصيتك ونقترح بيئات العمل والتخصصات التي تضمن لك الإبداع والتميز الأكاديمي.
            </p>
            <div class="mt-8 flex items-center gap-2 text-indigo-600 font-bold text-sm group-hover:gap-4 transition-all duration-300">
              <span>ابدأ التقييم</span>
              <span class="text-lg">←</span>
            </div>
          </div>

          <div @click="$router.push('/grades-input')" class="cursor-pointer bg-[#F8FAFC] rounded-[2rem] p-8 border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
            <div class="relative z-10 w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-3xl mb-6 group-hover:rotate-12 transition-transform duration-300">📈</div>
            <h3 class="text-2xl font-bold text-slate-800 mb-3">التحليل الأكاديمي الشامل</h3>
            <p class="text-slate-600 leading-relaxed font-medium">
              أدخل درجاتك المدرسية لنقوم بتشخيص الفجوات الأكاديمية وبناء خطة دراسية منهجية لرفع معدلك التراكمي.
            </p>
            <div class="mt-8 flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:gap-4 transition-all duration-300">
              <span>حلل درجاتك</span>
              <span class="text-lg">←</span>
            </div>
          </div>

          <div @click="$router.push('/universities')" class="cursor-pointer bg-[#F8FAFC] rounded-[2rem] p-8 border border-slate-200 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
            <div class="relative z-10 w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-3xl mb-6 group-hover:rotate-12 transition-transform duration-300">🏛️</div>
            <h3 class="text-2xl font-bold text-slate-800 mb-3">دليل الجامعات الأردنية</h3>
            <p class="text-slate-600 leading-relaxed font-medium">
              استكشف الجامعات الحكومية والخاصة، واطلع على التخصصات، رسوم الساعات، ومعدلات القبول بتحديثات مستمرة.
            </p>
            <div class="mt-8 flex items-center gap-2 text-teal-600 font-bold text-sm group-hover:gap-4 transition-all duration-300">
              <span>تصفح الدليل</span>
              <span class="text-lg">←</span>
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
</script>

<style scoped>
/* إضافة خط تجوال (Tajawal) لجمالية الحروف العربية */
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

.font-sans {
  font-family: 'Tajawal', sans-serif;
}
</style>