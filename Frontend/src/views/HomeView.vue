<template>
  <div class="min-h-screen bg-[#FDFCF9] overflow-hidden font-sans selection:bg-amber-500 selection:text-white relative" dir="rtl">
    
    <div class="absolute inset-0 z-0 opacity-[0.04]" style="background-image: radial-gradient(#d97706 1px, transparent 1px); background-size: 32px 32px;"></div>
    
    <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-amber-400/10 blur-[90px] pointer-events-none z-0 animate-blob"></div>
    <div class="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-yellow-500/10 blur-[100px] pointer-events-none z-0 animate-blob animation-delay-2000"></div>

    <nav class="relative z-50 max-w-7xl mx-auto px-6 py-4 flex justify-between items-center border-b border-slate-200/50 backdrop-blur-md">
      <div class="flex items-center gap-3 cursor-pointer group" @click="$router.push('/')">
        <div class="relative w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:rotate-12 transition-transform duration-500 border border-white/40">
          <svg class="w-7 h-7 text-white drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
          </svg>
          <div class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-slate-800 rounded-full border-2 border-white shadow-sm"></div>
        </div>
        <div class="flex flex-col">
          <span class="text-2xl font-black text-slate-800 tracking-tight leading-none">Career<span class="text-amber-500">Compass</span></span>
          <span class="text-[10px] font-bold text-slate-500 tracking-wider">دليلك الأكاديمي الشامل</span>
        </div>
      </div>
      
      <div class="flex items-center gap-4">
        <button @click="$router.push('/login')" class="hidden md:block text-slate-600 font-bold hover:text-amber-600 transition-colors">
          تسجيل الدخول
        </button>
        <button @click="$router.push('/signup')" class="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 border border-slate-700">
          ابدأ رحلتك
        </button>
      </div>
    </nav>

    <main class="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-16 md:pt-10 lg:pt-12">
      <div class="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
        
        <div class="flex-1 text-center lg:text-right">
          <div class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-amber-200/60 text-slate-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6 shadow-sm">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            منصة التوجيه الأكاديمي الأولى في الأردن
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-[3.2rem] font-black text-slate-800 leading-tight mb-4">
            مسارك من المرحلة الثانوية إلى التعليم الجامعي... 
            <span class="block mt-2 py-3 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">
              أصبح أكثر وضوحاً وذكاءً!
            </span>
          </h1>
          
          <p class="text-slate-600 text-lg font-medium mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 bg-white/40 p-4 rounded-2xl border border-slate-100/50 backdrop-blur-sm">
            <strong class="text-slate-800">كرير كومبس (CareerCompass)</strong> هي منصتك المتكاملة لتحديد مستقبلك الجامعي بثقة. نساعدك في اكتشاف شغفك عبر مقياس دقيق للميول المهنية، ونقوم بتحليل علاماتك المدرسية لسد الفجوات الأكاديمية، مع توفير دليل شامل للجامعات وتخصصاتها.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button @click="$router.push('/assessment')" class="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all duration-300 shadow-[0_8px_25px_-8px_rgba(245,158,11,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3 group border border-amber-400/50">
              <span>اكتشف تخصصك الآن</span>
              <span class="group-hover:-translate-x-2 transition-transform duration-300">←</span>
            </button>
            <button @click="$router.push('/universities')" class="w-full sm:w-auto bg-white/80 backdrop-blur-sm hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-sm flex items-center justify-center gap-2 hover:border-amber-300">
              <span>تصفح دليل الجامعات</span>
            </button>
          </div>
        </div>

        <div class="flex-1 w-full max-w-2xl relative">
          <div class="absolute inset-0 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-[2.5rem] transform rotate-2 scale-[1.02] opacity-20 blur-xl animate-pulse-slow"></div>
          
          <div class="relative bg-white/80 backdrop-blur-xl border border-white/60 p-3 rounded-[2.5rem] shadow-2xl">
            <div class="relative rounded-[1.8rem] overflow-hidden bg-slate-900 border border-slate-100/10 aspect-video shadow-inner">
              <iframe 
                class="w-full h-full" 
                src="https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=1&mute=1&loop=1&playlist=jNQXAC9IVRw&rel=0&controls=0" 
                title="CareerCompass Intro" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>
          </div>
        </div>

      </div>
    </main>

    <section class="relative z-10 bg-white py-24 rounded-t-[3rem] shadow-[0_-15px_40px_-15px_rgba(0,0,0,0.03)] border-t border-slate-100">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-black text-slate-800 mb-4">خدمات المنصة الشاملة</h2>
          <p class="text-slate-500 font-medium text-lg">كل ما تحتاجه لتتخذ قرارك الأكاديمي بثقة ووضوح</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          
          <div @click="$router.push('/assessment')" class="cursor-pointer bg-[#FDFCF9] rounded-[2rem] p-8 border border-slate-200 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
            <div class="relative z-10 w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-3xl mb-6 group-hover:rotate-12 transition-transform duration-300">🎯</div>
            <h3 class="text-2xl font-bold text-slate-800 mb-3">مقياس الميول المهنية</h3>
            <p class="text-slate-600 leading-relaxed font-medium">
              أجب عن أسئلة دقيقة لنحدد نمط شخصيتك ونقترح بيئات العمل والتخصصات التي تضمن لك الإبداع والتميز الأكاديمي.
            </p>
            <div class="mt-8 flex items-center gap-2 text-amber-600 font-bold text-sm group-hover:gap-4 transition-all duration-300">
              <span>ابدأ التقييم</span>
              <span class="text-lg">←</span>
            </div>
          </div>

          <div @click="$router.push('/grades-input')" class="cursor-pointer bg-[#FDFCF9] rounded-[2rem] p-8 border border-slate-200 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
            <div class="relative z-10 w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-3xl mb-6 group-hover:rotate-12 transition-transform duration-300">📈</div>
            <h3 class="text-2xl font-bold text-slate-800 mb-3">التحليل الأكاديمي الشامل</h3>
            <p class="text-slate-600 leading-relaxed font-medium">
              أدخل درجاتك المدرسية لنقوم بتشخيص الفجوات الأكاديمية وبناء خطة دراسية منهجية لرفع معدلك التراكمي.
            </p>
            <div class="mt-8 flex items-center gap-2 text-amber-600 font-bold text-sm group-hover:gap-4 transition-all duration-300">
              <span>حلل درجاتك</span>
              <span class="text-lg">←</span>
            </div>
          </div>

          <div @click="$router.push('/universities')" class="cursor-pointer bg-[#FDFCF9] rounded-[2rem] p-8 border border-slate-200 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
            <div class="relative z-10 w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-3xl mb-6 group-hover:rotate-12 transition-transform duration-300">🏛️</div>
            <h3 class="text-2xl font-bold text-slate-800 mb-3">دليل الجامعات الأردنية</h3>
            <p class="text-slate-600 leading-relaxed font-medium">
              استكشف الجامعات الحكومية والخاصة، واطلع على التخصصات، رسوم الساعات، ومعدلات القبول بتحديثات مستمرة.
            </p>
            <div class="mt-8 flex items-center gap-2 text-amber-600 font-bold text-sm group-hover:gap-4 transition-all duration-300">
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
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');

.font-sans {
  font-family: 'Tajawal', sans-serif;
}

/* حركات الخلفية الهادئة */
.animate-blob {
  animation: blob 10s infinite alternate;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animate-pulse-slow {
  animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.2; transform: scale(1.02) rotate(2deg); }
  50% { opacity: 0.3; transform: scale(1.04) rotate(3deg); }
}
</style>