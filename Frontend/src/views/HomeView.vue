<template>
  <div class="relative min-h-screen overflow-hidden bg-[#EEF2F6] font-sans text-slate-800" dir="rtl">

    <div class="absolute w-[800px] h-[800px] bg-blue-200/40 rounded-full blur-[100px] top-[-200px] right-[-200px] animate-blob mix-blend-multiply"></div>
    <div class="absolute w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[100px] bottom-[-100px] left-[-100px] animate-blob animation-delay-2000 mix-blend-multiply"></div>

    <nav class="relative z-50 flex justify-between items-center max-w-7xl mx-auto px-6 py-6 backdrop-blur-sm">
      <div class="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
        <span class="text-3xl">🧭</span> CareerCompass
      </div>
      <div class="flex gap-3">
        <button @click="$router.push('/login')" class="text-slate-600 font-bold hover:text-blue-700 transition px-4 py-2">تسجيل دخول</button>
        <button @click="$router.push('/signup')" class="bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-900 transition shadow-lg shadow-slate-300">
          ابدأ مجاناً
        </button>
      </div>
    </nav>

    <div class="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24">

      <div class="flex flex-col lg:flex-row items-center justify-between gap-16 mb-24">
        
        <div class="lg:w-1/2 text-center lg:text-right space-y-8">
          
          <div class="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white border border-slate-200 shadow-sm text-blue-700 text-sm font-bold animate-fade-in-up">
            <span>✨</span> دليلك الأكاديمي الذكي
          </div>
          
          <h1 class="text-4xl md:text-6xl font-black text-slate-800 leading-[1.3]">
            لا تترك مستقبلك <br/>
            <span class="relative inline-block">
              <span class="relative z-10 text-blue-700">للصدفة.</span>
              <span class="absolute bottom-3 left-0 w-full h-3 bg-blue-200/50 -z-0 rounded-full"></span>
            </span>
          </h1>
          
          <p class="text-lg text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
            اكتشف شغفك الحقيقي، قارن قدراتك، واختر تخصصك الجامعي بناءً على تحليل دقيق وليس مجرد تخمينات.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <button @click="$router.push('/signup')" class="px-8 py-4 bg-blue-700 text-white text-lg font-bold rounded-2xl shadow-xl shadow-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all">
              ابدأ الاختبار الآن 🚀
            </button>
            <button @click="$router.push('/login')" class="px-8 py-4 bg-white text-slate-700 border border-slate-300 text-lg font-bold rounded-2xl hover:bg-slate-50 transition-all">
              لدي حساب
            </button>
          </div>

          </div>

        <div class="lg:w-1/2 w-full relative group">
          <div class="absolute -inset-4 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-[2.5rem] -z-10 rotate-2 group-hover:rotate-3 transition-transform duration-500 opacity-60"></div>
          
          <div class="relative rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white bg-white aspect-video transform transition duration-500 hover:scale-[1.01]">
            <iframe 
              class="w-full h-full" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" 
              title="CareerCompass Intro" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
            <div class="absolute inset-0 bg-blue-900/5 pointer-events-none"></div>
          </div>
        </div>
      </div>

      <div class="mb-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-black text-slate-800 mb-4">كيف نساعدك؟ 💡</h2>
          <p class="text-slate-600 max-w-2xl mx-auto text-lg">رحلة متكاملة من الحيرة إلى القرار، بخطوات مدروسة.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="feature-card group" @click="$router.push('/signup')">
            <div class="w-16 h-16 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">🧠</div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">اعرف نفسك</h3>
            <p class="text-slate-600 text-sm leading-relaxed">اختبار RIASEC النفسي المطور سيكشف لك ميولك المهنية الحقيقية بدقة.</p>
          </div>

          <div class="feature-card group" @click="$router.push('/signup')">
            <div class="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">📊</div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">حلل قدراتك</h3>
            <p class="text-slate-600 text-sm leading-relaxed">خوارزمية ذكية تقارن علاماتك بمتطلبات التخصصات لضمان قبولك.</p>
          </div>

          <div class="feature-card group" @click="$router.push('/signup')">
            <div class="w-16 h-16 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">🎓</div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">اختر جامعتك</h3>
            <p class="text-slate-600 text-sm leading-relaxed">دليل شامل لكافة الجامعات الأردنية (حكومي وخاص) بين يديك.</p>
          </div>
        </div>
      </div>

      <div class="relative bg-slate-800 rounded-[2.5rem] p-10 md:p-16 text-center overflow-hidden shadow-2xl shadow-slate-300">
        <div class="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div class="relative z-10">
          <h2 class="text-3xl md:text-4xl font-black text-white mb-6">جاهز لاكتشاف مستقبلك؟</h2>
          <p class="text-slate-300 mb-8 max-w-xl mx-auto text-lg">انضم للطلاب الذين اتخذوا القرار الصحيح مع CareerCompass.</p>
          <button @click="$router.push('/signup')" class="bg-white text-slate-900 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg hover:scale-105 transform">
            أنشئ حساب مجاني
          </button>
        </div>
      </div>

    </div>

    <footer class="bg-white border-t border-slate-200 py-10 mt-10">
      <div class="max-w-7xl mx-auto px-6 text-center md:text-right flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <div class="text-2xl font-black text-slate-800 flex items-center justify-center md:justify-start gap-2 mb-2">
            <span>🧭</span> CareerCompass
          </div>
          <p class="text-sm text-slate-500 font-medium">جميع الحقوق محفوظة © 2026</p>
        </div>
        <div class="flex gap-6 text-sm font-bold text-slate-600">
          <a href="#" class="hover:text-blue-700 transition">عن الموقع</a>
          <a href="#" class="hover:text-blue-700 transition">سياسة الخصوصية</a>
          <a href="#" class="hover:text-blue-700 transition">اتصل بنا</a>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
// No extra logic needed
</script>

<style scoped>
.feature-card {
  @apply bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer;
}

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

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>